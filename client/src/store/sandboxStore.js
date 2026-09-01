import { create } from 'zustand';

export const useSandboxStore = create((set, get) => ({
  code: '',
  output: '',
  isRunning: false,
  executionTime: null,
  error: null,
  history: [],
  isHistoryLoading: false,
  savedCodes: {},

  setCode: (code) => set({ code }),

  setOutput: (output) => set({ output }),

  clearOutput: () => set({ output: '', error: null, executionTime: null }),

  executeCode: async (data) => {
    set({ isRunning: true, error: null, output: 'Running...' });
    
    try {
      // Mock execution for now (backend integration later)
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
      
      return { success: true };
    } catch (error) {
      set({
        output: `❌ Error: ${error.message}`,
        isRunning: false,
        error: error.message,
      });
      return { success: false, error: error.message };
    }
  },

  // Save code to localStorage
  saveCode: (sprintId, code) => {
    try {
      const savedCodes = get().savedCodes;
      const updated = { ...savedCodes, [sprintId]: code };
      localStorage.setItem('nexlab_saved_codes', JSON.stringify(updated));
      set({ savedCodes: updated });
      return { success: true };
    } catch (error) {
      console.error('Failed to save code:', error);
      return { success: false, error };
    }
  },

  // Load saved code from localStorage - FIXED
  loadSavedCode: (sprintId) => {
    try {
      const saved = localStorage.getItem('nexlab_saved_codes');
      if (saved) {
        const savedCodes = JSON.parse(saved);
        set({ savedCodes });
        const code = savedCodes[sprintId] || '';
        set({ code });
        return code;
      }
    } catch (error) {
      console.error('Failed to load saved code:', error);
    }
    return '';
  },

  // Download code as file
  downloadCode: (code, filename = 'script.py') => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

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
        error: error.message || 'Failed to fetch history',
        isHistoryLoading: false 
      });
    }
  },

  clearError: () => set({ error: null }),
}));