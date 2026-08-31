import React from 'react';
import { Badge } from '../ui/Badge';
import { Clock } from 'lucide-react';

interface Sprint {
  id: string;
  title: string;
  description: string;
  content: string;
  tier: number;
  estimatedTime: number;
}

interface LessonViewerProps {
  sprint: Sprint;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({ sprint }) => {
  return (
    <div className="prose prose-sm max-w-none">
      <div className="mb-4 flex items-center gap-2">
        <Badge variant="success">Tier {sprint.tier}</Badge>
        <span className="flex items-center text-sm text-gray-500">
          <Clock className="mr-1 h-4 w-4" />
          {sprint.estimatedTime} min
        </span>
      </div>
      
      <h1 className="text-2xl font-bold text-gray-900">{sprint.title}</h1>
      <p className="text-gray-600">{sprint.description}</p>
      
      <div className="mt-4 border-t border-gray-200 pt-4">
        <div 
          className="prose prose-blue max-w-none"
          dangerouslySetInnerHTML={{ __html: sprint.content }}
        />
      </div>
    </div>
  );
};