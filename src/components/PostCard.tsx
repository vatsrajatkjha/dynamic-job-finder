import React from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface PostCardProps {
  id: string;
  author: {
    name: string;
    title: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  image?: string;
}

export const PostCard: React.FC<PostCardProps> = ({
  author,
  content,
  timestamp,
  likes,
  comments,
  shares,
  image,
}) => {
  return (
    <Card className="p-6 hover:shadow-[0_8px_25px_-8px_hsl(220_8.9%_46.1%/0.2)] transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>
              <User className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-foreground hover:text-primary cursor-pointer transition-colors">
              {author.name}
            </h4>
            <p className="text-sm text-muted-foreground">{author.title}</p>
            <p className="text-xs text-muted-foreground">{timestamp}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="hover:bg-muted">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <div className="mb-4">
        <p className="text-foreground leading-relaxed">{content}</p>
        {image && (
          <div className="mt-3 rounded-lg overflow-hidden">
            <img
              src={image}
              alt="Post content"
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary group">
            <Heart className="h-4 w-4 mr-2 group-hover:fill-red-500 group-hover:text-red-500 transition-colors" />
            <span>{likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <MessageCircle className="h-4 w-4 mr-2" />
            <span>{comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <Share2 className="h-4 w-4 mr-2" />
            <span>{shares}</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};