import { QueryClient } from '@tanstack/react-query';

// إعداد Query Client مع كاشينج متقدم
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // الكاش يبقى لمدة 5 دقائق
      staleTime: 5 * 60 * 1000, // 5 minutes
      // البيانات تبقى في الذاكرة لمدة 10 دقائق
      gcTime: 10 * 60 * 1000, // 10 minutes (كان cacheTime في الإصدارات القديمة)
      // إعادة المحاولة عند الفشل
      retry: (failureCount, error) => {
        // لا تعيد المحاولة للأخطاء 401, 403, 404
        if (error?.status === 401 || error?.status === 403 || error?.status === 404) {
          return false;
        }
        // أعد المحاولة حتى 3 مرات للأخطاء الأخرى
        return failureCount < 3;
      },
      // إعادة جلب البيانات عند التركيز على النافذة
      refetchOnWindowFocus: false,
      // إعادة جلب البيانات عند إعادة الاتصال
      refetchOnReconnect: true,
    },
    mutations: {
      // إعادة المحاولة للطفرات
      retry: 1,
    },
  },
});

// دوال مساعدة للكاشينج
export const cacheKeys = {
  // مفاتيح الكاش للمستخدم
  user: ['user'],
  userProfile: (userId) => ['user', 'profile', userId],
  
  // مفاتيح الكاش للبيانات العامة
  dashboard: ['dashboard'],
  settings: ['settings'],
  
  // دالة لإنشاء مفتاح كاش مخصص
  custom: (key) => Array.isArray(key) ? key : [key],
};

// دوال إدارة الكاش
export const cacheUtils = {
  // مسح كاش معين
  invalidate: (key) => {
    queryClient.invalidateQueries({ queryKey: key });
  },
  
  // مسح جميع الكاش
  clear: () => {
    queryClient.clear();
  },
  
  // تحديث بيانات في الكاش
  setData: (key, data) => {
    queryClient.setQueryData(key, data);
  },
  
  // جلب بيانات من الكاش
  getData: (key) => {
    return queryClient.getQueryData(key);
  },
  
  // إزالة استعلام معين من الكاش
  remove: (key) => {
    queryClient.removeQueries({ queryKey: key });
  },
  
  // تحديث بيانات المستخدم في الكاش
  updateUserData: (userData) => {
    queryClient.setQueryData(cacheKeys.user, userData);
    console.log('User data updated in cache');
  },
  
  // مسح بيانات المستخدم من الكاش
  clearUserData: () => {
    queryClient.removeQueries({ queryKey: cacheKeys.user });
    queryClient.removeQueries({ queryKey: ['user'] });
    console.log('User data cleared from cache');
  },
};
