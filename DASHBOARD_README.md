# SkyShot Dashboard Frontend

A modern, responsive dashboard built with React for managing SkyShot photography platform.

## 🚀 Features

- **Modern UI/UX**: Clean, professional design with smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **RTL Support**: Full Arabic language support with RTL layout
- **Dark/Light Mode**: Theme switching capability
- **Real-time Data**: Live updates and notifications
- **Advanced Charts**: Interactive data visualization
- **File Management**: Media upload and management system

## 📁 Project Structure

```
frontend/src/
├── features/dashboard/
│   ├── pages/              # Dashboard pages
│   │   ├── Overview.jsx    # Main dashboard
│   │   ├── Pages.jsx       # Pages management
│   │   ├── Blog.jsx        # Blog management
│   │   ├── Media.jsx       # Media management
│   │   ├── Services.jsx    # Services management
│   │   ├── Admins.jsx      # Admin users
│   │   ├── Customers.jsx   # Customer management
│   │   ├── Orders.jsx      # Orders management
│   │   ├── Settings.jsx    # System settings
│   │   └── Notifications.jsx # Notifications
│   ├── routes/             # Dashboard routing
│   ├── services/           # API services
│   └── API_GUIDE.md        # Backend API documentation
├── shared/
│   ├── components/         # Reusable components
│   │   ├── DashboardLayout.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Topbar.jsx
│   │   ├── Table.jsx
│   │   ├── Chart.jsx
│   │   ├── Modal.jsx
│   │   ├── Notification.jsx
│   │   └── ...
│   ├── hooks/              # Custom hooks
│   ├── services/           # API services
│   ├── styles/             # Global styles
│   └── i18n/               # Internationalization
└── routes/                 # App routing
```

## 🛠️ Technologies Used

- **React 18** - Frontend framework
- **React Router** - Client-side routing
- **Framer Motion** - Animations and transitions
- **i18next** - Internationalization
- **Tailwind CSS** - Utility-first CSS framework
- **Tabler Icons** - Beautiful icon set
- **Chart.js** - Data visualization
- **Native Fetch API** - HTTP client (no external dependencies)

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` file with your configuration:

   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start development server**

   ```bash
   npm start
   ```

5. **Open browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### API Configuration

Update the API base URL in `.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Language Configuration

The app supports Arabic and English. Default language is Arabic with RTL support.

To change default language, edit `src/shared/i18n/index.js`:

```javascript
lng: 'ar', // Change to 'en' for English
```

## 📊 Dashboard Pages

### 1. Overview

- **Statistics Cards**: Revenue, orders, customers, projects
- **Charts**: Sales trends, user growth
- **Recent Activities**: Latest system activities
- **Quick Actions**: Common tasks

### 2. Content Management

- **Pages**: Website pages management
- **Blog**: Blog posts and articles
- **Media**: File upload and management
- **Services**: Service packages

### 3. User Management

- **Admins**: Admin users and permissions
- **Customers**: Customer accounts and data

### 4. Business Management

- **Orders**: Order tracking and management
- **Settings**: System configuration
- **Notifications**: System notifications

## 🔌 API Integration

### Using Dashboard APIs

```javascript
import { dashboardApi } from "../services/dashboardApi";

// Get dashboard statistics
const stats = await dashboardApi.getStats();

// Get sales data
const salesData = await dashboardApi.getSalesData("7d");

// Get recent activities
const activities = await dashboardApi.getRecentActivities(10);
```

### API Service Structure

```javascript
// Example API call using native fetch
export const dashboardApi = {
  getStats: async () => {
    const response = await apiService.get("/dashboard/stats");
    return response.data;
  },
};

// The apiService uses native fetch API internally
// No external HTTP client dependencies required
```

## 🎨 Styling

### Color Scheme

The app uses SkyShot brand colors defined in CSS variables:

```css
:root {
  --color-primaryColor: #212529;
  --color-secondaryColor: #343a40;
  --color-tertiaryColor: #032747;
  --color-darkBlueColor: #001d3d;
}
```

### Responsive Design

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌐 Internationalization

### Adding New Translations

1. Add translations to `src/shared/i18n/locales/`
2. Use the `useTranslation` hook:

```javascript
import { useTranslation } from "react-i18next";

const { t } = useTranslation("dashboard");
const title = t("navigation.overview");
```

### RTL Support

The app automatically switches to RTL layout for Arabic:

```javascript
import { useLanguage } from "../hooks/useLanguage";

const { isRTL } = useLanguage();
```

## 🔐 Authentication

### Token Management

```javascript
// Store token
localStorage.setItem("authToken", token);

// Token is automatically added to API requests
// via axios interceptor in apiService.js
```

### Protected Routes

```javascript
import ProtectedRoute from "../components/ProtectedRoute";

<Route
  path="/dashboard/*"
  element={
    <ProtectedRoute>
      <DashboardRoutes />
    </ProtectedRoute>
  }
/>;
```

## 📱 Mobile Responsiveness

- **Collapsible Sidebar**: Auto-collapse on mobile
- **Touch-friendly**: Optimized for touch interactions
- **Responsive Tables**: Horizontal scroll on mobile
- **Mobile Navigation**: Hamburger menu

## 🚀 Performance Optimization

- **Lazy Loading**: Route-based code splitting
- **Image Optimization**: Responsive images
- **Bundle Splitting**: Vendor and app bundles
- **Caching**: API response caching

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 📦 Building for Production

```bash
# Build for production
npm run build

# Serve production build locally
npm run serve
```

## 🔧 Troubleshooting

### Common Issues

1. **API Connection Issues**
   - Check `REACT_APP_API_URL` in `.env`
   - Verify backend server is running
   - Check CORS configuration

2. **Translation Issues**
   - Verify translation files exist
   - Check i18n configuration
   - Ensure proper namespace usage

3. **Styling Issues**
   - Check Tailwind CSS configuration
   - Verify CSS variables are defined
   - Check responsive breakpoints

## 📞 Support

For technical support or questions:

- Check the API documentation in `API_GUIDE.md`
- Review component documentation
- Check browser console for errors

## 🔄 Updates

To update the dashboard:

1. **Pull latest changes**
2. **Update dependencies**: `npm update`
3. **Run migrations** (if any)
4. **Test thoroughly**
5. **Deploy to production**
