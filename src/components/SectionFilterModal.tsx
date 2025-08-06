import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { X, Briefcase, Building, Users, BookOpen, MessageSquare, GraduationCap, Filter, ArrowLeft, Banknote, Clock, MapPin, Users2, Home, Wrench } from 'lucide-react';

interface SectionFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onSectionSelect: (section: string) => void;
}

const sections = [
  {
    id: 'jobs',
    label: 'Jobs',
    icon: Briefcase,
    description: 'Find career opportunities',
    color: 'primary'
  },
  {
    id: 'posts',
    label: 'Posts',
    icon: MessageSquare,
    description: 'Professional insights and updates',
    color: 'secondary'
  },
  {
    id: 'companies',
    label: 'Companies',
    icon: Building,
    description: 'Discover organizations',
    color: 'accent'
  },
  {
    id: 'people',
    label: 'People',
    icon: Users,
    description: 'Connect with professionals',
    color: 'muted'
  },
  {
    id: 'campus',
    label: 'Campus',
    icon: GraduationCap,
    description: 'College recruitment programs',
    color: 'primary'
  },
  {
    id: 'courses',
    label: 'Courses',
    icon: BookOpen,
    description: 'Skill development programs',
    color: 'secondary'
  }
];

export const SectionFilterModal: React.FC<SectionFilterModalProps> = ({
  isOpen,
  onClose,
  searchQuery,
  onSectionSelect
}) => {
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [showJobFilters, setShowJobFilters] = useState(false);

  const jobFilters = [
    { id: 'salary', label: 'Salary Range', icon: Banknote, description: 'Filter by compensation' },
    { id: 'type', label: 'Job Type', icon: Briefcase, description: 'Full-time, Part-time, Contract' },
    { id: 'experience', label: 'Experience Level', icon: Clock, description: 'Fresher, Mid, Senior' },
    { id: 'location', label: 'Location', icon: MapPin, description: 'City, State, Remote' },
    { id: 'company-size', label: 'Company Size', icon: Users2, description: 'Startup to Enterprise' },
    { id: 'remote', label: 'Work Mode', icon: Home, description: 'Remote, Hybrid, Onsite' },
  ];

  const handleSectionClick = (sectionId: string) => {
    if (sectionId === 'jobs') {
      setSelectedSection(sectionId);
      setShowJobFilters(true);
    } else {
      onSectionSelect(sectionId);
    }
  };

  const handleJobFilterSelect = (filterId: string) => {
    // Pass the job section with specific filter
    onSectionSelect('jobs');
    onClose();
  };

  const handleBack = () => {
    setShowJobFilters(false);
    setSelectedSection('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader className="space-y-4 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {showJobFilters && (
                <Button variant="ghost" size="sm" onClick={handleBack} className="mr-2">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <div>
                <DialogTitle className="text-2xl font-bold">
                  {showJobFilters 
                    ? `Job Filters for "${searchQuery}"` 
                    : `What are you looking for in "${searchQuery}"?`
                  }
                </DialogTitle>
                <p className="text-muted-foreground text-sm mt-1">
                  {showJobFilters 
                    ? 'Select specific job criteria to refine your search'
                    : 'Choose a category to refine your search results'
                  }
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto">
          {!showJobFilters ? (
            /* Section Selection */
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4">
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <Card
                    key={section.id}
                    className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-primary/20 group"
                    onClick={() => handleSectionClick(section.id)}
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/30 transition-all duration-300">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">{section.label}</h3>
                        <p className="text-sm text-muted-foreground">{section.description}</p>
                        {section.id === 'jobs' && (
                          <Badge variant="secondary" className="mt-2 bg-primary/10 text-primary text-xs">
                            Advanced Filters
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            /* Job Filters */
            <div className="space-y-6 py-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20">
                  <Filter className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Job Search Filters</h3>
                  <p className="text-sm text-muted-foreground">Choose criteria to find the perfect job match</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobFilters.map((filter) => {
                  const IconComponent = filter.icon;
                  return (
                    <Card
                      key={filter.id}
                      className="p-4 hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer border border-border/50 hover:border-primary/30 group"
                      onClick={() => handleJobFilterSelect(filter.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary/80 to-secondary/60 flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                          <IconComponent className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {filter.label}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {filter.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <Separator />
              
              <div className="flex items-center justify-between pt-4">
                <Button variant="outline" onClick={handleBack}>
                  Back to Categories
                </Button>
                <div className="flex gap-3">
                  <Button variant="ghost" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleJobFilterSelect('all')} className="bg-primary hover:bg-primary/90">
                    View All Jobs
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};