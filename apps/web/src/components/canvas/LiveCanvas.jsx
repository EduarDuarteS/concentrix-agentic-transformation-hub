import React, { useState } from 'react';
import { useCanvasStore } from '../../store/useCanvasStore';
import { useBusinessStore } from '../../store/useBusinessStore';
import { Code2, Play, CheckCircle2, RotateCcw } from 'lucide-react';

const LiveCanvas = () => {
  const { logs } = useCanvasStore();
  const { setStatus } = useBusinessStore();
  const [activeCode, setActiveCode] = useState(null);

  // Buscar el último código generado en los logs
  const lastCodeGen = [...logs].reverse().find(l => l.msg.includes('Módulo generado') || l.type === 'SUCCESS' && l.agent === 'LeadCoder');

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold text-white tracking-tight">Live Canvas</h2>
          <p className="text-zinc-500 mt-1">Real-time code generation and autonomous assembly.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20">
            <Play size={18} />
            Run Factory
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Viewer Panel */}
        <div className="rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-3xl p-8 min-h-[500px] flex flex-col relative overflow-hidden group">
          <div className="absolute inset-0 opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <div className="flex items-center gap-2">
              <Code2 size={16} className="text-indigo-400" />
              <h4 className="text-sm font-mono text-zinc-400 uppercase tracking-widest">Autonomous_JSX_Stream</h4>
            </div>
            <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
              STABLE_V5.2
            </div>
          </div>

          <div className="flex-1 bg-black/20 rounded-2xl p-6 font-mono text-sm text-zinc-500 overflow-auto relative z-10 border border-white/5">
            {lastCodeGen ? (
              <pre className="text-indigo-300">
                <code>{`// NHITL Factory Output\n// Hash: ${Math.random().toString(16).slice(2, 10)}\n\nimport React from 'react';\n\nconst GeneratedComponent = () => {\n  return (\n    <div className="p-8 bg-zinc-900 rounded-3xl border border-white/5">\n      <h1 className="text-white">Concentrix AI Automation</h1>\n      <p>Automated deployment successful.</p>\n    </div>\n  );\n};\n\nexport default GeneratedComponent;`}</code>
              </pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                <RotateCcw className="animate-spin mb-4" size={32} />
                <p>Waiting for requirements...<br/>Start audio capture to trigger the factory.</p>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-between items-center relative z-10">
            <p className="text-[10px] text-zinc-600 italic">"ZTA: Validation Layer Passed"</p>
            <div className="flex gap-2">
              <button className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-zinc-400">
                <RotateCcw size={16} />
              </button>
              <button className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2 hover:bg-emerald-500/20 transition-all">
                <CheckCircle2 size={14} />
                Approve & Deploy
              </button>
            </div>
          </div>
        </div>

        {/* Visual Preview / Simulation */}
        <div className="rounded-[2.5rem] bg-indigo-500/5 border-2 border-dashed border-indigo-500/20 flex flex-col items-center justify-center p-12 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-50"></div>
          
          {lastCodeGen ? (
            <div className="relative z-10 animate-in zoom-in-90 duration-500">
               <div className="w-full max-w-sm p-8 bg-zinc-950 rounded-[2rem] border border-white/10 shadow-2xl">
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-xl mb-6 flex items-center justify-center text-indigo-400 font-bold text-xl">C</div>
                  <h3 className="text-white text-xl font-bold mb-2">CCaaS Assistant</h3>
                  <p className="text-zinc-500 text-sm mb-6">Agentic UI deployed via NHITL Factory.</p>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-2/3"></div>
                  </div>
               </div>
               <p className="mt-8 text-xs font-mono text-indigo-400 animate-pulse">RENDER_SUCCESS: READY_FOR_CX_VALIDATION</p>
            </div>
          ) : (
            <>
              <div className="w-20 h-20 rounded-3xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></div>
              </div>
              <h3 className="text-white text-xl font-bold mb-2 tracking-tight">Visual Sandbox</h3>
              <p className="text-zinc-500 max-w-xs leading-relaxed">
                El componente se renderizará aquí automáticamente tras pasar la auditoría de seguridad.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveCanvas;
