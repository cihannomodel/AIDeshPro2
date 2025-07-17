import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { transactionsData, topProductsData } from "@/lib/data/mockData";

export function DataTablesSection() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {/* Recent Transactions */}
      <Card className="widget-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">
              View all
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                    Customer
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                    Amount
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="space-y-3">
                {transactionsData.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="py-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={transaction.avatar} alt={transaction.customer} />
                          <AvatarFallback>
                            {transaction.customer.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {transaction.customer}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {transaction.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="text-sm font-medium text-foreground">
                        {transaction.amount}
                      </span>
                    </td>
                    <td className="py-3">
                      <Badge 
                        variant={
                          transaction.status === "completed" ? "default" : 
                          transaction.status === "pending" ? "secondary" : 
                          "destructive"
                        }
                        className={
                          transaction.status === "completed" ? "bg-green-500/10 text-green-600 hover:bg-green-500/20" :
                          transaction.status === "pending" ? "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20" :
                          ""
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Top Products */}
      <Card className="widget-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Top Performing Products</CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">
              View all
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProductsData.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12 rounded-lg">
                    <AvatarImage src={product.image} alt={product.name} />
                    <AvatarFallback className="rounded-lg">
                      {product.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {product.sales}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">
                    {product.revenue}
                  </p>
                  <p className="text-xs text-green-600">
                    {product.growth}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
