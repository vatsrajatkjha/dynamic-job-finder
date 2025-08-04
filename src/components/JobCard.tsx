import React from 'react';
import { MapPin, Clock, Briefcase, Building, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  postedTime: string;
  description: string;
  skills: string[];
  logo?: string;
  featured?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({
  title,
  company,
  location,
  type,
  salary,
  postedTime,
  description,
  skills,
  logo,
  featured = false,
}) => {
  return (
    <Card className={`p-6 hover:shadow-[0_8px_25px_-8px_hsl(220_8.9%_46.1%/0.2)] transition-all duration-300 transform hover:scale-[1.02] cursor-pointer ${
      featured ? 'border-primary/30 bg-gradient-to-br from-primary/5 to-job-secondary/5' : ''
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-job-secondary/10 flex items-center justify-center">
            {logo ? (
              <img src={logo} alt={`${company} logo`} className="w-8 h-8 rounded" />
            ) : (
              <Building className="h-6 w-6 text-primary" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg text-foreground hover:text-primary transition-colors">
                {title}
              </h3>
              {featured && (
                <Star className="h-4 w-4 text-warning fill-warning" />
              )}
            </div>
            <p className="text-muted-foreground font-medium">{company}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="hover:bg-primary/5 hover:border-primary/30">
          Save
        </Button>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Briefcase className="h-4 w-4" />
          <span>{type}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{postedTime}</span>
        </div>
      </div>

      <p className="text-foreground mb-4 line-clamp-3">
        {description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{skills.length - 3} more
            </Badge>
          )}
        </div>
        <div className="text-right">
          <p className="font-semibold text-lg text-primary">{salary}</p>
          <Button variant="hero" size="sm" className="mt-2">
            Apply Now
          </Button>
        </div>
      </div>
    </Card>
  );
};