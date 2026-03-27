import os
import time
import json
import asyncio
import websockets
import pyaudiowpatch as pyaudio
import redis.asyncio as aioredis
from dotenv import load_dotenv

load_dotenv()

# THE STANDALONE SENSORY SHIELD (WASAPI + DEEPGRAM WEBSOCKETS)
# Portado para Concentrix Agentic Transformation Hub (Sidecar Pattern)

DEEPGRAM_API_KEY = os.getenv("DEEPGRAM_API_KEY")

async def audio_stream_task(device_index, speaker_name, redis_client):
    pa = pyaudio.PyAudio()
    
    device_info = pa.get_device_info_by_index(device_index)
    channels = device_info['maxInputChannels'] if device_info['maxInputChannels'] > 0 else 1
    sample_rate = int(device_info['defaultSampleRate'])
    
    dg_url = f"wss://api.deepgram.com/v1/listen?model=nova-2&smart_format=true&encoding=linear16&sample_rate={sample_rate}&channels={channels}&endpointing=500&interim_results=true&utterance_end_ms=1000"
    
    headers = {
        "Authorization": f"Token {DEEPGRAM_API_KEY}"
    }

    try:
        async with websockets.connect(dg_url, additional_headers=headers) as ws:
            print(f"[{speaker_name.upper()}] 🟢 Conectado a Deepgram WebSocket Nova-2.")
            
            queue = asyncio.Queue()
            loop = asyncio.get_running_loop()
            
            def callback(in_data, frame_count, time_info, status):
                loop.call_soon_threadsafe(queue.put_nowait, in_data)
                return (None, pyaudio.paContinue)
            
            stream = pa.open(
                format=pyaudio.paInt16,
                channels=channels,
                rate=sample_rate,
                input=True,
                input_device_index=device_index,
                stream_callback=callback
            )
            
            stream.start_stream()
            print(f"[{speaker_name.upper()}] 🎤 Flujo de audio abierto.")
            
            async def sender():
                while stream.is_active():
                    try:
                        data = await asyncio.wait_for(queue.get(), timeout=3.0)
                        await ws.send(data)
                    except asyncio.TimeoutError:
                        try:
                            await ws.send(json.dumps({"type": "KeepAlive"}))
                        except Exception as e:
                            print(f"[{speaker_name.upper()}] Error enviando KeepAlive: {e}")
                            break
                    except Exception as e:
                        print(f"[{speaker_name.upper()}] Error en sender: {e}")
                        break
                    
            async def receiver():
                buffer = []
                current_uid = f"live_stt_{int(time.time() * 1000)}"
                async for msg in ws:
                    res = json.loads(msg)
                    
                    if res.get("type") == "Results":
                        is_final = res.get("is_final", False)
                        speech_final = res.get("speech_final", False)
                        alts = res.get("channel", {}).get("alternatives", [])
                        
                        if alts:
                            text = alts[0].get("transcript", "").strip()
                            
                            if not is_final:
                                current_text = " ".join(buffer + [text]).strip()
                                if current_text:
                                    hud_payload = {
                                        "event_type": "stt_interviewer" if speaker_name == "interviewer" else "stt_candidate",
                                        "target": "decoder" if speaker_name == "interviewer" else "wingman",
                                        "transcript": current_text,
                                        "is_final": False,
                                        "uid": current_uid
                                    }
                                    await redis_client.publish("sensei:hud:insights", json.dumps(hud_payload))
                            else:
                                if text:
                                    buffer.append(text)
                                    
                                if speech_final:
                                    utterance = " ".join(buffer).strip()
                                    if utterance:
                                        print(f"📝 [{speaker_name.upper()}]: {utterance}")
                                        telemetry = {"text": utterance, "speaker": speaker_name}
                                        await redis_client.publish("sensei:live:telemetry", json.dumps(telemetry))
                                        
                                        hud_payload = {
                                            "event_type": "stt_interviewer" if speaker_name == "interviewer" else "stt_candidate",
                                            "target": "decoder" if speaker_name == "interviewer" else "wingman",
                                            "transcript": utterance,
                                            "is_final": True,
                                            "uid": current_uid
                                        }
                                        await redis_client.publish("sensei:hud:insights", json.dumps(hud_payload))
                                    buffer = [] 
                                    current_uid = f"live_stt_{int(time.time() * 1000)}"
                                    
                    elif res.get("type") == "UtteranceEnd":
                        utterance = " ".join(buffer).strip()
                        if utterance:
                            print(f"📝 [{speaker_name.upper()}] (SILENCIO): {utterance}")
                            telemetry = {"text": utterance, "speaker": speaker_name}
                            await redis_client.publish("sensei:live:telemetry", json.dumps(telemetry))
                            
                            hud_payload = {
                                "event_type": "stt_interviewer" if speaker_name == "interviewer" else "stt_candidate",
                                "target": "decoder" if speaker_name == "interviewer" else "wingman",
                                "transcript": utterance,
                                "is_final": True,
                                "uid": current_uid
                            }
                            await redis_client.publish("sensei:hud:insights", json.dumps(hud_payload))
                        buffer = []
                        current_uid = f"live_stt_{int(time.time() * 1000)}"

            await asyncio.gather(sender(), receiver())
            
    except Exception as e:
        print(f"[{speaker_name.upper()}] ❌ Error crítico de Streaming: {e}")
    finally:
        if 'stream' in locals() and stream.is_active():
            stream.stop_stream()
            stream.close()
        pa.terminate()

async def main():
    print("🚀 Iniciando Standalone STT Engine (SENSEI Sensory Shield)...")
    
    if not DEEPGRAM_API_KEY:
        print("❌ ERROR: DEEPGRAM_API_KEY no encontrada en el .env")
        return

    pa = pyaudio.PyAudio()
    
    loopback_device = None
    mic_device = None
    
    try:
        wasapi_info = pa.get_host_api_info_by_type(pyaudio.paWASAPI)
        default_output = pa.get_device_info_by_index(wasapi_info["defaultOutputDevice"])
        
        print(f"Buscando loopback para el dispositivo por defecto: {default_output['name']}")
        
        for i in range(pa.get_device_count()):
            dev = pa.get_device_info_by_index(i)
            if dev["hostApi"] == wasapi_info["index"] and dev["isLoopbackDevice"]:
                if default_output["name"] in dev["name"]:
                    loopback_device = i
                    break
                    
        try:
            default_mme_input = pa.get_default_input_device_info()
            mic_device = default_mme_input["index"]
        except Exception:
            default_input = pa.get_device_info_by_index(wasapi_info["defaultInputDevice"])
            mic_device = default_input["index"]

    except Exception as e:
        print(f"⚠️ Error escaneando la topología de Audio WASAPI: {e}")
        
    pa.terminate()

    if loopback_device is None:
        print("❌ FATAL: No se encontró un Bus Loopback WASAPI activo para el Speaker.")
        return

    print(f"🎙️ [CANDIDATO] Index Micrófono: {mic_device}")
    print(f"🔊 [ENTREVISTADOR] Index Loopback (Teams/Zoom): {loopback_device}")
    
    try:
        redis_client = aioredis.from_url("redis://localhost:6379", decode_responses=True)
        await redis_client.ping()
        print("🧠 🟢 Conectado exitosamente a Redis Pub/Sub (Hub Message Bus)")
    except Exception as e:
        print(f"❌ FATAL: No se pudo conectar a Redis localhost:6379 -> {e}")
        return

    print("\n⚔️ SENSORY SHIELD IS LIVE. PUBLISHING TO THE REDIS RIVER. ⚔️\n")

    tasks = [
        audio_stream_task(mic_device, "candidate", redis_client),
        audio_stream_task(loopback_device, "interviewer", redis_client)
    ]
    
    await asyncio.gather(*tasks)

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n🛑 Standalone STT Terminado manualmente.")
