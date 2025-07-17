import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useModal } from "@/components/ui/modal";
import { 
  Users, Heart, Star, TrendingUp, TrendingDown,
  Mail, MessageCircle, Phone, Gift, Target, Brain
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, RadialBarChart, RadialBar
} from "recharts";

const mockCustomerData = {
  overview: {
    totalCustomers: 8547,
    activeCustomers: 6234,
    newCustomers: 324,
    customerGrowth: 15.8,
    avgLifetimeValue: 1245,
    churnRate: 2.3,
    satisfactionScore: 4.6,
    npsScore: 72
  },
  demographics: [
    { ageGroup: "18-25", customers: 1281, percentage: 15 },
    { ageGroup: "26-35", customers: 2564, percentage: 30 },
    { ageGroup: "36-45", customers: 2393, percentage: 28 },
    { ageGroup: "46-55", customers: 1709, percentage: 20 },
    { ageGroup: "55+", customers: 600, percentage: 7 }
  ],
  behaviorSegments: [
    { segment: "Champions", customers: 1281, clv: 2100, engagement: 95, color: "#10b981" },
    { segment: "Loyal Customers", customers: 1709, clv: 1650, engagement: 85, color: "#3b82f6" },
    { segment: "Potential Loyalists", customers: 2564, clv: 1200, engagement: 75, color: "#f59e0b" },
    { segment: "At Risk", customers: 1709, clv: 800, engagement: 45, color: "#ef4444" },
    { segment: "Cannot Lose", customers: 1284, clv: 1800, engagement: 35, color: "#8b5cf6" }
  ],
  satisfactionTrends: [
    { month: "Jan", satisfaction: 4.2, nps: 65, reviews: 156 },
    { month: "Feb", satisfaction: 4.3, nps: 68, reviews: 189 },
    { month: "Mar", satisfaction: 4.4, nps: 70, reviews: 203 },
    { month: "Apr", satisfaction: 4.5, nps: 71, reviews: 234 },
    { month: "May", satisfaction: 4.6, nps: 72, reviews: 267 },
    { month: "Jun", satisfaction: 4.6, nps: 72, reviews: 289 }
  ],
  topCustomers: [
    { name: "Sarah Johnson", email: "sarah@company.com", value: 4250, orders: 23, segment: "Champion" },
    { name: "Michael Chen", email: "michael@business.com", value: 3890, orders: 18, segment: "Champion" },
    { name: "Emma Davis", email: "emma@startup.co", value: 3640, orders: 21, segment: "Loyal" },
    { name: "James Wilson", email: "james@corp.com", value: 3420, orders: 16, segment: "Loyal" },
    { name: "Lisa Brown", email: "lisa@tech.io", value: 3180, orders: 19, segment: "Champion" }
  ]
};

export default function CustomerInsights() {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [showPredictiveAnalysis, setShowPredictiveAnalysis] = useState(false);
  const { showModal, ModalComponent } = useModal();

  const togglePredictiveAnalysis = () => {
    setShowPredictiveAnalysis(!showPredictiveAnalysis);
    showModal({
      title: showPredictiveAnalysis ? "Predictive Analysis Disabled" : "AI Predictive Analysis Enabled",
      message: showPredictiveAnalysis 
        ? "Customer behavior predictions have been turned off."
        : "AI-powered customer behavior predictions are now active. Analysis includes churn prediction, lifetime value forecasting, and personalization insights.",
      type: "success"
    });
  };

  const launchCampaign = (segment: string) => {
    showModal({
      title: "Campaign Launched",
      message: `Targeted marketing campaign launched for ${segment} customers. Personalized emails, special offers, and retention strategies have been activated.`,
      type: "success"
    });
  };

  const generatePersonalization = () => {
    showModal({
      title: "Personalization Engine Activated",
      message: "AI-powered personalization recommendations generated: Product suggestions, content preferences, and optimal communication timing for each customer segment.",
      type: "info"
    });
  };

  const predictChurn = () => {
    showModal({
      title: "Churn Prediction Analysis",
      message: "AI analysis identifies 127 customers at high risk of churning. Recommended actions: Re-engagement campaign, loyalty program offers, and personalized outreach.",
      type: "warning"
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
    <MainLayout title="Customer Insights">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Customer Insights</h1>
            <p className="text-muted-foreground mt-1">
              Deep customer analytics and behavioral insights
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={togglePredictiveAnalysis}>
              <Brain className={`w-4 h-4 mr-2 ${showPredictiveAnalysis ? 'text-green-500' : ''}`} />
              {showPredictiveAnalysis ? "Hide" : "Show"} AI Predictions
            </Button>
            <Button variant="outline" onClick={generatePersonalization}>
              <Target className="w-4 h-4 mr-2" />
              Personalize
            </Button>
            <Button onClick={predictChurn}>
              <Users className="w-4 h-4 mr-2" />
              Churn Analysis
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Users className="w-8 h-8 text-blue-600" />
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">{mockCustomerData.overview.totalCustomers.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Total Customers</p>
                <p className="text-xs text-green-600 mt-1">+{mockCustomerData.overview.customerGrowth}% this month</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Heart className="w-8 h-8 text-red-600" />
                <Star className="w-4 h-4 text-yellow-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">{mockCustomerData.overview.satisfactionScore}/5</div>
                <p className="text-sm text-muted-foreground">Satisfaction Score</p>
                <p className="text-xs text-green-600 mt-1">+0.2 vs last month</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Gift className="w-8 h-8 text-purple-600" />
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">{formatCurrency(mockCustomerData.overview.avgLifetimeValue)}</div>
                <p className="text-sm text-muted-foreground">Avg Lifetime Value</p>
                <p className="text-xs text-green-600 mt-1">+12% vs last quarter</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <TrendingDown className="w-8 h-8 text-orange-600" />
                <Badge variant="secondary" className="text-green-600 bg-green-100">
                  Low
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">{mockCustomerData.overview.churnRate}%</div>
                <p className="text-sm text-muted-foreground">Churn Rate</p>
                <p className="text-xs text-green-600 mt-1">-0.5% improvement</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="segments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="segments">Customer Segments</TabsTrigger>
            <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="vip">VIP Customers</TabsTrigger>
          </TabsList>

          {/* Customer Segments Tab */}
          <TabsContent value="segments" className="space-y-6">
            {showPredictiveAnalysis && (
              <Card className="border-purple-200 bg-purple-50">
                <CardHeader>
                  <CardTitle className="text-purple-800">AI Predictive Customer Analysis</CardTitle>
                  <CardDescription className="text-purple-600">
                    Advanced behavioral predictions and recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-xl font-bold text-purple-600">127</div>
                      <div className="text-sm text-muted-foreground">High Churn Risk</div>
                      <div className="text-xs text-red-600">Immediate action needed</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-xl font-bold text-purple-600">892</div>
                      <div className="text-sm text-muted-foreground">Upsell Opportunities</div>
                      <div className="text-xs text-green-600">High conversion potential</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-xl font-bold text-purple-600">2.3x</div>
                      <div className="text-sm text-muted-foreground">Personalization Impact</div>
                      <div className="text-xs text-blue-600">Revenue multiplier</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Customer Segments */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Behavior Segments</CardTitle>
                  <CardDescription>RFM analysis-based segmentation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockCustomerData.behaviorSegments.map((segment, index) => (
                    <div 
                      key={index} 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedSegment === segment.segment ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedSegment(segment.segment)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: segment.color }}
                          />
                          <div>
                            <h4 className="font-medium">{segment.segment}</h4>
                            <p className="text-sm text-muted-foreground">{segment.customers.toLocaleString()} customers</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{formatCurrency(segment.clv)}</div>
                          <div className="text-sm text-muted-foreground">Avg CLV</div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Engagement</span>
                          <span>{segment.engagement}%</span>
                        </div>
                        <Progress value={segment.engagement} className="mt-1" />
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            launchCampaign(segment.segment);
                          }}
                        >
                          <Mail className="w-3 h-3 mr-1" />
                          Campaign
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Segment Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Segment Distribution</CardTitle>
                  <CardDescription>Customer value distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={mockCustomerData.behaviorSegments}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        dataKey="customers"
                        label={(entry) => `${entry.segment}: ${((entry.customers / 8547) * 100).toFixed(1)}%`}
                      >
                        {mockCustomerData.behaviorSegments.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {selectedSegment && (
              <Card>
                <CardHeader>
                  <CardTitle>Segment Details: {selectedSegment}</CardTitle>
                  <CardDescription>Detailed analysis and action recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-xl font-bold text-blue-600">
                        {mockCustomerData.behaviorSegments.find(s => s.segment === selectedSegment)?.customers.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Customers</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-xl font-bold text-green-600">
                        {formatCurrency(mockCustomerData.behaviorSegments.find(s => s.segment === selectedSegment)?.clv || 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">Avg CLV</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-xl font-bold text-purple-600">
                        {mockCustomerData.behaviorSegments.find(s => s.segment === selectedSegment)?.engagement}%
                      </div>
                      <div className="text-sm text-muted-foreground">Engagement Rate</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-xl font-bold text-orange-600">24%</div>
                      <div className="text-sm text-muted-foreground">Response Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Satisfaction Tab */}
          <TabsContent value="satisfaction" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Satisfaction Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Satisfaction Trends</CardTitle>
                  <CardDescription>Customer satisfaction over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockCustomerData.satisfactionTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[3.5, 5]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="satisfaction" stroke="#10b981" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* NPS Score */}
              <Card>
                <CardHeader>
                  <CardTitle>Net Promoter Score</CardTitle>
                  <CardDescription>Customer loyalty measurement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={[{ value: mockCustomerData.overview.npsScore }]}>
                        <RadialBar dataKey="value" cornerRadius={10} fill="#3b82f6" />
                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold">
                          {mockCustomerData.overview.npsScore}
                        </text>
                      </RadialBarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-center mt-4">
                    <Badge variant="secondary" className="text-green-600 bg-green-100">
                      Excellent Score
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-2">
                      Industry average: 32 | Your score: {mockCustomerData.overview.npsScore}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Feedback Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Feedback Analytics</CardTitle>
                <CardDescription>Recent feedback and sentiment analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">289</div>
                    <div className="text-sm text-muted-foreground">Total Reviews</div>
                    <div className="text-xs text-green-600">+12% this month</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">87%</div>
                    <div className="text-sm text-muted-foreground">Positive Sentiment</div>
                    <div className="text-xs text-blue-600">AI analysis</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">24h</div>
                    <div className="text-sm text-muted-foreground">Avg Response Time</div>
                    <div className="text-xs text-purple-600">Support team</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Demographics Tab */}
          <TabsContent value="demographics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Age Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Age Demographics</CardTitle>
                  <CardDescription>Customer age distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockCustomerData.demographics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="ageGroup" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="customers" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Demographics List */}
              <Card>
                <CardHeader>
                  <CardTitle>Demographic Breakdown</CardTitle>
                  <CardDescription>Detailed age group analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockCustomerData.demographics.map((demo, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{demo.ageGroup} years</h4>
                        <p className="text-sm text-muted-foreground">{demo.percentage}% of total customers</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{demo.customers.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">customers</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* VIP Customers Tab */}
          <TabsContent value="vip" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Value Customers</CardTitle>
                <CardDescription>Highest lifetime value customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCustomerData.topCustomers.map((customer, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={`/api/placeholder/40/40`} />
                          <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{customer.name}</h4>
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                          <Badge variant="secondary" className={
                            customer.segment === 'Champion' ? 'text-green-600 bg-green-100' : 'text-blue-600 bg-blue-100'
                          }>
                            {customer.segment}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatCurrency(customer.value)}</div>
                        <div className="text-sm text-muted-foreground">{customer.orders} orders</div>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            Contact
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="w-3 h-3 mr-1" />
                            Call
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* VIP Management Tools */}
            <Card>
              <CardHeader>
                <CardTitle>VIP Customer Management</CardTitle>
                <CardDescription>Special tools for high-value customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <Gift className="w-6 h-6 mb-2" />
                    Send Exclusive Offers
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Star className="w-6 h-6 mb-2" />
                    Loyalty Program
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Users className="w-6 h-6 mb-2" />
                    VIP Events
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