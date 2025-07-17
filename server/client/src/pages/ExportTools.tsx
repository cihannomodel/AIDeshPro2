import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { 
  Download, 
  FileText, 
  Table, 
  Image, 
  FileSpreadsheet, 
  File,
  Calendar,
  Filter,
  Settings,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Eye,
  TestTube,
  Mail,
  Cloud,
  HardDrive
} from "lucide-react";
import { useModal } from "@/components/ui/modal";

const exportFormats = [
  {
    id: "pdf",
    name: "PDF",
    description: "Portable document format with charts and formatting",
    icon: FileText,
    color: "#dc2626",
    features: ["Charts", "Formatting", "Headers/Footers", "Page breaks"]
  },
  {
    id: "excel",
    name: "Excel (XLSX)",
    description: "Spreadsheet format with multiple sheets and formulas",
    icon: FileSpreadsheet,
    color: "#059669",
    features: ["Multiple sheets", "Formulas", "Pivot tables", "Charts"]
  },
  {
    id: "csv",
    name: "CSV",
    description: "Comma-separated values for data analysis",
    icon: Table,
    color: "#0891b2",
    features: ["Raw data", "Lightweight", "Universal support", "Fast export"]
  },
  {
    id: "json",
    name: "JSON",
    description: "Structured data format for API integration",
    icon: File,
    color: "#7c3aed",
    features: ["Structured data", "API friendly", "Nested objects", "Type safe"]
  },
  {
    id: "png",
    name: "PNG Image",
    description: "High-quality images of charts and dashboards",
    icon: Image,
    color: "#ea580c",
    features: ["High resolution", "Transparent background", "Charts only", "Web ready"]
  }
];

const mockExportHistory = [
  {
    id: "1",
    name: "Monthly Sales Report",
    format: "PDF",
    size: "2.4 MB",
    status: "completed",
    createdAt: "2 hours ago",
    downloadUrl: "#",
    expiresAt: "7 days"
  },
  {
    id: "2",
    name: "User Analytics Data",
    format: "Excel",
    size: "856 KB",
    status: "completed",
    createdAt: "1 day ago",
    downloadUrl: "#",
    expiresAt: "6 days"
  },
  {
    id: "3",
    name: "Transaction Export",
    format: "CSV",
    size: "123 KB",
    status: "processing",
    createdAt: "5 minutes ago",
    downloadUrl: null,
    expiresAt: null
  },
  {
    id: "4",
    name: "Dashboard Screenshot",
    format: "PNG",
    size: "1.2 MB",
    status: "failed",
    createdAt: "1 hour ago",
    downloadUrl: null,
    expiresAt: null
  }
];

const dataCategories = [
  { id: "sales", name: "Sales Data", description: "Revenue, transactions, products" },
  { id: "users", name: "User Data", description: "User profiles, activity, engagement" },
  { id: "analytics", name: "Analytics", description: "Page views, sessions, behavior" },
  { id: "financial", name: "Financial", description: "Expenses, profit, budgets" },
  { id: "marketing", name: "Marketing", description: "Campaigns, leads, conversions" },
  { id: "inventory", name: "Inventory", description: "Products, stock, suppliers" }
];

export default function ExportTools() {
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [exportSettings, setExportSettings] = useState({
    includeCharts: true,
    includeRawData: true,
    dateRange: "last_30_days",
    emailDelivery: false,
    cloudStorage: false,
    password: "",
    customFilename: ""
  });
  const { showModal, ModalComponent } = useModal();

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleStartExport = () => {
    if (selectedCategories.length === 0) {
      showModal({
        title: "Veri Seçilmedi",
        message: "Lütfen export edilecek en az bir veri kategorisi seçin.",
        type: "warning"
      });
      return;
    }

    showModal({
      title: "Export Başlatıldı",
      message: `Demo export ${selectedCategories.length} veri kategorisi için ${selectedFormat.toUpperCase()} formatında başlatıldı.`,
      type: "success"
    });
  };

  const handleDownload = (exportId: string) => {
    showModal({
      title: "İndirme Başlatıldı",
      message: "Demo dosya indirmesi başlatıldı.",
      type: "success"
    });
  };

  const handleRetryExport = (exportId: string) => {
    showModal({
      title: "Export Tekrar Deneniyor",
      message: "Başarısız export işlemi tekrar denenecek.",
      type: "info"
    });
  };

  const handleDeleteExport = (exportId: string) => {
    showModal({
      title: "Export Sil",
      message: "Bu export kaydını silmek istediğinize emin misiniz?",
      type: "warning",
      showCancel: true,
      onConfirm: () => showModal({
        title: "Export Silindi",
        message: "Export kaydı başarıyla silindi.",
        type: "success"
      })
    });
  };

  const handleConfigureFormat = (format: string) => {
    showModal({
      title: `${format.toUpperCase()} Ayarları`,
      message: `${format.toUpperCase()} format ayarları burada yapılacak. Kalite, sayfa boyutu, sıkıştırma vs.`,
      type: "info"
    });
  };

  const handleScheduleExportModal = () => {
    showModal({
      title: "Export Zamanla",
      message: "Otomatik export zamanlama paneli burada açılacak. Periyodik export ve bildirim ayarları.",
      type: "info"
    });
  };



  return (
    <MainLayout title="Export Tools">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Export Tools</h1>
            <p className="text-muted-foreground mt-1">
              Export your data in multiple formats with advanced customization
            </p>
          </div>
          <Badge variant="secondary" className="px-3 py-1">
            <TestTube className="w-4 h-4 mr-1" />
            Demo Mode
          </Badge>
        </div>

        <Tabs defaultValue="export" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="export">Create Export</TabsTrigger>
            <TabsTrigger value="history">Export History</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Exports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Export Tab */}
          <TabsContent value="export" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Export Configuration */}
              <div className="lg:col-span-2 space-y-6">
                {/* Format Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Export Format</CardTitle>
                    <CardDescription>Choose the output format for your data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {exportFormats.map((format) => {
                        const Icon = format.icon;
                        return (
                          <div
                            key={format.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-all ${
                              selectedFormat === format.id
                                ? 'border-primary bg-primary/5 shadow-sm'
                                : 'hover:border-primary/50'
                            }`}
                            onClick={() => setSelectedFormat(format.id)}
                          >
                            <div className="flex items-start space-x-3">
                              <Icon className="w-8 h-8 mt-1" style={{ color: format.color }} />
                              <div className="flex-1">
                                <h3 className="font-semibold">{format.name}</h3>
                                <p className="text-sm text-muted-foreground mb-2">{format.description}</p>
                                <div className="flex flex-wrap gap-1">
                                  {format.features.map((feature) => (
                                    <Badge key={feature} variant="outline" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Data Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Data Categories</CardTitle>
                    <CardDescription>Select which data to include in your export</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {dataCategories.map((category) => (
                        <div key={category.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                          <Checkbox
                            id={category.id}
                            checked={selectedCategories.includes(category.id)}
                            onCheckedChange={() => handleCategoryToggle(category.id)}
                          />
                          <div className="flex-1">
                            <Label htmlFor={category.id} className="font-medium">{category.name}</Label>
                            <p className="text-sm text-muted-foreground">{category.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Advanced Options */}
                <Card>
                  <CardHeader>
                    <CardTitle>Export Options</CardTitle>
                    <CardDescription>Customize your export settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Date Range</Label>
                        <Select 
                          value={exportSettings.dateRange} 
                          onValueChange={(value) => setExportSettings(prev => ({ ...prev, dateRange: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="last_7_days">Last 7 days</SelectItem>
                            <SelectItem value="last_30_days">Last 30 days</SelectItem>
                            <SelectItem value="last_90_days">Last 90 days</SelectItem>
                            <SelectItem value="this_month">This month</SelectItem>
                            <SelectItem value="last_month">Last month</SelectItem>
                            <SelectItem value="this_year">This year</SelectItem>
                            <SelectItem value="all_time">All time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="filename">Custom Filename</Label>
                        <Input
                          id="filename"
                          placeholder="Leave empty for auto-generated"
                          value={exportSettings.customFilename}
                          onChange={(e) => setExportSettings(prev => ({ ...prev, customFilename: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Include Charts</Label>
                          <p className="text-sm text-muted-foreground">Add visualizations to the export</p>
                        </div>
                        <Switch
                          checked={exportSettings.includeCharts}
                          onCheckedChange={(checked) => setExportSettings(prev => ({ ...prev, includeCharts: checked }))}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Include Raw Data</Label>
                          <p className="text-sm text-muted-foreground">Export underlying data tables</p>
                        </div>
                        <Switch
                          checked={exportSettings.includeRawData}
                          onCheckedChange={(checked) => setExportSettings(prev => ({ ...prev, includeRawData: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Email Delivery</Label>
                          <p className="text-sm text-muted-foreground">Send download link via email</p>
                        </div>
                        <Switch
                          checked={exportSettings.emailDelivery}
                          onCheckedChange={(checked) => setExportSettings(prev => ({ ...prev, emailDelivery: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Cloud Storage</Label>
                          <p className="text-sm text-muted-foreground">Save to Google Drive or Dropbox</p>
                        </div>
                        <Switch
                          checked={exportSettings.cloudStorage}
                          onCheckedChange={(checked) => setExportSettings(prev => ({ ...prev, cloudStorage: checked }))}
                        />
                      </div>
                    </div>

                    {selectedFormat === 'pdf' && (
                      <div className="space-y-2">
                        <Label htmlFor="password">Password Protection (Optional)</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter password to protect PDF"
                          value={exportSettings.password}
                          onChange={(e) => setExportSettings(prev => ({ ...prev, password: e.target.value }))}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Export Summary */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Export Summary</CardTitle>
                    <CardDescription>Review your export configuration</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Format:</span>
                        <span className="font-medium">{exportFormats.find(f => f.id === selectedFormat)?.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Categories:</span>
                        <span className="font-medium">{selectedCategories.length} selected</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Date Range:</span>
                        <span className="font-medium">{exportSettings.dateRange.replace('_', ' ')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Est. Size:</span>
                        <span className="font-medium">~2.4 MB</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Processing Time:</span>
                        <span className="font-medium">~30 seconds</span>
                      </div>
                    </div>

                    <Button onClick={handleStartExport} className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Start Export
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Export Current View
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Export
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Repeat Last Export
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Export History</CardTitle>
                <CardDescription>View and download your recent exports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockExportHistory.map((export_item) => (
                    <div key={export_item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          {export_item.status === 'completed' && <CheckCircle className="w-6 h-6 text-green-500" />}
                          {export_item.status === 'processing' && <Clock className="w-6 h-6 text-blue-500" />}
                          {export_item.status === 'failed' && <XCircle className="w-6 h-6 text-red-500" />}
                        </div>
                        <div>
                          <h3 className="font-semibold">{export_item.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{export_item.format}</span>
                            <span>{export_item.size}</span>
                            <span>{export_item.createdAt}</span>
                            {export_item.expiresAt && <span>Expires in {export_item.expiresAt}</span>}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Badge variant={
                          export_item.status === 'completed' ? 'default' :
                          export_item.status === 'processing' ? 'secondary' : 'destructive'
                        }>
                          {export_item.status}
                        </Badge>
                        {export_item.status === 'completed' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(export_item.id)}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        )}
                        {export_item.status === 'processing' && (
                          <Progress value={65} className="w-20" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scheduled Tab */}
          <TabsContent value="scheduled" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Exports</CardTitle>
                <CardDescription>Automate regular data exports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Schedule Name</Label>
                      <Input placeholder="Monthly Sales Export" />
                    </div>
                    <div className="space-y-2">
                      <Label>Frequency</Label>
                      <Select defaultValue="monthly">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Email Recipients</Label>
                      <Input placeholder="email1@company.com, email2@company.com" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Export Format</Label>
                      <Select defaultValue="pdf">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF Report</SelectItem>
                          <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                          <SelectItem value="csv">CSV Data</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Next Run</Label>
                      <Input type="datetime-local" />
                    </div>
                    <div className="space-y-2">
                      <Label>Time Zone</Label>
                      <Select defaultValue="utc">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc">UTC</SelectItem>
                          <SelectItem value="est">Eastern Time</SelectItem>
                          <SelectItem value="pst">Pacific Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button onClick={handleScheduleExportModal} className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Create Scheduled Export
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Export Settings</CardTitle>
                <CardDescription>Configure default export preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-delete exports after 30 days</Label>
                      <p className="text-sm text-muted-foreground">Automatically remove old export files</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email notifications</Label>
                      <p className="text-sm text-muted-foreground">Get notified when exports complete</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Compress large files</Label>
                      <p className="text-sm text-muted-foreground">Automatically zip files over 10MB</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Cloud Storage Integration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-start">
                      <Cloud className="w-4 h-4 mr-2" />
                      Connect Google Drive
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Cloud className="w-4 h-4 mr-2" />
                      Connect Dropbox
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Default Export Location</Label>
                  <Select defaultValue="local">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local Download</SelectItem>
                      <SelectItem value="google-drive">Google Drive</SelectItem>
                      <SelectItem value="dropbox">Dropbox</SelectItem>
                      <SelectItem value="email">Email Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <ModalComponent />
    </MainLayout>
  );
}