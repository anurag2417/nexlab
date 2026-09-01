import React, { useRef, useEffect, useState } from 'react';
import { cn } from '../../utils/cn';
import { CheckCircle, XCircle, Clock, Eye } from 'lucide-react';

export const Terminal = ({ 
  output, 
  error = null, 
  isRunning = false,
  executionTime = null,
  isHtmlOutput = false,
  htmlContent = '',
  className 
}) => {
  const terminalRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (terminalRef.current && !isHtmlOutput) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output, error, isHtmlOutput]);

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

  const isPythonNotFound = error && (
    error.includes('Python not found') || 
    error.includes('python') ||
    error.includes('not installed')
  );

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
          {isHtmlOutput && (
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors bg-blue-950/30 px-2 py-0.5 rounded"
            >
              <Eye className="h-3 w-3" />
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
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
        
        {/* HTML Output Preview */}
        {isHtmlOutput && htmlContent && (
          <div className="space-y-3">
            <div className="text-green-400 font-semibold flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              HTML Rendered Successfully!
            </div>
            
            {showPreview ? (
              <div className="bg-white rounded-lg border border-gray-700/30 overflow-hidden">
                <div className="bg-gray-800 text-gray-400 text-xs px-3 py-1.5 border-b border-gray-700/30 flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500" />
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-yellow-500" />
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500" />
                  <span className="ml-2">Preview</span>
                </div>
                <div className="p-4 min-h-[100px]">
                  <iframe
                    srcDoc={htmlContent}
                    className="w-full min-h-[200px] border-0 bg-white"
                    sandbox="allow-scripts allow-modals"
                    title="HTML Preview"
                  />
                </div>
              </div>
            ) : (
              <div className="text-gray-400 text-sm bg-gray-800/30 p-3 rounded-lg border border-gray-700/30">
                <p>💡 Click "Show Preview" to see the rendered HTML</p>
                <p className="text-xs text-gray-500 mt-1">Your HTML code is ready to preview!</p>
              </div>
            )}
            
            {/* Show code snippet */}
            <div className="text-gray-500 text-xs">
              <span className="text-gray-600">📄 HTML code:</span>
              <pre className="text-gray-400 mt-1 bg-gray-800/30 p-2 rounded text-xs overflow-x-auto max-h-32">
                {htmlContent.slice(0, 500)}
                {htmlContent.length > 500 && '...'}
              </pre>
            </div>
          </div>
        )}
        
        {/* Python Output */}
        {output && !error && !isRunning && !isHtmlOutput && (
          <div className="space-y-1">
            <div className="text-green-400 font-semibold">✅ Output:</div>
            <pre className="text-gray-300 whitespace-pre-wrap bg-gray-800/30 p-3 rounded-lg border border-gray-700/30">
              {output}
            </pre>
          </div>
        )}
        
        {/* Error Output */}
        {error && isPythonNotFound && (
          <div className="space-y-2">
            <div className="text-red-400 font-semibold">❌ Python Not Available</div>
            <div className="text-yellow-400 text-sm bg-yellow-950/30 p-3 rounded-lg border border-yellow-800/30">
              <p className="mb-1">⚠️ Python is not installed on this server.</p>
              <p className="text-gray-400 text-xs mt-2">This is a mock execution environment. Your code is being simulated.</p>
            </div>
            <pre className="text-red-300 whitespace-pre-wrap bg-red-950/30 p-3 rounded-lg border border-red-800/30 text-xs">
              {error}
            </pre>
          </div>
        )}
        
        {error && !isPythonNotFound && !isHtmlOutput && (
          <div className="space-y-1">
            <div className="text-red-400 font-semibold">❌ Error:</div>
            <pre className="text-red-300 whitespace-pre-wrap bg-red-950/30 p-3 rounded-lg border border-red-800/30">
              {error}
            </pre>
          </div>
        )}
        
        {!output && !error && !isRunning && !isHtmlOutput && (
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