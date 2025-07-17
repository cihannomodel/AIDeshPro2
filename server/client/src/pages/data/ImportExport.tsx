import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { useModal } from "@/components/ui/modal";
import { 
  Upload, Download, FileText, Database, 
  Clock, CheckCircle, AlertCircle, Play,
  Calendar, Settings, History, RefreshCw
} from "lucide-react";
import { Plus } from "lucide-react";

interface ImportJob {
  id: string;
  name: string;
  type: "csv" | "excel" | "json" | "xml";
  status: "pending" | "processing" | "completed" | "failed";
  progress: number;
  recordsProcessed: number;
  totalRecords: number;
  startTime: string;
  duration?: string;
  errors?: number;
}

interface ExportJob {
  id: string;
  name: string;
  format: "csv" | "excel" | "json" | "pdf";
  status: "pending" | "processing" | "completed" | "failed";
  progress: number;
  recordsExported: number;
  fileSize: string;
  createdAt: string;
  downloadUrl?: string;
}

const mockImportJobs: ImportJob[] = [
  {
    id: "imp_1",
    name: "Customer Data Import",
    type: "csv",
    status: "completed",
    progress: 100,
    recordsProcessed: 1500,
    totalRecords: 1500,
    startTime: "2024-07-16 14:30:00",
    duration: "2m 15s",
    errors: 0
  },
  {
    id: "imp_2",
    name: "Product Catalog Import",
    type: "excel",
    status: "processing",
    progress: 67,
    recordsProcessed: 2010,
    totalRecords: 3000,
    startTime: "2024-07-16 15:00:00"
  },
  {
    id: "imp_3",
    name: "Sales Data Import",
    type: "json",
    status: "failed",
    progress: 45,
    recordsProcessed: 450,
    totalRecords: 1000,
    startTime: "2024-07-16 13:45:00",
    duration: "1m 30s",
    errors: 15
  }
];

const mockExportJobs: ExportJob[] = [
  {
    id: "exp_1",
    name: "Monthly Sales Report",
    format: "excel",
    status: "completed",
    progress: 100,
    recordsExported: 25000,
    fileSize: "2.4 MB",
    createdAt: "2024-07-16 14:00:00",
    downloadUrl: "#"
  },
  {
    id: "exp_2",
    name: "Customer Analytics Export",
    format: "csv",
    status: "processing",
    progress: 80,
    recordsExported: 8000,
    fileSize: "1.2 MB",
    createdAt: "2024-07-16 15:15:00"
  },
  {
    id: "exp_3",
    name: "Financial Summary",
    format: "pdf",
    status: "pending",
    progress: 0,
    recordsExported: 0,
    fileSize: "0 MB",
    createdAt: "2024-07-16 15:20:00"
  }
];

export default function ImportExport() {
  const [importJobs, setImportJobs] = useState(mockImportJobs);
  const [exportJobs, setExportJobs] = useState(mockExportJobs);
  const [selectedFormat, setSelectedFormat] = useState("csv");
  const [autoSchedule, setAutoSchedule] = useState(false);
  const { showModal, ModalComponent } = useModal();

  const startImport = () => {
    const newJob: ImportJob = {
      id: `imp_${Date.now()}`,
      name: "New Data Import",
      type: selectedFormat as any,
      status: "processing",
      progress: 0,
      recordsProcessed: 0,
      totalRecords: 1000,
      startTime: new Date().toLocaleString()
    };

    setImportJobs([newJob, ...importJobs]);
    
    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setImportJobs(prev => prev.map(job => 
          job.id === newJob.id 
            ? { ...job, status: "completed", progress: 100, recordsProcessed: 1000, duration: "1m 45s" }
            : job
        ));
        showModal({
          title: "Import Completed",
          message: "Data import has been completed successfully. 1,000 records have been processed.",
          type: "success"
        });
      } else {
        setImportJobs(prev => prev.map(job => 
          job.id === newJob.id 
            ? { ...job, progress: Math.round(progress), recordsProcessed: Math.round((progress / 100) * 1000) }
            : job
        ));
      }
    }, 500);

    showModal({
      title: "Import Started",
      message: "Data import process has been initiated. You can monitor the progress in the jobs list.",
      type: "info"
    });
  };

  const startExport = () => {
    const formats = ["csv", "excel", "json", "pdf"];
    const randomFormat = formats[Math.floor(Math.random() * formats.length)];
    
    const newJob: ExportJob = {
      id: `exp_${Date.now()}`,
      name: "Custom Data Export",
      format: randomFormat as any,
      status: "processing",
      progress: 0,
      recordsExported: 0,
      fileSize: "0 MB",
      createdAt: new Date().toLocaleString()
    };

    setExportJobs([newJob, ...exportJobs]);
    
    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setExportJobs(prev => prev.map(job => 
          job.id === newJob.id 
            ? { ...job, status: "completed", progress: 100, recordsExported: 5000, fileSize: "1.8 MB", downloadUrl: "#" }
            : job
        ));
        showModal({
          title: "Export Completed",
          message: "Data export has been completed successfully. The file is ready for download.",
          type: "success"
        });
      } else {
        setExportJobs(prev => prev.map(job => 
          job.id === newJob.id 
            ? { ...job, progress: Math.round(progress), recordsExported: Math.round((progress / 100) * 5000), fileSize: `${((progress / 100) * 1.8).toFixed(1)} MB` }
            : job
        ));
      }
    }, 800);

    showModal({
      title: "Export Started",
      message: "Data export process has been initiated. You'll be notified when the file is ready for download.",
      type: "info"
    });
  };

  const scheduleJob = () => {
    showModal({
      title: "Job Scheduled",
      message: "Automated import/export job has been scheduled. It will run daily at 2:00 AM and process new data automatically.",
      type: "success"
    });
  };

  const validateData = () => {
    showModal({
      title: "Data Validation",
      message: "Data validation completed. 98.5% of records are valid. 23 records have minor issues that can be auto-corrected.",
      type: "info"
    });
  };

  const downloadFile = (job: ExportJob) => {
    showModal({
      title: "Download Started",
      message: `Downloading ${job.name} (${job.fileSize}). In a real application, the file would be downloaded to your device.`,
      type: "info"
    });
  };

  const retryJob = (jobId: string, type: "import" | "export") => {
    if (type === "import") {
      setImportJobs(prev => prev.map(job => 
        job.id === jobId ? { ...job, status: "processing", progress: 0, recordsProcessed: 0 } : job
      ));
    } else {
      setExportJobs(prev => prev.map(job => 
        job.id === jobId ? { ...job, status: "processing", progress: 0, recordsExported: 0 } : job
      ));
    }
    
    showModal({
      title: "Job Restarted",
      message: "The failed job has been restarted and is now processing.",
      type: "info"
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "processing":
        return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />;
      case "failed":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>;
    }
  };

  return (
    <MainLayout title="Import/Export">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Data Import/Export</h1>
            <p className="text-muted-foreground mt-1">
              Manage data import and export operations with advanced scheduling and validation
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={validateData}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Validate Data
            </Button>
            <Button variant="outline" onClick={scheduleJob}>
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Job
            </Button>
          </div>
        </div>

        <Tabs defaultValue="import" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="import">Data Import</TabsTrigger>
            <TabsTrigger value="export">Data Export</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Jobs</TabsTrigger>
            <TabsTrigger value="history">Job History</TabsTrigger>
          </TabsList>

          {/* Import Tab */}
          <TabsContent value="import" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Import Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle>Start New Import</CardTitle>
                  <CardDescription>Upload and import data from various file formats</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>File Format</Label>
                    <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">CSV File</SelectItem>
                        <SelectItem value="excel">Excel File (.xlsx)</SelectItem>
                        <SelectItem value="json">JSON File</SelectItem>
                        <SelectItem value="xml">XML File</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Upload File</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">Supports CSV, Excel, JSON, XML files</p>
                      <Button variant="outline" className="mt-2">
                        Choose File
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="validate" defaultChecked />
                      <Label htmlFor="validate">Validate data before import</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="backup" defaultChecked />
                      <Label htmlFor="backup">Create backup before import</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notifications" />
                      <Label htmlFor="notifications">Send email notifications</Label>
                    </div>
                  </div>

                  <Button onClick={startImport} className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Start Import
                  </Button>
                </CardContent>
              </Card>

              {/* Import Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>Import Statistics</CardTitle>
                  <CardDescription>Overview of recent import activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-green-600">1,247</div>
                        <div className="text-sm text-muted-foreground">Total Imports</div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">98.5%</div>
                        <div className="text-sm text-muted-foreground">Success Rate</div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">2.4M</div>
                        <div className="text-sm text-muted-foreground">Records Processed</div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">1.8 GB</div>
                        <div className="text-sm text-muted-foreground">Data Processed</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Import Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Active Import Jobs</CardTitle>
                <CardDescription>Monitor ongoing import operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {importJobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(job.status)}
                        <div>
                          <h4 className="font-medium">{job.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {job.recordsProcessed.toLocaleString()} / {job.totalRecords.toLocaleString()} records
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right min-w-[100px]">
                          {getStatusBadge(job.status)}
                          <div className="text-sm text-muted-foreground mt-1">{job.startTime}</div>
                        </div>
                        <div className="w-32">
                          <Progress value={job.progress} className="w-full" />
                          <div className="text-xs text-center mt-1">{job.progress}%</div>
                        </div>
                        <div className="flex gap-2">
                          {job.status === "failed" && (
                            <Button size="sm" variant="outline" onClick={() => retryJob(job.id, "import")}>
                              <RefreshCw className="w-3 h-3" />
                            </Button>
                          )}
                          <Button size="sm" variant="ghost">
                            <Settings className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Export Tab */}
          <TabsContent value="export" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Export Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle>Create New Export</CardTitle>
                  <CardDescription>Export data in various formats with custom filters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Export Format</Label>
                    <Select defaultValue="csv">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">CSV File</SelectItem>
                        <SelectItem value="excel">Excel File (.xlsx)</SelectItem>
                        <SelectItem value="json">JSON File</SelectItem>
                        <SelectItem value="pdf">PDF Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Data Range</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Data</SelectItem>
                        <SelectItem value="filtered">Current Filters</SelectItem>
                        <SelectItem value="selected">Selected Records</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Date Range</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="date" placeholder="Start date" />
                      <Input type="date" placeholder="End date" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="headers" defaultChecked />
                      <Label htmlFor="headers">Include column headers</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="compress" />
                      <Label htmlFor="compress">Compress output file</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="encrypt" />
                      <Label htmlFor="encrypt">Encrypt sensitive data</Label>
                    </div>
                  </div>

                  <Button onClick={startExport} className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Start Export
                  </Button>
                </CardContent>
              </Card>

              {/* Export Templates */}
              <Card>
                <CardHeader>
                  <CardTitle>Export Templates</CardTitle>
                  <CardDescription>Quick export using predefined templates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Sales Report", format: "Excel", description: "Monthly sales data with analytics" },
                    { name: "Customer List", format: "CSV", description: "Complete customer database" },
                    { name: "Financial Summary", format: "PDF", description: "Formatted financial report" },
                    { name: "Inventory Export", format: "JSON", description: "Product and stock data" }
                  ].map((template, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <div>
                          <h4 className="font-medium">{template.name}</h4>
                          <p className="text-sm text-muted-foreground">{template.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{template.format}</Badge>
                        <Button size="sm" variant="outline">
                          Use Template
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Active Export Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Active Export Jobs</CardTitle>
                <CardDescription>Monitor ongoing export operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {exportJobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(job.status)}
                        <div>
                          <h4 className="font-medium">{job.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {job.recordsExported.toLocaleString()} records • {job.fileSize}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right min-w-[100px]">
                          {getStatusBadge(job.status)}
                          <div className="text-sm text-muted-foreground mt-1">{job.createdAt}</div>
                        </div>
                        <div className="w-32">
                          <Progress value={job.progress} className="w-full" />
                          <div className="text-xs text-center mt-1">{job.progress}%</div>
                        </div>
                        <div className="flex gap-2">
                          {job.status === "completed" && job.downloadUrl && (
                            <Button size="sm" variant="outline" onClick={() => downloadFile(job)}>
                              <Download className="w-3 h-3" />
                            </Button>
                          )}
                          {job.status === "failed" && (
                            <Button size="sm" variant="outline" onClick={() => retryJob(job.id, "export")}>
                              <RefreshCw className="w-3 h-3" />
                            </Button>
                          )}
                          <Button size="sm" variant="ghost">
                            <Settings className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scheduled Jobs Tab */}
          <TabsContent value="scheduled" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Automated Import/Export Jobs</CardTitle>
                <CardDescription>Configure recurring data operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">Daily Sales Import</h4>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Imports daily sales data from external system
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span>Next run: Tomorrow 2:00 AM</span>
                        <Button size="sm" variant="ghost">
                          <Settings className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">Weekly Report Export</h4>
                        <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Exports weekly analytics report every Monday
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span>Next run: Monday 8:00 AM</span>
                        <Button size="sm" variant="ghost">
                          <Settings className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Scheduled Job
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job History</CardTitle>
                <CardDescription>Complete history of all import/export operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...importJobs, ...exportJobs]
                    .sort((a, b) => new Date(b.startTime || b.createdAt).getTime() - new Date(a.startTime || a.createdAt).getTime())
                    .slice(0, 10)
                    .map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(job.status)}
                        <div>
                          <h4 className="font-medium">{job.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {'totalRecords' in job ? 'Import' : 'Export'} • {job.startTime || job.createdAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(job.status)}
                        <Button size="sm" variant="ghost">
                          <History className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
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