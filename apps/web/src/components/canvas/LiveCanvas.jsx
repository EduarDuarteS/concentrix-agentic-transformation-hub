import React, { useMemo } from 'react';
import { useCanvasStore } from '../../store/useCanvasStore';
import { Activity, AlertTriangle, CheckCircle2, MinusCircle, UserX, MessageSquareQuote } from 'lucide-react';
import { LiveSubtitles } from '../LiveSubtitles';

const SentimentColor = (sentiment) => {
  switch(sentiment) {
    case 'Positive': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
    case 'Negative': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
    case 'Frustrated': return 'text-red-500 bg-red-500/10 border-red-500/30';
    default: return 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20';
  }
};

const SentimentIcon = ({ sentiment }) => {
  switch(sentiment) {
    case 'Positive': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    case 'Negative': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
    case 'Frustrated': return <UserX className="w-4 h-4 text-red-500 animate-pulse" />;
    default: return <MinusCircle className="w-4 h-4 text-zinc-500" />;
  }
};

export default function LiveCanvas() {
  // Aislar asincrónicamente el arbol: Solo suscribirse al Array del global store
  const logs = useCanvasStore(state => state.logs);
  
  // Extraer y aislar solo el stream de eventos de sentimiento CCaaS
  const sentimentLogs = useMemo(() => {
    return logs
      .filter(log => log?.type === 'ccaas_sentiment_stream')
      .reverse(); // El más reciente de primero
  }, [logs]);

  const latestEvent = sentimentLogs[0];
  const historyEvents = sentimentLogs.slice(1, 6);

  if (!latestEvent) {
    return (
      <div className="space-y-8 animate-in fade-in zoom-in-95 duration-700 h-full">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold text-white tracking-tight">Live Canvas</h2>
            <p className="text-zinc-500 mt-1">CCaaS Sentiment Live Telemetry Simulation.</p>
          </div>
        </div>
        <div className="w-full h-[60vh] flex flex-col items-center justify-center text-zinc-500 font-mono text-[11px] bg-black/20 rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40"></div>    
          <Activity className="w-6 h-6 mb-3 animate-pulse text-zinc-700" />
          <p>Awaiting CCaaS Telemetry Stream via ZTA WebSockets...</p>
        </div>
      </div>
    );
  }

  const { payload, agent_id } = latestEvent;
  const isAlarming = payload.sentiment === 'Negative' || payload.sentiment === 'Frustrated';

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-700 h-full flex flex-col">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-4xl font-bold text-white tracking-tight">Live Canvas</h2>
          <p className="text-zinc-500 mt-1">CCaaS Sentiment Live Telemetry Simulation.</p>
        </div>
      </div>

      <div className="w-full flex-1 flex gap-6 text-zinc-100 font-sans min-h-[500px]">
        
        {/* Principal Card */}
        <div className="flex-1 flex flex-col h-full rounded-2xl">
          <div className={`flex flex-col h-full bg-zinc-950/60 backdrop-blur-3xl border ${isAlarming ? 'border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.15)] ring-1 ring-red-500/20' : 'border-white/5'} rounded-3xl overflow-hidden relative transition-all duration-500`}>
            
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-black/20">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full animate-pulse ${isAlarming ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                <h2 className="text-sm font-semibold tracking-wide text-zinc-200">Live Agent Stream</h2>
              </div>
              <span className="inline-flex items-center justify-center font-mono text-[10px] border border-white/10 bg-black/40 text-zinc-400 px-2 py-0.5 rounded-full">
                {agent_id}
              </span>
            </div>
            
            <div className="p-8 flex flex-col flex-1 justify-between gap-6">
              
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="inline-flex items-center justify-center bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium px-3 py-1 rounded-full text-xs font-semibold">
                    {payload.intent}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
                   <span>Confidence:</span> 
                   <span className="text-zinc-300">{(payload.confidence * 100).toFixed(0)}%</span>
                  </div>
                </div>

                <div className="relative group mt-6">
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-4 font-semibold flex items-center gap-2">
                    <MessageSquareQuote className="w-3 h-3"/> Active Transcript
                  </p>
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/5 relative shadow-inner">
                    <div className={`absolute -left-[1px] top-6 bottom-6 w-[2px] rounded-full transition-colors duration-500 ${isAlarming ? 'bg-red-500/50' : 'bg-zinc-700'}`}></div>
                    <p className="text-xl md:text-2xl font-light leading-relaxed text-zinc-200 tracking-wide italic">
                      "{payload.transcript_snippet}"
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/5 bg-black/20 p-5 shadow-inner mt-4">
                <div className="flex justify-between items-center mb-5">
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">AI Sentiment Assessment</p>
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${SentimentColor(payload.sentiment)}`}>
                    <SentimentIcon sentiment={payload.sentiment} />
                    <span className="text-[11px] font-bold tracking-widest uppercase">{payload.sentiment}</span>
                  </div>
                </div>

                {isAlarming && (
                  <div className="pt-5 border-t border-red-900/30 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <p className="text-[10px] text-red-500/90 uppercase tracking-widest mb-4 font-bold flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3" /> Churn Risk Detected — Suggested AI Workflows
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 rounded-xl text-[10px] uppercase font-bold tracking-wider bg-[#09090b] border border-red-900/50 text-red-100 hover:bg-red-900/20 transition-colors shadow-sm">
                        10% Discount (3mo)
                      </button>
                      <button className="px-4 py-2 rounded-xl text-[10px] uppercase font-bold tracking-wider bg-[#09090b] border border-red-900/50 text-red-100 hover:bg-red-900/20 transition-colors shadow-sm">
                        Free Upgrade
                      </button>
                      <button className="px-4 py-2 rounded-xl text-[10px] uppercase font-bold tracking-wider bg-[#09090b] border border-red-900/50 text-red-100 hover:bg-red-900/20 transition-colors shadow-sm">
                        Waiver Late Fee
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-[320px] hidden xl:flex flex-col border border-white/5 rounded-3xl bg-zinc-950/40 backdrop-blur-3xl overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
          <div className="px-5 py-5 border-b border-white/5 bg-black/20">
            <h3 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              History Log <span className="bg-zinc-800 text-zinc-300 px-1.5 rounded text-[9px]">{sentimentLogs.length}</span>
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-zinc-800">
            {historyEvents.length === 0 ? (
              <div className="text-center p-4 text-[10px] text-zinc-600 font-mono">Waiting for stream...</div>
            ) : (
              historyEvents.map((evt, idx) => (
                <div key={evt.id || idx} className="p-4 rounded-2xl bg-zinc-900/40 border border-white/5 hover:bg-zinc-800/40 transition-colors duration-300 cursor-default">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[9px] font-mono text-zinc-500 bg-black/50 px-2 py-0.5 rounded">{evt.agent_id}</span>
                    <SentimentIcon sentiment={evt.payload.sentiment} />
                  </div>
                  <p className="text-[10px] text-zinc-300 line-clamp-2 leading-relaxed italic border-l-2 border-zinc-700 pl-3">
                    "{evt.payload.transcript_snippet}"
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
        
      </div>

      {/* STT Engine - Sidecar Injected */}
      <LiveSubtitles />
    </div>
  );
}
