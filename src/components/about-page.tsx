import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ArrowLeft,
  MapPin, 
  Users, 
  Clock, 
  CheckCircle, 
  Target,
  Eye,
  Shield,
  Smartphone,
  BarChart3,
  Heart,
  Award,
  Zap,
  User
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const values = [
    {
      icon: Eye,
      title: 'Transparency',
      description: 'Open access to issue tracking and resolution progress for all citizens.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Empowering residents to actively participate in improving their neighborhoods.'
    },
    {
      icon: Zap,
      title: 'Efficiency',
      description: 'Streamlined processes that get issues resolved faster than ever before.'
    },
    {
      icon: Shield,
      title: 'Trust',
      description: 'Building confidence through reliable service and consistent communication.'
    }
  ];

  const features = [
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description: 'Report issues instantly from your phone with photo uploads and GPS location.'
    },
    {
      icon: MapPin,
      title: 'Interactive Mapping',
      description: 'Visual representation of all issues across the city for better awareness.'
    },
    {
      icon: BarChart3,
      title: 'Public Analytics',
      description: 'Transparent reporting on response times, resolution rates, and trends.'
    },
    {
      icon: Clock,
      title: 'Real-Time Updates',
      description: 'Get notified when your reports are reviewed, assigned, and resolved.'
    }
  ];

  const impact = [
    { metric: '2,500+', label: 'Issues Resolved', description: 'Since platform launch' },
    { metric: '4.2 days', label: 'Avg Response Time', description: 'Down from 12 days' },
    { metric: '87%', label: 'Citizen Satisfaction', description: 'Platform user rating' },
    { metric: '15,000+', label: 'Active Users', description: 'Engaged community members' }
  ];

  const team = [
    {
      role: 'City Manager',
      name: 'Sarah Chen',
      description: 'Leading municipal innovation and citizen engagement initiatives.'
    },
    {
      role: 'Public Works Director',
      name: 'Mike Rodriguez',
      description: 'Overseeing infrastructure maintenance and improvement projects.'
    },
    {
      role: 'IT Director',
      name: 'Alex Thompson',
      description: 'Implementing digital solutions for government transparency.'
    },
    {
      role: 'Community Liaison',
      name: 'Maria Garcia',
      description: 'Connecting citizen feedback with municipal action plans.'
    }
  ];

  return (
    <div className="min-h-screen" style={{backgroundColor: '#699e7e1a'}}>
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('home')}
              >
                <ArrowLeft className="size-4 mr-2" />
                Back to Home
              </Button>
              <div>
                <h1 className="text-2xl font-bold" style={{color: '#699e7e'}}>About SyncCity</h1>
                <p className="text-sm text-muted-foreground">Building better communities together</p>
              </div>
            </div>
            
            <Button 
              onClick={() => onNavigate('public-issues')}
              style={{backgroundColor: '#699e7e'}}
            >
              View Issues
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transforming{' '}
              <span style={{color: '#699e7e'}}>
                Civic Engagement
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              SyncCity is more than a platform—it's a bridge connecting citizens and government, 
              making communities stronger through transparency, participation, and shared responsibility.
            </p>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white border-0 shadow-2xl">
            <CardContent className="p-12 text-center">
              <Target className="size-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                To create a seamless connection between citizens and local government, enabling efficient 
                reporting, transparent tracking, and swift resolution of community issues while fostering 
                civic pride and engagement.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Impact Statistics */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Making a Real Difference</h2>
            <p className="text-lg text-muted-foreground">
              See how CivicReport is transforming our community
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impact.map((item, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{item.metric}</div>
                  <div className="font-semibold mb-1">{item.label}</div>
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do in service of our community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="size-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-100 to-green-100 flex items-center justify-center">
                    <value.icon className="size-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Platform Features */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Designed with both citizens and municipal staff in mind
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="size-12 rounded-xl bg-gradient-to-r from-blue-100 to-green-100 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="size-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A simple, effective process that gets results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="size-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Observe</h3>
                <p className="text-muted-foreground">
                  Citizens identify and track community issues through our easy-to-use interface with location details.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="size-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Process</h3>
                <p className="text-muted-foreground">
                  Municipal staff review, prioritize, and assign issues to the appropriate departments automatically.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="size-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Resolve</h3>
                <p className="text-muted-foreground">
                  Teams address issues efficiently while citizens track progress and receive updates throughout.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dedicated public servants working to make our community better
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center">
                <CardContent className="p-6">
                  <div className="size-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-100 to-green-100 flex items-center justify-center">
                    <User className="size-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-1">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3">{member.role}</Badge>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section>
          <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white border-0 shadow-2xl">
            <CardContent className="p-12 text-center">
              <Heart className="size-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Every report matters. Every voice counts. Together, we can build a stronger, 
                more responsive community that works for everyone.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => onNavigate('report')}
                  className="text-lg px-8"
                >
                  Report Your First Issue
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => onNavigate('public-issues')}
                  className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Explore Community Issues
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}