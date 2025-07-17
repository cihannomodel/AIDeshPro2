import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { licenseManager } from "./license-system";

export async function registerRoutes(app: Express): Promise<Server> {
  // License validation endpoint
  app.post("/api/license/validate", async (req, res) => {
    try {
      const { licenseKey, domain } = req.body;
      
      if (!licenseKey) {
        return res.status(400).json({
          success: false,
          message: "License key is required"
        });
      }

      const validation = await licenseManager.validateLicense(licenseKey, domain);
      
      res.json({
        success: validation.valid,
        message: validation.message,
        license: validation.licenseInfo,
        features: validation.valid ? licenseManager.getLicenseFeatures(licenseKey) : null,
        remainingActivations: validation.remainingActivations
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "License validation failed"
      });
    }
  });

  // License generation endpoint (for admin/purchase system)
  app.post("/api/license/generate", async (req, res) => {
    try {
      const { type, email, purchaseCode } = req.body;
      
      if (!type || !email || !purchaseCode) {
        return res.status(400).json({
          success: false,
          message: "Type, email, and purchase code are required"
        });
      }

      const license = licenseManager.generateLicenseKey(type, email, purchaseCode);
      
      res.json({
        success: true,
        license: license
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "License generation failed"
      });
    }
  });

  // License deactivation endpoint
  app.post("/api/license/deactivate", async (req, res) => {
    try {
      const { licenseKey, domain } = req.body;
      
      if (!licenseKey || !domain) {
        return res.status(400).json({
          success: false,
          message: "License key and domain are required"
        });
      }

      const success = await licenseManager.deactivateLicense(licenseKey, domain);
      
      res.json({
        success,
        message: success ? "License deactivated successfully" : "Failed to deactivate license"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "License deactivation failed"
      });
    }
  });

  // Get license info endpoint
  app.get("/api/license/info/:licenseKey", async (req, res) => {
    try {
      const { licenseKey } = req.params;
      const license = licenseManager.getLicenseInfo(licenseKey);
      
      if (!license) {
        return res.status(404).json({
          success: false,
          message: "License not found"
        });
      }

      res.json({
        success: true,
        license: license,
        features: licenseManager.getLicenseFeatures(licenseKey)
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve license info"
      });
    }
  });

  // API placeholder endpoint for demo images
  app.get("/api/placeholder/:width/:height", (req, res) => {
    const { width, height } = req.params;
    const color = req.query.bg || "e5e7eb";
    const textColor = req.query.color || "6b7280";
    
    // Generate SVG placeholder
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#${color}"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#${textColor}" font-family="Arial, sans-serif" font-size="14">${width}×${height}</text>
      </svg>
    `;
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
  });

  const httpServer = createServer(app);

  return httpServer;
}
