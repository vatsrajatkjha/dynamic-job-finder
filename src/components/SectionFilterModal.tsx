import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Briefcase, Building, Users, BookOpen, MessageSquare, GraduationCap } from 'lucide-react';

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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">
              What are you looking for in "{searchQuery}"?
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-muted-foreground">
            Choose a category to refine your search results.
          </p>
        </DialogHeader>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-6">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <Card
                key={section.id}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-primary/20"
                onClick={() => onSectionSelect(section.id)}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={`w-12 h-12 rounded-xl bg-${section.color}/10 flex items-center justify-center`}>
                    <IconComponent className={`h-6 w-6 text-${section.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{section.label}</h3>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};