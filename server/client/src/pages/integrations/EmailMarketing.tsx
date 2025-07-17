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
  Mail, 
  Key, 
  Settings, 
  Users, 
  Send,
  TrendingUp,
  Eye,
  MousePointer,
  TestTube,
  Plus,
  Calendar,
  Copy,
  Edit,
  Filter,
  Layout,
  MoreHorizontal
} from "lucide-react";
import { useModal } from "@/components/ui/modal";

const mockEmailData = {
  totalSubscribers: "24,567",
  openRate: "28.5%",
  clickRate: "4.2%",
  unsubscribeRate: "0.8%",
  recentCampaigns: [
    { name: "Newsletter #45", sent: 15420, opened: 4386, clicked: 547, status: "Sent" },
    { name: "Product Launch", sent: 8943, opened: 2548, clicked: 389, status: "Sending" },
    { name: "Welcome Series", sent: 5672, opened: 1701, clicked: 235, status: "Draft" },
  ]
};

const emailTemplates = [
  {
    id: 1,
    name: "Welcome Email",
    category: "Onboarding",
    subject: "Welcome to our platform!",
    preview: "Thank you for joining us. Here's how to get started...",
    usage: 245,
    openRate: "85.2%",
    clickRate: "12.8%",
    thumbnail: "/api/placeholder/300/200"
  },
  {
    id: 2,
    name: "Newsletter Template",
    category: "Newsletter",
    subject: "Weekly Update - {{date}}",
    preview: "Here are this week's highlights and updates...",
    usage: 156,
    openRate: "32.4%",
    clickRate: "5.7%",
    thumbnail: "/api/placeholder/300/200"
  },
  {
    id: 3,
    name: "Product Launch",
    category: "Marketing",
    subject: "🚀 Introducing our latest feature",
    preview: "We're excited to announce our new product feature...",
    usage: 89,
    openRate: "45.6%",
    clickRate: "8.9%",
    thumbnail: "/api/placeholder/300/200"
  },
  {
    id: 4,
    name: "Cart Abandonment",
    category: "E-commerce",
    subject: "Don't forget your items!",
    preview: "You left some items in your cart. Complete your purchase...",
    usage: 123,
    openRate: "28.7%",
    clickRate: "15.2%",
    thumbnail: "/api/placeholder/300/200"
  },
  {
    id: 5,
    name: "Event Invitation",
    category: "Events",
    subject: "You're invited to {{event_name}}",
    preview: "Join us for an exclusive event on {{event_date}}...",
    usage: 67,
    openRate: "52.3%",
    clickRate: "18.4%",
    thumbnail: "/api/placeholder/300/200"
  },
  {
    id: 6,
    name: "Thank You Email",
    category: "Transactional",
    subject: "Thank you for your purchase!",
    preview: "Your order has been confirmed. Here are the details...",
    usage: 198,
    openRate: "78.9%",
    clickRate: "6.3%",
    thumbnail: "/api/placeholder/300/200"
  }
];

export default function EmailMarketing() {
  const [emailConfig, setEmailConfig] = useState({
    provider: "mailchimp",
    apiKey: "",
    listId: "",
    enabled: false,
    doubleOptIn: true,
    trackOpens: true,
    trackClicks: true
  });
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [templateFilter, setTemplateFilter] = useState("all");
  const { showModal, ModalComponent } = useModal();

  const saveConfiguration = () => {
    showModal({
      title: "Email Marketing Configuration Saved",
      message: "Your email marketing settings have been saved successfully. You can now start sending campaigns.",
      type: "success"
    });
  };

  const testConnection = () => {
    showModal({
      title: "Testing Email Provider Connection",
      message: "Verifying connection to your email marketing service... This would validate your API credentials in production.",
      type: "info"
    });
  };

  const createCampaign = () => {
    showModal({
      title: "Create New Campaign",
      message: "Campaign creation feature allows you to design and send email marketing campaigns. Configure your campaign details here.",
      type: "info"
    });
  };

  const importContacts = () => {
    showModal({
      title: "Import Contacts",
      message: "Contact import feature allows you to upload subscriber lists from CSV files or sync with external services.",
      type: "info"
    });
  };

  const useTemplate = (templateId: number) => {
    const template = emailTemplates.find(t => t.id === templateId);
    showModal({
      title: "Template Selected",
      message: `"${template?.name}" template has been loaded into the campaign editor. You can now customize the content and send to your subscribers.`,
      type: "success"
    });
  };

  const editTemplate = (templateId: number) => {
    const template = emailTemplates.find(t => t.id === templateId);
    showModal({
      title: "Edit Template",
      message: `Opening "${template?.name}" in the template editor. You can modify the design, content, and settings.`,
      type: "info"
    });
  };

  const createNewTemplate = () => {
    showModal({
      title: "Create New Template",
      message: "Opening the template builder where you can design custom email templates with drag-and-drop editor.",
      type: "info"
    });
  };

  const duplicateTemplate = (templateId: number) => {
    const template = emailTemplates.find(t => t.id === templateId);
    showModal({
      title: "Template Duplicated",
      message: `"${template?.name}" has been duplicated. You can now modify the copy without affecting the original template.`,
      type: "success"
    });
  };

  return (
    <MainLayout title="Email Marketing Integration">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Email Marketing Integration</h1>
            <p className="text-muted-foreground mt-1">
              Connect with Mailchimp, SendGrid, and other email services
            </p>
          </div>
          <Badge variant="secondary" className="px-3 py-1">
            <TestTube className="w-4 h-4 mr-1" />
            Demo Mode
          </Badge>
        </div>

        {/* Email Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Subscribers</p>
                  <p className="text-2xl font-bold">{mockEmailData.totalSubscribers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Eye className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Open Rate</p>
                  <p className="text-2xl font-bold">{mockEmailData.openRate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <MousePointer className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Click Rate</p>
                  <p className="text-2xl font-bold">{mockEmailData.clickRate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Unsubscribe Rate</p>
                  <p className="text-2xl font-bold">{mockEmailData.unsubscribeRate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="configuration" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          {/* Configuration Tab */}
          <TabsContent value="configuration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="w-5 h-5 mr-2" />
                  Email Service Configuration
                </CardTitle>
                <CardDescription>
                  Connect your email marketing service provider
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email Service Provider</Label>
                    <select 
                      className="w-full p-2 border rounded-lg bg-background text-foreground"
                      value={emailConfig.provider}
                      onChange={(e) => setEmailConfig(prev => ({ ...prev, provider: e.target.value }))}
                    >
                      <option value="mailchimp">Mailchimp</option>
                      <option value="sendgrid">SendGrid</option>
                      <option value="constant-contact">Constant Contact</option>
                      <option value="mailgun">Mailgun</option>
                      <option value="aws-ses">AWS SES</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <Input
                      id="api-key"
                      type="password"
                      placeholder="Enter your API key..."
                      value={emailConfig.apiKey}
                      onChange={(e) => setEmailConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                    />
                    <p className="text-xs text-muted-foreground">
                      Your {emailConfig.provider} API key from your account settings
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="list-id">Default List/Audience ID</Label>
                    <Input
                      id="list-id"
                      placeholder="List or audience ID..."
                      value={emailConfig.listId}
                      onChange={(e) => setEmailConfig(prev => ({ ...prev, listId: e.target.value }))}
                    />
                    <p className="text-xs text-muted-foreground">
                      The default mailing list for new subscribers
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Enable Email Marketing</Label>
                        <p className="text-sm text-muted-foreground">
                          Activate email marketing features
                        </p>
                      </div>
                      <Switch
                        checked={emailConfig.enabled}
                        onCheckedChange={(checked) => setEmailConfig(prev => ({ ...prev, enabled: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Double Opt-in</Label>
                        <p className="text-sm text-muted-foreground">
                          Require email confirmation for new subscribers
                        </p>
                      </div>
                      <Switch
                        checked={emailConfig.doubleOptIn}
                        onCheckedChange={(checked) => setEmailConfig(prev => ({ ...prev, doubleOptIn: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Track Opens</Label>
                        <p className="text-sm text-muted-foreground">
                          Track when emails are opened
                        </p>
                      </div>
                      <Switch
                        checked={emailConfig.trackOpens}
                        onCheckedChange={(checked) => setEmailConfig(prev => ({ ...prev, trackOpens: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Track Clicks</Label>
                        <p className="text-sm text-muted-foreground">
                          Track link clicks in emails
                        </p>
                      </div>
                      <Switch
                        checked={emailConfig.trackClicks}
                        onCheckedChange={(checked) => setEmailConfig(prev => ({ ...prev, trackClicks: checked }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1" onClick={saveConfiguration}>
                    <Settings className="w-4 h-4 mr-2" />
                    Save Configuration
                  </Button>
                  <Button variant="outline" onClick={testConnection}>
                    <Mail className="w-4 h-4 mr-2" />
                    Test Connection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Campaigns</CardTitle>
                <CardDescription>
                  Create and manage your email marketing campaigns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Recent Campaigns</h4>
                    <p className="text-sm text-muted-foreground">Manage your email campaigns</p>
                  </div>
                  <Button onClick={createCampaign}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Campaign
                  </Button>
                </div>

                <div className="space-y-4">
                  {mockEmailData.recentCampaigns.map((campaign, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{campaign.name}</h3>
                        <div className="flex space-x-4 text-sm text-muted-foreground mt-1">
                          <span>Sent: {campaign.sent.toLocaleString()}</span>
                          <span>Opened: {campaign.opened.toLocaleString()}</span>
                          <span>Clicked: {campaign.clicked.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          campaign.status === 'Sent' ? 'default' :
                          campaign.status === 'Sending' ? 'secondary' : 'outline'
                        }>
                          {campaign.status}
                        </Badge>
                        <div className="mt-2">
                          <Progress value={(campaign.opened / campaign.sent) * 100} className="w-20" />
                          <p className="text-xs text-muted-foreground mt-1">
                            {((campaign.opened / campaign.sent) * 100).toFixed(1)}% open rate
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscribers Tab */}
          <TabsContent value="subscribers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscriber Management</CardTitle>
                <CardDescription>
                  Manage your email subscriber lists and segments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Subscriber Lists</h4>
                    <p className="text-sm text-muted-foreground">Organize your email contacts</p>
                  </div>
                  <Button onClick={importContacts}>
                    <Plus className="w-4 h-4 mr-2" />
                    Import Contacts
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Main Newsletter</h3>
                    <p className="text-2xl font-bold text-blue-600">18,432</p>
                    <p className="text-sm text-muted-foreground">Active subscribers</p>
                    <Progress value={78} className="mt-2" />
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Product Updates</h3>
                    <p className="text-2xl font-bold text-green-600">6,135</p>
                    <p className="text-sm text-muted-foreground">Active subscribers</p>
                    <Progress value={45} className="mt-2" />
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900 dark:text-blue-100">Growth Rate</p>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Your subscriber list grew by 12% this month
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Layout className="w-5 h-5 mr-2" />
                      Email Templates Library
                    </CardTitle>
                    <CardDescription>
                      Professional email templates for every occasion
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                      <Filter className="w-4 h-4" />
                      <select 
                        className="p-2 border rounded-lg bg-background text-foreground text-sm"
                        value={templateFilter}
                        onChange={(e) => setTemplateFilter(e.target.value)}
                      >
                        <option value="all">All Categories</option>
                        <option value="onboarding">Onboarding</option>
                        <option value="newsletter">Newsletter</option>
                        <option value="marketing">Marketing</option>
                        <option value="e-commerce">E-commerce</option>
                        <option value="events">Events</option>
                        <option value="transactional">Transactional</option>
                      </select>
                    </div>
                    <Button onClick={createNewTemplate}>
                      <Plus className="w-4 h-4 mr-2" />
                      Create New Template
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {emailTemplates
                    .filter(template => templateFilter === "all" || template.category.toLowerCase() === templateFilter)
                    .map((template) => (
                    <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 flex items-center justify-center">
                        <img 
                          src={template.thumbnail} 
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-sm">{template.name}</h3>
                            <Badge variant="outline" className="text-xs mt-1">
                              {template.category}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => editTemplate(template.id)}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => duplicateTemplate(template.id)}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                          {template.preview}
                        </p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Usage:</span>
                            <span className="font-medium">{template.usage} campaigns</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Open Rate:</span>
                            <span className="font-medium text-green-600">{template.openRate}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Click Rate:</span>
                            <span className="font-medium text-blue-600">{template.clickRate}</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => useTemplate(template.id)}
                          >
                            <Send className="w-3 h-3 mr-1" />
                            Use Template
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => editTemplate(template.id)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {/* Template Categories Overview */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-lg">
                  <h4 className="font-semibold mb-4">Template Categories</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Mail className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-sm font-medium">Onboarding</p>
                      <p className="text-xs text-muted-foreground">Welcome emails</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="text-sm font-medium">Marketing</p>
                      <p className="text-xs text-muted-foreground">Promotional campaigns</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Calendar className="w-6 h-6 text-purple-600" />
                      </div>
                      <p className="text-sm font-medium">Events</p>
                      <p className="text-xs text-muted-foreground">Invitations & updates</p>
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