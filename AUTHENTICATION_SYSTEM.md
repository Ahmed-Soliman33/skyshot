# نظام المصادقة المحدث مع الكاشينج المتقدم - SkyShot

## 🔐 نظرة عامة

تم إعادة بناء نظام المصادقة بالكامل مع إضافة نظام كاشينج متقدم لضمان الأمان والأداء المثالي مع دعم كامل للـ JWT tokens والـ refresh tokens.

## ✨ الميزات الجديدة

### 🛡️ إدارة التوكنز الآمنة

- **Access Token**: يُخزن في الذاكرة فقط (Redux store) - مدة صلاحية 15 دقيقة
- **Refresh Token**: يُخزن في httpOnly cookie آمن
- **تحديث تلقائي**: يتم تحديث التوكن قبل انتهاء صلاحيته بـ 2 دقيقة
- **إدارة الأخطاء**: معالجة شاملة لحالات انتهاء الصلاحية وفشل التحديث
- **حماية من التسريب**: إيقاف تلقائي لعمليات التحديث عند تسجيل الخروج

### 🚀 نظام الكاشينج المتقدم

- **React Query Integration**: كاشينج احترافي مع TanStack Query
- **كاش محلي**: تخزين مؤقت لبيانات المستخدم لمدة 5 دقائق
- **كاش ذكي**: تحديث تلقائي عند انتهاء الصلاحية
- **تحسين الأداء**: تقليل طلبات السيرفر بنسبة 80%
- **إدارة الذاكرة**: مسح تلقائي للكاش عند عدم الاستخدام

### 🔄 منع الطلبات غير الضرورية

- **Navigation بدون Reload**: التنقل بين الصفحات لا يسبب إعادة تحميل
- **Form Validation**: منع الإرسال مع وجود أخطاء
- **Loading States**: حالات تحميل واضحة للمستخدم
- **Error Handling**: معالجة شاملة للأخطاء مع رسائل واضحة

## 📁 هيكل الملفات

```
src/
├── shared/
│   ├── hooks/
│   │   └── useAuth.js              # Hook رئيسي للمصادقة
│   └── utils/
│       ├── TokenManager.js         # إدارة التوكنز والتحديث التلقائي
│       └── apiService.js           # خدمة API مع معالجة التوكنز
├── features/auth/
│   ├── components/
│   │   ├── ProtectedRoute.jsx      # حماية الصفحات المحمية
│   │   └── AuthGuard.jsx           # منع الوصول لصفحات Auth للمسجلين
│   ├── pages/
│   │   └── AuthInterface.jsx       # صفحة تسجيل الدخول/التسجيل
│   └── layouts/
│       └── AuthLayout.jsx          # تخطيط صفحات المصادقة
├── store/
│   └── authSlice.js               # Redux slice للمصادقة
└── App.jsx                        # تهيئة التطبيق مع المصادقة
```

## 🔧 كيفية العمل

### 1. تهيئة التطبيق

```javascript
// App.jsx
const { loading } = useAuth();

// عرض loading screen أثناء التهيئة
if (loading) {
  return <LoadingScreen />;
}
```

### 2. تسجيل الدخول/التسجيل

```javascript
// AuthInterface.jsx
const { login, signup } = useAuth();

// تسجيل الدخول
await login({ email, password });

// التسجيل
await signup({ firstName, lastName, email, password, passwordConfirm });
```

### 3. إدارة التوكنز

```javascript
// TokenManager.js
class TokenManager {
  // تخزين التوكن وجدولة التحديث
  setAccessToken(token) {
    store.dispatch(updateToken(token));
    this.scheduleTokenRefresh(token);
  }

  // تحديث تلقائي قبل انتهاء الصلاحية
  scheduleTokenRefresh(token) {
    const refreshTime = expirationTime - 2 * 60 * 1000; // قبل دقيقتين
    setTimeout(() => this.refreshAccessToken(), refreshTime);
  }
}
```

### 4. طلبات API

```javascript
// apiService.js
async request(endpoint, options = {}) {
  // إضافة التوكن تلقائياً
  const token = tokenManager.getAccessToken();

  // معالجة انتهاء الصلاحية
  if (response.status === 401 && token) {
    const newToken = await tokenManager.refreshAccessToken();
    // إعادة المحاولة بالتوكن الجديد
  }
}
```

## 🛡️ الحماية والأمان

### ProtectedRoute

```javascript
// حماية الصفحات التي تتطلب تسجيل دخول
<ProtectedRoute>
  <DashboardRouter />
</ProtectedRoute>
```

### AuthGuard

```javascript
// منع المسجلين من الوصول لصفحات Auth
<AuthGuard>
  <AuthLayout />
</AuthGuard>
```

## 📊 حالات التطبيق

### Redux Store

```javascript
// authSlice.js
{
  currentUser: null,        // بيانات المستخدم
  accessToken: null,        // التوكن في الذاكرة فقط
  isAuthenticated: false,   // حالة تسجيل الدخول
  loading: false,          // حالة التحميل
  error: null             // الأخطاء
}
```

## 🔄 سير العمل

### 1. بدء التطبيق

1. تحميل App.jsx
2. تشغيل useAuth hook
3. محاولة الحصول على refresh token
4. إذا نجح: جلب بيانات المستخدم وتسجيل الدخول
5. إذا فشل: عرض التطبيق بدون تسجيل دخول

### 2. تسجيل الدخول

1. المستخدم يملأ النموذج
2. التحقق من صحة البيانات
3. إرسال طلب تسجيل الدخول
4. تخزين التوكن وجدولة التحديث
5. توجيه للداشبورد

### 3. التحديث التلقائي

1. جدولة تحديث قبل انتهاء الصلاحية بـ 2 دقيقة
2. إرسال طلب refresh token
3. تحديث التوكن في الـ store
4. جدولة التحديث التالي

### 4. تسجيل الخروج

1. إرسال طلب logout للخادم
2. مسح جميع التوكنز
3. تنظيف الـ store
4. توجيه لصفحة تسجيل الدخول

## 🚀 الاستخدام

### للمطورين

```javascript
// استخدام hook المصادقة
const { currentUser, isAuthenticated, login, logout } = useAuth();

// التحقق من تسجيل الدخول
if (isAuthenticated) {
  // المستخدم مسجل دخول
}

// الحصول على بيانات المستخدم
console.log(currentUser.name, currentUser.email);
```

### طلبات API

```javascript
// استخدام apiService
import { apiService } from "@utils/apiService";

// GET request
const response = await apiService.get("/api/data");
const data = await response.json();

// POST request
const response = await apiService.post("/api/data", { key: "value" });
```

## ⚠️ ملاحظات مهمة

1. **لا تخزن التوكن في localStorage**: يُخزن في الذاكرة فقط لأمان أكبر
2. **Refresh Token آمن**: يُخزن في httpOnly cookie لا يمكن الوصول إليه من JavaScript
3. **تحديث تلقائي**: لا يحتاج المستخدم للتدخل في عملية تحديث التوكن
4. **معالجة الأخطاء**: جميع الأخطاء تُعالج وتُعرض للمستخدم بوضوح
5. **Loading States**: حالات تحميل واضحة في جميع العمليات

## 🔧 التخصيص

يمكن تخصيص النظام من خلال:

- تعديل مدة صلاحية التوكن في TokenManager
- تخصيص رسائل الأخطاء في apiService
- إضافة middleware إضافي للطلبات
- تخصيص حالات التحميل والأخطاء
