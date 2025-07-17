import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { teamMembersData } from "@/lib/data/mockData";
import { 
  BarChart3, 
  HardDrive, 
  Zap, 
  Users, 
  Plus, 
  Download, 
  Settings 
} from "lucide-react";

const weeklyActivity = [
  { day: "Mon", percentage: 75 },
  { day: "Tue", percentage: 60 },
  { day: "Wed", percentage: 90 },
  { day: "Thu", percentage: 45 },
  { day: "Fri", percentage: 80 },
];

export function WidgetsShowcase() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {/* Activity Widget */}
      <Card className="widget-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Weekly Activity</CardTitle>
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weeklyActivity.map((item) => (
              <div key={item.day} className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{item.day}</span>
                <div className="w-20 bg-muted rounded-full h-1.5">
                  <div 
                    className="bg-primary h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Storage Widget */}
      <Card className="widget-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Storage Usage</CardTitle>
            <HardDrive className="w-4 h-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            <div className="relative w-16 h-16 mx-auto mb-3">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path 
                  className="text-muted stroke-current" 
                  strokeWidth="3" 
                  fill="none" 
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path 
                  className="text-primary stroke-current" 
                  strokeWidth="3" 
                  fill="none" 
                  strokeDasharray="75, 100" 
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-foreground">75%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">750 GB of 1 TB used</p>
          </div>
        </CardContent>
      </Card>
      
      {/* Quick Actions Widget */}
      <Card className="widget-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            <Zap className="w-4 h-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button variant="ghost" size="sm" className="w-full justify-start h-8">
              <Plus className="w-4 h-4 mr-2 text-blue-500" />
              Add New User
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start h-8">
              <Download className="w-4 h-4 mr-2 text-green-500" />
              Export Data
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start h-8">
              <Settings className="w-4 h-4 mr-2 text-purple-500" />
              System Settings
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Team Status Widget */}
      <Card className="widget-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Team Status</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {teamMembersData.map((member) => (
              <div key={member.id} className="flex items-center space-x-3">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="text-xs">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-xs font-medium text-foreground">
                    {member.name}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {member.status}
                  </p>
                </div>
                <div 
                  className={`w-2 h-2 rounded-full ${
                    member.status === 'online' ? 'bg-green-500' :
                    member.status === 'away' ? 'bg-yellow-500' :
                    'bg-gray-400'
                  }`}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
