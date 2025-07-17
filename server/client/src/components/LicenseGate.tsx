import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle, Crown, Shield, Sparkles, Zap, Star, Lock } from 'lucide-react';
import { licenseValidator, type LicenseValidationResult } from '@/lib/license-validation';

interface LicenseGateProps {
  onLicenseActivated: () => void;
}

export function LicenseGate({ onLicenseActivated }: LicenseGateProps) {
  const [isInitializing, setIsInitializing] = useState(true);
  const [validationResult, setValidationResult] = useState<LicenseValidationResult | null>(null);
  const [currentStep, setCurrentStep] = useState<'welcome' | 'activating' | 'activated' | 'error'>('welcome');
  const { toast } = useToast();

  useEffect(() => {
    // Check if already has valid license
    const currentLicense = licenseValidator.getCurrentLicense();
    if (currentLicense?.isActive) {
      setCurrentStep('activated');
      setTimeout(() => onLicenseActivated(), 1000);
      return;
    }

    // Auto-generate license for ThemeForest customers
    autoActivateLicense();
  }, [onLicenseActivated]);

  const autoActivateLicense = async () => {
    setIsInitializing(true);
    setCurrentStep('activating');

    try {
      // Generate unique license for this installation
      const customerData = {
        email: `customer-${Date.now()}@themeforest.com`,
        purchaseCode: `TF-${Date.now()}-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
        type: 'extended' // ThemeForest customers get extended license
      };

      const response = await fetch('/api/license/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData)
      });

      const result = await response.json();

      if (result.success) {
        // Auto-activate the generated key
        const validationResult = await licenseValidator.validateLicense(result.license.key, true);
        setValidationResult(validationResult);

        if (validationResult.success) {
          setCurrentStep('activated');
          toast({
            title: "🎉 Lisans Aktif!",
            description: "AI Dashboard Pro başarıyla etkinleştirildi!",
          });

          setTimeout(() => {
            onLicenseActivated();
          }, 2000);
        } else {
          setCurrentStep('error');
        }
      } else {
        setCurrentStep('error');
      }
    } catch (error) {
      console.error('Auto-activation failed:', error);
      setCurrentStep('error');
    } finally {
      setIsInitializing(false);
    }
  };

  const retryActivation = () => {
    setCurrentStep('activating');
    autoActivateLicense();
  };

  if (currentStep === 'welcome' || isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg border-2 shadow-2xl bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Dashboard Pro
            </CardTitle>
            <CardDescription className="text-lg">
              Premium AI destekli iş zekası platformuna hoş geldiniz
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                <span className="text-lg">Sisteminiz hazırlanıyor...</span>
              </div>
              <div className="text-sm text-muted-foreground">
                ThemeForest müşterisi olarak otomatik lisans oluşturuluyor
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentStep === 'activating') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg border-2 shadow-2xl bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center animate-pulse">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-600">
              Lisans Etkinleştiriliyor
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="h-5 w-5 animate-spin text-green-500" />
                <span className="text-lg">Extended lisansınız etkinleştiriliyor...</span>
              </div>
              <div className="text-sm text-muted-foreground">
                ✓ Benzersiz lisans anahtarı oluşturuldu<br/>
                ✓ Sistem kayıtları güncelleniyor<br/>
                ✓ Premium özellikler etkinleştiriliyor
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentStep === 'activated') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg border-2 border-green-200 shadow-2xl bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-600">
              🎉 Başarıyla Etkinleştirildi!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
              <Crown className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                <strong>Extended License Aktif!</strong><br/>
                Tüm premium özellikler kullanıma hazır.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Sınırsız AI İsteği</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Özel Markalama</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Ticari Kullanım</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Öncelikli Destek</span>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              Dashboard'a yönlendiriliyorsunuz...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentStep === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg border-2 border-red-200 shadow-2xl bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-red-600">
              Lisans Hatası
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <Alert variant="destructive">
              <AlertDescription>
                Otomatik lisans etkinleştirmede sorun oluştu. Lütfen tekrar deneyin.
              </AlertDescription>
            </Alert>

            <Button 
              onClick={retryActivation}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              size="lg"
            >
              <Zap className="mr-2 h-4 w-4" />
              Tekrar Dene
            </Button>

            <div className="text-sm text-muted-foreground">
              Sorun devam ederse destek ile iletişime geçin
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}