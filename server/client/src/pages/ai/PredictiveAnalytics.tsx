import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useModal } from "@/components/ui/modal";
import { 
  Zap, TrendingUp, TrendingDown, BarChart3, 
  Calendar, Target, AlertCircle, CheckCircle,
  Brain, LineChart, PieChart, Activity,
  Clock, DollarSign, Users, ShoppingCart
} from "lucide-react";

interface PredictionModel {
  id: string;
  name: string;
  type: "revenue" | "customer" | "inventory" | "marketing";
  accuracy: number;
  lastTrained: string;
  predictions: number;
  status: "active" | "training" | "inactive";
}

interface Prediction {
  id: string;
  modelId: string;
  metric: string;
  currentValue: number;
  predictedValue: number;
  change: number;
  confidence: number;
  timeframe: string;
  trend: "up" | "down" | "stable";
  factors: string[];
}

const mockModels: PredictionModel[] = [
  {
    id: "1",
    name: "Revenue Forecasting",
    type: "revenue",
    accuracy: 94,
    lastTrained: "2025-01-15",
    predictions: 156,
    status: "active"
  },
  {
    id: "2",
    name: "Customer Churn Prediction",
    type: "customer",
    accuracy: 87,
    lastTrained: "2025-01-14",
    predictions: 89,
    status: "active"
  },
  {
    id: "3",
    name: "Demand Forecasting",
    type: "inventory",
    accuracy: 91,
    lastTrained: "2025-01-13",
    predictions: 67,
    status: "training"
  },
  {
    id: "4",
    name: "Campaign Performance",
    type: "marketing",
    accuracy: 83,
    lastTrained: "2025-01-12",
    predictions: 34,
    status: "active"
  }
];

const mockPredictions: Prediction[] = [
  {
    id: "1",
    modelId: "1",
    metric: "Monthly Revenue",
    currentValue: 125000,
    predictedValue: 142000,
    change: 13.6,
    confidence: 94,
    timeframe: "Next 30 days",
    trend: "up",
    factors: ["seasonal-increase", "marketing-campaign", "product-launch"]
  },
  {
    id: "2",
    modelId: "2",
    metric: "Customer Churn Rate",
    currentValue: 5.2,
    predictedValue: 6.8,
    change: 1.6,
    confidence: 87,
    timeframe: "Next 30 days",
    trend: "up",
    factors: ["support-tickets", "usage-decline", "competitor-activity"]
  },
  {
    id: "3",
    modelId: "3",
    metric: "Product Demand",
    currentValue: 850,
    predictedValue: 920,
    change: 8.2,
    confidence: 91,
    timeframe: "Next 14 days",
    trend: "up",
    factors: ["seasonal-trend", "marketing-boost", "inventory-optimization"]
  },
  {
    id: "4",
    modelId: "4",
    metric: "Campaign CTR",
    currentValue: 3.4,
    predictedValue: 2.9,
    change: -0.5,
    confidence: 83,
    timeframe: "Next 7 days",
    trend: "down",
    factors: ["audience-fatigue", "seasonal-decline", "ad-placement"]
  }
];

export default function PredictiveAnalytics() {
  const [models, setModels] = useState<PredictionModel[]>(mockModels);
  const [predictions, setPredictions] = useState<Prediction[]>(mockPredictions);
  const [selectedModel, setSelectedModel] = useState<PredictionModel | null>(models[0]);
  const [selectedTimeframe, setSelectedTimeframe] = useState("30");
  const [isTraining, setIsTraining] = useState(false);
  const { showModal } = useModal();

  const trainModel = async (modelId: string) => {
    setIsTraining(true);
    const model = models.find(m => m.id === modelId);
    if (!model) return;

    // Simulate training process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const updatedModels = models.map(m => 
      m.id === modelId 
        ? { ...m, status: "active" as const, accuracy: Math.min(95, m.accuracy + 2), lastTrained: new Date().toISOString().split('T')[0] }
        : m
    );
    setModels(updatedModels);
    
    showModal({
      title: "Model Training Complete",
      message: `${model.name} has been retrained with latest data. Accuracy improved to ${Math.min(95, model.accuracy + 2)}%`,
      type: "success"
    });
    
    setIsTraining(false);
  };

  const runPrediction = (modelId: string) => {
    const model = models.find(m => m.id === modelId);
    if (!model) return;

    showModal({
      title: "Run New Prediction",
      message: `Generate new predictions using ${model.name} model for the selected timeframe?`,
      type: "info",
      showCancel: true,
      onConfirm: () => {
        showModal({
          title: "Prediction Generated",
          message: "New predictions have been generated and added to your dashboard.",
          type: "success"
        });
      }
    });
  };

  const getModelIcon = (type: string) => {
    switch (type) {
      case "revenue": return <DollarSign className="w-5 h-5 text-green-600" />;
      case "customer": return <Users className="w-5 h-5 text-blue-600" />;
      case "inventory": return <ShoppingCart className="w-5 h-5 text-purple-600" />;
      case "marketing": return <TrendingUp className="w-5 h-5 text-orange-600" />;
      default: return <Brain className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": 
        return <Badge className="bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400">Active</Badge>;
      case "training": 
        return <Badge className="bg-yellow-100 text-yellow-600 dark:bg-yellow-950/30 dark:text-yellow-400">Training</Badge>;
      case "inactive": 
        return <Badge className="bg-gray-100 text-gray-600 dark:bg-gray-950/30 dark:text-gray-400">Inactive</Badge>;
      default: 
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down": return <TrendingDown className="w-4 h-4 text-red-600" />;
      case "stable": return <Activity className="w-4 h-4 text-blue-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatValue = (value: number, metric: string) => {
    if (metric.includes("Revenue") || metric.includes("Value")) {
      return `$${value.toLocaleString()}`;
    }
    if (metric.includes("Rate") || metric.includes("CTR")) {
      return `${value}%`;
    }
    return value.toLocaleString();
  };

  return (
    <MainLayout title="Predictive Analytics">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Predictive Analytics Engine</h1>
            <p className="text-muted-foreground mt-1">
              AI-powered forecasting and trend analysis for business planning
            </p>
          </div>
          <div className="flex gap-3">
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="14">14 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={() => selectedModel && runPrediction(selectedModel.id)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Zap className="w-4 h-4 mr-2" />
              Run Prediction
            </Button>
          </div>
        </div>

        {/* Model Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Brain className="w-8 h-8 text-purple-600" />
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">{models.length}</div>
                <p className="text-sm text-muted-foreground">Active Models</p>
                <p className="text-xs text-purple-600 mt-1">
                  {models.filter(m => m.status === "active").length} running
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Target className="w-8 h-8 text-blue-600" />
                <Badge className="bg-blue-100 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">
                  High
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">
                  {Math.round(models.reduce((sum, m) => sum + m.accuracy, 0) / models.length)}%
                </div>
                <p className="text-sm text-muted-foreground">Avg Accuracy</p>
                <p className="text-xs text-blue-600 mt-1">Across all models</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <BarChart3 className="w-8 h-8 text-green-600" />
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">
                  {models.reduce((sum, m) => sum + m.predictions, 0)}
                </div>
                <p className="text-sm text-muted-foreground">Total Predictions</p>
                <p className="text-xs text-green-600 mt-1">This month</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Clock className="w-8 h-8 text-orange-600" />
                <Activity className="w-4 h-4 text-orange-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">2.3s</div>
                <p className="text-sm text-muted-foreground">Avg Processing</p>
                <p className="text-xs text-orange-600 mt-1">Real-time analysis</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="predictions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="predictions">Current Predictions</TabsTrigger>
            <TabsTrigger value="models">Model Management</TabsTrigger>
            <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
            <TabsTrigger value="settings">Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="predictions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {predictions.map((prediction) => (
                <Card key={prediction.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{prediction.metric}</CardTitle>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(prediction.trend)}
                        <Badge 
                          className={
                            prediction.trend === "up" 
                              ? "bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400"
                              : prediction.trend === "down"
                              ? "bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400"
                              : "bg-blue-100 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400"
                          }
                        >
                          {prediction.change > 0 ? "+" : ""}{prediction.change}%
                        </Badge>
                      </div>
                    </div>
                    <CardDescription>{prediction.timeframe}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Current</p>
                          <p className="text-xl font-bold">
                            {formatValue(prediction.currentValue, prediction.metric)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Predicted</p>
                          <p className="text-xl font-bold">
                            {formatValue(prediction.predictedValue, prediction.metric)}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Confidence</span>
                          <span className="text-sm font-medium">{prediction.confidence}%</span>
                        </div>
                        <Progress value={prediction.confidence} className="h-2" />
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Key Factors</p>
                        <div className="flex flex-wrap gap-2">
                          {prediction.factors.map((factor) => (
                            <Badge key={factor} variant="outline" className="text-xs">
                              {factor.replace("-", " ")}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {models.map((model) => (
                <Card key={model.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {getModelIcon(model.type)}
                        <div>
                          <h4 className="font-semibold">{model.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Last trained: {model.lastTrained} • {model.predictions} predictions
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Accuracy:</span>
                            <span className="font-medium">{model.accuracy}%</span>
                          </div>
                          {getStatusBadge(model.status)}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => runPrediction(model.id)}
                            disabled={model.status !== "active"}
                          >
                            <LineChart className="w-4 h-4 mr-1" />
                            Predict
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => trainModel(model.id)}
                            disabled={isTraining || model.status === "training"}
                          >
                            <Brain className="w-4 h-4 mr-1" />
                            {model.status === "training" ? "Training..." : "Retrain"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Prediction Accuracy Trends</CardTitle>
                  <CardDescription>Model performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {models.map((model) => (
                      <div key={model.id} className="flex items-center justify-between">
                        <span className="text-sm">{model.name}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={model.accuracy} className="w-24" />
                          <span className="text-sm font-medium">{model.accuracy}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Forecast Reliability</CardTitle>
                  <CardDescription>Historical vs predicted outcomes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Revenue Forecasts</span>
                      <span className="text-sm font-medium text-green-600">94% accurate</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Customer Behavior</span>
                      <span className="text-sm font-medium text-blue-600">87% accurate</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Market Trends</span>
                      <span className="text-sm font-medium text-purple-600">91% accurate</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Campaign Performance</span>
                      <span className="text-sm font-medium text-orange-600">83% accurate</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Prediction Settings</CardTitle>
                  <CardDescription>Configure prediction parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="confidence-threshold">Minimum Confidence Threshold</Label>
                    <Input id="confidence-threshold" type="number" placeholder="75" />
                  </div>
                  <div>
                    <Label htmlFor="update-frequency">Update Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Every Hour</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="data-sources">Data Sources</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sources</SelectItem>
                        <SelectItem value="internal">Internal Only</SelectItem>
                        <SelectItem value="external">External APIs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Save Configuration</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alert Settings</CardTitle>
                  <CardDescription>Configure prediction alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="alert-threshold">Alert Threshold</Label>
                    <Input id="alert-threshold" type="number" placeholder="10" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Alert when prediction changes by more than this percentage
                    </p>
                  </div>
                  <div>
                    <Label>Notification Methods</Label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="email" defaultChecked />
                        <Label htmlFor="email">Email notifications</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="dashboard" defaultChecked />
                        <Label htmlFor="dashboard">Dashboard alerts</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="webhook" />
                        <Label htmlFor="webhook">Webhook integration</Label>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">Update Alerts</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}