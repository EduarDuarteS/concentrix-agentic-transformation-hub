import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Componentes Mock (Skeleton) para la base
const BusinessDashboard = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-end">
      <div>
        <h2 className="text-3xl font-bold text-white tracking-tight">Business Dashboard</h2>
        <p className="text-zinc-500">Métricas de ROI y Eficiencia Operativa</p>
      </div>
      <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-mono border border-emerald-500/20">
        LIVE_DATA_STREAMING
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-48 rounded-2xl bg-zinc-900/50 border border-white/5 backdrop-blur-xl p-6 flex flex-col justify-center items-center">
          <div className="w-12 h-12 rounded-full bg-zinc-800 animate-pulse mb-4"></div>
          <p className="text-zinc-600 text-sm font-mono uppercase tracking-widest text-center">Awaiting Project Parameters</p>
        </div>
      ))}
    </div>
  </div>
);

const CommandCenter = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-white tracking-tight">Engineering Command Center</h2>
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 h-[600px] rounded-2xl bg-zinc-900/50 border border-white/5 backdrop-blur-xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm font-mono text-indigo-400">ARCH_TOPOLOGY_LIVE_TRACE</span>
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)] animate-pulse"></div>
          </div>
        </div>
        <div className="flex items-center justify-center h-full">
           <p className="text-zinc-700 font-mono italic">Initializing Mermaid Orchestrator...</p>
        </div>
      </div>
      <div className="h-[600px] rounded-2xl bg-black/40 border border-white/5 backdrop-blur-3xl p-4 overflow-y-auto">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Agent Factory Logs</h3>
        <div className="space-y-3 font-mono text-[11px]">
          <div className="text-zinc-400"><span className="text-emerald-500">[OK]</span> Gateway Protocol established.</div>
          <div className="text-zinc-400"><span className="text-indigo-500">[ZTA]</span> Validation layer active.</div>
          <div className="animate-pulse text-indigo-400">_Listening for voice transcripts...</div>
        </div>
      </div>
    </div>
  </div>
);

const LiveCanvas = () => (
  <div className="h-[calc(100vh-160px)] rounded-3xl bg-zinc-950 border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center p-12">
    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-zinc-800 to-zinc-700 mb-8 flex items-center justify-center opacity-50">
      <svg className="w-10 h-10 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
    <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Empty Canvas</h2>
    <p className="text-zinc-500 max-w-md">The factory is waiting for your VibeDesign export. Inject a requirement to start the autonomous assembly.</p>
  </div>
);

const App = () => {
  const [socketStatus, setSocketStatus] = useState('connecting');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000');
    ws.onopen = () => setSocketStatus('online');
    ws.onclose = () => setSocketStatus('offline');
    return () => ws.close();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-[#09090b] text-zinc-400 font-sans selection:bg-indigo-500/30">
        {/* Deep Noise Overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0"></div>

        {/* Global Sidebar (Floating Glass) */}
        <aside className="fixed left-6 top-6 bottom-6 w-64 z-50 bg-zinc-950/50 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 hidden lg:flex flex-col">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] flex items-center justify-center font-bold text-white text-xl">S</div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight tracking-tight">Sifu <span className="text-indigo-500 font-medium">5.2</span></h1>
              <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">NHITL Factory</p>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            <Link to="/business" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 hover:text-white transition-all group">
              <span className="text-zinc-600 group-hover:text-indigo-400 transition-colors italic font-mono text-xs">01</span>
              <span className="font-medium tracking-tight">Strategic ROI</span>
            </Link>
            <Link to="/command" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 hover:text-white transition-all group">
              <span className="text-zinc-600 group-hover:text-indigo-400 transition-colors italic font-mono text-xs">02</span>
              <span className="font-medium tracking-tight">Command Center</span>
            </Link>
            <Link to="/canvas" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 hover:text-white transition-all group">
              <span className="text-zinc-600 group-hover:text-indigo-400 transition-colors italic font-mono text-xs">03</span>
              <span className="font-medium tracking-tight">Live Canvas</span>
            </Link>
          </nav>

          <div className="mt-auto pt-6 border-t border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-2 h-2 rounded-full ${socketStatus === 'online' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse' : 'bg-rose-500'}`}></div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">{socketStatus} gateway</span>
            </div>
            <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
              <p className="text-[10px] text-zinc-500 leading-relaxed">
                <span className="text-indigo-400 font-bold">ZTA Active:</span> Desconfianza cero habilitada en todos los carriles de despliegue.
              </p>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="lg:pl-80 p-8 min-h-screen relative z-10">
          <Routes>
            <Route path="/business" element={<BusinessDashboard />} />
            <Route path="/command" element={<CommandCenter />} />
            <Route path="/canvas" element={<LiveCanvas />} />
            <Route path="/" element={<BusinessDashboard />} />
          </Routes>
        </main>

        {/* Floating Self-Healing Monitor */}
        <div className="fixed bottom-8 right-8 w-72 p-5 bg-zinc-950/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-2xl z-50">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping"></div>
              <span className="text-[10px] font-bold uppercase tracking-tighter text-indigo-400">Self-Healing Monitor</span>
            </div>
            <span className="text-[9px] font-mono text-zinc-600 uppercase">Resilience Engine v5.2</span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-[10px] text-zinc-500 uppercase font-medium">Bus Status</span>
              <span className="text-emerald-400 font-mono text-xs font-bold tracking-tighter shadow-emerald-500/20">NOMINAL_OVR</span>
            </div>
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full w-4/5 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[9px] font-mono text-zinc-500 leading-tight">
              [SYSTEM] Listening for events on 6379...
              <br/>[ZTA] Code verification PASS
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
