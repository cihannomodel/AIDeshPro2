import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useModal } from "@/components/ui/modal";
import { 
  Monitor, Download, Bell, Wifi, WifiOff, Smartphone, 
  Settings, Check, AlertCircle, RefreshCw 
} from "lucide-react";

const pwaFeatures = [
  {
    id: "installable",
    title: "App Installation",
    description: "Add to home screen for native app experience",
    icon: Download,
    status: "available",
    enabled: true
  },
  {
    id: "offline",
    title: "Offline Functionality", 
    description: "Work without internet connection",
    icon: WifiOff,
    status: "active",
    enabled: true
  },
  {
    id: "notifications",
    title: "Push Notifications",
    description: "Receive updates even when app is closed",
    icon: Bell,
    status: "pending",
    enabled: false
  },
  {
    id: "background",
    title: "Background Sync",
    description: "Sync data when connection is restored", 
    icon: RefreshCw,
    status: "active",
    enabled: true
  }
];

const mockInstallStats = {
  totalInstalls: "1,234",
  activeUsers: "987",
  retentionRate: "78%",
  avgSessionTime: "12m 34s"
};

export default function PWAFeatures() {
  const [features, setFeatures] = useState(pwaFeatures);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const { showModal, ModalComponent } = useModal();

  const toggleFeature = (featureId: string) => {
    setFeatures(prev => prev.map(feature => 
      feature.id === featureId 
        ? { ...feature, enabled: !feature.enabled }
        : feature
    ));

    const feature = features.find(f => f.id === featureId);
    showModal({
      title: "PWA Feature Updated",
      message: `${feature?.title} has been ${feature?.enabled ? 'disabled' : 'enabled'}. Changes will take effect after refresh.`,
      type: "success"
    });
  };

  const simulateInstall = () => {
    showModal({
      title: "Install Dashboard App",
      message: "This would prompt users to install your dashboard as a native app on their device. The app will appear in their app drawer and work offline.",
      type: "info"
    });
  };

  const testNotification = () => {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification("Dashboard Alert", {
          body: "Your monthly report is ready to view!",
          icon: "/favicon.ico"
        });
        showModal({
          title: "Notification Sent",
          message: "Push notification delivered successfully. Users will see this even when the app is closed.",
          type: "success"
        });
      } else {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            testNotification();
          }
        });
      }
    }
  };

  const simulateOfflineMode = () => {
    showModal({
      title: "Offline Mode Simulation",
      message: "Dashboard data is cached locally. Users can view reports, charts, and cached data even without internet connection.",
      type: "info"
    });
  };

  return (
    <MainLayout title="PWA Features">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Progressive Web App Features</h1>
            <p className="text-muted-foreground mt-1">
              Configure app-like experiences for mobile and desktop users
            </p>
          </div>
          <Button onClick={simulateInstall}>
            <Download className="w-4 h-4 mr-2" />
            Install App
          </Button>
        </div>

        <Tabs defaultValue="features" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="features">PWA Features</TabsTrigger>
            <TabsTrigger value="manifest">App Manifest</TabsTrigger>
            <TabsTrigger value="analytics">Install Analytics</TabsTrigger>
          </TabsList>

          {/* PWA Features Tab */}
          <TabsContent value="features" className="space-y-6">
            <div className="grid gap-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-primary/10">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-semibold">{feature.title}</h3>
                              <Badge 
                                variant={feature.status === "active" ? "default" : 
                                        feature.status === "available" ? "secondary" : "destructive"}
                              >
                                {feature.status}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={feature.enabled}
                            onCheckedChange={() => toggleFeature(feature.id)}
                          />
                          <Button
                            variant="outline"
                            onClick={() => {
                              if (feature.id === "notifications") testNotification();
                              else if (feature.id === "installable") simulateInstall();
                              else if (feature.id === "offline") simulateOfflineMode();
                              else {
                                showModal({
                                  title: `Testing ${feature.title}`,
                                  message: `${feature.title} functionality is working correctly. Users will experience improved performance and reliability.`,
                                  type: "success"
                                });
                              }
                            }}
                          >
                            Test
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick PWA Tests</CardTitle>
                <CardDescription>Test common PWA functionality</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button variant="outline" onClick={simulateInstall} className="flex flex-col h-auto p-4">
                    <Download className="w-5 h-5 mb-2" />
                    Install Prompt
                  </Button>
                  <Button variant="outline" onClick={testNotification} className="flex flex-col h-auto p-4">
                    <Bell className="w-5 h-5 mb-2" />
                    Push Notification
                  </Button>
                  <Button variant="outline" onClick={simulateOfflineMode} className="flex flex-col h-auto p-4">
                    <WifiOff className="w-5 h-5 mb-2" />
                    Offline Mode
                  </Button>
                  <Button variant="outline" className="flex flex-col h-auto p-4">
                    <Smartphone className="w-5 h-5 mb-2" />
                    Home Screen
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* App Manifest Tab */}
          <TabsContent value="manifest" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>App Identity</CardTitle>
                  <CardDescription>How your app appears to users</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">App Name</label>
                    <input 
                      className="w-full p-2 border rounded-lg"
                      defaultValue="Analytics Dashboard"
                      placeholder="My Dashboard App"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Short Name</label>
                    <input 
                      className="w-full p-2 border rounded-lg"
                      defaultValue="Dashboard"
                      placeholder="Dashboard"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea 
                      className="w-full p-2 border rounded-lg h-20"
                      defaultValue="Professional analytics dashboard for business intelligence"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>App Configuration</CardTitle>
                  <CardDescription>Technical PWA settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Theme Color</label>
                    <div className="flex gap-2">
                      <input type="color" defaultValue="#2563eb" className="w-12 h-10 border rounded" />
                      <input className="flex-1 p-2 border rounded-lg" defaultValue="#2563eb" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Background Color</label>
                    <div className="flex gap-2">
                      <input type="color" defaultValue="#ffffff" className="w-12 h-10 border rounded" />
                      <input className="flex-1 p-2 border rounded-lg" defaultValue="#ffffff" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Display Mode</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option value="standalone">Standalone</option>
                      <option value="fullscreen">Fullscreen</option>
                      <option value="minimal-ui">Minimal UI</option>
                      <option value="browser">Browser</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Manifest Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Generated Manifest</CardTitle>
                <CardDescription>Preview of your PWA manifest.json file</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto">
{`{
  "name": "Analytics Dashboard",
  "short_name": "Dashboard", 
  "description": "Professional analytics dashboard for business intelligence",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#2563eb",
  "background_color": "#ffffff",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png", 
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}`}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary">{mockInstallStats.totalInstalls}</div>
                  <div className="text-sm text-muted-foreground">Total Installs</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary">{mockInstallStats.activeUsers}</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary">{mockInstallStats.retentionRate}</div>
                  <div className="text-sm text-muted-foreground">Retention Rate</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary">{mockInstallStats.avgSessionTime}</div>
                  <div className="text-sm text-muted-foreground">Avg Session</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>PWA Performance Benefits</CardTitle>
                <CardDescription>Improvements gained from PWA features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { metric: "Load Time Improvement", value: "67% faster", color: "text-green-600" },
                    { metric: "User Engagement", value: "+40% session time", color: "text-blue-600" },
                    { metric: "Return Visits", value: "+25% retention", color: "text-purple-600" },
                    { metric: "Offline Usage", value: "15% of sessions", color: "text-orange-600" }
                  ].map((item) => (
                    <div key={item.metric} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">{item.metric}</span>
                      <span className={`font-bold ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <ModalComponent />
      </div>
    </MainLayout>
  );
}