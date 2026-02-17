# 📅 Week 2 - Day 4: React Router & MUI Drawer (Sidebar Navigation)

## 🎯 Today's Goal
**Aaj hum multi-page application banayenge with professional sidebar navigation!**

**Today's Focus:**
- ✅ React Router v6 installation & setup
- ✅ Multiple pages with routing
- ✅ Navigation between pages
- ✅ MUI Drawer (Sidebar) component
- ✅ Complete Admin Panel with sidebar
- ✅ Active link highlighting

---

## 📚 Session Breakdown (4 Hours)

| Time | Topic | Duration |
|------|-------|----------|
| **Hour 1** | React Router Basics & Setup | 60 min |
| **Hour 2** | Creating Multiple Pages & Navigation | 60 min |
| **Hour 3** | MUI Drawer Component Deep Dive | 60 min |
| **Hour 4** | Complete Sidebar Integration | 60 min |

---

## 🛣️ Part 1: React Router Basics (60 minutes)

### 📖 What is React Router?

**Simple Urdu/English:**
React Router ek library hai jo single-page application ko multi-page jaisa feel deta hai. Jaise Facebook pe alag pages hain (Home, Profile, Messages) lekin page refresh nahi hota - yeh React Router ki wajah se hota hai.

**Without React Router:**
- Sirf ek page (/)
- Poora page reload hota hai

**With React Router:**
- Multiple pages (/dashboard, /users, /products)
- Page reload nahi hota (fast!)
- Back/Forward buttons kaam karte hain
- URL se direct page access

**Real-World Examples:**
- Netflix: /browse, /watch, /account
- Gmail: /inbox, /sent, /drafts
- Amazon: /products, /cart, /orders

---

### Step 1: Install React Router

Open your terminal in admin-panel folder:

```bash
cd admin-panel
npm install react-router-dom
```

**What gets installed:**
- react-router-dom v6 (latest version)
- All routing components (BrowserRouter, Routes, Route, Link, etc.)

---

### 📦 React Router v6 Main Components

```jsx
// 1. BrowserRouter - Wrap your entire app
<BrowserRouter>
  <App />
</BrowserRouter>

// 2. Routes - Container for all routes
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>

// 3. Route - Define individual routes
<Route path="/users" element={<Users />} />

// 4. Link - Navigate without page reload
<Link to="/dashboard">Go to Dashboard</Link>

// 5. NavLink - Link with active state
<NavLink to="/dashboard">Dashboard</NavLink>

// 6. useNavigate - Programmatic navigation
const navigate = useNavigate();
navigate('/dashboard');
```

---

### Step 2: Create Basic Routing Setup

**File:** `src/main.jsx` (Update)

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

**Explanation:**
- `BrowserRouter` wrap kar diya - ab routing kaam karegi
- Sab se top level pe lagana hai
- App ko Routes define karenge

---

### Step 3: Create Basic Pages

**Folder Structure:**
```
src/
├── pages/
│   ├── Dashboard.jsx      (Home page)
│   ├── Users.jsx          (Users management)
│   ├── Products.jsx       (Products page)
│   ├── Orders.jsx         (Orders page)
│   ├── Settings.jsx       (Settings page)
│   └── NotFound.jsx       (404 page)
```

---

**File:** `src/pages/Dashboard.jsx`

```jsx
import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar } from '@mui/material';
import { People, ShoppingCart, AttachMoney, TrendingUp } from '@mui/icons-material';

function Dashboard() {
  
  const stats = [
    { title: 'Total Users', value: '2,543', icon: <People />, color: 'primary.main' },
    { title: 'Total Orders', value: '1,234', icon: <ShoppingCart />, color: 'success.main' },
    { title: 'Revenue', value: '$45,678', icon: <AttachMoney />, color: 'warning.main' },
    { title: 'Growth', value: '45.2%', icon: <TrendingUp />, color: 'info.main' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Welcome back! Here's your overview.
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" sx={{ marginTop: 1 }}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: stat.color, width: 56, height: 56 }}>
                    {stat.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Dashboard;
```

---

**File:** `src/pages/Users.jsx`

```jsx
import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  IconButton,
  Button,
  Stack
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';

function Users() {
  
  const users = [
    { id: 1, name: 'Ahmed Ali', email: 'ahmed@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Fatima Khan', email: 'fatima@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Hassan Raza', email: 'hassan@example.com', role: 'User', status: 'Inactive' },
    { id: 4, name: 'Ayesha Malik', email: 'ayesha@example.com', role: 'Moderator', status: 'Active' },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Users Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage all users from here.
          </Typography>
        </Box>
        <Button variant="contained">
          Add New User
        </Button>
      </Box>

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: 'grey.100' }}>
                <TableRow>
                  <TableCell><strong>User</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Role</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell align="center"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar>{user.name.charAt(0)}</Avatar>
                        <Typography variant="body2">{user.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip label={user.role} size="small" color="primary" />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={user.status} 
                        size="small" 
                        color={user.status === 'Active' ? 'success' : 'default'} 
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={0.5} justifyContent="center">
                        <IconButton size="small" color="primary">
                          <Visibility fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="info">
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <Delete fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Users;
```

---

**File:** `src/pages/Products.jsx`

```jsx
import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button, Chip } from '@mui/material';

function Products() {
  
  const products = [
    { id: 1, name: 'Laptop', price: 85000, stock: 15, status: 'Available' },
    { id: 2, name: 'Mouse', price: 1200, stock: 50, status: 'Available' },
    { id: 3, name: 'Keyboard', price: 3500, stock: 0, status: 'Out of Stock' },
    { id: 4, name: 'Monitor', price: 25000, stock: 8, status: 'Available' },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Products
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your product inventory.
          </Typography>
        </Box>
        <Button variant="contained">
          Add Product
        </Button>
      </Box>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card>
              <CardMedia
                component="div"
                sx={{
                  height: 140,
                  backgroundColor: 'primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="h5" color="white">
                  {product.name}
                </Typography>
              </CardMedia>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="h5" color="primary" gutterBottom>
                  Rs. {product.price.toLocaleString()}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Stock: {product.stock}
                  </Typography>
                  <Chip 
                    label={product.status} 
                    size="small" 
                    color={product.status === 'Available' ? 'success' : 'error'}
                  />
                </Box>
                <Button variant="outlined" size="small" fullWidth sx={{ marginTop: 2 }}>
                  Edit
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Products;
```

---

**File:** `src/pages/Orders.jsx`

```jsx
import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

function Orders() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        View and manage all orders.
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="body1">
            Orders page content will be added here.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Orders;
```

---

**File:** `src/pages/Settings.jsx`

```jsx
import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

function Settings() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Configure your application settings.
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="body1">
            Settings page content will be added here.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Settings;
```

---

**File:** `src/pages/NotFound.jsx`

```jsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center'
      }}
    >
      <Typography variant="h1" color="primary" fontWeight="bold">
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')}>
        Go to Dashboard
      </Button>
    </Box>
  );
}

export default NotFound;
```

---

### Step 4: Setup Routes in App.jsx

**File:** `src/App.jsx`

```jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/products" element={<Products />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
```

**Explanation:**
- `path="/"` - Root URL pe Dashboard
- `path="/users"` - /users pe Users page
- `path="*"` - Koi bhi unknown route pe 404 page

---

### Step 5: Test Basic Routing

Start your dev server:
```bash
npm run dev
```

**Test URLs:**
- http://localhost:5173/ → Dashboard
- http://localhost:5173/users → Users page
- http://localhost:5173/products → Products page
- http://localhost:5173/orders → Orders page
- http://localhost:5173/settings → Settings page
- http://localhost:5173/anything → 404 page

---

## 🧭 Part 2: Navigation with Link & NavLink (30 minutes)

### 📖 Link vs NavLink

**Link:**
- Simple navigation
- No active state

**NavLink:**
- Navigation with active state
- Automatically adds "active" class
- Better for menus

```jsx
// Basic Link
<Link to="/dashboard">Dashboard</Link>

// NavLink with active styling
<NavLink 
  to="/dashboard"
  style={({ isActive }) => ({
    color: isActive ? 'blue' : 'black'
  })}
>
  Dashboard
</NavLink>
```

---

### Step 6: Create Simple Navigation Bar

**File:** `src/components/layout/SimpleNavBar.jsx`

```jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

function SimpleNavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            component={NavLink}
            to="/"
            sx={{
              color: 'white',
              '&.active': {
                backgroundColor: 'rgba(255,255,255,0.2)'
              }
            }}
          >
            Dashboard
          </Button>
          <Button
            component={NavLink}
            to="/users"
            sx={{
              color: 'white',
              '&.active': {
                backgroundColor: 'rgba(255,255,255,0.2)'
              }
            }}
          >
            Users
          </Button>
          <Button
            component={NavLink}
            to="/products"
            sx={{
              color: 'white',
              '&.active': {
                backgroundColor: 'rgba(255,255,255,0.2)'
              }
            }}
          >
            Products
          </Button>
          <Button
            component={NavLink}
            to="/orders"
            sx={{
              color: 'white',
              '&.active': {
                backgroundColor: 'rgba(255,255,255,0.2)'
              }
            }}
          >
            Orders
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default SimpleNavBar;
```

---

### Step 7: Update App.jsx with Navigation

**File:** `src/App.jsx` (Update)

```jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import SimpleNavBar from './components/layout/SimpleNavBar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Box>
      <SimpleNavBar />
      <Container maxWidth="xl" sx={{ marginTop: 4, marginBottom: 4 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
```

**Now test again - you'll see navigation bar with active highlighting!**

---

## 📂 Part 3: MUI Drawer Component (60 minutes)

### 📖 What is Drawer?

**Simple Urdu/English:**
Drawer ek sliding sidebar hai - jaise mobile mein left side se menu aata hai. Professional websites mein permanent sidebar hoti hai (desktop pe) aur mobile pe hide/show hoti hai.

**Types:**
1. **Permanent Drawer** - Hamesha visible (desktop)
2. **Temporary Drawer** - Click pe open/close (mobile)
3. **Persistent Drawer** - Toggle karke open/close

**Real Examples:**
- Gmail sidebar (Inbox, Sent, Drafts)
- YouTube sidebar (Home, Trending, Subscriptions)
- Facebook sidebar (News Feed, Groups, Pages)

---

### 🎨 Drawer Component Structure

```jsx
<Drawer
  variant="permanent"     // permanent, temporary, persistent
  anchor="left"           // left, right, top, bottom
  open={true}            // true/false
>
  {/* Drawer content */}
  <List>
    <ListItem>Menu Item</ListItem>
  </List>
</Drawer>
```

---

### Step 8: Create Sidebar Component

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
  Avatar
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People,
  Inventory,
  ShoppingCart,
  Settings,
  Assessment,
  Notifications
} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const drawerWidth = 260;

function Sidebar() {
  
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Users', icon: <People />, path: '/users' },
    { text: 'Products', icon: <Inventory />, path: '/products' },
    { text: 'Orders', icon: <ShoppingCart />, path: '/orders' },
    { text: 'Reports', icon: <Assessment />, path: '/reports' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#f5f5f5',
          borderRight: '1px solid #e0e0e0'
        },
      }}
    >
      {/* Logo/Brand Section */}
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>A</Avatar>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Admin
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Panel
            </Typography>
          </Box>
        </Box>
      </Toolbar>

      <Divider />

      {/* Navigation Menu */}
      <List sx={{ padding: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ marginBottom: 1 }}>
            <ListItemButton
              component={NavLink}
              to={item.path}
              sx={{
                borderRadius: 2,
                '&.active': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
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

      {/* Bottom Section */}
      <Box sx={{ padding: 2, marginTop: 'auto' }}>
        <ListItemButton
          sx={{
            borderRadius: 2,
            backgroundColor: 'warning.light',
            '&:hover': {
              backgroundColor: 'warning.main',
            },
          }}
        >
          <ListItemIcon>
            <Notifications />
          </ListItemIcon>
          <ListItemText primary="Notifications" secondary="5 new" />
        </ListItemButton>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
```

---

### Step 9: Create Top AppBar for Sidebar Layout

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
  Badge
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search,
  Notifications,
  AccountCircle,
  Settings,
  Logout
} from '@mui/icons-material';

const drawerWidth = 260;

function TopBar({ onMenuClick }) {
  
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        backgroundColor: 'white',
        color: 'text.primary',
        boxShadow: 1
      }}
    >
      <Toolbar>
        {/* Mobile Menu Button */}
        <IconButton
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Search Bar */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: 1,
            backgroundColor: 'grey.100',
            '&:hover': { backgroundColor: 'grey.200' },
            marginLeft: 0,
            width: { xs: '100%', sm: 'auto' },
            maxWidth: 400,
            flexGrow: { xs: 1, sm: 0 }
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
              '& input': {
                padding: '8px 8px 8px 0',
                paddingLeft: `calc(1em + 32px)`,
                width: '100%',
              },
            }}
          />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Right Side Icons */}
        <IconButton color="inherit">
          <Badge badgeContent={3} color="error">
            <Notifications />
          </Badge>
        </IconButton>

        {/* User Menu */}
        <IconButton onClick={handleMenuOpen} sx={{ ml: 1 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
            A
          </Avatar>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ padding: 2, minWidth: 200 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Admin User
            </Typography>
            <Typography variant="body2" color="text.secondary">
              admin@admin.com
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={handleMenuClose}>
            <AccountCircle sx={{ mr: 1 }} fontSize="small" />
            Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Settings sx={{ mr: 1 }} fontSize="small" />
            Settings
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClose}>
            <Logout sx={{ mr: 1 }} fontSize="small" />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
```

---

### Step 10: Create Main Layout Component

**File:** `src/components/layout/MainLayout.jsx`

```jsx
import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const drawerWidth = 260;

function MainLayout({ children }) {
  
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar open={mobileOpen} onClose={handleDrawerToggle} />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          backgroundColor: '#fafafa'
        }}
      >
        {/* Top AppBar */}
        <TopBar onMenuClick={handleDrawerToggle} />

        {/* Toolbar spacing */}
        <Toolbar />

        {/* Page Content */}
        <Box sx={{ padding: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default MainLayout;
```

---

## 🎯 Part 4: Complete Integration (60 minutes)

### Step 11: Update App.jsx with Layout

**File:** `src/App.jsx` (Final Version)

```jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
```

---

### Step 12: Make Drawer Responsive (Mobile Support)

**File:** `src/components/layout/Sidebar.jsx` (Updated for mobile)

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
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People,
  Inventory,
  ShoppingCart,
  Settings,
  Assessment,
  Notifications
} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const drawerWidth = 260;

function Sidebar({ open, onClose }) {
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Users', icon: <People />, path: '/users' },
    { text: 'Products', icon: <Inventory />, path: '/products' },
    { text: 'Orders', icon: <ShoppingCart />, path: '/orders' },
    { text: 'Reports', icon: <Assessment />, path: '/reports' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  const drawerContent = (
    <>
      {/* Logo/Brand Section */}
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>A</Avatar>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Admin
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Panel
            </Typography>
          </Box>
        </Box>
      </Toolbar>

      <Divider />

      {/* Navigation Menu */}
      <List sx={{ padding: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ marginBottom: 1 }}>
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

      {/* Bottom Section */}
      <Box sx={{ padding: 2, marginTop: 'auto' }}>
        <ListItemButton
          sx={{
            borderRadius: 2,
            backgroundColor: 'warning.light',
            '&:hover': {
              backgroundColor: 'warning.main',
            },
          }}
        >
          <ListItemIcon>
            <Notifications />
          </ListItemIcon>
          <ListItemText primary="Notifications" secondary="5 new" />
        </ListItemButton>
      </Box>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {/* Mobile Drawer (Temporary) */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer (Permanent) */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f5f5f5',
            borderRight: '1px solid #e0e0e0'
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

export default Sidebar;
```

---

### Step 13: Add useNavigate Hook Example

**File:** `src/pages/Dashboard.jsx` (Add Navigation Button)

```jsx
import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar, Button } from '@mui/material';
import { People, ShoppingCart, AttachMoney, TrendingUp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  
  const navigate = useNavigate();

  const stats = [
    { title: 'Total Users', value: '2,543', icon: <People />, color: 'primary.main', path: '/users' },
    { title: 'Total Orders', value: '1,234', icon: <ShoppingCart />, color: 'success.main', path: '/orders' },
    { title: 'Revenue', value: '$45,678', icon: <AttachMoney />, color: 'warning.main', path: '/orders' },
    { title: 'Growth', value: '45.2%', icon: <TrendingUp />, color: 'info.main', path: '/reports' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Welcome back! Here's your overview.
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                '&:hover': { boxShadow: 4 }
              }}
              onClick={() => navigate(stat.path)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" sx={{ marginTop: 1 }}>
                      {stat.value}
                    </Typography>
                    <Button 
                      size="small" 
                      sx={{ marginTop: 1, padding: 0 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(stat.path);
                      }}
                    >
                      View Details →
                    </Button>
                  </Box>
                  <Avatar sx={{ bgcolor: stat.color, width: 56, height: 56 }}>
                    {stat.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Dashboard;
```

---

## 📁 Final Folder Structure

```
admin-panel/
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── Sidebar.jsx         (Drawer navigation)
│   │       ├── TopBar.jsx          (Top AppBar)
│   │       └── MainLayout.jsx      (Complete layout)
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Users.jsx
│   │   ├── Products.jsx
│   │   ├── Orders.jsx
│   │   ├── Settings.jsx
│   │   └── NotFound.jsx
│   ├── data/
│   │   └── usersData.js
│   ├── App.jsx                     (Routes setup)
│   ├── main.jsx                    (BrowserRouter)
│   └── theme.js
├── package.json
└── node_modules/
```

---

## 🧪 Testing Checklist

**Test these features:**

1. **Routing:**
   - [ ] Visit http://localhost:5173/ → Dashboard loads
   - [ ] Click sidebar links → Pages change without reload
   - [ ] Browser back/forward buttons work
   - [ ] Direct URL access works (http://localhost:5173/users)
   - [ ] Invalid URL shows 404 page

2. **Sidebar:**
   - [ ] Sidebar always visible on desktop
   - [ ] Active link highlighted
   - [ ] Hover effects work
   - [ ] Icons display correctly

3. **TopBar:**
   - [ ] Search bar visible
   - [ ] Notification badge shows
   - [ ] User menu opens on click
   - [ ] Menu items clickable

4. **Responsive:**
   - [ ] Sidebar hidden on mobile
   - [ ] Menu button appears on mobile
   - [ ] Temporary drawer opens on mobile
   - [ ] Layout responsive on all screens

5. **Navigation:**
   - [ ] useNavigate works (Dashboard card clicks)
   - [ ] Links work properly
   - [ ] No page reload on navigation

---

## 🎯 Practice Tasks

### Task 1: Add New Page (⭐⭐)

**Goal:** Add a "Reports" page.

**Steps:**
1. Create `src/pages/Reports.jsx`
2. Add route in `App.jsx`
3. Sidebar already has Reports link!

---

### Task 2: Add Nested Routes (⭐⭐⭐)

**Goal:** Create nested routes like `/users/details/:id`

**Hint:**
```jsx
<Route path="/users" element={<Users />}>
  <Route path="details/:id" element={<UserDetails />} />
</Route>
```

---

### Task 3: Collapsible Sidebar (⭐⭐⭐⭐)

**Goal:** Add button to collapse sidebar (show only icons).

**Hint:**
- Add state: `const [collapsed, setCollapsed] = useState(false)`
- Change drawer width when collapsed
- Hide text, show only icons

---

### Task 4: Breadcrumbs Navigation (⭐⭐⭐)

**Goal:** Add breadcrumbs (Home > Users > Details)

**Hint:**
```jsx
import { Breadcrumbs, Link } from '@mui/material';

<Breadcrumbs>
  <Link to="/">Home</Link>
  <Link to="/users">Users</Link>
  <Typography>Details</Typography>
</Breadcrumbs>
```

---

### Task 5: Protected Routes (⭐⭐⭐⭐⭐)

**Goal:** Create protected routes that require login.

**Hint:**
```jsx
function ProtectedRoute({ children }) {
  const isLoggedIn = true; // Check auth
  return isLoggedIn ? children : <Navigate to="/login" />;
}

<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

---

## 📝 Day 4 Summary

### ✅ Today's Achievements

**1. React Router v6:**
- ✅ Installed react-router-dom
- ✅ Setup BrowserRouter
- ✅ Created Routes & Route components
- ✅ Built multiple pages
- ✅ Navigation with Link & NavLink
- ✅ useNavigate hook for programmatic navigation
- ✅ 404 Not Found page

**2. MUI Drawer:**
- ✅ Permanent drawer (sidebar)
- ✅ Temporary drawer (mobile)
- ✅ Responsive sidebar
- ✅ Navigation menu with icons
- ✅ Active link highlighting
- ✅ Professional styling

**3. Complete Layout:**
- ✅ Sidebar component
- ✅ Top AppBar with search & user menu
- ✅ MainLayout wrapper
- ✅ Fully responsive design
- ✅ Desktop + Mobile support

**4. Pages Created:**
- ✅ Dashboard (with stats cards)
- ✅ Users (with table)
- ✅ Products (with grid)
- ✅ Orders (placeholder)
- ✅ Settings (placeholder)
- ✅ NotFound (404)

---

## 📊 Project Progress

```
✅ Week 1 Complete (React Foundations)
✅ Week 2 - Day 1 (MUI Installation & Theme)
✅ Week 2 - Day 2 (Button, TextField, Grid)
✅ Week 2 - Day 3 (Card, Table, AppBar)
✅ Week 2 - Day 4 (React Router & Drawer)

Architecture Completed:
├── ✅ Multi-page routing system
├── ✅ Professional sidebar navigation
├── ✅ Responsive layout (desktop + mobile)
├── ✅ Top navigation bar
├── ✅ 6 main pages structure
└── ✅ 404 error handling

Frontend Components: 20+ mastered
Navigation: ✅ Complete
Layout: ✅ Professional Admin Panel Structure
```

---

## 🔜 Tomorrow's Preview (Day 5)

**Week 2 - Day 5: Forms & Validation**

Topics:
1. **Form Handling with React Hook Form**
2. **Validation with Yup**
3. **MUI Form Components**
4. **Complete CRUD Forms**
5. **File Upload**

**What We'll Build:**
- ✨ Add User form with validation
- ✨ Edit User form
- ✨ Form error handling
- ✨ File upload component

---

## 🏆 Day 4 Checklist

**Installation:**
- [ ] react-router-dom installed
- [ ] No errors in console

**Files Created:**
- [ ] All 6 page files created
- [ ] Sidebar.jsx
- [ ] TopBar.jsx
- [ ] MainLayout.jsx
- [ ] Routes configured in App.jsx
- [ ] BrowserRouter in main.jsx

**Understanding:**
- [ ] I understand React Router
- [ ] I understand BrowserRouter, Routes, Route
- [ ] I understand Link vs NavLink
- [ ] I understand useNavigate hook
- [ ] I understand Drawer component
- [ ] I understand permanent vs temporary drawer
- [ ] I understand responsive layout

**Testing:**
- [ ] All pages accessible via routes
- [ ] Sidebar navigation works
- [ ] Active links highlighted
- [ ] Mobile drawer works
- [ ] Top bar menus work
- [ ] Browser back/forward works
- [ ] No console errors

---

## 💡 Pro Tips

### Tip 1: Route Organization
```jsx
// ✅ Good - Organized routes
const routes = [
  { path: '/', element: <Dashboard /> },
  { path: '/users', element: <Users /> },
];

routes.map(route => <Route key={route.path} {...route} />)
```

### Tip 2: Active Link Styling
```jsx
// ✅ Good - Consistent active state
<NavLink
  to="/dashboard"
  className={({ isActive }) => isActive ? 'active-link' : ''}
>
```

### Tip 3: Lazy Loading Routes
```jsx
// ✅ Good - Lazy load for performance
const Dashboard = lazy(() => import('./pages/Dashboard'));

<Suspense fallback={<Loading />}>
  <Routes>
    <Route path="/" element={<Dashboard />} />
  </Routes>
</Suspense>
```

### Tip 4: Drawer Best Practices
```jsx
// ✅ Good - Responsive drawer
<Drawer
  variant={isMobile ? 'temporary' : 'permanent'}
  open={isMobile ? open : true}
/>
```

---

## 🐛 Common Problems & Solutions

### Problem 1: Routes not working
**Solution:**
```jsx
// ❌ Wrong - BrowserRouter missing
<App />

// ✅ Correct
<BrowserRouter>
  <App />
</BrowserRouter>
```

### Problem 2: Active link not highlighting
**Solution:**
```jsx
// ❌ Wrong - Using Link
<Link to="/dashboard">Dashboard</Link>

// ✅ Correct - Using NavLink
<NavLink to="/dashboard">Dashboard</NavLink>
```

### Problem 3: Sidebar covering content
**Solution:**
```jsx
// ✅ Add margin to main content
<Box sx={{ marginLeft: `${drawerWidth}px` }}>
  {content}
</Box>
```

### Problem 4: Mobile drawer not closing
**Solution:**
```jsx
// ✅ Add onClick to close drawer
<ListItemButton
  onClick={isMobile ? onClose : undefined}
>
```

---

## 📚 Interview Questions

**Q1: What is React Router?**
**A:** Library for routing in React - multiple pages without page reload.

**Q2: Difference between Link and NavLink?**
**A:** NavLink has active state styling, Link does not.

**Q3: What is useNavigate hook?**
**A:** Hook for programmatic navigation (navigate from JS code).

**Q4: Types of MUI Drawer?**
**A:** Permanent (always visible), Temporary (open/close), Persistent (toggle).

**Q5: How to make drawer responsive?**
**A:** Use different variants - temporary for mobile, permanent for desktop.

---

**🎊 Day 4 Complete! Tomorrow we'll add forms with validation! 🚀**

**Happy Coding! 💻✨**
