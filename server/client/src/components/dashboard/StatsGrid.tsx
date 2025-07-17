import { Card, CardContent } from "@/components/ui/card";
import { statsData } from "@/lib/data/mockData";
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Brain,
  ArrowUp,
  ArrowDown
} from "lucide-react";

const iconMap = {
  "dollar-sign": DollarSign,
  users: Users,
  "trending-up": TrendingUp,
  brain: Brain,
};

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {statsData.map((stat, index) => {
        const Icon = iconMap[stat.icon as keyof typeof iconMap];
        const colorMap = {
          "text-green-600": "from-green-500 to-green-600",
          "text-blue-600": "from-blue-500 to-blue-600",
          "text-orange-600": "from-orange-500 to-orange-600",
          "text-purple-600": "from-purple-500 to-purple-600",
        };
        
        return (
          <Card 
            key={stat.id} 
            className="stat-card animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    {stat.value}
                  </p>
                  <p className={`text-sm mt-1 flex items-center ${stat.color}`}>
                    {stat.trend === "up" ? (
                      <ArrowUp className="w-4 h-4 mr-1" />
                    ) : (
                      <ArrowDown className="w-4 h-4 mr-1" />
                    )}
                    {stat.change}
                  </p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${colorMap[stat.color as keyof typeof colorMap]} rounded-lg flex items-center justify-center`}>
                  {Icon && <Icon className="w-6 h-6 text-white" />}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
