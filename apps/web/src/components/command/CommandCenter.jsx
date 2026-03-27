import React, { useState, useEffect } from 'react';
import { useCanvasStore } from '../../store/useCanvasStore';
import { Activity, ShieldCheck, Database, Zap, Terminal } from 'lucide-react';

const CommandCenter = () => {
  const logs = useCanvasStore((state) => state.logs);
  
  // Identificar el agente activo basado en el último log
  const activeAgent = logs.length > 0 ? logs[logs.length - 1].agent : null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold text-white tracking-tight">Command Center</h2>
          <p className="text-zinc-500 mt-1">Operational observability and agent lifecycle monitoring.</p>
        </div>
        <div className="flex gap-3">
          <span className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-2xl border border-white/5 text-[10px] font-mono text-emerald-500 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            Redis Bus: Connected
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Architecture Trace */}
        <div className="lg:col-span-3 aspect-video rounded-[2.5rem] bg-zinc-900/20 border border-white/5 backdrop-blur-3xl p-8 relative overflow-hidden group">
          <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
          
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-indigo-400" />
              <h4 className="text-sm font-mono text-zinc-400 uppercase tracking-widest">Live_Architecture_Trace</h4>
            </div>
            <div className="flex gap-2">
              <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-mono text-indigo-400 uppercase tracking-widest">
                System_Agnostic
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center h-full relative z-10">
            <div className="relative flex items-center justify-center gap-12 lg:gap-20">
              
              {/* Voice Node */}
              <div className={`w-32 h-32 rounded-[2rem] border transition-all duration-500 flex flex-col items-center justify-center gap-2 ${activeAgent === 'voice_analyser' ? 'bg-indigo-500/20 border-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.3)] scale-110' : 'bg-white/5 border-white/5 opacity-40'}`}>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Activity size={20} />
                </div>
                <span className="text-[10px] font-mono uppercase text-zinc-400">Voice_Input</span>
              </div>

              {/* LangGraph Node */}
              <div className={`w-32 h-32 rounded-[2rem] border transition-all duration-500 flex flex-col items-center justify-center gap-2 ${activeAgent === 'architect' || activeAgent === 'IA_Architect' ? 'bg-purple-500/20 border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.3)] scale-110' : 'bg-white/5 border-white/5 opacity-40'}`}>
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <Zap size={20} />
                </div>
                <span className="text-[10px] font-mono uppercase text-zinc-400">LangGraph</span>
              </div>

              {/* ZTA Node */}
              <div className={`w-32 h-32 rounded-[2rem] border transition-all duration-500 flex flex-col items-center justify-center gap-2 ${activeAgent === 'auditor' || activeAgent === 'ZTA_Validator_Agent' ? 'bg-emerald-500/20 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)] scale-110' : 'bg-white/5 border-white/5 opacity-40'}`}>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-[10px] font-mono uppercase text-zinc-400">ZTA_Audit</span>
              </div>

              {/* Storage Node */}
              <div className={`w-32 h-32 rounded-[2rem] border transition-all duration-500 flex flex-col items-center justify-center gap-2 ${activeAgent === 'Git_Automator_Agent' || activeAgent === 'Lead_Coder_Agent' ? 'bg-blue-500/20 border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.3)] scale-110' : 'bg-white/5 border-white/5 opacity-40'}`}>
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Database size={20} />
                </div>
                <span className="text-[10px] font-mono uppercase text-zinc-400">Artifact</span>
              </div>

            </div>
          </div>
        </div>

        {/* Live Logs (Real Data) */}
        <div className="rounded-[2.5rem] bg-black/40 border border-white/5 backdrop-blur-3xl p-6 flex flex-col overflow-hidden h-full max-h-[600px]">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-zinc-500" />
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Agent_Factory_Logs</h4>
            </div>
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
          </div>
          
          <div className="flex-1 space-y-4 font-mono text-[10px] overflow-y-auto pr-2 custom-scrollbar">
            {logs.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-zinc-700 italic space-y-4 opacity-50">
                <RotateCcw className="animate-spin" size={24} />
                <p>Initializing stream...</p>
              </div>
            )}
            {[...logs].reverse().map((log) => (
              <div key={log.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors space-y-2 group/log">
                <div className="flex justify-between">
                  <span className={`font-bold tracking-tighter ${log.type === 'SUCCESS' || log.type === 'OK' ? 'text-emerald-500' : 'text-indigo-400'}`}>[{log.type}]</span>
                  <span className="text-zinc-600 text-[9px]">{new Date(log.id).toLocaleTimeString()}</span>
                </div>
                <p className="text-zinc-400 leading-relaxed"><span className="text-zinc-500 font-bold group-hover/log:text-white transition-colors">{log.agent}:</span> {log.msg}</p>
              </div>
            ))}
            {logs.length > 0 && <div className="animate-pulse text-indigo-500 pt-2 font-bold tracking-tighter text-center">_LISTENING_FOR_EVENTS</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

const RotateCcw = ({ className, size }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
  </svg>
);

export default CommandCenter;
