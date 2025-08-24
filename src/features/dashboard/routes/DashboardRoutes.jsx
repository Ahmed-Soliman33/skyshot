import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

// Import all dashboard pages
import Overview from "../pages/Overview";
import Pages from "../pages/Pages";
import Blog from "../pages/Blog";
import Media from "../pages/Media";
import Admins from "../pages/Admins";
import Customers from "../pages/Customers";
import Orders from "../pages/Orders";
import Settings from "../pages/Settings";
import Notifications from "../pages/Notifications";
import Profile from "../pages/Profile";

// Lazy load components for better performance
const Services = lazy(() => import("../pages/Services"));
const Testimonials = lazy(() => import("../pages/Testimonials"));
const FAQs = lazy(() => import("../pages/FAQs"));

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        {/* Default redirect to overview */}
        <Route index element={<Navigate to="overview" replace />} />

        {/* Main Dashboard */}
        <Route path="overview" element={<Overview />} />

        {/* Content Management */}
        <Route path="pages" element={<Pages />} />
        <Route path="blog" element={<Blog />} />
        <Route path="media" element={<Media />} />
        <Route
          path="services"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Services />
            </Suspense>
          }
        />
        <Route
          path="testimonials"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Testimonials />
            </Suspense>
          }
        />
        <Route
          path="faqs"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <FAQs />
            </Suspense>
          }
        />

        {/* User Management */}
        <Route path="admins" element={<Admins />} />
        <Route path="customers" element={<Customers />} />

        {/* Orders */}
        <Route path="orders" element={<Orders />} />

        {/* Settings */}
        <Route path="settings" element={<Settings />} />
        {/* Profile */}
        <Route path="profile" element={<Profile />} />

        {/* Notifications */}
        <Route path="notifications" element={<Notifications />} />

        {/* Catch all - redirect to overview */}
        <Route path="*" element={<Navigate to="overview" replace />} />
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
