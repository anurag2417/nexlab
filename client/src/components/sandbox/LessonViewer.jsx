import React from 'react';
import { Badge } from '../ui/Badge';
import { Clock } from 'lucide-react';

export const LessonViewer = ({ sprint }) => {
  if (!sprint) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">No lesson content available</p>
      </div>
    );
  }

  return (
    <div className="prose prose-sm max-w-none">
      <div className="mb-4 flex items-center gap-2">
        <Badge variant="success">Tier {sprint.tier || 1}</Badge>
        <span className="flex items-center text-sm text-gray-500">
          <Clock className="mr-1 h-4 w-4" />
          {sprint.estimatedTime || 45} min
        </span>
      </div>
      
      <h1 className="text-2xl font-bold text-gray-900">{sprint.title || 'Sprint'}</h1>
      <p className="text-gray-600">{sprint.description || 'No description available'}</p>
      
      <div className="mt-4 border-t border-gray-200 pt-4">
        <div 
          className="prose prose-blue max-w-none"
          dangerouslySetInnerHTML={{ __html: sprint.content || '<p>No content available</p>' }}
        />
      </div>
    </div>
  );
};

export default LessonViewer;