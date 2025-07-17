import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { useModal } from "@/components/ui/modal";
import { 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Download,
  RefreshCw,
  Filter,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  BarChart3,
  LineChart,
  Activity,
  Users,
  DollarSign,
  ShoppingCart,
  Eye,
  Settings
} from "lucide-react";

const trendMetrics = [
  {
    id: "revenue",
    name: "Revenue Growth",
    value: "+24.5%",
    change: "+5.2%",
    trend: "up",
    period: "Last 30 days",
    color: "text-green-600",
    bgColor: "bg-green-500"
  },
  {
    id: "users",
    name: "User Acquisition", 
    value: "+18.3%",
    change: "+3.1%",
    trend: "up",
    period: "Last 30 days",
    color: "text-blue-600",
    bgColor: "bg-blue-500"
  },
  {
    id: "conversion",
    name: "Conversion Rate",
    value: "-2.1%",
    change: "-0.8%",
    trend: "down",
    period: "Last 30 days",
    color: "text-red-600",
    bgColor: "bg-red-500"
  },
  {
    id: "engagement",
    name: "User Engagement",
    value: "+12.8%",
    change: "+2.3%",
    trend: "up", 
    period: "Last 30 days",
    color: "text-purple-600",
    bgColor: "bg-purple-500"
  }
];

const trendAnalysis = [
  {
    id: "1",
    title: "Mobile Usage Surge",
    description: "Mobile traffic increased by 45% in the last quarter",
    severity: "positive",
    impact: "High",
    timeframe: "Q1 2024",
    category: "User Behavior",
    confidence: 94
  },
  {
    id: "2",
    title: "Weekend Sales Decline",
    description: "Sales performance drops by 15% during weekends",
    severity: "negative", 
    impact: "Medium",
    timeframe: "Last 8 weeks",
    category: "Sales",
    confidence: 87
  },
  {
    id: "3",
    title: "Evening Peak Hours",
    description: "User activity peaks between 7-9 PM consistently",
    severity: "neutral",
    impact: "Medium",
    timeframe: "Ongoing",
    category: "Usage Patterns",
    confidence: 91
  },
  {
    id: "4",
    title: "Feature Adoption Growth",
    description: "New feature adoption rate increased by 60%",
    severity: "positive",
    impact: "High", 
    timeframe: "Last month",
    category: "Product",
    confidence: 96
  }
];

const forecastData = [
  { metric: "Revenue", current: "$124K", predicted: "$156K", confidence: 89, trend: "up" },
  { metric: "Users", current: "12.5K", predicted: "15.8K", confidence: 92, trend: "up" },
  { metric: "Conversion", current: "3.2%", predicted: "2.9%", confidence: 76, trend: "down" },
  { metric: "Engagement", current: "45min", predicted: "52min", confidence: 83, trend: "up" }
];

export default function Trends() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { showModal, ModalComponent } = useModal();

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showModal({
        title: "Trend Verisi Güncellendi",
        message: "Trend analizi verileri en son verilerle güncellendi.",
        type: "success"
      });
    }, 1500);
  };

  const handleExport = (format: string) => {
    showModal({
      title: `${format.toUpperCase()} Export`,
      message: `Trend analizi raporu ${format} formatında export edilecek.`,
      type: "info"
    });
  };

  const handleViewDetails = (trendId: string) => {
    showModal({
      title: "Trend Detayları",
      message: "Detaylı trend analizi paneli burada açılacak. Grafikler, tahminler ve öneriler görüntülenecek.",
      type: "info"
    });
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "positive":
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Positive</Badge>;
      case "negative":
        return <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" />Negative</Badge>;
      default:
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Neutral</Badge>;
    }
  };

  return (
    <MainLayout title="Trend Analysis">
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Trend Analysis</h1>
            <p className="text-muted-foreground mt-1">
              Identify patterns and predict future performance
            </p>
          </div>
          <div className="flex gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[140px]">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[140px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="users">Users</SelectItem>
                <SelectItem value="engagement">Engagement</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleExport("pdf")}>
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("excel")}>
                  Export as Excel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("csv")}>
                  Export as CSV
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Trend Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendMetrics.map((metric, index) => (
            <Card 
              key={metric.id} 
              className="hover:shadow-lg transition-shadow animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {metric.name}
                    </p>
                    <p className="text-2xl font-bold mt-2">
                      {metric.value}
                    </p>
                    <p className={`text-sm mt-1 flex items-center ${metric.color}`}>
                      {metric.trend === "up" ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                      {metric.change} vs previous
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{metric.period}</p>
                  </div>
                  <div className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                    {metric.id === "revenue" && <DollarSign className="w-6 h-6 text-white" />}
                    {metric.id === "users" && <Users className="w-6 h-6 text-white" />}
                    {metric.id === "conversion" && <Target className="w-6 h-6 text-white" />}
                    {metric.id === "engagement" && <Activity className="w-6 h-6 text-white" />}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="analysis" className="space-y-6">
          <TabsList>
            <TabsTrigger value="analysis">Trend Analysis</TabsTrigger>
            <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
            <TabsTrigger value="patterns">Patterns</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Trends Identified</CardTitle>
                  <CardDescription>
                    Significant patterns detected in your data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trendAnalysis.map((trend) => (
                      <div key={trend.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold">{trend.title}</h4>
                          {getSeverityBadge(trend.severity)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{trend.description}</p>
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex gap-4">
                            <span className="text-muted-foreground">Impact: <span className="font-medium">{trend.impact}</span></span>
                            <span className="text-muted-foreground">Category: <span className="font-medium">{trend.category}</span></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Confidence: {trend.confidence}%</span>
                            <Button size="sm" variant="outline" onClick={() => handleViewDetails(trend.id)}>
                              <Eye className="w-3 h-3 mr-1" />
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Trend Visualization</CardTitle>
                  <CardDescription>
                    Visual representation of trend data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 bg-muted/30 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <LineChart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Interactive trend chart will be displayed here</p>
                      <p className="text-sm text-muted-foreground mt-2">Real-time data visualization with filters</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="forecasting" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Forecast</CardTitle>
                  <CardDescription>
                    Predicted metrics for the next 30 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {forecastData.map((forecast, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{forecast.metric}</span>
                          <Badge variant={forecast.trend === "up" ? "default" : "destructive"}>
                            {forecast.trend === "up" ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                            {forecast.trend === "up" ? "Growing" : "Declining"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Current: {forecast.current}</span>
                          <span className="font-medium">Predicted: {forecast.predicted}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Confidence</span>
                            <span>{forecast.confidence}%</span>
                          </div>
                          <Progress value={forecast.confidence} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Forecast Chart</CardTitle>
                  <CardDescription>
                    Visual forecast representation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 bg-muted/30 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Predictive analytics chart</p>
                      <p className="text-sm text-muted-foreground mt-2">AI-powered forecasting with confidence intervals</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {["Seasonal Patterns", "Weekly Cycles", "Daily Trends", "User Behavior", "Product Performance", "Marketing Impact"].map((pattern, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{pattern}</CardTitle>
                    <CardDescription>Detected recurring patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center mb-4">
                      <Activity className="w-8 h-8 text-primary" />
                    </div>
                    <Button className="w-full" onClick={() => showModal({
                      title: `${pattern} Analysis`,
                      message: `${pattern} için detaylı pattern analizi görüntülenecek. Tekrarlayan davranışlar ve öngörüler.`,
                      type: "info"
                    })}>
                      View Pattern
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Trend Alerts</CardTitle>
                  <CardDescription>
                    Automated alerts for significant changes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { type: "warning", message: "Conversion rate dropped 15% in last 3 days", time: "2 hours ago" },
                      { type: "success", message: "Mobile traffic increased 25% this week", time: "1 day ago" },
                      { type: "info", message: "New pattern detected: Evening peak usage", time: "2 days ago" }
                    ].map((alert, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          alert.type === "warning" ? "bg-yellow-500" :
                          alert.type === "success" ? "bg-green-500" : "bg-blue-500"
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm">{alert.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alert Settings</CardTitle>
                  <CardDescription>
                    Configure trend monitoring alerts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Threshold Alerts</label>
                        <Badge variant="outline">3 Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Pattern Alerts</label>
                        <Badge variant="outline">2 Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Anomaly Detection</label>
                        <Badge variant="outline">Enabled</Badge>
                      </div>
                    </div>
                    <Button className="w-full" onClick={() => showModal({
                      title: "Alert Configuration",
                      message: "Alert ayarları paneli burada açılacak. Threshold değerleri, bildirim kanalları ve sıklık ayarları.",
                      type: "info"
                    })}>
                      <Settings className="w-4 h-4 mr-2" />
                      Configure Alerts
                    </Button>
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