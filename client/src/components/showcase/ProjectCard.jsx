import React from 'react';
import { Heart, MessageCircle, Eye, Globe, Lock } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const ProjectCard = ({
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
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'submitted':
        return 'warning';
      case 'reviewed':
        return 'secondary';
      case 'rejected':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <Card 
      className="overflow-hidden transition-all hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1 cursor-pointer bg-white border-gray-200/50"
      onClick={onClick}
    >
      <div className="relative flex h-32 items-center justify-center bg-gradient-to-r from-primary-100 to-secondary-100 text-6xl">
        {image || '📁'}
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
            <Badge variant={getStatusColor(status)}>
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
          <Badge variant="success" className="bg-green-100 text-green-800">
            Tier {tier}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      </CardHeader>
      <CardFooter className="flex items-center justify-between border-t border-gray-100 pt-4 text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            {likes || 0}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            {comments || 0}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {views || 0}
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

export default ProjectCard;