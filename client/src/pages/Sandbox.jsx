import React, { useEffect, useState } from 'react';
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
import { ArrowLeft, CheckCircle, Loader2, Sparkles } from 'lucide-react';
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
  } = useSandbox();
  const { currentSprint, fetchSprint, isLoading, markSprintComplete, progress } = useCourseStore();
  const { addToast } = useToast();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (sprintId) {
      fetchSprint(sprintId);
      loadSavedCode(sprintId);
    }
  }, [sprintId]);

  useEffect(() => {
    if (currentSprint?.starterCode && !code) {
      setCode(currentSprint.starterCode);
    }
  }, [currentSprint]);

  useEffect(() => {
    if (progress?.completedSprints?.includes(sprintId)) {
      setIsCompleted(true);
    }
  }, [progress, sprintId]);

  const handleRun = async () => {
    if (!code || code.trim() === '') {
      addToast('Please write some code first', 'warning');
      return;
    }
    
    clearOutput();
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
    
    downloadCode(code, `sprint_${sprintId}.py`);
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
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/courses')}
              className="text-[#344E41]/60 hover:text-[#588157]"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <h1 className="text-xl font-bold text-[#3A5A40]">{currentSprint.title}</h1>
            {isCompleted && (
              <Badge variant="success" className="bg-green-100 text-green-700 border-green-200">
                <CheckCircle className="mr-1 h-3 w-3" />
                Completed
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#344E41]/60">
              +50 XP
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="border-[#DAD7CD] text-[#344E41]/60 hover:bg-[#DAD7CD]/20"
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
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'gradient-button'
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : isCompleted ? (
                '✅ Completed'
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Mark Complete
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="flex h-[calc(100vh-200px)] flex-col gap-4 lg:flex-row">
          <div className="flex-1 overflow-auto rounded-lg border border-[#DAD7CD]/30 bg-white p-4 lg:w-1/2">
            <LessonViewer sprint={currentSprint} isCompleted={isCompleted} />
          </div>

          <div className="flex flex-1 flex-col gap-4 lg:w-1/2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#344E41]/60 font-mono">main.py</span>
                {executionTime && (
                  <span className="text-xs text-[#344E41]/40">
                    ⚡ {executionTime.toFixed(2)}s
                  </span>
                )}
                <Badge variant="outline" className="text-xs border-[#A3B18A] text-[#A3B18A]">
                  Python 3.9
                </Badge>
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
              <div className="rounded-lg border border-[#DAD7CD]/30 bg-[#DAD7CD]/10 p-3 text-sm text-[#344E41]/70">
                💡 <span className="font-medium">Hint:</span> {currentSprint.hint}
              </div>
            )}

            <div className="flex-1 overflow-hidden rounded-lg border border-[#DAD7CD]/30 bg-[#344E41]">
              <CodeEditor 
                value={code} 
                onChange={setCode}
                language="python"
                theme="vs-dark"
                height="100%"
              />
            </div>

            <div className="h-40 rounded-lg border border-[#DAD7CD]/30 bg-[#344E41] overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#DAD7CD]/10 px-4 py-2">
                <span className="text-sm text-[#DAD7CD]/60 font-mono">Terminal</span>
                <button
                  onClick={clearOutput}
                  className="text-xs text-[#DAD7CD]/40 hover:text-[#DAD7CD]/80 transition-colors"
                >
                  Clear
                </button>
              </div>
              <Terminal 
                output={output} 
                error={error}
                isRunning={isRunning}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Sandbox;