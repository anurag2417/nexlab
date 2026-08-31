import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { CodeEditor } from '../components/sandbox/CodeEditor';
import { Terminal } from '../components/sandbox/Terminal';
import { Controls } from '../components/sandbox/Controls';
import { LessonViewer } from '../components/sandbox/LessonViewer';
import { useSandbox } from '../hooks/useSandbox';
import { useCourseStore } from '../store/courseStore';

const Sandbox: React.FC = () => {
  const { sprintId } = useParams<{ sprintId: string }>();
  const { code, setCode, output, isRunning, executeCode, clearOutput } = useSandbox();
  const { currentSprint, fetchSprint, isLoading } = useCourseStore();

  useEffect(() => {
    if (sprintId) {
      fetchSprint(sprintId);
    }
  }, [sprintId]);

  useEffect(() => {
    if (currentSprint?.starterCode) {
      setCode(currentSprint.starterCode);
    }
  }, [currentSprint]);

  const handleRun = async () => {
    await executeCode({ code, sprintId });
  };

  const handleReset = () => {
    if (currentSprint?.starterCode) {
      setCode(currentSprint.starterCode);
    }
    clearOutput();
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-96 items-center justify-center">
          <p>Loading sprint...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!currentSprint) {
    return (
      <DashboardLayout>
        <div className="flex h-96 items-center justify-center">
          <p>Sprint not found</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-120px)] flex-col gap-4 lg:flex-row">
        {/* Left: Lesson */}
        <div className="flex-1 overflow-auto rounded-lg border border-gray-200 bg-white p-4 lg:w-1/2">
          <LessonViewer sprint={currentSprint} />
        </div>

        {/* Right: Code Editor + Terminal */}
        <div className="flex flex-1 flex-col gap-4 lg:w-1/2">
          <div className="flex-1 overflow-hidden rounded-lg border border-gray-200 bg-gray-900">
            <div className="flex items-center justify-between border-b border-gray-700 px-4 py-2">
              <span className="text-sm text-gray-400">main.py</span>
              <Controls
                onRun={handleRun}
                onReset={handleReset}
                isRunning={isRunning}
              />
            </div>
            <CodeEditor value={code} onChange={setCode} />
          </div>

          <div className="h-48 rounded-lg border border-gray-200 bg-black">
            <div className="flex items-center border-b border-gray-700 px-4 py-2">
              <span className="text-sm text-gray-400">Terminal</span>
            </div>
            <Terminal output={output} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Sandbox;