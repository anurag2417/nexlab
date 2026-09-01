import React from 'react';
import { Play, RotateCcw, Save, Download, Lightbulb } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

export const Controls = ({ 
  onRun, 
  onReset, 
  onSave,
  onDownload,
  onHint,
  isRunning,
  hasCode,
  className 
}) => {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={onReset}
        className="border-[#DAD7CD]/30 text-[#344E41]/60 hover:bg-[#DAD7CD]/20"
        title="Reset to starter code"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onSave}
        disabled={!hasCode}
        className="border-[#DAD7CD]/30 text-[#344E41]/60 hover:bg-[#DAD7CD]/20 disabled:opacity-50"
        title="Save code"
      >
        <Save className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onDownload}
        disabled={!hasCode}
        className="border-[#DAD7CD]/30 text-[#344E41]/60 hover:bg-[#DAD7CD]/20 disabled:opacity-50"
        title="Download code"
      >
        <Download className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onHint}
        className="border-[#A3B18A]/30 text-[#A3B18A] hover:bg-[#A3B18A]/10"
        title="Show hint"
      >
        <Lightbulb className="h-4 w-4" />
      </Button>
      
      <div className="flex-1" />
      
      <Button
        size="sm"
        onClick={onRun}
        disabled={isRunning || !hasCode}
        className={cn(
          'text-white font-medium px-6',
          isRunning 
            ? 'bg-[#A3B18A] hover:bg-[#8A9C6F] cursor-wait'
            : 'gradient-button'
        )}
        data-run-button
      >
        {isRunning ? (
          <>
            <span className="inline-block h-3 w-3 mr-2 rounded-full border-2 border-white border-t-transparent animate-spin" />
            Running...
          </>
        ) : (
          <>
            <Play className="mr-1.5 h-4 w-4" />
            Run Code
          </>
        )}
      </Button>
    </div>
  );
};

export default Controls;