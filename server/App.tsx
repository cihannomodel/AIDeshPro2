// Mobile & PWA pages
import { lazy, Suspense, useEffect, useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Overview from "@/pages/dashboard/Overview";
import Analytics from "@/pages/dashboard/Analytics";
import Sales from "@/pages/dashboard/Sales";
import Projects from "@/pages/dashboard/Projects";
import Reports from "@/pages/dashboard/Reports";
import Performance from "@/pages/dashboard/Performance";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Roles from "@/pages/auth/Roles";
import JWT from "@/pages/auth/JWT";
import OpenAI from "@/pages/integrations/OpenAI";
import GoogleAnalytics from "@/pages/integrations/GoogleAnalytics";
import GoogleAds from "@/pages/integrations/GoogleAds";
import SocialMedia from "@/pages/integrations/SocialMedia";
import EmailMarketing from "@/pages/integrations/EmailMarketing";
import Payments from "@/pages/integrations/Payments";
import CustomReports from "@/pages/CustomReports";
import ExportTools from "@/pages/ExportTools";
import Visualization from "@/pages/analytics/Visualization";
import Trends from "@/pages/analytics/Trends";
import APIConfiguration from "@/pages/settings/APIConfiguration";
import GeneralSettings from "@/pages/settings/GeneralSettings";
import Notifications from "@/pages/settings/Notifications";
import DataBackup from "@/pages/settings/DataBackup";
import DashboardPreferences from "@/pages/settings/DashboardPreferences";
import ChartPreferences from "@/pages/settings/ChartPreferences";

import ThemeBuilder from "@/pages/customization/ThemeBuilder";
import WidgetLibrary from "@/pages/customization/WidgetLibrary";
import Branding from "@/pages/customization/Branding";
import LayoutDesigner from "@/pages/customization/LayoutDesigner";
import ResponsivePreview from "@/pages/mobile/ResponsivePreview";
import PWAFeatures from "@/pages/mobile/PWAFeatures";
import OfflineStorage from "@/pages/mobile/OfflineStorage";
import KPITracking from "@/pages/business/KPITracking";
import FinancialOverview from "@/pages/business/FinancialOverview";
import RevenueAnalytics from "@/pages/business/RevenueAnalytics";
import CustomerInsights from "@/pages/business/CustomerInsights";
import DataTables from "@/pages/data/DataTables";
import ImportExport from "@/pages/data/ImportExport";
import DataSources from "@/pages/data/DataSources";
import APIConnections from "@/pages/data/APIConnections";
import AIInsights from "@/pages/ai/AIInsights";
import PredictiveAnalytics from "@/pages/ai/PredictiveAnalytics";
import SmartRecommendations from "@/pages/ai/SmartRecommendations";
import AutomatedReports from "@/pages/ai/AutomatedReports";
import UserManagement from "@/pages/management/UserManagement";
import TeamManagement from "@/pages/management/TeamManagement";
import Permissions from "@/pages/management/Permissions";
import ActivityLogs from "@/pages/management/ActivityLogs";
import NotFound from "@/pages/not-found";
import LicenseActivation from "@/pages/LicenseActivation";
import { LicenseGate } from "@/components/LicenseGate";
import { licenseValidator } from "@/lib/license-validation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Overview} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/sales" component={Sales} />
      <Route path="/projects" component={Projects} />
      <Route path="/reports" component={Reports} />
      <Route path="/performance" component={Performance} />
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/register" component={Register} />
      <Route path="/auth/roles" component={Roles} />
      <Route path="/auth/jwt" component={JWT} />
      <Route path="/integrations/openai" component={OpenAI} />
      <Route path="/integrations/google-analytics" component={GoogleAnalytics} />
      <Route path="/integrations/google-ads" component={GoogleAds} />
      <Route path="/integrations/social-media" component={SocialMedia} />
      <Route path="/integrations/email-marketing" component={EmailMarketing} />
      <Route path="/integrations/payments" component={Payments} />
      <Route path="/custom-reports" component={CustomReports} />
      <Route path="/export-tools" component={ExportTools} />
      <Route path="/visualization" component={Visualization} />
      <Route path="/trends" component={Trends} />
      <Route path="/settings/api-configuration" component={APIConfiguration} />
      <Route path="/settings" component={GeneralSettings} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/settings/backup" component={DataBackup} />
      <Route path="/settings/dashboard-preferences" component={DashboardPreferences} />
      <Route path="/settings/chart-preferences" component={ChartPreferences} />

      <Route path="/customization/theme-builder" component={ThemeBuilder} />
      <Route path="/customization/widgets" component={WidgetLibrary} />
      <Route path="/customization/branding" component={Branding} />
      <Route path="/customization/layout" component={LayoutDesigner} />
      <Route path="/mobile/responsive" component={ResponsivePreview} />
      <Route path="/mobile/pwa" component={PWAFeatures} />
      <Route path="/mobile/offline" component={OfflineStorage} />

      {/* Business Intelligence Routes */}
      <Route path="/business/kpi-tracking" component={KPITracking} />
      <Route path="/business/financial-overview" component={FinancialOverview} />
      <Route path="/business/revenue-analytics" component={RevenueAnalytics} />
      <Route path="/business/customer-insights" component={CustomerInsights} />

      {/* Data Management Routes */}
      <Route path="/data/data-tables" component={DataTables} />
      <Route path="/data/import-export" component={ImportExport} />
      <Route path="/data/data-sources" component={DataSources} />
      <Route path="/data/api-connections" component={APIConnections} />

      {/* AI Features Routes */}
      <Route path="/ai-insights" component={AIInsights} />
      <Route path="/predictive" component={PredictiveAnalytics} />
      <Route path="/recommendations" component={SmartRecommendations} />
      <Route path="/automated" component={AutomatedReports} />

      {/* Management Routes */}
      <Route path="/management/users" component={UserManagement} />
      <Route path="/management/teams" component={TeamManagement} />
      <Route path="/management/permissions" component={Permissions} />
      <Route path="/management/activity-logs" component={ActivityLogs} />

      {/* License Management */}
      <Route path="/license" component={LicenseActivation} />

      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [hasValidLicense, setHasValidLicense] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user already has a valid license
    const currentLicense = licenseValidator.getCurrentLicense();
    if (currentLicense?.isActive) {
      setHasValidLicense(true);
    }
    setIsLoading(false);
  }, []);

  const handleLicenseActivated = () => {
    setHasValidLicense(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          {!hasValidLicense ? (
            <LicenseGate onLicenseActivated={handleLicenseActivated} />
          ) : (
            <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
              <Router />
            </Suspense>
          )}
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;