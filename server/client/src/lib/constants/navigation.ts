import { NavigationSection } from "@/types/dashboard";

export const navigationSections: NavigationSection[] = [
  {
    title: "Dashboard",
    items: [
      { id: "overview", label: "Overview", icon: "home", path: "/" },
      { id: "analytics", label: "Analytics", icon: "trending-up", path: "/analytics" },
      { id: "sales", label: "Sales", icon: "shopping-cart", path: "/sales" },
      { id: "projects", label: "Projects", icon: "folder", path: "/projects" },
      { id: "custom-reports", label: "Custom Reports", icon: "file-text", path: "/custom-reports" },
      { id: "export-tools", label: "Export Tools", icon: "download", path: "/export-tools" },
    ],
  },
  {
    title: "Authentication",
    items: [
      { id: "login", label: "Login", icon: "log-in", path: "/auth/login" },
      { id: "register", label: "Register", icon: "user-plus", path: "/auth/register" },
      { id: "roles", label: "Role Management", icon: "shield-check", path: "/auth/roles" },
    ],
  },

  {
    title: "Integrations",
    items: [
      { id: "openai", label: "OpenAI / Claude", icon: "brain", path: "/integrations/openai" },
      { id: "google-analytics", label: "Google Analytics", icon: "trending-up", path: "/integrations/google-analytics" },
      { id: "social-media", label: "Social Media APIs", icon: "share-2", path: "/integrations/social-media" },
      { id: "payment-gateways", label: "Payment Gateways", icon: "credit-card", path: "/integrations/payments" },
    ],
  },
  {
    title: "Customization",
    items: [
      { id: "theme-builder", label: "Theme Builder", icon: "palette", path: "/customization/theme-builder" },
      { id: "widget-library", label: "Widget Library", icon: "layout-grid", path: "/customization/widgets" },
      { id: "branding", label: "Branding & Logo", icon: "image", path: "/customization/branding" },
      { id: "layout-designer", label: "Layout Designer", icon: "grid-3x3", path: "/customization/layout" },
    ],
  },
  {
    title: "Mobile & PWA",
    items: [
      { id: "responsive-preview", label: "Responsive Preview", icon: "smartphone", path: "/mobile/responsive" },
      { id: "pwa-features", label: "PWA Features", icon: "monitor", path: "/mobile/pwa" },
      { id: "offline-storage", label: "Offline Storage", icon: "wifi-off", path: "/mobile/offline" },
    ],
  },
  {
    title: "Business Intelligence",
    items: [
      { id: "kpi", label: "KPI Tracking", icon: "target", path: "/business/kpi-tracking" },
      { id: "financial", label: "Financial Overview", icon: "dollar-sign", path: "/business/financial-overview" },
      { id: "revenue", label: "Revenue Analytics", icon: "chart-line", path: "/business/revenue-analytics" },
    ],
  },
  {
    title: "Data Management",
    items: [
      { id: "tables", label: "Data Tables", icon: "table", path: "/data/data-tables" },
      { id: "import-export", label: "Import/Export", icon: "upload", path: "/data/import-export" },
      { id: "sources", label: "Data Sources", icon: "database", path: "/data/data-sources" },
      { id: "api", label: "API Connections", icon: "link", path: "/data/api-connections" },
      { id: "backup", label: "Data Backup", icon: "hard-drive", path: "/settings/backup" },
    ],
  },
  {
    title: "AI Features",
    items: [
      { id: "ai-insights", label: "AI Insights", icon: "lightbulb", path: "/ai-insights" },
      { id: "predictive", label: "Predictive Analytics", icon: "zap", path: "/predictive" },
      { id: "recommendations", label: "Smart Recommendations", icon: "brain", path: "/recommendations" },
    ],
  },
  {
    title: "Management",
    items: [
      { id: "users", label: "User Management", icon: "users", path: "/management/users" },
      { id: "team", label: "Team Management", icon: "user-check", path: "/management/teams" },
      { id: "permissions", label: "Permissions", icon: "shield", path: "/management/permissions" },
      { id: "activity", label: "Activity Logs", icon: "clock", path: "/management/activity-logs" },
    ],
  },
  {
    title: "User Preferences",
    items: [
      { id: "general", label: "General Settings", icon: "settings", path: "/settings" },
      { id: "notifications", label: "Notifications", icon: "bell", path: "/notifications" },
      { id: "api-configuration", label: "API Keys & Security", icon: "key", path: "/settings/api-configuration" },
      { id: "dashboard-prefs", label: "Dashboard Layout", icon: "grid-3x3", path: "/settings/dashboard-preferences" },
      { id: "chart-prefs", label: "Chart Preferences", icon: "bar-chart-3", path: "/settings/chart-preferences" },
      { id: "license", label: "License Management", icon: "shield-check", path: "/license", badge: "KEY" },
    ],
  },
];
