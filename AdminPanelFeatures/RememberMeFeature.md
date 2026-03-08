# 🔐 Remember Me Feature - Complete Implementation Guide

## 📋 Task Overview

**Feature:** Remember Me checkbox on login page  
**Difficulty:** ⭐ Easy  
**Time Required:** 30-45 minutes  
**Tech Stack:**
- **Frontend:** React + Material-UI (MUI)
- **Backend:** .NET Core 8.0
- **Database:** SQL Server

---

## 🎯 Goal

Implement a "Remember Me" feature where:
- ✅ If checked → Token expires in 30 days (longer expiry)
- ✅ If unchecked → Token expires in 1 hour (normal expiry)
- ✅ User stays logged in across browser sessions when "Remember Me" is checked

---

## 🔄 Implementation Flow

```
User Login with "Remember Me" checked
    ↓
Frontend sends: { email, password, rememberMe: true }
    ↓
Backend validates credentials
    ↓
Backend creates token with 30-day expiry (if rememberMe = true)
    OR
Backend creates token with 1-hour expiry (if rememberMe = false)
    ↓
Frontend stores token in localStorage
    ↓
User closes browser and reopens
    ↓
Token still valid (if Remember Me was checked)
    ↓
User stays logged in! ✅
```

---

## 🔧 Part 1: Backend Implementation (.NET Core)

### Step 1: Update Login Request Model

**File:** `AdminPanelAPI/Models/AuthModels.cs` (or create new file)

```csharp
// Models/AuthModels.cs

namespace AdminPanelAPI.Models
{
    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public bool RememberMe { get; set; } = false;  // NEW PROPERTY
    }
}
```

---

### Step 2: Update JWT Service to Support Custom Expiry

**File:** `AdminPanelAPI/Services/JwtTokenService.cs`

**Find the `GenerateToken` method and update it:**

```csharp
// Services/JwtTokenService.cs

using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace AdminPanelAPI.Services
{
    public class JwtTokenService
    {
        private readonly IConfiguration _configuration;

        public JwtTokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // UPDATED METHOD: Now accepts rememberMe parameter
        public string GenerateToken(int userId, string email, string name, string role, bool rememberMe = false)
        {
            var securityKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["JwtSettings:Secret"])
            );
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            // Determine expiry based on rememberMe
            int expiryMinutes = rememberMe 
                ? 43200  // 30 days (30 * 24 * 60 = 43200 minutes)
                : int.Parse(_configuration["JwtSettings:ExpiryMinutes"]); // 60 minutes (1 hour)

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, email),
                new Claim("name", name),
                new Claim(ClaimTypes.Role, role),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expiryMinutes),  // DYNAMIC EXPIRY
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
```

---

### Step 3: Update Auth Controller Login Endpoint

**File:** `AdminPanelAPI/Controllers/AuthController.cs`

**Update the `Login` method:**

```csharp
// Controllers/AuthController.cs

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

        // Find user by email
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

        // Generate token with rememberMe parameter
        var token = _jwtService.GenerateToken(
            user.Id, 
            user.Email, 
            user.Name, 
            user.Role,
            request.RememberMe  // PASS rememberMe TO TOKEN GENERATION
        );

        return Ok(new
        {
            success = true,
            message = "Login successful",
            data = new
            {
                token = token,
                id = user.Id,
                name = user.Name,
                email = user.Email,
                role = user.Role,
                rememberMe = request.RememberMe  // RETURN rememberMe STATUS
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
```

---

## 🎨 Part 2: Frontend Implementation (React + MUI)

### Step 1: Update Login Page Component

**File:** `admin-panel/Frontend/src/components/auth/LoginPage.jsx`

**The checkbox is already added! Just need to send `rememberMe` to backend:**

**Find the `handleSubmit` function and update it:**

```jsx
// src/components/auth/LoginPage.jsx

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
    // UPDATED: Pass rememberMe to login function
    const result = await login(formData.email, formData.password, rememberMe);

    if (result.success) {
      // Login successful, navigate to dashboard
      navigate('/');
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
```

---

### Step 2: Update Auth Context to Handle RememberMe

**File:** `admin-panel/Frontend/src/context/AuthContext.jsx`

**Update the `login` function:**

```jsx
// src/context/AuthContext.jsx

/**
 * Login function
 * @param {string} email 
 * @param {string} password 
 * @param {boolean} rememberMe - NEW PARAMETER
 * @returns {Promise<object>} Response with success/error
 */
const login = async (email, password, rememberMe = false) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      { 
        email, 
        password,
        rememberMe  // SEND rememberMe TO BACKEND
      }
    );

    if (response.data.success) {
      const { token, rememberMe: rememberMeStatus, ...userData } = response.data.data;
      
      // Save token and user info
      saveToken(token);
      saveUser(userData);
      setUser(userData);

      // OPTIONAL: Log expiry information
      if (rememberMeStatus) {
        console.log('✅ Remember Me enabled - Token valid for 30 days');
      } else {
        console.log('⏰ Remember Me disabled - Token valid for 1 hour');
      }

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
```

---

## 🗄️ Part 3: Database Changes

**No database changes required!** ✅

The expiry is handled by JWT token generation logic. Token expiry is embedded in the token itself, not stored in the database.

---

## 🧪 Part 4: Testing Guide

### Test Scenario 1: Remember Me Checked (30-Day Token)

**Steps:**

1. **Backend running:** `https://localhost:7190`
2. **Frontend running:** `http://localhost:5173`

3. **Login with Remember Me checked:**
   ```
   - Open: http://localhost:5173/login
   - Email: admin@example.com
   - Password: Admin@123
   - ✅ Check "Remember me" checkbox
   - Click "Sign in"
   ```

4. **Verify long expiry token:**
   ```javascript
   // Browser Console (F12)
   const token = localStorage.getItem('adminpanel_token')
   const base64Url = token.split('.')[1]
   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
   const payload = JSON.parse(decodeURIComponent(atob(base64).split('').map(c => 
     '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
   ).join('')))
   
   const expiryDate = new Date(payload.exp * 1000)
   console.log('🕐 Current Time:', new Date().toLocaleString())
   console.log('⏰ Token Expires:', expiryDate.toLocaleString())
   console.log('📅 Days Until Expiry:', Math.round((payload.exp * 1000 - Date.now()) / (1000 * 60 * 60 * 24)))
   ```

   **Expected Output:**
   ```
   🕐 Current Time: 3/7/2026, 10:30:45 AM
   ⏰ Token Expires: 4/6/2026, 10:30:45 AM  (30 days later)
   📅 Days Until Expiry: 30
   ```

5. **Test persistence:**
   ```
   - Close browser completely
   - Reopen browser
   - Navigate to: http://localhost:5173
   - Expected: ✅ Still logged in! Auto redirect to dashboard
   ```

---

### Test Scenario 2: Remember Me Unchecked (1-Hour Token)

**Steps:**

1. **Logout first:**
   ```
   - Click profile icon
   - Click "Logout"
   ```

2. **Login with Remember Me unchecked:**
   ```
   - Email: admin@example.com
   - Password: Admin@123
   - ⬜ UNCHECK "Remember me" checkbox
   - Click "Sign in"
   ```

3. **Verify short expiry token:**
   ```javascript
   // Browser Console (F12)
   const token = localStorage.getItem('adminpanel_token')
   const base64Url = token.split('.')[1]
   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
   const payload = JSON.parse(decodeURIComponent(atob(base64).split('').map(c => 
     '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
   ).join('')))
   
   const expiryDate = new Date(payload.exp * 1000)
   console.log('🕐 Current Time:', new Date().toLocaleString())
   console.log('⏰ Token Expires:', expiryDate.toLocaleString())
   console.log('⏱️ Minutes Until Expiry:', Math.round((payload.exp * 1000 - Date.now()) / (1000 * 60)))
   ```

   **Expected Output:**
   ```
   🕐 Current Time: 3/7/2026, 10:30:45 AM
   ⏰ Token Expires: 3/7/2026, 11:30:45 AM  (1 hour later)
   ⏱️ Minutes Until Expiry: 60
   ```

4. **Test expiry after 1 hour:**
   ```
   Option 1: Wait 1+ hour (not practical)
   Option 2: Temporarily change backend expiry to 1 minute for testing
   
   Quick Test:
   - Open appsettings.json
   - Change: "ExpiryMinutes": 1
   - Restart backend
   - Login again (Remember Me unchecked)
   - Wait 1+ minute
   - Try to navigate to any page
   - Expected: ✅ Auto logout + redirect to login
   ```

---

## 📊 Comparison Table

| Feature | Remember Me ✅ Checked | Remember Me ⬜ Unchecked |
|---------|----------------------|-------------------------|
| Token Expiry | 30 days (43,200 min) | 1 hour (60 min) |
| Close Browser | Stay logged in ✅ | Stay logged in ✅ |
| Reopen Browser | Still logged in ✅ | Still logged in ✅ |
| After 1 hour | Still logged in ✅ | Auto logout ❌ |
| After 30 days | Auto logout ❌ | N/A |
| Use Case | Personal device 🏠 | Shared/Public device 🏢 |

**Note:** Even with Remember Me unchecked, user stays logged in if they reopen browser within 1 hour!

---

## 🐛 Troubleshooting

### Issue 1: Token still expires in 1 hour even when Remember Me is checked

**Cause:** Backend not receiving `rememberMe` parameter

**Solution:**
```javascript
// Check browser DevTools → Network tab → login request payload
// Should see: { "email": "...", "password": "...", "rememberMe": true }

// If missing, check frontend AuthContext login function
// Make sure rememberMe is passed to axios.post()
```

---

### Issue 2: Backend error "Object reference not set to an instance"

**Cause:** `rememberMe` property not added to `LoginRequest` model

**Solution:**
```csharp
// Verify LoginRequest model has:
public bool RememberMe { get; set; } = false;

// Rebuild backend:
Build → Clean Solution
Build → Rebuild Solution
Restart backend
```

---

### Issue 3: Token expiry not changing

**Cause:** Old token still in use

**Solution:**
```javascript
// Clear old token
localStorage.clear()

// Login again
// Verify new token has correct expiry
```

---

## 🎯 Testing Checklist

- [ ] Backend receives `rememberMe` parameter in login request
- [ ] Token with Remember Me = true expires in 30 days
- [ ] Token with Remember Me = false expires in 1 hour
- [ ] User stays logged in when browser is closed/reopened (within expiry)
- [ ] User auto-logged out when token expires
- [ ] Console shows correct expiry information
- [ ] Network tab shows `rememberMe` in request payload
- [ ] No errors in browser console
- [ ] No errors in backend logs

---

## 💡 Optional Enhancements

### Enhancement 1: Show Expiry Information to User

**Add to Login page after successful login:**

```jsx
// Show user when their session expires
const expiryMessage = rememberMe 
  ? "You'll stay logged in for 30 days" 
  : "You'll stay logged in for 1 hour";

// Display in success message or toast notification
```

---

### Enhancement 2: Add "Stay Signed In" Badge

**Update TopBar to show login duration:**

```jsx
// TopBar.jsx
import { Chip } from '@mui/material';

// Check token expiry
const token = getToken();
const decoded = decodeToken(token);
const isLongSession = (decoded.exp - decoded.iat) > 7200; // More than 2 hours = long session

{isLongSession && (
  <Chip 
    label="30-Day Session" 
    size="small" 
    color="success" 
    sx={{ ml: 1 }}
  />
)}
```

---

### Enhancement 3: Remember Email Address

**Store email in localStorage when Remember Me is checked:**

```jsx
// LoginPage.jsx - in handleSubmit after successful login
if (rememberMe) {
  localStorage.setItem('remembered_email', formData.email);
} else {
  localStorage.removeItem('remembered_email');
}

// On component mount - prefill email
useEffect(() => {
  const rememberedEmail = localStorage.getItem('remembered_email');
  if (rememberedEmail) {
    setFormData(prev => ({ ...prev, email: rememberedEmail }));
  }
}, []);
```

---

## 🔒 Security Considerations

### ✅ Best Practices:

1. **Use HTTPS in production** - Prevents token interception
2. **Refresh token implementation** (advanced) - More secure for long sessions
3. **Warn users about Remember Me** on public computers
4. **Add "Logout from all devices" feature** - Invalidate all tokens

### ⚠️ Warnings:

1. **Don't use Remember Me on shared devices** - Security risk
2. **30 days is common practice** - Not too long, not too short
3. **Store tokens in httpOnly cookies** (production alternative) - More secure than localStorage

---

## 📝 Summary

### What You Implemented:

1. ✅ Backend: Accept `rememberMe` parameter in login request
2. ✅ Backend: Generate tokens with dynamic expiry (30 days vs 1 hour)
3. ✅ Frontend: Checkbox already exists, just passed value to backend
4. ✅ Frontend: Updated AuthContext to send `rememberMe`
5. ✅ Testing: Verified both scenarios work correctly

### Files Modified:

**Backend (3 files):**
- ✏️ `Models/AuthModels.cs` - Added `RememberMe` property
- ✏️ `Services/JwtTokenService.cs` - Dynamic expiry based on `rememberMe`
- ✏️ `Controllers/AuthController.cs` - Pass `rememberMe` to token generation

**Frontend (2 files):**
- ✏️ `src/components/auth/LoginPage.jsx` - Pass `rememberMe` to login
- ✏️ `src/context/AuthContext.jsx` - Send `rememberMe` to backend

---

## 🎉 Congratulations!

You've successfully implemented the **Remember Me Feature**! 🎊

**What Users Can Do Now:**
- ✅ Check "Remember me" → Stay logged in for 30 days
- ✅ Uncheck "Remember me" → Stay logged in for 1 hour
- ✅ Close browser and reopen → Still logged in (if within expiry)
- ✅ Choose security level based on device type

**Next Task Suggestions:**
- ⭐⭐ Password reset via email
- ⭐⭐ Two-factor authentication (2FA)
- ⭐⭐⭐ Refresh token implementation
- ⭐⭐⭐ Social login (Google, Microsoft)

---

**Time Spent:** ~30-45 minutes ⏱️  
**Difficulty:** ⭐ Easy  
**Status:** ✅ Complete  
**Date Implemented:** March 7, 2026

---
