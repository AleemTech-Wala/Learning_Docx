# 📅 Week 5 - Day 2: JWT Backend Setup & Configuration

## 🎯 Aaj ka Goal

Aaj hum backend mein **JWT authentication ka complete infrastructure** setup karenge! 🔐

Yesterday theory seekhi, aaj **real implementation** start hoga Visual Studio mein.

**Kya Karenge:**
- JWT NuGet packages install karenge (Visual Studio GUI se)
- appsettings.json mein JWT configuration
- Program.cs mein authentication middleware setup
- JwtService class banayenge (token generation)
- Complete testing with test endpoint

**Output:** Backend JWT-ready ho jayega! Token generate kar sakenge!

---

## ⏰ Aaj ka Session Breakdown (4-5 Hours)

| Part | Topic | Time |
|------|-------|------|
| 1 | Understanding JWT Packages | 30 min |
| 2 | Install JWT NuGet Packages (Visual Studio GUI) | 30 min |
| 3 | Configure appsettings.json (JWT Settings) | 30 min |
| 4 | Update Program.cs (Authentication Middleware) | 45 min |
| 5 | Create JwtService Class | 60 min |
| 6 | Create Test Endpoint | 30 min |
| 7 | Testing with Postman | 45 min |

---

## 📚 Part 1: Understanding JWT Packages (30 min)

### 🎯 Kaunse Packages Chahiye?

JWT authentication ke liye .NET mein **2 main packages** chahiye:

#### 1. **Microsoft.AspNetCore.Authentication.JwtBearer**

**What it is:**
- ASP.NET Core ka official JWT authentication middleware
- Token validation automatic karta hai
- `[Authorize]` attribute support karta hai

**Why we need it:**
```
Without this:
❌ Har request pe manually token validate karna padega
❌ Token ka signature verify karna complex hai
❌ Expiry check manually karna padta hai

With this:
✅ Automatic token validation (middleware)
✅ Just [Authorize] attribute lagao, done!
✅ Token expiry auto-check hota hai
✅ Invalid token automatic reject
```

**What it does:**
- Bearer token extract karta hai request headers se
- Signature verify karta hai (secret key se)
- Expiry check karta hai
- User info extract karke controller ko deta hai

---

#### 2. **System.IdentityModel.Tokens.Jwt**

**What it is:**
- JWT token create/read karne ki library
- Token generation logic provide karta hai

**Why we need it:**
```
Purpose: Token banane ke liye

Features:
✅ JwtSecurityToken class (token object)
✅ JwtSecurityTokenHandler (token write/read)
✅ SecurityTokenDescriptor (token properties)
✅ Claims add karna (user info)
```

**What it does:**
- User login hone pe token generate karta hai
- Claims (user data) token mein add karta hai
- Signature create karta hai secret key se
- Token ko string format mein convert karta hai

---

### 🆚 Dono Packages Ka Role

```
┌─────────────────────────────────────────────────┐
│           JWT Workflow in .NET                  │
├─────────────────────────────────────────────────┤
│                                                 │
│  1. USER LOGIN                                  │
│  ═════════════                                  │
│  Package: System.IdentityModel.Tokens.Jwt       │
│                                                 │
│  User credentials verify → Generate JWT Token   │
│  JwtSecurityTokenHandler creates token          │
│  Token string return to client                  │
│                                                 │
│  ─────────────────────────────────────────────  │
│                                                 │
│  2. SUBSEQUENT REQUESTS                         │
│  ═══════════════════════                        │
│  Package: Microsoft.AspNetCore.Authentication. │
│           JwtBearer                             │
│                                                 │
│  Client sends token in header                   │
│  Middleware intercepts request                  │
│  Validates token automatically                  │
│  Allows/Denies based on validation             │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Simple Analogy:**

```
Concert Ticket System:

System.IdentityModel.Tokens.Jwt:
├─ Ticket printing machine (creates ticket)
├─ Adds hologram (signature)
└─ Adds expiry date

Microsoft.AspNetCore.Authentication.JwtBearer:
├─ Gate scanner (validates ticket)
├─ Checks hologram (signature verification)
├─ Checks expiry (not expired?)
└─ Allows/denies entry
```

---

## 📦 Part 2: Install JWT NuGet Packages (30 min)

### 🛠️ Step 1: Open NuGet Package Manager

1. **Visual Studio** mein **AdminPanelAPI** project kholo

2. **Solution Explorer** mein **AdminPanelAPI** project pe **right-click** karo

3. **"Manage NuGet Packages"** select karo

**Result:** NuGet Package Manager window khulega

```
┌─────────────────────────────────────────────┐
│  NuGet Package Manager                      │
├─────────────────────────────────────────────┤
│  Browse  Installed  Updates  Consolidate   │
├─────────────────────────────────────────────┤
│  [Search box]                               │
│                                             │
│  Package list appears here...               │
└─────────────────────────────────────────────┘
```

---

### 📥 Step 2: Install First Package (JwtBearer)

1. **Browse tab** click karo (top left)

2. **Search box** mein type karo:
   ```
   Microsoft.AspNetCore.Authentication.JwtBearer
   ```

3. **Search results** mein **exact name** wala package select karo:
   - Publisher: **Microsoft** hona chahiye
   - Total downloads: Millions mein
   - Latest stable version select karo

4. **Right side panel** mein:
   - **Version dropdown** se latest stable select karo (e.g., **8.0.0**)
   - **Install button** click karo

5. **Preview Changes** dialog khulega:
   - Changes review karo
   - **"OK"** button click karo

6. **License Acceptance** dialog:
   - **"I Accept"** button click karo

7. **Output window** (bottom) mein dekho:
   ```
   Installing Microsoft.AspNetCore.Authentication.JwtBearer 8.0.0
   Successfully installed 'Microsoft.AspNetCore.Authentication.JwtBearer 8.0.0'
   ```

**Wait** karo jab tak green checkmark na dikhe!

---

### 📥 Step 3: Install Second Package (JWT Tokens)

1. **Search box** mein clear karo, phir type karo:
   ```
   System.IdentityModel.Tokens.Jwt
   ```

2. **Search results** mein select karo:
   - Publisher: **Microsoft** 
   - Package name exactly match hona chahiye

3. **Right side panel** mein:
   - Latest stable version select karo (e.g., **7.0.0** ya **8.0.0**)
   - **Install button** click karo

4. **Preview Changes** → **OK**

5. **License Acceptance** → **I Accept**

6. **Output window** check karo:
   ```
   Installing System.IdentityModel.Tokens.Jwt 7.0.0
   Successfully installed 'System.IdentityModel.Tokens.Jwt 7.0.0'
   ```

---

### ✅ Step 4: Verify Installation

**Method 1: Check Installed Tab**

1. NuGet Package Manager mein **"Installed"** tab click karo

2. **Search** karo installed packages list mein:
   - `Microsoft.AspNetCore.Authentication.JwtBearer` ✅
   - `System.IdentityModel.Tokens.Jwt` ✅

**Method 2: Check Project File**

1. **Solution Explorer** mein **AdminPanelAPI** project pe **right-click**

2. **"Edit Project File"** select karo

3. **`<ItemGroup>`** section mein ye lines dikhengi:

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
  
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="8.0.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="8.0.11" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="8.0.11" />
    <PackageReference Include="System.IdentityModel.Tokens.Jwt" Version="7.0.0" />
  </ItemGroup>

</Project>
```

**Agar ye lines dikhen → Packages successfully installed!** ✅

---

## ⚙️ Part 3: Configure appsettings.json (30 min)

### 📄 Step 1: Open appsettings.json

1. **Solution Explorer** → **appsettings.json** file pe **double-click**

### ✏️ Step 2: Add JWT Settings Section

**Current appsettings.json:**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=AdminPanelDB;Trusted_Connection=True;TrustServerCertificate=True;"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

**Updated appsettings.json (JWT Settings Added):**

`"ConnectionStrings"` section ke **BAAD** ye section add karo:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=AdminPanelDB;Trusted_Connection=True;TrustServerCertificate=True;"
  },
  "JwtSettings": {
    "SecretKey": "MyVeryStrongSecretKeyForJWT_2024_AdminPanel_AlphaNumeric!@#",
    "Issuer": "AdminPanelAPI",
    "Audience": "AdminPanelFrontend",
    "ExpiryMinutes": 60
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

---

### 📖 JWT Settings Explanation

#### 1. **SecretKey** (Most Important!)

```json
"SecretKey": "MyVeryStrongSecretKeyForJWT_2024_AdminPanel_AlphaNumeric!@#"
```

**What it is:**
- Token ki signature banane ka secret password
- Sirf backend ko pata hona chahiye
- Jitna strong, utna secure

**Requirements:**
- ✅ Minimum 32 characters (recommended 64+)
- ✅ Mix of letters (upper + lower case)
- ✅ Numbers include karo
- ✅ Special characters add karo (@, #, $, !, etc.)
- ❌ Simple words like "password", "secret" mat use karo

**Security:**
```
Weak Secret Key (❌):
"SecretKey": "secret"
"SecretKey": "12345"
"SecretKey": "myapp"

Strong Secret Key (✅):
"SecretKey": "K8$mP2#xL9@vQ5!wN7&jR3^hT6*gF4yD1zA0"
"SecretKey": "AdminPanel_JWT_Secret_2024_StrongKey!@#$%"
```

**How to generate:**
```
Method 1: Manual (mix characters)
MyVeryStrongSecretKey@2024!AdminPanel#Backend

Method 2: Online generator
https://randomkeygen.com/ (504 bit key)

Method 3: PowerShell (random string)
```

---

#### 2. **Issuer** (Token Kisne Banaya)

```json
"Issuer": "AdminPanelAPI"
```

**What it is:**
- Token generate karne wale application ka naam
- Identifies the token creator

**Purpose:**
- Token validation mein check hota hai
- Multiple services use kar rahe hain to identify karta hai
- Optional but recommended

**Examples:**
```
"Issuer": "AdminPanelAPI"
"Issuer": "https://api.mycompany.com"
"Issuer": "MyCompanyAuthServer"
```

---

#### 3. **Audience** (Token Kiske Liye Hai)

```json
"Audience": "AdminPanelFrontend"
```

**What it is:**
- Token kis application ke liye intended hai
- Target audience

**Purpose:**
- Token validation mein check hota hai
- Wrong application token use na kar sake

**Examples:**
```
"Audience": "AdminPanelFrontend"
"Audience": "https://mycompany.com"
"Audience": "MobileApp"
```

**Real Scenario:**
```
Scenario: Company ki 3 apps hain

App 1: Admin Panel (Web)
  Audience: "AdminPanelWeb"

App 2: Mobile App
  Audience: "MobileApp"

App 3: Public API
  Audience: "PublicAPI"

Admin Panel ka token Mobile App mein use nahi hoga!
(Audience match nahi karega)
```

---

#### 4. **ExpiryMinutes** (Token Kitni Der Valid)

```json
"ExpiryMinutes": 60
```

**What it is:**
- Token ki validity period (minutes mein)
- Is time ke baad token expire ho jayega

**Common Values:**
```
Development:
"ExpiryMinutes": 60  // 1 hour (easy testing)

Production:
"ExpiryMinutes": 15  // 15 minutes (high security)
"ExpiryMinutes": 30  // 30 minutes (balanced)

Refresh Token:
"ExpiryMinutes": 10080  // 7 days
"ExpiryMinutes": 43200  // 30 days
```

**Security Trade-off:**
```
Short Expiry (15-30 min):
✅ More secure (token leak→small window)
❌ User ko frequently login karna padega
❌ Bad user experience

Long Expiry (1-2 hours):
✅ Good user experience
❌ Token leak→longer risk window
```

**Best Practice:**
- Access Token: 15-60 minutes
- Refresh Token: 7-30 days (separate implementation)

---

### 💾 Step 3: Save Configuration

1. **Ctrl + S** press karke **appsettings.json** save karo

2. **Important:** Ye file **NEVER** commit nahi karna Git mein!

### 🔒 Security: Add to .gitignore

1. **Solution Explorer** → Project root → **`.gitignore`** file open karo

2. Check karo ye lines hain:

```gitignore
# appsettings files
appsettings.json
appsettings.*.json

# User-specific files
*.suo
*.user
*.userosscache
*.sln.docstates
```

Agar nahi hain to add kar do!

**Why?**
- `appsettings.json` mein SecretKey hai
- Git pe push ho gaya to public ho jayega
- Security compromise ho jayega

---

## 🔧 Part 4: Update Program.cs (Authentication Middleware) (45 min)

### 📝 Step 1: Open Program.cs

1. **Solution Explorer** → **Program.cs** file pe **double-click**

### ✏️ Step 2: Add Using Statements

File ke **top** pe, existing using statements ke **BAAD** ye add karo:

```csharp
using AdminPanelAPI.Data;
using AdminPanelAPI.Services;
using AdminPanelAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;  // ← Add this
using Microsoft.IdentityModel.Tokens;                 // ← Add this
using System.Text;                                     // ← Add this
```

---

### ✏️ Step 3: Add JWT Authentication Service

**Location:** `builder.Services.AddCors(...)` ke **BAAD**, `var app = builder.Build();` se **PEHLE**

```csharp
// CORS Configuration (existing)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

// JWT Authentication Configuration (ADD THIS)
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["SecretKey"];

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;  // Development ke liye
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
});

var app = builder.Build();
```

---

### ✏️ Step 4: Add Authentication Middleware

**Location:** `app.UseCors("AllowFrontend");` ke **BAAD**, `app.UseAuthorization();` se **PEHLE**

```csharp
app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

// Authentication Middleware (ADD THIS)
app.UseAuthentication();  // ← Must come before UseAuthorization

app.UseAuthorization();

app.MapControllers();
```

---

### 📄 Complete Updated Program.cs

Poora file reference ke liye:

```csharp
using AdminPanelAPI.Data;
using AdminPanelAPI.Services;
using AdminPanelAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Services
builder.Services.AddScoped<IUserService, UserService>();

// CORS Configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

// JWT Authentication Configuration
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["SecretKey"];

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;  // Development ke liye (production mein true karo)
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
        ClockSkew = TimeSpan.Zero  // Token expiry exact time pe
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthentication();  // Must be before UseAuthorization
app.UseAuthorization();

app.MapControllers();

app.Run();
```

---

### 📖 Code Explanation

#### 1. Read JWT Settings from Config

```csharp
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["SecretKey"];
```

**Explanation:**
- `GetSection("JwtSettings")` → appsettings.json se JWT configuration read karta hai
- `jwtSettings["SecretKey"]` → Secret key access karta hai

---

#### 2. AddAuthentication Configuration

```csharp
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
```

**Explanation:**
- `AddAuthentication()` → Authentication service register karta hai
- `DefaultAuthenticateScheme` → JWT Bearer use karenge authentication ke liye
- `DefaultChallengeScheme` → Authentication fail hone pe kya karna hai

---

#### 3. AddJwtBearer Configuration

```csharp
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        // ... validation rules
    };
});
```

**Options Explained:**

| Option | Value | Meaning |
|--------|-------|---------|
| `RequireHttpsMetadata` | `false` | Development mein HTTP allow (production mein `true`) |
| `SaveToken` | `true` | Token ko HttpContext mein save karo (later access ke liye) |

---

#### 4. Token Validation Parameters

```csharp
ValidateIssuerSigningKey = true,
IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
```

**Purpose:** Signature verification
- Token ki signature validate karo (tamper-proof check)
- Secret key use karke verify karo

---

```csharp
ValidateIssuer = true,
ValidIssuer = jwtSettings["Issuer"],
```

**Purpose:** Issuer validation
- Token kisne banaya check karo
- Humari API ne banaya to hi accept karo

---

```csharp
ValidateAudience = true,
ValidAudience = jwtSettings["Audience"],
```

**Purpose:** Audience validation
- Token kiske liye bana check karo
- Humari frontend ke liye to hi accept karo

---

```csharp
ValidateLifetime = true,
ClockSkew = TimeSpan.Zero
```

**Purpose:** Expiry validation
- `ValidateLifetime` → Token expired to nahi check karo
- `ClockSkew` → Time tolerance (0 = exact expiry)

**ClockSkew Explanation:**
```
Default ClockSkew = 5 minutes

Token Expiry: 10:00 AM
Actual Expiry with ClockSkew: 10:05 AM (5 min extra)

ClockSkew = TimeSpan.Zero:
Token Expiry: 10:00 AM
Actual Expiry: 10:00 AM exactly (strict)
```

---

#### 5. Middleware Order (CRITICAL!)

```csharp
app.UseAuthentication();  // ← MUST be before UseAuthorization
app.UseAuthorization();
```

**Why order matters:**

```
Correct Order (✅):
1. UseAuthentication() - "Who are you?" (extract user from token)
2. UseAuthorization()  - "What can you do?" (check permissions)

Wrong Order (❌):
1. UseAuthorization()  - "What can you do?" (no user info yet!)
2. UseAuthentication() - "Who are you?" (too late!)

Result: Authorization fails because user info nahi mila!
```

---

### 💾 Step 5: Save and Build

1. **Ctrl + S** press karke save karo

2. **Build Menu** → **Build Solution** (ya **Ctrl + Shift + B**)

3. **Output window** check karo:
   ```
   Build succeeded.
   0 Warning(s)
   0 Error(s)
   ```

**Errors agar aaye:**
- Using statements check karo
- NuGet packages installed hain? (Part 2 verify karo)
- Syntax errors correct karo

---

## 🛠️ Part 5: Create JwtService Class (60 min)

### 📁 Step 1: Create IJwtService Interface

1. **Solution Explorer** → **Services** folder → **Interfaces** folder pe **right-click**

2. **Add** → **Class** select karo

3. **Name:** `IJwtService.cs`

4. **Add** button click karo

### 💻 Step 2: Write IJwtService Interface

File khulne ke baad, ye code likho:

```csharp
using AdminPanelAPI.Models;

namespace AdminPanelAPI.Services.Interfaces
{
    public interface IJwtService
    {
        /// <summary>
        /// Generate JWT token for authenticated user
        /// </summary>
        /// <param name="user">User object with details</param>
        /// <returns>JWT token string</returns>
        string GenerateToken(User user);

        /// <summary>
        /// Validate and decode JWT token to get user ID
        /// </summary>
        /// <param name="token">JWT token string</param>
        /// <returns>User ID from token, or null if invalid</returns>
        int? ValidateToken(string token);
    }
}
```

**Save:** Ctrl + S

---

### 📁 Step 3: Create JwtService Class

1. **Solution Explorer** → **Services** folder pe **right-click**

2. **Add** → **Class** select karo

3. **Name:** `JwtService.cs`

4. **Add** button click karo

### 💻 Step 4: Write JwtService Implementation

File mein ye complete code likho:

```csharp
using AdminPanelAPI.Models;
using AdminPanelAPI.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AdminPanelAPI.Services
{
    public class JwtService : IJwtService
    {
        private readonly IConfiguration _configuration;

        public JwtService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        /// <summary>
        /// Generate JWT token for authenticated user
        /// </summary>
        public string GenerateToken(User user)
        {
            // 1. Read JWT settings from appsettings.json
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var secretKey = jwtSettings["SecretKey"];
            var issuer = jwtSettings["Issuer"];
            var audience = jwtSettings["Audience"];
            var expiryMinutes = int.Parse(jwtSettings["ExpiryMinutes"]);

            // 2. Create security key from secret
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            // 3. Create claims (user information)
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),  // User ID
                new Claim(JwtRegisteredClaimNames.Email, user.Email),        // Email
                new Claim(ClaimTypes.Name, user.Name),                       // Name
                new Claim(ClaimTypes.Role, user.Role),                       // Role
                new Claim("username", user.Username),                        // Custom claim
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),  // Token ID
                new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString())  // Issued at
            };

            // 4. Create token descriptor
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(expiryMinutes),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = credentials
            };

            // 5. Create token
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            // 6. Write token to string
            return tokenHandler.WriteToken(token);
        }

        /// <summary>
        /// Validate and decode JWT token to get user ID
        /// </summary>
        public int? ValidateToken(string token)
        {
            if (string.IsNullOrEmpty(token))
                return null;

            try
            {
                var jwtSettings = _configuration.GetSection("JwtSettings");
                var secretKey = jwtSettings["SecretKey"];

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(secretKey);

                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = jwtSettings["Issuer"],
                    ValidateAudience = true,
                    ValidAudience = jwtSettings["Audience"],
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = int.Parse(jwtToken.Claims.First(x => x.Type == JwtRegisteredClaimNames.Sub).Value);

                return userId;
            }
            catch
            {
                // Token validation failed
                return null;
            }
        }
    }
}
```

**Save:** Ctrl + S

---

### 📖 Code Explanation (Step-by-Step)

#### Constructor:

```csharp
private readonly IConfiguration _configuration;

public JwtService(IConfiguration configuration)
{
    _configuration = configuration;
}
```

**Purpose:**
- `IConfiguration` inject kar rahe hain (Dependency Injection)
- `appsettings.json` ka data read karne ke liye

---

#### Method 1: GenerateToken

**Step 1: Read Configuration**

```csharp
var jwtSettings = _configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["SecretKey"];
var issuer = jwtSettings["Issuer"];
var audience = jwtSettings["Audience"];
var expiryMinutes = int.Parse(jwtSettings["ExpiryMinutes"]);
```

**Purpose:** appsettings.json se sab settings read kar rahe hain

---

**Step 2: Create Security Key**

```csharp
var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
```

**Purpose:**
- Secret key ko bytes mein convert kar rahe hain
- Signing credentials banate hain (signature ke liye)
- HMAC-SHA256 algorithm use kar rahe hain

---

**Step 3: Create Claims (User Info)**

```csharp
var claims = new[]
{
    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
    new Claim(JwtRegisteredClaimNames.Email, user.Email),
    new Claim(ClaimTypes.Name, user.Name),
    new Claim(ClaimTypes.Role, user.Role),
    new Claim("username", user.Username),
    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
    new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString())
};
```

**Claims Explained:**

| Claim | Purpose | Value |
|-------|---------|-------|
| `Sub` (Subject) | User ID | `"1"`, `"2"`, etc. |
| `Email` | User email | `"admin@example.com"` |
| `Name` | User name | `"Admin User"` |
| `Role` | User role | `"admin"`, `"user"` |
| `username` | Username (custom) | `"admin"` |
| `Jti` (JWT ID) | Unique token ID | Random GUID |
| `Iat` (Issued At) | Creation timestamp | Unix timestamp |

**Why these claims?**
- Backend pe user info available rahega
- Authorization decisions easily le sakte hain
- Token ko uniquely identify kar sakte hain (Jti)

---

**Step 4: Create Token Descriptor**

```csharp
var tokenDescriptor = new SecurityTokenDescriptor
{
    Subject = new ClaimsIdentity(claims),
    Expires = DateTime.UtcNow.AddMinutes(expiryMinutes),
    Issuer = issuer,
    Audience = audience,
    SigningCredentials = credentials
};
```

**Purpose:** Token ke sab properties define kar rahe hain

---

**Step 5: Create Token**

```csharp
var tokenHandler = new JwtSecurityTokenHandler();
var token = tokenHandler.CreateToken(tokenDescriptor);
```

**Purpose:** Actual token object create ho raha hai

---

**Step 6: Convert to String**

```csharp
return tokenHandler.WriteToken(token);
```

**Purpose:** Token ko string format mein convert kar ke return kar rahe hain

**Output Example:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsIm5hbWUiOiJBZG1pbiBVc2VyIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjE3MDAwMDM2MDB9.signature_here
```

---

#### Method 2: ValidateToken (Bonus method for future use)

```csharp
public int? ValidateToken(string token)
{
    // Token validate karke user ID return karta hai
    // Invalid token pe null return karta hai
}
```

**Purpose:** Manually token validate karne ke liye (advanced use case)

---

### 📝 Step 5: Register Service in Program.cs

1. **Program.cs** file open karo

2. **Services** section mein, `AddScoped<IUserService>` ke **BAAD** ye add karo:

```csharp
// Services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IJwtService, JwtService>();  // ← Add this
```

**Complete Services Section:**
```csharp
// Services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IJwtService, JwtService>();
```

3. **Save:** Ctrl + S

4. **Build:** Ctrl + Shift + B

**Check:** Build successful hona chahiye! ✅

---

## 🧪 Part 6: Create Test Endpoint (30 min)

Ab JWT service test karne ke liye ek temporary endpoint banate hain.

### 📁 Step 1: Create AuthController

1. **Solution Explorer** → **Controllers** folder pe **right-click**

2. **Add** → **Controller** select karo

3. **API Controller - Empty** template select karo

4. **Add** button click karo

5. **Name:** `AuthController.cs`

6. **Add** button click karo

### 💻 Step 2: Write Test Endpoint

File mein ye code likho:

```csharp
using AdminPanelAPI.Models;
using AdminPanelAPI.Responses;
using AdminPanelAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AdminPanelAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IJwtService _jwtService;
        private readonly IUserService _userService;

        public AuthController(IJwtService jwtService, IUserService userService)
        {
            _jwtService = jwtService;
            _userService = userService;
        }

        /// <summary>
        /// Test endpoint - Generate JWT token for a user (temporary for testing)
        /// </summary>
        [HttpGet("test-token/{userId}")]
        public async Task<IActionResult> TestGenerateToken(int userId)
        {
            try
            {
                // Get user from database
                var response = await _userService.GetUserByIdAsync(userId);

                if (!response.Success)
                {
                    return NotFound(ApiResponse<object>.ErrorResponse("User not found"));
                }

                var user = response.Data;

                // Generate JWT token
                var token = _jwtService.GenerateToken(user);

                // Return token
                return Ok(new
                {
                    success = true,
                    message = "Token generated successfully",
                    token = token,
                    user = new
                    {
                        id = user.Id,
                        name = user.Name,
                        email = user.Email,
                        role = user.Role
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<object>.ErrorResponse($"Error: {ex.Message}"));
            }
        }

        /// <summary>
        /// Test endpoint - Validate JWT token (temporary for testing)
        /// </summary>
        [HttpPost("test-validate")]
        public IActionResult TestValidateToken([FromBody] string token)
        {
            try
            {
                var userId = _jwtService.ValidateToken(token);

                if (userId == null)
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Invalid or expired token"
                    });
                }

                return Ok(new
                {
                    success = true,
                    message = "Token is valid",
                    userId = userId
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = $"Error: {ex.Message}"
                });
            }
        }
    }
}
```

**Save:** Ctrl + S

---

### 📖 Code Explanation

#### Constructor:

```csharp
public AuthController(IJwtService jwtService, IUserService userService)
{
    _jwtService = jwtService;
    _userService = userService;
}
```

**Purpose:**
- `IJwtService` inject kar rahe hain (token generation)
- `IUserService` inject kar rahe hain (user data)

---

#### TestGenerateToken Endpoint:

```csharp
[HttpGet("test-token/{userId}")]
public async Task<IActionResult> TestGenerateToken(int userId)
```

**Route:** `GET /api/Auth/test-token/1`

**Steps:**
1. User ID se user fetch karta hai database se
2. User mil gaya to JWT token generate karta hai
3. Token aur user info return karta hai

**Example Response:**
```json
{
  "success": true,
  "message": "Token generated successfully",
  "token": "eyJhbGciOiJI...",
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

---

## 🚀 Part 7: Testing with Postman (45 min)

### ▶️ Step 1: Run Backend

1. **Visual Studio** mein **Green Play button (▶)** click karo

2. **Browser** mein Swagger open hoga: `https://localhost:7001/swagger`

**Check:** Backend running hai ✅

---

### 📮 Step 2: Test Token Generation

#### Open Postman

1. **Postman** app open karo

2. **New Request** create karo

#### Configure Request

**Method:** GET

**URL:** 
```
https://localhost:7001/api/Auth/test-token/1
```

**Explanation:**
- `/test-token/1` → User ID 1 (Admin User) ka token generate karega

#### Send Request

**Send** button click karo

#### Expected Response:

```json
{
  "success": true,
  "message": "Token generated successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJBZG1pbiBVc2VyIiwiY2xhaW1zL3JvbGUiOiJhZG1pbiIsInVzZXJuYW1lIjoiYWRtaW4iLCJqdGkiOiI3ZDI4YzEyMy00NTY3LTg5MGEtYmNkZS1mMTIzNDU2Nzg5MGEiLCJpYXQiOiIxNzAwMDAwMDAwIiwiZXhwIjoxNzAwMDAzNjAwLCJpc3MiOiJBZG1pblBhbmVsQVBJIiwiYXVkIjoiQWRtaW5QYW5lbEZyb250ZW5kIn0.g7YxJz9fHkL8QmPvN3R5wS2tD9kXmB1yC6uE4vI0pA8",
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

**Status:** 200 OK ✅

---

### 🔍 Step 3: Decode Token (JWT.io)

1. **Copy token** from response (long string starting with `eye...`)

2. **Browser** mein https://jwt.io kholo

3. **Encoded section** mein token paste karo

4. **Decoded section** automatically populate hoga:

**HEADER:**
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**PAYLOAD:**
```json
{
  "sub": "1",
  "email": "admin@example.com",
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": "Admin User",
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "admin",
  "username": "admin",
  "jti": "7d28c123-4567-890a-bcde-f123456789",
  "iat": "1700000000",
  "exp": 1700003600,
  "iss": "AdminPanelAPI",
  "aud": "AdminPanelFrontend"
}
```

**VERIFY SIGNATURE:**
```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  your-256-bit-secret
) secret base64 encoded
```

**Observations:**
- ✅ User ID (sub) = 1
- ✅ Email = admin@example.com
- ✅ Role = admin
- ✅ Issuer = AdminPanelAPI
- ✅ Audience = AdminPanelFrontend
- ✅ Expiry set hai (exp)

**Secret Key Input:**

Bottom left, **"Verify Signature"** section mein secret paste karo:
```
MyVeryStrongSecretKeyForJWT_2024_AdminPanel_AlphaNumeric!@#
```

**Result:** Blue badge "Signature Verified" dikkhega ✅

---

### 🎯 Step 4: Test with Different Users

#### Test with different user IDs:

**Request 1: User ID 2**
```
GET https://localhost:7001/api/Auth/test-token/2
```

**Expected:** Different token with User ID 2 data

**Request 2: Invalid User ID**
```
GET https://localhost:7001/api/Auth/test-token/999
```

**Expected Response:**
```json
{
  "success": false,
  "message": "User not found",
  "data": null,
  "errors": null
}
```

**Status:** 404 Not Found ✅

---

### ✅ Step 5: Verify Token Expiry

1. **Postman** mein token generate karo

2. **appsettings.json** mein `ExpiryMinutes` ko `1` set karo (1 minute)

3. **Backend restart** karo

4. **New token generate** karo

5. **1 minute wait** karo

6. **Same token** use karke koi protected endpoint call karo

**Expected:** 401 Unauthorized (token expired) ✅

**Reset:** `ExpiryMinutes` back to `60`

---

## ✅ Summary & Checklist

### Aaj Kya Kiya? 🎯

1. **JWT Packages Installed** ✅
   - Microsoft.AspNetCore.Authentication.JwtBearer
   - System.IdentityModel.Tokens.Jwt

2. **Configuration Done** ✅
   - appsettings.json → JwtSettings section
   - SecretKey, Issuer, Audience, ExpiryMinutes

3. **Program.cs Updated** ✅
   - Authentication service registered
   - JWT Bearer configured
   - Middleware added (UseAuthentication)

4. **JwtService Created** ✅
   - IJwtService interface
   - JwtService implementation
   - GenerateToken method
   - ValidateToken method

5. **Testing** ✅
   - AuthController with test endpoints
   - Postman testing successful
   - JWT.io verification done

---

### Project Status 📊

```
AdminPanelAPI/
├── Controllers/
│   ├── UsersController.cs
│   └── AuthController.cs          ← NEW (Test endpoint)
├── Services/
│   ├── Interfaces/
│   │   ├── IUserService.cs
│   │   └── IJwtService.cs         ← NEW
│   ├── UserService.cs
│   └── JwtService.cs              ← NEW (Token generation)
├── appsettings.json               ← UPDATED (JWT settings)
└── Program.cs                     ← UPDATED (JWT middleware)
```

---

## 🎓 Key Concepts Learned

### 1. JWT Packages

**JwtBearer Package:**
- Middleware for automatic token validation
- [Authorize] attribute support
- Request pipeline integration

**JWT Tokens Package:**
- Token creation (JwtSecurityToken)
- Token writing (JwtSecurityTokenHandler)
- Claims management

### 2. Security Configuration

**Secret Key:**
- Must be strong (32+ characters)
- Stored in appsettings.json
- Never commit to Git

**Token Parameters:**
- Issuer: Who created token
- Audience: Who can use token
- Expiry: Token validity period

### 3. Claims

**Standard Claims:**
- sub (Subject): User ID
- email: User email
- iat (Issued At): Creation time
- exp (Expiration): Expiry time

**Custom Claims:**
- role: User role (admin/user)
- username: Username
- Any custom data

### 4. Middleware Order

**Critical Sequence:**
```
UseAuthentication() → Must come first
UseAuthorization()  → Then authorization
```

---

## 🚀 Tomorrow's Preview: Day 3

**Topics:**
- Password hashing with BCrypt
- Register endpoint (sign up)
- Login endpoint (sign in)
- Complete authentication flow

**What You'll Build:**
- `/api/Auth/register` - User registration
- `/api/Auth/login` - User login with token
- Password security implementation

---

## 💻 Practice Tasks

### ⭐ Task 1: Generate Tokens for All Users (Easy)

**Goal:** All existing users ke liye tokens generate karo

**Steps:**
1. Database mein kitne users hain check karo
2. Har user ke liye Postman se token generate karo
3. Sab tokens JWT.io pe decode karo
4. Claims compare karo

---

### ⭐⭐ Task 2: Custom Claims (Medium)

**Goal:** Token mein custom claim add karo

**Steps:**
1. JwtService.cs mein GenerateToken method kholo
2. Claims array mein new claim add karo:
```csharp
new Claim("companyId", "42"),
new Claim("department", "IT")
```
3. Token generate karo
4. JWT.io pe decode karke verify karo

---

### ⭐⭐⭐ Task 3: Short Expiry Test (Hard)

**Goal:** Token expiry test karo different timings se

**Steps:**
1. appsettings.json mein `ExpiryMinutes: 1` set karo
2. Token generate karo, note time
3. 30 seconds wait → token still valid?
4. 1 minute wait → token expired?
5. Documentation banao with screenshots

---

## 🎉 Congratulations!

**Day 2 Complete!** 🎊

Aaj aapne JWT ka **complete backend infrastructure** setup kar liya!

**What You Achieved:**
- ✅ JWT packages installed
- ✅ Configuration complete
- ✅ Token generation working
- ✅ Testing successful

**Tomorrow:** Password hashing aur complete login/register endpoints! 🔐

**You're doing great! Keep going!** 💪

---

