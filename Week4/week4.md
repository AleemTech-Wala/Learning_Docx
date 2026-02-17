# Week 4 - .NET Web API + SQL Server

**Goal:** Backend from scratch (industry style)

---

## 📅 Day 1 - .NET Setup & Project Creation

### Topics:
- .NET SDK install
- ASP.NET Core Web API project create

### Tasks:
1. .NET SDK download karo (latest version)
2. Installation verify karo: `dotnet --version`
3. ASP.NET Core Web API project banao: `dotnet new webapi -n MyProjectAPI`
4. Project structure samjho (Controllers, Program.cs, appsettings.json)
5. Project run karo: `dotnet run`
6. Swagger UI dekho browser mein (https://localhost:xxxx/swagger)

### Output:
✅ .NET Web API project running

---

## 📅 Day 2 - Controllers & Models

### Topics:
- Controllers
- Models

### Tasks:
1. Controller kya hota hai samjho
2. Model kya hota hai samjho
3. User model banao (Models/User.cs)
4. UsersController banao (Controllers/UsersController.cs)
5. Basic GET endpoint banao (static data return karo)
6. Postman se test karo
7. Route attributes samjho ([Route], [HttpGet])

### Output:
✅ First API endpoint ready

---

## 📅 Day 3 - SQL Server Setup & Entity Framework

### Topics:
- SQL Server install
- Entity Framework Core

### Tasks:
1. SQL Server Express download aur install karo
2. SSMS (SQL Server Management Studio) install karo
3. Connection string samjho
4. Entity Framework Core packages install karo:
   - `dotnet add package Microsoft.EntityFrameworkCore.SqlServer`
   - `dotnet add package Microsoft.EntityFrameworkCore.Tools`
5. appsettings.json mein connection string add karo

### Output:
✅ SQL Server ready aur EF Core installed

---

## 📅 Day 4 - DbContext & Migrations

### Topics:
- DbContext
- Migrations

### Tasks:
1. DbContext kya hai samjho
2. ApplicationDbContext class banao (Data/ApplicationDbContext.cs)
3. DbSet<User> add karo
4. Program.cs mein DbContext register karo
5. First migration create karo: `dotnet ef migrations add InitialCreate`
6. Database update karo: `dotnet ef database update`
7. SSMS mein table verify karo

### Output:
✅ Database tables created through migrations

---

## 📅 Day 5 - Services & Dependency Injection

### Topics:
- Services
- Dependency Injection

### Tasks:
1. Service layer ka concept samjho
2. IUserService interface banao (Services/IUserService.cs)
3. UserService class banao (Services/UserService.cs)
4. CRUD methods implement karo service mein
5. Program.cs mein service register karo (DI)
6. Controller mein service inject karo
7. Constructor injection samjho

### Output:
✅ Service layer implemented with DI

---

## 📅 Day 6 - CRUD APIs & Postman Testing

### Topics:
- CRUD APIs
- Postman testing

### Tasks:
1. GET all users API complete karo
2. GET user by ID API banao
3. POST (Create user) API banao
4. PUT (Update user) API banao
5. DELETE user API banao
6. Postman collection banao
7. Sab APIs ko Postman se test karo
8. Error handling add karo (try-catch)

### Output:
✅ Complete CRUD APIs ready aur tested

---

## 📅 Day 7 - Project Implementation & Frontend Connection

### Topics:
- Users API
- Database tables
- Backend connected with frontend

### Tasks:
1. CORS enable karo (frontend ke liye)
2. Program.cs mein CORS policy add karo
3. Frontend ka .env update karo (backend URL)
4. Frontend se backend APIs call karo
5. Users list real database se load karo
6. Add/Edit/Delete operations test karo end-to-end
7. Database mein changes verify karo
8. Week 4 review karo

### Output:
✅ **Week 4 Complete!**
- Full stack project data driven ho chuka
- Backend APIs working
- Database connected
- Frontend-Backend integration done

---

## 🎯 Week 4 Checklist

- [ ] .NET SDK installed
- [ ] ASP.NET Core Web API project created
- [ ] Controllers samajh aa gaye
- [ ] Models bana sakte ho
- [ ] SQL Server installed
- [ ] SSMS installed
- [ ] Entity Framework Core setup ho gaya
- [ ] DbContext configured
- [ ] Migrations samajh aa gaye
- [ ] Database tables created
- [ ] Service layer implemented
- [ ] Dependency Injection samajh aa gaya
- [ ] GET API working
- [ ] POST API working
- [ ] PUT API working
- [ ] DELETE API working
- [ ] Postman se testing ki
- [ ] CORS configured
- [ ] Frontend backend se connected

---

## 💡 Key Learnings

- **.NET Web API** industry standard backend framework hai
- **Controllers** handle HTTP requests
- **Models** represent database entities
- **Services** contain business logic
- **Dependency Injection** makes code testable aur maintainable
- **Entity Framework Core** makes database operations easy
- **Migrations** keep database schema in sync
- **CORS** frontend-backend communication ke liye zaroori

---

## 🔧 Important Commands

```bash
# Project create
dotnet new webapi -n MyProjectAPI

# Run project
dotnet run

# Add packages
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools

# Migrations
dotnet ef migrations add MigrationName
dotnet ef database update

# Check .NET version
dotnet --version
```

---

## 📦 Connection String Example

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=MyProjectDB;Trusted_Connection=True;TrustServerCertificate=True"
  }
}
```

---

**Next Week:** Authentication & Security (JWT implementation)
