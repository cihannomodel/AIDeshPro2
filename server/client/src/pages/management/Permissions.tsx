import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useModal } from "@/components/ui/modal";
import { 
  Shield, Lock, Unlock, Users, UserCheck, Settings,
  Eye, Edit, Trash2, Plus, Save, RotateCcw,
  Crown, Award, Key, Database, Activity,
  FileText, Download, Upload, Search
} from "lucide-react";

interface Permission {
  id: string;
  name: string;
  description: string;
  category: "system" | "data" | "user" | "content" | "api";
  level: "read" | "write" | "admin" | "owner";
  critical: boolean;
}

interface Role {
  id: string;
  name: string;
  description: string;
  color: string;
  permissions: string[];
  userCount: number;
  isDefault: boolean;
  isSystem: boolean;
}

const mockPermissions: Permission[] = [
  // System Permissions
  { id: "sys_settings", name: "System Settings", description: "Access system configuration", category: "system", level: "admin", critical: true },
  { id: "sys_backup", name: "Data Backup", description: "Create and restore backups", category: "system", level: "admin", critical: true },
  { id: "sys_logs", name: "System Logs", description: "View system activity logs", category: "system", level: "read", critical: false },
  { id: "sys_security", name: "Security Settings", description: "Configure security policies", category: "system", level: "owner", critical: true },
  
  // Data Permissions
  { id: "data_read", name: "Data Read", description: "View all data and reports", category: "data", level: "read", critical: false },
  { id: "data_write", name: "Data Write", description: "Create and edit data", category: "data", level: "write", critical: false },
  { id: "data_delete", name: "Data Delete", description: "Delete data and records", category: "data", level: "admin", critical: true },
  { id: "data_export", name: "Data Export", description: "Export data to external formats", category: "data", level: "write", critical: false },
  
  // User Permissions
  { id: "user_view", name: "User View", description: "View user profiles and information", category: "user", level: "read", critical: false },
  { id: "user_manage", name: "User Management", description: "Create, edit, and manage users", category: "user", level: "admin", critical: true },
  { id: "user_roles", name: "Role Assignment", description: "Assign and modify user roles", category: "user", level: "admin", critical: true },
  { id: "user_permissions", name: "Permission Management", description: "Grant and revoke permissions", category: "user", level: "owner", critical: true },
  
  // Content Permissions
  { id: "content_view", name: "Content View", description: "View content and documents", category: "content", level: "read", critical: false },
  { id: "content_create", name: "Content Create", description: "Create new content", category: "content", level: "write", critical: false },
  { id: "content_publish", name: "Content Publish", description: "Publish and approve content", category: "content", level: "admin", critical: false },
  { id: "content_moderate", name: "Content Moderation", description: "Moderate and review content", category: "content", level: "admin", critical: false },
  
  // API Permissions
  { id: "api_read", name: "API Read Access", description: "Read data via API", category: "api", level: "read", critical: false },
  { id: "api_write", name: "API Write Access", description: "Write data via API", category: "api", level: "write", critical: false },
  { id: "api_admin", name: "API Administration", description: "Manage API keys and settings", category: "api", level: "admin", critical: true },
  { id: "api_webhooks", name: "Webhook Management", description: "Configure webhooks and integrations", category: "api", level: "admin", critical: false }
];

const mockRoles: Role[] = [
  {
    id: "owner",
    name: "Owner",
    description: "Full system access with all permissions",
    color: "red",
    permissions: mockPermissions.map(p => p.id),
    userCount: 1,
    isDefault: false,
    isSystem: true
  },
  {
    id: "admin",
    name: "Administrator",
    description: "Administrative access with most permissions",
    color: "orange",
    permissions: mockPermissions.filter(p => p.level !== "owner").map(p => p.id),
    userCount: 3,
    isDefault: false,
    isSystem: true
  },
  {
    id: "manager",
    name: "Manager",
    description: "Team management and data access",
    color: "blue",
    permissions: mockPermissions.filter(p => ["read", "write"].includes(p.level) || p.id.includes("user_view")).map(p => p.id),
    userCount: 8,
    isDefault: false,
    isSystem: false
  },
  {
    id: "user",
    name: "User",
    description: "Standard user with basic permissions",
    color: "green",
    permissions: mockPermissions.filter(p => p.level === "read" || p.id.includes("content_create")).map(p => p.id),
    userCount: 24,
    isDefault: true,
    isSystem: false
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "Read-only access to content and data",
    color: "gray",
    permissions: mockPermissions.filter(p => p.level === "read" && !p.critical).map(p => p.id),
    userCount: 12,
    isDefault: false,
    isSystem: false
  }
];

export default function Permissions() {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { showModal } = useModal();

  const createRole = () => {
    showModal({
      title: "Create New Role",
      message: "Define a new role with specific permissions and access levels.",
      type: "info",
      showCancel: true,
      onConfirm: () => {
        showModal({
          title: "Role Created",
          message: "New role has been created successfully.",
          type: "success"
        });
      }
    });
  };

  const editRole = (role: Role) => {
    setSelectedRole(role);
    showModal({
      title: "Edit Role",
      message: `Modify permissions and settings for ${role.name} role.`,
      type: "info",
      showCancel: true,
      onConfirm: () => {
        showModal({
          title: "Role Updated",
          message: "Role permissions have been updated successfully.",
          type: "success"
        });
      }
    });
  };

  const deleteRole = (role: Role) => {
    if (role.isSystem) {
      showModal({
        title: "Cannot Delete System Role",
        message: "System roles cannot be deleted as they are required for proper system operation.",
        type: "warning"
      });
      return;
    }

    showModal({
      title: "Delete Role",
      message: `Delete ${role.name} role? Users with this role will be assigned to the default user role.`,
      type: "warning",
      showCancel: true,
      onConfirm: () => {
        const updatedRoles = roles.filter(r => r.id !== role.id);
        setRoles(updatedRoles);
        showModal({
          title: "Role Deleted",
          message: "Role has been deleted and affected users have been reassigned.",
          type: "success"
        });
      }
    });
  };

  const togglePermission = (roleId: string, permissionId: string) => {
    const updatedRoles = roles.map(role => {
      if (role.id === roleId) {
        const hasPermission = role.permissions.includes(permissionId);
        const newPermissions = hasPermission 
          ? role.permissions.filter(p => p !== permissionId)
          : [...role.permissions, permissionId];
        return { ...role, permissions: newPermissions };
      }
      return role;
    });
    setRoles(updatedRoles);
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      system: <Settings className="w-4 h-4" />,
      data: <Database className="w-4 h-4" />,
      user: <Users className="w-4 h-4" />,
      content: <FileText className="w-4 h-4" />,
      api: <Key className="w-4 h-4" />
    };
    return icons[category as keyof typeof icons];
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      system: "bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400",
      data: "bg-blue-100 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
      user: "bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400",
      content: "bg-purple-100 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400",
      api: "bg-orange-100 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400"
    };
    return colors[category as keyof typeof colors];
  };

  const getLevelBadge = (level: string) => {
    const colors = {
      read: "bg-gray-100 text-gray-600 dark:bg-gray-950/30 dark:text-gray-400",
      write: "bg-blue-100 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
      admin: "bg-orange-100 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400",
      owner: "bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400"
    };
    return <Badge className={colors[level as keyof typeof colors]}>{level}</Badge>;
  };

  const getRoleIcon = (role: Role) => {
    if (role.name === "Owner") return <Crown className="w-4 h-4 text-red-600" />;
    if (role.name === "Administrator") return <Shield className="w-4 h-4 text-orange-600" />;
    if (role.name === "Manager") return <Award className="w-4 h-4 text-blue-600" />;
    return <UserCheck className="w-4 h-4 text-green-600" />;
  };

  const filteredPermissions = mockPermissions.filter(permission => {
    const matchesSearch = permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         permission.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || permission.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout title="Permissions">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Permissions</h1>
            <p className="text-muted-foreground mt-1">
              Manage roles and permissions for system access control
            </p>
          </div>
          <Button onClick={createRole} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Role
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Shield className="w-8 h-8 text-blue-600" />
                <Badge className="bg-blue-100 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">
                  Total
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">{roles.length}</div>
                <p className="text-sm text-muted-foreground">Active Roles</p>
                <p className="text-xs text-blue-600 mt-1">
                  {roles.reduce((sum, r) => sum + r.userCount, 0)} users assigned
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Key className="w-8 h-8 text-green-600" />
                <Activity className="w-4 h-4 text-green-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">{mockPermissions.length}</div>
                <p className="text-sm text-muted-foreground">Permissions</p>
                <p className="text-xs text-green-600 mt-1">
                  {mockPermissions.filter(p => p.critical).length} critical
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Lock className="w-8 h-8 text-orange-600" />
                <Crown className="w-4 h-4 text-orange-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">
                  {roles.filter(r => r.isSystem).length}
                </div>
                <p className="text-sm text-muted-foreground">System Roles</p>
                <p className="text-xs text-orange-600 mt-1">Protected</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Users className="w-8 h-8 text-purple-600" />
                <UserCheck className="w-4 h-4 text-purple-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">
                  {roles.find(r => r.isDefault)?.userCount || 0}
                </div>
                <p className="text-sm text-muted-foreground">Default Role Users</p>
                <p className="text-xs text-purple-600 mt-1">Standard access</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="roles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="matrix">Permission Matrix</TabsTrigger>
            <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          </TabsList>

          <TabsContent value="roles" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roles.map((role) => (
                <Card key={role.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getRoleIcon(role)}
                        <CardTitle className="text-lg">{role.name}</CardTitle>
                        {role.isSystem && (
                          <Badge className="bg-yellow-100 text-yellow-600 dark:bg-yellow-950/30 dark:text-yellow-400">
                            System
                          </Badge>
                        )}
                        {role.isDefault && (
                          <Badge className="bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400">
                            Default
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardDescription>{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span>Users Assigned</span>
                        <span className="font-medium">{role.userCount}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span>Permissions</span>
                        <span className="font-medium">{role.permissions.length}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span>Critical Permissions</span>
                        <span className="font-medium">
                          {mockPermissions.filter(p => role.permissions.includes(p.id) && p.critical).length}
                        </span>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => editRole(role)}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        {!role.isSystem && (
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => deleteRole(role)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search permissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="data">Data</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="content">Content</SelectItem>
                  <SelectItem value="api">API</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredPermissions.map((permission) => (
                <Card key={permission.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(permission.category)}
                          <Badge className={getCategoryColor(permission.category)}>
                            {permission.category}
                          </Badge>
                        </div>
                        <div>
                          <h4 className="font-semibold flex items-center gap-2">
                            {permission.name}
                            {permission.critical && (
                              <Badge variant="destructive" className="text-xs">
                                Critical
                              </Badge>
                            )}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {permission.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        {getLevelBadge(permission.level)}
                        <div className="text-right text-sm">
                          <div className="font-medium">
                            {roles.filter(r => r.permissions.includes(permission.id)).length} roles
                          </div>
                          <div className="text-muted-foreground">
                            {roles.filter(r => r.permissions.includes(permission.id)).reduce((sum, r) => sum + r.userCount, 0)} users
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="matrix" className="space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-3 border-b">Permission</th>
                    {roles.map((role) => (
                      <th key={role.id} className="text-center p-3 border-b min-w-24">
                        <div className="flex flex-col items-center gap-1">
                          {getRoleIcon(role)}
                          <span className="text-xs">{role.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockPermissions.map((permission) => (
                    <tr key={permission.id} className="hover:bg-muted/50">
                      <td className="p-3 border-b">
                        <div className="flex items-center gap-2">
                          <Badge className={getCategoryColor(permission.category)} variant="outline">
                            {permission.category}
                          </Badge>
                          <span className="font-medium">{permission.name}</span>
                          {permission.critical && (
                            <Badge variant="destructive" className="text-xs">
                              Critical
                            </Badge>
                          )}
                        </div>
                      </td>
                      {roles.map((role) => (
                        <td key={role.id} className="p-3 border-b text-center">
                          <Checkbox
                            checked={role.permissions.includes(permission.id)}
                            onCheckedChange={() => togglePermission(role.id, permission.id)}
                            disabled={role.isSystem}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Permission Changes</CardTitle>
                  <CardDescription>Track all permission and role modifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-medium">Role permissions updated</div>
                          <div className="text-sm text-muted-foreground">
                            Manager role granted "data_export" permission
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">2 hours ago</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <UserCheck className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="font-medium">User role assigned</div>
                          <div className="text-sm text-muted-foreground">
                            John Doe assigned to Manager role
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">5 hours ago</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Plus className="w-5 h-5 text-purple-600" />
                        <div>
                          <div className="font-medium">New role created</div>
                          <div className="text-sm text-muted-foreground">
                            "Content Editor" role created with content permissions
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">1 day ago</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Recommendations</CardTitle>
                    <CardDescription>Improve your permission structure</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                      <Lock className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-yellow-800 dark:text-yellow-200">
                          Review Admin Permissions
                        </div>
                        <div className="text-sm text-yellow-700 dark:text-yellow-300">
                          3 users have admin access. Consider limiting admin roles.
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                      <Eye className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-blue-800 dark:text-blue-200">
                          Enable Permission Audit
                        </div>
                        <div className="text-sm text-blue-700 dark:text-blue-300">
                          Set up regular permission reviews for compliance.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common permission management tasks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Export Permission Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="w-4 h-4 mr-2" />
                      Import Role Template
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset to Defaults
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Activity className="w-4 h-4 mr-2" />
                      Generate Compliance Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}