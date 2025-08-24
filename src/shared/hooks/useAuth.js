import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  loginStart,
  loginSuccess,
  stopLoading,
  logout as logoutSlice,
  startLoading,
} from "@store/authSlice";
import { apiService } from "@utils/apiService";
import { tokenManager } from "@features/auth/utils/tokenManager";
import { cacheUtils } from "@utils/queryClient";
import { handleApiError } from "@utils/errorHandlers";

export const useAuth = () => {
  const dispatch = useDispatch();

  const { currentUser, accessToken } = useSelector((state) => state.auth);

  const { i18n } = useTranslation();
  const lang = i18n.language;

  const initializeAuth = async () => {
    try {
      tokenManager.setLang(lang);

      // 1) فك حظر الخروج (لو كان فيه logout قبل كده)
      tokenManager.resetLogoutState();

      // 2) جرب تجيب Access Token (هترمي error normalized لو مفيش refresh صالح)
      const newToken = await tokenManager.initializeToken();
      if (!newToken) {
        dispatch(stopLoading());
        return null;
      }

      // 3) هات بيانات المستخدم من الكاش أو من السيرفر
      let userData = tokenManager.getCachedUserData();

      if (!userData) {
        console.log("Fetching user data from server during initialization");

        // ملاحظة: apiService.get لازم ترجع JSON أو ترمي normalized error
        const me = await apiService.get("/auth/me", lang);

        // دعم شكلين للـ payload عشان تبقى resilient
        userData = me?.data || me?.user || me || null;
        if (!userData) {
          throw handleApiError(
            {
              status: 500,
            },
            me,
            lang,
          );
        }

        // احفظ في الكاش + React Query
        tokenManager.setCachedUserData(userData);
        cacheUtils.updateUserData(userData);
      } else {
        console.log("Using cached user data during initialization");
      }

      // 4) حدّث حالة الأوث في الريدكس
      dispatch(
        loginSuccess({
          user: userData,
          accessToken: newToken,
        }),
      );

      return { user: userData, accessToken: newToken };
    } catch (err) {
      tokenManager.clearTokens();

      dispatch(stopLoading());
      throw err;
    }
  };

  const login = async ({ email, password }) => {
    dispatch(loginStart());

    try {
      // إعادة تعيين حالة تسجيل الخروج
      tokenManager.resetLogoutState();

      const response = await apiService.post(
        "/auth/login",
        {
          email,
          password,
        },
        lang,
      );

      // تخزين التوكن وجدولة التحديث
      tokenManager.setAccessToken(response.token);

      // تخزين بيانات المستخدم في الكاش المحلي والـ React Query
      tokenManager.setCachedUserData(response.data);
      cacheUtils.updateUserData(response.data);

      return response;
    } catch (error) {
      dispatch(stopLoading());
      console.error("Login error:", error);
      throw error;
    }
  };

  const signup = async ({
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
  }) => {
    dispatch(loginStart());

    try {
      // إعادة تعيين حالة تسجيل الخروج
      tokenManager.resetLogoutState();

      const response = await apiService.post(
        "/auth/signup",
        {
          firstName,
          lastName,
          email,
          password,
          passwordConfirm,
        },
        lang,
      );

      // تخزين التوكن وجدولة التحديث
      tokenManager.setAccessToken(response.token);

      // تخزين بيانات المستخدم في الكاش المحلي والـ React Query
      tokenManager.setCachedUserData(response.data);
      cacheUtils.updateUserData(response.data);

      return response;
    } catch (error) {
      dispatch(stopLoading());
      throw error;
    }
  };

  const logout = async () => {
    dispatch(startLoading());
    try {
      await apiService.delete("/auth/logout", lang);

      // مسح كاش React Query
      tokenManager.clearTokens();
      tokenManager.clearCache(); // مسح الكاش المخزن مؤقتاً
      cacheUtils.clearUserData();
      cacheUtils.clear(); // مسح جميع الكاش

      dispatch(logoutSlice());
    } catch (error) {
      dispatch(stopLoading());
      throw error;
    }
  };

  return {
    login,
    signup,
    logout,
    initializeAuth,
    currentUser,
    accessToken,
  };
};
