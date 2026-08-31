import { useSandboxStore } from '../store/sandboxStore';

export const useSandbox = () => {
  const {
    code,
    output,
    isRunning,
    executionTime,
    error,
    history,
    isHistoryLoading,
    setCode,
    setOutput,
    executeCode,
    clearOutput,
    fetchHistory,
    clearError,
  } = useSandboxStore();

  return {
    code,
    output,
    isRunning,
    executionTime,
    error,
    history,
    isHistoryLoading,
    setCode,
    setOutput,
    executeCode,
    clearOutput,
    fetchHistory,
    clearError,
  };
};

export default useSandbox;