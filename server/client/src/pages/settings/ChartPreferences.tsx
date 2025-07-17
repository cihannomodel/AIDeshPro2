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
  BarChart3, 
  Save, 
  RotateCcw, 
  Eye, 
  PieChart,
  LineChart,
  TrendingUp,
  Palette,
  Zap
} from "lucide-react";

export default function ChartPreferences() {
  const { toast } = useToast();
  
  const [preferences, setPreferences] = useState({
    defaultChartType: "bar",
    colorScheme: "default",
    showAnimations: true,
    animationDuration: 500,
    showGridLines: true,
    showLegend: true,
    showTooltips: true,
    legendPosition: "bottom",
    chartHeight: 300,
    borderRadius: 4,
    showDataLabels: false,
    enableInteraction: true,
    exportFormat: "png",
    highContrast: false,
    reducedMotion: false,
    showTrendLines: true
  });

  const colorSchemes = [
    { value: "default", label: "Default", colors: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"] },
    { value: "business", label: "Business", colors: ["#1E40AF", "#059669", "#D97706", "#DC2626"] },
    { value: "modern", label: "Modern", colors: ["#6366F1", "#8B5CF6", "#06B6D4", "#84CC16"] },
    { value: "pastel", label: "Pastel", colors: ["#93C5FD", "#86EFAC", "#FDE68A", "#FCA5A5"] },
    { value: "dark", label: "Dark Mode", colors: ["#60A5FA", "#34D399", "#FBBF24", "#F87171"] }
  ];

  const updatePreference = (key: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const savePreferences = () => {
    toast({
      title: "Preferences Saved",
      description: "Your chart preferences have been updated.",
    });
  };

  const resetToDefaults = () => {
    setPreferences({
      defaultChartType: "bar",
      colorScheme: "default",
      showAnimations: true,
      animationDuration: 500,
      showGridLines: true,
      showLegend: true,
      showTooltips: true,
      legendPosition: "bottom",
      chartHeight: 300,
      borderRadius: 4,
      showDataLabels: false,
      enableInteraction: true,
      exportFormat: "png",
      highContrast: false,
      reducedMotion: false,
      showTrendLines: true
    });
    
    toast({
      title: "Reset Complete",
      description: "Chart preferences have been reset to defaults.",
    });
  };

  return (
    <MainLayout title="Chart Preferences">
      <div className="space-y-6">
        {/* Chart Type & Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Chart Types & Appearance
            </CardTitle>
            <CardDescription>
              Configure default chart types and visual styling
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Default Chart Type</Label>
                <Select 
                  value={preferences.defaultChartType}
                  onValueChange={(value) => updatePreference('defaultChartType', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="line">Line Chart</SelectItem>
                    <SelectItem value="pie">Pie Chart</SelectItem>
                    <SelectItem value="area">Area Chart</SelectItem>
                    <SelectItem value="scatter">Scatter Plot</SelectItem>
                    <SelectItem value="donut">Donut Chart</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Legend Position</Label>
                <Select 
                  value={preferences.legendPosition}
                  onValueChange={(value) => updatePreference('legendPosition', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top">Top</SelectItem>
                    <SelectItem value="bottom">Bottom</SelectItem>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                    <SelectItem value="none">Hidden</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Chart Height ({preferences.chartHeight}px)</Label>
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
              </div>
              <Slider
                value={[preferences.chartHeight]}
                onValueChange={([value]) => updatePreference('chartHeight', value)}
                min={200}
                max={600}
                step={50}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Border Radius ({preferences.borderRadius}px)</Label>
                <div className="w-4 h-4 border rounded bg-muted" />
              </div>
              <Slider
                value={[preferences.borderRadius]}
                onValueChange={([value]) => updatePreference('borderRadius', value)}
                min={0}
                max={16}
                step={2}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Color Schemes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              Color Schemes
            </CardTitle>
            <CardDescription>
              Choose color palettes for your charts and data visualization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {colorSchemes.map((scheme) => (
                <div
                  key={scheme.value}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    preferences.colorScheme === scheme.value 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:bg-muted/50'
                  }`}
                  onClick={() => updatePreference('colorScheme', scheme.value)}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{scheme.label}</span>
                      {preferences.colorScheme === scheme.value && (
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                    <div className="flex space-x-1">
                      {scheme.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 rounded"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Display Options */}
        <Card>
          <CardHeader>
            <CardTitle>Display & Interaction</CardTitle>
            <CardDescription>
              Control chart display options and user interactions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Animations</Label>
                    <p className="text-sm text-muted-foreground">
                      Animate chart transitions and loading
                    </p>
                  </div>
                  <Switch
                    checked={preferences.showAnimations}
                    onCheckedChange={(checked) => updatePreference('showAnimations', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Grid Lines</Label>
                    <p className="text-sm text-muted-foreground">
                      Display background grid for easier reading
                    </p>
                  </div>
                  <Switch
                    checked={preferences.showGridLines}
                    onCheckedChange={(checked) => updatePreference('showGridLines', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Legend</Label>
                    <p className="text-sm text-muted-foreground">
                      Display legend for data series
                    </p>
                  </div>
                  <Switch
                    checked={preferences.showLegend}
                    onCheckedChange={(checked) => updatePreference('showLegend', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Tooltips</Label>
                    <p className="text-sm text-muted-foreground">
                      Display data values on hover
                    </p>
                  </div>
                  <Switch
                    checked={preferences.showTooltips}
                    onCheckedChange={(checked) => updatePreference('showTooltips', checked)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Data Labels</Label>
                    <p className="text-sm text-muted-foreground">
                      Display values directly on chart elements
                    </p>
                  </div>
                  <Switch
                    checked={preferences.showDataLabels}
                    onCheckedChange={(checked) => updatePreference('showDataLabels', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Interaction</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow zooming, panning, and selection
                    </p>
                  </div>
                  <Switch
                    checked={preferences.enableInteraction}
                    onCheckedChange={(checked) => updatePreference('enableInteraction', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Trend Lines</Label>
                    <p className="text-sm text-muted-foreground">
                      Display trend indicators on line charts
                    </p>
                  </div>
                  <Switch
                    checked={preferences.showTrendLines}
                    onCheckedChange={(checked) => updatePreference('showTrendLines', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>High Contrast</Label>
                    <p className="text-sm text-muted-foreground">
                      Use high contrast colors for accessibility
                    </p>
                  </div>
                  <Switch
                    checked={preferences.highContrast}
                    onCheckedChange={(checked) => updatePreference('highContrast', checked)}
                  />
                </div>
              </div>
            </div>

            {preferences.showAnimations && (
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <Label>Animation Duration ({preferences.animationDuration}ms)</Label>
                  <Zap className="w-4 h-4 text-muted-foreground" />
                </div>
                <Slider
                  value={[preferences.animationDuration]}
                  onValueChange={([value]) => updatePreference('animationDuration', value)}
                  min={100}
                  max={2000}
                  step={100}
                  className="w-full"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Export Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Export Settings</CardTitle>
            <CardDescription>
              Configure default export options for charts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Default Export Format</Label>
              <Select 
                value={preferences.exportFormat}
                onValueChange={(value) => updatePreference('exportFormat', value)}
              >
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG Image</SelectItem>
                  <SelectItem value="jpg">JPEG Image</SelectItem>
                  <SelectItem value="svg">SVG Vector</SelectItem>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="csv">CSV Data</SelectItem>
                </SelectContent>
              </Select>
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