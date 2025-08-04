import React from 'react';
import { MapPin, Users, Star, Building } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CompanyCardProps {
  id: string;
  name: string;
  industry: string;
  location: string;
  employees: string;
  rating: number;
  description: string;
  logo?: string;
  openJobs: number;
  featured?: boolean;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({
  name,
  industry,
  location,
  employees,
  rating,
  description,
  logo,
  openJobs,
  featured = false,
}) => {
  return (
    <Card className={`p-6 hover:shadow-[0_8px_25px_-8px_hsl(220_8.9%_46.1%/0.2)] transition-all duration-300 transform hover:scale-[1.02] cursor-pointer ${
      featured ? 'border-primary/30 bg-gradient-to-br from-primary/5 to-job-secondary/5' : ''
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-job-secondary/10 flex items-center justify-center">
            {logo ? (
              <img src={logo} alt={`${name} logo`} className="w-12 h-12 rounded-lg" />
            ) : (
              <Building className="h-8 w-8 text-primary" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-xl text-foreground hover:text-primary transition-colors">
                {name}
              </h3>
              {featured && (
                <Star className="h-4 w-4 text-warning fill-warning" />
              )}
            </div>
            <p className="text-muted-foreground font-medium mb-1">{industry}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-warning fill-warning" />
                <span>{rating}</span>
              </div>
              <span>•</span>
              <span>{employees} employees</span>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="hover:bg-primary/5 hover:border-primary/30">
          Follow
        </Button>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>{openJobs} open positions</span>
        </div>
      </div>

      <p className="text-foreground mb-4 line-clamp-3">
        {description}
      </p>

      <div className="flex items-center justify-between">
        <Badge variant="secondary" className="text-xs">
          {industry}
        </Badge>
        <Button variant="hero" size="sm">
          View Jobs ({openJobs})
        </Button>
      </div>
    </Card>
  );
};