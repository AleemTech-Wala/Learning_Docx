# Week 5 - Authentication & Security (JWT)

**Goal:** Corporate-level security

---

## 📅 Day 1 - Authentication Basics & JWT Introduction

### Topics:
- Authentication vs Authorization
- JWT kya hota hai

### Tasks:
1. Authentication aur Authorization ka difference samjho
2. JWT (JSON Web Token) kya hai samjho
3. JWT structure dekho (Header, Payload, Signature)
4. JWT ka flow samjho (Login → Token → Verify)
5. JWT.io website pe token decode karo
6. Security best practices padho

### Output:
✅ Authentication concepts clear

---

## 📅 Day 2 - JWT Backend Setup

### Topics:
- JWT packages installation
- JWT configuration

### Tasks:
1. JWT NuGet packages install karo:
   - `dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer`
   - `dotnet add package System.IdentityModel.Tokens.Jwt`
2. appsettings.json mein JWT settings add karo (SecretKey, Issuer, Audience)
3. Program.cs mein Authentication configure karo
4. JWT service class banao (Services/JwtService.cs)
5. Token generate karne ka method likho

### Output:
✅ JWT backend setup ready

---

## 📅 Day 3 - Register & Login APIs

### Topics:
- Register API
- Login API

### Tasks:
1. User model mein Password field add karo
2. Password hashing implement karo (BCrypt.Net package)
3. AuthController banao (Controllers/AuthController.cs)
4. Register API endpoint banao (POST /api/auth/register)
5. Login API endpoint banao (POST /api/auth/login)
6. Login success pe JWT token return karo
7. Postman se test karo

### Output:
✅ Register & Login APIs working

---

## 📅 Day 4 - Token Validation & Middleware

### Topics:
- Token generate & validate
- Middleware

### Tasks:
1. JWT token validation logic implement karo
2. Authentication middleware configure karo
3. [Authorize] attribute ka use seekho
4. Token expiry time set karo
5. Claims add karo token mein (UserId, Email, Role)
6. Invalid token handling karo
7. Unauthorized (401) response test karo

### Output:
✅ Token validation working

---

## 📅 Day 5 - Protected APIs & Authorization

### Topics:
- Protected APIs
- Role-based access (basic)

### Tasks:
1. Existing APIs ko [Authorize] attribute se protect karo
2. User model mein Role field add karo (Admin, User)
3. Token mein role claim add karo
4. Role-based authorization implement karo
5. [Authorize(Roles = "Admin")] use karo
6. Different roles ke liye access test karo
7. 403 Forbidden response handle karo

### Output:
✅ Protected APIs with role-based access ready

---

## 📅 Day 6 - Frontend JWT Integration

### Topics:
- JWT token frontend store
- Protected routes

### Tasks:
1. Login API ko frontend se call karo
2. Token ko localStorage mein save karo
3. Axios interceptor banao (har request mein token add karo)
4. Auth context banao (React Context API)
5. Login/Logout functionality implement karo
6. Protected routes implement karo (React Router)
7. Token expire hone pe logout karo

### Output:
✅ Frontend JWT integration complete

---

## 📅 Day 7 - Secure APIs & Complete Testing

### Topics:
- Secure APIs
- End-to-end security testing

### Tasks:
1. Frontend se protected APIs call karo
2. Token ke bina API call test karo (401 error)
3. Token ke saath API call test karo (success)
4. Role-based access frontend se test karo
5. Logout functionality test karo
6. Login flow complete test karo
7. Security best practices implement karo
8. Week 5 complete review karo

### Output:
✅ **Week 5 Complete!**
- Project real company standard pe aa gaya hai
- JWT authentication working
- Protected APIs ready
- Role-based access implemented
- Secure frontend-backend communication

---

## 🎯 Week 5 Checklist

- [ ] Authentication vs Authorization samajh aa gaya
- [ ] JWT concept clear ho gaya
- [ ] JWT packages installed
- [ ] JWT configuration done
- [ ] Register API working
- [ ] Login API working
- [ ] Password hashing implemented
- [ ] JWT token generate hota hai
- [ ] Token validation working
- [ ] Middleware configured
- [ ] Protected APIs implemented
- [ ] [Authorize] attribute use kar sakte ho
- [ ] Role-based access working
- [ ] Frontend mein token store hota hai
- [ ] Axios interceptor setup
- [ ] Protected routes implemented
- [ ] Login/Logout functionality working
- [ ] Complete security testing done

---

## 💡 Key Learnings

- **Authentication** verifies identity (login)
- **Authorization** verifies permissions (access rights)
- **JWT** is industry standard for stateless authentication
- **Token** has 3 parts: Header.Payload.Signature
- **Middleware** validates token on every request
- **Claims** contain user information
- **Role-based access** provides different permissions
- **localStorage** stores token on frontend
- **Interceptor** automatically adds token to requests

---

## 🔧 Important Code Snippets

### JWT Configuration (appsettings.json)
```json
{
  "Jwt": {
    "SecretKey": "YourSuperSecretKey123456789",
    "Issuer": "YourApp",
    "Audience": "YourAppUsers",
    "ExpiryInHours": 24
  }
}
```

### Axios Interceptor (Frontend)
```javascript
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
```

### Protected Route (React)
```javascript
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};
```

### Controller Authorization
```csharp
[Authorize] // Requires authentication
[Authorize(Roles = "Admin")] // Requires Admin role
```

---

## 🔐 Security Best Practices

1. **Never** store passwords as plain text
2. Always hash passwords (use BCrypt)
3. Keep JWT secret key secure
4. Set appropriate token expiry time
5. Use HTTPS in production
6. Validate all inputs
7. Handle errors securely (don't leak info)
8. Implement refresh tokens (advanced topic)

---

**Next Week:** Final Project Polish & Production Readiness
