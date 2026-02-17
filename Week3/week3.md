# Week 3 - API Integration (Frontend → Backend)

**Goal:** Frontend ko backend se connect karna

---

## 📅 Day 1 - REST API Basics & HTTP Methods

### Topics:
- REST API basics (beginner level)
- HTTP methods

### Tasks:
1. REST API kya hai samjho
2. HTTP methods seekho (GET, POST, PUT, DELETE)
3. API endpoints ka concept samjho
4. Request aur Response structure samjho
5. JSON data format samjho
6. API testing tools dekho (Postman basics)

### Output:
✅ REST API concepts clear

---

## 📅 Day 2 - Axios Installation & Setup

### Topics:
- Axios installation & use
- GET requests

### Tasks:
1. Axios install karo: `npm install axios`
2. Axios ka basic syntax seekho
3. GET request kaise karte hain dekho
4. API service file banao (src/services/api.js)
5. Dummy API se data fetch karo (JSONPlaceholder)
6. Console mein response dekho

### Output:
✅ Axios installed aur GET requests samajh aa gaye

---

## 📅 Day 3 - POST, PUT, DELETE Requests

### Topics:
- POST / PUT / DELETE

### Tasks:
1. POST request seekho (data create)
2. PUT request seekho (data update)
3. DELETE request seekho (data delete)
4. Request body aur headers samjho
5. Dummy API pe sab methods try karo
6. Different HTTP status codes samjho (200, 201, 400, 404, 500)

### Output:
✅ Sab HTTP methods use kar sakte ho

---

## 📅 Day 4 - Loading & Error States

### Topics:
- Loading & error states
- useEffect Hook

### Tasks:
1. useEffect hook seekho (data fetching ke liye)
2. Loading state manage karo (useState se)
3. Error state manage karo
4. Try-catch block use karo
5. Loading spinner component banao
6. Error message display karo

### Output:
✅ Loading aur error handling implemented

---

## 📅 Day 5 - Environment Variables & API Configuration

### Topics:
- .env usage

### Tasks:
1. .env file kya hoti hai samjho
2. Project mein .env file banao
3. API base URL .env mein store karo
4. `VITE_API_URL` environment variable use karo
5. .gitignore mein .env add karo
6. API service ko .env se configure karo

### Output:
✅ Environment variables setup ready

---

## 📅 Day 6 - Project Implementation (Part 1)

### Topics:
- Users list API se load
- Users service create

### Tasks:
1. Users service file banao (src/services/userService.js)
2. Mock API setup karo (JSONPlaceholder ya local JSON)
3. getUsersAPI function banao
4. Users list page mein API call karo
5. Loading state show karo jab data fetch ho raha ho
6. Fetched data ko table mein display karo
7. Error handling implement karo

### Output:
✅ Users list API se load ho rahi hai

---

## 📅 Day 7 - Project Implementation (Part 2) & Review

### Topics:
- Add / Edit / Delete users (frontend side)
- Proper success / error handling

### Tasks:
1. Add user function banao (POST request)
2. Add user dialog/modal banao (MUI Dialog)
3. Edit user function banao (PUT request)
4. Delete user function banao (DELETE request)
5. Success messages show karo (MUI Snackbar)
6. Error messages handle karo properly
7. List refresh karo after add/edit/delete
8. Week 3 concepts review karo

### Output:
✅ **Week 3 Complete!**
- Frontend real backend-ready ho chuka
- CRUD operations working
- Loading & error states implemented
- Proper API integration

---

## 🎯 Week 3 Checklist

- [ ] REST API basics samajh aa gaye
- [ ] HTTP methods (GET, POST, PUT, DELETE) samajh aa gaye
- [ ] Axios installed aur use kar sakte ho
- [ ] GET request se data fetch kar sakte ho
- [ ] POST request se data add kar sakte ho
- [ ] PUT request se data update kar sakte ho
- [ ] DELETE request se data delete kar sakte ho
- [ ] Loading states manage kar sakte ho
- [ ] Error states handle kar sakte ho
- [ ] useEffect hook use kar sakte ho
- [ ] .env file setup ho gayi
- [ ] Users list API se load hoti hai
- [ ] Add user functionality ready
- [ ] Edit user functionality ready
- [ ] Delete user functionality ready
- [ ] Success/error messages show hote hain

---

## 💡 Key Learnings

- **Axios** makes API calls easy
- **useEffect** is perfect for data fetching
- **Loading states** improve user experience
- **Error handling** is must for production apps
- **.env** keeps sensitive data secure
- **CRUD operations** = Create, Read, Update, Delete

---

## 🔧 Code Snippets Reference

### Axios GET Request
```javascript
const getUsers = async () => {
  try {
    const response = await axios.get('/api/users');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
```

### Loading & Error State
```javascript
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);
```

---

**Next Week:** .NET Web API + SQL Server (Backend from scratch)
