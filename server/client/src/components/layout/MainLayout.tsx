import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";
import { ChatBot } from "../ai/ChatBot";
import { mockDashboardData } from "@/lib/data/mockData";

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function MainLayout({ children, title = "Dashboard Overview" }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Global scroll preservation (minimal approach)
  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Block only automatic scroll-to-top (0,0) calls
    const originalScrollTo = window.scrollTo;
    window.scrollTo = function(x?: number | ScrollToOptions, y?: number) {
      // Block only unwanted scroll-to-top calls
      if (typeof x === 'number' && x === 0 && typeof y === 'number' && y === 0) {
        return; // Prevent scroll to top
      }
      // Allow all other scroll behaviors
      return originalScrollTo.call(this, x as any, y);
    };

    return () => {
      window.scrollTo = originalScrollTo;
    };
  }, []);

  // Prepare dashboard data for AI context
  const dashboardData = {
    totalRevenue: mockDashboardData.stats.find(s => s.id === 'revenue')?.value || '$0',
    totalUsers: mockDashboardData.stats.find(s => s.id === 'users')?.value || '0',
    activeProjects: mockDashboardData.stats.find(s => s.id === 'projects')?.value || '0',
    conversionRate: mockDashboardData.stats.find(s => s.id === 'conversion')?.value || '0%',
    recentActivity: 'Dashboard viewed, charts analyzed'
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 lg:ml-64 md:ml-56 flex flex-col overflow-hidden">
        <TopNavbar 
          onMenuClick={() => setSidebarOpen(true)} 
          title={title}
        />
        
        <main 
          className="flex-1 overflow-y-auto p-4 sm:p-6"
        >
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      {/* AI ChatBot */}
      <ChatBot dashboardData={dashboardData} />
    </div>
  );
}
