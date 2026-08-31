import { create } from 'zustand';

export const useSandboxStore = create((set, get) => ({
  code: '',
  output: '',
  isRunning: false,
  executionTime: null,
  error: null,
  history: [],
  isHistoryLoading: false,

  setCode: (code) => set({ code }),

  setOutput: (output) => set({ output }),

  executeCode: async (data) => {
    set({ isRunning: true, error: null, output: 'Running...' });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!data.code || data.code.trim() === '') {
        throw new Error('Please write some code first');
      }

      const mockOutput = `✅ Code executed successfully!\n\nOutput:\n${data.code.split('\n').slice(0, 3).join('\n')}`;
      
      set({
        output: mockOutput,
        executionTime: 0.5 + Math.random() * 0.5,
        isRunning: false,
        error: null,
      });
    } catch (error) {
      set({
        output: `❌ Error: ${error.message}`,
        isRunning: false,
        error: error.message,
      });
    }
  },

  clearOutput: () => set({ output: '', executionTime: null, error: null }),

  fetchHistory: async () => {
    set({ isHistoryLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockHistory = [
        { id: '1', code: 'print("Hello")', output: 'Hello', success: true, timestamp: new Date() },
        { id: '2', code: 'print("World")', output: 'World', success: true, timestamp: new Date() },
      ];
      set({ history: mockHistory, isHistoryLoading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch history',
        isHistoryLoading: false 
      });
    }
  },

  clearError: () => set({ error: null }),
}));