import { 
  StatCard, 
  ChartData, 
  Transaction, 
  Product, 
  TeamMember, 
  AIInsight,
  DashboardData 
} from "@/types/dashboard";

export const statsData: StatCard[] = [
  {
    id: "revenue",
    title: "Total Revenue",
    value: "$847,293",
    change: "+12.5%",
    trend: "up",
    icon: "dollar-sign",
    color: "text-green-600",
  },
  {
    id: "users",
    title: "Active Users",
    value: "24,567",
    change: "+8.3%",
    trend: "up",
    icon: "users",
    color: "text-blue-600",
  },
  {
    id: "conversion",
    title: "Conversion Rate",
    value: "3.24%",
    change: "+2.1%",
    trend: "up",
    icon: "trending-up",
    color: "text-orange-600",
  },
  {
    id: "ai-accuracy",
    title: "AI Accuracy",
    value: "94.7%",
    change: "Machine Learning Active",
    trend: "up",
    icon: "brain",
    color: "text-purple-600",
  },
];

export const revenueData: ChartData[] = [
  { name: "Jan", value: 65000 },
  { name: "Feb", value: 78000 },
  { name: "Mar", value: 85000 },
  { name: "Apr", value: 72000 },
  { name: "May", value: 95000 },
  { name: "Jun", value: 88000 },
  { name: "Jul", value: 92000 },
];

export const activityData: ChartData[] = [
  { name: "Mon", value: 1200 },
  { name: "Tue", value: 1900 },
  { name: "Wed", value: 3000 },
  { name: "Thu", value: 2500 },
  { name: "Fri", value: 2200 },
  { name: "Sat", value: 1800 },
  { name: "Sun", value: 1600 },
];

export const transactionsData: Transaction[] = [
  {
    id: "1",
    customer: "Alex Johnson",
    email: "alex@example.com",
    amount: "$2,847",
    status: "completed",
    avatar: "/api/placeholder/32/32",
  },
  {
    id: "2",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    amount: "$1,234",
    status: "pending",
    avatar: "/api/placeholder/32/32",
  },
  {
    id: "3",
    customer: "Mike Chen",
    email: "mike@example.com",
    amount: "$895",
    status: "completed",
    avatar: "/api/placeholder/32/32",
  },
];

export const topProductsData: Product[] = [
  {
    id: "1",
    name: "Premium Dashboard Pro",
    sales: "2,847 sales",
    revenue: "$142,350",
    growth: "+23.5%",
    image: "/api/placeholder/48/48",
  },
  {
    id: "2",
    name: "Mobile Analytics App",
    sales: "1,923 sales",
    revenue: "$96,150",
    growth: "+18.2%",
    image: "/api/placeholder/48/48",
  },
  {
    id: "3",
    name: "SaaS Starter Kit",
    sales: "1,456 sales",
    revenue: "$72,800",
    growth: "+12.1%",
    image: "/api/placeholder/48/48",
  },
];

export const teamMembersData: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    status: "online",
    avatar: "/api/placeholder/24/24",
  },
  {
    id: "2",
    name: "Jane Smith",
    status: "away",
    avatar: "/api/placeholder/24/24",
  },
  {
    id: "3",
    name: "Mike Johnson",
    status: "offline",
    avatar: "/api/placeholder/24/24",
  },
];

export const aiInsightsData: AIInsight[] = [
  {
    id: "1",
    type: "opportunity",
    title: "Revenue Opportunity Detected",
    description: "Our AI predicts a 23% increase in conversions if you optimize the checkout process.",
    icon: "lightbulb",
    color: "text-green-400",
    actionText: "View details",
  },
  {
    id: "2",
    type: "alert",
    title: "User Engagement Alert",
    description: "Weekly active users decreased by 5%. Consider implementing the suggested engagement campaigns.",
    icon: "alert-triangle",
    color: "text-orange-400",
    actionText: "Take action",
  },
  {
    id: "3",
    type: "prediction",
    title: "Predictive Forecast",
    description: "Next month's revenue is projected to reach $1.2M based on current trends and seasonal patterns.",
    icon: "trending-up",
    color: "text-purple-400",
  },
];

export const mockDashboardData: DashboardData = {
  stats: statsData,
  revenueData,
  activityData,
  transactions: transactionsData,
  topProducts: topProductsData,
  teamMembers: teamMembersData,
  aiInsights: aiInsightsData,
};
