# Week 1 - Day 5: Event Handling & Advanced Forms

**Study Time:** 4 Hours  
**Goal:** Event handling mastery + Advanced form handling + Validation + Login system

---

## 🎯 Today's Goal

Aaj tum:
- All types of events handle karoge (onClick, onChange, onSubmit, etc.)
- Controlled vs Uncontrolled inputs samjhoge
- Form validation implement karoge
- Login form banao ge
- Contact form banao ge
- Error messages show karoge
- Admin Panel mein Login system add karoge

---

## 📚 Part 1: Event Handling Deep Dive (45 minutes)

### 🔹 Event Kya Hai?

**Simple Words Mein:**
Event = Koi action jo user karta hai (click, type, submit, hover, etc.)

**Real Life Example:**
- **Doorbell** = Event
- **You pressing the button** = User action
- **Bell ringing** = Event handler (function jo run hota hai)

---

### 🔹 React Mein Events Kaise Kaam Karte Hain?

#### HTML vs React Events

**HTML:**
```html
<button onclick="handleClick()">Click</button>
```

**React:**
```jsx
<button onClick={handleClick}>Click</button>
```

**Differences:**
1. React mein **camelCase** (`onClick` not `onclick`)
2. Function reference pass karo, call nahi (`{handleClick}` not `{handleClick()}`)
3. Event object automatically mil jata hai

---

### 🔹 Common React Events

#### 1. **Mouse Events**
```jsx
onClick       // Click karne pe
onDoubleClick // Double click pe
onMouseEnter  // Mouse hover karne pe
onMouseLeave  // Mouse hata ne pe
onMouseMove   // Mouse move karne pe
```

#### 2. **Keyboard Events**
```jsx
onKeyDown     // Key press karne pe
onKeyUp       // Key release karne pe
onKeyPress    // Key type karne pe (deprecated)
```

#### 3. **Form Events**
```jsx
onChange      // Input value change hone pe
onSubmit      // Form submit hone pe
onFocus       // Input focus hone pe
onBlur        // Input focus hata ne pe
```

#### 4. **Other Events**
```jsx
onScroll      // Scroll karne pe
onLoad        // Page/Image load hone pe
onError       // Error aane pe
```

---

### 🔹 Event Object

Har event handler ko automatically ek **event object** milta hai:

```jsx
function handleClick(event) {
  console.log(event);           // Pura event object
  console.log(event.target);    // Jis element pe click hua
  console.log(event.type);      // Event type (click, change, etc.)
  console.log(event.target.value); // Input ki value (for inputs)
}

<button onClick={handleClick}>Click Me</button>
```

**Important Properties:**
- `event.target` → Element jis pe event hua
- `event.target.value` → Input field ki value
- `event.target.name` → Input field ka name
- `event.preventDefault()` → Default behavior rok do
- `event.stopPropagation()` → Event bubbling rok do

---

### 🔹 preventDefault() - Important!

**Example: Form submit ko rok na**
```jsx
function handleSubmit(event) {
  event.preventDefault();  // Page reload nahi hoga
  console.log("Form submitted!");
}

<form onSubmit={handleSubmit}>
  <button type="submit">Submit</button>
</form>
```

**Kyun Chahiye?**
- Form submit hone pe page reload hota hai (default behavior)
- `preventDefault()` se page reload nahi hoga
- React mein hamesha use karo!

---

## 💻 Part 2: Event Handling Examples (1 hour)

### Example 1: Click Events

```jsx
import { useState } from 'react';

function ClickEvents() {
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setMessage("Button clicked!");
    setCount(count + 1);
  };

  const handleDoubleClick = () => {
    setMessage("Button double-clicked!");
  };

  const handleRightClick = (event) => {
    event.preventDefault();  // Default right-click menu nahi aayega
    setMessage("Right-clicked!");
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>Click Events Demo</h2>
      
      <button 
        onClick={handleClick}
        style={{
          padding: '12px 24px',
          margin: '10px',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Click Me
      </button>

      <button 
        onDoubleClick={handleDoubleClick}
        style={{
          padding: '12px 24px',
          margin: '10px',
          backgroundColor: '#2ecc71',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Double Click Me
      </button>

      <button 
        onContextMenu={handleRightClick}
        style={{
          padding: '12px 24px',
          margin: '10px',
          backgroundColor: '#e74c3c',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Right Click Me
      </button>

      <div style={{ marginTop: '20px', fontSize: '1.2rem' }}>
        <p><strong>Message:</strong> {message}</p>
        <p><strong>Click Count:</strong> {count}</p>
      </div>
    </div>
  )
}

export default ClickEvents;
```

---

### Example 2: Mouse Hover Events

```jsx
import { useState } from 'react';

function HoverEvents() {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setPosition({
      x: event.clientX,
      y: event.clientY
    });
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>Hover Events Demo</h2>

      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        style={{
          width: '400px',
          height: '300px',
          backgroundColor: isHovered ? '#3498db' : '#ecf0f1',
          border: '2px solid #2c3e50',
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.5rem',
          color: isHovered ? 'white' : '#2c3e50',
          transition: 'all 0.3s',
          cursor: 'pointer'
        }}
      >
        {isHovered ? 'Hovering! 🎉' : 'Hover over me!'}
      </div>

      <p style={{ marginTop: '20px' }}>
        <strong>Mouse Position:</strong> X: {position.x}, Y: {position.y}
      </p>
    </div>
  )
}

export default HoverEvents;
```

---

### Example 3: Keyboard Events

```jsx
import { useState } from 'react';

function KeyboardEvents() {
  const [key, setKey] = useState("");
  const [input, setInput] = useState("");

  const handleKeyDown = (event) => {
    setKey(event.key);
    
    // Special keys detect karo
    if (event.key === 'Enter') {
      alert("Enter pressed!");
    } else if (event.key === 'Escape') {
      setInput("");
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>Keyboard Events Demo</h2>
      
      <input 
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type something..."
        style={{
          padding: '12px',
          fontSize: '1rem',
          width: '400px',
          borderRadius: '5px',
          border: '2px solid #3498db'
        }}
      />

      <div style={{ marginTop: '20px' }}>
        <p><strong>Last Key Pressed:</strong> {key || "None"}</p>
        <p><strong>Input Value:</strong> {input || "(empty)"}</p>
        <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
          💡 Tip: Press 'Enter' for alert, 'Escape' to clear
        </p>
      </div>
    </div>
  )
}

export default KeyboardEvents;
```

---

## 📚 Part 3: Forms in React (1 hour 30 minutes)

### 🔹 Controlled vs Uncontrolled Components

#### Uncontrolled Component (❌ Not Recommended)
```jsx
function UncontrolledForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // DOM se directly value nikalni padegi
    const name = event.target.elements.name.value;
    console.log(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" />
      <button type="submit">Submit</button>
    </form>
  )
}
```

#### Controlled Component (✅ Recommended)
```jsx
import { useState } from 'react';

function ControlledForm() {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name);  // State se value milegi
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <button type="submit">Submit</button>
    </form>
  )
}
```

**Controlled Component Kyun Better?**
1. React ki state mein data hai
2. Real-time validation possible
3. Easier to debug
4. More control

---

### 🔹 Complete Contact Form Example

**File:** `src/components/ContactForm.jsx`

```jsx
import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error jab user type kare
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{11}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 11 digits";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Form is valid
    console.log("Form submitted:", formData);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setIsSubmitted(false);
    }, 3000);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '5px',
    borderRadius: '5px',
    border: '2px solid #ddd',
    fontSize: '1rem',
    boxSizing: 'border-box'
  };

  const errorInputStyle = {
    ...inputStyle,
    borderColor: '#e74c3c'
  };

  const errorMessageStyle = {
    color: '#e74c3c',
    fontSize: '0.85rem',
    marginBottom: '10px',
    marginTop: '0'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#2c3e50'
  };

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '30px auto', 
      padding: '30px',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>
        Contact Us
      </h2>

      {isSubmitted && (
        <div style={{
          padding: '15px',
          backgroundColor: '#d4edda',
          color: '#155724',
          borderRadius: '5px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          ✅ Message sent successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Name *</label>
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            style={errors.name ? errorInputStyle : inputStyle}
          />
          {errors.name && <p style={errorMessageStyle}>{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Email *</label>
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            style={errors.email ? errorInputStyle : inputStyle}
          />
          {errors.email && <p style={errorMessageStyle}>{errors.email}</p>}
        </div>

        {/* Phone Field */}
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Phone *</label>
          <input 
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="03001234567"
            style={errors.phone ? errorInputStyle : inputStyle}
          />
          {errors.phone && <p style={errorMessageStyle}>{errors.phone}</p>}
        </div>

        {/* Subject Field */}
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Subject *</label>
          <input 
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What is this about?"
            style={errors.subject ? errorInputStyle : inputStyle}
          />
          {errors.subject && <p style={errorMessageStyle}>{errors.subject}</p>}
        </div>

        {/* Message Field */}
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Message *</label>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message here..."
            rows="5"
            style={errors.message ? errorInputStyle : inputStyle}
          />
          {errors.message && <p style={errorMessageStyle}>{errors.message}</p>}
        </div>

        {/* Submit Button */}
        <button 
          type="submit"
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
        >
          Send Message
        </button>
      </form>
    </div>
  )
}

export default ContactForm;
```

---

## 🛠️ Part 4: Login System Implementation (1 hour)

### Step 1: Login Form Component

**File:** `src/components/LoginForm.jsx`

```jsx
import { useState } from 'react';

function LoginForm({ onLogin }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });

    // Clear error
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!credentials.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!credentials.password) {
      newErrors.password = "Password is required";
    } else if (credentials.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Dummy validation
      if (credentials.email === "admin@admin.com" && credentials.password === "admin123") {
        onLogin(credentials.email);
      } else {
        setErrors({ general: "Invalid email or password" });
        setIsLoading(false);
      }
    }, 1000);
  };

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    width: '400px',
    maxWidth: '90%'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '5px',
    borderRadius: '6px',
    border: '2px solid #ddd',
    fontSize: '1rem',
    boxSizing: 'border-box'
  };

  const errorInputStyle = {
    ...inputStyle,
    borderColor: '#e74c3c'
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    opacity: isLoading ? 0.7 : 1
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#2c3e50', marginBottom: '10px' }}>
            🏢 Admin Panel
          </h1>
          <p style={{ color: '#7f8c8d', fontSize: '1rem' }}>
            Sign in to your account
          </p>
        </div>

        {errors.general && (
          <div style={{
            padding: '12px',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            borderRadius: '6px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            ❌ {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2c3e50' }}>
              Email Address
            </label>
            <input 
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="admin@admin.com"
              style={errors.email ? errorInputStyle : inputStyle}
            />
            {errors.email && (
              <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '5px' }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2c3e50' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter your password"
                style={errors.password ? errorInputStyle : inputStyle}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.2rem'
                }}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && (
              <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '5px' }}>
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me */}
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input type="checkbox" style={{ marginRight: '8px' }} />
              <span style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>Remember me</span>
            </label>
            <a href="#" style={{ color: '#3498db', fontSize: '0.9rem', textDecoration: 'none' }}>
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button type="submit" style={buttonStyle} disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Credentials */}
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#fff3cd',
          borderRadius: '6px',
          fontSize: '0.85rem'
        }}>
          <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>Demo Credentials:</p>
          <p style={{ margin: '0' }}>Email: admin@admin.com</p>
          <p style={{ margin: '0' }}>Password: admin123</p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm;
```

---

### Step 2: Login Page Component

**File:** `src/pages/LoginPage.jsx`

```jsx
import LoginForm from '../components/LoginForm';

function LoginPage({ onLogin }) {
  return <LoginForm onLogin={onLogin} />
}

export default LoginPage;
```

---

### Step 3: App.jsx Update (Add Authentication)

**File:** `src/App.jsx`

```jsx
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleLogin = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setIsLoggedIn(false);
      setUserEmail("");
      setCurrentPage('dashboard');
    }
  };

  // If not logged in, show login page
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

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
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        userEmail={userEmail}
        onLogout={handleLogout}
      />
      
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

### Step 4: Header Update (Add Logout)

**File:** `src/components/Header.jsx`

```jsx
function Header({ currentPage, setCurrentPage, userEmail, onLogout }) {
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

  const userSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  };

  const logoutButtonStyle = {
    padding: '8px 16px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
  };

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
      <div style={userSectionStyle}>
        <span>👤 {userEmail}</span>
        <button style={logoutButtonStyle} onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}

export default Header;
```

---

## 🎯 Part 5: Practice Tasks (30 minutes)

### Task 1: Registration Form

**File:** `src/components/RegisterForm.jsx`

```jsx
import { useState } from 'react';

function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to terms and conditions";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert("Registration successful!");
    console.log("User registered:", formData);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '5px',
    borderRadius: '5px',
    border: '2px solid #ddd',
    fontSize: '1rem',
    boxSizing: 'border-box'
  };

  return (
    <div style={{ maxWidth: '500px', margin: '30px auto', padding: '30px', backgroundColor: 'white', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Create Account</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Full Name *
          </label>
          <input 
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.fullName && <p style={{ color: '#e74c3c', fontSize: '0.85rem' }}>{errors.fullName}</p>}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Email *
          </label>
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.email && <p style={{ color: '#e74c3c', fontSize: '0.85rem' }}>{errors.email}</p>}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Password *
          </label>
          <input 
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.password && <p style={{ color: '#e74c3c', fontSize: '0.85rem' }}>{errors.password}</p>}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Confirm Password *
          </label>
          <input 
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.confirmPassword && <p style={{ color: '#e74c3c', fontSize: '0.85rem' }}>{errors.confirmPassword}</p>}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <input 
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              style={{ marginRight: '10px' }}
            />
            <span>I agree to Terms and Conditions</span>
          </label>
          {errors.agreeToTerms && <p style={{ color: '#e74c3c', fontSize: '0.85rem' }}>{errors.agreeToTerms}</p>}
        </div>

        <button 
          type="submit"
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#2ecc71',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default RegisterForm;
```

---

## 🎓 Part 6: Key Concepts Summary (15 minutes)

### ✅ Aaj Kya Seekha?

1. **Event Handling:**
   - onClick, onChange, onSubmit, onMouseEnter, onKeyDown
   - Event object usage
   - preventDefault()

2. **Controlled Components:**
   - Input value state se control
   - onChange handler
   - Better than uncontrolled

3. **Form Validation:**
   - Client-side validation
   - Error messages
   - Real-time feedback

4. **Login System:**
   - Authentication flow
   - Protected routes
   - Logout functionality

5. **User Experience:**
   - Loading states
   - Success messages
   - Error handling

---

## 📋 Today's Checklist

- [ ] Event handling samajh aa gaya
- [ ] onClick events handle kar sakte ho
- [ ] onChange events handle kar sakte ho
- [ ] onSubmit events handle kar sakte ho
- [ ] Controlled inputs bana sakte ho
- [ ] Form validation implement kar sakte ho
- [ ] Contact form banaya
- [ ] Login form banaya
- [ ] Registration form banaya
- [ ] Login system implemented
- [ ] Logout functionality working
- [ ] Error messages show hote hain
- [ ] Success messages show hote hain
- [ ] Loading states implemented

---

## 🚀 Today's Achievement

**Project Features Added:**
✅ Complete Login System
✅ Authentication flow
✅ Protected routes
✅ Logout functionality
✅ Contact form with validation
✅ Registration form
✅ Error handling
✅ Success feedback
✅ Loading states

**Your Project Status:**
```
Week 1 - Day 5: ✅ COMPLETE
Current: Full Authentication System Ready
Next: Day 6 & 7 - Project Polish & Week Review
Progress: 5/42 days (12% complete!)
```

---

## 💡 Form Validation Best Practices

### ✅ DO:
```jsx
// Validate on submit
const handleSubmit = (e) => {
  e.preventDefault();
  const errors = validateForm();
  if (Object.keys(errors).length > 0) {
    setErrors(errors);
    return;
  }
  // Process form
};

// Clear errors when user types
const handleChange = (e) => {
  setValue(e.target.value);
  if (errors.field) {
    setErrors({ ...errors, field: "" });
  }
};

// Show specific error messages
{errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
```

### ❌ DON'T:
```jsx
// Don't validate on every keystroke (annoying)
onChange={() => validateAll()}

// Don't use generic error messages
"Error occurred"  // Bad
"Email format is invalid"  // Good

// Don't forget preventDefault
onSubmit={(e) => { /* forgot e.preventDefault() */ }}
```

---

## 🎯 Homework

1. **Task 1:** Add "Forgot Password" functionality
2. **Task 2:** Add password strength indicator
3. **Task 3:** Add "Show/Hide Password" toggle to registration
4. **Task 4:** Create a Settings form with multiple input types

---

## ❓ Common Problems & Solutions

### Problem 1: Form submits and page refreshes
**Solution:** Add `preventDefault()`
```jsx
const handleSubmit = (e) => {
  e.preventDefault();  // Don't forget!
  // Rest of code
};
```

---

### Problem 2: Input value not updating
**Solution:** Add both value and onChange
```jsx
<input 
  value={inputValue}      // Connect to state
  onChange={handleChange}  // Update state
/>
```

---

### Problem 3: Checkbox not working
**Solution:** Use checked instead of value
```jsx
<input 
  type="checkbox"
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
/>
```

---

## 📚 Quick Reference

### Event Handler Template:
```jsx
const handleEvent = (event) => {
  event.preventDefault();  // If needed
  const value = event.target.value;
  // Your logic
};

<element onEvent={handleEvent} />
```

### Form Template:
```jsx
const [formData, setFormData] = useState({});
const [errors, setErrors] = useState({});

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
  e.preventDefault();
  const errors = validate();
  if (errors) return;
  // Submit
};

<form onSubmit={handleSubmit}>
  <input name="field" value={formData.field} onChange={handleChange} />
  <button type="submit">Submit</button>
</form>
```

---

## 🎉 Fantastic Progress!

Week 1 - Day 5 complete! Tum ab React ke advanced concepts use kar sakte ho!

**Week 1 Summary:**
- ✅ React basics mastered
- ✅ Components & Props
- ✅ State management
- ✅ Event handling
- ✅ Forms & Validation
- ✅ Login system ready
- ✅ Admin panel interactive

**Next (Days 6-7):**
- Project polish
- Code cleanup
- More features
- Week 1 review
- Preparation for Week 2 (MUI)

---

**Ready for Day 6? Type "Day 6 start karo" jab ready ho!** 🚀

**Current Progress: 5/42 days = 12% complete! Outstanding! 🌟**
