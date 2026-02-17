# 📅 Week 4 - Day 5: Service Layer & Dependency Injection

## 🎯 Today's Goal
**Aaj hum Service Layer aur Dependency Injection seekhenge! Business logic ko organize karenge! 🏗️**

**Today's Focus:**
- ✅ Service Layer kya hai (Business logic separation)
- ✅ Dependency Injection (DI) concept
- ✅ Interface-based programming
- ✅ IUserService interface creation
- ✅ UserService implementation
- ✅ DI container registration
- ✅ Constructor injection in Controllers
- ✅ Service lifetimes (Scoped, Transient, Singleton)

---

## 📚 Session Breakdown (4-5 Hours)

| Time | Topic | Duration |
|------|-------|----------|
| **Hour 1** | Service Layer & DI Concepts | 60 min |
| **Hour 2** | Creating Interface & Service | 60 min |
| **Hour 3** | Implementing Service Methods | 60 min |
| **Hour 4** | DI Registration & Controller Update | 60 min |
| **Hour 5** | Testing & Advanced DI Concepts | 60 min |

---

## 🎓 Part 1: Understanding Service Layer (45 minutes)

### 📖 What is a Service Layer?

**Simple Urdu/English:**
Service Layer ek **middle layer** hai jo aapke Controller aur Database ke beech mein hoti hai. Yeh **business logic** ko organize karti hai.

**Real-Life Example:**
```
Sochein aap ek restaurant ho:

❌ Without Service Layer:
┌────────────┐
│  Customer  │ (Controller)
└─────┬──────┘
      │ Directly talks to kitchen
      ↓
┌────────────┐
│  Kitchen   │ (Database)
└────────────┘

Problem:
- Customer needs to know cooking details
- Kitchen gets confused with many customers
- No one manages orders
- Chaos!


✅ With Service Layer:
┌────────────┐
│  Customer  │ (Controller)
└─────┬──────┘
      │ Places order
      ↓
┌────────────┐
│  Waiter    │ (Service Layer)
│            │ - Takes orders
│            │ - Validates order
│            │ - Manages kitchen
│            │ - Handles business rules
└─────┬──────┘
      │ Organized request
      ↓
┌────────────┐
│  Kitchen   │ (Database)
└────────────┘

Benefits:
✅ Customer doesn't know kitchen details
✅ Kitchen gets organized orders
✅ Waiter handles business rules
✅ Clear separation of concerns
```

---

### 🤔 Why Do We Need Service Layer?

**Current Problem (Controller directly talks to DbContext):**
```csharp
// UsersController.cs - Day 4 approach
public class UsersController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    
    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserDto dto)
    {
        // ❌ Business logic in controller
        var emailExists = await _context.Users
            .AnyAsync(u => u.Email == dto.Email);
        
        if (emailExists)
            return BadRequest("Email exists");
        
        var user = new User { ... };
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        
        return Ok();
    }
}
```

**Issues:**
```
❌ Controller is too fat (business logic + HTTP handling)
❌ Hard to test
❌ Code duplication if multiple controllers need same logic
❌ Database access spread everywhere
❌ Difficult to maintain
❌ Can't reuse logic
```

---

### ✅ Solution: Service Layer

```
┌─────────────────────────────────────────┐
│         CONTROLLER                      │
│  - HTTP request/response                │
│  - Validation (model binding)           │
│  - Return status codes                  │
└──────────────┬──────────────────────────┘
               │
               │ Calls service methods
               ↓
┌─────────────────────────────────────────┐
│         SERVICE LAYER                   │
│  - Business logic                       │
│  - Validation (business rules)          │
│  - Data transformation                  │
│  - Orchestration                        │
└──────────────┬──────────────────────────┘
               │
               │ Uses repository/DbContext
               ↓
┌─────────────────────────────────────────┐
│         DATA ACCESS (DbContext)         │
│  - Database queries                     │
│  - CRUD operations                      │
│  - Data persistence                     │
└─────────────────────────────────────────┘
```

**Benefits:**
```
✅ Separation of Concerns (SoC)
✅ Reusable business logic
✅ Easier to test
✅ Easier to maintain
✅ Clear responsibilities
✅ Professional structure
```

---

## 🎓 Part 2: Understanding Dependency Injection (45 minutes)

### 📖 What is Dependency Injection (DI)?

**Simple Urdu/English:**
Dependency Injection ek **design pattern** hai jismein aap apne class ki **dependencies** (jo cheezein class ko chahiye) **bahar se provide** karte ho, class khud create nahi karti.

**Real-Life Example:**
```
Sochein aap ek driver ho:

❌ Without DI (Driver creates his own car):
public class Driver
{
    private Car _car;
    
    public Driver()
    {
        _car = new Toyota();  // Tightly coupled!
        // Can only drive Toyota
        // Hard to change
        // Can't test with different car
    }
    
    public void Drive()
    {
        _car.Start();
    }
}


✅ With DI (Car given to driver):
public class Driver
{
    private ICar _car;
    
    public Driver(ICar car)  // Car injected!
    {
        _car = car;
        // Can drive any car
        // Easy to change
        // Can test with mock car
    }
    
    public void Drive()
    {
        _car.Start();
    }
}

// Usage:
var toyota = new Toyota();
var driver = new Driver(toyota);

// Or use Honda:
var honda = new Honda();
var driver = new Driver(honda);

// Or use Mock for testing:
var mockCar = new MockCar();
var driver = new Driver(mockCar);
```

---

### 🎯 Benefits of Dependency Injection

```
✅ Loose Coupling
   - Classes don't depend on concrete implementations
   - Depend on interfaces instead

✅ Testability
   - Easy to inject mock objects for testing
   - No need to setup real database

✅ Flexibility
   - Easy to swap implementations
   - Change behavior without changing code

✅ Maintainability
   - Changes in one class don't break others
   - Clear dependencies

✅ Lifecycle Management
   - ASP.NET Core manages object creation/disposal
   - Automatic memory management
```

---

### 📊 How DI Works in ASP.NET Core

```
┌─────────────────────────────────────────┐
│  1. REGISTRATION (Program.cs)           │
│                                         │
│  builder.Services.AddScoped             │
│    <IUserService, UserService>();      │
│                                         │
│  "When someone needs IUserService,     │
│   give them UserService instance"      │
└──────────────┬──────────────────────────┘
               │
               │ App starts
               ↓
┌─────────────────────────────────────────┐
│  2. REQUEST COMES                       │
│                                         │
│  HTTP GET /api/Users                    │
└──────────────┬──────────────────────────┘
               │
               │ ASP.NET Core needs to create
               │ UsersController
               ↓
┌─────────────────────────────────────────┐
│  3. DEPENDENCY RESOLUTION               │
│                                         │
│  UsersController needs IUserService     │
│  ↓                                      │
│  DI Container checks registration       │
│  ↓                                      │
│  Finds UserService is registered        │
│  ↓                                      │
│  UserService needs ApplicationDbContext │
│  ↓                                      │
│  DI Container checks registration       │
│  ↓                                      │
│  Creates ApplicationDbContext           │
│  ↓                                      │
│  Creates UserService                    │
│  ↓                                      │
│  Creates UsersController                │
└──────────────┬──────────────────────────┘
               │
               │ Request processed
               ↓
┌─────────────────────────────────────────┐
│  4. CLEANUP                             │
│                                         │
│  Request ends                           │
│  ↓                                      │
│  DI Container disposes objects          │
│  ↓                                      │
│  Memory freed                           │
└─────────────────────────────────────────┘
```

---

### 🔑 Constructor Injection (Most Common)

**Pattern:**
```csharp
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;
    
    // Constructor Injection
    public UsersController(IUserService userService)
    {
        _userService = userService;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _userService.GetAllUsersAsync();
        return Ok(users);
    }
}
```

**ASP.NET Core automatically:**
1. Sees `IUserService` parameter
2. Looks in DI container
3. Finds registered implementation
4. Creates instance
5. Injects into constructor
6. Controller ready to use!

---

## 📁 Part 3: Create Services Folder Structure (15 minutes)

### Step 1: Create Services Folder

**Visual Studio Steps:**

1. **Solution Explorer**
2. **Right-click** on **"AdminPanelAPI"** project
3. **Add** → **New Folder**
4. Name: **`Services`**
5. Press **Enter**

---

### Step 2: Create Interfaces Subfolder (Optional but Recommended)

**For better organization:**

1. **Right-click** on **"Services"** folder
2. **Add** → **New Folder**
3. Name: **`Interfaces`**
4. Press **Enter**

**Final structure:**
```
AdminPanelAPI/
├── Controllers/
├── Data/
├── DTOs/
├── Migrations/
├── Models/
├── Responses/
├── Services/
│   └── Interfaces/
└── ...
```

---

## 🔧 Part 4: Create IUserService Interface (30 minutes)

### Step 1: Create Interface File

**Method:**

1. **Right-click** on **"Services/Interfaces"** folder
2. **Add** → **Class...**
3. **Name:** `IUserService.cs`
4. Click **"Add"**

---

### Step 2: IUserService Interface Code

**File:** `Services/Interfaces/IUserService.cs`

**Replace default code with:**

```csharp
using AdminPanelAPI.DTOs;
using AdminPanelAPI.Responses;

namespace AdminPanelAPI.Services.Interfaces
{
    /// <summary>
    /// Interface for User service
    /// Defines contract for user-related operations
    /// </summary>
    public interface IUserService
    {
        // ==========================================
        // READ OPERATIONS
        // ==========================================
        
        /// <summary>
        /// Get all users from database
        /// </summary>
        /// <returns>API response with list of user DTOs</returns>
        Task<ApiResponse<List<UserDto>>> GetAllUsersAsync();

        /// <summary>
        /// Get user by ID
        /// </summary>
        /// <param name="id">User ID</param>
        /// <returns>API response with user DTO or error</returns>
        Task<ApiResponse<UserDto>> GetUserByIdAsync(int id);

        /// <summary>
        /// Search users by name or email
        /// </summary>
        /// <param name="query">Search query</param>
        /// <returns>API response with matching users</returns>
        Task<ApiResponse<List<UserDto>>> SearchUsersAsync(string query);

        // ==========================================
        // CREATE OPERATION
        // ==========================================
        
        /// <summary>
        /// Create new user
        /// </summary>
        /// <param name="createUserDto">User creation data</param>
        /// <returns>API response with created user DTO or errors</returns>
        Task<ApiResponse<UserDto>> CreateUserAsync(CreateUserDto createUserDto);

        // ==========================================
        // UPDATE OPERATION
        // ==========================================
        
        /// <summary>
        /// Update existing user
        /// </summary>
        /// <param name="id">User ID</param>
        /// <param name="updateUserDto">Updated user data</param>
        /// <returns>API response with updated user DTO or errors</returns>
        Task<ApiResponse<UserDto>> UpdateUserAsync(int id, UpdateUserDto updateUserDto);

        // ==========================================
        // DELETE OPERATION
        // ==========================================
        
        /// <summary>
        /// Delete user by ID
        /// </summary>
        /// <param name="id">User ID</param>
        /// <returns>API response with success or error</returns>
        Task<ApiResponse<object>> DeleteUserAsync(int id);

        // ==========================================
        // VALIDATION OPERATIONS
        // ==========================================
        
        /// <summary>
        /// Check if email already exists
        /// </summary>
        /// <param name="email">Email to check</param>
        /// <param name="excludeUserId">User ID to exclude from check (for updates)</param>
        /// <returns>True if exists</returns>
        Task<bool> EmailExistsAsync(string email, int? excludeUserId = null);

        /// <summary>
        /// Check if username already exists
        /// </summary>
        /// <param name="username">Username to check</param>
        /// <param name="excludeUserId">User ID to exclude from check (for updates)</param>
        /// <returns>True if exists</returns>
        Task<bool> UsernameExistsAsync(string username, int? excludeUserId = null);
    }
}
```

---

### 📖 Understanding the Interface

**1. Interface Definition**
```csharp
public interface IUserService
```
- `interface` keyword = Contract definition
- `I` prefix = Naming convention for interfaces
- Contains only method signatures (no implementation)

**2. Method Signatures**
```csharp
Task<ApiResponse<List<UserDto>>> GetAllUsersAsync();
```
- `Task<T>` = Async operation
- `ApiResponse<T>` = Consistent response format
- `Async` suffix = Naming convention
- No method body (interface)

**3. XML Comments**
```csharp
/// <summary>
/// Description
/// </summary>
```
- Documentation
- Shows in IntelliSense

**4. Why Interface?**
```
✅ Defines contract (what service must do)
✅ Enables dependency injection
✅ Allows multiple implementations
✅ Makes testing easier (mock interfaces)
✅ Loose coupling
```

---

### Save File
- **Ctrl + S**

---

## 🛠️ Part 5: Create UserService Implementation (90 minutes)

### Step 1: Create Service Class File

**Method:**

1. **Right-click** on **"Services"** folder (NOT Interfaces subfolder)
2. **Add** → **Class...**
3. **Name:** `UserService.cs`
4. Click **"Add"**

---

### Step 2: Complete UserService Implementation

**File:** `Services/UserService.cs`

**Replace default code with:**

```csharp
using Microsoft.EntityFrameworkCore;
using AdminPanelAPI.Data;
using AdminPanelAPI.Models;
using AdminPanelAPI.DTOs;
using AdminPanelAPI.Responses;
using AdminPanelAPI.Services.Interfaces;

namespace AdminPanelAPI.Services
{
    /// <summary>
    /// Implementation of IUserService
    /// Contains business logic for user operations
    /// </summary>
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;

        /// <summary>
        /// Constructor - DbContext injected by DI
        /// </summary>
        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // GET ALL USERS
        // ==========================================
        
        public async Task<ApiResponse<List<UserDto>>> GetAllUsersAsync()
        {
            try
            {
                var users = await _context.Users
                    .Where(u => u.IsActive)  // Only active users
                    .OrderByDescending(u => u.CreatedDate)  // Newest first
                    .ToListAsync();

                var userDtos = users.Select(user => MapToDto(user)).ToList();

                return ApiResponse<List<UserDto>>.SuccessResponse(
                    userDtos,
                    $"Retrieved {userDtos.Count} users successfully"
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<List<UserDto>>.ErrorResponse(
                    "An error occurred while retrieving users",
                    new List<string> { ex.Message }
                );
            }
        }

        // ==========================================
        // GET USER BY ID
        // ==========================================
        
        public async Task<ApiResponse<UserDto>> GetUserByIdAsync(int id)
        {
            try
            {
                var user = await _context.Users.FindAsync(id);

                if (user == null)
                {
                    return ApiResponse<UserDto>.ErrorResponse(
                        $"User with ID {id} not found"
                    );
                }

                var userDto = MapToDto(user);

                return ApiResponse<UserDto>.SuccessResponse(
                    userDto,
                    "User retrieved successfully"
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<UserDto>.ErrorResponse(
                    "An error occurred while retrieving user",
                    new List<string> { ex.Message }
                );
            }
        }

        // ==========================================
        // SEARCH USERS
        // ==========================================
        
        public async Task<ApiResponse<List<UserDto>>> SearchUsersAsync(string query)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(query))
                {
                    return await GetAllUsersAsync();
                }

                var users = await _context.Users
                    .Where(u => u.IsActive &&
                           (u.Name.Contains(query) ||
                            u.Email.Contains(query) ||
                            u.Username.Contains(query)))
                    .OrderByDescending(u => u.CreatedDate)
                    .ToListAsync();

                var userDtos = users.Select(user => MapToDto(user)).ToList();

                return ApiResponse<List<UserDto>>.SuccessResponse(
                    userDtos,
                    $"Found {userDtos.Count} matching users"
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<List<UserDto>>.ErrorResponse(
                    "An error occurred while searching users",
                    new List<string> { ex.Message }
                );
            }
        }

        // ==========================================
        // CREATE USER
        // ==========================================
        
        public async Task<ApiResponse<UserDto>> CreateUserAsync(CreateUserDto createUserDto)
        {
            try
            {
                // Business Rule 1: Check email uniqueness
                if (await EmailExistsAsync(createUserDto.Email))
                {
                    return ApiResponse<UserDto>.ErrorResponse(
                        "User creation failed",
                        new List<string> { "Email already exists" }
                    );
                }

                // Business Rule 2: Check username uniqueness
                if (await UsernameExistsAsync(createUserDto.Username))
                {
                    return ApiResponse<UserDto>.ErrorResponse(
                        "User creation failed",
                        new List<string> { "Username already exists" }
                    );
                }

                // Business Rule 3: Validate password strength (basic)
                if (createUserDto.Password.Length < 6)
                {
                    return ApiResponse<UserDto>.ErrorResponse(
                        "User creation failed",
                        new List<string> { "Password must be at least 6 characters" }
                    );
                }

                // Create user entity
                var newUser = new User
                {
                    Name = createUserDto.Name.Trim(),
                    Username = createUserDto.Username.Trim().ToLower(),
                    Email = createUserDto.Email.Trim().ToLower(),
                    PasswordHash = HashPassword(createUserDto.Password),
                    Phone = createUserDto.Phone?.Trim(),
                    Website = createUserDto.Website?.Trim(),
                    CompanyName = createUserDto.CompanyName?.Trim(),
                    JobTitle = createUserDto.JobTitle?.Trim(),
                    City = createUserDto.City?.Trim(),
                    Country = createUserDto.Country?.Trim(),
                    Role = "User",  // Default role
                    IsActive = true,
                    CreatedDate = DateTime.UtcNow
                };

                _context.Users.Add(newUser);
                await _context.SaveChangesAsync();

                var userDto = MapToDto(newUser);

                return ApiResponse<UserDto>.SuccessResponse(
                    userDto,
                    "User created successfully"
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<UserDto>.ErrorResponse(
                    "An error occurred while creating user",
                    new List<string> { ex.Message }
                );
            }
        }

        // ==========================================
        // UPDATE USER
        // ==========================================
        
        public async Task<ApiResponse<UserDto>> UpdateUserAsync(int id, UpdateUserDto updateUserDto)
        {
            try
            {
                // Find user
                var user = await _context.Users.FindAsync(id);

                if (user == null)
                {
                    return ApiResponse<UserDto>.ErrorResponse(
                        $"User with ID {id} not found"
                    );
                }

                // Business Rule: Check email uniqueness (excluding current user)
                if (await EmailExistsAsync(updateUserDto.Email, id))
                {
                    return ApiResponse<UserDto>.ErrorResponse(
                        "Update failed",
                        new List<string> { "Email already exists" }
                    );
                }

                // Update properties
                user.Name = updateUserDto.Name.Trim();
                user.Email = updateUserDto.Email.Trim().ToLower();
                user.Phone = updateUserDto.Phone?.Trim();
                user.Website = updateUserDto.Website?.Trim();
                user.CompanyName = updateUserDto.CompanyName?.Trim();
                user.JobTitle = updateUserDto.JobTitle?.Trim();
                user.City = updateUserDto.City?.Trim();
                user.Country = updateUserDto.Country?.Trim();
                user.UpdatedDate = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                var userDto = MapToDto(user);

                return ApiResponse<UserDto>.SuccessResponse(
                    userDto,
                    "User updated successfully"
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<UserDto>.ErrorResponse(
                    "An error occurred while updating user",
                    new List<string> { ex.Message }
                );
            }
        }

        // ==========================================
        // DELETE USER
        // ==========================================
        
        public async Task<ApiResponse<object>> DeleteUserAsync(int id)
        {
            try
            {
                var user = await _context.Users.FindAsync(id);

                if (user == null)
                {
                    return ApiResponse<object>.ErrorResponse(
                        $"User with ID {id} not found"
                    );
                }

                // Business Rule: Can't delete admin user
                if (user.Role.ToLower() == "admin")
                {
                    return ApiResponse<object>.ErrorResponse(
                        "Cannot delete admin user"
                    );
                }

                // Soft delete (recommended for enterprise apps)
                user.IsActive = false;
                user.UpdatedDate = DateTime.UtcNow;
                
                // Or hard delete (permanent removal):
                // _context.Users.Remove(user);

                await _context.SaveChangesAsync();

                return ApiResponse<object>.SuccessResponse(
                    new { DeletedUserId = id },
                    "User deleted successfully"
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<object>.ErrorResponse(
                    "An error occurred while deleting user",
                    new List<string> { ex.Message }
                );
            }
        }

        // ==========================================
        // EMAIL EXISTS CHECK
        // ==========================================
        
        public async Task<bool> EmailExistsAsync(string email, int? excludeUserId = null)
        {
            email = email.Trim().ToLower();

            if (excludeUserId.HasValue)
            {
                return await _context.Users
                    .AnyAsync(u => u.Email == email && u.Id != excludeUserId.Value);
            }

            return await _context.Users.AnyAsync(u => u.Email == email);
        }

        // ==========================================
        // USERNAME EXISTS CHECK
        // ==========================================
        
        public async Task<bool> UsernameExistsAsync(string username, int? excludeUserId = null)
        {
            username = username.Trim().ToLower();

            if (excludeUserId.HasValue)
            {
                return await _context.Users
                    .AnyAsync(u => u.Username == username && u.Id != excludeUserId.Value);
            }

            return await _context.Users.AnyAsync(u => u.Username == username);
        }

        // ==========================================
        // PRIVATE HELPER METHODS
        // ==========================================
        
        /// <summary>
        /// Map User entity to UserDto
        /// </summary>
        private UserDto MapToDto(User user)
        {
            return new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Username = user.Username,
                Email = user.Email,
                Phone = user.Phone,
                Website = user.Website,
                CompanyName = user.CompanyName,
                JobTitle = user.JobTitle,
                City = user.City,
                Country = user.Country,
                Role = user.Role,
                IsActive = user.IsActive,
                CreatedDate = user.CreatedDate
            };
        }

        /// <summary>
        /// Hash password (temporary implementation)
        /// TODO: Replace with BCrypt or ASP.NET Identity
        /// </summary>
        private string HashPassword(string password)
        {
            // Temporary simulation - NOT secure!
            // Will be replaced with proper hashing in JWT lesson
            return $"hashed_{password}_{DateTime.UtcNow.Ticks}";
        }
    }
}
```

---

### 📖 Understanding UserService

**1. Class Implements Interface**
```csharp
public class UserService : IUserService
```
- Implements all methods from interface
- Must match signatures exactly

**2. Constructor Injection**
```csharp
private readonly ApplicationDbContext _context;

public UserService(ApplicationDbContext context)
{
    _context = context;
}
```
- DbContext injected (DI)
- Readonly field (can't be changed)

**3. Business Logic**
```csharp
// Business Rule: Check email uniqueness
if (await EmailExistsAsync(createUserDto.Email))
{
    return error;
}

// Business Rule: Can't delete admin
if (user.Role == "admin")
{
    return error;
}
```
- Validation before database operations
- Business rules enforced

**4. Consistent Response Format**
```csharp
return ApiResponse<UserDto>.SuccessResponse(data, message);
return ApiResponse<UserDto>.ErrorResponse(message, errors);
```
- Always uses ApiResponse
- Consistent format

**5. Helper Methods**
```csharp
private UserDto MapToDto(User user)
{
    // Mapping logic
}
```
- Private methods for reusability
- Keep code DRY (Don't Repeat Yourself)

**6. Soft Delete**
```csharp
user.IsActive = false;  // Soft delete
// _context.Users.Remove(user);  // Hard delete
```
- Recommended for enterprise apps
- Data recovery possible

---

### Save File
- **Ctrl + S**

---

## ⚙️ Part 6: Register Service in DI Container (30 minutes)

### Step 1: Open Program.cs

**Double-click** `Program.cs` in Solution Explorer

---

### Step 2: Add Using Statement

**At top of file, add:**
```csharp
using AdminPanelAPI.Services;
using AdminPanelAPI.Services.Interfaces;
```

---

### Step 3: Register Service

**Find this section:**
```csharp
// Database Context
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// Add services to the container.
builder.Services.AddControllers();
```

**Add service registration AFTER DbContext:**

```csharp
// Database Context
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// ==========================================
// REGISTER SERVICES (Dependency Injection)
// ==========================================

// User Service
builder.Services.AddScoped<IUserService, UserService>();

// Add services to the container.
builder.Services.AddControllers();
```

---

### 📖 Understanding Service Registration

**Syntax:**
```csharp
builder.Services.AddScoped<IUserService, UserService>();
```

**Breaking it down:**
```
builder.Services       = DI container
AddScoped              = Service lifetime (explained below)
<IUserService,         = Interface (what to ask for)
 UserService>          = Implementation (what to get)
```

**What it means:**
```
"When someone asks for IUserService,
 give them an instance of UserService"
```

---

### 🔄 Service Lifetimes

**ASP.NET Core has 3 lifetimes:**

#### 1. Transient (AddTransient)
```csharp
builder.Services.AddTransient<IUserService, UserService>();
```
- **New instance every time**
- Created each time it's requested
- Use for: Lightweight, stateless services

**Example:**
```
Request 1: Controller needs IUserService → New UserService created
Request 1: Another class needs IUserService → New UserService created
Request 2: Controller needs IUserService → New UserService created
```

---

#### 2. Scoped (AddScoped) ⭐ Recommended for Services
```csharp
builder.Services.AddScoped<IUserService, UserService>();
```
- **One instance per request**
- Same instance shared within single HTTP request
- Disposed after request ends
- Use for: Services that depend on DbContext

**Example:**
```
Request 1:
  - Controller needs IUserService → UserService A created
  - Helper needs IUserService → Same UserService A used
  - Request ends → UserService A disposed

Request 2:
  - Controller needs IUserService → New UserService B created
  - Request ends → UserService B disposed
```

**Why Scoped for Services?**
```
✅ DbContext is Scoped
✅ Services often depend on DbContext
✅ Ensures consistency within request
✅ Automatic disposal
✅ Thread-safe for web apps
```

---

#### 3. Singleton (AddSingleton)
```csharp
builder.Services.AddSingleton<IUserService, UserService>();
```
- **One instance for entire application lifetime**
- Created once, shared by everyone
- Never disposed (until app stops)
- Use for: Configuration, caching, stateless helpers

**Example:**
```
App Start: UserService created
Request 1: Uses same UserService
Request 2: Uses same UserService
Request 1000: Uses same UserService
App Stop: UserService disposed
```

**⚠️ Warning:**
```
❌ Don't use Singleton for services with DbContext
❌ DbContext is not thread-safe
❌ Will cause concurrency issues
```

---

### Comparison Table

| Lifetime | Created | Disposed | Use Case |
|----------|---------|----------|----------|
| **Transient** | Every time requested | After use | Lightweight, stateless |
| **Scoped** | Once per request | End of request | Services, DbContext-dependent |
| **Singleton** | Once at startup | App shutdown | Config, cache, stateless |

---

### Complete Program.cs (Updated)

```csharp
using Microsoft.EntityFrameworkCore;
using AdminPanelAPI.Data;
using AdminPanelAPI.Services;
using AdminPanelAPI.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// ==========================================
// DATABASE CONTEXT
// ==========================================

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// ==========================================
// SERVICES (DEPENDENCY INJECTION)
// ==========================================

builder.Services.AddScoped<IUserService, UserService>();

// ==========================================
// ASP.NET CORE SERVICES
// ==========================================

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS Policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// ==========================================
// MIDDLEWARE PIPELINE
// ==========================================

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();

app.Run();
```

---

### Save File
- **Ctrl + S**

---

## 🎮 Part 7: Update UsersController to Use Service (60 minutes)

### Step 1: Open UsersController

**File:** `Controllers/UsersController.cs`

---

### Step 2: Replace Entire Controller

**Complete updated controller:**

```csharp
using Microsoft.AspNetCore.Mvc;
using AdminPanelAPI.DTOs;
using AdminPanelAPI.Services.Interfaces;

namespace AdminPanelAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        /// <summary>
        /// Constructor - IUserService injected by DI container
        /// </summary>
        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        // ==========================================
        // GET: api/Users
        // Get all users
        // ==========================================
        
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var response = await _userService.GetAllUsersAsync();
            
            if (!response.Success)
                return StatusCode(500, response);
            
            return Ok(response);
        }

        // ==========================================
        // GET: api/Users/5
        // Get user by ID
        // ==========================================
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var response = await _userService.GetUserByIdAsync(id);
            
            if (!response.Success)
                return NotFound(response);
            
            return Ok(response);
        }

        // ==========================================
        // GET: api/Users/search?query=ahmad
        // Search users
        // ==========================================
        
        [HttpGet("search")]
        public async Task<IActionResult> SearchUsers([FromQuery] string query)
        {
            var response = await _userService.SearchUsersAsync(query);
            
            if (!response.Success)
                return StatusCode(500, response);
            
            return Ok(response);
        }

        // ==========================================
        // POST: api/Users
        // Create new user
        // ==========================================
        
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserDto createUserDto)
        {
            var response = await _userService.CreateUserAsync(createUserDto);
            
            if (!response.Success)
                return BadRequest(response);
            
            return CreatedAtAction(
                nameof(GetUserById), 
                new { id = response.Data?.Id }, 
                response
            );
        }

        // ==========================================
        // PUT: api/Users/5
        // Update existing user
        // ==========================================
        
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserDto updateUserDto)
        {
            var response = await _userService.UpdateUserAsync(id, updateUserDto);
            
            if (!response.Success)
                return BadRequest(response);
            
            return Ok(response);
        }

        // ==========================================
        // DELETE: api/Users/5
        // Delete user
        // ==========================================
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var response = await _userService.DeleteUserAsync(id);
            
            if (!response.Success)
                return NotFound(response);
            
            return Ok(response);
        }
    }
}
```

---

### 📖 Key Changes in Controller

**Before (Day 4):**
```csharp
public class UsersController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    
    public UsersController(ApplicationDbContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        // 50+ lines of business logic
        var users = await _context.Users.ToListAsync();
        // validation, mapping, error handling...
    }
}
```

**After (Day 5):**
```csharp
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;
    
    public UsersController(IUserService userService)
    {
        _userService = userService;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        // Clean! Just call service
        var response = await _userService.GetAllUsersAsync();
        
        if (!response.Success)
            return StatusCode(500, response);
        
        return Ok(response);
    }
}
```

**Benefits:**
```
✅ Controller is thin (5-10 lines per method)
✅ No database code in controller
✅ No business logic in controller
✅ Easy to read
✅ Easy to maintain
✅ Single responsibility (HTTP handling only)
```

---

### Save File
- **Ctrl + S**

---

## ▶️ Part 8: Build, Test & Verify (60 minutes)

### Step 1: Build Project

**Build → Build Solution** (Ctrl + Shift + B)

```
Build succeeded! ✅
```

**If errors:**
- Check using statements
- Check interface implementation matches
- Check service registration in Program.cs

---

### Step 2: Run Application

**Press F5**

Swagger opens: `https://localhost:7001/swagger/index.html`

---

### Test 1: GET All Users

**GET /api/Users**

1. Click **"Try it out"**
2. Click **"Execute"**

**Response:**
```json
{
  "success": true,
  "message": "Retrieved 1 users successfully",
  "data": [
    {
      "id": 1,
      "name": "Admin User",
      "username": "admin",
      "email": "admin@adminpanel.com",
      "role": "Admin",
      "isActive": true
    }
  ],
  "errors": null
}
```

**✅ Service layer working!**

---

### Test 2: POST Create User (Business Rule Validation)

**Request:**
```json
{
  "name": "Test User",
  "username": "test.user",
  "email": "admin@adminpanel.com",
  "password": "Test123"
}
```

**Response:**
```json
{
  "success": false,
  "message": "User creation failed",
  "data": null,
  "errors": ["Email already exists"]
}
```

**✅ Business rule enforced by service!**

---

### Test 3: Search Users

**GET /api/Users/search?query=admin**

**Response:**
```json
{
  "success": true,
  "message": "Found 1 matching users",
  "data": [
    {
      "id": 1,
      "name": "Admin User",
      "username": "admin",
      "email": "admin@adminpanel.com"
    }
  ]
}
```

**✅ Search working!**

---

### Test 4: Create Valid User

**Request:**
```json
{
  "name": "Ahmad Ali",
  "username": "ahmad.ali",
  "email": "ahmad@example.com",
  "password": "SecurePass123",
  "phone": "+92-300-1234567",
  "city": "Karachi",
  "country": "Pakistan"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 2,
    "name": "Ahmad Ali",
    "username": "ahmad.ali",
    "email": "ahmad@example.com",
    "role": "User",
    "isActive": true
  }
}
```

**Status: 201 Created** ✅

---

### Test 5: DELETE Admin (Should Fail - Business Rule)

**DELETE /api/Users/1**

**Response:**
```json
{
  "success": false,
  "message": "Cannot delete admin user",
  "data": null,
  "errors": null
}
```

**✅ Admin protection working!**

---

### Test 6: DELETE Regular User (Should Work)

**DELETE /api/Users/2**

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": {
    "deletedUserId": 2
  }
}
```

**✅ Soft delete working!**

---

## 📊 Final Project Structure (Day 5)

```
AdminPanelAPI/
├── Controllers/
│   ├── UsersController.cs          ← Updated (thin, uses service)
│   └── WeatherForecastController.cs
├── Data/
│   └── ApplicationDbContext.cs
├── DTOs/
│   ├── CreateUserDto.cs
│   ├── UpdateUserDto.cs
│   └── UserDto.cs
├── Migrations/
│   └── ...
├── Models/
│   └── User.cs
├── Responses/
│   └── ApiResponse.cs
├── Services/                        ← New (today)
│   ├── Interfaces/                 ← New
│   │   └── IUserService.cs        ← Interface
│   └── UserService.cs              ← Implementation
├── Properties/
├── appsettings.json
└── Program.cs                      ← Updated (DI registration)
```

---

## ✅ Day 5 Checklist

### **Concepts Understanding:**
- [ ] Service layer purpose clear
- [ ] Dependency Injection concept understood
- [ ] Constructor injection understood
- [ ] Interface-based programming clear
- [ ] Service lifetimes (Scoped, Transient, Singleton)

### **Files Created:**
- [ ] Services/Interfaces/IUserService.cs (interface)
- [ ] Services/UserService.cs (implementation)

### **Implementation:**
- [ ] IUserService interface with all methods
- [ ] UserService implements IUserService
- [ ] All CRUD methods in service
- [ ] Business logic in service (not controller)
- [ ] Helper methods (MapToDto, HashPassword)
- [ ] Validation methods (EmailExists, UsernameExists)

### **Dependency Injection:**
- [ ] Service registered in Program.cs
- [ ] AddScoped<IUserService, UserService>()
- [ ] Controller uses IUserService (not DbContext)
- [ ] Constructor injection working

### **Testing:**
- [ ] All endpoints working
- [ ] Business rules enforced
- [ ] Admin can't be deleted
- [ ] Email uniqueness validated
- [ ] Search functionality working
- [ ] Soft delete working

---

## 🎯 Practice Tasks

### Task 1: Add Active Users Only Endpoint (⭐⭐⭐)

**In IUserService:**
```csharp
Task<ApiResponse<List<UserDto>>> GetActiveUsersAsync();
```

**In UserService:**
```csharp
public async Task<ApiResponse<List<UserDto>>> GetActiveUsersAsync()
{
    var users = await _context.Users
        .Where(u => u.IsActive)
        .ToListAsync();
    // ...
}
```

**In Controller:**
```csharp
[HttpGet("active")]
public async Task<IActionResult> GetActiveUsers()
{
    var response = await _userService.GetActiveUsersAsync();
    return Ok(response);
}
```

---

### Task 2: Create ProductService (⭐⭐⭐⭐)

**Create complete service structure:**
1. Services/Interfaces/IProductService.cs
2. Services/ProductService.cs
3. Register in Program.cs
4. Update ProductsController

---

### Task 3: Add Pagination to GetAllUsers (⭐⭐⭐⭐⭐)

**In IUserService:**
```csharp
Task<ApiResponse<PagedResult<UserDto>>> GetUsersPagedAsync(int page, int pageSize);
```

**Create PagedResult class:**
```csharp
public class PagedResult<T>
{
    public List<T> Items { get; set; }
    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }
}
```

---

### Task 4: Add User Statistics (⭐⭐⭐⭐)

**In IUserService:**
```csharp
Task<ApiResponse<UserStats>> GetUserStatisticsAsync();
```

**Create UserStats class:**
```csharp
public class UserStats
{
    public int TotalUsers { get; set; }
    public int ActiveUsers { get; set; }
    public int InactiveUsers { get; set; }
    public int AdminUsers { get; set; }
}
```

---

## 🎓 Summary

### Today You Learned:

**1. Service Layer**
```
✅ What is service layer
✅ Why separate business logic
✅ Service vs Controller responsibilities
✅ Benefits of service layer
```

**2. Dependency Injection**
```
✅ What is DI
✅ Why use DI
✅ Constructor injection
✅ DI container and registration
✅ Interface-based programming
```

**3. Service Lifetimes**
```
✅ Transient (new each time)
✅ Scoped (one per request) ← Used
✅ Singleton (one forever)
✅ When to use each
```

**4. Architecture Patterns**
```
✅ Separation of concerns
✅ Single responsibility principle
✅ Loose coupling
✅ Interface segregation
✅ Dependency inversion
```

**5. Implementation**
```
✅ IUserService interface
✅ UserService implementation
✅ Business logic in service
✅ Thin controllers
✅ Professional structure
```

---

## 📊 Before vs After

### Before Day 5:
```
❌ Controller had business logic
❌ Controller directly used DbContext
❌ Hard to test
❌ Code duplication likely
❌ Fat controllers
❌ Tight coupling
```

### After Day 5:
```
✅ Service layer with business logic
✅ Controller uses service (thin)
✅ Easy to test (mock IUserService)
✅ Reusable business logic
✅ Clean separation
✅ Loose coupling
✅ Professional architecture
✅ Enterprise-grade structure
```

---

## 🔜 Tomorrow Preview

**Day 6: Repository Pattern & Data Access Layer**

**What's Coming:**
- ✅ What is Repository Pattern
- ✅ Generic Repository
- ✅ IUserRepository interface
- ✅ UserRepository implementation
- ✅ Unit of Work pattern (basic)
- ✅ Complete 3-layer architecture
- ✅ Service uses Repository (not DbContext directly)

**Get Ready:**
Tomorrow we'll add another layer for even better organization! 🏗️

---

## 💡 Pro Tips

### Tip 1: Interface Naming
```
✅ IUserService (interface)
✅ UserService (implementation)
❌ UserServiceInterface
❌ UserServiceImpl
```

### Tip 2: Service Lifetime Choice
```
✅ Services: AddScoped
✅ DbContext: AddScoped (default)
✅ Configuration: AddSingleton
❌ Services: Don't use Singleton with DbContext
```

### Tip 3: Constructor Injection
```
✅ public UsersController(IUserService service)
❌ public UsersController() { var service = new UserService(); }
```

### Tip 4: Interface in Constructor
```
✅ private readonly IUserService _service;
❌ private readonly UserService _service;

Why? Loose coupling!
```

### Tip 5: Business Logic Location
```
✅ Service: Business rules, validation
✅ Controller: HTTP handling, status codes
❌ Controller: Business logic, database queries
```

---

## 🎊 Congratulations!

**🎉 Day 5 Complete! Professional Architecture Achieved! 🎉**

**You've Successfully:**
- ✅ Understood service layer concept
- ✅ Understood dependency injection
- ✅ Created IUserService interface
- ✅ Implemented UserService with business logic
- ✅ Registered service in DI container
- ✅ Updated controller to use service
- ✅ Thin controllers achieved
- ✅ Business rules in service
- ✅ Professional 2-layer architecture

**Your Backend Now Has:**
```
✅ Service layer (business logic)
✅ Dependency injection throughout
✅ Interface-based programming
✅ Loose coupling
✅ Testable architecture
✅ Reusable business logic
✅ Clean separation of concerns
✅ Enterprise-grade structure
```

**Tomorrow: Repository Pattern! 🏗️**

**Architecture mastery unlocked! Keep building! 🚀✨**
