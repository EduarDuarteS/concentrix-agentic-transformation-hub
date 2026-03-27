import React, { useState, useEffect } from 'react';

const CommandCenter = () => {
  const [logs, setLogs] = useState([
    { id: 1, type: 'OK', agent: 'Gateway', msg: 'Protocol established on port 4000', time: '09:12:01' },
    { id: 2, type: 'ZTA', agent: 'Validator', msg: 'Zero Trust Architecture enabled', time: '09:12:05' },
    { id: 3, type: 'IA', agent: 'Orchestrator', msg: 'LangGraph State Machine online', time: '09:12:10' },
  ]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold text-white tracking-tight">Command Center</h2>
          <p className="text-zinc-500 mt-1">Operational observability and agent lifecycle monitoring.</p>
        </div>
        <div className="flex gap-3">
          <span className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-2xl border border-white/5 text-[10px] font-mono text-emerald-500 uppercase">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            Redis Bus: Connected
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Architecture Trace */}
        <div className="lg:col-span-3 aspect-video rounded-[2.5rem] bg-zinc-900/20 border border-white/5 backdrop-blur-3xl p-8 relative overflow-hidden group">
          <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
          
          <div className="flex justify-between items-center mb-8">
            <h4 className="text-lg font-semibold text-white">Live Architecture Trace</h4>
            <div className="flex gap-2">
              <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-mono text-zinc-500">
                MODE: AUTOMATION_ONLY
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center h-full">
            {/* Simulated Architecture Nodes */}
            <div className="relative flex gap-12">
              <div className="w-32 h-32 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex flex-col items-center justify-center gap-2 group-hover:scale-105 transition-transform">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">V</div>
                <span className="text-[10px] font-mono uppercase text-zinc-400">Voice_Input</span>
              </div>
              <div className="absolute top-1/2 left-32 w-12 h-px bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              <div className="w-32 h-32 rounded-3xl bg-purple-500/10 border border-purple-500/20 flex flex-col items-center justify-center gap-2 group-hover:scale-105 transition-transform delay-75">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">L</div>
                <span className="text-[10px] font-mono uppercase text-zinc-400">LangGraph</span>
              </div>
              <div className="absolute top-1/2 left-[11rem] w-12 h-px bg-gradient-to-r from-purple-500 to-emerald-500"></div>
              <div className="w-32 h-32 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center justify-center gap-2 group-hover:scale-105 transition-transform delay-150">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">G</div>
                <span className="text-[10px] font-mono uppercase text-zinc-400">GCP_Cloud_Run</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Logs */}
        <div className="rounded-[2.5rem] bg-black/40 border border-white/5 backdrop-blur-3xl p-6 flex flex-col overflow-hidden h-full">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Agent Factory Logs</h4>
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
          </div>
          <div className="flex-1 space-y-4 font-mono text-[10px] overflow-y-auto pr-2 custom-scrollbar">
            {logs.map((log) => (
              <div key={log.id} className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                <div className="flex justify-between">
                  <span className={`font-bold ${log.type === 'OK' ? 'text-emerald-500' : 'text-indigo-400'}`}>[{log.type}]</span>
                  <span className="text-zinc-600">{log.time}</span>
                </div>
                <p className="text-zinc-400 leading-relaxed"><span className="text-zinc-500">{log.agent}:</span> {log.msg}</p>
              </div>
            ))}
            <div className="animate-pulse text-indigo-500 pt-2 font-bold tracking-tighter">_Awaiting next event...</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;
