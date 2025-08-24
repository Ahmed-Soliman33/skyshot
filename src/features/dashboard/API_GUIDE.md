# SkyShot Dashboard API Guide

This guide explains how to implement the backend APIs for the SkyShot dashboard using Node.js, Express, and MongoDB.

## 📋 Required API Endpoints

### 1. Dashboard Overview APIs

#### GET `/api/dashboard/stats`

Returns overall dashboard statistics.

**Response:**

```json
{
  "success": true,
  "data": {
    "totalRevenue": 89324,
    "totalOrders": 3451,
    "totalCustomers": 12543,
    "totalProjects": 156,
    "revenueGrowth": 12.5,
    "ordersGrowth": 8.3,
    "customersGrowth": 15.2,
    "projectsGrowth": 5.7
  }
}
```

#### GET `/api/dashboard/sales?period=7d`

Returns sales data for charts.

**Query Parameters:**

- `period`: 7d, 30d, 90d, 1y

**Response:**

```json
{
  "success": true,
  "data": [
    { "name": "يناير", "sales": 45000, "orders": 120 },
    { "name": "فبراير", "sales": 52000, "orders": 135 }
    // ... more data points
  ]
}
```

#### GET `/api/dashboard/users/growth?period=7d`

Returns user growth data.

**Response:**

```json
{
  "success": true,
  "data": [
    { "date": "2024-01-01", "users": 100, "newUsers": 10 },
    { "date": "2024-01-02", "users": 110, "newUsers": 15 }
    // ... more data points
  ]
}
```

#### GET `/api/dashboard/activities?limit=10`

Returns recent activities.

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "type": "order",
      "message": "طلب جديد من أحمد محمد",
      "timestamp": "2024-01-20T10:30:00Z",
      "user": "أحمد محمد"
    }
    // ... more activities
  ]
}
```

### 2. Pages Management APIs

#### GET `/api/pages`

Get all pages with pagination and filtering.

**Query Parameters:**

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `search`: Search term
- `status`: published, draft

#### POST `/api/pages`

Create a new page.

**Request Body:**

```json
{
  "title": "الصفحة الرئيسية",
  "slug": "home",
  "content": "محتوى الصفحة",
  "status": "published",
  "metaTitle": "عنوان الميتا",
  "metaDescription": "وصف الميتا"
}
```

#### PUT `/api/pages/:id`

Update an existing page.

#### DELETE `/api/pages/:id`

Delete a page.

### 3. Blog Management APIs

#### GET `/api/blog/posts`

Get all blog posts.

#### POST `/api/blog/posts`

Create a new blog post.

**Request Body:**

```json
{
  "title": "عنوان المقال",
  "slug": "article-slug",
  "content": "محتوى المقال",
  "excerpt": "مقتطف من المقال",
  "status": "published",
  "category": "تطوير",
  "tags": ["React", "JavaScript"],
  "featured": false,
  "featuredImage": "image-url"
}
```

### 4. Media Management APIs

#### GET `/api/media`

Get all media files.

#### POST `/api/media/upload`

Upload media files.

**Request:** Multipart form data with file(s)

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "media-id",
    "filename": "image.jpg",
    "originalName": "original-name.jpg",
    "mimetype": "image/jpeg",
    "size": 1024000,
    "url": "https://example.com/uploads/image.jpg"
  }
}
```

### 5. Users Management APIs

#### GET `/api/users/admins`

Get all admin users.

#### GET `/api/users/customers`

Get all customers.

#### POST `/api/users`

Create a new user.

**Request Body:**

```json
{
  "name": "اسم المستخدم",
  "email": "user@example.com",
  "password": "password123",
  "role": "admin", // admin, customer, moderator
  "phone": "+966501234567",
  "status": "active"
}
```

### 6. Orders Management APIs

#### GET `/api/orders`

Get all orders.

#### GET `/api/orders/:id`

Get single order details.

#### PATCH `/api/orders/:id/status`

Update order status.

**Request Body:**

```json
{
  "status": "completed" // pending, processing, completed, cancelled
}
```

#### GET `/api/orders/stats?period=30d`

Get orders statistics.

### 7. Services Management APIs

#### GET `/api/services`

Get all services.

#### POST `/api/services`

Create a new service.

**Request Body:**

```json
{
  "name": "اسم الخدمة",
  "description": "وصف الخدمة",
  "category": "تصوير",
  "price": 1500,
  "duration": "4 ساعات",
  "features": ["ميزة 1", "ميزة 2"],
  "status": "active"
}
```

## 🗄️ MongoDB Schema Examples

### User Schema

```javascript
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "customer", "moderator"],
    default: "customer",
  },
  phone: String,
  avatar: String,
  status: {
    type: String,
    enum: ["active", "inactive", "suspended"],
    default: "active",
  },
  lastLogin: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
```

### Order Schema

```javascript
const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "processing", "completed", "cancelled"],
    default: "pending",
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed", "refunded"],
    default: "pending",
  },
  items: [
    {
      service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
      quantity: Number,
      price: Number,
    },
  ],
  createdAt: { type: Date, default: Date.now },
  completedAt: Date,
});
```

### Service Schema

```javascript
const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  price: { type: Number, required: true },
  duration: String,
  features: [String],
  image: String,
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  totalBookings: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});
```

## 🚀 Implementation Steps

1. **Setup Express Server**

   ```bash
   npm init -y
   npm install express mongoose cors helmet morgan dotenv bcryptjs jsonwebtoken multer
   npm install -D nodemon
   ```

2. **Create Basic Server Structure**

   ```
   backend/
   ├── models/
   ├── routes/
   ├── controllers/
   ├── middleware/
   ├── utils/
   └── server.js
   ```

3. **Implement Authentication Middleware**
4. **Create Database Models**
5. **Implement API Routes**
6. **Add Error Handling**
7. **Setup File Upload (for media)**

## 🔐 Authentication

Use JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <token>
```

## 📝 Error Handling

All APIs should return consistent error responses:

```json
{
  "success": false,
  "error": {
    "message": "Error message",
    "code": "ERROR_CODE"
  }
}
```

## 🔄 Pagination

For list endpoints, use pagination:

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```
