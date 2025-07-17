import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  LayoutGrid, 
  BarChart3, 
  PieChart,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  Clock,
  MapPin,
  MessageSquare,
  Bell,
  Settings,
  Plus,
  Copy,
  Edit,
  Trash2,
  Star,
  Filter,
  Search,
  Download,
  Share2,
  TestTube,
  Eye,
  Grid3x3,
  Zap,
  Target,
  Activity
} from "lucide-react";
import { useModal } from "@/components/ui/modal";

const widgetCategories = [
  { id: "all", name: "All Widgets", count: 24 },
  { id: "analytics", name: "Analytics", count: 8 },
  { id: "charts", name: "Charts", count: 6 },
  { id: "social", name: "Social", count: 4 },
  { id: "ecommerce", name: "E-commerce", count: 3 },
  { id: "productivity", name: "Productivity", count: 3 }
];

const widgets = [
  {
    id: "revenue-chart",
    name: "Revenue Chart",
    description: "Track revenue growth with beautiful line charts",
    category: "analytics",
    size: "large",
    icon: BarChart3,
    color: "bg-blue-500",
    featured: true,
    downloads: 2847,
    rating: 4.9,
    previewData: { value: "$45,231", change: "+20.1%" }
  },
  {
    id: "user-stats",
    name: "User Statistics",
    description: "Display user metrics and growth trends",
    category: "analytics",
    size: "medium",
    icon: Users,
    color: "bg-green-500",
    featured: false,
    downloads: 1923,
    rating: 4.7,
    previewData: { value: "12,345", change: "+8.2%" }
  },
  {
    id: "pie-chart",
    name: "Distribution Chart",
    description: "Show data distribution with interactive pie charts",
    category: "charts",
    size: "medium",
    icon: PieChart,
    color: "bg-purple-500",
    featured: true,
    downloads: 3421,
    rating: 4.8,
    previewData: { segments: ["Mobile 45%", "Desktop 35%", "Tablet 20%"] }
  },
  {
    id: "kpi-cards",
    name: "KPI Cards",
    description: "Key performance indicators in card format",
    category: "analytics",
    size: "small",
    icon: Target,
    color: "bg-orange-500",
    featured: false,
    downloads: 1567,
    rating: 4.6,
    previewData: { metrics: ["CTR", "CPC", "ROAS"] }
  },
  {
    id: "activity-feed",
    name: "Activity Feed",
    description: "Real-time activity and notification stream",
    category: "social",
    size: "large",
    icon: Activity,
    color: "bg-cyan-500",
    featured: false,
    downloads: 892,
    rating: 4.5,
    previewData: { activities: ["User logged in", "New order", "Comment posted"] }
  },
  {
    id: "calendar-widget",
    name: "Event Calendar",
    description: "Interactive calendar with event management",
    category: "productivity",
    size: "large",
    icon: Calendar,
    color: "bg-red-500",
    featured: true,
    downloads: 2156,
    rating: 4.7,
    previewData: { events: ["Meeting at 2 PM", "Deadline tomorrow"] }
  },
  {
    id: "notification-center",
    name: "Notification Center",
    description: "Centralized notification management system",
    category: "social",
    size: "medium",
    icon: Bell,
    color: "bg-yellow-500",
    featured: false,
    downloads: 1344,
    rating: 4.4,
    previewData: { count: 23, unread: 5 }
  },
  {
    id: "sales-funnel",
    name: "Sales Funnel",
    description: "Visualize conversion funnel and drop-offs",
    category: "ecommerce",
    size: "large",
    icon: TrendingUp,
    color: "bg-pink-500",
    featured: true,
    downloads: 987,
    rating: 4.8,
    previewData: { stages: ["Leads", "Prospects", "Customers"] }
  }
];

export default function WidgetLibrary() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid");
  const { showModal, ModalComponent } = useModal();

  const filteredWidgets = widgets.filter(widget => {
    const matchesCategory = selectedCategory === "all" || widget.category === selectedCategory;
    const matchesSearch = widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         widget.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedWidgets = [...filteredWidgets].sort((a, b) => {
    switch (filterBy) {
      case "popular":
        return b.downloads - a.downloads;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const addWidget = (widget: typeof widgets[0]) => {
    // Simulate adding widget to dashboard with visual feedback
    const button = document.querySelector(`[data-widget-id="${widget.id}"]`);
    if (button) {
      button.classList.add('animate-pulse');
      setTimeout(() => {
        button.classList.remove('animate-pulse');
      }, 1000);
    }
    
    // Create floating notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all transform translate-x-full';
    notification.textContent = `${widget.name} added to dashboard!`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 100);
    
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 2000);
    
    showModal({
      title: "Widget Added",
      message: `${widget.name} has been added to your dashboard. You can configure it in the layout designer.`,
      type: "success"
    });
  };

  const previewWidget = (widget: typeof widgets[0]) => {
    showModal({
      title: `Preview: ${widget.name}`,
      message: `This is a preview of the ${widget.name} widget. Click "Add to Dashboard" to use it in your layout.`,
      type: "info"
    });
  };

  const duplicateWidget = (widget: typeof widgets[0]) => {
    showModal({
      title: "Widget Duplicated",
      message: `A copy of ${widget.name} has been created. You can now customize it independently.`,
      type: "success"
    });
  };

  const downloadWidget = (widget: typeof widgets[0]) => {
    showModal({
      title: "Widget Downloaded",
      message: `${widget.name} configuration has been downloaded. You can import it to other dashboards.`,
      type: "success"
    });
  };

  const createCustomWidget = () => {
    showModal({
      title: "Custom Widget Builder",
      message: "Widget builder would open, allowing you to create custom widgets with drag-and-drop components.",
      type: "info"
    });
  };

  const getSizeClass = (size: string) => {
    switch (size) {
      case "small": return "col-span-1 row-span-1";
      case "medium": return "col-span-1 row-span-2";
      case "large": return "col-span-2 row-span-2";
      default: return "col-span-1 row-span-1";
    }
  };

  return (
    <MainLayout title="Widget Library">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Widget Library</h1>
            <p className="text-muted-foreground mt-1">
              Browse and customize pre-built widgets for your dashboard
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="px-3 py-1">
              <TestTube className="w-4 h-4 mr-1" />
              {widgets.length} Widgets Available
            </Badge>
            <Button onClick={createCustomWidget}>
              <Plus className="w-4 h-4 mr-2" />
              Create Custom Widget
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search widgets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select 
                  className="p-2 border rounded-lg bg-background text-foreground"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {widgetCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Filter */}
              <select 
                className="p-2 border rounded-lg bg-background text-foreground"
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>

              {/* View Mode */}
              <div className="flex items-center space-x-1 border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Widget Categories */}
        <div className="flex flex-wrap gap-2">
          {widgetCategories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
              <Badge variant="secondary" className="ml-2">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Widget Grid */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedWidgets.map((widget) => (
              <Card key={widget.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-10 h-10 rounded-lg ${widget.color} flex items-center justify-center`}>
                      <widget.icon className="w-5 h-5 text-white" />
                    </div>
                    {widget.featured && (
                      <Badge variant="secondary">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{widget.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {widget.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Widget Preview */}
                  <div className="h-24 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <widget.icon className="w-8 h-8 text-muted-foreground mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">Preview</p>
                    </div>
                  </div>

                  {/* Widget Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{widget.rating}</span>
                    </div>
                    <div className="text-muted-foreground">
                      {widget.downloads.toLocaleString()} downloads
                    </div>
                  </div>

                  {/* Widget Actions */}
                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1" 
                      onClick={() => addWidget(widget)}
                      data-widget-id={widget.id}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => previewWidget(widget)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => duplicateWidget(widget)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {sortedWidgets.map((widget) => (
              <Card key={widget.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg ${widget.color} flex items-center justify-center`}>
                        <widget.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{widget.name}</h3>
                          {widget.featured && (
                            <Badge variant="secondary">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                          <Badge variant="outline">{widget.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{widget.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>{widget.rating}</span>
                          </div>
                          <span className="text-muted-foreground">
                            {widget.downloads.toLocaleString()} downloads
                          </span>
                          <Badge variant="outline">{widget.size}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button onClick={() => addWidget(widget)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Widget
                      </Button>
                      <Button variant="outline" onClick={() => previewWidget(widget)}>
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button variant="outline" onClick={() => downloadWidget(widget)}>
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Custom Widget Builder Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Custom Widget Builder
            </CardTitle>
            <CardDescription>
              Create your own widgets with our drag-and-drop builder
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 border rounded-lg text-center">
                <BarChart3 className="w-8 h-8 mx-auto mb-3 text-blue-500" />
                <h4 className="font-medium mb-2">Chart Widgets</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Create custom charts with your data sources
                </p>
                <Button variant="outline" size="sm">
                  Build Chart Widget
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg text-center">
                <Users className="w-8 h-8 mx-auto mb-3 text-green-500" />
                <h4 className="font-medium mb-2">Data Widgets</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Display metrics and KPIs in custom layouts
                </p>
                <Button variant="outline" size="sm">
                  Build Data Widget
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg text-center">
                <MessageSquare className="w-8 h-8 mx-auto mb-3 text-purple-500" />
                <h4 className="font-medium mb-2">Interactive Widgets</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Add forms, buttons, and user interactions
                </p>
                <Button variant="outline" size="sm">
                  Build Interactive Widget
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Button onClick={createCustomWidget}>
                <Plus className="w-4 h-4 mr-2" />
                Start Building Custom Widget
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <ModalComponent />
    </MainLayout>
  );
}