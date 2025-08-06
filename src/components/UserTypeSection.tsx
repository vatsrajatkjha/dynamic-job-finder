import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Users, GraduationCap, ArrowRight, CheckCircle, Target, Users2, Award, BookOpen, TrendingUp } from 'lucide-react';

export const UserTypeSection: React.FC = () => {
  const userTypes = [
    {
      id: 'organizations',
      title: 'For Organizations',
      subtitle: 'Hire top talent efficiently',
      icon: Building,
      color: 'primary',
      features: [
        'Campus recruitment programs',
        'AI-powered candidate matching',
        'Bulk hiring solutions',
        'Interview scheduling & management',
        'Analytics & reporting dashboard'
      ],
      cta: 'Start Hiring',
      highlight: 'Most Popular'
    },
    {
      id: 'candidates',
      title: 'For Candidates',
      subtitle: 'Find your dream career',
      icon: Users,
      color: 'secondary',
      features: [
        'Personalized job recommendations',
        'Resume builder & optimization',
        'Interview preparation resources',
        'Skill development courses',
        'Career guidance & mentorship'
      ],
      cta: 'Find Jobs',
      highlight: 'Free Forever'
    },
    {
      id: 'colleges',
      title: 'For Colleges',
      subtitle: 'Enhance student placements',
      icon: GraduationCap,
      color: 'accent',
      features: [
        'Campus placement management',
        'Student skill tracking',
        'Company partnership portal',
        'Placement analytics & reports',
        'Alumni network integration'
      ],
      cta: 'Partner With Us',
      highlight: 'Trusted by 500+ Colleges'
    }
  ];

  const stats = [
    { icon: Target, value: '95%', label: 'Success Rate', color: 'primary' },
    { icon: Users2, value: '1M+', label: 'Active Users', color: 'secondary' },
    { icon: Award, value: '500+', label: 'Partner Colleges', color: 'accent' },
    { icon: TrendingUp, value: '50K+', label: 'Jobs Posted', color: 'primary' }
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-background via-secondary/5 to-primary/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-primary/80 bg-clip-text text-transparent">
            Built for Everyone in the Ecosystem
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Whether you're a recruiter, job seeker, or educational institution, Ant-re provides tailored solutions for your specific needs.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="p-6 text-center border-primary/10 bg-gradient-to-br from-card to-primary/5 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                  <IconComponent className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            );
          })}
        </div>

        {/* User Type Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {userTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <Card 
                key={type.id} 
                className="relative p-8 border-2 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl group overflow-hidden"
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Highlight badge */}
                {type.highlight && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                      {type.highlight}
                    </Badge>
                  </div>
                )}

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/30 transition-all duration-300">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{type.title}</h3>
                      <p className="text-muted-foreground">{type.subtitle}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {type.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button 
                    className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300" 
                    variant="outline"
                  >
                    {type.cta}
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Career Journey?</h3>
            <p className="text-muted-foreground">
              Join thousands of successful professionals who found their perfect match through Ant-re's innovative platform.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get Started Free
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline">
              <BookOpen className="h-5 w-5 mr-2" />
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};