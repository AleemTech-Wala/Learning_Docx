# 📅 Week 2 - Day 7: Project Implementation Part 2 & Week Review

## 🎯 Today's Goal
**Aaj hum Week 2 ko complete karenge aur ek professional Users Management page banayenge!**

**Today's Focus:**
- ✅ Complete Users Management page
- ✅ MUI Table with static data
- ✅ Action buttons (Edit, Delete)
- ✅ Professional table design
- ✅ Week 2 complete review
- ✅ Project polish

---

## 📚 Session Breakdown (4 Hours)

| Time | Topic | Duration |
|------|-------|----------|
| **Hour 1** | Users Page with MUI Table | 60 min |
| **Hour 2** | Action Buttons & Interactions | 60 min |
| **Hour 3** | Additional Pages & Features | 60 min |
| **Hour 4** | Week 2 Review & Testing | 60 min |

---

## 👥 Part 1: Users Management Page (60 minutes)

### 📖 What We'll Build

**Simple Urdu/English:**
Aaj hum ek complete Users Management page banayenge jahan sab users ki list table mein hogi. Har user ke sath Edit aur Delete buttons honge (abhi dummy - sirf design).

**Features:**
- ✅ Users list table
- ✅ Search functionality
- ✅ Add User button
- ✅ Edit/Delete action buttons
- ✅ Status chips
- ✅ Role badges
- ✅ Pagination

---

### Step 1: Create Users Data File

**File:** `src/data/usersData.js`

```javascript
// Static Users Data (Dummy Data)

export const usersData = [
  {
    id: 1,
    name: 'Ahmed Ali',
    email: 'ahmed.ali@example.com',
    phone: '+92 300 1234567',
    role: 'Admin',
    status: 'Active',
    joinDate: '2024-01-15',
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: 2,
    name: 'Fatima Khan',
    email: 'fatima.khan@example.com',
    phone: '+92 321 9876543',
    role: 'User',
    status: 'Active',
    joinDate: '2024-02-20',
    avatar: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: 3,
    name: 'Hassan Raza',
    email: 'hassan.raza@example.com',
    phone: '+92 333 4567890',
    role: 'Moderator',
    status: 'Inactive',
    joinDate: '2024-01-10',
    avatar: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: 4,
    name: 'Ayesha Malik',
    email: 'ayesha.malik@example.com',
    phone: '+92 345 1122334',
    role: 'User',
    status: 'Active',
    joinDate: '2024-03-05',
    avatar: 'https://i.pravatar.cc/150?img=4'
  },
  {
    id: 5,
    name: 'Bilal Ahmed',
    email: 'bilal.ahmed@example.com',
    phone: '+92 312 5566778',
    role: 'User',
    status: 'Active',
    joinDate: '2024-02-15',
    avatar: 'https://i.pravatar.cc/150?img=5'
  },
  {
    id: 6,
    name: 'Sara Yousuf',
    email: 'sara.yousuf@example.com',
    phone: '+92 301 9988776',
    role: 'Admin',
    status: 'Active',
    joinDate: '2024-01-20',
    avatar: 'https://i.pravatar.cc/150?img=6'
  },
  {
    id: 7,
    name: 'Usman Shah',
    email: 'usman.shah@example.com',
    phone: '+92 322 3344556',
    role: 'User',
    status: 'Inactive',
    joinDate: '2024-03-10',
    avatar: 'https://i.pravatar.cc/150?img=7'
  },
  {
    id: 8,
    name: 'Zainab Hassan',
    email: 'zainab.hassan@example.com',
    phone: '+92 335 7788990',
    role: 'Moderator',
    status: 'Active',
    joinDate: '2024-02-25',
    avatar: 'https://i.pravatar.cc/150?img=8'
  },
  {
    id: 9,
    name: 'Ali Raza',
    email: 'ali.raza@example.com',
    phone: '+92 315 2233445',
    role: 'User',
    status: 'Active',
    joinDate: '2024-03-15',
    avatar: 'https://i.pravatar.cc/150?img=9'
  },
  {
    id: 10,
    name: 'Maria Khan',
    email: 'maria.khan@example.com',
    phone: '+92 308 6677889',
    role: 'User',
    status: 'Inactive',
    joinDate: '2024-01-25',
    avatar: 'https://i.pravatar.cc/150?img=10'
  },
];

// Helper function to get user by ID
export const getUserById = (id) => {
  return usersData.find(user => user.id === id);
};

// Helper function to get users by role
export const getUsersByRole = (role) => {
  return usersData.filter(user => user.role === role);
};

// Helper function to get active users
export const getActiveUsers = () => {
  return usersData.filter(user => user.status === 'Active');
};
```

---

### Step 2: Create Complete Users Page

**File:** `src/pages/Users.jsx`

```jsx
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
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
  Stack,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  TablePagination,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Edit,
  Delete,
  Visibility,
  Search,
  Add,
  MoreVert,
  FilterList
} from '@mui/icons-material';
import { usersData } from '../data/usersData';

function Users() {
  
  // State
  const [users, setUsers] = useState(usersData);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Filter users based on search
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Menu handlers
  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  // Action handlers
  const handleView = (user) => {
    handleMenuClose();
    setSnackbar({
      open: true,
      message: `Viewing details of ${user.name}`,
      severity: 'info'
    });
  };

  const handleEdit = (user) => {
    handleMenuClose();
    setSnackbar({
      open: true,
      message: `Edit functionality for ${user.name} - Coming Soon!`,
      severity: 'info'
    });
  };

  const handleDeleteClick = (user) => {
    handleMenuClose();
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Remove user from list
    setUsers(users.filter(u => u.id !== selectedUser.id));
    setDeleteDialogOpen(false);
    setSnackbar({
      open: true,
      message: `${selectedUser.name} has been deleted successfully!`,
      severity: 'success'
    });
    setSelectedUser(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const handleAddUser = () => {
    setSnackbar({
      open: true,
      message: 'Add User functionality - Coming Soon!',
      severity: 'info'
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Get role color
  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin':
        return 'error';
      case 'Moderator':
        return 'warning';
      case 'User':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      
      {/* Page Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Users Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and view all users in the system
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={handleAddUser}
        >
          Add New User
        </Button>
      </Box>

      {/* Stats Cards */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ marginBottom: 3 }}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Total Users
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {users.length}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Active Users
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="success.main">
              {users.filter(u => u.status === 'Active').length}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Inactive Users
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="error.main">
              {users.filter(u => u.status === 'Inactive').length}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* Main Card */}
      <Card>
        <CardContent>
          
          {/* Search Bar */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ marginBottom: 3 }}>
            <TextField
              fullWidth
              placeholder="Search by name, email, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <Button 
              variant="outlined" 
              startIcon={<FilterList />}
              sx={{ minWidth: 120 }}
            >
              Filter
            </Button>
          </Stack>

          {/* Users Table */}
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: 'grey.100' }}>
                <TableRow>
                  <TableCell><strong>User</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Phone</strong></TableCell>
                  <TableCell><strong>Role</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Join Date</strong></TableCell>
                  <TableCell align="center"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user) => (
                    <TableRow key={user.id} hover>
                      
                      {/* User Info */}
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar 
                            src={user.avatar} 
                            alt={user.name}
                            sx={{ bgcolor: 'primary.main' }}
                          >
                            {user.name.charAt(0)}
                          </Avatar>
                          <Typography variant="body2" fontWeight="medium">
                            {user.name}
                          </Typography>
                        </Box>
                      </TableCell>

                      {/* Email */}
                      <TableCell>{user.email}</TableCell>

                      {/* Phone */}
                      <TableCell>{user.phone}</TableCell>

                      {/* Role */}
                      <TableCell>
                        <Chip 
                          label={user.role} 
                          size="small"
                          color={getRoleColor(user.role)}
                        />
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <Chip 
                          label={user.status} 
                          size="small"
                          color={user.status === 'Active' ? 'success' : 'default'}
                        />
                      </TableCell>

                      {/* Join Date */}
                      <TableCell>{user.joinDate}</TableCell>

                      {/* Actions */}
                      <TableCell align="center">
                        <Stack direction="row" spacing={0.5} justifyContent="center">
                          <Tooltip title="View">
                            <IconButton 
                              size="small" 
                              color="primary"
                              onClick={() => handleView(user)}
                            >
                              <Visibility fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton 
                              size="small" 
                              color="info"
                              onClick={() => handleEdit(user)}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={() => handleDeleteClick(user)}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="More">
                            <IconButton 
                              size="small"
                              onClick={(e) => handleMenuOpen(e, user)}
                            >
                              <MoreVert fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography variant="body2" color="text.secondary" sx={{ padding: 4 }}>
                        No users found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            component="div"
            count={filteredUsers.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardContent>
      </Card>

      {/* More Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleView(selectedUser)}>
          <Visibility fontSize="small" sx={{ marginRight: 1 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={() => handleEdit(selectedUser)}>
          <Edit fontSize="small" sx={{ marginRight: 1 }} />
          Edit User
        </MenuItem>
        <MenuItem onClick={() => handleDeleteClick(selectedUser)}>
          <Delete fontSize="small" sx={{ marginRight: 1 }} />
          Delete User
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>
          Delete User
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <strong>{selectedUser?.name}</strong>? 
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Users;
```

---

## 📦 Part 2: Additional Pages (60 minutes)

### Step 3: Create Products Page

**File:** `src/pages/Products.jsx`

```jsx
import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  IconButton,
  Stack
} from '@mui/material';
import { Edit, Delete, Visibility, Add } from '@mui/icons-material';

function Products() {
  
  const products = [
    { 
      id: 1, 
      name: 'Laptop Dell', 
      price: 85000, 
      stock: 15, 
      status: 'Available',
      category: 'Electronics'
    },
    { 
      id: 2, 
      name: 'Mouse Logitech', 
      price: 1200, 
      stock: 50, 
      status: 'Available',
      category: 'Accessories'
    },
    { 
      id: 3, 
      name: 'Keyboard Mechanical', 
      price: 3500, 
      stock: 0, 
      status: 'Out of Stock',
      category: 'Accessories'
    },
    { 
      id: 4, 
      name: 'Monitor Samsung', 
      price: 25000, 
      stock: 8, 
      status: 'Available',
      category: 'Electronics'
    },
    { 
      id: 5, 
      name: 'Headphones Sony', 
      price: 4500, 
      stock: 25, 
      status: 'Available',
      category: 'Accessories'
    },
    { 
      id: 6, 
      name: 'Webcam HD', 
      price: 3200, 
      stock: 12, 
      status: 'Available',
      category: 'Electronics'
    },
  ];

  return (
    <Box>
      
      {/* Page Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Products Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your product inventory
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />}>
          Add Product
        </Button>
      </Box>

      {/* Products Grid */}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="div"
                sx={{
                  height: 180,
                  backgroundColor: 'primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="h4" color="white">
                  {product.name.split(' ')[0]}
                </Typography>
              </CardMedia>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Chip 
                  label={product.category} 
                  size="small" 
                  sx={{ marginBottom: 1 }}
                />
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
                <Stack direction="row" spacing={1} sx={{ marginTop: 2 }}>
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

### Step 4: Create Orders Page

**File:** `src/pages/Orders.jsx`

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
  Chip,
  IconButton,
  Button,
  Stack
} from '@mui/material';
import { Visibility, Edit, Print, Add } from '@mui/icons-material';

function Orders() {
  
  const orders = [
    { 
      id: 1001, 
      customer: 'Ahmed Ali', 
      product: 'Laptop Dell', 
      amount: 85000, 
      status: 'Completed',
      date: '2024-03-15'
    },
    { 
      id: 1002, 
      customer: 'Fatima Khan', 
      product: 'Mouse Logitech', 
      amount: 1200, 
      status: 'Pending',
      date: '2024-03-16'
    },
    { 
      id: 1003, 
      customer: 'Hassan Raza', 
      product: 'Monitor Samsung', 
      amount: 25000, 
      status: 'Processing',
      date: '2024-03-17'
    },
    { 
      id: 1004, 
      customer: 'Ayesha Malik', 
      product: 'Headphones Sony', 
      amount: 4500, 
      status: 'Completed',
      date: '2024-03-18'
    },
    { 
      id: 1005, 
      customer: 'Bilal Ahmed', 
      product: 'Keyboard', 
      amount: 3500, 
      status: 'Cancelled',
      date: '2024-03-19'
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Processing':
        return 'info';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      
      {/* Page Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Orders Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            View and manage all orders
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />}>
          Create Order
        </Button>
      </Box>

      {/* Orders Table */}
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: 'grey.100' }}>
                <TableRow>
                  <TableCell><strong>Order ID</strong></TableCell>
                  <TableCell><strong>Customer</strong></TableCell>
                  <TableCell><strong>Product</strong></TableCell>
                  <TableCell><strong>Amount</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell align="center"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        #{order.id}
                      </Typography>
                    </TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold" color="success.main">
                        Rs. {order.amount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={order.status} 
                        size="small"
                        color={getStatusColor(order.status)}
                      />
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={0.5} justifyContent="center">
                        <IconButton size="small" color="primary">
                          <Visibility fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="info">
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="secondary">
                          <Print fontSize="small" />
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

export default Orders;
```

---

### Step 5: Create Settings Page

**File:** `src/pages/Settings.jsx`

```jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Divider,
  Switch,
  FormControlLabel,
  Grid
} from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';

function Settings() {
  
  const [settings, setSettings] = useState({
    siteName: 'Admin Panel',
    email: 'admin@admin.com',
    phone: '+92 300 1234567',
    address: 'Karachi, Pakistan',
    notifications: true,
    emailAlerts: true,
    darkMode: false,
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setSettings({
      ...settings,
      [name]: e.target.type === 'checkbox' ? checked : value
    });
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <Box>
      
      {/* Page Header */}
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Configure your application settings
      </Typography>

      {/* General Settings */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            General Settings
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Site Name"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={settings.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={settings.address}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Notification Settings
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          
          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleChange}
                />
              }
              label="Enable Notifications"
            />
            <FormControlLabel
              control={
                <Switch
                  name="emailAlerts"
                  checked={settings.emailAlerts}
                  onChange={handleChange}
                />
              }
              label="Email Alerts"
            />
            <FormControlLabel
              control={
                <Switch
                  name="darkMode"
                  checked={settings.darkMode}
                  onChange={handleChange}
                />
              }
              label="Dark Mode (Coming Soon)"
            />
          </Stack>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Stack direction="row" spacing={2}>
        <Button 
          variant="contained" 
          startIcon={<Save />}
          onClick={handleSave}
        >
          Save Changes
        </Button>
        <Button 
          variant="outlined" 
          startIcon={<Cancel />}
        >
          Cancel
        </Button>
      </Stack>
    </Box>
  );
}

export default Settings;
```

---

## 📝 Part 3: Week 2 Complete Review (60 minutes)

### 🎓 Week 2 - What We Learned

#### **Day 1: MUI Installation & Theme Setup**
```
✅ MUI installation
✅ Theme configuration
✅ Color palette setup
✅ Typography customization
✅ Component overrides
```

#### **Day 2: Basic MUI Components**
```
✅ Button component (variants, colors, sizes, icons)
✅ TextField component (types, validation, adornments)
✅ Grid system (12 columns, responsive breakpoints)
✅ Forms with validation
```

#### **Day 3: Advanced MUI Components**
```
✅ Card component (header, content, actions, media)
✅ Table component (rows, columns, pagination)
✅ AppBar component (navigation, menus, search)
✅ Complete dashboard integration
```

#### **Day 4: React Router & Navigation**
```
✅ React Router v6 installation
✅ BrowserRouter, Routes, Route
✅ Link vs NavLink
✅ useNavigate hook
✅ MUI Drawer (permanent & temporary)
✅ Responsive sidebar
```

#### **Day 5: Layout Patterns & Responsive Design**
```
✅ useMediaQuery hook
✅ MUI breakpoints (xs, sm, md, lg, xl)
✅ Mobile-first design
✅ Responsive components
✅ Layout patterns
```

#### **Day 6: Project Implementation Part 1**
```
✅ MUI Login page
✅ AdminLayout wrapper
✅ Sidebar with navigation
✅ Top AppBar with menus
✅ Protected routes
✅ Authentication flow
```

#### **Day 7: Project Implementation Part 2**
```
✅ Complete Users Management page
✅ Static data handling
✅ MUI Table with actions
✅ Search & pagination
✅ Dialog components
✅ Snackbar notifications
✅ Additional pages (Products, Orders, Settings)
```

---

### 📊 Complete Feature List

**Authentication:**
- ✅ Login page with validation
- ✅ Protected routes
- ✅ Logout functionality
- ✅ Remember me option

**Layout:**
- ✅ Responsive AdminLayout
- ✅ Sidebar navigation (permanent + temporary)
- ✅ Top AppBar with search & menus
- ✅ Mobile responsive

**Pages:**
- ✅ Dashboard (with stats cards, charts)
- ✅ Users Management (table, CRUD UI)
- ✅ Products (grid view)
- ✅ Orders (table view)
- ✅ Settings (form view)

**Components:**
- ✅ 20+ MUI components mastered
- ✅ Reusable layout components
- ✅ Responsive design
- ✅ Professional UI/UX

---

## 📁 Final Project Structure

```
admin-panel/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── TopBar.jsx
│   │   ├── auth/
│   │   │   ├── LoginPage.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   └── common/
│   │       └── (reusable components)
│   ├── pages/
│   │   ├── Dashboard.jsx       ✅ Complete
│   │   ├── Users.jsx           ✅ Complete
│   │   ├── Products.jsx        ✅ Complete
│   │   ├── Orders.jsx          ✅ Complete
│   │   └── Settings.jsx        ✅ Complete
│   ├── data/
│   │   └── usersData.js        ✅ Created
│   ├── App.jsx
│   ├── main.jsx
│   └── theme.js
├── package.json
└── README.md
```

---

## 🎯 Practice Tasks

### Task 1: Add User Profile View (⭐⭐⭐)

**Goal:** Create a modal/dialog showing full user details.

**Requirements:**
- Click "View" icon to open dialog
- Show all user information
- Avatar, name, email, phone, role, status
- Close button

---

### Task 2: Add Filter by Role (⭐⭐⭐)

**Goal:** Filter users by role (Admin, Moderator, User).

**Hint:**
```jsx
const [roleFilter, setRoleFilter] = useState('All');

const filteredUsers = users.filter(user => 
  roleFilter === 'All' ? true : user.role === roleFilter
);
```

---

### Task 3: Add Export to CSV (⭐⭐⭐⭐)

**Goal:** Add button to export users table to CSV file.

**Hint:**
```jsx
const exportToCSV = () => {
  const csv = users.map(u => 
    `${u.name},${u.email},${u.role},${u.status}`
  ).join('\n');
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'users.csv';
  a.click();
};
```

---

### Task 4: Add User Statistics Chart (⭐⭐⭐⭐)

**Goal:** Add a pie chart showing users by role.

**Hint:** Use a chart library like recharts or chart.js

---

### Task 5: Add Dark Mode (⭐⭐⭐⭐⭐)

**Goal:** Complete dark mode implementation.

**Requirements:**
- Toggle switch in settings
- Save preference to localStorage
- Update theme dynamically

---

## ✅ Week 2 Final Checklist

### **Installation & Setup:**
- [ ] MUI installed and working
- [ ] React Router installed
- [ ] Theme configured
- [ ] No dependency errors

### **Files Created:**
- [ ] LoginPage.jsx (MUI)
- [ ] AdminLayout.jsx
- [ ] Sidebar.jsx
- [ ] TopBar.jsx
- [ ] ProtectedRoute.jsx
- [ ] Dashboard.jsx (enhanced)
- [ ] Users.jsx (complete)
- [ ] Products.jsx
- [ ] Orders.jsx
- [ ] Settings.jsx
- [ ] usersData.js
- [ ] theme.js

### **Features Working:**
- [ ] Login functionality
- [ ] Protected routes
- [ ] Sidebar navigation
- [ ] Top bar menus
- [ ] Dashboard stats
- [ ] Users table with search
- [ ] Pagination working
- [ ] Delete confirmation dialog
- [ ] Snackbar notifications
- [ ] Action buttons (View, Edit, Delete)
- [ ] Products page
- [ ] Orders page
- [ ] Settings page
- [ ] Logout functionality

### **Testing:**
- [ ] Can login with admin@admin.com / admin123
- [ ] Redirects to dashboard after login
- [ ] All sidebar links work
- [ ] Users table displays data
- [ ] Search filters users correctly
- [ ] Can delete users (UI only)
- [ ] Dialog opens/closes properly
- [ ] Snackbar shows notifications
- [ ] Mobile responsive
- [ ] Can logout
- [ ] Protected routes work
- [ ] No console errors

### **Understanding:**
- [ ] I understand MUI components
- [ ] I understand React Router
- [ ] I understand responsive design
- [ ] I understand state management
- [ ] I understand layout patterns
- [ ] I can build professional UI

---

## 🎊 Week 2 Complete Summary

### 📈 Progress Achievement

```
Week 1: React Foundations ✅
├── React basics
├── Components & Props
├── State management
├── Event handling
└── Forms

Week 2: MUI & Frontend Complete ✅
├── MUI installation & theme
├── 20+ MUI components
├── React Router & navigation
├── Layout patterns
├── Responsive design
├── Complete admin panel
└── Professional UI/UX

Total Components Mastered: 25+
Total Pages Created: 5+
Lines of Code: 2000+
```

---

### 🏆 Key Achievements

**1. Professional Admin Panel:**
- ✅ Enterprise-level design
- ✅ Responsive on all devices
- ✅ Professional navigation
- ✅ Complete CRUD UI

**2. MUI Mastery:**
- ✅ Button, TextField, Grid
- ✅ Card, Table, AppBar
- ✅ Drawer, Dialog, Menu
- ✅ Chip, Avatar, Badge
- ✅ Snackbar, Alert

**3. React Skills:**
- ✅ Component composition
- ✅ State management
- ✅ Event handling
- ✅ Form validation
- ✅ Routing

**4. Responsive Design:**
- ✅ useMediaQuery hook
- ✅ Breakpoints (xs, sm, md, lg, xl)
- ✅ Mobile-first approach
- ✅ Responsive components

---

## 🔜 Week 3 Preview

**Week 3: API Integration & Data Management**

**What's Coming:**
- 🔄 Axios installation
- 🌐 REST API concepts
- 📡 HTTP methods (GET, POST, PUT, DELETE)
- 🔄 Async/Await
- 📊 Real data fetching
- ⚡ Loading states
- ❌ Error handling
- 🎯 useEffect hook

**What We'll Build:**
- Connect to mock API
- Fetch real users data
- Create new users
- Update existing users
- Delete users
- Handle loading & errors

---

## 💡 Pro Tips for Week 3

### Tip 1: Keep Code Organized
```
✅ One component per file
✅ Reusable components in common/
✅ Pages in pages/
✅ Data/API calls in services/
```

### Tip 2: Use Proper Naming
```javascript
// ✅ Good - Descriptive names
const [users, setUsers] = useState([]);
const [isLoading, setIsLoading] = useState(false);

// ❌ Bad - Unclear names
const [data, setData] = useState([]);
const [flag, setFlag] = useState(false);
```

### Tip 3: Handle Loading States
```jsx
{isLoading ? (
  <CircularProgress />
) : (
  <Table>{/* data */}</Table>
)}
```

### Tip 4: Handle Errors
```jsx
{error && (
  <Alert severity="error">{error}</Alert>
)}
```

---

## 📚 Recommended Practice

**Before Week 3:**
1. ✅ Review all Week 2 code
2. ✅ Test all features thoroughly
3. ✅ Understand each component
4. ✅ Try practice tasks
5. ✅ Experiment with MUI components

**Resources:**
- MUI Documentation: https://mui.com/
- React Router Docs: https://reactrouter.com/
- React Docs: https://react.dev/

---

## 🎯 Week 2 Final Stats

```
📊 Statistics:
├── Days Completed: 7/7
├── Components Created: 15+
├── MUI Components Learned: 25+
├── Pages Built: 5
├── Lines of Code: ~2000
├── Features: Authentication, CRUD UI, Routing
└── Responsive: ✅ Yes

🎓 Skills Gained:
├── MUI Components Mastery
├── React Router Navigation
├── Responsive Design
├── Layout Patterns
├── State Management
├── Form Validation
└── Professional UI/UX Design

🚀 Ready for Week 3:
└── API Integration & Backend Connection
```

---

**🎊 Congratulations! Week 2 Complete! 🎊**

**Your admin panel looks professional and enterprise-ready!**

**Tomorrow: Week 3, Day 1 - API Integration begins! 🚀**

**Happy Coding! 💻✨**
