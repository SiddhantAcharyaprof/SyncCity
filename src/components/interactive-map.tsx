import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  MapPin, 
  Search, 
  Filter, 
  Eye,
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { mockIssues, categoryColors, statusColors, priorityColors } from '../data/mockData';
import { CivicIssue } from '../types/index';

interface InteractiveMapProps {
  onIssueSelect?: (issue: CivicIssue) => void;
}

export function InteractiveMap({ onIssueSelect }: InteractiveMapProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedIssue, setSelectedIssue] = useState<CivicIssue | null>(null);

  const filteredIssues = mockIssues.filter(issue => {
    const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || issue.status === selectedStatus;
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const handleIssueClick = (issue: CivicIssue) => {
    setSelectedIssue(issue);
    onIssueSelect?.(issue);
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
        return <MapPin className="size-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="size-5" />
            Interactive Issue Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <Input
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
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
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Placeholder */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>City Map View</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative bg-muted rounded-lg h-96 flex items-center justify-center">
              <div className="text-center space-y-2">
                <MapPin className="size-12 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">Interactive Map</p>
                <p className="text-sm text-muted-foreground">
                  Showing {filteredIssues.length} issues
                </p>
              </div>
              
              {/* Issue Markers Overlay */}
              <div className="absolute inset-4 overflow-hidden">
                {filteredIssues.slice(0, 12).map((issue, index) => (
                  <div
                    key={issue.id}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${20 + (index % 4) * 20}%`,
                      top: `${20 + Math.floor(index / 4) * 25}%`
                    }}
                    onClick={() => handleIssueClick(issue)}
                  >
                    <div className={`size-4 rounded-full border-2 border-white shadow-lg ${
                      selectedIssue?.id === issue.id ? 'ring-2 ring-blue-500' : ''
                    }`} 
                    style={{ 
                      backgroundColor: priorityColors[issue.priority]
                    }} />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Issue Details */}
        <Card>
          <CardHeader>
            <CardTitle>Issue Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedIssue ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">{selectedIssue.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedIssue.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant="outline"
                    style={{ 
                      borderColor: categoryColors[selectedIssue.category],
                      color: categoryColors[selectedIssue.category]
                    }}
                  >
                    {selectedIssue.category}
                  </Badge>
                  <Badge 
                    variant="outline"
                    style={{ 
                      borderColor: statusColors[selectedIssue.status],
                      color: statusColors[selectedIssue.status]
                    }}
                  >
                    {selectedIssue.status}
                  </Badge>
                  <Badge 
                    variant="outline"
                    style={{ 
                      borderColor: priorityColors[selectedIssue.priority],
                      color: priorityColors[selectedIssue.priority]
                    }}
                  >
                    {selectedIssue.priority}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span>{selectedIssue.location.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Department:</span>
                    <span>{selectedIssue.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reported by:</span>
                    <span>{selectedIssue.reportedBy.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Votes:</span>
                    <span>{selectedIssue.votes}</span>
                  </div>
                  {selectedIssue.assignedTo && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Assigned to:</span>
                      <span>{selectedIssue.assignedTo.name}</span>
                    </div>
                  )}
                </div>

                <Button size="sm" className="w-full">
                  <Eye className="size-4 mr-2" />
                  View Full Details
                </Button>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <MapPin className="size-8 mx-auto mb-2" />
                <p>Click on a map marker to view issue details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Map Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <h4 className="font-medium mb-2">Priority</h4>
              <div className="space-y-1">
                {Object.entries(priorityColors).map(([priority, color]) => (
                  <div key={priority} className="flex items-center gap-2 text-sm">
                    <div className="size-3 rounded-full border border-white shadow-sm" style={{ backgroundColor: color }} />
                    <span className="capitalize">{priority}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Status</h4>
              <div className="space-y-1">
                {Object.entries(statusColors).map(([status, color]) => (
                  <div key={status} className="flex items-center gap-2 text-sm">
                    {getStatusIcon(status)}
                    <span className="capitalize">{status.replace('-', ' ')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-medium mb-2">Categories</h4>
              <div className="grid grid-cols-2 gap-1">
                {Object.entries(categoryColors).map(([category, color]) => (
                  <div key={category} className="flex items-center gap-2 text-sm">
                    <div className="size-3 rounded-sm" style={{ backgroundColor: color }} />
                    <span className="capitalize">{category.replace('-', ' ')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}