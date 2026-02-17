# Week 1 - Day 1: React Introduction & Setup

**Study Time:** 4 Hours  
**Goal:** React development environment setup + First React app + Basics samajhna

---

## 🎯 Today's Goal

Aaj tum:
- React kya hai yeh samjhoge
- Node.js aur npm install karoge
- Apni pehli React app banao ge
- React project ka structure samjhoge
- Browser mein apni app dekho ge

---

## 📚 Part 1: Theory (30 minutes)

### 🔹 React Kya Hai?

**Simple Words Mein:**
React ek JavaScript library hai jo websites ki **UI (User Interface)** banane ke liye use hoti hai.

**Example:**
- Facebook pe jab tum "Like" button dabate ho, sirf woh button update hota hai, pura page reload nahi hota.
- Yeh React ki power hai!

**Kyun Use Karte Hain?**
1. **Fast hai:** Sirf woh cheez update hoti hai jo change hui hai, pura page nahi
2. **Reusable components:** Ek baar component banao, kahin bhi use karo
3. **Popular hai:** Sabse zyada companies use karti hain (Facebook, Netflix, Instagram)
4. **Easy to learn:** JavaScript aati hai toh React aasani se aa jayega

**Real World Example:**
Socho tum ek **Admin Panel** bana rahe ho jismein:
- User list table hai
- Add user button hai
- Login form hai

React mein yeh sab **components** banenge jo tum reuse kar sakte ho!

---

### 🔹 Node.js Kya Hai?

**Simple Words Mein:**
Node.js ek **runtime environment** hai jo JavaScript ko computer pe chalata hai.

**Kyun Chahiye?**
- React ko run karne ke liye tools chahiye (Vite, npm)
- Yeh tools Node.js ke saath aate hain
- Development server chalane ke liye zaroori hai

**npm Kya Hai?**
- npm = Node Package Manager
- Yeh ek **package manager** hai jo libraries install karta hai
- Jaise Android mein Play Store hai, waise hi npm hai JavaScript packages ke liye

---

### 🔹 Vite Kya Hai?

**Simple Words Mein:**
Vite ek **build tool** hai jo React app ko bahut fast banata hai aur run karta hai.

**Kyun Vite Use Kar Rahe Hain?**
1. **Bahut fast hai:** Create React App se 10x faster
2. **Modern hai:** Latest technology use karta hai
3. **Easy setup:** Ek command se sab kuch ready

---

## 💻 Part 2: Installation & Setup (1 hour)

### Step 1: Node.js Install Karo

#### Windows:
1. Browser mein jao: [https://nodejs.org](https://nodejs.org)
2. **LTS version** download karo (Green color wala button)
3. Downloaded file open karo (.msi file)
4. "Next" dabate jao (sab default settings theek hain)
5. Install complete hone ka wait karo

#### Verify Karo:
PowerShell ya Command Prompt open karo aur yeh commands run karo:

```bash
node --version
```

Output aana chahiye: `v20.x.x` (koi bhi version number)

```bash
npm --version
```

Output aana chahiye: `10.x.x` (koi bhi version number)

✅ **Agar version numbers dikhe, installation successful!**

---

### Step 2: Project Folder Banao

Pehle decide karo project kahan banana hai. Example:

```bash
# Desktop pe folder banao
cd Desktop
mkdir ReactProjects
cd ReactProjects
```

Ya phir koi aur location choose karo jahan tum comfortable ho.

---

### Step 3: React App Banao (Vite se)

Ab apni pehli React app create karte hain!

#### Command:
```bash
npm create vite@latest my-react-app -- --template react
```

**Yeh Command Kya Kar Rahi Hai?**
- `npm create vite@latest` → Vite tool use kar raha hai
- `my-react-app` → Tumhare project ka naam (tum koi bhi naam de sakte ho)
- `--template react` → React template use karo

#### Process:
1. Command run hone pe thodi wait karo
2. Success message dikhe ga

---

### Step 4: Project Folder Mein Jao

```bash
cd my-react-app
```

---

### Step 5: Dependencies Install Karo

Ab project ke liye zaroori packages install karne hain:

```bash
npm install
```

**Yeh Command Kya Kar Rahi Hai?**
- `package.json` file mein likhe hue sab packages download kar rahi hai
- `node_modules` folder create ho jayega (yahan sare packages hain)
- Yeh process 1-2 minute le sakti hai

✅ **Jab complete ho jaye, koi error na aaye, toh successful!**

---

### Step 6: Development Server Start Karo

```bash
npm run dev
```

**Output:**
```
  VITE v5.x.x  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

✅ **Server chal raha hai!**

---

### Step 7: Browser Mein App Dekho

1. Browser open karo (Chrome, Firefox, Edge - koi bhi)
2. Address bar mein type karo: `http://localhost:5173`
3. Enter dabao

**Tumhe Kya Dikhega:**
- Vite + React logo
- "Vite + React" heading
- Ek counter button (click karne pe number badhega)

🎉 **CONGRATULATIONS! Tumhari pehli React app chal rahi hai!**

---

## 📂 Part 3: Project Structure Samjho (45 minutes)

### VS Code Mein Project Open Karo

1. VS Code open karo
2. `File → Open Folder`
3. Apna `my-react-app` folder select karo

### Folder Structure:

```
my-react-app/
│
├── node_modules/          (Sare installed packages - isko open mat karna)
├── public/                (Static files - images, icons)
├── src/                   (Yahan tum code karoge - MAIN FOLDER)
│   ├── assets/           (Images, CSS files)
│   ├── App.css           (App component ki styling)
│   ├── App.jsx           (Main App component)
│   ├── index.css         (Global CSS)
│   └── main.jsx          (Entry point - yahan se sab start hota hai)
│
├── .gitignore            (Git ko batata hai kya ignore karna hai)
├── index.html            (Main HTML file)
├── package.json          (Project info aur dependencies)
├── vite.config.js        (Vite configuration)
└── README.md             (Project documentation)
```

### Important Files Samjho:

#### 1. **package.json**
Yeh file tumhare project ki "identity card" hai.

```json
{
  "name": "my-react-app",
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",              // npm run dev
    "build": "vite build",      // npm run build
    "preview": "vite preview"   // npm run preview
  },
  "dependencies": {
    "react": "^18.x.x",
    "react-dom": "^18.x.x"
  }
}
```

**Samjho:**
- `scripts`: Commands jo tum run kar sakte ho
- `dependencies`: Jo packages install hain

---

#### 2. **index.html**
Entry point HTML file.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>          <!-- React yahan render hoga -->
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**Key Point:**
- `<div id="root"></div>` → React app is div mein load hoti hai

---

#### 3. **src/main.jsx**
Yeh file React app ko start karti hai.

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**Samjho:**
- `ReactDOM.createRoot()` → "root" div ko select karta hai
- `<App />` → App component ko render karta hai

---

#### 4. **src/App.jsx**
Main App component.

```jsx
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Vite + React</h1>
      <button onClick={() => setCount(count + 1)}>
        count is {count}
      </button>
    </div>
  )
}

export default App
```

**Samjho:**
- `function App()` → Yeh ek component hai
- `return (...)` → Yeh JSX hai (HTML jaisa dikhta hai)
- `export default App` → Is component ko dusri files use kar sakti hain

---

## 🛠️ Part 4: First Code Change (45 minutes)

### Task 1: App.jsx Ko Modify Karo

Chalo ab pehli baar khud code change karte hain!

**src/App.jsx** file open karo aur ise replace karo:

```jsx
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>Welcome to My Admin Panel</h1>
      <p>This is my first React app!</p>
      <p>I am learning React to become a Full Stack Developer.</p>
    </div>
  )
}

export default App
```

**Save karo (Ctrl + S) aur browser check karo!**

✅ **Browser automatically refresh ho jayega aur tumhara new text dikhega!**

---

### Task 2: Simple Styling Add Karo

**src/App.css** file open karo aur ise replace karo:

```css
.App {
  text-align: center;
  padding: 50px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 20px;
}

p {
  color: #34495e;
  font-size: 1.2rem;
  line-height: 1.6;
}
```

**Save karo aur browser check karo!**

✅ **Styling apply ho gayi!**

---

### Task 3: Apna Welcome Component Banao

Ab tum apna pehla custom component banao ge!

#### Step 1: New file banao
`src/Welcome.jsx` naam ki file banao

#### Step 2: Is code ko likho:

```jsx
function Welcome() {
  return (
    <div style={{ 
      backgroundColor: '#3498db', 
      color: 'white', 
      padding: '20px', 
      borderRadius: '10px',
      margin: '20px 0'
    }}>
      <h2>🎉 Congratulations!</h2>
      <p>You just created your first React component!</p>
    </div>
  )
}

export default Welcome
```

#### Step 3: App.jsx mein import karo

**src/App.jsx** ko update karo:

```jsx
import './App.css'
import Welcome from './Welcome'    // Import karo

function App() {
  return (
    <div className="App">
      <h1>Welcome to My Admin Panel</h1>
      <p>This is my first React app!</p>
      <p>I am learning React to become a Full Stack Developer.</p>
      
      <Welcome />    {/* Apna component use karo */}
    </div>
  )
}

export default App
```

**Save karo aur browser check karo!**

✅ **Tumhara custom component dikhai de raha hai!**

---

## 🎯 Part 5: Today's Mini Tasks (1 hour)

### Task 1: Personal Card Component Banao

**File:** `src/PersonalCard.jsx`

```jsx
function PersonalCard() {
  const myName = "Your Name"           // Apna naam likho
  const myGoal = "Full Stack Developer" // Apna goal

  return (
    <div style={{
      border: '2px solid #3498db',
      borderRadius: '10px',
      padding: '20px',
      margin: '20px auto',
      maxWidth: '400px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h3>👨‍💻 About Me</h3>
      <p><strong>Name:</strong> {myName}</p>
      <p><strong>Goal:</strong> {myGoal}</p>
      <p><strong>Day:</strong> 1 of 42</p>
      <p><strong>Status:</strong> Learning React 🚀</p>
    </div>
  )
}

export default PersonalCard
```

**App.jsx mein add karo:**

```jsx
import './App.css'
import Welcome from './Welcome'
import PersonalCard from './PersonalCard'  // Import

function App() {
  return (
    <div className="App">
      <h1>Welcome to My Admin Panel</h1>
      <p>This is my first React app!</p>
      
      <Welcome />
      <PersonalCard />    {/* Use karo */}
    </div>
  )
}

export default App
```

---

### Task 2: Counter Button Component Banao

**File:** `src/Counter.jsx`

```jsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(count + 1)
  }

  const reset = () => {
    setCount(0)
  }

  return (
    <div style={{
      margin: '30px auto',
      padding: '20px',
      border: '2px solid #e74c3c',
      borderRadius: '10px',
      maxWidth: '400px'
    }}>
      <h3>🔢 Practice Counter</h3>
      <h1 style={{ fontSize: '3rem', color: '#e74c3c' }}>{count}</h1>
      
      <button 
        onClick={increment}
        style={{
          padding: '10px 20px',
          margin: '5px',
          fontSize: '1rem',
          cursor: 'pointer',
          backgroundColor: '#27ae60',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        Increment +1
      </button>

      <button 
        onClick={reset}
        style={{
          padding: '10px 20px',
          margin: '5px',
          fontSize: '1rem',
          cursor: 'pointer',
          backgroundColor: '#e74c3c',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        Reset
      </button>
    </div>
  )
}

export default Counter
```

**App.jsx mein add karo:**

```jsx
import './App.css'
import Welcome from './Welcome'
import PersonalCard from './PersonalCard'
import Counter from './Counter'  // Import

function App() {
  return (
    <div className="App">
      <h1>Welcome to My Admin Panel</h1>
      <p>This is my first React app!</p>
      
      <Welcome />
      <PersonalCard />
      <Counter />    {/* Use karo */}
    </div>
  )
}

export default App
```

---

## 🎓 Part 6: Key Concepts Summary (30 minutes)

### ✅ Aaj Kya Seekha?

1. **React Library Hai:**
   - UI banane ke liye
   - Components based
   - Fast aur reusable

2. **Node.js aur npm:**
   - JavaScript runtime
   - Package manager

3. **Vite:**
   - Modern build tool
   - Fast development

4. **Components:**
   - Reusable UI blocks
   - Function ki tarah banate hain
   - Export/Import karte hain

5. **JSX:**
   - HTML jaisa syntax
   - JavaScript ke andar HTML
   - Curly braces `{}` mein JS expressions

6. **Basic Styling:**
   - CSS files
   - Inline styles
   - className use karte hain (class nahi)

---

## 📋 Today's Checklist

Yeh sab confirm karo:

- [ ] Node.js installed aur version check kiya
- [ ] npm installed aur version check kiya
- [ ] Vite se React app create kiya
- [ ] `npm install` successfully run kiya
- [ ] `npm run dev` se server start kiya
- [ ] Browser mein app dekhi (`localhost:5173`)
- [ ] VS Code mein project open kiya
- [ ] Folder structure samjha
- [ ] App.jsx modify kiya
- [ ] Welcome component banaya
- [ ] PersonalCard component banaya
- [ ] Counter component banaya
- [ ] Sab components App.jsx mein import kiye
- [ ] Browser mein final result dekha

---

## 🚀 Today's Achievement

**Project Feature Added:**
✅ Basic React app setup complete
✅ 3 custom components created (Welcome, PersonalCard, Counter)
✅ Component reusability samajh aa gayi
✅ Basic interactivity (counter buttons)

**Your Project Status:**
```
Week 1 - Day 1: ✅ COMPLETE
Next: Day 2 - Project Structure & JSX (Deep Dive)
```

---

## 💡 Important Commands to Remember

```bash
# Node.js version check
node --version

# npm version check
npm --version

# Create new React app
npm create vite@latest app-name -- --template react

# Install dependencies
npm install

# Start development server
npm run dev

# Stop server
Ctrl + C
```

---

## 🎯 Homework / Practice

Agar time mile toh yeh try karo:

1. **Task 1:** Counter mein "Decrement" button add karo
2. **Task 2:** PersonalCard mein apni photo ka URL add karo (online image)
3. **Task 3:** Welcome component ka background color change karo

---

## ❓ Common Problems & Solutions

### Problem 1: `npm` command not found
**Solution:** Node.js properly install nahi hua. Phir se install karo aur computer restart karo.

### Problem 2: Port 5173 already in use
**Solution:** Pehle se koi server chal raha hai. Terminal close karo aur naya terminal open karke phir try karo.

### Problem 3: Browser mein blank page
**Solution:** Console check karo (F12 key press karo). Koi error dikhe toh file ka naam check karo (spelling mistakes).

### Problem 4: Changes save karne ke baad browser update nahi ho raha
**Solution:** Browser hard refresh karo (Ctrl + Shift + R) ya browser close karke phir kholo.

---

## 📚 Resources

- React Official Docs: [react.dev](https://react.dev)
- Vite Docs: [vitejs.dev](https://vitejs.dev)
- Node.js Download: [nodejs.org](https://nodejs.org)

---

## 🎉 Well Done!

Congratulations! Tumne apna pehla din complete kar liya! 

**Day 1 Summary:**
- ✅ Environment setup
- ✅ First React app
- ✅ 3 components created
- ✅ Basic interactivity

**Kal (Day 2) kya hoga:**
- JSX deep dive
- More components
- Props ka concept
- Project structure improve

---

**Ready for Day 2? Type "Day 2 start karo" jab ready ho!** 🚀
