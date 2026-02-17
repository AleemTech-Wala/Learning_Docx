# 📅 Week 3 - Day 5: Environment Variables & API Configuration

## 🎯 Today's Goal
**Aaj hum environment variables seekhenge - sensitive data aur configurations ko secure tareeqe se manage karne ka professional tareeqa!**

**Today's Focus:**
- ✅ Environment variables kya hain
- ✅ .env file creation
- ✅ VITE_PREFIX requirement
- ✅ API URL configuration
- ✅ Security with .gitignore
- ✅ Different environments (Dev, Production)
- ✅ Best practices
- ✅ Complete project configuration

---

## 📚 Session Breakdown (4-5 Hours)

| Time | Topic | Duration |
|------|-------|----------|
| **Hour 1** | Environment Variables Basics | 60 min |
| **Hour 2** | .env File Setup in Vite | 60 min |
| **Hour 3** | API Configuration | 60 min |
| **Hour 4** | Multiple Environments | 60 min |
| **Hour 5** | Security & Best Practices | 60 min |

---

## 🔐 Part 1: What are Environment Variables? (60 minutes)

### 📖 Environment Variables Kya Hain?

**Simple Urdu/English:**
Environment variables aise variables hain jo aapke **environment** (development, staging, production) ke hisaab se **change** hote hain. Yeh sensitive data aur configuration ko secure rakhte hain.

**Real-Life Example:**
```
Sochein aap ek restaurant manager ho:

Development (Testing Kitchen):
- Address: Test Kitchen, Floor 1
- Phone: Test Number
- Database: Test Orders

Production (Real Restaurant):
- Address: Real Location, Main Street
- Phone: Customer Phone
- Database: Real Orders

Alag environments ke liye alag settings!
```

---

### 🤔 Why Do We Need Environment Variables?

**Problem 1: Hard-Coded Values**
```javascript
// ❌ Bad - Hard-coded API URL
const API_URL = 'https://jsonplaceholder.typicode.com';

// Problem:
// - Production mein change karna padega
// - Code mein sensitive info visible
// - Har developer ko same URL use karna padega
```

**Solution: Environment Variables**
```javascript
// ✅ Good - From environment
const API_URL = import.meta.env.VITE_API_URL;

// Benefits:
// - Easy to change per environment
// - Sensitive data hidden
// - Each developer can have own config
```

---

**Problem 2: Sensitive Data in Code**
```javascript
// ❌ Dangerous
const API_KEY = 'sk_live_12345abcde67890';
const DB_PASSWORD = 'mypassword123';

// Agar yeh code GitHub par push ho:
// - Everyone ko sensitive data visible
// - Security breach
// - Account hack ho sakta hai
```

**Solution:**
```javascript
// ✅ Safe - In .env file
const API_KEY = import.meta.env.VITE_API_KEY;

// .env file Git par nahi jayegi
// Secure!
```

---

### 📊 Where to Use Environment Variables?

**1. API URLs**
```
Development: http://localhost:5000/api
Production: https://api.myapp.com
```

**2. API Keys**
```
Google Maps API Key
Stripe Payment Key
Firebase Config
```

**3. Feature Flags**
```
VITE_ENABLE_ANALYTICS=true
VITE_DEBUG_MODE=false
```

**4. Database Connections**
```
Development DB: localhost
Production DB: remote server
```

---

### 🎯 Environment Types

**1. Development**
```
Local machine par testing
Dummy data
Debug mode on
Local database
```

**2. Staging**
```
Pre-production testing
Real-like data
Testing before launch
```

**3. Production**
```
Live application
Real users
Real data
Optimized & secure
```

---

## 📁 Part 2: .env File in Vite (60 minutes)

### 📖 What is .env File?

**Simple Urdu/English:**
`.env` file ek special file hai jahan aap apne environment variables store karte ho. Yeh file aapke code se alag hoti hai.

**Structure:**
```
project-root/
├── src/
├── public/
├── .env              ← Environment variables file
├── .env.example      ← Template for team
├── .gitignore        ← Must include .env
├── package.json
└── vite.config.js
```

---

### ⚠️ IMPORTANT: Vite Prefix Rule

**In Vite (Not Create React App):**

```javascript
// ✅ Correct - Starts with VITE_
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Admin Panel
VITE_DEBUG=true

// ❌ Wrong - No VITE_ prefix (won't work)
API_URL=https://api.example.com
APP_NAME=Admin Panel
DEBUG=true
```

**Why?**
- Vite mein sirf `VITE_` prefix wale variables accessible hote hain
- Security reason (accidentally expose nahi hote)
- Client-side code mein sirf safe variables

---

### 📝 Step 1: Create .env File

**Location:** Project root (same level as package.json)

**Create file:** `.env`

**Content:**
```env
# API Configuration
VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
VITE_API_TIMEOUT=10000

# App Configuration
VITE_APP_NAME=Admin Panel
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_DEBUG_MODE=true

# Other Settings
VITE_ITEMS_PER_PAGE=10
```

**Syntax Rules:**
```env
# 1. No spaces around =
VITE_API_URL=https://example.com  ✅
VITE_API_URL = https://example.com  ❌

# 2. No quotes needed (but can use)
VITE_NAME=MyApp          ✅
VITE_NAME="MyApp"        ✅
VITE_NAME='MyApp'        ✅

# 3. Comments with #
# This is a comment
VITE_KEY=value

# 4. Multiline not supported
# Use separate variables instead
```

---

### 📝 Step 2: Create .env.example

**Purpose:** Template for other developers

**File:** `.env.example`

```env
# API Configuration
VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
VITE_API_TIMEOUT=10000

# App Configuration
VITE_APP_NAME=Your App Name
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_DEBUG_MODE=true

# Other Settings
VITE_ITEMS_PER_PAGE=10

# Instructions:
# 1. Copy this file to .env
# 2. Replace values with your own
# 3. Never commit .env to Git
```

**Difference:**
```
.env          → Actual values (NOT in Git)
.env.example  → Template (YES in Git)
```

---

### 📝 Step 3: Update .gitignore

**File:** `.gitignore`

**Add these lines:**
```gitignore
# Environment Variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Keep example file
!.env.example
```

**Why?**
```
✅ .env.example → Git par jayega (template)
❌ .env → Git par NAHI jayega (sensitive data)
```

---

### 🔍 Step 4: Verify .gitignore

**Check if .env is ignored:**

```bash
# Terminal mein
git status

# Output should NOT show .env
# If .env shows, add it to .gitignore
```

**If .env already committed:**
```bash
# Remove from Git (but keep file)
git rm --cached .env

# Add to .gitignore
echo ".env" >> .gitignore

# Commit changes
git add .gitignore
git commit -m "Remove .env from Git"
```

---

## 💻 Part 3: Using Environment Variables in Code (60 minutes)

### 📖 How to Access Environment Variables

**In Vite:**
```javascript
// Access with import.meta.env
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const appName = import.meta.env.VITE_APP_NAME;
const debug = import.meta.env.VITE_DEBUG_MODE;

console.log('API URL:', apiUrl);
console.log('App Name:', appName);
console.log('Debug Mode:', debug);
```

**NOT like this (wrong for Vite):**
```javascript
// ❌ Wrong - This is for Node.js/Create React App
process.env.REACT_APP_API_URL  // Won't work in Vite
```

---

### 🧪 Example 1: Simple Usage

```javascript
// src/config/app.config.js

const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  appName: import.meta.env.VITE_APP_NAME,
  appVersion: import.meta.env.VITE_APP_VERSION,
  debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',
  itemsPerPage: Number(import.meta.env.VITE_ITEMS_PER_PAGE) || 10
};

export default config;

// Usage in components
import config from './config/app.config';

console.log('API URL:', config.apiBaseUrl);
console.log('App Name:', config.appName);
```

---

### 🧪 Example 2: Type Conversion

**Important:** Environment variables are always **strings**!

```javascript
// .env file
VITE_PORT=5000
VITE_DEBUG=true
VITE_MAX_ITEMS=100

// JavaScript
const port = import.meta.env.VITE_PORT;
console.log(typeof port); // "string" not number!

// ✅ Correct conversion
const portNumber = Number(import.meta.env.VITE_PORT);
const isDebug = import.meta.env.VITE_DEBUG === 'true';
const maxItems = parseInt(import.meta.env.VITE_MAX_ITEMS);

console.log(typeof portNumber); // "number"
console.log(typeof isDebug);    // "boolean"
```

---

### 🧪 Example 3: Default Values

```javascript
// With fallback values
const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  timeout: Number(import.meta.env.VITE_TIMEOUT) || 10000,
  appName: import.meta.env.VITE_APP_NAME || 'My App'
};

// If .env doesn't have value, use default
```

---

### 🎯 Step 5: Update API Service File

**File:** `src/services/api.js`

**Before (Hard-coded):**
```javascript
// ❌ Old way
const BASE_URL = 'https://jsonplaceholder.typicode.com';
```

**After (Environment Variable):**
```javascript
// ✅ New way
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
```

**Complete Updated File:**

```javascript
// src/services/api.js

import axios from 'axios';

// ==========================================
// CONFIGURATION FROM ENVIRONMENT VARIABLES
// ==========================================

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com';
const TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;
const DEBUG_MODE = import.meta.env.VITE_DEBUG_MODE === 'true';

// Log configuration in debug mode
if (DEBUG_MODE) {
  console.log('🔧 API Configuration:');
  console.log('Base URL:', BASE_URL);
  console.log('Timeout:', TIMEOUT);
  console.log('Debug Mode:', DEBUG_MODE);
}

// ==========================================
// CREATE AXIOS INSTANCE
// ==========================================

const api = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ==========================================
// REQUEST INTERCEPTOR
// ==========================================

api.interceptors.request.use(
  (config) => {
    if (DEBUG_MODE) {
      console.log('📤 Request:', config.method.toUpperCase(), config.url);
    }
    
    // Add auth token if exists
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    if (DEBUG_MODE) {
      console.error('❌ Request Error:', error);
    }
    return Promise.reject(error);
  }
);

// ==========================================
// RESPONSE INTERCEPTOR
// ==========================================

api.interceptors.response.use(
  (response) => {
    if (DEBUG_MODE) {
      console.log('📥 Response:', response.status, response.config.url);
    }
    return response;
  },
  (error) => {
    if (DEBUG_MODE) {
      console.error('❌ Response Error:', error.response?.status, error.message);
    }
    
    // Handle common errors
    if (error.response) {
      const status = error.response.status;
      
      if (status === 401) {
        // Unauthorized - redirect to login
        console.log('Unauthorized - redirecting to login');
        // window.location.href = '/login';
      } else if (status === 403) {
        console.log('Forbidden - no permission');
      } else if (status >= 500) {
        console.log('Server error');
      }
    }
    
    return Promise.reject(error);
  }
);

// ==========================================
// USER APIs
// ==========================================

export const getAllUsers = () => api.get('/users');
export const getUserById = (id) => api.get(`/users/${id}`);
export const createUser = (userData) => api.post('/users', userData);
export const updateUser = (id, userData) => api.put(`/users/${id}`, userData);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// ==========================================
// POSTS APIs
// ==========================================

export const getAllPosts = () => api.get('/posts');
export const getPostById = (id) => api.get(`/posts/${id}`);
export const createPost = (postData) => api.post('/posts', postData);
export const updatePost = (id, postData) => api.put(`/posts/${id}`, postData);
export const deletePost = (id) => api.delete(`/posts/${id}`);

// ==========================================
// EXPORT DEFAULT
// ==========================================

export default api;
```

---

## 🎯 Part 4: Create Config File (30 minutes)

### Step 6: Create Central Config File

**File:** `src/config/app.config.js`

```javascript
// ==========================================
// APPLICATION CONFIGURATION
// ==========================================

const config = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com',
    timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  },

  // App Information
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Admin Panel',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    description: 'Enterprise Admin Dashboard',
  },

  // Feature Flags
  features: {
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',
    maintenanceMode: import.meta.env.VITE_MAINTENANCE_MODE === 'true',
  },

  // Pagination
  pagination: {
    itemsPerPage: Number(import.meta.env.VITE_ITEMS_PER_PAGE) || 10,
    maxItemsPerPage: 100,
  },

  // URLs
  urls: {
    frontend: import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173',
    backend: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
  },

  // Storage Keys
  storage: {
    tokenKey: 'auth_token',
    userKey: 'user_data',
    themeKey: 'app_theme',
  },
};

// Log configuration in development
if (config.features.debugMode) {
  console.log('📋 App Configuration:', config);
}

export default config;
```

**Usage:**
```javascript
import config from '../config/app.config';

// Use anywhere
console.log(config.app.name);
console.log(config.api.baseUrl);
console.log(config.features.debugMode);
```

---

## 🌍 Part 5: Multiple Environments (60 minutes)

### 📖 Different Environment Files

**Vite supports multiple .env files:**

```
.env                  → All environments (base)
.env.local            → Local overrides (ignored by git)
.env.development      → Development mode
.env.production       → Production build
.env.test             → Testing
```

**Priority (highest to lowest):**
```
1. .env.[mode].local   (highest priority)
2. .env.[mode]
3. .env.local
4. .env                (lowest priority)
```

---

### 📝 Create Environment Files

**File 1:** `.env` (Base - All environments)
```env
# Base configuration for all environments

# App Info
VITE_APP_NAME=Admin Panel
VITE_APP_VERSION=1.0.0

# Common Settings
VITE_ITEMS_PER_PAGE=10
```

---

**File 2:** `.env.development` (Development only)
```env
# Development Environment

# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
VITE_API_TIMEOUT=30000

# Debug Settings
VITE_DEBUG_MODE=true
VITE_ENABLE_ANALYTICS=false
VITE_LOG_LEVEL=debug

# Development URLs
VITE_FRONTEND_URL=http://localhost:5173
VITE_BACKEND_URL=http://localhost:5000
```

---

**File 3:** `.env.production` (Production build)
```env
# Production Environment

# API Configuration
VITE_API_BASE_URL=https://api.myapp.com/api
VITE_API_TIMEOUT=10000

# Production Settings
VITE_DEBUG_MODE=false
VITE_ENABLE_ANALYTICS=true
VITE_LOG_LEVEL=error

# Production URLs
VITE_FRONTEND_URL=https://myapp.com
VITE_BACKEND_URL=https://api.myapp.com
```

---

**File 4:** `.env.local` (Personal overrides)
```env
# Local development overrides
# This file is in .gitignore
# Each developer can have their own settings

VITE_API_BASE_URL=http://192.168.1.100:5000/api
VITE_DEBUG_MODE=true
```

---

### 🚀 How to Use Different Environments

**Development:**
```bash
npm run dev
# Uses .env.development
```

**Production Build:**
```bash
npm run build
# Uses .env.production
```

**Preview Production:**
```bash
npm run preview
# Uses production build
```

---

### 🧪 Example: Conditional Code Based on Environment

```javascript
// Check current mode
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;
const mode = import.meta.env.MODE; // 'development' or 'production'

// Conditional logging
if (isDevelopment) {
  console.log('🔧 Running in development mode');
  console.log('API URL:', import.meta.env.VITE_API_BASE_URL);
}

// Feature flags
const config = {
  enableDevTools: isDevelopment,
  enableAnalytics: isProduction,
  logLevel: isDevelopment ? 'debug' : 'error',
};

// Conditional imports
if (isDevelopment) {
  // Load dev tools
  import('./devTools').then(module => module.init());
}
```

---

## 🔒 Part 6: Security Best Practices (60 minutes)

### ⚠️ What NOT to Put in .env (Client-Side)

**❌ Never store these in VITE_ variables:**
```env
# ❌ Dangerous - Will be exposed to browser
VITE_DATABASE_PASSWORD=secret123
VITE_PRIVATE_API_KEY=sk_live_12345
VITE_AWS_SECRET_KEY=aws_secret
VITE_STRIPE_SECRET_KEY=sk_live_xxx
```

**Why?**
- Vite bundles `VITE_` variables into your JavaScript
- Anyone can view in browser DevTools
- Security breach!

---

### ✅ What CAN Go in Client-Side .env

```env
# ✅ Safe - Public information
VITE_API_BASE_URL=https://api.myapp.com
VITE_APP_NAME=My App
VITE_GOOGLE_MAPS_API_KEY=public_key_123  # Public keys only
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx  # Publishable keys OK
VITE_FIREBASE_API_KEY=AIza...            # Firebase public config
```

---

### 🔐 Secrets Management

**For Backend Only (Node.js, ASP.NET):**
```env
# Backend .env (NOT in frontend Vite project)
DATABASE_URL=postgresql://user:pass@localhost/db
JWT_SECRET=super_secret_key_12345
STRIPE_SECRET_KEY=sk_live_real_secret
AWS_SECRET_ACCESS_KEY=aws_secret_key
SMTP_PASSWORD=email_password
```

**Rule:** Sensitive secrets = Backend only!

---

### ✅ Security Checklist

**1. Check .gitignore**
```bash
# Verify .env is ignored
cat .gitignore | grep .env

# Should show:
# .env
# .env.local
# etc.
```

**2. Never commit .env**
```bash
# If accidentally committed:
git rm --cached .env
git commit -m "Remove .env"
```

**3. Use .env.example**
```env
# .env.example (safe to commit)
VITE_API_BASE_URL=your_api_url_here
VITE_APP_NAME=your_app_name
```

**4. Rotate Exposed Keys**
```
If you accidentally committed secrets:
1. Immediately rotate/change those keys
2. Remove from Git history
3. Update .gitignore
```

---

### 🔍 Check What's Exposed

**View bundled variables:**
```bash
# Build project
npm run build

# Check dist/assets/*.js files
# Search for VITE_ variables
# They will be visible as plain text
```

**Example of what's visible:**
```javascript
// In production bundle
const apiUrl = "https://api.myapp.com";  // Visible!
const appName = "Admin Panel";            // Visible!
```

---

## 🎯 Part 7: Complete Implementation (30 minutes)

### Final Project Structure

```
admin-panel/
├── src/
│   ├── config/
│   │   └── app.config.js          ← New: Central config
│   ├── services/
│   │   └── api.js                 ← Updated: Uses env vars
│   ├── components/
│   ├── pages/
│   └── main.jsx
├── .env                            ← New: Base config (not in git)
├── .env.development               ← New: Dev config (not in git)
├── .env.production                ← New: Prod config (not in git)
├── .env.example                   ← New: Template (in git)
├── .gitignore                     ← Updated: Includes .env
├── package.json
└── vite.config.js
```

---

### Step 7: Update Components to Use Config

**Example:** Update TopBar to show app name

**File:** `src/components/layout/TopBar.jsx`

```javascript
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import config from '../../config/app.config';

function TopBar() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6">
          {config.app.name} v{config.app.version}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
```

---

### Step 8: Add Environment Indicator

**Create:** `src/components/common/EnvIndicator.jsx`

```javascript
import React from 'react';
import { Chip, Box } from '@mui/material';

function EnvIndicator() {
  const isDev = import.meta.env.DEV;
  const mode = import.meta.env.MODE;

  // Only show in development
  if (!isDev) return null;

  return (
    <Box sx={{ 
      position: 'fixed', 
      bottom: 10, 
      right: 10, 
      zIndex: 9999 
    }}>
      <Chip 
        label={`ENV: ${mode.toUpperCase()}`}
        color="warning"
        size="small"
      />
    </Box>
  );
}

export default EnvIndicator;
```

**Add to App.jsx:**
```javascript
import EnvIndicator from './components/common/EnvIndicator';

function App() {
  return (
    <>
      {/* Your routes */}
      <EnvIndicator />
    </>
  );
}
```

---

## 🧪 Testing Your Setup (30 minutes)

### Test 1: Verify Environment Variables

**Create:** `src/test/EnvTest.jsx`

```javascript
import React, { useEffect } from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';
import config from '../config/app.config';

function EnvTest() {
  useEffect(() => {
    console.log('🔍 Environment Variables Test:');
    console.log('Mode:', import.meta.env.MODE);
    console.log('Dev:', import.meta.env.DEV);
    console.log('Prod:', import.meta.env.PROD);
    console.log('API URL:', import.meta.env.VITE_API_BASE_URL);
    console.log('App Name:', import.meta.env.VITE_APP_NAME);
    console.log('Debug Mode:', import.meta.env.VITE_DEBUG_MODE);
    console.log('Full Config:', config);
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Environment Variables Test
      </Typography>
      
      <Paper sx={{ padding: 3, marginTop: 2 }}>
        <Typography variant="h6">Current Environment:</Typography>
        <Typography>Mode: {import.meta.env.MODE}</Typography>
        <Typography>Development: {import.meta.env.DEV ? 'Yes' : 'No'}</Typography>
        <Typography>Production: {import.meta.env.PROD ? 'Yes' : 'No'}</Typography>
        
        <Divider sx={{ marginY: 2 }} />
        
        <Typography variant="h6">Configuration:</Typography>
        <Typography>API URL: {config.api.baseUrl}</Typography>
        <Typography>App Name: {config.app.name}</Typography>
        <Typography>Version: {config.app.version}</Typography>
        <Typography>Debug Mode: {config.features.debugMode ? 'On' : 'Off'}</Typography>
        <Typography>Items Per Page: {config.pagination.itemsPerPage}</Typography>
        
        <Divider sx={{ marginY: 2 }} />
        
        <Typography variant="body2" color="text.secondary">
          Check browser console for detailed logs
        </Typography>
      </Paper>
    </Box>
  );
}

export default EnvTest;
```

---

### Test 2: Verify API Calls

**Open browser console and check:**
```javascript
// Should see logs like:
🔧 API Configuration:
Base URL: https://jsonplaceholder.typicode.com
Timeout: 10000
Debug Mode: true

📤 Request: GET /users
📥 Response: 200 /users
```

---

### Test 3: Build for Production

```bash
# Build with production env
npm run build

# Check dist folder
# Environment variables should be replaced with actual values
```

---

## 🎯 Practice Tasks

### Task 1: Add More Config Variables (⭐⭐)

**Add to .env:**
```env
VITE_COMPANY_NAME=Your Company
VITE_SUPPORT_EMAIL=support@example.com
VITE_MAX_FILE_SIZE=5242880
```

**Use in code:**
```javascript
const maxFileSize = Number(import.meta.env.VITE_MAX_FILE_SIZE);
```

---

### Task 2: Create Feature Flags (⭐⭐⭐)

```env
VITE_FEATURE_USER_EXPORT=true
VITE_FEATURE_DARK_MODE=false
VITE_FEATURE_NOTIFICATIONS=true
```

**Implement:**
```javascript
const features = {
  userExport: import.meta.env.VITE_FEATURE_USER_EXPORT === 'true',
  darkMode: import.meta.env.VITE_FEATURE_DARK_MODE === 'true',
  notifications: import.meta.env.VITE_FEATURE_NOTIFICATIONS === 'true',
};

// Conditional rendering
{features.userExport && (
  <Button onClick={exportUsers}>Export</Button>
)}
```

---

### Task 3: Add Environment-Specific Styling (⭐⭐⭐⭐)

```javascript
const isDev = import.meta.env.DEV;

// Different styles per environment
const headerStyle = {
  backgroundColor: isDev ? 'orange' : 'blue',
};
```

---

### Task 4: Create Config Validator (⭐⭐⭐⭐⭐)

```javascript
// src/config/validator.js

const requiredVars = [
  'VITE_API_BASE_URL',
  'VITE_APP_NAME',
];

const validateConfig = () => {
  const missing = [];
  
  requiredVars.forEach(key => {
    if (!import.meta.env[key]) {
      missing.push(key);
    }
  });
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    console.error(missing);
    throw new Error('Configuration error');
  }
  
  console.log('✅ All required environment variables present');
};

export default validateConfig;

// Call in main.jsx
import validateConfig from './config/validator';
validateConfig();
```

---

## ✅ Day 5 Checklist

### **Understanding:**
- [ ] Environment variables kya hain samajh gaya
- [ ] .env file ka purpose clear hai
- [ ] VITE_ prefix ki zaroorat samajh gayi
- [ ] Security concerns pata hain
- [ ] Multiple environments ka concept clear hai

### **Files Created:**
- [ ] .env file created
- [ ] .env.development created
- [ ] .env.production created
- [ ] .env.example created (template)
- [ ] src/config/app.config.js created

### **Files Updated:**
- [ ] .gitignore updated (.env added)
- [ ] src/services/api.js updated (uses env vars)
- [ ] Components updated (use config)

### **Security:**
- [ ] .env in .gitignore
- [ ] No sensitive data in VITE_ vars
- [ ] .env.example has template
- [ ] Verified .env not in Git

### **Testing:**
- [ ] npm run dev works
- [ ] Environment variables accessible
- [ ] API calls working with env URL
- [ ] Console shows config in debug mode
- [ ] npm run build works

### **Best Practices:**
- [ ] Using config file for centralized access
- [ ] Default values provided
- [ ] Type conversions done correctly
- [ ] Debug logs only in development

---

## 🎓 Summary

### Today You Learned:

**1. Environment Variables**
```
✅ What they are
✅ Why we need them
✅ When to use them
✅ Security considerations
```

**2. .env Files in Vite**
```
✅ VITE_ prefix requirement
✅ File structure
✅ Syntax rules
✅ Multiple environment files
```

**3. Configuration**
```
✅ API URL from env
✅ Central config file
✅ Feature flags
✅ Type conversions
```

**4. Security**
```
✅ .gitignore setup
✅ What not to expose
✅ Public vs private keys
✅ Backend vs frontend secrets
```

**5. Multiple Environments**
```
✅ Development settings
✅ Production settings
✅ Local overrides
✅ Environment-specific code
```

---

## 📊 Before vs After

### Before Day 5:
```
❌ Hard-coded API URLs
❌ Sensitive data in code
❌ Same config for all environments
❌ Manual changes for production
```

### After Day 5:
```
✅ Dynamic API configuration
✅ Secrets hidden in .env
✅ Different configs per environment
✅ Easy production deployment
✅ Professional setup
```

---

## 🔜 Week 4 Preview

**Week 4: ASP.NET Core Backend Development**

**What's Coming:**
- ✅ .NET Core installation
- ✅ Creating Web API project
- ✅ SQL Server setup
- ✅ Entity Framework Core
- ✅ Database migrations
- ✅ API endpoints
- ✅ JWT authentication

**Get Ready:**
Next week hum backend development start karenge! 🚀

---

## 💡 Pro Tips

### Tip 1: Always Use .env.example
```
✅ Team ko pata chale kya variables chahiye
✅ New developers easily setup kar sakte hain
✅ Documentation ka kaam bhi karta hai
```

### Tip 2: Never Commit .env
```bash
# Before committing
git status

# .env show nahi hona chahiye
# Agar ho toh .gitignore check karo
```

### Tip 3: Use Config File
```javascript
// ✅ Good - Centralized
import config from './config/app.config';
const url = config.api.baseUrl;

// ❌ Bad - Scattered
const url = import.meta.env.VITE_API_URL;
```

### Tip 4: Type Conversion
```javascript
// Numbers
const timeout = Number(import.meta.env.VITE_TIMEOUT);

// Booleans
const debug = import.meta.env.VITE_DEBUG === 'true';

// Arrays (JSON)
const colors = JSON.parse(import.meta.env.VITE_COLORS);
```

---

## ❓ Common Problems & Solutions

### Problem 1: Variables Not Working

**Error:** `undefined`

**Solution:**
```javascript
// ✅ Check prefix
VITE_API_URL=...  // Correct

// ❌ Wrong prefix
API_URL=...       // Won't work
REACT_APP_URL=... // Wrong (that's for CRA)
```

---

### Problem 2: Changes Not Reflecting

**Issue:** Updated .env but no change

**Solution:**
```bash
# Restart dev server
Ctrl+C
npm run dev
```

---

### Problem 3: .env in Git History

**Issue:** Accidentally committed .env

**Solution:**
```bash
# Remove from Git but keep local file
git rm --cached .env

# Update .gitignore
echo ".env" >> .gitignore

# Commit
git add .gitignore
git commit -m "Remove .env from Git"

# Rotate any exposed secrets!
```

---

### Problem 4: Production Build Issues

**Issue:** Variables not working in build

**Solution:**
```bash
# Check .env.production exists
# Check VITE_ prefix
# Rebuild:
npm run build
```

---

## 📚 Additional Resources

**Learn More:**

1. **Vite Environment Variables:**
   - https://vitejs.dev/guide/env-and-mode.html

2. **Environment Best Practices:**
   - https://12factor.net/config

3. **Security Guide:**
   - https://owasp.org/www-project-api-security/

---

## 🎊 Congratulations!

**Aaj aapne professional configuration setup kar diya! 🎉**

**You Now Know:**
- ✅ Environment variables
- ✅ .env file management
- ✅ Secure configuration
- ✅ Multiple environments
- ✅ Production-ready setup
- ✅ Best practices

**Your app is now ready for professional deployment!**

**Next Week:** ASP.NET Core Backend! 🚀

**Keep Learning! Keep Building! 💻✨**
