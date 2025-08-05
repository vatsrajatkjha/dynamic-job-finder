import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MapPin, DollarSign, Briefcase, Clock, Building, ArrowRight, X } from 'lucide-react';

interface SearchFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onApplyFilters: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  salaryRange: number[];
  jobType: string[];
  experienceLevel: string[];
  location: string;
  industry: string[];
  remote: boolean;
  sortBy: string;
}

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'];
const experienceLevels = ['Fresher', 'Mid-level', 'Senior', 'Lead', 'Executive'];
const industries = ['Technology', 'Healthcare', 'Finance', 'Education', 'Marketing', 'Sales', 'Design', 'Operations'];
const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'date', label: 'Date Posted' },
  { value: 'salary', label: 'Salary' },
  { value: 'company', label: 'Company' }
];

export const SearchFilterModal: React.FC<SearchFilterModalProps> = ({
  isOpen,
  onClose,
  searchQuery,
  onApplyFilters
}) => {
  const [filters, setFilters] = useState<FilterOptions>({
    salaryRange: [30000, 150000],
    jobType: [],
    experienceLevel: [],
    location: '',
    industry: [],
    remote: false,
    sortBy: 'relevance'
  });

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleArrayToggle = (key: 'jobType' | 'experienceLevel' | 'industry', value: string) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    handleFilterChange(key, newArray);
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  const handleClearAll = () => {
    setFilters({
      salaryRange: [30000, 150000],
      jobType: [],
      experienceLevel: [],
      location: '',
      industry: [],
      remote: false,
      sortBy: 'relevance'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">
              Refine Your Search for "{searchQuery}"
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-muted-foreground">
            Apply filters to find the most relevant opportunities for your career goals.
          </p>
        </DialogHeader>

        <div className="grid gap-6 py-6">
          {/* Salary Range */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Salary Range</h3>
                <p className="text-sm text-muted-foreground">Annual salary expectations</p>
              </div>
            </div>
            <div className="space-y-4">
              <Slider
                value={filters.salaryRange}
                onValueChange={(value) => handleFilterChange('salaryRange', value)}
                max={200000}
                min={20000}
                step={5000}
                className="w-full"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  ${filters.salaryRange[0].toLocaleString()}
                </span>
                <span className="text-sm font-medium">
                  ${filters.salaryRange[1].toLocaleString()}+
                </span>
              </div>
            </div>
          </Card>

          {/* Job Type & Experience Level */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold">Job Type</h3>
                  <p className="text-sm text-muted-foreground">Employment type</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {jobTypes.map((type) => (
                  <Badge
                    key={type}
                    variant={filters.jobType.includes(type) ? "default" : "outline"}
                    className="cursor-pointer transition-all hover:scale-105"
                    onClick={() => handleArrayToggle('jobType', type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">Experience Level</h3>
                  <p className="text-sm text-muted-foreground">Career stage</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {experienceLevels.map((level) => (
                  <Badge
                    key={level}
                    variant={filters.experienceLevel.includes(level) ? "default" : "outline"}
                    className="cursor-pointer transition-all hover:scale-105"
                    onClick={() => handleArrayToggle('experienceLevel', level)}
                  >
                    {level}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>

          {/* Location & Remote */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-sm text-muted-foreground">Preferred work location</p>
                </div>
              </div>
              <Input
                placeholder="Enter city, state, or country"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              />
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Building className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold">Work Setup</h3>
                  <p className="text-sm text-muted-foreground">Remote work preference</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Switch
                  id="remote"
                  checked={filters.remote}
                  onCheckedChange={(checked) => handleFilterChange('remote', checked)}
                />
                <Label htmlFor="remote" className="text-sm font-medium">
                  Include remote opportunities
                </Label>
              </div>
            </Card>
          </div>

          {/* Industry & Sort */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Building className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">Industry</h3>
                  <p className="text-sm text-muted-foreground">Preferred sectors</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <Badge
                    key={industry}
                    variant={filters.industry.includes(industry) ? "default" : "outline"}
                    className="cursor-pointer transition-all hover:scale-105"
                    onClick={() => handleArrayToggle('industry', industry)}
                  >
                    {industry}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Sort By</h3>
                  <p className="text-sm text-muted-foreground">Order results by</p>
                </div>
              </div>
              <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sorting option" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6 border-t">
          <Button variant="outline" onClick={handleClearAll}>
            Clear All Filters
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleApplyFilters} className="group">
              Apply Filters & View Results
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};