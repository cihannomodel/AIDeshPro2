import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useModal } from "@/components/ui/modal";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  ComposedChart
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Clock, 
  Server, 
  Users,
  Target,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Gauge,
  Activity,
  AlertCircle,
  CheckCircle
} from "lucide-react";

// Performance Data
const performanceMetrics = [
  { month: "Jan", responseTime: 245, throughput: 8900, uptime: 99.2, errors: 12 },
  { month: "Feb", responseTime: 198, throughput: 9250, uptime: 99.6, errors: 8 },
  { month: "Mar", responseTime: 189, throughput: 9780, uptime: 99.8, errors: 5 },
  { month: "Apr", responseTime: 167, throughput: 10200, uptime: 99.9, errors: 3 },
  { month: "May", responseTime: 156, throughput: 10890, uptime: 99.7, errors: 7 },
  { month: "Jun", responseTime: 142, throughput: 11250, uptime: 99.9, errors: 2 },
];

const systemMetrics = [
  { name: "CPU Usage", value: 72, threshold: 80, status: "Good", trend: "stable" },
  { name: "Memory Usage", value: 68, threshold: 85, status: "Good", trend: "decreasing" },
  { name: "Disk Usage", value: 45, threshold: 90, status: "Good", trend: "increasing" },
  { name: "Network I/O", value: 58, threshold: 75, status: "Good", trend: "stable" },
];

const applicationPerformance = [
  { name: "Web Application", responseTime: 142, throughput: 11250, uptime: 99.9, users: 8920 },
  { name: "API Gateway", responseTime: 89, throughput: 15890, uptime: 99.8, users: 12540 },
  { name: "Database", responseTime: 23, throughput: 25670, uptime: 99.9, users: 18930 },
  { name: "Cache Layer", responseTime: 8, throughput: 89450, uptime: 99.7, users: 25670 },
];

const performanceAlerts = [
  { level: "Warning", message: "High CPU usage detected on server-03", time: "2 hours ago", resolved: false },
  { level: "Info", message: "Database connection pool optimized", time: "4 hours ago", resolved: true },
  { level: "Critical", message: "Memory threshold exceeded on server-01", time: "6 hours ago", resolved: true },
  { level: "Warning", message: "API response time increased by 15%", time: "1 day ago", resolved: false },
  { level: "Info", message: "Cache hit ratio improved to 94%", time: "2 days ago", resolved: true },
];

const serverStats = [
  { name: "Server-01", cpu: 78, memory: 65, disk: 42, network: 62, status: "Healthy" },
  { name: "Server-02", cpu: 65, memory: 71, disk: 38, network: 58, status: "Healthy" },
  { name: "Server-03", cpu: 89, memory: 72, disk: 55, network: 74, status: "Warning" },
  { name: "Server-04", cpu: 56, memory: 48, disk: 33, network: 45, status: "Healthy" },
];

const optimizationSuggestions = [
  { title: "Database Query Optimization", impact: "High", effort: "Medium", description: "Optimize slow queries identified in analytics" },
  { title: "Cache Strategy Enhancement", impact: "High", effort: "Low", description: "Implement Redis for session storage" },
  { title: "API Response Compression", impact: "Medium", effort: "Low", description: "Enable gzip compression for API responses" },
  { title: "Resource Bundling", impact: "Medium", effort: "Medium", description: "Optimize JavaScript and CSS bundles" },
  { title: "CDN Integration", impact: "High", effort: "High", description: "Implement CDN for static assets" },
];

export default function Performance() {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState("Response Time");
  const { showModal, ModalComponent } = useModal();
  
  const dateRangeOptions = [
    "Last 7 Days",
    "Last 30 Days", 
    "Last 3 Months",
    "Last 6 Months",
    "Last Year",
    "Custom Range"
  ];
  
  const metricOptions = [
    "Response Time",
    "Throughput",
    "Error Rate", 
    "CPU Usage",
    "Memory Usage",
    "Database Performance",
    "Network Latency",
    "Cache Hit Rate"
  ];
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };
  
  const handleExport = () => {
    const data = JSON.stringify(performanceMetrics, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'performance-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const handleOptimize = (suggestion: string) => {
    alert(`Applying optimization: ${suggestion}`);
  };
  
  const handleResolveAlert = (alertMessage: string) => {
    alert(`Resolving alert: ${alertMessage}`);
  };
  
  return (
    <MainLayout title="Performance Dashboard">
      <div className="space-y-6">
        {/* Performance Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                  <p className="text-2xl font-bold">142ms</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    -14ms from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Throughput</p>
                  <p className="text-2xl font-bold">11.2K</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +3.2% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Uptime</p>
                  <p className="text-2xl font-bold">99.9%</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +0.2% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <Server className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Error Rate</p>
                  <p className="text-2xl font-bold">0.02%</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    -0.05% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold">8.9K</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12.8% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Performance Score</p>
                  <p className="text-2xl font-bold">94/100</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +6 from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                  <Gauge className="w-6 h-6 text-cyan-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="systems">Systems</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
              <TabsTrigger value="optimization">Optimization</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[180px]">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dateRangeOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {metricOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleExport()}>
                    Export as JSON
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => showModal({
                    title: "CSV Export",
                    message: "CSV export özelliği burada implement edilecek. Performans verileriniz CSV formatında indirilecek.",
                    type: "info"
                  })}>
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => showModal({
                    title: "PDF Export",
                    message: "PDF export özelliği burada implement edilecek. Performans raporlarınız PDF formatında oluşturulacak.",
                    type: "info"
                  })}>
                    Export as PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => showModal({
                    title: "Excel Export",
                    message: "Excel export özelliği burada implement edilecek. Detaylı performans analizleri Excel formatında hazırlanacak.",
                    type: "info"
                  })}>
                    Export as Excel
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={performanceMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="responseTime" fill="#3b82f6" />
                      <Line type="monotone" dataKey="throughput" stroke="#10b981" strokeWidth={2} />
                      <Line type="monotone" dataKey="uptime" stroke="#f59e0b" strokeWidth={2} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Resource Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemMetrics.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            metric.value > metric.threshold ? 'bg-red-500' : 
                            metric.value > metric.threshold * 0.8 ? 'bg-yellow-500' : 'bg-green-500'
                          }`} />
                          <div>
                            <p className="font-medium">{metric.name}</p>
                            <p className="text-sm text-muted-foreground">{metric.status} • {metric.trend}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{metric.value}%</p>
                          <p className="text-sm text-muted-foreground">Threshold: {metric.threshold}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Application Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applicationPerformance.map((app, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center">
                          <Server className="w-4 h-4 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium">{app.name}</p>
                          <p className="text-sm text-muted-foreground">{app.users.toLocaleString()} active users</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <p className="font-medium">{app.responseTime}ms</p>
                          <p className="text-muted-foreground">Response</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">{app.throughput.toLocaleString()}</p>
                          <p className="text-muted-foreground">Throughput</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">{app.uptime}%</p>
                          <p className="text-muted-foreground">Uptime</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="systems" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Server Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {serverStats.map((server, index) => (
                      <div key={index} className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center">
                              <Server className="w-4 h-4 text-purple-500" />
                            </div>
                            <div>
                              <p className="font-medium">{server.name}</p>
                              <Badge variant={server.status === "Healthy" ? "default" : "destructive"}>
                                {server.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">CPU</p>
                            <Progress value={server.cpu} className="h-2 mt-1" />
                            <p className="text-xs mt-1">{server.cpu}%</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Memory</p>
                            <Progress value={server.memory} className="h-2 mt-1" />
                            <p className="text-xs mt-1">{server.memory}%</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Disk</p>
                            <Progress value={server.disk} className="h-2 mt-1" />
                            <p className="text-xs mt-1">{server.disk}%</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Network</p>
                            <Progress value={server.network} className="h-2 mt-1" />
                            <p className="text-xs mt-1">{server.network}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Error Rate Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={performanceMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="errors" stroke="#ef4444" fill="#ef4444" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceAlerts.map((alert, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          alert.level === "Critical" ? "bg-red-500/10" :
                          alert.level === "Warning" ? "bg-yellow-500/10" : "bg-blue-500/10"
                        }`}>
                          {alert.resolved ? (
                            <CheckCircle className={`w-4 h-4 ${
                              alert.level === "Critical" ? "text-red-500" :
                              alert.level === "Warning" ? "text-yellow-500" : "text-blue-500"
                            }`} />
                          ) : (
                            <AlertCircle className={`w-4 h-4 ${
                              alert.level === "Critical" ? "text-red-500" :
                              alert.level === "Warning" ? "text-yellow-500" : "text-blue-500"
                            }`} />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{alert.message}</p>
                          <p className="text-sm text-muted-foreground">{alert.level} • {alert.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={alert.resolved ? "default" : "destructive"}>
                          {alert.resolved ? "Resolved" : "Active"}
                        </Badge>
                        {!alert.resolved && (
                          <Button size="sm" onClick={() => handleResolveAlert(alert.message)}>
                            Resolve
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Optimization Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {optimizationSuggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                          <Zap className="w-4 h-4 text-green-500" />
                        </div>
                        <div>
                          <p className="font-medium">{suggestion.title}</p>
                          <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <Badge variant="outline">{suggestion.impact} Impact</Badge>
                          <p className="text-xs text-muted-foreground mt-1">{suggestion.effort} Effort</p>
                        </div>
                        <Button size="sm" onClick={() => handleOptimize(suggestion.title)}>
                          Apply
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <ModalComponent />
    </MainLayout>
  );
}