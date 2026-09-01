import React from 'react';
import { Badge } from '../ui/Badge';
import { Clock, BookOpen, Target, CheckCircle, Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';

export const LessonViewer = ({ 
  sprint, 
  isCompleted = false,
  className 
}) => {
  if (!sprint) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-[#A3B18A] mx-auto mb-3" />
          <p className="text-[#344E41]/60">No lesson content available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('prose prose-sm max-w-none', className)}>
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="success" className="bg-[#588157]/10 text-[#588157] border-[#588157]/20">
            Tier {sprint.tier || 1}
          </Badge>
          <span className="flex items-center text-sm text-[#344E41]/60">
            <Clock className="mr-1 h-4 w-4" />
            {sprint.estimatedTime || 45} min
          </span>
        </div>
        {isCompleted && (
          <Badge variant="success" className="bg-green-100 text-green-700 border-green-200">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        )}
      </div>
      
      {/* Title */}
      <h1 className="text-2xl font-bold text-[#3A5A40]">{sprint.title || 'Sprint'}</h1>
      <p className="text-[#344E41]/70">{sprint.description || 'No description available'}</p>
      
      {/* Content */}
      <div className="mt-4 border-t border-[#DAD7CD]/30 pt-4">
        {sprint.content ? (
          <div 
            className="prose prose-green max-w-none [&_h2]:text-[#3A5A40] [&_h3]:text-[#588157] [&_h4]:text-[#3A5A40] [&_p]:text-[#344E41]/80 [&_li]:text-[#344E41]/80 [&_pre]:bg-[#344E41] [&_pre]:text-[#DAD7CD] [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_code]:text-[#588157] [&_code]:bg-[#DAD7CD]/20 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
            dangerouslySetInnerHTML={{ __html: sprint.content }}
          />
        ) : (
          <div className="text-[#344E41]/40 italic">No content available</div>
        )}
      </div>

      {/* Learning Objectives */}
      {sprint.learningObjectives && sprint.learningObjectives.length > 0 && (
        <div className="mt-6 rounded-xl border border-[#DAD7CD]/30 bg-[#DAD7CD]/10 p-4">
          <h4 className="text-sm font-semibold text-[#3A5A40] flex items-center gap-2 mb-2">
            <Target className="h-4 w-4" />
            Learning Objectives
          </h4>
          <ul className="space-y-1">
            {sprint.learningObjectives.map((obj, idx) => (
              <li key={idx} className="text-sm text-[#344E41]/70 flex items-start gap-2">
                <span className="text-[#588157]">•</span>
                {obj}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Progress Indicator */}
      {!isCompleted && (
        <div className="mt-6 p-4 bg-[#DAD7CD]/10 rounded-lg border border-[#DAD7CD]/30">
          <div className="flex items-center gap-2 text-sm text-[#344E41]/70">
            <Sparkles className="h-4 w-4 text-[#588157]" />
            <span>Complete this sprint to earn <strong className="text-[#588157]">50 XP</strong>!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonViewer;