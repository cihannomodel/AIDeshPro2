
# Installation Guide - AI Dash PRO

## System Requirements

- **Node.js**: v18.0 or higher
- **npm**: v8.0 or higher
- **Operating System**: Windows, macOS, or Linux
- **Browser**: Chrome, Firefox, Safari, or Edge (latest versions)
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB free space

## Installation Methods

### Method 1: Quick Start (Recommended)

#### For Windows Users:
1. Extract the downloaded ZIP file
2. Double-click `start-local.bat`
3. Wait for automatic installation and startup
4. Your browser will open automatically at `http://localhost:5173`

#### For Mac/Linux Users:
1. Extract the downloaded ZIP file
2. Open Terminal and navigate to the project folder
3. Run: `chmod +x start-local.sh`
4. Run: `./start-local.sh`
5. Open `http://localhost:5173` in your browser

### Method 2: Manual Installation

1. **Extract Project**
   ```bash
   # Extract the ZIP file to your desired location
   ```

2. **Navigate to Server Directory**
   ```bash
   cd ai-dash-pro/server
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Access Application**
   - Open your browser
   - Navigate to `http://localhost:5173`

## Production Build

### Build for Production
```bash
cd server
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Configuration

### Environment Variables
Create a `.env` file in the `/server` directory:

```env
# OpenAI API Key (Optional - for AI features)
OPENAI_API_KEY=your_openai_api_key_here

# License Configuration
LICENSE_MODE=production

# Database (Optional - uses mock data by default)
DATABASE_URL=your_database_url_here
```

### License Configuration
Edit `LICENSE_CONFIG.js` for your specific needs:

```javascript
export const LICENSE_CONFIG = {
  AUTO_ACTIVATE: false,          // Set to true for auto-activation
  EMBEDDED_KEY: "",              // Pre-embedded license key
  PURCHASE_INFO: {
    email: "",
    purchaseCode: "",
    licenseType: "regular"       // or "extended"
  }
};
```

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process using port 5173
npx kill-port 5173

# Or use a different port
npm run dev -- --port 3000
```

#### Node Version Issues
```bash
# Check Node version
node --version

# Update Node.js if needed
# Download from: https://nodejs.org/
```

#### Permission Errors (Mac/Linux)
```bash
# Fix script permissions
chmod +x start-local.sh

# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
```

#### Missing Dependencies
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Getting Help

1. **Check Console** - Look for error messages in browser console
2. **Check Terminal** - Review terminal output for build errors
3. **Documentation** - Read README.md and this installation guide
4. **Support** - Contact support with error details

## Success Indicators

✅ Terminal shows "VITE v5.x.x ready"
✅ Browser opens automatically
✅ Dashboard loads without errors
✅ All navigation links work
✅ Charts and data display correctly

## Next Steps

1. **Customize** - Use the theme builder to match your brand
2. **Data** - Replace mock data with your API endpoints
3. **Deploy** - Follow deployment guide for production setup
4. **License** - Configure license system for your needs

---

**Need help?** Check our support documentation or contact our team.
