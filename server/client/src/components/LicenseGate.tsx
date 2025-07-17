import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { licenseValidator, type LicenseValidationResult } from '@/lib/license-validation';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle, XCircle, Key, Shield, Crown, Lock, Zap, Star } from 'lucide-react';

interface LicenseGateProps {
  onLicenseActivated: () => void;
}

export function LicenseGate({ onLicenseActivated }: LicenseGateProps) {
  const [licenseKey, setLicenseKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<LicenseValidationResult | null>(null);
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const { toast } = useToast();

  // Check if already has valid license on mount
  useEffect(() => {
    const currentLicense = licenseValidator.getCurrentLicense();
    if (currentLicense?.isActive) {
      onLicenseActivated();
    }
  }, [onLicenseActivated]);

  const handleValidation = async () => {
    if (!licenseKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a license key",
        variant: "destructive"
      });
      return;
    }

    setIsValidating(true);
    try {
      const result = await licenseValidator.validateLicense(licenseKey, true);
      setValidationResult(result);
      
      if (result.success) {
        toast({
          title: "License Activated!",
          description: `Successfully activated ${result.license?.type} license`,
        });
        
        // Small delay for UX, then proceed to dashboard
        setTimeout(() => {
          onLicenseActivated();
        }, 1500);
      } else {
        toast({
          title: "Activation Failed",
          description: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to validate license",
        variant: "destructive"
      });
    } finally {
      setIsValidating(false);
    }
  };

  const generateUniqueKey = async (type: 'regular' | 'extended') => {
    setIsGeneratingKey(true);
    
    try {
      // Simulate unique customer data (in real system this would come from purchase)
      const customerData = {
        email: `customer-${Date.now()}@example.com`,
        purchaseCode: `PURCHASE-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        type: type
      };

      // Generate unique license key
      const response = await fetch('/api/license/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData)
      });

      const result = await response.json();
      
      if (result.success) {
        setLicenseKey(result.license.key);
        toast({
          title: "Unique License Generated!",
          description: `New ${type} license key created for this installation`,
        });
        
        // Auto-activate the generated key
        setTimeout(() => {
          handleValidation();
        }, 1000);
      } else {
        toast({
          title: "Generation Failed",
          description: "Failed to generate license key",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate license key",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingKey(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/50 p-4">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Key className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold">AI Dash PRO</h1>
          <p className="text-xl text-muted-foreground">
            Premium Business Intelligence Admin Panel
          </p>
          <p className="text-muted-foreground">
            Thank you for your purchase! Generate your unique license key to activate
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* License Activation */}
          <Card className="border-2">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Lock className="h-5 w-5" />
                License Activation
              </CardTitle>
              <CardDescription>
                Enter your license key or generate a new one for this installation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="license-key">License Key</Label>
                <Input
                  id="license-key"
                  placeholder="AI-DASH-XXX-XXXX-XXXX"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                  disabled={isValidating || isGeneratingKey}
                  className="font-mono"
                />
              </div>

              <Button 
                onClick={handleValidation} 
                disabled={isValidating || !licenseKey.trim() || isGeneratingKey}
                className="w-full"
                size="lg"
              >
                {isValidating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Activating License...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Activate License
                  </>
                )}
              </Button>

              {validationResult && validationResult.success && (
                <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800 dark:text-green-200">
                    License activated successfully! Redirecting to dashboard...
                  </AlertDescription>
                </Alert>
              )}

              {validationResult && !validationResult.success && (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>{validationResult.message}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* License Options */}
          <Card className="border-2">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Star className="h-5 w-5" />
                Get Your License
              </CardTitle>
              <CardDescription>
                Choose your license type or try demo features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Generate Unique Keys */}
              <div className="space-y-3">
                <p className="text-sm font-medium">Generate Unique License:</p>
                <div className="grid grid-cols-1 gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => generateUniqueKey('regular')}
                    disabled={isValidating || isGeneratingKey}
                    className="justify-start"
                  >
                    {isGeneratingKey ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Shield className="mr-2 h-4 w-4 text-blue-500" />
                    )}
                    Generate Regular License
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => generateUniqueKey('extended')}
                    disabled={isValidating || isGeneratingKey}
                    className="justify-start"
                  >
                    {isGeneratingKey ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Crown className="mr-2 h-4 w-4 text-yellow-500" />
                    )}
                    Generate Extended License
                  </Button>
                </div>
              </div>


            </CardContent>
          </Card>

          {/* Feature Comparison */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>License Comparison</CardTitle>
              <CardDescription>
                Choose the right license for your needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Regular */}
                <div className="p-6 border-2 rounded-lg border-blue-200 bg-blue-50 dark:bg-blue-950/20">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-500" />
                    Regular License
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      100 AI requests/day
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      All dashboard features
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Custom branding
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Priority support
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Single project use
                    </li>
                    <li className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      No commercial resale
                    </li>
                  </ul>
                </div>

                {/* Extended */}
                <div className="p-6 border-2 rounded-lg border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 relative">
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-yellow-500 text-black font-bold">POPULAR</Badge>
                  </div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Crown className="h-5 w-5 text-yellow-500" />
                    Extended License
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Unlimited AI requests
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      All premium features
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      White-label rights
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Commercial resale allowed
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Multiple projects (up to 5)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Source code included
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>🔒 Your license key is stored securely and can be deactivated anytime</p>
          <p>💎 Premium AI-powered business intelligence at your fingertips</p>
        </div>
      </div>
    </div>
  );
}