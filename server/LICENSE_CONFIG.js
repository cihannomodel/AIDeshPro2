// AI Dash PRO - License Configuration
// This file should be customized for each CodeCanyon sale

export const LICENSE_CONFIG = {
  // Set to true for automatic activation (customize per sale)
  AUTO_ACTIVATE: true,
  
  // Pre-embedded license key (leave empty for manual entry)
  EMBEDDED_KEY: "AUTO-GENERATE",
  
  // Purchase information (customize per sale)
  PURCHASE_INFO: {
    email: "",
    purchaseCode: "",
    licenseType: "regular" // or "extended"
  },
  
  // System configuration
  SYSTEM_NAME: "AI Dash PRO",
  VERSION: "1.0.0"
};

/*
CONFIGURATION INSTRUCTIONS:

For Manual Activation (Default):
- Keep AUTO_ACTIVATE: false
- Customer uses license gate to generate/enter key

For Automatic Activation (Per-sale customization):
1. Set AUTO_ACTIVATE: true
2. Set EMBEDDED_KEY: "AI-DASH-XXX-XXXX-XXXX"
3. Set PURCHASE_INFO with customer details
4. Customer gets instant access without license gate

This allows flexibility for different distribution methods.
*/