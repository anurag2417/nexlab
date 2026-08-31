import React from 'react';
import { Heart, MessageCircle, Eye, Globe, Lock } from 'lucide-react';
import { Card, CardFooter, CardHeader } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  author: string;
  tier: number;
  image: string;
  likes: number;
  comments: number;
  views?: number;
  status?: string;
  isPublic?: boolean;
  onClick?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  author,
  tier,
  image,
  likes,
  comments,
  views = 0,
  status = 'approved',
  isPublic = true,
  onClick,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'submitted':
        return 'warning';
      case 'reviewed':
        return 'info';
      case 'rejected':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <Card 
      className="overflow-hidden transition-all hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="relative flex h-32 items-center justify-center bg-gradient-to-r from-primary-100 to-secondary-100 text-6xl">
        {image}
        {!isPublic && (
          <div className="absolute top-2 right-2">
            <Badge variant="outline" className="bg-white/80">
              <Lock className="h-3 w-3 mr-1" />
              Private
            </Badge>
          </div>
        )}
        {status !== 'approved' && (
          <div className="absolute top-2 left-2">
            <Badge>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
        )}
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-1">{title}</h3>
            <p className="text-sm text-gray-500">by {author}</p>
          </div>
          <Badge variant="success">Tier {tier}</Badge>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      </CardHeader>
      <CardFooter className="flex items-center justify-between border-t border-gray-100 pt-4 text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            {likes}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            {comments}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {views}
          </span>
        </div>
        {isPublic && (
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Globe className="h-3 w-3" />
            Public
          </span>
        )}
      </CardFooter>
    </Card>
  );
};