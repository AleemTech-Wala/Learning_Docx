# 📅 Week 5 - Day 4: Protected Endpoints & Authorization

## 🎯 Aaj ka Goal

Aaj hum **JWT authentication ko action mein** dekhenge! 🛡️

Register/Login APIs ban gayi hain aur tokens generate ho rahe hain. Ab hum:
- Endpoints ko **protect** karenge ([Authorize] attribute)
- Token **validation** dekhenge (middleware action mein)
- **Role-based** authorization implement karenge
- Complete **authentication flow** test karenge

**Kya Karenge:**
- [Authorize] attribute understand karenge
- UsersController endpoints protect karenge
- User profile endpoint banayenge
- Admin-only operations implement karenge
- Testing with Postman (with/without tokens)

**Output:** Sirf authenticated users hi APIs access kar sakenge! 🔐

---

## ⏰ Aaj ka Session Breakdown (4-5 Hours)

| Part | Topic | Time |
|------|-------|------|
| 1 | Understanding Authentication Middleware | 45 min |
| 2 | [Authorize] Attribute Deep Dive | 30 min |
| 3 | Protect UsersController Endpoints | 45 min |
| 4 | Create User Profile Endpoint | 30 min |
| 5 | Role-Based Authorization (Admin Only) | 45 min |
| 6 | Custom Unauthorized Response | 30 min |
| 7 | Complete Testing (Postman) | 60 min |

---

## 📚 Part 1: Understanding Authentication Middleware (45 min)

### 🔒 What is Middleware?

**Simple Definition:**
```
Middleware = Request ke beech mein jo code chalta hai
```

**Request Pipeline:**
```
Client → Middleware 1 → Middleware 2 → Middleware 3 → Controller → Response
```

---

### 🚪 Real-Life Analogy: Hotel Security

```
You (Request) → Hotel entrance
                 ↓
Step 1: Security Check (Authentication Middleware)
        - "Do you have a valid room key?" (Token check)
        - "Is your key expired?" (Token expiry check)
        - "Is your key authentic?" (Signature verification)
                 ↓
        ✅ Valid → Proceed
        ❌ Invalid → Stop here (401 Unauthorized)
                 ↓
Step 2: Room Access (Controller)
        - Use hotel services (API endpoints)
```

---

### 🔄 ASP.NET Core Middleware Pipeline

**Day 2 mein humne Program.cs mein configure kiya tha:**

```csharp
app.UseHttpsRedirection();    // Step 1: HTTPS ensure karo
app.UseCors("AllowFrontend"); // Step 2: CORS check karo
app.UseAuthentication();      // Step 3: Token validate karo ← JWT Middleware
app.UseAuthorization();       // Step 4: Permissions check karo
app.MapControllers();         // Step 5: Controller execute karo
```

---

### 🎯 UseAuthentication() Middleware (What it does?)

**When a request comes:**

```
Request Headers:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

UseAuthentication() Middleware Process:
├─ Step 1: Extract token from Authorization header
├─ Step 2: Check if "Bearer" scheme present
├─ Step 3: Validate token signature (using secret key)
├─ Step 4: Check token expiry (exp claim)
├─ Step 5: Check issuer (iss claim)
├─ Step 6: Check audience (aud claim)
├─ Step 7: Extract claims (user info)
└─ Step 8: Populate HttpContext.User with claims

Result:
✅ Valid Token → HttpContext.User populated (authenticated)
❌ Invalid Token → HttpContext.User.Identity.IsAuthenticated = false
```

---

### 🔍 How it knows token is in header?

**Day 2 configuration:**

```csharp
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    //                                    ↑
    //                        Tells middleware: "Look for Bearer token"
})
.AddJwtBearer(options =>
{
    // Token validation parameters
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(...),
        // ... other validations
    };
});
```

**This configuration automatically:**
- Looks for `Authorization: Bearer {token}` header
- Validates token using specified parameters
- Extracts claims and populates HttpContext.User

---

### 🧪 What happens WITHOUT UseAuthentication()?

```csharp
// ❌ If we remove this line:
// app.UseAuthentication();

Result:
- Token header bhej rahe ho → Middleware ignore karega
- [Authorize] attribute lagao → Har request fail hogi (401)
- HttpContext.User → Always empty rahega

Why? No middleware to process the token!
```

---

### ✅ What happens WITH UseAuthentication()?

```csharp
// ✅ With this line (already configured Day 2):
app.UseAuthentication();

Result:
- Token header bhejo → Middleware process karega
- Valid token → HttpContext.User mein user info available
- [Authorize] attribute check karega HttpContext.User
- Authenticated user → Access granted ✅
```

---

## 🔐 Part 2: [Authorize] Attribute Deep Dive (30 min)

### 📌 What is [Authorize] Attribute?

**Simple Definition:**
```
[Authorize] = "This endpoint sirf authenticated users access kar sakte hain"
```

**Without [Authorize]:**
```csharp
[HttpGet]
public IActionResult GetUsers()
{
    // Anyone can access (even without token)
}
```

**With [Authorize]:**
```csharp
[Authorize]  // ← Adding this line
[HttpGet]
public IActionResult GetUsers()
{
    // Only authenticated users can access
    // Request without valid token → 401 Unauthorized
}
```

---

### 🎭 How [Authorize] Works Internally?

**Request Flow:**

```
Step 1: Request arrives at controller
         ↓
Step 2: [Authorize] attribute checks HttpContext.User
         ↓
Step 3: Is HttpContext.User.Identity.IsAuthenticated == true?
         ↓
    ✅ YES                           ❌ NO
    (Token valid tha)                (No token / Invalid token)
         ↓                                ↓
    Controller executes              Return 401 Unauthorized
    Return 200 OK                    Response: "Authorization failed"
```

---

### 📍 Where to Apply [Authorize]?

**Option 1: Controller Level (Sab endpoints protected)**

```csharp
[Authorize]  // ← Sab endpoints protected
[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    [HttpGet]  // Protected
    public IActionResult GetAll() { }

    [HttpGet("{id}")]  // Protected
    public IActionResult GetById(int id) { }

    [HttpPost]  // Protected
    public IActionResult Create() { }
}
```

**Option 2: Action Level (Specific endpoints protected)**

```csharp
[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    [HttpGet]  // NOT protected (anyone can access)
    public IActionResult GetAll() { }

    [Authorize]  // ← Protected
    [HttpGet("profile")]
    public IActionResult GetProfile() { }

    [Authorize]  // ← Protected
    [HttpPost]
    public IActionResult Create() { }
}
```

---

### 🎯 [AllowAnonymous] Attribute (Exception)

**Use Case:** Controller level pe [Authorize], but some endpoints public chahiye

```csharp
[Authorize]  // ← Controller level (default: all protected)
[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    [AllowAnonymous]  // ← Exception: Anyone can register
    [HttpPost("register")]
    public IActionResult Register() { }

    [AllowAnonymous]  // ← Exception: Anyone can login
    [HttpPost("login")]
    public IActionResult Login() { }

    [HttpPost("logout")]  // Protected (token required)
    public IActionResult Logout() { }
}
```

---

### 🔒 [Authorize] with Roles

**Basic [Authorize]:**
```csharp
[Authorize]  // Any authenticated user
```

**Role-Specific [Authorize]:**
```csharp
[Authorize(Roles = "admin")]  // Only admin role users
[Authorize(Roles = "admin,manager")]  // Admin OR Manager
```

**Multiple Attributes (AND Condition):**
```csharp
[Authorize(Roles = "admin")]
[Authorize(Policy = "CanDelete")]  // Admin AND CanDelete policy
```

---

## 🛡️ Part 3: Protect UsersController Endpoints (45 min)

### 📝 Step 1: Open UsersController

1. **Solution Explorer** → **Controllers** → **UsersController.cs** pe **double-click**

---

### ✏️ Step 2: Add Using Statement

File ke top pe, existing using statements ke **BAAD** ye add karo:

```csharp
using Microsoft.AspNetCore.Authorization;  // ← Add this
```

---

### ✏️ Step 3: Apply [Authorize] Attribute

**Current UsersController (top part):**

```csharp
[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    // ... code
}
```

**Updated UsersController (with [Authorize]):**

```csharp
[Authorize]  // ← Add this line (protects all endpoints)
[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    // All endpoints below are now protected!
    // Token required for access
}
```

---

### 📖 What This Does?

**Before [Authorize]:**
```
GET /api/users → Anyone can access (no token needed)
POST /api/users → Anyone can create users
DELETE /api/users/1 → Anyone can delete users
```

**After [Authorize]:**
```
GET /api/users → 401 Unauthorized (without token)
GET /api/users + Valid Token → 200 OK ✅
POST /api/users + No Token → 401 Unauthorized
DELETE /api/users/1 + Expired Token → 401 Unauthorized
```

---

### 💾 Step 4: Save and Build

1. **Ctrl + S** press karke save karo

2. **Build Menu** → **Build Solution** (Ctrl + Shift + B)

3. **Output window** check karo:
   ```
   Build succeeded.
   ```

---

## 👤 Part 4: Create User Profile Endpoint (30 min)

### 🎯 Purpose

**Current Situation:**
- User login karta hai → Token milta hai
- But user ko apni information chahiye (profile page ke liye)

**Solution:**
- `/api/users/profile` endpoint banao
- Token se user ID extract karo
- User ki details return karo

---

### 📝 Step 1: Add Profile Endpoint in UsersController

**UsersController.cs** mein, existing endpoints ke **BAAD** ye method add karo:

```csharp
/// <summary>
/// Get current logged-in user profile
/// GET /api/users/profile
/// Requires: Valid JWT token
/// </summary>
[HttpGet("profile")]
public async Task<IActionResult> GetProfile()
{
    try
    {
        // Extract user ID from JWT token claims
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)
                          ?? User.FindFirst("sub");

        if (userIdClaim == null)
        {
            return Unauthorized(ApiResponse<object>.ErrorResponse("User ID not found in token"));
        }

        int userId = int.Parse(userIdClaim.Value);

        // Get user details from database
        var response = await _userService.GetUserByIdAsync(userId);

        if (!response.Success)
        {
            return NotFound(response);
        }

        // Return user profile
        return Ok(response);
    }
    catch (Exception ex)
    {
        return StatusCode(500, ApiResponse<object>.ErrorResponse($"Error: {ex.Message}"));
    }
}
```

**Save:** Ctrl + S

---

### 📖 Code Explanation

#### 1. Extract User ID from Token Claims

```csharp
var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)
                  ?? User.FindFirst("sub");
```

**What is User?**
- `User` = HttpContext.User (automatically available in controllers)
- Middleware ne populate kiya hai (UseAuthentication)
- Token ke claims contain karta hai

**What is FindFirst()?**
- Claims collection mein se specific claim dhoondhta hai
- `ClaimTypes.NameIdentifier` = Standard claim for user ID
- `"sub"` = JWT standard claim (Subject = User ID)
- `??` = Agar pehla nahi mila to dusra try karo

**Why two attempts?**
- Different claim types use hote hain
- Our JwtService uses "sub" claim (JWT standard)
- .NET sometimes uses NameIdentifier
- Dono try karne se compatibility better

---

#### 2. Parse User ID

```csharp
int userId = int.Parse(userIdClaim.Value);
```

**Why parse?**
- Claim value is always `string`
- Our User.Id is `int`
- Conversion required

---

#### 3. Get User from Database

```csharp
var response = await _userService.GetUserByIdAsync(userId);
```

**Reusing existing service method!**

---

### 🎯 How This Works End-to-End

**Request:**
```
GET /api/users/profile
Headers:
  Authorization: Bearer eyJhbGciOiJI...

Token Payload (decoded):
{
  "sub": "1",
  "email": "testuser@example.com",
  "role": "user"
}
```

**Backend Process:**
```
Step 1: Middleware validates token → HttpContext.User populated
Step 2: Controller executes GetProfile()
Step 3: Extract "sub" claim → userId = 1
Step 4: Query database for user ID 1
Step 5: Return user details
```

**Response:**
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "id": 1,
    "name": "Test User",
    "username": "testuser",
    "email": "testuser@example.com",
    "role": "user",
    "phone": "1234567890",
    "isActive": true
  }
}
```

---

## 👑 Part 5: Role-Based Authorization (Admin Only) (45 min)

### 🎯 Scenario

**Business Rule:**
- Delete user endpoint → **Only admins** should be able to use
- Regular users → Should get 403 Forbidden

---

### 📝 Step 1: Update DeleteUser Endpoint

**Find DeleteUser method in UsersController:**

```csharp
/// <summary>
/// Delete user (soft delete)
/// DELETE /api/users/{id}
/// </summary>
[HttpDelete("{id}")]
public async Task<IActionResult> DeleteUser(int id)
{
    // ... existing code
}
```

**Update to Admin-Only:**

```csharp
/// <summary>
/// Delete user (soft delete) - ADMIN ONLY
/// DELETE /api/users/{id}
/// Requires: Valid JWT token with "admin" role
/// </summary>
[Authorize(Roles = "admin")]  // ← Add this line
[HttpDelete("{id}")]
public async Task<IActionResult> DeleteUser(int id)
{
    try
    {
        // Extract current user ID from token
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)
                          ?? User.FindFirst("sub");
        
        if (userIdClaim == null)
        {
            return Unauthorized(ApiResponse<object>.ErrorResponse("User ID not found in token"));
        }

        int currentUserId = int.Parse(userIdClaim.Value);

        // Prevent admin from deleting themselves
        if (id == currentUserId)
        {
            return BadRequest(ApiResponse<object>.ErrorResponse("Cannot delete your own account"));
        }

        // Delete user
        var response = await _userService.DeleteUserAsync(id);

        if (!response.Success)
        {
            return NotFound(response);
        }

        return Ok(response);
    }
    catch (Exception ex)
    {
        return StatusCode(500, ApiResponse<object>.ErrorResponse($"Error: {ex.Message}"));
    }
}
```

**Save:** Ctrl + S

---

### 📖 [Authorize(Roles = "admin")] Explanation

**How it works:**

```
Request comes with token
         ↓
Middleware validates token → Extracts claims
         ↓
Claims include:
{
  "sub": "2",
  "email": "admin@example.com",
  "role": "admin"  ← Role claim
}
         ↓
[Authorize(Roles = "admin")] checks User.IsInRole("admin")
         ↓
    Role == "admin"?
         ↓
    ✅ YES                    ❌ NO
         ↓                         ↓
Controller executes        403 Forbidden
Return 200 OK             "You do not have permission"
```

---

### 🔑 Why "role" Claim Key?

**In JwtService.cs (Day 2), we added:**

```csharp
new Claim(ClaimTypes.Role, user.Role)
```

**ClaimTypes.Role** internally maps to:
- Claim type: `http://schemas.microsoft.com/ws/2008/06/identity/claims/role`
- But we reference it as: `ClaimTypes.Role`

**[Authorize(Roles = "admin")]** automatically checks this claim!

---

### 🛡️ Additional Security: Prevent Self-Delete

```csharp
int currentUserId = int.Parse(userIdClaim.Value);

if (id == currentUserId)
{
    return BadRequest(ApiResponse<object>.ErrorResponse("Cannot delete your own account"));
}
```

**Purpose:**
- Admin accidentally apna account delete na kar de
- System mein at least one admin rahega

---

### 📝 Step 2: Make Create User Admin-Only (Optional)

**Find CreateUser method:**

```csharp
[HttpPost]
public async Task<IActionResult> CreateUser([FromBody] CreateUserDto createUserDto)
{
    // ... existing code
}
```

**Update (if you want admin-only user creation):**

```csharp
[Authorize(Roles = "admin")]  // ← Add this
[HttpPost]
public async Task<IActionResult> CreateUser([FromBody] CreateUserDto createUserDto)
{
    // ... existing code
}
```

**Or keep it open for all authenticated users:**

```csharp
// No role specified → Any authenticated user can create
[HttpPost]
public async Task<IActionResult> CreateUser([FromBody] CreateUserDto createUserDto)
{
    // ... existing code
}
```

**For our project, let's keep it open (any authenticated user can create users).**

---

## 🚫 Part 6: Custom Unauthorized Response (30 min)

### 🎯 Problem

**Current behavior:**

```
Request without token → 401 Unauthorized
Default response: Empty or minimal message
```

**Better behavior:**

```
Clear error message
Consistent with our ApiResponse format
```

---

### 📝 Step 1: Configure JWT Events in Program.cs

1. **Open Program.cs**

2. **Find the `AddJwtBearer` configuration** (Day 2 mein add kiya tha):

```csharp
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        // ... existing validation parameters
    };
});
```

3. **Update to include Events:**

```csharp
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
        ValidateIssuer = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidateAudience = true,
        ValidAudience = jwtSettings["Audience"],
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };

    // Custom response for authentication failures
    options.Events = new JwtBearerEvents
    {
        OnChallenge = context =>
        {
            // Skip default behavior
            context.HandleResponse();

            // Set status code
            context.Response.StatusCode = 401;
            context.Response.ContentType = "application/json";

            // Custom error message
            var result = System.Text.Json.JsonSerializer.Serialize(new
            {
                success = false,
                message = "Authentication failed. Token is missing, invalid, or expired.",
                data = (object)null,
                errors = new[] { "Please provide a valid JWT token in Authorization header." }
            });

            return context.Response.WriteAsync(result);
        },
        OnForbidden = context =>
        {
            // Set status code
            context.Response.StatusCode = 403;
            context.Response.ContentType = "application/json";

            // Custom error message
            var result = System.Text.Json.JsonSerializer.Serialize(new
            {
                success = false,
                message = "Access denied. You do not have permission to perform this action.",
                data = (object)null,
                errors = new[] { "Insufficient privileges. Admin role required." }
            });

            return context.Response.WriteAsync(result);
        }
    };
});
```

**Save:** Ctrl + S

---

### 📖 Events Explanation

#### OnChallenge Event

**When triggered:**
- No token provided
- Invalid token (bad signature)
- Expired token
- Malformed token

**Custom Response:**
```json
{
  "success": false,
  "message": "Authentication failed. Token is missing, invalid, or expired.",
  "data": null,
  "errors": [
    "Please provide a valid JWT token in Authorization header."
  ]
}
```

**Status Code:** 401 Unauthorized

---

#### OnForbidden Event

**When triggered:**
- Valid token present ✅
- But user role doesn't match required role
- Example: User tries to delete (requires admin)

**Custom Response:**
```json
{
  "success": false,
  "message": "Access denied. You do not have permission to perform this action.",
  "data": null,
  "errors": [
    "Insufficient privileges. Admin role required."
  ]
}
```

**Status Code:** 403 Forbidden

---

### 🔄 Build and Test

1. **Save all files:** Ctrl + S

2. **Build Solution:** Ctrl + Shift + B

3. **Check for errors** in Output window

**Expected:** Build succeeded ✅

---

## 🧪 Part 7: Complete Testing (Postman) (60 min)

### ▶️ Step 1: Run Backend

1. **Visual Studio** → **Green Play button (▶)**

2. **Swagger** opens: `https://localhost:7001/swagger`

**Backend running!** ✅

---

### 📮 Step 2: Test WITHOUT Token (401 Unauthorized)

#### Test 1: Get All Users (No Token)

**Postman:**

**Method:** GET

**URL:**
```
https://localhost:7001/api/users
```

**Headers:** (No Authorization header)

**Send Request**

**Expected Response:**

**Status:** 401 Unauthorized

**Body:**
```json
{
  "success": false,
  "message": "Authentication failed. Token is missing, invalid, or expired.",
  "data": null,
  "errors": [
    "Please provide a valid JWT token in Authorization header."
  ]
}
```

**✅ Protected! Cannot access without token!**

---

### 🔑 Step 3: Register & Get Token

**New Request:**

**Method:** POST

**URL:**
```
https://localhost:7001/api/auth/register
```

**Body (JSON):**
```json
{
  "name": "Regular User",
  "username": "regularuser",
  "email": "regular@example.com",
  "password": "User@123",
  "phone": "9999999999"
}
```

**Send Request**

**Expected Response:**

**Status:** 200 OK

**Body:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "Regular User",
    "username": "regularuser",
    "email": "regular@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJyZWd1bGFyQGV4YW1wbGUuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IlJlZ3VsYXIgVXNlciIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6InVzZXIiLCJ1c2VybmFtZSI6InJlZ3VsYXJ1c2VyIiwianRpIjoiYTFiMmMzZDQtZTVmNi00Nzg5LTkwYWItYjFjMmQzZTRmNWE2IiwiaWF0IjoiMTcwMDAwMDAwMCIsImV4cCI6MTcwMDAzNjAwLCJpc3MiOiJBZG1pblBhbmVsQVBJIiwiYXVkIjoiQWRtaW5QYW5lbEZyb250ZW5kIn0.signature_here"
  },
  "errors": null
}
```

**Copy this token!** (Long string in `data.token`)

---

### 🔓 Step 4: Test WITH Token (200 OK)

#### Test 2: Get All Users (With Token)

**Postman:**

**Method:** GET

**URL:**
```
https://localhost:7001/api/users
```

**Headers Tab:**
- **Key:** `Authorization`
- **Value:** `Bearer {paste_token_here}`

**Example:**
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIi...
```

⚠️ **Important:** `Bearer` ke baad **space** hona chahiye!

**Send Request**

**Expected Response:**

**Status:** 200 OK

**Body:**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Regular User",
      "username": "regularuser",
      "email": "regular@example.com",
      "role": "user",
      "phone": "9999999999",
      "isActive": true
    }
  ],
  "errors": null
}
```

**✅ Success! Token validated, access granted!**

---

### 👤 Step 5: Test User Profile Endpoint

**Method:** GET

**URL:**
```
https://localhost:7001/api/users/profile
```

**Headers:**
```
Authorization: Bearer {token}
```

**Send Request**

**Expected Response:**

**Status:** 200 OK

**Body:**
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "id": 1,
    "name": "Regular User",
    "username": "regularuser",
    "email": "regular@example.com",
    "role": "user",
    "phone": "9999999999",
    "isActive": true
  },
  "errors": null
}
```

**✅ Profile endpoint working! Token se user ID extract karke details return kiye!**

---

### 🚫 Step 6: Test Role-Based (User tries to delete - 403 Forbidden)

**Create another user first (for deletion test):**

**Register second user:**

**Body:**
```json
{
  "name": "Test User 2",
  "username": "testuser2",
  "email": "test2@example.com",
  "password": "Test@123",
  "phone": "8888888888"
}
```

**Response will have user ID: 2**

---

**Now, try to delete with regular user token:**

**Method:** DELETE

**URL:**
```
https://localhost:7001/api/users/2
```

**Headers:**
```
Authorization: Bearer {regular_user_token}
```

**Send Request**

**Expected Response:**

**Status:** 403 Forbidden

**Body:**
```json
{
  "success": false,
  "message": "Access denied. You do not have permission to perform this action.",
  "data": null,
  "errors": [
    "Insufficient privileges. Admin role required."
  ]
}
```

**✅ Role-based authorization working! User cannot delete!**

---

### 👑 Step 7: Create Admin User & Test Delete

**Register admin user:**

**Body:**
```json
{
  "name": "Admin User",
  "username": "admin",
  "email": "admin@example.com",
  "password": "Admin@123",
  "phone": "7777777777"
}
```

**Response has user ID: 3**

---

**Manually update role in SSMS:**

1. **Open SSMS**

2. **New Query:**

```sql
UPDATE Users
SET Role = 'admin'
WHERE Email = 'admin@example.com'
```

**Execute:** F5

**Verify:**
```sql
SELECT * FROM Users WHERE Email = 'admin@example.com'
```

**Result:** Role should be "admin" ✅

---

**Login with admin credentials:**

**Method:** POST

**URL:**
```
https://localhost:7001/api/auth/login
```

**Body:**
```json
{
  "email": "admin@example.com",
  "password": "Admin@123"
}
```

**Response will have admin token!** Copy it!

---

**Now delete user with admin token:**

**Method:** DELETE

**URL:**
```
https://localhost:7001/api/users/2
```

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Send Request**

**Expected Response:**

**Status:** 200 OK

**Body:**
```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": null,
  "errors": null
}
```

**✅ Admin can delete! Role-based authorization working perfectly!**

---

### 🧪 Step 8: Test Invalid Token (401)

**Modify token (make it invalid):**

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiWRONGTOKEN...
                            ↑ Changed some characters
```

**Method:** GET

**URL:**
```
https://localhost:7001/api/users
```

**Send Request**

**Expected Response:**

**Status:** 401 Unauthorized

**Body:**
```json
{
  "success": false,
  "message": "Authentication failed. Token is missing, invalid, or expired.",
  "data": null,
  "errors": [
    "Please provide a valid JWT token in Authorization header."
  ]
}
```

**✅ Invalid token detected and rejected!**

---

### ⏰ Step 9: Test Expired Token (401)

**To test expiry:**

1. **appsettings.json** open karo

2. **Change ExpiryMinutes:**
```json
"ExpiryMinutes": 1  // 1 minute
```

3. **Save and restart backend**

4. **Register new user** → Get token

5. **Use token immediately** → Works ✅

6. **Wait 1+ minutes**

7. **Use same token** → 401 Unauthorized ✅

**Reset ExpiryMinutes back to 60!**

---

### 🧪 Step 10: Test Self-Delete Prevention (Admin)

**Login as admin** (get admin token)

**Try to delete yourself:**

**Method:** DELETE

**URL:**
```
https://localhost:7001/api/users/3  ← Admin user ID
```

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Send Request**

**Expected Response:**

**Status:** 400 Bad Request

**Body:**
```json
{
  "success": false,
  "message": "Cannot delete your own account",
  "data": null,
  "errors": null
}
```

**✅ Security check working! Admin cannot delete themselves!**

---

## ✅ Summary & Checklist

### Aaj Kya Kiya? 🎯

1. **Authentication Middleware Understanding** ✅
   - Request pipeline
   - UseAuthentication() role
   - Token validation process

2. **[Authorize] Attribute** ✅
   - Controller level protection
   - Action level protection
   - How it checks HttpContext.User

3. **Protected UsersController** ✅
   - All endpoints require token
   - Unauthorized access → 401

4. **User Profile Endpoint** ✅
   - Extract user ID from token claims
   - Return logged-in user details

5. **Role-Based Authorization** ✅
   - [Authorize(Roles = "admin")]
   - Delete endpoint admin-only
   - Self-delete prevention

6. **Custom Error Responses** ✅
   - OnChallenge (401) custom message
   - OnForbidden (403) custom message
   - Consistent ApiResponse format

7. **Complete Testing** ✅
   - Without token → 401
   - With valid token → 200 OK
   - Wrong role → 403 Forbidden
   - Invalid token → 401
   - Expired token → 401
   - Profile endpoint working
   - Admin operations working

---

### Project Status 📊

```
AdminPanelAPI/
├── Controllers/
│   ├── AuthController.cs         (Register/Login - public)
│   └── UsersController.cs        ← UPDATED ([Authorize] + Profile + Role-based)
├── Services/
│   └── JwtService.cs             (Token generation - from Day 2)
├── Program.cs                    ← UPDATED (Custom 401/403 responses)
└── appsettings.json              (JWT settings - from Day 2)

Authentication Flow Complete:
✅ Register → Token
✅ Login → Token
✅ Protected endpoints → Token validation
✅ Role-based access → Admin operations
✅ User profile → Claims extraction
✅ Custom error responses
```

---

## 🎓 Key Concepts Learned

### 1. Middleware Pipeline

**Order matters:**
```
UseAuthentication() → MUST come before UseAuthorization()
```

**Why?**
- Authentication extracts user info from token
- Authorization checks permissions based on user info
- Wrong order → Authorization has no user info!

---

### 2. [Authorize] Attribute

**Levels:**
- `[Authorize]` → Any authenticated user
- `[Authorize(Roles = "admin")]` → Specific role
- `[AllowAnonymous]` → Bypass authentication

---

### 3. Claims Extraction

```csharp
User.FindFirst("sub")  // User ID
User.FindFirst(ClaimTypes.Role)  // User role
User.Identity.Name  // User name
```

**Available in controllers automatically!**

---

### 4. HTTP Status Codes

- **401 Unauthorized:** No token / Invalid token / Expired token
- **403 Forbidden:** Valid token, but insufficient permissions
- **200 OK:** Success (with valid token and permissions)

---

## 🚀 Tomorrow's Preview: Day 5

**Topics:**
- Frontend authentication integration
- Axios interceptors (auto token attach)
- Login page (React + MUI)
- Protected routes
- Token storage (localStorage)
- Auto logout on token expiry

**What You'll Build:**
- Complete login UI
- Token management
- Protected frontend routes
- Seamless auth flow

---

## 💻 Practice Tasks

### ⭐ Task 1: Add More Protected Endpoints (Easy)

**Goal:** Search endpoint ko bhi protect karo

**Steps:**
1. UsersController mein Search endpoint already hai
2. [Authorize] attribute controller level pe hai
3. Test karo: Search without token → 401
4. Search with token → 200 OK

---

### ⭐⭐ Task 2: Create "Get User by ID" with Authorization (Medium)

**Goal:** User sirf apni ID se details fetch kar sake (ya admin kisi bhi ID se)

**Steps:**
1. GetUserById endpoint mein logic add karo:
```csharp
[HttpGet("{id}")]
public async Task<IActionResult> GetUserById(int id)
{
    var currentUserId = int.Parse(User.FindFirst("sub").Value);
    var userRole = User.FindFirst(ClaimTypes.Role).Value;
    
    // User can only see their own profile (unless admin)
    if (userRole != "admin" && id != currentUserId)
    {
        return Forbid();  // 403
    }
    
    // Continue with existing logic
}
```
2. Test with regular user token (different ID) → 403
3. Test with admin token (any ID) → 200 OK

---

### ⭐⭐⭐ Task 3: Implement "Change Password" Endpoint (Hard)

**Goal:** Authenticated user apna password change kar sake

**Steps:**
1. DTO banao: ChangePasswordDto (oldPassword, newPassword)
2. Endpoint: `POST /api/users/change-password`
3. Logic:
   - Extract user ID from token
   - Verify oldPassword matches current PasswordHash
   - Hash newPassword
   - Update database
4. Test with Postman
5. Login with new password to verify

---

## 🎉 Congratulations!

**Day 4 Complete!** 🎊

Aaj aapne **complete backend authentication** implement kar liya!

**What You Achieved:**
- ✅ Middleware understanding (pipeline)
- ✅ [Authorize] attribute mastered
- ✅ Protected endpoints working
- ✅ Role-based authorization implemented
- ✅ User profile endpoint created
- ✅ Custom error responses configured
- ✅ Complete testing done (all scenarios)

**Tomorrow:** Frontend authentication integration! Login page, token management, protected routes! 🎨🔐

**Backend authentication complete! Frontend integration coming next!** 💪✨

---

