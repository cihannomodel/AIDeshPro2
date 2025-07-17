import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import { 
  FileText, 
  Plus, 
  Download, 
  Calendar, 
  Filter, 
  BarChart3, 
  PieChart, 
  LineChart, 
  Table,
  Settings,
  Clock,
  Eye,
  Edit,
  Trash2,
  Copy,
  TestTube
} from "lucide-react";
import { useModal } from "@/components/ui/modal";

const mockReportTemplates = [
  {
    id: "1",
    name: "Monthly Sales Summary",
    description: "Comprehensive monthly sales performance report",
    category: "Sales",
    frequency: "Monthly",
    lastGenerated: "2 days ago",
    status: "active",
    chartTypes: ["bar", "line"],
    metrics: ["revenue", "transactions", "conversion_rate"]
  },
  {
    id: "2",
    name: "User Engagement Analysis", 
    description: "Deep dive into user behavior and engagement patterns",
    category: "Analytics",
    frequency: "Weekly",
    lastGenerated: "1 week ago",
    status: "active",
    chartTypes: ["pie", "line"],
    metrics: ["page_views", "session_duration", "bounce_rate"]
  },
  {
    id: "3",
    name: "Financial Performance Dashboard",
    description: "Executive-level financial overview and KPIs",
    category: "Finance",
    frequency: "Daily",
    lastGenerated: "1 hour ago",
    status: "active",
    chartTypes: ["bar", "table"],
    metrics: ["revenue", "expenses", "profit_margin"]
  },
  {
    id: "4",
    name: "Customer Acquisition Report",
    description: "Track new customer acquisition channels and costs",
    category: "Marketing",
    frequency: "On-demand",
    lastGenerated: "5 days ago",
    status: "draft",
    chartTypes: ["pie", "bar"],
    metrics: ["new_customers", "acquisition_cost", "lifetime_value"]
  }
];

const availableMetrics = [
  { id: "revenue", name: "Revenue", category: "Sales" },
  { id: "transactions", name: "Transactions", category: "Sales" },
  { id: "conversion_rate", name: "Conversion Rate", category: "Sales" },
  { id: "page_views", name: "Page Views", category: "Analytics" },
  { id: "session_duration", name: "Session Duration", category: "Analytics" },
  { id: "bounce_rate", name: "Bounce Rate", category: "Analytics" },
  { id: "new_customers", name: "New Customers", category: "Marketing" },
  { id: "acquisition_cost", name: "Acquisition Cost", category: "Marketing" },
  { id: "lifetime_value", name: "Customer Lifetime Value", category: "Marketing" },
  { id: "expenses", name: "Expenses", category: "Finance" },
  { id: "profit_margin", name: "Profit Margin", category: "Finance" },
  { id: "user_count", name: "User Count", category: "Users" }
];

const chartTypes = [
  { id: "bar", name: "Bar Chart", icon: BarChart3 },
  { id: "line", name: "Line Chart", icon: LineChart },
  { id: "pie", name: "Pie Chart", icon: PieChart },
  { id: "table", name: "Data Table", icon: Table }
];

export default function CustomReports() {
  const [newReport, setNewReport] = useState({
    name: "",
    description: "",
    category: "",
    frequency: "monthly",
    metrics: [] as string[],
    chartTypes: [] as string[],
    dateRange: "last_30_days",
    filters: {},
    scheduledEmail: false
  });
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const { showModal, ModalComponent } = useModal();

  const handleMetricToggle = (metricId: string) => {
    setNewReport(prev => ({
      ...prev,
      metrics: prev.metrics.includes(metricId)
        ? prev.metrics.filter(id => id !== metricId)
        : [...prev.metrics, metricId]
    }));
  };

  const handleChartTypeToggle = (chartId: string) => {
    setNewReport(prev => ({
      ...prev,
      chartTypes: prev.chartTypes.includes(chartId)
        ? prev.chartTypes.filter(id => id !== chartId)
        : [...prev.chartTypes, chartId]
    }));
  };

  const handleCreateReport = () => {
    showModal({
      title: "Report Oluşturuldu",
      message: "Özel rapor başarıyla kaydedildi ve generate edilmeye hazır.",
      type: "success"
    });
    // Reset form
    setNewReport({
      name: "",
      description: "",
      category: "",
      frequency: "monthly",
      metrics: [],
      chartTypes: [],
      dateRange: "last_30_days",
      filters: {},
      scheduledEmail: false
    });
  };

  const handleGenerateReport = (reportId: string) => {
    showModal({
      title: "Report Generate Edildi",
      message: "Demo raporu başarıyla generate edildi ve indirmeye hazır.",
      type: "success"
    });
  };

  const handleDuplicateReport = (reportId: string) => {
    showModal({
      title: "Report Kopyalandı",
      message: "Report template başarıyla kopyalandı.",
      type: "success"
    });
  };

  const handleEditReport = (reportId: string) => {
    showModal({
      title: "Report Düzenle",
      message: "Report düzenleme paneli burada açılacak. Tüm ayarları değiştirme ve güncelleme seçenekleri.",
      type: "info"
    });
  };

  const handleDeleteReport = (reportId: string) => {
    showModal({
      title: "Report Sil",
      message: "Bu report template'i silmek istediğinize emin misiniz? Bu işlem geri alınamaz.",
      type: "warning",
      showCancel: true,
      onConfirm: () => showModal({
        title: "Report Silindi",
        message: "Report template başarıyla silindi.",
        type: "success"
      })
    });
  };

  const handlePreviewReport = (reportId: string) => {
    showModal({
      title: "Report Önizleme",
      message: "Report önizleme paneli burada açılacak. Gerçek verilerle nasıl gözükeceğini görebilirsiniz.",
      type: "info"
    });
  };

  const handleScheduleReport = () => {
    showModal({
      title: "Report Zamanla",
      message: "Report zamanlama paneli burada açılacak. Otomatik gönderim ayarları ve email notification.",
      type: "info"
    });
  };

  return (
    <MainLayout title="Custom Reports">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Custom Reports</h1>
            <p className="text-muted-foreground mt-1">
              Create, customize, and schedule automated reports
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="px-3 py-1">
              <TestTube className="w-4 h-4 mr-1" />
              Demo Mode
            </Badge>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue="templates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="templates">Report Templates</TabsTrigger>
            <TabsTrigger value="builder">Report Builder</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          </TabsList>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid gap-6">
              {mockReportTemplates.map((template) => (
                <Card key={template.id} className="relative">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-lg">{template.name}</h3>
                          <Badge variant={template.status === 'active' ? 'default' : 'outline'}>
                            {template.status}
                          </Badge>
                          <Badge variant="secondary">{template.category}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{template.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Frequency</p>
                            <p className="font-medium">{template.frequency}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Last Generated</p>
                            <p className="font-medium">{template.lastGenerated}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Chart Types</p>
                            <p className="font-medium">{template.chartTypes.length} types</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Metrics</p>
                            <p className="font-medium">{template.metrics.length} metrics</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="flex space-x-2">
                        {template.chartTypes.map((type) => {
                          const ChartIcon = chartTypes.find(ct => ct.id === type)?.icon || BarChart3;
                          return (
                            <div key={type} className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                              <ChartIcon className="w-4 h-4 text-primary" />
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDuplicateReport(template.id)}
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Duplicate
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditReport(template.id)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleGenerateReport(template.id)}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Generate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Builder Tab */}
          <TabsContent value="builder" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Custom Report</CardTitle>
                <CardDescription>
                  Build a personalized report with your choice of metrics and visualizations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="report-name">Report Name</Label>
                    <Input
                      id="report-name"
                      placeholder="Enter report name..."
                      value={newReport.name}
                      onChange={(e) => setNewReport(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={newReport.category} onValueChange={(value) => setNewReport(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="analytics">Analytics</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="users">Users</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what this report will show..."
                    value={newReport.description}
                    onChange={(e) => setNewReport(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                {/* Metrics Selection */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Select Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availableMetrics.map((metric) => (
                      <div key={metric.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                        <Checkbox
                          id={metric.id}
                          checked={newReport.metrics.includes(metric.id)}
                          onCheckedChange={() => handleMetricToggle(metric.id)}
                        />
                        <div className="flex-1">
                          <Label htmlFor={metric.id} className="font-medium">{metric.name}</Label>
                          <p className="text-xs text-muted-foreground">{metric.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chart Types */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Visualization Types</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {chartTypes.map((chart) => {
                      const Icon = chart.icon;
                      return (
                        <div 
                          key={chart.id} 
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            newReport.chartTypes.includes(chart.id) 
                              ? 'border-primary bg-primary/5' 
                              : 'hover:border-primary/50'
                          }`}
                          onClick={() => handleChartTypeToggle(chart.id)}
                        >
                          <div className="flex flex-col items-center space-y-2">
                            <Icon className="w-8 h-8" />
                            <p className="text-sm font-medium">{chart.name}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Schedule & Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Schedule</h3>
                    <div className="space-y-2">
                      <Label>Frequency</Label>
                      <Select value={newReport.frequency} onValueChange={(value) => setNewReport(prev => ({ ...prev, frequency: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="on-demand">On Demand</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Email Schedule</Label>
                      <Switch
                        checked={newReport.scheduledEmail}
                        onCheckedChange={(checked) => setNewReport(prev => ({ ...prev, scheduledEmail: checked }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Date Range</h3>
                    <div className="space-y-2">
                      <Label>Default Date Range</Label>
                      <Select value={newReport.dateRange} onValueChange={(value) => setNewReport(prev => ({ ...prev, dateRange: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="last_7_days">Last 7 days</SelectItem>
                          <SelectItem value="last_30_days">Last 30 days</SelectItem>
                          <SelectItem value="last_90_days">Last 90 days</SelectItem>
                          <SelectItem value="this_month">This month</SelectItem>
                          <SelectItem value="last_month">Last month</SelectItem>
                          <SelectItem value="this_year">This year</SelectItem>
                          <SelectItem value="custom">Custom range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <Button variant="outline">Save as Draft</Button>
                  <Button onClick={handleCreateReport}>Create Report</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scheduled Tab */}
          <TabsContent value="scheduled" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Reports</CardTitle>
                <CardDescription>
                  Manage automated report generation and email delivery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockReportTemplates.filter(t => t.frequency !== 'On-demand').map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Clock className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{report.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{report.frequency}</span>
                            <span>Next: Tomorrow 9:00 AM</span>
                            <span>Recipients: 3 emails</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch defaultChecked={report.status === 'active'} />
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
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