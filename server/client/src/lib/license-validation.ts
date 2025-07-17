import { apiRequest } from './queryClient';

export interface LicenseInfo {
  id: string;
  key: string;
  email: string;
  type: 'regular' | 'extended';
  domain?: string;
  isActive: boolean;
  activationCount: number;
  maxActivations: number;
  createdAt: string;
}

export interface LicenseFeatures {
  aiFeatures: 'demo' | 'full' | 'unlimited';
  dailyRequests: number | 'unlimited';
  customBranding: boolean;
  prioritySupport: boolean;
  commercialUse: boolean;
  multipleProjects?: boolean;
  whiteLabel?: boolean;
}

export interface LicenseValidationResult {
  success: boolean;
  message: string;
  license?: LicenseInfo;
  features?: LicenseFeatures;
  remainingActivations?: number;
}

class LicenseValidator {
  private currentLicense: LicenseInfo | null = null;
  private currentFeatures: LicenseFeatures | null = null;
  private validationCache: Map<string, { result: LicenseValidationResult; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem('ai_dashboard_license');
      if (stored) {
        const data = JSON.parse(stored);
        this.currentLicense = data.license;
        this.currentFeatures = data.features;
      }
    } catch (error) {
      console.warn('Failed to load license from storage:', error);
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem('ai_dashboard_license', JSON.stringify({
        license: this.currentLicense,
        features: this.currentFeatures
      }));
    } catch (error) {
      console.warn('Failed to save license to storage:', error);
    }
  }

  private getCurrentDomain(): string {
    if (typeof window === 'undefined') return 'localhost';
    return window.location.hostname;
  }

  async validateLicense(licenseKey: string, forceFresh = false): Promise<LicenseValidationResult> {
    if (!licenseKey.trim()) {
      return {
        success: false,
        message: 'License key is required'
      };
    }

    // Check cache first
    const cacheKey = `${licenseKey}_${this.getCurrentDomain()}`;
    if (!forceFresh) {
      const cached = this.validationCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
        return cached.result;
      }
    }

    try {
      const domain = this.getCurrentDomain();
      const response = await fetch('/api/license/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          licenseKey: licenseKey.trim(),
          domain
        })
      });

      const result = await response.json();

      const validationResult: LicenseValidationResult = {
        success: result.success,
        message: result.message,
        license: result.license,
        features: result.features,
        remainingActivations: result.remainingActivations
      };

      // Cache the result
      this.validationCache.set(cacheKey, {
        result: validationResult,
        timestamp: Date.now()
      });

      // Update current license if valid
      if (validationResult.success && validationResult.license && validationResult.features) {
        this.currentLicense = validationResult.license;
        this.currentFeatures = validationResult.features;
        this.saveToStorage();
      }

      return validationResult;
    } catch (error) {
      console.error('License validation failed:', error);
      return {
        success: false,
        message: 'License validation service unavailable'
      };
    }
  }

  async deactivateLicense(licenseKey: string): Promise<boolean> {
    try {
      const domain = this.getCurrentDomain();
      const response = await fetch('/api/license/deactivate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          licenseKey: licenseKey.trim(),
          domain
        })
      });

      const result = await response.json();

      if (result.success) {
        // Clear current license
        this.currentLicense = null;
        this.currentFeatures = null;
        localStorage.removeItem('ai_dashboard_license');
        
        // Clear cache
        const cacheKey = `${licenseKey}_${domain}`;
        this.validationCache.delete(cacheKey);
      }

      return result.success;
    } catch (error) {
      console.error('License deactivation failed:', error);
      return false;
    }
  }

  getCurrentLicense(): LicenseInfo | null {
    return this.currentLicense;
  }

  getCurrentFeatures(): LicenseFeatures | null {
    return this.currentFeatures;
  }

  hasValidLicense(): boolean {
    return this.currentLicense?.isActive === true;
  }

  getLicenseType(): 'regular' | 'extended' {
    if (!this.hasValidLicense()) return 'regular';
    return this.currentLicense?.type || 'regular';
  }

  canUseFeature(feature: keyof LicenseFeatures): boolean {
    if (!this.currentFeatures) return false;
    return !!this.currentFeatures[feature];
  }

  getAIRequestLimit(): number {
    if (!this.currentFeatures) return 5;
    const limit = this.currentFeatures.dailyRequests;
    return typeof limit === 'number' ? limit : 999999;
  }

  clearLicense() {
    this.currentLicense = null;
    this.currentFeatures = null;
    this.validationCache.clear();
    localStorage.removeItem('ai_dashboard_license');
  }

  // Get demo license keys for instant testing
  getDemoLicenseKeys() {
    return {
      regular: 'AI-DASH-REG-DEMO-2024',
      extended: 'AI-DASH-EXT-DEMO-2024'
    };
  }

  // Check if current license is demo
  isDemoLicense(): boolean {
    if (!this.currentLicense) return false;
    const demoKeys = this.getDemoLicenseKeys();
    return Object.values(demoKeys).includes(this.currentLicense.key);
  }



  // Get license status message for UI
  getLicenseStatusMessage(): string {
    if (!this.hasValidLicense()) {
      return 'No valid license found. Please purchase and activate your license key.';
    }

    const license = this.currentLicense!;
    const type = license.type.charAt(0).toUpperCase() + license.type.slice(1);
    
    return `${type} License Active - All features enabled`;
  }
}

export const licenseValidator = new LicenseValidator();