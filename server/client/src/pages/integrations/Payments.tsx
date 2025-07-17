import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  CreditCard, 
  Key, 
  Settings, 
  DollarSign, 
  Users,
  TrendingUp,
  Shield,
  Zap,
  TestTube,
  CheckCircle,
  XCircle,
  Clock,
  Wallet,
  Eye
} from "lucide-react";
import { useModal } from "@/components/ui/modal";

const mockPaymentData = {
  totalRevenue: "$45,234",
  successfulPayments: "2,456",
  failedPayments: "89",
  refunds: "$1,234",
  recentTransactions: [
    { id: "TXN001", amount: "$129.99", status: "completed", method: "Stripe", customer: "John Doe", date: "2 hours ago" },
    { id: "TXN002", amount: "$59.99", status: "pending", method: "PayPal", customer: "Jane Smith", date: "5 hours ago" },
    { id: "TXN003", amount: "$299.99", status: "failed", method: "Stripe", customer: "Bob Johnson", date: "1 day ago" },
    { id: "TXN004", amount: "$89.99", status: "completed", method: "Square", customer: "Alice Brown", date: "2 days ago" },
  ]
};

const paymentProviders = [
  { id: "stripe", name: "Stripe", description: "Accept payments online with Stripe", logo: "💳", region: "Global" },
  { id: "paypal", name: "PayPal", description: "Process payments with PayPal", logo: "🅿️", region: "Global" },
  { id: "square", name: "Square", description: "In-person and online payments", logo: "⬜", region: "US/Canada" },
  { id: "razorpay", name: "Razorpay", description: "Payment gateway for India", logo: "💰", region: "India" },
  { id: "braintree", name: "Braintree", description: "PayPal's payment platform", logo: "🧠", region: "Global" },
  { id: "adyen", name: "Adyen", description: "Global payment platform", logo: "🌐", region: "Global" },
  { id: "klarna", name: "Klarna", description: "Buy now, pay later solutions", logo: "🛍️", region: "Europe/US" },
  { id: "mollie", name: "Mollie", description: "European payment gateway", logo: "🇪🇺", region: "Europe" },
  { id: "payu", name: "PayU", description: "Payment solutions for emerging markets", logo: "💸", region: "LatAm/CEE" },
  { id: "alipay", name: "Alipay", description: "China's leading payment platform", logo: "🇨🇳", region: "China" },
  { id: "wechatpay", name: "WeChat Pay", description: "Mobile payment by Tencent", logo: "💬", region: "China" },
  { id: "mercadopago", name: "Mercado Pago", description: "Latin America's payment solution", logo: "🇦🇷", region: "Latin America" },
];

export default function Payments() {
  const [paymentConfig, setPaymentConfig] = useState({
    stripe: { enabled: false, publicKey: "", secretKey: "", webhookSecret: "" },
    paypal: { enabled: false, clientId: "", clientSecret: "", sandbox: true },
    square: { enabled: false, applicationId: "", accessToken: "", sandbox: true },
    razorpay: { enabled: false, keyId: "", keySecret: "", webhookSecret: "" },
    braintree: { enabled: false, merchantId: "", publicKey: "", privateKey: "" },
    adyen: { enabled: false, apiKey: "", merchantAccount: "", clientKey: "" },
    klarna: { enabled: false, username: "", password: "", region: "eu" },
    mollie: { enabled: false, apiKey: "", profileId: "" },
    payu: { enabled: false, merchantKey: "", salt: "", environment: "test" },
    alipay: { enabled: false, appId: "", privateKey: "", publicKey: "" },
    wechatpay: { enabled: false, appId: "", mchId: "", apiKey: "" },
    mercadopago: { enabled: false, accessToken: "", clientId: "", clientSecret: "" },
    currency: "USD",
    testMode: true,
    autoCapture: true,
    webhooksEnabled: true
  });
  const { showModal, ModalComponent } = useModal();

  const saveConfiguration = () => {
    showModal({
      title: "Payment Configuration Saved",
      message: "Your payment gateway settings have been saved successfully. Payments can now be processed.",
      type: "success"
    });
  };

  const testConnection = (provider: string) => {
    showModal({
      title: `Testing ${provider} Connection`,
      message: `Verifying connection to ${provider}... This would validate your API credentials and webhook configurations in production.`,
      type: "info"
    });
  };

  const processRefund = (transactionId: string) => {
    showModal({
      title: "Process Refund",
      message: `Refund processing for transaction ${transactionId}. This would initiate a refund through the payment provider in production.`,
      type: "info"
    });
  };

  const viewTransaction = (transactionId: string) => {
    showModal({
      title: "Transaction Details",
      message: `Viewing detailed information for transaction ${transactionId}. This would show complete payment history and metadata.`,
      type: "info"
    });
  };

  const toggleProvider = (provider: keyof typeof paymentConfig, field: string, value: boolean) => {
    setPaymentConfig(prev => ({
      ...prev,
      [provider]: { ...prev[provider as keyof typeof prev], [field]: value }
    }));
  };

  return (
    <MainLayout title="Payment Gateway Integration">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Payment Gateway Integration</h1>
            <p className="text-muted-foreground mt-1">
              Configure payment providers and manage transactions
            </p>
          </div>
          <Badge variant="secondary" className="px-3 py-1">
            <TestTube className="w-4 h-4 mr-1" />
            Demo Mode
          </Badge>
        </div>

        {/* Payment Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">{mockPaymentData.totalRevenue}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Successful Payments</p>
                  <p className="text-2xl font-bold">{mockPaymentData.successfulPayments}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <XCircle className="w-8 h-8 text-red-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Failed Payments</p>
                  <p className="text-2xl font-bold">{mockPaymentData.failedPayments}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Refunds</p>
                  <p className="text-2xl font-bold">{mockPaymentData.refunds}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="configuration" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="providers">Payment Providers</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Configuration Tab */}
          <TabsContent value="configuration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="w-5 h-5 mr-2" />
                  Payment Gateway Setup
                </CardTitle>
                <CardDescription>
                  Configure your payment processing providers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Primary Currency</Label>
                    <select 
                      className="w-full p-2 border rounded-lg bg-background text-foreground"
                      value={paymentConfig.currency}
                      onChange={(e) => setPaymentConfig(prev => ({ ...prev, currency: e.target.value }))}
                    >
                      <option value="USD">🇺🇸 USD - US Dollar</option>
                      <option value="EUR">🇪🇺 EUR - Euro</option>
                      <option value="GBP">🇬🇧 GBP - British Pound</option>
                      <option value="CAD">🇨🇦 CAD - Canadian Dollar</option>
                      <option value="AUD">🇦🇺 AUD - Australian Dollar</option>
                      <option value="JPY">🇯🇵 JPY - Japanese Yen</option>
                      <option value="CHF">🇨🇭 CHF - Swiss Franc</option>
                      <option value="CNY">🇨🇳 CNY - Chinese Yuan</option>
                      <option value="INR">🇮🇳 INR - Indian Rupee</option>
                      <option value="KRW">🇰🇷 KRW - South Korean Won</option>
                      <option value="BRL">🇧🇷 BRL - Brazilian Real</option>
                      <option value="RUB">🇷🇺 RUB - Russian Ruble</option>
                      <option value="MXN">🇲🇽 MXN - Mexican Peso</option>
                      <option value="SGD">🇸🇬 SGD - Singapore Dollar</option>
                      <option value="HKD">🇭🇰 HKD - Hong Kong Dollar</option>
                      <option value="NOK">🇳🇴 NOK - Norwegian Krone</option>
                      <option value="SEK">🇸🇪 SEK - Swedish Krona</option>
                      <option value="DKK">🇩🇰 DKK - Danish Krone</option>
                      <option value="NZD">🇳🇿 NZD - New Zealand Dollar</option>
                      <option value="PLN">🇵🇱 PLN - Polish Zloty</option>
                      <option value="TRY">🇹🇷 TRY - Turkish Lira</option>
                      <option value="ZAR">🇿🇦 ZAR - South African Rand</option>
                      <option value="AED">🇦🇪 AED - UAE Dirham</option>
                      <option value="SAR">🇸🇦 SAR - Saudi Riyal</option>
                      <option value="ILS">🇮🇱 ILS - Israeli Shekel</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Test Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable test mode for development
                      </p>
                    </div>
                    <Switch
                      checked={paymentConfig.testMode}
                      onCheckedChange={(checked) => setPaymentConfig(prev => ({ ...prev, testMode: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto Capture</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically capture payments when authorized
                      </p>
                    </div>
                    <Switch
                      checked={paymentConfig.autoCapture}
                      onCheckedChange={(checked) => setPaymentConfig(prev => ({ ...prev, autoCapture: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Webhooks</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable webhook notifications for payment events
                      </p>
                    </div>
                    <Switch
                      checked={paymentConfig.webhooksEnabled}
                      onCheckedChange={(checked) => setPaymentConfig(prev => ({ ...prev, webhooksEnabled: checked }))}
                    />
                  </div>
                </div>

                <Button className="w-full" onClick={saveConfiguration}>
                  <Settings className="w-4 h-4 mr-2" />
                  Save Configuration
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Providers Tab */}
          <TabsContent value="providers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Providers</CardTitle>
                <CardDescription>
                  Connect and configure your payment service providers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {paymentProviders.map((provider) => (
                  <div key={provider.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{provider.logo}</div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{provider.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {provider.region}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{provider.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={paymentConfig[provider.id as keyof typeof paymentConfig]?.enabled ? "default" : "secondary"}>
                          {paymentConfig[provider.id as keyof typeof paymentConfig]?.enabled ? "Connected" : "Disconnected"}
                        </Badge>
                        <Switch
                          checked={paymentConfig[provider.id as keyof typeof paymentConfig]?.enabled || false}
                          onCheckedChange={(checked) => toggleProvider(provider.id as keyof typeof paymentConfig, 'enabled', checked)}
                        />
                      </div>
                    </div>

                    {paymentConfig[provider.id as keyof typeof paymentConfig]?.enabled && (
                      <div className="space-y-3 pt-3 border-t">
                        {provider.id === 'stripe' && (
                          <>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label className="text-xs">Publishable Key</Label>
                                <Input type="password" placeholder="pk_test_..." className="h-8 text-xs" />
                              </div>
                              <div>
                                <Label className="text-xs">Secret Key</Label>
                                <Input type="password" placeholder="sk_test_..." className="h-8 text-xs" />
                              </div>
                            </div>
                            <div>
                              <Label className="text-xs">Webhook Secret</Label>
                              <Input type="password" placeholder="whsec_..." className="h-8 text-xs" />
                            </div>
                          </>
                        )}
                        
                        {provider.id === 'paypal' && (
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label className="text-xs">Client ID</Label>
                              <Input placeholder="AX..." className="h-8 text-xs" />
                            </div>
                            <div>
                              <Label className="text-xs">Client Secret</Label>
                              <Input type="password" placeholder="EX..." className="h-8 text-xs" />
                            </div>
                          </div>
                        )}

                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => testConnection(provider.name)}>
                            <Zap className="w-3 h-3 mr-1" />
                            Test
                          </Button>
                          <Button size="sm">
                            <Settings className="w-3 h-3 mr-1" />
                            Configure
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  Monitor and manage payment transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPaymentData.recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {transaction.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-500" />}
                          {transaction.status === 'pending' && <Clock className="w-5 h-5 text-yellow-500" />}
                          {transaction.status === 'failed' && <XCircle className="w-5 h-5 text-red-500" />}
                        </div>
                        <div>
                          <h3 className="font-semibold">{transaction.id}</h3>
                          <p className="text-sm text-muted-foreground">
                            {transaction.customer} • {transaction.method} • {transaction.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{transaction.amount}</p>
                        <div className="flex space-x-1 mt-1">
                          <Badge variant={
                            transaction.status === 'completed' ? 'default' :
                            transaction.status === 'pending' ? 'secondary' : 'destructive'
                          } className="text-xs">
                            {transaction.status}
                          </Badge>
                          <Button size="sm" variant="ghost" onClick={() => viewTransaction(transaction.id)}>
                            View
                          </Button>
                          {transaction.status === 'completed' && (
                            <Button size="sm" variant="ghost" onClick={() => processRefund(transaction.id)}>
                              Refund
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Payment Security & Compliance
                </CardTitle>
                <CardDescription>
                  Manage security settings, fraud protection, and compliance features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* PCI Compliance */}
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-green-500" />
                      <h3 className="font-semibold">PCI DSS Compliance</h3>
                    </div>
                    <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      Level 1 Compliant
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Security Standards</p>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>TLS 1.2+ Encryption</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>Tokenized Card Storage</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>Regular Security Scans</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Compliance Status</p>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>Annual Assessment: Passed</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>Vulnerability Scans: Current</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>Certificate: Valid until 2025</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fraud Protection */}
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-4">
                    <Shield className="w-5 h-5 text-red-500" />
                    <h3 className="font-semibold">Fraud Protection</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">Real-time Risk Assessment</span>
                        <p className="text-xs text-muted-foreground">AI-powered fraud detection</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">Velocity Checks</span>
                        <p className="text-xs text-muted-foreground">Monitor transaction frequency</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">Geolocation Filtering</span>
                        <p className="text-xs text-muted-foreground">Block suspicious locations</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">Device Fingerprinting</span>
                        <p className="text-xs text-muted-foreground">Track device behavior patterns</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                {/* Authentication & Verification */}
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-4">
                    <Key className="w-5 h-5 text-blue-500" />
                    <h3 className="font-semibold">Authentication & Verification</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">3D Secure (3DS2)</span>
                        <p className="text-xs text-muted-foreground">Strong customer authentication</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">CVV Verification</span>
                        <p className="text-xs text-muted-foreground">Card verification value check</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">Address Verification (AVS)</span>
                        <p className="text-xs text-muted-foreground">Billing address validation</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">Two-Factor Authentication</span>
                        <p className="text-xs text-muted-foreground">Additional security layer</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                {/* Risk Management */}
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-orange-500" />
                    <h3 className="font-semibold">Risk Management Rules</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm">Maximum Transaction Amount</Label>
                        <Input type="number" placeholder="10000" defaultValue="5000" />
                      </div>
                      <div>
                        <Label className="text-sm">Daily Transaction Limit</Label>
                        <Input type="number" placeholder="50000" defaultValue="25000" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm">Blocked Countries</Label>
                        <select className="w-full p-2 border rounded-lg bg-background text-foreground text-sm">
                          <option>Select countries to block...</option>
                          <option>High-risk regions</option>
                          <option>Custom list</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-sm">Risk Score Threshold</Label>
                        <select className="w-full p-2 border rounded-lg bg-background text-foreground text-sm">
                          <option>Low (Score &gt; 70)</option>
                          <option>Medium (Score &gt; 50)</option>
                          <option>High (Score &gt; 30)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Monitoring */}
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <Eye className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100">Security Monitoring</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">99.8%</p>
                      <p className="text-blue-700 dark:text-blue-300">Fraud Detection Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">&lt; 0.1%</p>
                      <p className="text-blue-700 dark:text-blue-300">False Positive Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">24/7</p>
                      <p className="text-blue-700 dark:text-blue-300">Monitoring Coverage</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription>
                  Configure security and notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-3">
                      <Shield className="w-5 h-5 text-blue-500" />
                      <h3 className="font-semibold">Security Settings</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Require 3D Secure</span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">CVV Verification</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Address Verification</span>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-3">
                      <Wallet className="w-5 h-5 text-green-500" />
                      <h3 className="font-semibold">Payment Methods</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Credit/Debit Cards</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Digital Wallets</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Bank Transfers</span>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900 dark:text-green-100">PCI Compliance</p>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Your payment system meets PCI DSS requirements
                      </p>
                    </div>
                  </div>
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