# Week 1 - Day 4: State Management with useState Hook

**Study Time:** 4 Hours  
**Goal:** State management master karna + Interactive features add karna + Forms handle karna

---

## 🎯 Today's Goal

Aaj tum:
- useState Hook ka complete concept samjhoge
- State variables banao ge aur update karoge
- Interactive buttons (Add/Edit/Delete) working banao ge
- Forms handle karoge (Add User form)
- Real-time UI updates implement karoge
- Admin Panel fully interactive ho jayega

---

## 📚 Part 1: useState Hook - React Ka Superpower (45 minutes)

### 🔹 State Kya Hai?

**Simple Words Mein:**
State = Component ki **memory**. Jab state change hoti hai, component re-render hota hai.

**Real Life Example:**
Socho tum ek **light switch** ho:
- Light ON hai ya OFF hai? → Yeh **state** hai
- Switch dabate ho → State **change** hoti hai
- Light ka status update hota hai → Component **re-render** hota hai

---

### 🔹 useState Hook Kya Hai?

**Definition:**
useState ek **React Hook** hai jo component ke andar state manage karne ke liye use hota hai.

**Kyun Chahiye?**
- Data ko store karne ke liye
- User interactions handle karne ke liye
- UI ko dynamically update karne ke liye
- Form data manage karne ke liye

**Example Without State:**
```jsx
function Counter() {
  let count = 0;  // Normal variable
  
  const increment = () => {
    count = count + 1;
    console.log(count);  // Console mein change hoga
  };
  
  return (
    <div>
      <h1>{count}</h1>  {/* UI update NAHI hoga */}
      <button onClick={increment}>Click</button>
    </div>
  )
}
```
❌ **Problem:** UI update nahi hoga!

**Example With State:**
```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);  // State variable
  
  const increment = () => {
    setCount(count + 1);  // State update
  };
  
  return (
    <div>
      <h1>{count}</h1>  {/* UI automatically update hoga! */}
      <button onClick={increment}>Click</button>
    </div>
  )
}
```
✅ **Solution:** UI automatically re-render hoga!

---

### 🔹 useState Syntax Explained

```jsx
const [state, setState] = useState(initialValue);
```

**Parts:**
1. **`state`** → Current value (read karne ke liye)
2. **`setState`** → Update function (change karne ke liye)
3. **`useState(initialValue)`** → Hook with starting value

**Example:**
```jsx
const [name, setName] = useState("Ahmed");
const [age, setAge] = useState(25);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [users, setUsers] = useState([]);
```

---

### 🔹 State Update Rules

#### Rule 1: Directly Update Mat Karo
❌ **Wrong:**
```jsx
const [count, setCount] = useState(0);

count = 5;  // ERROR! Direct assignment not allowed
```

✅ **Correct:**
```jsx
const [count, setCount] = useState(0);

setCount(5);  // Use setter function
```

---

#### Rule 2: State Immediately Update Nahi Hoti (Async)
```jsx
const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(count + 1);
  console.log(count);  // Purani value show hogi (0)
  // Next render mein update hogi (1)
};
```

---

#### Rule 3: Previous State Use Karna Ho Toh Function Use Karo
❌ **Risky:**
```jsx
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
// Result: count sirf 1 badhega (not 3!)
```

✅ **Safe:**
```jsx
setCount(prev => prev + 1);
setCount(prev => prev + 1);
setCount(prev => prev + 1);
// Result: count 3 badhega ✓
```

---

### 🔹 Different Types of State

#### 1. Number State
```jsx
const [count, setCount] = useState(0);
const [age, setAge] = useState(25);
const [price, setPrice] = useState(1000);
```

#### 2. String State
```jsx
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [message, setMessage] = useState("Hello");
```

#### 3. Boolean State
```jsx
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [isVisible, setIsVisible] = useState(true);
const [isLoading, setIsLoading] = useState(false);
```

#### 4. Array State
```jsx
const [users, setUsers] = useState([]);
const [products, setProducts] = useState([]);
const [items, setItems] = useState(['item1', 'item2']);
```

#### 5. Object State
```jsx
const [user, setUser] = useState({
  name: "",
  email: "",
  age: 0
});

const [formData, setFormData] = useState({
  username: "",
  password: ""
});
```

---

## 💻 Part 2: Practical Examples (1 hour)

### Example 1: Simple Counter

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div style={{ 
      padding: '30px', 
      textAlign: 'center',
      border: '2px solid #3498db',
      borderRadius: '10px',
      margin: '20px'
    }}>
      <h2>Counter App</h2>
      <h1 style={{ fontSize: '4rem', color: '#3498db' }}>
        {count}
      </h1>
      
      <button 
        onClick={increment}
        style={{
          padding: '10px 20px',
          margin: '5px',
          backgroundColor: '#27ae60',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        + Increment
      </button>
      
      <button 
        onClick={decrement}
        style={{
          padding: '10px 20px',
          margin: '5px',
          backgroundColor: '#e74c3c',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        - Decrement
      </button>
      
      <button 
        onClick={reset}
        style={{
          padding: '10px 20px',
          margin: '5px',
          backgroundColor: '#95a5a6',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        Reset
      </button>
    </div>
  )
}

export default Counter;
```

---

### Example 2: Toggle Visibility

```jsx
import { useState } from 'react';

function ToggleBox() {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);  // Opposite value
  };

  return (
    <div style={{ padding: '30px' }}>
      <button 
        onClick={toggleVisibility}
        style={{
          padding: '12px 24px',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1rem',
          marginBottom: '20px'
        }}
      >
        {isVisible ? 'Hide' : 'Show'} Content
      </button>

      {isVisible && (
        <div style={{
          padding: '20px',
          backgroundColor: '#d5f4e6',
          border: '2px solid #27ae60',
          borderRadius: '8px'
        }}>
          <h3>🎉 This content is visible!</h3>
          <p>You can toggle this content using the button above.</p>
        </div>
      )}
    </div>
  )
}

export default ToggleBox;
```

---

### Example 3: Input Field with State

```jsx
import { useState } from 'react';

function NameInput() {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleClear = () => {
    setName("");
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>Enter Your Name</h2>
      
      <input 
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Type your name..."
        style={{
          padding: '10px',
          fontSize: '1rem',
          width: '300px',
          borderRadius: '5px',
          border: '2px solid #3498db'
        }}
      />
      
      <button 
        onClick={handleClear}
        style={{
          padding: '10px 20px',
          marginLeft: '10px',
          backgroundColor: '#e74c3c',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Clear
      </button>

      <div style={{ marginTop: '20px', fontSize: '1.2rem' }}>
        <strong>Your name is:</strong> {name || "(empty)"}
      </div>
    </div>
  )
}

export default NameInput;
```

---

### Example 4: Array State (Todo List)

```jsx
import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, inputValue]);  // Add new item
      setInputValue("");  // Clear input
    }
  };

  const deleteTodo = (indexToDelete) => {
    setTodos(todos.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div style={{ padding: '30px', maxWidth: '500px' }}>
      <h2>📝 Todo List</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          style={{
            padding: '10px',
            fontSize: '1rem',
            width: '300px',
            borderRadius: '5px',
            border: '2px solid #3498db'
          }}
        />
        <button 
          onClick={addTodo}
          style={{
            padding: '10px 20px',
            marginLeft: '10px',
            backgroundColor: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Add
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo, index) => (
          <li 
            key={index}
            style={{
              padding: '15px',
              marginBottom: '10px',
              backgroundColor: '#f8f9fa',
              border: '1px solid #ddd',
              borderRadius: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>{todo}</span>
            <button 
              onClick={() => deleteTodo(index)}
              style={{
                padding: '5px 15px',
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <p style={{ color: '#7f8c8d' }}>
        Total tasks: {todos.length}
      </p>
    </div>
  )
}

export default TodoList;
```

---

## 🛠️ Part 3: Add User Form Implementation (1 hour 30 minutes)

### Step 1: AddUserModal Component Banao

**File:** `src/components/AddUserModal.jsx`

```jsx
import { useState } from 'react';

function AddUserModal({ isOpen, onClose, onAddUser }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Employee",
    department: "IT",
    status: "Active"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email) {
      alert("Please fill all required fields!");
      return;
    }

    // Add user
    onAddUser(formData);
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      role: "Employee",
      department: "IT",
      status: "Active"
    });
    
    onClose();
  };

  if (!isOpen) return null;

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  const modalStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    width: '500px',
    maxWidth: '90%',
    maxHeight: '90vh',
    overflow: 'auto'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '1rem'
  };

  const buttonStyle = {
    padding: '12px 24px',
    margin: '5px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold'
  };

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>
          Add New User
        </h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Name *
            </label>
            <input 
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Email *
            </label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Role
            </label>
            <select 
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="Administrator">Administrator</option>
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Department
            </label>
            <select 
              name="department"
              value={formData.department}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="IT">IT</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Status
            </label>
            <select 
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div style={{ marginTop: '25px', textAlign: 'right' }}>
            <button 
              type="button"
              onClick={onClose}
              style={{
                ...buttonStyle,
                backgroundColor: '#95a5a6',
                color: 'white'
              }}
            >
              Cancel
            </button>
            <button 
              type="submit"
              style={{
                ...buttonStyle,
                backgroundColor: '#27ae60',
                color: 'white'
              }}
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUserModal;
```

---

### Step 2: EditUserModal Component Banao

**File:** `src/components/EditUserModal.jsx`

```jsx
import { useState, useEffect } from 'react';

function EditUserModal({ isOpen, onClose, onEditUser, user }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Employee",
    department: "IT",
    status: "Active"
  });

  // Jab user prop change ho, form update karo
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        status: user.status
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditUser(user.id, formData);
    onClose();
  };

  if (!isOpen || !user) return null;

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  const modalStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    width: '500px',
    maxWidth: '90%'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '1rem'
  };

  const buttonStyle = {
    padding: '12px 24px',
    margin: '5px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold'
  };

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>
          Edit User
        </h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Name
            </label>
            <input 
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Email
            </label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Role
            </label>
            <select 
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="Administrator">Administrator</option>
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Department
            </label>
            <select 
              name="department"
              value={formData.department}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="IT">IT</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Status
            </label>
            <select 
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div style={{ marginTop: '25px', textAlign: 'right' }}>
            <button 
              type="button"
              onClick={onClose}
              style={{
                ...buttonStyle,
                backgroundColor: '#95a5a6',
                color: 'white'
              }}
            >
              Cancel
            </button>
            <button 
              type="submit"
              style={{
                ...buttonStyle,
                backgroundColor: '#3498db',
                color: 'white'
              }}
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUserModal;
```

---

### Step 3: UsersPage Ko Update Karo (State Management)

**File:** `src/pages/UsersPage.jsx`

```jsx
import { useState } from 'react';
import { usersData as initialUsers } from '../data/usersData';
import UserTable from '../components/UserTable';
import StatsCard from '../components/StatsCard';
import AddUserModal from '../components/AddUserModal';
import EditUserModal from '../components/EditUserModal';

function UsersPage() {
  // State management
  const [users, setUsers] = useState(initialUsers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Add user function
  const handleAddUser = (newUserData) => {
    const newUser = {
      id: users.length + 1,
      ...newUserData,
      joinDate: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, newUser]);
    alert("User added successfully!");
  };

  // Edit user function
  const handleEditUser = (userId, updatedData) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, ...updatedData } : user
    ));
    alert("User updated successfully!");
  };

  // Delete user function
  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== userId));
      alert("User deleted successfully!");
    }
  };

  // Open edit modal
  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  // Calculate stats
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const inactiveUsers = users.filter(u => u.status === 'Inactive').length;
  const admins = users.filter(u => u.role === 'Administrator').length;

  const pageStyle = {
    padding: '30px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh'
  };

  const headerStyle = {
    marginBottom: '30px'
  };

  const statsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  };

  const tableContainerStyle = {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1 style={{ color: '#2c3e50', marginBottom: '10px' }}>
          User Management
        </h1>
        <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>
          Manage all users and their permissions
        </p>
      </div>

      {/* Stats Cards */}
      <div style={statsContainerStyle}>
        <StatsCard 
          title="Total Users"
          value={totalUsers}
          icon="👥"
          color="#3498db"
        />
        <StatsCard 
          title="Active Users"
          value={activeUsers}
          icon="✅"
          color="#2ecc71"
        />
        <StatsCard 
          title="Inactive Users"
          value={inactiveUsers}
          icon="⏸️"
          color="#e74c3c"
        />
        <StatsCard 
          title="Administrators"
          value={admins}
          icon="👑"
          color="#f39c12"
        />
      </div>

      {/* Users Table */}
      <div style={tableContainerStyle}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{ color: '#2c3e50' }}>All Users ({totalUsers})</h2>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            style={{
              padding: '12px 24px',
              backgroundColor: '#2ecc71',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            + Add New User
          </button>
        </div>
        
        <UserTable 
          users={users} 
          onEdit={openEditModal}
          onDelete={handleDeleteUser}
        />
      </div>

      {/* Modals */}
      <AddUserModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddUser={handleAddUser}
      />

      <EditUserModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEditUser={handleEditUser}
        user={selectedUser}
      />
    </div>
  )
}

export default UsersPage;
```

---

### Step 4: UserTable Component Update

**File:** `src/components/UserTable.jsx`

```jsx
function UserTable({ users, onEdit, onDelete }) {
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white'
  };

  const thStyle = {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '15px',
    textAlign: 'left',
    fontWeight: 'bold'
  };

  const tdStyle = {
    padding: '12px 15px',
    borderBottom: '1px solid #e0e0e0'
  };

  const statusBadgeStyle = (status) => ({
    padding: '5px 12px',
    borderRadius: '15px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    backgroundColor: status === 'Active' ? '#d4edda' : '#f8d7da',
    color: status === 'Active' ? '#155724' : '#721c24',
    display: 'inline-block'
  });

  const buttonStyle = {
    padding: '6px 12px',
    margin: '0 3px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 'bold'
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Role</th>
            <th style={thStyle}>Department</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Join Date</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ ...tdStyle, textAlign: 'center', padding: '40px' }}>
                <div style={{ color: '#7f8c8d' }}>
                  <h3>No users found</h3>
                  <p>Click "Add New User" to create your first user.</p>
                </div>
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td style={tdStyle}>{user.id}</td>
                <td style={tdStyle}><strong>{user.name}</strong></td>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>{user.role}</td>
                <td style={tdStyle}>{user.department}</td>
                <td style={tdStyle}>
                  <span style={statusBadgeStyle(user.status)}>
                    {user.status}
                  </span>
                </td>
                <td style={tdStyle}>{user.joinDate}</td>
                <td style={tdStyle}>
                  <button 
                    style={{ ...buttonStyle, backgroundColor: '#3498db', color: 'white' }}
                    onClick={() => onEdit(user)}
                  >
                    Edit
                  </button>
                  <button 
                    style={{ ...buttonStyle, backgroundColor: '#e74c3c', color: 'white' }}
                    onClick={() => onDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable;
```

---

## 🎯 Part 4: Practice Tasks (30 minutes)

### Task 1: Search Functionality

**File:** `src/components/SearchBar.jsx`

```jsx
import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <input 
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search users by name or email..."
        style={{
          padding: '12px',
          fontSize: '1rem',
          width: '400px',
          borderRadius: '5px',
          border: '2px solid #3498db'
        }}
      />
      {searchTerm && (
        <button 
          onClick={handleClear}
          style={{
            padding: '12px 20px',
            marginLeft: '10px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Clear
        </button>
      )}
    </div>
  )
}

export default SearchBar;
```

**UsersPage mein integrate karo:**
```jsx
// Add search state
const [searchTerm, setSearchTerm] = useState("");

// Filter users
const filteredUsers = users.filter(user => 
  user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  user.email.toLowerCase().includes(searchTerm.toLowerCase())
);

// Use filteredUsers in UserTable
<UserTable 
  users={filteredUsers} 
  onEdit={openEditModal}
  onDelete={handleDeleteUser}
/>
```

---

## 🎓 Part 5: Key Concepts Summary (15 minutes)

### ✅ Aaj Kya Seekha?

1. **useState Hook:**
   - State declare karna
   - State update karna
   - Different types (string, number, boolean, array, object)

2. **Form Handling:**
   - Controlled inputs
   - Form submission
   - Validation

3. **CRUD Operations:**
   - Create (Add user)
   - Read (Display users)
   - Update (Edit user)
   - Delete (Remove user)

4. **Modal System:**
   - Modal open/close
   - Form in modal
   - Data passing

5. **Real-time Updates:**
   - UI automatically update
   - Stats automatically calculate
   - List automatically refresh

---

## 📋 Today's Checklist

- [ ] useState hook ka concept clear
- [ ] State variables bana sakte ho
- [ ] State update kar sakte ho
- [ ] Counter example banaya
- [ ] Toggle visibility example banaya
- [ ] Input field with state
- [ ] Form handling seekha
- [ ] AddUserModal component banaya
- [ ] EditUserModal component banaya
- [ ] UsersPage mein state management
- [ ] Add user working
- [ ] Edit user working
- [ ] Delete user working
- [ ] Stats auto-update
- [ ] Search functionality (optional)

---

## 🚀 Today's Achievement

**Project Features Added:**
✅ Complete User Management System
✅ Add new user functionality
✅ Edit existing user
✅ Delete user with confirmation
✅ Real-time stats updates
✅ Form validation
✅ Modal system
✅ Search functionality

**Your Project Status:**
```
Week 1 - Day 4: ✅ COMPLETE
Current: Fully Interactive User Management
Next: Day 5 - Event Handling & Forms (Advanced)
Progress: 4/42 days (9.5% complete!)
```

---

## 💡 useState Best Practices

### ✅ DO:
```jsx
// Use descriptive names
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [userList, setUserList] = useState([]);

// Use previous state for updates
setCount(prev => prev + 1);

// One state variable per concern
const [name, setName] = useState("");
const [email, setEmail] = useState("");
```

### ❌ DON'T:
```jsx
// Direct mutation
state.push(item);  // Wrong!

// Multiple setState in a row (might not work as expected)
setCount(count + 1);
setCount(count + 1);

// Too many states (use object instead)
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [age, setAge] = useState(0);
// Better: const [user, setUser] = useState({ name: "", email: "", age: 0 });
```

---

## 🎯 Homework

1. **Task 1:** Add "View" button that shows user details in modal
2. **Task 2:** Add sorting functionality (sort by name, email, date)
3. **Task 3:** Add pagination (10 users per page)
4. **Task 4:** Add export functionality (download users as JSON)

---

## ❓ Common Problems & Solutions

### Problem 1: State not updating immediately
```jsx
const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(count + 1);
  console.log(count);  // Still shows old value
};

// Solution: State updates in next render
// Use useEffect to see updated value
```

---

### Problem 2: Input field not working
```jsx
// Wrong - missing value
<input onChange={handleChange} />

// Correct - controlled input
<input value={inputValue} onChange={handleChange} />
```

---

### Problem 3: Object state not updating
```jsx
// Wrong - direct mutation
state.name = "New Name";

// Correct - create new object
setState({ ...state, name: "New Name" });
```

---

## 📚 Quick Reference

### useState Cheatsheet:
```jsx
// Declare state
const [state, setState] = useState(initialValue);

// Update state
setState(newValue);

// Update with previous state
setState(prev => prev + 1);

// Array operations
setState([...arr, newItem]);           // Add
setState(arr.filter(item => ...));     // Remove
setState(arr.map(item => ...));        // Update

// Object operations
setState({ ...obj, key: newValue });   // Update property
```

---

## 🎉 Amazing Work!

Day 4 complete! Tumhari app ab fully interactive hai!

**Aaj ka Summary:**
- ✅ useState mastery
- ✅ Complete CRUD system
- ✅ Form handling
- ✅ Modal system
- ✅ Real-time updates
- ✅ Professional admin panel

**Kal (Day 5) kya hoga:**
- Event handling deep dive
- Advanced forms
- Form validation
- User experience improvements
- Error handling

---

**Ready for Day 5? Type "Day 5 start karo" jab ready ho!** 🚀

**Current Progress: 4/42 days = 9.5% complete! Outstanding! 🌟**
