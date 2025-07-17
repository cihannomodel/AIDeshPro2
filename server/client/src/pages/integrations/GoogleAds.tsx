import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Key, 
  Settings, 
  DollarSign, 
  Users,
  TrendingUp,
  Shield,
  Zap,
  TestTube,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  BarChart3,
  Eye,
  MousePointer,
  Globe,
  Filter,
  Plus,
  Edit,
  Copy,
  Play,
  Pause,
  Calendar
} from "lucide-react";
import { useModal } from "@/components/ui/modal";

const mockGoogleAdsData = {
  totalSpend: "$12,450",
  totalClicks: "8,765",
  impressions: "245,832",
  avgCPC: "$1.42",
  conversionRate: "3.8%",
  campaigns: [
    { 
      id: "CMP001", 
      name: "Summer Sale Campaign", 
      status: "active", 
      budget: "$500/day", 
      spend: "$1,234", 
      clicks: 892, 
      impressions: 15420, 
      ctr: "5.8%",
      cpc: "$1.38",
      conversions: 34
    },
    { 
      id: "CMP002", 
      name: "Brand Awareness", 
      status: "paused", 
      budget: "$300/day", 
      spend: "$834", 
      clicks: 567, 
      impressions: 12340, 
      ctr: "4.6%",
      cpc: "$1.47",
      conversions: 18
    },
    { 
      id: "CMP003", 
      name: "Product Launch", 
      status: "active", 
      budget: "$750/day", 
      spend: "$2,145", 
      clicks: 1234, 
      impressions: 28900, 
      ctr: "4.3%",
      cpc: "$1.74",
      conversions: 52
    },
  ],
  keywords: [
    { keyword: "premium software", matchType: "exact", quality: 8, cpc: "$2.45", position: 1.2 },
    { keyword: "business tools", matchType: "phrase", quality: 7, cpc: "$1.89", position: 2.1 },
    { keyword: "analytics platform", matchType: "broad", quality: 9, cpc: "$3.12", position: 1.8 },
    { keyword: "dashboard software", matchType: "exact", quality: 6, cpc: "$1.67", position: 3.2 },
  ],
  audiences: [
    { name: "Previous Customers", size: "12,450", performance: "high" },
    { name: "Similar Audiences", size: "45,230", performance: "medium" },
    { name: "Custom Intent", size: "8,960", performance: "high" },
    { name: "Demographics 25-44", size: "67,890", performance: "low" },
  ]
};

export default function GoogleAds() {
  const [adsConfig, setAdsConfig] = useState({
    customerId: "",
    apiKey: "",
    refreshToken: "",
    enabled: false,
    autoOptimization: true,
    smartBidding: true,
    audienceTargeting: true,
    conversionTracking: true
  });
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [keywordFilter, setKeywordFilter] = useState("all");
  const { showModal, ModalComponent } = useModal();

  const saveConfiguration = () => {
    showModal({
      title: "Google Ads Configuration Saved",
      message: "Your Google Ads settings have been saved successfully. Campaign data will sync automatically.",
      type: "success"
    });
  };

  const connectGoogleAds = () => {
    showModal({
      title: "Connect Google Ads",
      message: "This would redirect to Google OAuth to authorize access to your Google Ads account and campaigns.",
      type: "info"
    });
  };

  const createCampaign = () => {
    showModal({
      title: "Create New Campaign",
      message: "Campaign creation wizard would open, allowing you to set objectives, budgets, targeting, and ad groups.",
      type: "info"
    });
  };

  const pauseCampaign = (campaignId: string) => {
    showModal({
      title: "Campaign Paused",
      message: `Campaign ${campaignId} has been paused. All ads in this campaign will stop showing immediately.`,
      type: "success"
    });
  };

  const resumeCampaign = (campaignId: string) => {
    showModal({
      title: "Campaign Resumed",
      message: `Campaign ${campaignId} has been resumed. Ads will start showing according to your budget and schedule.`,
      type: "success"
    });
  };

  const optimizeCampaign = (campaignId: string) => {
    showModal({
      title: "AI Optimization Started",
      message: `AI-powered optimization has been applied to campaign ${campaignId}. Expected performance improvement: 15-25%.`,
      type: "success"
    });
  };

  const addKeyword = () => {
    showModal({
      title: "Add Keywords",
      message: "Keyword research tool would open with suggestions based on your campaigns and landing pages.",
      type: "info"
    });
  };

  const createAudience = () => {
    showModal({
      title: "Create Custom Audience",
      message: "Audience builder would open, allowing you to create targeted segments based on demographics, interests, and behaviors.",
      type: "info"
    });
  };

  return (
    <MainLayout title="Google Ads Integration">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Google Ads Integration</h1>
            <p className="text-muted-foreground mt-1">
              Manage campaigns, keywords, and advertising performance
            </p>
          </div>
          <Badge variant="secondary" className="px-3 py-1">
            <TestTube className="w-4 h-4 mr-1" />
            Demo Mode
          </Badge>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Spend</p>
                  <p className="text-2xl font-bold">{mockGoogleAdsData.totalSpend}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <MousePointer className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Clicks</p>
                  <p className="text-2xl font-bold">{mockGoogleAdsData.totalClicks}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Eye className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Impressions</p>
                  <p className="text-2xl font-bold">{mockGoogleAdsData.impressions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Target className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Avg CPC</p>
                  <p className="text-2xl font-bold">{mockGoogleAdsData.avgCPC}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-8 h-8 text-red-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Conv. Rate</p>
                  <p className="text-2xl font-bold">{mockGoogleAdsData.conversionRate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="configuration" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
            <TabsTrigger value="audiences">Audiences</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Configuration Tab */}
          <TabsContent value="configuration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="w-5 h-5 mr-2" />
                  Google Ads API Setup
                </CardTitle>
                <CardDescription>
                  Connect your Google Ads account and configure API access
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Customer ID</Label>
                    <Input 
                      placeholder="123-456-7890"
                      value={adsConfig.customerId}
                      onChange={(e) => setAdsConfig(prev => ({ ...prev, customerId: e.target.value }))}
                    />
                    <p className="text-xs text-muted-foreground">
                      Your Google Ads Customer ID (found in your account settings)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Developer Token</Label>
                    <Input 
                      type="password"
                      placeholder="Enter your developer token"
                      value={adsConfig.apiKey}
                      onChange={(e) => setAdsConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Refresh Token</Label>
                    <Input 
                      type="password"
                      placeholder="OAuth refresh token"
                      value={adsConfig.refreshToken}
                      onChange={(e) => setAdsConfig(prev => ({ ...prev, refreshToken: e.target.value }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable Integration</Label>
                      <p className="text-sm text-muted-foreground">
                        Activate Google Ads data synchronization
                      </p>
                    </div>
                    <Switch
                      checked={adsConfig.enabled}
                      onCheckedChange={(checked) => setAdsConfig(prev => ({ ...prev, enabled: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto Optimization</Label>
                      <p className="text-sm text-muted-foreground">
                        AI-powered campaign optimization
                      </p>
                    </div>
                    <Switch
                      checked={adsConfig.autoOptimization}
                      onCheckedChange={(checked) => setAdsConfig(prev => ({ ...prev, autoOptimization: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Smart Bidding</Label>
                      <p className="text-sm text-muted-foreground">
                        Automated bid optimization for conversions
                      </p>
                    </div>
                    <Switch
                      checked={adsConfig.smartBidding}
                      onCheckedChange={(checked) => setAdsConfig(prev => ({ ...prev, smartBidding: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Conversion Tracking</Label>
                      <p className="text-sm text-muted-foreground">
                        Track conversions and attribution
                      </p>
                    </div>
                    <Switch
                      checked={adsConfig.conversionTracking}
                      onCheckedChange={(checked) => setAdsConfig(prev => ({ ...prev, conversionTracking: checked }))}
                    />
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button onClick={connectGoogleAds} variant="outline">
                    <Globe className="w-4 h-4 mr-2" />
                    Connect Google Account
                  </Button>
                  <Button className="flex-1" onClick={saveConfiguration}>
                    <Settings className="w-4 h-4 mr-2" />
                    Save Configuration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Campaign Management</CardTitle>
                    <CardDescription>
                      Monitor and optimize your advertising campaigns
                    </CardDescription>
                  </div>
                  <Button onClick={createCampaign}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Campaign
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockGoogleAdsData.campaigns.map((campaign) => (
                    <div key={campaign.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            {campaign.status === 'active' && <Play className="w-5 h-5 text-green-500" />}
                            {campaign.status === 'paused' && <Pause className="w-5 h-5 text-yellow-500" />}
                          </div>
                          <div>
                            <h3 className="font-semibold">{campaign.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {campaign.id} • Budget: {campaign.budget}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={campaign.status === 'active' ? "default" : "secondary"}>
                            {campaign.status}
                          </Badge>
                          <Button size="sm" variant="ghost" onClick={() => optimizeCampaign(campaign.id)}>
                            <Zap className="w-3 h-3 mr-1" />
                            Optimize
                          </Button>
                          {campaign.status === 'active' ? (
                            <Button size="sm" variant="ghost" onClick={() => pauseCampaign(campaign.id)}>
                              <Pause className="w-3 h-3" />
                            </Button>
                          ) : (
                            <Button size="sm" variant="ghost" onClick={() => resumeCampaign(campaign.id)}>
                              <Play className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Spend</p>
                          <p className="font-semibold">{campaign.spend}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Clicks</p>
                          <p className="font-semibold">{campaign.clicks.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Impressions</p>
                          <p className="font-semibold">{campaign.impressions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">CTR</p>
                          <p className="font-semibold">{campaign.ctr}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">CPC</p>
                          <p className="font-semibold">{campaign.cpc}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Conversions</p>
                          <p className="font-semibold">{campaign.conversions}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Keywords Tab */}
          <TabsContent value="keywords" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Search className="w-5 h-5 mr-2" />
                      Keyword Management
                    </CardTitle>
                    <CardDescription>
                      Optimize keywords and monitor search performance
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                      <Filter className="w-4 h-4" />
                      <select 
                        className="p-2 border rounded-lg bg-background text-foreground text-sm"
                        value={keywordFilter}
                        onChange={(e) => setKeywordFilter(e.target.value)}
                      >
                        <option value="all">All Match Types</option>
                        <option value="exact">Exact Match</option>
                        <option value="phrase">Phrase Match</option>
                        <option value="broad">Broad Match</option>
                      </select>
                    </div>
                    <Button onClick={addKeyword}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Keywords
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockGoogleAdsData.keywords
                    .filter(keyword => keywordFilter === "all" || keyword.matchType === keywordFilter)
                    .map((keyword, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Search className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{keyword.keyword}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {keyword.matchType}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              Quality Score: {keyword.quality}/10
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="text-sm text-muted-foreground">CPC</p>
                            <p className="font-semibold">{keyword.cpc}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Avg Position</p>
                            <p className="font-semibold">{keyword.position}</p>
                          </div>
                          <Button size="sm" variant="ghost">
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audiences Tab */}
          <TabsContent value="audiences" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Audience Targeting
                    </CardTitle>
                    <CardDescription>
                      Manage audience segments and targeting options
                    </CardDescription>
                  </div>
                  <Button onClick={createAudience}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Audience
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockGoogleAdsData.audiences.map((audience, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{audience.name}</h3>
                        <Badge variant={
                          audience.performance === 'high' ? 'default' :
                          audience.performance === 'medium' ? 'secondary' : 'outline'
                        }>
                          {audience.performance} performance
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Audience Size:</span>
                          <span className="font-medium">{audience.size}</span>
                        </div>
                        <Progress 
                          value={
                            audience.performance === 'high' ? 85 :
                            audience.performance === 'medium' ? 60 : 35
                          } 
                          className="w-full" 
                        />
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Copy className="w-3 h-3 mr-1" />
                          Duplicate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Performance Reports
                </CardTitle>
                <CardDescription>
                  Analyze campaign performance and ROI metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-green-900 dark:text-green-100">ROAS</h4>
                    </div>
                    <p className="text-2xl font-bold text-green-600">4.2x</p>
                    <p className="text-sm text-green-700 dark:text-green-300">Return on Ad Spend</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100">CTR</h4>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">5.2%</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Click-through Rate</p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="w-5 h-5 text-purple-600" />
                      <h4 className="font-semibold text-purple-900 dark:text-purple-100">CPA</h4>
                    </div>
                    <p className="text-2xl font-bold text-purple-600">$23.45</p>
                    <p className="text-sm text-purple-700 dark:text-purple-300">Cost per Acquisition</p>
                  </div>
                </div>

                {/* Report Types */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Campaign Performance</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Detailed performance metrics for all active campaigns
                    </p>
                    <Button variant="outline" size="sm">
                      <Calendar className="w-3 h-3 mr-1" />
                      Generate Report
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Keyword Analysis</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Search term performance and optimization opportunities
                    </p>
                    <Button variant="outline" size="sm">
                      <Calendar className="w-3 h-3 mr-1" />
                      Generate Report
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Audience Insights</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Demographics and behavior analysis of your audiences
                    </p>
                    <Button variant="outline" size="sm">
                      <Calendar className="w-3 h-3 mr-1" />
                      Generate Report
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Conversion Tracking</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Attribution analysis and conversion path insights
                    </p>
                    <Button variant="outline" size="sm">
                      <Calendar className="w-3 h-3 mr-1" />
                      Generate Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <ModalComponent />
    </MainLayout>
  );
}