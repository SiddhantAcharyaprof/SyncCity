import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { 
  Settings, 
  Bell, 
  Users, 
  Shield, 
  Database,
  Mail,
  Smartphone,
  Globe,
  Clock,
  Filter
} from 'lucide-react';

export function SettingsPanel() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    weeklyReport: true,
    urgentOnly: false
  });

  const [autoAssignment, setAutoAssignment] = useState({
    enabled: true,
    byLocation: true,
    byCategory: true,
    workloadBalance: true
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Settings className="size-5" />
        <h1>Dashboard Settings</h1>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="size-4" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city-name">City/Municipality Name</Label>
                  <Input id="city-name" defaultValue="Metropolitan City" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="america/new_york">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america/new_york">Eastern Time</SelectItem>
                      <SelectItem value="america/chicago">Central Time</SelectItem>
                      <SelectItem value="america/denver">Mountain Time</SelectItem>
                      <SelectItem value="america/los_angeles">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" type="email" defaultValue="support@metropolitancity.gov" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="working-hours">Working Hours</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Select defaultValue="08:00">
                    <SelectTrigger>
                      <SelectValue placeholder="Start time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="06:00">6:00 AM</SelectItem>
                      <SelectItem value="07:00">7:00 AM</SelectItem>
                      <SelectItem value="08:00">8:00 AM</SelectItem>
                      <SelectItem value="09:00">9:00 AM</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="17:00">
                    <SelectTrigger>
                      <SelectValue placeholder="End time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="16:00">4:00 PM</SelectItem>
                      <SelectItem value="17:00">5:00 PM</SelectItem>
                      <SelectItem value="18:00">6:00 PM</SelectItem>
                      <SelectItem value="19:00">7:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="size-4" />
                Response Time Targets
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Urgent Issues</Label>
                  <Select defaultValue="1">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="2">2 hours</SelectItem>
                      <SelectItem value="4">4 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>High Priority</Label>
                  <Select defaultValue="24">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 hours</SelectItem>
                      <SelectItem value="24">24 hours</SelectItem>
                      <SelectItem value="48">48 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Medium Priority</Label>
                  <Select defaultValue="72">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="48">48 hours</SelectItem>
                      <SelectItem value="72">3 days</SelectItem>
                      <SelectItem value="120">5 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Low Priority</Label>
                  <Select defaultValue="168">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="120">5 days</SelectItem>
                      <SelectItem value="168">1 week</SelectItem>
                      <SelectItem value="336">2 weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="size-4" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch 
                    id="email-notifications"
                    checked={notifications.email}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, email: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive urgent notifications via SMS
                    </p>
                  </div>
                  <Switch 
                    id="sms-notifications"
                    checked={notifications.sms}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, sms: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Browser push notifications for real-time updates
                    </p>
                  </div>
                  <Switch 
                    id="push-notifications"
                    checked={notifications.push}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, push: checked }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="weekly-report">Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive weekly analytics summary
                    </p>
                  </div>
                  <Switch 
                    id="weekly-report"
                    checked={notifications.weeklyReport}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, weeklyReport: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="urgent-only">Urgent Issues Only</Label>
                    <p className="text-sm text-muted-foreground">
                      Only notify for urgent and high priority issues
                    </p>
                  </div>
                  <Switch 
                    id="urgent-only"
                    checked={notifications.urgentOnly}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, urgentOnly: checked }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="size-4" />
                Department Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Public Works', staff: 12, issues: 42, avgResponse: '2.3 days' },
                { name: 'Sanitation', staff: 8, issues: 29, avgResponse: '1.8 days' },
                { name: 'Electrical Services', staff: 6, issues: 23, avgResponse: '1.2 days' },
                { name: 'Traffic Management', staff: 4, issues: 18, avgResponse: '0.8 days' },
                { name: 'Water Department', staff: 5, issues: 15, avgResponse: '1.5 days' },
                { name: 'Stormwater Management', staff: 3, issues: 12, avgResponse: '3.1 days' },
                { name: 'Code Enforcement', staff: 4, issues: 17, avgResponse: '4.2 days' }
              ].map((dept) => (
                <div key={dept.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{dept.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {dept.staff} staff members • {dept.issues} active issues
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge variant="outline">{dept.avgResponse}</Badge>
                    <p className="text-xs text-muted-foreground">Avg Response</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="size-4" />
                Auto-Assignment Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-assignment">Enable Auto-Assignment</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically assign issues to departments
                    </p>
                  </div>
                  <Switch 
                    id="auto-assignment"
                    checked={autoAssignment.enabled}
                    onCheckedChange={(checked) => 
                      setAutoAssignment(prev => ({ ...prev, enabled: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="location-based">Location-Based Assignment</Label>
                    <p className="text-sm text-muted-foreground">
                      Assign based on geographic zones
                    </p>
                  </div>
                  <Switch 
                    id="location-based"
                    checked={autoAssignment.byLocation}
                    onCheckedChange={(checked) => 
                      setAutoAssignment(prev => ({ ...prev, byLocation: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="category-based">Category-Based Assignment</Label>
                    <p className="text-sm text-muted-foreground">
                      Assign based on issue category
                    </p>
                  </div>
                  <Switch 
                    id="category-based"
                    checked={autoAssignment.byCategory}
                    onCheckedChange={(checked) => 
                      setAutoAssignment(prev => ({ ...prev, byCategory: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="workload-balance">Workload Balancing</Label>
                    <p className="text-sm text-muted-foreground">
                      Balance assignments across team members
                    </p>
                  </div>
                  <Switch 
                    id="workload-balance"
                    checked={autoAssignment.workloadBalance}
                    onCheckedChange={(checked) => 
                      setAutoAssignment(prev => ({ ...prev, workloadBalance: checked }))
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Priority Escalation</h4>
                <div className="space-y-2">
                  <Label>Auto-escalate to high priority after:</Label>
                  <Select defaultValue="72">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24">24 hours</SelectItem>
                      <SelectItem value="48">48 hours</SelectItem>
                      <SelectItem value="72">72 hours</SelectItem>
                      <SelectItem value="168">1 week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="size-4" />
                External Integrations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[
                  { 
                    name: 'GIS Mapping System', 
                    status: 'Connected', 
                    description: 'Geographic Information System integration',
                    connected: true 
                  },
                  { 
                    name: 'Municipal Database', 
                    status: 'Connected', 
                    description: 'Core municipal management system',
                    connected: true 
                  },
                  { 
                    name: 'Work Order System', 
                    status: 'Disconnected', 
                    description: 'Legacy work order management',
                    connected: false 
                  },
                  { 
                    name: 'Budget Tracking', 
                    status: 'Connected', 
                    description: 'Financial impact tracking',
                    connected: true 
                  },
                  { 
                    name: 'Citizen Portal API', 
                    status: 'Connected', 
                    description: 'Public-facing reporting interface',
                    connected: true 
                  }
                ].map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{integration.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {integration.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={integration.connected ? "default" : "secondary"}>
                        {integration.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        {integration.connected ? 'Configure' : 'Connect'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-endpoint">API Endpoint</Label>
                <Input id="api-endpoint" defaultValue="https://api.metropolitancity.gov/civic-reports" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input id="api-key" type="password" defaultValue="••••••••••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input id="webhook-url" defaultValue="https://dashboard.metropolitancity.gov/webhooks/issues" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2 pt-6 border-t">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}