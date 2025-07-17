import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useModal } from "@/components/ui/modal";
import { 
  Lightbulb, TrendingUp, AlertTriangle, Target, 
  Brain, Zap, Eye, ArrowRight, RefreshCw,
  Calendar, Users, DollarSign, BarChart3,
  CheckCircle, Clock, Star, Sparkles
} from "lucide-react";

interface AIInsight {
  id: string;
  type: "opportunity" | "alert" | "prediction" | "recommendation";
  category: "revenue" | "customer" | "operational" | "marketing";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  confidence: number;
  actionable: boolean;
  estimatedValue?: string;
  timeframe?: string;
  priority: number;
  tags: string[];
  generatedAt: string;
}

const mockInsights: AIInsight[] = [
  {
    id: "1",
    type: "opportunity",
    category: "revenue",
    title: "Revenue Growth Opportunity Detected",
    description: "Customer segment analysis shows premium users have 3x higher engagement. Targeting similar profiles could increase revenue by 25%.",
    impact: "high",
    confidence: 89,
    actionable: true,
    estimatedValue: "$45,000",
    timeframe: "3 months",
    priority: 1,
    tags: ["revenue", "customer-segment", "premium"],
    generatedAt: "2025-01-15"
  },
  {
    id: "2",
    type: "alert",
    category: "customer",
    title: "Churn Risk Alert",
    description: "15 high-value customers showing decreased activity patterns. Immediate intervention could prevent $12K revenue loss.",
    impact: "high",
    confidence: 76,
    actionable: true,
    estimatedValue: "$12,000",
    timeframe: "2 weeks",
    priority: 2,
    tags: ["churn", "high-value", "retention"],
    generatedAt: "2025-01-14"
  },
  {
    id: "3",
    type: "prediction",
    category: "marketing",
    title: "Campaign Performance Forecast",
    description: "Based on historical data, next month's email campaign will likely achieve 18% open rate and 4.2% conversion.",
    impact: "medium",
    confidence: 82,
    actionable: true,
    timeframe: "1 month",
    priority: 3,
    tags: ["email", "campaign", "forecast"],
    generatedAt: "2025-01-13"
  },
  {
    id: "4",
    type: "recommendation",
    category: "operational",
    title: "Resource Optimization Suggestion",
    description: "Server load patterns suggest scaling down during 2-6 AM could reduce costs by 15% without affecting performance.",
    impact: "medium",
    confidence: 91,
    actionable: true,
    estimatedValue: "$2,400",
    timeframe: "immediate",
    priority: 4,
    tags: ["cost-optimization", "infrastructure", "efficiency"],
    generatedAt: "2025-01-12"
  }
];

export default function AIInsights() {
  const [insights, setInsights] = useState<AIInsight[]>(mockInsights);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { showModal } = useModal();

  const generateNewInsights = async () => {
    setIsGenerating(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    showModal({
      title: "New Insights Generated",
      message: "3 new AI insights have been generated based on your latest data patterns.",
      type: "success"
    });
    
    setIsGenerating(false);
  };

  const implementInsight = (insight: AIInsight) => {
    showModal({
      title: "Implement AI Insight",
      message: `Would you like to create an action plan for: "${insight.title}"?`,
      type: "info",
      showCancel: true,
      onConfirm: () => {
        showModal({
          title: "Action Plan Created",
          message: "Your implementation plan has been added to the task queue and team notifications sent.",
          type: "success"
        });
      }
    });
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "opportunity": return <Target className="w-5 h-5 text-green-600" />;
      case "alert": return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case "prediction": return <TrendingUp className="w-5 h-5 text-blue-600" />;
      case "recommendation": return <Lightbulb className="w-5 h-5 text-yellow-600" />;
      default: return <Brain className="w-5 h-5 text-purple-600" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "text-red-600 bg-red-100 dark:bg-red-950/30 dark:text-red-400";
      case "medium": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-950/30 dark:text-yellow-400";
      case "low": return "text-green-600 bg-green-100 dark:bg-green-950/30 dark:text-green-400";
      default: return "text-gray-600 bg-gray-100 dark:bg-gray-950/30 dark:text-gray-400";
    }
  };

  const filteredInsights = selectedCategory === "all" 
    ? insights 
    : insights.filter(insight => insight.category === selectedCategory);

  return (
    <MainLayout title="AI Insights">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">AI-Powered Business Insights</h1>
            <p className="text-muted-foreground mt-1">
              Discover actionable insights and opportunities from your data
            </p>
          </div>
          <Button 
            onClick={generateNewInsights} 
            disabled={isGenerating}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {isGenerating ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 mr-2" />
            )}
            Generate New Insights
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Brain className="w-8 h-8 text-purple-600" />
                <Badge className="bg-purple-100 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400">
                  Active
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">{insights.length}</div>
                <p className="text-sm text-muted-foreground">Total Insights</p>
                <p className="text-xs text-purple-600 mt-1">
                  {insights.filter(i => i.actionable).length} actionable
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Target className="w-8 h-8 text-green-600" />
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">
                  {insights.filter(i => i.type === "opportunity").length}
                </div>
                <p className="text-sm text-muted-foreground">Opportunities</p>
                <p className="text-xs text-green-600 mt-1">High impact available</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                <Clock className="w-4 h-4 text-red-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">
                  {insights.filter(i => i.type === "alert").length}
                </div>
                <p className="text-sm text-muted-foreground">Alerts</p>
                <p className="text-xs text-red-600 mt-1">Needs attention</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <DollarSign className="w-8 h-8 text-blue-600" />
                <Star className="w-4 h-4 text-yellow-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">$59.4K</div>
                <p className="text-sm text-muted-foreground">Potential Value</p>
                <p className="text-xs text-blue-600 mt-1">From actionable insights</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="insights" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="insights">All Insights</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-6">
            <div className="flex items-center gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredInsights.map((insight) => (
                <Card 
                  key={insight.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedInsight(insight)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {getInsightIcon(insight.type)}
                        <div>
                          <CardTitle className="text-lg">{insight.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {insight.description}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className={getImpactColor(insight.impact)}>
                        {insight.impact}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Confidence</span>
                        <div className="flex items-center gap-2">
                          <Progress value={insight.confidence} className="w-24" />
                          <span className="text-sm font-medium">{insight.confidence}%</span>
                        </div>
                      </div>
                      
                      {insight.estimatedValue && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Estimated Value</span>
                          <span className="text-sm font-medium text-green-600">{insight.estimatedValue}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {insight.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        {insight.actionable && (
                          <Button 
                            size="sm" 
                            onClick={(e) => {
                              e.stopPropagation();
                              implementInsight(insight);
                            }}
                          >
                            <ArrowRight className="w-3 h-3 mr-1" />
                            Act
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {insights.filter(i => i.type === "opportunity").map((insight) => (
                <Card key={insight.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Target className="w-8 h-8 text-green-600" />
                        <div>
                          <h4 className="font-semibold">{insight.title}</h4>
                          <p className="text-sm text-muted-foreground">{insight.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm text-green-600 font-medium">
                              {insight.estimatedValue} potential value
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {insight.timeframe}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button onClick={() => implementInsight(insight)}>
                        Implement
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {insights.filter(i => i.type === "alert").map((insight) => (
                <Card key={insight.id} className="border-red-200 dark:border-red-900">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                        <div>
                          <h4 className="font-semibold text-red-700 dark:text-red-400">
                            {insight.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">{insight.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm text-red-600 font-medium">
                              {insight.estimatedValue} at risk
                            </span>
                            <span className="text-sm text-muted-foreground">
                              Action needed: {insight.timeframe}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="destructive" onClick={() => implementInsight(insight)}>
                        Take Action
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Insight Performance</CardTitle>
                  <CardDescription>Track the effectiveness of AI recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Implementation Rate</span>
                      <div className="flex items-center gap-2">
                        <Progress value={78} className="w-24" />
                        <span className="text-sm font-medium">78%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Success Rate</span>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="w-24" />
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">ROI from Insights</span>
                      <span className="text-sm font-medium text-green-600">342%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Category Breakdown</CardTitle>
                  <CardDescription>Distribution of insights by business area</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Revenue</span>
                      <Badge className="bg-blue-100 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">
                        {insights.filter(i => i.category === "revenue").length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Customer</span>
                      <Badge className="bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400">
                        {insights.filter(i => i.category === "customer").length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Marketing</span>
                      <Badge className="bg-purple-100 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400">
                        {insights.filter(i => i.category === "marketing").length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Operational</span>
                      <Badge className="bg-orange-100 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400">
                        {insights.filter(i => i.category === "operational").length}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}