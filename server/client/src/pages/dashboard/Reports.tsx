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
  FileText, 
  Download, 
  Calendar,
  Filter,
  RefreshCw,
  BarChart3,
  PieChart as PieChartIcon,
  Target,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

// Reports Data
const reportMetrics = [
  { month: "Jan", generated: 145, viewed: 128, downloaded: 89, shared: 45 },
  { month: "Feb", generated: 168, viewed: 152, downloaded: 103, shared: 58 },
  { month: "Mar", generated: 192, viewed: 174, downloaded: 127, shared: 72 },
  { month: "Apr", generated: 178, viewed: 165, downloaded: 118, shared: 65 },
  { month: "May", generated: 205, viewed: 189, downloaded: 145, shared: 84 },
  { month: "Jun", generated: 224, viewed: 207, downloaded: 156, shared: 92 },
];

const reportTypes = [
  { name: "Financial Reports", count: 45, avgTime: "2.5 min", usage: 89, color: "#3b82f6" },
  { name: "Sales Reports", count: 38, avgTime: "3.2 min", usage: 76, color: "#10b981" },
  { name: "Analytics Reports", count: 32, avgTime: "4.1 min", usage: 68, color: "#f59e0b" },
  { name: "Project Reports", count: 28, avgTime: "3.8 min", usage: 72, color: "#8b5cf6" },
  { name: "Performance Reports", count: 24, avgTime: "2.9 min", usage: 58, color: "#ef4444" },
];

const frequentReports = [
  { name: "Monthly Sales Summary", frequency: "Daily", lastGenerated: "2 hours ago", status: "Active" },
  { name: "Weekly Analytics", frequency: "Weekly", lastGenerated: "1 day ago", status: "Active" },
  { name: "Project Status Report", frequency: "Daily", lastGenerated: "5 hours ago", status: "Active" },
  { name: "Financial Dashboard", frequency: "Monthly", lastGenerated: "3 days ago", status: "Scheduled" },
  { name: "Customer Insights", frequency: "Weekly", lastGenerated: "2 days ago", status: "Active" },
];

const reportTemplates = [
  { name: "Executive Summary", category: "Management", usage: 142, rating: 4.8 },
  { name: "Sales Performance", category: "Sales", usage: 98, rating: 4.6 },
  { name: "Financial Analysis", category: "Finance", usage: 87, rating: 4.9 },
  { name: "Project Timeline", category: "Operations", usage: 76, rating: 4.5 },
  { name: "Customer Analytics", category: "Marketing", usage: 64, rating: 4.7 },
];

const scheduledReports = [
  { name: "Daily Sales Report", schedule: "Every day at 9:00 AM", recipients: 5, nextRun: "Tomorrow 9:00 AM" },
  { name: "Weekly Performance", schedule: "Every Monday at 10:00 AM", recipients: 8, nextRun: "Next Monday 10:00 AM" },
  { name: "Monthly Financial", schedule: "1st of every month at 8:00 AM", recipients: 12, nextRun: "August 1st 8:00 AM" },
  { name: "Quarterly Review", schedule: "Every 3 months on 1st at 9:00 AM", recipients: 15, nextRun: "October 1st 9:00 AM" },
];

export default function Reports() {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState("All Reports");
  const { showModal, ModalComponent } = useModal();
  
  const dateRangeOptions = [
    "Last 7 Days",
    "Last 30 Days", 
    "Last 3 Months",
    "Last 6 Months",
    "Last Year",
    "Custom Range"
  ];
  
  const reportTypeOptions = [
    "All Reports",
    "Financial Reports",
    "Sales Reports", 
    "Analytics Reports",
    "Project Reports",
    "Performance Reports"
  ];
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };
  
  const handleExport = () => {
    const data = JSON.stringify(reportMetrics, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reports-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const handleGenerateReport = (reportName: string) => {
    alert(`Generating ${reportName}...`);
  };
  
  const handleScheduleReport = (reportName: string) => {
    alert(`Scheduling ${reportName}...`);
  };
  
  return (
    <MainLayout title="Reports Dashboard">
      <div className="space-y-6">
        {/* Reports Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                  <p className="text-2xl font-bold">1,112</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12.5% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Generated Today</p>
                  <p className="text-2xl font-bold">28</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +8.2% from yesterday
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Generation Time</p>
                  <p className="text-2xl font-bold">3.2s</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    -0.8s from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Scheduled Reports</p>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +3 from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold">98.7%</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +0.5% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-cyan-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Templates</p>
                  <p className="text-2xl font-bold">45</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +7 from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
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
              
              <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {reportTypeOptions.map((option) => (
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
                    message: "CSV export özelliği burada implement edilecek. Rapor verileriniz CSV formatında indirilecek.",
                    type: "info"
                  })}>
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => showModal({
                    title: "PDF Export",
                    message: "PDF export özelliği burada implement edilecek. Raporlarınız PDF formatında oluşturulacak.",
                    type: "info"
                  })}>
                    Export as PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => showModal({
                    title: "Excel Export",
                    message: "Excel export özelliği burada implement edilecek. Detaylı raporlar Excel formatında hazırlanacak.",
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
                  <CardTitle>Report Generation Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={reportMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="generated" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                      <Area type="monotone" dataKey="viewed" stackId="2" stroke="#10b981" fill="#10b981" />
                      <Area type="monotone" dataKey="downloaded" stackId="3" stroke="#f59e0b" fill="#f59e0b" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Report Types Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={reportTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, count }) => `${name}: ${count}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {reportTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Frequently Generated Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {frequentReports.map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center">
                          <FileText className="w-4 h-4 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium">{report.name}</p>
                          <p className="text-sm text-muted-foreground">{report.frequency} • {report.lastGenerated}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={report.status === "Active" ? "default" : "secondary"}>
                          {report.status}
                        </Badge>
                        <Button size="sm" onClick={() => handleGenerateReport(report.name)}>
                          Generate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Report Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportTemplates.map((template, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center">
                          <PieChartIcon className="w-4 h-4 text-purple-500" />
                        </div>
                        <div>
                          <p className="font-medium">{template.name}</p>
                          <p className="text-sm text-muted-foreground">{template.category} • {template.usage} uses</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className="text-sm font-medium">⭐ {template.rating}</p>
                          <p className="text-xs text-muted-foreground">{template.usage} uses</p>
                        </div>
                        <Button size="sm" onClick={() => handleGenerateReport(template.name)}>
                          Use Template
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scheduledReports.map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-500/10 rounded-full flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-orange-500" />
                        </div>
                        <div>
                          <p className="font-medium">{report.name}</p>
                          <p className="text-sm text-muted-foreground">{report.schedule}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className="text-sm font-medium">{report.recipients} recipients</p>
                          <p className="text-xs text-muted-foreground">{report.nextRun}</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => handleScheduleReport(report.name)}>
                          Edit Schedule
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Report Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={reportTypes}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="usage" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Usage Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reportTypes.map((type, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: type.color }} />
                          <div>
                            <p className="font-medium">{type.name}</p>
                            <p className="text-sm text-muted-foreground">Avg: {type.avgTime}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{type.count} reports</p>
                          <p className="text-sm text-muted-foreground">{type.usage}% usage</p>
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