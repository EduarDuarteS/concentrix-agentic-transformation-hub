import React from 'react';

const KpiCard = ({ title, value, change, trend }) => (
  <div className="bg-zinc-900/40 border border-white/5 backdrop-blur-xl p-6 rounded-3xl">
    <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">{title}</p>
    <div className="flex justify-between items-end">
      <h3 className="text-3xl font-bold text-white tracking-tighter">{value}</h3>
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
        {change}
      </span>
    </div>
  </div>
);

const BusinessDashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold text-white tracking-tight">Strategic ROI</h2>
          <p className="text-zinc-500 mt-1">Financial impact and efficiency metrics for Concentrix CCaaS.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-2xl border border-indigo-500/20 text-xs font-bold uppercase tracking-widest">
            Phase: Pre-Sales
          </div>
        </div>
      </div>

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Cost per Contact" value="$0.15" change="-96.6%" trend="up" />
        <KpiCard title="Time-to-Market" value="40m" change="-99.8%" trend="up" />
        <KpiCard title="Staffing Ratio" value="1:8" change="+700%" trend="up" />
        <KpiCard title="Self-Healing rate" value="94.2%" change="Nominal" trend="up" />
      </div>

      {/* Detailed Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-900/20 border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-8">
          <div className="flex justify-between items-center mb-8">
            <h4 className="text-lg font-semibold text-white">Projected Savings (Annual)</h4>
            <span className="text-[10px] font-mono text-zinc-600">Source: Sifu_Summary_Agent</span>
          </div>
          {/* Simulated Chart Placeholder */}
          <div className="h-64 w-full flex items-end gap-2">
            {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-indigo-500/20 to-indigo-500/60 rounded-t-lg transition-all hover:to-indigo-400 cursor-pointer" style={{ height: `${h}%` }}></div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-mono text-zinc-600 uppercase tracking-widest px-2">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 backdrop-blur-3xl rounded-[2.5rem] p-8 flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Efficiency Verdict</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              La arquitectura EDA reduce la latencia de procesamiento en un <span className="text-indigo-400 font-bold">85%</span> comparado con modelos tradicionales bloqueantes.
            </p>
          </div>
          <div className="mt-8 space-y-4">
            <div className="flex justify-between text-xs mb-1 uppercase tracking-tighter">
              <span>Cloud Run Usage</span>
              <span className="text-zinc-500">Optimum</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[12%] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            </div>
            <p className="text-[10px] text-zinc-500 italic">"Serverless scaling prevents resource over-provisioning."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
