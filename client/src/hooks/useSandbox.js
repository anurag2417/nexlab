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
    savedCodes,
    setCode,
    setOutput,
    executeCode,
    clearOutput,
    saveCode,
    loadSavedCode,
    downloadCode,
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
    savedCodes,
    setCode,
    setOutput,
    executeCode,
    clearOutput,
    saveCode,
    loadSavedCode,
    downloadCode,
    fetchHistory,
    clearError,
  };
};

export default useSandbox;