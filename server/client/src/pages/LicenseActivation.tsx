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
import { Loader2, CheckCircle, XCircle, Key, Shield, Zap, Crown } from 'lucide-react';

export default function LicenseActivation() {
  const [licenseKey, setLicenseKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<LicenseValidationResult | null>(null);
  const [currentLicense, setCurrentLicense] = useState(licenseValidator.getCurrentLicense());
  const { toast } = useToast();

  useEffect(() => {
    // Load current license info on mount
    setCurrentLicense(licenseValidator.getCurrentLicense());
  }, []);

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
        setCurrentLicense(licenseValidator.getCurrentLicense());
        toast({
          title: "License Activated!",
          description: `Successfully activated ${result.license?.type} license`,
        });
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

  const handleDeactivation = async () => {
    if (!currentLicense) return;

    setIsValidating(true);
    try {
      const success = await licenseValidator.deactivateLicense(currentLicense.key);
      if (success) {
        setCurrentLicense(null);
        setValidationResult(null);
        setLicenseKey('');
        toast({
          title: "License Deactivated",
          description: "License has been deactivated from this domain",
        });
      } else {
        toast({
          title: "Deactivation Failed",
          description: "Failed to deactivate license",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to deactivate license",
        variant: "destructive"
      });
    } finally {
      setIsValidating(false);
    }
  };

  const useDemoLicense = async (type: 'regular' | 'extended') => {
    const demoKeys = licenseValidator.getDemoLicenseKeys();
    const key = type === 'regular' ? demoKeys.regular : demoKeys.extended;
    
    setLicenseKey(key);
    setIsValidating(true);
    
    try {
      const result = await licenseValidator.validateLicense(key, true);
      setValidationResult(result);
      
      if (result.success) {
        setCurrentLicense(licenseValidator.getCurrentLicense());
        toast({
          title: "Demo License Activated!",
          description: `Demo ${type} license activated for testing`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to activate demo license",
        variant: "destructive"
      });
    } finally {
      setIsValidating(false);
    }
  };

  const getLicenseIcon = (type: string) => {
    switch (type) {
      case 'extended': return <Crown className="h-5 w-5 text-yellow-500" />;
      case 'regular': return <Shield className="h-5 w-5 text-blue-500" />;
      default: return <Key className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">License Management</h1>
        <p className="text-muted-foreground">
          Activate your AI Dashboard license to unlock premium features
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* License Activation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              License Activation
            </CardTitle>
            <CardDescription>
              Enter your license key to activate premium features
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
                disabled={isValidating}
              />
            </div>

            <Button 
              onClick={handleValidation} 
              disabled={isValidating || !licenseKey.trim()}
              className="w-full"
            >
              {isValidating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Validating...
                </>
              ) : (
                'Activate License'
              )}
            </Button>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Demo Licenses for Testing:</p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => useDemoLicense('regular')}
                  disabled={isValidating}
                >
                  <Shield className="mr-1 h-3 w-3" />
                  Regular Demo
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => useDemoLicense('extended')}
                  disabled={isValidating}
                >
                  <Crown className="mr-1 h-3 w-3" />
                  Extended Demo
                </Button>
              </div>
            </div>

            {validationResult && !validationResult.success && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertDescription>{validationResult.message}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Current License Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              License Status
            </CardTitle>
            <CardDescription>
              Current license information and features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentLicense ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getLicenseIcon(currentLicense.type)}
                    <span className="font-medium capitalize">{currentLicense.type} License</span>
                  </div>
                  <Badge 
                    variant={currentLicense.isActive ? "default" : "secondary"}
                    className="flex items-center gap-1"
                  >
                    {currentLicense.isActive ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : (
                      <XCircle className="h-3 w-3" />
                    )}
                    {currentLicense.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>

                {licenseValidator.isDemoLicense() && (
                  <Alert>
                    <Zap className="h-4 w-4" />
                    <AlertDescription>
                      This is a demo license for testing purposes only.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">License Key:</span>
                    <span className="font-mono text-xs">{currentLicense.key}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Domain:</span>
                    <span>{currentLicense.domain || 'Not bound'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Activations:</span>
                    <span>{currentLicense.activationCount}/{currentLicense.maxActivations}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created:</span>
                    <span>{new Date(currentLicense.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  onClick={handleDeactivation}
                  disabled={isValidating}
                  className="w-full"
                >
                  {isValidating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deactivating...
                    </>
                  ) : (
                    'Deactivate License'
                  )}
                </Button>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Key className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No active license found</p>
                <p className="text-sm">Enter your license key to get started</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* License Features */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>License Features</CardTitle>
            <CardDescription>
              Compare features available with different license types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Demo Features */}
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Key className="h-4 w-4 text-gray-500" />
                  Demo License
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    5 AI requests/day
                  </li>
                  <li className="flex items-center gap-2">
                    <XCircle className="h-3 w-3 text-red-500" />
                    Limited features
                  </li>
                  <li className="flex items-center gap-2">
                    <XCircle className="h-3 w-3 text-red-500" />
                    No custom branding
                  </li>
                  <li className="flex items-center gap-2">
                    <XCircle className="h-3 w-3 text-red-500" />
                    No commercial use
                  </li>
                </ul>
              </div>

              {/* Regular Features */}
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-500" />
                  Regular License
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    100 AI requests/day
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    All features unlocked
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    Custom branding
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    Priority support
                  </li>
                  <li className="flex items-center gap-2">
                    <XCircle className="h-3 w-3 text-red-500" />
                    No commercial resale
                  </li>
                </ul>
              </div>

              {/* Extended Features */}
              <div className="p-4 border rounded-lg border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Crown className="h-4 w-4 text-yellow-500" />
                  Extended License
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    Unlimited AI requests
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    All features + Premium
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    White-label options
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    Commercial use allowed
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    Multiple projects
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}