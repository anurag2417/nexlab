import React from 'react';
import { ProjectCard } from './ProjectCard';

export const ProjectGrid = ({ projects, onProjectClick }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50/50">
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

export default ProjectGrid;