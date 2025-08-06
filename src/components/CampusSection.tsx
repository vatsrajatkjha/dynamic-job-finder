import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Calendar, MapPin, Users, TrendingUp, Award, ChevronRight } from 'lucide-react';

const campusEvents = [
  {
    id: '1',
    title: 'Tech Career Fair 2024',
    university: 'MIT',
    date: 'March 15, 2024',
    location: 'Boston, MA',
    companies: 45,
    attendees: '500+',
    featured: true
  },
  {
    id: '2',
    title: 'Engineering Recruitment Drive',
    university: 'Stanford University',
    date: 'March 22, 2024',
    location: 'Palo Alto, CA',
    companies: 38,
    attendees: '400+'
  },
  {
    id: '3',
    title: 'Business & Finance Summit',
    university: 'Harvard Business School',
    date: 'April 5, 2024',
    location: 'Cambridge, MA',
    companies: 52,
    attendees: '600+'
  }
];

const placementStats = [
  { metric: '95%', label: 'Placement Rate' },
  { metric: '₹12L', label: 'Avg Package' },
  { metric: '250+', label: 'Partner Companies' },
  { metric: '50K+', label: 'Students Placed' }
];

export const CampusSection: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Campus Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {placementStats.map((stat, index) => (
          <Card key={index} className="p-6 text-center bg-gradient-to-br from-card to-primary/5">
            <div className="text-3xl font-bold text-primary mb-2">{stat.metric}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Campus Events */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Upcoming Campus Events</h2>
            <p className="text-muted-foreground">Connect with top recruiters at premier institutions</p>
          </div>
          <Button variant="outline">View All Events</Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campusEvents.map((event) => (
            <Card key={event.id} className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                {event.featured && <Badge variant="secondary" className="bg-primary/10 text-primary">Featured</Badge>}
              </div>
              
              <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
              <p className="text-muted-foreground mb-3">{event.university}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{event.companies} companies, {event.attendees} attendees</span>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full group">
                Register Now
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Campus Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-card to-primary/5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center mb-4">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Career Guidance</h3>
          <p className="text-muted-foreground mb-4">Get personalized career counseling from industry experts</p>
          <Button variant="outline" size="sm">Learn More</Button>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-card to-secondary/5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/20 flex items-center justify-center mb-4">
            <Award className="h-6 w-6 text-secondary" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Skill Certification</h3>
          <p className="text-muted-foreground mb-4">Enhance your profile with industry-recognized certifications</p>
          <Button variant="outline" size="sm">Explore Courses</Button>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-card to-accent/5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/20 flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-accent" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Alumni Network</h3>
          <p className="text-muted-foreground mb-4">Connect with successful alumni for mentorship and guidance</p>
          <Button variant="outline" size="sm">Join Network</Button>
        </Card>
      </div>
    </div>
  );
};