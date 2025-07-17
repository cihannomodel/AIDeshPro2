import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useModal } from "@/components/ui/modal";
import { 
  Globe, Key, Shield, Clock, 
  CheckCircle, AlertCircle, Play, Settings,
  Copy, Eye, EyeOff, Plus, Trash2
} from "lucide-react";

interface APIConnection {
  id: string;
  name: string;
  baseUrl: string;
  apiVersion: string;
  status: "active" | "inactive" | "error" | "testing";
  lastTested: string;
  requestCount: number;
  responseTime: number;
  authType: "none" | "api-key" | "oauth" | "bearer";
  rateLimit: number;
  timeout: number;
  retryAttempts: number;
}

const mockAPIConnections: APIConnection[] = [
  {
    id: "api_1",
    name: "Stripe Payment API",
    baseUrl: "https://api.stripe.com/v1",
    apiVersion: "2023-10-16",
    status: "active",
    lastTested: "2024-07-16 15:45:00",
    requestCount: 2847,
    responseTime: 145,
    authType: "api-key",
    rateLimit: 1000,
    timeout: 30,
    retryAttempts: 3
  },
  {
    id: "api_2",
    name: "SendGrid Email API",
    baseUrl: "https://api.sendgrid.com/v3",
    apiVersion: "v3",
    status: "active",
    lastTested: "2024-07-16 15:30:00",
    requestCount: 1256,
    responseTime: 89,
    authType: "bearer",
    rateLimit: 500,
    timeout: 20,
    retryAttempts: 2
  },
  {
    id: "api_3",
    name: "Google Maps API",
    baseUrl: "https://maps.googleapis.com/maps/api",
    apiVersion: "v1",
    status: "error",
    lastTested: "2024-07-16 14:15:00",
    requestCount: 0,
    responseTime: 0,
    authType: "api-key",
    rateLimit: 2500,
    timeout: 15,
    retryAttempts: 3
  }
];

export default function APIConnections() {
  const [connections, setConnections] = useState(mockAPIConnections);
  const [selectedConnection, setSelectedConnection] = useState<APIConnection | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const [newConnectionName, setNewConnectionName] = useState("");
  const [newConnectionUrl, setNewConnectionUrl] = useState("");
  const { showModal, ModalComponent } = useModal();

  const testConnection = (connectionId: string) => {
    const connection = connections.find(c => c.id === connectionId);
    if (!connection) return;

    setConnections(prev => prev.map(c => 
      c.id === connectionId ? { ...c, status: "testing" } : c
    ));

    setTimeout(() => {
      const success = Math.random() > 0.3;
      const responseTime = Math.floor(Math.random() * 200) + 50;
      
      setConnections(prev => prev.map(c => 
        c.id === connectionId ? { 
          ...c, 
          status: success ? "active" : "error",
          lastTested: new Date().toLocaleString(),
          responseTime: success ? responseTime : 0
        } : c
      ));

      showModal({
        title: success ? "Connection Test Successful" : "Connection Test Failed",
        message: success 
          ? `API connection to ${connection.name} is working properly. Response time: ${responseTime}ms`
          : `Failed to connect to ${connection.name}. Please check your API credentials and endpoint URL.`,
        type: success ? "success" : "error"
      });
    }, 2000);
  };

  const addConnection = () => {
    if (!newConnectionName || !newConnectionUrl) {
      showModal({
        title: "Missing Information",
        message: "Please provide both API name and base URL to create a new connection.",
        type: "warning"
      });
      return;
    }

    const newConnection: APIConnection = {
      id: `api_${Date.now()}`,
      name: newConnectionName,
      baseUrl: newConnectionUrl,
      apiVersion: "v1",
      status: "inactive",
      lastTested: "Never",
      requestCount: 0,
      responseTime: 0,
      authType: "api-key",
      rateLimit: 1000,
      timeout: 30,
      retryAttempts: 3
    };

    setConnections([...connections, newConnection]);
    setSelectedConnection(newConnection);
    setNewConnectionName("");
    setNewConnectionUrl("");

    showModal({
      title: "API Connection Added",
      message: "New API connection has been created. Please configure authentication and test the connection.",
      type: "success"
    });
  };

  const removeConnection = (connectionId: string) => {
    const connection = connections.find(c => c.id === connectionId);
    if (!connection) return;

    showModal({
      title: "Remove API Connection",
      message: `Are you sure you want to remove "${connection.name}"? This will disable all integrations using this API.`,
      type: "warning",
      showCancel: true,
      onConfirm: () => {
        setConnections(prev => prev.filter(c => c.id !== connectionId));
        if (selectedConnection?.id === connectionId) {
          setSelectedConnection(null);
        }
        showModal({
          title: "Connection Removed",
          message: `${connection.name} has been successfully removed.`,
          type: "success"
        });
      }
    });
  };

  const copyApiKey = () => {
    showModal({
      title: "API Key Copied",
      message: "API key has been copied to clipboard. Keep it secure and don't share it publicly.",
      type: "info"
    });
  };

  const generateWebhook = () => {
    const webhookUrl = `https://your-app.com/webhooks/${Date.now()}`;
    showModal({
      title: "Webhook URL Generated",
      message: `Webhook URL: ${webhookUrl}\n\nThis URL can be used to receive real-time updates from the API.`,
      type: "info"
    });
  };

  const testEndpoint = () => {
    showModal({
      title: "Endpoint Test",
      message: "Testing API endpoint with sample request. This will verify the connection and response format.",
      type: "info"
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "testing":
        return <Clock className="w-4 h-4 text-blue-500 animate-pulse" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "testing":
        return <Badge className="bg-blue-100 text-blue-800">Testing</Badge>;
      case "error":
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
    }
  };

  return (
    <MainLayout title="API Connections">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">API Connections Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage external API integrations with authentication and monitoring
            </p>
          </div>
          <Button onClick={generateWebhook} variant="outline">
            <Globe className="w-4 h-4 mr-2" />
            Generate Webhook
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Globe className="w-8 h-8 text-blue-600" />
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">{connections.length}</div>
                <p className="text-sm text-muted-foreground">Total APIs</p>
                <p className="text-xs text-blue-600 mt-1">
                  {connections.filter(c => c.status === "active").length} active
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Shield className="w-8 h-8 text-green-600" />
                <Badge variant="secondary" className="text-green-600 bg-green-100 dark:bg-green-950/30 dark:text-green-400">
                  Secure
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">
                  {connections.reduce((sum, c) => sum + c.requestCount, 0).toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">Total Requests</p>
                <p className="text-xs text-green-600 mt-1">All authenticated</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Clock className="w-8 h-8 text-purple-600" />
                <span className="text-xs text-purple-600">ms</span>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">
                  {Math.round(connections.filter(c => c.status === "active").reduce((sum, c) => sum + c.responseTime, 0) / connections.filter(c => c.status === "active").length || 0)}
                </div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-xs text-purple-600 mt-1">Across all APIs</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Key className="w-8 h-8 text-orange-600" />
                <Shield className="w-4 h-4 text-green-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">100%</div>
                <p className="text-sm text-muted-foreground">Security Score</p>
                <p className="text-xs text-orange-600 mt-1">All keys encrypted</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="connections" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="connections">API Connections</TabsTrigger>
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="documentation">API Docs</TabsTrigger>
          </TabsList>

          {/* Connections Tab */}
          <TabsContent value="connections" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Connections List */}
              <Card>
                <CardHeader>
                  <CardTitle>Active API Connections</CardTitle>
                  <CardDescription>Manage your external API integrations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {connections.map((connection) => (
                    <div 
                      key={connection.id} 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedConnection?.id === connection.id 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-400' 
                          : 'hover:bg-muted/50 dark:hover:bg-muted'
                      }`}
                      onClick={() => setSelectedConnection(connection)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-blue-600" />
                          <div>
                            <h4 className="font-medium">{connection.name}</h4>
                            <p className="text-sm text-muted-foreground">{connection.baseUrl}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(connection.status)}
                          {getStatusBadge(connection.status)}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Requests:</span>
                          <span className="ml-2 font-medium">{connection.requestCount.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Response:</span>
                          <span className="ml-2 font-medium">{connection.responseTime}ms</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {connection.authType.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {connection.apiVersion}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              testConnection(connection.id);
                            }}
                            disabled={connection.status === "testing"}
                          >
                            <Play className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeConnection(connection.id);
                            }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add New Connection */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Add New API Connection</h4>
                    <div className="space-y-3">
                      <Input
                        placeholder="API Name (e.g., Stripe API)"
                        value={newConnectionName}
                        onChange={(e) => setNewConnectionName(e.target.value)}
                      />
                      <Input
                        placeholder="Base URL (e.g., https://api.example.com)"
                        value={newConnectionUrl}
                        onChange={(e) => setNewConnectionUrl(e.target.value)}
                      />
                      <Button onClick={addConnection} className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Connection
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Connection Details */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedConnection ? `${selectedConnection.name} Configuration` : "Select an API Connection"}
                  </CardTitle>
                  <CardDescription>
                    {selectedConnection ? "Configure API settings and authentication" : "Choose a connection to view details"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedConnection ? (
                    <div className="space-y-6">
                      {/* Basic Settings */}
                      <div className="space-y-4">
                        <h4 className="font-medium">Basic Settings</h4>
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="api-name">API Name</Label>
                            <Input id="api-name" defaultValue={selectedConnection.name} />
                          </div>
                          <div>
                            <Label htmlFor="base-url">Base URL</Label>
                            <Input id="base-url" defaultValue={selectedConnection.baseUrl} />
                          </div>
                          <div>
                            <Label htmlFor="api-version">API Version</Label>
                            <Input id="api-version" defaultValue={selectedConnection.apiVersion} />
                          </div>
                        </div>
                      </div>

                      {/* Authentication */}
                      <div className="space-y-4">
                        <h4 className="font-medium">Authentication</h4>
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="auth-type">Authentication Type</Label>
                            <Select defaultValue={selectedConnection.authType}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">No Authentication</SelectItem>
                                <SelectItem value="api-key">API Key</SelectItem>
                                <SelectItem value="bearer">Bearer Token</SelectItem>
                                <SelectItem value="oauth">OAuth 2.0</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="api-key">API Key</Label>
                            <div className="flex gap-2">
                              <Input 
                                id="api-key" 
                                type={showApiKey ? "text" : "password"}
                                defaultValue="sk_test_..." 
                                className="flex-1"
                              />
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setShowApiKey(!showApiKey)}
                              >
                                {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={copyApiKey}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Advanced Settings */}
                      <div className="space-y-4">
                        <h4 className="font-medium">Advanced Settings</h4>
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="rate-limit">Rate Limit (requests/hour)</Label>
                            <Input id="rate-limit" type="number" defaultValue={selectedConnection.rateLimit} />
                          </div>
                          <div>
                            <Label htmlFor="timeout">Timeout (seconds)</Label>
                            <Input id="timeout" type="number" defaultValue={selectedConnection.timeout} />
                          </div>
                          <div>
                            <Label htmlFor="retry-attempts">Retry Attempts</Label>
                            <Input id="retry-attempts" type="number" defaultValue={selectedConnection.retryAttempts} />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="auto-retry">Enable Auto Retry</Label>
                            <Switch id="auto-retry" defaultChecked />
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Button onClick={() => testConnection(selectedConnection.id)}>
                          <Play className="w-4 h-4 mr-2" />
                          Test Connection
                        </Button>
                        <Button variant="outline" onClick={testEndpoint}>
                          Test Endpoint
                        </Button>
                        <Button variant="outline">
                          <Settings className="w-4 h-4 mr-2" />
                          Save Config
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      <Globe className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Select an API connection from the list to configure its settings.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Authentication Tab */}
          <TabsContent value="authentication" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Authentication Management</CardTitle>
                <CardDescription>Manage API keys, tokens, and OAuth configurations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">API Key Management</h4>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Key className="w-4 h-4 mr-2" />
                        Generate New API Key
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="w-4 h-4 mr-2" />
                        Rotate Existing Keys
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Eye className="w-4 h-4 mr-2" />
                        View Key Usage
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">OAuth 2.0 Setup</h4>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="client-id">Client ID</Label>
                        <Input id="client-id" placeholder="Enter OAuth client ID" />
                      </div>
                      <div>
                        <Label htmlFor="client-secret">Client Secret</Label>
                        <Input id="client-secret" type="password" placeholder="Enter client secret" />
                      </div>
                      <div>
                        <Label htmlFor="redirect-uri">Redirect URI</Label>
                        <Input id="redirect-uri" placeholder="https://your-app.com/callback" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Performance Monitoring</CardTitle>
                <CardDescription>Real-time metrics and performance analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">99.9%</div>
                    <div className="text-sm text-muted-foreground">API Uptime</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">1,247</div>
                    <div className="text-sm text-muted-foreground">Requests Today</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">0.2%</div>
                    <div className="text-sm text-muted-foreground">Error Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documentation Tab */}
          <TabsContent value="documentation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Documentation & Testing</CardTitle>
                <CardDescription>Interactive API documentation and endpoint testing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="endpoint">Test Endpoint</Label>
                    <Input id="endpoint" placeholder="/api/v1/users" />
                  </div>
                  <div>
                    <Label htmlFor="method">HTTP Method</Label>
                    <Select defaultValue="GET">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="PUT">PUT</SelectItem>
                        <SelectItem value="DELETE">DELETE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="request-body">Request Body (JSON)</Label>
                    <Textarea id="request-body" placeholder='{"key": "value"}' rows={4} />
                  </div>
                  <Button onClick={testEndpoint}>
                    <Play className="w-4 h-4 mr-2" />
                    Send Test Request
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <ModalComponent />
      </div>
    </MainLayout>
  );
}