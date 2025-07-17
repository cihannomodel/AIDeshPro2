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
  Legend
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Activity, 
  Clock, 
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Eye,
  MousePointer,
  Target,
  Calendar,
  Filter,
  Download,
  RefreshCw
} from "lucide-react";

// Enhanced Analytics Data
const analyticsData = [
  { month: "Jan", users: 4000, sessions: 2400, revenue: 65000, conversion: 2.4, bounceRate: 45.2, avgSessionDuration: 180 },
  { month: "Feb", users: 3000, sessions: 1398, revenue: 78000, conversion: 2.8, bounceRate: 42.1, avgSessionDuration: 195 },
  { month: "Mar", users: 2000, sessions: 9800, revenue: 85000, conversion: 3.1, bounceRate: 38.7, avgSessionDuration: 210 },
  { month: "Apr", users: 2780, sessions: 3908, revenue: 72000, conversion: 2.9, bounceRate: 41.3, avgSessionDuration: 188 },
  { month: "May", users: 1890, sessions: 4800, revenue: 95000, conversion: 3.4, bounceRate: 36.8, avgSessionDuration: 225 },
  { month: "Jun", users: 2390, sessions: 3800, revenue: 88000, conversion: 3.2, bounceRate: 39.5, avgSessionDuration: 205 },
];

const deviceData = [
  { name: "Desktop", value: 45.2, users: 18540, sessions: 28230, color: "#3b82f6" },
  { name: "Mobile", value: 38.7, users: 15890, sessions: 23440, color: "#8b5cf6" },
  { name: "Tablet", value: 12.3, users: 5040, sessions: 7890, color: "#06b6d4" },
  { name: "Other", value: 3.8, users: 1560, sessions: 2340, color: "#f59e0b" },
];

const geographicData = [
  { country: "United States", users: 12540, sessions: 18230, revenue: 45000, percentage: 32.5 },
  { country: "United Kingdom", users: 8790, sessions: 12450, revenue: 28000, percentage: 22.8 },
  { country: "Germany", users: 6450, sessions: 9340, revenue: 19000, percentage: 16.7 },
  { country: "France", users: 4230, sessions: 6890, revenue: 14000, percentage: 11.0 },
  { country: "Canada", users: 3890, sessions: 5670, revenue: 12000, percentage: 10.1 },
  { country: "Australia", users: 2340, sessions: 3450, revenue: 8000, percentage: 6.9 },
];

const userBehaviorData = [
  { page: "/dashboard", views: 45670, uniqueViews: 28340, avgTime: 245, bounceRate: 34.2 },
  { page: "/analytics", views: 32450, uniqueViews: 21890, avgTime: 312, bounceRate: 28.7 },
  { page: "/sales", views: 28930, uniqueViews: 18450, avgTime: 289, bounceRate: 31.5 },
  { page: "/projects", views: 21340, uniqueViews: 15670, avgTime: 267, bounceRate: 36.8 },
  { page: "/reports", views: 18760, uniqueViews: 12890, avgTime: 198, bounceRate: 42.3 },
];

const campaignPerformance = [
  { name: "Google Ads", clicks: 12540, impressions: 245000, cost: 8900, conversions: 340, ctr: 5.12, cpc: 0.71 },
  { name: "Facebook Ads", clicks: 8790, impressions: 189000, cost: 6700, conversions: 280, ctr: 4.65, cpc: 0.76 },
  { name: "Email Marketing", clicks: 6450, impressions: 45000, cost: 1200, conversions: 190, ctr: 14.33, cpc: 0.19 },
  { name: "LinkedIn Ads", clicks: 3890, impressions: 67000, cost: 4500, conversions: 120, ctr: 5.81, cpc: 1.16 },
  { name: "Twitter Ads", clicks: 2340, impressions: 89000, cost: 3200, conversions: 85, ctr: 2.63, cpc: 1.37 },
];

const timeBasedData = [
  { hour: "00:00", users: 1240, sessions: 1890, conversions: 45 },
  { hour: "03:00", users: 890, sessions: 1340, conversions: 28 },
  { hour: "06:00", users: 1890, sessions: 2340, conversions: 67 },
  { hour: "09:00", users: 3450, sessions: 4890, conversions: 145 },
  { hour: "12:00", users: 4230, sessions: 6780, conversions: 189 },
  { hour: "15:00", users: 3890, sessions: 5670, conversions: 167 },
  { hour: "18:00", users: 2890, sessions: 4230, conversions: 123 },
  { hour: "21:00", users: 2340, sessions: 3450, conversions: 98 },
];

export default function Analytics() {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All Data");
  const { showModal, ModalComponent } = useModal();
  
  const dateRangeOptions = [
    "Last 7 Days",
    "Last 30 Days", 
    "Last 3 Months",
    "Last 6 Months",
    "Last Year",
    "Custom Range"
  ];
  
  const filterOptions = [
    "All Data",
    "Mobile Users",
    "Desktop Users", 
    "Tablet Users",
    "Organic Traffic",
    "Paid Traffic",
    "Social Media",
    "Email Campaigns"
  ];
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };
  
  const handleExport = () => {
    const data = JSON.stringify(analyticsData, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analytics-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };
  
  return (
    <MainLayout title="Advanced Analytics Dashboard">
      <div className="space-y-6">
        {/* Enhanced Analytics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">16,068</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +14.2% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Sessions</p>
                  <p className="text-2xl font-bold">26,908</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +8.7% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Page Views</p>
                  <p className="text-2xl font-bold">147,890</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12.3% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Bounce Rate</p>
                  <p className="text-2xl font-bold">38.7%</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    -5.2% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <MousePointer className="w-6 h-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Session</p>
                  <p className="text-2xl font-bold">3m 25s</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +18s from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-cyan-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                  <p className="text-2xl font-bold">3.2%</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +0.4% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="behavior">Behavior</TabsTrigger>
              <TabsTrigger value="acquisition">Acquisition</TabsTrigger>
              <TabsTrigger value="conversion">Conversion</TabsTrigger>
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
              
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.map((option) => (
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
                    message: "CSV export özelliği burada implement edilecek. Bu özellik gerçek bir uygulamada CSV dosyası oluşturacak ve indirme başlatacak.",
                    type: "info"
                  })}>
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => showModal({
                    title: "PDF Export", 
                    message: "PDF export özelliği burada implement edilecek. Bu özellik analytics verilerini PDF formatında oluşturacak.",
                    type: "info"
                  })}>
                    Export as PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => showModal({
                    title: "Excel Export",
                    message: "Excel export özelliği burada implement edilecek. Bu özellik verileri Excel formatında (.xlsx) oluşturacak.",
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
                  <CardTitle>User Growth Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="sessions" stroke="#8b5cf6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Device Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue & Conversion</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="revenue" stackId="1" stroke="#10b981" fill="#10b981" />
                      <Area type="monotone" dataKey="conversion" stackId="2" stroke="#f59e0b" fill="#f59e0b" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bounce Rate Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="bounceRate" fill="#f59e0b" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="behavior" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Pages Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userBehaviorData.map((page, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{page.page}</p>
                          <p className="text-sm text-muted-foreground">
                            {page.views.toLocaleString()} views • {page.uniqueViews.toLocaleString()} unique
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{Math.floor(page.avgTime / 60)}m {page.avgTime % 60}s</p>
                          <p className="text-sm text-muted-foreground">{page.bounceRate}% bounce</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hourly Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={timeBasedData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="sessions" stroke="#8b5cf6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="acquisition" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {geographicData.map((country, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Globe className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{country.country}</p>
                            <p className="text-sm text-muted-foreground">
                              {country.users.toLocaleString()} users
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${country.revenue.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{country.percentage}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Campaign Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campaignPerformance.map((campaign, index) => (
                      <div key={index} className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{campaign.name}</h4>
                          <Badge variant="outline">{campaign.ctr}% CTR</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Clicks</p>
                            <p className="font-medium">{campaign.clicks.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Cost</p>
                            <p className="font-medium">${campaign.cost.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Conversions</p>
                            <p className="font-medium">{campaign.conversions}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">CPC</p>
                            <p className="font-medium">${campaign.cpc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="conversion" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Conversion Funnel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Website Visits", value: 100000, color: "#3b82f6" },
                      { name: "Product Views", value: 45000, color: "#8b5cf6" },
                      { name: "Add to Cart", value: 18000, color: "#06b6d4" },
                      { name: "Checkout", value: 8900, color: "#f59e0b" },
                      { name: "Purchase", value: 3400, color: "#10b981" },
                    ].map((step, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: step.color }} />
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <p className="font-medium">{step.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {step.value.toLocaleString()} ({((step.value / 100000) * 100).toFixed(1)}%)
                            </p>
                          </div>
                          <Progress value={(step.value / 100000) * 100} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Device Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {deviceData.map((device, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {device.name === "Desktop" && <Monitor className="w-5 h-5 text-blue-500" />}
                          {device.name === "Mobile" && <Smartphone className="w-5 h-5 text-purple-500" />}
                          {device.name === "Tablet" && <Tablet className="w-5 h-5 text-cyan-500" />}
                          {device.name === "Other" && <Globe className="w-5 h-5 text-orange-500" />}
                          <div>
                            <p className="font-medium">{device.name}</p>
                            <p className="text-sm text-muted-foreground">{device.value}% of traffic</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{device.users.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{device.sessions.toLocaleString()} sessions</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <ModalComponent />
    </MainLayout>
  );
}