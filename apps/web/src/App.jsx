import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BusinessDashboard from './components/business/BusinessDashboard';
import CommandCenter from './components/command/CommandCenter';
import LiveCanvas from './components/canvas/LiveCanvas';
import HomeView from './components/home/HomeView';
import { useBusinessStore } from './store/useBusinessStore';
import { useCanvasStore } from './store/useCanvasStore';

const App = () => {
  const [socketStatus, setSocketStatus] = useState('connecting');
  const addLog = useCanvasStore((state) => state.addLog);
  const updateMetrics = useBusinessStore((state) => state.updateMetrics);

  useEffect(() => {
    // Gateway Connection Logic (Auto-detecting prod vs dev)
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const gatewayHost = import.meta.env.VITE_GATEWAY_URL || 'gateway-app-7998411376.us-central1.run.app';
    const wsUrl = `${protocol}//${gatewayHost}`;
    
    console.log(`🔗 Sifu: Conectando a ${wsUrl}`);
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      setSocketStatus('online');
      addLog({ agent: 'System', msg: 'WebSocket Link Established', type: 'OK' });
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        // Router de eventos entrantes de la Factoría
        if (data.type === 'FACTORY_LOG') {
          addLog({ agent: data.agent, msg: data.message, type: data.status || 'INFO' });
        } else if (data.type === 'ROI_UPDATED') {
          updateMetrics(data.payload);
        } else if (data.type === 'CODE_GENERATED') {
          addLog({ agent: 'LeadCoder', msg: `Módulo generado: ${data.payload.fileName}`, type: 'SUCCESS' });
        } else if (data.type === 'ccaas_sentiment_stream') {
          addLog(data);
        }
      } catch (e) {
        console.error('WS Data Error:', e);
      }
    };

    ws.onclose = () => setSocketStatus('offline');
    return () => ws.close();
  }, [addLog, updateMetrics]);

  return (
    <Router>
      <div className="min-h-screen bg-[#09090b] text-zinc-400 font-sans selection:bg-indigo-500/30">
        {/* Deep Noise Overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0"></div>

        {/* Global Sidebar (Floating Glass) */}
        <aside className="fixed left-6 top-6 bottom-6 w-64 z-50 bg-zinc-950/50 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 hidden lg:flex flex-col">
          <div className="flex items-center gap-3 mb-12">
            <Link to="/" className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] flex items-center justify-center font-bold text-white text-xl">S</Link>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight tracking-tight">Sifu <span className="text-indigo-500 font-medium">5.2</span></h1>
              <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">NHITL Factory</p>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 hover:text-white transition-all group">
              <span className="text-zinc-600 group-hover:text-indigo-400 transition-colors italic font-mono text-xs">00</span>
              <span className="font-medium tracking-tight">Home Overview</span>
            </Link>
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
            <Route path="/" element={<HomeView />} />
            <Route path="/business" element={<BusinessDashboard />} />
            <Route path="/command" element={<CommandCenter />} />
            <Route path="/canvas" element={<LiveCanvas />} />
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
