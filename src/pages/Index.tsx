import React, { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { SearchResults } from '@/components/SearchResults';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Building, Briefcase, Star, ArrowRight } from 'lucide-react';

// Mock data for demonstration
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
  },
];

const mockCompanies = [
  {
    id: '1',
    name: 'TechCorp Inc.',
    industry: 'Technology',
    location: 'San Francisco, CA',
    employees: '1,000-5,000',
    rating: 4.5,
    description: 'Leading technology company focused on innovative solutions and cutting-edge products.',
    openJobs: 12,
    featured: true,
  },
  {
    id: '2',
    name: 'Innovation Labs',
    industry: 'Software',
    location: 'New York, NY',
    employees: '500-1,000',
    rating: 4.2,
    description: 'Fast-growing startup revolutionizing the way people work and collaborate.',
    openJobs: 8,
  },
];

const mockPosts = [
  {
    id: '1',
    author: {
      name: 'Sarah Johnson',
      title: 'Senior Software Engineer at Google',
    },
    content: 'Just shipped a major feature that improves user experience by 40%! Excited to share some insights about modern React patterns and performance optimization techniques.',
    timestamp: '3 hours ago',
    likes: 124,
    comments: 18,
    shares: 7,
  },
  {
    id: '2',
    author: {
      name: 'Alex Chen',
      title: 'Product Designer at Meta',
    },
    content: 'The future of design is collaborative. Here are 5 key principles I follow when working with cross-functional teams to create user-centered products.',
    timestamp: '1 day ago',
    likes: 89,
    comments: 12,
    shares: 15,
  },
];

const mockPeople = [
  {
    id: '1',
    name: 'John Smith',
    title: 'Software Engineer',
    company: 'Google',
  },
  {
    id: '2',
    name: 'Emily Davis',
    title: 'Product Manager',
    company: 'Meta',
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchResults] = useState({
    jobs: mockJobs,
    posts: mockPosts,
    companies: mockCompanies,
    people: mockPeople,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
  };

  const trendingSkills = ['React', 'Python', 'Product Management', 'Data Science', 'DevOps', 'UI/UX Design'];
  const featuredCompanies = ['Google', 'Meta', 'Apple', 'Microsoft', 'Amazon', 'Netflix'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/[0.02]">
      {/* Header */}
      <header className="border-b border-border/20 bg-card/80 backdrop-blur-xl sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/25">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                JobPortal
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105">Jobs</a>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105">Companies</a>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105">Network</a>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105">Learn</a>
            </nav>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button variant="ghost" className="text-sm font-medium">Sign In</Button>
              <Button variant="default" className="text-sm font-medium bg-primary hover:bg-primary/90">Join Now</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4">
        {!searchQuery ? (
          /* Hero Section */
          <div className="py-24 text-center">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-8 bg-gradient-to-r from-foreground via-primary to-primary/80 bg-clip-text text-transparent leading-tight tracking-tight">
                Find Your Dream Job Today
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-3xl mx-auto leading-relaxed font-medium">
                Connect with top companies, discover exciting opportunities, and advance your career with our AI-powered job matching platform.
              </p>
              
              {/* Search Bar */}
              <div className="mb-16">
                <SearchBar
                  onSearch={handleSearch}
                  onFilterSelect={handleFilterSelect}
                  selectedFilter={selectedFilter}
                  isExpanded={isSearchExpanded}
                  setIsExpanded={setIsSearchExpanded}
                />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                  <div className="text-muted-foreground">Active Jobs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                  <div className="text-muted-foreground">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">1M+</div>
                  <div className="text-muted-foreground">Job Seekers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">95%</div>
                  <div className="text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Search Results */
          <div className="py-8">
            <SearchResults
              query={searchQuery}
              filter={selectedFilter}
              results={searchResults}
            />
          </div>
        )}

        {/* Trending Section - Only show when not searching */}
        {!searchQuery && (
          <div className="py-16">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Trending Skills */}
              <Card className="p-8 bg-gradient-to-br from-card to-primary/5 border-primary/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-job-secondary/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Trending Skills</h3>
                    <p className="text-muted-foreground">Most in-demand skills this month</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSkills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-6 group">
                  Explore All Skills
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>

              {/* Featured Companies */}
              <Card className="p-8 bg-gradient-to-br from-card to-job-secondary/5 border-job-secondary/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-job-secondary/10 to-primary/10 flex items-center justify-center">
                    <Building className="h-6 w-6 text-job-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Featured Companies</h3>
                    <p className="text-muted-foreground">Top employers hiring now</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {featuredCompanies.slice(0, 4).map((company, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-background/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-job-secondary/10 flex items-center justify-center">
                          <Building className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{company}</div>
                          <div className="text-sm text-muted-foreground">Multiple positions</div>
                        </div>
                      </div>
                      <Star className="h-4 w-4 text-warning fill-warning" />
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-6 group">
                  View All Companies
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-job-secondary flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">JobPortal</span>
              </div>
              <p className="text-muted-foreground">
                Your gateway to exciting career opportunities and professional growth.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Job Seekers</h4>
              <div className="space-y-2 text-muted-foreground">
                <div>Browse Jobs</div>
                <div>Career Advice</div>
                <div>Resume Builder</div>
                <div>Salary Guide</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Employers</h4>
              <div className="space-y-2 text-muted-foreground">
                <div>Post Jobs</div>
                <div>Find Candidates</div>
                <div>Employer Branding</div>
                <div>Recruitment Solutions</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-muted-foreground">
                <div>About Us</div>
                <div>Contact</div>
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8 mt-8 text-center text-muted-foreground">
            <p>&copy; 2024 JobPortal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
