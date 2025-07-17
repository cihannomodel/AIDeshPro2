import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useModal } from "@/components/ui/modal";
import { 
  Users, UserPlus, UserCheck, UserX, Search,
  Edit, Trash2, Lock, Unlock, Mail, Phone,
  Shield, Crown, Eye, Settings, Filter,
  Calendar, Clock, Activity, MapPin
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "user" | "viewer";
  status: "active" | "inactive" | "suspended" | "pending";
  avatar?: string;
  phone?: string;
  department: string;
  lastLogin: string;
  joinDate: string;
  location: string;
  permissions: string[];
  twoFactorEnabled: boolean;
  sessionsActive: number;
  totalLogins: number;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "admin",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    phone: "+1 (555) 123-4567",
    department: "IT",
    lastLogin: "2025-01-16 14:30",
    joinDate: "2023-03-15",
    location: "New York, USA",
    permissions: ["all"],
    twoFactorEnabled: true,
    sessionsActive: 2,
    totalLogins: 1456
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@company.com",
    role: "manager",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    phone: "+1 (555) 234-5678",
    department: "Sales",
    lastLogin: "2025-01-16 12:15",
    joinDate: "2023-07-20",
    location: "Los Angeles, USA",
    permissions: ["sales", "reports", "team"],
    twoFactorEnabled: true,
    sessionsActive: 1,
    totalLogins: 892
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@company.com",
    role: "user",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    phone: "+1 (555) 345-6789",
    department: "Marketing",
    lastLogin: "2025-01-16 09:45",
    joinDate: "2024-01-10",
    location: "Chicago, USA",
    permissions: ["dashboard", "reports"],
    twoFactorEnabled: false,
    sessionsActive: 1,
    totalLogins: 234
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david.wilson@company.com",
    role: "user",
    status: "inactive",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    phone: "+1 (555) 456-7890",
    department: "Finance",
    lastLogin: "2025-01-10 16:20",
    joinDate: "2023-11-05",
    location: "Miami, USA",
    permissions: ["dashboard"],
    twoFactorEnabled: false,
    sessionsActive: 0,
    totalLogins: 445
  },
  {
    id: "5",
    name: "Lisa Thompson",
    email: "lisa.thompson@company.com",
    role: "viewer",
    status: "pending",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
    phone: "+1 (555) 567-8901",
    department: "HR",
    lastLogin: "Never",
    joinDate: "2025-01-15",
    location: "Seattle, USA",
    permissions: ["view-only"],
    twoFactorEnabled: false,
    sessionsActive: 0,
    totalLogins: 0
  }
];

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { showModal } = useModal();

  const createUser = () => {
    setShowCreateForm(true);
    showModal({
      title: "Create New User",
      message: "Fill in the user details and assign appropriate role and permissions.",
      type: "info",
      showCancel: true,
      onConfirm: () => {
        showModal({
          title: "User Created Successfully",
          message: "The new user has been created and an invitation email has been sent.",
          type: "success"
        });
      }
    });
  };

  const editUser = (user: User) => {
    setSelectedUser(user);
    showModal({
      title: "Edit User",
      message: `Edit user details for ${user.name}. Changes will be applied immediately.`,
      type: "info",
      showCancel: true,
      onConfirm: () => {
        showModal({
          title: "User Updated",
          message: "User details have been updated successfully.",
          type: "success"
        });
      }
    });
  };

  const deleteUser = (user: User) => {
    showModal({
      title: "Delete User",
      message: `Are you sure you want to delete ${user.name}? This action cannot be undone and will remove all user data.`,
      type: "warning",
      showCancel: true,
      onConfirm: () => {
        const updatedUsers = users.filter(u => u.id !== user.id);
        setUsers(updatedUsers);
        showModal({
          title: "User Deleted",
          message: "User has been permanently deleted from the system.",
          type: "success"
        });
      }
    });
  };

  const toggleUserStatus = (user: User) => {
    const newStatus = user.status === "active" ? "inactive" : "active";
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, status: newStatus as typeof user.status } : u
    );
    setUsers(updatedUsers);
    
    showModal({
      title: `User ${newStatus === "active" ? "Activated" : "Deactivated"}`,
      message: `${user.name} has been ${newStatus === "active" ? "activated" : "deactivated"} successfully.`,
      type: "success"
    });
  };

  const resetPassword = (user: User) => {
    showModal({
      title: "Reset Password",
      message: `Send password reset email to ${user.name}?`,
      type: "info",
      showCancel: true,
      onConfirm: () => {
        showModal({
          title: "Password Reset Sent",
          message: "Password reset email has been sent to the user.",
          type: "success"
        });
      }
    });
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin": return <Crown className="w-4 h-4 text-red-600" />;
      case "manager": return <Shield className="w-4 h-4 text-blue-600" />;
      case "user": return <UserCheck className="w-4 h-4 text-green-600" />;
      case "viewer": return <Eye className="w-4 h-4 text-gray-600" />;
      default: return <Users className="w-4 h-4 text-gray-600" />;
    }
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: "bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400",
      manager: "bg-blue-100 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
      user: "bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400",
      viewer: "bg-gray-100 text-gray-600 dark:bg-gray-950/30 dark:text-gray-400"
    };
    return <Badge className={colors[role as keyof typeof colors]}>{role}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400",
      inactive: "bg-gray-100 text-gray-600 dark:bg-gray-950/30 dark:text-gray-400",
      suspended: "bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400",
      pending: "bg-yellow-100 text-yellow-600 dark:bg-yellow-950/30 dark:text-yellow-400"
    };
    return <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>;
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <MainLayout title="User Management">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage system users, roles, and permissions
            </p>
          </div>
          <Button onClick={createUser} className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Add New User
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Users className="w-8 h-8 text-blue-600" />
                <Badge className="bg-blue-100 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">
                  Total
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">{users.length}</div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-xs text-blue-600 mt-1">
                  {users.filter(u => u.status === "active").length} active
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <UserCheck className="w-8 h-8 text-green-600" />
                <Activity className="w-4 h-4 text-green-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">
                  {users.filter(u => u.status === "active").length}
                </div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-xs text-green-600 mt-1">
                  {users.reduce((sum, u) => sum + u.sessionsActive, 0)} sessions
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Shield className="w-8 h-8 text-purple-600" />
                <Crown className="w-4 h-4 text-purple-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">
                  {users.filter(u => u.role === "admin" || u.role === "manager").length}
                </div>
                <p className="text-sm text-muted-foreground">Admins & Managers</p>
                <p className="text-xs text-purple-600 mt-1">Privileged access</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Lock className="w-8 h-8 text-orange-600" />
                <Shield className="w-4 h-4 text-green-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">
                  {users.filter(u => u.twoFactorEnabled).length}
                </div>
                <p className="text-sm text-muted-foreground">2FA Enabled</p>
                <p className="text-xs text-orange-600 mt-1">
                  {Math.round((users.filter(u => u.twoFactorEnabled).length / users.length) * 100)}% coverage
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">All Users</TabsTrigger>
            <TabsTrigger value="active">Active Users</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            {/* Filters */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Users Table */}
            <div className="grid grid-cols-1 gap-4">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-3">
                            <h4 className="font-semibold">{user.name}</h4>
                            {getRoleIcon(user.role)}
                            {getRoleBadge(user.role)}
                            {getStatusBadge(user.status)}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {user.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {user.department}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Last login: {user.lastLogin}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="text-right text-sm mr-4">
                          <div className="font-medium">
                            {user.sessionsActive} active session{user.sessionsActive !== 1 ? 's' : ''}
                          </div>
                          <div className="text-muted-foreground">
                            {user.totalLogins} total logins
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => editUser(user)}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toggleUserStatus(user)}
                        >
                          {user.status === "active" ? (
                            <Lock className="w-3 h-3" />
                          ) : (
                            <Unlock className="w-3 h-3" />
                          )}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => resetPassword(user)}
                        >
                          <Settings className="w-3 h-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => deleteUser(user)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {users.filter(u => u.status === "active").map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{user.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {user.email} • {user.department}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right text-sm">
                          <div className="font-medium">
                            {user.sessionsActive} active session{user.sessionsActive !== 1 ? 's' : ''}
                          </div>
                          <div className="text-muted-foreground">
                            Last seen: {user.lastLogin}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {user.twoFactorEnabled && (
                            <Badge className="bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400">
                              2FA
                            </Badge>
                          )}
                          {getRoleBadge(user.role)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Role Permissions</CardTitle>
                  <CardDescription>Configure default permissions for each role</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Admin</span>
                      <Badge className="bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400">
                        Full Access
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Manager</span>
                      <Badge className="bg-blue-100 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">
                        Team Management
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">User</span>
                      <Badge className="bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400">
                        Standard Access
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Viewer</span>
                      <Badge className="bg-gray-100 text-gray-600 dark:bg-gray-950/30 dark:text-gray-400">
                        Read Only
                      </Badge>
                    </div>
                  </div>
                  <Button className="w-full">Configure Permissions</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Permission Matrix</CardTitle>
                  <CardDescription>Overview of role-based access control</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-5 gap-2 font-medium">
                      <span>Permission</span>
                      <span>Admin</span>
                      <span>Manager</span>
                      <span>User</span>
                      <span>Viewer</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      <span>Dashboard</span>
                      <span>✓</span>
                      <span>✓</span>
                      <span>✓</span>
                      <span>✓</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      <span>Reports</span>
                      <span>✓</span>
                      <span>✓</span>
                      <span>✓</span>
                      <span>✓</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      <span>User Management</span>
                      <span>✓</span>
                      <span>✓</span>
                      <span>-</span>
                      <span>-</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      <span>System Settings</span>
                      <span>✓</span>
                      <span>-</span>
                      <span>-</span>
                      <span>-</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Overview</CardTitle>
                  <CardDescription>System security metrics and status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">2FA Adoption Rate</span>
                      <span className="text-sm font-medium text-green-600">
                        {Math.round((users.filter(u => u.twoFactorEnabled).length / users.length) * 100)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Password Strength</span>
                      <span className="text-sm font-medium text-yellow-600">Good</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Failed Login Attempts</span>
                      <span className="text-sm font-medium">3 (24h)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Suspicious Activity</span>
                      <span className="text-sm font-medium text-green-600">None detected</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Actions</CardTitle>
                  <CardDescription>Quick security management tools</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Lock className="w-4 h-4 mr-2" />
                    Force Password Reset (All Users)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Enable 2FA Requirement
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="w-4 h-4 mr-2" />
                    Generate Security Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <UserX className="w-4 h-4 mr-2" />
                    Revoke All Sessions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}