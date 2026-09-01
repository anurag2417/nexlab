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

  // Function to render HTML content safely with compact styling
  const renderContent = (htmlContent) => {
    if (!htmlContent) return <p className="text-gray-500 italic text-sm">No content available</p>;
    
    return (
      <div 
        className="lesson-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  };

  return (
    <div className={cn('h-full overflow-y-auto p-0', className)}>
      {/* Header - Compact */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DAD7CD]/30 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <Badge variant="success" className="bg-[#588157]/10 text-[#588157] border-[#588157]/20 text-xs py-0.5">
            Tier {sprint.tier || 1}
          </Badge>
          <span className="flex items-center text-xs text-[#344E41]/60">
            <Clock className="mr-1 h-3 w-3" />
            {sprint.estimatedTime || 45} min
          </span>
        </div>
        {isCompleted && (
          <Badge variant="success" className="bg-green-100 text-green-700 border-green-200 text-xs py-0.5">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        )}
      </div>
      
      {/* Title - Compact */}
      <h1 className="text-base font-bold text-[#3A5A40] mb-1 leading-tight">{sprint.title || 'Sprint'}</h1>
      <p className="text-sm text-[#344E41]/70 mb-2.5 leading-tight">{sprint.description || 'No description available'}</p>
      
      {/* Content - Rendered as HTML */}
      <div className="mt-0">
        {renderContent(sprint.content)}
      </div>

      {/* Learning Objectives - Compact */}
      {sprint.learningObjectives && sprint.learningObjectives.length > 0 && (
        <div className="mt-3 rounded-lg border border-[#DAD7CD]/30 bg-[#DAD7CD]/10 p-2.5">
          <h4 className="text-xs font-semibold text-[#3A5A40] flex items-center gap-1.5 mb-1">
            <Target className="h-3.5 w-3.5" />
            Learning Objectives
          </h4>
          <ul className="space-y-0.5 list-disc pl-4">
            {sprint.learningObjectives.map((obj, idx) => (
              <li key={idx} className="text-xs text-[#344E41]/70 leading-tight">
                {obj}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Progress Indicator - Compact */}
      {!isCompleted && (
        <div className="mt-3 p-2.5 bg-[#DAD7CD]/10 rounded-lg border border-[#DAD7CD]/30">
          <div className="flex items-center gap-2 text-xs text-[#344E41]/70">
            <Sparkles className="h-3.5 w-3.5 text-[#588157]" />
            <span>Complete this sprint to earn <strong className="text-[#588157]">50 XP</strong>!</span>
          </div>
        </div>
      )}

      {/* Custom Styles for rendered content */}
      <style>{`
        .lesson-content h1 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #3A5A40;
          margin-top: 0.5rem;
          margin-bottom: 0.25rem;
          line-height: 1.3;
        }
        .lesson-content h2 {
          font-size: 1rem;
          font-weight: 600;
          color: #3A5A40;
          margin-top: 0.5rem;
          margin-bottom: 0.25rem;
          line-height: 1.3;
        }
        .lesson-content h3 {
          font-size: 0.95rem;
          font-weight: 600;
          color: #588157;
          margin-top: 0.4rem;
          margin-bottom: 0.2rem;
          line-height: 1.3;
        }
        .lesson-content h4 {
          font-size: 0.9rem;
          font-weight: 600;
          color: #3A5A40;
          margin-top: 0.3rem;
          margin-bottom: 0.2rem;
          line-height: 1.3;
        }
        .lesson-content p {
          font-size: 0.85rem;
          color: #344E41;
          line-height: 1.5;
          margin-bottom: 0.3rem;
        }
        .lesson-content ul, .lesson-content ol {
          padding-left: 1.25rem;
          margin-bottom: 0.3rem;
          margin-top: 0.1rem;
        }
        .lesson-content li {
          font-size: 0.85rem;
          color: #344E41;
          line-height: 1.5;
          margin-bottom: 0.05rem;
        }
        .lesson-content strong {
          color: #3A5A40;
          font-weight: 600;
        }
        .lesson-content code {
          background: #DAD7CD;
          padding: 0.05rem 0.3rem;
          border-radius: 3px;
          font-size: 0.75rem;
          font-family: monospace;
          color: #3A5A40;
        }
        .lesson-content pre {
          background: #344E41;
          color: #DAD7CD;
          padding: 0.6rem;
          border-radius: 6px;
          overflow-x: auto;
          margin: 0.3rem 0;
          font-size: 0.7rem;
          font-family: monospace;
          line-height: 1.4;
        }
        .lesson-content pre code {
          background: transparent;
          color: #DAD7CD;
          padding: 0;
          font-size: 0.7rem;
        }
        .lesson-content div {
          background: #DAD7CD;
          padding: 0.5rem 0.7rem;
          border-radius: 6px;
          margin: 0.3rem 0;
          border-left: 3px solid #588157;
        }
        .lesson-content div h4 {
          margin-top: 0;
          margin-bottom: 0.15rem;
          font-size: 0.85rem;
        }
        .lesson-content div p {
          margin-bottom: 0;
        }
        .lesson-content div ul {
          margin-bottom: 0;
        }
        .lesson-content hr {
          border: none;
          border-top: 1px solid #DAD7CD;
          margin: 0.5rem 0;
        }
        .lesson-content blockquote {
          border-left: 3px solid #588157;
          padding-left: 0.7rem;
          margin: 0.3rem 0;
          background: #DAD7CD;
          padding: 0.3rem 0.7rem;
          border-radius: 0 6px 6px 0;
        }
        .lesson-content blockquote p {
          margin-bottom: 0;
        }
        .lesson-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 0.3rem 0;
          font-size: 0.8rem;
        }
        .lesson-content th {
          border: 1px solid #DAD7CD;
          padding: 0.2rem 0.5rem;
          background: #DAD7CD;
          text-align: left;
          font-weight: 600;
          color: #3A5A40;
        }
        .lesson-content td {
          border: 1px solid #DAD7CD;
          padding: 0.2rem 0.5rem;
          color: #344E41;
        }
        .lesson-content a {
          color: #588157;
          text-decoration: underline;
        }
        .lesson-content a:hover {
          color: #3A5A40;
        }
        .lesson-content img {
          max-width: 100%;
          border-radius: 6px;
          margin: 0.3rem 0;
        }
      `}</style>
    </div>
  );
};

export default LessonViewer;