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
  firstSprintId, // Add this prop
}) => {
  const isCompleted = progress === 100 && totalSprints > 0;

  // Get the first sprint ID for the course
  const getSprintLink = () => {
    if (isLocked) return '#';
    if (firstSprintId) return `/sandbox/${firstSprintId}`;
    return `/sandbox/${id}`;
  };

  return (
    <Card className={cn(
      'overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#588157]/5 hover:-translate-y-1 bg-white border-[#DAD7CD]/30',
      isLocked && 'opacity-70'
    )}>
      <div className="h-1.5 bg-gradient-to-r from-[#588157] to-[#A3B18A]" />
      <CardHeader>
        <div className="flex items-center justify-between">
          <span className="text-3xl">{icon}</span>
          <div className="flex items-center gap-2">
            {isLocked && <Lock className="h-4 w-4 text-[#344E41]/40" />}
            {isCompleted && !isLocked && <CheckCircle className="h-4 w-4 text-green-500" />}
            <span className="text-xs font-medium text-[#588157] bg-[#588157]/10 px-2.5 py-1 rounded-full border border-[#588157]/20">
              Tier {tier}
            </span>
          </div>
        </div>
        <CardTitle className="text-lg text-[#3A5A40] group-hover:text-[#588157] transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-sm text-[#344E41]/60 line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[#344E41]/60">Progress</span>
            <span className="font-medium text-[#3A5A40]">{Math.round(progress)}%</span>
          </div>
          <Progress 
            value={progress} 
            color={isLocked ? 'default' : isCompleted ? 'success' : 'default'} 
          />
          <p className="text-xs text-[#344E41]/40">
            {completedSprints} of {totalSprints} sprints completed
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={getSprintLink()} className="w-full">
          <Button
            variant={isLocked ? 'outline' : 'default'}
            className={`w-full group ${
              isCompleted && !isLocked 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : isLocked 
                  ? 'border-[#A3B18A] text-[#344E41]/40 hover:border-[#588157] hover:text-[#588157]' 
                  : 'gradient-button'
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