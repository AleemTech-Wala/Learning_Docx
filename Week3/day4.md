# 📅 Week 3 - Day 4: Loading & Error States + useEffect Deep Dive

## 🎯 Today's Goal
**Aaj hum professional loading aur error handling implement karenge - jaise real applications mein hota hai!**

**Today's Focus:**
- ✅ useEffect hook complete understanding
- ✅ Loading states management
- ✅ Error states & handling
- ✅ Try-catch-finally blocks
- ✅ Reusable Loading components
- ✅ Professional Error components
- ✅ Network state handling
- ✅ Retry mechanisms
- ✅ Skeleton loaders
- ✅ Better user experience

---

## 📚 Session Breakdown (4-5 Hours)

| Time | Topic | Duration |
|------|-------|----------|
| **Hour 1** | useEffect Hook Deep Dive | 60 min |
| **Hour 2** | Loading States & Components | 60 min |
| **Hour 3** | Error States & Handling | 60 min |
| **Hour 4** | Professional Components | 60 min |
| **Hour 5** | Advanced Patterns & Best Practices | 60 min |

---

## 🔄 Part 1: useEffect Hook Deep Dive (60 minutes)

### 📖 What is useEffect?

**Simple Urdu/English:**
useEffect ek React hook hai jo component ke **side effects** handle karta hai. Side effect matlab koi bhi kaam jo component ke render ke baad karna ho.

**Real-Life Example:**
```
Aap apne room mein aate ho:
1. Light on karte ho (side effect)
2. AC chalate ho (side effect)
3. Room se nikalne par:
   - Light off karte ho (cleanup)
   - AC off karte ho (cleanup)

React mein:
- Component mount → useEffect runs
- Component unmount → Cleanup runs
```

---

### 📊 useEffect Basic Syntax

```javascript
import { useEffect } from 'react';

useEffect(() => {
  // Yeh code component mount hone par chalega
  console.log('Component mounted');

  // Cleanup function (optional)
  return () => {
    console.log('Component unmounting');
  };
}, []); // Dependency array
```

---

### 🎯 useEffect Use Cases

**1. Data Fetching**
```javascript
useEffect(() => {
  fetchUsers();
}, []); // Component load hone par ek baar
```

**2. Event Listeners**
```javascript
useEffect(() => {
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

**3. Timers**
```javascript
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);
  
  return () => clearInterval(timer);
}, []);
```

**4. Document Title**
```javascript
useEffect(() => {
  document.title = `${count} notifications`;
}, [count]); // Jab count change ho
```

---

### 📖 Dependency Array - Complete Guide

**1. No Dependency Array (❌ Avoid)**
```javascript
useEffect(() => {
  console.log('Runs on EVERY render');
});
// Har render par chalega - infinite loop ka risk
```

**2. Empty Dependency Array (✅ Common)**
```javascript
useEffect(() => {
  console.log('Runs ONCE on mount');
}, []); // Sirf pehli baar
```

**3. With Dependencies (✅ Most Used)**
```javascript
useEffect(() => {
  console.log('Runs when userId changes');
  fetchUser(userId);
}, [userId]); // Jab userId change ho
```

**4. Multiple Dependencies**
```javascript
useEffect(() => {
  fetchData(page, limit, filter);
}, [page, limit, filter]); // Jab koi bhi change ho
```

---

### 🧪 Example 1: Simple useEffect

```javascript
import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  // Runs after every render
  useEffect(() => {
    console.log(`Count is now: ${count}`);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

**Output:**
```
// Initial render
Count is now: 0

// After click
Count is now: 1

// After click
Count is now: 2
```

---

### 🧪 Example 2: Data Fetching with useEffect

```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Data fetching
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
        console.log('Users loaded');
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsers();
  }, []); // Empty array = run once

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

### 🧪 Example 3: useEffect with Cleanup

```javascript
import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log('Timer started');

    // Start interval
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Cleanup function
    return () => {
      console.log('Timer stopped');
      clearInterval(interval);
    };
  }, []); // Run once

  return <p>Seconds: {seconds}</p>;
}
```

**What Happens:**
```
1. Component mounts → Timer started
2. Every second → setSeconds(prev => prev + 1)
3. Component unmounts → Timer stopped
4. clearInterval() → Timer band ho jata hai
```

---

### ⚠️ useEffect Common Mistakes

**Mistake 1: Infinite Loop**
```javascript
// ❌ Wrong - Infinite loop
useEffect(() => {
  setCount(count + 1); // State update
}); // No dependency array → runs on every render
```

**Fix:**
```javascript
// ✅ Correct
useEffect(() => {
  setCount(count + 1);
}, []); // Runs only once
```

---

**Mistake 2: Missing Dependencies**
```javascript
// ❌ Wrong - userId missing
useEffect(() => {
  fetchUser(userId);
}, []); // userId change par nahi chalega
```

**Fix:**
```javascript
// ✅ Correct
useEffect(() => {
  fetchUser(userId);
}, [userId]); // userId change par chalega
```

---

**Mistake 3: Not Cleaning Up**
```javascript
// ❌ Wrong - Memory leak
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);
  // No cleanup → timer chalta rahega
}, []);
```

**Fix:**
```javascript
// ✅ Correct
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);
  
  return () => clearInterval(timer); // Cleanup
}, []);
```

---

## ⏳ Part 2: Loading States (60 minutes)

### 📖 What is Loading State?

**Simple Urdu/English:**
Loading state batata hai ke **data aa raha hai** ya nahi. User ko pata chalta hai ke wait karna hai.

**Why Important?**
```
❌ Without Loading State:
- User confuse ho jata hai
- Lagta hai app hang ho gaya
- Bad user experience

✅ With Loading State:
- User ko pata hai data load ho raha hai
- Professional look
- Better user experience
```

---

### 📊 Loading State Pattern

**Basic Pattern:**
```javascript
const [loading, setLoading] = useState(false);

const fetchData = async () => {
  setLoading(true);  // Start loading
  
  try {
    const data = await api.get('/endpoint');
    // Process data
  } catch (error) {
    // Handle error
  } finally {
    setLoading(false);  // Stop loading (always runs)
  }
};
```

---

### 🧪 Example 1: Simple Loading State

```javascript
import React, { useState, useEffect } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import axios from 'axios';

function SimpleLoading() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Typography variant="h6">Users Loaded</Typography>
      {/* Display data */}
    </div>
  );
}
```

---

### 🧪 Example 2: Loading with Text

```javascript
function LoadingWithText() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        padding: 4 
      }}>
        <CircularProgress size={60} />
        <Typography sx={{ marginTop: 2 }}>
          Loading users...
        </Typography>
      </Box>
    );
  }

  return <div>Content here</div>;
}
```

---

### 🧪 Example 3: Multiple Loading States

```javascript
function MultipleLoading() {
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    // Fetch users
    const fetchUsers = async () => {
      setLoadingUsers(true);
      const users = await api.get('/users');
      setLoadingUsers(false);
    };

    // Fetch posts
    const fetchPosts = async () => {
      setLoadingPosts(true);
      const posts = await api.get('/posts');
      setLoadingPosts(false);
    };

    fetchUsers();
    fetchPosts();
  }, []);

  return (
    <div>
      {loadingUsers ? (
        <CircularProgress />
      ) : (
        <UsersList />
      )}

      {loadingPosts ? (
        <CircularProgress />
      ) : (
        <PostsList />
      )}
    </div>
  );
}
```

---

### 🎨 Loading Component Variations

**1. Simple Spinner**
```javascript
<CircularProgress />
```

**2. Spinner with Size**
```javascript
<CircularProgress size={60} />
```

**3. Spinner with Color**
```javascript
<CircularProgress color="primary" />
<CircularProgress color="secondary" />
<CircularProgress color="success" />
```

**4. Linear Progress**
```javascript
<LinearProgress />
```

**5. Skeleton Loader**
```javascript
<Skeleton variant="text" width={200} />
<Skeleton variant="circular" width={40} height={40} />
<Skeleton variant="rectangular" width={210} height={118} />
```

---

### 🎯 Create Reusable Loading Component

**File:** `src/components/common/LoadingSpinner.jsx`

```javascript
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

function LoadingSpinner({ message = 'Loading...', size = 60 }) {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '400px',
      padding: 4 
    }}>
      <CircularProgress size={size} thickness={4} />
      <Typography 
        variant="h6" 
        color="text.secondary"
        sx={{ marginTop: 2 }}
      >
        {message}
      </Typography>
    </Box>
  );
}

export default LoadingSpinner;
```

**Usage:**
```javascript
import LoadingSpinner from '../components/common/LoadingSpinner';

function MyComponent() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LoadingSpinner message="Loading users..." />;
  }

  return <div>Content</div>;
}
```

---

## ❌ Part 3: Error States & Handling (60 minutes)

### 📖 What is Error State?

**Simple Urdu/English:**
Error state batata hai ke koi **problem** ho gayi hai. User ko clear message dena chahiye ke kya galat hua aur kya karna hai.

**Types of Errors:**
```
1. Network Error → Internet nahi hai
2. Server Error (5xx) → Backend down hai
3. Not Found (404) → Data nahi mila
4. Unauthorized (401) → Login required
5. Validation Error (400) → Wrong data
```

---

### 📊 Error Handling Pattern

**Complete Pattern:**
```javascript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

const fetchData = async () => {
  setLoading(true);
  setError(null); // Clear previous errors
  
  try {
    const response = await api.get('/endpoint');
    setData(response.data);
  } catch (err) {
    // Set error message
    setError(err.message || 'Something went wrong');
    console.error('Error:', err);
  } finally {
    setLoading(false);
  }
};
```

---

### 🧪 Example 1: Basic Error Handling

```javascript
import React, { useState, useEffect } from 'react';
import { Alert, Button, Box } from '@mui/material';
import axios from 'axios';

function BasicErrorHandling() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (err) {
      setError('Failed to load users. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
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
    );
  }

  return (
    <div>
      {/* Display users */}
    </div>
  );
}
```

---

### 🧪 Example 2: Detailed Error Handling

```javascript
const fetchData = async () => {
  try {
    const response = await axios.get('/api/users');
    setData(response.data);
  } catch (err) {
    // Detailed error handling
    if (err.response) {
      // Server responded with error
      const status = err.response.status;
      
      if (status === 404) {
        setError('Users not found.');
      } else if (status === 401) {
        setError('Please login to continue.');
      } else if (status === 500) {
        setError('Server error. Please try again later.');
      } else {
        setError(`Error ${status}: ${err.response.data.message}`);
      }
    } else if (err.request) {
      // Request made but no response
      setError('Network error. Please check your internet connection.');
    } else {
      // Something else happened
      setError('An unexpected error occurred.');
    }
    
    console.error('Full error:', err);
  }
};
```

---

### 🧪 Example 3: Error with Retry Counter

```javascript
function ErrorWithRetry() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('/api/data');
      setData(response.data);
      setRetryCount(0); // Reset on success
    } catch (err) {
      setError(err.message);
      setRetryCount(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return (
      <Alert severity="error">
        {error}
        <br />
        <small>Retry attempts: {retryCount}</small>
        <Button onClick={fetchData}>
          Try Again
        </Button>
      </Alert>
    );
  }

  // ... rest of the component
}
```

---

### 🎯 Create Reusable Error Component

**File:** `src/components/common/ErrorMessage.jsx`

```javascript
import React from 'react';
import { Box, Alert, Button, Typography } from '@mui/material';
import { ErrorOutline, Refresh } from '@mui/icons-material';

function ErrorMessage({ 
  message = 'Something went wrong', 
  onRetry = null,
  severity = 'error'
}) {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '400px',
      padding: 4 
    }}>
      <ErrorOutline 
        sx={{ 
          fontSize: 80, 
          color: 'error.main',
          marginBottom: 2 
        }} 
      />
      
      <Alert 
        severity={severity}
        sx={{ 
          maxWidth: 600,
          marginBottom: 2
        }}
      >
        <Typography variant="h6" gutterBottom>
          Oops! Something went wrong
        </Typography>
        <Typography variant="body2">
          {message}
        </Typography>
      </Alert>

      {onRetry && (
        <Button 
          variant="contained" 
          startIcon={<Refresh />}
          onClick={onRetry}
        >
          Try Again
        </Button>
      )}
    </Box>
  );
}

export default ErrorMessage;
```

**Usage:**
```javascript
import ErrorMessage from '../components/common/ErrorMessage';

function MyComponent() {
  const [error, setError] = useState(null);

  if (error) {
    return (
      <ErrorMessage 
        message={error}
        onRetry={fetchData}
      />
    );
  }

  return <div>Content</div>;
}
```

---

## 🎨 Part 4: Skeleton Loaders (Professional Loading) (60 minutes)

### 📖 What are Skeleton Loaders?

**Simple Urdu/English:**
Skeleton loader ek **placeholder** hai jo content ki shape dikhata hai while loading. Better UX than simple spinner.

**Example:**
```
Instead of:        [Loading spinner]

Show this:         ┌──────┐ ────────
                   │      │ ────
                   └──────┘ ──────────
                   
                   (Content ki shape)
```

---

### 🧪 Example 1: Basic Skeleton

```javascript
import { Skeleton } from '@mui/material';

function BasicSkeleton() {
  return (
    <div>
      {/* Text skeleton */}
      <Skeleton variant="text" width={200} />
      
      {/* Rectangular skeleton */}
      <Skeleton variant="rectangular" width={300} height={200} />
      
      {/* Circular skeleton */}
      <Skeleton variant="circular" width={40} height={40} />
    </div>
  );
}
```

---

### 🧪 Example 2: User Card Skeleton

```javascript
import { Card, CardContent, Skeleton, Box } from '@mui/material';

function UserCardSkeleton() {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Avatar */}
          <Skeleton variant="circular" width={50} height={50} />
          
          <Box sx={{ flex: 1 }}>
            {/* Name */}
            <Skeleton variant="text" width="60%" height={25} />
            {/* Email */}
            <Skeleton variant="text" width="80%" height={20} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
```

---

### 🧪 Example 3: Table Skeleton

```javascript
function TableSkeleton({ rows = 5 }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell><Skeleton /></TableCell>
          <TableCell><Skeleton /></TableCell>
          <TableCell><Skeleton /></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {[...Array(rows)].map((_, index) => (
          <TableRow key={index}>
            <TableCell><Skeleton /></TableCell>
            <TableCell><Skeleton /></TableCell>
            <TableCell><Skeleton /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

---

### 🎯 Create Table Skeleton Component

**File:** `src/components/common/TableSkeleton.jsx`

```javascript
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
  Paper
} from '@mui/material';

function TableSkeleton({ 
  rows = 5, 
  columns = 6 
}) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ backgroundColor: 'grey.100' }}>
          <TableRow>
            {[...Array(columns)].map((_, index) => (
              <TableCell key={index}>
                <Skeleton variant="text" />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(rows)].map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {[...Array(columns)].map((_, colIndex) => (
                <TableCell key={colIndex}>
                  {colIndex === 1 ? (
                    // Avatar + Name skeleton
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Skeleton variant="circular" width={40} height={40} />
                      <Skeleton variant="text" width={120} />
                    </div>
                  ) : (
                    <Skeleton variant="text" />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableSkeleton;
```

---

## 🎯 Part 5: Complete Implementation in Users Page (60 minutes)

### Update Users.jsx with Professional Loading & Error

**File:** `src/pages/Users.jsx` (Add these improvements)

**Import new components at top:**
```javascript
// Existing imports...
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import TableSkeleton from '../components/common/TableSkeleton';
```

**Update loading section:**
```javascript
// Replace old loading with new
if (loading) {
  return <TableSkeleton rows={10} columns={6} />;
  // Or use: <LoadingSpinner message="Loading users..." />
}
```

**Update error section:**
```javascript
// Replace old error with new
if (error) {
  return (
    <ErrorMessage 
      message={error}
      onRetry={fetchUsers}
    />
  );
}
```

---

### Complete Enhanced Users.jsx (Key Sections)

```javascript
function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch users with improved error handling
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getAllUsers();
      setUsers(response.data);
      
    } catch (err) {
      if (err.response) {
        const status = err.response.status;
        if (status === 404) {
          setError('No users found in the system.');
        } else if (status === 401) {
          setError('Please login to view users.');
        } else if (status >= 500) {
          setError('Server error. Please try again later.');
        } else {
          setError('Failed to load users. Please try again.');
        }
      } else if (err.request) {
        setError('Network error. Please check your internet connection.');
      } else {
        setError('An unexpected error occurred.');
      }
      
      console.error('Error details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Create user with loading state
  const handleUserAdded = async (userData) => {
    setActionLoading(true);
    
    try {
      const response = await createUser(userData);
      setUsers([response.data, ...users]);
      
      setSnackbar({
        open: true,
        message: `${userData.name} created successfully!`,
        severity: 'success'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to create user. Please try again.',
        severity: 'error'
      });
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Users Management
        </Typography>
        <TableSkeleton rows={10} columns={6} />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Users Management
        </Typography>
        <ErrorMessage 
          message={error}
          onRetry={fetchUsers}
        />
      </Box>
    );
  }

  // Rest of the component...
}
```

---

## 🎯 Part 6: Advanced Patterns (30 minutes)

### Pattern 1: Optimistic Updates

**What is it?**
UI ko immediately update karo, API call baad mein karo.

```javascript
const handleDelete = async (userId) => {
  // Optimistic update
  const originalUsers = [...users];
  setUsers(users.filter(u => u.id !== userId));
  
  try {
    await deleteUser(userId);
    // Success - UI already updated
  } catch (error) {
    // Rollback on error
    setUsers(originalUsers);
    setSnackbar({
      message: 'Failed to delete. Please try again.',
      severity: 'error'
    });
  }
};
```

---

### Pattern 2: Debounced Search

**What is it?**
Search API call ko delay karo taake har keystroke par call na ho.

```javascript
import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearch) {
      // API call with debounced value
      searchUsers(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <TextField
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

---

### Pattern 3: Retry with Exponential Backoff

```javascript
const fetchWithRetry = async (url, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      if (i === retries - 1) throw error;
      
      // Wait before retry (exponential backoff)
      const delay = Math.pow(2, i) * 1000; // 1s, 2s, 4s
      await new Promise(resolve => setTimeout(resolve, delay));
      
      console.log(`Retry ${i + 1}/${retries}`);
    }
  }
};
```

---

### Pattern 4: Loading States for Actions

```javascript
function UsersPage() {
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const handleDelete = async (userId) => {
    setDeletingId(userId);
    
    try {
      await deleteUser(userId);
      setUsers(users.filter(u => u.id !== userId));
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Table>
      {users.map(user => (
        <TableRow key={user.id}>
          <TableCell>{user.name}</TableCell>
          <TableCell>
            <IconButton 
              onClick={() => handleDelete(user.id)}
              disabled={deletingId === user.id}
            >
              {deletingId === user.id ? (
                <CircularProgress size={20} />
              ) : (
                <Delete />
              )}
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
}
```

---

## 🎯 Practice Tasks

### Task 1: Add Network Status Indicator (⭐⭐⭐)

**Requirement:**
Show if user is online/offline.

**Hint:**
```javascript
const [isOnline, setIsOnline] = useState(navigator.onLine);

useEffect(() => {
  const handleOnline = () => setIsOnline(true);
  const handleOffline = () => setIsOnline(false);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}, []);
```

---

### Task 2: Add Empty State Component (⭐⭐⭐)

**Requirement:**
Show nice message when no data.

**Create:** `src/components/common/EmptyState.jsx`

```javascript
function EmptyState({ 
  message = 'No data found', 
  icon = <InboxIcon />,
  action = null 
}) {
  return (
    <Box sx={{ textAlign: 'center', padding: 8 }}>
      {icon}
      <Typography variant="h6" color="text.secondary">
        {message}
      </Typography>
      {action}
    </Box>
  );
}
```

---

### Task 3: Add Timeout for API Calls (⭐⭐⭐⭐)

**Requirement:**
Cancel API call if takes too long.

**Hint:**
```javascript
const fetchWithTimeout = async (url, timeout = 5000) => {
  const controller = new AbortController();
  
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const response = await axios.get(url, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response.data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
};
```

---

### Task 4: Add Refresh Timer (⭐⭐⭐⭐)

**Requirement:**
Auto-refresh data every 30 seconds.

**Hint:**
```javascript
useEffect(() => {
  fetchUsers(); // Initial fetch

  const interval = setInterval(() => {
    fetchUsers();
  }, 30000); // 30 seconds

  return () => clearInterval(interval);
}, []);
```

---

### Task 5: Add Progress Bar for Long Operations (⭐⭐⭐⭐⭐)

**Requirement:**
Show progress when uploading/processing.

```javascript
const [progress, setProgress] = useState(0);

const uploadFile = async (file) => {
  try {
    const response = await axios.post('/upload', file, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

// Display
<LinearProgress variant="determinate" value={progress} />
```

---

## ✅ Day 4 Checklist

### **useEffect Understanding:**
- [ ] useEffect kya hai clear hai
- [ ] Dependency array samajh gaya
- [ ] Cleanup function ka purpose pata hai
- [ ] Common mistakes avoid kar sakta hoon
- [ ] Data fetching implement kar sakta hoon

### **Loading States:**
- [ ] Loading state manage kar sakta hoon
- [ ] CircularProgress use kar sakta hoon
- [ ] LoadingSpinner component banaya
- [ ] TableSkeleton component banaya
- [ ] Multiple loading states handle kar sakta hoon

### **Error States:**
- [ ] Error handling samajh gaya
- [ ] try-catch-finally use kar sakta hoon
- [ ] ErrorMessage component banaya
- [ ] Different error types handle kar sakta hoon
- [ ] Retry mechanism implement kiya

### **Components Created:**
- [ ] LoadingSpinner.jsx
- [ ] ErrorMessage.jsx
- [ ] TableSkeleton.jsx
- [ ] All components reusable hain

### **Users Page Enhanced:**
- [ ] Professional loading added
- [ ] Error handling improved
- [ ] Skeleton loader working
- [ ] Retry button working
- [ ] Better UX overall

### **Testing:**
- [ ] Loading states dikhai de rahe hain
- [ ] Error states test kiye
- [ ] Retry mechanism works
- [ ] No console errors
- [ ] Smooth user experience

---

## 🎓 Summary

### Today You Learned:

**1. useEffect Hook**
```
✅ What is useEffect
✅ Dependency array
✅ Cleanup function
✅ Common mistakes
✅ Best practices
```

**2. Loading States**
```
✅ Why loading states matter
✅ useState for loading
✅ CircularProgress
✅ Skeleton loaders
✅ Multiple loading states
```

**3. Error Handling**
```
✅ try-catch-finally
✅ Error state management
✅ Different error types
✅ Retry mechanisms
✅ User-friendly messages
```

**4. Professional Components**
```
✅ LoadingSpinner
✅ ErrorMessage
✅ TableSkeleton
✅ EmptyState
✅ Reusable patterns
```

**5. Advanced Patterns**
```
✅ Optimistic updates
✅ Debounced search
✅ Retry with backoff
✅ Loading per action
```

---

## 📊 Before vs After

### Before Day 4:
```
❌ No loading feedback
❌ Generic error handling
❌ Poor user experience
❌ No retry option
```

### After Day 4:
```
✅ Professional loading states
✅ Skeleton loaders
✅ Detailed error messages
✅ Retry mechanisms
✅ Excellent user experience
```

---

## 🔜 Tomorrow's Preview

**Day 5: React Context API & Global State**

**What's Coming:**
- ✅ Context API
- ✅ Global state management
- ✅ useContext hook
- ✅ Theme context
- ✅ Auth context
- ✅ Avoiding prop drilling

---

## 💡 Pro Tips

### Tip 1: Always Show Loading
```javascript
// ✅ Good
if (loading) return <LoadingSpinner />;

// ❌ Bad - User confused
// No loading indicator
```

### Tip 2: Friendly Error Messages
```javascript
// ✅ Good
"Couldn't load users. Please check your connection and try again."

// ❌ Bad
"Error: ERR_NETWORK_FAILED"
```

### Tip 3: Use Skeleton for Tables
```javascript
// ✅ Better UX
<TableSkeleton rows={10} />

// ❌ Generic spinner
<CircularProgress />
```

### Tip 4: Always Cleanup
```javascript
useEffect(() => {
  const timer = setInterval(...);
  return () => clearInterval(timer); // Cleanup
}, []);
```

---

## 🎊 Congratulations!

**Aaj aapne professional loading aur error handling implement kar diya! 🎉**

**You Now Know:**
- ✅ useEffect complete understanding
- ✅ Loading state management
- ✅ Error handling best practices
- ✅ Skeleton loaders
- ✅ Reusable components
- ✅ Professional UX patterns

**Your app now feels like a real production application!**

**Tomorrow:** Global state management with Context API! 🚀

**Keep Learning! Keep Building! 💻✨**
