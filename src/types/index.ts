export interface CivicIssue {
  id: string;
  title: string;
  description: string;
  category: 'roads' | 'infrastructure' | 'sanitation' | 'public-safety' | 'environmental';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  department: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  reportedBy: {
    name: string;
    email: string;
    phone?: string;
  };
  assignedTo?: {
    name: string;
    department: string;
  };
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  images: string[];
  votes: number;
}

export interface DashboardStats {
  totalIssues: number;
  openIssues: number;
  inProgressIssues: number;
  resolvedIssues: number;
  avgResolutionTime: number;
  categoryBreakdown: Record<string, number>;
  departmentWorkload: Record<string, number>;
}

export interface FilterOptions {
  category: string[];
  status: string[];
  priority: string[];
  department: string[];
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
}