import { handleApiError } from "@utils/errorHandlers";
import store from "@store";
import { updateToken, logout } from "@store/authSlice";
import { apiService } from "@utils/apiService";

export function headersToObject(headers) {
  const obj = {};
  try {
    headers?.forEach?.((v, k) => (obj[k.toLowerCase()] = v));
  } catch {
    /* ignore */
  }
  return obj;
}

class TokenManager {
  constructor() {
    this.refreshPromise = null;
    this.refreshTimer = null;
    this.isRefreshing = false;
    this.isLoggedOut = false; // تتبع حالة تسجيل الخروج
    this.userDataCache = null; // كاش بيانات المستخدم
    this.cacheExpiry = null; // انتهاء صلاحية الكاش
    this.CACHE_DURATION = 13 * 60 * 1000; // 13 دقائق كاش
    this.lang = "en";
  }

  setLang(lang) {
    this.lang = lang || "en";
  }

  // جلب التوكن من Redux store
  getAccessToken() {
    return store.getState().auth.accessToken;
  }

  // إدارة كاش بيانات المستخدم
  setCachedUserData(userData) {
    this.userDataCache = userData;
    this.cacheExpiry = Date.now() + this.CACHE_DURATION;
    console.log("User data cached for 5 minutes");
  }

  getCachedUserData() {
    if (
      this.userDataCache &&
      this.cacheExpiry &&
      Date.now() < this.cacheExpiry
    ) {
      console.log("Using cached user data");
      return this.userDataCache;
    }
    return null;
  }

  clearCache() {
    this.userDataCache = null;
    this.cacheExpiry = null;
    console.log("User data cache cleared");
  }

  // تحديث التوكن في Redux
  setAccessToken(token) {
    if (this.isLoggedOut) {
      console.log("User is logged out, ignoring token update");
      return;
    }

    this.isLoggedOut = false; // المستخدم مسجل دخول
    store.dispatch(updateToken(token));
    this.scheduleTokenRefresh(token);
  }

  // جدولة تحديث التوكن قبل انتهاء صلاحيته
  scheduleTokenRefresh(token) {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }

    if (!token || this.isLoggedOut) {
      console.log("Token refresh cancelled - user logged out or no token");
      return;
    }

    try {
      // فك تشفير JWT للحصول على وقت انتهاء الصلاحية
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = payload.exp * 1000; // تحويل إلى milliseconds
      const currentTime = Date.now();
      const timeUntilExpiry = expirationTime - currentTime;

      // تحديث التوكن قبل انتهاء الصلاحية بـ 2 دقيقة
      const refreshTime = Math.max(timeUntilExpiry - 2 * 60 * 1000, 30000);

      this.refreshTimer = setTimeout(() => {
        this.refreshAccessToken();
      }, refreshTime);

      console.log(`Token will refresh in ${refreshTime / 1000} seconds`);
    } catch (error) {
      console.error("Error parsing token:", error);
      // في حالة خطأ، حاول التحديث بعد 5 دقائق
      this.refreshTimer = setTimeout(
        () => {
          this.refreshAccessToken();
        },
        5 * 60 * 1000,
      );
    }
  }

  // تحديث التوكن
  async refreshAccessToken() {
    if (this.isLoggedOut) {
      throw handleApiError(
        {
          status: 401,
        },
        {
          status: "fail",
          message: "Session expired",
          errorCode: "tokenExpired",
        },
        this.lang,
      );
    }

    if (this.isRefreshing) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;
    this.refreshPromise = this.performTokenRefresh();

    try {
      const newToken = await this.refreshPromise;
      return newToken;
      // eslint-disable-next-line no-useless-catch
    } catch (error) {
      throw error;
    } finally {
      this.isRefreshing = false;
      this.refreshPromise = null;
    }
  }

  async performTokenRefresh() {
    if (this.isLoggedOut) {
      // هنرمي Error مُطبّع بردو عشان الـ UI يعرف يتعامل
      throw handleApiError(
        {
          status: 401,
        },
        {
          status: "fail",
          message: "Session expired",
          errorCode: "tokenExpired",
        },
        this.lang,
      );
    }

    // eslint-disable-next-line no-useless-catch
    try {
      const res = await apiService.get("/auth/refresh-token", this.lang);

      if (this.isLoggedOut) {
        throw handleApiError(
          {
            status: 401,
          },
          {
            status: "fail",
            message: "Session expired",
            errorCode: "tokenExpired",
          },
          this.lang,
        );
      }

      // حدّث التوكن واعمِل جدولة للتحديث
      store.dispatch(updateToken(res.token));
      this.scheduleTokenRefresh(res.token);

      return res.token;
    } catch (err) {
      throw err;
    }
  }

  // مسح جميع التوكنز
  clearTokens() {
    // نفس منطقك بالضبط
    this.isLoggedOut = true;
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
    this.clearCache();
    this.isRefreshing = false;
    this.refreshPromise = null;
    store.dispatch(logout());
  }

  // إعادة تعيين حالة تسجيل الدخول
  resetLogoutState() {
    this.isLoggedOut = false;
    console.log("Logout state reset - user can login again");
  }

  // تهيئة التوكن عند بدء التطبيق
  async initializeToken() {
    try {
      const token = await this.refreshAccessToken();
      return token;
    } catch (error) {
      console.error("No valid refresh token found:", error);
      throw error;
    }
  }
}

export const tokenManager = new TokenManager();
