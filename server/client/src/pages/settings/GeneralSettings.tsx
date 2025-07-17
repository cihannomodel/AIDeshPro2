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
  Settings,
  Globe,
  Clock,
  Save,
  RefreshCw,
  Monitor,
  User,
  Shield,
  Bell,
  Database,
  Palette,
  BarChart3,
  Zap
} from "lucide-react";

export default function GeneralSettings() {
  const [generalSettings, setGeneralSettings] = useState({
    // Language & Region
    language: "en",
    timezone: "Europe/Istanbul",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24h",
    currency: "USD",
    
    // Dashboard Preferences
    defaultPage: "/",
    refreshInterval: 30,
    autoSave: true,
    showWelcomeMessage: true,
    compactMode: false,
    animationsEnabled: true,
    
    // Performance
    enableLazyLoading: true,
    cacheEnabled: true,
    highPerformanceMode: false,
    
    // Session Management
    sessionTimeout: 60,
    autoLogout: true,
    rememberSession: true
  });

  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const { showModal, ModalComponent } = useModal();

  const languages = [
    { value: "en", label: "English" },
    { value: "tr", label: "Türkçe" },
    { value: "es", label: "Español" },
    { value: "fr", label: "Français" },
    { value: "de", label: "Deutsch" },
    { value: "zh", label: "中文" },
    { value: "ja", label: "日本語" },
    { value: "ar", label: "العربية" }
  ];

  const timezones = [
    { value: "Europe/Istanbul", label: "Turkey (GMT+3)" },
    { value: "Europe/London", label: "London (GMT+0)" },
    { value: "Europe/Berlin", label: "Berlin (GMT+1)" },
    { value: "America/New_York", label: "New York (GMT-5)" },
    { value: "America/Los_Angeles", label: "Los Angeles (GMT-8)" },
    { value: "Asia/Tokyo", label: "Tokyo (GMT+9)" },
    { value: "Asia/Shanghai", label: "Shanghai (GMT+8)" },
    { value: "Australia/Sydney", label: "Sydney (GMT+10)" }
  ];

  const currencies = [
    { value: "USD", label: "US Dollar ($)" },
    { value: "EUR", label: "Euro (€)" },
    { value: "TRY", label: "Turkish Lira (₺)" },
    { value: "GBP", label: "British Pound (£)" },
    { value: "JPY", label: "Japanese Yen (¥)" },
    { value: "CNY", label: "Chinese Yuan (¥)" }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate save process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSaving(false);
    toast({
      title: "Settings Saved",
      description: "Your general settings have been saved successfully.",
    });
  };

  const handleReset = () => {
    showModal({
      title: "Reset Settings",
      message: "Are you sure you want to reset all general settings to default values? This action cannot be undone.",
      type: "warning",
      showCancel: true,
      onConfirm: () => {
        setGeneralSettings({
          language: "en",
          timezone: "Europe/Istanbul",
          dateFormat: "DD/MM/YYYY",
          timeFormat: "24h",
          currency: "USD",
          defaultPage: "/",
          refreshInterval: 30,
          autoSave: true,
          showWelcomeMessage: true,
          compactMode: false,
          animationsEnabled: true,
          enableLazyLoading: true,
          cacheEnabled: true,
          highPerformanceMode: false,
          sessionTimeout: 60,
          autoLogout: true,
          rememberSession: true
        });
        toast({
          title: "Settings Reset",
          description: "All general settings have been reset to default values.",
        });
      }
    });
  };

  const updateSetting = (key: string, value: any) => {
    setGeneralSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <MainLayout title="General Settings">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">General Settings</h1>
            <p className="text-muted-foreground mt-1">
              Configure general dashboard preferences and behavior
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleReset}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {/* Language & Region */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Language & Region</span>
              </CardTitle>
              <CardDescription>
                Set your preferred language, timezone and formats
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Language</Label>
                <Select 
                  value={generalSettings.language} 
                  onValueChange={(value) => updateSetting('language', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map(lang => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select 
                  value={generalSettings.timezone} 
                  onValueChange={(value) => updateSetting('timezone', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map(tz => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date Format</Label>
                  <Select 
                    value={generalSettings.dateFormat} 
                    onValueChange={(value) => updateSetting('dateFormat', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Time Format</Label>
                  <Select 
                    value={generalSettings.timeFormat} 
                    onValueChange={(value) => updateSetting('timeFormat', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">24 Hour</SelectItem>
                      <SelectItem value="12h">12 Hour (AM/PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Currency</Label>
                <Select 
                  value={generalSettings.currency} 
                  onValueChange={(value) => updateSetting('currency', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map(curr => (
                      <SelectItem key={curr.value} value={curr.value}>
                        {curr.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Dashboard Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Monitor className="w-5 h-5" />
                <span>Dashboard Preferences</span>
              </CardTitle>
              <CardDescription>
                Customize your dashboard experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Landing Page</Label>
                <Select 
                  value={generalSettings.defaultPage} 
                  onValueChange={(value) => updateSetting('defaultPage', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="/">Dashboard Overview</SelectItem>
                    <SelectItem value="/analytics">Analytics</SelectItem>
                    <SelectItem value="/sales">Sales Dashboard</SelectItem>
                    <SelectItem value="/projects">Projects</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Auto Refresh (seconds)</Label>
                <Input
                  type="number"
                  value={generalSettings.refreshInterval}
                  onChange={(e) => updateSetting('refreshInterval', parseInt(e.target.value))}
                  min="10"
                  max="300"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto Save</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically save changes
                    </p>
                  </div>
                  <Switch
                    checked={generalSettings.autoSave}
                    onCheckedChange={(checked) => updateSetting('autoSave', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Welcome Message</Label>
                    <p className="text-sm text-muted-foreground">
                      Show welcome message on login
                    </p>
                  </div>
                  <Switch
                    checked={generalSettings.showWelcomeMessage}
                    onCheckedChange={(checked) => updateSetting('showWelcomeMessage', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Use compact layout
                    </p>
                  </div>
                  <Switch
                    checked={generalSettings.compactMode}
                    onCheckedChange={(checked) => updateSetting('compactMode', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Animations</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable interface animations
                    </p>
                  </div>
                  <Switch
                    checked={generalSettings.animationsEnabled}
                    onCheckedChange={(checked) => updateSetting('animationsEnabled', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Performance</span>
              </CardTitle>
              <CardDescription>
                Optimize dashboard performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Lazy Loading</Label>
                    <p className="text-sm text-muted-foreground">
                      Load content when needed
                    </p>
                  </div>
                  <Switch
                    checked={generalSettings.enableLazyLoading}
                    onCheckedChange={(checked) => updateSetting('enableLazyLoading', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Cache Data</Label>
                    <p className="text-sm text-muted-foreground">
                      Cache data for faster loading
                    </p>
                  </div>
                  <Switch
                    checked={generalSettings.cacheEnabled}
                    onCheckedChange={(checked) => updateSetting('cacheEnabled', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>High Performance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Reduced visual effects for speed
                    </p>
                  </div>
                  <Switch
                    checked={generalSettings.highPerformanceMode}
                    onCheckedChange={(checked) => updateSetting('highPerformanceMode', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Session Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Session Management</span>
              </CardTitle>
              <CardDescription>
                Control session behavior and security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Session Timeout (minutes)</Label>
                <Input
                  type="number"
                  value={generalSettings.sessionTimeout}
                  onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
                  min="15"
                  max="480"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto Logout</Label>
                    <p className="text-sm text-muted-foreground">
                      Logout when session expires
                    </p>
                  </div>
                  <Switch
                    checked={generalSettings.autoLogout}
                    onCheckedChange={(checked) => updateSetting('autoLogout', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Remember Session</Label>
                    <p className="text-sm text-muted-foreground">
                      Stay logged in between visits
                    </p>
                  </div>
                  <Switch
                    checked={generalSettings.rememberSession}
                    onCheckedChange={(checked) => updateSetting('rememberSession', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Settings Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Settings Overview</CardTitle>
            <CardDescription>
              Current configuration summary
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Language</p>
                  <p className="text-xs text-muted-foreground">
                    {languages.find(l => l.value === generalSettings.language)?.label}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Timezone</p>
                  <p className="text-xs text-muted-foreground">
                    GMT+3 Istanbul
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium">Performance</p>
                  <p className="text-xs text-muted-foreground">
                    {generalSettings.highPerformanceMode ? "High" : "Normal"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-red-500" />
                <div>
                  <p className="text-sm font-medium">Session</p>
                  <p className="text-xs text-muted-foreground">
                    {generalSettings.sessionTimeout}min timeout
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