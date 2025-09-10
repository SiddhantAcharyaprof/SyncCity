import React from 'react';
import { cn } from './ui/utils';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Map, 
  FileText, 
  BarChart3, 
  Settings, 
  Bell, 
  Search,
  Filter,
  Plus
} from 'lucide-react';
import logoImage from 'figma:asset/96de6bf605f41e6c7b3704bde0c36a8b6bcc59f5.png';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

const navigation = [
  { id: 'overview', name: 'Overview', icon: BarChart3 },
  { id: 'map', name: 'Map View', icon: Map },
  { id: 'issues', name: 'All Issues', icon: FileText },
  { id: 'settings', name: 'Settings', icon: Settings },
];

export function DashboardLayout({ children, activeTab, onTabChange, className }: DashboardLayoutProps) {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg flex items-center justify-center" style={{backgroundColor: '#699e7e'}}>
              <img 
                src={logoImage}
                alt="SyncCity Logo"
                className="size-8 object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-semibold" style={{color: '#699e7e'}}>SyncCity Dashboard</h1>
              <p className="text-sm text-muted-foreground">Municipal Issue Management</p>
            </div>
          </div>
          
          <div className="ml-auto flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="size-4" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 size-5 text-xs p-0 flex items-center justify-center">
                3
              </Badge>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-card min-h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-2">
            {navigation.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => onTabChange(item.id)}
              >
                <item.icon className="size-4 mr-3" />
                {item.name}
              </Button>
            ))}
          </nav>

          {/* Quick Stats */}
          <div className="p-4 border-t mt-4">
            <h3 className="text-sm font-medium mb-3">Quick Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Open Issues</span>
                <span className="font-medium">89</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">In Progress</span>
                <span className="font-medium">34</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Urgent</span>
                <span className="font-medium text-destructive">12</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}