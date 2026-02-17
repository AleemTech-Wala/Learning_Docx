# 📅 Week 2 - Day 6: Project Implementation - Complete Admin Panel

## 🎯 Today's Goal
**Aaj hum sab kuch jo Week 2 mein seekha hai use combine karke ek complete admin panel banayenge!**

**Today's Focus:**
- ✅ Convert Week 1 Login page to MUI
- ✅ Build complete Admin Dashboard layout
- ✅ Professional Sidebar with navigation
- ✅ Top AppBar with user menu
- ✅ Routing setup (Login vs Dashboard)
- ✅ Authentication flow (frontend)

---

## 📚 Session Breakdown (4 Hours)

| Time | Topic | Duration |
|------|-------|----------|
| **Hour 1** | Project Setup & MUI Login Page | 60 min |
| **Hour 2** | Admin Layout Components | 60 min |
| **Hour 3** | Sidebar & AppBar Integration | 60 min |
| **Hour 4** | Routing & Authentication Flow | 60 min |

---

## 🏗️ Part 1: Project Setup & MUI Installation (30 minutes)

### 📁 Complete Project Structure

```
admin-panel/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AdminLayout.jsx       (Main layout wrapper)
│   │   │   ├── Sidebar.jsx           (Navigation sidebar)
│   │   │   ├── TopBar.jsx            (Top navigation bar)
│   │   │   └── Footer.jsx            (Optional footer)
│   │   ├── auth/
│   │   │   ├── LoginPage.jsx         (MUI Login page)
│   │   │   └── ProtectedRoute.jsx    (Route protection)
│   │   └── common/
│   │       ├── Loading.jsx           (Loading spinner)
│   │       └── PageHeader.jsx        (Reusable page header)
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Users.jsx
│   │   ├── Products.jsx
│   │   ├── Orders.jsx
│   │   └── Settings.jsx
│   ├── context/
│   │   └── AuthContext.jsx           (Authentication state)
│   ├── data/
│   │   └── usersData.js
│   ├── utils/
│   │   └── constants.js
│   ├── App.jsx
│   ├── main.jsx
│   └── theme.js
├── package.json
└── README.md
```

---

### Step 1: Verify MUI Installation

Check if MUI is already installed:

```bash
# Check package.json
npm list @mui/material

# If not installed, install MUI
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install react-router-dom
```

---

### Step 2: Setup Theme (if not done yet)

**File:** `src/theme.js`

```javascript
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;
```

---

## 🔐 Part 2: MUI Login Page (30 minutes)

### 📖 Converting Week 1 Login to MUI

**Simple Urdu/English:**
Week 1 mein humne simple HTML/CSS se login page banaya tha. Ab hum usko MUI components mein convert karenge - zyada professional aur responsive hoga.

**What we'll use:**
- ✅ MUI TextField (email, password inputs)
- ✅ MUI Button (login button)
- ✅ MUI Card (login form container)
- ✅ MUI Typography (headings, text)
- ✅ MUI IconButton (password visibility toggle)
- ✅ MUI Checkbox (remember me)

---

### Step 3: Create MUI Login Page

**File:** `src/components/auth/LoginPage.jsx`

```jsx
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Link,
  Divider,
  Alert,
  Container
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Login as LoginIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  
  const navigate = useNavigate();

  // State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Handlers
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rememberMe' ? checked : value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    if (loginError) {
      setLoginError('');
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setLoginError('');

    // Simulate API call (2 seconds delay)
    setTimeout(() => {
      // Check credentials (Demo purposes)
      if (formData.email === 'admin@admin.com' && formData.password === 'admin123') {
        // Success - Save to localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', formData.email);
        
        // Navigate to dashboard
        navigate('/');
      } else {
        // Error
        setLoginError('Invalid email or password. Try: admin@admin.com / admin123');
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={8}
          sx={{
            borderRadius: 3,
            overflow: 'visible',
          }}
        >
          <CardContent sx={{ padding: 4 }}>
            
            {/* Logo/Brand */}
            <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  backgroundColor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  boxShadow: 3
                }}
              >
                <LoginIcon sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Welcome Back
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Login to your admin account
              </Typography>
            </Box>

            {/* Error Alert */}
            {loginError && (
              <Alert severity="error" sx={{ marginBottom: 2 }}>
                {loginError}
              </Alert>
            )}

            {/* Login Form */}
            <Box component="form" onSubmit={handleSubmit} noValidate>
              
              {/* Email Field */}
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
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
                error={Boolean(errors.password)}
                helperText={errors.password}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                autoComplete="current-password"
              />

              {/* Remember Me & Forgot Password */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 1,
                  marginBottom: 2
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
                <Link href="#" underline="hover" variant="body2">
                  Forgot password?
                </Link>
              </Box>

              {/* Login Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  marginTop: 2,
                  marginBottom: 2,
                  height: 48,
                  fontSize: 16
                }}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>

              {/* Divider */}
              <Divider sx={{ marginY: 2 }}>OR</Divider>

              {/* Demo Credentials */}
              <Box
                sx={{
                  padding: 2,
                  backgroundColor: 'info.light',
                  borderRadius: 2,
                  textAlign: 'center'
                }}
              >
                <Typography variant="body2" fontWeight="bold" gutterBottom>
                  Demo Credentials:
                </Typography>
                <Typography variant="body2">
                  Email: admin@admin.com
                </Typography>
                <Typography variant="body2">
                  Password: admin123
                </Typography>
              </Box>

              {/* Sign Up Link */}
              <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Link href="#" underline="hover">
                    Sign up
                  </Link>
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Footer */}
        <Box sx={{ textAlign: 'center', marginTop: 3 }}>
          <Typography variant="body2" sx={{ color: 'white' }}>
            © 2024 Admin Panel. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default LoginPage;
```

---

## 🎨 Part 3: Admin Layout Components (60 minutes)

### Step 4: Create Sidebar Component

**File:** `src/components/layout/Sidebar.jsx`

```jsx
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  Divider,
  Avatar,
  Chip
} from '@mui/material';
import {
  Dashboard,
  People,
  Inventory,
  ShoppingCart,
  Assessment,
  Settings,
  Notifications
} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const drawerWidth = 260;

function Sidebar({ open, onClose, isMobile }) {
  
  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/' },
    { text: 'Users', icon: <People />, path: '/users' },
    { text: 'Products', icon: <Inventory />, path: '/products' },
    { text: 'Orders', icon: <ShoppingCart />, path: '/orders' },
    { text: 'Reports', icon: <Assessment />, path: '/reports' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* Logo Section */}
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingY: 2,
        }}
      >
        <Avatar
          sx={{
            bgcolor: 'primary.main',
            width: 48,
            height: 48,
            marginRight: 1.5
          }}
        >
          A
        </Avatar>
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Admin Panel
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Management System
          </Typography>
        </Box>
      </Toolbar>

      <Divider />

      {/* Navigation Menu */}
      <List sx={{ flexGrow: 1, padding: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ marginBottom: 0.5 }}>
            <ListItemButton
              component={NavLink}
              to={item.path}
              onClick={isMobile ? onClose : undefined}
              sx={{
                borderRadius: 2,
                '&.active': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  }
                },
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Notifications Section */}
      <Box sx={{ padding: 2 }}>
        <ListItemButton
          sx={{
            borderRadius: 2,
            backgroundColor: 'warning.light',
            '&:hover': {
              backgroundColor: 'warning.main',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <Notifications />
          </ListItemIcon>
          <ListItemText 
            primary="Notifications" 
            secondary={<Chip label="5 New" size="small" color="error" sx={{ marginTop: 0.5 }} />}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer (Temporary) */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        /* Desktop Drawer (Permanent) */
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}

export default Sidebar;
```

---

### Step 5: Create Top AppBar Component

**File:** `src/components/layout/TopBar.jsx`

```jsx
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Badge,
  ListItemIcon,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search,
  Notifications,
  AccountCircle,
  Settings,
  Logout,
  Person
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 260;

function TopBar({ onMenuClick, isMobile }) {
  
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchor, setNotifAnchor] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotifOpen = (event) => {
    setNotifAnchor(event.currentTarget);
  };

  const handleNotifClose = () => {
    setNotifAnchor(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  const userEmail = localStorage.getItem('userEmail') || 'admin@admin.com';

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: 'white',
        color: 'text.primary',
        boxShadow: 1,
      }}
    >
      <Toolbar>
        
        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Search Bar (Desktop) */}
        {!isMobile && (
          <Box
            sx={{
              position: 'relative',
              borderRadius: 1,
              backgroundColor: 'grey.100',
              '&:hover': { backgroundColor: 'grey.200' },
              marginRight: 2,
              width: '100%',
              maxWidth: 400,
            }}
          >
            <Box
              sx={{
                padding: '0 16px',
                height: '100%',
                position: 'absolute',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Search />
            </Box>
            <InputBase
              placeholder="Search..."
              sx={{
                color: 'inherit',
                width: '100%',
                '& input': {
                  padding: '8px 8px 8px 0',
                  paddingLeft: `calc(1em + 32px)`,
                },
              }}
            />
          </Box>
        )}

        {/* Mobile: Page Title */}
        {isMobile && (
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
        )}

        <Box sx={{ flexGrow: 1 }} />

        {/* Right Side Icons */}
        
        {/* Search Icon (Mobile) */}
        {isMobile && (
          <IconButton>
            <Search />
          </IconButton>
        )}

        {/* Notifications */}
        <IconButton onClick={handleNotifOpen}>
          <Badge badgeContent={5} color="error">
            <Notifications />
          </Badge>
        </IconButton>

        {/* User Menu */}
        <IconButton onClick={handleMenuOpen} sx={{ marginLeft: 1 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
            A
          </Avatar>
        </IconButton>

        {/* User Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ padding: 2, minWidth: 200 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>A</Avatar>
              <Box>
                <Typography variant="subtitle2" fontWeight="bold">
                  Admin User
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {userEmail}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Divider />
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <AccountCircle fontSize="small" />
            </ListItemIcon>
            My Account
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notifAnchor}
          open={Boolean(notifAnchor)}
          onClose={handleNotifClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ padding: 2, minWidth: 300 }}>
            <Typography variant="h6">Notifications</Typography>
          </Box>
          <Divider />
          <MenuItem onClick={handleNotifClose}>
            <Typography variant="body2">
              📬 New message from John Doe
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleNotifClose}>
            <Typography variant="body2">
              ✅ Order #1234 completed
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleNotifClose}>
            <Typography variant="body2">
              👤 New user registration
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleNotifClose}>
            <Typography variant="body2">
              💰 Payment received $599
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleNotifClose}>
            <Typography variant="body2" color="primary" align="center">
              View All Notifications
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
```

---

### Step 6: Create Main Admin Layout

**File:** `src/components/layout/AdminLayout.jsx`

```jsx
import React, { useState } from 'react';
import { Box, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

function AdminLayout({ children }) {
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      
      {/* Sidebar */}
      <Sidebar 
        open={mobileOpen} 
        onClose={handleDrawerToggle}
        isMobile={isMobile}
      />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - 260px)` },
          backgroundColor: '#fafafa',
          minHeight: '100vh',
        }}
      >
        {/* Top AppBar */}
        <TopBar 
          onMenuClick={handleDrawerToggle}
          isMobile={isMobile}
        />

        {/* Toolbar Spacer */}
        <Toolbar />

        {/* Page Content */}
        <Box
          sx={{
            padding: {
              xs: 2,
              sm: 3,
              md: 4
            }
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default AdminLayout;
```

---

## 🛡️ Part 4: Authentication & Routing (60 minutes)

### Step 7: Create Protected Route Component

**File:** `src/components/auth/ProtectedRoute.jsx`

```jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
```

---

### Step 8: Update Dashboard Page

**File:** `src/pages/Dashboard.jsx`

```jsx
import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  LinearProgress,
  Button,
  Paper
} from '@mui/material';
import {
  People,
  ShoppingCart,
  AttachMoney,
  TrendingUp,
  TrendingDown,
  ArrowForward
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Users',
      value: '2,543',
      change: '+12.5%',
      isPositive: true,
      icon: <People sx={{ fontSize: 40 }} />,
      color: 'primary.main',
      bgColor: 'primary.light',
      route: '/users'
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+23.1%',
      isPositive: true,
      icon: <ShoppingCart sx={{ fontSize: 40 }} />,
      color: 'success.main',
      bgColor: 'success.light',
      route: '/orders'
    },
    {
      title: 'Revenue',
      value: 'Rs. 45,678',
      change: '+8.2%',
      isPositive: true,
      icon: <AttachMoney sx={{ fontSize: 40 }} />,
      color: 'warning.main',
      bgColor: 'warning.light',
      route: '/orders'
    },
    {
      title: 'Growth Rate',
      value: '45.2%',
      change: '-2.4%',
      isPositive: false,
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      color: 'info.main',
      bgColor: 'info.light',
      route: '/reports'
    },
  ];

  const salesByCategory = [
    { category: 'Electronics', sales: 85, color: 'primary' },
    { category: 'Clothing', sales: 65, color: 'success' },
    { category: 'Food', sales: 45, color: 'warning' },
    { category: 'Books', sales: 30, color: 'info' },
  ];

  return (
    <Box>
      
      {/* Page Header */}
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard Overview
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome back! Here's what's happening today.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ marginBottom: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                }
              }}
              onClick={() => navigate(stat.route)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1, gap: 0.5 }}>
                      {stat.isPositive ? (
                        <TrendingUp fontSize="small" color="success" />
                      ) : (
                        <TrendingDown fontSize="small" color="error" />
                      )}
                      <Typography
                        variant="body2"
                        sx={{ color: stat.isPositive ? 'success.main' : 'error.main' }}
                      >
                        {stat.change}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        vs last month
                      </Typography>
                    </Box>
                  </Box>
                  <Avatar
                    sx={{
                      bgcolor: stat.bgColor,
                      color: stat.color,
                      width: 56,
                      height: 56,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Sales by Category */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                <Typography variant="h6">
                  Sales by Category
                </Typography>
                <Button size="small" endIcon={<ArrowForward />}>
                  View All
                </Button>
              </Box>

              {salesByCategory.map((item, index) => (
                <Box key={index} sx={{ marginBottom: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                    <Typography variant="body2" fontWeight="medium">
                      {item.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.sales}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={item.sales}
                    color={item.color}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, marginTop: 2 }}>
                <Button variant="contained" fullWidth onClick={() => navigate('/users')}>
                  Manage Users
                </Button>
                <Button variant="outlined" fullWidth onClick={() => navigate('/products')}>
                  View Products
                </Button>
                <Button variant="outlined" fullWidth onClick={() => navigate('/orders')}>
                  View Orders
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
```

---

### Step 9: Update App.jsx with Complete Routing

**File:** `src/App.jsx`

```jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Settings from './pages/Settings';

function App() {
  
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <Routes>
      
      {/* Public Route: Login */}
      <Route 
        path="/login" 
        element={
          isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />
        } 
      />

      {/* Protected Routes: Admin Dashboard */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/products" element={<Products />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
```

---

### Step 10: Update main.jsx

**File:** `src/main.jsx`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';
import theme from './theme.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
```

---

## 🧪 Testing Your Application

### Step 11: Run the Application

```bash
# Make sure you're in admin-panel directory
cd admin-panel

# Start development server
npm run dev
```

**Test Flow:**

1. **Visit:** http://localhost:5173
2. **Should redirect to:** http://localhost:5173/login
3. **Login with:**
   - Email: admin@admin.com
   - Password: admin123
4. **Should redirect to:** Dashboard
5. **Test:**
   - Sidebar navigation (click different menu items)
   - Top bar user menu (click avatar)
   - Notifications menu
   - Stats cards (click to navigate)
   - Logout (should redirect to login)
   - Mobile responsive (resize browser)

---

## 📁 Final File Structure

```
admin-panel/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AdminLayout.jsx      ✅ Created
│   │   │   ├── Sidebar.jsx          ✅ Created
│   │   │   └── TopBar.jsx           ✅ Created
│   │   └── auth/
│   │       ├── LoginPage.jsx        ✅ Created (MUI)
│   │       └── ProtectedRoute.jsx   ✅ Created
│   ├── pages/
│   │   ├── Dashboard.jsx            ✅ Updated
│   │   ├── Users.jsx                (From Day 4)
│   │   ├── Products.jsx             (From Day 4)
│   │   ├── Orders.jsx               (From Day 4)
│   │   └── Settings.jsx             (From Day 4)
│   ├── App.jsx                      ✅ Updated
│   ├── main.jsx                     ✅ Updated
│   └── theme.js                     ✅ Created
└── package.json
```

---

## 🎯 Practice Tasks

### Task 1: Add Loading Spinner (⭐⭐)

**Goal:** Show loading spinner during login.

**Hint:**
```jsx
import { CircularProgress } from '@mui/material';

<Button disabled={loading}>
  {loading ? <CircularProgress size={24} /> : 'Login'}
</Button>
```

---

### Task 2: Add Remember Me Functionality (⭐⭐⭐)

**Goal:** Save email to localStorage if "Remember Me" is checked.

**Hint:**
```jsx
if (formData.rememberMe) {
  localStorage.setItem('rememberedEmail', formData.email);
}
```

---

### Task 3: Add User Profile Page (⭐⭐⭐⭐)

**Goal:** Create a profile page showing user details.

**Requirements:**
- Avatar upload placeholder
- Name, email, phone fields
- Save button

---

### Task 4: Add Sidebar Collapse (⭐⭐⭐⭐)

**Goal:** Add button to collapse sidebar (show only icons).

**Hint:**
```jsx
const [collapsed, setCollapsed] = useState(false);
// Change drawer width based on collapsed state
```

---

### Task 5: Add Dark Mode Toggle (⭐⭐⭐⭐⭐)

**Goal:** Add switch to toggle between light/dark theme.

**Hint:**
```jsx
const [mode, setMode] = useState('light');

const theme = createTheme({
  palette: {
    mode: mode, // 'light' or 'dark'
  },
});
```

---

## 📝 Day 6 Summary

### ✅ Today's Achievements

**1. MUI Login Page:**
- ✅ Converted Week 1 login to professional MUI design
- ✅ TextField with icons (email, password)
- ✅ Password visibility toggle
- ✅ Form validation
- ✅ Error handling with alerts
- ✅ Loading state
- ✅ Remember me checkbox
- ✅ Forgot password link

**2. Admin Layout:**
- ✅ Complete AdminLayout wrapper component
- ✅ Professional Sidebar with navigation
- ✅ Top AppBar with search, notifications, user menu
- ✅ Responsive design (mobile + desktop)
- ✅ Active link highlighting

**3. Authentication Flow:**
- ✅ Protected routes
- ✅ Login → Dashboard flow
- ✅ Logout functionality
- ✅ Redirect logic
- ✅ localStorage for auth state

**4. Complete Integration:**
- ✅ All components working together
- ✅ Routing between pages
- ✅ Professional UI/UX
- ✅ Mobile responsive

---

## 📊 Project Progress

```
✅ Week 1 Complete (React Foundations)
✅ Week 2 - Day 1 (MUI Installation & Theme)
✅ Week 2 - Day 2 (Button, TextField, Grid)
✅ Week 2 - Day 3 (Card, Table, AppBar)
✅ Week 2 - Day 4 (React Router & Drawer)
✅ Week 2 - Day 5 (Layout Patterns & Responsive)
✅ Week 2 - Day 6 (Project Implementation)

Complete Admin Panel Features:
├── ✅ Professional MUI Login Page
├── ✅ Protected Routes
├── ✅ Admin Dashboard Layout
├── ✅ Sidebar Navigation
├── ✅ Top AppBar with menus
├── ✅ Authentication Flow
├── ✅ Responsive Design
├── ✅ Multiple Pages (Dashboard, Users, Products, Orders, Settings)
└── ✅ Professional UI/UX

Frontend: 95% Complete
Ready for: Backend Integration
```

---

## 🔜 Tomorrow's Preview (Day 7)

**Week 2 - Day 7: Project Implementation (Part 2) & Week Review**

Topics:
1. **CRUD Operations UI (Add/Edit/Delete)**
2. **Forms with Validation**
3. **Modals & Dialogs**
4. **Data Management**
5. **Week 2 Review & Polish**

**What We'll Build:**
- ✨ Add User Modal with form
- ✨ Edit User functionality
- ✨ Delete confirmation dialog
- ✨ Complete CRUD UI
- ✨ Polish & refinements

---

## 🏆 Day 6 Checklist

**Installation:**
- [ ] MUI installed
- [ ] React Router installed
- [ ] All dependencies working

**Files Created:**
- [ ] LoginPage.jsx (MUI version)
- [ ] AdminLayout.jsx
- [ ] Sidebar.jsx
- [ ] TopBar.jsx
- [ ] ProtectedRoute.jsx
- [ ] Updated App.jsx
- [ ] Updated main.jsx
- [ ] theme.js

**Understanding:**
- [ ] I understand MUI form components
- [ ] I understand layout composition
- [ ] I understand protected routes
- [ ] I understand authentication flow
- [ ] I can build responsive layouts

**Testing:**
- [ ] Login page loads at /login
- [ ] Can login with demo credentials
- [ ] Redirects to dashboard after login
- [ ] Sidebar navigation works
- [ ] Top bar menus work
- [ ] Can logout
- [ ] Protected routes work (try accessing / without login)
- [ ] Mobile responsive
- [ ] No console errors

---

## 💡 Pro Tips

### Tip 1: Form Validation
```jsx
// ✅ Good - Validate on submit
const handleSubmit = (e) => {
  e.preventDefault();
  if (validateForm()) {
    // Submit form
  }
};
```

### Tip 2: Error Handling
```jsx
// ✅ Good - Show user-friendly errors
<TextField
  error={Boolean(errors.email)}
  helperText={errors.email}
/>
```

### Tip 3: Authentication
```jsx
// ✅ Good - Check auth state
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

// For production, use proper auth tokens (JWT)
```

### Tip 4: Protected Routes
```jsx
// ✅ Good - Wrap protected content
<ProtectedRoute>
  <AdminLayout>
    <Dashboard />
  </AdminLayout>
</ProtectedRoute>
```

---

## 🐛 Common Problems & Solutions

### Problem 1: Login not working
**Solution:**
- Check console for errors
- Verify localStorage is being set
- Check credentials match exactly

### Problem 2: Routes not working
**Solution:**
- Ensure BrowserRouter wraps App in main.jsx
- Check route paths are correct
- Verify ProtectedRoute logic

### Problem 3: Sidebar not showing
**Solution:**
- Check if AdminLayout is wrapping routes
- Verify drawer width calculations
- Check CSS conflicts

### Problem 4: Mobile drawer not closing
**Solution:**
- Ensure onClose prop is passed
- Check handleDrawerToggle is called on nav clicks

---

## 📚 Interview Questions

**Q1: What is the benefit of Protected Routes?**
**A:** Prevent unauthorized users from accessing certain pages. Only logged-in users can access protected content.

**Q2: Why use localStorage for auth?**
**A:** Simple client-side storage for auth state. For production, use httpOnly cookies or secure tokens.

**Q3: What is AdminLayout component?**
**A:** Wrapper component that provides consistent layout (sidebar + topbar) for all admin pages.

**Q4: How to make drawer responsive?**
**A:** Use temporary drawer (modal) for mobile, permanent drawer for desktop with useMediaQuery.

**Q5: What is the purpose of theme.js?**
**A:** Centralized theme configuration for consistent colors, typography, and component styles across the app.

---

**🎊 Day 6 Complete! Admin Panel is now fully functional! Tomorrow we'll add CRUD operations! 🚀**

**Happy Coding! 💻✨**
