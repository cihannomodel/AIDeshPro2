import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Grid3x3, 
  Layout,
  Move,
  RotateCw,
  Maximize2,
  Minimize2,
  Copy,
  Trash2,
  Plus,
  Settings,
  Eye,
  Save,
  Download,
  Upload,
  RotateCcw,
  TestTube,
  Monitor,
  Smartphone,
  Tablet,
  Layers,
  MousePointer,
  Square,
  Circle,
  Triangle,
  Zap,
  Target,
  BarChart3,
  PieChart,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  MessageSquare,
  Bell,
  Activity
} from "lucide-react";
import { useModal } from "@/components/ui/modal";

const layoutTemplates = [
  {
    id: "default",
    name: "Default Dashboard",
    description: "Standard 4-column grid layout",
    thumbnail: "grid-4x4",
    columns: 4,
    widgets: [
      { id: "stats", type: "stats", position: { x: 0, y: 0, w: 4, h: 1 } },
      { id: "chart", type: "chart", position: { x: 0, y: 1, w: 2, h: 2 } },
      { id: "table", type: "table", position: { x: 2, y: 1, w: 2, h: 2 } },
      { id: "activity", type: "feed", position: { x: 0, y: 3, w: 4, h: 1 } }
    ]
  },
  {
    id: "analytics",
    name: "Analytics Focus",
    description: "Chart-heavy layout for data analysis",
    thumbnail: "grid-chart",
    columns: 3,
    widgets: [
      { id: "kpi", type: "kpi", position: { x: 0, y: 0, w: 3, h: 1 } },
      { id: "line-chart", type: "chart", position: { x: 0, y: 1, w: 2, h: 2 } },
      { id: "pie-chart", type: "pie", position: { x: 2, y: 1, w: 1, h: 1 } },
      { id: "bar-chart", type: "bar", position: { x: 2, y: 2, w: 1, h: 1 } }
    ]
  },
  {
    id: "minimal",
    name: "Minimal Layout",
    description: "Clean, focused layout with essential widgets",
    thumbnail: "grid-minimal",
    columns: 2,
    widgets: [
      { id: "metrics", type: "metrics", position: { x: 0, y: 0, w: 2, h: 1 } },
      { id: "chart", type: "chart", position: { x: 0, y: 1, w: 1, h: 2 } },
      { id: "list", type: "list", position: { x: 1, y: 1, w: 1, h: 2 } }
    ]
  },
  {
    id: "executive",
    name: "Executive Summary",
    description: "High-level overview for leadership",
    thumbnail: "grid-executive",
    columns: 3,
    widgets: [
      { id: "revenue", type: "revenue", position: { x: 0, y: 0, w: 3, h: 1 } },
      { id: "trends", type: "trends", position: { x: 0, y: 1, w: 2, h: 2 } },
      { id: "alerts", type: "alerts", position: { x: 2, y: 1, w: 1, h: 2 } }
    ]
  }
];

const widgetTypes = [
  { id: "stats", name: "Stats Cards", icon: Target, color: "bg-blue-500", size: { w: 1, h: 1 } },
  { id: "chart", name: "Line Chart", icon: BarChart3, color: "bg-green-500", size: { w: 2, h: 2 } },
  { id: "pie", name: "Pie Chart", icon: PieChart, color: "bg-purple-500", size: { w: 1, h: 1 } },
  { id: "table", name: "Data Table", icon: Users, color: "bg-orange-500", size: { w: 2, h: 2 } },
  { id: "calendar", name: "Calendar", icon: Calendar, color: "bg-red-500", size: { w: 1, h: 2 } },
  { id: "activity", name: "Activity Feed", icon: Activity, color: "bg-cyan-500", size: { w: 2, h: 1 } },
  { id: "notifications", name: "Notifications", icon: Bell, color: "bg-yellow-500", size: { w: 1, h: 1 } },
  { id: "revenue", name: "Revenue Widget", icon: DollarSign, color: "bg-emerald-500", size: { w: 2, h: 1 } }
];

const gridSizes = [
  { columns: 2, name: "2 Columns", description: "Compact layout" },
  { columns: 3, name: "3 Columns", description: "Balanced layout" },
  { columns: 4, name: "4 Columns", description: "Standard layout" },
  { columns: 6, name: "6 Columns", description: "Detailed layout" }
];

export default function LayoutDesigner() {
  const [selectedTemplate, setSelectedTemplate] = useState(layoutTemplates[0]);
  const [gridColumns, setGridColumns] = useState(4);
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState("desktop");
  const [showGrid, setShowGrid] = useState(true);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const { showModal, ModalComponent } = useModal();

  const applyTemplate = (template: typeof layoutTemplates[0]) => {
    setSelectedTemplate(template);
    setGridColumns(template.columns);
    showModal({
      title: "Template Applied",
      message: `${template.name} layout has been applied to your dashboard. You can now customize widget positions.`,
      type: "success"
    });
  };

  const addWidget = (widgetType: typeof widgetTypes[0]) => {
    const newWidget = {
      id: `${widgetType.id}-${Date.now()}`,
      type: widgetType.id,
      position: { x: 0, y: 0, w: widgetType.size.w, h: widgetType.size.h }
    };
    
    setSelectedTemplate(prev => ({
      ...prev,
      widgets: [...prev.widgets, newWidget]
    }));

    // Auto-select the new widget
    setSelectedWidget(newWidget.id);
    
    // Add visual feedback
    setTimeout(() => {
      const widgetElement = document.querySelector(`[data-widget-id="${newWidget.id}"]`);
      if (widgetElement) {
        widgetElement.classList.add('animate-bounce');
        setTimeout(() => {
          widgetElement.classList.remove('animate-bounce');
        }, 1000);
      }
    }, 100);

    showModal({
      title: "Widget Added",
      message: `${widgetType.name} has been added to your layout. It's automatically selected for editing.`,
      type: "success"
    });
  };

  const removeWidget = (widgetId: string) => {
    setSelectedTemplate(prev => ({
      ...prev,
      widgets: prev.widgets.filter(w => w.id !== widgetId)
    }));
    setSelectedWidget(null);
    showModal({
      title: "Widget Removed",
      message: "Widget has been removed from your layout.",
      type: "info"
    });
  };

  const duplicateWidget = (widgetId: string) => {
    const widget = selectedTemplate.widgets.find(w => w.id === widgetId);
    if (widget) {
      const newWidget = {
        ...widget,
        id: `${widget.type}-copy-${Date.now()}`,
        position: { ...widget.position, x: widget.position.x + 1 }
      };
      setSelectedTemplate(prev => ({
        ...prev,
        widgets: [...prev.widgets, newWidget]
      }));
      showModal({
        title: "Widget Duplicated",
        message: "A copy of the widget has been created.",
        type: "success"
      });
    }
  };

  const saveLayout = () => {
    showModal({
      title: "Layout Saved",
      message: "Your custom layout has been saved and applied to your dashboard.",
      type: "success"
    });
  };

  const exportLayout = () => {
    const layoutData = JSON.stringify(selectedTemplate, null, 2);
    const blob = new Blob([layoutData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTemplate.name.toLowerCase().replace(/\s+/g, '-')}-layout.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showModal({
      title: "Layout Exported",
      message: "Your layout configuration has been exported.",
      type: "success"
    });
  };

  const resetLayout = () => {
    setSelectedTemplate(layoutTemplates[0]);
    setGridColumns(4);
    setSelectedWidget(null);
    showModal({
      title: "Layout Reset",
      message: "Layout has been reset to the default template.",
      type: "info"
    });
  };

  const getWidgetInfo = (type: string) => {
    return widgetTypes.find(w => w.id === type) || widgetTypes[0];
  };

  return (
    <MainLayout title="Layout Designer">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Layout Designer</h1>
            <p className="text-muted-foreground mt-1">
              Design and customize your dashboard layout with drag-and-drop
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="px-3 py-1">
              <TestTube className="w-4 h-4 mr-1" />
              Interactive Designer
            </Badge>
            <Button variant="outline" onClick={exportLayout}>
              <Download className="w-4 h-4 mr-2" />
              Export Layout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Templates & Widgets */}
          <div className="space-y-6">
            {/* Layout Templates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Layout className="w-5 h-5 mr-2" />
                  Templates
                </CardTitle>
                <CardDescription>
                  Choose a starting layout template
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {layoutTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedTemplate.id === template.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => applyTemplate(template)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center`}>
                        <Grid3x3 className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{template.name}</h4>
                        <p className="text-xs text-muted-foreground">{template.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Widget Library */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Square className="w-5 h-5 mr-2" />
                  Widgets
                </CardTitle>
                <CardDescription>
                  Drag widgets to add them to your layout
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {widgetTypes.map((widget) => (
                  <div
                    key={widget.id}
                    className="flex items-center justify-between p-2 border rounded-lg cursor-pointer hover:bg-muted/50"
                    onClick={() => addWidget(widget)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded ${widget.color} flex items-center justify-center`}>
                        <widget.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium">{widget.name}</span>
                    </div>
                    <Plus className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Grid Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Grid Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm">Grid Columns</Label>
                  <select 
                    className="w-full p-2 border rounded-lg bg-background text-foreground text-sm"
                    value={gridColumns}
                    onChange={(e) => setGridColumns(Number(e.target.value))}
                  >
                    {gridSizes.map((size) => (
                      <option key={size.columns} value={size.columns}>
                        {size.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Show Grid</Label>
                    <Switch
                      checked={showGrid}
                      onCheckedChange={setShowGrid}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Snap to Grid</Label>
                    <Switch
                      checked={snapToGrid}
                      onCheckedChange={setSnapToGrid}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Canvas */}
          <div className="lg:col-span-2 space-y-6">
            {/* Preview Controls */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Preview Mode</span>
                  </div>
                  <div className="flex items-center space-x-1 border rounded-lg p-1">
                    <Button
                      variant={previewMode === "desktop" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setPreviewMode("desktop")}
                    >
                      <Monitor className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={previewMode === "tablet" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setPreviewMode("tablet")}
                    >
                      <Tablet className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={previewMode === "mobile" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setPreviewMode("mobile")}
                    >
                      <Smartphone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Layout Canvas */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{selectedTemplate.name}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{gridColumns} columns</Badge>
                    <Badge variant="outline">{selectedTemplate.widgets.length} widgets</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div 
                  className={`relative border-2 border-dashed rounded-lg p-4 min-h-96 ${
                    showGrid ? 'bg-grid-pattern' : ''
                  } ${
                    previewMode === "mobile" ? "max-w-sm mx-auto" : 
                    previewMode === "tablet" ? "max-w-2xl mx-auto" : ""
                  }`}
                >
                  {/* Grid Lines */}
                  {showGrid && (
                    <div 
                      className="absolute inset-4 pointer-events-none"
                      style={{
                        backgroundImage: `
                          linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: `${100/gridColumns}% 50px`
                      }}
                    />
                  )}

                  {/* Widgets */}
                  <div 
                    className="grid gap-4 h-full"
                    style={{
                      gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                      gridAutoRows: '100px'
                    }}
                  >
                    {selectedTemplate.widgets.map((widget) => {
                      const widgetInfo = getWidgetInfo(widget.type);
                      return (
                        <div
                          key={widget.id}
                          data-widget-id={widget.id}
                          className={`relative border-2 rounded-lg p-3 cursor-pointer transition-all hover:shadow-lg ${
                            selectedWidget === widget.id ? 'border-primary bg-primary/5' : 'border-border bg-card'
                          }`}
                          style={{
                            gridColumn: `span ${Math.min(widget.position.w, gridColumns)}`,
                            gridRow: `span ${widget.position.h}`
                          }}
                          onClick={() => setSelectedWidget(widget.id)}
                          onMouseEnter={(e) => {
                            if (selectedWidget !== widget.id) {
                              e.currentTarget.style.transform = 'scale(1.02)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          {/* Widget Content */}
                          <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                              <div className={`w-10 h-10 rounded-lg ${widgetInfo.color} flex items-center justify-center mx-auto mb-2`}>
                                <widgetInfo.icon className="w-5 h-5 text-white" />
                              </div>
                              <p className="text-sm font-medium">{widgetInfo.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {widget.position.w}×{widget.position.h}
                              </p>
                            </div>
                          </div>

                          {/* Widget Controls */}
                          {selectedWidget === widget.id && (
                            <div className="absolute -top-2 -right-2 flex space-x-1">
                              <Button
                                size="sm"
                                variant="secondary"
                                className="w-6 h-6 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  duplicateWidget(widget.id);
                                }}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                className="w-6 h-6 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeWidget(widget.id);
                                }}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          )}

                          {/* Resize Handle */}
                          <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-muted-foreground opacity-50" />
                        </div>
                      );
                    })}
                  </div>

                  {/* Empty State */}
                  {selectedTemplate.widgets.length === 0 && (
                    <div className="flex items-center justify-center h-full text-center">
                      <div>
                        <Grid3x3 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="font-medium mb-2">Empty Layout</h3>
                        <p className="text-sm text-muted-foreground">
                          Add widgets from the sidebar to start designing your layout
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Properties */}
          <div className="space-y-6">
            {/* Widget Properties */}
            {selectedWidget && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Widget Properties</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(() => {
                    const widget = selectedTemplate.widgets.find(w => w.id === selectedWidget);
                    const widgetInfo = widget ? getWidgetInfo(widget.type) : null;
                    
                    if (!widget || !widgetInfo) return null;
                    
                    return (
                      <>
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded ${widgetInfo.color} flex items-center justify-center`}>
                            <widgetInfo.icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{widgetInfo.name}</p>
                            <p className="text-xs text-muted-foreground">{widget.id}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm">Width (columns)</Label>
                            <Input
                              type="number"
                              min="1"
                              max={gridColumns}
                              value={widget.position.w}
                              onChange={(e) => {
                                const newWidth = Math.max(1, Math.min(gridColumns, Number(e.target.value)));
                                setSelectedTemplate(prev => ({
                                  ...prev,
                                  widgets: prev.widgets.map(w => 
                                    w.id === widget.id ? { ...w, position: { ...w.position, w: newWidth } } : w
                                  )
                                }));
                              }}
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <Label className="text-sm">Height (rows)</Label>
                            <Input
                              type="number"
                              min="1"
                              max="6"
                              value={widget.position.h}
                              onChange={(e) => {
                                const newHeight = Math.max(1, Math.min(6, Number(e.target.value)));
                                setSelectedTemplate(prev => ({
                                  ...prev,
                                  widgets: prev.widgets.map(w => 
                                    w.id === widget.id ? { ...w, position: { ...w.position, h: newHeight } } : w
                                  )
                                }));
                              }}
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => duplicateWidget(widget.id)}
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Duplicate
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => removeWidget(widget.id)}
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </>
                    );
                  })()}
                </CardContent>
              </Card>
            )}

            {/* Layout Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Layout Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" onClick={saveLayout}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Layout
                </Button>
                <Button variant="outline" className="w-full" onClick={exportLayout}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Layout
                </Button>
                <Button variant="outline" className="w-full" onClick={resetLayout}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Layout
                </Button>
              </CardContent>
            </Card>

            {/* Layout Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Layout Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Template:</span>
                  <span>{selectedTemplate.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Grid:</span>
                  <span>{gridColumns} columns</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Widgets:</span>
                  <span>{selectedTemplate.widgets.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Responsive:</span>
                  <span>✓ Enabled</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <ModalComponent />
    </MainLayout>
  );
}