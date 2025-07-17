import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Shield, 
  Plus, 
  Edit3, 
  Trash2, 
  Users, 
  Settings, 
  Eye, 
  FileText,
  Database,
  UserCheck,
  Crown,
  User
} from "lucide-react";
import { useModal } from "@/components/ui/modal";

const mockRoles = [
  {
    id: "1",
    name: "Super Admin",
    description: "Full system access with all permissions",
    userCount: 2,
    color: "bg-red-500",
    permissions: {
      dashboard: { read: true, write: true, delete: true },
      users: { read: true, write: true, delete: true },
      analytics: { read: true, write: true, delete: true },
      settings: { read: true, write: true, delete: true },
    }
  },
  {
    id: "2",
    name: "Admin",
    description: "Administrative access with user management",
    userCount: 5,
    color: "bg-orange-500",
    permissions: {
      dashboard: { read: true, write: true, delete: false },
      users: { read: true, write: true, delete: false },
      analytics: { read: true, write: true, delete: false },
      settings: { read: true, write: false, delete: false },
    }
  },
  {
    id: "3",
    name: "Manager",
    description: "Management level access with team oversight",
    userCount: 12,
    color: "bg-blue-500",
    permissions: {
      dashboard: { read: true, write: true, delete: false },
      users: { read: true, write: false, delete: false },
      analytics: { read: true, write: true, delete: false },
      settings: { read: true, write: false, delete: false },
    }
  },
  {
    id: "4",
    name: "Analyst",
    description: "Data analysis and reporting access",
    userCount: 8,
    color: "bg-green-500",
    permissions: {
      dashboard: { read: true, write: false, delete: false },
      users: { read: false, write: false, delete: false },
      analytics: { read: true, write: true, delete: false },
      settings: { read: false, write: false, delete: false },
    }
  },
  {
    id: "5",
    name: "User",
    description: "Basic user access with limited permissions",
    userCount: 45,
    color: "bg-gray-500",
    permissions: {
      dashboard: { read: true, write: false, delete: false },
      users: { read: false, write: false, delete: false },
      analytics: { read: true, write: false, delete: false },
      settings: { read: false, write: false, delete: false },
    }
  }
];

const mockUsers = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Super Admin", avatar: "/api/placeholder/32/32" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Admin", avatar: "/api/placeholder/32/32" },
  { id: "3", name: "Mike Johnson", email: "mike@example.com", role: "Manager", avatar: "/api/placeholder/32/32" },
  { id: "4", name: "Sarah Wilson", email: "sarah@example.com", role: "Analyst", avatar: "/api/placeholder/32/32" },
  { id: "5", name: "Tom Brown", email: "tom@example.com", role: "User", avatar: "/api/placeholder/32/32" },
];

export default function Roles() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const { showModal, ModalComponent } = useModal();

  const handlePermissionChange = (roleId: string, module: string, permission: string, value: boolean) => {
    showModal({
      title: "İzin Güncellendi",
      message: `${module} için ${permission} izni ${value ? 'verildi' : 'geri alındı'}.`,
      type: value ? "success" : "warning"
    });
  };

  const getRoleIcon = (roleName: string) => {
    switch (roleName) {
      case "Super Admin": return Crown;
      case "Admin": return Shield;
      case "Manager": return UserCheck;
      case "Analyst": return FileText;
      default: return User;
    }
  };

  return (
    <MainLayout title="Role Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Role Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage user roles and permissions across your organization
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Role
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Role</DialogTitle>
                <DialogDescription>
                  Define a new role with specific permissions for your team.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="roleName">Role Name</Label>
                  <Input id="roleName" placeholder="Enter role name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roleDescription">Description</Label>
                  <Input id="roleDescription" placeholder="Enter role description" />
                </div>
                <Button className="w-full">Create Role</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Shield className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Roles</p>
                  <p className="text-2xl font-bold">{mockRoles.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{mockRoles.reduce((acc, role) => acc + role.userCount, 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Settings className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Permissions</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Eye className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Sessions</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Roles List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Roles & Permissions</CardTitle>
                <CardDescription>
                  Manage role-based access control for your team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRoles.map((role) => {
                    const Icon = getRoleIcon(role.name);
                    return (
                      <div
                        key={role.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedRole === role.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                        }`}
                        onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-lg ${role.color} flex items-center justify-center`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{role.name}</h3>
                              <p className="text-sm text-muted-foreground">{role.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">{role.userCount} users</Badge>
                            <Button variant="ghost" size="sm">
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Permissions Panel */}
                        {selectedRole === role.id && (
                          <div className="mt-4 pt-4 border-t">
                            <h4 className="font-medium mb-3">Permissions</h4>
                            <div className="grid grid-cols-2 gap-4">
                              {Object.entries(role.permissions).map(([module, perms]) => (
                                <div key={module} className="space-y-2">
                                  <h5 className="text-sm font-medium capitalize flex items-center">
                                    {module === 'dashboard' && <FileText className="w-4 h-4 mr-1" />}
                                    {module === 'users' && <Users className="w-4 h-4 mr-1" />}
                                    {module === 'analytics' && <Database className="w-4 h-4 mr-1" />}
                                    {module === 'settings' && <Settings className="w-4 h-4 mr-1" />}
                                    {module}
                                  </h5>
                                  <div className="space-y-1">
                                    {Object.entries(perms).map(([perm, value]) => (
                                      <div key={perm} className="flex items-center justify-between">
                                        <span className="text-xs capitalize">{perm}</span>
                                        <Switch
                                          checked={value}
                                          onCheckedChange={(checked) => 
                                            handlePermissionChange(role.id, module, perm, checked)
                                          }
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Users */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>
                  Recently added team members
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUsers.map((user) => (
                    <div key={user.id} className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {user.role}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Permission Matrix */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Permission Matrix</CardTitle>
                <CardDescription>
                  Quick overview of role permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-20">Role</TableHead>
                      <TableHead className="text-center">Read</TableHead>
                      <TableHead className="text-center">Write</TableHead>
                      <TableHead className="text-center">Delete</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRoles.slice(0, 3).map((role) => (
                      <TableRow key={role.id}>
                        <TableCell className="font-medium">{role.name}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={Object.values(role.permissions).some(p => p.read) ? "default" : "secondary"}>
                            {Object.values(role.permissions).filter(p => p.read).length}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant={Object.values(role.permissions).some(p => p.write) ? "default" : "secondary"}>
                            {Object.values(role.permissions).filter(p => p.write).length}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant={Object.values(role.permissions).some(p => p.delete) ? "destructive" : "secondary"}>
                            {Object.values(role.permissions).filter(p => p.delete).length}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <ModalComponent />
    </MainLayout>
  );
}