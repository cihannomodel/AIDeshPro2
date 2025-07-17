import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Key, 
  Settings, 
  BarChart3, 
  Users, 
  Eye, 
  MousePointer,
  Activity,
  Globe,
  Calendar,
  Filter,
  Download,
  TestTube
} from "lucide-react";
import { useModal } from "@/components/ui/modal";

const mockAnalyticsData = {
  totalUsers: "45,623",
  pageViews: "127,456",
  bounceRate: "24.3%",
  avgSessionDuration: "3m 42s",
  topPages: [
    { page: "/dashboard", views: 15420, rate: 85 },
    { page: "/analytics", views: 8943, rate: 65 },
    { page: "/settings", views: 5672, rate: 45 },
    { page: "/profile", views: 3891, rate: 30 },
  ],
  realtimeUsers: "234",
  conversionRate: "3.8%"
};

const mockGoals = [
  { id: 1, name: "Newsletter Signup", completions: 1234, value: "$12.50" },
  { id: 2, name: "Product Purchase", completions: 567, value: "$89.99" },
  { id: 3, name: "Contact Form", completions: 891, value: "$0.00" },
  { id: 4, name: "Demo Request", completions: 345, value: "$25.00" },
];

export default function GoogleAnalytics() {
  const [gaConfig, setGaConfig] = useState({
    trackingId: "",
    propertyId: "",
    enabled: false,
    ecommerce: false,
    demographics: true
  });
  const [dateRange, setDateRange] = useState("7d");
  const { showModal, ModalComponent } = useModal();

  const saveConfiguration = () => {
    showModal({
      title: "Google Analytics Configuration Saved",
      message: "Your Google Analytics settings have been saved successfully. Data tracking will begin immediately.",
      type: "success"
    });
  };

  const testConnection = () => {
    showModal({
      title: "Testing Google Analytics Connection",
      message: "Verifying connection to Google Analytics... This would validate your tracking configuration in production.",
      type: "info"
    });
  };

  const exportData = () => {
    showModal({
      title: "Analytics Data Export",
      message: "Your analytics data is being prepared for export. You'll receive a download link shortly.",
      type: "success"
    });
  };

  const createGoal = () => {
    showModal({
      title: "Create New Goal",
      message: "Goal creation feature allows you to track specific user actions and conversions. Configure your tracking objectives here.",
      type: "info"
    });
  };

  return (
    <MainLayout title="Google Analytics Integration">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Google Analytics Integration</h1>
            <p className="text-muted-foreground mt-1">
              Track user behavior and analyze website performance
            </p>
          </div>
          <Badge variant="secondary" className="px-3 py-1">
            <TestTube className="w-4 h-4 mr-1" />
            Demo Mode
          </Badge>
        </div>

        {/* Real-time Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{mockAnalyticsData.totalUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Eye className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Page Views</p>
                  <p className="text-2xl font-bold">{mockAnalyticsData.pageViews}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <MousePointer className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Bounce Rate</p>
                  <p className="text-2xl font-bold">{mockAnalyticsData.bounceRate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Activity className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Realtime Users</p>
                  <p className="text-2xl font-bold text-green-600">{mockAnalyticsData.realtimeUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="configuration" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="goals">Goals & Events</TabsTrigger>
            <TabsTrigger value="realtime">Real-time</TabsTrigger>
          </TabsList>

          {/* Configuration Tab */}
          <TabsContent value="configuration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="w-5 h-5 mr-2" />
                  Google Analytics Setup
                </CardTitle>
                <CardDescription>
                  Configure your Google Analytics tracking properties
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tracking-id">Tracking ID (GA4)</Label>
                    <Input
                      id="tracking-id"
                      placeholder="G-XXXXXXXXXX"
                      value={gaConfig.trackingId}
                      onChange={(e) => setGaConfig(prev => ({ ...prev, trackingId: e.target.value }))}
                    />
                    <p className="text-xs text-muted-foreground">
                      Your Google Analytics 4 Measurement ID
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="property-id">Property ID</Label>
                    <Input
                      id="property-id"
                      placeholder="123456789"
                      value={gaConfig.propertyId}
                      onChange={(e) => setGaConfig(prev => ({ ...prev, propertyId: e.target.value }))}
                    />
                    <p className="text-xs text-muted-foreground">
                      Your GA4 Property ID from Google Analytics Admin
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Enable Tracking</Label>
                        <p className="text-sm text-muted-foreground">
                          Activate Google Analytics data collection
                        </p>
                      </div>
                      <Switch
                        checked={gaConfig.enabled}
                        onCheckedChange={(checked) => setGaConfig(prev => ({ ...prev, enabled: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Enhanced Ecommerce</Label>
                        <p className="text-sm text-muted-foreground">
                          Track purchases and product interactions
                        </p>
                      </div>
                      <Switch
                        checked={gaConfig.ecommerce}
                        onCheckedChange={(checked) => setGaConfig(prev => ({ ...prev, ecommerce: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Demographics & Interests</Label>
                        <p className="text-sm text-muted-foreground">
                          Collect demographic and interest data
                        </p>
                      </div>
                      <Switch
                        checked={gaConfig.demographics}
                        onCheckedChange={(checked) => setGaConfig(prev => ({ ...prev, demographics: checked }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1" onClick={saveConfiguration}>
                    <Settings className="w-4 h-4 mr-2" />
                    Save Configuration
                  </Button>
                  <Button variant="outline" onClick={testConnection}>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Test Connection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Reports</CardTitle>
                <CardDescription>
                  View comprehensive website analytics and performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <Label>Date Range</Label>
                  </div>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">Last 7 Days</SelectItem>
                      <SelectItem value="30d">Last 30 Days</SelectItem>
                      <SelectItem value="90d">Last 90 Days</SelectItem>
                      <SelectItem value="1y">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Top Pages</h4>
                  {mockAnalyticsData.topPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{page.page}</h3>
                        <p className="text-sm text-muted-foreground">{page.views.toLocaleString()} views</p>
                      </div>
                      <div className="text-right">
                        <Progress value={page.rate} className="w-20 mb-1" />
                        <p className="text-xs text-muted-foreground">{page.rate}%</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button onClick={exportData} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Export Analytics Data
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Goals & Conversions</CardTitle>
                <CardDescription>
                  Track important user actions and conversion metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Conversion Goals</h4>
                    <p className="text-sm text-muted-foreground">Track specific user actions</p>
                  </div>
                  <Button onClick={createGoal}>
                    Create Goal
                  </Button>
                </div>

                <div className="space-y-4">
                  {mockGoals.map((goal) => (
                    <div key={goal.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{goal.name}</h3>
                        <p className="text-sm text-muted-foreground">{goal.completions} completions</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{goal.value}</p>
                        <p className="text-xs text-muted-foreground">avg value</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900 dark:text-blue-100">Overall Conversion Rate</p>
                      <p className="text-2xl font-bold text-blue-600">{mockAnalyticsData.conversionRate}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Real-time Tab */}
          <TabsContent value="realtime" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Real-time Analytics</CardTitle>
                <CardDescription>
                  Monitor current website activity and user behavior
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-8 border-2 border-dashed rounded-lg">
                  <Activity className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-600 mb-2">
                    {mockAnalyticsData.realtimeUsers} Active Users
                  </h3>
                  <p className="text-muted-foreground">Currently browsing your website</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <Globe className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <p className="font-semibold">156</p>
                    <p className="text-sm text-muted-foreground">Page Views (last hour)</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <MousePointer className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <p className="font-semibold">89</p>
                    <p className="text-sm text-muted-foreground">Events (last hour)</p>
                  </div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    ✓ Real-time tracking is active and collecting data
                  </p>
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