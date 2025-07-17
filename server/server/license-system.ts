import crypto from 'crypto';

export interface LicenseKey {
  id: string;
  key: string;
  email: string;
  purchaseCode: string;
  type: 'regular' | 'extended';
  domain?: string;
  activatedAt?: Date;
  expiresAt?: Date;
  isActive: boolean;
  activationCount: number;
  maxActivations: number;
  createdAt: Date;
}

export interface LicenseValidationResult {
  valid: boolean;
  message: string;
  licenseInfo?: LicenseKey;
  remainingActivations?: number;
}

export class LicenseManager {
  private licenses: Map<string, LicenseKey> = new Map();
  private activeDomains: Map<string, string[]> = new Map(); // license -> domains

  constructor() {
    // Initialize with demo licenses for instant access
    this.initializeDemoLicenses();
    console.log('License manager initialized with demo licenses');
  }

  private initializeDemoLicenses() {
    // Create demo regular license
    const demoRegular: LicenseKey = {
      id: 'demo-regular-id',
      key: 'AI-DASH-REG-DEMO-2024',
      email: 'demo@themeforest.com',
      purchaseCode: 'DEMO-REGULAR-2024',
      type: 'regular',
      isActive: true,
      activationCount: 0,
      maxActivations: 1,
      createdAt: new Date()
    };

    // Create demo extended license
    const demoExtended: LicenseKey = {
      id: 'demo-extended-id',
      key: 'AI-DASH-EXT-DEMO-2024',
      email: 'demo@themeforest.com',
      purchaseCode: 'DEMO-EXTENDED-2024',
      type: 'extended',
      isActive: true,
      activationCount: 0,
      maxActivations: 5,
      createdAt: new Date()
    };

    this.licenses.set(demoRegular.key, demoRegular);
    this.licenses.set(demoExtended.key, demoExtended);
  }

  // Generate unique license key
  generateLicenseKey(type: 'regular' | 'extended', email: string, purchaseCode: string): LicenseKey {
    const prefix = type === 'regular' ? 'AI-DASH-REG' : 'AI-DASH-EXT';
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomPart = crypto.randomBytes(4).toString('hex').toUpperCase();
    const key = `${prefix}-${timestamp}-${randomPart}`;

    const license: LicenseKey = {
      id: crypto.randomUUID(),
      key,
      email,
      purchaseCode,
      type,
      isActive: true,
      activationCount: 0,
      maxActivations: type === 'regular' ? 1 : 5,
      createdAt: new Date()
    };

    this.licenses.set(key, license);
    return license;
  }

  // Validate and activate license
  async validateLicense(licenseKey: string, domain?: string): Promise<LicenseValidationResult> {
    const license = this.licenses.get(licenseKey);

    if (!license) {
      return {
        valid: false,
        message: 'License key not found'
      };
    }

    if (!license.isActive) {
      return {
        valid: false,
        message: 'License has been deactivated'
      };
    }

    if (license.expiresAt && license.expiresAt < new Date()) {
      return {
        valid: false,
        message: 'License has expired'
      };
    }

    // Check domain restrictions for regular license
    if (license.type === 'regular' && domain) {
      const activeDomains = this.activeDomains.get(licenseKey) || [];
      
      if (activeDomains.length > 0 && !activeDomains.includes(domain)) {
        return {
          valid: false,
          message: 'License already activated on another domain'
        };
      }

      if (activeDomains.length === 0) {
        // First activation
        this.activeDomains.set(licenseKey, [domain]);
        license.activationCount++;
        license.activatedAt = new Date();
        license.domain = domain;
      }
    }

    // Check activation limits for extended license
    if (license.type === 'extended' && domain) {
      const activeDomains = this.activeDomains.get(licenseKey) || [];
      
      if (!activeDomains.includes(domain)) {
        if (activeDomains.length >= license.maxActivations) {
          return {
            valid: false,
            message: `Maximum activations (${license.maxActivations}) reached`
          };
        }
        
        activeDomains.push(domain);
        this.activeDomains.set(licenseKey, activeDomains);
        license.activationCount++;
        
        if (!license.activatedAt) {
          license.activatedAt = new Date();
        }
      }
    }

    return {
      valid: true,
      message: 'License is valid',
      licenseInfo: license,
      remainingActivations: license.maxActivations - license.activationCount
    };
  }

  // Deactivate license for a domain
  async deactivateLicense(licenseKey: string, domain: string): Promise<boolean> {
    const license = this.licenses.get(licenseKey);
    if (!license) return false;

    const activeDomains = this.activeDomains.get(licenseKey) || [];
    const updatedDomains = activeDomains.filter(d => d !== domain);
    
    this.activeDomains.set(licenseKey, updatedDomains);
    license.activationCount = Math.max(0, license.activationCount - 1);
    
    return true;
  }

  // Get license info
  getLicenseInfo(licenseKey: string): LicenseKey | null {
    return this.licenses.get(licenseKey) || null;
  }

  // Get all licenses for admin
  getAllLicenses(): LicenseKey[] {
    return Array.from(this.licenses.values());
  }

  // Revoke license
  revokeLicense(licenseKey: string): boolean {
    const license = this.licenses.get(licenseKey);
    if (!license) return false;
    
    license.isActive = false;
    this.activeDomains.delete(licenseKey);
    return true;
  }

  // Get license features based on type
  getLicenseFeatures(licenseKey: string): any {
    const license = this.licenses.get(licenseKey);
    if (!license || !license.isActive) {
      return {
        aiFeatures: 'demo',
        dailyRequests: 5,
        customBranding: false,
        priority_support: false,
        commercialUse: false
      };
    }

    if (license.type === 'regular') {
      return {
        aiFeatures: 'full',
        dailyRequests: 100,
        customBranding: true,
        prioritySupport: true,
        commercialUse: false,
        multipleProjects: false
      };
    }

    // Extended license
    return {
      aiFeatures: 'unlimited',
      dailyRequests: 'unlimited',
      customBranding: true,
      prioritySupport: true,
      commercialUse: true,
      multipleProjects: true,
      whiteLabel: true
    };
  }
}

export const licenseManager = new LicenseManager();