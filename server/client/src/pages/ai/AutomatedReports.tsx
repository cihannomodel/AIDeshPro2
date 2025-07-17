import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useModal } from "@/components/ui/modal";
import { 
  Bot, FileText, Calendar, Clock, 
  Send, Download, Eye, Settings,
  BarChart3, TrendingUp, Users, DollarSign,
  CheckCircle, AlertCircle, Play, Pause,
  Plus, Edit, Trash2, RefreshCw, Zap
} from "lucide-react";

interface AutomatedReport {
  id: string;
  name: string;
  type: "executive" | "financial" | "operational" | "marketing" | "custom";
  schedule: "daily" | "weekly" | "monthly" | "quarterly";
  status: "active" | "paused" | "draft";
  recipients: string[];
  lastGenerated: string;
  nextGeneration: string;
  format: "pdf" | "excel" | "email" | "dashboard";
  metrics: string[];
  customization: {
    includeCharts: boolean;
    includeInsights: boolean;
    includeRecommendations: boolean;
    branding: boolean;
  };
  performance: {
    generationTime: number;
    deliveryRate: number;
    openRate?: number;
  };
}

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  metrics: string[];
  estimatedTime: string;
  popularity: number;
}

const mockReports: AutomatedReport[] = [
  {
    id: "1",
    name: "Executive Weekly Summary",
    type: "executive",
    schedule: "weekly",
    status: "active",
    recipients: ["ceo@company.com", "board@company.com"],
    lastGenerated: "2025-01-15",
    nextGeneration: "2025-01-22",
    format: "pdf",
    metrics: ["revenue", "growth", "customers", "kpis"],
    customization: {
      includeCharts: true,
      includeInsights: true,
      includeRecommendations: true,
      branding: true
    },
    performance: {
      generationTime: 45,
      deliveryRate: 100,
      openRate: 95
    }
  },
  {
    id: "2",
    name: "Financial Monthly Report",
    type: "financial",
    schedule: "monthly",
    status: "active",
    recipients: ["finance@company.com", "accounting@company.com"],
    lastGenerated: "2025-01-01",
    nextGeneration: "2025-02-01",
    format: "excel",
    metrics: ["revenue", "expenses", "profit", "cashflow"],
    customization: {
      includeCharts: true,
      includeInsights: false,
      includeRecommendations: false,
      branding: true
    },
    performance: {
      generationTime: 120,
      deliveryRate: 100
    }
  },
  {
    id: "3",
    name: "Marketing Performance Daily",
    type: "marketing",
    schedule: "daily",
    status: "active",
    recipients: ["marketing@company.com"],
    lastGenerated: "2025-01-16",
    nextGeneration: "2025-01-17",
    format: "email",
    metrics: ["campaigns", "leads", "conversion", "roi"],
    customization: {
      includeCharts: true,
      includeInsights: true,
      includeRecommendations: true,
      branding: false
    },
    performance: {
      generationTime: 30,
      deliveryRate: 98,
      openRate: 87
    }
  }
];

const mockTemplates: ReportTemplate[] = [
  {
    id: "1",
    name: "Business Health Check",
    description: "Comprehensive overview of key business metrics and performance indicators",
    category: "executive",
    metrics: ["revenue", "growth", "customers", "satisfaction"],
    estimatedTime: "15 minutes",
    popularity: 95
  },
  {
    id: "2",
    name: "Sales Performance Report",
    description: "Detailed analysis of sales metrics, pipeline, and team performance",
    category: "sales",
    metrics: ["sales", "pipeline", "team-performance", "targets"],
    estimatedTime: "20 minutes",
    popularity: 87
  },
  {
    id: "3",
    name: "Customer Analytics Report",
    description: "Customer behavior, retention, and satisfaction analysis",
    category: "customer",
    metrics: ["customer-behavior", "retention", "satisfaction", "segments"],
    estimatedTime: "25 minutes",
    popularity: 76
  },
  {
    id: "4",
    name: "Financial Summary Report",
    description: "Income statement, cash flow, and financial health indicators",
    category: "financial",
    metrics: ["revenue", "expenses", "profit", "cashflow"],
    estimatedTime: "30 minutes",
    popularity: 83
  }
];

export default function AutomatedReports() {
  const [reports, setReports] = useState<AutomatedReport[]>(mockReports);
  const [templates, setTemplates] = useState<ReportTemplate[]>(mockTemplates);
  const [selectedReport, setSelectedReport] = useState<AutomatedReport | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { showModal } = useModal();

  const generateReport = async (reportId: string) => {
    setIsGenerating(true);
    const report = reports.find(r => r.id === reportId);
    if (!report) return;

    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    showModal({
      title: "Report Generated Successfully",
      message: `${report.name} has been generated and delivered to ${report.recipients.length} recipients.`,
      type: "success"
    });
    
    setIsGenerating(false);
  };

  const toggleReportStatus = (reportId: string) => {
    const updatedReports = reports.map(r => 
      r.id === reportId 
        ? { ...r, status: r.status === "active" ? "paused" as const : "active" as const }
        : r
    );
    setReports(updatedReports);
  };

  const deleteReport = (reportId: string) => {
    showModal({
      title: "Delete Automated Report",
      message: "Are you sure you want to delete this automated report? This action cannot be undone.",
      type: "warning",
      showCancel: true,
      onConfirm: () => {
        const updatedReports = reports.filter(r => r.id !== reportId);
        setReports(updatedReports);
      }
    });
  };

  const createReportFromTemplate = (template: ReportTemplate) => {
    setShowCreateForm(true);
    showModal({
      title: "Create Automated Report",
      message: `Create a new automated report using the "${template.name}" template?`,
      type: "info",
      showCancel: true,
      onConfirm: () => {
        showModal({
          title: "Report Created",
          message: "Your automated report has been created and scheduled for generation.",
          type: "success"
        });
      }
    });
  };

  const previewReport = (reportId: string) => {
    const report = reports.find(r => r.id === reportId);
    if (!report) return;

    showModal({
      title: "Report Preview",
      message: `Preview of ${report.name} will open in a new window with sample data.`,
      type: "info"
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "executive": return <TrendingUp className="w-5 h-5 text-purple-600" />;
      case "financial": return <DollarSign className="w-5 h-5 text-green-600" />;
      case "operational": return <BarChart3 className="w-5 h-5 text-blue-600" />;
      case "marketing": return <Users className="w-5 h-5 text-orange-600" />;
      case "custom": return <FileText className="w-5 h-5 text-gray-600" />;
      default: return <Bot className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": 
        return <Badge className="bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400">Active</Badge>;
      case "paused": 
        return <Badge className="bg-yellow-100 text-yellow-600 dark:bg-yellow-950/30 dark:text-yellow-400">Paused</Badge>;
      case "draft": 
        return <Badge className="bg-gray-100 text-gray-600 dark:bg-gray-950/30 dark:text-gray-400">Draft</Badge>;
      default: 
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getScheduleText = (schedule: string) => {
    switch (schedule) {
      case "daily": return "Every day at 9:00 AM";
      case "weekly": return "Every Monday at 9:00 AM";
      case "monthly": return "First day of month at 9:00 AM";
      case "quarterly": return "First day of quarter at 9:00 AM";
      default: return "Custom schedule";
    }
  };

  return (
    <MainLayout title="Automated Reports">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Automated Reporting System</h1>
            <p className="text-muted-foreground mt-1">
              AI-powered automated report generation and distribution
            </p>
          </div>
          <Button 
            onClick={() => setShowCreateForm(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Report
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Bot className="w-8 h-8 text-blue-600" />
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">{reports.length}</div>
                <p className="text-sm text-muted-foreground">Active Reports</p>
                <p className="text-xs text-blue-600 mt-1">
                  {reports.filter(r => r.status === "active").length} running
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Clock className="w-8 h-8 text-green-600" />
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">
                  {Math.round(reports.reduce((sum, r) => sum + r.performance.generationTime, 0) / reports.length)}s
                </div>
                <p className="text-sm text-muted-foreground">Avg Generation Time</p>
                <p className="text-xs text-green-600 mt-1">Fully automated</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Send className="w-8 h-8 text-purple-600" />
                <Badge className="bg-purple-100 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400">
                  99.3%
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">
                  {Math.round(reports.reduce((sum, r) => sum + r.performance.deliveryRate, 0) / reports.length)}%
                </div>
                <p className="text-sm text-muted-foreground">Delivery Rate</p>
                <p className="text-xs text-purple-600 mt-1">Reliable delivery</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Eye className="w-8 h-8 text-orange-600" />
                <TrendingUp className="w-4 h-4 text-orange-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">
                  {Math.round(reports.filter(r => r.performance.openRate).reduce((sum, r) => sum + (r.performance.openRate || 0), 0) / reports.filter(r => r.performance.openRate).length)}%
                </div>
                <p className="text-sm text-muted-foreground">Open Rate</p>
                <p className="text-xs text-orange-600 mt-1">Email reports</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="reports" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="reports">Active Reports</TabsTrigger>
            <TabsTrigger value="templates">Report Templates</TabsTrigger>
            <TabsTrigger value="schedule">Schedule Manager</TabsTrigger>
            <TabsTrigger value="analytics">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {reports.map((report) => (
                <Card key={report.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(report.type)}
                        <div>
                          <CardTitle className="text-lg">{report.name}</CardTitle>
                          <CardDescription>
                            {getScheduleText(report.schedule)} • {report.format.toUpperCase()} format
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(report.status)}
                        <Badge variant="outline">{report.type}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Recipients</span>
                          <p className="font-medium">{report.recipients.length} people</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Last Generated</span>
                          <p className="font-medium">{report.lastGenerated}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Next Generation</span>
                          <p className="font-medium">{report.nextGeneration}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Delivery Rate</span>
                          <p className="font-medium text-green-600">{report.performance.deliveryRate}%</p>
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-sm text-muted-foreground">Included Metrics</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {report.metrics.map((metric) => (
                            <Badge key={metric} variant="outline" className="text-xs">
                              {metric.replace("-", " ")}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Generates in {report.performance.generationTime}s
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => previewReport(report.id)}
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            Preview
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => generateReport(report.id)}
                            disabled={isGenerating}
                          >
                            {isGenerating ? (
                              <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                            ) : (
                              <Play className="w-3 h-3 mr-1" />
                            )}
                            Generate Now
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => toggleReportStatus(report.id)}
                          >
                            {report.status === "active" ? (
                              <Pause className="w-3 h-3" />
                            ) : (
                              <Play className="w-3 h-3" />
                            )}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => deleteReport(report.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {templates.map((template) => (
                <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{template.category}</Badge>
                        <Badge className="bg-blue-100 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">
                          {template.popularity}% popularity
                        </Badge>
                      </div>
                    </div>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Setup Time</span>
                        <span className="font-medium">{template.estimatedTime}</span>
                      </div>
                      
                      <div>
                        <span className="text-sm text-muted-foreground">Included Metrics</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {template.metrics.map((metric) => (
                            <Badge key={metric} variant="outline" className="text-xs">
                              {metric.replace("-", " ")}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        onClick={() => createReportFromTemplate(template)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Use This Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {reports.map((report) => (
                <Card key={report.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Calendar className="w-8 h-8 text-blue-600" />
                        <div>
                          <h4 className="font-semibold">{report.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {getScheduleText(report.schedule)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Next generation: {report.nextGeneration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(report.status)}
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit Schedule
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Generation Performance</CardTitle>
                  <CardDescription>Report generation metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average Generation Time</span>
                      <span className="text-sm font-medium">65 seconds</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Success Rate</span>
                      <div className="flex items-center gap-2">
                        <Progress value={99} className="w-24" />
                        <span className="text-sm font-medium">99.2%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Reports This Month</span>
                      <span className="text-sm font-medium">284</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Engagement Metrics</CardTitle>
                  <CardDescription>Recipient engagement statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Email Open Rate</span>
                      <div className="flex items-center gap-2">
                        <Progress value={87} className="w-24" />
                        <span className="text-sm font-medium">87%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Download Rate</span>
                      <div className="flex items-center gap-2">
                        <Progress value={65} className="w-24" />
                        <span className="text-sm font-medium">65%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Feedback Score</span>
                      <span className="text-sm font-medium text-green-600">4.7/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}