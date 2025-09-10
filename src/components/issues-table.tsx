import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { 
  Search, 
  Filter, 
  Eye,
  Edit,
  MoreHorizontal,
  CalendarDays,
  User,
  MapPin,
  ThumbsUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { mockIssues, categoryColors, statusColors, priorityColors } from '../data/mockData';
import { CivicIssue } from '../types/index';

export function IssuesTable() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedIssue, setSelectedIssue] = useState<CivicIssue | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredIssues = mockIssues.filter(issue => {
    const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || issue.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || issue.priority === selectedPriority;
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.location.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesStatus && matchesPriority && matchesSearch;
  });

  const handleViewDetails = (issue: CivicIssue) => {
    setSelectedIssue(issue);
    setIsDetailOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
        return <FileText className="size-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="size-5" />
            All Issues
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="size-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search issues, addresses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10"
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
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredIssues.length} of {mockIssues.length} issues
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Issue</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Votes</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIssues.map((issue) => (
                <TableRow key={issue.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{issue.title}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-xs">
                        {issue.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className="capitalize"
                      style={{ 
                        borderColor: categoryColors[issue.category],
                        color: categoryColors[issue.category]
                      }}
                    >
                      {issue.category.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(issue.status)}
                      <Badge 
                        variant="outline"
                        className="capitalize"
                        style={{ 
                          borderColor: statusColors[issue.status],
                          color: statusColors[issue.status]
                        }}
                      >
                        {issue.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className="capitalize"
                      style={{ 
                        borderColor: priorityColors[issue.priority],
                        color: priorityColors[issue.priority]
                      }}
                    >
                      {issue.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{issue.department}</div>
                    {issue.assignedTo && (
                      <div className="text-xs text-muted-foreground">
                        {issue.assignedTo.name}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm max-w-xs truncate">
                      {issue.location.address}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="size-3 text-muted-foreground" />
                      <span className="text-sm">{issue.votes}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {formatDate(issue.createdAt)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewDetails(issue)}
                      >
                        <Eye className="size-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Issue Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Issue Details</DialogTitle>
          </DialogHeader>
          
          {selectedIssue && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">{selectedIssue.title}</h3>
                <p className="text-muted-foreground mt-2">
                  {selectedIssue.description}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Category</label>
                  <Badge 
                    variant="outline"
                    className="mt-1 capitalize"
                    style={{ 
                      borderColor: categoryColors[selectedIssue.category],
                      color: categoryColors[selectedIssue.category]
                    }}
                  >
                    {selectedIssue.category.replace('-', ' ')}
                  </Badge>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      <MapPin className="size-4" />
                      Location
                    </label>
                    <p>{selectedIssue.location.address}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedIssue.location.lat.toFixed(4)}, {selectedIssue.location.lng.toFixed(4)}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      <User className="size-4" />
                      Reported By
                    </label>
                    <p>{selectedIssue.reportedBy.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedIssue.reportedBy.email}</p>
                    {selectedIssue.reportedBy.phone && (
                      <p className="text-sm text-muted-foreground">{selectedIssue.reportedBy.phone}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Department</label>
                    <p>{selectedIssue.department}</p>
                    {selectedIssue.assignedTo && (
                      <p className="text-sm text-muted-foreground">
                        Assigned to: {selectedIssue.assignedTo.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      <CalendarDays className="size-4" />
                      Timeline
                    </label>
                    <div className="space-y-1 text-sm">
                      <p>Created: {formatDate(selectedIssue.createdAt)}</p>
                      <p>Updated: {formatDate(selectedIssue.updatedAt)}</p>
                      {selectedIssue.resolvedAt && (
                        <p>Resolved: {formatDate(selectedIssue.resolvedAt)}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      <ThumbsUp className="size-4" />
                      Community Support
                    </label>
                    <p>{selectedIssue.votes} votes</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline">Edit Issue</Button>
                <Button variant="outline">Assign Team</Button>
                <Button>Update Status</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}