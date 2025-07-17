import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useModal } from "@/components/ui/modal";
import { 
  Database, Plus, Settings, Trash2, 
  CheckCircle, AlertCircle, Clock, RefreshCw,
  Cloud, Server, Laptop, Globe, Zap
} from "lucide-react";

interface DataSource {
  id: string;
  name: string;
  type: "database" | "api" | "file" | "cloud" | "stream";
  status: "connected" | "disconnected" | "error" | "syncing";
  host: string;
  lastSync: string;
  recordCount: number;
  syncFrequency: string;
  autoSync: boolean;
  tableCount?: number;
  apiVersion?: string;
  fileFormat?: string;
}

const mockDataSources: DataSource[] = [
  {
    id: "ds_1",
    name: "Primary PostgreSQL",
    type: "database",
    status: "connected",
    host: "prod-db.company.com",
    lastSync: "2024-07-16 15:30:00",
    recordCount: 125000,
    syncFrequency: "Real-time",
    autoSync: true,
    tableCount: 45
  },
  {
    id: "ds_2",
    name: "Salesforce CRM API",
    type: "api",
    status: "connected",
    host: "api.salesforce.com",
    lastSync: "2024-07-16 15:25:00",
    recordCount: 8750,
    syncFrequency: "Every 15 minutes",
    autoSync: true,
    apiVersion: "v52.0"
  },
  {
    id: "ds_3",
    name: "AWS S3 Data Lake",
    type: "cloud",
    status: "syncing",
    host: "s3.amazonaws.com/data-lake",
    lastSync: "2024-07-16 14:45:00",
    recordCount: 2400000,
    syncFrequency: "Daily at 2:00 AM",
    autoSync: true
  },
  {
    id: "ds_4",
    name: "Excel Data Files",
    type: "file",
    status: "error",
    host: "local://data/excel/",
    lastSync: "2024-07-16 12:30:00",
    recordCount: 0,
    syncFrequency: "Manual",
    autoSync: false,
    fileFormat: "XLSX"
  },
  {
    id: "ds_5",
    name: "Kafka Stream",
    type: "stream",
    status: "connected",
    host: "kafka.analytics.com:9092",
    lastSync: "2024-07-16 15:35:00",
    recordCount: 567890,
    syncFrequency: "Real-time",
    autoSync: true
  }
];

export default function DataSources() {
  const [dataSources, setDataSources] = useState(mockDataSources);
  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null);
  const [newSourceType, setNewSourceType] = useState("database");
  const { showModal, ModalComponent } = useModal();

  const testConnection = (sourceId: string) => {
    const source = dataSources.find(ds => ds.id === sourceId);
    if (!source) return;

    setDataSources(prev => prev.map(ds => 
      ds.id === sourceId ? { ...ds, status: "syncing" } : ds
    ));

    setTimeout(() => {
      const success = Math.random() > 0.2;
      setDataSources(prev => prev.map(ds => 
        ds.id === sourceId ? { 
          ...ds, 
          status: success ? "connected" : "error",
          lastSync: success ? new Date().toLocaleString() : ds.lastSync
        } : ds
      ));

      showModal({
        title: success ? "Connection Successful" : "Connection Failed",
        message: success 
          ? `Successfully connected to ${source.name}. Data synchronization is active.`
          : `Failed to connect to ${source.name}. Please check your connection settings and credentials.`,
        type: success ? "success" : "error"
      });
    }, 2000);
  };

  const syncData = (sourceId: string) => {
    const source = dataSources.find(ds => ds.id === sourceId);
    if (!source) return;

    setDataSources(prev => prev.map(ds => 
      ds.id === sourceId ? { ...ds, status: "syncing" } : ds
    ));

    setTimeout(() => {
      const newRecordCount = source.recordCount + Math.floor(Math.random() * 1000);
      setDataSources(prev => prev.map(ds => 
        ds.id === sourceId ? { 
          ...ds, 
          status: "connected",
          lastSync: new Date().toLocaleString(),
          recordCount: newRecordCount
        } : ds
      ));

      showModal({
        title: "Data Sync Completed",
        message: `Successfully synchronized data from ${source.name}. ${newRecordCount - source.recordCount} new records imported.`,
        type: "success"
      });
    }, 3000);
  };

  const addDataSource = () => {
    const newSource: DataSource = {
      id: `ds_${Date.now()}`,
      name: `New ${newSourceType.charAt(0).toUpperCase() + newSourceType.slice(1)} Source`,
      type: newSourceType as any,
      status: "disconnected",
      host: "Configure connection...",
      lastSync: "Never",
      recordCount: 0,
      syncFrequency: "Manual",
      autoSync: false
    };

    setDataSources([...dataSources, newSource]);
    setSelectedSource(newSource);

    showModal({
      title: "Data Source Added",
      message: "New data source has been created. Please configure the connection settings to start syncing data.",
      type: "info"
    });
  };

  const removeDataSource = (sourceId: string) => {
    const source = dataSources.find(ds => ds.id === sourceId);
    if (!source) return;

    showModal({
      title: "Remove Data Source",
      message: `Are you sure you want to remove "${source.name}"? This will stop all data synchronization and cannot be undone.`,
      type: "warning",
      showCancel: true,
      onConfirm: () => {
        setDataSources(prev => prev.filter(ds => ds.id !== sourceId));
        if (selectedSource?.id === sourceId) {
          setSelectedSource(null);
        }
        showModal({
          title: "Data Source Removed",
          message: `${source.name} has been successfully removed from your data sources.`,
          type: "success"
        });
      }
    });
  };

  const toggleAutoSync = (sourceId: string) => {
    setDataSources(prev => prev.map(ds => 
      ds.id === sourceId ? { ...ds, autoSync: !ds.autoSync } : ds
    ));

    const source = dataSources.find(ds => ds.id === sourceId);
    const newState = !source?.autoSync;

    showModal({
      title: "Auto-Sync Updated",
      message: `Auto-sync has been ${newState ? "enabled" : "disabled"} for ${source?.name}. ${newState ? "Data will sync automatically based on the configured frequency." : "Manual sync will be required."}`,
      type: "info"
    });
  };

  const configureSource = (source: DataSource) => {
    setSelectedSource(source);
    showModal({
      title: "Configuration Panel",
      message: `Configuration panel for ${source.name} would open here. You can modify connection settings, sync frequency, and data mapping options.`,
      type: "info"
    });
  };

  const getSourceIcon = (type: string) => {
    switch (type) {
      case "database":
        return <Database className="w-5 h-5 text-blue-600" />;
      case "api":
        return <Globe className="w-5 h-5 text-green-600" />;
      case "cloud":
        return <Cloud className="w-5 h-5 text-purple-600" />;
      case "file":
        return <Laptop className="w-5 h-5 text-orange-600" />;
      case "stream":
        return <Zap className="w-5 h-5 text-yellow-600" />;
      default:
        return <Server className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "syncing":
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-800">Connected</Badge>;
      case "syncing":
        return <Badge className="bg-blue-100 text-blue-800">Syncing</Badge>;
      case "error":
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Disconnected</Badge>;
    }
  };

  return (
    <MainLayout title="Data Sources">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Data Sources Management</h1>
            <p className="text-muted-foreground mt-1">
              Connect and manage multiple data sources with real-time synchronization
            </p>
          </div>
          <div className="flex gap-3">
            <Select value={newSourceType} onValueChange={setNewSourceType}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="database">Database</SelectItem>
                <SelectItem value="api">API</SelectItem>
                <SelectItem value="cloud">Cloud Storage</SelectItem>
                <SelectItem value="file">File System</SelectItem>
                <SelectItem value="stream">Data Stream</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={addDataSource}>
              <Plus className="w-4 h-4 mr-2" />
              Add Source
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Database className="w-8 h-8 text-blue-600" />
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">{dataSources.length}</div>
                <p className="text-sm text-muted-foreground">Total Sources</p>
                <p className="text-xs text-blue-600 mt-1">
                  {dataSources.filter(ds => ds.status === "connected").length} active
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <RefreshCw className="w-8 h-8 text-green-600" />
                <Clock className="w-4 h-4 text-green-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">
                  {dataSources.reduce((sum, ds) => sum + ds.recordCount, 0).toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">Total Records</p>
                <p className="text-xs text-green-600 mt-1">Synced across all sources</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Zap className="w-8 h-8 text-purple-600" />
                <Badge variant="secondary" className="text-green-600 bg-green-100">
                  Active
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">
                  {dataSources.filter(ds => ds.autoSync).length}
                </div>
                <p className="text-sm text-muted-foreground">Auto-Sync Enabled</p>
                <p className="text-xs text-purple-600 mt-1">Real-time sync active</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <AlertCircle className="w-8 h-8 text-red-600" />
                <Clock className="w-4 h-4 text-red-500" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">
                  {dataSources.filter(ds => ds.status === "error").length}
                </div>
                <p className="text-sm text-muted-foreground">Connection Issues</p>
                <p className="text-xs text-red-600 mt-1">Requires attention</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="sources" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sources">Data Sources</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="templates">Connection Templates</TabsTrigger>
          </TabsList>

          {/* Sources Tab */}
          <TabsContent value="sources" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sources List */}
              <Card>
                <CardHeader>
                  <CardTitle>Connected Data Sources</CardTitle>
                  <CardDescription>Manage your data source connections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dataSources.map((source) => (
                    <div 
                      key={source.id} 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedSource?.id === source.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedSource(source)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          {getSourceIcon(source.type)}
                          <div>
                            <h4 className="font-medium">{source.name}</h4>
                            <p className="text-sm text-muted-foreground">{source.host}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(source.status)}
                          {getStatusBadge(source.status)}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Records:</span>
                          <span className="ml-2 font-medium">{source.recordCount.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Last sync:</span>
                          <span className="ml-2 font-medium">{source.lastSync}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">Auto-sync:</span>
                          <Switch 
                            checked={source.autoSync} 
                            onCheckedChange={() => toggleAutoSync(source.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              testConnection(source.id);
                            }}
                            disabled={source.status === "syncing"}
                          >
                            Test
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              syncData(source.id);
                            }}
                            disabled={source.status === "syncing" || source.status === "error"}
                          >
                            Sync
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Source Details */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedSource ? `${selectedSource.name} Details` : "Select a Data Source"}
                  </CardTitle>
                  <CardDescription>
                    {selectedSource ? "Configure and monitor data source" : "Choose a data source to view details"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedSource ? (
                    <div className="space-y-6">
                      {/* Connection Details */}
                      <div className="space-y-4">
                        <h4 className="font-medium">Connection Information</h4>
                        <div className="grid grid-cols-1 gap-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Type:</span>
                            <span className="capitalize">{selectedSource.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Host:</span>
                            <span className="font-mono text-sm">{selectedSource.host}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Status:</span>
                            {getStatusBadge(selectedSource.status)}
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Sync Frequency:</span>
                            <span>{selectedSource.syncFrequency}</span>
                          </div>
                          {selectedSource.tableCount && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Tables:</span>
                              <span>{selectedSource.tableCount}</span>
                            </div>
                          )}
                          {selectedSource.apiVersion && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">API Version:</span>
                              <span>{selectedSource.apiVersion}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Configuration Form */}
                      <div className="space-y-4">
                        <h4 className="font-medium">Configuration</h4>
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="sync-frequency">Sync Frequency</Label>
                            <Select defaultValue="15min">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="realtime">Real-time</SelectItem>
                                <SelectItem value="5min">Every 5 minutes</SelectItem>
                                <SelectItem value="15min">Every 15 minutes</SelectItem>
                                <SelectItem value="hourly">Hourly</SelectItem>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="manual">Manual only</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="connection-timeout">Connection Timeout (seconds)</Label>
                            <Input id="connection-timeout" type="number" defaultValue="30" />
                          </div>
                          
                          <div>
                            <Label htmlFor="retry-attempts">Retry Attempts</Label>
                            <Input id="retry-attempts" type="number" defaultValue="3" />
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Button onClick={() => configureSource(selectedSource)}>
                          <Settings className="w-4 h-4 mr-2" />
                          Configure
                        </Button>
                        <Button variant="outline" onClick={() => testConnection(selectedSource.id)}>
                          Test Connection
                        </Button>
                        <Button 
                          variant="destructive" 
                          onClick={() => removeDataSource(selectedSource.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Select a data source from the list to view and configure its settings.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Source Monitoring</CardTitle>
                <CardDescription>Real-time monitoring and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">99.8%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">2.3s</div>
                    <div className="text-sm text-muted-foreground">Avg Response Time</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">156K</div>
                    <div className="text-sm text-muted-foreground">Records/Hour</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Connection Templates</CardTitle>
                <CardDescription>Pre-configured templates for common data sources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "PostgreSQL Database", type: "database", icon: "Database" },
                    { name: "MySQL Database", type: "database", icon: "Database" },
                    { name: "REST API", type: "api", icon: "Globe" },
                    { name: "AWS S3", type: "cloud", icon: "Cloud" },
                    { name: "Google Sheets", type: "file", icon: "Laptop" },
                    { name: "Kafka Stream", type: "stream", icon: "Zap" }
                  ].map((template, index) => (
                    <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          {getSourceIcon(template.type)}
                          <div>
                            <h4 className="font-medium">{template.name}</h4>
                            <p className="text-sm text-muted-foreground capitalize">{template.type} connection</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-3">
                          Use Template
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
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