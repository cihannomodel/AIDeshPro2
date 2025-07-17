import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useModal } from "@/components/ui/modal";
import { Smartphone, Tablet, Monitor, RotateCcw, Eye, Settings } from "lucide-react";

const devicePresets = [
  { id: "mobile", name: "Mobile", icon: Smartphone, width: 375, height: 667, label: "iPhone SE" },
  { id: "tablet", name: "Tablet", icon: Tablet, width: 768, height: 1024, label: "iPad" },
  { id: "desktop", name: "Desktop", icon: Monitor, width: 1440, height: 900, label: "Desktop HD" }
];

const mockResponsiveFeatures = [
  {
    title: "Adaptive Navigation",
    description: "Sidebar collapses to hamburger menu on mobile",
    status: "active",
    preview: "Navigation automatically adjusts based on screen size"
  },
  {
    title: "Flexible Grid System",
    description: "Cards and widgets reflow for optimal mobile viewing",
    status: "active", 
    preview: "Dashboard cards stack vertically on smaller screens"
  },
  {
    title: "Touch-Friendly Interface",
    description: "Larger buttons and touch targets for mobile users",
    status: "active",
    preview: "All interactive elements are minimum 44px for easy tapping"
  },
  {
    title: "Responsive Typography",
    description: "Font sizes scale appropriately across devices",
    status: "active",
    preview: "Text remains readable at all screen sizes"
  }
];

export default function ResponsivePreview() {
  const [selectedDevice, setSelectedDevice] = useState(devicePresets[0]);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
  const [zoom, setZoom] = useState(100);
  const { showModal, ModalComponent } = useModal();

  const toggleOrientation = () => {
    setOrientation(prev => prev === "portrait" ? "landscape" : "portrait");
    showModal({
      title: "Orientation Changed",
      message: `Device rotated to ${orientation === "portrait" ? "landscape" : "portrait"} mode. The dashboard adapts automatically.`,
      type: "success"
    });
  };

  const testResponsiveFeature = (feature: typeof mockResponsiveFeatures[0]) => {
    showModal({
      title: `Testing: ${feature.title}`,
      message: `${feature.preview}. This feature ensures optimal user experience across all devices.`,
      type: "info"
    });
  };

  const currentWidth = orientation === "portrait" ? selectedDevice.width : selectedDevice.height;
  const currentHeight = orientation === "portrait" ? selectedDevice.height : selectedDevice.width;

  return (
    <MainLayout title="Responsive Preview">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Responsive Preview</h1>
            <p className="text-muted-foreground mt-1">
              Test dashboard responsiveness across different devices and screen sizes
            </p>
          </div>
          <Button onClick={() => setZoom(100)}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset View
          </Button>
        </div>

        <Tabs defaultValue="preview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preview">Device Preview</TabsTrigger>
            <TabsTrigger value="features">Responsive Features</TabsTrigger>
            <TabsTrigger value="testing">Testing Tools</TabsTrigger>
          </TabsList>

          {/* Device Preview Tab */}
          <TabsContent value="preview" className="space-y-6">
            {/* Device Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Device Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Device Selection */}
                <div className="grid grid-cols-3 gap-3">
                  {devicePresets.map((device) => {
                    const Icon = device.icon;
                    return (
                      <Button
                        key={device.id}
                        variant={selectedDevice.id === device.id ? "default" : "outline"}
                        className="flex flex-col gap-2 h-auto p-4"
                        onClick={() => setSelectedDevice(device)}
                      >
                        <Icon className="w-6 h-6" />
                        <div className="text-center">
                          <div className="font-medium">{device.name}</div>
                          <div className="text-xs text-muted-foreground">{device.label}</div>
                        </div>
                      </Button>
                    );
                  })}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={toggleOrientation}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      {orientation === "portrait" ? "Landscape" : "Portrait"}
                    </Button>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Zoom:</span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setZoom(Math.max(50, zoom - 25))}
                      >
                        -
                      </Button>
                      <span className="text-sm w-12 text-center">{zoom}%</span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setZoom(Math.min(150, zoom + 25))}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <Badge variant="secondary">
                    {currentWidth} × {currentHeight}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Device Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Live Preview - {selectedDevice.name}
                </CardTitle>
                <CardDescription>
                  Interactive preview showing how your dashboard appears on {selectedDevice.label}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center p-8 bg-muted/30 rounded-lg">
                  <div 
                    className="bg-white border-8 border-gray-800 rounded-xl shadow-2xl overflow-hidden"
                    style={{
                      width: `${(currentWidth * zoom) / 100}px`,
                      height: `${(currentHeight * zoom) / 100}px`,
                      minWidth: "200px",
                      minHeight: "300px"
                    }}
                  >
                    <iframe
                      src={window.location.origin}
                      className="w-full h-full"
                      style={{ 
                        transform: `scale(${zoom / 100})`,
                        transformOrigin: "top left",
                        width: `${100 / (zoom / 100)}%`,
                        height: `${100 / (zoom / 100)}%`
                      }}
                    />
                  </div>
                </div>
                
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  This preview shows your actual dashboard in a {selectedDevice.label} viewport
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Responsive Features Tab */}
          <TabsContent value="features" className="space-y-6">
            <div className="grid gap-4">
              {mockResponsiveFeatures.map((feature, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{feature.title}</h3>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {feature.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{feature.description}</p>
                        <p className="text-sm text-blue-600">{feature.preview}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => testResponsiveFeature(feature)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Test
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Testing Tools Tab */}
          <TabsContent value="testing" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Breakpoint Testing</CardTitle>
                  <CardDescription>Test responsive breakpoints automatically</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Mobile", width: "320px - 768px" },
                    { name: "Tablet", width: "768px - 1024px" },
                    { name: "Desktop", width: "1024px+" }
                  ].map((breakpoint) => (
                    <div key={breakpoint.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{breakpoint.name}</div>
                        <div className="text-sm text-muted-foreground">{breakpoint.width}</div>
                      </div>
                      <Button variant="outline" size="sm">Test</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Mobile performance insights</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { metric: "Load Time", value: "1.2s", status: "good" },
                    { metric: "Mobile Score", value: "94/100", status: "excellent" },
                    { metric: "Touch Targets", value: "✓ Optimized", status: "good" }
                  ].map((item) => (
                    <div key={item.metric} className="flex items-center justify-between">
                      <span className="text-sm">{item.metric}</span>
                      <Badge variant={item.status === "excellent" ? "default" : "secondary"}>
                        {item.value}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <ModalComponent />
      </div>
    </MainLayout>
  );
}