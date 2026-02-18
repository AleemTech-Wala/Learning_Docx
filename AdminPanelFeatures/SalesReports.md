# Sales Reports Feature

## 1. Feature Overview

### What this feature does
The Sales Reports feature allows administrators to view, analyze, and download sales data in various formats. It provides visual representations of sales performance through charts, filtering options by date range, product categories, and customer segments, and generates exportable reports.

### Real-life scenario example
Imagine you run an online store. At the end of each month, you need to see:
- How much revenue was generated
- Which products sold the most
- Which customers made the most purchases
- Sales trends over time (daily, weekly, monthly)
- Peak sales periods

Without a reporting system, you would need to manually calculate all this data from individual orders. The Sales Reports feature automates this process and presents data in easy-to-understand formats.

### Why this feature is important
- **Business Intelligence**: Helps make informed decisions about inventory, marketing, and pricing
- **Performance Tracking**: Monitor sales goals and identify trends
- **Financial Planning**: Understand revenue patterns for budgeting
- **Customer Insights**: Identify top customers and buying patterns
- **Product Analysis**: Determine which products are performing well or poorly

### How it connects with frontend, backend, and database

**Database**: Stores all sales transactions, orders, products, and customer information that will be aggregated for reports.

**Backend (.NET)**: 
- Queries the database to fetch sales data
- Applies filters (date range, product category, customer)
- Performs calculations (total revenue, average order value, growth percentage)
- Aggregates data for charts and summaries
- Generates report files (CSV, PDF)

**Frontend (React + MUI)**:
- Displays interactive dashboards with sales metrics
- Provides filter controls (date pickers, dropdowns)
- Renders charts and graphs using data from backend
- Allows users to export reports
- Shows real-time updates of sales performance

---

## 2. Database Design

### Required Tables

For a complete sales reporting system, we need to work with these tables:

#### **Orders Table** (Main table for sales transactions)
```sql
CREATE TABLE Orders (
    OrderId INT PRIMARY KEY IDENTITY(1,1),
    OrderNumber NVARCHAR(50) NOT NULL UNIQUE,
    UserId INT NOT NULL,
    OrderDate DATETIME NOT NULL DEFAULT GETDATE(),
    TotalAmount DECIMAL(18,2) NOT NULL,
    Status NVARCHAR(50) NOT NULL, -- Pending, Completed, Cancelled, Refunded
    PaymentMethod NVARCHAR(50),
    ShippingAddress NVARCHAR(500),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);
```

**Field Explanations:**
- `OrderId`: Unique identifier for each order (auto-generated)
- `OrderNumber`: Human-readable order reference (e.g., ORD-2026-001)
- `UserId`: Links to the customer who placed the order
- `OrderDate`: When the order was placed (important for time-based reports)
- `TotalAmount`: Final order value (sum of all items after discounts)
- `Status`: Current state of the order (only 'Completed' orders count in sales)
- `PaymentMethod`: How customer paid (for payment method analysis)

#### **OrderItems Table** (Individual products in each order)
```sql
CREATE TABLE OrderItems (
    OrderItemId INT PRIMARY KEY IDENTITY(1,1),
    OrderId INT NOT NULL,
    ProductId INT NOT NULL,
    ProductName NVARCHAR(200) NOT NULL,
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(18,2) NOT NULL,
    Subtotal DECIMAL(18,2) NOT NULL, -- Quantity * UnitPrice
    Discount DECIMAL(18,2) DEFAULT 0,
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId),
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId)
);
```

**Field Explanations:**
- `OrderItemId`: Unique identifier for this line item
- `OrderId`: Links to the parent order
- `ProductId`: Links to the product master data
- `ProductName`: Stored here to preserve name even if product is later renamed
- `Quantity`: Number of units sold
- `UnitPrice`: Price per unit at time of purchase
- `Subtotal`: Total for this line item
- `Discount`: Any discount applied to this item

#### **Products Table** (Product master data)
```sql
CREATE TABLE Products (
    ProductId INT PRIMARY KEY IDENTITY(1,1),
    ProductName NVARCHAR(200) NOT NULL,
    CategoryId INT,
    Price DECIMAL(18,2) NOT NULL,
    StockQuantity INT DEFAULT 0,
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (CategoryId) REFERENCES Categories(CategoryId)
);
```

#### **Categories Table** (Product categories)
```sql
CREATE TABLE Categories (
    CategoryId INT PRIMARY KEY IDENTITY(1,1),
    CategoryName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(500)
);
```

### Primary Key and Foreign Key Explanation

**Primary Key (PK)**: 
A unique identifier for each row in a table. No two rows can have the same primary key value.
- Example: `OrderId` in Orders table ensures each order has a unique ID.

**Foreign Key (FK)**: 
A field that links one table to another by referencing the primary key of another table.
- Example: `UserId` in Orders table is a foreign key that links to `UserId` in Users table, establishing which customer placed the order.

### Relationships Between Tables

```
Users (1) ----< (Many) Orders
  |
  - One user can place many orders
  
Orders (1) ----< (Many) OrderItems
  |
  - One order contains many line items
  
Products (1) ----< (Many) OrderItems
  |
  - One product can appear in many order items
  
Categories (1) ----< (Many) Products
  |
  - One category contains many products
```

### Sample SQL Index for Performance
```sql
-- Indexes for faster report queries
CREATE INDEX IX_Orders_OrderDate ON Orders(OrderDate);
CREATE INDEX IX_Orders_UserId ON Orders(UserId);
CREATE INDEX IX_Orders_Status ON Orders(Status);
CREATE INDEX IX_OrderItems_ProductId ON OrderItems(ProductId);
```

---

## 3. Backend Architecture (.NET)

### Required Models

#### **Order Model**
```csharp
public class Order
{
    public int OrderId { get; set; }
    public string OrderNumber { get; set; }
    public int UserId { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal TotalAmount { get; set; }
    public string Status { get; set; }
    public string PaymentMethod { get; set; }
    public string ShippingAddress { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    // Navigation properties
    public User User { get; set; }
    public ICollection<OrderItem> OrderItems { get; set; }
}
```

#### **OrderItem Model**
```csharp
public class OrderItem
{
    public int OrderItemId { get; set; }
    public int OrderId { get; set; }
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal Subtotal { get; set; }
    public decimal Discount { get; set; }
    
    // Navigation properties
    public Order Order { get; set; }
    public Product Product { get; set; }
}
```

#### **Product Model**
```csharp
public class Product
{
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public int? CategoryId { get; set; }
    public decimal Price { get; set; }
    public int StockQuantity { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    
    // Navigation properties
    public Category Category { get; set; }
    public ICollection<OrderItem> OrderItems { get; set; }
}
```

#### **Category Model**
```csharp
public class Category
{
    public int CategoryId { get; set; }
    public string CategoryName { get; set; }
    public string Description { get; set; }
    
    public ICollection<Product> Products { get; set; }
}
```

### DTO Explanation and Usage

**What is a DTO?**
DTO stands for Data Transfer Object. It's a simplified version of your model used to send data between backend and frontend. DTOs help you:
- Send only necessary data (hide sensitive information)
- Combine data from multiple tables
- Format data specifically for frontend needs
- Avoid sending circular references from navigation properties

#### **SalesReportFilterDto** (Request from frontend)
```csharp
public class SalesReportFilterDto
{
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public int? CategoryId { get; set; }
    public int? UserId { get; set; }
    public string Status { get; set; } // Completed, Cancelled, etc.
    public string GroupBy { get; set; } // Daily, Weekly, Monthly
}
```

#### **SalesReportSummaryDto** (Response to frontend)
```csharp
public class SalesReportSummaryDto
{
    public decimal TotalRevenue { get; set; }
    public int TotalOrders { get; set; }
    public decimal AverageOrderValue { get; set; }
    public int TotalItemsSold { get; set; }
    public decimal GrowthPercentage { get; set; } // Compared to previous period
    public List<TopProductDto> TopProducts { get; set; }
    public List<TopCustomerDto> TopCustomers { get; set; }
    public List<SalesChartDataDto> ChartData { get; set; }
}
```

#### **TopProductDto**
```csharp
public class TopProductDto
{
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public string CategoryName { get; set; }
    public int TotalQuantitySold { get; set; }
    public decimal TotalRevenue { get; set; }
}
```

#### **TopCustomerDto**
```csharp
public class TopCustomerDto
{
    public int UserId { get; set; }
    public string CustomerName { get; set; }
    public string Email { get; set; }
    public int TotalOrders { get; set; }
    public decimal TotalSpent { get; set; }
}
```

#### **SalesChartDataDto**
```csharp
public class SalesChartDataDto
{
    public string Label { get; set; } // Date or time period
    public decimal Revenue { get; set; }
    public int OrderCount { get; set; }
}
```

#### **OrderReportDto** (Detailed order list)
```csharp
public class OrderReportDto
{
    public int OrderId { get; set; }
    public string OrderNumber { get; set; }
    public DateTime OrderDate { get; set; }
    public string CustomerName { get; set; }
    public decimal TotalAmount { get; set; }
    public string Status { get; set; }
    public string PaymentMethod { get; set; }
    public int ItemCount { get; set; }
}
```

### Controller Endpoints

#### **SalesReportsController**
```csharp
[ApiController]
[Route("api/[controller]")]
public class SalesReportsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SalesReportsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // Get sales summary with filters
    [HttpPost("summary")]
    public async Task<ActionResult<SalesReportSummaryDto>> GetSalesSummary(
        [FromBody] SalesReportFilterDto filter)
    {
        // Implementation details in next section
    }

    // Get detailed order list with pagination
    [HttpPost("orders")]
    public async Task<ActionResult<PagedResult<OrderReportDto>>> GetOrdersReport(
        [FromBody] SalesReportFilterDto filter, 
        [FromQuery] int page = 1, 
        [FromQuery] int pageSize = 20)
    {
        // Implementation details
    }

    // Get sales by category
    [HttpPost("by-category")]
    public async Task<ActionResult<List<CategorySalesDto>>> GetSalesByCategory(
        [FromBody] SalesReportFilterDto filter)
    {
        // Implementation details
    }

    // Get sales by payment method
    [HttpPost("by-payment-method")]
    public async Task<ActionResult<List<PaymentMethodSalesDto>>> GetSalesByPaymentMethod(
        [FromBody] SalesReportFilterDto filter)
    {
        // Implementation details
    }

    // Export report to CSV
    [HttpPost("export/csv")]
    public async Task<IActionResult> ExportToCSV([FromBody] SalesReportFilterDto filter)
    {
        // Returns file download
    }
}
```

### API Routes Structure

| Method | Route | Purpose | Request Body | Response |
|--------|-------|---------|--------------|----------|
| POST | `/api/salesreports/summary` | Get aggregated sales summary | SalesReportFilterDto | SalesReportSummaryDto |
| POST | `/api/salesreports/orders` | Get detailed order list | SalesReportFilterDto | PagedResult<OrderReportDto> |
| POST | `/api/salesreports/by-category` | Sales breakdown by category | SalesReportFilterDto | List<CategorySalesDto> |
| POST | `/api/salesreports/by-payment-method` | Sales by payment method | SalesReportFilterDto | List<PaymentMethodSalesDto> |
| POST | `/api/salesreports/export/csv` | Download CSV report | SalesReportFilterDto | File download |

### Basic Flow of Request to Response

1. **Frontend sends request** → User selects date range and clicks "Generate Report"
2. **Request hits Controller** → `SalesReportsController.GetSalesSummary()` receives the filter
3. **Controller validates input** → Checks if dates are valid, status values are correct
4. **Query database** → Uses Entity Framework LINQ to query Orders, OrderItems tables
5. **Apply filters** → Filter by date range, category, user, status
6. **Aggregate data** → Calculate totals, averages, group by time periods
7. **Map to DTOs** → Convert database entities to DTOs
8. **Return response** → Send JSON response back to frontend
9. **Frontend displays data** → React components render charts and tables

### Example Endpoint Structure

```csharp
[HttpPost("summary")]
public async Task<ActionResult<ApiResponse<SalesReportSummaryDto>>> GetSalesSummary(
    [FromBody] SalesReportFilterDto filter)
{
    try
    {
        // Step 1: Build base query
        var query = _context.Orders
            .Include(o => o.OrderItems)
            .Include(o => o.User)
            .Where(o => o.Status == "Completed");

        // Step 2: Apply date filters
        if (filter.StartDate.HasValue)
            query = query.Where(o => o.OrderDate >= filter.StartDate.Value);
        
        if (filter.EndDate.HasValue)
            query = query.Where(o => o.OrderDate <= filter.EndDate.Value);

        // Step 3: Apply category filter
        if (filter.CategoryId.HasValue)
        {
            query = query.Where(o => o.OrderItems
                .Any(oi => oi.Product.CategoryId == filter.CategoryId.Value));
        }

        // Step 4: Calculate totals
        var orders = await query.ToListAsync();
        
        var totalRevenue = orders.Sum(o => o.TotalAmount);
        var totalOrders = orders.Count;
        var averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
        var totalItemsSold = orders.SelectMany(o => o.OrderItems).Sum(oi => oi.Quantity);

        // Step 5: Get top products
        var topProducts = await _context.OrderItems
            .Where(oi => orders.Select(o => o.OrderId).Contains(oi.OrderId))
            .GroupBy(oi => new { oi.ProductId, oi.ProductName, oi.Product.Category.CategoryName })
            .Select(g => new TopProductDto
            {
                ProductId = g.Key.ProductId,
                ProductName = g.Key.ProductName,
                CategoryName = g.Key.CategoryName,
                TotalQuantitySold = g.Sum(oi => oi.Quantity),
                TotalRevenue = g.Sum(oi => oi.Subtotal)
            })
            .OrderByDescending(p => p.TotalRevenue)
            .Take(10)
            .ToListAsync();

        // Step 6: Get top customers
        var topCustomers = orders
            .GroupBy(o => new { o.UserId, o.User.Name, o.User.Email })
            .Select(g => new TopCustomerDto
            {
                UserId = g.Key.UserId,
                CustomerName = g.Key.Name,
                Email = g.Key.Email,
                TotalOrders = g.Count(),
                TotalSpent = g.Sum(o => o.TotalAmount)
            })
            .OrderByDescending(c => c.TotalSpent)
            .Take(10)
            .ToList();

        // Step 7: Generate chart data
        var chartData = GenerateChartData(orders, filter.GroupBy ?? "Daily");

        // Step 8: Build response
        var summary = new SalesReportSummaryDto
        {
            TotalRevenue = totalRevenue,
            TotalOrders = totalOrders,
            AverageOrderValue = averageOrderValue,
            TotalItemsSold = totalItemsSold,
            GrowthPercentage = CalculateGrowth(filter), // Helper method
            TopProducts = topProducts,
            TopCustomers = topCustomers,
            ChartData = chartData
        };

        return Ok(new ApiResponse<SalesReportSummaryDto>
        {
            Success = true,
            Message = "Sales report generated successfully",
            Data = summary
        });
    }
    catch (Exception ex)
    {
        return StatusCode(500, new ApiResponse<SalesReportSummaryDto>
        {
            Success = false,
            Message = "Error generating report: " + ex.Message,
            Data = null
        });
    }
}
```

---

## 4. Frontend Architecture (React + MUI)

### Required Pages and Components

#### **Pages:**
1. **SalesReportsPage** - Main container page for all reports
2. **ReportsDashboard** - Overview with key metrics and charts
3. **DetailedReports** - Detailed order listings with filters

#### **Components:**

**Dashboard Components:**
- `SalesMetricsCards` - Display total revenue, orders, average order value
- `SalesChart` - Line or bar chart showing sales over time
- `TopProductsTable` - Table of best-selling products
- `TopCustomersTable` - Table of top spending customers
- `ReportFilters` - Date range picker and filter controls

**Report Components:**
- `OrdersDataGrid` - MUI DataGrid for detailed order list
- `ExportButton` - Download report as CSV
- `CategoryBreakdownPieChart` - Sales distribution by category
- `PaymentMethodChart` - Sales breakdown by payment method

**Utility Components:**
- `DateRangePicker` - Custom date range selector
- `CategoryFilter` - Dropdown for category selection
- `LoadingSpinner` - Shows while fetching data
- `ErrorAlert` - Displays errors

### Suggested Folder Structure

```
src/
├── pages/
│   ├── SalesReportsPage.jsx
│   └── ReportsDashboard.jsx
│
├── components/
│   ├── reports/
│   │   ├── SalesMetricsCards.jsx
│   │   ├── SalesChart.jsx
│   │   ├── TopProductsTable.jsx
│   │   ├── TopCustomersTable.jsx
│   │   ├── ReportFilters.jsx
│   │   ├── OrdersDataGrid.jsx
│   │   ├── CategoryBreakdownPieChart.jsx
│   │   ├── PaymentMethodChart.jsx
│   │   └── ExportButton.jsx
│   │
│   └── common/
│       ├── DateRangePicker.jsx
│       ├── LoadingSpinner.jsx
│       └── ErrorAlert.jsx
│
├── services/
│   └── salesReportsService.js
│
├── hooks/
│   └── useSalesReports.js
│
└── utils/
    ├── chartHelpers.js
    └── formatters.js
```

### MUI Components to Use

1. **Layout & Structure:**
   - `Box` - Container component
   - `Container` - Responsive container with padding
   - `Grid` - Responsive grid layout
   - `Paper` - Elevated surface for cards
   - `Stack` - Vertical/horizontal stacking

2. **Typography & Display:**
   - `Typography` - Text display with variants
   - `Divider` - Section separators

3. **Data Display:**
   - `DataGrid` (from @mui/x-data-grid) - Advanced table with sorting, filtering, pagination
   - `Table`, `TableBody`, `TableCell`, `TableHead`, `TableRow` - Basic tables
   - `Card`, `CardContent`, `CardHeader` - Metric cards
   - `Chip` - Status badges

4. **Inputs & Filters:**
   - `TextField` - Text input for search
   - `Select`, `MenuItem` - Dropdown filters
   - `DatePicker` (from @mui/x-date-pickers) - Date selection
   - `Button` - Action buttons
   - `IconButton` - Icon-only buttons

5. **Feedback:**
   - `CircularProgress` - Loading spinner
   - `Alert` - Error/success messages
   - `Snackbar` - Toast notifications

6. **Icons:**
   - `@mui/icons-material` - TrendingUp, AttachMoney, ShoppingCart, GetApp, etc.

7. **Charts:**
   - Use **Recharts** library (install separately):
     - `LineChart`, `BarChart`, `PieChart`
     - `XAxis`, `YAxis`, `CartesianGrid`, `Tooltip`, `Legend`

### Form Handling Approach

**Filter Form Management:**
```jsx
import { useState } from 'react';

function ReportFilters({ onFilterChange }) {
    const [filters, setFilters] = useState({
        startDate: null,
        endDate: null,
        categoryId: null,
        status: 'Completed',
        groupBy: 'Daily'
    });

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleApplyFilters = () => {
        onFilterChange(filters);
    };

    return (
        <Paper sx={{ p: 2, mb: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <DatePicker
                        label="Start Date"
                        value={filters.startDate}
                        onChange={(date) => handleFilterChange('startDate', date)}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <DatePicker
                        label="End Date"
                        value={filters.endDate}
                        onChange={(date) => handleFilterChange('endDate', date)}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Select
                        fullWidth
                        value={filters.groupBy}
                        onChange={(e) => handleFilterChange('groupBy', e.target.value)}
                    >
                        <MenuItem value="Daily">Daily</MenuItem>
                        <MenuItem value="Weekly">Weekly</MenuItem>
                        <MenuItem value="Monthly">Monthly</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Button 
                        fullWidth 
                        variant="contained" 
                        onClick={handleApplyFilters}
                    >
                        Apply Filters
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}
```

### API Integration Flow

**1. Create Service Layer** (`salesReportsService.js`):
```javascript
import api from './api'; // Your axios instance

export const salesReportsService = {
    // Get sales summary
    getSalesSummary: async (filters) => {
        const response = await api.post('/salesreports/summary', filters);
        return response.data;
    },

    // Get detailed orders
    getOrdersReport: async (filters, page = 1, pageSize = 20) => {
        const response = await api.post(
            `/salesreports/orders?page=${page}&pageSize=${pageSize}`,
            filters
        );
        return response.data;
    },

    // Export to CSV
    exportToCSV: async (filters) => {
        const response = await api.post('/salesreports/export/csv', filters, {
            responseType: 'blob'
        });
        return response.data;
    }
};
```

**2. Create Custom Hook** (`useSalesReports.js`):
```javascript
import { useState, useEffect } from 'react';
import { salesReportsService } from '../services/salesReportsService';

export const useSalesReports = (initialFilters) => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState(initialFilters);

    const fetchSummary = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await salesReportsService.getSalesSummary(filters);
            setSummary(data.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSummary();
    }, [filters]);

    return {
        summary,
        loading,
        error,
        filters,
        setFilters,
        refetch: fetchSummary
    };
};
```

**3. Use in Component**:
```javascript
function SalesReportsPage() {
    const { summary, loading, error, setFilters } = useSalesReports({
        startDate: new Date(new Date().setDate(1)), // First day of month
        endDate: new Date(),
        status: 'Completed',
        groupBy: 'Daily'
    });

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorAlert message={error} />;

    return (
        <Container>
            <ReportFilters onFilterChange={setFilters} />
            {summary && (
                <>
                    <SalesMetricsCards metrics={summary} />
                    <SalesChart data={summary.chartData} />
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TopProductsTable products={summary.topProducts} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TopCustomersTable customers={summary.topCustomers} />
                        </Grid>
                    </Grid>
                </>
            )}
        </Container>
    );
}
```

### State Management Concept

For Sales Reports feature, use **local state management** with these approaches:

1. **Component State (useState)**: For UI-specific state like filter values, expanded rows
2. **Custom Hooks**: Encapsulate data fetching logic (useSalesReports, useOrdersList)
3. **Props Drilling**: Pass data from parent to child components
4. **Context (optional)**: If filters need to be shared across multiple unrelated components

**When to use Context:**
```javascript
// Create ReportContext.jsx if filters are used in many places
import { createContext, useContext, useState } from 'react';

const ReportContext = createContext();

export function ReportProvider({ children }) {
    const [filters, setFilters] = useState({
        startDate: null,
        endDate: null,
        categoryId: null
    });

    return (
        <ReportContext.Provider value={{ filters, setFilters }}>
            {children}
        </ReportContext.Provider>
    );
}

export const useReportContext = () => useContext(ReportContext);
```

---

## 5. Step-by-Step Implementation Plan

### Development Order

**Phase 1: Database Setup** (Day 1)
**Phase 2: Backend Implementation** (Days 2-3)
**Phase 3: Frontend Implementation** (Days 4-6)
**Phase 4: Integration & Testing** (Day 7)

---

### Database Setup

**Step 1: Create Migration for Orders Tables**
```powershell
# Navigate to Backend project
cd admin-panel/Backend/AdminPanelAPI

# Add migration
dotnet ef migrations add AddOrdersTables

# Update database
dotnet ef database update
```

**Step 2: Verify Tables Created**
- Open SQL Server Management Studio
- Connect to your database
- Verify Orders, OrderItems, Products, Categories tables exist

**Step 3: Seed Sample Data (Optional for Testing)**
Create a SQL script to insert sample orders:
```sql
-- Insert sample orders for testing
INSERT INTO Orders (OrderNumber, UserId, OrderDate, TotalAmount, Status, PaymentMethod)
VALUES 
('ORD-2026-001', 1, '2026-01-15', 299.99, 'Completed', 'Credit Card'),
('ORD-2026-002', 2, '2026-01-18', 149.50, 'Completed', 'PayPal'),
('ORD-2026-003', 1, '2026-02-01', 599.00, 'Completed', 'Credit Card');

-- Insert order items
INSERT INTO OrderItems (OrderId, ProductId, ProductName, Quantity, UnitPrice, Subtotal)
VALUES 
(1, 1, 'Gaming Mouse', 1, 99.99, 99.99),
(1, 2, 'Keyboard', 1, 200.00, 200.00);
```

---

### Backend Implementation Steps

**Step 1: Update ApplicationDbContext**
```csharp
// Data/ApplicationDbContext.cs
public class ApplicationDbContext : DbContext
{
    // Add DbSets
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }

    // Configure relationships in OnModelCreating
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure Order
        modelBuilder.Entity<Order>()
            .HasOne(o => o.User)
            .WithMany()
            .HasForeignKey(o => o.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        // Configure OrderItem
        modelBuilder.Entity<OrderItem>()
            .HasOne(oi => oi.Order)
            .WithMany(o => o.OrderItems)
            .HasForeignKey(oi => oi.OrderId);

        // Configure Product
        modelBuilder.Entity<Product>()
            .HasOne(p => p.Category)
            .WithMany(c => c.Products)
            .HasForeignKey(p => p.CategoryId);
    }
}
```

**Step 2: Create Models**
Create files in `Models/` folder:
- `Order.cs`
- `OrderItem.cs`
- `Product.cs`
- `Category.cs`

**Step 3: Create DTOs**
Create files in `DTOs/` folder:
- `SalesReportFilterDto.cs`
- `SalesReportSummaryDto.cs`
- `TopProductDto.cs`
- `TopCustomerDto.cs`
- `SalesChartDataDto.cs`
- `OrderReportDto.cs`

**Step 4: Create SalesReportsController**
```csharp
// Controllers/SalesReportsController.cs
[ApiController]
[Route("api/[controller]")]
public class SalesReportsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SalesReportsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // Implement endpoints as shown in section 3
}
```

**Step 5: Implement Helper Methods**
Create helper methods in controller or separate service class:
```csharp
private List<SalesChartDataDto> GenerateChartData(List<Order> orders, string groupBy)
{
    switch (groupBy)
    {
        case "Daily":
            return orders
                .GroupBy(o => o.OrderDate.Date)
                .Select(g => new SalesChartDataDto
                {
                    Label = g.Key.ToString("MMM dd"),
                    Revenue = g.Sum(o => o.TotalAmount),
                    OrderCount = g.Count()
                })
                .OrderBy(x => x.Label)
                .ToList();

        case "Monthly":
            return orders
                .GroupBy(o => new { o.OrderDate.Year, o.OrderDate.Month })
                .Select(g => new SalesChartDataDto
                {
                    Label = $"{g.Key.Year}-{g.Key.Month:D2}",
                    Revenue = g.Sum(o => o.TotalAmount),
                    OrderCount = g.Count()
                })
                .OrderBy(x => x.Label)
                .ToList();

        default:
            return new List<SalesChartDataDto>();
    }
}
```

**Step 6: Test Endpoints with Postman or .http file**
Create `SalesReports.http` file:
```http
### Get Sales Summary
POST https://localhost:7001/api/salesreports/summary
Content-Type: application/json

{
    "startDate": "2026-01-01",
    "endDate": "2026-02-17",
    "status": "Completed",
    "groupBy": "Daily"
}
```

---

### Frontend Implementation Steps

**Step 1: Install Required Dependencies**
```bash
cd admin-panel/Frontend

# Install MUI date pickers
npm install @mui/x-date-pickers

# Install date library
npm install dayjs

# Install charts library
npm install recharts

# Install MUI DataGrid
npm install @mui/x-data-grid
```

**Step 2: Create Service Layer**
Create `src/services/salesReportsService.js` with API functions

**Step 3: Create Custom Hook**
Create `src/hooks/useSalesReports.js` for data fetching logic

**Step 4: Create Utility Components**
- `DateRangePicker.jsx` - For date selection
- `LoadingSpinner.jsx` - Loading indicator
- `ErrorAlert.jsx` - Error display

**Step 5: Create Report Components**
Create all components in `src/components/reports/`:

**SalesMetricsCards.jsx:**
```jsx
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { TrendingUp, ShoppingCart, AttachMoney } from '@mui/icons-material';

function SalesMetricsCards({ metrics }) {
    const cards = [
        {
            title: 'Total Revenue',
            value: `$${metrics.totalRevenue.toLocaleString()}`,
            icon: <AttachMoney />,
            color: '#4caf50'
        },
        {
            title: 'Total Orders',
            value: metrics.totalOrders.toLocaleString(),
            icon: <ShoppingCart />,
            color: '#2196f3'
        },
        {
            title: 'Average Order Value',
            value: `$${metrics.averageOrderValue.toFixed(2)}`,
            icon: <TrendingUp />,
            color: '#ff9800'
        }
    ];

    return (
        <Grid container spacing={3} sx={{ mb: 3 }}>
            {cards.map((card, index) => (
                <Grid item xs={12} md={4} key={index}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Box>
                                    <Typography color="textSecondary" variant="body2">
                                        {card.title}
                                    </Typography>
                                    <Typography variant="h4" sx={{ mt: 1 }}>
                                        {card.value}
                                    </Typography>
                                </Box>
                                <Box 
                                    sx={{ 
                                        backgroundColor: card.color, 
                                        borderRadius: '50%', 
                                        p: 1.5,
                                        color: 'white'
                                    }}
                                >
                                    {card.icon}
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default SalesMetricsCards;
```

**SalesChart.jsx:**
```jsx
import { Paper, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function SalesChart({ data }) {
    return (
        <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
                Sales Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#2196f3" 
                        name="Revenue ($)" 
                    />
                    <Line 
                        type="monotone" 
                        dataKey="orderCount" 
                        stroke="#4caf50" 
                        name="Orders" 
                    />
                </LineChart>
            </ResponsiveContainer>
        </Paper>
    );
}

export default SalesChart;
```

**Step 6: Create Main Page**
Create `src/pages/SalesReportsPage.jsx` that combines all components

**Step 7: Add Route**
Update your routing configuration to include the sales reports page:
```jsx
import SalesReportsPage from './pages/SalesReportsPage';

// In your route configuration
<Route path="/reports/sales" element={<SalesReportsPage />} />
```

**Step 8: Add Navigation Menu Item**
Update your sidebar/navigation to include link to Sales Reports

---

### Integration Steps

**Step 1: Test API Connection**
- Start backend API
- Start frontend dev server
- Open browser console
- Verify API calls are successful

**Step 2: Handle CORS Issues**
If you see CORS errors, update `Program.cs` in backend:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173") // Vite default port
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Use CORS before app.MapControllers()
app.UseCors("AllowReactApp");
```

**Step 3: Test All Features**
- Apply different date range filters
- Change grouping (Daily, Weekly, Monthly)
- Verify charts update correctly
- Test export functionality
- Check responsive design on mobile

**Step 4: Error Handling**
- Test with no data (empty date range)
- Test with invalid filters
- Test network failure scenarios
- Verify error messages display correctly

---

### Testing Flow

**Backend Testing:**
1. Unit test calculation methods
2. Test API endpoints with Postman
3. Test with various filter combinations
4. Test with large datasets for performance

**Frontend Testing:**
1. Test filter interactions
2. Test chart rendering with different data
3. Test responsive layout
4. Test loading and error states
5. Manual cross-browser testing

**Integration Testing:**
1. End-to-end test: Select filters → View results → Export report
2. Test with real production-like data
3. Performance testing with large date ranges

---

## 6. Validation and Business Rules

### Backend Validations

**Filter Validation:**
```csharp
private bool ValidateFilters(SalesReportFilterDto filter, out string errorMessage)
{
    errorMessage = string.Empty;

    // Date range validation
    if (filter.StartDate.HasValue && filter.EndDate.HasValue)
    {
        if (filter.StartDate > filter.EndDate)
        {
            errorMessage = "Start date cannot be after end date";
            return false;
        }

        // Limit to 2 years max to prevent performance issues
        var daysDifference = (filter.EndDate.Value - filter.StartDate.Value).TotalDays;
        if (daysDifference > 730)
        {
            errorMessage = "Date range cannot exceed 2 years";
            return false;
        }
    }

    // Status validation
    if (!string.IsNullOrEmpty(filter.Status))
    {
        var validStatuses = new[] { "Pending", "Completed", "Cancelled", "Refunded" };
        if (!validStatuses.Contains(filter.Status))
        {
            errorMessage = "Invalid status value";
            return false;
        }
    }

    // GroupBy validation
    if (!string.IsNullOrEmpty(filter.GroupBy))
    {
        var validGroupings = new[] { "Daily", "Weekly", "Monthly" };
        if (!validGroupings.Contains(filter.GroupBy))
        {
            errorMessage = "Invalid groupBy value";
            return false;
        }
    }

    return true;
}
```

**Use in Controller:**
```csharp
[HttpPost("summary")]
public async Task<ActionResult<ApiResponse<SalesReportSummaryDto>>> GetSalesSummary(
    [FromBody] SalesReportFilterDto filter)
{
    // Validate filters
    if (!ValidateFilters(filter, out string errorMessage))
    {
        return BadRequest(new ApiResponse<SalesReportSummaryDto>
        {
            Success = false,
            Message = errorMessage,
            Data = null
        });
    }

    // Continue with implementation...
}
```

### Frontend Validations

**Date Range Validation:**
```jsx
function ReportFilters({ onFilterChange }) {
    const [filters, setFilters] = useState({...});
    const [errors, setErrors] = useState({});

    const validateFilters = () => {
        const newErrors = {};

        // Check if dates are provided
        if (!filters.startDate) {
            newErrors.startDate = 'Start date is required';
        }

        if (!filters.endDate) {
            newErrors.endDate = 'End date is required';
        }

        // Check date order
        if (filters.startDate && filters.endDate && 
            filters.startDate > filters.endDate) {
            newErrors.dateRange = 'Start date must be before end date';
        }

        // Check date range span
        if (filters.startDate && filters.endDate) {
            const daysDiff = Math.abs(
                (filters.endDate - filters.startDate) / (1000 * 60 * 60 * 24)
            );
            if (daysDiff > 730) {
                newErrors.dateRange = 'Date range cannot exceed 2 years';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleApplyFilters = () => {
        if (validateFilters()) {
            onFilterChange(filters);
        }
    };

    return (
        // Form with error display
        <>
            <DatePicker
                label="Start Date"
                value={filters.startDate}
                onChange={(date) => handleFilterChange('startDate', date)}
                slotProps={{
                    textField: {
                        error: !!errors.startDate,
                        helperText: errors.startDate
                    }
                }}
            />
            {errors.dateRange && (
                <Alert severity="error">{errors.dateRange}</Alert>
            )}
        </>
    );
}
```

### Business Rules

1. **Only Completed Orders Count in Revenue**
   - Orders with status "Pending", "Cancelled", or "Refunded" should not be included in revenue calculations
   - Provide option to include/exclude refunded orders

2. **Date Range Restrictions**
   - Maximum 2 years to ensure performance
   - Default to current month if no dates provided

3. **Top Lists Limited to 10 Items**
   - Show only top 10 products and customers
   - Provide "View All" option for complete lists

4. **Permissions**
   - Only Admin and Manager roles can access sales reports
   - Salesperson role can only see their own sales

5. **Data Refresh Rate**
   - Reports cache data for 5 minutes to reduce database load
   - Add "Refresh" button for manual updates

6. **Export Limitations**
   - CSV export limited to 10,000 rows
   - For larger exports, use background job and email link

---

## 7. Common Beginner Mistakes

### Mistake 1: Not Filtering by Order Status
**Wrong:**
```csharp
var totalRevenue = _context.Orders.Sum(o => o.TotalAmount);
```

**Correct:**
```csharp
var totalRevenue = _context.Orders
    .Where(o => o.Status == "Completed")
    .Sum(o => o.TotalAmount);
```

**Why:** Including pending or cancelled orders inflates revenue figures.

---

### Mistake 2: Loading All Data at Once
**Wrong:**
```csharp
var allOrders = await _context.Orders.ToListAsync();
// Then filter in memory
var filtered = allOrders.Where(o => o.OrderDate >= startDate);
```

**Correct:**
```csharp
var filtered = await _context.Orders
    .Where(o => o.OrderDate >= startDate)
    .ToListAsync();
```

**Why:** Filtering in database is much faster than loading everything into memory.

---

### Mistake 3: Circular Reference Errors
**Wrong:**
```csharp
// Returning model with navigation properties directly
return Ok(orders); // This includes User, OrderItems, etc.
```

**Correct:**
```csharp
// Map to DTO first
var orderDtos = orders.Select(o => new OrderReportDto
{
    OrderId = o.OrderId,
    OrderNumber = o.OrderNumber,
    // Only include needed fields
}).ToList();

return Ok(orderDtos);
```

**Why:** Navigation properties cause circular references when serializing to JSON.

---

### Mistake 4: Not Handling Empty Results
**Wrong:**
```csharp
var averageOrderValue = totalRevenue / totalOrders; // Division by zero!
```

**Correct:**
```csharp
var averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
```

---

### Mistake 5: Hardcoding Date Formats
**Wrong:**
```jsx
const formattedDate = `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`;
```

**Correct:**
```jsx
import dayjs from 'dayjs';
const formattedDate = dayjs(date).format('MM/DD/YYYY');
```

**Why:** Date formatting is complex and error-prone. Use a library like dayjs.

---

### Mistake 6: Not Using Async/Await Properly
**Wrong:**
```javascript
const fetchData = () => {
    salesReportsService.getSalesSummary(filters)
        .then(data => setSummary(data));
    // Code here runs before data is loaded!
    console.log(summary); // Still null!
};
```

**Correct:**
```javascript
const fetchData = async () => {
    setLoading(true);
    try {
        const data = await salesReportsService.getSalesSummary(filters);
        setSummary(data);
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
};
```

---

### Mistake 7: Forgetting to Include Related Data
**Wrong:**
```csharp
var orders = await _context.Orders.ToListAsync();
// Accessing o.User.Name causes additional database queries (N+1 problem)
foreach (var o in orders)
{
    var userName = o.User.Name; // Separate query for each order!
}
```

**Correct:**
```csharp
var orders = await _context.Orders
    .Include(o => o.User)
    .Include(o => o.OrderItems)
    .ToListAsync();
```

**Why:** Use `.Include()` to load related data in one query.

---

### Mistake 8: Not Validating Inputs
**Wrong:**
```csharp
[HttpPost("summary")]
public async Task<ActionResult> GetSalesSummary([FromBody] SalesReportFilterDto filter)
{
    // Directly using filter without validation
    var query = _context.Orders.Where(o => o.OrderDate >= filter.StartDate);
}
```

**Correct:**
```csharp
// Always validate inputs first
if (filter.StartDate > filter.EndDate)
{
    return BadRequest("Invalid date range");
}
```

---

### Mistake 9: Poor Error Handling in Frontend
**Wrong:**
```jsx
const fetchData = async () => {
    const data = await salesReportsService.getSalesSummary(filters);
    setSummary(data);
    // No error handling - app crashes if API fails!
};
```

**Correct:**
```jsx
const fetchData = async () => {
    try {
        const data = await salesReportsService.getSalesSummary(filters);
        setSummary(data);
    } catch (error) {
        setError('Failed to load report: ' + error.message);
    }
};
```

---

### Mistake 10: Not Using Pagination
**Wrong:**
```csharp
// Returning all orders at once
var orders = await _context.Orders.ToListAsync();
return Ok(orders); // Could be 100,000+ records!
```

**Correct:**
```csharp
// Implement pagination
var orders = await _context.Orders
    .Skip((page - 1) * pageSize)
    .Take(pageSize)
    .ToListAsync();

return Ok(new PagedResult
{
    Data = orders,
    Page = page,
    PageSize = pageSize,
    TotalRecords = totalCount
});
```

---

## 8. Future Enhancements

### Phase 2 Enhancements

1. **Advanced Filtering**
   - Filter by specific products
   - Filter by customer segments (new, returning, VIP)
   - Filter by order source (web, mobile app, in-store)
   - Multi-select filters (multiple categories at once)

2. **More Report Types**
   - Profit margin reports (revenue vs cost)
   - Inventory turnover reports
   - Sales by region/location
   - Sales by sales representative
   - Refund and return analysis

3. **Export Formats**
   - PDF export with charts and branding
   - Excel export with multiple sheets
   - Scheduled email reports (daily, weekly, monthly)

4. **Comparative Analysis**
   - Year-over-year comparison
   - Month-over-month comparison
   - Compare multiple products side-by-side
   - Benchmark against targets/goals

5. **Predictive Analytics**
   - Sales forecasting using historical data
   - Trend prediction
   - Anomaly detection (unusual sales patterns)
   - Seasonality analysis

6. **Interactive Dashboards**
   - Drill-down capabilities (click chart to see details)
   - Customizable dashboard layouts
   - Save custom report configurations
   - Share reports with team members

7. **Real-time Updates**
   - WebSocket integration for live sales updates
   - Real-time dashboard refresh
   - Alert notifications for sales milestones

8. **Mobile Optimization**
   - Responsive charts for mobile devices
   - Mobile app with push notifications
   - Simplified mobile dashboard view

9. **Performance Optimization**
   - Implement report caching
   - Background job for large reports
   - Database indexing optimization
   - Materialized views for aggregated data

10. **Advanced Visualizations**
    - Heat maps for sales by time of day
    - Geographical maps for regional sales
    - Funnel charts for sales pipeline
    - Gantt charts for sales goals timeline

### Security Enhancements

1. **Role-Based Access Control**
   - Different report access levels for different roles
   - Row-level security (sales reps see only their sales)

2. **Audit Logging**
   - Track who viewed which reports
   - Log export activities
   - Track filter changes for compliance

3. **Data Anonymization**
   - Mask customer information for certain roles
   - Aggregate data for privacy compliance

### Integration Possibilities

1. **External Tools**
   - Integration with accounting software (QuickBooks)
   - Export to Google Sheets
   - Integration with BI tools (Power BI, Tableau)

2. **Notifications**
   - Email alerts for sales milestones
   - Slack/Teams notifications for daily summaries
   - SMS alerts for critical metrics

---

## Conclusion

This Sales Reports feature provides comprehensive insights into business performance through:
- **Real-time data aggregation** from completed orders
- **Visual dashboards** with charts and metrics
- **Flexible filtering** by date, category, customer
- **Export capabilities** for sharing and analysis

By following this implementation guide, you will build a professional reporting system that helps businesses make data-driven decisions and track their sales performance effectively.

Remember to start with the database design, then build the backend API, and finally create the frontend interface. Test each component thoroughly before moving to the next phase.

Good luck with your implementation!
