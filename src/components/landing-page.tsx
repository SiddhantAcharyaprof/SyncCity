import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Smartphone,
  Eye,
  AlertTriangle,
  BarChart3,
  Shield,
  FileText
} from 'lucide-react';
import { mockStats } from '../data/mockData';
import logoImage from 'figma:asset/96de6bf605f41e6c7b3704bde0c36a8b6bcc59f5.png';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const stats = [
    {
      label: 'Issues Reported',
      value: mockStats.totalIssues.toLocaleString(),
      icon: FileText,
      description: 'Total community reports'
    },
    {
      label: 'Issues Resolved',
      value: mockStats.resolvedIssues.toLocaleString(),
      icon: CheckCircle,
      description: 'Successfully completed'
    },
    {
      label: 'Avg Response Time',
      value: `${mockStats.avgResolutionTime} days`,
      icon: Clock,
      description: 'Municipal response time'
    },
    {
      label: 'Active Citizens',
      value: '2,847',
      icon: Users,
      description: 'Engaged community members'
    }
  ];

  const features = [
    {
      icon: Eye,
      title: 'Track Progress',
      description: 'Follow civic issues from submission to resolution with real-time updates.'
    },
    {
      icon: MapPin,
      title: 'Explore Issues',
      description: 'View all community issues on an interactive map to stay informed.'
    },
    {
      icon: BarChart3,
      title: 'Transparency',
      description: 'Access public analytics and see how your city is improving.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Vote on issues and help prioritize what matters most to your community.'
    },
    {
      icon: Shield,
      title: 'Reliable Service',
      description: 'Direct connection to city departments ensures your voice is heard.'
    },
    {
      icon: Smartphone,
      title: 'Easy Access',
      description: 'Access information and track updates from any device at any time.'
    }
  ];

  const recentResolvedIssues = [
    { title: 'Cracked sidewalk on Fourth Street', resolvedDays: 2 },
    { title: 'Broken streetlight on Elm Street', resolvedDays: 1 },
    { title: 'Pothole repair on Main Street', resolvedDays: 3 }
  ];

  return (
    <div className="min-h-screen" style={{backgroundColor: '#699e7e1a'}}>
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-14 rounded-xl flex items-center justify-center" style={{backgroundColor: '#699e7e'}}>
                <img 
                  src={logoImage}
                  alt="SyncCity Logo"
                  className="size-10 object-contain"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold" style={{color: '#699e7e'}}>SyncCity</h1>
                <p className="text-sm text-muted-foreground">Metropolitan City</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('public-issues')}
              >
                View Issues
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('about')}
              >
                About
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onNavigate('dashboard')}
              >
                Staff Login
              </Button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button 
                onClick={() => onNavigate('dashboard')}
                size="sm"
                variant="outline"
              >
                Staff Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span 
              className="bg-gradient-to-r from-black to-[#699e7e] bg-clip-text text-transparent"
            >
              Spot it. Capture it. Fix it.
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Track civic issues, monitor their progress, and stay informed about community improvements. 
            From potholes to broken streetlights, transparency drives positive change.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => onNavigate('public-issues')}
              className="text-lg px-8" 
              style={{backgroundColor: '#699e7e'}} 
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5a8a6b'} 
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#699e7e'}
            >
              <Eye className="size-5 mr-2" />
              View Community Issues
              <ArrowRight className="size-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => onNavigate('dashboard')}
              className="text-lg px-8"
            >
              <BarChart3 className="size-5 mr-2" />
              View Analytics
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-0 shadow-lg bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="size-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#699e7e33'}}>
                  <stat.icon className="size-6" style={{color: '#699e7e'}} />
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm font-medium mb-1">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white/60 backdrop-blur-sm border-y">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform provides transparency and accountability for civic engagement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="size-12 mb-4 rounded-xl flex items-center justify-center" style={{backgroundColor: '#699e7e33'}}>
                    <feature.icon className="size-6" style={{color: '#699e7e'}} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Recently Resolved */}
          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle className="size-5" />
                Recently Resolved
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentResolvedIssues.map((issue, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{issue.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Resolved in {issue.resolvedDays} day{issue.resolvedDays !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Completed
                  </Badge>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => onNavigate('public-issues')}
              >
                View All Issues
              </Button>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="border-0 shadow-lg text-white" style={{backgroundColor: '#699e7e'}}>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Stay Informed</h3>
                  <p className="text-white/80 leading-relaxed">
                    Monitor civic improvements and track progress on community issues. 
                    See how your city is working to address local concerns and make improvements.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    className="w-full"
                    onClick={() => onNavigate('public-issues')}
                  >
                    <Eye className="size-5 mr-2" />
                    Explore Community Issues
                  </Button>
                  
                  <div className="flex items-center justify-center gap-4 text-sm text-white/80">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="size-4" />
                      Transparent process
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="size-4" />
                      Real-time updates
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="size-4" />
                      Community driven
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="size-12 rounded-lg flex items-center justify-center" style={{backgroundColor: '#699e7e'}}>
                  <img 
                    src={logoImage}
                    alt="SyncCity Logo"
                    className="size-8 object-contain"
                  />
                </div>
                <span className="text-2xl font-bold" style={{color: '#699e7e'}}>SyncCity</span>
              </div>
              <p className="text-gray-400 text-sm">
                Connecting citizens and government for a better community.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">For Citizens</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-auto p-0 text-gray-400 hover:text-white"
                    onClick={() => onNavigate('public-issues')}
                  >
                    View Issues
                  </Button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">For Government</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-auto p-0 text-gray-400 hover:text-white"
                    onClick={() => onNavigate('dashboard')}
                  >
                    Dashboard
                  </Button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>support@metropolitancity.gov</p>
                <p>(555) 123-4567</p>
                <p>City Hall, Main Street</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Metropolitan City. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}