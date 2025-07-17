import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Key, 
  Zap, 
  Settings, 
  MessageSquare, 
  FileText, 
  Image, 
  Mic, 
  TestTube,
  Activity,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Copy,
  Play,
  RefreshCw
} from "lucide-react";
import { useModal } from "@/components/ui/modal";

const mockApiModels = [
  { id: "gpt-4o", name: "GPT-4O", provider: "OpenAI", type: "chat", cost: "$0.03/1K tokens", description: "Most advanced GPT model with enhanced reasoning", maxTokens: "128k" },
  { id: "gpt-4o-mini", name: "GPT-4O Mini", provider: "OpenAI", type: "chat", cost: "$0.0015/1K tokens", description: "Smaller, faster version of GPT-4O", maxTokens: "128k" },
  { id: "gpt-4-turbo", name: "GPT-4 Turbo", provider: "OpenAI", type: "chat", cost: "$0.01/1K tokens", description: "Fast and efficient version of GPT-4", maxTokens: "128k" },
  { id: "gpt-4", name: "GPT-4", provider: "OpenAI", type: "chat", cost: "$0.06/1K tokens", description: "High-quality text generation and analysis", maxTokens: "8k" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", provider: "OpenAI", type: "chat", cost: "$0.002/1K tokens", description: "Fast and efficient for most tasks", maxTokens: "16k" },
  { id: "claude-3.5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic", type: "chat", cost: "$0.015/1K tokens", description: "Latest and most capable Claude model", maxTokens: "200k" },
  { id: "claude-3-opus", name: "Claude 3 Opus", provider: "Anthropic", type: "chat", cost: "$0.075/1K tokens", description: "Anthropic's most powerful model", maxTokens: "200k" },
  { id: "claude-3-sonnet", name: "Claude 3 Sonnet", provider: "Anthropic", type: "chat", cost: "$0.015/1K tokens", description: "Balanced performance and speed", maxTokens: "200k" },
  { id: "claude-3-haiku", name: "Claude 3 Haiku", provider: "Anthropic", type: "chat", cost: "$0.0025/1K tokens", description: "Fastest Claude model", maxTokens: "200k" },
  { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro", provider: "Google", type: "chat", cost: "$0.0125/1K tokens", description: "Google's flagship multimodal model", maxTokens: "2M" },
  { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash", provider: "Google", type: "chat", cost: "$0.00075/1K tokens", description: "Fast and efficient Gemini model", maxTokens: "1M" },
  { id: "gemini-pro-vision", name: "Gemini Pro Vision", provider: "Google", type: "vision", cost: "$0.0025/1K tokens", description: "Advanced vision understanding", maxTokens: "30k" },
  { id: "dalle-3", name: "DALL-E 3", provider: "OpenAI", type: "image", cost: "$0.08/image", description: "Advanced AI image generation", maxTokens: "N/A" },
  { id: "dalle-2", name: "DALL-E 2", provider: "OpenAI", type: "image", cost: "$0.02/image", description: "High-quality image generation", maxTokens: "N/A" },
  { id: "midjourney-v6", name: "Midjourney v6", provider: "Midjourney", type: "image", cost: "$0.10/image", description: "Artistic image generation", maxTokens: "N/A" },
  { id: "stable-diffusion-xl", name: "Stable Diffusion XL", provider: "Stability AI", type: "image", cost: "$0.04/image", description: "Open-source image generation", maxTokens: "N/A" },
  { id: "whisper-1", name: "Whisper", provider: "OpenAI", type: "audio", cost: "$0.006/minute", description: "Speech-to-text transcription", maxTokens: "N/A" },
  { id: "tts-1", name: "Text-to-Speech", provider: "OpenAI", type: "audio", cost: "$0.015/1K chars", description: "Natural speech synthesis", maxTokens: "N/A" },
  { id: "tts-1-hd", name: "Text-to-Speech HD", provider: "OpenAI", type: "audio", cost: "$0.030/1K chars", description: "High definition voice synthesis", maxTokens: "N/A" },
  { id: "embeddings-ada-002", name: "Text Embeddings", provider: "OpenAI", type: "embeddings", cost: "$0.0001/1K tokens", description: "Convert text to vector embeddings", maxTokens: "8k" },
  { id: "moderation-latest", name: "Moderation", provider: "OpenAI", type: "moderation", cost: "Free", description: "Content moderation and safety", maxTokens: "32k" }
];

const mockUsageStats = {
  totalRequests: "12,345",
  totalCost: "$234.56",
  avgResponseTime: "1.2s",
  successRate: "99.8%",
  monthlyUsage: [
    { model: "GPT-4O", requests: 5420, cost: 125.30 },
    { model: "Claude 3 Sonnet", requests: 3210, cost: 78.45 },
    { model: "DALL-E 3", requests: 890, cost: 31.20 }
  ]
};

export default function OpenAI() {
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const [testPrompt, setTestPrompt] = useState("");
  const [isTestLoading, setIsTestLoading] = useState(false);
  const [testResponse, setTestResponse] = useState("");
  const [apiKeys, setApiKeys] = useState({
    openai: "",
    anthropic: "",
    enabled: false
  });
  const { showModal, ModalComponent } = useModal();

  const handleApiTest = async () => {
    setIsTestLoading(true);
    setTestResponse("");
    
    // Simulate API call
    setTimeout(() => {
      setTestResponse(`Demo response from ${selectedModel}: This is a template demonstration. In production, this would connect to the actual AI API and return real responses. Your prompt: "${testPrompt}"`);
      setIsTestLoading(false);
      showModal({
        title: "API Test Complete",
        message: "Demo response generated successfully. This is a template demonstration showing how API testing would work in production.",
        type: "success"
      });
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showModal({
      title: "Copied to clipboard",
      message: "Code snippet copied successfully and ready to use.",
      type: "success"
    });
  };

  const saveApiKeys = () => {
    showModal({
      title: "API Keys Saved",
      message: "Your API configurations have been saved securely. You can now start using AI models.",
      type: "success"
    });
  };

  const testConnection = () => {
    showModal({
      title: "Connection Test",
      message: "Testing connection to AI services... This would verify your API keys in production.",
      type: "info"
    });
  };

  return (
    <MainLayout title="AI API Integrations">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">AI API Integrations</h1>
            <p className="text-muted-foreground mt-1">
              Connect with OpenAI, Claude, and other AI services
            </p>
          </div>
          <Badge variant="secondary" className="px-3 py-1">
            <TestTube className="w-4 h-4 mr-1" />
            Demo Mode
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Activity className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Requests</p>
                  <p className="text-2xl font-bold">{mockUsageStats.totalRequests}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Cost</p>
                  <p className="text-2xl font-bold">{mockUsageStats.totalCost}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Zap className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Avg Response</p>
                  <p className="text-2xl font-bold">{mockUsageStats.avgResponseTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold">{mockUsageStats.successRate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="configuration" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="models">Models</TabsTrigger>
            <TabsTrigger value="testing">API Testing</TabsTrigger>
            <TabsTrigger value="usage">Usage & Analytics</TabsTrigger>
          </TabsList>

          {/* Configuration Tab */}
          <TabsContent value="configuration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="w-5 h-5 mr-2" />
                  API Keys Configuration
                </CardTitle>
                <CardDescription>
                  Configure your AI service API keys and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="openai-key">OpenAI API Key</Label>
                    <Input
                      id="openai-key"
                      type="password"
                      placeholder="sk-..."
                      value={apiKeys.openai}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, openai: e.target.value }))}
                    />
                    <p className="text-xs text-muted-foreground">
                      Get your API key from OpenAI Dashboard
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="anthropic-key">Anthropic API Key</Label>
                    <Input
                      id="anthropic-key"
                      type="password"
                      placeholder="sk-ant-..."
                      value={apiKeys.anthropic}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, anthropic: e.target.value }))}
                    />
                    <p className="text-xs text-muted-foreground">
                      Get your API key from Anthropic Console
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="google-key">Google AI API Key</Label>
                    <Input
                      id="google-key"
                      type="password"
                      placeholder="AIza..."
                      value={apiKeys.google || ""}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, google: e.target.value }))}
                    />
                    <p className="text-xs text-muted-foreground">
                      Get your API key from Google AI Studio
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-ai">Enable AI Integration</Label>
                      <p className="text-sm text-muted-foreground">
                        Turn on/off AI features across the dashboard
                      </p>
                    </div>
                    <Switch
                      id="enable-ai"
                      checked={apiKeys.enabled}
                      onCheckedChange={(checked) => setApiKeys(prev => ({ ...prev, enabled: checked }))}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Default Settings</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Default Model</Label>
                      <Select defaultValue="gpt-4o">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt-4o">GPT-4O</SelectItem>
                          <SelectItem value="gpt-4o-mini">GPT-4O Mini</SelectItem>
                          <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                          <SelectItem value="gpt-4">GPT-4</SelectItem>
                          <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                          <SelectItem value="claude-3.5-sonnet">Claude 3.5 Sonnet</SelectItem>
                          <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                          <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                          <SelectItem value="claude-3-haiku">Claude 3 Haiku</SelectItem>
                          <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
                          <SelectItem value="gemini-1.5-flash">Gemini 1.5 Flash</SelectItem>
                          <SelectItem value="dalle-3">DALL-E 3</SelectItem>
                          <SelectItem value="dalle-2">DALL-E 2</SelectItem>
                          <SelectItem value="whisper-1">Whisper</SelectItem>
                          <SelectItem value="tts-1">Text-to-Speech</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Max Tokens</Label>
                      <Input type="number" defaultValue="2048" />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1" onClick={saveApiKeys}>
                    <Settings className="w-4 h-4 mr-2" />
                    Save Configuration
                  </Button>
                  <Button variant="outline" onClick={testConnection}>
                    <Zap className="w-4 h-4 mr-2" />
                    Test Connection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Models Tab */}
          <TabsContent value="models" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available AI Models</CardTitle>
                <CardDescription>
                  Choose from different AI models for various use cases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {mockApiModels.map((model) => (
                    <div key={model.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          {model.type === 'chat' && <MessageSquare className="w-5 h-5 text-primary" />}
                          {model.type === 'image' && <Image className="w-5 h-5 text-primary" />}
                          {model.type === 'audio' && <Mic className="w-5 h-5 text-primary" />}
                          {model.type === 'vision' && <Image className="w-5 h-5 text-primary" />}
                          {model.type === 'embeddings' && <Brain className="w-5 h-5 text-primary" />}
                          {model.type === 'moderation' && <AlertCircle className="w-5 h-5 text-primary" />}
                        </div>
                        <div>
                          <h3 className="font-semibold">{model.name}</h3>
                          <p className="text-sm text-muted-foreground">{model.provider} • {model.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{model.cost}</p>
                        <Badge variant="outline" className="text-xs">
                          {model.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testing Tab */}
          <TabsContent value="testing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TestTube className="w-5 h-5 mr-2" />
                  API Testing Playground
                </CardTitle>
                <CardDescription>
                  Test your AI integrations with real API calls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Model</Label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {mockApiModels.filter(m => m.type === 'chat').map(model => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Temperature</Label>
                    <Input type="number" min="0" max="2" step="0.1" defaultValue="0.7" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Test Prompt</Label>
                  <Textarea
                    placeholder="Enter your test prompt here..."
                    value={testPrompt}
                    onChange={(e) => setTestPrompt(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button 
                  onClick={handleApiTest} 
                  disabled={!testPrompt || isTestLoading}
                  className="w-full"
                >
                  {isTestLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Testing API...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Test API
                    </>
                  )}
                </Button>

                {testResponse && (
                  <div className="space-y-2">
                    <Label>Response</Label>
                    <div className="p-4 border rounded-lg bg-muted/50">
                      <p className="text-sm">{testResponse}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Code Examples */}
            <Card>
              <CardHeader>
                <CardTitle>Integration Code Examples</CardTitle>
                <CardDescription>
                  Copy these snippets to integrate AI into your application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>JavaScript/TypeScript</Label>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(`const response = await fetch('/api/ai/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }]
  })
});`)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <pre className="p-4 border rounded-lg bg-muted/50 text-sm overflow-x-auto">
{`const response = await fetch('/api/ai/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }]
  })
});`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Usage Tab */}
          <TabsContent value="usage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Usage Analytics</CardTitle>
                <CardDescription>
                  Monitor your AI API usage and costs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-4">
                    {mockUsageStats.monthlyUsage.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{item.model}</h3>
                          <p className="text-sm text-muted-foreground">{item.requests.toLocaleString()} requests</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${item.cost.toFixed(2)}</p>
                          <Progress value={(item.requests / 6000) * 100} className="w-20 mt-1" />
                        </div>
                      </div>
                    ))}
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