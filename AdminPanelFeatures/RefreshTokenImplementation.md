# 🔄 Refresh Token Implementation - Complete Guide

## 📋 Task Overview

**Feature:** Automatic token refresh before expiry (Silent refresh)  
**Difficulty:** ⭐⭐ Medium  
**Time Required:** 1.5 - 2 hours  
**Tech Stack:**
- **Frontend:** React + Material-UI (MUI)
- **Backend:** .NET Core 8.0
- **Database:** SQL Server

---

## 🎯 Goal

Implement automatic token refresh where:
- ✅ Token refreshes automatically 5 minutes before expiry
- ✅ User stays logged in without interruption (Silent refresh)
- ✅ No login prompt when token expires
- ✅ Refresh token stored securely
- ✅ Old tokens invalidated after refresh

---

## 🔄 How Refresh Token Works

### Traditional JWT Problem:

```
User Login → Token (1 hour expiry)
    ↓
After 59 minutes → Token expires
    ↓
User still browsing → Next API call fails
    ↓
User forced to login again ❌
```

### With Refresh Token:

```
User Login → Access Token (1 hour) + Refresh Token (7 days)
    ↓
After 55 minutes → Frontend detects token expiring soon
    ↓
Frontend calls /api/auth/refresh with Refresh Token
    ↓
Backend validates Refresh Token
    ↓
Backend returns NEW Access Token + NEW Refresh Token
    ↓
Frontend stores new tokens silently
    ↓
User continues browsing without interruption ✅
```

---

## 📊 Access Token vs Refresh Token

| Feature | Access Token | Refresh Token |
|---------|--------------|---------------|
| **Purpose** | Access APIs | Get new Access Token |
| **Expiry** | Short (1 hour) | Long (7 days) |
| **Storage** | localStorage | localStorage (or httpOnly cookie) |
| **Usage** | Every API call | Only for refresh endpoint |
| **Invalidation** | Auto (on expiry) | Manual (on logout) |
| **Security** | Medium (short-lived) | High (long-lived, limited use) |

---

## 🗄️ Part 1: Database Setup (SQL Server)

### Step 1: Create RefreshTokens Table

**Open:** SQL Server Management Studio (SSMS)  
**Database:** AdminPanelDB

```sql
-- Create RefreshTokens table
CREATE TABLE RefreshTokens (
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    Token NVARCHAR(500) NOT NULL UNIQUE,
    ExpiresAt DATETIME NOT NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    RevokedAt DATETIME NULL,
    IsRevoked BIT NOT NULL DEFAULT 0,
    ReplacedByToken NVARCHAR(500) NULL,
    
    CONSTRAINT FK_RefreshTokens_Users FOREIGN KEY (UserId) 
        REFERENCES Users(Id) ON DELETE CASCADE
);

-- Create index for faster lookups
CREATE INDEX IX_RefreshTokens_Token ON RefreshTokens(Token);
CREATE INDEX IX_RefreshTokens_UserId ON RefreshTokens(UserId);

-- Verify table created
SELECT * FROM RefreshTokens;
```

**Execute:** F5

---

## 🔧 Part 2: Backend Implementation (.NET Core)

### Step 1: Create RefreshToken Model

**File:** `AdminPanelAPI/Models/RefreshToken.cs`

```csharp
// Models/RefreshToken.cs

using System;

namespace AdminPanelAPI.Models
{
    public class RefreshToken
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Token { get; set; }
        public DateTime ExpiresAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? RevokedAt { get; set; }
        public bool IsRevoked { get; set; }
        public string ReplacedByToken { get; set; }

        // Navigation property
        public User User { get; set; }

        // Helper properties
        public bool IsExpired => DateTime.UtcNow >= ExpiresAt;
        public bool IsActive => !IsRevoked && !IsExpired;
    }
}
```

---

### Step 2: Update ApplicationDbContext

**File:** `AdminPanelAPI/Data/ApplicationDbContext.cs`

**Add RefreshTokens DbSet:**

```csharp
// Data/ApplicationDbContext.cs

using Microsoft.EntityFrameworkCore;
using AdminPanelAPI.Models;

namespace AdminPanelAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }  // NEW LINE

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure RefreshToken
            modelBuilder.Entity<RefreshToken>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Token).IsRequired().HasMaxLength(500);
                entity.Property(e => e.ExpiresAt).IsRequired();
                entity.Property(e => e.CreatedAt).IsRequired();
                entity.Property(e => e.IsRevoked).IsRequired().HasDefaultValue(false);

                // Configure relationship
                entity.HasOne(e => e.User)
                    .WithMany()
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

                // Indexes
                entity.HasIndex(e => e.Token).IsUnique();
                entity.HasIndex(e => e.UserId);
            });
        }
    }
}
```

---

### Step 3: Create Refresh Token Service

**File:** `AdminPanelAPI/Services/RefreshTokenService.cs`

```csharp
// Services/RefreshTokenService.cs

using System;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AdminPanelAPI.Data;
using AdminPanelAPI.Models;

namespace AdminPanelAPI.Services
{
    public class RefreshTokenService
    {
        private readonly ApplicationDbContext _context;

        public RefreshTokenService(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Generate a new refresh token
        /// </summary>
        public string GenerateRefreshToken()
        {
            var randomBytes = new byte[64];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomBytes);
            }
            return Convert.ToBase64String(randomBytes);
        }

        /// <summary>
        /// Save refresh token to database
        /// </summary>
        public async Task<RefreshToken> SaveRefreshToken(int userId, string token, int expiryDays = 7)
        {
            var refreshToken = new RefreshToken
            {
                UserId = userId,
                Token = token,
                ExpiresAt = DateTime.UtcNow.AddDays(expiryDays),
                CreatedAt = DateTime.UtcNow,
                IsRevoked = false
            };

            _context.RefreshTokens.Add(refreshToken);
            await _context.SaveChangesAsync();

            return refreshToken;
        }

        /// <summary>
        /// Validate refresh token
        /// </summary>
        public async Task<RefreshToken> ValidateRefreshToken(string token)
        {
            var refreshToken = await _context.RefreshTokens
                .Include(rt => rt.User)
                .FirstOrDefaultAsync(rt => rt.Token == token);

            if (refreshToken == null)
                return null;

            if (refreshToken.IsRevoked)
                return null;

            if (refreshToken.IsExpired)
                return null;

            return refreshToken;
        }

        /// <summary>
        /// Revoke refresh token (mark as revoked)
        /// </summary>
        public async Task<bool> RevokeRefreshToken(string token, string replacedByToken = null)
        {
            var refreshToken = await _context.RefreshTokens
                .FirstOrDefaultAsync(rt => rt.Token == token);

            if (refreshToken == null)
                return false;

            refreshToken.IsRevoked = true;
            refreshToken.RevokedAt = DateTime.UtcNow;
            refreshToken.ReplacedByToken = replacedByToken;

            await _context.SaveChangesAsync();

            return true;
        }

        /// <summary>
        /// Revoke all refresh tokens for a user (logout from all devices)
        /// </summary>
        public async Task<int> RevokeAllUserTokens(int userId)
        {
            var userTokens = await _context.RefreshTokens
                .Where(rt => rt.UserId == userId && !rt.IsRevoked)
                .ToListAsync();

            foreach (var token in userTokens)
            {
                token.IsRevoked = true;
                token.RevokedAt = DateTime.UtcNow;
            }

            await _context.SaveChangesAsync();

            return userTokens.Count;
        }

        /// <summary>
        /// Clean up expired tokens (run periodically)
        /// </summary>
        public async Task<int> CleanupExpiredTokens()
        {
            var expiredTokens = await _context.RefreshTokens
                .Where(rt => rt.ExpiresAt < DateTime.UtcNow)
                .ToListAsync();

            _context.RefreshTokens.RemoveRange(expiredTokens);
            await _context.SaveChangesAsync();

            return expiredTokens.Count;
        }
    }
}
```

---

### Step 4: Register Service in Program.cs

**File:** `AdminPanelAPI/Program.cs`

**Add service registration:**

```csharp
// Program.cs

// ... existing code ...

// Add services
builder.Services.AddScoped<JwtTokenService>();
builder.Services.AddScoped<RefreshTokenService>();  // NEW LINE

// ... rest of the code ...
```

---

### Step 5: Update Auth Controller - Add Refresh Endpoint

**File:** `AdminPanelAPI/Controllers/AuthController.cs`

**Update controller with new endpoints:**

```csharp
// Controllers/AuthController.cs

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdminPanelAPI.Data;
using AdminPanelAPI.Models;
using AdminPanelAPI.Services;
using System.Threading.Tasks;

namespace AdminPanelAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly JwtTokenService _jwtService;
        private readonly RefreshTokenService _refreshTokenService;

        public AuthController(
            ApplicationDbContext context,
            JwtTokenService jwtService,
            RefreshTokenService refreshTokenService)
        {
            _context = context;
            _jwtService = jwtService;
            _refreshTokenService = refreshTokenService;
        }

        /// <summary>
        /// LOGIN ENDPOINT - Updated to return refresh token
        /// </summary>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                // Validate request
                if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Email and password are required"
                    });
                }

                // Find user
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == request.Email);

                if (user == null)
                {
                    return Unauthorized(new
                    {
                        success = false,
                        message = "Invalid email or password"
                    });
                }

                // Verify password
                bool isPasswordValid = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);

                if (!isPasswordValid)
                {
                    return Unauthorized(new
                    {
                        success = false,
                        message = "Invalid email or password"
                    });
                }

                // Generate access token
                var accessToken = _jwtService.GenerateToken(
                    user.Id,
                    user.Email,
                    user.Name,
                    user.Role,
                    request.RememberMe
                );

                // Generate and save refresh token
                var refreshTokenString = _refreshTokenService.GenerateRefreshToken();
                await _refreshTokenService.SaveRefreshToken(user.Id, refreshTokenString, expiryDays: 7);

                return Ok(new
                {
                    success = true,
                    message = "Login successful",
                    data = new
                    {
                        token = accessToken,
                        refreshToken = refreshTokenString,  // NEW: Return refresh token
                        id = user.Id,
                        name = user.Name,
                        email = user.Email,
                        role = user.Role
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
        /// REFRESH TOKEN ENDPOINT - NEW
        /// </summary>
        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            try
            {
                // Validate request
                if (string.IsNullOrEmpty(request.RefreshToken))
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Refresh token is required"
                    });
                }

                // Validate refresh token
                var refreshToken = await _refreshTokenService.ValidateRefreshToken(request.RefreshToken);

                if (refreshToken == null)
                {
                    return Unauthorized(new
                    {
                        success = false,
                        message = "Invalid or expired refresh token"
                    });
                }

                var user = refreshToken.User;

                // Generate new access token
                var newAccessToken = _jwtService.GenerateToken(
                    user.Id,
                    user.Email,
                    user.Name,
                    user.Role,
                    rememberMe: false  // Default to 1 hour for refreshed tokens
                );

                // Generate new refresh token
                var newRefreshTokenString = _refreshTokenService.GenerateRefreshToken();

                // Revoke old refresh token
                await _refreshTokenService.RevokeRefreshToken(
                    request.RefreshToken,
                    replacedByToken: newRefreshTokenString
                );

                // Save new refresh token
                await _refreshTokenService.SaveRefreshToken(user.Id, newRefreshTokenString, expiryDays: 7);

                return Ok(new
                {
                    success = true,
                    message = "Token refreshed successfully",
                    data = new
                    {
                        token = newAccessToken,
                        refreshToken = newRefreshTokenString,
                        id = user.Id,
                        name = user.Name,
                        email = user.Email,
                        role = user.Role
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
        /// LOGOUT ENDPOINT - Updated to revoke refresh token
        /// </summary>
        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] LogoutRequest request)
        {
            try
            {
                if (!string.IsNullOrEmpty(request.RefreshToken))
                {
                    // Revoke refresh token
                    await _refreshTokenService.RevokeRefreshToken(request.RefreshToken);
                }

                return Ok(new
                {
                    success = true,
                    message = "Logged out successfully"
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

    // Request models
    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public bool RememberMe { get; set; } = false;
    }

    public class RefreshTokenRequest
    {
        public string RefreshToken { get; set; }
    }

    public class LogoutRequest
    {
        public string RefreshToken { get; set; }
    }
}
```

---

## 🎨 Part 3: Frontend Implementation (React + MUI)

### Step 1: Update auth.js Utility

**File:** `admin-panel/Frontend/src/utils/auth.js`

**Add refresh token functions:**

```javascript
// src/utils/auth.js

const TOKEN_KEY = 'adminpanel_token';
const REFRESH_TOKEN_KEY = 'adminpanel_refresh_token';  // NEW
const USER_KEY = 'adminpanel_user';

// ... existing token functions ...

/**
 * Save refresh token to localStorage
 * @param {string} refreshToken - Refresh token from backend
 */
export const saveRefreshToken = (refreshToken) => {
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
};

/**
 * Get refresh token from localStorage
 * @returns {string|null} Refresh token or null if not found
 */
export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Remove refresh token from localStorage
 */
export const removeRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

/**
 * Clear all authentication data (including refresh token)
 */
export const clearAuth = () => {
  removeToken();
  removeRefreshToken();  // NEW
  removeUser();
};

/**
 * Check if token will expire soon (within specified minutes)
 * @param {string} token - JWT token
 * @param {number} minutesBeforeExpiry - Minutes before expiry to consider "expiring soon"
 * @returns {boolean}
 */
export const isTokenExpiringSoon = (token, minutesBeforeExpiry = 5) => {
  if (!token) return false;
  
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return false;
  
  const currentTime = Date.now() / 1000;
  const timeUntilExpiry = decoded.exp - currentTime;
  const minutesUntilExpiry = timeUntilExpiry / 60;
  
  return minutesUntilExpiry <= minutesBeforeExpiry && minutesUntilExpiry > 0;
};

// ... rest of existing functions ...
```

---

### Step 2: Create Token Refresh Service

**File:** `admin-panel/Frontend/src/services/tokenRefreshService.js`

```javascript
// src/services/tokenRefreshService.js

import axios from 'axios';
import {
  getToken,
  getRefreshToken,
  saveToken,
  saveRefreshToken,
  saveUser,
  clearAuth,
  isTokenExpiringSoon,
  isTokenExpired,
} from '../utils/auth';

class TokenRefreshService {
  constructor() {
    this.refreshTimer = null;
    this.isRefreshing = false;
  }

  /**
   * Start automatic token refresh checker
   */
  startRefreshTimer() {
    // Clear any existing timer
    this.stopRefreshTimer();

    // Check every minute if token needs refresh
    this.refreshTimer = setInterval(() => {
      this.checkAndRefreshToken();
    }, 60000); // Check every 60 seconds

    // Also check immediately
    this.checkAndRefreshToken();

    console.log('✅ Token refresh timer started');
  }

  /**
   * Stop automatic token refresh checker
   */
  stopRefreshTimer() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
      console.log('⏹️ Token refresh timer stopped');
    }
  }

  /**
   * Check if token needs refresh and refresh if needed
   */
  async checkAndRefreshToken() {
    const token = getToken();
    const refreshToken = getRefreshToken();

    if (!token || !refreshToken) {
      return;
    }

    // If token is already expired, don't try to refresh
    if (isTokenExpired(token)) {
      console.log('❌ Token already expired, logout required');
      clearAuth();
      window.location.href = '/login';
      return;
    }

    // Check if token is expiring soon (within 5 minutes)
    if (isTokenExpiringSoon(token, 5)) {
      console.log('⚠️ Token expiring soon, refreshing...');
      await this.refreshAccessToken();
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshAccessToken() {
    // Prevent multiple simultaneous refresh attempts
    if (this.isRefreshing) {
      console.log('⏳ Refresh already in progress, skipping...');
      return;
    }

    this.isRefreshing = true;

    try {
      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
        { refreshToken }
      );

      if (response.data.success) {
        const { token, refreshToken: newRefreshToken, ...userData } = response.data.data;

        // Save new tokens
        saveToken(token);
        saveRefreshToken(newRefreshToken);
        saveUser(userData);

        console.log('✅ Token refreshed successfully (silent)');

        this.isRefreshing = false;
        return true;
      } else {
        throw new Error(response.data.message || 'Token refresh failed');
      }
    } catch (error) {
      console.error('❌ Token refresh failed:', error.message);

      // If refresh fails, logout user
      clearAuth();
      window.location.href = '/login';

      this.isRefreshing = false;
      return false;
    }
  }

  /**
   * Manual token refresh (for testing or explicit refresh)
   */
  async manualRefresh() {
    return await this.refreshAccessToken();
  }
}

// Export singleton instance
export default new TokenRefreshService();
```

---

### Step 3: Update AuthContext with Refresh Token Logic

**File:** `admin-panel/Frontend/src/context/AuthContext.jsx`

**Add refresh token support:**

```javascript
// src/context/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  saveToken,
  getToken,
  saveRefreshToken,
  getRefreshToken,
  saveUser,
  getUser,
  clearAuth,
  isTokenExpired,
} from '../utils/auth';
import tokenRefreshService from '../services/tokenRefreshService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Start token refresh timer when user is authenticated
  useEffect(() => {
    if (user) {
      tokenRefreshService.startRefreshTimer();
    } else {
      tokenRefreshService.stopRefreshTimer();
    }

    return () => {
      tokenRefreshService.stopRefreshTimer();
    };
  }, [user]);

  /**
   * Check if user is authenticated (on app load)
   */
  const checkAuth = () => {
    try {
      const token = getToken();
      const refreshToken = getRefreshToken();
      const savedUser = getUser();

      if (token && refreshToken && savedUser && !isTokenExpired(token)) {
        // Token exists and not expired
        setUser(savedUser);
      } else if (refreshToken && savedUser) {
        // Token expired but refresh token exists, try to refresh
        tokenRefreshService.refreshAccessToken().then((success) => {
          if (success) {
            setUser(savedUser);
          } else {
            clearAuth();
            setUser(null);
          }
        });
      } else {
        // No valid tokens
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
   * Login function - Updated to save refresh token
   */
  const login = async (email, password, rememberMe = false) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password, rememberMe }
      );

      if (response.data.success) {
        const { token, refreshToken, ...userData } = response.data.data;
        
        // Save tokens and user info
        saveToken(token);
        saveRefreshToken(refreshToken);  // NEW: Save refresh token
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
   * Logout function - Updated to revoke refresh token
   */
  const logout = async () => {
    try {
      const refreshToken = getRefreshToken();
      
      if (refreshToken) {
        // Call logout endpoint to revoke refresh token
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/logout`,
          { refreshToken }
        );
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuth();
      setUser(null);
      tokenRefreshService.stopRefreshTimer();
      navigate('/login');
    }
  };

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

---

### Step 4: Update Axios Interceptor

**File:** `admin-panel/Frontend/src/services/api.js`

**Update to NOT redirect on 401 during refresh:**

```javascript
// src/services/api.js

import axios from 'axios';
import { getToken, getRefreshToken, clearAuth } from '../utils/auth';
import tokenRefreshService from './tokenRefreshService';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 */
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor - Updated for refresh token
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response) {
      const { status } = error.response;
      
      // 401 Unauthorized
      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        // Don't try to refresh if this IS the refresh endpoint
        if (originalRequest.url.includes('/api/auth/refresh')) {
          clearAuth();
          window.location.href = '/login';
          return Promise.reject(error);
        }

        // Try to refresh token
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          const refreshed = await tokenRefreshService.refreshAccessToken();

          if (refreshed) {
            // Retry original request with new token
            const newToken = getToken();
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          }
        }

        // Refresh failed, logout
        clearAuth();
        window.location.href = '/login';
      }
      
      // 403 Forbidden
      if (status === 403) {
        console.error('Access denied. Insufficient permissions.');
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
```

---

## 🧪 Part 4: Complete Testing Guide

### Test Scenario 1: Login with Refresh Token

**Steps:**

1. **Start Backend & Frontend:**
   ```
   Backend: Visual Studio → Green Play button
   Frontend: npm start (http://localhost:5173)
   ```

2. **Login:**
   ```
   Email: admin@example.com
   Password: Admin@123
   ```

3. **Verify tokens in localStorage:**
   ```javascript
   // Browser Console (F12)
   console.log('Access Token:', localStorage.getItem('adminpanel_token'))
   console.log('Refresh Token:', localStorage.getItem('adminpanel_refresh_token'))
   
   // Both should be present ✅
   ```

4. **Verify in database:**
   ```sql
   -- SQL Server Management Studio
   SELECT * FROM RefreshTokens WHERE UserId = 1;
   
   -- Should show 1 active refresh token ✅
   ```

**Expected Results:**
- ✅ Both access token and refresh token stored
- ✅ Refresh token saved in database
- ✅ Token refresh timer started (check console)

---

### Test Scenario 2: Automatic Token Refresh (5 min before expiry)

**This is the MAIN TEST - Silent Refresh Working**

**Preparation:**

1. **Temporarily reduce token expiry for testing:**
   ```csharp
   // Backend: appsettings.json
   "ExpiryMinutes": 6  // Change from 60 to 6 minutes
   
   // Restart backend
   ```

2. **Update frontend refresh timing for testing:**
   ```javascript
   // Frontend: src/services/tokenRefreshService.js
   // Line ~50: Change from 5 to 1 minute before expiry
   if (isTokenExpiringSoon(token, 1)) {  // Changed from 5 to 1
   ```

**Testing Steps:**

1. **Login fresh:**
   ```
   - Logout if logged in
   - Login again with updated backend
   ```

2. **Check token expiry:**
   ```javascript
   // Browser Console
   const token = localStorage.getItem('adminpanel_token')
   const payload = JSON.parse(atob(token.split('.')[1]))
   const expiryDate = new Date(payload.exp * 1000)
   console.log('Token expires at:', expiryDate.toLocaleTimeString())
   console.log('Current time:', new Date().toLocaleTimeString())
   ```

3. **Wait for 5 minutes:**
   ```
   - Keep browser open
   - Don't close tab
   - Watch console for refresh message
   ```

4. **After 5 minutes (1 min before expiry):**
   ```javascript
   // Console should show:
   ⚠️ Token expiring soon, refreshing...
   ✅ Token refreshed successfully (silent)
   ```

5. **Verify new token:**
   ```javascript
   // Check localStorage - token should be different
   const newToken = localStorage.getItem('adminpanel_token')
   console.log('New token:', newToken)
   
   // Check expiry - should be 6 minutes from now
   const newPayload = JSON.parse(atob(newToken.split('.')[1]))
   const newExpiry = new Date(newPayload.exp * 1000)
   console.log('New token expires at:', newExpiry.toLocaleTimeString())
   ```

6. **Verify database:**
   ```sql
   SELECT * FROM RefreshTokens WHERE UserId = 1 ORDER BY CreatedAt DESC;
   
   -- Should show:
   -- Old token: IsRevoked = 1, RevokedAt = <timestamp>
   -- New token: IsRevoked = 0, ExpiresAt = 7 days from now
   ```

**Expected Results:**
- ✅ Token refreshed automatically at 5-minute mark
- ✅ No user interaction required (Silent)
- ✅ User stays on current page
- ✅ No login prompt
- ✅ Old refresh token revoked
- ✅ New refresh token created

---

### Test Scenario 3: Manual API Call After Refresh

**Steps:**

1. **After automatic refresh happens, make API call:**
   ```
   - Navigate to Users page
   - Or click any menu item
   ```

2. **Check Network tab:**
   ```
   - F12 → Network tab
   - Check API request headers
   - Authorization header should have NEW token ✅
   ```

**Expected:**
- ✅ API calls work with refreshed token
- ✅ No authentication errors

---

### Test Scenario 4: Logout Revokes Refresh Token

**Steps:**

1. **Logout:**
   ```
   - Click profile menu
   - Click Logout
   ```

2. **Check localStorage:**
   ```javascript
   localStorage.getItem('adminpanel_token')  // null ✅
   localStorage.getItem('adminpanel_refresh_token')  // null ✅
   ```

3. **Check database:**
   ```sql
   SELECT * FROM RefreshTokens WHERE UserId = 1 ORDER BY CreatedAt DESC;
   
   -- Should show:
   -- Latest token: IsRevoked = 1 ✅
   ```

**Expected:**
- ✅ Both tokens removed from localStorage
- ✅ Refresh token revoked in database
- ✅ Redirect to login page

---

### Test Scenario 5: Expired Refresh Token

**Steps:**

1. **Manually expire refresh token in database:**
   ```sql
   UPDATE RefreshTokens 
   SET ExpiresAt = DATEADD(DAY, -1, GETDATE())
   WHERE UserId = 1 AND IsRevoked = 0;
   ```

2. **Trigger refresh manually:**
   ```javascript
   // Browser console
   import tokenRefreshService from './services/tokenRefreshService';
   await tokenRefreshService.manualRefresh();
   ```

**Expected:**
- ✅ Refresh fails
- ✅ User logged out automatically
- ✅ Redirect to login page
- ✅ Console shows: "Token refresh failed"

---

### Test Scenario 6: Multiple Browser Tabs (Same User)

**Steps:**

1. **Login in Tab 1:**
   ```
   - Login with admin credentials
   ```

2. **Open Tab 2 with same app:**
   ```
   - Open http://localhost:5173 in new tab
   ```

**Expected:**
- ✅ Tab 2 auto-logged in (tokens in localStorage)
- ✅ Both tabs sharing same tokens
- ✅ Refresh in one tab updates localStorage
- ✅ Other tab uses refreshed token on next API call

---

### Test Scenario 7: Reset to Production Settings

**After testing complete:**

1. **Backend - Reset expiry:**
   ```csharp
   // appsettings.json
   "ExpiryMinutes": 60  // Back to 1 hour
   
   // Restart backend
   ```

2. **Frontend - Reset refresh timing:**
   ```javascript
   // src/services/tokenRefreshService.js
   if (isTokenExpiringSoon(token, 5)) {  // Back to 5 minutes
   ```

3. **Clear test data:**
   ```sql
   -- Delete test refresh tokens
   DELETE FROM RefreshTokens WHERE IsRevoked = 1;
   ```

4. **Fresh login to verify:**
   ```
   - Logout
   - Login again
   - Verify 1-hour token created
   ```

---

## 📊 Testing Results Table

| Test Scenario | Expected Result | Status |
|---------------|-----------------|--------|
| 1. Login with refresh token | Both tokens stored | ✅ |
| 2. Auto refresh (5 min before) | Silent refresh works | ✅ |
| 3. API call after refresh | Uses new token | ✅ |
| 4. Logout revokes token | Token revoked in DB | ✅ |
| 5. Expired refresh token | Auto logout | ✅ |
| 6. Multiple tabs | Shared tokens work | ✅ |
| 7. Production settings | 1-hour expiry working | ✅ |

---

## 🐛 Troubleshooting Guide

### Issue 1: Token not refreshing automatically

**Symptoms:**
- 5 minutes before expiry passes
- No refresh happens
- User gets logged out

**Solutions:**

```javascript
// Check if timer is running
// Browser console
console.log('Timer running:', !!tokenRefreshService.refreshTimer)

// Manually check
await tokenRefreshService.checkAndRefreshToken()

// Check if token is expiring soon
import { isTokenExpiringSoon, getToken } from './utils/auth'
const token = getToken()
console.log('Expiring soon?', isTokenExpiringSoon(token, 5))
```

---

### Issue 2: Database error "Invalid object name 'RefreshTokens'"

**Cause:** Table not created

**Solution:**
```sql
-- Run table creation script again
CREATE TABLE RefreshTokens ( ... )

-- Or add migration if using EF Core
Add-Migration AddRefreshTokens
Update-Database
```

---

### Issue 3: Refresh endpoint returns 500 error

**Cause:** Missing service registration

**Solution:**
```csharp
// Program.cs
builder.Services.AddScoped<RefreshTokenService>();  // Add this line
```

---

### Issue 4: Multiple refresh requests firing

**Cause:** `isRefreshing` flag not working

**Solution:**
```javascript
// Check in tokenRefreshService.js
console.log('Is refreshing?', this.isRefreshing)

// Make sure flag is properly set/reset
this.isRefreshing = true;  // At start
this.isRefreshing = false; // After completion
```

---

## 🔒 Security Best Practices

### ✅ Implemented Security:

1. **Refresh token stored in database** - Can be revoked anytime
2. **Old tokens revoked on refresh** - Prevents token reuse
3. **Token rotation** - New refresh token with each refresh
4. **Expiry validation** - Both access & refresh tokens expire
5. **Secure token generation** - Cryptographically secure random bytes

### 🔐 Additional Security (Optional):

1. **httpOnly Cookies** (Advanced):
   ```javascript
   // Instead of localStorage, use httpOnly cookies
   // Prevents XSS attacks from stealing tokens
   ```

2. **IP Address binding**:
   ```csharp
   // Store IP address with refresh token
   // Validate IP on refresh
   ```

3. **Device fingerprinting**:
   ```csharp
   // Track device/browser
   // Alert on suspicious refresh from different device
   ```

---

## 📝 Summary

### What You Implemented:

1. ✅ **Database:** RefreshTokens table with proper relationships
2. ✅ **Backend:** Refresh token generation, validation, revocation
3. ✅ **Backend:** /api/auth/refresh endpoint
4. ✅ **Frontend:** Token refresh service with automatic timer
5. ✅ **Frontend:** Silent refresh 5 minutes before expiry
6. ✅ **Frontend:** Updated axios interceptor for retry logic
7. ✅ **Testing:** Complete testing scenarios

### Files Modified:

**Backend (5 files):**
- ✏️ `Models/RefreshToken.cs` - New model
- ✏️ `Data/ApplicationDbContext.cs` - Added DbSet
- ✏️ `Services/RefreshTokenService.cs` - New service
- ✏️ `Controllers/AuthController.cs` - Added refresh endpoint
- ✏️ `Program.cs` - Registered service

**Frontend (4 files):**
- ✏️ `src/utils/auth.js` - Added refresh token functions
- ✏️ `src/services/tokenRefreshService.js` - New service
- ✏️ `src/context/AuthContext.jsx` - Integrated refresh logic
- ✏️ `src/services/api.js` - Updated interceptor

**Database (1 table):**
- ✨ `RefreshTokens` - New table

---

## 🎉 Congratulations!

You've successfully implemented **automatic token refresh**! 🎊

**User Benefits:**
- ✅ Never see "Session expired, please login again" (within 7 days)
- ✅ Seamless browsing experience
- ✅ No interruptions while working
- ✅ Secure token management

**Technical Benefits:**
- ✅ Short-lived access tokens (security)
- ✅ Long-lived sessions (user experience)
- ✅ Token revocation capability
- ✅ Multi-device support

---

**Time Spent:** ~1.5-2 hours ⏱️  
**Difficulty:** ⭐⭐ Medium  
**Status:** ✅ Complete  
**Date Implemented:** March 7, 2026

---
