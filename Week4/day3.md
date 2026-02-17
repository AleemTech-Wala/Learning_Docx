# 📅 Week 4 - Day 3: SQL Server Setup & Entity Framework Core

## 🎯 Today's Goal
**Aaj hum REAL DATABASE setup karenge! SQL Server aur Entity Framework Core ke saath! 🗄️**

**Today's Focus:**
- ✅ SQL Server kya hai (Database Server)
- ✅ Entity Framework Core kya hai (ORM)
- ✅ SQL Server Express installation
- ✅ SSMS installation & database creation
- ✅ EF Core NuGet packages
- ✅ Connection string configuration
- ✅ DbContext setup
- ✅ Testing database connection

---

## 📚 Session Breakdown (4-5 Hours)

| Time | Topic | Duration |
|------|-------|----------|
| **Hour 1** | SQL Server Concepts & Installation | 60 min |
| **Hour 2** | SSMS Installation & Database Creation | 60 min |
| **Hour 3** | Entity Framework Core Setup | 60 min |
| **Hour 4** | DbContext & Connection String | 60 min |
| **Hour 5** | Testing & Verification | 60 min |

---

## 🎓 Part 1: Understanding SQL Server & Entity Framework (30 minutes)

### 📖 What is SQL Server?

**Simple Urdu/English:**
SQL Server ek **database management system** hai jo Microsoft ne banaya hai. Yeh aapke data ko organized tareeqe se store karta hai.

**Real-Life Example:**
```
Sochein aap ek library hai:

Without Database:
📄 Papers scattered everywhere
📝 Notes in random notebooks
😰 Hard to find anything

With SQL Server:
📚 Organized shelves (Tables)
📇 Catalog cards (Indexes)
🔍 Easy search (Queries)
🔒 Security system (Permissions)
```

---

### 🤔 What is Entity Framework Core?

**EF Core = ORM (Object-Relational Mapper)**

**Simple Urdu/English:**
Entity Framework Core ek **tool** hai jo aapko C# code mein database ke saath kaam karne deta hai. SQL queries likhne ki zaroorat nahi!

**Without EF Core (Traditional):**
```csharp
// You write SQL manually 😰
string sql = "INSERT INTO Users (Name, Email) VALUES (@name, @email)";
SqlCommand cmd = new SqlCommand(sql, connection);
cmd.Parameters.AddWithValue("@name", "Ahmad");
cmd.Parameters.AddWithValue("@email", "ahmad@example.com");
cmd.ExecuteNonQuery();
```

**With EF Core (Modern):**
```csharp
// Simple C# code! 😊
var user = new User { Name = "Ahmad", Email = "ahmad@example.com" };
_context.Users.Add(user);
_context.SaveChanges();
```

---

### 📊 How EF Core Works

```
┌─────────────────────────────────────┐
│      YOUR C# CODE                   │
│  var user = new User();             │
│  _context.Users.Add(user);          │
│  _context.SaveChanges();            │
└──────────────┬──────────────────────┘
               │
               │ EF Core translates
               ↓
┌─────────────────────────────────────┐
│      SQL QUERY (Generated)          │
│  INSERT INTO Users (Name, Email)    │
│  VALUES ('Ahmad', 'ahmad@...')      │
└──────────────┬──────────────────────┘
               │
               │ Sent to database
               ↓
┌─────────────────────────────────────┐
│      SQL SERVER DATABASE            │
│   📊 Tables                         │
│   📝 Data                           │
└─────────────────────────────────────┘
```

---

### 🎯 Benefits of Entity Framework Core

```
✅ No SQL writing needed
✅ Type-safe queries (C# IntelliSense)
✅ Automatic database creation
✅ Easy migrations (schema changes)
✅ LINQ support (powerful queries)
✅ Cross-platform (.NET 8)
✅ Fast performance
✅ Great for beginners!
```

---

### 📖 SQL Server Editions

| Edition | Price | Size | Use Case |
|---------|-------|------|----------|
| **Express** | FREE | 10 GB max | Development, small apps |
| **Developer** | FREE | Unlimited | Development only |
| **Standard** | Paid | Unlimited | Medium business |
| **Enterprise** | Expensive | Unlimited | Large enterprise |

**We'll use: SQL Server Express (FREE) ✅**

---

## 💿 Part 2: Install SQL Server Express (60 minutes)

### Step 1: Download SQL Server Express

**Method:**

1. Open browser
2. Go to: **https://www.microsoft.com/en-us/sql-server/sql-server-downloads**
3. Scroll down to **"Express"** section
4. Click **"Download now"** button under Express
5. File download hoga: **`SQL2022-SSEI-Expr.exe`** (around 6 MB)
6. Download location: Usually **Downloads** folder

---

### Step 2: Run Installer

**Steps:**

1. **Downloads** folder mein jao
2. **SQL2022-SSEI-Expr.exe** file pe **double-click** karo
3. **User Account Control** popup:
   - "Do you want to allow this app to make changes?"
   - Click **"Yes"**

---

### Step 3: Choose Installation Type

**Installer window khulega with 3 options:**

```
┌─────────────────────────────────────────┐
│  SQL Server Express Installation         │
├─────────────────────────────────────────┤
│                                          │
│  ┌────────────────────┐                 │
│  │    BASIC           │  ← Select This! │
│  │  Quick install     │                 │
│  └────────────────────┘                 │
│                                          │
│  ┌────────────────────┐                 │
│  │    CUSTOM          │                 │
│  │  Advanced options  │                 │
│  └────────────────────┘                 │
│                                          │
│  ┌────────────────────┐                 │
│  │    DOWNLOAD MEDIA  │                 │
│  │  Offline install   │                 │
│  └────────────────────┘                 │
└─────────────────────────────────────────┘
```

**Click: BASIC** ✅

---

### Step 4: Accept License

1. **License Terms** page show hoga
2. Click **"Accept"** button
3. Next page show hoga

---

### Step 5: Choose Install Location

```
┌─────────────────────────────────────────┐
│  Install Location                        │
├─────────────────────────────────────────┤
│                                          │
│  📁 C:\Program Files\Microsoft SQL       │
│     Server\                              │
│                                          │
│  Space required: ~1.5 GB                │
│  Space available: XX GB                 │
│                                          │
│  [Browse...]  [Install]                 │
└─────────────────────────────────────────┘
```

**Default location theek hai:**
- Click **"Install"** button

---

### Step 6: Installation Progress

**Installation start hoga:**
```
Installing SQL Server Express...

Progress: ████████░░░░░░░░ 45%

Estimated time: 10-15 minutes

Steps:
✅ Downloading components
✅ Installing SQL Engine
⏳ Configuring instance
⏳ Starting services
```

**Note:**
- Internet connection required
- Download size: ~300-500 MB
- Installation time: 10-20 minutes (depending on speed)
- **Do NOT close** installer

---

### Step 7: Installation Complete

**Success message:**
```
┌─────────────────────────────────────────┐
│  ✅ Installation Complete!               │
├─────────────────────────────────────────┤
│                                          │
│  SQL Server Express installed            │
│  successfully                            │
│                                          │
│  Instance Name:                          │
│  SQLEXPRESS                              │
│                                          │
│  Connection String:                      │
│  localhost\SQLEXPRESS                    │
│                                          │
│  [Close]                                 │
└─────────────────────────────────────────┘
```

**Important Information:**
- **Instance Name:** `SQLEXPRESS`
- **Server Name:** `localhost\SQLEXPRESS` or `.\SQLEXPRESS`

**Click "Close"**

---

### Step 8: Verify Installation

**Check if SQL Server is running:**

1. Press **Windows Key + R** (Run dialog)
2. Type: **`services.msc`**
3. Press **Enter**
4. **Services** window khulega
5. Scroll down and find: **"SQL Server (SQLEXPRESS)"**
6. **Status** column check karo: Should be **"Running"** ✅
7. **Startup Type** should be **"Automatic"** ✅

**If NOT running:**
- Right-click on **"SQL Server (SQLEXPRESS)"**
- Click **"Start"**

---

## 🛠️ Part 3: Install SSMS (SQL Server Management Studio) (60 minutes)

### 📖 What is SSMS?

**Simple Urdu/English:**
SSMS ek **graphical tool** hai jisse aap database ko dekh sakte ho, tables create kar sakte ho, aur data manage kar sakte ho. Jaise Visual Studio code ke liye hai, SSMS database ke liye hai.

**Think of it as:**
```
Visual Studio = For writing C# code
SSMS = For managing SQL Server databases
```

---

### Step 1: Download SSMS

**Method:**

1. Open browser
2. Go to: **https://aka.ms/ssmsfullsetup**
3. Direct download start hoga
4. File: **`SSMS-Setup-ENU.exe`** (around 600 MB)
5. Wait for download (5-10 minutes depending on speed)

**Or search:**
- Google: "Download SSMS"
- Microsoft official page

---

### Step 2: Run SSMS Installer

**Steps:**

1. Go to **Downloads** folder
2. **Double-click** on **SSMS-Setup-ENU.exe**
3. **User Account Control**: Click **"Yes"**
4. SSMS Setup window khulega

---

### Step 3: Install SSMS

```
┌─────────────────────────────────────────┐
│  Microsoft SQL Server Management        │
│  Studio 19.x                             │
├─────────────────────────────────────────┤
│                                          │
│  Install Location:                       │
│  📁 C:\Program Files (x86)\Microsoft    │
│     SQL Server Management Studio 19     │
│                                          │
│  Space required: 2.2 GB                 │
│  Space available: XX GB                 │
│                                          │
│  ☐ Send usage data to Microsoft         │
│                                          │
│  [Install]  [Cancel]                    │
└─────────────────────────────────────────┘
```

**Steps:**
1. **Install Location** - default theek hai
2. Optional: Uncheck "Send usage data" (your choice)
3. Click **"Install"** button

---

### Step 4: Installation Progress

```
Installing SSMS...

████████████████████ 75%

Estimated time remaining: 5 minutes

Installing components...
```

**Installation time:** 10-15 minutes

**Note:** Aapko restart ki zaroorat nahi

---

### Step 5: Installation Complete

```
┌─────────────────────────────────────────┐
│  ✅ Setup Completed                      │
├─────────────────────────────────────────┤
│                                          │
│  SQL Server Management Studio has       │
│  been successfully installed.           │
│                                          │
│  ☐ Restart now                          │
│  ⦿ Close                                │
│                                          │
│  [Finish]                               │
└─────────────────────────────────────────┘
```

**Click "Finish"**

---

### Step 6: Open SSMS for First Time

**Method 1: Start Menu**
1. Click **Windows Start Menu**
2. Search: **"SSMS"** or **"SQL Server Management Studio"**
3. Click on app to open

**Method 2: Desktop shortcut**
- Double-click SSMS icon (if available)

**SSMS will open** (first time slow - 10-20 seconds)

---

### Step 7: Connect to SQL Server (Important: SSL Certificate Setup!)

**"Connect to Server" dialog automatically shows:**

```
┌─────────────────────────────────────────┐
│  Connect to Server                       │
├─────────────────────────────────────────┤
│                                          │
│  Server type:                            │
│  Database Engine               ▼         │
│                                          │
│  Server name:                            │
│  localhost\SQLEXPRESS          ▼         │
│                                          │
│  Authentication:                         │
│  Windows Authentication        ▼         │
│                                          │
│  User name:                              │
│  YourPC\YourUsername                     │
│                                          │
│  ☐ Remember password                     │
│                                          │
│  [Connect]  [Cancel]  [Options >>]      │
└─────────────────────────────────────────┘
```

**⚠️ IMPORTANT Configuration (To Avoid SSL Error):**

**Method 1: Using Additional Connection Parameters (EASIEST)**

1. **Server name:** Type **`localhost\SQLEXPRESS`** (or **`.\SQLEXPRESS`** or **`POS-PC\SQLEXPRESS`** - whatever dropdown shows)
2. **Authentication:** `Windows Authentication` ✅
3. Click **"Options >>"** button (bottom right)
4. Go to **"Additional Connection Parameters"** tab
5. In text box, type: **`TrustServerCertificate=True`**
6. Click **"Connect"**

**Method 2: Using Connection Properties Tab**

1. **Server name:** Type **`localhost\SQLEXPRESS`**
2. **Authentication:** `Windows Authentication` ✅
3. Click **"Options >>"** button (bottom right)
4. Go to **"Connection Properties"** tab
5. Find **"Encryption"** dropdown → Set to **"Optional"**
6. Check **"Trust server certificate"** checkbox ✅
7. Click **"Connect"**

**Why This is Needed:**
- SQL Server 2022 requires SSL/TLS by default
- Local development uses self-signed certificate
- SSMS rejects untrusted certificates
- `TrustServerCertificate=True` bypasses this check (safe for local dev)

**Important:**
- Server name is case-insensitive
- If dropdown shows different server name, use that
- Windows Authentication is default and recommended

---

### Step 8: SSMS Interface (Connected!)

**Main interface:**

```
┌────────────────────────────────────────────────────┐
│  File  Edit  View  Query  Tools  Window  Help     │
├────────┬───────────────────────────────────────────┤
│ Object │  Query Window                             │
│ Explor │                                           │
│        │  -- SQL queries here                      │
│ □ Dtbs │                                           │
│  ├─□ Sys                                           │
│  │                                                 │
│  ├─□ Ser                                           │
│  │                                                 │
│  ├─□ Sct                                           │
│  │                                                 │
│  └─□ ...                                           │
│                                                    │
└────────┴───────────────────────────────────────────┘
```

**Left side: Object Explorer**
- Shows databases
- Shows tables, views, etc.

**Right side: Query Editor**
- Write SQL queries here (later)

---

### Step 9: Create Database for Your Project

**Steps:**

1. **Object Explorer** mein (left side)
2. Expand **"Databases"** folder (click ▶ icon)
3. **Right-click** on **"Databases"**
4. Select **"New Database..."**

---

### Step 10: New Database Dialog

```
┌─────────────────────────────────────────┐
│  New Database                            │
├─────────────────────────────────────────┤
│                                          │
│  Database name:                          │
│  [AdminPanelDB                    ]      │
│                                          │
│  Owner:                                  │
│  <default>                      ▼        │
│                                          │
│  📁 Database files:                      │
│  ┌────────────────────────────────────┐ │
│  │ Logical Name    File Type    Size  │ │
│  │ AdminPanelDB    PRIMARY      8 MB  │ │
│  │ AdminPanelDB_   LOG          8 MB  │ │
│  └────────────────────────────────────┘ │
│                                          │
│  [OK]  [Cancel]                         │
└─────────────────────────────────────────┘
```

**Fill in:**

1. **Database name:** `AdminPanelDB`
2. Leave everything else as **default**
3. Click **"OK"**

---

### Step 11: Database Created! ✅

**Object Explorer now shows:**

```
Databases
├─ System Databases
│  ├─ master
│  ├─ model
│  ├─ msdb
│  └─ tempdb
└─ AdminPanelDB ← Your new database! 🎉
   ├─ Tables
   ├─ Views
   ├─ Stored Procedures
   └─ ...
```

**Success!** Database ready hai! 🎊

---

## 📦 Part 4: Install Entity Framework Core NuGet Packages (60 minutes)

### Step 1: Open Visual Studio

1. **Open Visual Studio 2022**
2. **Open** your **AdminPanelAPI** project
   - File → Open → Project/Solution
   - Navigate to: `F:\.NET_Short\AdminPanelAPI\AdminPanelAPI.sln`
   - Click **Open**

---

### Step 2: Open NuGet Package Manager

**Method:**

1. **Solution Explorer** mein (right side)
2. **"AdminPanelAPI"** project name pe **right-click** karo
3. **"Manage NuGet Packages..."** select karo

```
Solution Explorer
 Solution 'AdminPanelAPI'
  ├─ AdminPanelAPI  ← Right-click here!
     │  ├─ Dependencies
     │  ├─ Controllers
     │  ├─ DTOs
     │  └─ ...
     │
     └─ Right-click menu:
        ├─ Build
        ├─ Rebuild
        ├─ Clean
        ├─ Manage NuGet Packages... ← Click!
        ├─ Add
        └─ ...
```

**NuGet Package Manager window khulega**

---

### 📌 Important Note: EF Core Version Compatibility

**Before installing packages, understand this:**

```
┌─────────────────────────────────────────┐
│  .NET Version → EF Core Version         │
├─────────────────────────────────────────┤
│  .NET 8       → EF Core 8.x ✅          │
│  .NET 9       → EF Core 9.x or 10.x ✅  │
├─────────────────────────────────────────┤
│  ❌ .NET 8 + EF Core 10.x = ERROR!      │
│  ❌ .NET 9 + EF Core 8.x = Won't work   │
└─────────────────────────────────────────┘
```

**Your project: .NET 8 → Install EF Core 8.x only!**

---

### 🔍 How to Check Your .NET Version?

**Method 1: Open .csproj File (EASIEST)**

1. **Solution Explorer** mein **AdminPanelAPI** project pe **double-click** karo
   - Ya right-click → **"Edit Project File"**
2. Look for this line:
   ```xml
   <TargetFramework>net8.0</TargetFramework>  ← This is your version!
   ```
3. Version mapping:
   - `net8.0` → .NET 8 → Use EF Core 8.x ✅
   - `net9.0` → .NET 9 → Use EF Core 9.x/10.x
   - `net7.0` → .NET 7 → Use EF Core 7.x

**Method 2: Project Properties**

1. Right-click project → **Properties**
2. **Application** tab → See **"Target framework"** dropdown

**Method 3: Terminal Command**

```powershell
dotnet --version
# Output: 9.0.304 (this shows INSTALLED SDK, NOT project version!)
```

---

### ⚠️ IMPORTANT: SDK vs Project Target Version

**Common Confusion:**

```
Terminal shows: dotnet --version → 9.0.304
                    ↓
This is .NET SDK installed on your machine
                    ↓
NOT your project's target version!
```

**Correct Way to Check:**

```
.csproj file shows: <TargetFramework>net8.0</TargetFramework>
                               ↓
This is YOUR PROJECT version = .NET 8
                               ↓
Use EF Core 8.x.x ✅
```

**Example:**
```
Your Machine:
├─ .NET 9 SDK installed (9.0.304) ✅
└─ Can build .NET 8, 7, 6 projects ✅

Your Project:
├─ Target: net8.0 (.NET 8) ✅
└─ Needs: EF Core 8.x.x ✅
```

**Golden Rule:** Always check `.csproj` file, NOT `dotnet --version`!

---

### Step 3: NuGet Package Manager Interface

```
┌────────────────────────────────────────────────────┐
│  NuGet: AdminPanelAPI                              │
├────────────────────────────────────────────────────┤
│  [Browse] [Installed] [Updates] [Consolidate]     │
│                                                    │
│  🔍 [Search box                              ]     │
│                                                    │
│  ┌─ Include prerelease ☐                         │
│  │                                                │
│  │  Package list will appear here                │
│  │                                                │
│  └────────────────────────────────────────────────┤
│     Package details (right side)                  │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

### Step 4: Install Package 1 - EntityFrameworkCore.SqlServer

**Steps:**

1. **"Browse"** tab click karo (top left)
2. **Search box** mein type karo: **`Microsoft.EntityFrameworkCore.SqlServer`**
3. **Search results** mein **first result** show hoga:
   ```
   Microsoft.EntityFrameworkCore.SqlServer
   by Microsoft
   ⭐⭐⭐⭐⭐ (millions of downloads)
   ```
4. **Click** on this package (list mein)
5. **Right side** details panel show hoga
6. **⚠️ IMPORTANT - Version Selection:**
   - Right side mein **"Version:"** dropdown dikhega
   - Default: **"Latest stable 10.0.3"** (or higher) - **DON'T USE THIS!**
   - **Dropdown click karo** aur scroll down karo
   - Select: **`8.0.11`** (or any **8.x.x** version) ✅
   - **Why?** Your project is .NET 8, so EF Core 8.x is needed
   - **Do NOT** use version 9.x or 10.x (they are for .NET 9)
7. Version select karne ke **BAAD**, click **"Install"** button (blue button, right side)

---

### Step 5: Preview Changes Dialog

```
┌─────────────────────────────────────────┐
│  Preview Changes                         │
├─────────────────────────────────────────┤
│                                          │
│  The following packages will be          │
│  installed:                              │
│                                          │
│  ✅ Microsoft.EntityFrameworkCore        │
│     .SqlServer 8.0.11                   │
│                                          │
│  ✅ Microsoft.EntityFrameworkCore        │
│     8.0.11 (dependency)                 │
│                                          │
│  ✅ Microsoft.EntityFrameworkCore        │
│     .Abstractions 8.0.11                │
│                                          │
│  [OK]  [Cancel]                         │
└─────────────────────────────────────────┘
```

**Click "OK"**

---

### Step 6: Accept License

```
┌─────────────────────────────────────────┐
│  License Acceptance                      │
├─────────────────────────────────────────┤
│                                          │
│  ☑ I Accept                              │
│                                          │
│  MIT License                             │
│  ...license text...                     │
│                                          │
│  [I Accept]  [Cancel]                   │
└─────────────────────────────────────────┘
```

**Click "I Accept"**

---

### Step 7: Installation Progress

**Output window (bottom) shows:**

```
Installing Microsoft.EntityFrameworkCore.SqlServer 8.0.11...
Installing Microsoft.EntityFrameworkCore 8.0.11...
Successfully installed 'Microsoft.EntityFrameworkCore.SqlServer 8.0.11'
Successfully installed 'Microsoft.EntityFrameworkCore 8.0.11'

✅ Installation complete!
```

**Green checkmark** ✅ shows next to package name in list

---

### Step 8: Install Package 2 - EntityFrameworkCore.Tools

**Steps:**

1. **Search box** mein type karo: **`Microsoft.EntityFrameworkCore.Tools`**
2. **First result** pe click:
   ```
   Microsoft.EntityFrameworkCore.Tools
   by Microsoft
   ```
3. **Version dropdown** (right side):
   - **Dropdown click karo**
   - Scroll down to version **`8.0.11`** (same as SqlServer package)
   - **Important:** Same 8.x version use karo jo SqlServer package ka hai
4. Click **"Install"** button
5. **Preview Changes**: Click **"OK"**
6. **License**: Click **"I Accept"**

**Output:**
```
Installing Microsoft.EntityFrameworkCore.Tools 8.0.11...
✅ Successfully installed!
```

---

### Step 9: Verify Installed Packages

**Click "Installed" tab** (top of NuGet window)

**You should see:**
```
Installed Packages:
✅ Microsoft.EntityFrameworkCore (8.0.11)
✅ Microsoft.EntityFrameworkCore.SqlServer (8.0.11)
✅ Microsoft.EntityFrameworkCore.Tools (8.0.11)
... (other packages)
```

**Close NuGet Package Manager**

---

### 📖 What Did We Install?

**1. EntityFrameworkCore.SqlServer**
- Main EF Core library for SQL Server
- Query generation
- Database operations
- Connection management

**2. EntityFrameworkCore.Tools**
- Migration commands (Add-Migration, Update-Database)
- DbContext scaffolding
- Design-time tooling
- Used from Visual Studio Package Manager Console

---

## 🔌 Part 5: Configure Connection String (60 minutes)

### Step 1: Open appsettings.json

**Location:** `appsettings.json` (project root)

**Steps:**
1. **Solution Explorer** mein
2. **Double-click** on **`appsettings.json`**
3. File open hoga

**Current content:**
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

---

### Step 2: Add ConnectionStrings Section

**Update `appsettings.json`:**

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

**Important:** Add **before** "Logging" section

---

### 📖 Understanding Connection String

**Connection string breakdown:**

```
Server=localhost\SQLEXPRESS
│
└─ SQL Server instance name
   ("localhost\SQLEXPRESS" or ".\SQLEXPRESS")

Database=AdminPanelDB
│
└─ Database name we created in SSMS

Trusted_Connection=True
│
└─ Use Windows Authentication (no username/password)

TrustServerCertificate=True
│
└─ Trust SSL certificate (for local development)
```

**Complete format:**
```
Server=[server_name];Database=[db_name];Trusted_Connection=True;TrustServerCertificate=True;
```

---

### Alternative Connection Strings

**If using SQL Server authentication:**
```json
"DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=AdminPanelDB;User Id=sa;Password=YourPassword123;TrustServerCertificate=True;"
```

**If SQL Server is on different machine:**
```json
"DefaultConnection": "Server=192.168.1.100\\SQLEXPRESS;Database=AdminPanelDB;Trusted_Connection=True;TrustServerCertificate=True;"
```

**For LocalDB (another option):**
```json
"DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=AdminPanelDB;Trusted_Connection=True;TrustServerCertificate=True;"
```

---

### Save File
- **Ctrl + S** or **File → Save**

---

## 🏗️ Part 6: Create DbContext Class (60 minutes)

### Step 1: Create Data Folder

**Steps:**
1. **Solution Explorer** mein **"AdminPanelAPI"** project pe **right-click**
2. **Add** → **New Folder**
3. Name: **`Data`**
4. Press **Enter**

---

### Step 2: Create ApplicationDbContext Class

**Steps:**
1. **Data** folder pe **right-click**
2. **Add** → **Class...**
3. **Name:** `ApplicationDbContext.cs`
4. Click **"Add"**

---

### Step 3: ApplicationDbContext Code

**File:** `Data/ApplicationDbContext.cs`

**Replace default code with:**

```csharp
using Microsoft.EntityFrameworkCore;
using AdminPanelAPI.Models;

namespace AdminPanelAPI.Data
{
    /// <summary>
    /// Database context for Admin Panel
    /// Manages database connection and entity sets
    /// </summary>
    public class ApplicationDbContext : DbContext
    {
        // ==========================================
        // CONSTRUCTOR
        // ==========================================
        
        /// <summary>
        /// Constructor - receives configuration from DI
        /// </summary>
        /// <param name="options">DbContext configuration options</param>
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // ==========================================
        // DB SETS (TABLES)
        // ==========================================
        
        /// <summary>
        /// Users table in database
        /// Each DbSet<T> represents a table
        /// </summary>
        public DbSet<User> Users { get; set; }

        // Future tables will be added here:
        // public DbSet<Product> Products { get; set; }
        // public DbSet<Order> Orders { get; set; }
        // public DbSet<Customer> Customers { get; set; }

        // ==========================================
        // MODEL CONFIGURATION
        // ==========================================
        
        /// <summary>
        /// Configure model relationships and constraints
        /// Called when the model is being created
        /// </summary>
        /// <param name="modelBuilder">Model builder for configuration</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ==========================================
            // USER ENTITY CONFIGURATION
            // ==========================================
            
            modelBuilder.Entity<User>(entity =>
            {
                // Table name
                entity.ToTable("Users");

                // Primary key
                entity.HasKey(e => e.Id);

                // Email unique constraint
                entity.HasIndex(e => e.Email)
                    .IsUnique()
                    .HasDatabaseName("IX_Users_Email");

                // Username unique constraint
                entity.HasIndex(e => e.Username)
                    .IsUnique()
                    .HasDatabaseName("IX_Users_Username");

                // Required fields
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.PasswordHash)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.Role)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasDefaultValue("User");

                // Optional fields
                entity.Property(e => e.Phone)
                    .HasMaxLength(20);

                entity.Property(e => e.Website)
                    .HasMaxLength(255);

                entity.Property(e => e.CompanyName)
                    .HasMaxLength(200);

                entity.Property(e => e.JobTitle)
                    .HasMaxLength(100);

                entity.Property(e => e.Street)
                    .HasMaxLength(255);

                entity.Property(e => e.City)
                    .HasMaxLength(100);

                entity.Property(e => e.State)
                    .HasMaxLength(100);

                entity.Property(e => e.ZipCode)
                    .HasMaxLength(20);

                entity.Property(e => e.Country)
                    .HasMaxLength(100);

                // Default values
                entity.Property(e => e.IsActive)
                    .HasDefaultValue(true);

                entity.Property(e => e.CreatedDate)
                    .HasDefaultValueSql("GETUTCDATE()");
            });

            // ==========================================
            // SEED DATA (Optional - for testing)
            // ==========================================
            
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Name = "Admin User",
                    Username = "admin",
                    Email = "admin@adminpanel.com",
                    PasswordHash = "hashed_admin_password_here",
                    Role = "Admin",
                    IsActive = true,
                    CreatedDate = DateTime.UtcNow
                }
            );
        }
    }
}
```

---

### 📖 Understanding DbContext

**1. DbContext Class**
```csharp
public class ApplicationDbContext : DbContext
```
- Inherits from `DbContext` (EF Core base class)
- Represents database connection
- Manages entity tracking

**2. Constructor**
```csharp
public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : base(options)
```
- Receives configuration from Dependency Injection
- Passes to base DbContext

**3. DbSet Properties**
```csharp
public DbSet<User> Users { get; set; }
```
- Each `DbSet<T>` = Database table
- `Users` = Table name
- LINQ queries on these properties

**4. OnModelCreating Method**
```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
```
- Configure table structure
- Set constraints (unique, required, max length)
- Define relationships
- Seed initial data

**5. Fluent API Configuration**
```csharp
entity.HasKey(e => e.Id);
entity.HasIndex(e => e.Email).IsUnique();
entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
```
- Alternative to Data Annotations
- More powerful and flexible

---

### Save File
- **Ctrl + S**

---

## ⚙️ Part 7: Register DbContext in Program.cs (30 minutes)

### Step 1: Open Program.cs

**Double-click** `Program.cs` in Solution Explorer

---

### Step 2: Add Using Statement

**At the top of file, add:**

```csharp
using Microsoft.EntityFrameworkCore;
using AdminPanelAPI.Data;
```

**Complete using section:**
```csharp
using Microsoft.EntityFrameworkCore;
using AdminPanelAPI.Data;
```

---

### Step 3: Register DbContext Service

**Find this line:**
```csharp
var builder = WebApplication.CreateBuilder(args);
```

**After this line, add:**

```csharp
var builder = WebApplication.CreateBuilder(args);

// ==========================================
// ADD DATABASE CONTEXT
// ==========================================

// Get connection string from appsettings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Register ApplicationDbContext with SQL Server
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// Add services to the container.
builder.Services.AddControllers();
```

---

### Complete Program.cs (Updated)

```csharp
using Microsoft.EntityFrameworkCore;
using AdminPanelAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// ==========================================
// DATABASE CONTEXT
// ==========================================

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// ==========================================
// SERVICES
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

// ==========================================
// BUILD APP
// ==========================================

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

### 📖 Understanding Registration

**1. Get Connection String**
```csharp
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
```
- Reads from `appsettings.json`
- Gets "DefaultConnection" value

**2. Register DbContext**
```csharp
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
```
- Registers `ApplicationDbContext` in DI container
- Configures SQL Server as database provider
- Makes DbContext available in controllers

**3. Dependency Injection**
```csharp
// Now you can use in controllers:
public class UsersController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    
    public UsersController(ApplicationDbContext context)
    {
        _context = context;
    }
}
```

---

### Save File
- **Ctrl + S**

---

## ✅ Part 8: Build and Verify (30 minutes)

### Step 1: Build Project

**Method:**
- **Build** menu → **Build Solution**
- Or **Ctrl + Shift + B**

**Output window (bottom):**
```
Build started...
1>------ Build started: Project: AdminPanelAPI ------
1>  AdminPanelAPI -> F:\.NET_Short\AdminPanelAPI\bin\Debug\net8.0\AdminPanelAPI.dll
========== Build: 1 succeeded, 0 failed, 0 up-to-date, 0 skipped ==========
```

**Success!** ✅

---

### Step 2: Check for Errors

**If build fails, check:**
```
❌ Common errors:

1. Missing using statements
   → Add: using Microsoft.EntityFrameworkCore;

2. Connection string typo
   → Check appsettings.json syntax

3. Package not installed
   → Verify in NuGet Package Manager

4. Wrong EF Core version
   → Use 8.x.x (not 9.x.x)
```

---

### Step 3: Test Connection (Optional)

**Create a test endpoint:**

**In `Controllers/UsersController.cs`, add:**

```csharp
private readonly ApplicationDbContext _context;

public UsersController(ApplicationDbContext context)
{
    _context = context;
}

// Test database connection
[HttpGet("test-connection")]
public IActionResult TestConnection()
{
    try
    {
        // Try to connect to database
        var canConnect = _context.Database.CanConnect();
        
        if (canConnect)
        {
            return Ok(new
            {
                Success = true,
                Message = "Database connection successful! ✅",
                Database = "AdminPanelDB"
            });
        }
        else
        {
            return StatusCode(500, new
            {
                Success = false,
                Message = "Cannot connect to database ❌"
            });
        }
    }
    catch (Exception ex)
    {
        return StatusCode(500, new
        {
            Success = false,
            Message = "Database connection error",
            Error = ex.Message
        });
    }
}
```

---

### Step 4: Run and Test

1. Press **F5** (run project)
2. Swagger opens
3. Find **GET /api/Users/test-connection**
4. Click **"Try it out"**
5. Click **"Execute"**

**Expected response:**
```json
{
  "success": true,
  "message": "Database connection successful! ✅",
  "database": "AdminPanelDB"
}
```

**Success!** Connection working! 🎊

---

## 📊 Final Project Structure (Day 3)

```
AdminPanelAPI/
├── Controllers/
│   ├── UsersController.cs
│   └── WeatherForecastController.cs
├── Data/                            ← New (today)
│   └── ApplicationDbContext.cs     ← DbContext
├── DTOs/
│   ├── CreateUserDto.cs
│   ├── UpdateUserDto.cs
│   └── UserDto.cs
├── Models/
│   └── User.cs
├── Responses/
│   └── ApiResponse.cs
├── Properties/
│   └── launchSettings.json
├── appsettings.json                ← Updated (connection string)
└── Program.cs                      ← Updated (DbContext registration)
```

---

## ✅ Day 3 Checklist

### **Software Installation:**
- [ ] SQL Server Express installed (localhost\SQLEXPRESS)
- [ ] SQL Server service running (services.msc)
- [ ] SSMS installed
- [ ] Can connect to SQL Server in SSMS
- [ ] Database "AdminPanelDB" created

### **Visual Studio Setup:**
- [ ] NuGet packages installed:
  - [ ] Microsoft.EntityFrameworkCore.SqlServer (8.0.x)
  - [ ] Microsoft.EntityFrameworkCore.Tools (8.0.x)
- [ ] Connection string added to appsettings.json
- [ ] Data folder created
- [ ] ApplicationDbContext.cs created
- [ ] DbContext registered in Program.cs

### **Code Verification:**
- [ ] Project builds successfully (no errors)
- [ ] Test connection endpoint works
- [ ] Can connect to database from code

### **Understanding:**
- [ ] SQL Server vs Database clear
- [ ] Entity Framework Core concept clear
- [ ] DbContext purpose understood
- [ ] Connection string format understood
- [ ] DbSet<T> concept clear

---

## 🎯 Practice Tasks

### Task 1: Add Product DbSet (⭐⭐⭐)

**In ApplicationDbContext.cs, add:**

```csharp
public DbSet<Product> Products { get; set; }
```

**Don't forget Product model!**

---

### Task 2: Configure Product Entity (⭐⭐⭐⭐)

**In OnModelCreating method:**

```csharp
modelBuilder.Entity<Product>(entity =>
{
    entity.ToTable("Products");
    entity.HasKey(e => e.Id);
    entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
    entity.Property(e => e.Price).HasColumnType("decimal(18,2)");
});
```

---

### Task 3: Test Different Connection Strings (⭐⭐⭐)

**Try:**
- LocalDB: `Server=(localdb)\\mssqllocaldb;...`
- Different server name
- SQL authentication

---

### Task 4: Add Logging (⭐⭐⭐⭐⭐)

**In Program.cs:**

```csharp
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(connectionString);
    options.EnableSensitiveDataLogging(); // Shows parameter values in logs
    options.LogTo(Console.WriteLine); // Log SQL queries to console
});
```

---

## 🎓 Summary

### Today You Learned:

**1. SQL Server**
```
✅ What is SQL Server
✅ SQL Server Express installation
✅ Services management
✅ Server instance name (SQLEXPRESS)
```

**2. SSMS**
```
✅ What is SSMS
✅ SSMS installation
✅ Connecting to SQL Server
✅ Creating database
✅ Object Explorer navigation
```

**3. Entity Framework Core**
```
✅ What is EF Core (ORM)
✅ How EF Core works
✅ Benefits of EF Core
✅ NuGet package installation (GUI method)
```

**4. DbContext**
```
✅ ApplicationDbContext creation
✅ DbSet<T> properties (tables)
✅ OnModelCreating configuration
✅ Fluent API
✅ Dependency Injection registration
```

**5. Connection String**
```
✅ Connection string format
✅ appsettings.json configuration
✅ Reading connection string in code
✅ Different authentication methods
```

---

## 📊 Before vs After

### Before Day 3:
```
❌ In-memory list data (temporary)
❌ Data lost on restart
❌ No persistence
❌ Not production-ready
```

### After Day 3:
```
✅ SQL Server installed
✅ Real database created
✅ Entity Framework Core setup
✅ DbContext configured
✅ Connection established
✅ Ready for migrations
✅ Production-ready foundation
```

---

## 🔜 Tomorrow Preview

**Day 4: Migrations & Database Operations**

**What's Coming:**
- ✅ What are Migrations
- ✅ Creating first migration
- ✅ Updating database
- ✅ Seeing tables in SSMS
- ✅ CRUD operations with real database
- ✅ Update UsersController to use DbContext
- ✅ Testing with real data persistence

**Get Ready:**
Tomorrow we'll create database tables and implement real CRUD operations! 📊

---

## 💡 Pro Tips

### Tip 1: Always Check SQL Server Service
```
Windows + R → services.msc
Find: SQL Server (SQLEXPRESS)
Status: Running ✅
```

### Tip 2: Connection String Testing
```csharp
// In any controller
var canConnect = _context.Database.CanConnect();
```

### Tip 3: View Generated SQL
```csharp
options.LogTo(Console.WriteLine);
// See SQL queries in console
```

### Tip 4: SSMS Keyboard Shortcuts
```
Ctrl + N = New Query
F5 = Execute Query
Ctrl + R = Show/Hide Results
```

### Tip 5: NuGet Package Versions
```
Always use same version for all EF Core packages!
✅ All 8.0.11
❌ Mixed 8.0.11 and 8.0.8
```

---

## ⚠️ Common Problems & Solutions

### Problem 1: Cannot Connect to SQL Server

**Symptoms:**
```
A network-related or instance-specific error occurred
while establishing a connection to SQL Server.
```

**Solutions:**
1. Check SQL Server service is running (services.msc)
2. Verify server name: `localhost\SQLEXPRESS` or `.\SQLEXPRESS`
3. Enable TCP/IP in SQL Server Configuration Manager
4. Check firewall settings

---

### Problem 2: Database Not Showing in SSMS

**Solution:**
1. Right-click **"Databases"** in Object Explorer
2. Click **"Refresh"**
3. Database should appear

---

### Problem 3: NuGet Package Installation Failed

**Solution:**
1. Close and reopen Visual Studio
2. Tools → NuGet Package Manager → Package Manager Settings
3. Clear all NuGet caches
4. Try installing again
5. Check internet connection

---

### Problem 4: Build Errors After Installing Packages

**Solution:**
1. Clean solution: Build → Clean Solution
2. Rebuild: Build → Rebuild Solution
3. Restart Visual Studio
4. Check using statements are correct

---

### Problem 5: Connection String Not Working

**Check:**
```json
// ✅ Correct - double backslash
"Server=localhost\\SQLEXPRESS;..."

// ❌ Wrong - single backslash
"Server=localhost\SQLEXPRESS;..."

// ✅ Correct - dot notation
"Server=.\\SQLEXPRESS;..."
```

---

## 🎊 Congratulations!

**🎉 Day 3 Complete! Database Foundation Ready! 🎉**

**You've Successfully:**
- ✅ Installed SQL Server Express
- ✅ Installed SSMS
- ✅ Created AdminPanelDB database
- ✅ Installed Entity Framework Core packages
- ✅ Created ApplicationDbContext
- ✅ Configured connection string
- ✅ Registered DbContext in DI
- ✅ Tested database connection
- ✅ Build successful

**Your Project Now Has:**
```
✅ Real SQL Server database
✅ Entity Framework Core integration
✅ Professional DbContext setup
✅ Connection string configuration
✅ DI registration
✅ Foundation for migrations
✅ Production-ready structure
```

**Tomorrow: Migrations & Live Database! 📊**

**Database power unlocked! Keep building! 🚀✨**
