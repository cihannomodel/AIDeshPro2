import { MainLayout } from "@/components/layout/MainLayout";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { ChartsSection } from "@/components/dashboard/ChartsSection";
import { AIInsightsSection } from "@/components/dashboard/AIInsightsSection";
import { DataTablesSection } from "@/components/dashboard/DataTablesSection";
import { WidgetsShowcase } from "@/components/dashboard/WidgetsShowcase";
import { ChatBot } from "@/components/ai/ChatBot";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useModal } from "@/components/ui/modal";
import { RefreshCw, Download, Calendar, Settings } from "lucide-react";

export default function Overview() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const { showModal, ModalComponent } = useModal();
  
  const dateRangeOptions = [
    "Last 7 Days",
    "Last 30 Days", 
    "Last 3 Months",
    "Last 6 Months",
    "Last Year",
    "Custom Range"
  ];
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date());
    }, 1000);
  };
  
  const handleExport = () => {
    const data = {
      overview: "Dashboard Overview Data",
      timestamp: new Date().toISOString(),
      stats: "Mock dashboard statistics",
      charts: "Chart data export"
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dashboard-overview.json';
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const dashboardData = {
    totalRevenue: "$425,789",
    totalUsers: "12,543",
    activeProjects: "38",
    conversionRate: "3.4%",
    recentActivity: "Updated 2 minutes ago"
  };
  
  return (
    <MainLayout title="Dashboard Overview">
      <div className="space-y-6 animate-fade-in">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Quick Actions</CardTitle>
              <div className="flex gap-2">
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[180px]">
                    <Calendar className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {dateRangeOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleExport()}>
                      Export as JSON
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => showModal({
                      title: "CSV Export",
                      message: "CSV export özelliği burada implement edilecek. Dashboard verileriniz CSV formatında indirilecek.",
                      type: "info"
                    })}>
                      Export as CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => showModal({
                      title: "PDF Export", 
                      message: "PDF export özelliği burada implement edilecek. Dashboard özeti PDF formatında oluşturulacak.",
                      type: "info"
                    })}>
                      Export as PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => showModal({
                      title: "Excel Export",
                      message: "Excel export özelliği burada implement edilecek. Detaylı dashboard verileri Excel formatında hazırlanacak.",
                      type: "info"
                    })}>
                      Export as Excel
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                  <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => showModal({
                      title: "Dashboard Ayarları",
                      message: "Dashboard ayarları paneli burada açılacak. Widget düzeni, gösterilecek veriler ve kişiselleştirme seçenekleri burada ayarlanabilir.",
                      type: "info"
                    })}>
                      Dashboard Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => showModal({
                      title: "Bildirim Ayarları",
                      message: "Bildirim ayarları paneli burada açılacak. Email bildirimleri, push notifications ve alert tercihleri ayarlanabilir.",
                      type: "info"
                    })}>
                      Notifications
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => showModal({
                      title: "Tema Ayarları",
                      message: "Tema ayarları paneli burada açılacak. Karanlık/aydınlık mod, renk teması ve görünüm tercihleri değiştirilebilir.",
                      type: "info"
                    })}>
                      Theme Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => showModal({
                      title: "Veri Tercihleri",
                      message: "Veri tercihleri paneli burada açılacak. Varsayılan tarih aralıkları, metrikler ve veri görünüm ayarları yapılabilir.",
                      type: "info"
                    })}>
                      Data Preferences
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Last updated: {lastUpdated.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <StatsGrid />
        <ChartsSection />
        <AIInsightsSection />
        <DataTablesSection />
        <WidgetsShowcase />
        
        {/* AI ChatBot */}
        <ChatBot dashboardData={dashboardData} />
      </div>
      <ModalComponent />
    </MainLayout>
  );
}
