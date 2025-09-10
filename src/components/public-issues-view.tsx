import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { 
  ArrowLeft,
  Search, 
  Filter, 
  MapPin, 
  Clock,
  CheckCircle,
  AlertTriangle,
  ThumbsUp,
  Eye,
  Calendar,
  Building,
  Lightbulb,
  Truck,
  TreePine,
  Shield,
  TrendingUp
} from 'lucide-react';
import { mockIssues, categoryColors, statusColors, priorityColors } from '../data/mockData';
import { CivicIssue } from '../types/index';

interface PublicIssuesViewProps {
  onNavigate: (page: string) => void;
}

const categoryIcons = {
  'roads': Building,
  'infrastructure': Lightbulb,
  'sanitation': Truck,
  'public-safety': Shield,
  'environmental': TreePine
};

export function PublicIssuesView({ onNavigate }: PublicIssuesViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedIssue, setSelectedIssue] = useState<CivicIssue | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredIssues = mockIssues.filter(issue => {
    const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || issue.status === selectedStatus;
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.location.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const handleViewDetails = (issue: CivicIssue) => {
    setSelectedIssue(issue);
    setIsDetailOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertTriangle className="size-4 text-destructive" />;
      case 'in-progress':
        return <Clock className="size-4 text-yellow-600" />;
      case 'resolved':
        return <CheckCircle className="size-4 text-green-600" />;
      default:
        return <Clock className="size-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || Building;
    return <IconComponent className="size-4" />;
  };

  const stats = {
    total: mockIssues.length,
    open: mockIssues.filter(i => i.status === 'open').length,
    inProgress: mockIssues.filter(i => i.status === 'in-progress').length,
    resolved: mockIssues.filter(i => i.status === 'resolved').length
  };

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
                <h1 className="text-xl font-bold">Community Issues</h1>
                <p className="text-sm text-muted-foreground">Track what's happening in your area</p>
              </div>
            </div>
            
            <Button 
              onClick={() => onNavigate('dashboard')}
              variant="outline"
            >
              Staff Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Issues</div>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.open}</div>
              <div className="text-sm text-muted-foreground">Open</div>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
              <div className="text-sm text-muted-foreground">Resolved</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="size-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search issues..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="roads">Roads & Transportation</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="sanitation">Sanitation</SelectItem>
                  <SelectItem value="public-safety">Public Safety</SelectItem>
                  <SelectItem value="environmental">Environmental</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredIssues.length} of {mockIssues.length} issues
            </div>
          </CardContent>
        </Card>

        {/* Issues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIssues.map((issue) => (
            <Card 
              key={issue.id} 
              className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => handleViewDetails(issue)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(issue.category)}
                    <Badge 
                      variant="outline"
                      className="text-xs"
                      style={{ 
                        borderColor: categoryColors[issue.category],
                        color: categoryColors[issue.category]
                      }}
                    >
                      {issue.category.replace('-', ' ')}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(issue.status)}
                    <Badge 
                      variant="outline"
                      className="text-xs capitalize"
                      style={{ 
                        borderColor: statusColors[issue.status],
                        color: statusColors[issue.status]
                      }}
                    >
                      {issue.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>

                <h3 className="font-semibold mb-2 line-clamp-2">{issue.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                  {issue.description}
                </p>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="size-3" />
                    <span className="truncate">{issue.location.address}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    <span>Reported {formatDate(issue.createdAt)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="size-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{issue.votes}</span>
                    <span className="text-xs text-muted-foreground">votes</span>
                  </div>
                  
                  <Badge 
                    variant="outline"
                    className="text-xs"
                    style={{ 
                      borderColor: priorityColors[issue.priority],
                      color: priorityColors[issue.priority]
                    }}
                  >
                    {issue.priority} priority
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredIssues.length === 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <Search className="size-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No issues found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or check back later for updates
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Issue Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Issue Details</DialogTitle>
          </DialogHeader>
          
          {selectedIssue && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">{selectedIssue.title}</h3>
                <p className="text-muted-foreground">{selectedIssue.description}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Category</label>
                  <div className="flex items-center gap-2 mt-1">
                    {getCategoryIcon(selectedIssue.category)}
                    <Badge 
                      variant="outline"
                      style={{ 
                        borderColor: categoryColors[selectedIssue.category],
                        color: categoryColors[selectedIssue.category]
                      }}
                    >
                      {selectedIssue.category.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground">Status</label>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(selectedIssue.status)}
                    <Badge 
                      variant="outline"
                      className="capitalize"
                      style={{ 
                        borderColor: statusColors[selectedIssue.status],
                        color: statusColors[selectedIssue.status]
                      }}
                    >
                      {selectedIssue.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground">Priority</label>
                  <Badge 
                    variant="outline"
                    className="mt-1 capitalize"
                    style={{ 
                      borderColor: priorityColors[selectedIssue.priority],
                      color: priorityColors[selectedIssue.priority]
                    }}
                  >
                    {selectedIssue.priority}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      <MapPin className="size-4" />
                      Location
                    </label>
                    <p className="mt-1">{selectedIssue.location.address}</p>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground">Department</label>
                    <p className="mt-1">{selectedIssue.department}</p>
                    {selectedIssue.assignedTo && (
                      <p className="text-sm text-muted-foreground">
                        Assigned to: {selectedIssue.assignedTo.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      <Calendar className="size-4" />
                      Timeline
                    </label>
                    <div className="space-y-1 text-sm mt-1">
                      <p>Reported: {formatDate(selectedIssue.createdAt)}</p>
                      <p>Updated: {formatDate(selectedIssue.updatedAt)}</p>
                      {selectedIssue.resolvedAt && (
                        <p className="text-green-600">Resolved: {formatDate(selectedIssue.resolvedAt)}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      <ThumbsUp className="size-4" />
                      Community Support
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-semibold">{selectedIssue.votes}</span>
                      <span className="text-sm text-muted-foreground">citizens support this</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedIssue.status !== 'resolved' && (
                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" className="flex-1">
                    <ThumbsUp className="size-4 mr-2" />
                    Support This Issue
                  </Button>

                </div>
              )}

              {selectedIssue.status === 'resolved' && (
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-5 text-green-600" />
                    <span className="font-medium text-green-800">Issue Resolved</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    This issue has been successfully resolved by the {selectedIssue.department}.
                    {selectedIssue.resolvedAt && ` Completed on ${formatDate(selectedIssue.resolvedAt)}.`}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}