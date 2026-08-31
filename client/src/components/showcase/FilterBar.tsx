import React from 'react';
import { Button } from '../ui/Button';

interface FilterBarProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: 'all', label: 'All Projects' },
  { id: '1', label: 'Tier 1' },
  { id: '2', label: 'Tier 2' },
  { id: '3', label: 'Tier 3' },
  { id: '4', label: 'Tier 4' },
  { id: '5', label: 'Tier 5' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={currentFilter === filter.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange(filter.id)}
          className={
            currentFilter === filter.id
              ? 'bg-primary-600 hover:bg-primary-700'
              : ''
          }
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};