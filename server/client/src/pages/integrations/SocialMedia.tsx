import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Share2, 
  Key, 
  Settings, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Youtube,
  MessageCircle,
  Users,
  TrendingUp,
  Calendar,
  TestTube,
  RefreshCw,
  Send
} from "lucide-react";
import { useModal } from "@/components/ui/modal";

const mockSocialData = {
  facebook: {
    followers: "12.5K",
    posts: 156,
    engagement: "4.8%",
    reach: "89.2K"
  },
  twitter: {
    followers: "8.9K",
    posts: 342,
    engagement: "3.2%",
    reach: "45.7K"
  },
  instagram: {
    followers: "15.8K",
    posts: 89,
    engagement: "6.7%",
    reach: "123.4K"
  },
  linkedin: {
    followers: "3.2K",
    posts: 67,
    engagement: "2.8%",
    reach: "28.9K"
  }
};

const mockPosts = [
  {
    id: 1,
    platform: "Facebook",
    content: "Exciting news! Our new feature is now live...",
    status: "Published",
    likes: 234,
    shares: 45,
    comments: 12,
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    platform: "Twitter",
    content: "Just shipped a major update to our dashboard...",
    status: "Scheduled",
    likes: 89,
    shares: 23,
    comments: 7,
    timestamp: "Tomorrow 9:00 AM"
  },
  {
    id: 3,
    platform: "Instagram",
    content: "Behind the scenes look at our development process",
    status: "Draft",
    likes: 0,
    shares: 0,
    comments: 0,
    timestamp: "Draft"
  }
];

export default function SocialMedia() {
  const [connections, setConnections] = useState({
    facebook: false,
    twitter: false,
    instagram: false,
    linkedin: false,
    youtube: false
  });
  const [apiKeys, setApiKeys] = useState({
    facebook: { appId: "", appSecret: "", accessToken: "" },
    twitter: { apiKey: "", apiSecret: "", accessToken: "", accessTokenSecret: "" },
    instagram: { accessToken: "", clientId: "", clientSecret: "" },
    linkedin: { clientId: "", clientSecret: "", redirectUri: "" },
    youtube: { apiKey: "", clientId: "", clientSecret: "" }
  });
  const [postContent, setPostContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const { showModal, ModalComponent } = useModal();

  const connectPlatform = (platform: string) => {
    setConnections(prev => ({ ...prev, [platform]: !prev[platform as keyof typeof prev] }));
    showModal({
      title: `${platform.charAt(0).toUpperCase() + platform.slice(1)} Connection`,
      message: `${connections[platform as keyof typeof connections] ? 'Disconnected from' : 'Connected to'} ${platform}. Your social media integration is now ${connections[platform as keyof typeof connections] ? 'disabled' : 'active'}.`,
      type: "success"
    });
  };

  const saveApiConfiguration = () => {
    showModal({
      title: "API Configuration Saved",
      message: "Your social media API settings have been saved successfully. You can now connect to your platforms.",
      type: "success"
    });
  };

  const testApiConnection = (platform: string) => {
    showModal({
      title: `Testing ${platform} Connection`,
      message: `Testing API connection to ${platform}... This is a demo - in production, this would verify your API credentials.`,
      type: "info"
    });
  };

  const schedulePost = () => {
    showModal({
      title: "Post Scheduled",
      message: `Your post has been scheduled for ${selectedPlatforms.join(', ')}. It will be published according to your settings.`,
      type: "success"
    });
  };

  const publishNow = () => {
    showModal({
      title: "Post Published",
      message: `Your content has been published to ${selectedPlatforms.join(', ')} successfully. Monitor engagement from the Analytics tab.`,
      type: "success"
    });
  };

  const syncData = () => {
    showModal({
      title: "Syncing Social Media Data",
      message: "Fetching latest metrics from all connected platforms. This may take a few moments...",
      type: "info"
    });
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  return (
    <MainLayout title="Social Media Integration">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Social Media Integration</h1>
            <p className="text-muted-foreground mt-1">
              Manage all your social media accounts from one dashboard
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="px-3 py-1">
              <TestTube className="w-4 h-4 mr-1" />
              Demo Mode
            </Badge>
            <Button variant="outline" onClick={syncData}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync Data
            </Button>
          </div>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Facebook className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Facebook</p>
                  <p className="text-2xl font-bold">{mockSocialData.facebook.followers}</p>
                  <p className="text-xs text-muted-foreground">{mockSocialData.facebook.engagement} engagement</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Twitter className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-sm text-muted-foreground">Twitter</p>
                  <p className="text-2xl font-bold">{mockSocialData.twitter.followers}</p>
                  <p className="text-xs text-muted-foreground">{mockSocialData.twitter.engagement} engagement</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Instagram className="w-8 h-8 text-pink-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Instagram</p>
                  <p className="text-2xl font-bold">{mockSocialData.instagram.followers}</p>
                  <p className="text-xs text-muted-foreground">{mockSocialData.instagram.engagement} engagement</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Linkedin className="w-8 h-8 text-blue-700" />
                <div>
                  <p className="text-sm text-muted-foreground">LinkedIn</p>
                  <p className="text-2xl font-bold">{mockSocialData.linkedin.followers}</p>
                  <p className="text-xs text-muted-foreground">{mockSocialData.linkedin.engagement} engagement</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="api-config" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="api-config">API Configuration</TabsTrigger>
            <TabsTrigger value="connections">Connections</TabsTrigger>
            <TabsTrigger value="composer">Post Composer</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Posts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* API Configuration Tab */}
          <TabsContent value="api-config" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="w-5 h-5 mr-2" />
                  API Keys & Configuration
                </CardTitle>
                <CardDescription>
                  Configure your social media platform API keys and authentication settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Facebook API Configuration */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Facebook className="w-6 h-6 text-blue-600" />
                    <h4 className="font-semibold">Facebook API Configuration</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="facebook-app-id">App ID</Label>
                      <Input
                        id="facebook-app-id"
                        placeholder="Your Facebook App ID"
                        value={apiKeys.facebook.appId}
                        onChange={(e) => setApiKeys(prev => ({
                          ...prev,
                          facebook: { ...prev.facebook, appId: e.target.value }
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="facebook-app-secret">App Secret</Label>
                      <Input
                        id="facebook-app-secret"
                        type="password"
                        placeholder="Your Facebook App Secret"
                        value={apiKeys.facebook.appSecret}
                        onChange={(e) => setApiKeys(prev => ({
                          ...prev,
                          facebook: { ...prev.facebook, appSecret: e.target.value }
                        }))}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="facebook-access-token">Page Access Token</Label>
                      <Input
                        id="facebook-access-token"
                        type="password"
                        placeholder="Your Facebook Page Access Token"
                        value={apiKeys.facebook.accessToken}
                        onChange={(e) => setApiKeys(prev => ({
                          ...prev,
                          facebook: { ...prev.facebook, accessToken: e.target.value }
                        }))}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => testApiConnection('Facebook')}>
                      <TestTube className="w-4 h-4 mr-2" />
                      Test Connection
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Twitter API Configuration */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Twitter className="w-6 h-6 text-blue-400" />
                    <h4 className="font-semibold">Twitter API Configuration</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="twitter-api-key">API Key</Label>
                      <Input
                        id="twitter-api-key"
                        type="password"
                        placeholder="Your Twitter API Key"
                        value={apiKeys.twitter.apiKey}
                        onChange={(e) => setApiKeys(prev => ({
                          ...prev,
                          twitter: { ...prev.twitter, apiKey: e.target.value }
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter-api-secret">API Secret</Label>
                      <Input
                        id="twitter-api-secret"
                        type="password"
                        placeholder="Your Twitter API Secret"
                        value={apiKeys.twitter.apiSecret}
                        onChange={(e) => setApiKeys(prev => ({
                          ...prev,
                          twitter: { ...prev.twitter, apiSecret: e.target.value }
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter-access-token">Access Token</Label>
                      <Input
                        id="twitter-access-token"
                        type="password"
                        placeholder="Your Twitter Access Token"
                        value={apiKeys.twitter.accessToken}
                        onChange={(e) => setApiKeys(prev => ({
                          ...prev,
                          twitter: { ...prev.twitter, accessToken: e.target.value }
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter-access-secret">Access Token Secret</Label>
                      <Input
                        id="twitter-access-secret"
                        type="password"
                        placeholder="Your Twitter Access Token Secret"
                        value={apiKeys.twitter.accessTokenSecret}
                        onChange={(e) => setApiKeys(prev => ({
                          ...prev,
                          twitter: { ...prev.twitter, accessTokenSecret: e.target.value }
                        }))}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => testApiConnection('Twitter')}>
                      <TestTube className="w-4 h-4 mr-2" />
                      Test Connection
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Instagram API Configuration */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Instagram className="w-6 h-6 text-pink-500" />
                    <h4 className="font-semibold">Instagram API Configuration</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="instagram-client-id">Client ID</Label>
                      <Input
                        id="instagram-client-id"
                        placeholder="Your Instagram Client ID"
                        value={apiKeys.instagram.clientId}
                        onChange={(e) => setApiKeys(prev => ({
                          ...prev,
                          instagram: { ...prev.instagram, clientId: e.target.value }
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instagram-client-secret">Client Secret</Label>
                      <Input
                        id="instagram-client-secret"
                        type="password"
                        placeholder="Your Instagram Client Secret"
                        value={apiKeys.instagram.clientSecret}
                        onChange={(e) => setApiKeys(prev => ({
                          ...prev,
                          instagram: { ...prev.instagram, clientSecret: e.target.value }
                        }))}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="instagram-access-token">Access Token</Label>
                      <Input
                        id="instagram-access-token"
                        type="password"
                        placeholder="Your Instagram Access Token"
                        value={apiKeys.instagram.accessToken}
                        onChange={(e) => setApiKeys(prev => ({
                          ...prev,
                          instagram: { ...prev.instagram, accessToken: e.target.value }
                        }))}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => testApiConnection('Instagram')}>
                      <TestTube className="w-4 h-4 mr-2" />
                      Test Connection
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* LinkedIn API Configuration */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Linkedin className="w-6 h-6 text-blue-700" />
                    <h4 className="font-semibold">LinkedIn API Configuration</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="linkedin-client-id">Client ID</Label>
                      <Input
                        id="linkedin-client-id"
                        placeholder="Your LinkedIn Client ID"
                        value={apiKeys.linkedin.clientId}
                        onChange={(e) => setApiKeys(prev => ({
                          ...prev,
                          linkedin: { ...prev.linkedin, clientId: e.target.value }
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin-client-secret">Client Secret</Label>
                      <Input
                        id="linkedin-client-secret"
                        type="password"
                        placeholder="Your LinkedIn Client Secret"
                        value={apiKeys.linkedin.clientSecret}
                        onChange={(e) => setApiKeys(prev => ({
                          ...prev,
                          linkedin: { ...prev.linkedin, clientSecret: e.target.value }
                        }))}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="linkedin-redirect-uri">Redirect URI</Label>
                      <Input
                        id="linkedin-redirect-uri"
                        placeholder="https://yourdomain.com/auth/linkedin/callback"
                        value={apiKeys.linkedin.redirectUri}
                        onChange={(e) => setApiKeys(prev => ({
                          ...prev,
                          linkedin: { ...prev.linkedin, redirectUri: e.target.value }
                        }))}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => testApiConnection('LinkedIn')}>
                      <TestTube className="w-4 h-4 mr-2" />
                      Test Connection
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* YouTube API Configuration */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Youtube className="w-6 h-6 text-red-600" />
                    <h4 className="font-semibold">YouTube API Configuration</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="youtube-api-key">API Key</Label>
                      <Input
                        id="youtube-api-key"
                        type="password"
                        placeholder="Your YouTube API Key"
                        value={apiKeys.youtube.apiKey}
                        onChange={(e) => setApiKeys(prev => ({
                          ...prev,
                          youtube: { ...prev.youtube, apiKey: e.target.value }
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="youtube-client-id">Client ID</Label>
                      <Input
                        id="youtube-client-id"
                        placeholder="Your YouTube Client ID"
                        value={apiKeys.youtube.clientId}
                        onChange={(e) => setApiKeys(prev => ({
                          ...prev,
                          youtube: { ...prev.youtube, clientId: e.target.value }
                        }))}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="youtube-client-secret">Client Secret</Label>
                      <Input
                        id="youtube-client-secret"
                        type="password"
                        placeholder="Your YouTube Client Secret"
                        value={apiKeys.youtube.clientSecret}
                        onChange={(e) => setApiKeys(prev => ({
                          ...prev,
                          youtube: { ...prev.youtube, clientSecret: e.target.value }
                        }))}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => testApiConnection('YouTube')}>
                      <TestTube className="w-4 h-4 mr-2" />
                      Test Connection
                    </Button>
                  </div>
                </div>

                {/* Save Configuration */}
                <div className="flex justify-end space-x-2 pt-4">
                  <Button onClick={saveApiConfiguration}>
                    <Settings className="w-4 h-4 mr-2" />
                    Save All Configurations
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Connections Tab */}
          <TabsContent value="connections" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="w-5 h-5 mr-2" />
                  Platform Connections
                </CardTitle>
                <CardDescription>
                  Connect your social media accounts to manage them from here
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {/* Facebook */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Facebook className="w-8 h-8 text-blue-600" />
                      <div>
                        <h3 className="font-semibold">Facebook</h3>
                        <p className="text-sm text-muted-foreground">Connect your Facebook Page</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={connections.facebook ? "default" : "secondary"}>
                        {connections.facebook ? "Connected" : "Disconnected"}
                      </Badge>
                      <Button 
                        variant={connections.facebook ? "outline" : "default"}
                        onClick={() => connectPlatform('facebook')}
                      >
                        {connections.facebook ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  </div>

                  {/* Twitter */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Twitter className="w-8 h-8 text-blue-400" />
                      <div>
                        <h3 className="font-semibold">Twitter</h3>
                        <p className="text-sm text-muted-foreground">Connect your Twitter account</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={connections.twitter ? "default" : "secondary"}>
                        {connections.twitter ? "Connected" : "Disconnected"}
                      </Badge>
                      <Button 
                        variant={connections.twitter ? "outline" : "default"}
                        onClick={() => connectPlatform('twitter')}
                      >
                        {connections.twitter ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  </div>

                  {/* Instagram */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Instagram className="w-8 h-8 text-pink-500" />
                      <div>
                        <h3 className="font-semibold">Instagram</h3>
                        <p className="text-sm text-muted-foreground">Connect your Instagram Business account</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={connections.instagram ? "default" : "secondary"}>
                        {connections.instagram ? "Connected" : "Disconnected"}
                      </Badge>
                      <Button 
                        variant={connections.instagram ? "outline" : "default"}
                        onClick={() => connectPlatform('instagram')}
                      >
                        {connections.instagram ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Linkedin className="w-8 h-8 text-blue-700" />
                      <div>
                        <h3 className="font-semibold">LinkedIn</h3>
                        <p className="text-sm text-muted-foreground">Connect your LinkedIn Company Page</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={connections.linkedin ? "default" : "secondary"}>
                        {connections.linkedin ? "Connected" : "Disconnected"}
                      </Badge>
                      <Button 
                        variant={connections.linkedin ? "outline" : "default"}
                        onClick={() => connectPlatform('linkedin')}
                      >
                        {connections.linkedin ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  </div>

                  {/* YouTube */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Youtube className="w-8 h-8 text-red-500" />
                      <div>
                        <h3 className="font-semibold">YouTube</h3>
                        <p className="text-sm text-muted-foreground">Connect your YouTube Channel</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={connections.youtube ? "default" : "secondary"}>
                        {connections.youtube ? "Connected" : "Disconnected"}
                      </Badge>
                      <Button 
                        variant={connections.youtube ? "outline" : "default"}
                        onClick={() => connectPlatform('youtube')}
                      >
                        {connections.youtube ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Post Composer Tab */}
          <TabsContent value="composer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Create New Post
                </CardTitle>
                <CardDescription>
                  Compose and schedule posts for multiple platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Platforms</Label>
                    <div className="flex flex-wrap gap-2">
                      {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((platform) => (
                        <Button
                          key={platform}
                          variant={selectedPlatforms.includes(platform) ? "default" : "outline"}
                          size="sm"
                          onClick={() => togglePlatform(platform)}
                        >
                          {platform}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="post-content">Post Content</Label>
                    <textarea
                      id="post-content"
                      placeholder="What's on your mind?"
                      className="w-full min-h-32 p-3 border rounded-lg resize-none bg-background text-foreground"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      {postContent.length}/280 characters
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Schedule Date</Label>
                      <Input type="datetime-local" />
                    </div>
                    <div className="space-y-2">
                      <Label>Time Zone</Label>
                      <select className="w-full p-2 border rounded-lg bg-background text-foreground">
                        <option>UTC-5 (Eastern)</option>
                        <option>UTC-8 (Pacific)</option>
                        <option>UTC+0 (GMT)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex space-x-2">
                  <Button className="flex-1" onClick={publishNow} disabled={!selectedPlatforms.length}>
                    <Send className="w-4 h-4 mr-2" />
                    Publish Now
                  </Button>
                  <Button variant="outline" onClick={schedulePost} disabled={!selectedPlatforms.length}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Post
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scheduled Posts Tab */}
          <TabsContent value="scheduled" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled & Recent Posts</CardTitle>
                <CardDescription>
                  Manage your scheduled and published content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline">{post.platform}</Badge>
                          <Badge variant={
                            post.status === 'Published' ? 'default' :
                            post.status === 'Scheduled' ? 'secondary' : 'outline'
                          }>
                            {post.status}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium">{post.content}</p>
                        <p className="text-xs text-muted-foreground mt-1">{post.timestamp}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex space-x-4 text-sm text-muted-foreground">
                          <span>{post.likes} likes</span>
                          <span>{post.shares} shares</span>
                          <span>{post.comments} comments</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Social Media Analytics</CardTitle>
                <CardDescription>
                  Track performance across all your social media platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  {Object.entries(mockSocialData).map(([platform, data]) => (
                    <div key={platform} className="p-4 border rounded-lg">
                      <h3 className="font-semibold capitalize mb-3">{platform}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Followers</span>
                          <span className="font-medium">{data.followers}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Posts</span>
                          <span className="font-medium">{data.posts}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Engagement</span>
                          <span className="font-medium">{data.engagement}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Reach</span>
                          <span className="font-medium">{data.reach}</span>
                        </div>
                        <Progress value={parseFloat(data.engagement)} className="mt-2" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900 dark:text-blue-100">Overall Performance</p>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Your social media engagement is up 23% this month
                      </p>
                    </div>
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