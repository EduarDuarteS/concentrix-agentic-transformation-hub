import React, { useState, useEffect } from 'react';
import { Mic, Pause, Bot, Copy, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

export default function LiveBuilder() {
  const [buffer, setBuffer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [blueprint, setBlueprint] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isRecording) return;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const gatewayHost = import.meta.env.VITE_GATEWAY_URL || 'gateway-app-7998411376.us-central1.run.app';
    const wsUrl = `${protocol}//${gatewayHost}`;
    
    const socket = new WebSocket(wsUrl);
    
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event_type === 'stt_candidate' || data.event_type === 'stt_interviewer') {
          if (data.is_final) {
             const speaker = data.event_type === 'stt_interviewer' ? 'CLIENTE:' : 'SISTEMA:';
             setBuffer(prev => `${prev}\n${speaker} ${data.transcript}`);
          }
        }
      } catch(e) {}
    };

    return () => socket.close();
  }, [isRecording]);

  const generateBlueprint = async () => {
    if (!buffer) return;
    setIsGenerating(true);
    try {
      const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
      const gatewayHost = import.meta.env.VITE_GATEWAY_URL || 'gateway-app-7998411376.us-central1.run.app';
      const res = await fetch(`${protocol}//${gatewayHost}/api/blueprint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ buffer })
      });
      const data = await res.json();
      setBlueprint(data.blueprint || 'Error de Generación: ' + (data.error || 'Desconocido'));
    } catch (e) {
      setBlueprint('Error de Red: ' + e.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (blueprint) {
      navigator.clipboard.writeText(blueprint);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-700 h-full flex flex-col">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-4xl font-bold text-white tracking-tight">Live Builder</h2>
          <p className="text-zinc-500 mt-1">Automated Code-Gen Canvas via Active Listening.</p>
        </div>
      </div>

      <div className="w-full flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 text-zinc-100 font-sans min-h-[500px]">
        
        {/* The Harvester Panel */}
        <div className="flex flex-col h-full bg-zinc-950/60 backdrop-blur-3xl border border-white/5 rounded-3xl overflow-hidden relative">
          <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-black/20">
            <div className="flex items-center gap-3">
              <Mic className={`w-4 h-4 ${isRecording ? 'text-rose-500 animate-pulse' : 'text-zinc-500'}`} />
              <h2 className="text-sm font-semibold tracking-wide text-zinc-200">The Harvester</h2>
            </div>
            <button 
              onClick={() => setIsRecording(!isRecording)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${isRecording ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-white/10 text-white hover:bg-white/20'}`}>
              {isRecording ? 'PAUSE BUFFER' : 'REC BUFFER'}
            </button>
          </div>
          
          <div className="flex-1 p-6 bg-black/40 overflow-y-auto font-mono text-sm leading-relaxed text-zinc-300 relative scrollbar-thin scrollbar-thumb-zinc-800">
             {buffer ? (
               <div className="whitespace-pre-wrap">{buffer}</div>
             ) : (
               <div className="absolute inset-0 flex items-center justify-center opacity-40">
                 <div className="text-center space-y-4">
                   <Mic className="w-8 h-8 mx-auto text-zinc-600" />
                   <p className="text-xs tracking-widest uppercase font-mono">Awaiting Voice Requirements...</p>
                 </div>
               </div>
             )}
          </div>
          
          <div className="p-4 border-t border-white/5 bg-black/20">
             <button 
               onClick={generateBlueprint}
               disabled={isGenerating || !buffer}
               className="w-full py-3 rounded-2xl bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2">
               {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
               GENERATE ARCHITECTURE BLUEPRINT
             </button>
          </div>
        </div>

        {/* The Blueprint Engine Panel */}
        <div className="flex flex-col h-full bg-zinc-950/60 backdrop-blur-3xl border border-white/5 rounded-3xl overflow-hidden relative">
          <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-black/20">
            <div className="flex items-center gap-3">
              <Bot className="w-4 h-4 text-emerald-500" />
              <h2 className="text-sm font-semibold tracking-wide text-zinc-200">The Blueprint Engine</h2>
            </div>
            <div className="px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[10px] font-mono text-zinc-400 uppercase">
              Powered by Gemini
            </div>
          </div>
          
          <div className="flex-1 p-6 bg-[#09090b] overflow-y-auto relative">
             {blueprint ? (
               <div className="font-mono text-[13px] text-emerald-400 leading-relaxed whitespace-pre-wrap">
                 {blueprint}
               </div>
             ) : (
               <div className="absolute inset-0 flex items-center justify-center opacity-30 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]">
                  <p className="font-mono text-sm tracking-widest text-zinc-500">[ AWAITING PROMPT INJECTION ]</p>
               </div>
             )}
          </div>

          <div className="p-4 border-t border-white/5 bg-black/20">
             <button 
               onClick={handleCopy}
               disabled={!blueprint}
               className={`w-full py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${copied ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed'}`}>
               {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
               {copied ? 'COPIED TO CLIPBOARD' : '1-CLICK COPY TO STITCH'}
             </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
