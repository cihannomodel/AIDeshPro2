import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/hooks/use-theme";
import { 
  Palette, 
  Paintbrush, 
  Eye, 
  Download,
  Upload,
  Save,
  RotateCcw,
  Sun,
  Moon,
  Monitor,
  TestTube,
  Copy,
  Trash2,
  Star,
  Plus,
  Edit,
  Share2,
  Sparkles,
  Type,
  Settings,
  RefreshCw,
  Contrast,
  Zap
} from "lucide-react";
import { useModal } from "@/components/ui/modal";

const predefinedThemes = [
  {
    id: "default",
    name: "Default Light",
    primary: "#3B82F6",
    secondary: "#64748B",
    accent: "#10B981",
    background: "#FFFFFF",
    foreground: "#0F172A",
    muted: "#F8FAFC",
    category: "Light",
    preview: "bg-blue-500"
  },
  {
    id: "dark",
    name: "Dark Mode",
    primary: "#6366F1",
    secondary: "#8B5CF6",
    accent: "#06B6D4",
    background: "#0F172A",
    foreground: "#F8FAFC",
    muted: "#1E293B",
    category: "Dark",
    preview: "bg-indigo-600"
  },
  {
    id: "sunset",
    name: "Sunset Orange",
    primary: "#F97316",
    secondary: "#EF4444",
    accent: "#FBBF24",
    background: "#FFF7ED",
    foreground: "#1C1917",
    muted: "#FED7AA",
    category: "Warm",
    preview: "bg-orange-500"
  },
  {
    id: "forest",
    name: "Forest Green",
    primary: "#059669",
    secondary: "#047857",
    accent: "#34D399",
    background: "#F0FDF4",
    foreground: "#14532D",
    muted: "#BBF7D0",
    category: "Nature",
    preview: "bg-green-600"
  },
  {
    id: "ocean",
    name: "Ocean Blue",
    primary: "#0EA5E9",
    secondary: "#0284C7",
    accent: "#38BDF8",
    background: "#F0F9FF",
    foreground: "#0C4A6E",
    muted: "#BAE6FD",
    category: "Cool",
    preview: "bg-sky-500"
  },
  {
    id: "purple",
    name: "Royal Purple",
    primary: "#9333EA",
    secondary: "#7C3AED",
    accent: "#A855F7",
    background: "#FAF5FF",
    foreground: "#581C87",
    muted: "#DDD6FE",
    category: "Premium",
    preview: "bg-purple-600"
  }
];

const customProperties = [
  { property: "--radius", label: "Border Radius", min: 0, max: 20, step: 1, unit: "px" },
  { property: "--shadow", label: "Shadow Intensity", min: 0, max: 100, step: 5, unit: "%" },
  { property: "--font-size", label: "Base Font Size", min: 12, max: 20, step: 1, unit: "px" },
  { property: "--line-height", label: "Line Height", min: 1, max: 2, step: 0.1, unit: "" },
  { property: "--letter-spacing", label: "Letter Spacing", min: -2, max: 2, step: 0.1, unit: "px" }
];

const fontOptions = [
  { name: "Inter", category: "Sans-serif", style: "Modern" },
  { name: "Poppins", category: "Sans-serif", style: "Friendly" },
  { name: "Roboto", category: "Sans-serif", style: "Neutral" },
  { name: "Open Sans", category: "Sans-serif", style: "Readable" },
  { name: "Lato", category: "Sans-serif", style: "Humanist" },
  { name: "Playfair Display", category: "Serif", style: "Elegant" },
  { name: "Merriweather", category: "Serif", style: "Traditional" }
];

export default function ThemeBuilder() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [selectedTheme, setSelectedTheme] = useState(predefinedThemes[0]);
  const [customTheme, setCustomTheme] = useState({
    name: "My Custom Theme",
    primary: "#3B82F6",
    secondary: "#64748B",
    accent: "#10B981",
    background: "#FFFFFF",
    foreground: "#0F172A",
    muted: "#F8FAFC",
    fonts: {
      heading: "Inter",
      body: "Inter"
    },
    properties: {
      "--radius": 8,
      "--shadow": 50,
      "--font-size": 14,
      "--line-height": 1.5,
      "--letter-spacing": 0
    }
  });
  
  // Advanced theme settings from ThemeSettings
  const [advancedSettings, setAdvancedSettings] = useState({
    mode: theme as "light" | "dark" | "system",
    fontSize: 14,
    fontFamily: "Inter",
    borderRadius: 8,
    compactMode: false,
    highContrast: false,
    reducedMotion: false,
    customCSS: "",
    colorBlindness: "none"
  });
  
  const [activeTab, setActiveTab] = useState("colors");
  const [previewMode, setPreviewMode] = useState("desktop");
  const { showModal, ModalComponent } = useModal();

  const fontOptions = [
    { value: "Inter", label: "Inter (Default)" },
    { value: "system-ui", label: "System UI" },
    { value: "Roboto", label: "Roboto" },
    { value: "Open Sans", label: "Open Sans" },
    { value: "Poppins", label: "Poppins" },
    { value: "Montserrat", label: "Montserrat" },
    { value: "Source Sans Pro", label: "Source Sans Pro" },
    { value: "Lato", label: "Lato" }
  ];

  const applyTheme = (theme: typeof selectedTheme) => {
    setSelectedTheme(theme);
    const newTheme = {
      ...customTheme,
      primary: theme.primary,
      secondary: theme.secondary,
      accent: theme.accent,
      background: theme.background,
      foreground: theme.foreground,
      muted: theme.muted
    };
    setCustomTheme(newTheme);
    
    // Apply theme to document root for real-time preview
    applyThemeToDocument(newTheme);
    
    showModal({
      title: "Theme Applied",
      message: `${theme.name} theme has been applied to your dashboard. You can see the changes in real-time!`,
      type: "success"
    });
  };

  const applyThemeToDocument = (theme: typeof customTheme) => {
    const root = document.documentElement;
    
    // Convert hex to HSL for CSS variables
    const hexToHsl = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;
      
      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
          default: h = 0;
        }
        h /= 6;
      }
      
      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    };

    // Apply color variables
    root.style.setProperty('--primary', hexToHsl(theme.primary));
    root.style.setProperty('--secondary', hexToHsl(theme.secondary));
    root.style.setProperty('--accent', hexToHsl(theme.accent));
    root.style.setProperty('--background', hexToHsl(theme.background));
    root.style.setProperty('--foreground', hexToHsl(theme.foreground));
    root.style.setProperty('--muted', hexToHsl(theme.muted));
    
    // Apply typography properties
    // Apply font styles safely
    if (theme.fonts?.heading) {
      root.style.setProperty('--font-heading', theme.fonts.heading);
    }
    if (theme.fonts?.body) {
      root.style.setProperty('--font-body', theme.fonts.body);
    }
    
    // Apply layout properties
    Object.entries(theme.properties).forEach(([property, value]) => {
      root.style.setProperty(property, `${value}${getPropertyUnit(property)}`);
    });
  };

  const getPropertyUnit = (property: string) => {
    if (property.includes('radius')) return 'px';
    if (property.includes('font-size')) return 'px';
    if (property.includes('letter-spacing')) return 'px';
    if (property.includes('shadow')) return '%';
    return '';
  };

  const saveTheme = () => {
    showModal({
      title: "Theme Saved",
      message: `Your custom theme "${customTheme.name}" has been saved to your theme library. You can apply it anytime.`,
      type: "success"
    });
  };

  const exportTheme = () => {
    const themeData = JSON.stringify(customTheme, null, 2);
    const blob = new Blob([themeData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${customTheme.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showModal({
      title: "Theme Exported",
      message: "Your theme has been exported as a JSON file. You can import it on other dashboards.",
      type: "success"
    });
  };

  const importTheme = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const imported = JSON.parse(e.target?.result as string);
            setCustomTheme(imported);
            showModal({
              title: "Theme Imported",
              message: `Theme "${imported.name}" has been imported successfully.`,
              type: "success"
            });
          } catch {
            showModal({
              title: "Import Failed",
              message: "Invalid theme file. Please check the file format.",
              type: "error"
            });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const resetTheme = () => {
    setCustomTheme({
      name: "My Custom Theme",
      primary: "#3B82F6",
      secondary: "#64748B",
      accent: "#10B981",
      background: "#FFFFFF",
      foreground: "#0F172A",
      muted: "#F8FAFC",
      properties: {
        "--radius": 8,
        "--shadow": 50,
        "--font-size": 14,
        "--line-height": 1.5,
        "--letter-spacing": 0
      }
    });
    showModal({
      title: "Theme Reset",
      message: "Theme has been reset to default values.",
      type: "info"
    });
  };

  const duplicateTheme = () => {
    setCustomTheme(prev => ({
      ...prev,
      name: `${prev.name} Copy`
    }));
    showModal({
      title: "Theme Duplicated",
      message: "A copy of your theme has been created. You can now modify it independently.",
      type: "success"
    });
  };

  return (
    <MainLayout title="Theme Builder">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Theme Builder</h1>
            <p className="text-muted-foreground mt-1">
              Customize colors, typography, and visual styles for your dashboard
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="px-3 py-1">
              <TestTube className="w-4 h-4 mr-1" />
              Live Preview
            </Badge>
            <Button variant="outline" onClick={duplicateTheme}>
              <Copy className="w-4 h-4 mr-2" />
              Duplicate
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Theme Library */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Theme Library
                </CardTitle>
                <CardDescription>
                  Choose from predefined themes or create your own
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(
                  predefinedThemes.reduce((acc, theme) => {
                    if (!acc[theme.category]) acc[theme.category] = [];
                    acc[theme.category].push(theme);
                    return acc;
                  }, {} as Record<string, typeof predefinedThemes>)
                ).map(([category, themes]) => (
                  <div key={category}>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">{category}</h4>
                    <div className="space-y-2">
                      {themes.map((theme) => (
                        <div
                          key={theme.id}
                          className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedTheme.id === theme.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                          }`}
                          onClick={() => applyTheme(theme)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full ${theme.preview}`} />
                            <div>
                              <p className="font-medium text-sm">{theme.name}</p>
                              <p className="text-xs text-muted-foreground">{theme.primary}</p>
                            </div>
                          </div>
                          {selectedTheme.id === theme.id && (
                            <Star className="w-4 h-4 text-primary" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Theme Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Theme Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" onClick={saveTheme}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Theme
                </Button>
                <Button variant="outline" className="w-full" onClick={exportTheme}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Theme
                </Button>
                <Button variant="outline" className="w-full" onClick={importTheme}>
                  <Upload className="w-4 h-4 mr-2" />
                  Import Theme
                </Button>
                <Button variant="outline" className="w-full" onClick={resetTheme}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset to Default
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Editor & Preview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Theme Editor */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Paintbrush className="w-5 h-5 mr-2" />
                      Theme Editor
                    </CardTitle>
                    <CardDescription>
                      Customize colors, typography, and layout properties
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={previewMode === "desktop" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode("desktop")}
                    >
                      <Monitor className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={previewMode === "light" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode("light")}
                    >
                      <Sun className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={previewMode === "dark" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode("dark")}
                    >
                      <Moon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="colors">Colors</TabsTrigger>
                    <TabsTrigger value="typography">Typography</TabsTrigger>
                    <TabsTrigger value="layout">Layout</TabsTrigger>
                    <TabsTrigger value="mode">Theme Mode</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>

                  {/* Colors Tab */}
                  <TabsContent value="colors" className="space-y-6">
                    <div>
                      <Label className="text-base font-medium">Theme Name</Label>
                      <Input
                        value={customTheme.name}
                        onChange={(e) => setCustomTheme(prev => ({ ...prev, name: e.target.value }))}
                        className="mt-2"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries({
                        primary: "Primary Color",
                        secondary: "Secondary Color", 
                        accent: "Accent Color",
                        background: "Background",
                        foreground: "Text Color",
                        muted: "Muted Background"
                      }).map(([key, label]) => (
                        <div key={key} className="space-y-2">
                          <Label>{label}</Label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="color"
                              value={customTheme[key as keyof typeof customTheme] as string}
                              onChange={(e) => {
                                const newTheme = { ...customTheme, [key]: e.target.value };
                                setCustomTheme(newTheme);
                                applyThemeToDocument(newTheme);
                              }}
                              className="w-12 h-10 rounded border cursor-pointer"
                            />
                            <Input
                              value={customTheme[key as keyof typeof customTheme] as string}
                              onChange={(e) => setCustomTheme(prev => ({ ...prev, [key]: e.target.value }))}
                              className="flex-1 font-mono text-sm"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Typography Tab */}
                  <TabsContent value="typography" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label>Heading Font</Label>
                        <select 
                          className="w-full p-2 border rounded-lg bg-background text-foreground"
                          value={customTheme.fonts.heading}
                          onChange={(e) => {
                            const newTheme = {
                              ...customTheme,
                              fonts: { ...customTheme.fonts, heading: e.target.value }
                            };
                            setCustomTheme(newTheme);
                            applyThemeToDocument(newTheme);
                          }}
                        >
                          {fontOptions.map((font) => (
                            <option key={font.name} value={font.name}>
                              {font.name} - {font.style}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-3">
                        <Label>Body Font</Label>
                        <select 
                          className="w-full p-2 border rounded-lg bg-background text-foreground"
                          value={customTheme.fonts.body}
                          onChange={(e) => {
                            const newTheme = {
                              ...customTheme,
                              fonts: { ...customTheme.fonts, body: e.target.value }
                            };
                            setCustomTheme(newTheme);
                            applyThemeToDocument(newTheme);
                          }}
                        >
                          {fontOptions.map((font) => (
                            <option key={font.name} value={font.name}>
                              {font.name} - {font.style}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {customProperties.filter(prop => prop.property.includes('font') || prop.property.includes('line') || prop.property.includes('letter')).map((prop) => (
                      <div key={prop.property} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label>{prop.label}</Label>
                          <span className="text-sm text-muted-foreground">
                            {customTheme.properties[prop.property as keyof typeof customTheme.properties]}{prop.unit}
                          </span>
                        </div>
                        <Slider
                          value={[customTheme.properties[prop.property as keyof typeof customTheme.properties]]}
                          onValueChange={([value]) => {
                            const newTheme = {
                              ...customTheme,
                              properties: { ...customTheme.properties, [prop.property]: value }
                            };
                            setCustomTheme(newTheme);
                            applyThemeToDocument(newTheme);
                          }}
                          min={prop.min}
                          max={prop.max}
                          step={prop.step}
                          className="w-full"
                        />
                      </div>
                    ))}

                    <div className="p-4 border rounded-lg bg-muted/30">
                      <h4 className="font-medium mb-4">Typography Preview</h4>
                      <div className="space-y-3">
                        <h1 
                          className="text-2xl font-bold"
                          style={{ fontFamily: customTheme.fonts.heading, color: customTheme.primary }}
                        >
                          Dashboard Heading
                        </h1>
                        <h2 
                          className="text-xl font-semibold"
                          style={{ fontFamily: customTheme.fonts.heading, color: customTheme.foreground }}
                        >
                          Section Title
                        </h2>
                        <p 
                          className="text-base"
                          style={{ fontFamily: customTheme.fonts.body, color: customTheme.foreground }}
                        >
                          This is regular body text that will appear throughout your dashboard. 
                          It should be readable and complement your heading font choice.
                        </p>
                        <p 
                          className="text-sm"
                          style={{ fontFamily: customTheme.fonts.body, color: customTheme.secondary }}
                        >
                          Small text for descriptions and metadata information.
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Layout Tab */}
                  <TabsContent value="layout" className="space-y-6">
                    {customProperties.filter(prop => prop.property.includes('radius')).map((prop) => (
                      <div key={prop.property} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label>{prop.label}</Label>
                          <span className="text-sm text-muted-foreground">
                            {customTheme.properties[prop.property as keyof typeof customTheme.properties]}{prop.unit}
                          </span>
                        </div>
                        <Slider
                          value={[customTheme.properties[prop.property as keyof typeof customTheme.properties]]}
                          onValueChange={([value]) => {
                            const newTheme = {
                              ...customTheme,
                              properties: { ...customTheme.properties, [prop.property]: value }
                            };
                            setCustomTheme(newTheme);
                            applyThemeToDocument(newTheme);
                          }}
                          min={prop.min}
                          max={prop.max}
                          step={prop.step}
                          className="w-full"
                        />
                      </div>
                    ))}

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Sidebar Width</Label>
                        <select className="w-full p-2 border rounded-lg bg-background text-foreground">
                          <option key="compact" value="240px">Compact (240px)</option>
                          <option key="normal" value="280px">Normal (280px)</option>
                          <option key="wide" value="320px">Wide (320px)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label>Content Padding</Label>
                        <select className="w-full p-2 border rounded-lg bg-background text-foreground">
                          <option key="tight" value="16px">Tight (16px)</option>
                          <option key="normal-padding" value="24px">Normal (24px)</option>
                          <option key="loose" value="32px">Loose (32px)</option>
                        </select>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Theme Mode Tab */}
                  <TabsContent value="mode" className="space-y-6">
                    <div className="grid grid-cols-3 gap-3">
                      <Button
                        variant={advancedSettings.mode === "light" ? "default" : "outline"}
                        onClick={() => {
                          setAdvancedSettings(prev => ({...prev, mode: "light"}));
                          setTheme("light");
                        }}
                        className="flex flex-col items-center p-4 h-auto"
                      >
                        <Sun className="w-6 h-6 mb-2" />
                        <span>Light</span>
                      </Button>
                      <Button
                        variant={advancedSettings.mode === "dark" ? "default" : "outline"}
                        onClick={() => {
                          setAdvancedSettings(prev => ({...prev, mode: "dark"}));
                          setTheme("dark");
                        }}
                        className="flex flex-col items-center p-4 h-auto"
                      >
                        <Moon className="w-6 h-6 mb-2" />
                        <span>Dark</span>
                      </Button>
                      <Button
                        variant={advancedSettings.mode === "system" ? "default" : "outline"}
                        onClick={() => {
                          setAdvancedSettings(prev => ({...prev, mode: "system"}));
                          setTheme("system");
                        }}
                        className="flex flex-col items-center p-4 h-auto"
                      >
                        <Monitor className="w-6 h-6 mb-2" />
                        <span>System</span>
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>High Contrast</Label>
                          <p className="text-sm text-muted-foreground">
                            Increase contrast for better readability
                          </p>
                        </div>
                        <Switch
                          checked={advancedSettings.highContrast}
                          onCheckedChange={(checked) => setAdvancedSettings(prev => ({...prev, highContrast: checked}))}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Reduced Motion</Label>
                          <p className="text-sm text-muted-foreground">
                            Minimize animations and transitions
                          </p>
                        </div>
                        <Switch
                          checked={advancedSettings.reducedMotion}
                          onCheckedChange={(checked) => setAdvancedSettings(prev => ({...prev, reducedMotion: checked}))}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Compact Mode</Label>
                          <p className="text-sm text-muted-foreground">
                            Reduce spacing and padding
                          </p>
                        </div>
                        <Switch
                          checked={advancedSettings.compactMode}
                          onCheckedChange={(checked) => setAdvancedSettings(prev => ({...prev, compactMode: checked}))}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  {/* Advanced Tab */}
                  <TabsContent value="advanced" className="space-y-6">
                    <div className="space-y-2">
                      <Label>Color Blindness Support</Label>
                      <Select 
                        value={advancedSettings.colorBlindness}
                        onValueChange={(value) => setAdvancedSettings(prev => ({...prev, colorBlindness: value}))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="protanopia">Protanopia (Red-Blind)</SelectItem>
                          <SelectItem value="deuteranopia">Deuteranopia (Green-Blind)</SelectItem>
                          <SelectItem value="tritanopia">Tritanopia (Blue-Blind)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Custom CSS</Label>
                      <textarea
                        className="w-full h-32 p-3 border rounded-md font-mono text-sm resize-none bg-background"
                        value={advancedSettings.customCSS}
                        onChange={(e) => setAdvancedSettings(prev => ({...prev, customCSS: e.target.value}))}
                        placeholder="/* Add your custom CSS here */
.my-custom-class {
  color: var(--primary);
}"
                      />
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Settings className="w-4 h-4" />
                        <span className="font-medium">Current Configuration</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Theme:</span>
                          <p className="font-medium capitalize">{advancedSettings.mode}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Font:</span>
                          <p className="font-medium">{advancedSettings.fontFamily}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Size:</span>
                          <p className="font-medium">{advancedSettings.fontSize}px</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Radius:</span>
                          <p className="font-medium">{advancedSettings.borderRadius}px</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Live Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Live Preview
                </CardTitle>
                <CardDescription>
                  See how your theme looks in different components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 p-4 border rounded-lg" style={{
                  backgroundColor: customTheme.background,
                  color: customTheme.foreground
                }}>
                  {/* Preview Header */}
                  <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: customTheme.primary }}>
                    <h3 className="font-semibold text-white">Dashboard Header</h3>
                    <Button size="sm" variant="secondary">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Widget
                    </Button>
                  </div>

                  {/* Preview Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg border" style={{ backgroundColor: customTheme.muted }}>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: customTheme.accent }} />
                        <span className="font-medium">Revenue</span>
                      </div>
                      <p className="text-2xl font-bold" style={{ color: customTheme.primary }}>$45,231</p>
                      <p className="text-sm" style={{ color: customTheme.secondary }}>+20.1% from last month</p>
                    </div>

                    <div className="p-4 rounded-lg border" style={{ backgroundColor: customTheme.muted }}>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: customTheme.secondary }} />
                        <span className="font-medium">Users</span>
                      </div>
                      <p className="text-2xl font-bold" style={{ color: customTheme.primary }}>2,350</p>
                      <p className="text-sm" style={{ color: customTheme.secondary }}>+180.1% from last month</p>
                    </div>

                    <div className="p-4 rounded-lg border" style={{ backgroundColor: customTheme.muted }}>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: customTheme.accent }} />
                        <span className="font-medium">Sales</span>
                      </div>
                      <p className="text-2xl font-bold" style={{ color: customTheme.primary }}>+12,234</p>
                      <p className="text-sm" style={{ color: customTheme.secondary }}>+19% from last month</p>
                    </div>
                  </div>

                  {/* Preview Buttons */}
                  <div className="flex items-center space-x-3 pt-4">
                    <Button style={{ backgroundColor: customTheme.primary, color: 'white' }}>
                      Primary Button
                    </Button>
                    <Button variant="outline" style={{ borderColor: customTheme.secondary, color: customTheme.secondary }}>
                      Secondary Button
                    </Button>
                    <Badge style={{ backgroundColor: customTheme.accent, color: 'white' }}>
                      <Sparkles className="w-3 h-3 mr-1" />
                      New Feature
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <ModalComponent />
    </MainLayout>
  );
}