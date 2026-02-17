# 📅 Week 2 - Day 2: MUI Basic Components Deep Dive

## 🎯 Today's Goal
**Aaj hum MUI ke teen sabse important components mastery karenge: Button, TextField, aur Grid System!**

**Today's Focus:**
- ✅ MUI Button component mastery (10+ variants)
- ✅ TextField component deep dive (all input types)
- ✅ Grid system for responsive layouts
- ✅ Form validation with MUI
- ✅ Build complete User Registration Form

---

## 📚 Session Breakdown (4 Hours)

| Time | Topic | Duration |
|------|-------|----------|
| **Hour 1** | Button Component Mastery | 60 min |
| **Hour 2** | TextField Component Deep Dive | 60 min |
| **Hour 3** | Grid System & Responsive Layouts | 60 min |
| **Hour 4** | Complete Form Implementation | 60 min |

---

## 🔘 Part 1: MUI Button Component Mastery (60 minutes)

### 📖 What is a Button?

**Simple Urdu/English:**
Button wo component hai jo user click kar ke koi action perform kare. MUI mein buttons bahut powerful hain - different colors, sizes, variants, aur icons ke sath.

**Why MUI Button?**
- ✅ Professional look
- ✅ Built-in animations
- ✅ Consistent styling
- ✅ Accessibility features
- ✅ Loading states
- ✅ Icon support

---

### 🎨 Button Variants

MUI Button ke **3 main variants** hain:

#### 1. Contained Button (Solid Background)
```jsx
<Button variant="contained">Contained Button</Button>
```
**Use Case:** Primary actions (Submit, Save, Login)

#### 2. Outlined Button (Border Only)
```jsx
<Button variant="outlined">Outlined Button</Button>
```
**Use Case:** Secondary actions (Cancel, Reset)

#### 3. Text Button (No Background, No Border)
```jsx
<Button variant="text">Text Button</Button>
```
**Use Case:** Tertiary actions (Learn More, Skip)

---

### 🎨 Button Colors

MUI Button ke **6 colors** hain:

```jsx
<Button variant="contained" color="primary">Primary</Button>
<Button variant="contained" color="secondary">Secondary</Button>
<Button variant="contained" color="success">Success</Button>
<Button variant="contained" color="error">Error</Button>
<Button variant="contained" color="warning">Warning</Button>
<Button variant="contained" color="info">Info</Button>
```

**Color Guide:**
- **Primary:** Main actions (Login, Submit)
- **Secondary:** Alternative actions
- **Success:** Positive actions (Save, Confirm)
- **Error:** Destructive actions (Delete, Remove)
- **Warning:** Caution actions (Warn, Alert)
- **Info:** Informational actions (Details, Help)

---

### 📏 Button Sizes

```jsx
<Button variant="contained" size="small">Small</Button>
<Button variant="contained" size="medium">Medium (Default)</Button>
<Button variant="contained" size="large">Large</Button>
```

---

### 🖼️ Buttons with Icons

```jsx
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

// Icon on left (startIcon)
<Button variant="contained" startIcon={<SendIcon />}>
  Send
</Button>

// Icon on right (endIcon)
<Button variant="outlined" endIcon={<DeleteIcon />}>
  Delete
</Button>

// Icon only button
<IconButton color="primary">
  <SaveIcon />
</IconButton>
```

---

### Step 1: Create Button Demo Page

**File:** `src/pages/ButtonDemo.jsx`

```jsx
// Complete Button Component Demo

import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
  Card,
  CardContent,
  Stack,
  Divider,
  Alert
} from '@mui/material';
import {
  Send as SendIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

function ButtonDemo() {
  
  const [loading, setLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Action completed!');
    }, 2000);
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      
      {/* Page Header */}
      <Typography variant="h3" gutterBottom>
        🔘 MUI Button Component Complete Guide
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        MUI ke Button component ki har variant aur use case yahan hai.
      </Typography>

      {/* 1. Button Variants */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            1️⃣ Button Variants
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Teen main variants: Contained, Outlined, Text
          </Typography>
          
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="text">Text</Button>
          </Stack>

          <Alert severity="info" sx={{ marginTop: 2 }}>
            <strong>Tip:</strong> Contained buttons primary actions ke liye, 
            Outlined secondary actions ke liye, aur Text tertiary actions ke liye use karo.
          </Alert>
        </CardContent>
      </Card>

      {/* 2. Button Colors */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            2️⃣ Button Colors
          </Typography>
          
          {/* Contained Buttons */}
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Contained Variant:
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ marginTop: 1 }}>
            <Button variant="contained" color="primary">Primary</Button>
            <Button variant="contained" color="secondary">Secondary</Button>
            <Button variant="contained" color="success">Success</Button>
            <Button variant="contained" color="error">Error</Button>
            <Button variant="contained" color="warning">Warning</Button>
            <Button variant="contained" color="info">Info</Button>
          </Stack>

          {/* Outlined Buttons */}
          <Typography variant="h6" sx={{ marginTop: 3 }}>
            Outlined Variant:
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ marginTop: 1 }}>
            <Button variant="outlined" color="primary">Primary</Button>
            <Button variant="outlined" color="secondary">Secondary</Button>
            <Button variant="outlined" color="success">Success</Button>
            <Button variant="outlined" color="error">Error</Button>
            <Button variant="outlined" color="warning">Warning</Button>
            <Button variant="outlined" color="info">Info</Button>
          </Stack>

          {/* Text Buttons */}
          <Typography variant="h6" sx={{ marginTop: 3 }}>
            Text Variant:
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ marginTop: 1 }}>
            <Button variant="text" color="primary">Primary</Button>
            <Button variant="text" color="secondary">Secondary</Button>
            <Button variant="text" color="success">Success</Button>
            <Button variant="text" color="error">Error</Button>
            <Button variant="text" color="warning">Warning</Button>
            <Button variant="text" color="info">Info</Button>
          </Stack>
        </CardContent>
      </Card>

      {/* 3. Button Sizes */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            3️⃣ Button Sizes
          </Typography>
          
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
            <Button variant="contained" size="small">Small</Button>
            <Button variant="contained" size="medium">Medium (Default)</Button>
            <Button variant="contained" size="large">Large</Button>
          </Stack>

          <Divider sx={{ marginY: 2 }} />

          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
            <Button variant="outlined" size="small">Small</Button>
            <Button variant="outlined" size="medium">Medium</Button>
            <Button variant="outlined" size="large">Large</Button>
          </Stack>
        </CardContent>
      </Card>

      {/* 4. Buttons with Icons */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            4️⃣ Buttons with Icons
          </Typography>
          
          {/* Start Icon */}
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Start Icon (Left Side):
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ marginTop: 1 }}>
            <Button variant="contained" startIcon={<SendIcon />}>
              Send
            </Button>
            <Button variant="contained" startIcon={<SaveIcon />} color="success">
              Save
            </Button>
            <Button variant="contained" startIcon={<AddIcon />} color="primary">
              Add New
            </Button>
            <Button variant="contained" startIcon={<DownloadIcon />} color="info">
              Download
            </Button>
          </Stack>

          {/* End Icon */}
          <Typography variant="h6" sx={{ marginTop: 3 }}>
            End Icon (Right Side):
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ marginTop: 1 }}>
            <Button variant="outlined" endIcon={<DeleteIcon />} color="error">
              Delete
            </Button>
            <Button variant="outlined" endIcon={<EditIcon />}>
              Edit
            </Button>
            <Button variant="outlined" endIcon={<UploadIcon />} color="secondary">
              Upload
            </Button>
            <Button variant="outlined" endIcon={<ShareIcon />} color="primary">
              Share
            </Button>
          </Stack>

          {/* Icon Only Buttons */}
          <Typography variant="h6" sx={{ marginTop: 3 }}>
            Icon Only Buttons:
          </Typography>
          <Stack direction="row" spacing={2} sx={{ marginTop: 1 }}>
            <IconButton color="primary">
              <FavoriteIcon />
            </IconButton>
            <IconButton color="secondary">
              <ShareIcon />
            </IconButton>
            <IconButton color="error">
              <DeleteIcon />
            </IconButton>
            <IconButton color="success">
              <SaveIcon />
            </IconButton>
            <IconButton color="info">
              <SettingsIcon />
            </IconButton>
          </Stack>
        </CardContent>
      </Card>

      {/* 5. Button States */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            5️⃣ Button States
          </Typography>
          
          {/* Disabled */}
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Disabled State:
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ marginTop: 1 }}>
            <Button variant="contained" disabled>Disabled Contained</Button>
            <Button variant="outlined" disabled>Disabled Outlined</Button>
            <Button variant="text" disabled>Disabled Text</Button>
          </Stack>

          {/* Loading */}
          <Typography variant="h6" sx={{ marginTop: 3 }}>
            Loading State:
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ marginTop: 1 }}>
            <Button 
              variant="contained" 
              onClick={handleLoadingClick}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Click to Load'}
            </Button>
            
            <Button variant="outlined" disabled={loading}>
              {loading ? 'Processing...' : 'Submit'}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* 6. Full Width Button */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            6️⃣ Full Width Button
          </Typography>
          
          <Button variant="contained" fullWidth sx={{ marginBottom: 2 }}>
            Full Width Button
          </Button>
          
          <Button variant="outlined" fullWidth color="secondary">
            Full Width Outlined
          </Button>
        </CardContent>
      </Card>

      {/* 7. Button Groups & Click Counter */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            7️⃣ Interactive Button Example
          </Typography>
          
          <Alert severity="success" sx={{ marginBottom: 2 }}>
            Button clicked: <strong>{clickCount}</strong> times
          </Alert>
          
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Button 
              variant="contained" 
              onClick={() => setClickCount(clickCount + 1)}
            >
              Click Me (+1)
            </Button>
            
            <Button 
              variant="outlined" 
              color="error"
              onClick={() => setClickCount(0)}
            >
              Reset Counter
            </Button>
            
            <Button 
              variant="text" 
              color="secondary"
              onClick={() => setClickCount(clickCount - 1)}
            >
              Decrease (-1)
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* 8. Real-World Use Cases */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            8️⃣ Real-World Button Use Cases
          </Typography>
          
          {/* Form Actions */}
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Form Actions:
          </Typography>
          <Stack direction="row" spacing={2} sx={{ marginTop: 1 }}>
            <Button variant="contained" color="primary" startIcon={<SaveIcon />}>
              Save
            </Button>
            <Button variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button variant="text" color="error">
              Reset
            </Button>
          </Stack>

          {/* CRUD Actions */}
          <Typography variant="h6" sx={{ marginTop: 3 }}>
            CRUD Operations:
          </Typography>
          <Stack direction="row" spacing={2} sx={{ marginTop: 1 }}>
            <Button variant="contained" color="success" startIcon={<AddIcon />}>
              Create New
            </Button>
            <Button variant="outlined" color="primary" startIcon={<EditIcon />}>
              Edit
            </Button>
            <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
              Delete
            </Button>
          </Stack>

          {/* Navigation Actions */}
          <Typography variant="h6" sx={{ marginTop: 3 }}>
            Navigation:
          </Typography>
          <Stack direction="row" spacing={2} sx={{ marginTop: 1 }}>
            <Button variant="contained">
              Next Step →
            </Button>
            <Button variant="outlined">
              ← Previous
            </Button>
            <Button variant="text">
              Skip for Now
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ButtonDemo;
```

---

## 📝 Part 2: TextField Component Deep Dive (60 minutes)

### 📖 What is TextField?

**Simple Urdu/English:**
TextField wo component hai jahan user text type karta hai. Forms mein sabse zyada use hota hai - name, email, password, etc.

**TextField Features:**
- ✅ Labels (automatic positioning)
- ✅ Helper text (guidance)
- ✅ Error states
- ✅ Icons
- ✅ Variants (outlined, filled, standard)
- ✅ All HTML input types

---

### 🎨 TextField Variants

#### 1. Outlined (Default - Recommended)
```jsx
<TextField label="Outlined" variant="outlined" />
```

#### 2. Filled
```jsx
<TextField label="Filled" variant="filled" />
```

#### 3. Standard (Underline Only)
```jsx
<TextField label="Standard" variant="standard" />
```

---

### 📋 TextField Types

```jsx
<TextField type="text" label="Text" />
<TextField type="email" label="Email" />
<TextField type="password" label="Password" />
<TextField type="number" label="Number" />
<TextField type="tel" label="Phone" />
<TextField type="date" label="Date" InputLabelProps={{ shrink: true }} />
<TextField type="time" label="Time" InputLabelProps={{ shrink: true }} />
```

---

### Step 2: Create TextField Demo Page

**File:** `src/pages/TextFieldDemo.jsx`

```jsx
// Complete TextField Component Demo

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Card,
  CardContent,
  Stack,
  Alert,
  InputAdornment,
  IconButton
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Phone,
  Search,
  AttachMoney
} from '@mui/icons-material';

function TextFieldDemo() {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    age: '',
    message: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      
      {/* Page Header */}
      <Typography variant="h3" gutterBottom>
        📝 MUI TextField Component Complete Guide
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        TextField component ki har variant aur feature yahan hai.
      </Typography>

      {/* 1. TextField Variants */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            1️⃣ TextField Variants
          </Typography>
          
          <Stack spacing={3}>
            <TextField 
              label="Outlined (Default)" 
              variant="outlined"
              fullWidth
              helperText="This is the default and recommended variant"
            />
            
            <TextField 
              label="Filled Variant" 
              variant="filled"
              fullWidth
              helperText="Filled background style"
            />
            
            <TextField 
              label="Standard Variant" 
              variant="standard"
              fullWidth
              helperText="Simple underline style"
            />
          </Stack>
        </CardContent>
      </Card>

      {/* 2. TextField Types */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            2️⃣ Input Types
          </Typography>
          
          <Stack spacing={2.5}>
            <TextField 
              type="text"
              label="Text Input" 
              fullWidth
              placeholder="Enter your text here"
            />
            
            <TextField 
              type="email"
              label="Email Input" 
              fullWidth
              placeholder="example@email.com"
            />
            
            <TextField 
              type="password"
              label="Password Input" 
              fullWidth
              placeholder="Enter password"
            />
            
            <TextField 
              type="number"
              label="Number Input" 
              fullWidth
              placeholder="Enter a number"
            />
            
            <TextField 
              type="tel"
              label="Phone Number" 
              fullWidth
              placeholder="+92 300 1234567"
            />
            
            <TextField 
              type="date"
              label="Date" 
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            
            <TextField 
              type="time"
              label="Time" 
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            
            <TextField 
              type="url"
              label="URL" 
              fullWidth
              placeholder="https://example.com"
            />
          </Stack>
        </CardContent>
      </Card>

      {/* 3. TextField Sizes */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            3️⃣ TextField Sizes
          </Typography>
          
          <Stack spacing={2}>
            <TextField 
              label="Small Size" 
              size="small"
              fullWidth
            />
            
            <TextField 
              label="Medium Size (Default)" 
              size="medium"
              fullWidth
            />
          </Stack>
        </CardContent>
      </Card>

      {/* 4. TextField with Icons */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            4️⃣ TextField with Icons
          </Typography>
          
          <Stack spacing={2.5}>
            {/* Start Adornment */}
            <TextField 
              label="Username" 
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField 
              label="Email" 
              type="email"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField 
              label="Phone" 
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
            />
            
            {/* Password with Toggle */}
            <TextField 
              label="Password with Toggle" 
              type={showPassword ? 'text' : 'password'}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            {/* Search Field */}
            <TextField 
              label="Search" 
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            
            {/* Price Field */}
            <TextField 
              label="Price" 
              type="number"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </CardContent>
      </Card>

      {/* 5. Multiline (Textarea) */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            5️⃣ Multiline TextField (Textarea)
          </Typography>
          
          <Stack spacing={2.5}>
            <TextField 
              label="Message (2 rows)" 
              multiline
              rows={2}
              fullWidth
              placeholder="Enter your message..."
            />
            
            <TextField 
              label="Description (4 rows)" 
              multiline
              rows={4}
              fullWidth
              placeholder="Enter detailed description..."
            />
            
            <TextField 
              label="Comments (Max rows 6)" 
              multiline
              maxRows={6}
              fullWidth
              placeholder="Type your comments..."
            />
          </Stack>
        </CardContent>
      </Card>

      {/* 6. Helper Text & Error States */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            6️⃣ Helper Text & Error States
          </Typography>
          
          <Stack spacing={2.5}>
            <TextField 
              label="With Helper Text" 
              fullWidth
              helperText="This is helper text to guide the user"
            />
            
            <TextField 
              label="Success State" 
              fullWidth
              helperText="✓ This field is valid"
              color="success"
              focused
            />
            
            <TextField 
              label="Error State" 
              fullWidth
              error
              helperText="❌ This field has an error"
            />
            
            <TextField 
              label="Email Validation" 
              type="email"
              fullWidth
              error={formData.email && !validateEmail(formData.email)}
              helperText={
                formData.email && !validateEmail(formData.email)
                  ? "Please enter a valid email"
                  : "Enter your email address"
              }
              value={formData.email}
              onChange={handleChange}
              name="email"
            />
          </Stack>
        </CardContent>
      </Card>

      {/* 7. Required & Disabled States */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            7️⃣ Required & Disabled States
          </Typography>
          
          <Stack spacing={2.5}>
            <TextField 
              label="Required Field" 
              required
              fullWidth
              helperText="This field is required"
            />
            
            <TextField 
              label="Disabled Field" 
              disabled
              fullWidth
              value="Cannot edit this field"
              helperText="This field is disabled"
            />
            
            <TextField 
              label="Read Only Field" 
              fullWidth
              value="This is read-only"
              InputProps={{
                readOnly: true,
              }}
            />
          </Stack>
        </CardContent>
      </Card>

      {/* 8. Live Form Example */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            8️⃣ Interactive Form Example
          </Typography>
          
          <Alert severity="info" sx={{ marginBottom: 3 }}>
            Type karo aur live values dekho!
          </Alert>
          
          <Stack spacing={2.5}>
            <TextField 
              label="Full Name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField 
              label="Email" 
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={formData.email && !validateEmail(formData.email)}
              helperText={
                formData.email && !validateEmail(formData.email)
                  ? "Invalid email format"
                  : ""
              }
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField 
              label="Age" 
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              fullWidth
              inputProps={{ min: 0, max: 120 }}
            />
            
            <TextField 
              label="Message" 
              name="message"
              multiline
              rows={3}
              value={formData.message}
              onChange={handleChange}
              fullWidth
            />
          </Stack>

          {/* Display Form Values */}
          {(formData.name || formData.email || formData.age || formData.message) && (
            <Alert severity="success" sx={{ marginTop: 3 }}>
              <Typography variant="body2" fontWeight="bold" gutterBottom>
                Live Form Values:
              </Typography>
              <Typography variant="body2">Name: {formData.name || '(empty)'}</Typography>
              <Typography variant="body2">Email: {formData.email || '(empty)'}</Typography>
              <Typography variant="body2">Age: {formData.age || '(empty)'}</Typography>
              <Typography variant="body2">Message: {formData.message || '(empty)'}</Typography>
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default TextFieldDemo;
```

---

## 📐 Part 3: Grid System (60 minutes)

### 📖 What is Grid System?

**Simple Urdu/English:**
Grid system layout banane ka tareeqa hai - jaise newspaper mein columns hote hain. MUI Grid **12-column system** use karta hai.

**Why Grid?**
- ✅ Responsive layouts
- ✅ Mobile-friendly automatically
- ✅ Easy alignment
- ✅ Consistent spacing

---

### 🔢 Grid System Basics

**12-Column System:**
```
| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
```

**Examples:**
- `xs={12}` = Full width (100%)
- `xs={6}` = Half width (50%)
- `xs={4}` = One-third width (33.33%)
- `xs={3}` = One-fourth width (25%)

---

### 📱 Responsive Breakpoints

MUI uses 5 breakpoints:

| Breakpoint | Size | Device |
|------------|------|--------|
| `xs` | 0px+ | Mobile phones |
| `sm` | 600px+ | Tablets |
| `md` | 900px+ | Small laptops |
| `lg` | 1200px+ | Desktops |
| `xl` | 1536px+ | Large screens |

---

### Step 3: Create Grid Demo Page

**File:** `src/pages/GridDemo.jsx`

```jsx
// Complete Grid System Demo

import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Stack
} from '@mui/material';

function GridDemo() {
  
  // Demo box component
  const DemoBox = ({ children, color = 'primary.main' }) => (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        backgroundColor: color,
        color: 'white',
        textAlign: 'center',
        minHeight: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h6">{children}</Typography>
    </Paper>
  );

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      
      {/* Page Header */}
      <Typography variant="h3" gutterBottom>
        📐 MUI Grid System Complete Guide
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        MUI ka powerful 12-column Grid system sikho.
      </Typography>

      {/* 1. Basic Grid - Equal Columns */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            1️⃣ Equal Columns (Auto Layout)
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Har column equal space lega.
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs>
              <DemoBox>Column 1</DemoBox>
            </Grid>
            <Grid item xs>
              <DemoBox color="secondary.main">Column 2</DemoBox>
            </Grid>
            <Grid item xs>
              <DemoBox color="success.main">Column 3</DemoBox>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* 2. Fixed Width Columns */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            2️⃣ Fixed Width Columns
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            12-column system: xs=12 (full), xs=6 (half), xs=4 (one-third), xs=3 (quarter)
          </Typography>
          
          {/* Full Width */}
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Full Width (xs=12):
          </Typography>
          <Grid container spacing={2} sx={{ marginBottom: 2 }}>
            <Grid item xs={12}>
              <DemoBox>xs=12 (100%)</DemoBox>
            </Grid>
          </Grid>

          {/* Half Width */}
          <Typography variant="h6">
            Half Width (xs=6):
          </Typography>
          <Grid container spacing={2} sx={{ marginBottom: 2 }}>
            <Grid item xs={6}>
              <DemoBox>xs=6 (50%)</DemoBox>
            </Grid>
            <Grid item xs={6}>
              <DemoBox color="secondary.main">xs=6 (50%)</DemoBox>
            </Grid>
          </Grid>

          {/* One-Third Width */}
          <Typography variant="h6">
            One-Third Width (xs=4):
          </Typography>
          <Grid container spacing={2} sx={{ marginBottom: 2 }}>
            <Grid item xs={4}>
              <DemoBox>xs=4 (33%)</DemoBox>
            </Grid>
            <Grid item xs={4}>
              <DemoBox color="success.main">xs=4 (33%)</DemoBox>
            </Grid>
            <Grid item xs={4}>
              <DemoBox color="error.main">xs=4 (33%)</DemoBox>
            </Grid>
          </Grid>

          {/* Quarter Width */}
          <Typography variant="h6">
            Quarter Width (xs=3):
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <DemoBox>xs=3</DemoBox>
            </Grid>
            <Grid item xs={3}>
              <DemoBox color="secondary.main">xs=3</DemoBox>
            </Grid>
            <Grid item xs={3}>
              <DemoBox color="success.main">xs=3</DemoBox>
            </Grid>
            <Grid item xs={3}>
              <DemoBox color="warning.main">xs=3</DemoBox>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* 3. Responsive Grid */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            3️⃣ Responsive Grid (Different Sizes for Different Screens)
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Mobile pe full width, tablet pe half, desktop pe one-third.
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <DemoBox>
                xs=12<br />sm=6<br />md=4
              </DemoBox>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DemoBox color="secondary.main">
                xs=12<br />sm=6<br />md=4
              </DemoBox>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DemoBox color="success.main">
                xs=12<br />sm=6<br />md=4
              </DemoBox>
            </Grid>
          </Grid>

          <Typography variant="caption" display="block" sx={{ marginTop: 2 }}>
            💡 Resize your browser window to see responsive behavior!
          </Typography>
        </CardContent>
      </Card>

      {/* 4. Spacing Control */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            4️⃣ Spacing Control
          </Typography>
          
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Small Spacing (spacing=1):
          </Typography>
          <Grid container spacing={1} sx={{ marginBottom: 3 }}>
            <Grid item xs={4}>
              <DemoBox>Box 1</DemoBox>
            </Grid>
            <Grid item xs={4}>
              <DemoBox color="secondary.main">Box 2</DemoBox>
            </Grid>
            <Grid item xs={4}>
              <DemoBox color="success.main">Box 3</DemoBox>
            </Grid>
          </Grid>

          <Typography variant="h6">
            Medium Spacing (spacing=3):
          </Typography>
          <Grid container spacing={3} sx={{ marginBottom: 3 }}>
            <Grid item xs={4}>
              <DemoBox>Box 1</DemoBox>
            </Grid>
            <Grid item xs={4}>
              <DemoBox color="secondary.main">Box 2</DemoBox>
            </Grid>
            <Grid item xs={4}>
              <DemoBox color="success.main">Box 3</DemoBox>
            </Grid>
          </Grid>

          <Typography variant="h6">
            Large Spacing (spacing=5):
          </Typography>
          <Grid container spacing={5}>
            <Grid item xs={4}>
              <DemoBox>Box 1</DemoBox>
            </Grid>
            <Grid item xs={4}>
              <DemoBox color="secondary.main">Box 2</DemoBox>
            </Grid>
            <Grid item xs={4}>
              <DemoBox color="success.main">Box 3</DemoBox>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* 5. Nested Grid */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            5️⃣ Nested Grid (Grid ke andar Grid)
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <DemoBox>
                Main Content (xs=12, md=8)
              </DemoBox>
              
              {/* Nested Grid */}
              <Grid container spacing={1} sx={{ marginTop: 1 }}>
                <Grid item xs={6}>
                  <Paper sx={{ padding: 1, textAlign: 'center', bgcolor: 'info.light', color: 'white' }}>
                    Nested 1
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ padding: 1, textAlign: 'center', bgcolor: 'info.light', color: 'white' }}>
                    Nested 2
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <DemoBox color="warning.main">
                Sidebar (xs=12, md=4)
              </DemoBox>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* 6. Real Dashboard Layout */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            6️⃣ Real Dashboard Layout Example
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Typical admin dashboard layout.
          </Typography>
          
          <Grid container spacing={3}>
            {/* Stat Cards */}
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ padding: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
                <Typography variant="h4">1,234</Typography>
                <Typography variant="body2">Total Users</Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ padding: 2, textAlign: 'center', bgcolor: 'success.main', color: 'white' }}>
                <Typography variant="h4">$45K</Typography>
                <Typography variant="body2">Revenue</Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ padding: 2, textAlign: 'center', bgcolor: 'warning.main', color: 'white' }}>
                <Typography variant="h4">567</Typography>
                <Typography variant="body2">Orders</Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ padding: 2, textAlign: 'center', bgcolor: 'error.main', color: 'white' }}>
                <Typography variant="h4">89</Typography>
                <Typography variant="body2">Products</Typography>
              </Paper>
            </Grid>

            {/* Main Content Area */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ padding: 3, minHeight: 200 }}>
                <Typography variant="h6" gutterBottom>
                  Recent Activity
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Chart or table will go here...
                </Typography>
              </Paper>
            </Grid>

            {/* Sidebar */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ padding: 3, minHeight: 200 }}>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Stack spacing={1}>
                  <Box sx={{ padding: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
                    Action 1
                  </Box>
                  <Box sx={{ padding: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
                    Action 2
                  </Box>
                  <Box sx={{ padding: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
                    Action 3
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default GridDemo;
```

---

## 📋 Part 4: Complete Registration Form (60 minutes)

### Step 4: Create User Registration Form

**File:** `src/pages/RegistrationForm.jsx`

```jsx
// Complete User Registration Form - Combining Button, TextField, Grid

import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  Alert,
  Divider,
  Stack,
  InputAdornment,
  IconButton
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  Lock,
  Visibility,
  VisibilityOff,
  Home,
  Business
} from '@mui/icons-material';

function RegistrationForm() {
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
    country: '',
    city: '',
    address: '',
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const countries = ['Pakistan', 'India', 'USA', 'UK', 'Canada', 'Australia'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // First Name
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    // Last Name
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Phone
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    }

    // Password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Country
    if (!formData.country) {
      newErrors.country = 'Please select a country';
    }

    // Terms
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmitted(true);
      console.log('Form Data:', formData);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          gender: 'male',
          country: '',
          city: '',
          address: '',
          agreeTerms: false,
        });
      }, 3000);
    }
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      
      <Box sx={{ maxWidth: 900, margin: '0 auto' }}>
        
        {/* Header */}
        <Typography variant="h3" align="center" gutterBottom>
          📋 User Registration Form
        </Typography>
        
        <Typography variant="body1" align="center" color="text.secondary" paragraph>
          MUI components ka practical use - Button, TextField, Grid
        </Typography>

        {/* Success Message */}
        {submitted && (
          <Alert severity="success" sx={{ marginBottom: 3 }}>
            <Typography variant="h6" gutterBottom>
              ✅ Registration Successful!
            </Typography>
            <Typography variant="body2">
              Your account has been created successfully.
            </Typography>
          </Alert>
        )}

        {/* Registration Form Card */}
        <Card>
          <CardContent sx={{ padding: 4 }}>
            
            <form onSubmit={handleSubmit}>
              
              {/* Personal Information */}
              <Typography variant="h5" gutterBottom>
                Personal Information
              </Typography>
              <Divider sx={{ marginBottom: 3 }} />

              <Grid container spacing={3}>
                
                {/* First Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Last Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                </Grid>

                {/* Email */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Phone */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Gender */}
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      row
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>

              {/* Security Information */}
              <Typography variant="h5" sx={{ marginTop: 4 }} gutterBottom>
                Security Information
              </Typography>
              <Divider sx={{ marginBottom: 3 }} />

              <Grid container spacing={3}>
                
                {/* Password */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password || 'Minimum 8 characters'}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Confirm Password */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              {/* Location Information */}
              <Typography variant="h5" sx={{ marginTop: 4 }} gutterBottom>
                Location Information
              </Typography>
              <Divider sx={{ marginBottom: 3 }} />

              <Grid container spacing={3}>
                
                {/* Country */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required error={!!errors.country}>
                    <InputLabel>Country</InputLabel>
                    <Select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      label="Country"
                    >
                      <MenuItem value="">
                        <em>Select Country</em>
                      </MenuItem>
                      {countries.map((country) => (
                        <MenuItem key={country} value={country}>
                          {country}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.country && (
                      <Typography variant="caption" color="error" sx={{ marginTop: 0.5, marginLeft: 2 }}>
                        {errors.country}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                {/* City */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Business />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Address */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    multiline
                    rows={3}
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your full address..."
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ alignSelf: 'flex-start', marginTop: 2 }}>
                          <Home />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              {/* Terms & Conditions */}
              <Box sx={{ marginTop: 3 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2">
                      I agree to the{' '}
                      <a href="#" style={{ color: '#4F46E5' }}>
                        Terms and Conditions
                      </a>
                    </Typography>
                  }
                />
                {errors.agreeTerms && (
                  <Typography variant="caption" color="error" display="block" sx={{ marginLeft: 4 }}>
                    {errors.agreeTerms}
                  </Typography>
                )}
              </Box>

              {/* Action Buttons */}
              <Stack direction="row" spacing={2} sx={{ marginTop: 4 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{ height: 48 }}
                >
                  Create Account
                </Button>
                
                <Button
                  type="button"
                  variant="outlined"
                  size="large"
                  fullWidth
                  sx={{ height: 48 }}
                  onClick={() => {
                    setFormData({
                      firstName: '',
                      lastName: '',
                      email: '',
                      phone: '',
                      password: '',
                      confirmPassword: '',
                      gender: 'male',
                      country: '',
                      city: '',
                      address: '',
                      agreeTerms: false,
                    });
                    setErrors({});
                  }}
                >
                  Reset Form
                </Button>
              </Stack>

              {/* Already have account */}
              <Box sx={{ marginTop: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <a href="#" style={{ color: '#4F46E5', fontWeight: 600 }}>
                    Sign in
                  </a>
                </Typography>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default RegistrationForm;
```

---

## 🧪 Testing Everything

### Step 5: Update App.jsx to Test Components

**File:** `src/App.jsx`

```jsx
import React, { useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import ButtonDemo from './pages/ButtonDemo';
import TextFieldDemo from './pages/TextFieldDemo';
import GridDemo from './pages/GridDemo';
import RegistrationForm from './pages/RegistrationForm';

function App() {
  
  const [currentPage, setCurrentPage] = useState('buttons');

  const renderPage = () => {
    switch (currentPage) {
      case 'buttons':
        return <ButtonDemo />;
      case 'textfields':
        return <TextFieldDemo />;
      case 'grid':
        return <GridDemo />;
      case 'form':
        return <RegistrationForm />;
      default:
        return <ButtonDemo />;
    }
  };

  return (
    <Box>
      {/* Navigation */}
      <Box sx={{ 
        backgroundColor: 'white', 
        padding: 2, 
        boxShadow: 1,
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <Typography variant="h5" gutterBottom>
          📚 MUI Components Demo Navigation
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Button 
            variant={currentPage === 'buttons' ? 'contained' : 'outlined'}
            onClick={() => setCurrentPage('buttons')}
          >
            Buttons Demo
          </Button>
          <Button 
            variant={currentPage === 'textfields' ? 'contained' : 'outlined'}
            onClick={() => setCurrentPage('textfields')}
          >
            TextFields Demo
          </Button>
          <Button 
            variant={currentPage === 'grid' ? 'contained' : 'outlined'}
            onClick={() => setCurrentPage('grid')}
          >
            Grid Demo
          </Button>
          <Button 
            variant={currentPage === 'form' ? 'contained' : 'outlined'}
            onClick={() => setCurrentPage('form')}
          >
            Registration Form
          </Button>
        </Stack>
      </Box>

      {/* Render Selected Page */}
      {renderPage()}
    </Box>
  );
}

export default App;
```

**Run the project:**
```bash
npm run dev
```

Navigate between different demos using the buttons at the top!

---

## 🎯 Practice Tasks (30 minutes)

### Task 1: Add "Loading" Button (⭐⭐)

**Goal:** Create a button that shows loading spinner when clicked.

**Hint:**
```jsx
import { CircularProgress } from '@mui/material';

<Button 
  variant="contained"
  disabled={loading}
  startIcon={loading ? <CircularProgress size={20} /> : null}
>
  {loading ? 'Loading...' : 'Submit'}
</Button>
```

---

### Task 2: Create Login Form (⭐⭐⭐)

**Goal:** Create a simple login form using MUI components.

**Requirements:**
- Email TextField
- Password TextField (with show/hide toggle)
- Remember Me checkbox
- Submit Button
- Forgot Password link

---

### Task 3: Responsive Card Grid (⭐⭐)

**Goal:** Create a responsive grid of product cards.

**Requirements:**
- 4 columns on desktop (md=3)
- 2 columns on tablet (sm=6)
- 1 column on mobile (xs=12)
- Each card should have image placeholder, title, price

---

### Task 4: Form with Real-time Validation (⭐⭐⭐⭐)

**Goal:** Create a form that validates as you type.

**Requirements:**
- Show error immediately when invalid
- Show success icon when valid
- Disable submit button if form invalid

---

### Task 5: Multi-step Form (⭐⭐⭐⭐⭐)

**Goal:** Create a 3-step registration form.

**Steps:**
1. Personal Info (name, email)
2. Security (password)
3. Review & Submit

**Requirements:**
- "Next" and "Back" buttons
- Progress indicator
- All data collected at the end

---

## 📝 Day 2 Summary

### ✅ Today's Achievements

**1. Button Component Mastery:**
- ✅ 3 variants (contained, outlined, text)
- ✅ 6 colors (primary, secondary, success, error, warning, info)
- ✅ 3 sizes (small, medium, large)
- ✅ Icons (start, end, icon-only)
- ✅ States (disabled, loading)

**2. TextField Component Mastery:**
- ✅ 3 variants (outlined, filled, standard)
- ✅ All input types (text, email, password, number, date, etc.)
- ✅ Icons & adornments
- ✅ Validation & error states
- ✅ Multiline (textarea)

**3. Grid System Mastery:**
- ✅ 12-column system
- ✅ Responsive breakpoints (xs, sm, md, lg, xl)
- ✅ Spacing control
- ✅ Nested grids
- ✅ Real dashboard layouts

**4. Complete Registration Form:**
- ✅ Personal information section
- ✅ Security section (passwords)
- ✅ Location section (dropdown)
- ✅ Form validation
- ✅ Success/error states

---

## 📊 Project Progress

```
✅ Week 1 Complete (React Foundations)
✅ Week 2 - Day 1 Complete (MUI Installation & Theme)
✅ Week 2 - Day 2 Complete (MUI Basic Components)

Components Mastered:
├── ✅ Button (all variants & features)
├── ✅ TextField (all types & validation)
├── ✅ Grid (responsive layouts)
├── ✅ IconButton
├── ✅ Radio & Checkbox
├── ✅ Select Dropdown
└── ✅ Form Controls

Skills Acquired:
├── ✅ Form building
├── ✅ Form validation
├── ✅ Responsive layouts
├── ✅ Icon integration
└── ✅ User input handling
```

---

## 🔜 Tomorrow's Preview (Day 3)

**Week 2 - Day 3: MUI AppBar, Drawer & Navigation**

Topics:
1. **AppBar** - Professional header component
2. **Drawer** - Sidebar navigation (permanent & temporary)
3. **Menu** - Dropdown menus
4. **List & ListItem** - Navigation lists
5. **Icons** - Complete icon system

**What We'll Build:**
- ✨ Professional app header
- 📱 Mobile-responsive sidebar
- 🔘 Dropdown menus
- 🎯 Complete navigation system

---

## 🏆 Day 2 Checklist

**Components:**
- [ ] ButtonDemo page created & working
- [ ] TextFieldDemo page created & working
- [ ] GridDemo page created & working
- [ ] RegistrationForm created & working
- [ ] Navigation between pages working

**Understanding:**
- [ ] I understand Button variants
- [ ] I understand TextField types
- [ ] I understand Grid system (12-column)
- [ ] I understand responsive breakpoints
- [ ] I can build forms with MUI

**Testing:**
- [ ] All buttons display correctly
- [ ] All text fields work
- [ ] Grid layouts are responsive
- [ ] Registration form validates properly
- [ ] No console errors

---

## 💡 Pro Tips

### Tip 1: Button Best Practices
```jsx
// ✅ Good - Clear action, appropriate variant
<Button variant="contained" color="primary">Save Changes</Button>
<Button variant="outlined" color="secondary">Cancel</Button>
<Button variant="text">Learn More</Button>

// ❌ Bad - All contained, unclear hierarchy
<Button variant="contained">Save</Button>
<Button variant="contained">Cancel</Button>
<Button variant="contained">Learn More</Button>
```

### Tip 2: TextField Validation
```jsx
// ✅ Good - Show error only after user interaction
error={touched && !!errors.email}

// ❌ Bad - Shows error immediately
error={!!errors.email}
```

### Tip 3: Grid Responsive Pattern
```jsx
// ✅ Good - Mobile-first responsive
<Grid item xs={12} sm={6} md={4} lg={3}>

// Common patterns:
// Stats cards: xs=12 sm=6 md=3 (4 columns on desktop)
// Product cards: xs=12 sm=6 md=4 (3 columns on desktop)
// Content: xs=12 md=8 with sidebar: xs=12 md=4
```

---

**🎊 Day 2 Complete! Tomorrow we'll add navigation and make our app more interactive! 🚀**

**Happy Coding! 💻✨**
