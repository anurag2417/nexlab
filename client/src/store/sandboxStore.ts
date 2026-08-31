import { create } from 'zustand';
import { sandboxAPI, CodeExecutionRequest } from '../api/sandbox';

interface ExecutionHistory {
  id: string;
  code: string;
  output: string;
  success: boolean;
  executionTime: number;
  timestamp: Date;
}

interface SandboxState {
  code: string;
  output: string;
  isRunning: boolean;
  executionTime: number | null;
  error: string | null;
  history: ExecutionHistory[];
  isHistoryLoading: boolean;

  setCode: (code: string) => void;
  setOutput: (output: string) => void;
  executeCode: (data: CodeExecutionRequest) => Promise<void>;
  clearOutput: () => void;
  fetchHistory: () => Promise<void>;
  clearError: () => void;
}

export const useSandboxStore = create<SandboxState>((set) => ({
  code: '',
  output: '',
  isRunning: false,
  executionTime: null,
  error: null,
  history: [],
  isHistoryLoading: false,

  setCode: (code: string) => set({ code }),

  setOutput: (output: string) => set({ output }),

  executeCode: async (data: CodeExecutionRequest) => {
    set({ isRunning: true, error: null, output: 'Running...' });
    try {
      const response = await sandboxAPI.executeCode(data);
      set({
        output: response.data.output,
        executionTime: response.data.executionTime,
        isRunning: false,
        error: response.data.error || null,
      });
    } catch (error: any) {
      set({
        output: error.response?.data?.message || 'Execution failed',
        isRunning: false,
        error: error.response?.data?.message || 'Execution failed',
      });
    }
  },

  clearOutput: () => set({ output: '', executionTime: null, error: null }),

  fetchHistory: async () => {
    set({ isHistoryLoading: true });
    try {
      const history = await sandboxAPI.getHistory();
      set({ history, isHistoryLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch history',
        isHistoryLoading: false 
      });
    }
  },

  clearError: () => set({ error: null }),
}));