import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useModal } from "@/components/ui/modal";
import {
  Database,
  Download,
  Upload,
  Calendar,
  Clock,
  Shield,
  HardDrive,
  Cloud,
  FileArchive,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Settings,
  Save,
  Trash2,
  Copy,
  ExternalLink
} from "lucide-react";

export default function DataBackup() {
  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    frequency: "daily", // hourly, daily, weekly, monthly
    time: "02:00",
    retention: 30, // days
    compression: true,
    encryption: true,
    includeFiles: true,
    includeDatabase: true,
    includeSettings: true,
    destination: "cloud", // local, cloud, both
    cloudProvider: "aws", // aws, google, azure
    notifyOnSuccess: true,
    notifyOnFailure: true
  });

  const [backupHistory, setBackupHistory] = useState([
    {
      id: "backup-001",
      date: "2025-07-16T02:00:00Z",
      size: "2.4 GB",
      duration: "12m 34s",
      status: "completed",
      type: "automatic",
      location: "AWS S3"
    },
    {
      id: "backup-002", 
      date: "2025-07-15T02:00:00Z",
      size: "2.3 GB",
      duration: "11m 45s",
      status: "completed",
      type: "automatic",
      location: "AWS S3"
    },
    {
      id: "backup-003",
      date: "2025-07-14T14:30:00Z", 
      size: "2.3 GB",
      duration: "10m 12s",
      status: "completed",
      type: "manual",
      location: "Local Storage"
    },
    {
      id: "backup-004",
      date: "2025-07-14T02:00:00Z",
      size: "2.2 GB", 
      duration: "13m 22s",
      status: "failed",
      type: "automatic",
      location: "AWS S3"
    },
    {
      id: "backup-005",
      date: "2025-07-13T02:00:00Z",
      size: "2.2 GB",
      duration: "9m 56s", 
      status: "completed",
      type: "automatic",
      location: "AWS S3"
    }
  ]);

  const [activeBackup, setActiveBackup] = useState<{
    progress: number;
    currentTask: string;
    isRunning: boolean;
  } | null>(null);

  const { toast } = useToast();
  const { showModal, ModalComponent } = useModal();

  const cloudProviders = [
    { value: "aws", label: "Amazon S3", icon: "🟠" },
    { value: "google", label: "Google Cloud Storage", icon: "🔵" },
    { value: "azure", label: "Azure Blob Storage", icon: "🔵" },
    { value: "dropbox", label: "Dropbox", icon: "🔷" }
  ];

  const updateSetting = (key: string, value: any) => {
    setBackupSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const startManualBackup = async () => {
    setActiveBackup({
      progress: 0,
      currentTask: "Initializing backup...",
      isRunning: true
    });

    const tasks = [
      "Preparing database export...",
      "Compressing files...", 
      "Encrypting data...",
      "Uploading to cloud storage...",
      "Verifying backup integrity...",
      "Finalizing backup..."
    ];

    for (let i = 0; i < tasks.length; i++) {
      setActiveBackup(prev => prev ? {
        ...prev,
        currentTask: tasks[i],
        progress: Math.round(((i + 1) / tasks.length) * 100)
      } : null);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Add new backup to history
    const newBackup = {
      id: `backup-${Date.now()}`,
      date: new Date().toISOString(),
      size: "2.5 GB",
      duration: `${Math.floor(Math.random() * 5) + 8}m ${Math.floor(Math.random() * 60)}s`,
      status: "completed" as const,
      type: "manual" as const,
      location: backupSettings.destination === "cloud" ? cloudProviders.find(p => p.value === backupSettings.cloudProvider)?.label || "Cloud" : "Local Storage"
    };

    setBackupHistory(prev => [newBackup, ...prev]);
    setActiveBackup(null);

    toast({
      title: "Backup Completed",
      description: "Manual backup has been completed successfully.",
    });
  };

  const downloadBackup = (backup: typeof backupHistory[0]) => {
    showModal({
      title: "Download Backup",
      message: `Preparing download for backup from ${new Date(backup.date).toLocaleDateString()}. The file will be downloaded to your device.`,
      type: "info"
    });

    // Simulate download preparation
    setTimeout(() => {
      toast({
        title: "Download Started",
        description: `Backup file (${backup.size}) download has started.`,
      });
    }, 1000);
  };

  const deleteBackup = (backupId: string) => {
    const backup = backupHistory.find(b => b.id === backupId);
    
    showModal({
      title: "Delete Backup",
      message: `Are you sure you want to delete the backup from ${backup ? new Date(backup.date).toLocaleDateString() : 'this date'}? This action cannot be undone.`,
      type: "warning",
      showCancel: true,
      onConfirm: () => {
        setBackupHistory(prev => prev.filter(b => b.id !== backupId));
        toast({
          title: "Backup Deleted",
          description: "The backup has been permanently deleted.",
        });
      }
    });
  };

  const restoreBackup = (backup: typeof backupHistory[0]) => {
    showModal({
      title: "Restore Backup",
      message: `Are you sure you want to restore the backup from ${new Date(backup.date).toLocaleDateString()}? This will replace all current data and settings.`,
      type: "warning", 
      showCancel: true,
      onConfirm: () => {
        toast({
          title: "Restore Started",
          description: "Backup restoration process has been initiated. You will be notified when complete.",
        });
      }
    });
  };

  const saveSettings = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Settings Saved",
      description: "Your backup settings have been updated successfully.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-500";
      case "failed": return "text-red-500";
      case "running": return "text-blue-500";
      default: return "text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "failed": return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "running": return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <MainLayout title="Data Backup">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Data Backup</h1>
            <p className="text-muted-foreground mt-1">
              Manage data backups and restore points
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={saveSettings}>
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
            <Button onClick={startManualBackup} disabled={activeBackup?.isRunning}>
              <Database className="w-4 h-4 mr-2" />
              Create Backup
            </Button>
          </div>
        </div>

        {/* Active Backup Progress */}
        {activeBackup?.isRunning && (
          <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <RefreshCw className="w-5 h-5 animate-spin text-blue-500" />
                <span>Backup in Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{activeBackup.currentTask}</span>
                  <span>{activeBackup.progress}%</span>
                </div>
                <Progress value={activeBackup.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Backup Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Backup Settings</span>
              </CardTitle>
              <CardDescription>
                Configure automatic backup preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Automatic Backup</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable scheduled backups
                  </p>
                </div>
                <Switch
                  checked={backupSettings.autoBackup}
                  onCheckedChange={(checked) => updateSetting('autoBackup', checked)}
                />
              </div>

              {backupSettings.autoBackup && (
                <>
                  <div className="space-y-2">
                    <Label>Frequency</Label>
                    <Select 
                      value={backupSettings.frequency}
                      onValueChange={(value) => updateSetting('frequency', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Every Hour</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Backup Time</Label>
                    <Input
                      type="time"
                      value={backupSettings.time}
                      onChange={(e) => updateSetting('time', e.target.value)}
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label>Retention Period (days)</Label>
                <Input
                  type="number"
                  value={backupSettings.retention}
                  onChange={(e) => updateSetting('retention', parseInt(e.target.value))}
                  min="1"
                  max="365"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Compression</Label>
                  <Switch
                    checked={backupSettings.compression}
                    onCheckedChange={(checked) => updateSetting('compression', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Encryption</Label>
                  <Switch
                    checked={backupSettings.encryption}
                    onCheckedChange={(checked) => updateSetting('encryption', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Backup Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileArchive className="w-5 h-5" />
                <span>Backup Content</span>
              </CardTitle>
              <CardDescription>
                Select what to include in backups
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Database</Label>
                    <p className="text-sm text-muted-foreground">
                      All data and tables
                    </p>
                  </div>
                  <Switch
                    checked={backupSettings.includeDatabase}
                    onCheckedChange={(checked) => updateSetting('includeDatabase', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Files & Media</Label>
                    <p className="text-sm text-muted-foreground">
                      Uploaded files and assets
                    </p>
                  </div>
                  <Switch
                    checked={backupSettings.includeFiles}
                    onCheckedChange={(checked) => updateSetting('includeFiles', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Settings & Config</Label>
                    <p className="text-sm text-muted-foreground">
                      Application settings
                    </p>
                  </div>
                  <Switch
                    checked={backupSettings.includeSettings}
                    onCheckedChange={(checked) => updateSetting('includeSettings', checked)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Storage Destination</Label>
                <Select 
                  value={backupSettings.destination}
                  onValueChange={(value) => updateSetting('destination', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local Storage</SelectItem>
                    <SelectItem value="cloud">Cloud Storage</SelectItem>
                    <SelectItem value="both">Both Local & Cloud</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(backupSettings.destination === "cloud" || backupSettings.destination === "both") && (
                <div className="space-y-2">
                  <Label>Cloud Provider</Label>
                  <Select 
                    value={backupSettings.cloudProvider}
                    onValueChange={(value) => updateSetting('cloudProvider', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cloudProviders.map(provider => (
                        <SelectItem key={provider.value} value={provider.value}>
                          {provider.icon} {provider.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Notify on Success</Label>
                  <Switch
                    checked={backupSettings.notifyOnSuccess}
                    onCheckedChange={(checked) => updateSetting('notifyOnSuccess', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Notify on Failure</Label>
                  <Switch
                    checked={backupSettings.notifyOnFailure}
                    onCheckedChange={(checked) => updateSetting('notifyOnFailure', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Backup History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Backup History</span>
            </CardTitle>
            <CardDescription>
              View and manage previous backups
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {backupHistory.map((backup) => (
                <div key={backup.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(backup.status)}
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">
                          {new Date(backup.date).toLocaleDateString()} at {new Date(backup.date).toLocaleTimeString()}
                        </h3>
                        <Badge variant={backup.type === "manual" ? "default" : "secondary"}>
                          {backup.type}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Size: {backup.size}</span>
                        <span>Duration: {backup.duration}</span>
                        <span>Location: {backup.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {backup.status === "completed" && (
                      <>
                        <Button variant="outline" size="sm" onClick={() => downloadBackup(backup)}>
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => restoreBackup(backup)}>
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    <Button variant="outline" size="sm" onClick={() => deleteBackup(backup.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Storage Usage */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <HardDrive className="w-5 h-5" />
                <span>Storage Usage</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Local Storage</span>
                  <span>12.3 GB / 50 GB</span>
                </div>
                <Progress value={24.6} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Cloud Storage</span>
                  <span>45.2 GB / 100 GB</span>
                </div>
                <Progress value={45.2} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Security Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Encryption</span>
                <Badge className="bg-green-500">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Enabled
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Compression</span>
                <Badge className="bg-green-500">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Enabled
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Cloud Security</span>
                <Badge className="bg-green-500">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  SSL/TLS
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ModalComponent />
    </MainLayout>
  );
}