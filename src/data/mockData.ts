import { CivicIssue, DashboardStats } from '../types/index';

export const mockIssues: CivicIssue[] = [
  {
    id: '1',
    title: 'Large pothole on Main Street',
    description: 'Deep pothole causing vehicle damage near intersection with Oak Ave. Several cars have been damaged.',
    category: 'roads',
    status: 'open',
    priority: 'high',
    department: 'Public Works',
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: '123 Main Street, Downtown'
    },
    reportedBy: {
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567'
    },
    assignedTo: {
      name: 'Mike Rodriguez',
      department: 'Public Works'
    },
    createdAt: '2024-01-15T09:30:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
    images: [],
    votes: 23
  },
  {
    id: '2',
    title: 'Broken streetlight on Elm Street',
    description: 'Streetlight has been out for 3 days, creating safety hazard for pedestrians at night.',
    category: 'infrastructure',
    status: 'in-progress',
    priority: 'medium',
    department: 'Electrical Services',
    location: {
      lat: 40.7158,
      lng: -74.0090,
      address: '456 Elm Street, Midtown'
    },
    reportedBy: {
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com'
    },
    assignedTo: {
      name: 'David Chen',
      department: 'Electrical Services'
    },
    createdAt: '2024-01-14T18:45:00Z',
    updatedAt: '2024-01-15T10:15:00Z',
    images: [],
    votes: 12
  },
  {
    id: '3',
    title: 'Overflowing trash bins near bus stop',
    description: 'Multiple trash bins overflowing for over a week. Attracting pests and creating unsanitary conditions.',
    category: 'sanitation',
    status: 'open',
    priority: 'medium',
    department: 'Sanitation',
    location: {
      lat: 40.7098,
      lng: -74.0130,
      address: '789 Broadway, City Center'
    },
    reportedBy: {
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      phone: '(555) 987-6543'
    },
    createdAt: '2024-01-13T16:20:00Z',
    updatedAt: '2024-01-13T16:20:00Z',
    images: [],
    votes: 18
  },
  {
    id: '4',
    title: 'Damaged traffic signal',
    description: 'Traffic signal stuck on red for eastbound traffic. Causing major delays during rush hour.',
    category: 'roads',
    status: 'urgent',
    priority: 'urgent',
    department: 'Traffic Management',
    location: {
      lat: 40.7188,
      lng: -74.0020,
      address: '321 First Avenue, Uptown'
    },
    reportedBy: {
      name: 'Robert Wilson',
      email: 'r.wilson@email.com'
    },
    assignedTo: {
      name: 'Lisa Park',
      department: 'Traffic Management'
    },
    createdAt: '2024-01-15T07:30:00Z',
    updatedAt: '2024-01-15T08:00:00Z',
    images: [],
    votes: 45
  },
  {
    id: '5',
    title: 'Broken fire hydrant',
    description: 'Fire hydrant damaged by vehicle impact. Water leaking and hydrant not operational.',
    category: 'public-safety',
    status: 'in-progress',
    priority: 'high',
    department: 'Water Department',
    location: {
      lat: 40.7208,
      lng: -74.0050,
      address: '654 Second Street, North Side'
    },
    reportedBy: {
      name: 'James Miller',
      email: 'j.miller@email.com',
      phone: '(555) 456-7890'
    },
    assignedTo: {
      name: 'Tony Russo',
      department: 'Water Department'
    },
    createdAt: '2024-01-12T11:15:00Z',
    updatedAt: '2024-01-14T09:30:00Z',
    images: [],
    votes: 8
  },
  {
    id: '6',
    title: 'Clogged storm drain',
    description: 'Storm drain completely blocked causing flooding during recent rain. Standing water remains.',
    category: 'environmental',
    status: 'open',
    priority: 'high',
    department: 'Stormwater Management',
    location: {
      lat: 40.7078,
      lng: -74.0110,
      address: '987 Third Avenue, South District'
    },
    reportedBy: {
      name: 'Jennifer Brown',
      email: 'jen.brown@email.com'
    },
    createdAt: '2024-01-14T20:30:00Z',
    updatedAt: '2024-01-14T20:30:00Z',
    images: [],
    votes: 31
  },
  {
    id: '7',
    title: 'Cracked sidewalk creating trip hazard',
    description: 'Large crack in sidewalk has worsened. Multiple people have tripped. Needs immediate repair.',
    category: 'infrastructure',
    status: 'resolved',
    priority: 'medium',
    department: 'Public Works',
    location: {
      lat: 40.7148,
      lng: -74.0080,
      address: '147 Fourth Street, Downtown'
    },
    reportedBy: {
      name: 'Michael Davis',
      email: 'm.davis@email.com',
      phone: '(555) 234-5678'
    },
    assignedTo: {
      name: 'Mike Rodriguez',
      department: 'Public Works'
    },
    createdAt: '2024-01-10T14:20:00Z',
    updatedAt: '2024-01-14T16:45:00Z',
    resolvedAt: '2024-01-14T16:45:00Z',
    images: [],
    votes: 15
  },
  {
    id: '8',
    title: 'Illegal dumping site',
    description: 'Large amount of construction debris dumped in alley. Contains potentially hazardous materials.',
    category: 'sanitation',
    status: 'open',
    priority: 'high',
    department: 'Code Enforcement',
    location: {
      lat: 40.7168,
      lng: -74.0040,
      address: 'Alley behind 258 Fifth Street, Industrial'
    },
    reportedBy: {
      name: 'Linda Thompson',
      email: 'linda.t@email.com'
    },
    createdAt: '2024-01-15T12:00:00Z',
    updatedAt: '2024-01-15T12:00:00Z',
    images: [],
    votes: 7
  }
];

export const mockStats: DashboardStats = {
  totalIssues: 156,
  openIssues: 89,
  inProgressIssues: 34,
  resolvedIssues: 33,
  avgResolutionTime: 4.2,
  categoryBreakdown: {
    'roads': 45,
    'infrastructure': 38,
    'sanitation': 29,
    'public-safety': 21,
    'environmental': 23
  },
  departmentWorkload: {
    'Public Works': 42,
    'Sanitation': 29,
    'Electrical Services': 23,
    'Traffic Management': 18,
    'Water Department': 15,
    'Stormwater Management': 12,
    'Code Enforcement': 17
  }
};

export const categoryColors = {
  'roads': '#ef4444',
  'infrastructure': '#f59e0b',
  'sanitation': '#10b981',
  'public-safety': '#8b5cf6',
  'environmental': '#06b6d4'
};

export const statusColors = {
  'open': '#ef4444',
  'in-progress': '#f59e0b',
  'resolved': '#10b981',
  'closed': '#6b7280'
};

export const priorityColors = {
  'low': '#10b981',
  'medium': '#f59e0b',
  'high': '#ef4444',
  'urgent': '#dc2626'
};