import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@layouts/MainLayout";
import {
  Home,
  Consultation,
  About,
  Contact,
  PrivacyPolicy,
} from "@features/landing/pages";
import { PageNotFound } from "@features/404";
import Services from "@features/services/pages/Services";
import Gallery from "@features/gallery/pages/Gallery";
import Blog from "@features/blog/pages/Blog";

// Auth imports
import {
  ForgotPassword,
  ResetPassword,
  VerifyEmail,
  ChangePassword,
} from "@features/auth";
import ProtectedRoute from "@features/dashboard/components/ProtectedRoute";
import AuthLayout from "@features/auth/layouts/AuthLayout";
import AuthInterface from "@features/auth/pages/AuthInterface";
import AuthGuard from "@features/auth/components/AuthGuard";
import AuthSuccess from "@features/auth/pages/AuthSuccess";
import DashboardRoutes from "@features/dashboard/routes/DashboardRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "gallery", element: <Gallery /> },
      { path: "blog", element: <Blog /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "consultation", element: <Consultation /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
    ],
  },
  {
    path: "/auth",
    element: (
      <AuthGuard>
        <AuthLayout />
      </AuthGuard>
    ),
    children: [
      { index: true, element: <AuthInterface /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "verify-email", element: <VerifyEmail /> },
      { path: "change-password", element: <ChangePassword /> },
      { path: "success", element: <AuthSuccess /> },
    ],
  },
  {
    path: "/dashboard/*",
    element: (
      <ProtectedRoute>
        <DashboardRoutes />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
