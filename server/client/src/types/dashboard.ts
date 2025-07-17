export interface StatCard {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
  color: string;
}

export interface ChartData {
  name: string;
  value: number;
  date?: string;
}

export interface Transaction {
  id: string;
  customer: string;
  email: string;
  amount: string;
  status: 'completed' | 'pending' | 'failed';
  avatar: string;
}

export interface Product {
  id: string;
  name: string;
  sales: string;
  revenue: string;
  growth: string;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  status: 'online' | 'away' | 'offline';
  avatar: string;
}

export interface AIInsight {
  id: string;
  type: 'opportunity' | 'alert' | 'prediction' | 'recommendation';
  title: string;
  description: string;
  icon: string;
  color: string;
  actionText?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: string;
  children?: NavigationItem[];
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

export interface DashboardData {
  stats: StatCard[];
  revenueData: ChartData[];
  activityData: ChartData[];
  transactions: Transaction[];
  topProducts: Product[];
  teamMembers: TeamMember[];
  aiInsights: AIInsight[];
}

export interface IndustryTemplate {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  navigation: NavigationSection[];
  features: string[];
}
