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
  Brain, Target, Star, TrendingUp, 
  Users, ShoppingCart, DollarSign, Zap,
  ThumbsUp, ThumbsDown, CheckCircle, Clock,
  ArrowRight, Filter, RefreshCw, Sparkles,
  BarChart3, PieChart, Activity, Award
} from "lucide-react";

interface Recommendation {
  id: string;
  category: "revenue" | "customer" | "product" | "marketing" | "operational";
  priority: "high" | "medium" | "low";
  type: "optimization" | "opportunity" | "risk-mitigation" | "automation";
  title: string;
  description: string;
  expectedImpact: string;
  confidence: number;
  effort: "low" | "medium" | "high";
  timeframe: string;
  status: "new" | "in-progress" | "completed" | "dismissed";
  tags: string[];
  metrics: {
    potential_revenue?: number;
    cost_savings?: number;
    efficiency_gain?: number;
    risk_reduction?: number;
  };
  actionSteps: string[];
  relatedData: string[];
}

const mockRecommendations: Recommendation[] = [
  {
    id: "1",
    category: "revenue",
    priority: "high",
    type: "optimization",
    title: "Optimize Premium Pricing Strategy",
    description: "Analysis shows premium customers are willing to pay 15% more for enhanced features. Implementing tiered pricing could increase revenue significantly.",
    expectedImpact: "25% revenue increase",
    confidence: 92,
    effort: "medium",
    timeframe: "2-3 months",
    status: "new",
    tags: ["pricing", "premium", "revenue-optimization"],
    metrics: {
      potential_revenue: 125000,
      efficiency_gain: 15
    },
    actionSteps: [
      "Conduct customer survey on pricing sensitivity",
      "Design new pricing tiers with enhanced features",
      "A/B test pricing with select customer segment",
      "Roll out new pricing strategy"
    ],
    relatedData: ["customer-segments", "pricing-analysis", "feature-usage"]
  },
  {
    id: "2",
    category: "customer",
    priority: "high",
    type: "risk-mitigation",
    title: "Implement Proactive Churn Prevention",
    description: "Machine learning identifies customers at 70%+ churn risk. Automated intervention campaigns could retain 40% of at-risk customers.",
    expectedImpact: "40% churn reduction",
    confidence: 87,
    effort: "high",
    timeframe: "1-2 months",
    status: "new",
    tags: ["churn-prevention", "retention", "automation"],
    metrics: {
      potential_revenue: 85000,
      risk_reduction: 40
    },
    actionSteps: [
      "Set up automated churn prediction model",
      "Create personalized retention campaigns",
      "Implement trigger-based email sequences",
      "Monitor and optimize intervention strategies"
    ],
    relatedData: ["customer-behavior", "usage-patterns", "support-tickets"]
  },
  {
    id: "3",
    category: "marketing",
    priority: "medium",
    type: "opportunity",
    title: "Expand Social Media Advertising",
    description: "LinkedIn campaigns show 3x higher ROI than current channels. Reallocating 30% of ad budget could improve lead quality significantly.",
    expectedImpact: "45% lead quality improvement",
    confidence: 78,
    effort: "low",
    timeframe: "2-4 weeks",
    status: "in-progress",
    tags: ["social-media", "linkedin", "lead-generation"],
    metrics: {
      efficiency_gain: 45,
      cost_savings: 15000
    },
    actionSteps: [
      "Analyze current LinkedIn campaign performance",
      "Create targeted LinkedIn ad campaigns",
      "Redistribute advertising budget allocation",
      "Monitor and optimize campaign performance"
    ],
    relatedData: ["ad-performance", "lead-sources", "campaign-roi"]
  },
  {
    id: "4",
    category: "operational",
    priority: "medium",
    type: "automation",
    title: "Automate Customer Support Triage",
    description: "80% of support tickets follow predictable patterns. AI-powered routing could reduce response time by 60% and improve satisfaction.",
    expectedImpact: "60% faster response time",
    confidence: 83,
    effort: "medium",
    timeframe: "1-2 months",
    status: "new",
    tags: ["automation", "customer-support", "efficiency"],
    metrics: {
      efficiency_gain: 60,
      cost_savings: 25000
    },
    actionSteps: [
      "Analyze support ticket patterns and categories",
      "Implement AI-powered ticket routing system",
      "Create automated response templates",
      "Train support team on new workflow"
    ],
    relatedData: ["support-tickets", "response-times", "satisfaction-scores"]
  }
];

export default function SmartRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>(mockRecommendations);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { showModal } = useModal();

  const generateRecommendations = async () => {
    setIsGenerating(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    showModal({
      title: "New Recommendations Generated",
      message: "5 new smart recommendations have been generated based on your latest business data and performance metrics.",
      type: "success"
    });
    
    setIsGenerating(false);
  };

  const implementRecommendation = (rec: Recommendation) => {
    showModal({
      title: "Implement Recommendation",
      message: `Start implementing "${rec.title}"? This will create a project plan and assign tasks to your team.`,
      type: "info",
      showCancel: true,
      onConfirm: () => {
        const updatedRecs = recommendations.map(r => 
          r.id === rec.id ? { ...r, status: "in-progress" as const } : r
        );
        setRecommendations(updatedRecs);
        
        showModal({
          title: "Implementation Started",
          message: "Project plan created and team notifications sent. Track progress in your project dashboard.",
          type: "success"
        });
      }
    });
  };

  const dismissRecommendation = (rec: Recommendation) => {
    showModal({
      title: "Dismiss Recommendation",
      message: `Are you sure you want to dismiss "${rec.title}"? This action cannot be undone.`,
      type: "warning",
      showCancel: true,
      onConfirm: () => {
        const updatedRecs = recommendations.map(r => 
          r.id === rec.id ? { ...r, status: "dismissed" as const } : r
        );
        setRecommendations(updatedRecs);
      }
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "revenue": return <DollarSign className="w-5 h-5 text-green-600" />;
      case "customer": return <Users className="w-5 h-5 text-blue-600" />;
      case "product": return <ShoppingCart className="w-5 h-5 text-purple-600" />;
      case "marketing": return <TrendingUp className="w-5 h-5 text-orange-600" />;
      case "operational": return <Activity className="w-5 h-5 text-gray-600" />;
      default: return <Brain className="w-5 h-5 text-purple-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-100 dark:bg-red-950/30 dark:text-red-400";
      case "medium": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-950/30 dark:text-yellow-400";
      case "low": return "text-green-600 bg-green-100 dark:bg-green-950/30 dark:text-green-400";
      default: return "text-gray-600 bg-gray-100 dark:bg-gray-950/30 dark:text-gray-400";
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case "low": return "text-green-600";
      case "medium": return "text-yellow-600";
      case "high": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const filteredRecommendations = recommendations.filter(rec => {
    const categoryMatch = selectedCategory === "all" || rec.category === selectedCategory;
    const priorityMatch = selectedPriority === "all" || rec.priority === selectedPriority;
    return categoryMatch && priorityMatch && rec.status !== "dismissed";
  });

  const totalPotentialValue = recommendations.reduce((sum, rec) => {
    return sum + (rec.metrics.potential_revenue || 0) + (rec.metrics.cost_savings || 0);
  }, 0);

  return (
    <MainLayout title="Smart Recommendations">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Smart Business Recommendations</h1>
            <p className="text-muted-foreground mt-1">
              AI-powered actionable insights to optimize your business performance
            </p>
          </div>
          <Button 
            onClick={generateRecommendations} 
            disabled={isGenerating}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            {isGenerating ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 mr-2" />
            )}
            Generate New Recommendations
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
                <div className="text-2xl font-bold">{filteredRecommendations.length}</div>
                <p className="text-sm text-muted-foreground">Active Recommendations</p>
                <p className="text-xs text-purple-600 mt-1">
                  {recommendations.filter(r => r.priority === "high").length} high priority
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <DollarSign className="w-8 h-8 text-green-600" />
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">${(totalPotentialValue / 1000).toFixed(0)}K</div>
                <p className="text-sm text-muted-foreground">Potential Value</p>
                <p className="text-xs text-green-600 mt-1">From implementation</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <CheckCircle className="w-8 h-8 text-blue-600" />
                <Award className="w-4 h-4 text-yellow-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">
                  {recommendations.filter(r => r.status === "completed").length}
                </div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-xs text-blue-600 mt-1">This month</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Target className="w-8 h-8 text-orange-600" />
                <Star className="w-4 h-4 text-orange-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">
                  {Math.round(recommendations.reduce((sum, r) => sum + r.confidence, 0) / recommendations.length)}%
                </div>
                <p className="text-sm text-muted-foreground">Avg Confidence</p>
                <p className="text-xs text-orange-600 mt-1">AI accuracy</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="recommendations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="recommendations">All Recommendations</TabsTrigger>
            <TabsTrigger value="high-impact">High Impact</TabsTrigger>
            <TabsTrigger value="quick-wins">Quick Wins</TabsTrigger>
            <TabsTrigger value="analytics">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="flex items-center gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredRecommendations.map((rec) => (
                <Card 
                  key={rec.id} 
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedRecommendation(rec)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {getCategoryIcon(rec.category)}
                        <div>
                          <CardTitle className="text-lg">{rec.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {rec.description}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(rec.priority)}>
                          {rec.priority}
                        </Badge>
                        <Badge variant="outline">
                          {rec.type.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Expected Impact</span>
                          <p className="font-medium text-green-600">{rec.expectedImpact}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Effort Level</span>
                          <p className={`font-medium ${getEffortColor(rec.effort)}`}>
                            {rec.effort}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Timeframe</span>
                          <p className="font-medium">{rec.timeframe}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Confidence</span>
                          <p className="font-medium">{rec.confidence}%</p>
                        </div>
                      </div>
                      
                      {(rec.metrics.potential_revenue || rec.metrics.cost_savings) && (
                        <div className="flex items-center gap-4 text-sm">
                          {rec.metrics.potential_revenue && (
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-green-600" />
                              <span className="font-medium text-green-600">
                                ${rec.metrics.potential_revenue.toLocaleString()} potential revenue
                              </span>
                            </div>
                          )}
                          {rec.metrics.cost_savings && (
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-blue-600" />
                              <span className="font-medium text-blue-600">
                                ${rec.metrics.cost_savings.toLocaleString()} cost savings
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {rec.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag.replace("-", " ")}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          {rec.status === "new" && (
                            <>
                              <Button 
                                size="sm" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  implementRecommendation(rec);
                                }}
                              >
                                <ArrowRight className="w-3 h-3 mr-1" />
                                Implement
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dismissRecommendation(rec);
                                }}
                              >
                                <ThumbsDown className="w-3 h-3" />
                              </Button>
                            </>
                          )}
                          {rec.status === "in-progress" && (
                            <Badge className="bg-blue-100 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">
                              In Progress
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="high-impact" className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {recommendations
                .filter(r => r.priority === "high" && r.status !== "dismissed")
                .map((rec) => (
                <Card key={rec.id} className="border-red-200 dark:border-red-900">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {getCategoryIcon(rec.category)}
                        <div>
                          <h4 className="font-semibold text-red-700 dark:text-red-400">
                            {rec.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">{rec.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm text-green-600 font-medium">
                              {rec.expectedImpact}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {rec.timeframe}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button onClick={() => implementRecommendation(rec)}>
                        Start Implementation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quick-wins" className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {recommendations
                .filter(r => r.effort === "low" && r.status !== "dismissed")
                .map((rec) => (
                <Card key={rec.id} className="border-green-200 dark:border-green-900">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {getCategoryIcon(rec.category)}
                        <div>
                          <h4 className="font-semibold text-green-700 dark:text-green-400">
                            {rec.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">{rec.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm text-green-600 font-medium">
                              Low effort • {rec.expectedImpact}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {rec.timeframe}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        onClick={() => implementRecommendation(rec)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Quick Implementation
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
                  <CardTitle>Implementation Success Rate</CardTitle>
                  <CardDescription>Track recommendation effectiveness</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Completed Successfully</span>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="w-24" />
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Currently In Progress</span>
                      <div className="flex items-center gap-2">
                        <Progress value={25} className="w-24" />
                        <span className="text-sm font-medium">25%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average ROI</span>
                      <span className="text-sm font-medium text-green-600">247%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Category Performance</CardTitle>
                  <CardDescription>Success rate by recommendation type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Revenue Optimization</span>
                      <span className="text-sm font-medium text-green-600">92%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Customer Retention</span>
                      <span className="text-sm font-medium text-blue-600">87%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Marketing Efficiency</span>
                      <span className="text-sm font-medium text-purple-600">78%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Operational Automation</span>
                      <span className="text-sm font-medium text-orange-600">83%</span>
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