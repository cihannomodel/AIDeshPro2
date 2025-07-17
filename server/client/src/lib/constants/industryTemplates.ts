import { IndustryTemplate } from "@/types/dashboard";

export const industryTemplates: IndustryTemplate[] = [
  {
    id: "ecommerce",
    name: "E-commerce",
    description: "Complete dashboard for online retail businesses",
    primaryColor: "hsl(207, 90%, 54%)",
    features: [
      "Sales Analytics",
      "Inventory Management",
      "Customer Insights",
      "Revenue Tracking",
      "Product Performance",
      "Order Management"
    ],
    navigation: [
      {
        title: "Sales",
        items: [
          { id: "sales-overview", label: "Sales Overview", icon: "shopping-bag", path: "/sales" },
          { id: "orders", label: "Orders", icon: "package", path: "/orders" },
          { id: "revenue", label: "Revenue", icon: "dollar-sign", path: "/revenue" },
          { id: "customers", label: "Customers", icon: "users", path: "/customers" },
        ],
      },
      {
        title: "Inventory",
        items: [
          { id: "products", label: "Products", icon: "box", path: "/products" },
          { id: "stock", label: "Stock Levels", icon: "layers", path: "/stock" },
          { id: "suppliers", label: "Suppliers", icon: "truck", path: "/suppliers" },
        ],
      },
    ],
  },
  {
    id: "saas",
    name: "SaaS",
    description: "Software as a Service business dashboard",
    primaryColor: "hsl(262, 83%, 58%)",
    features: [
      "User Analytics",
      "Subscription Management",
      "Churn Analysis",
      "Feature Usage",
      "Revenue Metrics",
      "Support Analytics"
    ],
    navigation: [
      {
        title: "Metrics",
        items: [
          { id: "mrr", label: "MRR/ARR", icon: "trending-up", path: "/mrr" },
          { id: "churn", label: "Churn Rate", icon: "user-x", path: "/churn" },
          { id: "ltv", label: "Customer LTV", icon: "heart", path: "/ltv" },
          { id: "acquisition", label: "User Acquisition", icon: "user-plus", path: "/acquisition" },
        ],
      },
      {
        title: "Product",
        items: [
          { id: "features", label: "Feature Usage", icon: "activity", path: "/features" },
          { id: "feedback", label: "User Feedback", icon: "message-square", path: "/feedback" },
          { id: "roadmap", label: "Product Roadmap", icon: "map", path: "/roadmap" },
        ],
      },
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Medical and healthcare analytics dashboard",
    primaryColor: "hsl(142, 76%, 36%)",
    features: [
      "Patient Analytics",
      "Treatment Outcomes",
      "Resource Management",
      "Compliance Tracking",
      "Cost Analysis",
      "Quality Metrics"
    ],
    navigation: [
      {
        title: "Patients",
        items: [
          { id: "patient-overview", label: "Patient Overview", icon: "heart", path: "/patients" },
          { id: "appointments", label: "Appointments", icon: "calendar", path: "/appointments" },
          { id: "treatments", label: "Treatments", icon: "stethoscope", path: "/treatments" },
        ],
      },
      {
        title: "Operations",
        items: [
          { id: "resources", label: "Resources", icon: "building", path: "/resources" },
          { id: "staff", label: "Staff Management", icon: "users", path: "/staff" },
          { id: "compliance", label: "Compliance", icon: "shield-check", path: "/compliance" },
        ],
      },
    ],
  },
  {
    id: "finance",
    name: "Finance",
    description: "Financial services and banking dashboard",
    primaryColor: "hsl(32, 95%, 44%)",
    features: [
      "Portfolio Management",
      "Risk Analysis",
      "Trading Analytics",
      "Compliance Monitoring",
      "Market Data",
      "Client Management"
    ],
    navigation: [
      {
        title: "Portfolio",
        items: [
          { id: "portfolio-overview", label: "Portfolio Overview", icon: "pie-chart", path: "/portfolio" },
          { id: "performance", label: "Performance", icon: "trending-up", path: "/performance" },
          { id: "risk", label: "Risk Analysis", icon: "alert-triangle", path: "/risk" },
        ],
      },
      {
        title: "Trading",
        items: [
          { id: "trades", label: "Trades", icon: "repeat", path: "/trades" },
          { id: "market-data", label: "Market Data", icon: "bar-chart", path: "/market-data" },
          { id: "analytics", label: "Trading Analytics", icon: "line-chart", path: "/analytics" },
        ],
      },
    ],
  },
  {
    id: "education",
    name: "Education",
    description: "Educational institution management dashboard",
    primaryColor: "hsl(204, 94%, 44%)",
    features: [
      "Student Analytics",
      "Course Management",
      "Performance Tracking",
      "Attendance Monitoring",
      "Resource Planning",
      "Assessment Analytics"
    ],
    navigation: [
      {
        title: "Academic",
        items: [
          { id: "students", label: "Students", icon: "graduation-cap", path: "/students" },
          { id: "courses", label: "Courses", icon: "book", path: "/courses" },
          { id: "grades", label: "Grades", icon: "award", path: "/grades" },
        ],
      },
      {
        title: "Administration",
        items: [
          { id: "faculty", label: "Faculty", icon: "users", path: "/faculty" },
          { id: "resources", label: "Resources", icon: "library", path: "/resources" },
          { id: "scheduling", label: "Scheduling", icon: "calendar", path: "/scheduling" },
        ],
      },
    ],
  },
];
