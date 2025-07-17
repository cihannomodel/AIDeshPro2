import { useState, useMemo } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useModal } from "@/components/ui/modal";
import { 
  Database, Search, Filter, Download, Upload, 
  Plus, Edit, Trash2, RotateCcw, Settings,
  ChevronUp, ChevronDown, Eye, Copy
} from "lucide-react";

interface TableData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  joinDate: string;
  revenue: number;
  orders: number;
  country: string;
}

const mockTableData: TableData[] = [
  { id: "1", name: "Alice Johnson", email: "alice@company.com", role: "Admin", status: "active", joinDate: "2024-01-15", revenue: 12500, orders: 45, country: "USA" },
  { id: "2", name: "Bob Smith", email: "bob@example.org", role: "User", status: "active", joinDate: "2024-02-20", revenue: 8750, orders: 32, country: "Canada" },
  { id: "3", name: "Carol Davis", email: "carol@business.co", role: "Manager", status: "inactive", joinDate: "2024-01-08", revenue: 15200, orders: 67, country: "UK" },
  { id: "4", name: "David Wilson", email: "david@startup.io", role: "User", status: "pending", joinDate: "2024-03-10", revenue: 4200, orders: 18, country: "Australia" },
  { id: "5", name: "Emma Brown", email: "emma@tech.dev", role: "Admin", status: "active", joinDate: "2024-02-05", revenue: 18900, orders: 78, country: "Germany" },
  { id: "6", name: "Frank Miller", email: "frank@corp.net", role: "User", status: "active", joinDate: "2024-03-01", revenue: 6300, orders: 24, country: "France" },
  { id: "7", name: "Grace Lee", email: "grace@design.studio", role: "Manager", status: "active", joinDate: "2024-01-22", revenue: 11400, orders: 52, country: "Japan" },
  { id: "8", name: "Henry Clark", email: "henry@sales.pro", role: "User", status: "inactive", joinDate: "2024-02-14", revenue: 9800, orders: 41, country: "Brazil" }
];

type SortField = keyof TableData;
type SortDirection = "asc" | "desc";

export default function DataTables() {
  const [data, setData] = useState(mockTableData);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { showModal, ModalComponent } = useModal();

  // Filter and search data
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.country.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const matchesRole = roleFilter === "all" || item.role === roleFilter;
      
      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [data, searchTerm, statusFilter, roleFilter]);

  // Sort data
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
  }, [filteredData, sortField, sortDirection]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(paginatedData.map(item => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  const bulkDelete = () => {
    if (selectedRows.length === 0) return;
    
    showModal({
      title: "Bulk Delete Confirmation",
      message: `Are you sure you want to delete ${selectedRows.length} selected records? This action cannot be undone.`,
      type: "warning",
      showCancel: true,
      onConfirm: () => {
        setData(data.filter(item => !selectedRows.includes(item.id)));
        setSelectedRows([]);
        showModal({
          title: "Success",
          message: `${selectedRows.length} records have been deleted successfully.`,
          type: "success"
        });
      }
    });
  };

  const exportData = () => {
    const exportData = selectedRows.length > 0 
      ? data.filter(item => selectedRows.includes(item.id))
      : sortedData;
    
    showModal({
      title: "Export Data",
      message: `Exporting ${exportData.length} records to CSV format. In a real application, this would download the file.`,
      type: "info"
    });
  };

  const importData = () => {
    showModal({
      title: "Import Data",
      message: "File upload dialog would open here. You can import CSV, Excel, or JSON files to add new records to the table.",
      type: "info"
    });
  };

  const refreshData = () => {
    showModal({
      title: "Data Refreshed",
      message: "Table data has been refreshed from the database. All filters and sorting have been preserved.",
      type: "success"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive":
        return <Badge className="bg-red-100 text-red-800">Inactive</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? 
      <ChevronUp className="w-4 h-4 ml-1" /> : 
      <ChevronDown className="w-4 h-4 ml-1" />;
  };

  return (
    <MainLayout title="Data Tables">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Data Tables Management</h1>
            <p className="text-muted-foreground mt-1">
              Interactive data tables with advanced filtering, sorting, and export capabilities
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={refreshData}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" onClick={importData}>
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button onClick={exportData}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="table" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="table">Data Table</TabsTrigger>
            <TabsTrigger value="schema">Table Schema</TabsTrigger>
            <TabsTrigger value="settings">Table Settings</TabsTrigger>
          </TabsList>

          {/* Data Table Tab */}
          <TabsContent value="table" className="space-y-6">
            {/* Filters and Search */}
            <Card>
              <CardHeader>
                <CardTitle>Filters and Search</CardTitle>
                <CardDescription>Use filters to find specific data quickly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, email, or country..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="User">User</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 per page</SelectItem>
                      <SelectItem value="10">10 per page</SelectItem>
                      <SelectItem value="25">25 per page</SelectItem>
                      <SelectItem value="50">50 per page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Table Actions */}
            {selectedRows.length > 0 && (
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-800 font-medium">
                      {selectedRows.length} row(s) selected
                    </span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                      <Button size="sm" variant="outline" onClick={exportData}>
                        <Download className="w-4 h-4 mr-1" />
                        Export Selected
                      </Button>
                      <Button size="sm" variant="destructive" onClick={bulkDelete}>
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete Selected
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Data Table */}
            <Card>
              <CardHeader>
                <CardTitle>User Data ({sortedData.length} records)</CardTitle>
                <CardDescription>
                  Showing {paginatedData.length} of {sortedData.length} records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox
                            checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                            onCheckedChange={handleSelectAll}
                          />
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-muted/50 select-none"
                          onClick={() => handleSort("name")}
                        >
                          <div className="flex items-center">
                            Name <SortIcon field="name" />
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-muted/50 select-none"
                          onClick={() => handleSort("email")}
                        >
                          <div className="flex items-center">
                            Email <SortIcon field="email" />
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-muted/50 select-none"
                          onClick={() => handleSort("role")}
                        >
                          <div className="flex items-center">
                            Role <SortIcon field="role" />
                          </div>
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-muted/50 select-none"
                          onClick={() => handleSort("revenue")}
                        >
                          <div className="flex items-center">
                            Revenue <SortIcon field="revenue" />
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-muted/50 select-none"
                          onClick={() => handleSort("orders")}
                        >
                          <div className="flex items-center">
                            Orders <SortIcon field="orders" />
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-muted/50 select-none"
                          onClick={() => handleSort("country")}
                        >
                          <div className="flex items-center">
                            Country <SortIcon field="country" />
                          </div>
                        </TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedData.map((row) => (
                        <TableRow key={row.id} className="hover:bg-muted/50">
                          <TableCell>
                            <Checkbox
                              checked={selectedRows.includes(row.id)}
                              onCheckedChange={(checked) => handleSelectRow(row.id, checked as boolean)}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{row.name}</TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.role}</TableCell>
                          <TableCell>{getStatusBadge(row.status)}</TableCell>
                          <TableCell>${row.revenue.toLocaleString()}</TableCell>
                          <TableCell>{row.orders}</TableCell>
                          <TableCell>{row.country}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost">
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} entries
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                      .map((page, index, array) => (
                        <div key={page} className="flex items-center">
                          {index > 0 && array[index - 1] !== page - 1 && (
                            <span className="px-2 text-muted-foreground">...</span>
                          )}
                          <Button
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </Button>
                        </div>
                      ))}
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schema Tab */}
          <TabsContent value="schema" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Table Schema Definition</CardTitle>
                <CardDescription>View and modify table structure</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "id", type: "VARCHAR(36)", nullable: false, key: "PRIMARY" },
                    { name: "name", type: "VARCHAR(255)", nullable: false, key: "" },
                    { name: "email", type: "VARCHAR(255)", nullable: false, key: "UNIQUE" },
                    { name: "role", type: "ENUM('Admin','Manager','User')", nullable: false, key: "" },
                    { name: "status", type: "ENUM('active','inactive','pending')", nullable: false, key: "" },
                    { name: "join_date", type: "DATE", nullable: false, key: "" },
                    { name: "revenue", type: "DECIMAL(10,2)", nullable: true, key: "" },
                    { name: "orders", type: "INT", nullable: true, key: "" },
                    { name: "country", type: "VARCHAR(100)", nullable: true, key: "" }
                  ].map((column, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Database className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-medium">{column.name}</div>
                          <div className="text-sm text-muted-foreground">{column.type}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {column.key && (
                          <Badge variant="secondary">{column.key}</Badge>
                        )}
                        <Badge variant={column.nullable ? "outline" : "secondary"}>
                          {column.nullable ? "NULL" : "NOT NULL"}
                        </Badge>
                        <Button size="sm" variant="ghost">
                          <Settings className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-3 mt-6">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Column
                  </Button>
                  <Button variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Modify Table
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Table Configuration</CardTitle>
                <CardDescription>Configure table behavior and permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Display Settings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Show row numbers</span>
                        <Checkbox defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Enable sorting</span>
                        <Checkbox defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Enable filtering</span>
                        <Checkbox defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Show export options</span>
                        <Checkbox defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Permissions</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Allow data export</span>
                        <Checkbox defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Allow bulk operations</span>
                        <Checkbox defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Allow data editing</span>
                        <Checkbox />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Allow data deletion</span>
                        <Checkbox />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button>
                  Save Configuration
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <ModalComponent />
      </div>
    </MainLayout>
  );
}