import React from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';

interface ControlsProps {
  onRun: () => void;
  onReset: () => void;
  isRunning: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  onRun,
  onReset,
  isRunning,
}) => {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onReset}
        className="border-gray-600 text-gray-400 hover:bg-gray-800"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        onClick={onRun}
        disabled={isRunning}
        className="bg-green-600 hover:bg-green-700"
      >
        <Play className="mr-1 h-4 w-4" />
        {isRunning ? 'Running...' : 'Run'}
      </Button>
    </div>
  );
};