import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { 
  LayoutGrid, 
  Save, 
  RotateCcw, 
  Eye, 
  Grid3X3, 
  Columns,
  Rows,
  Monitor,
  Smartphone,
  Tablet
} from "lucide-react";

export default function DashboardPreferences() {
  const { toast } = useToast();
  
  const [preferences, setPreferences] = useState({
    layout: "grid",
    columns: 3,
    rows: 4,
    cardSpacing: 16,
    showTitles: true,
    showIcons: true,
    compactCards: false,
    autoRefresh: true,
    refreshInterval: 30,
    sidebarPosition: "left",
    headerPosition: "top",
    showBreadcrumbs: true,
    darkModeCards: false,
    responsiveLayout: true
  });

  const updatePreference = (key: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const savePreferences = () => {
    // Save logic here
    toast({
      title: "Preferences Saved",
      description: "Your dashboard layout preferences have been updated.",
    });
  };

  const resetToDefaults = () => {
    setPreferences({
      layout: "grid",
      columns: 3,
      rows: 4,
      cardSpacing: 16,
      showTitles: true,
      showIcons: true,
      compactCards: false,
      autoRefresh: true,
      refreshInterval: 30,
      sidebarPosition: "left",
      headerPosition: "top",
      showBreadcrumbs: true,
      darkModeCards: false,
      responsiveLayout: true
    });
    
    toast({
      title: "Reset Complete",
      description: "Dashboard preferences have been reset to defaults.",
    });
  };

  return (
    <MainLayout title="Dashboard Layout Preferences">
      <div className="space-y-6">
        {/* Layout Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LayoutGrid className="w-5 h-5 mr-2" />
              Layout Configuration
            </CardTitle>
            <CardDescription>
              Customize how your dashboard widgets are arranged and displayed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Layout Type</Label>
                <Select 
                  value={preferences.layout}
                  onValueChange={(value) => updatePreference('layout', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">Grid Layout</SelectItem>
                    <SelectItem value="masonry">Masonry Layout</SelectItem>
                    <SelectItem value="flex">Flexible Layout</SelectItem>
                    <SelectItem value="custom">Custom Layout</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Sidebar Position</Label>
                <Select 
                  value={preferences.sidebarPosition}
                  onValueChange={(value) => updatePreference('sidebarPosition', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left Side</SelectItem>
                    <SelectItem value="right">Right Side</SelectItem>
                    <SelectItem value="hidden">Hidden</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Columns ({preferences.columns})</Label>
                  <Columns className="w-4 h-4 text-muted-foreground" />
                </div>
                <Slider
                  value={[preferences.columns]}
                  onValueChange={([value]) => updatePreference('columns', value)}
                  min={1}
                  max={6}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Card Spacing ({preferences.cardSpacing}px)</Label>
                  <Grid3X3 className="w-4 h-4 text-muted-foreground" />
                </div>
                <Slider
                  value={[preferences.cardSpacing]}
                  onValueChange={([value]) => updatePreference('cardSpacing', value)}
                  min={8}
                  max={32}
                  step={4}
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Display Options */}
        <Card>
          <CardHeader>
            <CardTitle>Display Options</CardTitle>
            <CardDescription>
              Control how widgets and content appear on your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Widget Titles</Label>
                    <p className="text-sm text-muted-foreground">
                      Display titles on dashboard widgets
                    </p>
                  </div>
                  <Switch
                    checked={preferences.showTitles}
                    onCheckedChange={(checked) => updatePreference('showTitles', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Widget Icons</Label>
                    <p className="text-sm text-muted-foreground">
                      Display icons on dashboard widgets
                    </p>
                  </div>
                  <Switch
                    checked={preferences.showIcons}
                    onCheckedChange={(checked) => updatePreference('showIcons', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Compact Cards</Label>
                    <p className="text-sm text-muted-foreground">
                      Reduce padding and spacing in cards
                    </p>
                  </div>
                  <Switch
                    checked={preferences.compactCards}
                    onCheckedChange={(checked) => updatePreference('compactCards', checked)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto Refresh</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically refresh dashboard data
                    </p>
                  </div>
                  <Switch
                    checked={preferences.autoRefresh}
                    onCheckedChange={(checked) => updatePreference('autoRefresh', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Breadcrumbs</Label>
                    <p className="text-sm text-muted-foreground">
                      Display navigation breadcrumbs
                    </p>
                  </div>
                  <Switch
                    checked={preferences.showBreadcrumbs}
                    onCheckedChange={(checked) => updatePreference('showBreadcrumbs', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Responsive Layout</Label>
                    <p className="text-sm text-muted-foreground">
                      Adapt layout for different screen sizes
                    </p>
                  </div>
                  <Switch
                    checked={preferences.responsiveLayout}
                    onCheckedChange={(checked) => updatePreference('responsiveLayout', checked)}
                  />
                </div>
              </div>
            </div>

            {preferences.autoRefresh && (
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <Label>Refresh Interval ({preferences.refreshInterval}s)</Label>
                  <RotateCcw className="w-4 h-4 text-muted-foreground" />
                </div>
                <Slider
                  value={[preferences.refreshInterval]}
                  onValueChange={([value]) => updatePreference('refreshInterval', value)}
                  min={10}
                  max={300}
                  step={10}
                  className="w-full"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              Layout Preview
            </CardTitle>
            <CardDescription>
              Preview how your dashboard will look with current settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4 bg-muted/20">
              <div className="text-center py-8 text-muted-foreground">
                <Monitor className="w-12 h-12 mx-auto mb-2" />
                <p>Dashboard preview will appear here</p>
                <p className="text-sm">Layout: {preferences.layout} • Columns: {preferences.columns}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={resetToDefaults}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button onClick={savePreferences}>
            <Save className="w-4 h-4 mr-2" />
            Save Preferences
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}