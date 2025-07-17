import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useModal } from "@/components/ui/modal";
import { 
  Activity, Shield, Lock, Users, Settings, Database,
  Eye, Download, Filter, Search, Calendar, Clock,
  User, FileText, Key, AlertTriangle, CheckCircle,
  XCircle, Info, Trash2, RefreshCw, Archive
} from "lucide-react";

interface ActivityLog {
  id: string;
  timestamp: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  action: string;
  category: "auth" | "user" | "data" | "system" | "security" | "api";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  success: boolean;
  duration?: number;
}

const mockActivityLogs: ActivityLog[] = [
  {
    id: "1",
    timestamp: "2025-01-16T16:45:30Z",
    user: {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
    },
    action: "User Login",
    category: "auth",
    severity: "low",
    description: "User successfully logged into the system",
    details: { method: "password", mfa: true },
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    success: true,
    duration: 1250
  },
  {
    id: "2",
    timestamp: "2025-01-16T16:30:15Z",
    user: {
      id: "2",
      name: "Michael Chen",
      email: "michael.chen@company.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael"
    },
    action: "Permission Modified",
    category: "security",
    severity: "high",
    description: "User permissions were modified for team access",
    details: { 
      target_user: "emily.rodriguez@company.com",
      permissions_added: ["data_export", "user_view"],
      permissions_removed: []
    },
    ipAddress: "192.168.1.102",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    success: true,
    duration: 850
  },
  {
    id: "3",
    timestamp: "2025-01-16T16:15:45Z",
    user: {
      id: "3",
      name: "Emily Rodriguez",
      email: "emily.rodriguez@company.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily"
    },
    action: "Data Export",
    category: "data",
    severity: "medium",
    description: "User exported customer data to CSV format",
    details: { 
      format: "CSV",
      records: 1250,
      file_size: "2.4MB",
      columns: ["name", "email", "created_at", "last_login"]
    },
    ipAddress: "192.168.1.105",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    success: true,
    duration: 3200
  },
  {
    id: "4",
    timestamp: "2025-01-16T15:45:20Z",
    user: {
      id: "4",
      name: "David Wilson",
      email: "david.wilson@company.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david"
    },
    action: "Failed Login Attempt",
    category: "auth",
    severity: "medium",
    description: "Multiple failed login attempts detected",
    details: { 
      attempts: 3,
      reason: "incorrect_password",
      account_locked: false
    },
    ipAddress: "203.0.113.45",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15",
    success: false,
    duration: 0
  },
  {
    id: "5",
    timestamp: "2025-01-16T15:30:10Z",
    user: {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
    },
    action: "System Configuration",
    category: "system",
    severity: "critical",
    description: "System backup configuration was modified",
    details: { 
      setting: "backup_frequency",
      old_value: "daily",
      new_value: "hourly",
      auto_backup: true
    },
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    success: true,
    duration: 1800
  },
  {
    id: "6",
    timestamp: "2025-01-16T14:20:35Z",
    user: {
      id: "2",
      name: "Michael Chen",
      email: "michael.chen@company.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael"
    },
    action: "API Key Generated",
    category: "api",
    severity: "medium",
    description: "New API key generated for external integration",
    details: { 
      key_type: "read_write",
      expiry: "2025-07-16",
      scopes: ["users", "data", "reports"]
    },
    ipAddress: "192.168.1.102",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    success: true,
    duration: 650
  },
  {
    id: "7",
    timestamp: "2025-01-16T13:45:20Z",
    user: {
      id: "3",
      name: "Emily Rodriguez",
      email: "emily.rodriguez@company.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily"
    },
    action: "User Created",
    category: "user",
    severity: "medium",
    description: "New user account created in the system",
    details: { 
      new_user: "john.doe@company.com",
      role: "user",
      department: "Marketing",
      invited_by: "emily.rodriguez@company.com"
    },
    ipAddress: "192.168.1.105",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    success: true,
    duration: 1100
  }
];

export default function ActivityLogs() {
  const [logs, setLogs] = useState<ActivityLog[]>(mockActivityLogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [dateRange, setDateRange] = useState("today");
  const { showModal } = useModal();

  const exportLogs = () => {
    showModal({
      title: "Export Activity Logs",
      message: "Export logs in CSV or JSON format for external analysis and compliance reporting.",
      type: "info",
      showCancel: true,
      onConfirm: () => {
        showModal({
          title: "Export Started",
          message: "Activity logs are being exported. You will receive a download link shortly.",
          type: "success"
        });
      }
    });
  };

  const clearLogs = () => {
    showModal({
      title: "Clear Activity Logs",
      message: "Are you sure you want to clear all activity logs? This action cannot be undone.",
      type: "warning",
      showCancel: true,
      onConfirm: () => {
        setLogs([]);
        showModal({
          title: "Logs Cleared",
          message: "All activity logs have been cleared from the system.",
          type: "success"
        });
      }
    });
  };

  const archiveLogs = () => {
    showModal({
      title: "Archive Old Logs",
      message: "Archive logs older than 90 days to improve system performance.",
      type: "info",
      showCancel: true,
      onConfirm: () => {
        showModal({
          title: "Logs Archived",
          message: "Old activity logs have been archived successfully.",
          type: "success"
        });
      }
    });
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      auth: <Shield className="w-4 h-4" />,
      user: <Users className="w-4 h-4" />,
      data: <Database className="w-4 h-4" />,
      system: <Settings className="w-4 h-4" />,
      security: <Lock className="w-4 h-4" />,
      api: <Key className="w-4 h-4" />
    };
    return icons[category as keyof typeof icons];
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      auth: "bg-blue-100 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
      user: "bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400",
      data: "bg-purple-100 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400",
      system: "bg-orange-100 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400",
      security: "bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400",
      api: "bg-yellow-100 text-yellow-600 dark:bg-yellow-950/30 dark:text-yellow-400"
    };
    return colors[category as keyof typeof colors];
  };

  const getSeverityIcon = (severity: string) => {
    const icons = {
      low: <Info className="w-4 h-4 text-gray-500" />,
      medium: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
      high: <AlertTriangle className="w-4 h-4 text-orange-500" />,
      critical: <XCircle className="w-4 h-4 text-red-500" />
    };
    return icons[severity as keyof typeof icons];
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      low: "bg-gray-100 text-gray-600 dark:bg-gray-950/30 dark:text-gray-400",
      medium: "bg-yellow-100 text-yellow-600 dark:bg-yellow-950/30 dark:text-yellow-400",
      high: "bg-orange-100 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400",
      critical: "bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400"
    };
    return colors[severity as keyof typeof colors];
  };

  const getSuccessIcon = (success: boolean) => {
    return success ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <XCircle className="w-4 h-4 text-red-500" />
    );
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || log.category === categoryFilter;
    const matchesSeverity = severityFilter === "all" || log.severity === severityFilter;
    
    return matchesSearch && matchesCategory && matchesSeverity;
  });

  const categoryStats = logs.reduce((acc, log) => {
    acc[log.category] = (acc[log.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const severityStats = logs.reduce((acc, log) => {
    acc[log.severity] = (acc[log.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <MainLayout title="Activity Logs">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Activity Logs</h1>
            <p className="text-muted-foreground mt-1">
              Monitor system activities, user actions, and security events
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={archiveLogs} variant="outline">
              <Archive className="w-4 h-4 mr-2" />
              Archive
            </Button>
            <Button onClick={exportLogs} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={clearLogs} variant="ghost">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Activity className="w-8 h-8 text-blue-600" />
                <Badge className="bg-blue-100 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">
                  Total
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">{logs.length}</div>
                <p className="text-sm text-muted-foreground">Total Activities</p>
                <p className="text-xs text-blue-600 mt-1">Last 24 hours</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <Badge className="bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400">
                  Success
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">
                  {logs.filter(l => l.success).length}
                </div>
                <p className="text-sm text-muted-foreground">Successful Actions</p>
                <p className="text-xs text-green-600 mt-1">
                  {Math.round((logs.filter(l => l.success).length / logs.length) * 100)}% success rate
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
                <Badge className="bg-orange-100 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400">
                  Alerts
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">
                  {logs.filter(l => l.severity === "high" || l.severity === "critical").length}
                </div>
                <p className="text-sm text-muted-foreground">High Priority</p>
                <p className="text-xs text-orange-600 mt-1">Requires attention</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <XCircle className="w-8 h-8 text-red-600" />
                <Badge className="bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400">
                  Failed
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">
                  {logs.filter(l => !l.success).length}
                </div>
                <p className="text-sm text-muted-foreground">Failed Actions</p>
                <p className="text-xs text-red-600 mt-1">Security concerns</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="recent" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
            <TabsTrigger value="security">Security Events</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="space-y-6">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search activity logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="auth">Authentication</SelectItem>
                  <SelectItem value="user">User Management</SelectItem>
                  <SelectItem value="data">Data Operations</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="api">API</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredLogs.map((log) => (
                <Card key={log.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(log.category)}
                          <Badge className={getCategoryColor(log.category)}>
                            {log.category}
                          </Badge>
                        </div>
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={log.user.avatar} alt={log.user.name} />
                          <AvatarFallback className="text-xs">
                            {log.user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-3">
                            <h4 className="font-semibold">{log.action}</h4>
                            {getSuccessIcon(log.success)}
                            <Badge className={getSeverityColor(log.severity)}>
                              {log.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {log.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                            <span>User: {log.user.name}</span>
                            <span>IP: {log.ipAddress}</span>
                            <span>Time: {formatTime(log.timestamp)}</span>
                            {log.duration && <span>Duration: {log.duration}ms</span>}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {getSeverityIcon(log.severity)}
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {logs.filter(l => l.category === "security" || l.category === "auth" || !l.success).map((log) => (
                <Card key={log.id} className={`${!log.success ? 'border-red-200 dark:border-red-800' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {getSeverityIcon(log.severity)}
                          <Badge className={getSeverityColor(log.severity)}>
                            {log.severity}
                          </Badge>
                          {!log.success && (
                            <Badge variant="destructive">Failed</Badge>
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold">{log.action}</h4>
                          <p className="text-sm text-muted-foreground">{log.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                            <span>User: {log.user.name}</span>
                            <span>IP: {log.ipAddress}</span>
                            <span>{formatTime(log.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <Button size="sm" variant="outline">
                          Investigate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activity by Category</CardTitle>
                  <CardDescription>Distribution of activities across different categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(categoryStats).map(([category, count]) => (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(category)}
                          <span className="capitalize">{category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${(count / logs.length) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Severity Distribution</CardTitle>
                  <CardDescription>Breakdown of activities by severity level</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(severityStats).map(([severity, count]) => (
                      <div key={severity} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getSeverityIcon(severity)}
                          <span className="capitalize">{severity}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all ${
                                severity === 'critical' ? 'bg-red-500' :
                                severity === 'high' ? 'bg-orange-500' :
                                severity === 'medium' ? 'bg-yellow-500' : 'bg-gray-500'
                              }`}
                              style={{ width: `${(count / logs.length) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Summary</CardTitle>
                  <CardDescription>Overview of compliance and audit requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Data Retention Policy</span>
                      <Badge className="bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400">
                        Compliant
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Activity Logging</span>
                      <Badge className="bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400">
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Audit Trail</span>
                      <Badge className="bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400">
                        Complete
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Data Integrity</span>
                      <Badge className="bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400">
                        Verified
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Audit Actions</CardTitle>
                  <CardDescription>Generate reports for compliance requirements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Audit Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export for Compliance
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Automated Reports
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Security Assessment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}