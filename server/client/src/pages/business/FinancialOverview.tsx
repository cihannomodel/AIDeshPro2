import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useModal } from "@/components/ui/modal";
import { 
  DollarSign, TrendingUp, TrendingDown, Calculator, 
  Download, FileText, PieChart, BarChart3, Target
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area, BarChart, Bar
} from "recharts";

const mockFinancialData = {
  overview: {
    totalRevenue: 2450000,
    netProfit: 485000,
    expenses: 1965000,
    cashFlow: 325000,
    growth: 12.5
  },
  monthlyData: [
    { month: "Jan", revenue: 180000, expenses: 140000, profit: 40000 },
    { month: "Feb", revenue: 195000, expenses: 150000, profit: 45000 },
    { month: "Mar", revenue: 210000, expenses: 165000, profit: 45000 },
    { month: "Apr", revenue: 225000, expenses: 175000, profit: 50000 },
    { month: "May", revenue: 240000, expenses: 180000, profit: 60000 },
    { month: "Jun", revenue: 255000, expenses: 190000, profit: 65000 }
  ],
  expenseBreakdown: [
    { category: "Salaries", amount: 850000, color: "#3b82f6" },
    { category: "Marketing", amount: 420000, color: "#10b981" },
    { category: "Operations", amount: 380000, color: "#f59e0b" },
    { category: "Technology", amount: 215000, color: "#ef4444" },
    { category: "Other", amount: 100000, color: "#8b5cf6" }
  ],
  quarterlyTargets: [
    { quarter: "Q1", target: 500000, actual: 480000, status: "warning" },
    { quarter: "Q2", target: 550000, actual: 570000, status: "success" },
    { quarter: "Q3", target: 600000, actual: 0, status: "pending" },
    { quarter: "Q4", target: 650000, actual: 0, status: "pending" }
  ]
};

export default function FinancialOverview() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [showForecasting, setShowForecasting] = useState(false);
  const { showModal, ModalComponent } = useModal();

  const toggleForecasting = () => {
    setShowForecasting(!showForecasting);
    showModal({
      title: showForecasting ? "Forecasting Disabled" : "AI Forecasting Enabled",
      message: showForecasting 
        ? "Financial forecasting has been turned off."
        : "AI-powered financial forecasting is now active. Predictions based on historical data and market trends.",
      type: "success"
    });
  };

  const exportFinancialReport = () => {
    showModal({
      title: "Financial Report Export",
      message: "Complete financial report with charts, summaries, and forecasts has been prepared. In a real application, this would generate a PDF or Excel file.",
      type: "info"
    });
  };

  const generateBudget = () => {
    showModal({
      title: "Budget Generator",
      message: "AI-powered budget recommendations generated based on historical spending patterns and revenue projections. Next quarter budget: $620,000.",
      type: "success"
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <MainLayout title="Financial Overview">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Financial Overview</h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive financial dashboard and analytics
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={toggleForecasting}>
              <Target className={`w-4 h-4 mr-2 ${showForecasting ? 'text-green-500' : ''}`} />
              {showForecasting ? "Hide" : "Show"} Forecasting
            </Button>
            <Button variant="outline" onClick={generateBudget}>
              <Calculator className="w-4 h-4 mr-2" />
              Generate Budget
            </Button>
            <Button onClick={exportFinancialReport}>
              <Download className="w-4 h-4 mr-2" />
              Export Report
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
                <div className="text-2xl font-bold">{formatCurrency(mockFinancialData.overview.totalRevenue)}</div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-xs text-green-600 mt-1">+{mockFinancialData.overview.growth}% vs last year</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <TrendingUp className="w-8 h-8 text-blue-600" />
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">{formatCurrency(mockFinancialData.overview.netProfit)}</div>
                <p className="text-sm text-muted-foreground">Net Profit</p>
                <p className="text-xs text-green-600 mt-1">+8.2% margin</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <TrendingDown className="w-8 h-8 text-red-600" />
                <TrendingUp className="w-4 h-4 text-red-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">{formatCurrency(mockFinancialData.overview.expenses)}</div>
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-xs text-red-600 mt-1">+5.1% vs last month</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <BarChart3 className="w-8 h-8 text-purple-600" />
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">{formatCurrency(mockFinancialData.overview.cashFlow)}</div>
                <p className="text-sm text-muted-foreground">Cash Flow</p>
                <p className="text-xs text-green-600 mt-1">Positive trend</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <PieChart className="w-8 h-8 text-orange-600" />
                <Target className="w-4 h-4 text-blue-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">19.8%</div>
                <p className="text-sm text-muted-foreground">Profit Margin</p>
                <p className="text-xs text-blue-600 mt-1">Above industry avg</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="targets">Targets</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue vs Expenses Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue vs Expenses</CardTitle>
                  <CardDescription>Monthly comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={mockFinancialData.monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Area type="monotone" dataKey="revenue" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="expenses" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Profit Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Profit Trend</CardTitle>
                  <CardDescription>Monthly net profit analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockFinancialData.monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Financial Health Indicators */}
            <Card>
              <CardHeader>
                <CardTitle>Financial Health Indicators</CardTitle>
                <CardDescription>Key performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">A+</div>
                    <div className="text-sm text-muted-foreground">Credit Rating</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">2.4x</div>
                    <div className="text-sm text-muted-foreground">Debt-to-Equity</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">45 days</div>
                    <div className="text-sm text-muted-foreground">Collection Period</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">1.8x</div>
                    <div className="text-sm text-muted-foreground">Current Ratio</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            {showForecasting && (
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-800">AI Forecasting Active</CardTitle>
                  <CardDescription className="text-blue-600">
                    Predictive analytics based on historical data and market trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-xl font-bold text-blue-600">{formatCurrency(2750000)}</div>
                      <div className="text-sm text-muted-foreground">Q3 Revenue Forecast</div>
                      <div className="text-xs text-green-600">+12% confidence</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-xl font-bold text-blue-600">{formatCurrency(550000)}</div>
                      <div className="text-sm text-muted-foreground">Q3 Profit Forecast</div>
                      <div className="text-xs text-green-600">+15% vs Q2</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-xl font-bold text-blue-600">21.2%</div>
                      <div className="text-sm text-muted-foreground">Predicted Margin</div>
                      <div className="text-xs text-green-600">Improving trend</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>12-Month Financial Trend</CardTitle>
                <CardDescription>Year-over-year comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={mockFinancialData.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Revenue" />
                    <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
                    <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} name="Profit" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Expenses Tab */}
          <TabsContent value="expenses" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Expense Breakdown Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                  <CardDescription>By category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={mockFinancialData.expenseBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="amount"
                        label={(entry) => `${entry.category}: ${formatCurrency(entry.amount)}`}
                      >
                        {mockFinancialData.expenseBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Expense Categories List */}
              <Card>
                <CardHeader>
                  <CardTitle>Category Details</CardTitle>
                  <CardDescription>Expense analysis by category</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockFinancialData.expenseBreakdown.map((expense, index) => {
                    const percentage = (expense.amount / mockFinancialData.overview.expenses) * 100;
                    return (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: expense.color }}
                          />
                          <div>
                            <div className="font-medium">{expense.category}</div>
                            <div className="text-sm text-muted-foreground">{percentage.toFixed(1)}% of total</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{formatCurrency(expense.amount)}</div>
                          <div className="text-xs text-muted-foreground">Annual</div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Targets Tab */}
          <TabsContent value="targets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quarterly Financial Targets</CardTitle>
                <CardDescription>Performance against set targets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockFinancialData.quarterlyTargets.map((quarter, index) => {
                    const achievement = quarter.actual > 0 ? (quarter.actual / quarter.target) * 100 : 0;
                    return (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div>
                            <h4 className="font-medium">{quarter.quarter}</h4>
                            <p className="text-sm text-muted-foreground">
                              Target: {formatCurrency(quarter.target)}
                            </p>
                          </div>
                          <Badge variant="secondary" className={getStatusColor(quarter.status)}>
                            {quarter.status === 'pending' ? 'Pending' : 
                             achievement >= 100 ? 'Achieved' : 'In Progress'}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">
                            {quarter.actual > 0 ? formatCurrency(quarter.actual) : 'TBD'}
                          </div>
                          {quarter.actual > 0 && (
                            <div className={`text-sm ${achievement >= 100 ? 'text-green-600' : 'text-yellow-600'}`}>
                              {achievement.toFixed(1)}% of target
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Target Setting */}
            <Card>
              <CardHeader>
                <CardTitle>Set New Financial Targets</CardTitle>
                <CardDescription>Configure targets for upcoming periods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-24 flex-col">
                    <Target className="w-6 h-6 mb-2" />
                    Set Q4 Revenue Target
                  </Button>
                  <Button variant="outline" className="h-24 flex-col">
                    <Calculator className="w-6 h-6 mb-2" />
                    Configure Expense Limits
                  </Button>
                  <Button variant="outline" className="h-24 flex-col">
                    <TrendingUp className="w-6 h-6 mb-2" />
                    Set Growth Targets
                  </Button>
                  <Button variant="outline" className="h-24 flex-col">
                    <FileText className="w-6 h-6 mb-2" />
                    Budget Planning
                  </Button>
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