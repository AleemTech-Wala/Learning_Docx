# 📅 Week 3 - Day 1: REST API Basics & HTTP Methods

## 🎯 Today's Goal
**Aaj hum backend ke sath connection ka pehla step seekhenge - REST API kya hai aur kaise kaam karta hai!**

**Today's Focus:**
- ✅ REST API concepts (complete beginner level)
- ✅ HTTP Methods (GET, POST, PUT, DELETE)
- ✅ JSON data format
- ✅ API endpoints understanding
- ✅ Request & Response structure
- ✅ Postman installation & basics
- ✅ Testing real APIs

---

## 📚 Session Breakdown (4-5 Hours)

| Time | Topic | Duration |
|------|-------|----------|
| **Hour 1** | REST API Basics & Concepts | 60 min |
| **Hour 2** | HTTP Methods Deep Dive | 60 min |
| **Hour 3** | JSON & API Structure | 60 min |
| **Hour 4** | Postman Installation & Testing | 60 min |
| **Hour 5** | Practice & Mini Project | 60 min |

---

## 🌐 Part 1: REST API Basics (60 minutes)

### 📖 What is REST API?

**Simple Urdu/English:**
API matlab "Application Programming Interface" - yeh ek tareeqa hai jis se do applications aapas mein baat karte hain.

**Real-Life Example:**
Sochein aap ek restaurant mein hain:
- **You (Frontend):** Customer jo order deta hai
- **Waiter (API):** Jo aapka order kitchen tak le jata hai
- **Kitchen (Backend):** Jo food banata hai
- **Waiter (API):** Food wapas aap tak lata hai

```
┌─────────────┐      Request      ┌─────────────┐      ┌─────────────┐
│             │  ───────────────>  │             │ ───> │             │
│  Frontend   │                    │  REST API   │      │   Backend   │
│  (React)    │  <───────────────  │             │ <─── │  (Database) │
└─────────────┘      Response      └─────────────┘      └─────────────┘
```

---

### 🤔 Why Do We Need REST API?

**1. Separation of Concerns**
```
Frontend (React) → Sirf UI dikhata hai
Backend (API) → Data manage karta hai
Database → Data store karta hai
```

**2. Multiple Platforms**
```
Same API can be used by:
├── Website (React)
├── Mobile App (Android/iOS)
├── Desktop App
└── Other Services
```

**3. Security**
```
❌ Direct database access (dangerous)
✅ API through authentication (safe)
```

---

### 📚 REST API - Complete Definition

**REST** = **RE**presentational **S**tate **T**ransfer

**Key Points:**
1. **Client-Server:** Frontend aur Backend alag hote hain
2. **Stateless:** Har request independent hoti hai
3. **Cacheable:** Data cache ho sakta hai
4. **Uniform Interface:** Standard rules follow karta hai

**Simple Meaning:**
REST ek standard tareeqa hai APIs banane ka. Sab log same rules follow karte hain, isliye samajhna easy hai.

---

### 🌍 Real-World API Examples

#### Example 1: Weather App
```
You: "Karachi ka weather kya hai?"
API: "Temperature 28°C, Sunny"
```

#### Example 2: Facebook
```
You: "Meri profile dikhao"
API: "Name, Photo, Friends list"
```

#### Example 3: Shopping
```
You: "Cart mein product add karo"
API: "Added! Total: Rs. 5000"
```

---

## 🔤 Part 2: HTTP Methods (60 minutes)

### 📖 What are HTTP Methods?

**Simple Urdu/English:**
HTTP Methods batate hain ke aap API se **KYA** karna chahte ho.

**4 Main Methods:**
1. **GET** → Data **read** karna (dekhna)
2. **POST** → Data **create** karna (naya banana)
3. **PUT** → Data **update** karna (change karna)
4. **DELETE** → Data **delete** karna (mitana)

---

### 1️⃣ GET Method

**Purpose:** Data **read/fetch** karna

**Real-Life Example:**
```
Library mein ja kar book dekhna
❌ Book change nahi hoti
✅ Sirf dekh rahe ho
```

**Technical Example:**
```http
GET /api/users
→ Sab users ki list lao

GET /api/users/5
→ ID 5 wale user ki details lao

GET /api/products?category=electronics
→ Electronics category ke products lao
```

**Characteristics:**
- ✅ Data sirf read hota hai
- ✅ Database mein koi change nahi
- ✅ Safe method hai
- ✅ Multiple baar call kar sakte ho

**Code Example:**
```javascript
// GET Request Example
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => console.log(data));

// Output:
// [
//   { id: 1, name: 'John', email: 'john@example.com' },
//   { id: 2, name: 'Jane', email: 'jane@example.com' }
// ]
```

---

### 2️⃣ POST Method

**Purpose:** Naya data **create** karna

**Real-Life Example:**
```
Form bharkar new account banana
✅ Naya data database mein save hota hai
```

**Technical Example:**
```http
POST /api/users
Body: { name: "Ahmed", email: "ahmed@example.com" }
→ Naya user create karo
```

**Characteristics:**
- ✅ Naya data create hota hai
- ✅ Database mein record add hota hai
- ❌ Not safe (data change hota hai)
- ✅ Body mein data bhejte hain

**Code Example:**
```javascript
// POST Request Example
fetch('https://jsonplaceholder.typicode.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Ahmed Ali',
    email: 'ahmed@example.com',
    phone: '+92 300 1234567'
  })
})
  .then(response => response.json())
  .then(data => console.log('Created:', data));
```

---

### 3️⃣ PUT Method

**Purpose:** Existing data ko **update** karna

**Real-Life Example:**
```
Apna profile edit karna
✅ Purana data change ho jata hai
```

**Technical Example:**
```http
PUT /api/users/5
Body: { name: "Ahmed Khan", email: "ahmed.khan@example.com" }
→ User ID 5 ko update karo
```

**Characteristics:**
- ✅ Existing data update hota hai
- ✅ Complete resource replace hota hai
- ❌ Not safe (data change hota hai)
- ✅ ID zaroori hai

**Code Example:**
```javascript
// PUT Request Example
fetch('https://jsonplaceholder.typicode.com/users/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    id: 1,
    name: 'Ahmed Khan (Updated)',
    email: 'ahmed.updated@example.com',
    phone: '+92 300 9999999'
  })
})
  .then(response => response.json())
  .then(data => console.log('Updated:', data));
```

---

### 4️⃣ DELETE Method

**Purpose:** Data **delete** karna

**Real-Life Example:**
```
Apna account permanently delete karna
❌ Data wapas nahi aata
```

**Technical Example:**
```http
DELETE /api/users/5
→ User ID 5 ko delete karo
```

**Characteristics:**
- ✅ Data permanently delete hota hai
- ❌ Not safe (data change hota hai)
- ✅ Usually ID zaroori hai
- ⚠️ Dangerous operation

**Code Example:**
```javascript
// DELETE Request Example
fetch('https://jsonplaceholder.typicode.com/users/1', {
  method: 'DELETE'
})
  .then(response => {
    if (response.ok) {
      console.log('Deleted successfully');
    }
  });
```

---

### 📊 HTTP Methods Comparison

| Method | Purpose | Database Change | Safe | Body Required |
|--------|---------|----------------|------|---------------|
| **GET** | Read data | ❌ No | ✅ Yes | ❌ No |
| **POST** | Create new | ✅ Yes | ❌ No | ✅ Yes |
| **PUT** | Update existing | ✅ Yes | ❌ No | ✅ Yes |
| **DELETE** | Delete data | ✅ Yes | ❌ No | ❌ No |

---

### 🎯 CRUD Operations

**CRUD** = **C**reate, **R**ead, **U**pdate, **D**elete

```
┌──────────────┬────────────────┬─────────────────┐
│ CRUD         │ HTTP Method    │ SQL Equivalent  │
├──────────────┼────────────────┼─────────────────┤
│ Create       │ POST           │ INSERT          │
│ Read         │ GET            │ SELECT          │
│ Update       │ PUT            │ UPDATE          │
│ Delete       │ DELETE         │ DELETE          │
└──────────────┴────────────────┴─────────────────┘
```

**Real Example - Users Management:**
```javascript
// CREATE - Add new user
POST /api/users

// READ - Get all users
GET /api/users

// READ - Get single user
GET /api/users/5

// UPDATE - Edit user
PUT /api/users/5

// DELETE - Remove user
DELETE /api/users/5
```

---

## 📄 Part 3: JSON Data Format (60 minutes)

### 📖 What is JSON?

**JSON** = **J**ava**S**cript **O**bject **N**otation

**Simple Urdu/English:**
JSON ek tareeqa hai data ko store aur transfer karne ka. Yeh JavaScript objects ki tarah dikhta hai.

**Why JSON?**
- ✅ Human-readable (insaan parh sakta hai)
- ✅ Lightweight (kam size)
- ✅ Every language support karta hai
- ✅ API mein standard format

---

### 📝 JSON Syntax Rules

**Rules:**
1. Data key-value pairs mein hota hai
2. Keys **"double quotes"** mein honi chahiye
3. Values string, number, boolean, array, object ho sakti hain
4. Commas se separate karte hain
5. Curly braces `{}` use karte hain

**Example:**
```json
{
  "name": "Ahmed",
  "age": 25,
  "isActive": true,
  "email": "ahmed@example.com"
}
```

---

### 🔢 JSON Data Types

#### 1. String
```json
{
  "name": "Ahmed Ali",
  "email": "ahmed@example.com"
}
```

#### 2. Number
```json
{
  "age": 25,
  "price": 1299.99,
  "quantity": 5
}
```

#### 3. Boolean
```json
{
  "isActive": true,
  "isVerified": false
}
```

#### 4. Array
```json
{
  "colors": ["red", "green", "blue"],
  "numbers": [1, 2, 3, 4, 5]
}
```

#### 5. Object (Nested)
```json
{
  "user": {
    "name": "Ahmed",
    "address": {
      "city": "Karachi",
      "country": "Pakistan"
    }
  }
}
```

#### 6. Null
```json
{
  "middleName": null
}
```

---

### 📋 Complete JSON Example

```json
{
  "id": 1,
  "name": "Ahmed Ali",
  "email": "ahmed@example.com",
  "age": 25,
  "isActive": true,
  "roles": ["user", "moderator"],
  "address": {
    "street": "Main Street",
    "city": "Karachi",
    "country": "Pakistan"
  },
  "orders": [
    {
      "orderId": 101,
      "product": "Laptop",
      "price": 85000
    },
    {
      "orderId": 102,
      "product": "Mouse",
      "price": 1200
    }
  ],
  "middleName": null
}
```

---

### 🔄 JSON in JavaScript

#### Convert JavaScript Object to JSON
```javascript
const user = {
  name: 'Ahmed',
  age: 25,
  email: 'ahmed@example.com'
};

// Object to JSON string
const jsonString = JSON.stringify(user);
console.log(jsonString);
// Output: {"name":"Ahmed","age":25,"email":"ahmed@example.com"}
```

#### Convert JSON to JavaScript Object
```javascript
const jsonString = '{"name":"Ahmed","age":25}';

// JSON string to Object
const user = JSON.parse(jsonString);
console.log(user.name); // Output: Ahmed
console.log(user.age);  // Output: 25
```

---

## 🌍 Part 4: API Endpoints & Structure (60 minutes)

### 📖 What is an API Endpoint?

**Simple Urdu/English:**
Endpoint ek URL hota hai jahan se aap data request karte ho.

**Structure:**
```
https://api.example.com/users
│                       │    │
│                       │    └─ Resource (kya chahiye)
│                       └────── Domain
└────────────────────────────── Protocol
```

---

### 📍 Endpoint Examples

#### Base URL
```
https://api.myapp.com/api
```

#### Resource Endpoints
```
GET    /api/users              → All users
GET    /api/users/5            → User with ID 5
POST   /api/users              → Create new user
PUT    /api/users/5            → Update user 5
DELETE /api/users/5            → Delete user 5

GET    /api/products           → All products
GET    /api/products/10        → Product with ID 10
POST   /api/products           → Create new product

GET    /api/orders             → All orders
GET    /api/orders/20          → Order with ID 20
```

---

### 🔗 URL Parameters

#### 1. Path Parameters
```
GET /api/users/5
                │
                └─ 5 is path parameter (user ID)
```

#### 2. Query Parameters
```
GET /api/users?role=admin&status=active
               │
               └─ Query parameters (filter data)
```

**Examples:**
```javascript
// Search
GET /api/products?search=laptop

// Filter
GET /api/products?category=electronics&price=5000

// Pagination
GET /api/users?page=2&limit=10

// Sorting
GET /api/products?sort=price&order=desc
```

---

### 📨 Request Structure

**Complete HTTP Request consists of:**

```http
POST /api/users HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer token123

{
  "name": "Ahmed Ali",
  "email": "ahmed@example.com"
}
```

**Parts:**
1. **Method:** POST
2. **Endpoint:** /api/users
3. **Headers:** Content-Type, Authorization
4. **Body:** JSON data

---

### 📬 Response Structure

**Complete HTTP Response:**

```http
HTTP/1.1 200 OK
Content-Type: application/json
Date: Mon, 09 Feb 2026 10:00:00 GMT

{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 123,
    "name": "Ahmed Ali",
    "email": "ahmed@example.com",
    "createdAt": "2026-02-09T10:00:00Z"
  }
}
```

**Parts:**
1. **Status Code:** 200 OK
2. **Headers:** Content-Type, Date
3. **Body:** JSON response

---

### 🎨 HTTP Status Codes

#### ✅ Success (2xx)
```
200 OK              → Request successful
201 Created         → Resource created successfully
204 No Content      → Success but no data to return
```

#### 🔄 Redirection (3xx)
```
301 Moved           → Resource moved permanently
304 Not Modified    → Data not changed (cache use karo)
```

#### ❌ Client Errors (4xx)
```
400 Bad Request     → Invalid request data
401 Unauthorized    → Login required
403 Forbidden       → Permission denied
404 Not Found       → Resource not found
```

#### 💥 Server Errors (5xx)
```
500 Internal Error  → Server-side error
502 Bad Gateway     → Server connection issue
503 Service Down    → Server temporarily down
```

---

### 📊 Complete API Flow Example

```
Step 1: User clicks "Get Users" button
        ↓
Step 2: Frontend sends request
        GET /api/users
        ↓
Step 3: API receives request
        ↓
Step 4: API checks authentication
        ✅ Valid token
        ↓
Step 5: API queries database
        SELECT * FROM Users
        ↓
Step 6: Database returns data
        [user1, user2, user3...]
        ↓
Step 7: API formats response
        {
          "success": true,
          "data": [users array]
        }
        ↓
Step 8: Frontend receives response
        Status: 200 OK
        ↓
Step 9: Frontend displays data
        Show users in table
```

---

## 🔧 Part 5: Postman Installation & Testing (60 minutes)

### 📖 What is Postman?

**Simple Urdu/English:**
Postman ek tool hai jisse aap APIs ko test kar sakte ho **BINA code likhe**.

**Why Postman?**
- ✅ APIs ko easily test karo
- ✅ Different methods try karo
- ✅ Response dekho
- ✅ Collections save karo
- ✅ Team ke sath share karo

---

### 📥 Step 1: Download & Install Postman

**Website:** https://www.postman.com/downloads/

**Installation Steps:**

1. **Go to website**
   ```
   https://www.postman.com/downloads/
   ```

2. **Download for Windows**
   ```
   Click "Download" button
   Windows 64-bit version download hoga
   ```

3. **Install**
   ```
   - Downloaded file run karo
   - Installation automatic hai
   - Koi settings change karne ki zaroorat nahi
   ```

4. **Create Account (Optional)**
   ```
   - Email se sign up kar sakte ho
   - Ya "Skip for now" click karo
   ```

---

### 🚀 Step 2: Postman Interface Tour

**Main Parts:**

```
┌─────────────────────────────────────────────┐
│  Sidebar        │  Request Area             │
│  ├─ Workspace   │  ┌──────────────────────┐ │
│  ├─ Collections │  │ GET   [URL bar]      │ │
│  ├─ History     │  ├──────────────────────┤ │
│  └─ Favorites   │  │ Params │ Body │ Etc  │ │
│                 │  ├──────────────────────┤ │
│                 │  │                      │ │
│                 │  │  Response Area       │ │
│                 │  │                      │ │
│                 │  └──────────────────────┘ │
└─────────────────────────────────────────────┘
```

**Key Elements:**
1. **Method Dropdown:** GET, POST, PUT, DELETE
2. **URL Bar:** API endpoint yahan enter karo
3. **Tabs:** Params, Authorization, Headers, Body
4. **Send Button:** Request bhejna
5. **Response Area:** Result yahan dikhta hai

---

### 🧪 Step 3: Testing Your First API

#### Example 1: Simple GET Request

**API:** https://jsonplaceholder.typicode.com/users

**Steps:**

1. **Select Method**
   ```
   Dropdown se "GET" select karo
   ```

2. **Enter URL**
   ```
   https://jsonplaceholder.typicode.com/users
   ```

3. **Click Send**
   ```
   Blue "Send" button click karo
   ```

4. **View Response**
   ```json
   [
     {
       "id": 1,
       "name": "Leanne Graham",
       "username": "Bret",
       "email": "Sincere@april.biz"
     },
     {
       "id": 2,
       "name": "Ervin Howell",
       "username": "Antonette",
       "email": "Shanna@melissa.tv"
     }
   ]
   ```

5. **Check Status**
   ```
   Status: 200 OK ✅
   Time: 234ms
   Size: 5.6 KB
   ```

---

#### Example 2: GET Single User

**API:** https://jsonplaceholder.typicode.com/users/1

**Steps:**

1. Method: **GET**
2. URL: `https://jsonplaceholder.typicode.com/users/1`
3. Click **Send**

**Response:**
```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "city": "Gwenborough"
  }
}
```

---

#### Example 3: POST Request (Create User)

**API:** https://jsonplaceholder.typicode.com/users

**Steps:**

1. **Select Method**
   ```
   POST
   ```

2. **Enter URL**
   ```
   https://jsonplaceholder.typicode.com/users
   ```

3. **Go to Body Tab**
   ```
   Click "Body" tab
   Select "raw"
   Select "JSON" from dropdown
   ```

4. **Enter JSON Data**
   ```json
   {
     "name": "Ahmed Ali",
     "username": "ahmed123",
     "email": "ahmed@example.com",
     "phone": "+92 300 1234567"
   }
   ```

5. **Click Send**

**Response:**
```json
{
  "id": 11,
  "name": "Ahmed Ali",
  "username": "ahmed123",
  "email": "ahmed@example.com",
  "phone": "+92 300 1234567"
}
```

**Status:** 201 Created ✅

---

#### Example 4: PUT Request (Update User)

**API:** https://jsonplaceholder.typicode.com/users/1

**Steps:**

1. Method: **PUT**
2. URL: `https://jsonplaceholder.typicode.com/users/1`
3. Body Tab → raw → JSON
4. Data:
   ```json
   {
     "id": 1,
     "name": "Ahmed Khan (Updated)",
     "email": "ahmed.updated@example.com"
   }
   ```
5. Send

**Response:**
```json
{
  "id": 1,
  "name": "Ahmed Khan (Updated)",
  "email": "ahmed.updated@example.com"
}
```

---

#### Example 5: DELETE Request

**API:** https://jsonplaceholder.typicode.com/users/1

**Steps:**

1. Method: **DELETE**
2. URL: `https://jsonplaceholder.typicode.com/users/1`
3. Send

**Response:**
```json
{}
```

**Status:** 200 OK ✅

---

### 📚 Postman Collections

**What are Collections?**
Related APIs ko group mein organize karna.

**Create Collection:**

1. **Sidebar → Collections → + icon**
2. **Name:** "User Management APIs"
3. **Save**

**Add Request to Collection:**

1. **Create request**
2. **Save button click karo**
3. **Select collection**
4. **Give request name:** "Get All Users"

**Benefits:**
- ✅ Organized
- ✅ Easy to find
- ✅ Share with team
- ✅ Run all requests together

---

## 🎯 Part 6: Practice APIs (60 minutes)

### 🌐 Free Testing APIs

#### 1. JSONPlaceholder
```
Base URL: https://jsonplaceholder.typicode.com

Resources:
/posts      → Blog posts (100)
/comments   → Comments (500)
/albums     → Albums (100)
/photos     → Photos (5000)
/todos      → Todos (200)
/users      → Users (10)
```

#### 2. ReqRes
```
Base URL: https://reqres.in/api

Resources:
/users      → Users data
/login      → Test login
/register   → Test registration
```

---

### 🧪 Practice Tasks

#### Task 1: Get All Posts (⭐)

```
Method: GET
URL: https://jsonplaceholder.typicode.com/posts
Expected: 100 posts
```

#### Task 2: Get Single Post (⭐)

```
Method: GET
URL: https://jsonplaceholder.typicode.com/posts/1
Expected: Post with ID 1
```

#### Task 3: Create New Post (⭐⭐)

```
Method: POST
URL: https://jsonplaceholder.typicode.com/posts
Body:
{
  "title": "My First Post",
  "body": "This is post content",
  "userId": 1
}
Expected: 201 Created
```

#### Task 4: Update Post (⭐⭐⭐)

```
Method: PUT
URL: https://jsonplaceholder.typicode.com/posts/1
Body:
{
  "id": 1,
  "title": "Updated Title",
  "body": "Updated content",
  "userId": 1
}
Expected: Updated post
```

#### Task 5: Delete Post (⭐⭐)

```
Method: DELETE
URL: https://jsonplaceholder.typicode.com/posts/1
Expected: 200 OK
```

#### Task 6: Get Posts by User (⭐⭐⭐)

```
Method: GET
URL: https://jsonplaceholder.typicode.com/posts?userId=1
Expected: All posts of user 1
```

#### Task 7: Get Comments of a Post (⭐⭐⭐)

```
Method: GET
URL: https://jsonplaceholder.typicode.com/posts/1/comments
Expected: All comments of post 1
```

---

## 📝 Part 7: Real-World Scenarios

### Scenario 1: E-Commerce Product API

```javascript
// Get all products
GET /api/products

// Get products by category
GET /api/products?category=electronics

// Search products
GET /api/products?search=laptop

// Get single product
GET /api/products/123

// Create new product (Admin only)
POST /api/products
Body: {
  "name": "Laptop Dell",
  "price": 85000,
  "category": "Electronics",
  "stock": 10
}

// Update product
PUT /api/products/123
Body: {
  "price": 80000,
  "stock": 8
}

// Delete product
DELETE /api/products/123
```

---

### Scenario 2: User Authentication API

```javascript
// Register new user
POST /api/auth/register
Body: {
  "name": "Ahmed",
  "email": "ahmed@example.com",
  "password": "secure123"
}

// Login
POST /api/auth/login
Body: {
  "email": "ahmed@example.com",
  "password": "secure123"
}
Response: {
  "token": "jwt_token_here",
  "user": { id: 1, name: "Ahmed" }
}

// Get current user profile
GET /api/auth/profile
Header: Authorization: Bearer jwt_token_here

// Logout
POST /api/auth/logout
```

---

### Scenario 3: Order Management API

```javascript
// Get all orders
GET /api/orders

// Get user's orders
GET /api/orders?userId=5

// Get single order
GET /api/orders/101

// Create new order
POST /api/orders
Body: {
  "userId": 5,
  "products": [
    { "productId": 10, "quantity": 2 },
    { "productId": 15, "quantity": 1 }
  ],
  "totalAmount": 50000
}

// Update order status
PUT /api/orders/101
Body: {
  "status": "Shipped"
}

// Cancel order
DELETE /api/orders/101
```

---

## 🎨 Part 8: API Design Best Practices

### 1. Use Proper HTTP Methods
```
✅ GET /api/users           → Fetch users
❌ POST /api/getUsers       → Wrong

✅ POST /api/users          → Create user
❌ GET /api/createUser      → Wrong

✅ PUT /api/users/5         → Update user
❌ POST /api/updateUser/5   → Wrong

✅ DELETE /api/users/5      → Delete user
❌ GET /api/deleteUser/5    → Wrong
```

---

### 2. Use Nouns, Not Verbs
```
✅ /api/users
❌ /api/getUsers

✅ /api/products
❌ /api/getAllProducts

✅ /api/orders
❌ /api/fetchOrders
```

---

### 3. Use Plural Names
```
✅ /api/users
❌ /api/user

✅ /api/products
❌ /api/product
```

---

### 4. Use Proper Status Codes
```javascript
// Success
200 OK          → Data fetched
201 Created     → Resource created
204 No Content  → Deleted successfully

// Client Errors
400 Bad Request → Invalid data
401 Unauthorized → Not logged in
403 Forbidden    → No permission
404 Not Found    → Resource not found

// Server Errors
500 Server Error → Backend issue
```

---

### 5. Consistent Response Format
```javascript
// Success Response
{
  "success": true,
  "message": "Users fetched successfully",
  "data": [
    { id: 1, name: "Ahmed" },
    { id: 2, name: "Fatima" }
  ]
}

// Error Response
{
  "success": false,
  "message": "User not found",
  "error": "USER_NOT_FOUND"
}
```

---

## 📚 Part 9: Common API Patterns

### Pattern 1: Pagination
```
GET /api/users?page=1&limit=10

Response:
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

### Pattern 2: Sorting
```
GET /api/products?sort=price&order=asc
GET /api/products?sort=name&order=desc
```

### Pattern 3: Filtering
```
GET /api/users?role=admin&status=active
GET /api/products?category=electronics&price=5000
```

### Pattern 4: Search
```
GET /api/users?search=ahmed
GET /api/products?q=laptop
```

### Pattern 5: Nested Resources
```
GET /api/users/5/orders          → User 5 ke orders
GET /api/posts/10/comments       → Post 10 ke comments
GET /api/categories/3/products   → Category 3 ke products
```

---

## 🎯 Today's Mini Project

### Project: Test Complete User CRUD API

**Objective:** Postman mein ek complete collection banao aur test karo.

**Steps:**

1. **Create Collection**
   ```
   Name: "User Management API"
   ```

2. **Add GET All Users**
   ```
   Method: GET
   URL: https://jsonplaceholder.typicode.com/users
   Save as: "Get All Users"
   ```

3. **Add GET Single User**
   ```
   Method: GET
   URL: https://jsonplaceholder.typicode.com/users/1
   Save as: "Get User by ID"
   ```

4. **Add POST Create User**
   ```
   Method: POST
   URL: https://jsonplaceholder.typicode.com/users
   Body:
   {
     "name": "Your Name",
     "username": "your_username",
     "email": "you@example.com",
     "phone": "+92 300 1234567"
   }
   Save as: "Create New User"
   ```

5. **Add PUT Update User**
   ```
   Method: PUT
   URL: https://jsonplaceholder.typicode.com/users/1
   Body:
   {
     "id": 1,
     "name": "Updated Name",
     "email": "updated@example.com"
   }
   Save as: "Update User"
   ```

6. **Add DELETE User**
   ```
   Method: DELETE
   URL: https://jsonplaceholder.typicode.com/users/1
   Save as: "Delete User"
   ```

7. **Test All Requests**
   ```
   Run each request
   Check status codes
   Verify responses
   ```

8. **Export Collection**
   ```
   Collection → ... → Export
   Save as JSON file
   ```

---

## ✅ Day 1 Checklist

### **Concepts Understanding:**
- [ ] REST API kya hai samajh gaya
- [ ] HTTP methods ka purpose clear hai
- [ ] GET, POST, PUT, DELETE ka difference pata hai
- [ ] JSON format samajh gaya
- [ ] API endpoints kaise bante hain
- [ ] Request aur Response structure clear hai
- [ ] Status codes ka meaning pata hai

### **Postman:**
- [ ] Postman download aur install ho gaya
- [ ] Interface samajh gaya
- [ ] GET request test kiya
- [ ] POST request test kiya
- [ ] PUT request test kiya
- [ ] DELETE request test kiya
- [ ] Collection banaya

### **Practice:**
- [ ] JSONPlaceholder API test kiya
- [ ] All CRUD operations try kiye
- [ ] Different endpoints test kiye
- [ ] Responses samjhe

### **Next Day Preparation:**
- [ ] Concepts clear hain
- [ ] Postman comfortable hai
- [ ] APIs test kar sakte ho
- [ ] Ready for React integration

---

## 🎓 Summary

### Today You Learned:

**1. REST API Basics**
```
✅ API kya hai
✅ Client-Server architecture
✅ Why we need APIs
✅ REST principles
```

**2. HTTP Methods**
```
✅ GET → Read data
✅ POST → Create data
✅ PUT → Update data
✅ DELETE → Delete data
✅ CRUD operations
```

**3. JSON Format**
```
✅ JSON syntax
✅ Data types
✅ Nested objects
✅ Arrays in JSON
✅ JSON.stringify()
✅ JSON.parse()
```

**4. API Structure**
```
✅ Endpoints
✅ Path parameters
✅ Query parameters
✅ Request structure
✅ Response structure
✅ Status codes
```

**5. Postman**
```
✅ Installation
✅ Interface
✅ Testing APIs
✅ Collections
✅ Saving requests
```

---

## 📖 Important Terms to Remember

| Term | Meaning |
|------|---------|
| **API** | Application Programming Interface |
| **REST** | Representational State Transfer |
| **HTTP** | HyperText Transfer Protocol |
| **JSON** | JavaScript Object Notation |
| **CRUD** | Create, Read, Update, Delete |
| **Endpoint** | API ka URL |
| **Request** | Client se server ko message |
| **Response** | Server se client ko message |
| **Status Code** | Response ki success/failure |
| **Header** | Request/Response metadata |
| **Body** | Actual data |

---

## 🔜 Tomorrow's Preview

**Day 2: Axios & API Integration in React**

**What's Coming:**
- ✅ Axios installation
- ✅ Making API calls from React
- ✅ useEffect hook
- ✅ Async/Await
- ✅ Loading states
- ✅ Error handling
- ✅ Fetch real data in Users page

**Get Ready:**
Tomorrow hum apne React project mein real APIs connect karenge! 🚀

---

## 💡 Pro Tips

### Tip 1: Always Check Status Codes
```javascript
200 ✅ → Success
201 ✅ → Created
400 ❌ → Bad request
401 ❌ → Unauthorized
404 ❌ → Not found
500 ❌ → Server error
```

### Tip 2: Use Proper Method
```
✅ GET for reading
✅ POST for creating
✅ PUT for updating
✅ DELETE for deleting
```

### Tip 3: Test in Postman First
```
API ko pehle Postman mein test karo
✅ Working dekho
✅ Response dekho
Then React mein integrate karo
```

### Tip 4: Save Collections
```
Postman mein collections banao
Easy to organize
Team ke sath share karo
```

---

## 🎯 Practice Homework

### Task 1: Explore More APIs (⭐⭐)

Test these APIs in Postman:

```
1. Posts API
   GET https://jsonplaceholder.typicode.com/posts

2. Comments API
   GET https://jsonplaceholder.typicode.com/comments

3. Albums API
   GET https://jsonplaceholder.typicode.com/albums

4. Photos API
   GET https://jsonplaceholder.typicode.com/photos

5. Todos API
   GET https://jsonplaceholder.typicode.com/todos
```

---

### Task 2: Create Posts Collection (⭐⭐⭐)

Create a complete Postman collection for Posts:

```
1. Get All Posts
2. Get Single Post
3. Create New Post
4. Update Post
5. Delete Post
6. Get Posts by User
7. Get Comments of Post
```

---

### Task 3: Understanding Exercise (⭐⭐⭐⭐)

Write answers in your own words:

1. REST API kya hai?
2. GET aur POST mein kya difference hai?
3. JSON kyu use karte hain?
4. Status code 404 ka kya matlab hai?
5. Endpoint kya hota hai?

---

### Task 4: Design Your Own API (⭐⭐⭐⭐⭐)

Design endpoints for a Book Management System:

```
Books:
- Get all books
- Get single book
- Create book
- Update book
- Delete book
- Search books
- Filter by author
- Filter by category

Authors:
- Get all authors
- Get single author
- Get books by author
```

Write all endpoints in notebook.

---

## ❓ Common Problems & Solutions

### Problem 1: Postman Request Timeout

**Error:** "Could not get response"

**Solution:**
```
✅ Check internet connection
✅ Verify URL is correct
✅ Try different API
✅ Check firewall settings
```

---

### Problem 2: 404 Not Found

**Error:** "404 Not Found"

**Solution:**
```
✅ Check URL spelling
✅ Verify endpoint exists
✅ Check path parameters
✅ Try in browser first
```

---

### Problem 3: 401 Unauthorized

**Error:** "401 Unauthorized"

**Solution:**
```
✅ Check if API requires authentication
✅ Add Authorization header
✅ Verify token is valid
✅ Try public API first
```

---

### Problem 4: JSON Parse Error

**Error:** "Unexpected token"

**Solution:**
```
✅ Check JSON syntax
✅ All keys in "quotes"
✅ Commas properly placed
✅ No trailing commas
✅ Use JSON validator
```

---

## 📚 Additional Resources

**Learn More:**

1. **REST API Tutorial:**
   - https://restfulapi.net/

2. **HTTP Methods:**
   - https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods

3. **JSON:**
   - https://www.json.org/

4. **Postman Docs:**
   - https://learning.postman.com/docs/

5. **Free Test APIs:**
   - https://jsonplaceholder.typicode.com/
   - https://reqres.in/
   - https://fakestoreapi.com/

---

## 🎊 Congratulations!

**Aaj aapne REST API ki duniya mein pehla kadam rakha! 🎉**

**You Now Know:**
- ✅ What is REST API
- ✅ HTTP Methods (GET, POST, PUT, DELETE)
- ✅ JSON format
- ✅ API endpoints
- ✅ Request/Response structure
- ✅ Status codes
- ✅ Postman usage

**Tomorrow:** React mein APIs integrate karenge! 🚀

**Keep Learning! Keep Growing! 💻✨**
