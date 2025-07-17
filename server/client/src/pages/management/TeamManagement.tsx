import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useModal } from "@/components/ui/modal";
import { 
  Users, UserPlus, UserCheck, Shield, Search,
  Edit, Trash2, Star, Calendar, Clock, Activity,
  Target, TrendingUp, Award, Mail, Phone,
  Settings, Plus, Download, Upload, Filter
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  teamLead: boolean;
  avatar?: string;
  phone?: string;
  performance: "excellent" | "good" | "average" | "needs-improvement";
  projects: number;
  tasks: {
    completed: number;
    pending: number;
    overdue: number;
  };
  availability: "available" | "busy" | "away" | "offline";
  joinDate: string;
  location: string;
  skills: string[];
  workload: number; // percentage
}

interface Team {
  id: string;
  name: string;
  description: string;
  department: string;
  leadId: string;
  members: string[];
  projects: string[];
  budget: string;
  status: "active" | "planning" | "completed" | "on-hold";
  progress: number;
}

const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "Senior Developer",
    department: "Engineering",
    teamLead: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    phone: "+1 (555) 123-4567",
    performance: "excellent",
    projects: 3,
    tasks: { completed: 45, pending: 8, overdue: 1 },
    availability: "available",
    joinDate: "2023-03-15",
    location: "New York, USA",
    skills: ["React", "TypeScript", "Node.js", "Python"],
    workload: 85
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@company.com",
    role: "Product Manager",
    department: "Product",
    teamLead: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    phone: "+1 (555) 234-5678",
    performance: "excellent",
    projects: 5,
    tasks: { completed: 32, pending: 12, overdue: 2 },
    availability: "busy",
    joinDate: "2023-07-20",
    location: "Los Angeles, USA",
    skills: ["Product Strategy", "Analytics", "Agile", "Leadership"],
    workload: 95
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@company.com",
    role: "UX Designer",
    department: "Design",
    teamLead: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    phone: "+1 (555) 345-6789",
    performance: "good",
    projects: 2,
    tasks: { completed: 28, pending: 6, overdue: 0 },
    availability: "available",
    joinDate: "2024-01-10",
    location: "Chicago, USA",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    workload: 70
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david.wilson@company.com",
    role: "Data Analyst",
    department: "Analytics",
    teamLead: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    phone: "+1 (555) 456-7890",
    performance: "good",
    projects: 4,
    tasks: { completed: 38, pending: 10, overdue: 3 },
    availability: "away",
    joinDate: "2023-11-05",
    location: "Miami, USA",
    skills: ["SQL", "Python", "Tableau", "Statistics"],
    workload: 80
  }
];

const mockTeams: Team[] = [
  {
    id: "1",
    name: "Frontend Development",
    description: "Building and maintaining user interfaces",
    department: "Engineering",
    leadId: "1",
    members: ["1", "3"],
    projects: ["Dashboard Redesign", "Mobile App"],
    budget: "$250,000",
    status: "active",
    progress: 75
  },
  {
    id: "2",
    name: "Product Innovation",
    description: "Research and develop new product features",
    department: "Product",
    leadId: "2",
    members: ["2", "4"],
    projects: ["AI Integration", "User Analytics", "Market Research"],
    budget: "$180,000",
    status: "active",
    progress: 60
  },
  {
    id: "3",
    name: "Data Science",
    description: "Analytics and machine learning initiatives",
    department: "Analytics",
    leadId: "4",
    members: ["4"],
    projects: ["Predictive Models", "Customer Insights"],
    budget: "$120,000",
    status: "planning",
    progress: 25
  }
];

export default function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [teams, setTeams] = useState<Team[]>(mockTeams);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const { showModal } = useModal();

  const createTeam = () => {
    showModal({
      title: "Create New Team",
      message: "Set up a new team with members, goals, and project assignments.",
      type: "info",
      showCancel: true,
      onConfirm: () => {
        showModal({
          title: "Team Created Successfully",
          message: "The new team has been created and team members have been notified.",
          type: "success"
        });
      }
    });
  };

  const addMember = () => {
    showModal({
      title: "Add Team Member",
      message: "Invite a new member to join the team and assign their role and responsibilities.",
      type: "info",
      showCancel: true,
      onConfirm: () => {
        showModal({
          title: "Member Added Successfully",
          message: "Team member has been added and invitation email has been sent.",
          type: "success"
        });
      }
    });
  };

  const editMember = (member: TeamMember) => {
    showModal({
      title: "Edit Team Member",
      message: `Update ${member.name}'s role, responsibilities, and team assignments.`,
      type: "info",
      showCancel: true,
      onConfirm: () => {
        showModal({
          title: "Member Updated",
          message: "Team member details have been updated successfully.",
          type: "success"
        });
      }
    });
  };

  const removeMember = (member: TeamMember) => {
    showModal({
      title: "Remove Team Member",
      message: `Are you sure you want to remove ${member.name} from the team? They will lose access to team projects.`,
      type: "warning",
      showCancel: true,
      onConfirm: () => {
        const updatedMembers = teamMembers.filter(m => m.id !== member.id);
        setTeamMembers(updatedMembers);
        showModal({
          title: "Member Removed",
          message: "Team member has been removed from the team.",
          type: "success"
        });
      }
    });
  };

  const getPerformanceBadge = (performance: string) => {
    const colors = {
      excellent: "bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400",
      good: "bg-blue-100 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
      average: "bg-yellow-100 text-yellow-600 dark:bg-yellow-950/30 dark:text-yellow-400",
      "needs-improvement": "bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400"
    };
    return <Badge className={colors[performance as keyof typeof colors]}>{performance}</Badge>;
  };

  const getAvailabilityIcon = (availability: string) => {
    const icons = {
      available: <div className="w-2 h-2 bg-green-500 rounded-full" />,
      busy: <div className="w-2 h-2 bg-yellow-500 rounded-full" />,
      away: <div className="w-2 h-2 bg-orange-500 rounded-full" />,
      offline: <div className="w-2 h-2 bg-gray-500 rounded-full" />
    };
    return icons[availability as keyof typeof icons];
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400",
      planning: "bg-blue-100 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
      completed: "bg-purple-100 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400",
      "on-hold": "bg-yellow-100 text-yellow-600 dark:bg-yellow-950/30 dark:text-yellow-400"
    };
    return <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>;
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || member.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

  return (
    <MainLayout title="Team Management">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Team Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage teams, members, and organizational structure
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={addMember} variant="outline">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
            <Button onClick={createTeam} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Team
            </Button>
          </div>
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
                <div className="text-2xl font-bold">{teamMembers.length}</div>
                <p className="text-sm text-muted-foreground">Team Members</p>
                <p className="text-xs text-blue-600 mt-1">
                  {teams.length} active teams
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Target className="w-8 h-8 text-green-600" />
                <Activity className="w-4 h-4 text-green-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">
                  {teamMembers.reduce((sum, m) => sum + m.projects, 0)}
                </div>
                <p className="text-sm text-muted-foreground">Active Projects</p>
                <p className="text-xs text-green-600 mt-1">
                  {Math.round(teams.reduce((sum, t) => sum + t.progress, 0) / teams.length)}% avg completion
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <TrendingUp className="w-8 h-8 text-purple-600" />
                <Star className="w-4 h-4 text-purple-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">
                  {teamMembers.filter(m => m.performance === "excellent").length}
                </div>
                <p className="text-sm text-muted-foreground">Top Performers</p>
                <p className="text-xs text-purple-600 mt-1">Excellent rating</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Clock className="w-8 h-8 text-orange-600" />
                <UserCheck className="w-4 h-4 text-green-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">
                  {Math.round(teamMembers.reduce((sum, m) => sum + m.workload, 0) / teamMembers.length)}%
                </div>
                <p className="text-sm text-muted-foreground">Avg Workload</p>
                <p className="text-xs text-orange-600 mt-1">
                  {teamMembers.filter(m => m.availability === "available").length} available
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="members" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="members">Team Members</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="workload">Workload</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="space-y-6">
            {/* Filters */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Department
              </Button>
              
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>

            {/* Members Grid */}
            <div className="grid grid-cols-1 gap-4">
              {filteredMembers.map((member) => (
                <Card key={member.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1">
                            {getAvailabilityIcon(member.availability)}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <h4 className="font-semibold">{member.name}</h4>
                            {member.teamLead && (
                              <Badge className="bg-yellow-100 text-yellow-600 dark:bg-yellow-950/30 dark:text-yellow-400">
                                <Star className="w-3 h-3 mr-1" />
                                Lead
                              </Badge>
                            )}
                            {getPerformanceBadge(member.performance)}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span>{member.role} • {member.department}</span>
                            <span>{member.projects} projects</span>
                            <span>Workload: {member.workload}%</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            {member.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {member.skills.length > 3 && (
                              <span className="text-xs text-muted-foreground">
                                +{member.skills.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="text-right text-sm mr-4">
                          <div className="font-medium">
                            Tasks: {member.tasks.completed} / {member.tasks.completed + member.tasks.pending}
                          </div>
                          <div className="text-muted-foreground">
                            {member.tasks.overdue > 0 && (
                              <span className="text-red-600">{member.tasks.overdue} overdue</span>
                            )}
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => editMember(member)}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                        >
                          <Mail className="w-3 h-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => removeMember(member)}
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

          <TabsContent value="teams" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teams.map((team) => (
                <Card key={team.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{team.name}</CardTitle>
                      {getStatusBadge(team.status)}
                    </div>
                    <CardDescription>{team.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{team.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${team.progress}%` }}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span>Team Lead</span>
                        <span className="font-medium">
                          {teamMembers.find(m => m.id === team.leadId)?.name}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span>Members</span>
                        <span className="font-medium">{team.members.length}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span>Projects</span>
                        <span className="font-medium">{team.projects.length}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span>Budget</span>
                        <span className="font-medium">{team.budget}</span>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Users className="w-3 h-3 mr-1" />
                          Members
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {teamMembers
                .sort((a, b) => {
                  const performanceOrder = { excellent: 4, good: 3, average: 2, "needs-improvement": 1 };
                  return performanceOrder[b.performance as keyof typeof performanceOrder] - 
                         performanceOrder[a.performance as keyof typeof performanceOrder];
                })
                .map((member, index) => (
                <Card key={member.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-muted-foreground">
                            #{index + 1}
                          </span>
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <h4 className="font-semibold">{member.name}</h4>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-sm font-medium">{member.tasks.completed}</div>
                          <div className="text-xs text-muted-foreground">Completed</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">{member.projects}</div>
                          <div className="text-xs text-muted-foreground">Projects</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">{member.workload}%</div>
                          <div className="text-xs text-muted-foreground">Workload</div>
                        </div>
                        {getPerformanceBadge(member.performance)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="workload" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Workload Distribution</CardTitle>
                  <CardDescription>Current team member workload percentages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{member.name}</span>
                          <span className={`${member.workload > 90 ? 'text-red-600' : member.workload > 70 ? 'text-yellow-600' : 'text-green-600'}`}>
                            {member.workload}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all ${
                              member.workload > 90 ? 'bg-red-500' : 
                              member.workload > 70 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${member.workload}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Availability Status</CardTitle>
                  <CardDescription>Real-time team availability</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback className="text-xs">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-1 -right-1">
                              {getAvailabilityIcon(member.availability)}
                            </div>
                          </div>
                          <span className="text-sm font-medium">{member.name}</span>
                        </div>
                        <Badge variant="outline" className="text-xs capitalize">
                          {member.availability}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}