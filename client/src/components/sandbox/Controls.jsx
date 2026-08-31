import React from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';

export const Controls = ({ onRun, onReset, isRunning }) => {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onReset}
        className="border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        onClick={onRun}
        disabled={isRunning}
        className="bg-green-600 hover:bg-green-700 text-white"
      >
        <Play className="mr-1 h-4 w-4" />
        {isRunning ? 'Running...' : 'Run'}
      </Button>
    </div>
  );
};

export default Controls;