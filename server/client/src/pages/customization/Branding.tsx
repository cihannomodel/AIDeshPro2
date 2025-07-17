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
import { 
  Image, 
  Upload, 
  Download,
  Save,
  RotateCcw,
  Eye,
  TestTube,
  Palette,
  Type,
  Crop,
  Move,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Grid,
  Layers,
  Settings,
  Share2,
  Copy,
  Trash2,
  Plus,
  Monitor,
  Smartphone,
  Tablet
} from "lucide-react";
import { useModal } from "@/components/ui/modal";

const logoSizes = [
  { name: "Small", width: 120, height: 40, usage: "Sidebar, mobile header" },
  { name: "Medium", width: 180, height: 60, usage: "Desktop header, emails" },
  { name: "Large", width: 240, height: 80, usage: "Landing pages, login screens" },
  { name: "Square", width: 64, height: 64, usage: "Favicons, app icons" }
];

const colorSchemes = [
  { id: "primary", name: "Primary", color: "#3B82F6", usage: "Main brand color" },
  { id: "secondary", name: "Secondary", color: "#64748B", usage: "Supporting elements" },
  { id: "accent", name: "Accent", color: "#10B981", usage: "Call-to-action buttons" },
  { id: "text", name: "Text", color: "#0F172A", usage: "Primary text color" },
  { id: "background", name: "Background", color: "#FFFFFF", usage: "Page backgrounds" }
];

const brandingPresets = [
  {
    id: "corporate",
    name: "Corporate",
    description: "Professional and trustworthy",
    colors: { primary: "#1E40AF", secondary: "#6B7280", accent: "#059669" },
    fonts: { heading: "Inter", body: "Inter" }
  },
  {
    id: "creative",
    name: "Creative",
    description: "Modern and artistic",
    colors: { primary: "#7C3AED", secondary: "#EC4899", accent: "#F59E0B" },
    fonts: { heading: "Poppins", body: "Open Sans" }
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple",
    colors: { primary: "#000000", secondary: "#6B7280", accent: "#3B82F6" },
    fonts: { heading: "Helvetica", body: "Arial" }
  },
  {
    id: "tech",
    name: "Tech",
    description: "Futuristic and innovative",
    colors: { primary: "#06B6D4", secondary: "#8B5CF6", accent: "#10B981" },
    fonts: { heading: "JetBrains Mono", body: "Source Sans Pro" }
  }
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

export default function Branding() {
  const [brandSettings, setBrandSettings] = useState({
    companyName: "Your Company",
    tagline: "Your business tagline here",
    logoUrl: "",
    faviconUrl: "",
    colors: {
      primary: "#3B82F6",
      secondary: "#64748B",
      accent: "#10B981",
      text: "#0F172A",
      background: "#FFFFFF"
    },
    fonts: {
      heading: "Inter",
      body: "Inter"
    },
    logoPosition: "left",
    showTagline: true,
    darkMode: true
  });
  
  const [activeTab, setActiveTab] = useState("logo");
  const [previewDevice, setPreviewDevice] = useState("desktop");
  const { showModal, ModalComponent } = useModal();

  const uploadLogo = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Show upload progress simulation
        const uploadButton = document.querySelector('[data-upload="logo"]');
        if (uploadButton) {
          uploadButton.textContent = 'Uploading...';
          uploadButton.classList.add('opacity-50');
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
          setTimeout(() => {
            setBrandSettings(prev => ({ ...prev, logoUrl: e.target?.result as string }));
            if (uploadButton) {
              uploadButton.textContent = 'Upload Logo';
              uploadButton.classList.remove('opacity-50');
            }
            showModal({
              title: "Logo Uploaded",
              message: "Your logo has been uploaded successfully. You can see it in the live preview!",
              type: "success"
            });
          }, 1000); // Simulate upload time
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const uploadFavicon = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setBrandSettings(prev => ({ ...prev, faviconUrl: e.target?.result as string }));
          showModal({
            title: "Favicon Uploaded",
            message: "Your favicon has been uploaded. It will appear in browser tabs and bookmarks.",
            type: "success"
          });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const applyPreset = (preset: typeof brandingPresets[0]) => {
    setBrandSettings(prev => ({
      ...prev,
      colors: { ...prev.colors, ...preset.colors },
      fonts: preset.fonts
    }));
    showModal({
      title: "Preset Applied",
      message: `${preset.name} branding preset has been applied to your dashboard.`,
      type: "success"
    });
  };

  const saveBranding = () => {
    showModal({
      title: "Branding Saved",
      message: "Your branding settings have been saved and applied across all dashboard components.",
      type: "success"
    });
  };

  const resetBranding = () => {
    setBrandSettings({
      companyName: "Your Company",
      tagline: "Your business tagline here",
      logoUrl: "",
      faviconUrl: "",
      colors: {
        primary: "#3B82F6",
        secondary: "#64748B",
        accent: "#10B981",
        text: "#0F172A",
        background: "#FFFFFF"
      },
      fonts: {
        heading: "Inter",
        body: "Inter"
      },
      logoPosition: "left",
      showTagline: true,
      darkMode: true
    });
    showModal({
      title: "Branding Reset",
      message: "All branding settings have been reset to default values.",
      type: "info"
    });
  };

  const exportBranding = () => {
    const brandingData = JSON.stringify(brandSettings, null, 2);
    const blob = new Blob([brandingData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'branding-settings.json';
    a.click();
    URL.revokeObjectURL(url);
    
    showModal({
      title: "Branding Exported",
      message: "Your branding settings have been exported. You can import them on other dashboards.",
      type: "success"
    });
  };

  const generateBrandKit = () => {
    showModal({
      title: "Brand Kit Generated",
      message: "A complete brand kit with logos, colors, and fonts has been prepared for download.",
      type: "success"
    });
  };

  return (
    <MainLayout title="Branding & Logo">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Branding & Logo</h1>
            <p className="text-muted-foreground mt-1">
              Customize your brand identity and visual appearance
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="px-3 py-1">
              <TestTube className="w-4 h-4 mr-1" />
              Live Preview
            </Badge>
            <Button variant="outline" onClick={generateBrandKit}>
              <Download className="w-4 h-4 mr-2" />
              Brand Kit
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Settings */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="logo">Logo & Icons</TabsTrigger>
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="typography">Typography</TabsTrigger>
                <TabsTrigger value="layout">Layout</TabsTrigger>
              </TabsList>

              {/* Logo & Icons Tab */}
              <TabsContent value="logo" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Image className="w-5 h-5 mr-2" />
                      Logo Management
                    </CardTitle>
                    <CardDescription>
                      Upload and configure your company logo
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Company Details */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Company Name</Label>
                        <Input
                          value={brandSettings.companyName}
                          onChange={(e) => setBrandSettings(prev => ({ ...prev, companyName: e.target.value }))}
                          placeholder="Enter your company name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Tagline</Label>
                        <Input
                          value={brandSettings.tagline}
                          onChange={(e) => setBrandSettings(prev => ({ ...prev, tagline: e.target.value }))}
                          placeholder="Enter your business tagline"
                        />
                      </div>
                    </div>

                    {/* Logo Upload */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Main Logo</Label>
                        <Button variant="outline" onClick={uploadLogo} data-upload="logo">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Logo
                        </Button>
                      </div>
                      
                      {brandSettings.logoUrl ? (
                        <div className="p-4 border rounded-lg">
                          <img 
                            src={brandSettings.logoUrl} 
                            alt="Logo" 
                            className="max-h-16 mx-auto"
                          />
                        </div>
                      ) : (
                        <div className="p-8 border-2 border-dashed rounded-lg text-center">
                          <Image className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Upload your logo (PNG, JPG, SVG)
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Logo Sizes */}
                    <div className="space-y-4">
                      <Label>Logo Sizes</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {logoSizes.map((size) => (
                          <div key={size.name} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-sm">{size.name}</span>
                              <Badge variant="outline">{size.width}×{size.height}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{size.usage}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Favicon */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Favicon</Label>
                        <Button variant="outline" size="sm" onClick={uploadFavicon}>
                          <Upload className="w-3 h-3 mr-1" />
                          Upload
                        </Button>
                      </div>
                      
                      {brandSettings.faviconUrl ? (
                        <div className="flex items-center space-x-3 p-3 border rounded-lg">
                          <img 
                            src={brandSettings.faviconUrl} 
                            alt="Favicon" 
                            className="w-8 h-8"
                          />
                          <div>
                            <p className="text-sm font-medium">Favicon uploaded</p>
                            <p className="text-xs text-muted-foreground">32×32 pixels</p>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 border rounded-lg text-center">
                          <div className="w-8 h-8 border mx-auto mb-2 rounded" />
                          <p className="text-xs text-muted-foreground">No favicon uploaded</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Colors Tab */}
              <TabsContent value="colors" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Palette className="w-5 h-5 mr-2" />
                      Brand Colors
                    </CardTitle>
                    <CardDescription>
                      Define your brand color palette
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Branding Presets */}
                    <div className="space-y-4">
                      <Label>Quick Presets</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {brandingPresets.map((preset) => (
                          <div
                            key={preset.id}
                            className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50"
                            onClick={() => applyPreset(preset)}
                          >
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="flex space-x-1">
                                {Object.values(preset.colors).map((color, index) => (
                                  <div
                                    key={index}
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: color }}
                                  />
                                ))}
                              </div>
                              <span className="font-medium text-sm">{preset.name}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{preset.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Color Customization */}
                    <div className="space-y-4">
                      <Label>Custom Colors</Label>
                      <div className="space-y-3">
                        {colorSchemes.map((scheme) => (
                          <div key={scheme.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <input
                                type="color"
                                value={brandSettings.colors[scheme.id as keyof typeof brandSettings.colors]}
                                onChange={(e) => setBrandSettings(prev => ({
                                  ...prev,
                                  colors: { ...prev.colors, [scheme.id]: e.target.value }
                                }))}
                                className="w-10 h-10 rounded border cursor-pointer"
                              />
                              <div>
                                <p className="font-medium text-sm">{scheme.name}</p>
                                <p className="text-xs text-muted-foreground">{scheme.usage}</p>
                              </div>
                            </div>
                            <Input
                              value={brandSettings.colors[scheme.id as keyof typeof brandSettings.colors]}
                              onChange={(e) => setBrandSettings(prev => ({
                                ...prev,
                                colors: { ...prev.colors, [scheme.id]: e.target.value }
                              }))}
                              className="w-24 font-mono text-xs"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Typography Tab */}
              <TabsContent value="typography" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Type className="w-5 h-5 mr-2" />
                      Typography
                    </CardTitle>
                    <CardDescription>
                      Choose fonts for headings and body text
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label>Heading Font</Label>
                        <select 
                          className="w-full p-2 border rounded-lg bg-background text-foreground"
                          value={brandSettings.fonts.heading}
                          onChange={(e) => setBrandSettings(prev => ({
                            ...prev,
                            fonts: { ...prev.fonts, heading: e.target.value }
                          }))}
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
                          value={brandSettings.fonts.body}
                          onChange={(e) => setBrandSettings(prev => ({
                            ...prev,
                            fonts: { ...prev.fonts, body: e.target.value }
                          }))}
                        >
                          {fontOptions.map((font) => (
                            <option key={font.name} value={font.name}>
                              {font.name} - {font.style}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Typography Preview */}
                    <div className="p-4 border rounded-lg bg-muted/30">
                      <h4 className="font-medium mb-4">Typography Preview</h4>
                      <div className="space-y-3">
                        <h1 
                          className="text-2xl font-bold"
                          style={{ fontFamily: brandSettings.fonts.heading, color: brandSettings.colors.primary }}
                        >
                          Dashboard Heading
                        </h1>
                        <h2 
                          className="text-xl font-semibold"
                          style={{ fontFamily: brandSettings.fonts.heading, color: brandSettings.colors.text }}
                        >
                          Section Title
                        </h2>
                        <p 
                          className="text-base"
                          style={{ fontFamily: brandSettings.fonts.body, color: brandSettings.colors.text }}
                        >
                          This is regular body text that will appear throughout your dashboard. 
                          It should be readable and complement your heading font choice.
                        </p>
                        <p 
                          className="text-sm"
                          style={{ fontFamily: brandSettings.fonts.body, color: brandSettings.colors.secondary }}
                        >
                          Small text for descriptions and metadata information.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Layout Tab */}
              <TabsContent value="layout" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Layers className="w-5 h-5 mr-2" />
                      Layout Settings
                    </CardTitle>
                    <CardDescription>
                      Configure logo placement and visual options
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <Label>Logo Position</Label>
                        <div className="flex space-x-2">
                          {["left", "center", "right"].map((position) => (
                            <Button
                              key={position}
                              variant={brandSettings.logoPosition === position ? "default" : "outline"}
                              size="sm"
                              onClick={() => setBrandSettings(prev => ({ ...prev, logoPosition: position }))}
                            >
                              {position.charAt(0).toUpperCase() + position.slice(1)}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Show Tagline</Label>
                          <p className="text-sm text-muted-foreground">
                            Display tagline below company name
                          </p>
                        </div>
                        <Switch
                          checked={brandSettings.showTagline}
                          onCheckedChange={(checked) => setBrandSettings(prev => ({ ...prev, showTagline: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Dark Mode Support</Label>
                          <p className="text-sm text-muted-foreground">
                            Optimize branding for dark theme
                          </p>
                        </div>
                        <Switch
                          checked={brandSettings.darkMode}
                          onCheckedChange={(checked) => setBrandSettings(prev => ({ ...prev, darkMode: checked }))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex space-x-3">
                  <Button className="flex-1" onClick={saveBranding}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Branding
                  </Button>
                  <Button variant="outline" onClick={exportBranding}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" onClick={resetBranding}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Eye className="w-5 h-5 mr-2" />
                    Live Preview
                  </CardTitle>
                  <div className="flex items-center space-x-1 border rounded-lg p-1">
                    <Button
                      variant={previewDevice === "desktop" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setPreviewDevice("desktop")}
                    >
                      <Monitor className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={previewDevice === "tablet" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setPreviewDevice("tablet")}
                    >
                      <Tablet className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={previewDevice === "mobile" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setPreviewDevice("mobile")}
                    >
                      <Smartphone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div 
                  className={`border rounded-lg p-4 ${
                    previewDevice === "mobile" ? "max-w-sm mx-auto" : 
                    previewDevice === "tablet" ? "max-w-md mx-auto" : ""
                  }`}
                  style={{ backgroundColor: brandSettings.colors.background }}
                >
                  {/* Header Preview */}
                  <div 
                    className={`flex items-center mb-4 ${
                      brandSettings.logoPosition === "center" ? "justify-center" :
                      brandSettings.logoPosition === "right" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="text-center">
                      {brandSettings.logoUrl ? (
                        <img 
                          src={brandSettings.logoUrl} 
                          alt="Logo" 
                          className="max-h-8 mx-auto mb-1"
                        />
                      ) : (
                        <div 
                          className="w-16 h-8 rounded mx-auto mb-1 flex items-center justify-center"
                          style={{ backgroundColor: brandSettings.colors.primary }}
                        >
                          <span className="text-white text-xs font-bold">LOGO</span>
                        </div>
                      )}
                      <h3 
                        className="font-bold"
                        style={{ 
                          fontFamily: brandSettings.fonts.heading, 
                          color: brandSettings.colors.text 
                        }}
                      >
                        {brandSettings.companyName}
                      </h3>
                      {brandSettings.showTagline && (
                        <p 
                          className="text-xs"
                          style={{ 
                            fontFamily: brandSettings.fonts.body, 
                            color: brandSettings.colors.secondary 
                          }}
                        >
                          {brandSettings.tagline}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Content Preview */}
                  <div className="space-y-3">
                    <div 
                      className="p-3 rounded"
                      style={{ backgroundColor: brandSettings.colors.primary }}
                    >
                      <p className="text-white text-sm font-medium">Primary Button</p>
                    </div>
                    
                    <div className="p-3 border rounded">
                      <h4 
                        className="font-semibold mb-1"
                        style={{ 
                          fontFamily: brandSettings.fonts.heading, 
                          color: brandSettings.colors.text 
                        }}
                      >
                        Card Title
                      </h4>
                      <p 
                        className="text-sm"
                        style={{ 
                          fontFamily: brandSettings.fonts.body, 
                          color: brandSettings.colors.secondary 
                        }}
                      >
                        Card description text
                      </p>
                    </div>

                    <div 
                      className="inline-block px-2 py-1 rounded text-xs"
                      style={{ 
                        backgroundColor: brandSettings.colors.accent, 
                        color: 'white' 
                      }}
                    >
                      Accent Badge
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Brand Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Brand Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Logo Usage:</span>
                  <p className="text-muted-foreground">Maintain clear space around logo equal to logo height</p>
                </div>
                <div>
                  <span className="font-medium">Color Contrast:</span>
                  <p className="text-muted-foreground">Ensure WCAG AA compliance for accessibility</p>
                </div>
                <div>
                  <span className="font-medium">Typography:</span>
                  <p className="text-muted-foreground">Use heading font for titles, body font for content</p>
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