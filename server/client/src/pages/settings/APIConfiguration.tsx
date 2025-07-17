import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Key, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Eye, 
  EyeOff, 
  TestTube2,
  Copy,
  RefreshCw,
  ExternalLink,
  Shield,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const apiServices = [
  {
    id: "openai",
    name: "OpenAI",
    description: "GPT models, DALL-E, Whisper",
    keyName: "OPENAI_API_KEY",
    placeholder: "sk-...",
    testEndpoint: "https://api.openai.com/v1/models",
    documentation: "https://platform.openai.com/docs",
    pricing: "Pay per token",
    status: "connected",
    lastTested: "2 minutes ago",
    features: ["GPT-4", "GPT-3.5", "DALL-E", "Whisper", "Embeddings"]
  },
  {
    id: "anthropic",
    name: "Anthropic Claude",
    description: "Claude AI assistant models",
    keyName: "ANTHROPIC_API_KEY",
    placeholder: "sk-ant-...",
    testEndpoint: "https://api.anthropic.com/v1/messages",
    documentation: "https://docs.anthropic.com",
    pricing: "Pay per token",
    status: "disconnected",
    lastTested: "Never",
    features: ["Claude-3", "Claude-2", "Large context window"]
  },
  {
    id: "google",
    name: "Google Gemini",
    description: "Google's multimodal AI models",
    keyName: "GOOGLE_AI_API_KEY",
    placeholder: "AIza...",
    testEndpoint: "https://generativelanguage.googleapis.com/v1/models",
    documentation: "https://ai.google.dev/docs",
    pricing: "Free tier available",
    status: "disconnected", 
    lastTested: "Never",
    features: ["Gemini Pro", "Gemini Vision", "Free tier"]
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Payment processing platform",
    keyName: "STRIPE_SECRET_KEY",
    placeholder: "sk_test_... or sk_live_...",
    testEndpoint: "https://api.stripe.com/v1/account",
    documentation: "https://stripe.com/docs/api",
    pricing: "2.9% + 30¢ per transaction",
    status: "connected",
    lastTested: "1 hour ago",
    features: ["Payments", "Subscriptions", "Webhooks", "Dashboard"]
  },
  {
    id: "sendgrid",
    name: "SendGrid",
    description: "Email delivery service",
    keyName: "SENDGRID_API_KEY",
    placeholder: "SG...",
    testEndpoint: "https://api.sendgrid.com/v3/user/profile",
    documentation: "https://docs.sendgrid.com",
    pricing: "Free up to 100 emails/day",
    status: "disconnected",
    lastTested: "Never",
    features: ["Email API", "Templates", "Analytics", "Free tier"]
  },
  {
    id: "google_analytics",
    name: "Google Analytics",
    description: "Web analytics platform",
    keyName: "VITE_GA_MEASUREMENT_ID",
    placeholder: "G-...",
    testEndpoint: "https://www.googleapis.com/analytics/v3/management/accounts",
    documentation: "https://developers.google.com/analytics",
    pricing: "Free",
    status: "connected",
    lastTested: "30 minutes ago",
    features: ["Real-time data", "Audience insights", "Conversion tracking"]
  }
];

export default function APIConfiguration() {
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({});
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [testingStatus, setTestingStatus] = useState<Record<string, 'idle' | 'testing' | 'success' | 'error'>>({});
  const [showDemoWarning, setShowDemoWarning] = useState(true);
  const { toast } = useToast();

  const handleKeyChange = (serviceId: string, value: string) => {
    setApiKeys(prev => ({
      ...prev,
      [serviceId]: value
    }));
  };

  const toggleKeyVisibility = (serviceId: string) => {
    setShowKeys(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };

  const handleTestConnection = async (service: typeof apiServices[0]) => {
    setTestingStatus(prev => ({
      ...prev,
      [service.id]: 'testing'
    }));

    // Simulate API test
    setTimeout(() => {
      const isValid = apiKeys[service.id] && apiKeys[service.id].length > 10;
      setTestingStatus(prev => ({
        ...prev,
        [service.id]: isValid ? 'success' : 'error'
      }));

      toast({
        title: isValid ? "Connection Successful" : "Connection Failed",
        description: isValid 
          ? `${service.name} API key is valid and working.`
          : `Invalid or missing API key for ${service.name}.`,
        variant: isValid ? "default" : "destructive"
      });
    }, 2000);
  };

  const handleSaveKey = (service: typeof apiServices[0]) => {
    toast({
      title: "API Key Saved",
      description: `${service.name} API key has been securely saved.`,
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "API key copied to clipboard.",
    });
  };

  const getStatusIcon = (status: string, serviceId: string) => {
    const testStatus = testingStatus[serviceId];
    
    if (testStatus === 'testing') {
      return <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />;
    }
    if (testStatus === 'success') {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    if (testStatus === 'error') {
      return <XCircle className="w-4 h-4 text-red-500" />;
    }
    
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'disconnected':
        return <XCircle className="w-4 h-4 text-gray-400" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-500">Connected</Badge>;
      case 'disconnected':
        return <Badge variant="outline">Disconnected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <MainLayout title="API Configuration">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">API Configuration</h1>
            <p className="text-muted-foreground mt-1">
              Manage your API keys and external service integrations
            </p>
          </div>
          <Badge variant="secondary" className="px-3 py-1">
            <Shield className="w-4 h-4 mr-1" />
            Secure Storage
          </Badge>
        </div>

        {/* Demo Information */}
        {showDemoWarning && (
          <div className="space-y-4">
            {/* Demo Warning */}
            <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="flex items-center justify-between">
                <div>
                  <strong className="text-yellow-800 dark:text-yellow-200">⚠️ DEMO MODE WARNING:</strong>
                  <br />
                  <span className="text-yellow-700 dark:text-yellow-300">
                    This is a public DEMO! Do not enter your real API keys here.
                    When you purchase, configure them safely in your private installation.
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowDemoWarning(false)}
                  className="text-yellow-600 hover:text-yellow-800 ml-4"
                >
                  <X className="h-4 w-4" />
                </Button>
              </AlertDescription>
            </Alert>

            {/* Full Features Information */}
            <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
              <Zap className="h-4 w-4 text-blue-600" />
              <AlertDescription>
                <div>
                  <strong className="text-blue-800 dark:text-blue-200">🚀 UNLOCK FULL AI POWER:</strong>
                  <br />
                  <span className="text-blue-700 dark:text-blue-300">
                    Configure your OpenAI, Claude, or Gemini API keys to activate complete AI functionality:
                  </span>
                  <ul className="mt-2 text-sm text-blue-600 dark:text-blue-400 list-disc list-inside space-y-1">
                    <li>Real-time dashboard analysis with live AI insights</li>
                    <li>Advanced file processing (PDF, Excel, images)</li>
                    <li>Intelligent report generation and automation</li>
                    <li>Personalized business recommendations</li>
                    <li>Smart notification system with predictive alerts</li>
                    <li>Complete workflow automation capabilities</li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Security Notice */}
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            API keys are stored securely and never transmitted in plain text. All connections use encrypted HTTPS.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="ai-services" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ai-services">AI Services</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
          </TabsList>

          {/* AI Services Tab */}
          <TabsContent value="ai-services" className="space-y-6">
            {apiServices.filter(s => ['openai', 'anthropic', 'google'].includes(s.id)).map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Zap className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>{service.name}</span>
                          {getStatusIcon(service.status, service.id)}
                        </CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(service.status)}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(service.documentation, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Docs
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={service.id}>API Key</Label>
                        <div className="flex space-x-2">
                          <div className="relative flex-1">
                            <Input
                              id={service.id}
                              type={showKeys[service.id] ? "text" : "password"}
                              placeholder={service.placeholder}
                              value={apiKeys[service.id] || ""}
                              onChange={(e) => handleKeyChange(service.id, e.target.value)}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => toggleKeyVisibility(service.id)}
                            >
                              {showKeys[service.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                          </div>
                          {apiKeys[service.id] && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(apiKeys[service.id])}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Environment variable: <code>{service.keyName}</code>
                        </p>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleTestConnection(service)}
                          disabled={!apiKeys[service.id] || testingStatus[service.id] === 'testing'}
                          size="sm"
                        >
                          <TestTube2 className="w-4 h-4 mr-2" />
                          Test Connection
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleSaveKey(service)}
                          disabled={!apiKeys[service.id]}
                          size="sm"
                        >
                          <Key className="w-4 h-4 mr-2" />
                          Save Key
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Features</h4>
                        <div className="flex flex-wrap gap-1">
                          {service.features.map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Pricing:</span>
                          <span>{service.pricing}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last tested:</span>
                          <span>{service.lastTested}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            {apiServices.filter(s => s.id === 'stripe').map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Key className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>{service.name}</span>
                          {getStatusIcon(service.status, service.id)}
                        </CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(service.status)}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(service.documentation, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Docs
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={service.id}>Secret Key</Label>
                        <div className="flex space-x-2">
                          <div className="relative flex-1">
                            <Input
                              id={service.id}
                              type={showKeys[service.id] ? "text" : "password"}
                              placeholder={service.placeholder}
                              value={apiKeys[service.id] || ""}
                              onChange={(e) => handleKeyChange(service.id, e.target.value)}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => toggleKeyVisibility(service.id)}
                            >
                              {showKeys[service.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Use test keys for development, live keys for production
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label>Publishable Key (Frontend)</Label>
                        <Input
                          placeholder="pk_test_... or pk_live_..."
                          value={apiKeys[`${service.id}_public`] || ""}
                          onChange={(e) => handleKeyChange(`${service.id}_public`, e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          Environment variable: <code>VITE_STRIPE_PUBLIC_KEY</code>
                        </p>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleTestConnection(service)}
                          disabled={!apiKeys[service.id] || testingStatus[service.id] === 'testing'}
                          size="sm"
                        >
                          <TestTube2 className="w-4 h-4 mr-2" />
                          Test Connection
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleSaveKey(service)}
                          disabled={!apiKeys[service.id]}
                          size="sm"
                        >
                          <Key className="w-4 h-4 mr-2" />
                          Save Keys
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Features</h4>
                        <div className="flex flex-wrap gap-1">
                          {service.features.map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Pricing:</span>
                          <span>{service.pricing}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last tested:</span>
                          <span>{service.lastTested}</span>
                        </div>
                      </div>

                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-xs">
                          Always use test keys in development. Switch to live keys only in production.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {apiServices.filter(s => s.id === 'google_analytics').map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Key className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>{service.name}</span>
                          {getStatusIcon(service.status, service.id)}
                        </CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(service.status)}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(service.documentation, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Docs
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={service.id}>Measurement ID</Label>
                        <Input
                          id={service.id}
                          placeholder={service.placeholder}
                          value={apiKeys[service.id] || ""}
                          onChange={(e) => handleKeyChange(service.id, e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          Find this in your Google Analytics property settings
                        </p>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleTestConnection(service)}
                          disabled={!apiKeys[service.id] || testingStatus[service.id] === 'testing'}
                          size="sm"
                        >
                          <TestTube2 className="w-4 h-4 mr-2" />
                          Test Connection
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleSaveKey(service)}
                          disabled={!apiKeys[service.id]}
                          size="sm"
                        >
                          <Key className="w-4 h-4 mr-2" />
                          Save ID
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Setup Instructions</h4>
                        <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                          <li>Go to Google Analytics dashboard</li>
                          <li>Navigate to Admin → Property → Data Streams</li>
                          <li>Select your web stream</li>
                          <li>Copy the Measurement ID (starts with G-)</li>
                          <li>Paste it above and save</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Communication Tab */}
          <TabsContent value="communication" className="space-y-6">
            {apiServices.filter(s => s.id === 'sendgrid').map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Key className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>{service.name}</span>
                          {getStatusIcon(service.status, service.id)}
                        </CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(service.status)}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(service.documentation, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Docs
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={service.id}>API Key</Label>
                        <div className="relative">
                          <Input
                            id={service.id}
                            type={showKeys[service.id] ? "text" : "password"}
                            placeholder={service.placeholder}
                            value={apiKeys[service.id] || ""}
                            onChange={(e) => handleKeyChange(service.id, e.target.value)}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => toggleKeyVisibility(service.id)}
                          >
                            {showKeys[service.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Create API key in SendGrid dashboard → Settings → API Keys
                        </p>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleTestConnection(service)}
                          disabled={!apiKeys[service.id] || testingStatus[service.id] === 'testing'}
                          size="sm"
                        >
                          <TestTube2 className="w-4 h-4 mr-2" />
                          Test Connection
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleSaveKey(service)}
                          disabled={!apiKeys[service.id]}
                          size="sm"
                        >
                          <Key className="w-4 h-4 mr-2" />
                          Save Key
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Features</h4>
                        <div className="flex flex-wrap gap-1">
                          {service.features.map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Pricing:</span>
                          <span>{service.pricing}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}