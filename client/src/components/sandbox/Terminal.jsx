import React, { useRef, useEffect, useState } from 'react';
import { cn } from '../../utils/cn';
import { CheckCircle, XCircle, Clock, Eye, Maximize2, Minimize2 } from 'lucide-react';

export const Terminal = ({ 
  output, 
  error = null, 
  isRunning = false,
  executionTime = null,
  isHtmlOutput = false,
  htmlContent = '',
  autoPreview = true,
  className 
}) => {
  const terminalRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Auto-show preview for web code
  useEffect(() => {
    if (isHtmlOutput && htmlContent && autoPreview) {
      setShowPreview(true);
    }
  }, [isHtmlOutput, htmlContent, autoPreview]);

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

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={cn(
      'flex flex-col h-full bg-[#1a1a2e]',
      isFullscreen && 'fixed inset-0 z-50 rounded-none',
      className
    )}>
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
        <div className="flex items-center gap-2">
          {isHtmlOutput && (
            <>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors bg-blue-950/30 px-2 py-0.5 rounded"
              >
                <Eye className="h-3 w-3" />
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
              <button
                onClick={toggleFullscreen}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-300 transition-colors bg-gray-800/30 px-2 py-0.5 rounded"
              >
                {isFullscreen ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
              </button>
            </>
          )}
          <button
            onClick={() => {
              // Clear terminal logic handled by parent
            }}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={terminalRef}
        className={cn(
          'flex-1 overflow-auto p-4 font-mono text-sm',
          isHtmlOutput && showPreview && 'p-0'
        )}
      >
        {isRunning && (
          <div className="flex items-center gap-2 text-yellow-400 animate-pulse">
            <span className="inline-block h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
            <span>Running your code...</span>
          </div>
        )}
        
        {/* HTML/CSS/JS Output Preview */}
        {isHtmlOutput && htmlContent && (
          <div className={cn(
            'space-y-3',
            showPreview && 'w-full h-full'
          )}>
            {!showPreview && (
              <div className="text-green-400 font-semibold flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Web Page Rendered Successfully!
              </div>
            )}
            
            {showPreview ? (
              <div className={cn(
                'bg-white rounded-lg border border-gray-700/30 overflow-hidden',
                isFullscreen && 'rounded-none h-full'
              )}>
                <div className="bg-gray-800 text-gray-400 text-xs px-3 py-1.5 border-b border-gray-700/30 flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500" />
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-yellow-500" />
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500" />
                  <span className="ml-2">Live Preview</span>
                  <span className="ml-auto text-gray-500 text-[10px]">HTML • CSS • JS</span>
                </div>
                <div className={cn(
                  'p-0',
                  isFullscreen ? 'h-[calc(100vh-120px)]' : 'min-h-[200px]'
                )}>
                  <iframe
                    srcDoc={htmlContent}
                    className="w-full h-full min-h-[200px] border-0 bg-white"
                    sandbox="allow-scripts allow-modals allow-same-origin"
                    title="Web Preview"
                  />
                </div>
              </div>
            ) : (
              <div className="text-gray-400 text-sm bg-gray-800/30 p-3 rounded-lg border border-gray-700/30">
                <p>💡 Click "Show Preview" to see your web page</p>
                <p className="text-xs text-gray-500 mt-1">Your HTML/CSS/JS code is ready to preview!</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="text-[10px] bg-blue-950/30 text-blue-400 px-2 py-0.5 rounded">HTML</span>
                  <span className="text-[10px] bg-purple-950/30 text-purple-400 px-2 py-0.5 rounded">CSS</span>
                  <span className="text-[10px] bg-yellow-950/30 text-yellow-400 px-2 py-0.5 rounded">JavaScript</span>
                </div>
              </div>
            )}
            
            {/* Show code snippet when not in preview */}
            {!showPreview && (
              <div className="text-gray-500 text-xs">
                <span className="text-gray-600">📄 Code preview:</span>
                <pre className="text-gray-400 mt-1 bg-gray-800/30 p-2 rounded text-xs overflow-x-auto max-h-32">
                  {htmlContent.slice(0, 300)}
                  {htmlContent.length > 300 && '...'}
                </pre>
              </div>
            )}
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
        {error && (
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