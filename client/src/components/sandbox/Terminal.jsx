import React, { useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';

export const Terminal = ({ 
  output, 
  error = null, 
  isRunning = false,
  executionTime = null,
  className 
}) => {
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output, error]);

  const getStatusIcon = () => {
    if (isRunning) return <Clock className="h-4 w-4 text-yellow-400 animate-pulse" />;
    if (error) return <XCircle className="h-4 w-4 text-red-400" />;
    if (output) return <CheckCircle className="h-4 w-4 text-green-400" />;
    return null;
  };

  const getStatusText = () => {
    if (isRunning) return 'Running...';
    if (error) return 'Error';
    if (output) return 'Output';
    return 'Ready';
  };

  const getStatusColor = () => {
    if (isRunning) return 'text-yellow-400';
    if (error) return 'text-red-400';
    if (output) return 'text-green-400';
    return 'text-gray-500';
  };

  return (
    <div className={cn('flex flex-col h-full bg-[#1a1a2e]', className)}>
      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-gray-700/50 px-4 py-2 bg-[#16213e]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-gray-400">Terminal</span>
          <span className="text-xs text-gray-600">|</span>
          <span className={`text-xs font-mono flex items-center gap-1.5 ${getStatusColor()}`}>
            {getStatusIcon()}
            {getStatusText()}
          </span>
          {executionTime && (
            <span className="text-xs text-gray-500 font-mono">
              ⚡ {executionTime.toFixed(2)}s
            </span>
          )}
        </div>
        <button
          onClick={() => {
            // Clear terminal logic handled by parent
          }}
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Terminal Body */}
      <div 
        ref={terminalRef}
        className="flex-1 overflow-auto p-4 font-mono text-sm"
      >
        {isRunning && (
          <div className="flex items-center gap-2 text-yellow-400 animate-pulse">
            <span className="inline-block h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
            <span>Running your code...</span>
          </div>
        )}
        
        {error && (
          <div className="space-y-1">
            <div className="text-red-400 font-semibold">❌ Error:</div>
            <pre className="text-red-300 whitespace-pre-wrap bg-red-950/30 p-3 rounded-lg border border-red-800/30">
              {error}
            </pre>
          </div>
        )}
        
        {output && !error && !isRunning && (
          <div className="space-y-1">
            <div className="text-green-400 font-semibold">✅ Output:</div>
            <pre className="text-gray-300 whitespace-pre-wrap bg-gray-800/30 p-3 rounded-lg border border-gray-700/30">
              {output}
            </pre>
          </div>
        )}
        
        {!output && !error && !isRunning && (
          <div className="text-gray-500 italic flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-gray-500" />
            Ready to run your code...
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;