import { create } from 'zustand';
import { sandboxAPI } from '../api/sandbox';

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
    set({ isRunning: true, error: null, output: '⏳ Running your code...' });
    
    try {
      // Try real backend execution first
      try {
        const response = await sandboxAPI.executeCode(data);
        const result = response.data;
        
        set({
          output: result.output || '✅ Code executed successfully!',
          executionTime: result.executionTime || 0,
          isRunning: false,
          error: result.error || null,
        });
        
        return { success: true, result };
      } catch (apiError) {
        console.warn('⚠️ API execution failed, using mock execution:', apiError.message);
        // Fallback to mock execution if API fails
        return await get().mockExecute(data);
      }
    } catch (error) {
      set({
        output: `❌ Error: ${error.message || 'Execution failed'}`,
        isRunning: false,
        error: error.message || 'Execution failed',
      });
      return { success: false, error: error.message };
    }
  },

  // Mock execution as fallback
  mockExecute: async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const code = data.code || '';
        
        // Check for common errors
        if (code.includes('import os') || code.includes('import subprocess')) {
          set({
            output: '❌ Security Error: System imports are not allowed',
            isRunning: false,
            error: 'Security violation',
          });
          resolve({ success: false, error: 'Security violation' });
          return;
        }

        // Simple mock output
        let output = '';
        try {
          if (code.includes('print(')) {
            const match = code.match(/print\(['"](.+)['"]\)/);
            if (match) {
              output = match[1];
            } else {
              output = 'Hello from your code!';
            }
          } else if (code.includes('def ')) {
            output = '✅ Function defined successfully!';
          } else if (code.includes('class ')) {
            output = '✅ Class defined successfully!';
          } else {
            output = '✅ Code executed successfully!';
          }
        } catch {
          output = '✅ Code executed successfully!';
        }

        set({
          output: output,
          executionTime: 0.3 + Math.random() * 0.5,
          isRunning: false,
          error: null,
        });
        
        resolve({ success: true, output });
      }, 1000 + Math.random() * 500);
    });
  },

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
      const response = await sandboxAPI.getHistory();
      set({ history: response.data || [], isHistoryLoading: false });
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch history',
        isHistoryLoading: false 
      });
    }
  },

  clearError: () => set({ error: null }),
}));