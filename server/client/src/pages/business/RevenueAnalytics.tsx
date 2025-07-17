import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useModal } from "@/components/ui/modal";
import { 
  TrendingUp, Calendar, Filter, Download, 
  DollarSign, Users, ShoppingCart, Target
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, AreaChart, Area, ComposedChart
} from "recharts";

const mockRevenueData = {
  overview: {
    totalRevenue: 2450000,
    monthlyGrowth: 12.5,
    yearlyGrowth: 24.8,
    averageOrderValue: 285,
    conversionRate: 3.4
  },
  monthlyRevenue: [
    { month: "Jan", revenue: 180000, orders: 632, customers: 420 },
    { month: "Feb", revenue: 195000, orders: 684, customers: 456 },
    { month: "Mar", revenue: 210000, orders: 737, customers: 491 },
    { month: "Apr", revenue: 225000, orders: 789, customers: 526 },
    { month: "May", revenue: 240000, orders: 842, customers: 561 },
    { month: "Jun", revenue: 255000, orders: 895, customers: 596 }
  ],
  revenueBySource: [
    { source: "Online Store", revenue: 1470000, percentage: 60, growth: 15.2 },
    { source: "Mobile App", revenue: 612500, percentage: 25, growth: 28.5 },
    { source: "B2B Sales", revenue: 245000, percentage: 10, growth: 8.3 },
    { source: "Partner Channel", revenue: 122500, percentage: 5, growth: 12.7 }
  ],
  productCategories: [
    { category: "Electronics", revenue: 735000, orders: 2580, margin: 22.5 },
    { category: "Fashion", revenue: 588000, orders: 2100, margin: 18.3 },
    { category: "Home & Garden", revenue: 441000, orders: 1540, margin: 25.1 },
    { category: "Sports", revenue: 294000, orders: 1030, margin: 19.8 },
    { category: "Books", revenue: 147000, orders: 515, margin: 15.2 }
  ],
  customerSegments: [
    { segment: "Premium", revenue: 980000, customers: 1200, avgValue: 817 },
    { segment: "Regular", revenue: 1225000, customers: 4300, avgValue: 285 },
    { segment: "New", revenue: 245000, customers: 1800, avgValue: 136 }
  ]
};

export default function RevenueAnalytics() {
  const [timeRange, setTimeRange] = useState("6months");
  const [segmentFilter, setSegmentFilter] = useState("all");
  const [showPredictions, setShowPredictions] = useState(false);
  const { showModal, ModalComponent } = useModal();

  const togglePredictions = () => {
    setShowPredictions(!showPredictions);
    showModal({
      title: showPredictions ? "Revenue Predictions Hidden" : "AI Revenue Predictions Enabled",
      message: showPredictions 
        ? "Revenue forecasting has been disabled."
        : "AI-powered revenue predictions are now active. Forecasts based on historical data, seasonal trends, and market analysis.",
      type: "success"
    });
  };

  const exportRevenueReport = () => {
    showModal({
      title: "Revenue Report Export",
      message: "Comprehensive revenue analytics report with charts, segment analysis, and growth metrics has been prepared for export.",
      type: "info"
    });
  };

  const createRevenueAlert = () => {
    showModal({
      title: "Revenue Alert Created",
      message: "Alert configured for monthly revenue target of $270,000. You'll be notified if revenue drops below 90% of target.",
      type: "success"
    });
  };

  const optimizeRevenue = () => {
    showModal({
      title: "Revenue Optimization Suggestions",
      message: "AI analysis suggests: Focus on Mobile App channel (+28.5% growth), promote Electronics category (highest margin), and target Premium customer segment for upselling.",
      type: "info"
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <MainLayout title="Revenue Analytics">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Revenue Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Deep insights into revenue performance and growth
            </p>
          </div>
          <div className="flex gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">1 Month</SelectItem>
                <SelectItem value="3months">3 Months</SelectItem>
                <SelectItem value="6months">6 Months</SelectItem>
                <SelectItem value="1year">1 Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={togglePredictions}>
              <Target className={`w-4 h-4 mr-2 ${showPredictions ? 'text-green-500' : ''}`} />
              {showPredictions ? "Hide" : "Show"} Predictions
            </Button>
            <Button onClick={exportRevenueReport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <DollarSign className="w-8 h-8 text-green-600" />
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">{formatCurrency(mockRevenueData.overview.totalRevenue)}</div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-xs text-green-600 mt-1">+{mockRevenueData.overview.yearlyGrowth}% YoY</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <TrendingUp className="w-8 h-8 text-blue-600" />
                <Calendar className="w-4 h-4 text-blue-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">+{mockRevenueData.overview.monthlyGrowth}%</div>
                <p className="text-sm text-muted-foreground">Monthly Growth</p>
                <p className="text-xs text-blue-600 mt-1">Above target</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <ShoppingCart className="w-8 h-8 text-purple-600" />
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">{formatCurrency(mockRevenueData.overview.averageOrderValue)}</div>
                <p className="text-sm text-muted-foreground">Avg Order Value</p>
                <p className="text-xs text-green-600 mt-1">+8.2% vs last month</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Users className="w-8 h-8 text-orange-600" />
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">{mockRevenueData.overview.conversionRate}%</div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-xs text-green-600 mt-1">+0.3% improvement</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Target className="w-8 h-8 text-red-600" />
                <Badge variant="secondary" className="text-green-600 bg-green-100">
                  On Track
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">94%</div>
                <p className="text-sm text-muted-foreground">Target Achievement</p>
                <p className="text-xs text-green-600 mt-1">Q2 target: $2.6M</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sources">Revenue Sources</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="segments">Customer Segments</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {showPredictions && (
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-800">AI Revenue Predictions</CardTitle>
                  <CardDescription className="text-blue-600">
                    Forecasted revenue based on current trends and market analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-xl font-bold text-blue-600">{formatCurrency(285000)}</div>
                      <div className="text-sm text-muted-foreground">Next Month Forecast</div>
                      <div className="text-xs text-green-600">+11.8% confidence</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-xl font-bold text-blue-600">{formatCurrency(850000)}</div>
                      <div className="text-sm text-muted-foreground">Q3 Forecast</div>
                      <div className="text-xs text-green-600">+13.2% vs Q2</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-xl font-bold text-blue-600">{formatCurrency(3200000)}</div>
                      <div className="text-sm text-muted-foreground">Annual Forecast</div>
                      <div className="text-xs text-green-600">+26% vs last year</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Monthly revenue progression</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={mockRevenueData.monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Revenue vs Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue vs Orders</CardTitle>
                  <CardDescription>Volume and value correlation</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={mockRevenueData.monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Bar yAxisId="left" dataKey="orders" fill="#10b981" />
                      <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Optimization Tools</CardTitle>
                <CardDescription>AI-powered insights and actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col" onClick={optimizeRevenue}>
                    <Target className="w-6 h-6 mb-2" />
                    Get Optimization Tips
                  </Button>
                  <Button variant="outline" className="h-20 flex-col" onClick={createRevenueAlert}>
                    <Calendar className="w-6 h-6 mb-2" />
                    Set Revenue Alerts
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Filter className="w-6 h-6 mb-2" />
                    Advanced Filtering
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Sources Tab */}
          <TabsContent value="sources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Source</CardTitle>
                <CardDescription>Performance across different channels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRevenueData.revenueBySource.map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{source.source}</h4>
                          <p className="text-sm text-muted-foreground">{source.percentage}% of total revenue</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatCurrency(source.revenue)}</div>
                        <div className="text-sm text-green-600">+{source.growth}% growth</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Channel Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockRevenueData.revenueBySource}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="source" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Bar dataKey="revenue" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Category Performance</CardTitle>
                <CardDescription>Revenue and profitability by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRevenueData.productCategories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <ShoppingCart className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{category.category}</h4>
                          <p className="text-sm text-muted-foreground">{category.orders} orders</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatCurrency(category.revenue)}</div>
                        <div className="text-sm text-blue-600">{category.margin}% margin</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Revenue Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockRevenueData.productCategories}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Bar dataKey="revenue" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customer Segments Tab */}
          <TabsContent value="segments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Segment Analysis</CardTitle>
                <CardDescription>Revenue breakdown by customer type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRevenueData.customerSegments.map((segment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Users className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{segment.segment} Customers</h4>
                          <p className="text-sm text-muted-foreground">{segment.customers.toLocaleString()} customers</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatCurrency(segment.revenue)}</div>
                        <div className="text-sm text-blue-600">{formatCurrency(segment.avgValue)} avg</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Segment Value Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockRevenueData.customerSegments}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="segment" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#f59e0b" name="Revenue" />
                    <Bar dataKey="avgValue" fill="#10b981" name="Avg Value" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <ModalComponent />
      </div>
    </MainLayout>
  );
}