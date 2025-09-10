import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  FileText
} from 'lucide-react';
import { mockStats, categoryColors } from '../data/mockData';

const categoryData = Object.entries(mockStats.categoryBreakdown).map(([category, count]) => ({
  category: category.charAt(0).toUpperCase() + category.slice(1),
  count,
  color: categoryColors[category as keyof typeof categoryColors]
}));

const departmentData = Object.entries(mockStats.departmentWorkload).map(([department, count]) => ({
  department,
  count
}));

const weeklyTrend = [
  { day: 'Mon', issues: 12, resolved: 8 },
  { day: 'Tue', issues: 19, resolved: 11 },
  { day: 'Wed', issues: 15, resolved: 14 },
  { day: 'Thu', issues: 22, resolved: 9 },
  { day: 'Fri', issues: 18, resolved: 16 },
  { day: 'Sat', issues: 8, resolved: 5 },
  { day: 'Sun', issues: 6, resolved: 4 }
];

export function OverviewDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
            <FileText className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalIssues}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="size-3 inline mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
            <AlertTriangle className="size-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{mockStats.openIssues}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="size-3 inline mr-1" />
              -5% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="size-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{mockStats.resolvedIssues}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="size-3 inline mr-1" />
              +18% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution</CardTitle>
            <Clock className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.avgResolutionTime}d</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="size-3 inline mr-1" />
              -0.5d from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issues by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Issues by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ category, count }) => `${category}: ${count}`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="issues" stroke="#ef4444" name="New Issues" />
                <Line type="monotone" dataKey="resolved" stroke="#10b981" name="Resolved" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Workload */}
      <Card>
        <CardHeader>
          <CardTitle>Department Workload</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Department Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Department Resolution Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(mockStats.departmentWorkload).map(([department, count]) => {
            const total = count;
            const resolved = Math.floor(count * 0.6); // Mock 60% resolution rate
            const progress = (resolved / total) * 100;
            
            return (
              <div key={department} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{department}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {resolved}/{total}
                    </span>
                    <Badge variant={progress > 70 ? "default" : progress > 50 ? "secondary" : "destructive"}>
                      {Math.round(progress)}%
                    </Badge>
                  </div>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}