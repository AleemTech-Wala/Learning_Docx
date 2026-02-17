# 📅 Week 4 - Day 6: CRUD APIs Review & Postman Testing

## 🎯 Aaj ka Goal

Aaj hum apne complete CRUD APIs ko professional API testing tool **Postman** se test karenge. Swagger se basic testing kar chuke hain, ab industry-standard tool seekhenge jo har company mein use hota hai.

**Kya Seekhenge:**
- Postman kya hai aur kyun use karte hain
- Postman collection kaise banate hain
- All CRUD operations ko Postman se test karna
- Environment variables setup
- Professional API testing practices
- Collection export/share karna

---

## ⏰ Aaj ka Session Breakdown (4 Hours)

| Part | Topic | Time |
|------|-------|------|
| 1 | Understanding Postman & Installation | 45 min |
| 2 | Quick CRUD APIs Review | 30 min |
| 3 | Create Postman Collection & Test GET APIs | 45 min |
| 4 | Test POST (Create User) API | 30 min |
| 5 | Test PUT (Update User) API | 30 min |
| 6 | Test DELETE API & Error Scenarios | 30 min |
| 7 | Environment Variables Setup | 30 min |
| 8 | Advanced Features & Collection Export | 30 min |

---

## 📚 Part 1: Understanding Postman & Installation (45 min)

### 🤔 Postman Kya Hai?

**Simple Example:**
```
Restaurant Analogy:

Swagger = Restaurant ka menu card jo waiter dikhata hai
         (Built-in, automatic, dekh ke order karo)

Postman = Restaurant ka order app on your phone
         (Professional tool, save orders, share with friends)
```

**Technical Definition:**
Postman ek API testing tool hai jo developers use karte hain APIs test karne ke liye.

### 🆚 Postman vs Swagger - Kab Kya Use Karein?

| Feature | Swagger | Postman |
|---------|---------|---------|
| **Installation** | Built-in (automatic) | Download karna padta hai |
| **Purpose** | API documentation + basic testing | Professional API testing |
| **Saving** | Requests save nahi hote | Requests save hote hain |
| **Sharing** | Link share karo | Collection export/import |
| **Testing** | Basic testing | Advanced testing with scripts |
| **Environment** | Fixed base URL | Multiple environments (Dev/QA/Prod) |
| **Best For** | Development phase | Testing phase |

**Real World Usage:**
- **Development time**: Swagger use karo (quick testing)
- **Testing time**: Postman use karo (professional testing)
- **Sharing with team**: Postman collection share karo
- **Documentation**: Swagger swagger auto-generate karta hai

### 📥 Postman Installation (Step-by-Step)

#### Step 1: Download Postman

1. **Browser kholo** aur https://www.postman.com/downloads/ pe jao

2. **Download button** click karo:
   - Windows 64-bit automatically detect hoga
   - Size: ~150 MB (small download)
   - Free version download karo (no credit card needed)

#### Step 2: Install Postman

1. **Downloaded file** pe double-click karo
   - File name: `Postman-win64-Setup.exe`

2. **Installation automatically start** hoga:
   - Progress bar dikhega
   - 2-3 minutes lagenge
   - Koi checkboxes nahi hain (automatic installation)

3. **Postman automatically launch** hoga

#### Step 3: Postman Account (Optional)

Postman open hoga aur sign-in screen dikhegi:

**Option 1: Skip Sign In (Recommended for beginners)**
```
- "Skip signing in and take me straight to the app" link pe click karo
- Direct Postman workspace khul jayega
- Collections local save honge
```

**Option 2: Create Account (Optional)**
```
- Email se sign up karo
- Collections cloud mein save honge
- Team ke saath share kar sakte ho
```

**Aaj ke liye:** Option 1 use karo (skip sign in)

#### Step 4: Postman Interface Overview

Postman open karne ke baad ye dikhega:

```
┌─────────────────────────────────────────────────────────┐
│  Postman                                    [- □ X]     │
├──────────┬──────────────────────────────────────────────┤
│          │  New Request                                 │
│  Home    │  GET  https://example.com    [Send]          │
│  Worksp  │                                              │
│  API     │  Params  Authorization  Headers  Body        │
│  Collect │  ────────────────────────────────            │
│          │                                              │
│ + New    │  Response (will appear here)                 │
│          │                                              │
│ My Works │                                              │
│  📁 Coll │                                              │
│          │                                              │
└──────────┴──────────────────────────────────────────────┘

Left Sidebar:
- Collections (📁) - Saved requests
- History (🕒) - Recent requests
- + New button - Create new request/collection

Center Area:
- Method dropdown (GET, POST, PUT, DELETE)
- URL input bar
- Send button
- Tabs: Params, Headers, Body, Authorization
- Response section (bottom half)
```

**Important Areas:**
1. **Collections** (left sidebar) - Jahan requests save karenge
2. **Request Builder** (center) - API test karne ka area
3. **Response Viewer** (bottom) - API ka response dikhega

---

## 🔍 Part 2: Quick CRUD APIs Review (30 min)

### ✅ Currently Available APIs (Days 2-5 mein banaye)

Pehle check karte hain ke humne kya kya banaya hai:

#### 1. **GET All Users**
```http
GET https://localhost:7001/api/Users
```
- All active users return karta hai
- IsActive = true filter lagta hai
- CreatedDate se sorted (latest first)

#### 2. **GET User by ID**
```http
GET https://localhost:7001/api/Users/1
```
- Specific user return karta hai
- ID path parameter mein
- Not found error agar user nahi mila

#### 3. **Search Users** (Day 5 mein banaya)
```http
GET https://localhost:7001/api/Users/search?query=admin
```
- Query parameter se search
- Name, Email, Username mein search karta hai
- Contains logic use hota hai

#### 4. **Create User**
```http
POST https://localhost:7001/api/Users
Content-Type: application/json

{
  "name": "Ali Ahmed",
  "username": "ali123",
  "email": "ali@example.com",
  "password": "ali123456",
  "phone": "03001234567",
  "role": "User"
}
```
- New user create karta hai
- Validation checks (email uniqueness)
- Password strength check
- Returns created user

#### 5. **Update User**
```http
PUT https://localhost:7001/api/Users/2
Content-Type: application/json

{
  "name": "Ali Ahmed Updated",
  "email": "ali.updated@example.com",
  "phone": "03009876543"
}
```
- Existing user update karta hai
- ID path parameter mein
- Email uniqueness check (excluding current user)
- Returns updated user

#### 6. **Delete User**
```http
DELETE https://localhost:7001/api/Users/2
```
- User ko delete karta hai (soft delete)
- IsActive = false set karta hai
- Admin user ko delete nahi kar sakte (protection)

### 🚀 Visual Studio mein Project Run Karo

Postman testing se pehle ensure karo ke backend running hai:

1. **Visual Studio kholo**
2. **AdminPanelAPI project** kholo
3. **Run button** (green play ▶) click karo ya **F5** press karo
4. Browser mein Swagger khulega: `https://localhost:7001/swagger`

**Important:** Backend running hona chahiye jab Postman se test karo!

**Check karo:**
- Console window dikhni chahiye "Now listening on: https://localhost:7001"
- Browser mein Swagger UI load hona chahiye
- Green run button red stop button ban jayega

---

## 📁 Part 3: Create Postman Collection & Test GET APIs (45 min)

### 🆕 Step 1: Create New Collection

1. **Postman kholo**

2. **Left sidebar** mein **Collections** pe click karo

3. **"+"** button ya **"Create Collection"** button click karo

4. **Collection name** type karo:
   ```
   AdminPanelAPI - CRUD Operations
   ```

5. **Description** add karo (optional):
   ```
   Complete CRUD APIs for User Management
   Week 4 - Day 6 Testing
   ```

6. **Create** button click karo

**Result:** Left sidebar mein naya collection ban jayega 📁 "AdminPanelAPI - CRUD Operations"

### 📝 Step 2: Add Folder Structure

Collection ke andar folders banate hain organized rakhne ke liye:

1. **Collection pe right-click** karo "AdminPanelAPI - CRUD Operations"

2. **"Add Folder"** select karo

3. **Folder name** type karo: **"Users"**

4. **Save** karo

**Result:** Collection ke andar "Users" folder ban jayega

### 🧪 Step 3: Test GET All Users

#### Add Request to Collection

1. **"Users" folder pe right-click** karo

2. **"Add Request"** select karo

3. **Request name** type karo: **"Get All Users"**

4. **Request configuration:**
   - **Method**: GET (dropdown se select karo)
   - **URL**: `https://localhost:7001/api/Users`

5. **Send button** click karo ▶

#### Expected Response

```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Admin User",
      "username": "admin",
      "email": "admin@example.com",
      "phone": "03001234567",
      "role": "admin",
      "isActive": true,
      "createdDate": "2024-01-15T10:30:00"
    }
  ],
  "errors": null
}
```

#### Response Details Check Karo

**Status Code** (right side, top):
```
200 OK ✅  (Green badge)
```

**Response Time**:
```
Time: 45 ms (usually 20-100 ms)
```

**Response Size**:
```
Size: 523 B
```

**Response Body Tabs**:
- **Pretty** - Formatted JSON (human readable)
- **Raw** - Plain text
- **Preview** - HTML preview (if HTML response)

#### Save Request

1. **Ctrl + S** press karo ya
2. **Save button** (top-right) click karo
3. Request "Users" folder mein save ho jayega

### 🧪 Step 4: Test GET User by ID

#### Add New Request

1. **"Users" folder pe right-click** karo

2. **"Add Request"** select karo

3. **Request name**: **"Get User by ID"**

4. **Request configuration:**
   - **Method**: GET
   - **URL**: `https://localhost:7001/api/Users/1`

5. **Send** click karo

#### Expected Response

```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "id": 1,
    "name": "Admin User",
    "username": "admin",
    "email": "admin@example.com",
    "phone": "03001234567",
    "role": "admin",
    "isActive": true,
    "createdDate": "2024-01-15T10:30:00"
  },
  "errors": null
}
```

**Status**: 200 OK ✅

#### Test with Invalid ID

1. **URL change karo**: `https://localhost:7001/api/Users/999`
2. **Send** click karo

**Expected Response:**
```json
{
  "success": false,
  "message": "User not found",
  "data": null,
  "errors": null
}
```

**Status**: 404 Not Found ❌

**Save request** (Ctrl + S)

### 🔍 Step 5: Test Search Users

#### Add Search Request

1. **New request** banao: **"Search Users"**

2. **Method**: GET

3. **URL**: `https://localhost:7001/api/Users/search`

4. **Query Parameters add karo** (Postman automatically parse karega):
   
   **Method 1: URL mein directly type karo**
   ```
   https://localhost:7001/api/Users/search?query=admin
   ```

   **Method 2: Params tab use karo** (Recommended)
   - URL field ke neeche **"Params"** tab click karo
   - **Key**: `query`
   - **Value**: `admin`
   - URL automatically update hoga

5. **Send** click karo

#### Expected Response

```json
{
  "success": true,
  "message": "Search completed successfully",
  "data": [
    {
      "id": 1,
      "name": "Admin User",
      "username": "admin",
      "email": "admin@example.com",
      "phone": "03001234567",
      "role": "admin",
      "isActive": true
    }
  ],
  "errors": null
}
```

#### Test Different Search Queries

**Params tab** mein **Value** change karke test karo:

1. **Query**: `ali` - Ali naam wale users milenge
2. **Query**: `example.com` - Example email wale users (email se search)
3. **Query**: `030` - Phone number se search
4. **Query**: `xyz` - Empty array milega

**Save request** (Ctrl + S)

---

## 📤 Part 4: Test POST (Create User) API (30 min)

### 🆕 Step 1: Add Create User Request

1. **New request** banao: **"Create User"**

2. **Method**: **POST** (dropdown se select karo - important!)

3. **URL**: `https://localhost:7001/api/Users`

### 📝 Step 2: Setup Request Body

POST request mein data **request body** mein bhejte hain.

1. **Body tab** click karo (URL field ke neeche tabs hain)

2. **"raw"** radio button select karo (right side mein options hain)

3. **Format dropdown** (right side, blue text dropdown) mein **"JSON"** select karo

4. **Body area** mein JSON type karo:

```json
{
  "name": "Ali Ahmed",
  "username": "ali123",
  "email": "ali@example.com",
  "password": "ali123456",
  "phone": "03001234567",
  "website": "https://ali.dev",
  "companyName": "Tech Solutions",
  "jobTitle": "Software Engineer",
  "address": "123 Main Street",
  "city": "Karachi",
  "state": "Sindh",
  "country": "Pakistan",
  "postalCode": "75500",
  "role": "User"
}
```

### 🔧 Step 3: Setup Headers (Automatic)

**Good News:** Jab aapne **JSON** format select kiya, Postman automatically header add kar diya:

**Check karo (Headers tab pe click karke):**
```
Content-Type: application/json ✅ (Auto-generated)
```

Manually add karne ki zaroorat nahi!

### 🚀 Step 4: Send Request

1. **Send button** click karo

#### Expected Response

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 2,
    "name": "Ali Ahmed",
    "username": "ali123",
    "email": "ali@example.com",
    "phone": "03001234567",
    "role": "User",
    "isActive": true,
    "createdDate": "2024-01-15T11:45:00"
  },
  "errors": null
}
```

**Status**: 201 Created ✅

**Notice:**
- `id: 2` automatically assign hua (database ne generate kiya)
- `createdDate` automatically set hua
- `isActive: true` default value
- Password response mein nahi hai (security! ✅)

### ❌ Step 5: Test Validation Errors

#### Test 1: Duplicate Email

1. **Same request** ko phir se send karo (Send button click karo again)

**Expected Response:**
```json
{
  "success": false,
  "message": "User creation failed",
  "data": null,
  "errors": ["Email already exists"]
}
```

**Status**: 400 Bad Request ❌

Ye humari **business rule validation** hai (Service Layer mein - Day 5)!

#### Test 2: Invalid Email Format

**Body mein email change karo:**
```json
{
  "name": "Sara Khan",
  "username": "sara123",
  "email": "invalidemail",  // ❌ Invalid format
  "password": "sara123456",
  "role": "User"
}
```

**Send** karo.

**Expected Response:**
```json
{
  "success": false,
  "message": "Validation failed",
  "data": null,
  "errors": {
    "Email": ["The Email field is not a valid e-mail address."]
  }
}
```

**Status**: 400 Bad Request ❌

Ye **Data Annotation validation** hai (Day 2 mein banaya tha)!

#### Test 3: Missing Required Fields

**Body mein sirf name rakho:**
```json
{
  "name": "Test User"
}
```

**Send** karo.

**Expected Response:**
```json
{
  "success": false,
  "message": "Validation failed",
  "data": null,
  "errors": {
    "Username": ["The Username field is required."],
    "Email": ["The Email field is required."],
    "Password": ["The Password field is required."]
  }
}
```

**Status**: 400 Bad Request ❌

#### Test 4: Weak Password

**Body:**
```json
{
  "name": "Weak Pass User",
  "username": "weak123",
  "email": "weak@example.com",
  "password": "123",  // ❌ Too short (< 6 characters)
  "role": "User"
}
```

**Send** karo.

**Expected Response:**
```json
{
  "success": false,
  "message": "User creation failed",
  "data": null,
  "errors": ["Password must be at least 6 characters long"]
}
```

**Status**: 400 Bad Request ❌

Ye **business rule** hai UserService mein!

### ✅ Step 6: Create Valid User

Ab ek aur valid user banate hain testing ke liye:

```json
{
  "name": "Sara Khan",
  "username": "sara123",
  "email": "sara@example.com",
  "password": "sara123456",
  "phone": "03009876543",
  "role": "User"
}
```

**Send** → **201 Created** ✅

**Save request** (Ctrl + S)

---

## ✏️ Part 5: Test PUT (Update User) API (30 min)

### 🆕 Step 1: Add Update User Request

1. **New request** banao: **"Update User"**

2. **Method**: **PUT**

3. **URL**: `https://localhost:7001/api/Users/2`
   - `2` yahan user ID hai (Ali Ahmed ko update karenge)

### 📝 Step 2: Setup Request Body

1. **Body tab** → **raw** → **JSON**

2. **Body:**
```json
{
  "name": "Ali Ahmed Updated",
  "email": "ali.updated@example.com",
  "phone": "03111222333",
  "website": "https://ali-updated.dev",
  "companyName": "Tech Solutions Updated",
  "jobTitle": "Senior Software Engineer",
  "city": "Lahore",
  "role": "User"
}
```

**Note:** UpdateUserDto mein password field nahi hai (Day 2 mein design kiya tha)

### 🚀 Step 3: Send Request

**Send** click karo.

#### Expected Response

```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": 2,
    "name": "Ali Ahmed Updated",
    "username": "ali123",  // Username change nahi hua
    "email": "ali.updated@example.com",  // ✅ Updated
    "phone": "03111222333",  // ✅ Updated
    "role": "User",
    "isActive": true,
    "createdDate": "2024-01-15T11:45:00",
    "updatedDate": "2024-01-15T12:15:00"  // ✅ Automatically set
  },
  "errors": null
}
```

**Status**: 200 OK ✅

**Notice:**
- `updatedDate` automatically set hua (Service Layer logic)
- Username change nahi hua (UpdateUserDto mein nahi hai)
- Email successfully update hua

### ❌ Step 4: Test Business Rules

#### Test 1: Duplicate Email (Different User)

User ID **2** ko update karte waqt User ID **1** (Admin) ka email use karo:

**URL**: `https://localhost:7001/api/Users/2`

**Body:**
```json
{
  "name": "Ali Ahmed",
  "email": "admin@example.com",  // ❌ Admin ka email
  "phone": "03001234567",
  "role": "User"
}
```

**Send** karo.

**Expected Response:**
```json
{
  "success": false,
  "message": "User update failed",
  "data": null,
  "errors": ["Email already exists"]
}
```

**Status**: 400 Bad Request ❌

Business rule working! ✅

#### Test 2: Update Non-Existent User

**URL**: `https://localhost:7001/api/Users/999`

**Body:**
```json
{
  "name": "Ghost User",
  "email": "ghost@example.com",
  "role": "User"
}
```

**Send** karo.

**Expected Response:**
```json
{
  "success": false,
  "message": "User not found",
  "data": null,
  "errors": null
}
```

**Status**: 404 Not Found ❌

### ✅ Step 5: Update Sara Khan

User ID **3** (Sara) ko update karo:

**URL**: `https://localhost:7001/api/Users/3`

**Body:**
```json
{
  "name": "Sara Khan Updated",
  "email": "sara.updated@example.com",
  "phone": "03119998888",
  "city": "Islamabad",
  "role": "User"
}
```

**Send** → **200 OK** ✅

**Save request** (Ctrl + S)

---

## 🗑️ Part 6: Test DELETE API & Error Scenarios (30 min)

### 🆕 Step 1: Add Delete User Request

1. **New request** banao: **"Delete User"**

2. **Method**: **DELETE**

3. **URL**: `https://localhost:7001/api/Users/3`

**Note:** DELETE request mein Body nahi hota!

### 🚀 Step 2: Delete Sara Khan

1. **URL**: `https://localhost:7001/api/Users/3` (Sara Khan)

2. **Send** click karo

#### Expected Response

```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": null,
  "errors": null
}
```

**Status**: 200 OK ✅

### ✅ Step 3: Verify Soft Delete

Ab **Get All Users** request run karo (jo pehle banaya tha):

**Collections** → **Users** → **"Get All Users"** → **Send**

**Response:**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Admin User",
      ...
    },
    {
      "id": 2,
      "name": "Ali Ahmed Updated",
      ...
    }
    // Sara Khan (ID 3) list mein NAHI hai! ✅
  ],
  "errors": null
}
```

**Explanation:**
- Sara delete nahi hui physically database se
- Uska `IsActive = false` set ho gaya (Soft Delete)
- GetAllUsersAsync() sirf `IsActive = true` users return karta hai
- Database mein data hai but API response mein nahi (recovery possible hai)

### 🛡️ Step 4: Test Admin Protection

Ab Admin user (ID 1) ko delete karne ki koshish karo:

1. **Delete User** request mein
2. **URL**: `https://localhost:7001/api/Users/1`
3. **Send** karo

#### Expected Response

```json
{
  "success": false,
  "message": "User deletion failed",
  "data": null,
  "errors": ["Cannot delete admin user"]
}
```

**Status**: 400 Bad Request ❌

**Business rule working!** Admin ko delete nahi kar sakte (Day 5 Service Layer logic) ✅

### ❌ Step 5: Delete Non-Existent User

**URL**: `https://localhost:7001/api/Users/999`

**Send** karo.

**Expected Response:**
```json
{
  "success": false,
  "message": "User not found",
  "data": null,
  "errors": null
}
```

**Status**: 404 Not Found ❌

### ✅ Step 6: Delete Ali Ahmed

1. **URL**: `https://localhost:7001/api/Users/2` (Ali Ahmed)
2. **Send** karo
3. **Status**: 200 OK ✅

Ab **Get All Users** run karo → Sirf Admin user (ID 1) dikhe ga!

**Save request** (Ctrl + S)

---

## 🌍 Part 7: Environment Variables Setup (30 min)

### 🤔 Problem: Hard-coded URLs

Abhi tak har request mein full URL likh rahe hain:
```
https://localhost:7001/api/Users
https://localhost:7001/api/Users/1
https://localhost:7001/api/Users/search
```

**Problems:**
1. Agar port change ho (7001 → 5000), har request update karni padegi
2. Agar deployment ho (localhost → api.example.com), sab change karo
3. Development/Production environment switch karna mushkil

**Solution:** Environment Variables! 🎯

### 🆕 Step 1: Create Environment

1. **Left sidebar** mein **"Environments"** icon click karo (⚙ gear icon ke paas)
   - Ya top-right corner mein **"No Environment"** dropdown click karo

2. **"+"** button ya **"Create Environment"** click karo

3. **Environment name**: **"Development - Local"**

4. **Variables section** mein add karo:

| Variable | Initial Value | Current Value |
|----------|---------------|---------------|
| `baseUrl` | `https://localhost:7001` | `https://localhost:7001` |

**Note:** Initial Value = Team ke saath share hoti hai, Current Value = Local use (private)

5. **Save** button click karo (Ctrl + S)

### 🔧 Step 2: Use Environment Variable in Requests

Ab requests mein hard-coded URL replace karo:

#### Get All Users Request

1. **Collections** → **Users** → **"Get All Users"** open karo

2. **URL** ko change karo:

**Before:**
```
https://localhost:7001/api/Users
```

**After:**
```
{{baseUrl}}/api/Users
```

**Syntax:** `{{variableName}}` - Double curly braces

3. **Save** (Ctrl + S)

4. **Send** karo → Same response milega! ✅

**Magic:** Postman automatically `{{baseUrl}}` ko `https://localhost:7001` se replace kar deta hai!

#### Update All Requests

Sab requests mein URL update karo:

1. **Get User by ID**: `{{baseUrl}}/api/Users/1`
2. **Search Users**: `{{baseUrl}}/api/Users/search?query=admin`
3. **Create User**: `{{baseUrl}}/api/Users`
4. **Update User**: `{{baseUrl}}/api/Users/2`
5. **Delete User**: `{{baseUrl}}/api/Users/3`

**Save all** (har request mein Ctrl + S)

### 🌐 Step 3: Create Production Environment

Future ke liye production environment bhi bana lete hain:

1. **"+"** button click karo (new environment)

2. **Environment name**: **"Production"**

3. **Variables:**

| Variable | Initial Value |
|----------|---------------|
| `baseUrl` | `https://api.example.com` |

4. **Save**

### 🔄 Step 4: Switch Between Environments

**Top-right corner** mein environment dropdown hai:

**Development use karne ke liye:**
- Dropdown → **"Development - Local"** select karo
- Ab sab requests `https://localhost:7001` use karengi

**Production use karne ke liye:**
- Dropdown → **"Production"** select karo
- Ab sab requests `https://api.example.com` use karengi

**Current:** **"Development - Local"** selected rakho

### 💡 Bonus: Add More Variables

Environment mein aur variables bhi add kar sakte ho:

```
adminEmail = admin@example.com
testPassword = test123456
apiVersion = v1
```

Usage:
```json
{
  "email": "{{adminEmail}}",
  "password": "{{testPassword}}"
}
```

---

## 🚀 Part 8: Advanced Features & Collection Export (30 min)

### 📊 Feature 1: Tests (Assertions)

Postman mein automatic testing likh sakte hain!

#### Example: GET All Users Test

1. **Get All Users** request open karo

2. **Tests tab** click karo (Send button ke neeche)

3. **Tests script** likho:

```javascript
// Test 1: Status code should be 200
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Test 2: Response time should be less than 500ms
pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

// Test 3: Response should be JSON
pm.test("Response is JSON", function () {
    pm.response.to.be.json;
});

// Test 4: Success should be true
pm.test("Success is true", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.success).to.be.true;
});

// Test 5: Data array should exist
pm.test("Data array exists", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.be.an('array');
});

// Test 6: Admin user should exist
pm.test("Admin user exists", function () {
    var jsonData = pm.response.json();
    var adminUser = jsonData.data.find(u => u.role === 'admin');
    pm.expect(adminUser).to.exist;
});
```

4. **Save** (Ctrl + S)

5. **Send** button click karo

#### Test Results

Send karne ke baad **response section** mein **"Test Results"** tab dikhega:

```
✓ Status code is 200
✓ Response time is less than 500ms
✓ Response is JSON
✓ Success is true
✓ Data array exists
✓ Admin user exists

6/6 tests passed ✅
```

Agar koi test fail ho:
```
✗ Status code is 200 (Expected 200 but got 404)
```

### 🏃 Feature 2: Collection Runner

Poore collection ko ek saath test karo!

1. **Collection** pe right-click karo "AdminPanelAPI - CRUD Operations"

2. **"Run collection"** select karo

3. **Runner window** khulega:

```
┌──────────────────────────────────────┐
│  Run AdminPanelAPI - CRUD Operations │
├──────────────────────────────────────┤
│  ☑ Get All Users                     │
│  ☑ Get User by ID                    │
│  ☑ Search Users                      │
│  ☑ Create User                       │
│  ☑ Update User                       │
│  ☑ Delete User                       │
│                                      │
│  Iterations: 1                       │
│  Delay: 0 ms                         │
│                                      │
│         [Run AdminPanelAPI...]       │
└──────────────────────────────────────┘
```

4. **"Run AdminPanelAPI..."** button click karo

5. **Results:**

```
6 requests | 6 passed | 0 failed
Total time: 234ms
```

Har request ke test results dikhenge!

### 📤 Feature 3: Export Collection

Apni team ke saath collection share karne ke liye:

#### Export

1. **Collection** pe right-click karo

2. **"Export"** select karo

3. **Format**: **Collection v2.1** (recommended) select karo

4. **Export** button click karo

5. **File location** select karo:
   ```
   Desktop\AdminPanelAPI.postman_collection.json
   ```

6. **Save** karo

**Result:** JSON file ban gayi jisko kisi ko bhi bhej sakte ho!

#### Import (Team Member Perspective)

Agar koi tumhe collection file bheje:

1. **Collections** section mein **"Import"** button click karo

2. **File** drag-drop karo ya **"Upload Files"** click karo

3. **Select file**: `AdminPanelAPI.postman_collection.json`

4. **Import** button click karo

**Result:** Poora collection with all requests import ho jayega!

### 🌍 Feature 4: Export Environment

Environment bhi share kar sakte ho:

1. **Environments** icon click karo

2. **"Development - Local"** environment ke paas **"..."** (3 dots) click karo

3. **"Export"** select karo

4. **Save as**: `Development-Local.postman_environment.json`

**Team workflow:**
```
Developer 1 → Creates collection + environment → Exports both
Developer 2 → Imports collection + environment → Same setup instantly!
```

### 📝 Feature 5: Documentation

Postman automatic documentation generate karta hai:

1. **Collection** pe click karo (edit mode mein)

2. **"..."** (3 dots) → **"View Documentation"** select karo

3. **Browser** mein documentation khulega with:
   - All endpoints
   - Request examples
   - Response examples
   - Automatic code snippets (cURL, JavaScript, Python, etc.)

### 🔗 Feature 6: Generate Code

Kisi bhi request ka code generate karo:

1. **Request** open karo (e.g., "Get All Users")

2. **Send button ke neeche** **"</>"** (Code) icon click karo

3. **Language** select karo:
   - **JavaScript - Fetch**
   - **C# - RestSharp**
   - **cURL**
   - **Python - Requests**
   - etc.

#### Example: JavaScript - Fetch

```javascript
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("https://localhost:7001/api/Users", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

Copy karke frontend mein use kar sakte ho!

#### Example: C# - HttpClient

```csharp
var client = new HttpClient();
var request = new HttpRequestMessage(HttpMethod.Get, "https://localhost:7001/api/Users");
var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
var result = await response.Content.ReadAsStringAsync();
Console.WriteLine(result);
```

---

## 📊 Complete Testing Checklist

### ✅ All Tests Summary

Aaj humne ye sab test kiya:

#### GET Endpoints
- ✅ Get all users (200 OK)
- ✅ Get user by ID (200 OK)
- ✅ Get user with invalid ID (404 Not Found)
- ✅ Search users with query (200 OK)
- ✅ Search with no results (200 OK, empty array)

#### POST Endpoint
- ✅ Create valid user (201 Created)
- ✅ Create with duplicate email (400 Bad Request)
- ✅ Create with invalid email format (400 Bad Request)
- ✅ Create with missing required fields (400 Bad Request)
- ✅ Create with weak password (400 Bad Request)

#### PUT Endpoint
- ✅ Update valid user (200 OK)
- ✅ Update with duplicate email (400 Bad Request)
- ✅ Update non-existent user (404 Not Found)

#### DELETE Endpoint
- ✅ Delete valid user (200 OK, soft delete)
- ✅ Delete admin user (400 Bad Request, protection)
- ✅ Delete non-existent user (404 Not Found)
- ✅ Verify soft delete (deleted user not in GET list)

#### Advanced Features
- ✅ Environment variables setup
- ✅ Collection organization
- ✅ Tests/Assertions added
- ✅ Collection runner executed
- ✅ Collection exported

---

## 🎯 Postman Best Practices

### 1. Collection Organization

**Good Structure:**
```
📁 AdminPanelAPI - CRUD Operations
  📁 Users
    📄 Get All Users
    📄 Get User by ID
    📄 Search Users
    📄 Create User
    📄 Update User
    📄 Delete User
  📁 Products (future)
    📄 Get All Products
    📄 Create Product
    ...
  📁 Authentication (future)
    📄 Login
    📄 Register
    ...
```

**Bad Structure:**
```
📁 My Collection
  📄 Request 1
  📄 Request 2
  📄 New Request
  📄 Copy of Request 1
```

### 2. Request Naming

**Good Names:**
```
✅ Get All Users
✅ Create User - Valid
✅ Create User - Duplicate Email Error
✅ Delete User - Admin Protection
```

**Bad Names:**
```
❌ Request 1
❌ Test
❌ New Request
❌ Copy
```

### 3. Environment Variables

**Good Variables:**
```
✅ {{baseUrl}}/api/Users
✅ {{adminEmail}}
✅ {{apiKey}}
```

**Bad Practice:**
```
❌ https://localhost:7001/api/Users (hard-coded)
❌ admin@example.com (direct value in request)
```

### 4. Comments & Descriptions

Har request mein description add karo:

```
Description:
Retrieves all active users from the database.
Returns users with IsActive = true only.
Ordered by CreatedDate descending.

Business Rules:
- Soft-deleted users not included
- Admin user always present
```

### 5. Tests

Critical endpoints pe tests add karo:

```javascript
// Always test status code
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Test response structure
pm.test("Response has required fields", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('success');
    pm.expect(jsonData).to.have.property('data');
});
```

---

## 💻 Practice Tasks

### ⭐ Task 1: Create "Products" Collection (Easy)

Products ke liye complete CRUD collection banao:

**Endpoints:**
1. GET `/api/Products` - Get all products
2. GET `/api/Products/{id}` - Get product by ID
3. POST `/api/Products` - Create product
4. PUT `/api/Products/{id}` - Update product
5. DELETE `/api/Products/{id}` - Delete product

**Product Model:**
```json
{
  "name": "Laptop",
  "description": "Gaming laptop",
  "price": 150000,
  "stock": 10,
  "category": "Electronics"
}
```

**Steps:**
1. Visual Studio mein Product model banao
2. ProductsController banao
3. Postman mein "Products" folder banao
4. Sab requests test karo

### ⭐⭐ Task 2: Pre-request Scripts (Medium)

Login request ke liye authentication token automatically set karne wala script banao:

**Scenario:**
1. Login request bhejo
2. Token response mein milta hai
3. Token automatically environment variable mein save ho
4. Baaki requests automatically token use karein

**Pre-request Script (Login request mein):**
```javascript
// Will be used in Week 5 (JWT Authentication)
pm.environment.set("authToken", "");
```

**Tests Script (Login request mein):**
```javascript
// Extract token from response
var jsonData = pm.response.json();
if (jsonData.token) {
    pm.environment.set("authToken", jsonData.token);
    console.log("Token saved:", jsonData.token);
}
```

**Usage in other requests:**
```
Authorization: Bearer {{authToken}}
```

### ⭐⭐⭐ Task 3: Data-Driven Testing (Hard)

CSV file se multiple users create karo automatically:

1. **CSV file banao** (`users.csv`):
```csv
name,username,email,password
Ahmed Ali,ahmed123,ahmed@example.com,ahmed123456
Fatima Khan,fatima123,fatima@example.com,fatima123456
Hassan Raza,hassan123,hassan@example.com,hassan123456
```

2. **Collection Runner mein:**
   - **Data file** select karo (users.csv)
   - **Iterations**: 3
   - **"Create User" request** run hoga 3 times
   - Har iteration mein different data use hoga

3. **Request body mein variables use karo:**
```json
{
  "name": "{{name}}",
  "username": "{{username}}",
  "email": "{{email}}",
  "password": "{{password}}",
  "role": "User"
}
```

4. **Run** karo → 3 users automatically create ho jayenge!

---

## 📝 Summary

### Aaj Kya Seekha? ✅

1. **Postman Basics**
   - Installation aur setup
   - Interface overview
   - Collections aur folders

2. **CRUD Testing**
   - GET requests (all, by ID, search)
   - POST request with body
   - PUT request with ID + body
   - DELETE request

3. **Error Testing**
   - Validation errors (400 Bad Request)
   - Not found errors (404 Not Found)
   - Business rule errors (duplicate email, admin protection)

4. **Environment Variables**
   - Development/Production environments
   - `{{baseUrl}}` usage
   - Environment switching

5. **Advanced Features**
   - Tests/Assertions
   - Collection Runner
   - Export/Import
   - Code generation

### Project Status 🚀

```
AdminPanelAPI Project:
├── ✅ Models (User.cs)
├── ✅ DTOs (UserDto, CreateUserDto, UpdateUserDto)
├── ✅ DbContext (ApplicationDbContext)
├── ✅ Migrations (Database created)
├── ✅ Service Layer (IUserService, UserService)
├── ✅ Controllers (UsersController - thin)
├── ✅ All CRUD APIs working
├── ✅ Business rules enforced
├── ✅ Error handling implemented
└── ✅ Postman collection created & tested ← TODAY!
```

### Tools

 Ready 🛠️

| Tool | Purpose | Status |
|------|---------|--------|
| Visual Studio | Backend development | ✅ Ready |
| SQL Server | Database | ✅ Running |
| SSMS | Database management | ✅ Installed |
| Swagger | API documentation & quick testing | ✅ Built-in |
| Postman | Professional API testing | ✅ Configured |

### APIs Summary 📡

| Method | Endpoint | Purpose | Status |
|--------|----------|---------|--------|
| GET | `/api/Users` | Get all active users | ✅ Tested |
| GET | `/api/Users/{id}` | Get user by ID | ✅ Tested |
| GET | `/api/Users/search?query=` | Search users | ✅ Tested |
| POST | `/api/Users` | Create new user | ✅ Tested |
| PUT | `/api/Users/{id}` | Update user | ✅ Tested |
| DELETE | `/api/Users/{id}` | Soft delete user | ✅ Tested |

---

## 🔄 Swagger vs Postman - When to Use What?

### Use Swagger When:
✅ Development phase mein quick testing chahiye  
✅ API documentation automatically chahiye  
✅ Backend developer ho aur local testing kar rahe ho  
✅ New endpoint banaya aur immediately test karna hai  

### Use Postman When:
✅ Professional testing environment chahiye  
✅ Requests save karke reuse karna hai  
✅ Multiple environments (Dev/QA/Prod) switch karni hain  
✅ Team ke saath collection share karna hai  
✅ Automated tests likhne hain  
✅ Frontend developer ho aur backend APIs test kar rahe ho  

**Best Practice:**  
Development mein Swagger, Testing/QA mein Postman dono use karo! 🎯

---

## 🎓 Pro Tips

### 1. Keyboard Shortcuts

```
Ctrl + S          = Save request
Ctrl + Enter      = Send request
Ctrl + K          = Open search
Ctrl + N          = New request
Ctrl + E          = Edit environment
Alt + Shift + F   = Format JSON (in body)
```

### 2. Quick JSON Formatting

Request body mein JSON paste karne ke baad:
- **Ctrl + A** (select all)
- **Alt + Shift + F** (format)
- JSON automatically beautiful format ho jayega!

### 3. Console for Debugging

**View** → **Show Postman Console** (Alt + Ctrl + C)

Console mein:
- Request details dikhte hain
- Response headers
- Errors
- Console.log statements (from Tests scripts)

### 4. Request History

Left sidebar mein **"History"** tab:
- Sab previous requests saved hain
- Koi request collection mein save nahi kiya? History se find karo!
- Right-click → "Save to collection"

### 5. Duplicate Requests

Request pe right-click → **"Duplicate"**

Use case: "Create User" ko duplicate karo aur "Create User - Error Cases" banao

### 6. Variables Everywhere

Variables sirf URL mein nahi, kahin bhi use kar sakte ho:

**Headers mein:**
```
Authorization: Bearer {{token}}
```

**Body mein:**
```json
{
  "email": "{{testEmail}}",
  "password": "{{testPassword}}"
}
```

**Tests mein:**
```javascript
var baseUrl = pm.environment.get("baseUrl");
console.log("Testing against:", baseUrl);
```

### 7. Save Everything

Har change ke baad **Ctrl + S** press karo!

**Orange dot** = Unsaved changes  
**No dot** = Saved ✅

---

## 🐛 Common Problems & Solutions

### Problem 1: "Could not get any response"

**Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:7001
```

**Solutions:**
1. Visual Studio mein project running hai? Check karo!
2. Backend running hona chahiye (green play button pressed)
3. Browser mein Swagger khul raha hai? Check: `https://localhost:7001/swagger`
4. Firewall block to nahi kar raha?

### Problem 2: "SSL Certificate Verification Failed"

**Error:**
```
Error: Unable to verify the first certificate
```

**Solution:**
1. **Postman Settings** (⚙ gear icon → Settings)
2. **General tab**
3. **"SSL certificate verification"** toggle **OFF** karo (disabled)
4. **Restart Postman**

**Note:** Development environment mein OK hai, production mein enable karna chahiye!

### Problem 3: "400 Bad Request" - Validation Errors

**Error:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": { ... }
}
```

**Solutions:**
1. Request body format check karo (JSON format correct hai?)
2. Required fields missing to nahi?
3. Email format valid hai?
4. Data types check karo (string vs number)

### Problem 4: Response mein HTML aa raha hai

**Response:**
```html
<!DOCTYPE html>
<html>
...
</html>
```

**Reason:** Backend exception throw ho raha hai aur error page return ho raha hai

**Solutions:**
1. Visual Studio console check karo (red error messages)
2. Swagger se same request bhejo (detailed error dikhega)
3. Backend stop karke phir se run karo

### Problem 5: Environment Variable Not Working

**Error:** `{{baseUrl}}` literally text mein show ho raha hai request mein

**Solution:**
1. Top-right corner mein environment selected hai? ("No Environment" nahi hona chahiye)
2. Variable name exactly match kar raha hai? (`baseUrl` vs `baseURL`)
3. Environment save kiya? (Ctrl + S)

### Problem 6: Tests Failing

**Error:**
```
✗ Status code is 200 (Expected 200 but got 404)
```

**Solutions:**
1. Request URL check karo (typo?)
2. Backend running hai?
3. Database mein data hai?
4. Expected behavior change ho gayi (test update karo)?

---

## 🎬 Tomorrow's Preview: Day 7 - Full-Stack Integration

Kal hum backend ko frontend se connect karenge! 🚀

**Topics:**
- CORS (Cross-Origin Resource Sharing) enable karna
- Frontend .env configuration
- React se APIs call karna
- Complete end-to-end testing
- Week 4 review

**Preview:**

```csharp
// Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder => builder
            .WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader());
});
```

```javascript
// Frontend (React)
const response = await fetch('https://localhost:7001/api/Users');
const data = await response.json();
setUsers(data.data);
```

Frontend aur backend connected ho jayega! 🎉

---

## ✅ Today's Checklist

Before moving to Day 7, ensure:

- [ ] Postman installed aur setup ✅
- [ ] "AdminPanelAPI - CRUD Operations" collection created ✅
- [ ] "Users" folder with 6 requests (GET all, GET by ID, Search, POST, PUT, DELETE) ✅
- [ ] Environment variable `{{baseUrl}}` setup ✅
- [ ] All GET requests tested (200 OK, 404 Not Found) ✅
- [ ] POST request tested (201 Created, validation errors) ✅
- [ ] PUT request tested (200 OK, business rules) ✅
- [ ] DELETE request tested (soft delete, admin protection) ✅
- [ ] Tests/Assertions added and passing ✅
- [ ] Collection exported (`AdminPanelAPI.postman_collection.json`) ✅

---

## 🎯 Key Takeaways

1. **Postman = Professional API Testing Tool** - Industry standard, har company use karti hai
2. **Collections = Organized Testing** - Folders mein requests save karo, team ke saath share karo
3. **Environment Variables = Flexibility** - `{{baseUrl}}` use karo, hard-coded URLs avoid karo
4. **Tests = Automated Validation** - Tests likhne ka matlab manual checking nahi karni padegi
5. **Swagger + Postman = Perfect Combo** - Development mein Swagger, Testing mein Postman

**Congratulations! 🎉**  
Aapne professional API testing complete kar li! Backend APIs production-ready testing phase mein hain!

**Next:** Full-stack integration with React frontend! Weekend pe completed project ready hoga! 🚀

---

