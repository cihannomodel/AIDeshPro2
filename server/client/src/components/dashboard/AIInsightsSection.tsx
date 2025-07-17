import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { aiInsightsData } from "@/lib/data/mockData";
import { 
  Brain, 
  Lightbulb, 
  AlertTriangle, 
  TrendingUp,
  Info
} from "lucide-react";

const iconMap = {
  lightbulb: Lightbulb,
  "alert-triangle": AlertTriangle,
  "trending-up": TrendingUp,
};

export function AIInsightsSection() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {/* AI Insights Panel */}
      <div className="xl:col-span-2">
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">
                  AI Insights & Recommendations
                </CardTitle>
                <p className="text-blue-100 text-sm">
                  Powered by Machine Learning
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiInsightsData.map((insight) => {
                const Icon = iconMap[insight.icon as keyof typeof iconMap];
                
                return (
                  <div key={insight.id} className="glass-effect rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 bg-${insight.color.replace('text-', '').replace('-400', '-500')}/20 rounded-lg flex items-center justify-center mt-1`}>
                        {Icon && <Icon className={`w-4 h-4 ${insight.color}`} />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{insight.title}</h4>
                        <p className="text-sm text-blue-100">
                          {insight.description}
                          {insight.actionText && (
                            <Button 
                              variant="link" 
                              className="p-0 h-auto text-white underline ml-1"
                            >
                              {insight.actionText}
                            </Button>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Performance Metrics */}
      <Card className="widget-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Page Load Speed</span>
                <span className="text-sm font-medium text-green-600">1.2s</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">API Response Time</span>
                <span className="text-sm font-medium text-blue-600">245ms</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Error Rate</span>
                <span className="text-sm font-medium text-orange-600">0.3%</span>
              </div>
              <Progress value={15} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Uptime</span>
                <span className="text-sm font-medium text-green-600">99.9%</span>
              </div>
              <Progress value={99} className="h-2" />
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-500/10 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Info className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                System Health
              </span>
            </div>
            <p className="text-xs text-blue-600/80 dark:text-blue-300">
              All systems operational. Next maintenance window: Dec 15, 2:00 AM UTC
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
