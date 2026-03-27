import React, { useEffect, useState } from 'react';

// SENSEI SENSORY SHIELD: Live Subtitles Component (Sidecar Pattern)
// Escucha directamente los eventos "sensei:hud:insights" del WebSocket
export function LiveSubtitles() {
  const [subtitles, setSubtitles] = useState({ candidate: '', interviewer: '' });

  useEffect(() => {
    // URL del Hub Gateway (Protected for Docker Build)
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const gatewayHost = import.meta.env.VITE_GATEWAY_URL || 'gateway-app-7998411376.us-central1.run.app';
    const wsUrl = `${protocol}//${gatewayHost}`;
    let socket;
    
    const connect = () => {
      socket = new WebSocket(wsUrl);
      
      socket.onopen = () => {
        console.log("🟢 Live Subtitles: Conectado al Gateway de Eventos");
      };
      
      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.event_type === 'stt_candidate') {
            setSubtitles(prev => ({ ...prev, candidate: data.transcript }));
          } else if (data.event_type === 'stt_interviewer') {
            setSubtitles(prev => ({ ...prev, interviewer: data.transcript }));
          }
        } catch (error) {
           // Silently ignore non-JSON or other messages
        }
      };

      socket.onclose = () => {
        console.warn("⚠️ Live Subtitles: WS desconectado. Reconectando en 3s...");
        setTimeout(connect, 3000);
      };
    };

    connect();

    // Auto-limpieza tras periodos de silencio prolongado (ej. 5 seg)
    const cleanupInterval = setInterval(() => {
        setSubtitles(prev => {
            // Un mecanismo de desvanecimiento podría implementarse aquí
            return prev;
        });
    }, 5000);

    return () => {
      clearInterval(cleanupInterval);
      if (socket) socket.close();
    };
  }, []);

  if (!subtitles.candidate && !subtitles.interviewer) return null;

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 w-4/5 max-w-4xl flex flex-col items-center gap-3 z-50 pointer-events-none">
      {/* Entrevistador (Arriba, Azul) */}
      {subtitles.interviewer && (
        <div className="bg-blue-900/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-2xl border border-blue-500/30 transition-all duration-300 transform translate-y-0 opacity-100">
          <p className="text-blue-100 font-medium text-lg text-center tracking-wide">
            <span className="font-bold text-blue-400 mr-2">Agente (Teams):</span>
            {subtitles.interviewer}
          </p>
        </div>
      )}
      
      {/* Candidato/Usuario (Abajo, Verde/Blanco) */}
      {subtitles.candidate && (
        <div className="bg-black/80 backdrop-blur-md px-6 py-4 rounded-2xl shadow-2xl border border-emerald-500/30 transition-all duration-300 transform translate-y-0 opacity-100">
          <p className="text-white font-medium text-2xl text-center tracking-wide">
             <span className="font-bold text-emerald-400 mr-2">🎤 Tú:</span>
             {subtitles.candidate}
          </p>
        </div>
      )}
    </div>
  );
}
