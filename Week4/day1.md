# 📅 Week 4 - Day 1: Visual Studio Setup & First ASP.NET Core Web API Project

## 🎯 Today's Goal
**Aaj hum backend development start karenge! Visual Studio install karke apna pehla ASP.NET Core Web API project create karenge! 🚀**

**Today's Focus:**
- ✅ .NET aur ASP.NET Core samajhna
- ✅ Visual Studio Community installation
- ✅ Web API project creation (GUI-based)
- ✅ Project structure understanding
- ✅ First API endpoint
- ✅ Swagger testing
- ✅ Backend ready for CRM project

---

## 📚 Session Breakdown (4-5 Hours)

| Time | Topic | Duration |
|------|-------|----------|
| **Hour 1** | .NET Concepts & Visual Studio Installation | 60 min |
| **Hour 2** | Creating Web API Project (GUI) | 60 min |
| **Hour 3** | Understanding Project Structure | 60 min |
| **Hour 4** | First Controller & API Testing | 60 min |
| **Hour 5** | CRM Project Setup & Practice | 60 min |

---

## 🎓 Part 1: Understanding Backend Technologies (30 minutes)

### 📖 What is .NET?

**Simple Urdu/English:**
.NET ek **platform** hai jo Microsoft ne banaya hai. Yeh aapko **backend applications** banane mein madad karta hai - jaise websites, APIs, desktop apps, mobile backends.

**Real-Life Example:**
```
Sochein aap ek restaurant chain ho:

Frontend (React) = Restaurant ka dining area
- Customers yahan baithte hain
- Menu dekhte hain
- Orders place karte hain
- Visual interface

Backend (.NET) = Kitchen + Management
- Orders process hote hain
- Food prepare hota hai
- Inventory manage hoti hai
- Database se data aata/jaata hai

API = Waiter
- Frontend aur Backend ko connect karta hai
- Orders le jaata hai
- Food laata hai
```

---

### 🤔 What is ASP.NET Core?

**Simple Explanation:**
ASP.NET Core ek **framework** hai jo **.NET platform** ke andar aata hai. Yeh specifically **web applications** aur **APIs** banane ke liye use hota hai.

**Key Points:**
```
✅ Cross-platform (Windows, Mac, Linux)
✅ Fast aur lightweight
✅ Modern architecture
✅ REST API banane ke liye best
✅ Built-in security features
✅ Easy to test
```

---

### 🏗️ What is Web API?

**Simple Urdu/English:**
Web API ek tarah ki **middleman service** hai jo aapke frontend (React) ko backend (database) se connect karti hai.

**How it Works:**
```
React App → HTTP Request → Web API → Database
                                ↓
React App ← HTTP Response ← Web API ← Database

Example:
1. React says: "Mujhe users ki list chahiye"
2. API says: "Wait, main database se fetch karta hun"
3. Database returns: Users data
4. API returns: JSON format mein users
5. React shows: Beautiful table with users
```

---

### 📊 Frontend vs Backend

**Your Complete Stack:**

```
┌─────────────────────────────────────┐
│         FRONTEND (Week 1-3)          │
│              React + MUI             │
│    - User Interface                  │
│    - Forms, Tables, Buttons          │
│    - User interactions               │
│    - Runs in Browser                 │
└──────────────┬──────────────────────┘
               │
               │ HTTP Requests (Axios)
               │ (GET, POST, PUT, DELETE)
               ↓
┌─────────────────────────────────────┐
│         BACKEND (Week 4-6)           │
│      ASP.NET Core Web API            │
│    - Business Logic                  │
│    - Data Processing                 │
│    - Authentication                  │
│    - Runs on Server                  │
└──────────────┬──────────────────────┘
               │
               │ Entity Framework Core
               │
               ↓
┌─────────────────────────────────────┐
│           DATABASE                   │
│          SQL Server                  │
│    - Store Data                      │
│    - Tables, Relationships           │
│    - Queries                         │
└─────────────────────────────────────┘
```

---

## 💻 Part 2: Visual Studio Installation (60 minutes)

### 📖 What is Visual Studio?

**Simple Urdu/English:**
Visual Studio ek **IDE (Integrated Development Environment)** hai - yani ek complete software jahan aap apna code likhte ho, test karte ho, aur run karte ho.

**VS Code vs Visual Studio:**
```
❌ VS Code (DON'T USE for .NET backend):
- Lightweight editor
- Manual setup required
- Extensions needed
- Better for frontend

✅ Visual Studio (USE THIS for .NET):
- Complete IDE
- Everything built-in
- GUI-based tools
- Perfect for .NET backend
- NuGet package manager
- Database tools
- Debugging tools
```

---

### Step 1: Download Visual Studio 2022 Community

**Visual Studio Community = FREE version (Full features for learning)**

**Download Steps:**

1. **Open Browser**
   - Go to: `https://visualstudio.microsoft.com/downloads/`

2. **Visual Studio 2022 Community**
   - Click on **"Free download"** button under **"Community"**
   - File name: `VisualStudioSetup.exe` (around 3-5 MB)
   - This is just installer, actual installation happens in next step

3. **Wait for Download**
   - Download complete hone do (fast download, small file)

---

### Step 2: Install Visual Studio

**Installation Process (45 minutes):**

1. **Run VisualStudioSetup.exe**
   - Downloaded file pe double-click karo
   - "Yes" click karo (Administrator permission)
   - Installer launch hoga

2. **Visual Studio Installer Opens**
   - Workload selection screen aayega
   - Yeh step BOHOT IMPORTANT hai

---

### Step 3: Select Workloads (IMPORTANT!)

**Workload = Set of tools for specific type of development**

**Must Select These:**

#### ✅ Workload 1: ASP.NET and web development
```
Location: Top left area
Description: ASP.NET Core, Web API tools
Size: ~5 GB
Required: YES
```

**How to Select:**
- Left panel mein "**ASP.NET and web development**" checkbox tick karo
- Right side mein details dikhenge

**Included Tools:**
- ✅ .NET Core SDK
- ✅ Web API templates
- ✅ IIS Express (local server)
- ✅ Debugging tools

---

#### ✅ Workload 2: Data storage and processing
```
Location: Middle area
Description: SQL Server, database tools
Size: ~2 GB
Required: YES
```

**How to Select:**
- "**Data storage and processing**" checkbox tick karo

**Included Tools:**
- ✅ SQL Server LocalDB
- ✅ SQL Server Object Explorer
- ✅ Database project tools

---

### Step 4: Installation Options (Right Side Panel)

**After selecting workloads, right side mein options milenge:**

**Individual Components Tab:**

**Must Check:**
- ✅ .NET 8.0 Runtime (latest)
- ✅ .NET SDK
- ✅ Entity Framework 8 tools
- ✅ NuGet package manager

**Installation Locations Tab:**
- Default paths theek hain
- Change mat karo unless disk space issue

---

### Step 5: Start Installation

1. **Click "Install" button** (Bottom right)
2. **Download + Installation start hoga**
   - Total size: ~10-15 GB
   - Time: 30-60 minutes (internet speed pe depend karta hai)
3. **Progress bar dikhega**
   - Workloads download ho rahe hain
   - Components install ho rahe hain

**During Installation:**
- Computer ko restart mat karna
- Installer ko close mat karna
- Laptop charge mein lagaye rakho

---

### Step 6: First Launch

**After Installation Complete:**

1. **Sign in (Optional but recommended)**
   - Microsoft account se sign in karo
   - FREE license activate hoga
   - Or "Skip for now" click karo

2. **Choose Development Settings**
   - Select: **"Visual C#"**
   - Color theme: **Blue** or **Dark** (your choice)
   - Click "Start Visual Studio"

3. **Welcome Screen**
   - Visual Studio open hoga
   - Congratulations! Installation complete! 🎉

---

### Step 7: Verify Installation

**Check .NET SDK Version:**

1. **Open Visual Studio**
2. Click on **"Create a new project"**
3. Template list mein yeh dikhna chahiye:
   - ✅ ASP.NET Core Web API
   - ✅ ASP.NET Core Web App
   - ✅ Console App

**Alternative: Command Line Verification**
```bash
# Open Windows Command Prompt or PowerShell
dotnet --version

# Output should show:
8.0.xxx (or latest version)
```

---

## 🚀 Part 3: Create Your First Web API Project (60 minutes)

### Step 1: Create New Project (GUI Method)

**Visual Studio Open karo:**

1. **Start Window**
   - "**Create a new project**" button click karo
   - Ya **File → New → Project** (Top menu)

2. **Project Template Selection**
   - Templates list open hogi
   - Search box mein type karo: **"web api"**

---

### Step 2: Select ASP.NET Core Web API Template

**Template Selection:**

**Look for:**
```
Template Name: ASP.NET Core Web API
Language: C#
Platform: Linux, macOS, Windows
Project Type: Web, Cloud, Service
```

**Screenshot Description:**
```
[ ] ASP.NET Core Web App (MVC)
[ ] ASP.NET Core Web App (Razor)
[✓] ASP.NET Core Web API  ← SELECT THIS
    [C#] [Linux, macOS, Windows]
```

**Click "Next" button** (Bottom right)

---

### Step 3: Configure Your Project

**Project Configuration Screen:**

**Fill these details:**

1. **Project name:**
   ```
   AdminPanelAPI
   ```
   (Or any name - descriptive naam rakho)

2. **Location:**
   ```
   F:\.NET_Short\
   ```
   (Same folder jahan React project hai)

3. **Solution name:**
   ```
   AdminPanelAPI
   ```
   (By default same as project name - keep it)

4. **Place solution and project in the same directory:**
   - ☐ **UNCHECKED rakho** (default)
   - Separate folders clean structure maintain karti hain

**Click "Next" button**

---

### Step 4: Additional Information

**Framework & Options:**

**1. Framework:**
```
Select: .NET 8.0 (Long Term Support)
```
(Latest stable version)

**2. Authentication type:**
```
Select: None
```
(We'll add JWT auth manually later - better learning)

**3. Configure for HTTPS:**
```
✅ CHECKED (Default - keep it)
```
(Secure connection)

**4. Enable Docker:**
```
☐ UNCHECKED
```
(Not needed for learning)

**5. Use controllers:**
```
✅ CHECKED (Important!)
```
(We need traditional controllers with routes)

**6. Enable OpenAPI support:**
```
✅ CHECKED (Default - keep it)
```
(This gives us Swagger documentation)

**7. Do not use top-level statements:**
```
☐ UNCHECKED (Default)
```
(Modern C# style)

**8. Enable API versioning:**
```
☐ UNCHECKED
```
(Not needed initially)

**Click "Create" button**

---

### Step 5: Project Creation

**Visual Studio will:**
1. Create project structure
2. Install NuGet packages
3. Generate template files
4. Open Solution Explorer

**Wait for:**
- "Ready" text at bottom left
- No loading spinners

**Time: 10-30 seconds**

---

## 📁 Part 4: Understanding Project Structure (60 minutes)

### Visual Studio Interface Overview

**After project creation, you'll see:**

**1. Solution Explorer (Right side)**
```
Shows your project files and folders
Tree structure view
```

**2. Code Editor (Center)**
```
Where you write code
Multiple tabs
```

**3. Output Window (Bottom)**
```
Logs, errors, build messages
```

**4. Menu Bar (Top)**
```
File, Edit, View, Project, Build, Debug, Tools
```

---

### Project Folder Structure

**Solution Explorer mein yeh dikhega:**

```
AdminPanelAPI/                          ← Solution folder
├── Dependencies/                       ← NuGet packages & references
│   ├── Analyzers
│   ├── Frameworks
│   └── Packages
├── Properties/
│   └── launchSettings.json            ← Port numbers, environment settings
├── Controllers/                        ← API Controllers (IMPORTANT!)
│   └── WeatherForecastController.cs   ← Sample controller
├── appsettings.json                   ← Configuration (DB connection, etc.)
├── appsettings.Development.json       ← Dev environment settings
├── Program.cs                         ← Application entry point (MAIN FILE)
└── WeatherForecast.cs                 ← Sample model class
```

---

### Important Files Explained

#### 1. Program.cs (Main Entry Point)

**Location:** Root folder

**What is it?**
- Application ka main file
- Jahan app start hota hai
- Configuration yahan hoti hai
- Middleware yahan add hote hain

**Default Code:**
```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
```

**Simple Explanation:**
```csharp
// Step 1: Builder create karo
var builder = WebApplication.CreateBuilder(args);

// Step 2: Services add karo (controllers, Swagger, etc.)
builder.Services.AddControllers();  // Controllers enable
builder.Services.AddSwaggerGen();   // Swagger enable

// Step 3: App build karo
var app = builder.Build();

// Step 4: Middleware configure karo
app.UseSwagger();        // Swagger UI enable
app.UseHttpsRedirection(); // HTTP to HTTPS redirect
app.UseAuthorization();    // Auth middleware

// Step 5: Controller routes map karo
app.MapControllers();

// Step 6: App run karo
app.Run();
```

---

#### 2. appsettings.json (Configuration File)

**Location:** Root folder

**What is it?**
- Configuration settings store hoti hain
- Database connection strings
- API keys
- Environment variables

**Default Content:**
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

**Later we'll add:**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=...;Database=...;"
  },
  "Jwt": {
    "SecretKey": "your-secret-key",
    "Issuer": "your-app",
    "Audience": "your-app"
  },
  "Logging": {
    ...
  }
}
```

---

#### 3. Controllers Folder

**What is Controller?**
- API endpoints define hote hain yahan
- HTTP requests handle hoti hain (GET, POST, PUT, DELETE)
- Routes define hote hain

**WeatherForecastController.cs (Sample):**
```csharp
using Microsoft.AspNetCore.Mvc;

namespace AdminPanelAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
```

**Simple Breakdown:**
```csharp
[ApiController]                    // Yeh ek API controller hai
[Route("[controller]")]           // URL: /WeatherForecast

public class WeatherForecastController : ControllerBase
{
    [HttpGet]                      // HTTP GET request
    public IEnumerable<WeatherForecast> Get()
    {
        // Return list of weather data
    }
}
```

---

#### 4. launchSettings.json

**Location:** Properties folder

**What is it?**
- App kaise launch ho (debug settings)
- Port numbers
- Environment (Development/Production)
- SSL settings

**Important Settings:**
```json
{
  "profiles": {
    "https": {
      "commandName": "Project",
      "launchBrowser": true,
      "launchUrl": "swagger",
      "applicationUrl": "https://localhost:7001;http://localhost:5001",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```

**Key Points:**
- App run hogi: `https://localhost:7001`
- Swagger open hoga: `https://localhost:7001/swagger`
- Environment: Development

---

## ▶️ Part 5: Run Your First API (30 minutes)

### Step 1: Build the Project

**Before running, build karo to check for errors:**

**Method 1: Menu Bar**
1. Click **"Build"** menu (Top)
2. Click **"Build Solution"** (or **Rebuild Solution**)

**Method 2: Keyboard Shortcut**
```
Ctrl + Shift + B
```

**Output Window:**
```
Build started...
1>------ Build started: Project: AdminPanelAPI
1>  AdminPanelAPI -> F:\.NET_Short\AdminPanelAPI\bin\Debug\net8.0\AdminPanelAPI.dll
========== Build: 1 succeeded, 0 failed, 0 up-to-date, 0 skipped ==========
```

**Success! ✅**

---

### Step 2: Run the Application

**Method 1: Green Play Button (Recommended)**
1. Top center mein **green play button** dikhega
2. Button pe **"https"** likha hoga
3. Click on **green play button (▶)**

**Method 2: Menu Bar**
1. Click **"Debug"** menu
2. Click **"Start Debugging"** (F5)

**Method 3: Keyboard Shortcut**
```
Press F5
```

---

### Step 3: Application Starts

**What Happens:**
1. Application build hoti hai
2. IIS Express server start hota hai
3. Browser automatically open hota hai
4. Swagger UI page load hota hai

**Console Window:**
- Black console window bhi open hoga (backend logs)
- **Close mat karo** - yeh backend server hai
- Logs yahan dikhte hain

**Browser Opens:**
```
URL: https://localhost:7001/swagger/index.html
```

---

### Step 4: Swagger UI Interface

**Swagger = API Testing Tool (Built-in)**

**You'll See:**

```
┌─────────────────────────────────────────────┐
│  AdminPanelAPI v1                           │
├─────────────────────────────────────────────┤
│                                             │
│  WeatherForecast                            │
│  ▼ GET /WeatherForecast                    │
│     Get weather forecast                    │
│                                             │
└─────────────────────────────────────────────┘
```

**This is your first API endpoint! 🎉**

---

### Step 5: Test the API Endpoint

**Test GET Request:**

1. **Expand the endpoint**
   - Click on **"GET /WeatherForecast"** bar
   - Details expand honge

2. **Try it out button**
   - Click **"Try it out"** button (Right side)
   - Button active ho jayega

3. **Execute button**
   - Click **"Execute"** button
   - API call hoga

4. **Response**
   - Neeche response dikhega:

**Response Body:**
```json
[
  {
    "date": "2026-02-12",
    "temperatureC": 32,
    "temperatureF": 89,
    "summary": "Warm"
  },
  {
    "date": "2026-02-13",
    "temperatureC": -15,
    "temperatureF": 6,
    "summary": "Freezing"
  },
  ...
]
```

**Response Code:**
```
200 OK
```

**Congratulations! Your first API is working! 🎉**

---

### Step 6: Understanding What Just Happened

**Request Flow:**

```
1. Browser (Swagger UI)
   ↓
2. HTTP GET Request
   URL: https://localhost:7001/WeatherForecast
   ↓
3. ASP.NET Core Routing
   Finds: WeatherForecastController
   ↓
4. Controller Method
   Get() method executes
   ↓
5. Return Data
   JSON array of weather objects
   ↓
6. Browser Response
   Display JSON data
```

**In Simple Terms:**
```
You clicked button → 
API received request → 
Controller ran code → 
Sent back data → 
You saw the result
```

---

### Step 7: Stop the Application

**How to Stop:**

**Method 1: Visual Studio**
- Click **red square (■) button** at top
- Or press **Shift + F5**

**Method 2: Console Window**
- Close the black console window
- Application will stop

**You'll know it stopped when:**
- Browser connection fails
- Console window closes
- Visual Studio shows "Ready" (not "Running")

---

## 🎯 Part 6: Create Your First Custom Controller (60 minutes)

### Task: Create Users Controller

**Let's create a Users controller for our CRM project!**

---

### Step 1: Add New Controller

**Method 1: Right-Click Method (Recommended)**

1. **Solution Explorer** mein **"Controllers"** folder pe **right-click** karo
2. **Add** → **Controller...** select karo
3. **"Add New Scaffolded Item"** window khulega

---

### Step 2: Select Controller Template

**Scaffold Options:**

**Select:**
```
API Controller - Empty
```

**Description:** Creates an empty API controller

**Click "Add" button**

---

### Step 3: Name Your Controller

**Controller Name:**
```
UsersController
```

**Important:**
- Name must end with **"Controller"**
- Singular ya Plural dono theek (but be consistent)
- C# naming: PascalCase (first letter capital)

**Click "Add"**

---

### Step 4: New Controller Created

**Visual Studio creates:**
```
Controllers/UsersController.cs
```

**Default Template Code:**
```csharp
using Microsoft.AspNetCore.Mvc;

namespace AdminPanelAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
    }
}
```

---

### Step 5: Add GET Endpoint

**Replace the empty controller with this:**

```csharp
using Microsoft.AspNetCore.Mvc;

namespace AdminPanelAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // ==========================================
        // GET: api/Users
        // Get all users
        // ==========================================
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            // For now, return dummy data
            var users = new[]
            {
                new { Id = 1, Name = "Ahmad Ali", Email = "ahmad@example.com", Role = "Admin" },
                new { Id = 2, Name = "Fatima Khan", Email = "fatima@example.com", Role = "User" },
                new { Id = 3, Name = "Hassan Sheikh", Email = "hassan@example.com", Role = "Manager" }
            };

            return Ok(users);
        }

        // ==========================================
        // GET: api/Users/5
        // Get user by ID
        // ==========================================
        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            // For now, return single dummy user
            var user = new
            {
                Id = id,
                Name = "Ahmad Ali",
                Email = "ahmad@example.com",
                Role = "Admin",
                CreatedDate = DateTime.Now
            };

            return Ok(user);
        }

        // ==========================================
        // POST: api/Users
        // Create new user
        // ==========================================
        [HttpPost]
        public IActionResult CreateUser([FromBody] object userData)
        {
            // For now, just return success message
            return Ok(new
            {
                Success = true,
                Message = "User created successfully",
                Data = userData
            });
        }

        // ==========================================
        // PUT: api/Users/5
        // Update user
        // ==========================================
        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, [FromBody] object userData)
        {
            return Ok(new
            {
                Success = true,
                Message = $"User {id} updated successfully",
                Data = userData
            });
        }

        // ==========================================
        // DELETE: api/Users/5
        // Delete user
        // ==========================================
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            return Ok(new
            {
                Success = true,
                Message = $"User {id} deleted successfully"
            });
        }
    }
}
```

---

### 📖 Understanding the Controller Code

#### 1. Route Attribute
```csharp
[Route("api/[controller]")]
```
**Meaning:**
- `api` = Base path
- `[controller]` = Controller name without "Controller" word
- Result: `/api/Users`

#### 2. ApiController Attribute
```csharp
[ApiController]
```
**Benefits:**
- Automatic model validation
- Automatic 400 BadRequest response
- Binding source inference
- Better error responses

#### 3. HttpGet Attribute
```csharp
[HttpGet]
public IActionResult GetAllUsers()
```
**Meaning:**
- This method handles **HTTP GET** requests
- URL: `GET /api/Users`
- No parameters needed

#### 4. HttpGet with ID
```csharp
[HttpGet("{id}")]
public IActionResult GetUserById(int id)
```
**Meaning:**
- URL: `GET /api/Users/5`
- `{id}` is route parameter
- `int id` receives the value

#### 5. HttpPost
```csharp
[HttpPost]
public IActionResult CreateUser([FromBody] object userData)
```
**Meaning:**
- Handles **HTTP POST** requests
- `[FromBody]` = Data comes from request body (JSON)
- Used to create new records

#### 6. IActionResult Return Type
```csharp
public IActionResult GetAllUsers()
{
    return Ok(data);  // Returns 200 OK with data
}
```

**Other Returns:**
```csharp
return Ok(data);              // 200 OK
return BadRequest(message);   // 400 Bad Request
return NotFound();            // 404 Not Found
return Created(uri, data);    // 201 Created
return NoContent();           // 204 No Content
```

---

### Step 6: Save and Build

**Save File:**
- **Ctrl + S** or **File → Save**

**Build Project:**
- **Ctrl + Shift + B**

**Check Output:**
```
Build succeeded!
```

---

### Step 7: Run and Test New Endpoint

**Run Application:**
- Press **F5**
- Browser opens Swagger

**Swagger UI Now Shows:**
```
┌─────────────────────────────────────────────┐
│  Users                                      │
│  ▼ GET    /api/Users                       │
│  ▼ GET    /api/Users/{id}                  │
│  ▼ POST   /api/Users                       │
│  ▼ PUT    /api/Users/{id}                  │
│  ▼ DELETE /api/Users/{id}                  │
│                                             │
│  WeatherForecast                            │
│  ▼ GET    /WeatherForecast                 │
└─────────────────────────────────────────────┘
```

---

### Step 8: Test GET All Users

**In Swagger:**

1. Click **"GET /api/Users"** to expand
2. Click **"Try it out"**
3. Click **"Execute"**

**Response:**
```json
[
  {
    "id": 1,
    "name": "Ahmad Ali",
    "email": "ahmad@example.com",
    "role": "Admin"
  },
  {
    "id": 2,
    "name": "Fatima Khan",
    "email": "fatima@example.com",
    "role": "User"
  },
  {
    "id": 3,
    "name": "Hassan Sheikh",
    "email": "hassan@example.com",
    "role": "Manager"
  }
]
```

**Response Code:** 200 OK ✅

---

### Step 9: Test GET User by ID

1. Click **"GET /api/Users/{id}"**
2. Click **"Try it out"**
3. **id field** mein enter karo: `1`
4. Click **"Execute"**

**Response:**
```json
{
  "id": 1,
  "name": "Ahmad Ali",
  "email": "ahmad@example.com",
  "role": "Admin",
  "createdDate": "2026-02-11T10:30:00"
}
```

---

### Step 10: Test POST Request

1. Click **"POST /api/Users"**
2. Click **"Try it out"**
3. **Request body** field mein yeh paste karo:

```json
{
  "name": "Sara Ahmed",
  "email": "sara@example.com",
  "role": "User"
}
```

4. Click **"Execute"**

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "name": "Sara Ahmed",
    "email": "sara@example.com",
    "role": "User"
  }
}
```

**Status: 200 OK** ✅

---

## 🔗 Part 7: Connecting React to Your API (Preview)

### CORS Configuration (IMPORTANT!)

**Problem:**
React app (localhost:5173) cannot directly call API (localhost:7001) due to **CORS policy**.

**Solution: Enable CORS in Program.cs**

**Open Program.cs and add:**

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173") // React app URL
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Use CORS (IMPORTANT: Before UseAuthorization)
app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
```

**Save and Rebuild!**

---

### Test from React

**In your React project (admin-panel):**

**Update .env:**
```env
VITE_API_BASE_URL=https://localhost:7001/api
```

**Update src/services/api.js:**
```javascript
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7001/api';
```

**Your React app can now call:**
```javascript
// GET all users
GET https://localhost:7001/api/Users

// GET user by ID
GET https://localhost:7001/api/Users/1

// POST create user
POST https://localhost:7001/api/Users
Body: { name, email, role }
```

**Test it:**
- Run .NET API (F5 in Visual Studio)
- Run React app (`npm run dev` in admin-panel)
- Users page should work! 🎉

---

## 📊 Complete Project Structure After Day 1

```
F:\.NET_Short/
├── admin-panel/                        ← React Frontend (Week 1-3)
│   ├── src/
│   ├── public/
│   └── package.json
│
└── AdminPanelAPI/                      ← .NET Backend (Week 4-6)
    ├── AdminPanelAPI/                  ← Project folder
    │   ├── Controllers/
    │   │   ├── UsersController.cs      ← Our controller ✅
    │   │   └── WeatherForecastController.cs
    │   ├── Properties/
    │   │   └── launchSettings.json
    │   ├── appsettings.json
    │   ├── appsettings.Development.json
    │   └── Program.cs                  ← Main file ✅
    │
    ├── AdminPanelAPI.sln               ← Solution file
    └── .vs/                            ← Visual Studio settings
```

---

## ✅ Day 1 Checklist

### **Software Installation:**
- [ ] Visual Studio 2022 Community installed
- [ ] ASP.NET and web development workload selected
- [ ] Data storage and processing workload selected
- [ ] .NET 8.0 SDK installed
- [ ] Installation verified

### **Project Creation:**
- [ ] New Web API project created (AdminPanelAPI)
- [ ] Project builds successfully
- [ ] Project runs without errors
- [ ] Swagger UI opens in browser

### **Understanding:**
- [ ] .NET aur ASP.NET Core samajh gaya
- [ ] Project structure samajh gayi
- [ ] Controllers ka concept clear
- [ ] HTTP methods samajh gaye (GET, POST, PUT, DELETE)

### **Implementation:**
- [ ] UsersController created
- [ ] All CRUD endpoints implemented
- [ ] Tested in Swagger UI
- [ ] CORS configured for React app

### **Testing:**
- [ ] GET /api/Users works
- [ ] GET /api/Users/{id} works
- [ ] POST /api/Users works
- [ ] PUT /api/Users/{id} works
- [ ] DELETE /api/Users/{id} works

---

## 🎯 Practice Tasks

### Task 1: Add Products Controller (⭐⭐)

**Create ProductsController with:**
```csharp
GET    /api/Products
GET    /api/Products/{id}
POST   /api/Products
PUT    /api/Products/{id}
DELETE /api/Products/{id}
```

**Sample Product:**
```json
{
  "id": 1,
  "name": "Laptop",
  "price": 899.99,
  "category": "Electronics",
  "inStock": true
}
```

---

### Task 2: Add Custom Response Format (⭐⭐⭐)

**Create consistent API response:**
```csharp
public class ApiResponse<T>
{
    public bool Success { get; set; }
    public string Message { get; set; }
    public T Data { get; set; }
}

// Usage
return Ok(new ApiResponse<object>
{
    Success = true,
    Message = "Users retrieved successfully",
    Data = users
});
```

---

### Task 3: Add Query Parameters (⭐⭐⭐⭐)

**Search and filter:**
```csharp
[HttpGet]
public IActionResult GetAllUsers([FromQuery] string search, [FromQuery] string role)
{
    // Filter logic
    // Return filtered users
}

// URL: /api/Users?search=ahmad&role=admin
```

---

### Task 4: Add Status Endpoint (⭐⭐⭐⭐⭐)

**Health check endpoint:**
```csharp
[HttpGet("status")]
public IActionResult GetStatus()
{
    return Ok(new
    {
        Status = "Running",
        Version = "1.0.0",
        ServerTime = DateTime.Now,
        Environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")
    });
}

// URL: /api/Users/status
```

---

## 🎓 Summary

### Today You Learned:

**1. .NET Concepts**
```
✅ What is .NET
✅ What is ASP.NET Core
✅ What is Web API
✅ Frontend vs Backend
```

**2. Visual Studio**
```
✅ Installation
✅ Workload selection
✅ Interface overview
✅ Solution Explorer
```

**3. Project Creation**
```
✅ Web API project template
✅ Project configuration
✅ Framework selection
✅ Project structure
```

**4. Controllers**
```
✅ What is controller
✅ Creating controller
✅ HTTP methods (GET, POST, PUT, DELETE)
✅ Route attributes
✅ Action results
```

**5. Testing**
```
✅ Swagger UI
✅ Testing endpoints
✅ Request/Response
✅ Status codes
```

**6. Integration**
```
✅ CORS configuration
✅ React connection
✅ API URL setup
```

---

## 📊 Before vs After

### Before Day 1:
```
❌ No backend development knowledge
❌ No Visual Studio
❌ No .NET project
❌ Frontend calling fake API (JSONPlaceholder)
❌ No control over data
```

### After Day 1:
```
✅ Visual Studio installed and configured
✅ First Web API project created
✅ Understanding of controllers and routing
✅ Complete CRUD endpoints
✅ API tested with Swagger
✅ CORS configured for React
✅ Ready for database integration
✅ Professional backend structure
```

---

## 🔜 Tomorrow Preview

**Day 2: Models, DTOs, and Basic Architecture**

**What's Coming:**
- ✅ Models (entities) creation
- ✅ DTOs (Data Transfer Objects)
- ✅ Folder structure organization
- ✅ Services layer introduction
- ✅ Dependency injection basics
- ✅ Better code organization

**Get Ready:**
Tomorrow we'll organize our code professionally! 🚀

---

## 💡 Pro Tips

### Tip 1: Always Build Before Run
```
Ctrl + Shift + B
Check for errors before running
```

### Tip 2: Use Swagger for Testing
```
Better than Postman for initial testing
Built-in, no extra setup
```

### Tip 3: Keep Console Window Open
```
Shows logs and errors
Don't close during debugging
```

### Tip 4: Clean and Rebuild
```
If strange errors:
Build → Clean Solution
Build → Rebuild Solution
```

---

## ❓ Common Problems & Solutions

### Problem 1: Port Already in Use

**Error:** "Port 7001 is already in use"

**Solution:**
```
1. Stop any running instances
2. Close Visual Studio
3. Open Task Manager
4. End any "dotnet.exe" processes
5. Restart Visual Studio
```

---

### Problem 2: CORS Error in Browser

**Error:** "CORS policy: No 'Access-Control-Allow-Origin'"

**Solution:**
```csharp
// Add CORS in Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:5173")
                       .AllowAnyHeader()
                       .AllowAnyMethod());
});

// Use CORS (before UseAuthorization)
app.UseCors("AllowReactApp");
```

---

### Problem 3: Controller Not Showing in Swagger

**Solution:**
1. Build project (Ctrl + Shift + B)
2. Stop and restart app
3. Check controller namespace matches project
4. Check `[ApiController]` attribute present

---

### Problem 4: Visual Studio Not Opening

**Solution:**
```
1. Run as Administrator
2. Clear VS cache:
   - Close VS
   - Delete .vs folder in solution directory
   - Reopen VS
```

---

## 🎊 Congratulations!

**🎉 Day 1 Complete! Backend Journey Started! 🎉**

**You've Successfully:**
- ✅ Installed Visual Studio Professional IDE
- ✅ Created your first ASP.NET Core Web API
- ✅ Built complete CRUD endpoints
- ✅ Tested APIs with Swagger
- ✅ Connected backend to React frontend
- ✅ Understood project structure
- ✅ Became a backend developer!

**Your Progress:**
```
Week 1-3: React Frontend ✅
Week 4 Day 1: Backend Started ✅

Next: Models, DTOs, Architecture 🚀
```

**Take a break - you earned it! 🌟**

**Tomorrow: Better code organization! 💻**

**Keep Learning! Keep Building! 🚀✨**
