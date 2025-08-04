import React from 'react';
import { JobCard } from './JobCard';
import { CompanyCard } from './CompanyCard';
import { PostCard } from './PostCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Calendar, GraduationCap, Wrench, Building2, MessageCircle } from 'lucide-react';

interface SearchResultsProps {
  query: string;
  filter: string;
  results: {
    jobs: any[];
    posts: any[];
    companies: any[];
    people: any[];
  };
}

// Mock data for additional filters
const mockServices = [
  {
    id: '1',
    title: 'Full Stack Development',
    provider: 'TechExpert Solutions',
    price: '$50/hour',
    rating: 4.9,
    description: 'Complete web application development using modern technologies.',
    skills: ['React', 'Node.js', 'MongoDB']
  },
  {
    id: '2',
    title: 'UI/UX Design Consultation',
    provider: 'DesignCraft Studio',
    price: '$75/hour',
    rating: 4.8,
    description: 'Professional design consultation for web and mobile applications.',
    skills: ['Figma', 'Adobe Creative Suite', 'Prototyping']
  }
];

const mockGroups = [
  {
    id: '1',
    name: 'React Developers Network',
    members: '15.2K members',
    description: 'A community for React developers to share knowledge and opportunities.',
    category: 'Technology'
  },
  {
    id: '2',
    name: 'Product Management Hub',
    members: '8.7K members',
    description: 'Connect with product managers and share best practices.',
    category: 'Business'
  }
];

const mockEvents = [
  {
    id: '1',
    title: 'Tech Job Fair 2024',
    date: 'March 15, 2024',
    location: 'San Francisco, CA',
    attendees: '500+ attending',
    type: 'In-person'
  },
  {
    id: '2',
    title: 'Remote Work Summit',
    date: 'March 22, 2024',
    location: 'Online',
    attendees: '1.2K attending',
    type: 'Virtual'
  }
];

const mockCourses = [
  {
    id: '1',
    title: 'Advanced React Development',
    instructor: 'Sarah Chen',
    duration: '8 weeks',
    level: 'Intermediate',
    price: '$299',
    rating: 4.9
  },
  {
    id: '2',
    title: 'Product Management Fundamentals',
    instructor: 'Michael Rodriguez',
    duration: '6 weeks',
    level: 'Beginner',
    price: '$199',
    rating: 4.7
  }
];

export const FilteredSearchResults: React.FC<SearchResultsProps> = ({
  query,
  filter,
  results,
}) => {
  const getFilteredResults = () => {
    switch (filter) {
      case 'jobs':
        return { data: results.jobs, count: results.jobs.length };
      case 'posts':
        return { data: results.posts, count: results.posts.length };
      case 'companies':
        return { data: results.companies, count: results.companies.length };
      case 'people':
        return { data: results.people, count: results.people.length };
      case 'services':
        return { data: mockServices, count: mockServices.length };
      case 'groups':
        return { data: mockGroups, count: mockGroups.length };
      case 'events':
        return { data: mockEvents, count: mockEvents.length };
      case 'courses':
        return { data: mockCourses, count: mockCourses.length };
      default:
        const allResults = [
          ...results.jobs,
          ...results.posts,
          ...results.companies,
          ...results.people,
          ...mockServices,
          ...mockGroups,
          ...mockEvents,
          ...mockCourses
        ];
        return { data: allResults, count: allResults.length };
    }
  };

  const filteredResults = getFilteredResults();

  const renderResults = () => {
    if (filteredResults.count === 0) {
      return (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No results found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      );
    }

    switch (filter) {
      case 'jobs':
        return filteredResults.data.map((job: any) => (
          <JobCard key={job.id} {...job} />
        ));
      
      case 'posts':
        return filteredResults.data.map((post: any) => (
          <PostCard key={post.id} {...post} />
        ));
      
      case 'companies':
        return filteredResults.data.map((company: any) => (
          <CompanyCard key={company.id} {...company} />
        ));
      
      case 'people':
        return filteredResults.data.map((person: any) => (
          <Card key={person.id} className="p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${person.name}`} />
                <AvatarFallback>{person.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{person.name}</h3>
                <p className="text-muted-foreground">{person.title}</p>
                <p className="text-sm text-muted-foreground">{person.company}</p>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
          </Card>
        ));

      case 'services':
        return filteredResults.data.map((service: any) => (
          <Card key={service.id} className="p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                  <Wrench className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                  <p className="text-muted-foreground">by {service.provider}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-primary">{service.price}</div>
                <div className="text-sm text-muted-foreground">⭐ {service.rating}</div>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">{service.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {service.skills.map((skill: string, index: number) => (
                <Badge key={index} variant="secondary">{skill}</Badge>
              ))}
            </div>
            <Button className="w-full">Contact Provider</Button>
          </Card>
        ));

      case 'groups':
        return filteredResults.data.map((group: any) => (
          <Card key={group.id} className="p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{group.name}</h3>
                <p className="text-muted-foreground mb-2">{group.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{group.members}</span>
                  <Badge variant="outline">{group.category}</Badge>
                </div>
              </div>
              <Button variant="outline">Join Group</Button>
            </div>
          </Card>
        ));

      case 'events':
        return filteredResults.data.map((event: any) => (
          <Card key={event.id} className="p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                <div className="space-y-1 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {event.attendees}
                  </div>
                </div>
                <Badge variant={event.type === 'Virtual' ? 'secondary' : 'default'}>
                  {event.type}
                </Badge>
              </div>
              <Button variant="outline">Register</Button>
            </div>
          </Card>
        ));

      case 'courses':
        return filteredResults.data.map((course: any) => (
          <Card key={course.id} className="p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                <p className="text-muted-foreground mb-2">by {course.instructor}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span>{course.duration}</span>
                  <Badge variant="outline">{course.level}</Badge>
                  <span>⭐ {course.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-bold text-primary">{course.price}</div>
                  <Button variant="outline">Enroll Now</Button>
                </div>
              </div>
            </div>
          </Card>
        ));

      default:
        return (
          <div className="grid gap-6">
            {results.jobs.slice(0, 2).map((job: any) => (
              <JobCard key={`job-${job.id}`} {...job} />
            ))}
            {results.companies.slice(0, 2).map((company: any) => (
              <CompanyCard key={`company-${company.id}`} {...company} />
            ))}
            {results.posts.slice(0, 2).map((post: any) => (
              <PostCard key={`post-${post.id}`} {...post} />
            ))}
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-2xl font-bold">
          Search results for "{query}"
        </h2>
        <p className="text-muted-foreground">
          {filteredResults.count} result{filteredResults.count !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="grid gap-6">
        {renderResults()}
      </div>
    </div>
  );
};