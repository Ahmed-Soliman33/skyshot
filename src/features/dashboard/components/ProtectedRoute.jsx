import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { useAuth } from "@hooks/useAuth";
import { setUserData } from "@store/authSlice";
import { notify } from "@components/ui/notify";
import { getAvatarUrl } from "../utils/getAvatarUrl";

// ProtectedRoute component to guard routes that require authentication
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { initializeAuth } = useAuth();

  const { data, isError, error } = useQuery({
    queryKey: ["auth"],
    queryFn: initializeAuth,
    retry: false,
    refetchInterval: 13 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 0,
  });

  useEffect(() => {
    if (data) {
      const { user, accessToken } = data;
      const avatar = getAvatarUrl(user.avatar);

      dispatch(setUserData({ user: { ...user, avatar }, accessToken }));
    }

    if (isError) {
      notify.error(
        "Authentication failed, please login again.",
        error.errorCode,
      );
      navigate("/auth", { replace: true });
    }
  }, [data, dispatch, isError, error, navigate]);

  return children;
};

export default ProtectedRoute;
