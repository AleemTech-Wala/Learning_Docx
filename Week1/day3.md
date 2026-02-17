# Week 1 - Day 3: Components & Props Mastery

**Study Time:** 4 Hours  
**Goal:** Components ka complete concept + Props se data passing + Reusable components banao

---

## 🎯 Today's Goal

Aaj tum:
- Functional Components ka concept master karoge
- Props kya hain aur kaise use karte hain seekhoge
- Parent se child component mein data pass karoge
- Reusable components banao ge
- Admin Panel mein User Management feature start karoge
- Dynamic data display karna seekhoge

---

## 📚 Part 1: Components Deep Dive (45 minutes)

### 🔹 Component Kya Hai?

**Simple Words Mein:**
Component ek **reusable piece of UI** hai. Jaise LEGO blocks hote hain, waise hi React mein components hain.

**Real Life Example:**
Socho tum ek building bana rahe ho:
- 🧱 Brick = Component
- 🏠 Building = Complete App

Har brick same type ki ho sakti hai (reusable), aur tum unhe different jagah use kar sakte ho.

---

### 🔹 Component Types

React mein 2 types ke components hain:

#### 1. **Functional Components** (Modern way - Hum yeh use karenge)
```jsx
function Welcome() {
  return <h1>Hello!</h1>
}
```

#### 2. **Class Components** (Old way - Ab kam use hota hai)
```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello!</h1>
  }
}
```

**Hum sirf Functional Components use karenge kyunki:**
- Simple hai
- Kam code
- Modern approach
- Hooks use kar sakte hain (next days mein seekhenge)

---

### 🔹 Functional Component Ki Anatomy

```jsx
// 1. Function definition
function UserCard() {
  
  // 2. Logic (variables, calculations)
  const userName = "Ahmed";
  
  // 3. Return JSX
  return (
    <div>
      <h2>{userName}</h2>
    </div>
  )
}

// 4. Export (taake dusri files use kar sakein)
export default UserCard;
```

**Parts:**
1. Function name (PascalCase - pehla letter capital)
2. Logic section
3. Return statement (JSX)
4. Export statement

---

### 🔹 Component Naming Rules

✅ **Correct:**
```jsx
function UserCard() {}      // PascalCase
function ProductList() {}
function DashboardHeader() {}
```

❌ **Wrong:**
```jsx
function usercard() {}      // lowercase
function product_list() {}  // snake_case
function dashboard-header() {} // kebab-case
```

**Rule:** Component names hamesha PascalCase mein (har word ka pehla letter capital)

---

### 🔹 Component Export/Import Methods

#### Method 1: Default Export (Recommended)
```jsx
// UserCard.jsx
function UserCard() {
  return <div>Card</div>
}
export default UserCard;

// App.jsx
import UserCard from './UserCard';
```

#### Method 2: Named Export
```jsx
// Components.jsx
export function UserCard() {
  return <div>Card</div>
}
export function ProductCard() {
  return <div>Product</div>
}

// App.jsx
import { UserCard, ProductCard } from './Components';
```

**Hum Method 1 use karenge (ek file = ek component)**

---

## 📚 Part 2: Props - The Data Highway (1 hour)

### 🔹 Props Kya Hain?

**Simple Words Mein:**
Props = Properties = Data jo tum ek component ko pass karte ho.

**Real Life Example:**
Socho tum ek **ID Card Maker Machine** ho:
- Tum naam, photo, ID number input lete ho (Props)
- Aur ek formatted ID card banate ho (Component)

Same data, different outputs possible!

---

### 🔹 Props Kaise Kaam Karte Hain?

```jsx
// Child Component (receives data)
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>
}

// Parent Component (sends data)
function App() {
  return (
    <div>
      <Greeting name="Ahmed" />
      <Greeting name="Sara" />
      <Greeting name="Ali" />
    </div>
  )
}
```

**Output:**
```
Hello, Ahmed!
Hello, Sara!
Hello, Ali!
```

Ek hi component, teen baar use kiya, har baar different data!

---

### 🔹 Props Access Karne Ke Tareeqe

#### Method 1: props Object
```jsx
function UserCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.email}</p>
    </div>
  )
}

// Usage
<UserCard name="Ahmed" email="ahmed@example.com" />
```

#### Method 2: Destructuring (Cleaner - Recommended)
```jsx
function UserCard({ name, email }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  )
}

// Usage (same)
<UserCard name="Ahmed" email="ahmed@example.com" />
```

**Hum Method 2 use karenge (destructuring)**

---

### 🔹 Props Types

#### 1. String Props
```jsx
<UserCard name="Ahmed" role="Admin" />
```

#### 2. Number Props
```jsx
<UserCard age={25} salary={50000} />
```

#### 3. Boolean Props
```jsx
<UserCard isActive={true} isAdmin={false} />
```

#### 4. Array Props
```jsx
<UserList users={['Ahmed', 'Sara', 'Ali']} />
```

#### 5. Object Props
```jsx
<UserCard user={{ name: 'Ahmed', age: 25 }} />
```

#### 6. Function Props
```jsx
<Button onClick={handleClick} />
```

---

### 🔹 Default Props

Agar koi prop nahi mila, toh default value use karo:

```jsx
function Greeting({ name = "Guest" }) {
  return <h1>Hello, {name}!</h1>
}

// Usage
<Greeting />              // Output: Hello, Guest!
<Greeting name="Ahmed" />  // Output: Hello, Ahmed!
```

---

## 💻 Part 3: Practical Examples (1 hour)

### Example 1: Reusable Button Component

**File:** `src/components/Button.jsx`

```jsx
function Button({ text, color, onClick }) {
  const buttonStyle = {
    padding: '12px 24px',
    backgroundColor: color || '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: 'bold'
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button;
```

**Usage:**
```jsx
import Button from './components/Button';

function App() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div>
      <Button text="Save" color="#27ae60" onClick={handleClick} />
      <Button text="Delete" color="#e74c3c" onClick={handleClick} />
      <Button text="Cancel" color="#95a5a6" onClick={handleClick} />
    </div>
  )
}
```

---

### Example 2: User Card with Props

**File:** `src/components/UserCard.jsx`

```jsx
function UserCard({ name, role, email, status, avatar }) {
  const cardStyle = {
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    padding: '25px',
    margin: '15px',
    maxWidth: '350px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    backgroundColor: 'white'
  };

  const avatarStyle = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#3498db',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '0 auto 15px'
  };

  const statusStyle = {
    display: 'inline-block',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    backgroundColor: status === 'Active' ? '#d4edda' : '#f8d7da',
    color: status === 'Active' ? '#155724' : '#721c24'
  };

  // First letter for avatar
  const initial = name ? name.charAt(0).toUpperCase() : '?';

  return (
    <div style={cardStyle}>
      <div style={avatarStyle}>
        {avatar ? <img src={avatar} alt={name} /> : initial}
      </div>
      
      <h3 style={{ textAlign: 'center', marginBottom: '10px', color: '#2c3e50' }}>
        {name}
      </h3>
      
      <p style={{ textAlign: 'center', color: '#7f8c8d', marginBottom: '15px' }}>
        <strong>Role:</strong> {role}
      </p>
      
      <p style={{ textAlign: 'center', color: '#7f8c8d', marginBottom: '15px' }}>
        <strong>Email:</strong> {email}
      </p>
      
      <div style={{ textAlign: 'center' }}>
        <span style={statusStyle}>{status}</span>
      </div>
    </div>
  )
}

export default UserCard;
```

**Usage:**
```jsx
import UserCard from './components/UserCard';

function App() {
  return (
    <div>
      <UserCard 
        name="Ahmed Ali"
        role="Administrator"
        email="ahmed@company.com"
        status="Active"
      />
      
      <UserCard 
        name="Sara Khan"
        role="Manager"
        email="sara@company.com"
        status="Active"
      />
      
      <UserCard 
        name="Ali Raza"
        role="Employee"
        email="ali@company.com"
        status="Inactive"
      />
    </div>
  )
}
```

---

### Example 3: Stats Card Component

**File:** `src/components/StatsCard.jsx`

```jsx
function StatsCard({ title, value, icon, color, subtitle }) {
  const cardStyle = {
    backgroundColor: color || '#3498db',
    color: 'white',
    padding: '30px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    minWidth: '200px'
  };

  const iconStyle = {
    fontSize: '3rem',
    marginBottom: '10px'
  };

  const valueStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: '15px 0'
  };

  return (
    <div style={cardStyle}>
      <div style={iconStyle}>{icon}</div>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{title}</h3>
      <div style={valueStyle}>{value}</div>
      {subtitle && (
        <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>{subtitle}</p>
      )}
    </div>
  )
}

export default StatsCard;
```

**Usage:**
```jsx
function Dashboard() {
  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <StatsCard 
        title="Total Users"
        value="245"
        icon="👥"
        color="#3498db"
        subtitle="+12 this week"
      />
      
      <StatsCard 
        title="Revenue"
        value="$45,230"
        icon="💰"
        color="#2ecc71"
        subtitle="+8% from last month"
      />
      
      <StatsCard 
        title="Active Orders"
        value="89"
        icon="📦"
        color="#e74c3c"
        subtitle="15 pending"
      />
      
      <StatsCard 
        title="Products"
        value="567"
        icon="📱"
        color="#f39c12"
        subtitle="In stock"
      />
    </div>
  )
}
```

---

### Example 4: Product Card Component

**File:** `src/components/ProductCard.jsx`

```jsx
function ProductCard({ name, price, stock, image, category, onEdit, onDelete }) {
  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '20px',
    width: '250px',
    backgroundColor: 'white',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  };

  const imageStyle = {
    width: '100%',
    height: '180px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
    marginBottom: '15px'
  };

  const priceStyle = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#2ecc71',
    margin: '10px 0'
  };

  const stockStyle = {
    color: stock > 0 ? '#27ae60' : '#e74c3c',
    fontWeight: 'bold',
    fontSize: '0.9rem'
  };

  const buttonStyle = {
    padding: '8px 16px',
    margin: '5px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 'bold'
  };

  return (
    <div style={cardStyle}>
      <div style={imageStyle}>
        {image || '📦'}
      </div>
      
      <span style={{ 
        backgroundColor: '#3498db', 
        color: 'white', 
        padding: '4px 10px', 
        borderRadius: '5px',
        fontSize: '0.8rem'
      }}>
        {category}
      </span>
      
      <h3 style={{ margin: '15px 0 5px', color: '#2c3e50' }}>{name}</h3>
      
      <div style={priceStyle}>Rs. {price.toLocaleString()}</div>
      
      <p style={stockStyle}>
        {stock > 0 ? `${stock} in stock` : 'Out of stock'}
      </p>
      
      <div style={{ marginTop: '15px' }}>
        <button 
          style={{ ...buttonStyle, backgroundColor: '#3498db', color: 'white' }}
          onClick={onEdit}
        >
          Edit
        </button>
        <button 
          style={{ ...buttonStyle, backgroundColor: '#e74c3c', color: 'white' }}
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default ProductCard;
```

---

## 🛠️ Part 4: User Management Feature Implementation (1 hour 15 minutes)

### Project Structure Update

```
src/
├── components/
│   ├── UserCard.jsx
│   ├── StatsCard.jsx
│   ├── ProductCard.jsx
│   ├── Button.jsx
│   ├── Header.jsx
│   └── Footer.jsx
├── pages/
│   ├── Dashboard.jsx
│   └── UsersPage.jsx        ← New today
├── App.jsx
└── main.jsx
```

---

### Step 1: User Data Prepare Karo

**File:** `src/data/usersData.js` (New file)

```javascript
// Dummy user data for practice
export const usersData = [
  {
    id: 1,
    name: "Ahmed Ali",
    email: "ahmed.ali@company.com",
    role: "Administrator",
    status: "Active",
    joinDate: "2024-01-15",
    department: "IT"
  },
  {
    id: 2,
    name: "Sara Khan",
    email: "sara.khan@company.com",
    role: "Manager",
    status: "Active",
    joinDate: "2024-02-20",
    department: "Sales"
  },
  {
    id: 3,
    name: "Ali Raza",
    email: "ali.raza@company.com",
    role: "Employee",
    status: "Active",
    joinDate: "2024-03-10",
    department: "Marketing"
  },
  {
    id: 4,
    name: "Fatima Sheikh",
    email: "fatima.sheikh@company.com",
    role: "Manager",
    status: "Active",
    joinDate: "2024-01-25",
    department: "HR"
  },
  {
    id: 5,
    name: "Hassan Ahmed",
    email: "hassan.ahmed@company.com",
    role: "Employee",
    status: "Inactive",
    joinDate: "2023-12-01",
    department: "IT"
  },
  {
    id: 6,
    name: "Ayesha Malik",
    email: "ayesha.malik@company.com",
    role: "Employee",
    status: "Active",
    joinDate: "2024-04-05",
    department: "Finance"
  }
];
```

---

### Step 2: UserTable Component Banao

**File:** `src/components/UserTable.jsx`

```jsx
function UserTable({ users }) {
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    overflow: 'hidden'
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

  const handleEdit = (userId) => {
    alert(`Edit user ${userId}`);
  };

  const handleDelete = (userId) => {
    alert(`Delete user ${userId}`);
  };

  return (
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
        {users.map((user) => (
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
                onClick={() => handleEdit(user.id)}
              >
                Edit
              </button>
              <button 
                style={{ ...buttonStyle, backgroundColor: '#e74c3c', color: 'white' }}
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UserTable;
```

---

### Step 3: UsersPage Component Banao

**File:** `src/pages/UsersPage.jsx`

```jsx
import { usersData } from '../data/usersData';
import UserTable from '../components/UserTable';
import StatsCard from '../components/StatsCard';

function UsersPage() {
  // Calculate stats
  const totalUsers = usersData.length;
  const activeUsers = usersData.filter(u => u.status === 'Active').length;
  const inactiveUsers = usersData.filter(u => u.status === 'Inactive').length;
  const admins = usersData.filter(u => u.role === 'Administrator').length;

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
          <h2 style={{ color: '#2c3e50' }}>All Users</h2>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#2ecc71',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem'
          }}>
            + Add New User
          </button>
        </div>
        
        <UserTable users={usersData} />
      </div>
    </div>
  )
}

export default UsersPage;
```

---

### Step 4: App.jsx Update Karo

**File:** `src/App.jsx`

```jsx
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import UsersPage from './pages/UsersPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UsersPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="App">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main style={{ minHeight: '80vh', backgroundColor: '#ecf0f1' }}>
        {renderPage()}
      </main>
      
      <Footer />
    </div>
  )
}

export default App;
```

---

### Step 5: Header Component Update (Navigation Add Karo)

**File:** `src/components/Header.jsx`

```jsx
function Header({ currentPage, setCurrentPage }) {
  const headerStyle = {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '20px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  };

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    cursor: 'pointer'
  };

  const navStyle = {
    display: 'flex',
    gap: '30px',
    listStyle: 'none',
    margin: 0,
    padding: 0
  };

  const linkStyle = (page) => ({
    color: 'white',
    textDecoration: 'none',
    cursor: 'pointer',
    padding: '8px 16px',
    borderRadius: '5px',
    backgroundColor: currentPage === page ? '#34495e' : 'transparent',
    fontWeight: currentPage === page ? 'bold' : 'normal',
    transition: 'all 0.3s'
  });

  return (
    <header style={headerStyle}>
      <div style={logoStyle} onClick={() => setCurrentPage('dashboard')}>
        🏢 Admin Panel
      </div>
      <nav>
        <ul style={navStyle}>
          <li>
            <a 
              style={linkStyle('dashboard')}
              onClick={() => setCurrentPage('dashboard')}
            >
              Dashboard
            </a>
          </li>
          <li>
            <a 
              style={linkStyle('users')}
              onClick={() => setCurrentPage('users')}
            >
              Users
            </a>
          </li>
          <li>
            <a style={linkStyle('products')}>Products</a>
          </li>
          <li>
            <a style={linkStyle('settings')}>Settings</a>
          </li>
        </ul>
      </nav>
      <div>
        <span>👤 Admin User</span>
      </div>
    </header>
  )
}

export default Header;
```

---

## 🎯 Part 5: Practice Tasks (30 minutes)

### Task 1: Department Filter Component

**File:** `src/components/DepartmentFilter.jsx`

```jsx
function DepartmentFilter({ departments, selectedDepartment, onSelect }) {
  const containerStyle = {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  };

  const buttonStyle = (isSelected) => ({
    padding: '10px 20px',
    border: '2px solid #3498db',
    borderRadius: '25px',
    backgroundColor: isSelected ? '#3498db' : 'white',
    color: isSelected ? 'white' : '#3498db',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.95rem',
    transition: 'all 0.3s'
  });

  return (
    <div style={containerStyle}>
      <button 
        style={buttonStyle(selectedDepartment === 'All')}
        onClick={() => onSelect('All')}
      >
        All Departments
      </button>
      {departments.map((dept) => (
        <button 
          key={dept}
          style={buttonStyle(selectedDepartment === dept)}
          onClick={() => onSelect(dept)}
        >
          {dept}
        </button>
      ))}
    </div>
  )
}

export default DepartmentFilter;
```

---

### Task 2: UserGrid View Component

**File:** `src/components/UserGrid.jsx`

```jsx
import UserCard from './UserCard';

function UserGrid({ users }) {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px',
    padding: '20px'
  };

  return (
    <div style={gridStyle}>
      {users.map((user) => (
        <UserCard 
          key={user.id}
          name={user.name}
          role={user.role}
          email={user.email}
          status={user.status}
        />
      ))}
    </div>
  )
}

export default UserGrid;
```

---

## 🎓 Part 6: Key Concepts Summary (15 minutes)

### ✅ Aaj Kya Seekha?

1. **Functional Components:**
   - Function ki tarah banate hain
   - PascalCase naming
   - Return JSX
   - Export/Import

2. **Props:**
   - Data passing ka tareeka
   - Parent → Child
   - Destructuring recommended
   - Multiple types (string, number, boolean, array, object, function)

3. **Reusability:**
   - Ek component, multiple times use
   - Different props = Different output
   - DRY principle (Don't Repeat Yourself)

4. **Component Communication:**
   - Props se data pass
   - Functions bhi pass kar sakte hain
   - One-way data flow (Parent → Child)

---

## 📋 Today's Checklist

- [ ] Functional components ka concept clear
- [ ] Components banane aate hain
- [ ] Export/Import kar sakte ho
- [ ] Props ka concept samajh aa gaya
- [ ] Destructuring use kar sakte ho
- [ ] Multiple types ke props use kiye
- [ ] Default props set kar sakte ho
- [ ] UserCard component banaya
- [ ] StatsCard component banaya
- [ ] ProductCard component banaya
- [ ] Button component banaya
- [ ] UserTable component banaya
- [ ] UsersPage complete kiya
- [ ] Navigation working
- [ ] Dummy data use kiya
- [ ] User Management feature ready

---

## 🚀 Today's Achievement

**Project Features Added:**
✅ User Management page complete
✅ User Table with 6 dummy users
✅ Stats cards (Total, Active, Inactive, Admins)
✅ Reusable components (UserCard, StatsCard, ProductCard, Button)
✅ Navigation system working
✅ Component-based architecture implemented

**Your Project Status:**
```
Week 1 - Day 3: ✅ COMPLETE
Current: User Management Feature Working
Next: Day 4 - State Management (useState Hook)
Progress: 3/42 days (7% complete!)
```

---

## 💡 Props Best Practices

### ✅ DO:
```jsx
// Descriptive prop names
<UserCard name="Ahmed" email="ahmed@example.com" />

// Destructuring
function Card({ title, content }) { }

// Default values
function Greeting({ name = "Guest" }) { }
```

### ❌ DON'T:
```jsx
// Vague names
<UserCard data1="Ahmed" data2="ahmed@example.com" />

// Too many props (use object instead)
<User name="" email="" age="" address="" phone="" city="" country="" />

// Better:
<User userData={{ name, email, age, address, phone, city, country }} />
```

---

## 🎯 Homework / Practice

1. **Task 1:** ProductCard component use karke 5 products ka grid banao
2. **Task 2:** StatsCard mein ek aur prop add karo "trend" (↑ ya ↓)
3. **Task 3:** UserCard mein "View Details" button add karo
4. **Task 4:** DepartmentFilter component ko UsersPage mein integrate karo

---

## ❓ Common Problems & Solutions

### Problem 1: Props undefined aa rahe hain
**Solution:** Parent component se props pass kiye ya nahi check karo
```jsx
// Wrong
<UserCard />

// Correct
<UserCard name="Ahmed" email="ahmed@example.com" />
```

---

### Problem 2: Component render nahi ho raha
**Solution:** Export/Import check karo
```jsx
// Component file
export default UserCard;

// Import file
import UserCard from './components/UserCard';
```

---

### Problem 3: Props mein function pass karte waqt brackets
**Solution:** Curly braces use karo, call nahi karo
```jsx
// Wrong
<Button onClick={handleClick()} />

// Correct
<Button onClick={handleClick} />
```

---

## 📚 Quick Reference

### Component Template:
```jsx
function ComponentName({ prop1, prop2 }) {
  // Logic here
  
  return (
    <div>
      {/* JSX here */}
    </div>
  )
}

export default ComponentName;
```

### Props Patterns:
```jsx
// String
<Component title="Hello" />

// Number
<Component count={10} />

// Boolean
<Component isActive={true} />

// Array
<Component items={[1, 2, 3]} />

// Object
<Component user={{ name: 'Ahmed' }} />

// Function
<Component onClick={handleClick} />

// Children
<Component>
  <ChildComponent />
</Component>
```

---

## 🎉 Excellent Progress!

Day 3 complete! Tumne major milestone cross kar liya!

**Aaj ka Summary:**
- ✅ Components mastery
- ✅ Props ka complete concept
- ✅ 8 reusable components
- ✅ User Management feature
- ✅ Professional table layout
- ✅ Navigation system
- ✅ Real project feeling!

**Kal (Day 4) kya hoga:**
- useState Hook (State management)
- Interactive features
- Form handling
- Add/Edit/Delete users (working buttons)
- Real-time UI updates

---

**Ready for Day 4? Type "Day 4 start karo" jab ready ho!** 🚀

**Current Progress: 3/42 days = 7% complete! Keep going! 💪**
