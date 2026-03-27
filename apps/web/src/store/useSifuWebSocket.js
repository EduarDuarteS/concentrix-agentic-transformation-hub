import { useEffect, useRef } from 'react';
import { useCanvasStore } from './useCanvasStore';

export function useSifuWebSocket() {
  const ws = useRef(null);

  useEffect(() => {
    // Conectar al Gateway Desplegado en Cloud Run
    const wsUrl = import.meta.env.VITE_WS_URL || 'wss://gateway-app-7998411376.us-central1.run.app';
    
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log('🔗 ZTA WebSocket Connected');
      useCanvasStore.getState().addLog({
        timestamp: Date.now(),
        type: 'SYSTEM_EVENT',
        payload: { message: '✅ Enlace Seguro con el Gateway WS Establecido.' }
      });
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // ⚡ TRANSIENT UPDATE (ZTA)
        // Mutamos el estado global de Zustand directamente saltando el React Tree.
        useCanvasStore.getState().addLog(data);
      } catch (err) {
        console.error('Payload WS corrupto:', err);
      }
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    ws.current.onclose = () => {
      console.warn('⛓️ ZTA WebSocket Disconnected');
      useCanvasStore.getState().addLog({
        timestamp: Date.now(),
        type: 'SYSTEM_EVENT',
        payload: { message: '❌ Enlace WS Caído. Esperando reconexión...' }
      });
    };

    return () => {
      ws.current?.close();
    };
  }, []);
}
