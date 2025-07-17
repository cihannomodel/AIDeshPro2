import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useModal } from "@/components/ui/modal";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  ComposedChart
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Package, 
  Users,
  Target,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Star,
  Award,
  Zap
} from "lucide-react";

// Sales Data
const salesData = [
  { month: "Jan", revenue: 45000, orders: 890, avgOrderValue: 50.56, customers: 750 },
  { month: "Feb", revenue: 52000, orders: 1020, avgOrderValue: 50.98, customers: 890 },
  { month: "Mar", revenue: 58000, orders: 1150, avgOrderValue: 50.43, customers: 980 },
  { month: "Apr", revenue: 62000, orders: 1280, avgOrderValue: 48.44, customers: 1020 },
  { month: "May", revenue: 68000, orders: 1450, avgOrderValue: 46.90, customers: 1150 },
  { month: "Jun", revenue: 72000, orders: 1580, avgOrderValue: 45.57, customers: 1280 },
];

const productSales = [
  { name: "Premium Plan", sales: 25000, units: 450, growth: 15.2, color: "#3b82f6" },
  { name: "Basic Plan", sales: 18000, units: 720, growth: 8.7, color: "#8b5cf6" },
  { name: "Enterprise Plan", sales: 15000, units: 120, growth: 22.3, color: "#10b981" },
  { name: "Starter Plan", sales: 12000, units: 890, growth: 12.1, color: "#f59e0b" },
  { name: "Pro Plan", sales: 8000, units: 340, growth: 18.5, color: "#ef4444" },
];

const topCustomers = [
  { name: "Acme Corp", revenue: 12500, orders: 45, lastOrder: "2 hours ago", tier: "Enterprise" },
  { name: "TechStart Inc", revenue: 8900, orders: 32, lastOrder: "1 day ago", tier: "Premium" },
  { name: "Global Solutions", revenue: 7800, orders: 28, lastOrder: "3 hours ago", tier: "Premium" },
  { name: "Innovation Lab", revenue: 6750, orders: 24, lastOrder: "5 hours ago", tier: "Pro" },
  { name: "Digital Agency", revenue: 5650, orders: 19, lastOrder: "2 days ago", tier: "Basic" },
];

const salesTeamPerformance = [
  { name: "Sarah Johnson", sales: 45000, deals: 28, conversion: 72.5, target: 50000 },
  { name: "Mike Chen", sales: 38000, deals: 24, conversion: 68.2, target: 45000 },
  { name: "Emma Davis", sales: 42000, deals: 31, conversion: 75.8, target: 40000 },
  { name: "David Wilson", sales: 35000, deals: 22, conversion: 65.4, target: 38000 },
  { name: "Lisa Rodriguez", sales: 40000, deals: 26, conversion: 70.1, target: 42000 },
];

const salesForecast = [
  { month: "Jul", predicted: 78000, actual: 72000, target: 75000 },
  { month: "Aug", predicted: 82000, actual: null, target: 80000 },
  { month: "Sep", predicted: 87000, actual: null, target: 85000 },
  { month: "Oct", predicted: 92000, actual: null, target: 90000 },
  { month: "Nov", predicted: 98000, actual: null, target: 95000 },
  { month: "Dec", predicted: 105000, actual: null, target: 100000 },
];

const conversionFunnel = [
  { stage: "Leads", count: 10000, percentage: 100, color: "#3b82f6" },
  { stage: "Qualified", count: 4500, percentage: 45, color: "#8b5cf6" },
  { stage: "Proposals", count: 1800, percentage: 18, color: "#10b981" },
  { stage: "Negotiations", count: 890, percentage: 8.9, color: "#f59e0b" },
  { stage: "Closed Won", count: 340, percentage: 3.4, color: "#ef4444" },
];

export default function Sales() {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All Sales");
  const { showModal, ModalComponent } = useModal();
  
  const dateRangeOptions = [
    "Last 7 Days",
    "Last 30 Days", 
    "Last 3 Months",
    "Last 6 Months",
    "Last Year",
    "Custom Range"
  ];
  
  const filterOptions = [
    "All Sales",
    "Premium Plan",
    "Basic Plan", 
    "Enterprise Plan",
    "New Customers",
    "Returning Customers",
    "High Value Orders",
    "Mobile Sales"
  ];
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };
  
  const handleExport = () => {
    const data = JSON.stringify(salesData, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sales-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };
  
  return (
    <MainLayout title="Sales Dashboard">
      <div className="space-y-6">
        {/* Sales Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">$317,000</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +23.4% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Orders</p>
                  <p className="text-2xl font-bold">7,370</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +18.2% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Order Value</p>
                  <p className="text-2xl font-bold">$48.65</p>
                  <p className="text-xs text-red-600 flex items-center">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    -2.3% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Customers</p>
                  <p className="text-2xl font-bold">6,070</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12.7% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                  <p className="text-2xl font-bold">3.4%</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +0.8% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Growth Rate</p>
                  <p className="text-2xl font-bold">18.9%</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +3.2% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-cyan-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sales Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="forecast">Forecast</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[180px]">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dateRangeOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleExport()}>
                    Export as JSON
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => showModal({
                    title: "CSV Export",
                    message: "CSV export özelliği burada implement edilecek. Satış verileriniz CSV formatında indirilecek.",
                    type: "info"
                  })}>
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => showModal({
                    title: "PDF Export",
                    message: "PDF export özelliği burada implement edilecek. Satış raporlarınız PDF formatında oluşturulacak.",
                    type: "info"
                  })}>
                    Export as PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => showModal({
                    title: "Excel Export", 
                    message: "Excel export özelliği burada implement edilecek. Detaylı satış analizleri Excel formatında hazırlanacak.",
                    type: "info"
                  })}>
                    Export as Excel
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="revenue" fill="#3b82f6" />
                      <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={2} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sales Funnel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {conversionFunnel.map((stage, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: stage.color }} />
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <p className="font-medium">{stage.stage}</p>
                            <p className="text-sm text-muted-foreground">
                              {stage.count.toLocaleString()} ({stage.percentage}%)
                            </p>
                          </div>
                          <Progress value={stage.percentage} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Average Order Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="avgOrderValue" stroke="#8b5cf6" fill="#8b5cf6" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topCustomers.map((customer, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-blue-500" />
                          </div>
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-sm text-muted-foreground">{customer.orders} orders • {customer.lastOrder}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${customer.revenue.toLocaleString()}</p>
                          <Badge variant="outline">{customer.tier}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Sales Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={productSales}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sales" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={productSales}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="sales"
                      >
                        {productSales.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Product Performance Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {productSales.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: product.color }} />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.units} units sold</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${product.sales.toLocaleString()}</p>
                        <p className="text-sm text-green-600">+{product.growth}% growth</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Team Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesTeamPerformance.map((member, index) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-500" />
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.deals} deals closed</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${member.sales.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{member.conversion}% conversion</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Target Progress</span>
                          <span>{Math.round((member.sales / member.target) * 100)}%</span>
                        </div>
                        <Progress value={(member.sales / member.target) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forecast" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesForecast}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="predicted" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" />
                      <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} />
                      <Line type="monotone" dataKey="target" stroke="#f59e0b" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Forecast Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-600">94.2%</p>
                      <p className="text-sm text-muted-foreground">Forecast Accuracy</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <p className="text-2xl font-bold">$1.2M</p>
                        <p className="text-sm text-muted-foreground">Predicted Q4</p>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <p className="text-2xl font-bold">+15%</p>
                        <p className="text-sm text-muted-foreground">Growth Target</p>
                      </div>
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