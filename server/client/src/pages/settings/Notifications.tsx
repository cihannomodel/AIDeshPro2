import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useModal } from "@/components/ui/modal";
import {
  Bell,
  Mail,
  Smartphone,
  Monitor,
  AlertTriangle,
  CheckCircle,
  Info,
  Zap,
  Clock,
  Users,
  DollarSign,
  BarChart3,
  Settings,
  Save,
  Test,
  Volume2,
  VolumeX
} from "lucide-react";

export default function Notifications() {
  const [notificationSettings, setNotificationSettings] = useState({
    // Email Notifications
    email: {
      enabled: true,
      address: "user@example.com",
      frequency: "instant", // instant, hourly, daily, weekly
      alerts: true,
      reports: true,
      updates: false,
      marketing: false
    },
    
    // Push Notifications (Browser)
    push: {
      enabled: true,
      alerts: true,
      reminders: true,
      updates: false
    },
    
    // SMS Notifications
    sms: {
      enabled: false,
      phone: "+1234567890",
      critical: true,
      alerts: false
    },
    
    // In-App Notifications
    inApp: {
      enabled: true,
      sound: true,
      duration: 5000, // ms
      position: "top-right"
    },
    
    // Alert Categories
    categories: {
      system: { enabled: true, level: "all" }, // all, critical, none
      security: { enabled: true, level: "all" },
      performance: { enabled: true, level: "critical" },
      revenue: { enabled: true, level: "all" },
      users: { enabled: false, level: "critical" },
      api: { enabled: true, level: "critical" }
    }
  });

  const [isTestingNotification, setIsTestingNotification] = useState<string | null>(null);
  const { toast } = useToast();
  const { showModal, ModalComponent } = useModal();

  const notificationChannels = [
    {
      id: "email",
      name: "Email",
      icon: Mail,
      description: "Receive notifications via email",
      color: "text-blue-500"
    },
    {
      id: "push",
      name: "Browser Push",
      icon: Monitor,
      description: "Browser notifications",
      color: "text-green-500"
    },
    {
      id: "sms",
      name: "SMS",
      icon: Smartphone,
      description: "Text message notifications",
      color: "text-purple-500"
    },
    {
      id: "inApp",
      name: "In-App",
      icon: Bell,
      description: "Dashboard notifications",
      color: "text-orange-500"
    }
  ];

  const alertCategories = [
    {
      id: "system",
      name: "System Alerts",
      icon: Settings,
      description: "Server status, maintenance, errors",
      color: "text-red-500",
      examples: ["Server downtime", "Backup failures", "System updates"]
    },
    {
      id: "security",
      name: "Security Alerts",
      icon: AlertTriangle,
      description: "Login attempts, security breaches",
      color: "text-yellow-500",
      examples: ["Failed login attempts", "Password changes", "API key usage"]
    },
    {
      id: "performance",
      name: "Performance",
      icon: BarChart3,
      description: "Response times, load alerts",
      color: "text-blue-500",
      examples: ["Slow queries", "High CPU usage", "Memory warnings"]
    },
    {
      id: "revenue",
      name: "Revenue & Sales",
      icon: DollarSign,
      description: "Sales milestones, payment issues",
      color: "text-green-500",
      examples: ["Sales targets met", "Payment failures", "Revenue drops"]
    },
    {
      id: "users",
      name: "User Activity",
      icon: Users,
      description: "New signups, user behavior",
      color: "text-purple-500",
      examples: ["New registrations", "Unusual activity", "User feedback"]
    },
    {
      id: "api",
      name: "API & Integrations",
      icon: Zap,
      description: "API errors, integration status",
      color: "text-indigo-500",
      examples: ["API rate limits", "Integration failures", "Webhook errors"]
    }
  ];

  const updateChannelSetting = (channel: string, setting: string, value: any) => {
    setNotificationSettings(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  const updateCategorySetting = (category: string, setting: string, value: any) => {
    setNotificationSettings(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: {
          ...prev.categories[category as keyof typeof prev.categories],
          [setting]: value
        }
      }
    }));
  };

  const testNotification = async (channel: string) => {
    setIsTestingNotification(channel);
    
    // Simulate test notification
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsTestingNotification(null);
    
    // Show actual test notification based on channel
    if (channel === "inApp") {
      toast({
        title: "Test Notification",
        description: "This is a test in-app notification. Everything is working correctly!",
      });
    } else {
      showModal({
        title: "Test Notification Sent",
        message: `A test notification has been sent via ${channel}. Please check your ${channel} for the test message.`,
        type: "success"
      });
    }
  };

  const saveSettings = async () => {
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Settings Saved",
      description: "Your notification preferences have been updated successfully.",
    });
  };

  const requestPermissions = async (type: string) => {
    if (type === "push" && "Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        toast({
          title: "Permissions Granted",
          description: "Browser notifications are now enabled.",
        });
        updateChannelSetting("push", "enabled", true);
      } else {
        toast({
          title: "Permissions Denied",
          description: "Please enable notifications in your browser settings.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <MainLayout title="Notification Settings">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Notification Settings</h1>
            <p className="text-muted-foreground mt-1">
              Configure how and when you receive notifications
            </p>
          </div>
          <Button onClick={saveSettings}>
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>

        {/* Notification Channels */}
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {notificationChannels.map((channel) => {
            const Icon = channel.icon;
            const settings = notificationSettings[channel.id as keyof typeof notificationSettings];
            
            return (
              <Card key={channel.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className={`w-5 h-5 ${channel.color}`} />
                      <span>{channel.name}</span>
                    </div>
                    <Switch
                      checked={settings.enabled}
                      onCheckedChange={(checked) => updateChannelSetting(channel.id, 'enabled', checked)}
                    />
                  </CardTitle>
                  <CardDescription>{channel.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {channel.id === "email" && (
                    <>
                      <div className="space-y-2">
                        <Label>Email Address</Label>
                        <Input
                          type="email"
                          value={settings.address}
                          onChange={(e) => updateChannelSetting("email", "address", e.target.value)}
                          disabled={!settings.enabled}
                          className="min-h-[44px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Frequency</Label>
                        <Select 
                          value={settings.frequency}
                          onValueChange={(value) => updateChannelSetting("email", "frequency", value)}
                          disabled={!settings.enabled}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="instant">Instant</SelectItem>
                            <SelectItem value="hourly">Hourly Digest</SelectItem>
                            <SelectItem value="daily">Daily Digest</SelectItem>
                            <SelectItem value="weekly">Weekly Summary</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label>Alert Emails</Label>
                          <Switch
                            checked={settings.alerts}
                            onCheckedChange={(checked) => updateChannelSetting("email", "alerts", checked)}
                            disabled={!settings.enabled}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Report Emails</Label>
                          <Switch
                            checked={settings.reports}
                            onCheckedChange={(checked) => updateChannelSetting("email", "reports", checked)}
                            disabled={!settings.enabled}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Product Updates</Label>
                          <Switch
                            checked={settings.updates}
                            onCheckedChange={(checked) => updateChannelSetting("email", "updates", checked)}
                            disabled={!settings.enabled}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {channel.id === "sms" && (
                    <>
                      <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input
                          type="tel"
                          value={settings.phone}
                          onChange={(e) => updateChannelSetting("sms", "phone", e.target.value)}
                          disabled={!settings.enabled}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label>Critical Alerts Only</Label>
                          <Switch
                            checked={settings.critical}
                            onCheckedChange={(checked) => updateChannelSetting("sms", "critical", checked)}
                            disabled={!settings.enabled}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {channel.id === "push" && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>System Alerts</Label>
                        <Switch
                          checked={settings.alerts}
                          onCheckedChange={(checked) => updateChannelSetting("push", "alerts", checked)}
                          disabled={!settings.enabled}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Reminders</Label>
                        <Switch
                          checked={settings.reminders}
                          onCheckedChange={(checked) => updateChannelSetting("push", "reminders", checked)}
                          disabled={!settings.enabled}
                        />
                      </div>
                      {!settings.enabled && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => requestPermissions("push")}
                          className="w-full"
                        >
                          Enable Browser Notifications
                        </Button>
                      )}
                    </div>
                  )}

                  {channel.id === "inApp" && (
                    <>
                      <div className="space-y-2">
                        <Label>Display Duration (seconds)</Label>
                        <Input
                          type="number"
                          value={settings.duration / 1000}
                          onChange={(e) => updateChannelSetting("inApp", "duration", parseInt(e.target.value) * 1000)}
                          disabled={!settings.enabled}
                          min="1"
                          max="30"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Position</Label>
                        <Select 
                          value={settings.position}
                          onValueChange={(value) => updateChannelSetting("inApp", "position", value)}
                          disabled={!settings.enabled}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="top-right">Top Right</SelectItem>
                            <SelectItem value="top-left">Top Left</SelectItem>
                            <SelectItem value="bottom-right">Bottom Right</SelectItem>
                            <SelectItem value="bottom-left">Bottom Left</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Sound Effects</Label>
                        <div className="flex items-center space-x-2">
                          {settings.sound ? (
                            <Volume2 className="w-4 h-4 text-green-500" />
                          ) : (
                            <VolumeX className="w-4 h-4 text-gray-400" />
                          )}
                          <Switch
                            checked={settings.sound}
                            onCheckedChange={(checked) => updateChannelSetting("inApp", "sound", checked)}
                            disabled={!settings.enabled}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <Button 
                    variant="outline" 
                    onClick={() => testNotification(channel.id)}
                    disabled={!settings.enabled || isTestingNotification === channel.id}
                    className="w-full"
                  >
                    {isTestingNotification === channel.id ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Sending Test...
                      </>
                    ) : (
                      <>
                        <Bell className="w-4 h-4 mr-2" />
                        Send Test Notification
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Alert Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Alert Categories</CardTitle>
            <CardDescription>
              Configure which types of alerts you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {alertCategories.map((category) => {
                const Icon = category.icon;
                const settings = notificationSettings.categories[category.id as keyof typeof notificationSettings.categories];
                
                return (
                  <div key={category.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon className={`w-5 h-5 ${category.color}`} />
                        <h3 className="font-medium">{category.name}</h3>
                      </div>
                      <Switch
                        checked={settings.enabled}
                        onCheckedChange={(checked) => updateCategorySetting(category.id, 'enabled', checked)}
                      />
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                    
                    {settings.enabled && (
                      <div className="space-y-2">
                        <Label className="text-xs">Alert Level</Label>
                        <Select 
                          value={settings.level}
                          onValueChange={(value) => updateCategorySetting(category.id, 'level', value)}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Alerts</SelectItem>
                            <SelectItem value="critical">Critical Only</SelectItem>
                            <SelectItem value="none">None</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    
                    <div className="space-y-1">
                      <Label className="text-xs">Examples:</Label>
                      <ul className="text-xs text-muted-foreground space-y-0.5">
                        {category.examples.map((example, index) => (
                          <li key={index}>• {example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Settings Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Summary</CardTitle>
            <CardDescription>
              Your current notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Mail className={`w-4 h-4 ${notificationSettings.email.enabled ? 'text-green-500' : 'text-gray-400'}`} />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-xs text-muted-foreground">
                    {notificationSettings.email.enabled ? notificationSettings.email.frequency : 'Disabled'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Monitor className={`w-4 h-4 ${notificationSettings.push.enabled ? 'text-green-500' : 'text-gray-400'}`} />
                <div>
                  <p className="text-sm font-medium">Browser</p>
                  <p className="text-xs text-muted-foreground">
                    {notificationSettings.push.enabled ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Smartphone className={`w-4 h-4 ${notificationSettings.sms.enabled ? 'text-green-500' : 'text-gray-400'}`} />
                <div>
                  <p className="text-sm font-medium">SMS</p>
                  <p className="text-xs text-muted-foreground">
                    {notificationSettings.sms.enabled ? 'Critical only' : 'Disabled'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Bell className={`w-4 h-4 ${notificationSettings.inApp.enabled ? 'text-green-500' : 'text-gray-400'}`} />
                <div>
                  <p className="text-sm font-medium">In-App</p>
                  <p className="text-xs text-muted-foreground">
                    {notificationSettings.inApp.enabled ? `${notificationSettings.inApp.duration/1000}s` : 'Disabled'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <ModalComponent />
    </MainLayout>
  );
}