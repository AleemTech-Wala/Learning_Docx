# 📅 Week 5 - Day 7: Secure APIs & Complete Testing

## 🎯 Aaj ka Goal

Week 5 ka **FINAL DAY**! 🎉

**Kya Karenge:**
- Complete authentication system testing (end-to-end)
- Frontend-Backend integration verification
- Security best practices implementation
- Performance optimization
- Production checklist
- Week 5 complete review (Days 1-6 summary)
- Week 6 preview

**Output:** Production-ready, secure, enterprise-level authentication system! 🚀🔐

---

## ⏰ Aaj ka Session Breakdown (4-5 Hours)

| Part | Topic | Time |
|------|-------|------|
| 1 | Complete Users Page Integration | 45 min |
| 2 | End-to-End Security Testing | 60 min |
| 3 | Security Best Practices & Hardening | 45 min |
| 4 | Error Handling & User Feedback | 30 min |
| 5 | Performance Optimization | 30 min |
| 6 | Production Deployment Checklist | 30 min |
| 7 | Week 5 Complete Review | 30 min |

---

## 📚 Part 1: Complete Users Page Integration (45 min)

### 🎯 Goal

Users page ko complete authentication ke saath integrate karna!

**Features:**
- Protected API calls (auto token)
- Loading states
- Error handling (401, 403)
- Add/Edit/Delete with authorization
- Role-based UI visibility

---

### 📝 Step 1: Update Users Page

**Open:** `frontend/src/pages/Users.js`

**Complete Code:**

```javascript
// src/pages/Users.js

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Chip,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const Users = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [selectedUser, setSelectedUser] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    role: 'user',
  });

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  /**
   * Fetch all users from API
   */
  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await api.get('/api/users');
      
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      
      if (error.response?.status === 403) {
        setError('Access denied. You do not have permission to view users.');
      } else if (error.response?.status === 401) {
        setError('Session expired. Please login again.');
      } else {
        setError('Failed to load users. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Open Add User Dialog
   */
  const handleAddClick = () => {
    setDialogMode('add');
    setFormData({
      name: '',
      username: '',
      email: '',
      phone: '',
      role: 'user',
    });
    setOpenDialog(true);
  };

  /**
   * Open Edit User Dialog
   */
  const handleEditClick = (user) => {
    setDialogMode('edit');
    setSelectedUser(user);
    setFormData({
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone || '',
      role: user.role,
    });
    setOpenDialog(true);
  };

  /**
   * Close Dialog
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setFormData({
      name: '',
      username: '',
      email: '',
      phone: '',
      role: 'user',
    });
  };

  /**
   * Handle Form Input Change
   */
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Submit Form (Add or Edit)
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (dialogMode === 'add') {
        // Create new user
        const response = await api.post('/api/users', formData);
        
        if (response.data.success) {
          setSnackbar({
            open: true,
            message: 'User created successfully!',
            severity: 'success',
          });
          fetchUsers(); // Refresh list
          handleCloseDialog();
        }
      } else {
        // Update existing user
        const response = await api.put(`/api/users/${selectedUser.id}`, formData);
        
        if (response.data.success) {
          setSnackbar({
            open: true,
            message: 'User updated successfully!',
            severity: 'success',
          });
          fetchUsers(); // Refresh list
          handleCloseDialog();
        }
      }
    } catch (error) {
      console.error('Error saving user:', error);
      
      let errorMessage = 'Failed to save user.';
      
      if (error.response?.status === 403) {
        errorMessage = 'Access denied. Insufficient permissions.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error',
      });
    }
  };

  /**
   * Delete User
   */
  const handleDelete = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to delete ${userName}?`)) {
      return;
    }

    try {
      const response = await api.delete(`/api/users/${userId}`);
      
      if (response.data.success) {
        setSnackbar({
          open: true,
          message: 'User deleted successfully!',
          severity: 'success',
        });
        fetchUsers(); // Refresh list
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      
      let errorMessage = 'Failed to delete user.';
      
      if (error.response?.status === 403) {
        errorMessage = 'Access denied. Only admins can delete users.';
      } else if (error.response?.status === 400) {
        errorMessage = error.response.data.message || 'Cannot delete this user.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error',
      });
    }
  };

  /**
   * Close Snackbar
   */
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  /**
   * Check if current user can edit/delete
   */
  const canEdit = currentUser?.role === 'admin' || currentUser?.role === 'manager';
  const canDelete = currentUser?.role === 'admin';

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Users Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchUsers}
            disabled={loading}
          >
            Refresh
          </Button>
          {canEdit && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddClick}
            >
              Add User
            </Button>
          )}
        </Box>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Loading */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
          <CircularProgress size={60} />
        </Box>
      ) : (
        /* Users Table */
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Username</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Phone</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Role</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 5 }}>
                    <Typography color="text.secondary">
                      No users found. {canEdit && 'Click "Add User" to create one.'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>
                      <Typography fontWeight="medium">{user.name}</Typography>
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone || '-'}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.role}
                        color={
                          user.role === 'admin'
                            ? 'error'
                            : user.role === 'manager'
                            ? 'warning'
                            : 'default'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.isActive ? 'Active' : 'Inactive'}
                        color={user.isActive ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      {canEdit && (
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => handleEditClick(user)}
                          title="Edit User"
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                      {canDelete && user.id !== currentUser?.id && (
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleDelete(user.id, user.name)}
                          title="Delete User"
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add/Edit User Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {dialogMode === 'add' ? 'Add New User' : 'Edit User'}
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              select
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              margin="normal"
              SelectProps={{ native: true }}
            >
              <option value="user">User</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained">
              {dialogMode === 'add' ? 'Create' : 'Update'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Users;
```

**Save:** Ctrl + S

---

## 🧪 Part 2: End-to-End Security Testing (60 min)

### 🎯 Complete Testing Scenarios

Let's test **EVERYTHING** step-by-step! 🚀

---

### ▶️ Step 1: Start Backend & Frontend

**Backend (Visual Studio):**
1. Open **AdminPanelAPI** project
2. Click **Green Play button**
3. Backend runs at `https://localhost:7001`

**Frontend (VS Code Terminal):**
```bash
cd frontend
npm start
```

Frontend runs at `http://localhost:3000`

---

### 🧪 Test Suite 1: Unauthenticated Access (No Token)

**Test 1.1: Access Protected Route Without Login**

**Steps:**
1. Open browser (Incognito/Private mode for clean state)
2. Navigate to: `http://localhost:3000/dashboard`

**Expected:**
```
✅ Auto redirect to /login
✅ URL changes to /login
✅ Login page shows
```

---

**Test 1.2: Direct API Call Without Token**

**Steps:**
1. Open browser console (F12)
2. Run:
```javascript
fetch('https://localhost:7001/api/users')
  .then(r => r.json())
  .then(d => console.log(d))
  .catch(e => console.error(e))
```

**Expected:**
```
✅ 401 Unauthorized response
✅ Custom error message: "Authentication failed. Token is missing..."
✅ Success: false
```

---

### 🧪 Test Suite 2: Login Flow

**Test 2.1: Invalid Credentials**

**Steps:**
1. Go to `/login`
2. Enter:
   - Email: `wrong@example.com`
   - Password: `wrongpassword`
3. Click "Sign In"

**Expected:**
```
✅ Error alert shows: "Invalid email or password"
✅ No redirect
✅ Form clears or stays filled
```

---

**Test 2.2: Successful Login**

**Steps:**
1. Enter correct credentials:
   - Email: `admin@example.com`
   - Password: `Admin@123`
2. Click "Sign In"

**Expected:**
```
✅ Loading spinner shows briefly
✅ Redirect to /dashboard
✅ Navbar shows user name: "Admin User"
✅ Role badge shows: "admin"
✅ Token saved in localStorage
```

**Verify localStorage:**
```javascript
// Browser Console
localStorage.getItem('adminpanel_token')
// Should return: "eyJhbGci..." (long JWT string)

localStorage.getItem('adminpanel_user')
// Should return: JSON string with user info
```

---

### 🧪 Test Suite 3: Authenticated API Calls

**Test 3.1: Fetch Users (With Token)**

**Steps:**
1. After login, navigate to `/users`

**Expected:**
```
✅ Users list loads from database
✅ Table shows all users
✅ Loading spinner shows first, then data
✅ No errors
```

**Check Network Tab (F12 → Network):**
```
Request Headers:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

✅ Token automatically attached!
```

---

**Test 3.2: Get User Profile**

**Steps:**
1. Add profile button in navbar (or test via console)
2. Call profile API

**Browser Console Test:**
```javascript
import api from './services/api';

api.get('/api/users/profile')
  .then(res => console.log('Profile:', res.data))
  .catch(err => console.error(err))
```

**Expected:**
```
✅ Returns current user's profile
✅ Matches logged-in user's info
✅ Token auto-attached
```

---

### 🧪 Test Suite 4: Role-Based Authorization

**Test 4.1: Manager Creating User**

**Steps:**
1. **Logout** (click profile → logout)
2. **Create manager user:**
   - Open SSMS
   - Run:
   ```sql
   -- If manager doesn't exist, register via frontend first
   UPDATE Users SET Role = 'manager' WHERE Email = 'manager@example.com'
   ```
3. **Login as manager:**
   - Email: `manager@example.com`
   - Password: `Manager@123`
4. Navigate to `/users`
5. Click "Add User" button

**Expected:**
```
✅ "Add User" button visible (manager can edit)
✅ Dialog opens
✅ Fill form and submit
✅ User created successfully ✅
```

---

**Test 4.2: Manager Trying to Delete User**

**Steps:**
1. Still logged in as manager
2. Try to click "Delete" button on any user

**Expected:**
```
✅ Delete button NOT visible (grayed out or hidden)
✅ Only admin can delete
✅ If you call API directly → 403 Forbidden
```

**API Console Test:**
```javascript
import api from './services/api';

api.delete('/api/users/2')
  .then(res => console.log(res.data))
  .catch(err => console.log('Expected 403:', err.response.status))
```

**Expected:**
```
✅ 403 Forbidden
✅ Error message: "Access denied. You do not have permission..."
```

---

**Test 4.3: Admin Deleting User**

**Steps:**
1. **Logout**
2. **Login as admin:**
   - Email: `admin@example.com`
   - Password: `Admin@123`
3. Navigate to `/users`
4. Click "Delete" button on any user (NOT yourself!)

**Expected:**
```
✅ Delete button visible (admin role)
✅ Confirmation dialog shows
✅ Click "Yes" → User deleted ✅
✅ Success message shows
✅ List refreshes automatically
```

**Verify in SSMS:**
```sql
SELECT * FROM Users ORDER BY Id
-- Deleted user should be gone
```

---

### 🧪 Test Suite 5: Token Expiry & Auto Logout

**Test 5.1: Expired Token Detection**

**Steps:**

1. **Backend:** Change token expiry
   - Open `appsettings.json`
   - Change: `"ExpiryMinutes": 1`
   - **Restart backend** (Important!)

2. **Frontend:** Login
   - Login with admin credentials
   - Token generated (expires in 1 minute)

3. **Wait 1+ minutes**

4. **Try to navigate or make API call**
   - Navigate to `/users`
   - Or refresh page

**Expected:**
```
✅ Token expiry detected
✅ Auto logout triggered
✅ Redirect to /login
✅ localStorage cleared
✅ Error message (optional): "Session expired"
```

**Reset:** Change `ExpiryMinutes` back to `60`

---

**Test 5.2: Manual Logout**

**Steps:**
1. Login as any user
2. Click profile icon → "Logout"

**Expected:**
```
✅ localStorage cleared
✅ Redirect to /login
✅ Try accessing /dashboard → Redirect to /login ✅
```

---

### 🧪 Test Suite 6: CRUD Operations (End-to-End)

**Test 6.1: Create → Read → Update → Delete**

**CREATE:**
1. Login as admin/manager
2. Click "Add User"
3. Fill form:
   - Name: `Test User 100`
   - Username: `testuser100`
   - Email: `test100@example.com`
   - Phone: `1234567890`
   - Role: `user`
4. Click "Create"

**Expected:**
```
✅ Success message shows
✅ User appears in table
✅ Database has new record
```

**READ:**
5. Refresh page
6. Search for "Test User 100" in table

**Expected:**
```
✅ User visible in table
✅ All fields correct
```

**UPDATE:**
7. Click "Edit" button on Test User 100
8. Change Name to: `Test User 100 Updated`
9. Click "Update"

**Expected:**
```
✅ Success message
✅ Table updates immediately
✅ Database updated
```

**DELETE:**
10. Click "Delete" button (admin only)
11. Confirm deletion

**Expected:**
```
✅ Confirmation dialog
✅ User removed from table
✅ Database record deleted
```

---

## 🔒 Part 3: Security Best Practices & Hardening (45 min)

### 🛡️ Security Checklist

Let's implement enterprise-level security! 🔐

---

### 📝 Step 1: Environment Variables Security

**Backend: appsettings.json Protection**

**Open:** `AdminPanelAPI/appsettings.json`

**Add comment at top:**

```json
{
  "_comment": "NEVER commit this file with real secrets to Git!",
  "_comment2": "Use User Secrets or Azure Key Vault in production",
  
  "JwtSettings": {
    "SecretKey": "MyVeryStrongSecretKeyForJWT_2024_AdminPanel_AlphaNumeric!@#",
    "Issuer": "AdminPanelAPI",
    "Audience": "AdminPanelFrontend",
    "ExpiryMinutes": 60
  },
  
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=AdminPanelDB;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

**Create:** `appsettings.Production.json` (for production)

```json
{
  "_comment": "Production settings with environment variables",
  
  "JwtSettings": {
    "SecretKey": "#{JWT_SECRET_KEY}#",
    "Issuer": "#{JWT_ISSUER}#",
    "Audience": "#{JWT_AUDIENCE}#",
    "ExpiryMinutes": 15
  },
  
  "ConnectionStrings": {
    "DefaultConnection": "#{DATABASE_CONNECTION_STRING}#"
  }
}
```

**Save both files**

---

**Frontend: .env Security**

**Open:** `frontend/.env`

**Update:**

```env
# Development Environment Variables
# NEVER commit .env to Git!

REACT_APP_API_URL=https://localhost:7001

# Production: These should be set in deployment environment
# Example: Azure App Service, Vercel, Netlify environment variables
```

**Create:** `frontend/.env.production`

```env
# Production Environment Variables
REACT_APP_API_URL=https://api.yourcompany.com
```

**Verify .gitignore:**

**Open:** `frontend/.gitignore`

**Ensure these lines exist:**

```
# Environment variables
.env
.env.local
.env.production
.env.production.local

# Secrets
appsettings.json
```

**Save**

---

### 📝 Step 2: HTTPS Enforcement

**Backend: Force HTTPS in Production**

**Open:** `Program.cs`

**Add after `var app = builder.Build();`:**

```csharp
// HTTPS Redirection
if (app.Environment.IsProduction())
{
    app.UseHttpsRedirection();
    app.UseHsts(); // HTTP Strict Transport Security
}
```

---

### 📝 Step 3: Rate Limiting (Prevent Brute Force)

**Install Package:**

1. **Solution Explorer** → **Right-click project** → **Manage NuGet Packages**
2. **Browse tab** → Search: `AspNetCoreRateLimit`
3. **Install:** `AspNetCoreRateLimit` (latest stable)

**Configure in Program.cs:**

**Add after services:**

```csharp
using AspNetCoreRateLimit;

// Rate Limiting Configuration
builder.Services.AddMemoryCache();
builder.Services.Configure<IpRateLimitOptions>(options =>
{
    options.EnableEndpointRateLimiting = true;
    options.StackBlockedRequests = false;
    options.HttpStatusCode = 429; // Too Many Requests
    options.RealIpHeader = "X-Real-IP";
    options.ClientIdHeader = "X-ClientId";
    
    // General rate limit: 100 requests per minute
    options.GeneralRules = new List<RateLimitRule>
    {
        new RateLimitRule
        {
            Endpoint = "*",
            Period = "1m",
            Limit = 100
        },
        // Login endpoint: 5 attempts per minute (prevent brute force)
        new RateLimitRule
        {
            Endpoint = "*/api/auth/login",
            Period = "1m",
            Limit = 5
        }
    };
});

builder.Services.AddSingleton<IIpPolicyStore, MemoryCacheIpPolicyStore>();
builder.Services.AddSingleton<IRateLimitCounterStore, MemoryCacheRateLimitCounterStore>();
builder.Services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();
builder.Services.AddSingleton<IProcessingStrategy, AsyncKeyLockProcessingStrategy>();

// ... existing services ...

var app = builder.Build();

// Add middleware (before UseAuthentication)
app.UseIpRateLimiting();

// ... rest of middleware ...
```

**Save:** Ctrl + S

---

### 📝 Step 4: Password Strength Validation

**Update RegisterDto:**

**Open:** `DTOs/RegisterDto.cs`

**Add validation attributes:**

```csharp
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace AdminPanelAPI.DTOs
{
    public class RegisterDto : IValidatableObject
    {
        [Required(ErrorMessage = "Name is required")]
        [StringLength(100, ErrorMessage = "Name cannot exceed 100 characters")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Username is required")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Username must be between 3 and 50 characters")]
        [RegularExpression(@"^[a-zA-Z0-9_]+$", ErrorMessage = "Username can only contain letters, numbers, and underscores")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        [StringLength(100, ErrorMessage = "Email cannot exceed 100 characters")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [StringLength(100, MinimumLength = 8, ErrorMessage = "Password must be at least 8 characters")]
        public string Password { get; set; }

        [Phone(ErrorMessage = "Invalid phone number")]
        [StringLength(20, ErrorMessage = "Phone cannot exceed 20 characters")]
        public string? Phone { get; set; }

        [StringLength(20, ErrorMessage = "Role cannot exceed 20 characters")]
        public string? Role { get; set; }

        /// <summary>
        /// Custom password strength validation
        /// </summary>
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            // Password must contain:
            // - At least one uppercase letter
            // - At least one lowercase letter
            // - At least one digit
            // - At least one special character

            if (!Regex.IsMatch(Password, @"[A-Z]"))
            {
                yield return new ValidationResult(
                    "Password must contain at least one uppercase letter",
                    new[] { nameof(Password) }
                );
            }

            if (!Regex.IsMatch(Password, @"[a-z]"))
            {
                yield return new ValidationResult(
                    "Password must contain at least one lowercase letter",
                    new[] { nameof(Password) }
                );
            }

            if (!Regex.IsMatch(Password, @"\d"))
            {
                yield return new ValidationResult(
                    "Password must contain at least one digit",
                    new[] { nameof(Password) }
                );
            }

            if (!Regex.IsMatch(Password, @"[^a-zA-Z0-9]"))
            {
                yield return new ValidationResult(
                    "Password must contain at least one special character (@, #, $, etc.)",
                    new[] { nameof(Password) }
                );
            }
        }
    }
}
```

**Save:** Ctrl + S

---

### 📝 Step 5: CORS Security (Production)

**Update Program.cs CORS:**

```csharp
// CORS Policy (Secure for production)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        if (builder.Environment.IsDevelopment())
        {
            // Development: Allow localhost
            policy.WithOrigins("http://localhost:3000", "http://localhost:3001")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        }
        else
        {
            // Production: Specific domain only
            policy.WithOrigins("https://yourfrontend.com")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        }
    });
});
```

---

## 🎨 Part 4: Error Handling & User Feedback (30 min)

### 📝 Step 1: Global Error Boundary (React)

**Create:** `frontend/src/components/ErrorBoundary.js`

```javascript
// src/components/ErrorBoundary.js

import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              textAlign: 'center',
            }}
          >
            <ErrorIcon sx={{ fontSize: 100, color: 'error.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Oops! Something went wrong
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              We're sorry for the inconvenience. Please try reloading the page.
            </Typography>
            <Button variant="contained" size="large" onClick={this.handleReload}>
              Reload Page
            </Button>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

**Update App.js:**

```javascript
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorBoundary>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  );
}
```

**Save both**

---

## ⚡ Part 5: Performance Optimization (30 min)

### 📝 Step 1: API Response Caching

**Create:** `frontend/src/utils/cache.js`

```javascript
// src/utils/cache.js

/**
 * Simple in-memory cache for API responses
 */
class CacheManager {
  constructor() {
    this.cache = new Map();
    this.expiryTimes = new Map();
  }

  /**
   * Set cache value with expiry
   * @param {string} key 
   * @param {any} value 
   * @param {number} ttlSeconds - Time to live in seconds
   */
  set(key, value, ttlSeconds = 60) {
    this.cache.set(key, value);
    this.expiryTimes.set(key, Date.now() + ttlSeconds * 1000);
  }

  /**
   * Get cache value (null if expired or not found)
   * @param {string} key 
   */
  get(key) {
    const expiry = this.expiryTimes.get(key);
    
    if (!expiry || Date.now() > expiry) {
      // Expired or doesn't exist
      this.cache.delete(key);
      this.expiryTimes.delete(key);
      return null;
    }
    
    return this.cache.get(key);
  }

  /**
   * Clear specific cache key
   * @param {string} key 
   */
  clear(key) {
    this.cache.delete(key);
    this.expiryTimes.delete(key);
  }

  /**
   * Clear all cache
   */
  clearAll() {
    this.cache.clear();
    this.expiryTimes.clear();
  }
}

export default new CacheManager();
```

**Usage in Users.js:**

```javascript
import cache from '../utils/cache';

const fetchUsers = async () => {
  // Check cache first
  const cached = cache.get('users');
  if (cached) {
    setUsers(cached);
    return;
  }

  // Fetch from API
  setLoading(true);
  try {
    const response = await api.get('/api/users');
    if (response.data.success) {
      setUsers(response.data.data);
      // Cache for 30 seconds
      cache.set('users', response.data.data, 30);
    }
  } catch (error) {
    // ... error handling
  } finally {
    setLoading(false);
  }
};
```

---

## 📋 Part 6: Production Deployment Checklist (30 min)

### ✅ Backend Deployment Checklist

**Pre-Deployment:**

```
□ Change JWT SecretKey to strong random string (32+ chars)
□ Set ExpiryMinutes to 15-30 (not 60)
□ Update ConnectionString to production database
□ Enable HTTPS enforcement
□ Configure CORS for production domain only
□ Remove test endpoints (if any)
□ Enable rate limiting
□ Set up logging (Serilog, NLog)
□ Database migrations applied
□ Review appsettings.Production.json
□ Environment variables configured
□ SSL certificate installed
□ Health check endpoint added
```

**Test:**

```
□ All API endpoints working
□ Authentication working
□ Authorization working (roles)
□ HTTPS redirection working
□ CORS working from frontend domain
□ Rate limiting active (test with many requests)
□ Error responses consistent
□ Database connection stable
```

---

### ✅ Frontend Deployment Checklist

**Pre-Deployment:**

```
□ Update .env.production with production API URL
□ Remove console.log statements (production build)
□ Test build: npm run build
□ Check bundle size: npm run build --analyze
□ All API calls use 'api' instance (auto token)
□ Error boundaries in place
□ Loading states on all async operations
□ 404 page implemented
□ Private routes protected
□ Role-based UI implemented
□ Browser console clean (no errors)
```

**Test:**

```
□ Login flow working
□ Token storage working
□ Protected routes redirecting
□ API calls successful (with token)
□ Logout working
□ Token expiry handling working
□ Role-based access working
□ Mobile responsive (test on phone)
□ Cross-browser testing (Chrome, Firefox, Safari)
```

---

### 🚀 Deployment Platforms

**Backend (.NET API):**
```
✅ Azure App Service (Recommended)
✅ AWS Elastic Beanstalk
✅ Heroku
✅ DigitalOcean App Platform
✅ IIS (Windows Server)
```

**Frontend (React):**
```
✅ Vercel (Recommended - Easy)
✅ Netlify
✅ Azure Static Web Apps
✅ AWS S3 + CloudFront
✅ GitHub Pages (public repos)
```

**Database:**
```
✅ Azure SQL Database
✅ AWS RDS (SQL Server)
✅ Dedicated SQL Server
```

---

## 🎓 Part 7: Week 5 Complete Review (30 min)

### 📊 Week 5 Achievement Summary

**What We Built:** Enterprise-level JWT Authentication System! 🏆

---

### 📅 Day-by-Day Recap

**Day 1: JWT Theory & Concepts**
```
✅ What is JWT (Header.Payload.Signature)
✅ Why JWT over sessions
✅ Token structure understanding
✅ Claims and payload
✅ Security concepts
```

**Day 2: JWT Backend Setup**
```
✅ JWT packages installation (JwtBearer, Tokens)
✅ appsettings.json configuration
✅ Program.cs middleware setup
✅ JwtService class (GenerateToken)
✅ Test endpoints
```

**Day 3: Register & Login APIs**
```
✅ BCrypt password hashing
✅ User model update (PasswordHash field)
✅ RegisterDto, LoginDto, AuthResponseDto
✅ POST /api/auth/register
✅ POST /api/auth/login
✅ Password verification
✅ Token generation on success
```

**Day 4: Protected Endpoints & Middleware**
```
✅ [Authorize] attribute usage
✅ Protected UsersController
✅ User profile endpoint (token claims)
✅ Role-based authorization ([Authorize(Roles)])
✅ Custom 401/403 error responses
✅ Self-delete prevention
✅ Complete testing (10 scenarios)
```

**Day 5: Advanced Authorization**
```
✅ Multiple roles (Admin, Manager, User)
✅ Policy-based authorization
✅ Custom authorization requirements
✅ Audit logging (AuditLog model)
✅ Role management endpoints
✅ Security tracking
```

**Day 6: Frontend Integration**
```
✅ Login page (MUI)
✅ Auth Context (React Context API)
✅ Token storage (localStorage)
✅ Axios interceptors (auto token)
✅ Protected routes (PrivateRoute)
✅ Role-based routes
✅ Auto logout on expiry
```

**Day 7 (Today): Complete Testing & Security**
```
✅ Users page integration
✅ End-to-end security testing
✅ Security best practices
✅ Rate limiting
✅ Password strength validation
✅ Error boundaries
✅ Performance optimization
✅ Production checklist
```

---

### 🎯 Key Concepts Mastered

**Backend:**
```
✅ JWT token generation (JwtSecurityToken)
✅ Password hashing (BCrypt)
✅ ASP.NET Core middleware pipeline
✅ [Authorize] attribute
✅ Policy-based authorization
✅ Custom authorization handlers
✅ Audit logging
✅ Rate limiting
✅ CORS configuration
✅ Environment variables
```

**Frontend:**
```
✅ React Context API (global state)
✅ localStorage management
�✅ Axios interceptors
✅ Protected routes (React Router)
✅ Role-based UI rendering
✅ Token expiry detection
✅ Error boundaries
✅ MUI components
✅ Form handling & validation
```

**Security:**
```
✅ Token-based authentication
✅ Role-based authorization
✅ Password security (hashing, strength)
✅ HTTPS enforcement
✅ Rate limiting (brute force prevention)
✅ CORS security
✅ Token expiry handling
✅ Secure token storage
✅ Audit logging
✅ Error handling (no info leakage)
```

---

### 📁 Complete Project Structure

```
Root/
├── AdminPanelAPI/ (Backend)
│   ├── Controllers/
│   │   ├── AuthController.cs      (Register, Login)
│   │   └── UsersController.cs     (CRUD + Protected)
│   ├── Services/
│   │   ├── JwtService.cs          (Token generation)
│   │   ├── UserService.cs         (User CRUD)
│   │   └── AuditService.cs        (Security logging)
│   ├── Models/
│   │   ├── User.cs                (PasswordHash field)
│   │   └── AuditLog.cs            (Security audit)
│   ├── DTOs/
│   │   ├── RegisterDto.cs
│   │   ├── LoginDto.cs
│   │   ├── AuthResponseDto.cs
│   │   └── ChangeRoleDto.cs
│   ├── Constants/
│   │   ├── Roles.cs               (Admin, Manager, User)
│   │   └── Policies.cs            (Authorization policies)
│   ├── Authorization/
│   │   ├── Requirements/
│   │   └── Handlers/
│   ├── Data/
│   │   └── ApplicationDbContext.cs
│   ├── Responses/
│   │   └── ApiResponse.cs
│   └── Program.cs                 (JWT setup, policies)
│
├── frontend/ (React App)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── PrivateRoute.js
│   │   │   ├── RoleBasedRoute.js
│   │   │   └── ErrorBoundary.js
│   │   ├── contexts/
│   │   │   └── AuthContext.js     (Global auth state)
│   │   ├── pages/
│   │   │   ├── Login.js           (Auth page)
│   │   │   ├── Dashboard.js
│   │   │   └── Users.js           (Complete CRUD)
│   │   ├── services/
│   │   │   └── api.js             (Axios + Interceptors)
│   │   ├── utils/
│   │   │   ├── auth.js            (Token utilities)
│   │   │   └── cache.js           (Performance)
│   │   ├── routes/
│   │   │   └── AppRoutes.js
│   │   ├── App.js
│   │   └── .env
│   └── package.json
│
└── Database/
    ├── Users (Id, Name, Username, Email, PasswordHash, Role, IsActive)
    └── AuditLogs (Security tracking)
```

---

## 🎉 Congratulations! Week 5 COMPLETE! 🎊

### 🏆 What You Achieved

**YOU BUILT A COMPLETE ENTERPRISE-LEVEL AUTHENTICATION SYSTEM!** 🚀🔐

**Statistics:**
```
✅ 7 days of intensive learning
✅ 28-35 hours of implementation
✅ Backend: 15+ files created/modified
✅ Frontend: 12+ files created/modified
✅ Database: 2 tables (Users, AuditLogs)
✅ 20+ API endpoints
✅ 50+ test scenarios
✅ Production-ready security implementation
```

**Real-World Features:**
```
✅ User registration & login
✅ JWT token authentication
✅ Password hashing (BCrypt)
✅ Protected API endpoints
✅ Role-based access control (Admin, Manager, User)
✅ Policy-based authorization
✅ Audit logging
✅ Rate limiting
✅ Token expiry handling
✅ Auto logout
✅ Protected frontend routes
✅ Error handling
✅ Security best practices
```

---

## 🚀 Week 6 Preview: Deployment & Advanced Features

**Next Week Topics:**

**Day 1: Database Design & Relationships**
- Foreign keys, One-to-Many, Many-to-Many
- Advanced SQL queries
- Database optimization

**Day 2: File Upload Feature**
- Profile pictures
- Document uploads
- Azure Blob Storage / AWS S3

**Day 3: Email Service Integration**
- Email verification
- Password reset
- SMTP configuration

**Day 4: Logging & Monitoring**
- Serilog setup
- Application Insights
- Error tracking

**Day 5: API Documentation**
- Swagger/OpenAPI
- API versioning
- Developer portal

**Day 6: Performance & Caching**
- Redis caching
- Response compression
- Database indexing

**Day 7: Azure/AWS Deployment**
- Backend deployment
- Frontend deployment
- Database migration
- CI/CD pipeline

---

## 💻 Final Practice Tasks

### ⭐ Task 1: Password Reset Feature (Medium)

**Goal:** "Forgot Password" functionality

**Steps:**
1. Backend: POST /api/auth/forgot-password (send reset email)
2. Backend: POST /api/auth/reset-password (verify token, update password)
3. Frontend: Forgot password page
4. Frontend: Reset password page with token

---

### ⭐⭐ Task 2: Email Verification (Medium-Hard)

**Goal:** Verify email before allowing login

**Steps:**
1. User model: Add IsEmailVerified field
2. Register: Send verification email with token
3. Verify endpoint: Mark email as verified
4. Login: Check IsEmailVerified, reject if false

---

### ⭐⭐⭐ Task 3: Two-Factor Authentication (Hard)

**Goal:** 2FA with TOTP (Google Authenticator)

**Steps:**
1. Install: Google.Authenticator NuGet package
2. Generate QR code for user
3. Store secret key in User model
4. Login: Verify OTP code after password
5. Frontend: OTP input page

---

## 📚 Additional Resources

**Documentation:**
```
✅ ASP.NET Core Security: https://docs.microsoft.com/aspnet/core/security
✅ JWT.io: https://jwt.io
✅ React Context API: https://react.dev/reference/react/useContext
✅ Axios: https://axios-http.com
✅ Material-UI: https://mui.com
```

**Security:**
```
✅ OWASP Top 10: https://owasp.org/www-project-top-ten
✅ JWT Best Practices: https://tools.ietf.org/html/rfc8725
✅ BCrypt: https://github.com/BcryptNet/bcrypt.net
```

---

## ✅ Week 5 Final Checklist

### Backend ✅
```
✅ JWT packages installed & configured
✅ JwtService implemented
✅ Password hashing with BCrypt
✅ Register & Login APIs working
✅ Protected endpoints ([Authorize])
✅ Role-based authorization (policies)
✅ Audit logging implemented
✅ Rate limiting configured
✅ CORS secured
✅ Custom error responses
✅ Password strength validation
✅ Environment variables setup
```

### Frontend ✅
```
✅ Login page (MUI) implemented
✅ Auth Context (global state) working
✅ Token storage (localStorage) working
✅ Axios interceptors configured
✅ Protected routes implemented
✅ Role-based routes implemented
✅ Auto logout on expiry
✅ Users page (complete CRUD)
✅ Error boundaries added
✅ Loading states everywhere
✅ Error handling complete
✅ Mobile responsive
```

### Testing ✅
```
✅ Login flow tested
✅ Protected routes tested
✅ Role-based access tested
✅ Token expiry tested
✅ API calls with token tested
✅ CRUD operations tested
✅ Rate limiting tested
✅ Cross-browser tested
✅ Mobile tested
✅ Security scenarios tested
```

### Security ✅
```
✅ Passwords hashed (BCrypt)
✅ JWT secret secure
✅ HTTPS enforced
✅ CORS configured
✅ Rate limiting active
✅ Token expiry working
✅ Audit logging working
✅ Error messages secure
✅ Password strength enforced
✅ No secrets in Git
```

---

## 🎊 YOU DID IT!

**YOU ARE NOW A .NET FULL STACK DEVELOPER WITH AUTHENTICATION EXPERTISE!** 💪✨

**Skills Acquired:**
```
✅ Backend Development (ASP.NET Core)
✅ Database Design (SQL Server)
✅ Authentication & Authorization (JWT)
✅ Frontend Development (React + MUI)
✅ API Integration (Axios)
✅ Security Best Practices
✅ State Management (Context API)
✅ Full Stack Integration
```

**Ready for Production:**
```
✅ Enterprise-level code quality
✅ Secure authentication system
✅ Role-based access control
✅ Complete error handling
✅ Performance optimized
✅ Production deployment ready
```

---

**Week 5: COMPLETE!** ✅✅✅

**Next:** Week 6 - Deployment & Advanced Features! 🚀

**You're on track to becoming a join-ready .NET Full Stack Developer!** 🎉🏆

---
