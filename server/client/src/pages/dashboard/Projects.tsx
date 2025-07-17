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
  Folder, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Users,
  GitBranch,
  Activity,
  Target,
  Zap
} from "lucide-react";

// Project Data
const projectStats = [
  { month: "Jan", active: 24, completed: 18, delayed: 3, budget: 145000 },
  { month: "Feb", active: 28, completed: 22, delayed: 2, budget: 167000 },
  { month: "Mar", active: 32, completed: 25, delayed: 4, budget: 189000 },
  { month: "Apr", active: 29, completed: 28, delayed: 1, budget: 201000 },
  { month: "May", active: 35, completed: 31, delayed: 2, budget: 223000 },
  { month: "Jun", active: 38, completed: 34, delayed: 3, budget: 245000 },
];

const projectsByStatus = [
  { name: "Active", value: 38, color: "#3b82f6" },
  { name: "Completed", value: 34, color: "#10b981" },
  { name: "On Hold", value: 8, color: "#f59e0b" },
  { name: "Delayed", value: 3, color: "#ef4444" },
];

const projectsByType = [
  { name: "Web Development", count: 15, budget: 185000, completion: 68 },
  { name: "Mobile Apps", count: 12, budget: 145000, completion: 72 },
  { name: "UI/UX Design", count: 8, budget: 85000, completion: 81 },
  { name: "Data Analytics", count: 6, budget: 125000, completion: 58 },
  { name: "Marketing", count: 4, budget: 65000, completion: 89 },
];

const topProjects = [
  { name: "E-commerce Platform", client: "TechCorp", budget: 85000, progress: 78, status: "Active", deadline: "2024-08-15" },
  { name: "Mobile Banking App", client: "FinanceInc", budget: 120000, progress: 65, status: "Active", deadline: "2024-09-30" },
  { name: "AI Dashboard", client: "DataCorp", budget: 95000, progress: 92, status: "Active", deadline: "2024-07-25" },
  { name: "CRM System", client: "SalesPro", budget: 75000, progress: 45, status: "Delayed", deadline: "2024-08-10" },
  { name: "Marketing Website", client: "Creative Agency", budget: 35000, progress: 88, status: "Active", deadline: "2024-07-20" },
];

const teamPerformance = [
  { name: "Development Team", projects: 18, completion: 87, efficiency: 94 },
  { name: "Design Team", projects: 12, completion: 91, efficiency: 89 },
  { name: "QA Team", projects: 15, completion: 83, efficiency: 92 },
  { name: "Marketing Team", projects: 8, completion: 95, efficiency: 88 },
];

const milestoneData = [
  { month: "Jan", planned: 45, achieved: 42, percentage: 93.3 },
  { month: "Feb", planned: 52, achieved: 48, percentage: 92.3 },
  { month: "Mar", planned: 48, achieved: 46, percentage: 95.8 },
  { month: "Apr", planned: 55, achieved: 51, percentage: 92.7 },
  { month: "May", planned: 58, achieved: 56, percentage: 96.5 },
  { month: "Jun", planned: 62, achieved: 58, percentage: 93.5 },
];

const resourceUtilization = [
  { resource: "Developers", allocated: 85, available: 100, utilization: 85 },
  { resource: "Designers", allocated: 72, available: 80, utilization: 90 },
  { resource: "QA Engineers", allocated: 68, available: 75, utilization: 91 },
  { resource: "Project Managers", allocated: 45, available: 50, utilization: 90 },
];

export default function Projects() {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All Projects");
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
    "All Projects",
    "Active Projects",
    "Completed Projects", 
    "Delayed Projects",
    "Web Development",
    "Mobile Apps",
    "High Priority",
    "Low Priority"
  ];
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };
  
  const handleExport = () => {
    const data = JSON.stringify(projectStats, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'projects-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };
  
  return (
    <MainLayout title="Projects Dashboard">
      <div className="space-y-6">
        {/* Project Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                  <p className="text-2xl font-bold">38</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +8.6% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Folder className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">34</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +9.7% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">On Time</p>
                  <p className="text-2xl font-bold">89%</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +2.3% from last month
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
                  <p className="text-sm font-medium text-muted-foreground">Delayed</p>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-xs text-red-600 flex items-center">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    -1 from last month
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
                  <p className="text-sm font-medium text-muted-foreground">Total Budget</p>
                  <p className="text-2xl font-bold">$1.2M</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +15.2% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Efficiency</p>
                  <p className="text-2xl font-bold">92%</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +4.1% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-cyan-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
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
                    message: "CSV export özelliği burada implement edilecek. Proje verileriniz CSV formatında indirilecek.",
                    type: "info"
                  })}>
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => showModal({
                    title: "PDF Export",
                    message: "PDF export özelliği burada implement edilecek. Proje raporlarınız PDF formatında oluşturulacak.",
                    type: "info"
                  })}>
                    Export as PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => showModal({
                    title: "Excel Export",
                    message: "Excel export özelliği burada implement edilecek. Detaylı proje analizleri Excel formatında hazırlanacak.",
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
                  <CardTitle>Project Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={projectsByStatus}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {projectsByStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Project Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={projectStats}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="active" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} />
                      <Line type="monotone" dataKey="delayed" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProjects.map((project, index) => (
                      <div key={index} className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">{project.name}</p>
                            <p className="text-sm text-muted-foreground">{project.client}</p>
                          </div>
                          <Badge variant={project.status === "Active" ? "default" : "destructive"}>
                            {project.status}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>
                        <div className="flex justify-between text-sm mt-2">
                          <span>Budget: ${project.budget.toLocaleString()}</span>
                          <span>Due: {project.deadline}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Projects by Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projectsByType.map((type, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center">
                            <GitBranch className="w-4 h-4 text-blue-500" />
                          </div>
                          <div>
                            <p className="font-medium">{type.name}</p>
                            <p className="text-sm text-muted-foreground">{type.count} projects</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${type.budget.toLocaleString()}</p>
                          <p className="text-sm text-green-600">{type.completion}% avg completion</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Team Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamPerformance.map((team, index) => (
                      <div key={index} className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center">
                              <Users className="w-4 h-4 text-purple-500" />
                            </div>
                            <div>
                              <p className="font-medium">{team.name}</p>
                              <p className="text-sm text-muted-foreground">{team.projects} projects</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{team.completion}%</p>
                            <p className="text-sm text-muted-foreground">completion rate</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Efficiency</span>
                            <span>{team.efficiency}%</span>
                          </div>
                          <Progress value={team.efficiency} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Milestone Achievement</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={milestoneData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="planned" fill="#8b5cf6" />
                      <Bar dataKey="achieved" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resource Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {resourceUtilization.map((resource, index) => (
                      <div key={index} className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-medium">{resource.resource}</p>
                          <p className="text-sm text-muted-foreground">
                            {resource.allocated}/{resource.available} ({resource.utilization}%)
                          </p>
                        </div>
                        <Progress value={resource.utilization} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Budget Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={projectStats}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="budget" stroke="#3b82f6" fill="#3b82f6" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {topProjects.map((project, index) => (
                    <div key={index} className="relative pl-6 pb-6">
                      <div className="absolute left-0 top-0 w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div className="absolute left-1.5 top-3 w-0.5 h-full bg-muted"></div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">{project.name}</p>
                            <p className="text-sm text-muted-foreground">{project.client}</p>
                          </div>
                          <Badge variant={project.status === "Active" ? "default" : "destructive"}>
                            {project.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Budget</p>
                            <p className="font-medium">${project.budget.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Progress</p>
                            <p className="font-medium">{project.progress}%</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Deadline</p>
                            <p className="font-medium">{project.deadline}</p>
                          </div>
                        </div>
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