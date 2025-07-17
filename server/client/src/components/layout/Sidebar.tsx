import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { navigationSections } from "@/lib/constants/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Home, 
  TrendingUp, 
  ShoppingCart, 
  Folder,
  BarChart3,
  PieChart,
  Activity,
  Target,
  DollarSign,
  ChartLine,
  Users,
  Table,
  Upload,
  Database,
  Link as LinkIcon,
  Lightbulb,
  Zap,
  Bot,
  UserCheck,
  Shield,
  Clock,
  Settings,
  Palette,
  Bell,
  Plug,
  X,
  ChevronDown,
  ChevronRight,
  LogIn,
  UserPlus,
  ShieldCheck,
  Key,
  FileText,
  Download,
  Share2,
  Mail,
  CreditCard,
  LayoutGrid,
  Image,
  Grid3x3,
  Smartphone,
  Monitor,
  WifiOff,
  Search
} from "lucide-react";

const iconMap = {
  home: Home,
  "trending-up": TrendingUp,
  "shopping-cart": ShoppingCart,
  folder: Folder,
  "bar-chart-3": BarChart3,
  "pie-chart": PieChart,
  activity: Activity,
  target: Target,
  "dollar-sign": DollarSign,
  "chart-line": ChartLine,
  users: Users,
  table: Table,
  upload: Upload,
  database: Database,
  link: LinkIcon,
  lightbulb: Lightbulb,
  zap: Zap,
  brain: Brain,
  bot: Bot,
  "user-check": UserCheck,
  shield: Shield,
  clock: Clock,
  settings: Settings,
  palette: Palette,
  bell: Bell,
  plug: Plug,
  "log-in": LogIn,
  "user-plus": UserPlus,
  "shield-check": ShieldCheck,
  key: Key,
  "file-text": FileText,
  download: Download,
  "share-2": Share2,
  mail: Mail,
  "credit-card": CreditCard,
  "layout-grid": LayoutGrid,
  image: Image,
  "grid-3x3": Grid3x3,
  smartphone: Smartphone,
  monitor: Monitor,
  "wifi-off": WifiOff,
  search: Search,
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();
  
  // Route bazında scroll pozisyonlarını tut - useRef ile async problem yok
  const scrollPositions = useRef<Record<string, number>>({});

  // Route değişiminde scroll pozisyonunu kaydet ve geri yükle
  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    // Yeni route'a ait scroll pozisyonunu geri yükle
    sidebar.scrollTop = scrollPositions.current[location] || 0;
  }, [location]);

  // Scroll event ile pozisyonu route bazında kaydet
  const onScroll = () => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    // Mevcut route için scroll pozisyonunu kaydet
    scrollPositions.current[location] = sidebar.scrollTop;
  };
  
  // Find which section contains the current active page
  const getActiveSectionTitle = () => {
    const activeSection = navigationSections.find(section => 
      section.items.some(item => item.path === location)
    );
    return activeSection?.title || null;
  };

  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(() => {
    // All sections start collapsed by default
    return new Set(navigationSections.map(section => section.title));
  });

  // Only auto-open section when switching to a different route (not on page refresh)
  useEffect(() => {
    const activeSectionTitle = getActiveSectionTitle();
    if (activeSectionTitle && location !== "/") {
      // Only open if user navigates to a non-dashboard page
      setCollapsedSections(prev => {
        const newSet = new Set(prev);
        if (newSet.has(activeSectionTitle)) {
          newSet.delete(activeSectionTitle);
        }
        return newSet;
      });
    }
  }, [location]);

  const toggleSection = (sectionTitle: string) => {
    setCollapsedSections(prev => {
      const newSet = new Set(prev);
      
      if (newSet.has(sectionTitle)) {
        newSet.delete(sectionTitle); // Allow opening any section
      } else {
        newSet.add(sectionTitle); // Allow closing any section, including active one
      }
      return newSet;
    });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 sm:w-56 md:w-64 bg-card border-r border-border flex flex-col lg:translate-x-0",
          "transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-border flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">AI Dashboard</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Navigation Menu */}
        <div 
          ref={sidebarRef}
          onScroll={onScroll}
          className="flex-1 overflow-y-auto px-3 py-6"
        >
            <nav className="space-y-2">
              {navigationSections.map((section) => {
                const isCollapsed = collapsedSections.has(section.title);
                const hasActiveItem = section.items.some(item => location === item.path);
                
                return (
                  <div key={section.title}>
                    <button
                      onClick={() => toggleSection(section.title)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors rounded-md min-h-[44px]",
                        hasActiveItem 
                          ? "text-primary bg-primary/5" 
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      <span>{section.title}</span>
                      {isCollapsed ? (
                        <ChevronRight className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </button>
                    
                    {!isCollapsed && (
                      <ul className="mt-2 space-y-1 ml-2">
                        {section.items.map((item) => {
                          const Icon = iconMap[item.icon as keyof typeof iconMap];
                          const isActive = location === item.path;
                          
                          return (
                            <li key={item.id}>
                              <Link
                                href={item.path}
                                className={cn(
                                  "nav-link cursor-pointer min-h-[44px] flex items-center",
                                  isActive && "active"
                                )}
                              >
                                {Icon && <Icon className={cn("w-4 h-4 mr-3", isActive && "text-primary")} />}
                                <span className="flex-1">{item.label}</span>
                                {item.badge && (
                                  <Badge variant="secondary" className="ml-2">
                                    {item.badge}
                                  </Badge>
                                )}
                                {isActive && (
                                  <div className="w-2 h-2 bg-primary rounded-full ml-2 animate-pulse" />
                                )}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              })}
            </nav>
        </div>
        
        {/* AI Status Footer */}
        <div className="p-6 border-t border-border flex-shrink-0">
          <div className="flex items-center space-x-2 px-3 py-2 bg-green-500/10 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-green-600 dark:text-green-400">
              AI System Active
            </span>
          </div>
        </div>
      </div>
    </>
  );
}