import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Progress } from '../ui/Progress';
import { cn } from '../../utils/cn';
import { Lock, CheckCircle, ArrowRight } from 'lucide-react';

export const CourseCard = ({
  id,
  title,
  description,
  tier,
  icon,
  color,
  progress,
  totalSprints,
  completedSprints,
  isLocked = false,
}) => {
  const isCompleted = progress === 100 && totalSprints > 0;

  return (
    <Card className={cn(
      'overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1 bg-white border-gray-200/50',
      isLocked && 'opacity-70'
    )}>
      <div className={`h-1.5 bg-gradient-to-r from-${color}-400 to-${color}-300`} />
      <CardHeader>
        <div className="flex items-center justify-between">
          <span className="text-3xl">{icon}</span>
          <div className="flex items-center gap-2">
            {isLocked && <Lock className="h-4 w-4 text-gray-400" />}
            {isCompleted && !isLocked && <CheckCircle className="h-4 w-4 text-green-500" />}
            <span className={`text-xs font-medium text-${color}-600 bg-${color}-50/80 px-2.5 py-1 rounded-full border border-${color}-200/50`}>
              Tier {tier}
            </span>
          </div>
        </div>
        <CardTitle className="text-lg text-gray-900 group-hover:text-primary-600 transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-sm text-gray-500 line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Progress</span>
            <span className="font-medium text-gray-700">{Math.round(progress)}%</span>
          </div>
          <Progress 
            value={progress} 
            color={isLocked ? 'default' : isCompleted ? 'success' : 'default'} 
          />
          <p className="text-xs text-gray-400">
            {completedSprints} of {totalSprints} sprints completed
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={isLocked ? '#' : `/sandbox/${id}`} className="w-full">
          <Button
            variant={isLocked ? 'outline' : 'default'}
            className={`w-full group ${
              isCompleted && !isLocked 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : isLocked 
                  ? 'border-gray-300 text-gray-400 hover:border-primary-400 hover:text-primary-600' 
                  : 'bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-500/20'
            }`}
            disabled={isLocked}
          >
            {isLocked ? (
              '🔒 Locked'
            ) : isCompleted ? (
              '✅ Completed'
            ) : (
              <span className="flex items-center gap-2">
                Continue Learning
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            )}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;