# 📅 Week 5 - Day 5: Advanced Authorization & Policies

## 🎯 Aaj ka Goal

Day 4 mein basic role-based authorization implement kiya (Admin vs User). Aaj hum **advanced authorization** seekhenge! 🔐

**Kya Karenge:**
- Multiple roles (Admin, Manager, User)
- Policy-based authorization
- Custom authorization requirements
- Audit logging for security
- Advanced permission scenarios
- Complete role management system

**Output:** Enterprise-level authorization system with multiple roles and policies! 🏢

---

## ⏰ Aaj ka Session Breakdown (4-5 Hours)

| Part | Topic | Time |
|------|-------|------|
| 1 | Understanding Policy-Based Authorization | 30 min |
| 2 | Create Multiple Role System | 45 min |
| 3 | Implement Authorization Policies | 45 min |
| 4 | Custom Authorization Requirements | 45 min |
| 5 | Audit Logging Implementation | 30 min |
| 6 | Role Management Endpoints | 45 min |
| 7 | Complete Testing (All Scenarios) | 60 min |

---

## 📚 Part 1: Understanding Policy-Based Authorization (30 min)

### 🔒 Role-Based vs Policy-Based

**Day 4 mein humne dekha (Role-Based):**

```csharp
[Authorize(Roles = "admin")]  // Simple: Role check karo
```

**Limitations:**
```
❌ Only role check kar sakte hain
❌ Complex conditions nahi laga sakte
❌ Business logic add karna difficult
❌ Flexibility kam hai

Example scenarios that are difficult:
- Admin who is also from same department
- User who created the resource
- Manager with specific permissions
```

---

### 🎯 Policy-Based Authorization (Advanced)

**What is Policy?**
```
Policy = Named authorization rule with custom logic
```

**Example:**
```csharp
[Authorize(Policy = "AdminOnly")]
[Authorize(Policy = "CanDeleteUsers")]
[Authorize(Policy = "MinimumAge18")]
[Authorize(Policy = "SameDepartmentOnly")]
```

**Advantages:**
```
✅ Custom logic implement kar sakte hain
✅ Multiple conditions combine kar sakte hain
✅ Reusable across controllers
✅ Centralized policy management
✅ Business rules easily implement
```

---

### 🏢 Real-Life Analogy: Company Access System

**Role-Based (Simple):**
```
Employee Badge Color:
- Red Badge (Admin) → All areas access
- Blue Badge (Manager) → Office floors only
- Green Badge (Employee) → Ground floor only

Simple but rigid!
```

**Policy-Based (Flexible):**
```
Access Policy Rules:
- "CanEnterServerRoom" Policy:
  ├─ Is Admin? ✅
  ├─ Is IT Department? ✅
  ├─ Has clearance level 5+? ✅
  └─ All conditions must pass

- "CanApproveLeave" Policy:
  ├─ Is Manager? ✅
  ├─ Same department as requester? ✅
  └─ Has been manager for 6+ months? ✅

More flexible, business logic included!
```

---

### 🔄 How Policy-Based Authorization Works

**Flow:**

```
Request comes
    ↓
[Authorize(Policy = "AdminOnly")] attribute checks
    ↓
Policy definition (Program.cs mein configured)
    ↓
Policy Requirements execute (custom logic)
    ↓
RequirementHandler checks conditions
    ↓
All requirements pass?
    ↓
✅ YES                    ❌ NO
    ↓                          ↓
Allow access              403 Forbidden
```

---

## 👥 Part 2: Create Multiple Role System (45 min)

### 📋 Step 1: Define Role Constants

1. **Solution Explorer** → **Project pe right-click** → **Add** → **New Folder**

2. **Name:** `Constants`

3. **Constants folder pe right-click** → **Add** → **Class**

4. **Name:** `Roles.cs`

5. **Code likho:**

```csharp
namespace AdminPanelAPI.Constants
{
    /// <summary>
    /// System roles constants
    /// </summary>
    public static class Roles
    {
        public const string Admin = "admin";
        public const string Manager = "manager";
        public const string User = "user";

        /// <summary>
        /// Get all available roles
        /// </summary>
        public static string[] GetAllRoles()
        {
            return new[] { Admin, Manager, User };
        }

        /// <summary>
        /// Check if role is valid
        /// </summary>
        public static bool IsValidRole(string role)
        {
            return role == Admin || role == Manager || role == User;
        }
    }
}
```

**Save:** Ctrl + S

---

### 📖 Why Constants?

**Without Constants (❌ Bad):**
```csharp
// Typos possible!
[Authorize(Roles = "admim")]  // Typo: admim
user.Role = "adnim";  // Typo: adnim
if (role == "admin")  // Hardcoded string everywhere
```

**With Constants (✅ Good):**
```csharp
using AdminPanelAPI.Constants;

[Authorize(Roles = Roles.Admin)]  // No typos, IntelliSense support
user.Role = Roles.Manager;  // Type-safe
if (role == Roles.Admin)  // Centralized
```

---

### 📝 Step 2: Create Policies Constants

**Constants folder mein new class:**

**Name:** `Policies.cs`

**Code:**

```csharp
namespace AdminPanelAPI.Constants
{
    /// <summary>
    /// Authorization policies constants
    /// </summary>
    public static class Policies
    {
        // Role-based policies
        public const string AdminOnly = "AdminOnly";
        public const string ManagerOnly = "ManagerOnly";
        public const string AdminOrManager = "AdminOrManager";

        // Permission-based policies
        public const string CanDeleteUsers = "CanDeleteUsers";
        public const string CanEditUsers = "CanEditUsers";
        public const string CanViewAllUsers = "CanViewAllUsers";

        // Age-based policies (example)
        public const string MinimumAge18 = "MinimumAge18";
    }
}
```

**Save:** Ctrl + S

---

### 📁 Step 3: Update RegisterDto for Role Selection

**Open:** `DTOs/RegisterDto.cs`

**Add Role property:**

```csharp
using System.ComponentModel.DataAnnotations;

namespace AdminPanelAPI.DTOs
{
    public class RegisterDto
    {
        [Required(ErrorMessage = "Name is required")]
        [StringLength(100, ErrorMessage = "Name cannot exceed 100 characters")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Username is required")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Username must be between 3 and 50 characters")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        [StringLength(100, ErrorMessage = "Email cannot exceed 100 characters")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters")]
        public string Password { get; set; }

        [Phone(ErrorMessage = "Invalid phone number")]
        [StringLength(20, ErrorMessage = "Phone cannot exceed 20 characters")]
        public string? Phone { get; set; }

        // NEW: Role selection (optional, defaults to "user")
        [StringLength(20, ErrorMessage = "Role cannot exceed 20 characters")]
        public string? Role { get; set; }  // ← Add this
    }
}
```

**Save:** Ctrl + S

---

### 📝 Step 4: Update AuthController Register Method

**Open:** `Controllers/AuthController.cs`

**Find Register method and update:**

```csharp
using AdminPanelAPI.Constants;  // ← Add this using

// ... existing code ...

[HttpPost("register")]
public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
{
    try
    {
        // 1. Check if email already exists
        var existingUsers = await _userService.GetAllUsersAsync();
        if (existingUsers.Data.Any(u => u.Email.ToLower() == registerDto.Email.ToLower()))
        {
            return BadRequest(ApiResponse<object>.ErrorResponse("Email already registered"));
        }

        // 2. Check if username already exists
        if (existingUsers.Data.Any(u => u.Username.ToLower() == registerDto.Username.ToLower()))
        {
            return BadRequest(ApiResponse<object>.ErrorResponse("Username already taken"));
        }

        // 3. Validate role (NEW)
        string role = registerDto.Role ?? Roles.User;  // Default to "user"
        if (!string.IsNullOrEmpty(registerDto.Role) && !Roles.IsValidRole(registerDto.Role))
        {
            return BadRequest(ApiResponse<object>.ErrorResponse($"Invalid role. Valid roles: {string.Join(", ", Roles.GetAllRoles())}"));
        }

        // 4. Hash the password
        string passwordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);

        // 5. Create new user object
        var newUser = new User
        {
            Name = registerDto.Name,
            Username = registerDto.Username,
            Email = registerDto.Email,
            PasswordHash = passwordHash,
            Phone = registerDto.Phone,
            Role = role,  // ← Updated: Use validated role
            IsActive = true,
            CreatedDate = DateTime.UtcNow
        };

        // 6. Save user to database
        var result = await _userService.CreateUserAsync(newUser);

        if (!result.Success)
        {
            return BadRequest(result);
        }

        // 7. Generate JWT token
        string token = _jwtService.GenerateToken(result.Data);

        // 8. Return success response with token
        var authResponse = new AuthResponseDto
        {
            Id = result.Data.Id,
            Name = result.Data.Name,
            Username = result.Data.Username,
            Email = result.Data.Email,
            Role = result.Data.Role,
            Token = token
        };

        return Ok(ApiResponse<AuthResponseDto>.SuccessResponse(
            authResponse,
            "User registered successfully"
        ));
    }
    catch (Exception ex)
    {
        return StatusCode(500, ApiResponse<object>.ErrorResponse($"Registration failed: {ex.Message}"));
    }
}
```

**Save:** Ctrl + S

---

## 🎯 Part 3: Implement Authorization Policies (45 min)

### 📝 Step 1: Configure Policies in Program.cs

**Open:** `Program.cs`

**Find the authentication configuration (after `builder.Services.AddAuthentication`):**

**Add this AFTER the `.AddJwtBearer(...)` section:**

```csharp
using AdminPanelAPI.Constants;  // ← Add this at top

// ... existing code ...

// JWT Authentication Configuration (existing)
builder.Services.AddAuthentication(options => { ... })
.AddJwtBearer(options => { ... });

// Authorization Policies Configuration (NEW - Add this)
builder.Services.AddAuthorization(options =>
{
    // Role-based policies
    options.AddPolicy(Policies.AdminOnly, policy =>
        policy.RequireRole(Roles.Admin));

    options.AddPolicy(Policies.ManagerOnly, policy =>
        policy.RequireRole(Roles.Manager));

    options.AddPolicy(Policies.AdminOrManager, policy =>
        policy.RequireRole(Roles.Admin, Roles.Manager));

    // Permission-based policies
    options.AddPolicy(Policies.CanDeleteUsers, policy =>
        policy.RequireRole(Roles.Admin));

    options.AddPolicy(Policies.CanEditUsers, policy =>
        policy.RequireRole(Roles.Admin, Roles.Manager));

    options.AddPolicy(Policies.CanViewAllUsers, policy =>
        policy.RequireRole(Roles.Admin, Roles.Manager, Roles.User));

    // Example: Age-based policy (if User model had DateOfBirth)
    // options.AddPolicy(Policies.MinimumAge18, policy =>
    //     policy.Requirements.Add(new MinimumAgeRequirement(18)));
});

var app = builder.Build();
```

**Save:** Ctrl + S

---

### 📖 Policy Configuration Explanation

#### 1. RequireRole (Single Role)

```csharp
options.AddPolicy(Policies.AdminOnly, policy =>
    policy.RequireRole(Roles.Admin));
```

**Meaning:**
- Policy name: "AdminOnly"
- Requirement: User must have "admin" role
- Usage: `[Authorize(Policy = Policies.AdminOnly)]`

---

#### 2. RequireRole (Multiple Roles - OR Condition)

```csharp
options.AddPolicy(Policies.AdminOrManager, policy =>
    policy.RequireRole(Roles.Admin, Roles.Manager));
```

**Meaning:**
- User must have "admin" **OR** "manager" role
- Any one role is enough

---

#### 3. Permission-Based Policies

```csharp
options.AddPolicy(Policies.CanDeleteUsers, policy =>
    policy.RequireRole(Roles.Admin));

options.AddPolicy(Policies.CanEditUsers, policy =>
    policy.RequireRole(Roles.Admin, Roles.Manager));
```

**Purpose:**
- Separate permissions from roles
- More semantic meaning
- Easy to change permissions later (centralized)

**Example:**
```
Today: CanDeleteUsers = Admin only
Tomorrow: CanDeleteUsers = Admin + Manager (just change policy!)
```

---

### 📝 Step 2: Apply Policies to Controllers

**Update UsersController:**

**Open:** `Controllers/UsersController.cs`

**Update using statements:**

```csharp
using AdminPanelAPI.Constants;  // ← Add this
using Microsoft.AspNetCore.Authorization;
// ... other usings
```

**Update endpoints with policies:**

```csharp
[Authorize]  // All endpoints require authentication
[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    /// <summary>
    /// Get all users (Admin and Manager only)
    /// </summary>
    [Authorize(Policy = Policies.CanViewAllUsers)]  // ← Policy instead of role
    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        var response = await _userService.GetAllUsersAsync();
        return Ok(response);
    }

    /// <summary>
    /// Get user by ID (Admin and Manager only)
    /// </summary>
    [Authorize(Policy = Policies.AdminOrManager)]  // ← Admin or Manager
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(int id)
    {
        var response = await _userService.GetUserByIdAsync(id);

        if (!response.Success)
        {
            return NotFound(response);
        }

        return Ok(response);
    }

    /// <summary>
    /// Search users (All authenticated users)
    /// </summary>
    [HttpGet("search")]
    public async Task<IActionResult> SearchUsers([FromQuery] string query)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return BadRequest(ApiResponse<object>.ErrorResponse("Search query cannot be empty"));
        }

        var response = await _userService.SearchUsersAsync(query);
        return Ok(response);
    }

    /// <summary>
    /// Get current user profile (All authenticated users)
    /// </summary>
    [HttpGet("profile")]
    public async Task<IActionResult> GetProfile()
    {
        try
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)
                              ?? User.FindFirst("sub");

            if (userIdClaim == null)
            {
                return Unauthorized(ApiResponse<object>.ErrorResponse("User ID not found in token"));
            }

            int userId = int.Parse(userIdClaim.Value);
            var response = await _userService.GetUserByIdAsync(userId);

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

    /// <summary>
    /// Create user (Admin and Manager can create)
    /// </summary>
    [Authorize(Policy = Policies.CanEditUsers)]  // ← Admin or Manager
    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserDto createUserDto)
    {
        var response = await _userService.CreateUserAsync(createUserDto);

        if (!response.Success)
        {
            return BadRequest(response);
        }

        return CreatedAtAction(nameof(GetUserById), new { id = response.Data.Id }, response);
    }

    /// <summary>
    /// Update user (Admin and Manager only)
    /// </summary>
    [Authorize(Policy = Policies.CanEditUsers)]  // ← Admin or Manager
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserDto updateUserDto)
    {
        var response = await _userService.UpdateUserAsync(id, updateUserDto);

        if (!response.Success)
        {
            return NotFound(response);
        }

        return Ok(response);
    }

    /// <summary>
    /// Delete user (Admin only) - DANGEROUS OPERATION
    /// </summary>
    [Authorize(Policy = Policies.CanDeleteUsers)]  // ← Admin only (most restrictive)
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        try
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)
                              ?? User.FindFirst("sub");

            if (userIdClaim == null)
            {
                return Unauthorized(ApiResponse<object>.ErrorResponse("User ID not found in token"));
            }

            int currentUserId = int.Parse(userIdClaim.Value);

            // Prevent self-delete
            if (id == currentUserId)
            {
                return BadRequest(ApiResponse<object>.ErrorResponse("Cannot delete your own account"));
            }

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
}
```

**Save:** Ctrl + S

---

## 🛠️ Part 4: Custom Authorization Requirements (45 min)

### 🎯 Scenario: Same Department Only

**Business Rule:**
- Manager can only view/edit users from their own department
- Admin can view/edit all users

**Implementation:**

### 📝 Step 1: Add Department to User Model (Optional Example)

**Note:** This is an advanced example. For simplicity, we'll demonstrate the pattern without actually modifying the database.

**Concept:**
```csharp
// If User model had Department field:
public string Department { get; set; }  // "IT", "HR", "Sales"

// Custom requirement:
"Manager can only edit users from same department"
```

---

### 📝 Step 2: Create Custom Authorization Requirement

**Create New Folder:** `Authorization`

**Create class:** `Requirements/MinimumAgeRequirement.cs`

```csharp
using Microsoft.AspNetCore.Authorization;

namespace AdminPanelAPI.Authorization.Requirements
{
    /// <summary>
    /// Requirement: User must be at least specified age
    /// Example of custom authorization requirement
    /// </summary>
    public class MinimumAgeRequirement : IAuthorizationRequirement
    {
        public int MinimumAge { get; }

        public MinimumAgeRequirement(int minimumAge)
        {
            MinimumAge = minimumAge;
        }
    }
}
```

**Save:** Ctrl + S

---

### 📝 Step 3: Create Authorization Handler

**Create class:** `Handlers/MinimumAgeHandler.cs`

```csharp
using AdminPanelAPI.Authorization.Requirements;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace AdminPanelAPI.Authorization.Handlers
{
    /// <summary>
    /// Handler for MinimumAgeRequirement
    /// Checks if user's age meets minimum requirement
    /// </summary>
    public class MinimumAgeHandler : AuthorizationHandler<MinimumAgeRequirement>
    {
        protected override Task HandleRequirementAsync(
            AuthorizationHandlerContext context,
            MinimumAgeRequirement requirement)
        {
            // Get DateOfBirth claim from token
            var dateOfBirthClaim = context.User.FindFirst(c => c.Type == "DateOfBirth");

            if (dateOfBirthClaim == null)
            {
                // No DateOfBirth claim → Requirement not met
                return Task.CompletedTask;
            }

            // Parse date
            if (!DateTime.TryParse(dateOfBirthClaim.Value, out DateTime dateOfBirth))
            {
                return Task.CompletedTask;
            }

            // Calculate age
            int age = DateTime.Today.Year - dateOfBirth.Year;
            if (dateOfBirth.Date > DateTime.Today.AddYears(-age))
            {
                age--;
            }

            // Check if age meets requirement
            if (age >= requirement.MinimumAge)
            {
                context.Succeed(requirement);  // ✅ Requirement met!
            }

            return Task.CompletedTask;
        }
    }
}
```

**Save:** Ctrl + S

---

### 📖 Custom Handler Explanation

**Flow:**

```
1. [Authorize(Policy = "MinimumAge18")] attribute
       ↓
2. Policy registered with MinimumAgeRequirement(18)
       ↓
3. MinimumAgeHandler executes
       ↓
4. Handler logic:
   - Find "DateOfBirth" claim in token
   - Calculate age
   - Check if age >= 18
       ↓
5. context.Succeed(requirement) OR nothing (fail)
       ↓
6. Authorization result: ✅ Success or ❌ Forbidden
```

---

### 📝 Step 4: Register Handler in Program.cs

**Open:** `Program.cs`

**Add after services registration:**

```csharp
using AdminPanelAPI.Authorization.Handlers;
using AdminPanelAPI.Authorization.Requirements;
using Microsoft.AspNetCore.Authorization;

// ... existing code ...

// Register Authorization Handler (NEW)
builder.Services.AddSingleton<IAuthorizationHandler, MinimumAgeHandler>();

// Authorization Policies Configuration (existing, update)
builder.Services.AddAuthorization(options =>
{
    // ... existing policies ...

    // Custom requirement policy
    options.AddPolicy(Policies.MinimumAge18, policy =>
        policy.Requirements.Add(new MinimumAgeRequirement(18)));
});
```

**Save:** Ctrl + S

---

## 📊 Part 5: Audit Logging Implementation (30 min)

### 🎯 Purpose

**Why Audit Logging?**
```
Security Tracking:
- Who accessed what?
- When did they access?
- What action was performed?
- Was it successful or failed?

Compliance:
- GDPR, HIPAA requirements
- Security audits
- Forensic analysis
```

---

### 📝 Step 1: Create AuditLog Model

**Create:** `Models/AuditLog.cs`

```csharp
namespace AdminPanelAPI.Models
{
    /// <summary>
    /// Audit log for tracking user actions
    /// </summary>
    public class AuditLog
    {
        public int Id { get; set; }
        public string Action { get; set; }  // "Login", "DeleteUser", "UpdateUser"
        public string UserId { get; set; }  // User who performed action
        public string UserEmail { get; set; }
        public string UserRole { get; set; }
        public string? TargetId { get; set; }  // ID of affected resource
        public string? TargetType { get; set; }  // "User", "Product", etc.
        public string? Details { get; set; }  // Additional details (JSON)
        public bool Success { get; set; }  // Was action successful?
        public string? ErrorMessage { get; set; }  // If failed, why?
        public DateTime Timestamp { get; set; }
        public string IpAddress { get; set; }
    }
}
```

**Save:** Ctrl + S

---

### 📝 Step 2: Add AuditLog to DbContext

**Open:** `Data/ApplicationDbContext.cs`

**Add DbSet:**

```csharp
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<AuditLog> AuditLogs { get; set; }  // ← Add this

    // ... existing OnModelCreating ...
}
```

**Save:** Ctrl + S

---

### 📝 Step 3: Create Migration

**Package Manager Console:**

```powershell
Add-Migration AddAuditLogging
```

**Output:**
```
Build started...
Build succeeded.
To undo this action, use Remove-Migration.
```

**Run Migration:**

```powershell
Update-Database
```

**Output:**
```
Applying migration '..._AddAuditLogging'.
Done.
```

---

### 📝 Step 4: Create AuditService

**Create:** `Services/Interfaces/IAuditService.cs`

```csharp
using AdminPanelAPI.Models;

namespace AdminPanelAPI.Services.Interfaces
{
    public interface IAuditService
    {
        Task LogActionAsync(string action, string userId, string userEmail, string userRole,
            string? targetId = null, string? targetType = null, string? details = null,
            bool success = true, string? errorMessage = null, string? ipAddress = null);
    }
}
```

**Save:** Ctrl + S

---

**Create:** `Services/AuditService.cs`

```csharp
using AdminPanelAPI.Data;
using AdminPanelAPI.Models;
using AdminPanelAPI.Services.Interfaces;

namespace AdminPanelAPI.Services
{
    public class AuditService : IAuditService
    {
        private readonly ApplicationDbContext _context;

        public AuditService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task LogActionAsync(string action, string userId, string userEmail, string userRole,
            string? targetId = null, string? targetType = null, string? details = null,
            bool success = true, string? errorMessage = null, string? ipAddress = null)
        {
            var auditLog = new AuditLog
            {
                Action = action,
                UserId = userId,
                UserEmail = userEmail,
                UserRole = userRole,
                TargetId = targetId,
                TargetType = targetType,
                Details = details,
                Success = success,
                ErrorMessage = errorMessage,
                Timestamp = DateTime.UtcNow,
                IpAddress = ipAddress ?? "Unknown"
            };

            _context.AuditLogs.Add(auditLog);
            await _context.SaveChangesAsync();
        }
    }
}
```

**Save:** Ctrl + S

---

### 📝 Step 5: Register AuditService in Program.cs

**Open:** `Program.cs`

**Add service registration:**

```csharp
// Services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IAuditService, AuditService>();  // ← Add this
```

**Save:** Ctrl + S

---

### 📝 Step 6: Use AuditService in AuthController

**Open:** `Controllers/AuthController.cs`

**Update constructor:**

```csharp
private readonly IJwtService _jwtService;
private readonly IUserService _userService;
private readonly IAuditService _auditService;  // ← Add this

public AuthController(IJwtService jwtService, IUserService userService, IAuditService auditService)
{
    _jwtService = jwtService;
    _userService = userService;
    _auditService = auditService;  // ← Add this
}
```

**Update Login method (add audit logging):**

```csharp
[HttpPost("login")]
public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
{
    try
    {
        var allUsers = await _userService.GetAllUsersAsync();
        var user = allUsers.Data.FirstOrDefault(u => u.Email.ToLower() == loginDto.Email.ToLower());

        if (user == null)
        {
            // Log failed login attempt
            await _auditService.LogActionAsync(
                action: "Login",
                userId: "Unknown",
                userEmail: loginDto.Email,
                userRole: "Unknown",
                success: false,
                errorMessage: "User not found",
                ipAddress: HttpContext.Connection.RemoteIpAddress?.ToString()
            );

            return BadRequest(ApiResponse<object>.ErrorResponse("Invalid email or password"));
        }

        if (!user.IsActive)
        {
            // Log inactive account access attempt
            await _auditService.LogActionAsync(
                action: "Login",
                userId: user.Id.ToString(),
                userEmail: user.Email,
                userRole: user.Role,
                success: false,
                errorMessage: "Account deactivated",
                ipAddress: HttpContext.Connection.RemoteIpAddress?.ToString()
            );

            return BadRequest(ApiResponse<object>.ErrorResponse("Account is deactivated"));
        }

        bool isPasswordValid = BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash);

        if (!isPasswordValid)
        {
            // Log wrong password attempt
            await _auditService.LogActionAsync(
                action: "Login",
                userId: user.Id.ToString(),
                userEmail: user.Email,
                userRole: user.Role,
                success: false,
                errorMessage: "Invalid password",
                ipAddress: HttpContext.Connection.RemoteIpAddress?.ToString()
            );

            return BadRequest(ApiResponse<object>.ErrorResponse("Invalid email or password"));
        }

        string token = _jwtService.GenerateToken(user);

        // Log successful login ✅
        await _auditService.LogActionAsync(
            action: "Login",
            userId: user.Id.ToString(),
            userEmail: user.Email,
            userRole: user.Role,
            success: true,
            ipAddress: HttpContext.Connection.RemoteIpAddress?.ToString()
        );

        var authResponse = new AuthResponseDto
        {
            Id = user.Id,
            Name = user.Name,
            Username = user.Username,
            Email = user.Email,
            Role = user.Role,
            Token = token
        };

        return Ok(ApiResponse<AuthResponseDto>.SuccessResponse(
            authResponse,
            "Login successful"
        ));
    }
    catch (Exception ex)
    {
        return StatusCode(500, ApiResponse<object>.ErrorResponse($"Login failed: {ex.Message}"));
    }
}
```

**Save:** Ctrl + S

---

## 🎮 Part 6: Role Management Endpoints (45 min)

### 📝 Step 1: Create Role Management DTOs

**Create:** `DTOs/ChangeRoleDto.cs`

```csharp
using System.ComponentModel.DataAnnotations;

namespace AdminPanelAPI.DTOs
{
    /// <summary>
    /// DTO for changing user role (Admin only)
    /// </summary>
    public class ChangeRoleDto
    {
        [Required(ErrorMessage = "User ID is required")]
        public int UserId { get; set; }

        [Required(ErrorMessage = "New role is required")]
        [StringLength(20, ErrorMessage = "Role cannot exceed 20 characters")]
        public string NewRole { get; set; }
    }
}
```

**Save:** Ctrl + S

---

### 📝 Step 2: Add Role Management Endpoints to UsersController

**Open:** `Controllers/UsersController.cs`

**Add these new endpoints at the end:**

```csharp
/// <summary>
/// Change user role (Admin only)
/// PUT /api/users/{id}/role
/// </summary>
[Authorize(Policy = Policies.AdminOnly)]
[HttpPut("{id}/role")]
public async Task<IActionResult> ChangeUserRole(int id, [FromBody] string newRole)
{
    try
    {
        // Validate role
        if (!Roles.IsValidRole(newRole))
        {
            return BadRequest(ApiResponse<object>.ErrorResponse(
                $"Invalid role. Valid roles: {string.Join(", ", Roles.GetAllRoles())}"
            ));
        }

        // Get user
        var userResponse = await _userService.GetUserByIdAsync(id);
        if (!userResponse.Success)
        {
            return NotFound(userResponse);
        }

        var user = userResponse.Data;

        // Update role
        user.Role = newRole;
        user.UpdatedDate = DateTime.UtcNow;

        // Save changes (you'll need to add UpdateUser method to service)
        var updateDto = new UpdateUserDto
        {
            Name = user.Name,
            Username = user.Username,
            Email = user.Email,
            Phone = user.Phone
        };

        // Note: This is simplified. In real app, you'd have a dedicated UpdateRole method
        var response = await _userService.UpdateUserAsync(id, updateDto);

        return Ok(ApiResponse<object>.SuccessResponse(
            new { userId = id, newRole = newRole },
            $"User role changed to {newRole} successfully"
        ));
    }
    catch (Exception ex)
    {
        return StatusCode(500, ApiResponse<object>.ErrorResponse($"Error: {ex.Message}"));
    }
}

/// <summary>
/// Get all available roles (Admin and Manager)
/// GET /api/users/roles
/// </summary>
[Authorize(Policy = Policies.AdminOrManager)]
[HttpGet("roles")]
public IActionResult GetAvailableRoles()
{
    var roles = Roles.GetAllRoles();
    return Ok(ApiResponse<string[]>.SuccessResponse(
        roles,
        "Available roles retrieved successfully"
    ));
}

/// <summary>
/// Get users by role (Admin only)
/// GET /api/users/role/{role}
/// </summary>
[Authorize(Policy = Policies.AdminOnly)]
[HttpGet("role/{role}")]
public async Task<IActionResult> GetUsersByRole(string role)
{
    try
    {
        if (!Roles.IsValidRole(role))
        {
            return BadRequest(ApiResponse<object>.ErrorResponse("Invalid role"));
        }

        var allUsersResponse = await _userService.GetAllUsersAsync();
        var usersByRole = allUsersResponse.Data.Where(u => u.Role == role).ToList();

        return Ok(ApiResponse<List<User>>.SuccessResponse(
            usersByRole,
            $"Users with role '{role}' retrieved successfully"
        ));
    }
    catch (Exception ex)
    {
        return StatusCode(500, ApiResponse<object>.ErrorResponse($"Error: {ex.Message}"));
    }
}
```

**Save:** Ctrl + S

---

## 🧪 Part 7: Complete Testing (All Scenarios) (60 min)

### ▶️ Step 1: Run Backend

1. **Visual Studio** → **Green Play button**
2. **Swagger** opens at `https://localhost:7001/swagger`

---

### 📮 Step 2: Create Test Users (3 Roles)

#### Test User 1: Regular User

**Postman:** POST `https://localhost:7001/api/auth/register`

**Body:**
```json
{
  "name": "Regular User",
  "username": "regularuser",
  "email": "regular@example.com",
  "password": "User@123",
  "phone": "1111111111",
  "role": "user"
}
```

**Response:** Copy token

---

#### Test User 2: Manager

**Body:**
```json
{
  "name": "Manager User",
  "username": "manager",
  "email": "manager@example.com",
  "password": "Manager@123",
  "phone": "2222222222",
  "role": "manager"
}
```

**Response:** Copy token

---

#### Test User 3: Admin

**Body:**
```json
{
  "name": "Admin User",
  "username": "admin",
  "email": "admin@example.com",
  "password": "Admin@123",
  "phone": "3333333333",
  "role": "admin"
}
```

**Response:** Copy token

---

### 🧪 Step 3: Test Policy-Based Authorization

#### Test 1: Get All Users (Different Roles)

**With User Token:**
```
GET /api/users
Authorization: Bearer {user_token}

Expected: 403 Forbidden (user role cannot view all users)
```

**With Manager Token:**
```
GET /api/users
Authorization: Bearer {manager_token}

Expected: 200 OK ✅ (manager can view all users)
```

**With Admin Token:**
```
GET /api/users
Authorization: Bearer {admin_token}

Expected: 200 OK ✅ (admin can view all users)
```

---

#### Test 2: Create User (CanEditUsers Policy)

**With User Token:**
```
POST /api/users
Authorization: Bearer {user_token}

Expected: 403 Forbidden (user role cannot create users)
```

**With Manager Token:**
```
POST /api/users
Authorization: Bearer {manager_token}

Body:
{
  "name": "Test User 4",
  "username": "testuser4",
  "email": "test4@example.com",
  "password": "Test@123",
  "phone": "4444444444"
}

Expected: 201 Created ✅ (manager can create users)
```

---

#### Test 3: Delete User (AdminOnly Policy)

**With Manager Token:**
```
DELETE /api/users/4
Authorization: Bearer {manager_token}

Expected: 403 Forbidden (only admin can delete)
```

**With Admin Token:**
```
DELETE /api/users/4
Authorization: Bearer {admin_token}

Expected: 200 OK ✅ (admin can delete)
```

---

### 🎯 Step 4: Test Role Management Endpoints

#### Get Available Roles

**With Manager Token:**
```
GET /api/users/roles
Authorization: Bearer {manager_token}

Expected Response:
{
  "success": true,
  "message": "Available roles retrieved successfully",
  "data": ["admin", "manager", "user"]
}
```

---

#### Change User Role (Admin Only)

**With Admin Token:**
```
PUT /api/users/1/role
Authorization: Bearer {admin_token}
Content-Type: application/json

Body: "manager"

Expected: 200 OK (user 1 role changed to manager)
```

**Verify:** Login with user 1 credentials → New token will have "manager" role!

---

#### Get Users by Role

**With Admin Token:**
```
GET /api/users/role/admin
Authorization: Bearer {admin_token}

Expected: 200 OK with all admin users
```

---

### 📊 Step 5: Verify Audit Logs

**SSMS Query:**

```sql
SELECT TOP 20 *
FROM AuditLogs
ORDER BY Timestamp DESC
```

**Expected Results:**
```
Action       | UserId | UserEmail           | Success | Timestamp
-------------|--------|---------------------|---------|------------------
Login        | 3      | admin@example.com   | 1       | 2024-xx-xx xx:xx
Login        | 2      | manager@example.com | 1       | 2024-xx-xx xx:xx
Login        | 1      | regular@example.com | 0       | 2024-xx-xx xx:xx (wrong password test)
...
```

**✅ Audit logging working!**

---

## ✅ Summary & Checklist

### Aaj Kya Kiya? 🎯

1. **Multiple Role System** ✅
   - Admin, Manager, User roles
   - Role constants (type-safe)
   - Role validation in registration

2. **Policy-Based Authorization** ✅
   - AdminOnly, ManagerOnly, AdminOrManager
   - CanDeleteUsers, CanEditUsers, CanViewAllUsers
   - Centralized policy configuration

3. **Custom Authorization** ✅
   - Custom requirements (MinimumAgeRequirement)
   - Custom handlers (MinimumAgeHandler)
   - IAuthorizationHandler implementation

4. **Audit Logging** ✅
   - AuditLog model & database
   - AuditService implementation
   - Login activity tracking
   - Success/failure logging

5. **Role Management** ✅
   - Change user role endpoint
   - Get available roles
   - Get users by role
   - Admin-only operations

6. **Complete Testing** ✅
   - 3 different role users
   - Policy-based access tests
   - Role management tests
   - Audit logs verification

---

### Project Status 📊

```
AdminPanelAPI/
├── Constants/
│   ├── Roles.cs              ← NEW (Role constants)
│   └── Policies.cs           ← NEW (Policy constants)
├── Authorization/
│   ├── Requirements/
│   │   └── MinimumAgeRequirement.cs  ← NEW
│   └── Handlers/
│       └── MinimumAgeHandler.cs      ← NEW
├── Models/
│   ├── User.cs               (Existing)
│   └── AuditLog.cs           ← NEW (Audit logging)
├── Services/
│   ├── AuditService.cs       ← NEW
│   └── Interfaces/
│       └── IAuditService.cs  ← NEW
├── Controllers/
│   ├── AuthController.cs     ← UPDATED (Audit logging)
│   └── UsersController.cs    ← UPDATED (Policies, role management)
├── DTOs/
│   ├── RegisterDto.cs        ← UPDATED (Role field)
│   └── ChangeRoleDto.cs      ← NEW
└── Program.cs                ← UPDATED (Policies, handlers)

Database:
├── Users table               (Existing with Role field)
└── AuditLogs table           ← NEW (Migration added)
```

---

## 🎓 Key Concepts Learned

### 1. Role-Based vs Policy-Based

**Role-Based (Simple):**
```csharp
[Authorize(Roles = "admin")]
```

**Policy-Based (Flexible):**
```csharp
[Authorize(Policy = Policies.CanDeleteUsers)]
```

**Policy Advantages:**
- Centralized management
- Easy to change
- More semantic
- Business logic friendly

---

### 2. Custom Authorization

**Pattern:**
```
1. Create Requirement (IAuthorizationRequirement)
2. Create Handler (AuthorizationHandler<TRequirement>)
3. Register in Program.cs
4. Use in policy
5. Apply to controllers
```

---

### 3. Audit Logging

**Critical for:**
- Security compliance
- Forensic analysis
- User activity tracking
- Debugging access issues

---

## 🚀 Tomorrow's Preview: Day 6

**Topics:**
- Frontend authentication integration
- React login page (MUI)
- Token storage (localStorage)
- Axios interceptors (auto token attach)
- Protected routes
- Auto logout on token expiry

**What You'll Build:**
- Complete login UI
- Token management
- Protected frontend routes
- Seamless authentication flow

---

## 💻 Practice Tasks

### ⭐ Task 1: Add More Audit Logs (Easy)

**Goal:** Audit logging ko aur endpoints mein add karo

**Steps:**
1. UsersController mein DeleteUser endpoint mein audit log add karo
2. CreateUser mein audit log add karo
3. SSMS mein verify karo all actions logged hain

---

### ⭐⭐ Task 2: Department-Based Authorization (Medium)

**Goal:** Department field add karke department-based policy

**Steps:**
1. User model mein Department field add karo (string)
2. Migration banao aur run karo
3. Custom requirement: SameDepartmentRequirement
4. Custom handler: Check karo user aur target same department
5. Policy apply karo: Manager can only edit same department users

---

### ⭐⭐⭐ Task 3: Audit Log Viewing API (Hard)

**Goal:** Audit logs ko API se view karne ka feature

**Steps:**
1. AuditLogsController banao
2. Endpoints:
   - GET /api/auditlogs (Admin only, all logs)
   - GET /api/auditlogs/user/{id} (Get logs for specific user)
   - GET /api/auditlogs/action/{action} (Filter by action)
3. Pagination implement karo (skip, take)
4. Postman se test karo

---

## 🎉 Congratulations!

**Day 5 Complete!** 🎊

Aaj aapne **enterprise-level authorization system** implement kar liya!

**What You Achieved:**
- ✅ Multiple role system (Admin, Manager, User)
- ✅ Policy-based authorization (flexible & maintainable)
- ✅ Custom authorization (extensible patterns)
- ✅ Audit logging (security & compliance)
- ✅ Role management (admin operations)
- ✅ Complete testing (all scenarios)

**Week 5 Progress:** 5/7 days done! (71% complete)

**Tomorrow:** Frontend integration - Login page, token management, protected routes! 🎨🔐

**Backend authentication & authorization complete! Frontend integration next!** 💪✨

---

