import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// AuthGuard component to redirect authenticated users away from auth pages
const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  // إذا كان المستخدم مسجل دخول، وجهه للداشبورد
  if (isAuthenticated) {
    const from = location.state?.from?.pathname || "/dashboard";
    return <Navigate to={from} replace />;
  }

  // إذا لم يكن مسجل دخول، اعرض صفحة الـ auth
  return children;
};

export default AuthGuard;
