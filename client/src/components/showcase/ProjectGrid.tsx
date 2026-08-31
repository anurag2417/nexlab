import React from 'react';
import { ProjectCard } from './ProjectCard';

interface Project {
  id: string;
  title: string;
  description: string;
  author: string;
  tier: number;
  image: string;
  likes: number;
  comments: number;
  views: number;
  status: string;
  isPublic: boolean;
}

interface ProjectGridProps {
  projects: Project[];
  onProjectClick?: (projectId: string) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ 
  projects, 
  onProjectClick 
}) => {
  if (projects.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-gray-500">No projects found</p>
        <p className="text-sm text-gray-400">Be the first to share your project!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          {...project}
          onClick={() => onProjectClick?.(project.id)}
        />
      ))}
    </div>
  );
};