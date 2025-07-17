import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useModal } from "@/components/ui/modal";
import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  TrendingUp,
  Download,
  Settings,
  RefreshCw,
  Filter,
  Calendar,
  Eye,
  Maximize,
  Share,
  Palette,
  Grid3X3,
  Layers
} from "lucide-react";

const chartTypes = [
  { id: "bar", name: "Bar Chart", icon: BarChart3, color: "bg-blue-500" },
  { id: "line", name: "Line Chart", icon: LineChart, color: "bg-green-500" },
  { id: "pie", name: "Pie Chart", icon: PieChart, color: "bg-purple-500" },
  { id: "area", name: "Area Chart", icon: TrendingUp, color: "bg-orange-500" },
];

const visualizations = [
  {
    id: "1",
    title: "Revenue Trends",
    type: "line",
    description: "Monthly revenue progression over the last 12 months",
    category: "Financial",
    lastUpdated: "2 hours ago",
    views: 234,
    isPublic: true
  },
  {
    id: "2", 
    title: "User Demographics",
    type: "pie",
    description: "User distribution by age groups and regions",
    category: "Analytics",
    lastUpdated: "1 day ago",
    views: 156,
    isPublic: false
  },
  {
    id: "3",
    title: "Performance Metrics",
    type: "bar",
    description: "Key performance indicators comparison",
    category: "Operations",
    lastUpdated: "3 hours ago",
    views: 89,
    isPublic: true
  }
];

export default function Visualization() {
  const [selectedChart, setSelectedChart] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { showModal, ModalComponent } = useModal();

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showModal({
        title: "Data Yenilendi",
        message: "Visualization verileri başarıyla güncellendi.",
        type: "success"
      });
    }, 1000);
  };

  const handleExport = (format: string) => {
    showModal({
      title: `${format.toUpperCase()} Export`,
      message: `Visualization ${format} formatında export edilecek. Bu özellik gerçek uygulamada implement edilir.`,
      type: "info"
    });
  };

  const handleCreateVisualization = () => {
    showModal({
      title: "Yeni Visualization",
      message: "Yeni visualization oluşturma paneli burada açılacak. Drag & drop chart builder ile kolay visualization oluşturma.",
      type: "info"
    });
  };

  const handleShareVisualization = (id: string) => {
    showModal({
      title: "Visualization Paylaş",
      message: "Visualization paylaşım linki oluşturuldu. Gerçek uygulamada URL kopyalanacak ve izinler ayarlanacak.",
      type: "success"
    });
  };

  return (
    <MainLayout title="Data Visualization">
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Data Visualization</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage interactive charts and graphs
            </p>
          </div>
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="analytics">Analytics</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            
            <Button onClick={handleCreateVisualization}>
              <BarChart3 className="w-4 h-4 mr-2" />
              Create Visualization
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Charts</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <Eye className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold">1,479</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Share className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Shared</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold">16</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="gallery" className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="builder">Chart Builder</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleExport("png")}>
                  Export as PNG
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("svg")}>
                  Export as SVG
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("pdf")}>
                  Export as PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <TabsContent value="gallery" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {visualizations.map((viz) => {
                const chartType = chartTypes.find(t => t.id === viz.type);
                const Icon = chartType?.icon || BarChart3;
                
                return (
                  <Card key={viz.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 ${chartType?.color} rounded-lg flex items-center justify-center`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{viz.title}</CardTitle>
                            <CardDescription>{viz.category}</CardDescription>
                          </div>
                        </div>
                        <Badge variant={viz.isPublic ? "default" : "secondary"}>
                          {viz.isPublic ? "Public" : "Private"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{viz.description}</p>
                      <div className="h-32 bg-muted rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <span>Updated {viz.lastUpdated}</span>
                        <span>{viz.views} views</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1" onClick={() => showModal({
                          title: "Chart Preview",
                          message: "Chart önizleme paneli burada açılacak. Interaktif chart görüntüleme ve detay analizi.",
                          type: "info"
                        })}>
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleShareVisualization(viz.id)}>
                          <Share className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => showModal({
                          title: "Chart Settings",
                          message: "Chart ayarları paneli burada açılacak. Renk, stil, data source ayarları yapılabilir.",
                          type: "info"
                        })}>
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="builder" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Chart Builder Canvas</CardTitle>
                  <CardDescription>Drag and drop to create visualizations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
                    <div className="text-center">
                      <Grid3X3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Drag chart types here to start building</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Chart Types</CardTitle>
                  <CardDescription>Available visualization options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {chartTypes.map((chart) => {
                    const Icon = chart.icon;
                    return (
                      <div key={chart.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                        <div className={`w-8 h-8 ${chart.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium">{chart.name}</span>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {["Sales Dashboard", "Marketing Analytics", "User Behavior", "Financial Overview", "Performance Metrics", "Customer Insights"].map((template, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">{template}</CardTitle>
                    <CardDescription>Pre-built visualization template</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-24 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center mb-4">
                      <Layers className="w-8 h-8 text-primary" />
                    </div>
                    <Button className="w-full" onClick={() => showModal({
                      title: "Template Kullan",
                      message: `${template} template'i kullanılacak. Önceden hazırlanmış chart koleksiyonu ile hızlı başlangıç.`,
                      type: "info"
                    })}>
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Display Settings</CardTitle>
                  <CardDescription>Configure how charts are displayed</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Default Theme</label>
                      <Select defaultValue="light">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="auto">Auto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Color Palette</label>
                      <Button variant="outline" size="sm" onClick={() => showModal({
                        title: "Color Palette",
                        message: "Renk paleti ayarları burada düzenlenecek. Chart renklerini özelleştirme seçenekleri.",
                        type: "info"
                      })}>
                        <Palette className="w-4 h-4 mr-2" />
                        Customize
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Performance Settings</CardTitle>
                  <CardDescription>Optimize visualization performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Auto Refresh</label>
                      <Select defaultValue="5m">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1m">1 minute</SelectItem>
                          <SelectItem value="5m">5 minutes</SelectItem>
                          <SelectItem value="15m">15 minutes</SelectItem>
                          <SelectItem value="off">Off</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Cache Duration</label>
                      <Select defaultValue="1h">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5m">5 minutes</SelectItem>
                          <SelectItem value="1h">1 hour</SelectItem>
                          <SelectItem value="24h">24 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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