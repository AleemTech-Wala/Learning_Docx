# 📅 Week 3 - Day 2: Axios Installation & GET Requests

## 🎯 Today's Goal
**Aaj hum Axios install karenge aur apne React project mein pehli baar REAL API se data fetch karenge!**

**Today's Focus:**
- ✅ Axios installation
- ✅ Axios vs Fetch API
- ✅ GET requests with Axios
- ✅ API service file structure
- ✅ Fetch data from JSONPlaceholder
- ✅ Display real data in Users page
- ✅ Loading states
- ✅ Error handling

---

## 📚 Session Breakdown (4-5 Hours)

| Time | Topic | Duration |
|------|-------|----------|
| **Hour 1** | Axios Introduction & Installation | 60 min |
| **Hour 2** | GET Requests & Basic Syntax | 60 min |
| **Hour 3** | API Service File Structure | 60 min |
| **Hour 4** | Integrate Real Data in Users Page | 60 min |
| **Hour 5** | Loading States & Error Handling | 60 min |

---

## 📦 Part 1: What is Axios? (30 minutes)

### 📖 What is Axios?

**Simple Urdu/English:**
Axios ek JavaScript library hai jo API calls ko **bahut easy** bana deti hai. Yeh ek promise-based HTTP client hai.

**Real-Life Example:**
```
Axios = Ek smart delivery service
✅ Aap order dete ho (request)
✅ Woh package laata hai (response)
✅ Problems handle karta hai (errors)
✅ Aapko sirf result milta hai
```

---

### 🤔 Why Use Axios?

**Problem with Plain JavaScript:**
```javascript
// ❌ Old Way (fetch) - Bohat zyada code
fetch('https://api.example.com/users')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network error');
    }
    return response.json();  // Extra step
  })
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

**Solution with Axios:**
```javascript
// ✅ New Way (axios) - Simple aur clean
axios.get('https://api.example.com/users')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

### ⚡ Axios Benefits

| Feature | Fetch API | Axios |
|---------|-----------|-------|
| **JSON Parsing** | Manual (.json()) | ✅ Automatic |
| **Request Cancel** | ❌ Complex | ✅ Easy |
| **Timeout** | ❌ No built-in | ✅ Yes |
| **Interceptors** | ❌ No | ✅ Yes |
| **Progress** | ❌ Complex | ✅ Easy |
| **Browser Support** | Modern only | ✅ All browsers |

---

### 🎯 When to Use Axios?

**Use Axios When:**
- ✅ Making API calls in React
- ✅ Need request/response interceptors
- ✅ Want automatic JSON parsing
- ✅ Need request cancellation
- ✅ Building production apps

**Use Fetch When:**
- ✅ Simple one-time requests
- ✅ Don't want extra dependency
- ✅ Modern browsers only

**Our Choice: Axios** ✅
- Professional projects mein Axios use karte hain
- Easy to maintain
- More features

---

## 📥 Part 2: Axios Installation (30 minutes)

### Step 1: Open Your Project Terminal

**Location:** Your React project folder

```bash
# Navigate to your project (if not already there)
cd F:\.NET_Short\admin-panel
```

---

### Step 2: Install Axios

**Command:**
```bash
npm install axios
```

**What This Does:**
- Downloads Axios library
- Adds to `package.json`
- Installs in `node_modules`

**Expected Output:**
```
added 1 package, and audited 234 packages in 5s

50 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

---

### Step 3: Verify Installation

**Check package.json:**
```json
{
  "dependencies": {
    "axios": "^1.6.7",
    "react": "^18.2.0",
    "@mui/material": "^5.15.0"
  }
}
```

**Test Import:**
Create a test file or open `src/App.jsx`:

```javascript
import axios from 'axios';

console.log(axios); // Should not give error
```

---

## 🔧 Part 3: Axios Basic Syntax (60 minutes)

### 📖 Basic Structure

**Import Axios:**
```javascript
import axios from 'axios';
```

**Basic GET Request:**
```javascript
axios.get('URL')
  .then(response => {
    // Success - Data milega
    console.log(response.data);
  })
  .catch(error => {
    // Error - Agar koi problem ho
    console.error(error);
  });
```

---

### 📊 Response Object Structure

**When you make a request, Axios returns:**

```javascript
{
  data: {...},           // Actual data (JSON already parsed)
  status: 200,           // HTTP status code
  statusText: 'OK',      // Status message
  headers: {...},        // Response headers
  config: {...},         // Request configuration
  request: {...}         // Original request
}
```

**Most Important: `response.data`**
```javascript
axios.get('URL')
  .then(response => {
    console.log(response.data);  // Yeh actual data hai
  });
```

---

### 🧪 Example 1: Simple GET Request

**Code:**
```javascript
import axios from 'axios';

// Get all users
axios.get('https://jsonplaceholder.typicode.com/users')
  .then(response => {
    console.log('Data:', response.data);
    console.log('Status:', response.status);
    console.log('First User:', response.data[0]);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

**Output:**
```javascript
Data: [
  { id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz', ... },
  { id: 2, name: 'Ervin Howell', email: 'Shanna@melissa.tv', ... },
  ...
]
Status: 200
First User: { id: 1, name: 'Leanne Graham', ... }
```

---

### 🧪 Example 2: GET Single Item

**Code:**
```javascript
// Get user with ID 1
axios.get('https://jsonplaceholder.typicode.com/users/1')
  .then(response => {
    const user = response.data;
    console.log('User Name:', user.name);
    console.log('User Email:', user.email);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

**Output:**
```
User Name: Leanne Graham
User Email: Sincere@april.biz
```

---

### 🧪 Example 3: GET with Query Parameters

**Code:**
```javascript
// Get posts by user ID
axios.get('https://jsonplaceholder.typicode.com/posts', {
  params: {
    userId: 1
  }
})
  .then(response => {
    console.log('Posts by User 1:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

**Generated URL:**
```
https://jsonplaceholder.typicode.com/posts?userId=1
```

---

### ⚡ Async/Await Syntax (Modern Way)

**Problem with .then():**
```javascript
// Code zyada nested ho jata hai
axios.get('url1')
  .then(response1 => {
    axios.get('url2')
      .then(response2 => {
        axios.get('url3')
          .then(response3 => {
            // Nested hell 😱
          });
      });
  });
```

**Solution: Async/Await** ✅
```javascript
// Clean aur readable
async function fetchData() {
  try {
    const response1 = await axios.get('url1');
    const response2 = await axios.get('url2');
    const response3 = await axios.get('url3');
    // Clean code 😊
  } catch (error) {
    console.error(error);
  }
}
```

---

### 🧪 Example 4: Async/Await GET Request

**Code:**
```javascript
import axios from 'axios';

// Function banao with async
async function getUsers() {
  try {
    // await use karo
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    
    console.log('Users:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

// Function call karo
getUsers();
```

---

### 📖 Async/Await Rules

**Rule 1: async keyword use karo**
```javascript
async function myFunction() {
  // function ke sath async likh do
}
```

**Rule 2: await sirf async function mein**
```javascript
// ✅ Correct
async function getData() {
  const response = await axios.get('url');
}

// ❌ Wrong
function getData() {
  const response = await axios.get('url');  // Error!
}
```

**Rule 3: try-catch for errors**
```javascript
async function getData() {
  try {
    const response = await axios.get('url');
  } catch (error) {
    console.error(error);
  }
}
```

---

## 📁 Part 4: API Service File Structure (60 minutes)

### 📖 Why Create API Service File?

**Problem without Service File:**
```javascript
// ❌ Har component mein URLs hard-coded
// Users.jsx
axios.get('https://jsonplaceholder.typicode.com/users')

// Products.jsx
axios.get('https://jsonplaceholder.typicode.com/products')

// Orders.jsx
axios.get('https://jsonplaceholder.typicode.com/orders')

// Problem: URL change ho toh har jagah change karna padega
```

**Solution: Service File** ✅
```javascript
// ✅ Ek hi jagah sab APIs
// src/services/api.js
export const getUsers = () => axios.get('/users');
export const getProducts = () => axios.get('/products');

// Components mein sirf import
import { getUsers } from '../services/api';
```

---

### 📁 Step 1: Create Services Folder

**Structure:**
```
src/
├── components/
├── pages/
├── data/
├── services/          ← New folder
│   └── api.js         ← New file
├── App.jsx
└── main.jsx
```

**Create Folder:**
```bash
# Terminal mein
cd src
mkdir services
cd services
```

Or manually create `src/services` folder.

---

### Step 2: Create API Service File

**File:** `src/services/api.js`

```javascript
// Import Axios
import axios from 'axios';

// Base URL (Yeh API ka main address)
const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Axios instance banao (optional but professional)
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json'
  }
});

// ==========================================
// USER APIs
// ==========================================

// Get all users
export const getAllUsers = () => {
  return api.get('/users');
};

// Get single user by ID
export const getUserById = (id) => {
  return api.get(`/users/${id}`);
};

// Create new user
export const createUser = (userData) => {
  return api.post('/users', userData);
};

// Update user
export const updateUser = (id, userData) => {
  return api.put(`/users/${id}`, userData);
};

// Delete user
export const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
};

// ==========================================
// POSTS APIs
// ==========================================

// Get all posts
export const getAllPosts = () => {
  return api.get('/posts');
};

// Get posts by user
export const getPostsByUser = (userId) => {
  return api.get('/posts', {
    params: { userId }
  });
};

// ==========================================
// PRODUCTS APIs (for future)
// ==========================================

// Get all products
export const getAllProducts = () => {
  return api.get('/products');
};

// ==========================================
// EXPORT default instance
// ==========================================

export default api;
```

---

### 📖 Understanding the Code

**1. Base URL:**
```javascript
const BASE_URL = 'https://jsonplaceholder.typicode.com';
// Yeh sab requests ka starting address hai
```

**2. Axios Instance:**
```javascript
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});
```
**Benefits:**
- Har request mein BASE_URL automatic add hoga
- Timeout set kar sakte ho
- Default headers
- Configuration ek jagah

**3. API Functions:**
```javascript
export const getAllUsers = () => {
  return api.get('/users');
};
```
**What it does:**
- `/users` ko BASE_URL ke sath combine karta hai
- Final URL: `https://jsonplaceholder.typicode.com/users`
- Promise return karta hai

---

### 🧪 How to Use Service File

**In any component:**

```javascript
// Import functions
import { getAllUsers, getUserById } from '../services/api';

// Use in component
async function fetchUsers() {
  try {
    const response = await getAllUsers();
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

// Get single user
async function fetchUser(id) {
  try {
    const response = await getUserById(id);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
```

---

## 🎯 Part 5: Integrate Real Data in Users Page (60 minutes)

### 📁 Current Project Structure

```
src/
├── services/
│   └── api.js              ← Just created
├── pages/
│   └── Users.jsx           ← We'll update this
├── data/
│   └── usersData.js        ← Old static data
└── App.jsx
```

---

### Step 1: Update Users.jsx (Complete)

**File:** `src/pages/Users.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  IconButton,
  Button,
  Stack,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  Tooltip
} from '@mui/material';
import {
  Edit,
  Delete,
  Visibility,
  Search,
  Add,
  Refresh
} from '@mui/icons-material';

// Import API function
import { getAllUsers } from '../services/api';

function Users() {
  
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ==========================================
  // FETCH USERS DATA (useEffect)
  // ==========================================
  
  useEffect(() => {
    fetchUsers();
  }, []); // Empty array = runs only once on component mount

  // ==========================================
  // API CALL FUNCTION
  // ==========================================
  
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // API call
      const response = await getAllUsers();
      
      // Set data
      setUsers(response.data);
      setFilteredUsers(response.data);
      
      console.log('Users fetched:', response.data);
      
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to fetch users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // SEARCH HANDLER
  // ==========================================
  
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query)
    );

    setFilteredUsers(filtered);
  };

  // ==========================================
  // ACTION HANDLERS (Dummy for now)
  // ==========================================
  
  const handleView = (user) => {
    console.log('View user:', user);
    alert(`Viewing ${user.name}`);
  };

  const handleEdit = (user) => {
    console.log('Edit user:', user);
    alert(`Edit functionality coming soon for ${user.name}`);
  };

  const handleDelete = (user) => {
    console.log('Delete user:', user);
    if (window.confirm(`Delete ${user.name}?`)) {
      alert('Delete functionality coming soon');
    }
  };

  // ==========================================
  // LOADING STATE
  // ==========================================
  
  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh' 
      }}>
        <Stack alignItems="center" spacing={2}>
          <CircularProgress size={60} />
          <Typography variant="h6" color="text.secondary">
            Loading users...
          </Typography>
        </Stack>
      </Box>
    );
  }

  // ==========================================
  // ERROR STATE
  // ==========================================
  
  if (error) {
    return (
      <Box>
        <Alert 
          severity="error" 
          action={
            <Button color="inherit" size="small" onClick={fetchUsers}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  // ==========================================
  // MAIN RENDER
  // ==========================================
  
  return (
    <Box>
      
      {/* Page Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 3 
      }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Users Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Users: {users.length} | Showing: {filteredUsers.length}
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button 
            variant="outlined" 
            startIcon={<Refresh />}
            onClick={fetchUsers}
          >
            Refresh
          </Button>
          <Button 
            variant="contained" 
            startIcon={<Add />}
          >
            Add User
          </Button>
        </Stack>
      </Box>

      {/* Main Card */}
      <Card>
        <CardContent>
          
          {/* Search Bar */}
          <TextField
            fullWidth
            placeholder="Search by name, email, or username..."
            value={searchQuery}
            onChange={handleSearch}
            sx={{ marginBottom: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />

          {/* Users Table */}
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: 'grey.100' }}>
                <TableRow>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>User</strong></TableCell>
                  <TableCell><strong>Username</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Phone</strong></TableCell>
                  <TableCell><strong>Website</strong></TableCell>
                  <TableCell align="center"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id} hover>
                      
                      {/* ID */}
                      <TableCell>
                        <Chip label={user.id} size="small" color="primary" />
                      </TableCell>

                      {/* User Info */}
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            {user.name.charAt(0)}
                          </Avatar>
                          <Typography variant="body2" fontWeight="medium">
                            {user.name}
                          </Typography>
                        </Box>
                      </TableCell>

                      {/* Username */}
                      <TableCell>
                        <Chip 
                          label={`@${user.username}`} 
                          size="small" 
                          variant="outlined"
                        />
                      </TableCell>

                      {/* Email */}
                      <TableCell>{user.email}</TableCell>

                      {/* Phone */}
                      <TableCell>{user.phone}</TableCell>

                      {/* Website */}
                      <TableCell>
                        <a 
                          href={`https://${user.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ color: '#1976d2', textDecoration: 'none' }}
                        >
                          {user.website}
                        </a>
                      </TableCell>

                      {/* Actions */}
                      <TableCell align="center">
                        <Stack direction="row" spacing={0.5} justifyContent="center">
                          <Tooltip title="View Details">
                            <IconButton 
                              size="small" 
                              color="primary"
                              onClick={() => handleView(user)}
                            >
                              <Visibility fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit User">
                            <IconButton 
                              size="small" 
                              color="info"
                              onClick={() => handleEdit(user)}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete User">
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={() => handleDelete(user)}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography variant="body2" color="text.secondary" sx={{ padding: 4 }}>
                        No users found matching "{searchQuery}"
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Users;
```

---

### 📖 Understanding the New Code

#### 1. **useEffect Hook**

**What is useEffect?**
```javascript
useEffect(() => {
  // Yeh code component load hone par chalega
  fetchUsers();
}, []); // Empty array = sirf ek baar chalega
```

**Simple Explanation:**
- Component load ho → useEffect chalta hai
- API call hoti hai
- Data aata hai → State update hoti hai
- Component re-render hota hai → Data dikhta hai

**Dependency Array `[]`:**
```javascript
useEffect(() => {...}, []);     // Sirf ek baar (component mount)
useEffect(() => {...}, [count]); // Jab count change ho
useEffect(() => {...});          // Har render par (avoid this)
```

---

#### 2. **Loading State**

```javascript
const [loading, setLoading] = useState(true);

// Before API call
setLoading(true);

// After API call
setLoading(false);

// In render
if (loading) {
  return <CircularProgress />;
}
```

**Why?**
- User ko pata chale data load ho raha hai
- Better UX (User Experience)
- Professional look

---

#### 3. **Error State**

```javascript
const [error, setError] = useState(null);

try {
  const response = await getAllUsers();
} catch (err) {
  setError('Failed to fetch users');
}

if (error) {
  return <Alert severity="error">{error}</Alert>;
}
```

**Why?**
- Agar API fail ho toh user ko batao
- Retry option do
- Better error handling

---

#### 4. **Async Function**

```javascript
const fetchUsers = async () => {
  try {
    setLoading(true);
    const response = await getAllUsers();
    setUsers(response.data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);  // Har halat mein loading false
  }
};
```

**try-catch-finally:**
- `try` → Normal code
- `catch` → Agar error ho
- `finally` → Har halat mein chalega

---

### 🎯 Step 2: Test the Application

**1. Start Development Server:**
```bash
npm run dev
```

**2. Open Browser:**
```
http://localhost:5173
```

**3. Navigate to Users Page:**
```
Sidebar → Users
```

**4. Check Console:**
```
F12 → Console tab
Should see: "Users fetched: [array of 10 users]"
```

**5. Test Features:**
```
✅ Loading spinner dikhe
✅ 10 users load ho
✅ Search kaam kare
✅ Refresh button kaam kare
✅ Actions buttons click ho
```

---

## 🔄 Part 6: Understanding Data Flow (30 minutes)

### 📊 Complete Flow Diagram

```
Step 1: Component Loads
        ↓
Step 2: useEffect Runs
        ↓
Step 3: fetchUsers() Called
        ↓
Step 4: setLoading(true)
        ↓
Step 5: getAllUsers() API Call
        ↓
Step 6: Request goes to JSONPlaceholder
        ↓
Step 7: Response comes back
        ↓
Step 8: setUsers(response.data)
        ↓
Step 9: setLoading(false)
        ↓
Step 10: Component Re-renders
        ↓
Step 11: Data Displays in Table
```

---

### 🔍 Detailed Code Flow

**1. Initial State:**
```javascript
const [users, setUsers] = useState([]);        // Empty array
const [loading, setLoading] = useState(true);  // Loading true
const [error, setError] = useState(null);      // No error
```

**2. Component Mounts:**
```javascript
useEffect(() => {
  fetchUsers();  // Automatic call
}, []);
```

**3. API Call:**
```javascript
const fetchUsers = async () => {
  try {
    setLoading(true);  // Show loader
    
    // API call (wait for response)
    const response = await getAllUsers();
    
    // Update state with data
    setUsers(response.data);
    
  } catch (err) {
    setError(err.message);  // Show error
  } finally {
    setLoading(false);  // Hide loader
  }
};
```

**4. Re-render:**
```javascript
// Loading false ho gaya
// users array filled ho gaya
// Table mein data display hoga
```

---

## 🧪 Part 7: Testing in Console (30 minutes)

### Test 1: Log Response Data

**Add console.logs in fetchUsers:**

```javascript
const fetchUsers = async () => {
  try {
    console.log('1. Starting API call...');
    
    setLoading(true);
    const response = await getAllUsers();
    
    console.log('2. Full Response:', response);
    console.log('3. Response Data:', response.data);
    console.log('4. Status Code:', response.status);
    console.log('5. First User:', response.data[0]);
    
    setUsers(response.data);
    
    console.log('6. State Updated!');
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    setLoading(false);
  }
};
```

**Expected Console Output:**
```
1. Starting API call...
2. Full Response: {data: Array(10), status: 200, ...}
3. Response Data: (10) [{…}, {…}, {…}, ...]
4. Status Code: 200
5. First User: {id: 1, name: "Leanne Graham", ...}
6. State Updated!
```

---

### Test 2: Test API Service Directly

**Open browser console and test:**

```javascript
// Import not possible in console, so use full URL
axios.get('https://jsonplaceholder.typicode.com/users')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

### Test 3: Check Network Tab

**Steps:**
1. Open DevTools (F12)
2. Go to **Network** tab
3. Refresh page
4. Look for `users` request
5. Click on it
6. Check:
   - Status: 200 OK
   - Response: JSON data
   - Time: ~200ms

---

## 💡 Part 8: Common Patterns & Best Practices (30 minutes)

### Pattern 1: Separate Fetch Function

**✅ Good:**
```javascript
const fetchUsers = async () => {
  try {
    setLoading(true);
    const response = await getAllUsers();
    setUsers(response.data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchUsers();
}, []);
```

**Why Good?**
- Can call fetchUsers() anywhere (refresh button)
- Reusable
- Clean code

---

### Pattern 2: Loading States

**Always show loading:**
```javascript
if (loading) {
  return <CircularProgress />;
}
```

**Better User Experience:**
```javascript
if (loading) {
  return (
    <Box sx={{ textAlign: 'center', padding: 4 }}>
      <CircularProgress />
      <Typography>Loading users...</Typography>
    </Box>
  );
}
```

---

### Pattern 3: Error Handling

**Basic:**
```javascript
if (error) {
  return <Alert severity="error">{error}</Alert>;
}
```

**Better with Retry:**
```javascript
if (error) {
  return (
    <Alert 
      severity="error"
      action={
        <Button onClick={fetchUsers}>Retry</Button>
      }
    >
      {error}
    </Alert>
  );
}
```

---

### Pattern 4: Empty State

**When no data:**
```javascript
{filteredUsers.length === 0 && (
  <Box sx={{ textAlign: 'center', padding: 4 }}>
    <Typography variant="h6" color="text.secondary">
      No users found
    </Typography>
  </Box>
)}
```

---

## 🎯 Practice Tasks

### Task 1: Add Posts Page (⭐⭐⭐)

**Create:** `src/pages/Posts.jsx`

**Requirements:**
- Fetch posts from `/posts` endpoint
- Display in table
- Show post ID, title, body
- Add loading state
- Add error handling

**Hint:**
```javascript
import { getAllPosts } from '../services/api';

useEffect(() => {
  fetchPosts();
}, []);
```

---

### Task 2: Add User Details Modal (⭐⭐⭐⭐)

**When "View" button clicked:**
- Open MUI Dialog
- Show all user details
- Including address, company
- Format nicely

**Hint:**
```javascript
const [selectedUser, setSelectedUser] = useState(null);
const [dialogOpen, setDialogOpen] = useState(false);

const handleView = (user) => {
  setSelectedUser(user);
  setDialogOpen(true);
};
```

---

### Task 3: Add Refresh Button (⭐⭐)

**Already done in code above!**

Test it:
- Click Refresh button
- Should show loading
- Data should reload

---

### Task 4: Add Filter by Name (⭐⭐⭐)

**Add dropdown:**
```javascript
<Select value={filter} onChange={handleFilterChange}>
  <MenuItem value="all">All Users</MenuItem>
  <MenuItem value="a">Names starting with A</MenuItem>
  <MenuItem value="b">Names starting with B</MenuItem>
</Select>
```

---

### Task 5: Fetch Single User (⭐⭐⭐⭐)

**When Edit button clicked:**
- Fetch user details by ID
- Use `getUserById(id)` from api.js
- Show in form

**Code:**
```javascript
const handleEdit = async (user) => {
  try {
    const response = await getUserById(user.id);
    console.log('Full user details:', response.data);
    // Open edit form with this data
  } catch (err) {
    console.error(err);
  }
};
```

---

## ✅ Day 2 Checklist

### **Installation:**
- [ ] Axios installed (`npm install axios`)
- [ ] No installation errors
- [ ] Package.json updated
- [ ] Can import axios without error

### **API Service File:**
- [ ] Created `src/services/` folder
- [ ] Created `api.js` file
- [ ] BASE_URL defined
- [ ] Axios instance created
- [ ] getAllUsers function exported
- [ ] Can import functions in components

### **Users Page:**
- [ ] Imported getAllUsers
- [ ] Added useState for users, loading, error
- [ ] Added useEffect hook
- [ ] Created fetchUsers function
- [ ] Loading state works
- [ ] Error state works
- [ ] Data displays in table
- [ ] Search works
- [ ] Refresh button works

### **Testing:**
- [ ] Dev server runs
- [ ] Users page loads
- [ ] Loading spinner shows
- [ ] 10 users display
- [ ] Console shows correct logs
- [ ] Network tab shows API call
- [ ] No console errors
- [ ] Search filters correctly

### **Understanding:**
- [ ] Axios kya hai clear hai
- [ ] GET request samajh gaya
- [ ] async/await clear hai
- [ ] useEffect samajh gaya
- [ ] Loading states kyu zaroori hain
- [ ] Error handling kya hai
- [ ] Service file ka faida pata hai

---

## 🎓 Summary

### Today You Learned:

**1. Axios Basics**
```
✅ What is Axios
✅ Why use Axios over fetch
✅ Installation process
✅ Basic syntax
```

**2. GET Requests**
```
✅ axios.get() syntax
✅ Response structure
✅ response.data importance
✅ Query parameters
✅ Path parameters
```

**3. Async/Await**
```
✅ async keyword
✅ await keyword
✅ try-catch-finally
✅ Error handling
```

**4. API Service File**
```
✅ Why create service file
✅ Axios instance
✅ BASE_URL configuration
✅ Export functions
✅ Reusable code
```

**5. React Integration**
```
✅ useEffect hook
✅ API calls in components
✅ Loading states
✅ Error states
✅ Data rendering
```

**6. Real Implementation**
```
✅ Fetched real data from API
✅ Displayed in MUI table
✅ Search functionality
✅ Refresh functionality
✅ Professional UI/UX
```

---

## 📊 Before vs After

### Before (Day 1):
```javascript
// Static data
const users = [
  { id: 1, name: 'Ahmed' },
  { id: 2, name: 'Fatima' }
];
```

### After (Day 2):
```javascript
// Real API data
const [users, setUsers] = useState([]);

useEffect(() => {
  const fetchUsers = async () => {
    const response = await getAllUsers();
    setUsers(response.data);
  };
  fetchUsers();
}, []);
```

**Achievement Unlocked! 🏆**
- ✅ Real API connected
- ✅ Dynamic data loading
- ✅ Professional patterns
- ✅ Production-ready code

---

## 🔜 Tomorrow's Preview

**Day 3: POST Requests & Create User**

**What's Coming:**
- ✅ POST request syntax
- ✅ Sending data in body
- ✅ Create new user form
- ✅ Form validation
- ✅ Success messages
- ✅ Refresh list after create

**Get Ready:**
Tomorrow hum naye users create karenge API mein! 🚀

---

## 💡 Pro Tips

### Tip 1: Always Use try-catch
```javascript
// ✅ Good
try {
  const response = await axios.get('/url');
} catch (error) {
  console.error(error);
}

// ❌ Bad
const response = await axios.get('/url'); // Can crash
```

---

### Tip 2: Check Loading Before Data
```javascript
if (loading) return <Loader />;
if (error) return <Error />;
return <Data />;  // Show data only when ready
```

---

### Tip 3: Console Log Everything (While Learning)
```javascript
console.log('Request sent');
const response = await axios.get('/url');
console.log('Response:', response);
console.log('Data:', response.data);
console.log('Status:', response.status);
```

---

### Tip 4: Use Postman First
```
1. Test API in Postman first
2. Confirm it works
3. Then integrate in React
```

---

## ❓ Common Problems & Solutions

### Problem 1: CORS Error

**Error:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
```javascript
// JSONPlaceholder allows CORS, but for your own API:
// Backend mein CORS enable karo
// ASP.NET Core mein:
app.UseCors(options => options.AllowAnyOrigin());
```

---

### Problem 2: Data Not Showing

**Check:**
```javascript
console.log('Users state:', users);
console.log('Loading:', loading);
console.log('Error:', error);
```

**Common Issues:**
- useEffect dependency array missing
- Loading never set to false
- Wrong data path (response.data.data)

---

### Problem 3: useEffect Infinite Loop

**Problem:**
```javascript
// ❌ Wrong - infinite loop
useEffect(() => {
  fetchUsers();
});  // No dependency array
```

**Solution:**
```javascript
// ✅ Correct
useEffect(() => {
  fetchUsers();
}, []); // Empty array = run once
```

---

### Problem 4: Cannot Read Property 'map'

**Error:**
```
Cannot read property 'map' of undefined
```

**Solution:**
```javascript
// Initialize with empty array
const [users, setUsers] = useState([]);  // Not null

// Safe rendering
{users && users.map(...)}
// or
{users.length > 0 && users.map(...)}
```

---

## 📚 Additional Resources

**Learn More:**

1. **Axios Documentation:**
   - https://axios-http.com/docs/intro

2. **useEffect Guide:**
   - https://react.dev/reference/react/useEffect

3. **Async/Await:**
   - https://javascript.info/async-await

4. **JSONPlaceholder:**
   - https://jsonplaceholder.typicode.com/

---

## 🎊 Congratulations!

**Aaj aapne apne React app ko API se connect kar diya! 🎉**

**You Now Know:**
- ✅ Axios installation & usage
- ✅ GET requests
- ✅ API service file structure
- ✅ useEffect hook
- ✅ Async/Await
- ✅ Loading & Error states
- ✅ Real data integration

**Your app is now pulling REAL data from APIs!**

**Next:** POST requests aur user creation! 🚀

**Keep Learning! Keep Growing! 💻✨**
