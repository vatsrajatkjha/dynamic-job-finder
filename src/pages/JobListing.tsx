import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ThemeToggle } from '@/components/ThemeToggle';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Building, 
  Heart,
  Share2,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';
import { FilterOptions } from '@/components/SearchFilterModal';

interface JobListingProps {
  query?: string;
  appliedFilters?: FilterOptions;
}

const mockJobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120k - $150k',
    postedTime: '2 days ago',
    description: 'We are looking for an experienced Frontend Developer to join our dynamic team. You will be responsible for developing user-facing features using React, TypeScript, and modern web technologies.',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'GraphQL'],
    featured: true,
    remote: true,
    experience: 'Senior',
    industry: 'Technology'
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'Innovation Labs',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$100k - $130k',
    postedTime: '1 week ago',
    description: 'Join our product team to drive product strategy and execution. Work closely with engineering, design, and business teams to deliver exceptional user experiences.',
    skills: ['Product Strategy', 'Agile', 'Data Analysis', 'User Research'],
    featured: false,
    remote: false,
    experience: 'Mid-level',
    industry: 'Technology'
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: 'Creative Studio',
    location: 'Los Angeles, CA',
    type: 'Contract',
    salary: '$80k - $100k',
    postedTime: '3 days ago',
    description: 'Create stunning user interfaces and seamless user experiences for web and mobile applications.',
    skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
    featured: false,
    remote: true,
    experience: 'Mid-level',
    industry: 'Design'
  },
  {
    id: '4',
    title: 'Data Scientist',
    company: 'Analytics Pro',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$110k - $140k',
    postedTime: '1 day ago',
    description: 'Analyze complex datasets to derive actionable insights and build predictive models.',
    skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
    featured: true,
    remote: true,
    experience: 'Senior',
    industry: 'Technology'
  }
];

const JobListing: React.FC<JobListingProps> = ({ query = '', appliedFilters }) => {
  const locationState = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(query);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>(
    appliedFilters || {
      salaryRange: [30000, 150000],
      jobType: [],
      experienceLevel: [],
      location: '',
      industry: [],
      remote: false,
      sortBy: 'relevance'
    }
  );

  // Get data from navigation state
  useEffect(() => {
    if (locationState.state) {
      const { query: navQuery, filters: navFilters } = locationState.state as any;
      if (navQuery) setSearchQuery(navQuery);
      if (navFilters) setFilters(navFilters);
    }
  }, [locationState.state]);

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

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'];
  const experienceLevels = ['Fresher', 'Mid-level', 'Senior', 'Lead', 'Executive'];
  const industries = ['Technology', 'Healthcare', 'Finance', 'Education', 'Marketing', 'Sales', 'Design', 'Operations'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/[0.02]">
      {/* Header */}
      <header className="border-b border-border/20 bg-card/80 backdrop-blur-xl sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Search
              </Button>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary via-primary to-primary/80 flex items-center justify-center">
                  <Briefcase className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-bold">JobPortal</span>
              </div>
            </div>
            
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs, companies, skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button variant="ghost" className="text-sm font-medium">Sign In</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-80 space-y-6`}>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">Filters</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(false)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Salary Range */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <Label className="font-medium">Salary Range</Label>
                </div>
                <Slider
                  value={filters.salaryRange}
                  onValueChange={(value) => handleFilterChange('salaryRange', value)}
                  max={200000}
                  min={20000}
                  step={5000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${filters.salaryRange[0].toLocaleString()}</span>
                  <span>${filters.salaryRange[1].toLocaleString()}+</span>
                </div>
              </div>

              {/* Job Type */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-primary" />
                  <Label className="font-medium">Job Type</Label>
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
              </div>

              {/* Experience Level */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <Label className="font-medium">Experience Level</Label>
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
              </div>

              {/* Location */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <Label className="font-medium">Location</Label>
                </div>
                <Input
                  placeholder="Enter city, state, or country"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                />
              </div>

              {/* Remote Work */}
              <div className="flex items-center space-x-3 mb-6">
                <Switch
                  id="remote"
                  checked={filters.remote}
                  onCheckedChange={(checked) => handleFilterChange('remote', checked)}
                />
                <Label htmlFor="remote" className="font-medium">
                  Remote opportunities
                </Label>
              </div>

              {/* Industry */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-primary" />
                  <Label className="font-medium">Industry</Label>
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
              </div>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  {searchQuery ? `Search results for "${searchQuery}"` : 'All Jobs'}
                </h1>
                <p className="text-muted-foreground">
                  {mockJobs.length} jobs found
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(true)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="date">Date Posted</SelectItem>
                    <SelectItem value="salary">Salary</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {mockJobs.map((job) => (
                <Card key={job.id} className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold hover:text-primary transition-colors">
                          {job.title}
                        </h3>
                        {job.featured && (
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            Featured
                          </Badge>
                        )}
                        {job.remote && (
                          <Badge variant="outline" className="border-secondary text-secondary">
                            Remote
                          </Badge>
                        )}
                      </div>
                      <p className="text-lg text-muted-foreground mb-1">{job.company}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {job.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {job.postedTime}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {job.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.slice(0, 4).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {job.skills.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{job.skills.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg text-primary mb-2">{job.salary}</p>
                        <Button className="group">
                          Apply Now
                          <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Jobs
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default JobListing;