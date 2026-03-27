import { create } from 'zustand';

export const useBusinessStore = create((set) => ({
  metrics: {
    costPerContact: 4.50,
    aiCostPerContact: 0.15,
    savings: 96.6,
    ttm: '40m',
    staffing: '1:8',
    selfHealing: 94.2
  },
  projections: [40, 70, 45, 90, 65, 80, 100],
  status: 'AWAITING_DEMO',

  updateMetrics: (newMetrics) => set((state) => ({
    metrics: { ...state.metrics, ...newMetrics }
  })),

  updateProjections: (newData) => set({ projections: newData }),
  
  setStatus: (newStatus) => set({ status: newStatus })
}));
