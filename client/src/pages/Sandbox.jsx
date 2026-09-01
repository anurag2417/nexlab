import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../layout/DashboardLayout';
import { CodeEditor } from '../components/sandbox/CodeEditor';
import { Terminal } from '../components/sandbox/Terminal';
import { Controls } from '../components/sandbox/Controls';
import { LessonViewer } from '../components/sandbox/LessonViewer';
import { useSandbox } from '../hooks/useSandbox';
import { useCourseStore } from '../store/courseStore';
import { useAuthStore } from '../store/authStore';
import { useToast } from '../components/ui/Toast';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ArrowLeft, CheckCircle, Loader2, Sparkles, Menu, X, Maximize2, Minimize2, Play } from 'lucide-react';
import { cn } from '../utils/cn';

const Sandbox = () => {
  const { sprintId } = useParams();
  const navigate = useNavigate();
  const { user, getCurrentUser } = useAuthStore();
  const { 
    code, 
    setCode, 
    output, 
    isRunning, 
    error,
    executionTime,
    executeCode, 
    clearOutput,
    saveCode,
    loadSavedCode,
    downloadCode,
    isHtmlOutput,
    htmlContent,
    setHtmlContent,
  } = useSandbox();
  const { currentSprint, fetchSprint, isLoading, markSprintComplete, progress } = useCourseStore();
  const { addToast } = useToast();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showLesson, setShowLesson] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoPreview, setAutoPreview] = useState(true);
  const previewTimeout = useRef(null);

  useEffect(() => {
    if (sprintId) {
      fetchSprint(sprintId);
      loadSavedCode(sprintId);
    }
  }, [sprintId, fetchSprint, loadSavedCode]);

  useEffect(() => {
    if (currentSprint?.starterCode && !code) {
      setCode(currentSprint.starterCode);
    }
  }, [currentSprint, code, setCode]);

  useEffect(() => {
    if (progress?.completedSprints?.includes(sprintId)) {
      setIsCompleted(true);
    }
  }, [progress, sprintId]);

  // Auto-preview for HTML/CSS/JS code
  useEffect(() => {
    if (!autoPreview) return;
    
    // Clear previous timeout
    if (previewTimeout.current) {
      clearTimeout(previewTimeout.current);
    }

    // Debounce preview update
    previewTimeout.current = setTimeout(() => {
      const isWebCode = code && (
        code.includes('<!DOCTYPE html>') || 
        code.includes('<html') ||
        code.includes('<style') ||
        code.includes('<script') ||
        code.includes('<body') ||
        code.includes('<div') ||
        code.includes('<button') ||
        code.includes('<input') ||
        code.includes('<form') ||
        code.includes('<table') ||
        code.includes('<ul') ||
        code.includes('<ol') ||
        code.includes('<span') ||
        code.includes('<a href') ||
        code.includes('document.querySelector') ||
        code.includes('addEventListener') ||
        code.includes('console.log') ||
        code.includes('alert(')
      );

      if (isWebCode && code.trim() !== '') {
        let htmlContent = code;
        if (!code.includes('<!DOCTYPE html>') && !code.includes('<html>')) {
          htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Preview</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: #ffffff;
            color: #333333;
            line-height: 1.6;
        }
        * { box-sizing: border-box; }
        .container { max-width: 1200px; margin: 0 auto; }
    </style>
</head>
<body>
    ${code}
</body>
</html>`;
        }
        setHtmlContent(htmlContent);
      }
    }, 500);

    return () => {
      if (previewTimeout.current) {
        clearTimeout(previewTimeout.current);
      }
    };
  }, [code, autoPreview, setHtmlContent]);

  // Detect code language
  const getLanguage = () => {
    if (isHtmlOutput) return 'html';
    if (code.includes('<!DOCTYPE html>') || 
        code.includes('<html') || 
        code.includes('<style') || 
        code.includes('<script') ||
        code.includes('<body') ||
        code.includes('<div') ||
        code.includes('<button')) {
      return 'html';
    }
    return 'python';
  };

  // Detect if code is web-based
  const isWebCode = code && (
    code.includes('<!DOCTYPE html>') || 
    code.includes('<html') ||
    code.includes('<style') ||
    code.includes('<script') ||
    code.includes('<body') ||
    code.includes('<div') ||
    code.includes('<button') ||
    code.includes('<input') ||
    code.includes('<form') ||
    code.includes('<table') ||
    code.includes('<ul') ||
    code.includes('<ol') ||
    code.includes('<span') ||
    code.includes('<a href') ||
    code.includes('document.querySelector') ||
    code.includes('addEventListener') ||
    code.includes('console.log') ||
    code.includes('alert(')
  );

  const handleRun = async () => {
    if (!code || code.trim() === '') {
      addToast('Please write some code first', 'warning');
      return;
    }
    
    clearOutput();
    
    // If it's web code, just show the preview
    if (isWebCode) {
      let htmlContent = code;
      if (!code.includes('<!DOCTYPE html>') && !code.includes('<html>')) {
        htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Preview</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: #ffffff;
            color: #333333;
            line-height: 1.6;
        }
        * { box-sizing: border-box; }
        .container { max-width: 1200px; margin: 0 auto; }
    </style>
</head>
<body>
    ${code}
</body>
</html>`;
      }
      setHtmlContent(htmlContent);
      addToast('🌐 Web page preview updated!', 'success');
      return;
    }

    // For Python code, execute normally
    const result = await executeCode({ 
      code, 
      sprintId,
      userId: user?.id 
    });
    
    if (result?.success) {
      addToast('✅ Code executed successfully!', 'success');
    } else if (result?.error) {
      addToast('❌ Code execution failed', 'error');
    }
  };

  const handleReset = () => {
    if (currentSprint?.starterCode) {
      setCode(currentSprint.starterCode);
      clearOutput();
      addToast('🔄 Reset to starter code', 'info');
    }
  };

  const handleSave = async () => {
    if (!code || code.trim() === '') {
      addToast('Nothing to save. Write some code first.', 'warning');
      return;
    }
    
    await saveCode(sprintId, code);
    addToast('💾 Code saved successfully!', 'success');
  };

  const handleDownload = () => {
    if (!code || code.trim() === '') {
      addToast('Nothing to download. Write some code first.', 'warning');
      return;
    }
    
    downloadCode(code, `sprint_${sprintId}`);
    addToast('📥 Code downloaded!', 'success');
  };

  const handleMarkComplete = async () => {
    if (isCompleted) {
      addToast('✅ Sprint already completed!', 'info');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await markSprintComplete(sprintId);
      setIsCompleted(true);
      addToast('🎉 Sprint completed! +50 XP!', 'success');
      await getCurrentUser();
      
      setTimeout(() => {
        navigate('/courses');
      }, 2000);
    } catch (error) {
      addToast('Failed to mark sprint as complete', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShowHint = () => {
    setShowHint(!showHint);
  };

  const toggleLesson = () => {
    setShowLesson(!showLesson);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleAutoPreview = () => {
    setAutoPreview(!autoPreview);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-[calc(100vh-200px)] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-[#588157]" />
            <p className="text-[#344E41]/60">Loading sprint...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!currentSprint) {
    return (
      <DashboardLayout>
        <div className="flex h-[calc(100vh-200px)] flex-col items-center justify-center gap-4">
          <p className="text-[#344E41]/60 text-lg">Sprint not found</p>
          <Button onClick={() => navigate('/courses')} className="gradient-button">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className={cn(
        "space-y-3 w-full px-0",
        isFullscreen && "fixed inset-0 z-50 bg-[#1a1a2e] p-4 overflow-hidden"
      )}>
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            {!isFullscreen && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/courses')}
                className="text-[#344E41]/60 hover:text-[#588157]"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            )}
            {!isFullscreen && (
              <h1 className="text-base font-bold text-[#3A5A40]">{currentSprint.title}</h1>
            )}
            {isCompleted && !isFullscreen && (
              <Badge variant="success" className="bg-green-100 text-green-700 border-green-200 text-xs">
                <CheckCircle className="mr-1 h-3 w-3" />
                Completed
              </Badge>
            )}
            {!isFullscreen && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLesson}
                className="text-[#344E41]/60 hover:text-[#588157] text-xs"
              >
                {showLesson ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="text-[#344E41]/60 hover:text-[#588157] text-xs"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            {isWebCode && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleAutoPreview}
                className={cn(
                  "text-xs",
                  autoPreview ? "text-green-500" : "text-gray-400"
                )}
              >
                {autoPreview ? '🔴 Live' : '⏸️ Paused'}
              </Button>
            )}
          </div>
          {!isFullscreen && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRun}
                className="border-[#588157] text-[#588157] hover:bg-[#588157] hover:text-white text-xs h-8"
              >
                <Play className="h-3 w-3 mr-1" />
                Run
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="border-[#DAD7CD] text-[#344E41]/60 hover:bg-[#DAD7CD]/20 text-xs h-8"
              >
                Reset
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleMarkComplete}
                disabled={isSubmitting || isCompleted}
                className={cn(
                  isCompleted 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'gradient-button',
                  'text-xs h-8'
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                    Submitting...
                  </>
                ) : isCompleted ? (
                  '✅ Completed'
                ) : (
                  <>
                    <Sparkles className="mr-1 h-3 w-3" />
                    Complete
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Main Content - Full Width */}
        <div className={cn(
          "flex h-[calc(100vh-180px)] flex-col gap-3 lg:flex-row w-full",
          isFullscreen && "h-[calc(100vh-100px)]"
        )}>
          {/* Left: Lesson - Toggleable */}
          {showLesson && !isFullscreen && (
            <div className="overflow-auto rounded-lg border border-[#DAD7CD]/30 bg-white p-3 lg:w-[35%] xl:w-[30%]">
              <LessonViewer sprint={currentSprint} isCompleted={isCompleted} />
            </div>
          )}

          {/* Right: Code Editor + Terminal - Takes remaining width */}
          <div className={cn(
            "flex flex-1 flex-col gap-3",
            !showLesson && "w-full",
            isFullscreen && "h-full"
          )}>
            <div className="flex flex-wrap items-center justify-between gap-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-[#344E41]/60 font-mono">
                  {isWebCode || isHtmlOutput ? 'index.html' : 'main.py'}
                </span>
                {executionTime && (
                  <span className="text-[10px] text-[#344E41]/40">
                    ⚡ {executionTime.toFixed(2)}s
                  </span>
                )}
                <Badge variant="outline" className="text-[10px] border-[#A3B18A] text-[#A3B18A] py-0 px-1.5">
                  {isWebCode || isHtmlOutput ? 'HTML/CSS/JS' : 'Python 3.9'}
                </Badge>
                {isHtmlOutput && (
                  <Badge variant="outline" className="text-[10px] border-blue-400 text-blue-400 py-0 px-1.5">
                    🌐 Live
                  </Badge>
                )}
                {isWebCode && autoPreview && (
                  <Badge variant="outline" className="text-[10px] border-green-400 text-green-400 py-0 px-1.5 animate-pulse">
                    🔴 Live Preview
                  </Badge>
                )}
              </div>
              <Controls
                onRun={handleRun}
                onReset={handleReset}
                onSave={handleSave}
                onDownload={handleDownload}
                onHint={handleShowHint}
                isRunning={isRunning}
                hasCode={code && code.trim() !== ''}
              />
            </div>

            {showHint && currentSprint.hint && (
              <div className="rounded-lg border border-[#DAD7CD]/30 bg-[#DAD7CD]/10 p-1.5 text-xs text-[#344E41]/70">
                💡 <span className="font-medium">Hint:</span> {currentSprint.hint}
              </div>
            )}

            <div className={cn(
              "flex-1 min-h-[200px] overflow-hidden rounded-lg border border-[#DAD7CD]/30 bg-[#1a1a2e]",
              isFullscreen && "min-h-[300px]"
            )}>
              <CodeEditor 
                value={code} 
                onChange={setCode}
                language={getLanguage()}
                theme="vs-dark"
                height="100%"
              />
            </div>

            <div className={cn(
              "rounded-lg border border-[#DAD7CD]/30 overflow-hidden",
              isFullscreen ? "h-[40%]" : "h-48"
            )}>
              <Terminal 
                output={output} 
                error={error}
                isRunning={isRunning}
                executionTime={executionTime}
                isHtmlOutput={isHtmlOutput || isWebCode}
                htmlContent={htmlContent || code}
                autoPreview={autoPreview}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Sandbox;