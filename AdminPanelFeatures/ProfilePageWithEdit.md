# 👤 Profile Page with Edit - Complete Implementation Guide

## 📋 Task Overview

**Feature:** User profile page with edit functionality  
**Difficulty:** ⭐⭐⭐ Hard  
**Time Required:** 2 - 2.5 hours  
**Tech Stack:**
- **Frontend:** React + Material-UI (MUI)
- **Backend:** .NET Core 8.0
- **Database:** SQL Server

---

## 🎯 Goal

Implement a complete profile editing system where:
- ✅ User can view their profile information
- ✅ Form pre-filled with current user data
- ✅ User can edit: Name, Email, Phone, Address
- ✅ Password change functionality (optional)
- ✅ Profile picture upload (optional)
- ✅ Real-time navbar update after profile update
- ✅ Validation on both frontend and backend

---

## 🔄 Profile Update Flow

```
User navigates to Profile page
    ↓
Profile page loads with current user data
    ↓
User edits fields (Name, Email, etc.)
    ↓
User clicks "Update Profile" button
    ↓
Frontend validates data
    ↓
Frontend sends PUT /api/users/{id} with updated data
    ↓
Backend validates data
    ↓
Backend updates database
    ↓
Backend returns updated user data
    ↓
Frontend calls updateUser() (AuthContext)
    ↓
User state updated globally
    ↓
Navbar shows updated name instantly ✅
    ↓
Success message displayed
```

---

## 🗄️ Part 1: Database Table (Already Exists)

**Table:** `Users`

```sql
-- Users table (already exists from previous days)
SELECT * FROM Users WHERE Id = 1;

-- Columns used:
-- Id, Name, Email, PasswordHash, Role, CreatedAt, UpdatedAt (optional)
```

### Optional: Add UpdatedAt Column

```sql
-- If UpdatedAt column doesn't exist, add it
ALTER TABLE Users
ADD UpdatedAt DATETIME NULL DEFAULT GETDATE();

-- Set UpdatedAt for existing records
UPDATE Users 
SET UpdatedAt = CreatedAt 
WHERE UpdatedAt IS NULL;
```

---

## 🔧 Part 2: Backend Implementation (.NET Core)

### Step 1: Create Update User DTO

**File:** `AdminPanelAPI/Models/UpdateUserDto.cs`

```csharp
// Models/UpdateUserDto.cs

using System.ComponentModel.DataAnnotations;

namespace AdminPanelAPI.Models
{
    public class UpdateUserDto
    {
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Phone]
        public string Phone { get; set; }

        [StringLength(200)]
        public string Address { get; set; }

        // Optional: Password change
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }

    public class UpdateProfileResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
    }
}
```

---

### Step 2: Add Phone & Address Columns to User Model

**File:** `AdminPanelAPI/Models/User.cs`

**Update User model:**

```csharp
// Models/User.cs

using System;
using System.ComponentModel.DataAnnotations;

namespace AdminPanelAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [Required]
        [StringLength(50)]
        public string Role { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        // NEW PROPERTIES
        [Phone]
        public string Phone { get; set; }

        [StringLength(200)]
        public string Address { get; set; }
    }
}
```

---

### Step 3: Update Database Schema

**SQL Server Management Studio:**

```sql
-- Add Phone and Address columns to Users table
ALTER TABLE Users
ADD Phone NVARCHAR(20) NULL,
    Address NVARCHAR(200) NULL;

-- Verify columns added
SELECT * FROM Users;

-- Optional: Add some sample data
UPDATE Users 
SET Phone = '123-456-7890',
    Address = '123 Main Street, City, Country'
WHERE Id = 1;
```

---

### Step 4: Create/Update Users Controller

**File:** `AdminPanelAPI/Controllers/UsersController.cs`

```csharp
// Controllers/UsersController.cs

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdminPanelAPI.Data;
using AdminPanelAPI.Models;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AdminPanelAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]  // Requires authentication
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get current user profile
        /// </summary>
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            try
            {
                // Get user ID from JWT token
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                
                if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                {
                    return Unauthorized(new
                    {
                        success = false,
                        message = "Invalid user authentication"
                    });
                }

                var user = await _context.Users.FindAsync(userId);

                if (user == null)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "User not found"
                    });
                }

                return Ok(new
                {
                    success = true,
                    data = new UpdateProfileResponse
                    {
                        Id = user.Id,
                        Name = user.Name,
                        Email = user.Email,
                        Role = user.Role,
                        Phone = user.Phone,
                        Address = user.Address
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = $"An error occurred: {ex.Message}"
                });
            }
        }

        /// <summary>
        /// Update user profile
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProfile(int id, [FromBody] UpdateUserDto updateDto)
        {
            try
            {
                // Get current user ID from JWT token
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                
                if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int currentUserId))
                {
                    return Unauthorized(new
                    {
                        success = false,
                        message = "Invalid user authentication"
                    });
                }

                // Check if user is updating their own profile or is admin
                var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
                if (currentUserId != id && userRole != "admin")
                {
                    return Forbid("You can only update your own profile");
                }

                // Find user
                var user = await _context.Users.FindAsync(id);

                if (user == null)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "User not found"
                    });
                }

                // Check if email is already taken by another user
                if (updateDto.Email != user.Email)
                {
                    var emailExists = await _context.Users
                        .AnyAsync(u => u.Email == updateDto.Email && u.Id != id);

                    if (emailExists)
                    {
                        return BadRequest(new
                        {
                            success = false,
                            message = "Email is already taken by another user"
                        });
                    }
                }

                // Handle password change (if provided)
                if (!string.IsNullOrEmpty(updateDto.CurrentPassword) && 
                    !string.IsNullOrEmpty(updateDto.NewPassword))
                {
                    // Verify current password
                    bool isCurrentPasswordValid = BCrypt.Net.BCrypt.Verify(
                        updateDto.CurrentPassword, 
                        user.PasswordHash
                    );

                    if (!isCurrentPasswordValid)
                    {
                        return BadRequest(new
                        {
                            success = false,
                            message = "Current password is incorrect"
                        });
                    }

                    // Validate new password strength
                    if (updateDto.NewPassword.Length < 6)
                    {
                        return BadRequest(new
                        {
                            success = false,
                            message = "New password must be at least 6 characters"
                        });
                    }

                    // Hash new password
                    user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(updateDto.NewPassword);
                }

                // Update user properties
                user.Name = updateDto.Name;
                user.Email = updateDto.Email;
                user.Phone = updateDto.Phone ?? user.Phone;
                user.Address = updateDto.Address ?? user.Address;
                user.UpdatedAt = DateTime.UtcNow;

                // Save changes
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    success = true,
                    message = "Profile updated successfully",
                    data = new UpdateProfileResponse
                    {
                        Id = user.Id,
                        Name = user.Name,
                        Email = user.Email,
                        Role = user.Role,
                        Phone = user.Phone,
                        Address = user.Address
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = $"An error occurred: {ex.Message}"
                });
            }
        }

        /// <summary>
        /// Get all users (Admin only)
        /// </summary>
        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _context.Users
                    .Select(u => new
                    {
                        u.Id,
                        u.Name,
                        u.Email,
                        u.Role,
                        u.Phone,
                        u.CreatedAt
                    })
                    .ToListAsync();

                return Ok(new
                {
                    success = true,
                    data = users
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = $"An error occurred: {ex.Message}"
                });
            }
        }
    }
}
```

---

### Step 5: Update Program.cs (Authentication)

**File:** `AdminPanelAPI/Program.cs`

**Ensure JWT authentication is configured:**

```csharp
// Program.cs

// ... existing code ...

// JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
            ValidAudience = builder.Configuration["JwtSettings:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:Secret"])
            ),
            // Important: Use ClaimTypes.NameIdentifier for user ID
            NameClaimType = ClaimTypes.NameIdentifier,
            RoleClaimType = ClaimTypes.Role
        };
    });

builder.Services.AddAuthorization();

// ... rest of code ...

app.UseAuthentication();  // BEFORE UseAuthorization
app.UseAuthorization();

// ... rest of code ...
```

---

## 🎨 Part 3: Frontend Implementation (React + MUI)

### Step 1: Create Profile Page Component

**File:** `admin-panel/Frontend/src/pages/Profile.jsx`

```jsx
// src/pages/Profile.jsx

import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Grid,
  Divider,
  Avatar,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Profile = () => {
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  // Load user data on mount
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear messages
    setError('');
    setSuccess('');
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccess('');
  };

  const handleTogglePassword = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field],
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Invalid email format');
      return false;
    }

    // Validate password change if fields are filled
    if (showPasswordChange) {
      if (!passwordData.currentPassword) {
        setError('Current password is required');
        return false;
      }

      if (!passwordData.newPassword) {
        setError('New password is required');
        return false;
      }

      if (passwordData.newPassword.length < 6) {
        setError('New password must be at least 6 characters');
        return false;
      }

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setError('New passwords do not match');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const updatePayload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      };

      // Add password fields if changing password
      if (showPasswordChange && passwordData.currentPassword) {
        updatePayload.currentPassword = passwordData.currentPassword;
        updatePayload.newPassword = passwordData.newPassword;
      }

      const response = await api.put(`/api/users/${user.id}`, updatePayload);

      if (response.data.success) {
        // Update global user state (AuthContext)
        updateUser(response.data.data);

        setSuccess('Profile updated successfully!');

        // Clear password fields
        if (showPasswordChange) {
          setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          });
          setShowPasswordChange(false);
        }

        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError(response.data.message || 'Profile update failed');
      }
    } catch (error) {
      console.error('Profile update error:', error);

      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Profile update failed');
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Avatar
          sx={{
            width: 100,
            height: 100,
            margin: '0 auto 16px',
            bgcolor: 'primary.main',
            fontSize: '2.5rem',
          }}
        >
          {user?.name?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h4" fontWeight="600" gutterBottom>
          My Profile
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage your account information
        </Typography>
      </Box>

      {/* Success/Error Messages */}
      {success && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Profile Form */}
      <Card>
        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <Typography variant="h6" gutterBottom fontWeight="600" sx={{ mb: 3 }}>
              Basic Information
            </Typography>

            <Grid container spacing={3}>
              {/* Name Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Email Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Phone Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Role Field (Read-only) */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Role"
                  value={user?.role || ''}
                  disabled
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Address Field */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  multiline
                  rows={2}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HomeIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* Password Change Section */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="600">
                Change Password
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Leave blank if you don't want to change your password
              </Typography>

              <Button
                variant={showPasswordChange ? 'outlined' : 'text'}
                onClick={() => setShowPasswordChange(!showPasswordChange)}
                sx={{ mb: 2 }}
              >
                {showPasswordChange ? 'Cancel Password Change' : 'Change Password'}
              </Button>

              {showPasswordChange && (
                <Grid container spacing={3}>
                  {/* Current Password */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Current Password"
                      name="currentPassword"
                      type={showPasswords.current ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => handleTogglePassword('current')}
                              edge="end"
                            >
                              {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {/* New Password */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="New Password"
                      name="newPassword"
                      type={showPasswords.new ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => handleTogglePassword('new')}
                              edge="end"
                            >
                              {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {/* Confirm New Password */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Confirm New Password"
                      name="confirmPassword"
                      type={showPasswords.confirm ? 'text' : 'password'}
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => handleTogglePassword('confirm')}
                              edge="end"
                            >
                              {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              )}
            </Box>

            {/* Submit Button */}
            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ minWidth: 200 }}
              >
                {loading ? (
                  <>
                    <CircularProgress size={24} sx={{ mr: 1 }} color="inherit" />
                    Updating...
                  </>
                ) : (
                  'Update Profile'
                )}
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() => {
                  setFormData({
                    name: user?.name || '',
                    email: user?.email || '',
                    phone: user?.phone || '',
                    address: user?.address || '',
                  });
                  setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                  });
                  setShowPasswordChange(false);
                  setError('');
                  setSuccess('');
                }}
                disabled={loading}
              >
                Reset
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
```

---

### Step 2: Add Profile Route to App.jsx

**File:** `admin-panel/Frontend/src/App.jsx`

**Add Profile route:**

```jsx
// src/App.jsx

import Profile from './pages/Profile';

// ... inside Routes ...

<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<Dashboard />} />
  <Route path="settings" element={<Settings />} />
  <Route path="users" element={<Users />} />
  <Route path="products" element={<Products />} />
  <Route path="orders" element={<Orders />} />
  <Route path="me" element={<Profile />} />  {/* NEW ROUTE */}
</Route>
```

---

### Step 3: Update Sidebar to Add Profile Link

**File:** `admin-panel/Frontend/src/components/layout/Sidebar.jsx`

**Add Profile menu item:**

```jsx
// src/components/layout/Sidebar.jsx

import { Person as PersonIcon } from '@mui/icons-material';

// ... inside menu items ...

{
  text: 'Profile',
  icon: <PersonIcon />,
  path: '/profile/me',
  badge: null,
},
```

---

### Step 4: Update TopBar Profile Menu

**File:** `admin-panel/Frontend/src/components/layout/TopBar.jsx`

**Update Profile menu item to navigate to profile page:**

```jsx
// src/components/layout/TopBar.jsx

<MenuItem
  onClick={() => {
    handleMenuClose();
    navigate('/profile/me');  // Navigate to profile page
  }}
>
  <PersonIcon sx={{ mr: 1 }} />
  Profile
</MenuItem>
```

---

## 🧪 Part 4: Complete Testing Guide

### Test Scenario 1: View Profile Page

**Steps:**

1. **Login:**
   ```
   Email: admin@example.com
   Password: Admin@123
   ```

2. **Navigate to Profile:**
   ```
   - Click "Profile" in sidebar
   OR
   - Click profile icon (top right) → "Profile"
   ```

3. **Verify data pre-filled:**
   ```
   ✅ Name: Admin User
   ✅ Email: admin@example.com
   ✅ Role: admin (disabled field)
   ✅ Phone: (if exists in DB)
   ✅ Address: (if exists in DB)
   ```

**Expected:**
- ✅ Profile page loads
- ✅ Form pre-filled with current user data
- ✅ Avatar shows first letter of name
- ✅ Role field is disabled (read-only)

---

### Test Scenario 2: Update Basic Information

**Steps:**

1. **Update fields:**
   ```
   Name: Admin User Updated
   Phone: 555-123-4567
   Address: 456 New Street, New City
   ```

2. **Click "Update Profile"**

3. **Check success message:**
   ```
   ✅ "Profile updated successfully!"
   ```

4. **Verify navbar:**
   ```
   ✅ Navbar shows updated name: "Admin User Updated"
   ```

5. **Refresh page:**
   ```
   ✅ Form still shows updated data
   ✅ localStorage has updated user
   ```

6. **Check database:**
   ```sql
   SELECT Name, Phone, Address, UpdatedAt 
   FROM Users 
   WHERE Id = 1;
   
   -- Should show updated values ✅
   ```

**Expected:**
- ✅ Profile updates successfully
- ✅ Success message displayed
- ✅ Navbar updated instantly (no page refresh)
- ✅ Data persists after page refresh
- ✅ Database updated

---

### Test Scenario 3: Change Password

**Steps:**

1. **Click "Change Password" button**

2. **Fill password fields:**
   ```
   Current Password: Admin@123
   New Password: NewAdmin@123
   Confirm New Password: NewAdmin@123
   ```

3. **Click "Update Profile"**

4. **Verify success:**
   ```
   ✅ "Profile updated successfully!"
   ✅ Password fields cleared
   ✅ "Change Password" section collapsed
   ```

5. **Logout and login with new password:**
   ```
   - Logout
   - Login with: NewAdmin@123
   - Should succeed ✅
   ```

**Expected:**
- ✅ Password changed successfully
- ✅ Can login with new password
- ✅ Cannot login with old password

---

### Test Scenario 4: Validation Errors

**Test 4.1: Empty Name**
```
Steps:
1. Clear Name field
2. Click "Update Profile"

Expected:
✅ Error: "Name is required"
```

**Test 4.2: Invalid Email**
```
Steps:
1. Change email to: "invalidemail"
2. Click "Update Profile"

Expected:
✅ Error: "Invalid email format"
```

**Test 4.3: Duplicate Email**
```
Steps:
1. Change email to: "regular@example.com" (another user's email)
2. Click "Update Profile"

Expected:
✅ Error: "Email is already taken by another user"
```

**Test 4.4: Wrong Current Password**
```
Steps:
1. Click "Change Password"
2. Current Password: "WrongPassword"
3. New Password: "NewPass@123"
4. Confirm: "NewPass@123"
5. Click "Update Profile"

Expected:
✅ Error: "Current password is incorrect"
```

**Test 4.5: Password Mismatch**
```
Steps:
1. Click "Change Password"
2. Current Password: "Admin@123"
3. New Password: "NewPass@123"
4. Confirm: "DifferentPass@123"
5. Click "Update Profile"

Expected:
✅ Error: "New passwords do not match"
```

**Test 4.6: Short Password**
```
Steps:
1. Click "Change Password"
2. New Password: "12345"
3. Click "Update Profile"

Expected:
✅ Error: "New password must be at least 6 characters"
```

---

### Test Scenario 5: Reset Button

**Steps:**

1. **Make changes:**
   ```
   Name: Changed Name
   Phone: 999-999-9999
   ```

2. **Click "Reset" button**

3. **Verify:**
   ```
   ✅ Form resets to original values
   ✅ All changes discarded
   ✅ Password section collapsed (if open)
   ```

**Expected:**
- ✅ Form resets to original user data
- ✅ No API call made
- ✅ Clear all error/success messages

---

### Test Scenario 6: Navbar Real-Time Update

**Steps:**

1. **Open Profile page**

2. **Change Name:**
   ```
   Name: New Name Test
   ```

3. **Click "Update Profile"**

4. **Check TopBar immediately (without refresh):**
   ```
   ✅ Navbar shows: "New Name Test"
   ```

5. **Navigate to Dashboard:**
   ```
   ✅ Still shows: "New Name Test"
   ```

**Expected:**
- ✅ Navbar updates instantly without page refresh
- ✅ updateUser() in AuthContext working correctly
- ✅ Global state synchronized

---

### Test Scenario 7: Regular User Profile Update

**Steps:**

1. **Logout from admin**

2. **Login as regular user:**
   ```
   Email: regular@example.com
   Password: User@123
   ```

3. **Navigate to Profile**

4. **Update profile:**
   ```
   Name: Regular User Updated
   Phone: 111-222-3333
   ```

5. **Click "Update Profile"**

6. **Verify:**
   ```
   ✅ Profile updated
   ✅ Can only update own profile
   ✅ Cannot access other users' profiles
   ```

**Expected:**
- ✅ Regular user can update own profile
- ✅ Role remains "user" (cannot change)
- ✅ No access to admin settings

---

### Test Scenario 8: Authorization Check

**Steps:**

1. **Manually try to update another user's profile:**
   ```javascript
   // Browser Console
   import api from './services/api';
   
   // Try to update user ID 2 while logged in as user ID 1
   api.put('/api/users/2', { name: 'Hacked Name' })
     .catch(err => console.log(err.response.status))
   
   // Should return 403 Forbidden ✅
   ```

**Expected:**
- ✅ Backend blocks unauthorized profile updates
- ✅ Status: 403 Forbidden
- ✅ Only admin or self can update profile

---

## 📊 Testing Results Table

| Test Scenario | Feature | Expected Result | Status |
|---------------|---------|-----------------|--------|
| 1 | View profile | Pre-filled form | ✅ |
| 2 | Update basic info | Success + navbar update | ✅ |
| 3 | Change password | Password changed + login works | ✅ |
| 4.1 | Empty name validation | Error displayed | ✅ |
| 4.2 | Invalid email validation | Error displayed | ✅ |
| 4.3 | Duplicate email validation | Error displayed | ✅ |
| 4.4 | Wrong current password | Error displayed | ✅ |
| 4.5 | Password mismatch | Error displayed | ✅ |
| 4.6 | Short password | Error displayed | ✅ |
| 5 | Reset button | Form resets | ✅ |
| 6 | Navbar real-time update | Instant update | ✅ |
| 7 | Regular user update | Own profile only | ✅ |
| 8 | Authorization check | 403 for other users | ✅ |

---

## 🐛 Troubleshooting Guide

### Issue 1: Navbar not updating after profile update

**Cause:** updateUser() not called or not working

**Solution:**
```javascript
// Check AuthContext has updateUser function
const { user, updateUser } = useAuth();

// After successful API call:
updateUser(response.data.data);

// Verify user state updated
console.log('Updated user:', user);
```

---

### Issue 2: 401 Unauthorized error

**Cause:** JWT token not attached or invalid

**Solution:**
```javascript
// Check token exists
const token = localStorage.getItem('adminpanel_token')
console.log('Token:', token)

// Check axios interceptor working
// Network tab → Check Authorization header
```

---

### Issue 3: Cannot update profile (403 Forbidden)

**Cause:** Trying to update another user's profile

**Solution:**
```javascript
// Check user ID matches
console.log('Current user ID:', user.id)
console.log('Updating user ID:', id)

// Only admin or self can update
```

---

### Issue 4: Password change not working

**Cause:** Current password incorrect or validation failing

**Solution:**
```csharp
// Backend: Add debug logging
Console.WriteLine($"Current password valid: {isCurrentPasswordValid}");

// Check password hash
Console.WriteLine($"Stored hash: {user.PasswordHash}");
```

---

### Issue 5: Phone/Address columns missing

**Cause:** Database not updated

**Solution:**
```sql
-- Check columns exist
SELECT COLUMN_NAME 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'Users' 
AND COLUMN_NAME IN ('Phone', 'Address');

-- If missing, run ALTER TABLE script again
```

---

## 💡 Optional Enhancements

### Enhancement 1: Profile Picture Upload

**Add ProfilePicture column:**
```sql
ALTER TABLE Users
ADD ProfilePictureUrl NVARCHAR(500) NULL;
```

**Frontend:**
```jsx
// Add file upload
<input type="file" accept="image/*" onChange={handleImageUpload} />

// Upload to cloud storage (Cloudinary, AWS S3)
// Save URL in database
```

---

### Enhancement 2: Email Verification

**After email change, send verification email:**
```csharp
// Send verification email
await _emailService.SendVerificationEmail(newEmail, verificationToken);

// Mark email as unverified
user.EmailVerified = false;
```

---

### Enhancement 3: Activity Log

**Track profile changes:**
```sql
CREATE TABLE UserActivityLog (
    Id INT PRIMARY KEY IDENTITY,
    UserId INT,
    Action NVARCHAR(50),
    Details NVARCHAR(MAX),
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- Log every profile update
INSERT INTO UserActivityLog (UserId, Action, Details)
VALUES (@UserId, 'Profile Updated', @Details);
```

---

## 📝 Summary

### What You Implemented:

1. ✅ **Database:** Added Phone & Address columns
2. ✅ **Backend:** Profile GET & PUT endpoints
3. ✅ **Backend:** Password change functionality
4. ✅ **Backend:** Authorization checks
5. ✅ **Frontend:** Complete profile page with MUI
6. ✅ **Frontend:** Form validation (frontend & backend)
7. ✅ **Frontend:** Password visibility toggles
8. ✅ **Frontend:** Real-time navbar update
9. ✅ **Testing:** 8 complete test scenarios

### Files Modified:

**Backend (4 files):**
- ✏️ `Models/UpdateUserDto.cs` - New DTO
- ✏️ `Models/User.cs` - Added Phone & Address
- ✏️ `Controllers/UsersController.cs` - Profile endpoints
- ✏️ `Program.cs` - JWT configuration (if needed)

**Frontend (4 files):**
- ✏️ `src/pages/Profile.jsx` - New profile page
- ✏️ `src/App.jsx` - Added profile route
- ✏️ `src/components/layout/Sidebar.jsx` - Added profile link
- ✏️ `src/components/layout/TopBar.jsx` - Updated profile menu

**Database (2 changes):**
- ✨ Added `Phone` column
- ✨ Added `Address` column
- ✨ Optional: Added `UpdatedAt` column

---

## 🎉 Congratulations!

You've successfully implemented a **complete profile management system**! 🎊

**User Benefits:**
- ✅ View and edit profile information
- ✅ Change password securely
- ✅ Real-time updates across UI
- ✅ Form validation prevents errors
- ✅ Secure authorization

**Technical Features:**
- ✅ RESTful API design
- ✅ JWT-based authentication
- ✅ Role-based authorization
- ✅ Password hashing with BCrypt
- ✅ Input validation (frontend & backend)
- ✅ Global state management (AuthContext)
- ✅ Material-UI responsive design

---

**Time Spent:** ~2-2.5 hours ⏱️  
**Difficulty:** ⭐⭐⭐ Hard  
**Status:** ✅ Complete  
**Date Implemented:** March 7, 2026

---
