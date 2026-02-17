# 📅 Week 3 - Day 6: Project Implementation - Users List with API

## 🎯 Today's Goal
**Aaj hum complete Users List feature implement karenge - API se data fetch karke professional table mein display karenge!**

**Today's Focus:**
- ✅ Service Layer architecture
- ✅ Users Service creation
- ✅ API integration with JSONPlaceholder
- ✅ Complete Users List page
- ✅ Professional loading states
- ✅ Error handling
- ✅ Search & Filter
- ✅ Pagination
- ✅ Actions (View, Edit, Delete)

---

## 📚 Session Breakdown (4-5 Hours)

| Time | Topic | Duration |
|------|-------|----------|
| **Hour 1** | Service Layer Architecture | 60 min |
| **Hour 2** | Users Service Creation | 60 min |
| **Hour 3** | Users List Page - Basic | 60 min |
| **Hour 4** | Advanced Features (Search, Filter) | 60 min |
| **Hour 5** | Testing & Polish | 60 min |

---

## 🏗️ Part 1: Service Layer Architecture (60 minutes)

### 📖 What is Service Layer?

**Simple Urdu/English:**
Service layer ek **middle layer** hai jo aapke **components** aur **API** ke beech mein rehti hai. Yeh ek organized tareeqa hai API calls ko manage karne ka.

**Real-Life Example:**
```
Restaurant Example:

Customer (Component) → Waiter (Service) → Kitchen (API)

Customer seedha kitchen mein nahi jaata
Waiter orders manage karta hai
Kitchen sirf cooking karta hai

Similarly:
Component → Service → API
```

---

### 🤔 Why Service Layer?

**Problem Without Service Layer:**
```javascript
// ❌ Component mein directly API call
function Users() {
  const fetchUsers = async () => {
    const response = await axios.get('https://api.../users');
    setUsers(response.data);
  };
}

// Problems:
// 1. Code duplication (har component mein same code)
// 2. API URL change = update everywhere
// 3. Error handling har jagah repeat
// 4. Testing difficult
```

**Solution With Service Layer:**
```javascript
// ✅ Service file
// src/services/userService.js
export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

// Component (clean & simple)
function Users() {
  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };
}

// Benefits:
// ✅ Reusable
// ✅ Centralized
// ✅ Easy to maintain
// ✅ Easy to test
```

---

### 📊 Architecture Layers

```
┌─────────────────────────────────────┐
│         Components (UI)              │
│   Users.jsx, Dashboard.jsx, etc.    │
└──────────────┬──────────────────────┘
               │
               ↓ (imports service)
┌──────────────────────────────────────┐
│         Service Layer                │
│  userService.js, postService.js      │
└──────────────┬───────────────────────┘
               │
               ↓ (uses api instance)
┌──────────────────────────────────────┐
│         API Configuration            │
│          api.js (axios)              │
└──────────────┬───────────────────────┘
               │
               ↓ (makes HTTP requests)
┌──────────────────────────────────────┐
│         Backend API                  │
│   https://api.myapp.com              │
└──────────────────────────────────────┘
```

---

### 📁 Service Layer File Structure

```
src/
├── services/
│   ├── api.js                  ← Base API config (already created)
│   ├── userService.js          ← User related APIs (today)
│   ├── postService.js          ← Post related APIs
│   ├── authService.js          ← Authentication APIs
│   └── index.js                ← Export all services
```

**Each service file contains:**
```javascript
// Specific API functions for one entity
export const getUsers = () => { ... }
export const getUserById = (id) => { ... }
export const createUser = (data) => { ... }
export const updateUser = (id, data) => { ... }
export const deleteUser = (id) => { ... }
```

---

### 🎯 Benefits of Service Layer

**1. Reusability**
```javascript
// Use in multiple components
import { getUsers } from '../services/userService';

// Dashboard.jsx
const users = await getUsers();

// Users.jsx
const users = await getUsers();

// Reports.jsx
const users = await getUsers();
```

**2. Easy Maintenance**
```javascript
// API URL change? Update in ONE place only
// userService.js
export const getUsers = async () => {
  // Change here affects everywhere
  const response = await api.get('/users');
  return response.data;
};
```

**3. Error Handling**
```javascript
// Centralized error handling
export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

**4. Easy Testing**
```javascript
// Test service independently
import { getUsers } from './userService';

test('getUsers returns user list', async () => {
  const result = await getUsers();
  expect(result).toHaveLength(10);
});
```

---

## 💻 Part 2: Create Users Service (60 minutes)

### Step 1: Create userService.js

**Location:** `src/services/userService.js`

**Complete File:**

```javascript
// ==========================================
// USER SERVICE
// ==========================================
// This file contains all user-related API calls
// Import this in components to fetch user data

import api from './api';

// ==========================================
// GET ALL USERS
// ==========================================

/**
 * Fetch all users from API
 * @returns {Promise} Array of users
 */
export const getAllUsers = async () => {
  try {
    const response = await api.get('/users');
    return {
      success: true,
      data: response.data,
      message: 'Users fetched successfully'
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || error.message || 'Failed to fetch users'
    };
  }
};

// ==========================================
// GET USER BY ID
// ==========================================

/**
 * Fetch a single user by ID
 * @param {number} id - User ID
 * @returns {Promise} User object
 */
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return {
      success: true,
      data: response.data,
      message: 'User fetched successfully'
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || error.message || 'Failed to fetch user'
    };
  }
};

// ==========================================
// CREATE NEW USER
// ==========================================

/**
 * Create a new user
 * @param {Object} userData - User data {name, email, phone, etc.}
 * @returns {Promise} Created user object
 */
export const createUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return {
      success: true,
      data: response.data,
      message: 'User created successfully'
    };
  } catch (error) {
    console.error('Error creating user:', error);
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || error.message || 'Failed to create user'
    };
  }
};

// ==========================================
// UPDATE USER
// ==========================================

/**
 * Update an existing user
 * @param {number} id - User ID
 * @param {Object} userData - Updated user data
 * @returns {Promise} Updated user object
 */
export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return {
      success: true,
      data: response.data,
      message: 'User updated successfully'
    };
  } catch (error) {
    console.error('Error updating user:', error);
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || error.message || 'Failed to update user'
    };
  }
};

// ==========================================
// DELETE USER
// ==========================================

/**
 * Delete a user
 * @param {number} id - User ID
 * @returns {Promise} Success message
 */
export const deleteUser = async (id) => {
  try {
    await api.delete(`/users/${id}`);
    return {
      success: true,
      message: 'User deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting user:', error);
    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Failed to delete user'
    };
  }
};

// ==========================================
// SEARCH USERS
// ==========================================

/**
 * Search users by name or email
 * @param {string} query - Search query
 * @returns {Promise} Filtered users array
 */
export const searchUsers = async (query) => {
  try {
    const response = await api.get('/users');
    const users = response.data;
    
    // Filter users locally (since JSONPlaceholder doesn't support search)
    const filteredUsers = users.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    );
    
    return {
      success: true,
      data: filteredUsers,
      message: `Found ${filteredUsers.length} users`
    };
  } catch (error) {
    console.error('Error searching users:', error);
    return {
      success: false,
      data: [],
      message: error.message || 'Failed to search users'
    };
  }
};

// ==========================================
// GET USERS WITH PAGINATION
// ==========================================

/**
 * Get paginated users
 * @param {number} page - Page number (1-based)
 * @param {number} limit - Items per page
 * @returns {Promise} Paginated users
 */
export const getUsersPaginated = async (page = 1, limit = 10) => {
  try {
    const response = await api.get('/users');
    const users = response.data;
    
    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = users.slice(startIndex, endIndex);
    
    return {
      success: true,
      data: paginatedUsers,
      pagination: {
        total: users.length,
        page: page,
        limit: limit,
        totalPages: Math.ceil(users.length / limit)
      },
      message: 'Users fetched successfully'
    };
  } catch (error) {
    console.error('Error fetching paginated users:', error);
    return {
      success: false,
      data: [],
      pagination: null,
      message: error.message || 'Failed to fetch users'
    };
  }
};

// ==========================================
// EXPORT ALL FUNCTIONS
// ==========================================

const userService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUsers,
  getUsersPaginated
};

export default userService;
```

---

### 📖 Understanding the Service File

**1. Response Format:**
```javascript
// All functions return consistent format
{
  success: true/false,    // Operation success status
  data: [...],            // Actual data
  message: "..."          // User-friendly message
}
```

**2. Error Handling:**
```javascript
try {
  // API call
} catch (error) {
  // Return error in consistent format
  return {
    success: false,
    data: null,
    message: error.message
  };
}
```

**3. JSDoc Comments:**
```javascript
/**
 * Function description
 * @param {type} name - Parameter description
 * @returns {Promise} Return value description
 */
```

---

### Step 2: Create Services Index File

**File:** `src/services/index.js`

```javascript
// ==========================================
// SERVICES INDEX
// ==========================================
// Central export file for all services

export * from './userService';

// Future exports:
// export * from './postService';
// export * from './authService';
// export * from './productService';

// Default exports
export { default as userService } from './userService';
```

**Usage:**
```javascript
// Option 1: Named imports
import { getAllUsers, createUser } from '../services';

// Option 2: Default import
import userService from '../services';
const users = await userService.getAllUsers();
```

---

## 🎨 Part 3: Build Users List Page (60 minutes)

### Step 1: Create Users Page

**File:** `src/pages/Users.jsx`

**Complete Implementation:**

```javascript
// ==========================================
// USERS PAGE - COMPLETE IMPLEMENTATION
// ==========================================

import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Chip,
  Avatar,
  Tooltip,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  PersonAdd as AddIcon
} from '@mui/icons-material';

// Import services
import { getAllUsers, deleteUser } from '../services/userService';

// Import components (we'll create these)
import TableSkeleton from '../components/common/TableSkeleton';
import EmptyState from '../components/common/EmptyState';
import ConfirmDialog from '../components/common/ConfirmDialog';

// ==========================================
// USERS PAGE COMPONENT
// ==========================================

function Users() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  
  // Data states
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  
  // Loading & error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  
  // Search & filter states
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Dialog states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Snackbar states
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // ==========================================
  // FETCH USERS FROM API
  // ==========================================
  
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Call service
      const result = await getAllUsers();
      
      if (result.success) {
        setUsers(result.data);
        setFilteredUsers(result.data);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FETCH ON COMPONENT MOUNT
  // ==========================================
  
  useEffect(() => {
    fetchUsers();
  }, []);

  // ==========================================
  // SEARCH FUNCTIONALITY
  // ==========================================
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
    // Reset to first page when searching
    setPage(0);
  }, [searchQuery, users]);

  // ==========================================
  // HANDLE DELETE USER
  // ==========================================
  
  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;
    
    try {
      setActionLoading(true);
      
      const result = await deleteUser(selectedUser.id);
      
      if (result.success) {
        // Remove from local state
        setUsers(prevUsers => prevUsers.filter(u => u.id !== selectedUser.id));
        
        // Show success message
        setSnackbar({
          open: true,
          message: 'User deleted successfully!',
          severity: 'success'
        });
      } else {
        setSnackbar({
          open: true,
          message: result.message,
          severity: 'error'
        });
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to delete user',
        severity: 'error'
      });
    } finally {
      setActionLoading(false);
      setDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  // ==========================================
  // HANDLE PAGINATION
  // ==========================================
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // ==========================================
  // HANDLE REFRESH
  // ==========================================
  
  const handleRefresh = () => {
    fetchUsers();
  };

  // ==========================================
  // CLOSE SNACKBAR
  // ==========================================
  
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // ==========================================
  // RENDER: LOADING STATE
  // ==========================================
  
  if (loading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Users Management
        </Typography>
        <TableSkeleton rows={10} columns={5} />
      </Box>
    );
  }

  // ==========================================
  // RENDER: ERROR STATE
  // ==========================================
  
  if (error && users.length === 0) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Users Management
        </Typography>
        <Alert 
          severity="error" 
          action={
            <Button color="inherit" size="small" onClick={handleRefresh}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  // ==========================================
  // CALCULATE PAGINATION
  // ==========================================
  
  const displayedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // ==========================================
  // RENDER: MAIN UI
  // ==========================================
  
  return (
    <Box>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 3
      }}>
        <Typography variant="h4">
          Users Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => alert('Add User - Coming Soon!')}
        >
          Add User
        </Button>
      </Box>

      {/* Search & Actions Bar */}
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          {/* Search Field */}
          <TextField
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            sx={{ flex: 1, minWidth: 250 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />

          {/* Refresh Button */}
          <Tooltip title="Refresh">
            <IconButton onClick={handleRefresh} color="primary">
              <RefreshIcon />
            </IconButton>
          </Tooltip>

          {/* Results Count */}
          <Chip 
            label={`${filteredUsers.length} users`} 
            color="primary" 
            variant="outlined"
          />
        </Box>
      </Paper>

      {/* Table */}
      {filteredUsers.length === 0 ? (
        <EmptyState 
          message="No users found" 
          description="Try adjusting your search query"
        />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            {/* Table Header */}
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Website</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {displayedUsers.map((user) => (
                <TableRow 
                  key={user.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {/* User Column */}
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {user.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body1" fontWeight={500}>
                          {user.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          @{user.username}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  {/* Email Column */}
                  <TableCell>{user.email}</TableCell>

                  {/* Phone Column */}
                  <TableCell>{user.phone}</TableCell>

                  {/* Website Column */}
                  <TableCell>
                    <a 
                      href={`https://${user.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: '#1976d2' }}
                    >
                      {user.website}
                    </a>
                  </TableCell>

                  {/* Actions Column */}
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                      <Tooltip title="View Details">
                        <IconButton 
                          size="small" 
                          color="info"
                          onClick={() => alert(`View User ${user.id}`)}
                        >
                          <ViewIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Edit User">
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => alert(`Edit User ${user.id}`)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete User">
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleDeleteClick(user)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <TablePagination
            component="div"
            count={filteredUsers.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </TableContainer>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete User"
        message={`Are you sure you want to delete ${selectedUser?.name}?`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setSelectedUser(null);
        }}
        loading={actionLoading}
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
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

### 📖 Understanding the Users Page

**1. State Management:**
```javascript
// Data
const [users, setUsers] = useState([]);           // Original data
const [filteredUsers, setFilteredUsers] = useState([]);  // Filtered data

// UI states
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [searchQuery, setSearchQuery] = useState('');
const [page, setPage] = useState(0);
```

**2. useEffect for Initial Load:**
```javascript
useEffect(() => {
  fetchUsers();  // Called once on mount
}, []);
```

**3. useEffect for Search:**
```javascript
useEffect(() => {
  // Filter users based on search query
  const filtered = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  setFilteredUsers(filtered);
}, [searchQuery, users]);
```

---

## 🧩 Part 4: Create Missing Components (30 minutes)

### Component 1: ConfirmDialog

**File:** `src/components/common/ConfirmDialog.jsx`

```javascript
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  CircularProgress
} from '@mui/material';

function ConfirmDialog({ 
  open, 
  title, 
  message, 
  onConfirm, 
  onCancel,
  loading = false,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmColor = 'error'
}) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={loading}>
          {cancelText}
        </Button>
        <Button 
          onClick={onConfirm} 
          color={confirmColor}
          variant="contained"
          disabled={loading}
          startIcon={loading && <CircularProgress size={16} />}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
```

---

### Component 2: EmptyState (if not created in Day 4)

**File:** `src/components/common/EmptyState.jsx`

```javascript
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Inbox as InboxIcon } from '@mui/icons-material';

function EmptyState({ 
  icon: Icon = InboxIcon,
  message = 'No data available', 
  description = '',
  actionLabel = '',
  onAction = null
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6,
        textAlign: 'center'
      }}
    >
      <Icon sx={{ fontSize: 80, color: 'text.secondary', marginBottom: 2 }} />
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {message}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {description}
        </Typography>
      )}
      {actionLabel && onAction && (
        <Button 
          variant="contained" 
          onClick={onAction}
          sx={{ marginTop: 2 }}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}

export default EmptyState;
```

---

### Component 3: TableSkeleton (if not created in Day 4)

**File:** `src/components/common/TableSkeleton.jsx`

```javascript
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
  Box
} from '@mui/material';

function TableSkeleton({ rows = 5, columns = 5 }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {Array.from({ length: columns }).map((_, index) => (
              <TableCell key={index}>
                <Skeleton variant="text" />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  {colIndex === 0 ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Skeleton variant="circular" width={40} height={40} />
                      <Box sx={{ flex: 1 }}>
                        <Skeleton variant="text" width="80%" />
                        <Skeleton variant="text" width="60%" />
                      </Box>
                    </Box>
                  ) : (
                    <Skeleton variant="text" />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableSkeleton;
```

---

## 🚀 Part 5: Testing & Verification (30 minutes)

### Step 1: Run Development Server

```bash
# Make sure you're in admin-panel folder
cd admin-panel

# Start dev server
npm run dev
```

**Expected Output:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

### Step 2: Navigate to Users Page

**URL:** `http://localhost:5173/users`

**You should see:**
1. ✅ "Users Management" heading
2. ✅ "Add User" button
3. ✅ Search bar
4. ✅ Refresh button
5. ✅ Users count chip
6. ✅ Table with users data
7. ✅ Avatar with first letter
8. ✅ User name and username
9. ✅ Email, phone, website
10. ✅ Action buttons (view, edit, delete)
11. ✅ Pagination at bottom

---

### Step 3: Test Features

**1. Search:**
```
Type in search box: "Leanne"
Result: Only Leanne Graham should show
```

**2. Pagination:**
```
Change rows per page: 5, 10, 25
Click next/previous page buttons
```

**3. Delete:**
```
Click delete icon
Confirmation dialog should appear
Click confirm
User should be removed from list
Success snackbar should show
```

**4. Refresh:**
```
Click refresh icon
Loading skeleton should appear
Data should reload
```

---

### Step 4: Check Browser Console

**Open DevTools (F12) → Console**

**You should see:**
```
🔧 API Configuration:
Base URL: https://jsonplaceholder.typicode.com
Timeout: 10000
Debug Mode: true

📤 Request: GET /users
📥 Response: 200 /users
```

---

### Step 5: Check Network Tab

**DevTools → Network Tab**

**You should see:**
```
Name: users
Status: 200
Type: xhr
Size: ~5.5 KB
Time: ~500ms
```

**Click on "users" request → Preview tab:**
```json
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    ...
  },
  ...
]
```

---

## 🎯 Part 6: Add Advanced Features (60 minutes)

### Feature 1: Loading States per Action

**Update Users.jsx:**

```javascript
// Add state for individual row actions
const [deletingId, setDeletingId] = useState(null);

// Update delete function
const handleDeleteConfirm = async () => {
  if (!selectedUser) return;
  
  try {
    setDeletingId(selectedUser.id);
    
    const result = await deleteUser(selectedUser.id);
    
    if (result.success) {
      setUsers(prevUsers => prevUsers.filter(u => u.id !== selectedUser.id));
      setSnackbar({
        open: true,
        message: 'User deleted successfully!',
        severity: 'success'
      });
    }
  } finally {
    setDeletingId(null);
    setDeleteDialogOpen(false);
  }
};
```

---

### Feature 2: Debounced Search

**Install lodash.debounce:**

```bash
npm install lodash.debounce
```

**Update Users.jsx:**

```javascript
import debounce from 'lodash.debounce';

// Create debounced search function
const debouncedSearch = debounce((query) => {
  const filtered = users.filter(user =>
    user.name.toLowerCase().includes(query.toLowerCase()) ||
    user.email.toLowerCase().includes(query.toLowerCase())
  );
  setFilteredUsers(filtered);
}, 300); // Wait 300ms after user stops typing

// Handle search input
const handleSearchChange = (e) => {
  const query = e.target.value;
  setSearchQuery(query);
  debouncedSearch(query);
};

// Update TextField
<TextField
  value={searchQuery}
  onChange={handleSearchChange}
  // ... other props
/>
```

---

### Feature 3: Export to CSV

**Install papaparse:**

```bash
npm install papaparse
```

**Create export function:**

```javascript
import Papa from 'papaparse';

const handleExportCSV = () => {
  // Prepare data
  const exportData = filteredUsers.map(user => ({
    ID: user.id,
    Name: user.name,
    Username: user.username,
    Email: user.email,
    Phone: user.phone,
    Website: user.website,
    Company: user.company.name
  }));
  
  // Convert to CSV
  const csv = Papa.unparse(exportData);
  
  // Download file
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `users_${new Date().toISOString()}.csv`;
  link.click();
  
  // Show success message
  setSnackbar({
    open: true,
    message: 'Users exported successfully!',
    severity: 'success'
  });
};

// Add button
<Button
  variant="outlined"
  startIcon={<DownloadIcon />}
  onClick={handleExportCSV}
>
  Export CSV
</Button>
```

---

### Feature 4: Bulk Actions

**Add selection state:**

```javascript
const [selected, setSelected] = useState([]);

// Select all
const handleSelectAll = (event) => {
  if (event.target.checked) {
    setSelected(displayedUsers.map(user => user.id));
  } else {
    setSelected([]);
  }
};

// Select one
const handleSelectOne = (userId) => {
  setSelected(prev => {
    if (prev.includes(userId)) {
      return prev.filter(id => id !== userId);
    } else {
      return [...prev, userId];
    }
  });
};

// Bulk delete
const handleBulkDelete = async () => {
  // Delete all selected users
  for (const userId of selected) {
    await deleteUser(userId);
  }
  
  // Remove from state
  setUsers(prev => prev.filter(u => !selected.includes(u.id)));
  setSelected([]);
};

// Add checkboxes to table
<TableCell padding="checkbox">
  <Checkbox
    checked={selected.includes(user.id)}
    onChange={() => handleSelectOne(user.id)}
  />
</TableCell>
```

---

## 📊 Complete Project Structure

```
admin-panel/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── TableSkeleton.jsx       ← Loading skeleton
│   │   │   ├── EmptyState.jsx          ← No data state
│   │   │   ├── ConfirmDialog.jsx       ← Delete confirmation
│   │   │   ├── LoadingSpinner.jsx      ← General loading
│   │   │   └── ErrorMessage.jsx        ← Error display
│   │   └── layout/
│   │       ├── TopBar.jsx
│   │       └── Sidebar.jsx
│   ├── pages/
│   │   ├── Users.jsx                   ← Complete users page (today)
│   │   ├── Dashboard.jsx
│   │   └── Products.jsx
│   ├── services/
│   │   ├── api.js                      ← Base API config
│   │   ├── userService.js              ← User APIs (today)
│   │   └── index.js                    ← Services export
│   ├── config/
│   │   └── app.config.js               ← App configuration
│   ├── App.jsx
│   └── main.jsx
├── .env                                 ← Environment variables
├── .env.example
└── package.json
```

---

## 🎯 Practice Tasks

### Task 1: Add User Detail View (⭐⭐⭐)

**Create:** `src/components/users/UserDetailDialog.jsx`

```javascript
function UserDetailDialog({ open, user, onClose }) {
  if (!user) return null;
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>User Details</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography><strong>Name:</strong> {user.name}</Typography>
          <Typography><strong>Email:</strong> {user.email}</Typography>
          <Typography><strong>Phone:</strong> {user.phone}</Typography>
          <Typography><strong>Website:</strong> {user.website}</Typography>
          <Typography><strong>Company:</strong> {user.company.name}</Typography>
          <Typography><strong>Address:</strong> {user.address.city}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
```

---

### Task 2: Add Sorting (⭐⭐⭐⭐)

```javascript
const [sortBy, setSortBy] = useState('name');
const [sortOrder, setSortOrder] = useState('asc');

const handleSort = (field) => {
  const isAsc = sortBy === field && sortOrder === 'asc';
  setSortOrder(isAsc ? 'desc' : 'asc');
  setSortBy(field);
};

// Sort users
const sortedUsers = [...filteredUsers].sort((a, b) => {
  const aValue = a[sortBy];
  const bValue = b[sortBy];
  
  if (sortOrder === 'asc') {
    return aValue > bValue ? 1 : -1;
  } else {
    return aValue < bValue ? 1 : -1;
  }
});

// Add to table header
<TableCell sortDirection={sortBy === 'name' ? sortOrder : false}>
  <TableSortLabel
    active={sortBy === 'name'}
    direction={sortOrder}
    onClick={() => handleSort('name')}
  >
    Name
  </TableSortLabel>
</TableCell>
```

---

### Task 3: Add Filter by Company (⭐⭐⭐⭐)

```javascript
const [companyFilter, setCompanyFilter] = useState('all');

// Get unique companies
const companies = [...new Set(users.map(u => u.company.name))];

// Filter component
<Select
  value={companyFilter}
  onChange={(e) => setCompanyFilter(e.target.value)}
  size="small"
>
  <MenuItem value="all">All Companies</MenuItem>
  {companies.map(company => (
    <MenuItem key={company} value={company}>
      {company}
    </MenuItem>
  ))}
</Select>

// Apply filter
const filtered = users.filter(user => {
  const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesCompany = companyFilter === 'all' || user.company.name === companyFilter;
  return matchesSearch && matchesCompany;
});
```

---

### Task 4: Add Local Storage Cache (⭐⭐⭐⭐⭐)

```javascript
// Save to localStorage
const fetchUsers = async () => {
  try {
    setLoading(true);
    
    // Check cache first
    const cached = localStorage.getItem('users_cache');
    const cacheTime = localStorage.getItem('users_cache_time');
    
    if (cached && cacheTime) {
      const age = Date.now() - parseInt(cacheTime);
      // If cache is less than 5 minutes old
      if (age < 5 * 60 * 1000) {
        setUsers(JSON.parse(cached));
        setFilteredUsers(JSON.parse(cached));
        setLoading(false);
        return;
      }
    }
    
    // Fetch from API
    const result = await getAllUsers();
    
    if (result.success) {
      setUsers(result.data);
      setFilteredUsers(result.data);
      
      // Save to cache
      localStorage.setItem('users_cache', JSON.stringify(result.data));
      localStorage.setItem('users_cache_time', Date.now().toString());
    }
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

---

## ✅ Day 6 Checklist

### **Service Layer:**
- [ ] userService.js created with all CRUD functions
- [ ] Error handling implemented in service
- [ ] Consistent response format
- [ ] Services index file created

### **Users Page:**
- [ ] Users list fetching from API
- [ ] Loading state with skeleton
- [ ] Error state with retry
- [ ] Search functionality working
- [ ] Pagination implemented
- [ ] Delete user with confirmation
- [ ] Success/error notifications
- [ ] Professional table design

### **Components:**
- [ ] ConfirmDialog created
- [ ] EmptyState created
- [ ] TableSkeleton created
- [ ] All components reusable

### **Testing:**
- [ ] Users load on page open
- [ ] Search filters correctly
- [ ] Pagination changes pages
- [ ] Delete removes user
- [ ] Refresh reloads data
- [ ] No console errors

### **Best Practices:**
- [ ] Service layer used (not direct API calls)
- [ ] Proper error handling
- [ ] Loading states everywhere
- [ ] User feedback (snackbar)
- [ ] Clean code structure
- [ ] Responsive design

---

## 🎓 Summary

### Today You Learned:

**1. Service Layer Architecture**
```
✅ What is service layer
✅ Why use service layer
✅ How to structure services
✅ Benefits of centralization
```

**2. User Service**
```
✅ Created userService.js
✅ All CRUD operations
✅ Consistent response format
✅ Error handling
✅ Search & pagination
```

**3. Users List Page**
```
✅ Complete implementation
✅ API integration
✅ Loading & error states
✅ Search functionality
✅ Pagination
✅ Delete with confirmation
✅ Professional UI
```

**4. Reusable Components**
```
✅ ConfirmDialog
✅ EmptyState
✅ TableSkeleton
✅ Clean abstractions
```

**5. Best Practices**
```
✅ Service layer pattern
✅ Error handling
✅ User feedback
✅ Loading states
✅ Responsive design
```

---

## 📊 Before vs After

### Before Day 6:
```
❌ Direct API calls in components
❌ No service layer
❌ Basic users list
❌ No search or filters
❌ No pagination
❌ No proper error handling
```

### After Day 6:
```
✅ Service layer architecture
✅ Centralized API calls
✅ Complete users management
✅ Search & filter
✅ Pagination
✅ Professional error handling
✅ Loading states
✅ Delete confirmation
✅ Success notifications
✅ Production-ready code
```

---

## 🔜 Tomorrow Preview

**Day 7: Project Implementation (Part 2)**

**What's Coming:**
- ✅ Add User dialog and form
- ✅ Edit User functionality
- ✅ Form validation
- ✅ Image upload (avatar)
- ✅ User detail view
- ✅ Complete CRUD UI
- ✅ Week 3 review & polish

**Get Ready:**
Tomorrow we'll complete the Users module with Create and Update! 🚀

---

## 💡 Pro Tips

### Tip 1: Always Use Services
```javascript
// ✅ Good
import { getAllUsers } from '../services';
const result = await getAllUsers();

// ❌ Bad
import axios from 'axios';
const result = await axios.get('...');
```

### Tip 2: Handle Errors Gracefully
```javascript
const result = await getAllUsers();

if (result.success) {
  // Success path
  setUsers(result.data);
} else {
  // Error path
  setError(result.message);
}
```

### Tip 3: User Feedback is Essential
```javascript
// Always show feedback
setSnackbar({
  open: true,
  message: 'User deleted successfully!',
  severity: 'success'
});
```

### Tip 4: Loading States Matter
```javascript
// Show skeleton during load
if (loading) {
  return <TableSkeleton />;
}

// Better UX than blank screen
```

---

## ❓ Common Problems & Solutions

### Problem 1: Users Not Loading

**Check:**
```javascript
1. Is api.js configured correctly?
2. Is VITE_API_BASE_URL in .env?
3. Is dev server running? (npm run dev)
4. Check console for errors
5. Check Network tab for API call
```

---

### Problem 2: Search Not Working

**Solution:**
```javascript
// Make sure searchQuery is trimmed and lowercase
const filtered = users.filter(user =>
  user.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
);
```

---

### Problem 3: Pagination Reset Issue

**Solution:**
```javascript
// Reset to page 0 when searching
useEffect(() => {
  // ... search logic
  setPage(0);  // Add this
}, [searchQuery]);
```

---

### Problem 4: Delete Not Updating UI

**Solution:**
```javascript
// Remove from local state immediately
setUsers(prevUsers => prevUsers.filter(u => u.id !== deletedId));

// Or refresh from API
await fetchUsers();
```

---

## 🎊 Congratulations!

**Aaj aapne complete Users List module bana diya! 🎉**

**You Now Have:**
- ✅ Professional service layer
- ✅ Complete users management
- ✅ Search & pagination
- ✅ Loading & error handling
- ✅ Delete functionality
- ✅ Production-ready code
- ✅ Reusable components

**Tomorrow we'll add Create and Edit! 💪**

**Keep Learning! Keep Building! 💻✨**
