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
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Key, 
  Plus, 
  Copy, 
  Eye, 
  EyeOff, 
  Trash2, 
  RefreshCw, 
  Shield, 
  Clock, 
  User,
  Settings,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { useModal } from "@/components/ui/modal";

const mockTokens = [
  {
    id: "1",
    name: "Production API",
    description: "Main production environment access",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    createdAt: "2024-01-15",
    expiresAt: "2024-07-15",
    lastUsed: "2 hours ago",
    status: "active",
    scopes: ["dashboard:read", "analytics:write", "users:read"],
    creator: "John Doe"
  },
  {
    id: "2",
    name: "Development Token",
    description: "For development and testing purposes",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    createdAt: "2024-01-20",
    expiresAt: "2024-04-20",
    lastUsed: "5 minutes ago",
    status: "active",
    scopes: ["dashboard:read", "analytics:read"],
    creator: "Jane Smith"
  },
  {
    id: "3",
    name: "Analytics Service",
    description: "Dedicated token for analytics service",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    createdAt: "2024-01-10",
    expiresAt: "2024-02-15",
    lastUsed: "1 day ago",
    status: "expired",
    scopes: ["analytics:read", "analytics:write"],
    creator: "Mike Johnson"
  },
  {
    id: "4",
    name: "Mobile App Token",
    description: "Token for mobile application",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    createdAt: "2024-01-25",
    expiresAt: "2024-12-25",
    lastUsed: "Never",
    status: "revoked",
    scopes: ["dashboard:read", "users:read"],
    creator: "Sarah Wilson"
  }
];

const availableScopes = [
  { name: "dashboard:read", description: "Read dashboard data" },
  { name: "dashboard:write", description: "Modify dashboard settings" },
  { name: "analytics:read", description: "View analytics data" },
  { name: "analytics:write", description: "Create and modify analytics" },
  { name: "users:read", description: "View user information" },
  { name: "users:write", description: "Manage user accounts" },
  { name: "settings:read", description: "View system settings" },
  { name: "settings:write", description: "Modify system settings" },
];

export default function JWT() {
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [showTokens, setShowTokens] = useState<Set<string>>(new Set());
  const [newToken, setNewToken] = useState({
    name: "",
    description: "",
    scopes: [] as string[],
    expiresIn: "6months"
  });
  const { showModal, ModalComponent } = useModal();

  const toggleTokenVisibility = (tokenId: string) => {
    setShowTokens(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tokenId)) {
        newSet.delete(tokenId);
      } else {
        newSet.add(tokenId);
      }
      return newSet;
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showModal({
      title: "Panoya Kopyalandı",
      message: "JWT token panonuza kopyalandı.",
      type: "success"
    });
  };

  const revokeToken = (tokenId: string) => {
    showModal({
      title: "Token İptal Edildi",
      message: "JWT token iptal edildi ve artık kullanılamaz.",
      type: "warning"
    });
  };

  const regenerateToken = (tokenId: string) => {
    showModal({
      title: "Token Yenilendi",
      message: "Yeni JWT token oluşturuldu. Uygulamalarınızı güncelleyin.",
      type: "info"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
      case "expired":
        return <Badge variant="destructive"><Clock className="w-3 h-3 mr-1" />Expired</Badge>;
      case "revoked":
        return <Badge variant="secondary"><AlertTriangle className="w-3 h-3 mr-1" />Revoked</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleScopeToggle = (scope: string) => {
    setNewToken(prev => ({
      ...prev,
      scopes: prev.scopes.includes(scope)
        ? prev.scopes.filter(s => s !== scope)
        : [...prev.scopes, scope]
    }));
  };

  const createNewToken = () => {
    showModal({
      title: "Token Oluşturuldu",
      message: "Yeni JWT token başarıyla oluşturuldu.",
      type: "success"
    });
    setNewToken({ name: "", description: "", scopes: [], expiresIn: "6months" });
  };

  return (
    <MainLayout title="JWT Token Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">JWT Token Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage API tokens and access credentials for your applications
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Generate Token
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Generate New JWT Token</DialogTitle>
                <DialogDescription>
                  Create a new JWT token with specific permissions and expiration.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="tokenName">Token Name</Label>
                  <Input
                    id="tokenName"
                    placeholder="e.g., Production API"
                    value={newToken.name}
                    onChange={(e) => setNewToken(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tokenDescription">Description</Label>
                  <Textarea
                    id="tokenDescription"
                    placeholder="Describe the purpose of this token..."
                    value={newToken.description}
                    onChange={(e) => setNewToken(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Scopes & Permissions</Label>
                  <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                    {availableScopes.map((scope) => (
                      <div key={scope.name} className="flex items-center justify-between p-2 border rounded">
                        <div>
                          <p className="text-sm font-medium">{scope.name}</p>
                          <p className="text-xs text-muted-foreground">{scope.description}</p>
                        </div>
                        <Switch
                          checked={newToken.scopes.includes(scope.name)}
                          onCheckedChange={() => handleScopeToggle(scope.name)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <Button className="w-full" onClick={createNewToken}>
                  Generate Token
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Key className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Tokens</p>
                  <p className="text-2xl font-bold">{mockTokens.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold">{mockTokens.filter(t => t.status === 'active').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Expired</p>
                  <p className="text-2xl font-bold">{mockTokens.filter(t => t.status === 'expired').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Shield className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Security Level</p>
                  <p className="text-2xl font-bold">High</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Token List */}
        <Card>
          <CardHeader>
            <CardTitle>API Tokens</CardTitle>
            <CardDescription>
              Manage your JWT tokens and their permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Token</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTokens.map((token) => (
                  <TableRow key={token.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{token.name}</p>
                        <p className="text-sm text-muted-foreground">{token.description}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {token.scopes.slice(0, 2).map((scope) => (
                            <Badge key={scope} variant="outline" className="text-xs">
                              {scope}
                            </Badge>
                          ))}
                          {token.scopes.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{token.scopes.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <code className="text-xs bg-muted p-1 rounded">
                          {showTokens.has(token.id) 
                            ? token.token 
                            : token.token.substring(0, 20) + "..."
                          }
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleTokenVisibility(token.id)}
                        >
                          {showTokens.has(token.id) ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(token.token)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(token.status)}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{token.createdAt}</p>
                        <p className="text-xs text-muted-foreground">by {token.creator}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{token.expiresAt}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{token.lastUsed}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => regenerateToken(token.id)}
                          disabled={token.status !== 'active'}
                        >
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => revokeToken(token.id)}
                          disabled={token.status !== 'active'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Token Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Token Security Best Practices</CardTitle>
              <CardDescription>
                Keep your tokens secure and follow these guidelines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Rotate tokens regularly</h4>
                  <p className="text-sm text-muted-foreground">
                    Generate new tokens every 6 months or when team members leave
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Key className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Use minimal permissions</h4>
                  <p className="text-sm text-muted-foreground">
                    Grant only the scopes necessary for each application
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Eye className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Monitor token usage</h4>
                  <p className="text-sm text-muted-foreground">
                    Regularly check token activity and revoke unused tokens
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Settings className="w-5 h-5 text-purple-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Secure storage</h4>
                  <p className="text-sm text-muted-foreground">
                    Never store tokens in plain text or commit them to repositories
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Token Usage Analytics</CardTitle>
              <CardDescription>
                Monitor how your tokens are being used
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">API Requests Today</p>
                    <p className="text-sm text-muted-foreground">Total authenticated requests</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">1,234</p>
                    <p className="text-xs text-green-500">+12% from yesterday</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Failed Authentications</p>
                    <p className="text-sm text-muted-foreground">Invalid or expired tokens</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">23</p>
                    <p className="text-xs text-red-500">+3 from yesterday</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Most Used Scope</p>
                    <p className="text-sm text-muted-foreground">Top permission used</p>
                  </div>
                  <div className="text-right">
                    <Badge>dashboard:read</Badge>
                    <p className="text-xs text-muted-foreground mt-1">67% of requests</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <ModalComponent />
    </MainLayout>
  );
}