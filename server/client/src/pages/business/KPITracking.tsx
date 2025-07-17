import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useModal } from "@/components/ui/modal";
import { 
  Target, TrendingUp, TrendingDown, AlertTriangle, 
  Plus, Settings, Download, Bell, BarChart3, Zap
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface KPI {
  id: string;
  name: string;
  current: number;
  target: number;
  unit: string;
  trend: "up" | "down" | "stable";
  status: "success" | "warning" | "danger";
  category: string;
  lastUpdated: string;
}

const mockKPIs: KPI[] = [
  {
    id: "revenue",
    name: "Monthly Revenue",
    current: 45231,
    target: 50000,
    unit: "$",
    trend: "up",
    status: "warning",
    category: "Financial",
    lastUpdated: "2 minutes ago"
  },
  {
    id: "customers",
    name: "New Customers",
    current: 127,
    target: 100,
    unit: "",
    trend: "up", 
    status: "success",
    category: "Sales",
    lastUpdated: "5 minutes ago"
  },
  {
    id: "retention",
    name: "Customer Retention",
    current: 94.2,
    target: 95,
    unit: "%",
    trend: "down",
    status: "warning",
    category: "Customer",
    lastUpdated: "10 minutes ago"
  },
  {
    id: "conversion",
    name: "Conversion Rate",
    current: 2.8,
    target: 3.5,
    unit: "%",
    trend: "down",
    status: "danger",
    category: "Marketing",
    lastUpdated: "1 minute ago"
  }
];

const mockTrendData = [
  { date: "Jan", revenue: 32000, customers: 85, retention: 92, conversion: 3.2 },
  { date: "Feb", revenue: 38000, customers: 95, retention: 93, conversion: 3.1 },
  { date: "Mar", revenue: 42000, customers: 110, retention: 94, conversion: 2.9 },
  { date: "Apr", revenue: 45231, customers: 127, retention: 94.2, conversion: 2.8 }
];

export default function KPITracking() {
  const [kpis, setKpis] = useState(mockKPIs);
  const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);
  const [alerts, setAlerts] = useState(true);
  const [realTimeUpdates, setRealTimeUpdates] = useState(false);
  const [newKPI, setNewKPI] = useState({ name: "", target: "", unit: "", category: "" });
  const { showModal, ModalComponent } = useModal();

  // Real-time simulation
  useEffect(() => {
    if (!realTimeUpdates) return;
    
    const interval = setInterval(() => {
      setKpis(prev => prev.map(kpi => ({
        ...kpi,
        current: kpi.current + (Math.random() - 0.5) * (kpi.current * 0.02),
        lastUpdated: "Just now"
      })));
    }, 3000);
    
    return () => clearInterval(interval);
  }, [realTimeUpdates]);

  const toggleRealTime = () => {
    setRealTimeUpdates(!realTimeUpdates);
    showModal({
      title: realTimeUpdates ? "Real-time Updates Disabled" : "Real-time Updates Enabled",
      message: realTimeUpdates 
        ? "KPI data will no longer update automatically."
        : "KPI data will now update every 3 seconds to simulate real-time dashboard.",
      type: "success"
    });
  };

  const createKPI = () => {
    if (!newKPI.name || !newKPI.target) {
      showModal({
        title: "Missing Information",
        message: "Please fill in all required fields to create a new KPI.",
        type: "warning"
      });
      return;
    }

    const kpi: KPI = {
      id: newKPI.name.toLowerCase().replace(/\s+/g, '-'),
      name: newKPI.name,
      current: Math.random() * Number(newKPI.target),
      target: Number(newKPI.target),
      unit: newKPI.unit,
      trend: Math.random() > 0.5 ? "up" : "down",
      status: "success",
      category: newKPI.category,
      lastUpdated: "Just created"
    };

    setKpis(prev => [...prev, kpi]);
    setNewKPI({ name: "", target: "", unit: "", category: "" });
    
    showModal({
      title: "KPI Created",
      message: `${newKPI.name} has been added to your KPI dashboard. You can now track this metric in real-time.`,
      type: "success"
    });
  };

  const setAlert = (kpi: KPI) => {
    showModal({
      title: "Alert Configured",
      message: `Alert set for ${kpi.name}. You'll be notified when the value goes below ${kpi.target * 0.9}${kpi.unit}.`,
      type: "success"
    });
  };

  const exportKPI = () => {
    const data = kpis.map(kpi => ({
      Name: kpi.name,
      Current: `${kpi.current}${kpi.unit}`,
      Target: `${kpi.target}${kpi.unit}`,
      Progress: `${Math.round((kpi.current / kpi.target) * 100)}%`,
      Status: kpi.status,
      Category: kpi.category
    }));
    
    showModal({
      title: "Export Ready",
      message: "KPI data has been prepared for export. In a real application, this would download as CSV/Excel file.",
      type: "info"
    });
  };

  const getStatusColor = (status: KPI['status']) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'danger': return 'text-red-600 bg-red-100';
    }
  };

  const getTrendIcon = (trend: KPI['trend']) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <TrendingUp className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <MainLayout title="KPI Tracking">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">KPI Tracking Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Monitor key performance indicators in real-time
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={toggleRealTime}>
              <Zap className={`w-4 h-4 mr-2 ${realTimeUpdates ? 'text-green-500' : ''}`} />
              {realTimeUpdates ? "Stop" : "Start"} Real-time
            </Button>
            <Button onClick={exportKPI}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* KPI Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => {
            const progress = Math.min((kpi.current / kpi.target) * 100, 100);
            return (
              <Card 
                key={kpi.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedKPI(kpi)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Target className="w-8 h-8 text-primary" />
                    <div className="flex items-center gap-2">
                      {getTrendIcon(kpi.trend)}
                      <Badge variant="secondary" className={getStatusColor(kpi.status)}>
                        {kpi.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-sm text-muted-foreground">{kpi.name}</h3>
                      <div className="text-2xl font-bold">
                        {kpi.unit === '$' ? '$' : ''}{Math.round(kpi.current).toLocaleString()}{kpi.unit !== '$' ? kpi.unit : ''}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Target: {kpi.unit === '$' ? '$' : ''}{kpi.target.toLocaleString()}{kpi.unit !== '$' ? kpi.unit : ''}
                      </div>
                    </div>
                    
                    <Progress value={progress} className="w-full" />
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{Math.round(progress)}% of target</span>
                      <span className="text-muted-foreground">{kpi.lastUpdated}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="builder">KPI Builder</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {selectedKPI && (
              <Card>
                <CardHeader>
                  <CardTitle>KPI Details: {selectedKPI.name}</CardTitle>
                  <CardDescription>Detailed analysis and controls</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {selectedKPI.unit === '$' ? '$' : ''}{Math.round(selectedKPI.current).toLocaleString()}{selectedKPI.unit !== '$' ? selectedKPI.unit : ''}
                      </div>
                      <div className="text-sm text-muted-foreground">Current Value</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold">
                        {selectedKPI.unit === '$' ? '$' : ''}{selectedKPI.target.toLocaleString()}{selectedKPI.unit !== '$' ? selectedKPI.unit : ''}
                      </div>
                      <div className="text-sm text-muted-foreground">Target Value</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {Math.round(((selectedKPI.current / selectedKPI.target) * 100))}%
                      </div>
                      <div className="text-sm text-muted-foreground">Achievement</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button onClick={() => setAlert(selectedKPI)}>
                      <Bell className="w-4 h-4 mr-2" />
                      Set Alert
                    </Button>
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Performance by Category */}
            <Card>
              <CardHeader>
                <CardTitle>Performance by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={kpis}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="current" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>KPI Trends Over Time</CardTitle>
                <CardDescription>Historical performance data</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={mockTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="customers" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="retention" stroke="#f59e0b" strokeWidth={2} />
                    <Line type="monotone" dataKey="conversion" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Forecast */}
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Forecasting</CardTitle>
                <CardDescription>Predicted performance for next quarter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {kpis.slice(0, 2).map(kpi => {
                    const forecast = kpi.current * (1 + (Math.random() * 0.2 - 0.1));
                    return (
                      <div key={kpi.id} className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">{kpi.name}</h4>
                        <div className="text-lg font-semibold text-blue-600">
                          Predicted: {kpi.unit === '$' ? '$' : ''}{Math.round(forecast).toLocaleString()}{kpi.unit !== '$' ? kpi.unit : ''}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {forecast > kpi.current ? '+' : ''}{Math.round(((forecast - kpi.current) / kpi.current) * 100)}% vs current
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Alert Configuration</CardTitle>
                <CardDescription>Set up notifications for KPI thresholds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {kpis.map(kpi => (
                  <div key={kpi.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{kpi.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Alert when below {Math.round(kpi.target * 0.9)}{kpi.unit}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {kpi.status === 'danger' && (
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                      )}
                      <Button variant="outline" size="sm" onClick={() => setAlert(kpi)}>
                        <Bell className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* KPI Builder Tab */}
          <TabsContent value="builder" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Custom KPI</CardTitle>
                <CardDescription>Build your own key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>KPI Name</Label>
                    <Input 
                      placeholder="e.g., Customer Satisfaction"
                      value={newKPI.name}
                      onChange={(e) => setNewKPI(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Target Value</Label>
                    <Input 
                      type="number"
                      placeholder="e.g., 95"
                      value={newKPI.target}
                      onChange={(e) => setNewKPI(prev => ({ ...prev, target: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Unit</Label>
                    <Input 
                      placeholder="e.g., %, $, points"
                      value={newKPI.unit}
                      onChange={(e) => setNewKPI(prev => ({ ...prev, unit: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <select 
                      className="w-full p-2 border rounded-lg"
                      value={newKPI.category}
                      onChange={(e) => setNewKPI(prev => ({ ...prev, category: e.target.value }))}
                    >
                      <option value="">Select category</option>
                      <option value="Financial">Financial</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Customer">Customer</option>
                      <option value="Operations">Operations</option>
                    </select>
                  </div>
                </div>
                
                <Button onClick={createKPI} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Create KPI
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <ModalComponent />
      </div>
    </MainLayout>
  );
}