import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useModal } from "@/components/ui/modal";
import { 
  Database, Trash2, Download, Upload, WifiOff, 
  HardDrive, RefreshCw, AlertCircle, CheckCircle 
} from "lucide-react";

interface StorageData {
  type: string;
  size: number;
  lastUpdated: string;
  status: 'synced' | 'pending' | 'offline';
}

const mockStorageData: StorageData[] = [
  {
    type: "Dashboard Analytics",
    size: 2.4,
    lastUpdated: "2 minutes ago",
    status: "synced"
  },
  {
    type: "User Preferences",
    size: 0.1,
    lastUpdated: "5 minutes ago", 
    status: "synced"
  },
  {
    type: "Recent Reports",
    size: 1.8,
    lastUpdated: "1 hour ago",
    status: "pending"
  },
  {
    type: "Chart Data Cache",
    size: 3.2,
    lastUpdated: "30 minutes ago",
    status: "offline"
  }
];

export default function OfflineStorage() {
  const [storageData, setStorageData] = useState(mockStorageData);
  const [totalUsed, setTotalUsed] = useState(7.5);
  const [totalAvailable] = useState(50);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { showModal, ModalComponent } = useModal();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const clearStorage = (type: string) => {
    setStorageData(prev => prev.filter(item => item.type !== type));
    setTotalUsed(prev => prev - mockStorageData.find(item => item.type === type)?.size || 0);
    
    showModal({
      title: "Storage Cleared",
      message: `${type} data has been removed from offline storage. This will free up space but data will need to be re-downloaded.`,
      type: "success"
    });
  };

  const syncData = (type: string) => {
    setStorageData(prev => prev.map(item => 
      item.type === type 
        ? { ...item, status: "synced" as const, lastUpdated: "Just now" }
        : item
    ));
    
    showModal({
      title: "Data Synced",
      message: `${type} has been successfully synced with the server. All changes are now saved.`,
      type: "success"
    });
  };

  const downloadForOffline = () => {
    const newData: StorageData = {
      type: "Emergency Backup",
      size: 1.2,
      lastUpdated: "Just now",
      status: "synced"
    };
    
    setStorageData(prev => [...prev, newData]);
    setTotalUsed(prev => prev + newData.size);
    
    showModal({
      title: "Data Downloaded",
      message: "Critical dashboard data has been cached for offline use. You can now work without internet connection.",
      type: "success"
    });
  };

  const simulateOfflineMode = () => {
    setIsOnline(false);
    showModal({
      title: "Offline Mode Activated",
      message: "Dashboard is now running in offline mode. You can view cached data and reports. Changes will sync when connection is restored.",
      type: "info"
    });
  };

  const getStatusIcon = (status: StorageData['status']) => {
    switch (status) {
      case 'synced': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending': return <RefreshCw className="w-4 h-4 text-yellow-500" />;
      case 'offline': return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: StorageData['status']) => {
    switch (status) {
      case 'synced': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <MainLayout title="Offline Storage">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Offline Storage Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage cached data for offline dashboard functionality
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={isOnline ? "default" : "destructive"}>
              {isOnline ? "Online" : "Offline"}
            </Badge>
            <Button onClick={downloadForOffline}>
              <Download className="w-4 h-4 mr-2" />
              Cache Data
            </Button>
          </div>
        </div>

        {/* Storage Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <HardDrive className="w-8 h-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{totalUsed} MB</div>
                  <div className="text-sm text-muted-foreground">Used Storage</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Database className="w-8 h-8 text-green-500" />
                <div>
                  <div className="text-2xl font-bold">{storageData.length}</div>
                  <div className="text-sm text-muted-foreground">Cached Items</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <WifiOff className="w-8 h-8 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm text-muted-foreground">Offline Ready</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="storage" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="storage">Storage Management</TabsTrigger>
            <TabsTrigger value="sync">Data Sync</TabsTrigger>
            <TabsTrigger value="settings">Offline Settings</TabsTrigger>
          </TabsList>

          {/* Storage Management Tab */}
          <TabsContent value="storage" className="space-y-6">
            {/* Storage Usage */}
            <Card>
              <CardHeader>
                <CardTitle>Storage Usage</CardTitle>
                <CardDescription>
                  {totalUsed} MB of {totalAvailable} MB used ({Math.round((totalUsed / totalAvailable) * 100)}%)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={(totalUsed / totalAvailable) * 100} className="w-full" />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>0 MB</span>
                  <span>{totalAvailable} MB</span>
                </div>
              </CardContent>
            </Card>

            {/* Cached Data */}
            <Card>
              <CardHeader>
                <CardTitle>Cached Data</CardTitle>
                <CardDescription>Manage locally stored dashboard data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {storageData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Database className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{item.type}</div>
                          <div className="text-sm text-muted-foreground">
                            {item.size} MB • Updated {item.lastUpdated}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(item.status)}
                          <Badge variant="secondary" className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </div>
                        
                        <div className="flex gap-2">
                          {item.status !== 'synced' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => syncData(item.type)}
                            >
                              <RefreshCw className="w-4 h-4" />
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => clearStorage(item.type)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Sync Tab */}
          <TabsContent value="sync" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sync Status</CardTitle>
                <CardDescription>Monitor data synchronization with the server</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-medium">Last Sync</span>
                    </div>
                    <div className="text-sm text-muted-foreground">2 minutes ago</div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <RefreshCw className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">Next Sync</span>
                    </div>
                    <div className="text-sm text-muted-foreground">In 3 minutes</div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button onClick={() => syncData("All Data")}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Sync Now
                  </Button>
                  <Button variant="outline" onClick={simulateOfflineMode}>
                    <WifiOff className="w-4 h-4 mr-2" />
                    Test Offline Mode
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sync Queue</CardTitle>
                <CardDescription>Changes waiting to be synchronized</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: "Updated dashboard preferences", time: "1 minute ago" },
                    { action: "Created new report filter", time: "5 minutes ago" },
                    { action: "Modified widget layout", time: "12 minutes ago" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{item.action}</div>
                        <div className="text-sm text-muted-foreground">{item.time}</div>
                      </div>
                      <Badge variant="secondary">Pending</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Offline Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Offline Configuration</CardTitle>
                <CardDescription>Configure how the dashboard behaves offline</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Auto-cache new data</div>
                      <div className="text-sm text-muted-foreground">Automatically store important data for offline use</div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Background sync</div>
                      <div className="text-sm text-muted-foreground">Sync data when connection is restored</div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Offline notifications</div>
                      <div className="text-sm text-muted-foreground">Show alerts when working offline</div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cache retention period</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option value="7">7 days</option>
                    <option value="30">30 days</option>
                    <option value="90">90 days</option>
                    <option value="never">Never expire</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Maximum cache size</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option value="50">50 MB</option>
                    <option value="100">100 MB</option>
                    <option value="250">250 MB</option>
                    <option value="500">500 MB</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <ModalComponent />
      </div>
    </MainLayout>
  );
}