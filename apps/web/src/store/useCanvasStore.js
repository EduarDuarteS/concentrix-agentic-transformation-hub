import { create } from 'zustand';

export const useCanvasStore = create((set, get) => ({
  logs: [],
  activeStep: null,
  isFactoryRunning: false,
  
  // Transient subscribers (callbacks)
  subscribers: new Set(),

  addLog: (log) => {
    set((state) => ({
      logs: [...state.logs.slice(-49), { ...log, id: Date.now() }]
    }));
    // Notify transient subscribers for DOM-only updates if needed
    get().subscribers.forEach(cb => cb(log));
  },

  setActiveStep: (step) => set({ activeStep: step }),
  
  setFactoryStatus: (isRunning) => set({ isFactoryRunning: isRunning }),

  subscribeTransient: (callback) => {
    get().subscribers.add(callback);
    return () => get().subscribers.delete(callback);
  }
}));
