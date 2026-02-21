# 📅 Week 5 - Day 6: Frontend JWT Integration

## 🎯 Aaj ka Goal

Backend authentication complete ho gaya (Days 2-5)! Aaj hum **Frontend integration** karenge! 🎨🔐

**Kya Karenge:**
- Login page se API call karke token lena
- Token ko localStorage mein store karna
- Axios interceptor (har request mein auto token attach)
- Auth Context (global authentication state)
- Login/Logout functionality
- Protected routes (unauthorized users ko login page pe redirect)
- Token expiry detection aur auto-logout

**Output:** Complete frontend authentication system with MUI! 🚀

---

## ⏰ Aaj ka Session Breakdown (4-5 Hours)

| Part | Topic | Time |
|------|-------|------|
| 1 | Understanding Frontend Auth Flow | 30 min |
| 2 | Token Storage & Management | 30 min |
| 3 | Auth Context Setup (React Context API) | 45 min |
| 4 | Login Page Implementation (MUI) | 45 min |
| 5 | Axios Interceptor Configuration | 30 min |
| 6 | Protected Routes Implementation | 45 min |
| 7 | Token Expiry & Auto Logout | 30 min |
| 8 | Complete Testing (All Scenarios) | 45 min |

---

## 📚 Part 1: Understanding Frontend Auth Flow (30 min)

### 🔄 Complete Authentication Flow

```
User Types Email/Password
    ↓
Frontend sends POST /api/auth/login
    ↓
Backend validates credentials
    ↓
Backend returns JWT token
    ↓
Frontend stores token in localStorage
    ↓
User navigates to protected page
    ↓
Frontend checks: Token exists?
    ↓
✅ YES                           ❌ NO
    ↓                                ↓
Attach token to request         Redirect to /login
    ↓
Backend validates token
    ↓
✅ Valid                         ❌ Invalid/Expired
    ↓                                ↓
Return data                     Return 401 Unauthorized
    ↓                                ↓
Display data                    Auto logout + Redirect to /login
```

---

### 🏢 Real-Life Analogy: Movie Theater

**Without JWT:**
```
You: "Can I watch the movie?"
Staff: "Show me your ticket!"
You: "I bought it yesterday..."
Staff: "Sorry, no ticket = no entry"
```

**With JWT (Token):**
```
Day 1:
You: Buy ticket (Login) → Get ticket (JWT token)
Store ticket in wallet (localStorage)

Day 2:
You: Show ticket at entrance (Axios sends token)
Staff: Checks ticket validity (Backend validates)
Staff: "Valid ticket, enjoy!" (200 OK response)

Ticket Expired:
You: Show expired ticket
Staff: "Expired! Buy new ticket" (401 Unauthorized)
Automatic: You're redirected to ticket counter (Login page)
```

---

### 📦 What is localStorage?

**Definition:**
```
localStorage = Browser's permanent storage
Store karke browser band karo, data rahega!
```

**Example:**
```javascript
// Save
localStorage.setItem('token', 'eyJhbGciOi...')

// Get
const token = localStorage.getItem('token')

// Remove
localStorage.removeItem('token')

// Clear all
localStorage.clear()
```

**Why localStorage for Token?**
```
✅ Persists across browser sessions (close/open)
✅ Large storage capacity (5-10 MB)
✅ Simple API (setItem, getItem, removeItem)
✅ Synchronous (fast access)

❌ Security consideration: XSS attacks possible
   (But for learning/standard apps, it's fine)
```

**Alternatives:**
```
1. sessionStorage: Tab band karo → Data delete
2. Cookies: Backend se set hote, expiry built-in
3. Memory: Variable mein (refresh pe lost)

For JWT: localStorage is most common! ✅
```

---

### 🎯 What is Axios Interceptor?

**Problem Without Interceptor:**
```javascript
// Har API call mein manually token add karna padta
axios.get('/api/users', {
  headers: { Authorization: `Bearer ${token}` }
})

axios.post('/api/users', data, {
  headers: { Authorization: `Bearer ${token}` }
})

// Repetitive! Copy-paste! ❌
```

**Solution With Interceptor:**
```javascript
// One time setup
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Ab sirf simple call karo
axios.get('/api/users')  // Token auto attach! ✅
axios.post('/api/users', data)  // Token auto attach! ✅
```

**Analogy: Security Guard**
```
Guard at gate (Interceptor):
- Everyone entering (every request)
- Guard checks: "Do you have badge?" (token in localStorage?)
- If yes: Attach badge to shirt (add to headers)
- Person enters building (request goes to backend)

Automatic process for EVERYONE! ✅
```

---

### 🌐 What is React Context API?

**Problem Without Context:**
```
App Component
 ├── Navbar (needs: user info, logout button)
 ├── Sidebar (needs: user role, name)
 └── Dashboard
      └── UserProfile (needs: user info)

Props drilling: App → Dashboard → UserProfile
Too many levels! Messy! ❌
```

**Solution With Context:**
```javascript
// Create AuthContext (global state)
<AuthContext.Provider value={{ user, login, logout }}>
  <App />
</AuthContext.Provider>

// Use anywhere (without props drilling)
const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  // Direct access! ✅
}
```

**Analogy: Company Announcement System**
```
Without Context (Email chain):
CEO → Manager → Team Lead → You
4 people involved, slow, messy

With Context (Company Slack/Teams):
CEO posts announcement
Everyone sees it directly!
No middleman ✅
```

---

## 🗄️ Part 2: Token Storage & Management (30 min)

### 📝 Step 1: Create Auth Utility File

1. **VS Code** → **frontend folder** open karo

2. **src** folder mein **utils** folder banao (if not exists)

3. **utils** folder mein **auth.js** file banao

4. **Code likho:**

```javascript
// src/utils/auth.js

/**
 * Authentication utility functions
 * Handles token storage, retrieval, and management
 */

const TOKEN_KEY = 'adminpanel_token';
const USER_KEY = 'adminpanel_user';

/**
 * Save authentication token to localStorage
 * @param {string} token - JWT token from backend
 */
export const saveToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

/**
 * Get authentication token from localStorage
 * @returns {string|null} Token or null if not found
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Remove authentication token from localStorage
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Check if user is authenticated (has valid token)
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  const token = getToken();
  return token !== null && token !== undefined && token !== '';
};

/**
 * Save user information to localStorage
 * @param {object} user - User object from login response
 */
export const saveUser = (user) => {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

/**
 * Get user information from localStorage
 * @returns {object|null} User object or null
 */
export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  if (user) {
    try {
      return JSON.parse(user);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }
  return null;
};

/**
 * Remove user information from localStorage
 */
export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

/**
 * Clear all authentication data (logout)
 */
export const clearAuth = () => {
  removeToken();
  removeUser();
};

/**
 * Decode JWT token to get payload (without verification)
 * Note: This is for reading claims only, NOT for security validation
 * Backend still validates the token signature!
 * @param {string} token - JWT token
 * @returns {object|null} Decoded payload or null
 */
export const decodeToken = (token) => {
  if (!token) return null;
  
  try {
    // JWT format: header.payload.signature
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean}
 */
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  
  // exp is in seconds, Date.now() is in milliseconds
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

/**
 * Get user role from token
 * @param {string} token - JWT token
 * @returns {string|null} User role or null
 */
export const getUserRoleFromToken = (token) => {
  const decoded = decodeToken(token);
  if (!decoded) return null;
  
  // Role can be in different claim types
  return decoded.role || 
         decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || 
         null;
};
```

**Save:** Ctrl + S

---

### 📖 Explanation: auth.js Functions

#### 1. Token Management

```javascript
saveToken(token)    // Login ke baad token save
getToken()          // API calls mein token use karne ke liye
removeToken()       // Logout ke baad token delete
```

#### 2. User Management

```javascript
saveUser(user)      // User info save (name, email, role)
getUser()           // User info retrieve (navbar, profile)
removeUser()        // Logout ke baad user info delete
```

#### 3. Authentication Check

```javascript
isAuthenticated()   // Check: User logged in hai ya nahi?
```

#### 4. Token Decoding

```javascript
decodeToken(token)       // JWT payload read karo
isTokenExpired(token)    // Check: Token expired hai?
getUserRoleFromToken()   // Get user role from token
```

---

## 🎨 Part 3: Auth Context Setup (45 min)

### 📝 Step 1: Create Auth Context

**Create:** `src/contexts/AuthContext.js`

```javascript
// src/contexts/AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  saveToken,
  getToken,
  saveUser,
  getUser,
  clearAuth,
  isTokenExpired,
} from '../utils/auth';

// Create Context
const AuthContext = createContext(null);

/**
 * AuthProvider Component
 * Wraps entire app and provides authentication state
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Check if user is authenticated (on app load)
   */
  const checkAuth = () => {
    try {
      const token = getToken();
      const savedUser = getUser();

      if (token && savedUser && !isTokenExpired(token)) {
        // Token exists and not expired
        setUser(savedUser);
      } else {
        // Token expired or missing
        clearAuth();
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      clearAuth();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login function
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<object>} Response with success/error
   */
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        { email, password }
      );

      if (response.data.success) {
        const { token, ...userData } = response.data.data;
        
        // Save token and user info
        saveToken(token);
        saveUser(userData);
        setUser(userData);

        return { success: true, message: 'Login successful' };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response && error.response.data) {
        return {
          success: false,
          message: error.response.data.message || 'Login failed',
        };
      }
      
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  /**
   * Logout function
   */
  const logout = () => {
    clearAuth();
    setUser(null);
    navigate('/login');
  };

  /**
   * Update user info (after profile edit)
   */
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    saveUser(updatedUser);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use Auth context
 * Usage: const { user, login, logout } = useAuth();
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

**Save:** Ctrl + S

---

### 📖 AuthContext Explanation

#### 1. State Management

```javascript
const [user, setUser] = useState(null)
// user = null → Not logged in
// user = {...} → Logged in (contains: id, name, email, role)
```

#### 2. checkAuth Function

```javascript
// Runs on app load (useEffect)
// Checks: Token exists? Token expired?
// If valid → setUser(...)
// If invalid → clearAuth()
```

#### 3. login Function

```javascript
// Called from Login page
// Steps:
1. API call to backend (/api/auth/login)
2. If success → Save token + user
3. setUser(...) → Update state
4. Return success/error message
```

#### 4. logout Function

```javascript
// Called from Navbar/Sidebar
// Steps:
1. clearAuth() → Remove token + user from localStorage
2. setUser(null) → Update state
3. navigate('/login') → Redirect
```

---

### 📝 Step 2: Wrap App with AuthProvider

**Open:** `src/App.js`

**Update:**

```javascript
// src/App.js

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
```

**Save:** Ctrl + S

---

## 🔐 Part 4: Login Page Implementation (45 min)

### 📝 Step 1: Create Login Page

**Create:** `src/pages/Login.js`

```javascript
// src/pages/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff, Login as LoginIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user types
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill all fields');
      setLoading(false);
      return;
    }

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        // Login successful, navigate to dashboard
        navigate('/dashboard');
      } else {
        // Login failed, show error
        setError(result.message);
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card sx={{ width: '100%', boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            {/* Logo/Title */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <LoginIcon sx={{ fontSize: 60, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" component="h1" fontWeight="bold">
                Admin Panel
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Sign in to your account
              </Typography>
            </Box>

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                autoComplete="email"
                autoFocus
              />

              {/* Password Field */}
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Login Button */}
              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                {loading ? (
                  <>
                    <CircularProgress size={24} sx={{ mr: 1 }} />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Demo Credentials (for testing) */}
            <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary" fontWeight="bold">
                Demo Credentials:
              </Typography>
              <Typography variant="caption" display="block" color="text.secondary">
                Email: admin@example.com
              </Typography>
              <Typography variant="caption" display="block" color="text.secondary">
                Password: Admin@123
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
```

**Save:** Ctrl + S

---

## 🔗 Part 5: Axios Interceptor Configuration (30 min)

### 📝 Step 1: Create Axios Instance

**Create:** `src/services/api.js`

```javascript
// src/services/api.js

import axios from 'axios';
import { getToken, clearAuth, isTokenExpired } from '../utils/auth';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 * Automatically attaches JWT token to every request
 */
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    
    // Check if token exists and not expired
    if (token) {
      if (isTokenExpired(token)) {
        // Token expired, clear auth and redirect
        clearAuth();
        window.location.href = '/login';
        return Promise.reject(new Error('Token expired'));
      }
      
      // Attach token to Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handles common response scenarios (401, 403, etc.)
 */
api.interceptors.response.use(
  (response) => {
    // Success response (2xx status codes)
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;
      
      // 401 Unauthorized - Token invalid or expired
      if (status === 401) {
        clearAuth();
        window.location.href = '/login';
      }
      
      // 403 Forbidden - Insufficient permissions
      if (status === 403) {
        console.error('Access denied. Insufficient permissions.');
        // Optionally redirect to unauthorized page
        // window.location.href = '/unauthorized';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
```

**Save:** Ctrl + S

---

### 📖 Interceptor Explanation

#### Request Interceptor (Before sending request)

```javascript
Every request:
1. Get token from localStorage
2. Check if token expired
3. If expired → logout + redirect
4. If valid → Attach to Authorization header
5. Send request

Automatic for ALL API calls! ✅
```

#### Response Interceptor (After receiving response)

```javascript
Every response:
1. If 401 Unauthorized → Token invalid
   → clearAuth() + redirect to login
2. If 403 Forbidden → Insufficient permissions
   → Show error or redirect
3. If 2xx success → Return response normally

Centralized error handling! ✅
```

---

### 📝 Step 2: Update .env File

**Open:** `frontend/.env`

**Add/Update:**

```env
REACT_APP_API_URL=https://localhost:7001
```

**Save:** Ctrl + S

**Restart frontend:**
```bash
npm start
```

---

### 📝 Step 3: Use API Instance in Requests

**Example:** Update existing API calls to use new `api` instance

**Before:**
```javascript
import axios from 'axios';

axios.get('https://localhost:7001/api/users')  // Manual URL
```

**After:**
```javascript
import api from '../services/api';

api.get('/api/users')  // Base URL + Auto token! ✅
```

---

## 🛡️ Part 6: Protected Routes Implementation (45 min)

### 📝 Step 1: Create PrivateRoute Component

**Create:** `src/components/PrivateRoute.js`

```javascript
// src/components/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Box, CircularProgress } from '@mui/material';

/**
 * PrivateRoute Component
 * Protects routes from unauthorized access
 * Redirects to login if user not authenticated
 */
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected component
  return children;
};

export default PrivateRoute;
```

**Save:** Ctrl + S

---

### 📝 Step 2: Create RoleBasedRoute Component (Bonus)

**Create:** `src/components/RoleBasedRoute.js`

```javascript
// src/components/RoleBasedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Box, Typography, Button } from '@mui/material';
import { Block as BlockIcon } from '@mui/icons-material';

/**
 * RoleBasedRoute Component
 * Protects routes based on user role
 * Shows "Access Denied" page if role doesn't match
 */
const RoleBasedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated } = useAuth();

  // Not authenticated → Redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user's role is in allowed roles
  const hasAccess = allowedRoles.includes(user?.role);

  // No access → Show Access Denied page
  if (!hasAccess) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          p: 3,
        }}
      >
        <BlockIcon sx={{ fontSize: 100, color: 'error.main', mb: 2 }} />
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Access Denied
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          You don't have permission to access this page.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Required role: {allowedRoles.join(' or ')}
          <br />
          Your role: {user?.role}
        </Typography>
        <Button variant="contained" href="/dashboard">
          Back to Dashboard
        </Button>
      </Box>
    );
  }

  // Has access → Render protected component
  return children;
};

export default RoleBasedRoute;
```

**Save:** Ctrl + S

---

### 📝 Step 3: Update App Routes

**Create/Update:** `src/routes/AppRoutes.js`

```javascript
// src/routes/AppRoutes.js

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Components
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import PrivateRoute from '../components/PrivateRoute';
import RoleBasedRoute from '../components/RoleBasedRoute';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Route: Login */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/users"
        element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        }
      />

      {/* Admin-Only Route Example */}
      <Route
        path="/admin/settings"
        element={
          <RoleBasedRoute allowedRoles={['admin']}>
            <div>Admin Settings Page</div>
          </RoleBasedRoute>
        }
      />

      {/* Default Route */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* 404 Not Found */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
```

**Save:** Ctrl + S

---

## ⏰ Part 7: Token Expiry & Auto Logout (30 min)

### 📝 Step 1: Create Token Expiry Checker

**Update:** `src/contexts/AuthContext.js`

**Add this useEffect (after existing useEffect):**

```javascript
// Check token expiry every 1 minute
useEffect(() => {
  if (!user) return;

  const checkTokenExpiry = () => {
    const token = getToken();
    if (!token || isTokenExpired(token)) {
      console.log('Token expired, logging out...');
      logout();
    }
  };

  // Check immediately
  checkTokenExpiry();

  // Check every 60 seconds
  const interval = setInterval(checkTokenExpiry, 60000);

  return () => clearInterval(interval);
}, [user]);
```

---

### 📝 Step 2: Update Navbar with Logout Button

**Update:** `src/components/Navbar.js` (if exists, or create)

```javascript
// src/components/Navbar.js

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import { AccountCircle, Logout as LogoutIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>

        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">
              Welcome, {user.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                px: 1,
                py: 0.5,
                bgcolor: 'rgba(255,255,255,0.2)',
                borderRadius: 1,
              }}
            >
              {user.role}
            </Typography>

            <IconButton
              size="large"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem>
                <AccountCircle sx={{ mr: 1 }} />
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
```

**Save:** Ctrl + S

---

## 🧪 Part 8: Complete Testing (All Scenarios) (45 min)

### ▶️ Step 1: Run Backend & Frontend

**Backend (Visual Studio):**
1. **Green Play button** → Backend runs on `https://localhost:7001`

**Frontend (VS Code Terminal):**
```bash
cd frontend
npm start
```

Frontend runs on `http://localhost:3000`

---

### 🧪 Test Scenario 1: Login Flow

**Steps:**
1. Open `http://localhost:3000`
2. If not logged in → Auto redirect to `/login`
3. Enter credentials:
   - Email: `admin@example.com`
   - Password: `Admin@123`
4. Click "Sign In"

**Expected:**
- ✅ Loading spinner shows
- ✅ Login successful
- ✅ Redirect to `/dashboard`
- ✅ Navbar shows user name and role
- ✅ Token saved in localStorage

**Verify localStorage:**
```javascript
// Browser Console (F12)
localStorage.getItem('adminpanel_token')
// Should show: "eyJhbGciOi..."

localStorage.getItem('adminpanel_user')
// Should show: {"id":1,"name":"Admin User",...}
```

---

### 🧪 Test Scenario 2: Protected Routes

**Test 1: Access dashboard without login**
```
1. Clear localStorage (browser console):
   localStorage.clear()

2. Navigate to: http://localhost:3000/dashboard

Expected: Auto redirect to /login ✅
```

**Test 2: Access dashboard with login**
```
1. Login with credentials
2. Navigate to: /dashboard

Expected: Dashboard loads ✅
```

---

### 🧪 Test Scenario 3: Axios Interceptor (Auto Token)

**Steps:**
1. Login successfully
2. Open browser DevTools → Network tab
3. Navigate to Users page (or any API call page)
4. Check API request headers

**Expected Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

✅ Token automatically attached!
```

**Manual Test:**
```javascript
// Browser Console (after login)
import api from './services/api';

api.get('/api/users')
  .then(res => console.log(res.data))
  .catch(err => console.error(err))

// Token auto-attached! No manual header needed! ✅
```

---

### 🧪 Test Scenario 4: API Call with Users Page

**Update Users page to use new API instance:**

**File:** `src/pages/Users.js`

```javascript
// Replace axios import with api
import api from '../services/api';

// In fetchUsers function
const fetchUsers = async () => {
  setLoading(true);
  try {
    const response = await api.get('/api/users');
    
    if (response.data.success) {
      setUsers(response.data.data);
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    setError('Failed to load users');
  } finally {
    setLoading(false);
  }
};
```

**Test:**
1. Login
2. Navigate to `/users`
3. Users list loads from backend ✅
4. Check Network tab → Authorization header present ✅

---

### 🧪 Test Scenario 5: Logout Functionality

**Steps:**
1. Login successfully
2. Click profile icon (top right)
3. Click "Logout"

**Expected:**
- ✅ localStorage cleared (token + user removed)
- ✅ Redirect to `/login`
- ✅ Try accessing `/dashboard` → Redirect to `/login`

**Verify:**
```javascript
// Browser Console
localStorage.getItem('adminpanel_token')
// Should return: null ✅
```

---

### 🧪 Test Scenario 6: Token Expiry (Manual Test)

**Steps:**

1. **Backend:** Change token expiry to 1 minute
   - Open `appsettings.json`
   - Change: `"ExpiryMinutes": 1`
   - Restart backend

2. **Frontend:** Login and get token

3. **Wait 1+ minutes**

4. **Try to access protected route or make API call**

**Expected:**
- ✅ Token expired detected
- ✅ Auto logout
- ✅ Redirect to `/login`
- ✅ localStorage cleared

**Reset:** Change `ExpiryMinutes` back to `60`

---

### 🧪 Test Scenario 7: Invalid Token

**Steps:**
1. Login successfully
2. Open browser console
3. Modify token manually:
```javascript
localStorage.setItem('adminpanel_token', 'invalid_token_xyz')
```
4. Refresh page or make API call

**Expected:**
- ✅ Backend returns 401 Unauthorized
- ✅ Response interceptor catches it
- ✅ Auto logout + redirect to login
- ✅ localStorage cleared

---

### 🧪 Test Scenario 8: Role-Based Access

**Admin-Only Route:**

1. **Create admin-only page** (already in routes)

2. **Login as regular user:**
   - Email: `regular@example.com`
   - Password: `User@123`

3. **Navigate to:** `/admin/settings`

**Expected:**
- ✅ Access Denied page shows
- ✅ Message: "Required role: admin, Your role: user"
- ✅ "Back to Dashboard" button works

4. **Login as admin:**
   - Email: `admin@example.com`
   - Password: `Admin@123`

5. **Navigate to:** `/admin/settings`

**Expected:**
- ✅ Page loads successfully (admin has access)

---

## ✅ Summary & Checklist

### Aaj Kya Kiya? 🎯

1. **Token Storage & Management** ✅
   - auth.js utility (save, get, remove token/user)
   - Token decoding (read claims)
   - Token expiry checking

2. **Auth Context (React Context API)** ✅
   - AuthProvider component (global state)
   - useAuth hook (easy access)
   - Login/Logout functions
   - Auto authentication check on app load

3. **Login Page (MUI)** ✅
   - Beautiful login UI
   - Form validation
   - Password visibility toggle
   - Loading state
   - Error handling

4. **Axios Interceptor** ✅
   - Request interceptor (auto token attach)
   - Response interceptor (401/403 handling)
   - Centralized API instance
   - Token expiry detection

5. **Protected Routes** ✅
   - PrivateRoute component (authentication check)
   - RoleBasedRoute component (authorization check)
   - Auto redirect to login
   - Access Denied page

6. **Token Expiry & Auto Logout** ✅
   - Expiry checking every 60 seconds
   - Auto logout on expiry
   - Navbar with logout button
   - User info display

7. **Complete Testing** ✅
   - Login flow
   - Protected routes
   - Axios interceptor
   - API calls with auto token
   - Logout functionality
   - Token expiry
   - Invalid token handling
   - Role-based access

---

### Folder Structure (Final) 📁

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.js             ← UPDATED (Logout button)
│   │   ├── PrivateRoute.js       ← NEW (Protected routes)
│   │   └── RoleBasedRoute.js     ← NEW (Role-based)
│   ├── contexts/
│   │   └── AuthContext.js        ← NEW (Global auth state)
│   ├── pages/
│   │   ├── Login.js              ← NEW (Login UI)
│   │   ├── Dashboard.js          (Existing)
│   │   └── Users.js              ← UPDATED (Use api instance)
│   ├── routes/
│   │   └── AppRoutes.js          ← NEW (Route configuration)
│   ├── services/
│   │   └── api.js                ← NEW (Axios instance & interceptors)
│   ├── utils/
│   │   └── auth.js               ← NEW (Token utilities)
│   ├── App.js                    ← UPDATED (AuthProvider wrap)
│   └── .env                      ← UPDATED (API_URL)
```

---

## 🎓 Key Concepts Learned

### 1. localStorage

**Purpose:** Browser's permanent storage for token & user info

**Operations:**
```javascript
localStorage.setItem(key, value)   // Save
localStorage.getItem(key)          // Get
localStorage.removeItem(key)       // Delete
localStorage.clear()               // Clear all
```

---

### 2. React Context API

**Purpose:** Global state management (avoid props drilling)

**Pattern:**
```javascript
1. Create Context: createContext()
2. Create Provider: <AuthContext.Provider>
3. Use Context: useContext(AuthContext)
4. Custom Hook: useAuth()
```

---

### 3. Axios Interceptors

**Purpose:** Centralized request/response handling

**Types:**
```javascript
Request Interceptor: Before sending (add token)
Response Interceptor: After receiving (handle errors)
```

---

### 4. Protected Routes

**Purpose:** Restrict access to authenticated users only

**Pattern:**
```javascript
<PrivateRoute>
  <Dashboard />
</PrivateRoute>

// Checks: isAuthenticated?
// Yes → Render Dashboard
// No → Navigate to /login
```

---

## 🚀 Tomorrow's Preview: Day 7

**Topics:**
- Week 5 Complete Review
- End-to-end authentication testing
- Security best practices
- Performance optimization
- Production checklist
- Week 6 preview (Deployment)

**What You'll Do:**
- Review all Week 5 concepts (Days 1-6)
- Fix any pending issues
- Optimize authentication flow
- Prepare for production deployment

---

## 💻 Practice Tasks

### ⭐ Task 1: Remember Me Feature (Easy)

**Goal:** "Remember Me" checkbox on login page

**Steps:**
1. Login page mein checkbox add karo
2. If checked → Token never expires (or longer expiry)
3. If unchecked → Normal expiry (1 hour)

---

### ⭐⭐ Task 2: Refresh Token Implementation (Medium)

**Goal:** Auto token refresh before expiry

**Steps:**
1. Backend: Refresh token endpoint banao
2. Frontend: Token expiry 5 min before automatically refresh karo
3. Silent refresh (user ko pata nahi chalega)

---

### ⭐⭐⭐ Task 3: Profile Page with Edit (Hard)

**Goal:** User apni profile edit kar sake

**Steps:**
1. Profile page banao (MUI form)
2. Pre-filled with current user data
3. Update button → API call to update
4. After update → updateUser() call karo (AuthContext)
5. Navbar mein updated name instantly show

---

## 🎉 Congratulations!

**Day 6 Complete!** 🎊

Aaj aapne **complete frontend authentication system** implement kar liya!

**What You Achieved:**
- ✅ Login page with MUI (beautiful UI)
- ✅ Token storage (localStorage)
- ✅ Axios interceptors (automatic token attachment)
- ✅ Auth Context (global authentication state)
- ✅ Protected routes (authentication + authorization)
- ✅ Auto logout on token expiry
- ✅ Complete error handling (401, 403)
- ✅ Role-based access control

**Full Stack Authentication:** Backend (Days 2-5) + Frontend (Day 6) = **100% Complete!** 🔐✨

**Week 5 Progress:** 6/7 days done! (86% complete)

**Tomorrow:** Week 5 Review, best practices, production checklist! 🚀

**Your project is now enterprise-ready with complete JWT authentication!** 💪🎉

---
