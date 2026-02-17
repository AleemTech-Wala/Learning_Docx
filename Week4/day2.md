# 📅 Week 4 - Day 2: Models, DTOs & Professional Controller Structure

## 🎯 Today's Goal
**Aaj hum professional backend architecture seekhenge - Models, DTOs, aur proper folder structure ke saath! 🏗️**

**Today's Focus:**
- ✅ Models kya hote hain (Database entities)
- ✅ DTOs kya hote hain (Data Transfer Objects)
- ✅ Proper folder structure
- ✅ User Model creation
- ✅ Professional UsersController
- ✅ Response formatting
- ✅ Postman testing (optional)
- ✅ Best practices

---

## 📚 Session Breakdown (4-5 Hours)

| Time | Topic | Duration |
|------|-------|----------|
| **Hour 1** | Models vs DTOs Concepts | 60 min |
| **Hour 2** | Creating Models & DTOs | 60 min |
| **Hour 3** | Professional Controller | 60 min |
| **Hour 4** | Testing & Validation | 60 min |
| **Hour 5** | Best Practices & Cleanup | 60 min |

---

## 🎓 Part 1: Understanding Models & DTOs (60 minutes)

### 📖 What is a Model?

**Simple Urdu/English:**
Model ek **C# class** hai jo aapke **database table** ko represent karti hai. Yeh batati hai ke database mein kya data store hoga.

**Real-Life Example:**
```
Sochein aap ek library manage kar rahe ho:

Book (Model):
- Id
- Title
- Author
- ISBN
- PublishedDate
- Price

Student (Model):
- Id
- Name
- Email
- RollNumber
- Department

Har model ek database table ban jaata hai!
```

---

### 🤔 What is a DTO?

**DTO = Data Transfer Object**

**Simple Urdu/English:**
DTO bhi ek C# class hai lekin yeh **API requests aur responses** ke liye use hoti hai. Database model se thodi alag hoti hai.

**Why Separate DTO from Model?**

```
Problem Without DTO:

User Model:
- Id
- Name
- Email
- Password       ← Sensitive!
- CreatedDate
- ModifiedDate

Agar direct Model return karo:
❌ Password expose ho jayega
❌ Internal IDs visible
❌ Unnecessary fields
```

**Solution With DTO:**

```csharp
// Model (Database Entity)
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }  // Internal
    public DateTime CreatedDate { get; set; }  // Internal
}

// DTO (What API returns)
public class UserDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    // No password!
    // No internal dates!
}
```

**Benefits:**
```
✅ Security - Sensitive data hidden
✅ Flexibility - Different DTOs for different purposes
✅ Versioning - API changes without DB changes
✅ Clean API responses
```

---

### 📊 Model vs DTO - Complete Picture

```
┌─────────────────────────────────────┐
│         CLIENT (React App)           │
└──────────────┬──────────────────────┘
               │
               │ HTTP Request
               │ CreateUserDto { name, email }
               ↓
┌─────────────────────────────────────┐
│         CONTROLLER                   │
│   - Receives DTO                     │
│   - Validates DTO                    │
│   - Converts DTO → Model             │
└──────────────┬──────────────────────┘
               │
               │ Model (User)
               ↓
┌─────────────────────────────────────┐
│         SERVICE LAYER                │
│   - Business logic                   │
│   - Uses Model                       │
└──────────────┬──────────────────────┘
               │
               │ Model (User)
               ↓
┌─────────────────────────────────────┐
│         DATABASE                     │
│   - Stores Model                     │
│   - Table: Users                     │
└──────────────┬──────────────────────┘
               │
               │ Model (User)
               ↑
               │ Converts Model → DTO
               │
┌─────────────────────────────────────┐
│         CONTROLLER                   │
│   - Returns DTO to client            │
└──────────────┬──────────────────────┘
               │
               │ HTTP Response
               │ UserDto { id, name, email }
               ↓
┌─────────────────────────────────────┐
│         CLIENT (React App)           │
└─────────────────────────────────────┘
```

---

### 🎯 Types of DTOs

**1. Request DTOs (Input)**
```csharp
// Creating new user
public class CreateUserDto
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}

// Updating user
public class UpdateUserDto
{
    public string Name { get; set; }
    public string Email { get; set; }
}
```

**2. Response DTOs (Output)**
```csharp
// Return single user
public class UserDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Role { get; set; }
}

// Return user list
public class UserListDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}
```

**3. API Response Wrapper**
```csharp
public class ApiResponse<T>
{
    public bool Success { get; set; }
    public string Message { get; set; }
    public T Data { get; set; }
    public List<string> Errors { get; set; }
}
```

---

## 📁 Part 2: Create Proper Folder Structure (30 minutes)

### Step 1: Create Folders in Solution Explorer

**Open Visual Studio and your AdminPanelAPI project**

---

#### Folder 1: Models

**Steps:**
1. **Solution Explorer** mein **"AdminPanelAPI"** project pe **right-click** karo
2. **Add** → **New Folder** select karo
3. Name type karo: **`Models`**
4. **Enter** press karo

---

#### Folder 2: DTOs

**Steps:**
1. **AdminPanelAPI** project pe **right-click**
2. **Add** → **New Folder**
3. Name: **`DTOs`**
4. **Enter**

---

#### Folder 3: Responses (For API responses)

**Steps:**
1. **AdminPanelAPI** project pe **right-click**
2. **Add** → **New Folder**
3. Name: **`Responses`**
4. **Enter**

---

### Current Project Structure

**After creating folders:**

```
AdminPanelAPI/
├── Controllers/
│   ├── UsersController.cs
│   └── WeatherForecastController.cs
├── DTOs/                           ← New (today)
├── Models/                         ← New (today)
├── Responses/                      ← New (today)
├── Properties/
│   └── launchSettings.json
├── appsettings.json
└── Program.cs
```

---

## 🏗️ Part 3: Create Model Classes (60 minutes)

### Step 1: Create User Model

**Location:** `Models/User.cs`

**Steps to Create:**

1. **Solution Explorer** mein **"Models"** folder pe **right-click** karo
2. **Add** → **Class...** select karo
3. **"Add New Item"** dialog box khulega
4. **Class** template already selected hoga
5. **Name** field mein type karo: **`User.cs`**
6. **Add** button click karo

---

### Step 2: User Model Code

**File:** `Models/User.cs`

**Replace default code with:**

```csharp
namespace AdminPanelAPI.Models
{
    /// <summary>
    /// User entity - represents Users table in database
    /// </summary>
    public class User
    {
        // ==========================================
        // PRIMARY KEY
        // ==========================================
        
        /// <summary>
        /// Unique identifier for user
        /// </summary>
        public int Id { get; set; }

        // ==========================================
        // BASIC INFORMATION
        // ==========================================
        
        /// <summary>
        /// Full name of user
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Username for login
        /// </summary>
        public string Username { get; set; } = string.Empty;

        /// <summary>
        /// Email address (unique)
        /// </summary>
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Hashed password (never store plain text!)
        /// </summary>
        public string PasswordHash { get; set; } = string.Empty;

        // ==========================================
        // CONTACT INFORMATION
        // ==========================================
        
        /// <summary>
        /// Phone number
        /// </summary>
        public string? Phone { get; set; }

        /// <summary>
        /// Website URL
        /// </summary>
        public string? Website { get; set; }

        // ==========================================
        // COMPANY INFORMATION
        // ==========================================
        
        /// <summary>
        /// Company name
        /// </summary>
        public string? CompanyName { get; set; }

        /// <summary>
        /// Job title / designation
        /// </summary>
        public string? JobTitle { get; set; }

        // ==========================================
        // ADDRESS INFORMATION
        // ==========================================
        
        /// <summary>
        /// Street address
        /// </summary>
        public string? Street { get; set; }

        /// <summary>
        /// City
        /// </summary>
        public string? City { get; set; }

        /// <summary>
        /// State / Province
        /// </summary>
        public string? State { get; set; }

        /// <summary>
        /// Zip code / Postal code
        /// </summary>
        public string? ZipCode { get; set; }

        /// <summary>
        /// Country
        /// </summary>
        public string? Country { get; set; }

        // ==========================================
        // ROLE & STATUS
        // ==========================================
        
        /// <summary>
        /// User role (Admin, Manager, User, etc.)
        /// </summary>
        public string Role { get; set; } = "User";

        /// <summary>
        /// Is account active?
        /// </summary>
        public bool IsActive { get; set; } = true;

        // ==========================================
        // AUDIT FIELDS
        // ==========================================
        
        /// <summary>
        /// When was this user created
        /// </summary>
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// When was this user last updated
        /// </summary>
        public DateTime? UpdatedDate { get; set; }

        /// <summary>
        /// Last login date
        /// </summary>
        public DateTime? LastLoginDate { get; set; }
    }
}
```

---

### 📖 Understanding the Model

**1. Properties (Get/Set)**
```csharp
public string Name { get; set; }
```
- `public` = Accessible from anywhere
- `string` = Data type
- `Name` = Property name
- `{ get; set; }` = Can be read and written

**2. String Initialization**
```csharp
public string Name { get; set; } = string.Empty;
```
- Prevents null reference errors
- Better than `null`

**3. Nullable Properties**
```csharp
public string? Phone { get; set; }
```
- `?` = This can be null
- Optional fields

**4. Default Values**
```csharp
public string Role { get; set; } = "User";
public bool IsActive { get; set; } = true;
public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
```
- Automatic default when creating new object

**5. XML Comments**
```csharp
/// <summary>
/// Description here
/// </summary>
```
- Documentation
- Shows in IntelliSense tooltips

---

### Save the File
- **Ctrl + S** or **File → Save**

---

## 📤 Part 4: Create DTO Classes (60 minutes)

### Step 1: Create UserDto (Response)

**Location:** `DTOs/UserDto.cs`

**Steps:**
1. **DTOs** folder pe **right-click**
2. **Add** → **Class...**
3. Name: **`UserDto.cs`**
4. **Add** button

**Code:**

```csharp
namespace AdminPanelAPI.DTOs
{
    /// <summary>
    /// DTO for returning user information to client
    /// Does NOT include sensitive data like password
    /// </summary>
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Phone { get; set; }
        public string? Website { get; set; }
        public string? CompanyName { get; set; }
        public string? JobTitle { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }
        public string Role { get; set; } = "User";
        public bool IsActive { get; set; }
        public DateTime CreatedDate { get; set; }
        
        // Notice: NO PasswordHash, NO internal audit fields
    }
}
```

---

### Step 2: Create CreateUserDto (Request)

**Location:** `DTOs/CreateUserDto.cs`

**Steps:**
1. **DTOs** folder pe **right-click**
2. **Add** → **Class...**
3. Name: **`CreateUserDto.cs`**
4. **Add**

**Code:**

```csharp
using System.ComponentModel.DataAnnotations;

namespace AdminPanelAPI.DTOs
{
    /// <summary>
    /// DTO for creating a new user
    /// Contains only fields needed for registration
    /// </summary>
    public class CreateUserDto
    {
        [Required(ErrorMessage = "Name is required")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Name must be between 3 and 100 characters")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Username is required")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Username must be between 3 and 50 characters")]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters")]
        public string Password { get; set; } = string.Empty;

        [Phone(ErrorMessage = "Invalid phone number")]
        public string? Phone { get; set; }

        public string? Website { get; set; }
        public string? CompanyName { get; set; }
        public string? JobTitle { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }
    }
}
```

---

### Step 3: Create UpdateUserDto (Request)

**Location:** `DTOs/UpdateUserDto.cs`

**Code:**

```csharp
using System.ComponentModel.DataAnnotations;

namespace AdminPanelAPI.DTOs
{
    /// <summary>
    /// DTO for updating existing user
    /// Password update is separate for security
    /// </summary>
    public class UpdateUserDto
    {
        [Required(ErrorMessage = "Name is required")]
        [StringLength(100, MinimumLength = 3)]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; } = string.Empty;

        [Phone(ErrorMessage = "Invalid phone number")]
        public string? Phone { get; set; }

        public string? Website { get; set; }
        public string? CompanyName { get; set; }
        public string? JobTitle { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }
    }
}
```

---

### 📖 Understanding Data Annotations

**Validation Attributes:**

```csharp
[Required]                    // Field cannot be empty
[StringLength(100)]          // Max length
[EmailAddress]               // Must be valid email
[Phone]                      // Must be valid phone
[Range(1, 100)]             // Numeric range
[RegularExpression("...")]  // Custom pattern
```

**Benefits:**
- ✅ Automatic validation
- ✅ ASP.NET Core validates before controller method
- ✅ Returns 400 BadRequest automatically if invalid
- ✅ Clean code

---

### Step 4: Create API Response Class

**Location:** `Responses/ApiResponse.cs`

**Steps:**
1. **Responses** folder pe **right-click**
2. **Add** → **Class...**
3. Name: **`ApiResponse.cs`**
4. **Add**

**Code:**

```csharp
namespace AdminPanelAPI.Responses
{
    /// <summary>
    /// Standard API response format
    /// Consistent structure for all API responses
    /// </summary>
    /// <typeparam name="T">Type of data being returned</typeparam>
    public class ApiResponse<T>
    {
        /// <summary>
        /// Was the operation successful?
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// Message for user
        /// </summary>
        public string Message { get; set; } = string.Empty;

        /// <summary>
        /// Actual data (can be object, list, etc.)
        /// </summary>
        public T? Data { get; set; }

        /// <summary>
        /// List of validation errors (if any)
        /// </summary>
        public List<string>? Errors { get; set; }

        // ==========================================
        // HELPER METHODS
        // ==========================================

        /// <summary>
        /// Create success response
        /// </summary>
        public static ApiResponse<T> SuccessResponse(T data, string message = "Operation successful")
        {
            return new ApiResponse<T>
            {
                Success = true,
                Message = message,
                Data = data
            };
        }

        /// <summary>
        /// Create error response
        /// </summary>
        public static ApiResponse<T> ErrorResponse(string message, List<string>? errors = null)
        {
            return new ApiResponse<T>
            {
                Success = false,
                Message = message,
                Errors = errors
            };
        }
    }
}
```

---

## 🎮 Part 5: Update UsersController (Professional Version) (60 minutes)

### Step 1: Update Existing Controller

**Location:** `Controllers/UsersController.cs`

**Replace existing code with:**

```csharp
using Microsoft.AspNetCore.Mvc;
using AdminPanelAPI.Models;
using AdminPanelAPI.DTOs;
using AdminPanelAPI.Responses;

namespace AdminPanelAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // ==========================================
        // TEMPORARY DATA STORAGE
        // (Will be replaced with database later)
        // ==========================================
        
        private static List<User> _users = new List<User>
        {
            new User
            {
                Id = 1,
                Name = "Ahmad Ali",
                Username = "ahmad.ali",
                Email = "ahmad@example.com",
                PasswordHash = "hashed_password_123",
                Phone = "+92-300-1234567",
                Website = "ahmad-ali.com",
                CompanyName = "Tech Solutions",
                JobTitle = "Software Engineer",
                City = "Karachi",
                Country = "Pakistan",
                Role = "Admin",
                IsActive = true,
                CreatedDate = DateTime.UtcNow.AddDays(-30)
            },
            new User
            {
                Id = 2,
                Name = "Fatima Khan",
                Username = "fatima.khan",
                Email = "fatima@example.com",
                PasswordHash = "hashed_password_456",
                Phone = "+92-321-9876543",
                CompanyName = "Digital Agency",
                JobTitle = "Project Manager",
                City = "Lahore",
                Country = "Pakistan",
                Role = "Manager",
                IsActive = true,
                CreatedDate = DateTime.UtcNow.AddDays(-15)
            },
            new User
            {
                Id = 3,
                Name = "Hassan Sheikh",
                Username = "hassan.sheikh",
                Email = "hassan@example.com",
                PasswordHash = "hashed_password_789",
                CompanyName = "StartupCo",
                JobTitle = "Developer",
                City = "Islamabad",
                Country = "Pakistan",
                Role = "User",
                IsActive = true,
                CreatedDate = DateTime.UtcNow.AddDays(-7)
            }
        };

        private static int _nextId = 4;

        // ==========================================
        // GET: api/Users
        // Get all users
        // ==========================================
        
        /// <summary>
        /// Get list of all users
        /// </summary>
        /// <returns>List of users</returns>
        [HttpGet]
        [ProducesResponseType(typeof(ApiResponse<List<UserDto>>), StatusCodes.Status200OK)]
        public IActionResult GetAllUsers()
        {
            try
            {
                // Convert Model to DTO (hide sensitive data)
                var userDtos = _users.Select(user => new UserDto
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
                }).ToList();

                var response = ApiResponse<List<UserDto>>.SuccessResponse(
                    userDtos, 
                    $"Retrieved {userDtos.Count} users successfully"
                );

                return Ok(response);
            }
            catch (Exception ex)
            {
                var response = ApiResponse<List<UserDto>>.ErrorResponse(
                    "An error occurred while retrieving users",
                    new List<string> { ex.Message }
                );
                return StatusCode(500, response);
            }
        }

        // ==========================================
        // GET: api/Users/5
        // Get user by ID
        // ==========================================
        
        /// <summary>
        /// Get specific user by ID
        /// </summary>
        /// <param name="id">User ID</param>
        /// <returns>User details</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ApiResponse<UserDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<UserDto>), StatusCodes.Status404NotFound)]
        public IActionResult GetUserById(int id)
        {
            try
            {
                var user = _users.FirstOrDefault(u => u.Id == id);

                if (user == null)
                {
                    var notFoundResponse = ApiResponse<UserDto>.ErrorResponse(
                        $"User with ID {id} not found"
                    );
                    return NotFound(notFoundResponse);
                }

                // Convert to DTO
                var userDto = new UserDto
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

                var response = ApiResponse<UserDto>.SuccessResponse(
                    userDto,
                    "User retrieved successfully"
                );

                return Ok(response);
            }
            catch (Exception ex)
            {
                var response = ApiResponse<UserDto>.ErrorResponse(
                    "An error occurred while retrieving user",
                    new List<string> { ex.Message }
                );
                return StatusCode(500, response);
            }
        }

        // ==========================================
        // POST: api/Users
        // Create new user
        // ==========================================
        
        /// <summary>
        /// Create a new user
        /// </summary>
        /// <param name="createUserDto">User creation data</param>
        /// <returns>Created user</returns>
        [HttpPost]
        [ProducesResponseType(typeof(ApiResponse<UserDto>), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ApiResponse<UserDto>), StatusCodes.Status400BadRequest)]
        public IActionResult CreateUser([FromBody] CreateUserDto createUserDto)
        {
            try
            {
                // Check if email already exists
                if (_users.Any(u => u.Email.ToLower() == createUserDto.Email.ToLower()))
                {
                    var errorResponse = ApiResponse<UserDto>.ErrorResponse(
                        "User creation failed",
                        new List<string> { "Email already exists" }
                    );
                    return BadRequest(errorResponse);
                }

                // Check if username already exists
                if (_users.Any(u => u.Username.ToLower() == createUserDto.Username.ToLower()))
                {
                    var errorResponse = ApiResponse<UserDto>.ErrorResponse(
                        "User creation failed",
                        new List<string> { "Username already exists" }
                    );
                    return BadRequest(errorResponse);
                }

                // Create new user (Model)
                var newUser = new User
                {
                    Id = _nextId++,
                    Name = createUserDto.Name,
                    Username = createUserDto.Username,
                    Email = createUserDto.Email,
                    PasswordHash = HashPassword(createUserDto.Password), // Simulate hashing
                    Phone = createUserDto.Phone,
                    Website = createUserDto.Website,
                    CompanyName = createUserDto.CompanyName,
                    JobTitle = createUserDto.JobTitle,
                    City = createUserDto.City,
                    Country = createUserDto.Country,
                    Role = "User", // Default role
                    IsActive = true,
                    CreatedDate = DateTime.UtcNow
                };

                _users.Add(newUser);

                // Convert to DTO for response
                var userDto = new UserDto
                {
                    Id = newUser.Id,
                    Name = newUser.Name,
                    Username = newUser.Username,
                    Email = newUser.Email,
                    Phone = newUser.Phone,
                    Website = newUser.Website,
                    CompanyName = newUser.CompanyName,
                    JobTitle = newUser.JobTitle,
                    City = newUser.City,
                    Country = newUser.Country,
                    Role = newUser.Role,
                    IsActive = newUser.IsActive,
                    CreatedDate = newUser.CreatedDate
                };

                var response = ApiResponse<UserDto>.SuccessResponse(
                    userDto,
                    "User created successfully"
                );

                return CreatedAtAction(nameof(GetUserById), new { id = newUser.Id }, response);
            }
            catch (Exception ex)
            {
                var response = ApiResponse<UserDto>.ErrorResponse(
                    "An error occurred while creating user",
                    new List<string> { ex.Message }
                );
                return StatusCode(500, response);
            }
        }

        // ==========================================
        // PUT: api/Users/5
        // Update existing user
        // ==========================================
        
        /// <summary>
        /// Update existing user
        /// </summary>
        /// <param name="id">User ID</param>
        /// <param name="updateUserDto">Updated user data</param>
        /// <returns>Updated user</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(ApiResponse<UserDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<UserDto>), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ApiResponse<UserDto>), StatusCodes.Status400BadRequest)]
        public IActionResult UpdateUser(int id, [FromBody] UpdateUserDto updateUserDto)
        {
            try
            {
                var user = _users.FirstOrDefault(u => u.Id == id);

                if (user == null)
                {
                    var notFoundResponse = ApiResponse<UserDto>.ErrorResponse(
                        $"User with ID {id} not found"
                    );
                    return NotFound(notFoundResponse);
                }

                // Check if email is taken by another user
                if (_users.Any(u => u.Id != id && u.Email.ToLower() == updateUserDto.Email.ToLower()))
                {
                    var errorResponse = ApiResponse<UserDto>.ErrorResponse(
                        "Update failed",
                        new List<string> { "Email already exists" }
                    );
                    return BadRequest(errorResponse);
                }

                // Update user properties
                user.Name = updateUserDto.Name;
                user.Email = updateUserDto.Email;
                user.Phone = updateUserDto.Phone;
                user.Website = updateUserDto.Website;
                user.CompanyName = updateUserDto.CompanyName;
                user.JobTitle = updateUserDto.JobTitle;
                user.City = updateUserDto.City;
                user.Country = updateUserDto.Country;
                user.UpdatedDate = DateTime.UtcNow;

                // Convert to DTO
                var userDto = new UserDto
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

                var response = ApiResponse<UserDto>.SuccessResponse(
                    userDto,
                    "User updated successfully"
                );

                return Ok(response);
            }
            catch (Exception ex)
            {
                var response = ApiResponse<UserDto>.ErrorResponse(
                    "An error occurred while updating user",
                    new List<string> { ex.Message }
                );
                return StatusCode(500, response);
            }
        }

        // ==========================================
        // DELETE: api/Users/5
        // Delete user
        // ==========================================
        
        /// <summary>
        /// Delete user by ID
        /// </summary>
        /// <param name="id">User ID</param>
        /// <returns>Success message</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status404NotFound)]
        public IActionResult DeleteUser(int id)
        {
            try
            {
                var user = _users.FirstOrDefault(u => u.Id == id);

                if (user == null)
                {
                    var notFoundResponse = ApiResponse<object>.ErrorResponse(
                        $"User with ID {id} not found"
                    );
                    return NotFound(notFoundResponse);
                }

                _users.Remove(user);

                var response = ApiResponse<object>.SuccessResponse(
                    new { DeletedUserId = id },
                    "User deleted successfully"
                );

                return Ok(response);
            }
            catch (Exception ex)
            {
                var response = ApiResponse<object>.ErrorResponse(
                    "An error occurred while deleting user",
                    new List<string> { ex.Message }
                );
                return StatusCode(500, response);
            }
        }

        // ==========================================
        // HELPER METHODS
        // ==========================================
        
        /// <summary>
        /// Simulate password hashing
        /// (In real app, use BCrypt or ASP.NET Identity)
        /// </summary>
        private string HashPassword(string password)
        {
            // Temporary simulation - NOT secure!
            // Real implementation will use BCrypt.Net or Identity
            return $"hashed_{password}_{DateTime.UtcNow.Ticks}";
        }
    }
}
```

---

### 📖 Understanding the Controller

**1. Route Attribute**
```csharp
[Route("api/[controller]")]
```
Result: `/api/Users`

**2. ProducesResponseType**
```csharp
[ProducesResponseType(typeof(ApiResponse<UserDto>), StatusCodes.Status200OK)]
```
- Documents what API returns
- Shows in Swagger documentation
- Helps with type safety

**3. Model to DTO Conversion**
```csharp
var userDto = new UserDto
{
    Id = user.Id,
    Name = user.Name,
    // ... copy properties
    // NO PasswordHash!
};
```

**4. Validation**
```csharp
if (_users.Any(u => u.Email == email))
{
    return BadRequest("Email exists");
}
```

**5. Consistent Response**
```csharp
var response = ApiResponse<UserDto>.SuccessResponse(
    data,
    "Success message"
);
return Ok(response);
```

---

### Save and Build

**Save Controller:**
- **Ctrl + S**

**Build Project:**
- **Build** → **Build Solution** (Ctrl + Shift + B)

**Check Output:**
```
Build succeeded!
```

---

## ▶️ Part 6: Test Your API (60 minutes)

### Method 1: Swagger UI (Built-in)

**Run Application:**
- Press **F5**
- Browser opens with Swagger

**Swagger now shows improved documentation:**

```
┌─────────────────────────────────────────────┐
│  Users                                      │
│                                             │
│  GET    /api/Users                         │
│         Get list of all users              │
│         Returns: ApiResponse<List<UserDto>>│
│                                             │
│  GET    /api/Users/{id}                    │
│         Get specific user by ID            │
│         Returns: ApiResponse<UserDto>      │
│                                             │
│  POST   /api/Users                         │
│         Create a new user                  │
│         Request: CreateUserDto             │
│         Returns: ApiResponse<UserDto>      │
│                                             │
│  PUT    /api/Users/{id}                    │
│         Update existing user               │
│         Request: UpdateUserDto             │
│         Returns: ApiResponse<UserDto>      │
│                                             │
│  DELETE /api/Users/{id}                    │
│         Delete user by ID                  │
│         Returns: ApiResponse<Object>       │
└─────────────────────────────────────────────┘
```

---

### Test 1: GET All Users

1. Click **GET /api/Users**
2. Click **Try it out**
3. Click **Execute**

**Response:**
```json
{
  "success": true,
  "message": "Retrieved 3 users successfully",
  "data": [
    {
      "id": 1,
      "name": "Ahmad Ali",
      "username": "ahmad.ali",
      "email": "ahmad@example.com",
      "phone": "+92-300-1234567",
      "website": "ahmad-ali.com",
      "companyName": "Tech Solutions",
      "jobTitle": "Software Engineer",
      "city": "Karachi",
      "country": "Pakistan",
      "role": "Admin",
      "isActive": true,
      "createdDate": "2026-01-12T10:30:00Z"
    },
    // ... more users
  ],
  "errors": null
}
```

**Notice:**
- ✅ Consistent response format
- ✅ No password field
- ✅ Clean structure

---

### Test 2: GET User by ID

1. Click **GET /api/Users/{id}**
2. Click **Try it out**
3. Enter **id**: `1`
4. Click **Execute**

**Response:**
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "id": 1,
    "name": "Ahmad Ali",
    "username": "ahmad.ali",
    "email": "ahmad@example.com",
    // ... all fields
  },
  "errors": null
}
```

---

### Test 3: POST Create User

1. Click **POST /api/Users**
2. Click **Try it out**
3. **Request body:**

```json
{
  "name": "Sara Ahmed",
  "username": "sara.ahmed",
  "email": "sara@example.com",
  "password": "SecurePass123",
  "phone": "+92-333-1234567",
  "companyName": "Tech Startup",
  "jobTitle": "Designer",
  "city": "Karachi",
  "country": "Pakistan"
}
```

4. Click **Execute**

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 4,
    "name": "Sara Ahmed",
    "username": "sara.ahmed",
    "email": "sara@example.com",
    // ... (NO password!)
    "role": "User",
    "isActive": true
  },
  "errors": null
}
```

**Status Code:** 201 Created ✅

---

### Test 4: POST Validation Error

**Test invalid email:**

```json
{
  "name": "Te",
  "username": "test",
  "email": "invalid-email",
  "password": "123"
}
```

**Response:**
```json
{
  "errors": {
    "Name": ["Name must be between 3 and 100 characters"],
    "Email": ["Invalid email format"],
    "Password": ["Password must be at least 6 characters"]
  },
  "status": 400,
  "title": "One or more validation errors occurred."
}
```

**Validation works automatically!** ✅

---

### Test 5: PUT Update User

1. Click **PUT /api/Users/{id}**
2. Click **Try it out**
3. **id**: `1`
4. **Request body:**

```json
{
  "name": "Ahmad Ali Updated",
  "email": "ahmad.updated@example.com",
  "phone": "+92-300-9999999",
  "city": "Karachi",
  "country": "Pakistan"
}
```

5. Click **Execute**

**Response:**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": 1,
    "name": "Ahmad Ali Updated",
    "email": "ahmad.updated@example.com",
    // ... updated fields
  },
  "errors": null
}
```

---

### Test 6: DELETE User

1. Click **DELETE /api/Users/{id}**
2. Click **Try it out**
3. **id**: `3`
4. Click **Execute**

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": {
    "deletedUserId": 3
  },
  "errors": null
}
```

---

### Method 2: Postman (Optional)

**Download Postman:**
- https://www.postman.com/downloads/

**Create Request:**
1. **New Request**
2. **Method:** GET
3. **URL:** `https://localhost:7001/api/Users`
4. Click **Send**

**Same tests as Swagger!**

---

## 📊 Final Project Structure

```
AdminPanelAPI/
├── Controllers/
│   ├── UsersController.cs          ← Updated (today)
│   └── WeatherForecastController.cs
├── DTOs/                            ← New (today)
│   ├── CreateUserDto.cs            ← Request DTO
│   ├── UpdateUserDto.cs            ← Request DTO
│   └── UserDto.cs                  ← Response DTO
├── Models/                          ← New (today)
│   └── User.cs                     ← Database Model
├── Responses/                       ← New (today)
│   └── ApiResponse.cs              ← API Response wrapper
├── Properties/
│   └── launchSettings.json
├── appsettings.json
├── appsettings.Development.json
└── Program.cs
```

---

## ✅ Day 2 Checklist

### **Concepts Understanding:**
- [ ] Model vs DTO clear
- [ ] Why separate Model and DTO
- [ ] Data annotations understood
- [ ] Request vs Response DTOs
- [ ] API response structure

### **Files Created:**
- [ ] Models/User.cs
- [ ] DTOs/UserDto.cs
- [ ] DTOs/CreateUserDto.cs
- [ ] DTOs/UpdateUserDto.cs
- [ ] Responses/ApiResponse.cs

### **Controller Updated:**
- [ ] Professional structure
- [ ] All CRUD operations
- [ ] Model to DTO conversion
- [ ] Validation logic
- [ ] Consistent responses
- [ ] Error handling

### **Testing:**
- [ ] GET all users works
- [ ] GET user by ID works
- [ ] POST create user works
- [ ] Validation errors work
- [ ] PUT update user works
- [ ] DELETE user works
- [ ] Consistent response format

### **Best Practices:**
- [ ] XML comments added
- [ ] Proper naming conventions
- [ ] Error handling
- [ ] Separation of concerns
- [ ] No sensitive data exposure

---

## 🎯 Practice Tasks

### Task 1: Add Product Model & DTOs (⭐⭐⭐)

**Create:**
```
Models/Product.cs
DTOs/ProductDto.cs
DTOs/CreateProductDto.cs
DTOs/UpdateProductDto.cs
Controllers/ProductsController.cs
```

**Product fields:**
- Id, Name, Description, Price, Category, Stock, IsActive, CreatedDate

---

### Task 2: Add Search Endpoint (⭐⭐⭐⭐)

```csharp
[HttpGet("search")]
public IActionResult SearchUsers([FromQuery] string query)
{
    var results = _users
        .Where(u => u.Name.Contains(query) || u.Email.Contains(query))
        .Select(u => new UserDto { ... })
        .ToList();
    
    return Ok(ApiResponse<List<UserDto>>.SuccessResponse(results));
}
```

---

### Task 3: Add Pagination (⭐⭐⭐⭐⭐)

```csharp
[HttpGet]
public IActionResult GetAllUsers([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
{
    var totalUsers = _users.Count;
    var users = _users
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .Select(u => new UserDto { ... })
        .ToList();
    
    var response = new
    {
        TotalCount = totalUsers,
        Page = page,
        PageSize = pageSize,
        TotalPages = (int)Math.Ceiling(totalUsers / (double)pageSize),
        Data = users
    };
    
    return Ok(ApiResponse<object>.SuccessResponse(response));
}
```

---

## 🎓 Summary

### Today You Learned:

**1. Models**
```
✅ What are Models (Database entities)
✅ Properties and data types
✅ Nullable vs non-nullable
✅ Default values
✅ Audit fields
```

**2. DTOs**
```
✅ What are DTOs
✅ Why separate from Models
✅ Request DTOs (Create, Update)
✅ Response DTOs
✅ Data Annotations (validation)
```

**3. Project Structure**
```
✅ Organized folders
✅ Models folder
✅ DTOs folder
✅ Responses folder
✅ Clean separation
```

**4. Professional Controller**
```
✅ Model to DTO conversion
✅ Consistent response format
✅ Validation
✅ Error handling
✅ Documentation
```

**5. Testing**
```
✅ Swagger UI
✅ All CRUD operations
✅ Validation testing
✅ Error scenarios
```

---

## 📊 Before vs After

### Before Day 2:
```
❌ Direct model exposure
❌ No validation
❌ Inconsistent responses
❌ Passwords visible in responses
❌ No proper structure
```

### After Day 2:
```
✅ Models separate from DTOs
✅ Automatic validation
✅ Consistent ApiResponse format
✅ Sensitive data hidden
✅ Professional folder structure
✅ Well-documented API
✅ Request/Response separation
✅ Error handling
```

---

## 🔜 Tomorrow Preview

**Day 3: SQL Server & Database Setup**

**What's Coming:**
- ✅ SQL Server installation
- ✅ SSMS (Management Studio)
- ✅ Creating database
- ✅ Entity Framework Core setup
- ✅ DbContext creation
- ✅ Migrations
- ✅ Connecting API to real database

**Get Ready:**
Tomorrow we replace in-memory list with real SQL Server database! 🗄️

---

## 💡 Pro Tips

### Tip 1: Always Use DTOs for API
```csharp
// ❌ Bad
return Ok(user);  // Exposes everything

// ✅ Good
return Ok(userDto);  // Only what client needs
```

### Tip 2: Validation Attributes
```csharp
[Required]
[EmailAddress]
[StringLength(100)]
// Automatic validation!
```

### Tip 3: Consistent Response Format
```csharp
// All endpoints return same structure
ApiResponse<T>
{
    Success,
    Message,
    Data,
    Errors
}
```

### Tip 4: XML Comments
```csharp
/// <summary>
/// Description shows in Swagger
/// </summary>
```

---

## 🎊 Congratulations!

**🎉 Day 2 Complete! Professional Structure Ready! 🎉**

**You've Successfully:**
- ✅ Understood Models vs DTOs
- ✅ Created proper folder structure
- ✅ Built User Model with all fields
- ✅ Created Request & Response DTOs
- ✅ Added automatic validation
- ✅ Professional UsersController
- ✅ Consistent API responses
- ✅ Hidden sensitive data
- ✅ Complete CRUD with best practices

**Your Backend is Now:**
```
✅ Professional structure
✅ Secure (no password exposure)
✅ Validated (automatic)
✅ Documented (Swagger)
✅ Consistent (ApiResponse)
✅ Production-ready pattern
```

**Tomorrow: Real Database! 🗄️**

**Keep Learning! Keep Building! 🚀✨**
