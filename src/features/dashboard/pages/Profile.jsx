import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  IconUser,
  IconMail,
  IconPhone,
  IconMapPin,
  IconCalendar,
  IconShield,
  IconBell,
  IconEye,
  IconCamera,
  IconSettings,
  IconRefresh,
  IconCheck,
  IconAlertCircle,
} from "@tabler/icons-react";
import { useAuth } from "@hooks/useAuth";
import { notify } from "@components/ui/notify";
import { tokenManager } from "@features/auth/utils/tokenManager";
import { profileApi } from "../utils/dashboardApi";
import { useMutation, useMutationState } from "@tanstack/react-query";
import { cacheUtils, queryClient } from "@utils/queryClient";
import { getAvatarUrl } from "../utils/getAvatarUrl";
import { useDispatch } from "react-redux";
import { setUserData as setUserDataSlice } from "@store/authSlice";

const Profile = () => {
  const { i18n } = useTranslation();
  const { currentUser, initializeAuth } = useAuth();
  const dispatch = useDispatch();

  const {
    mutate: saveUpdateData,
    isPending,
    variables,
  } = useMutation({
    mutationFn: profileApi.updateProfile,
    mutationKey: ["updateProfile"],

    // Optimistic update via UI
    onMutate: async (newData) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["auth"] });

      // Snapshot previous value
      const previousData = queryClient.getQueryData(["auth"]);

      // Optimistically update the cache
      queryClient.setQueryData(["auth"], (old) => ({
        ...old,
        ...newData,
      }));

      // Update Redux store optimistically
      dispatch(setUserDataSlice({ ...currentUser, ...newData }));

      // Return context for rollback
      return { previousData };
    },

    onSuccess: async (data) => {
      // Replace optimistic data with server response
      queryClient.setQueryData(["auth"], (old) => ({
        ...old,
        ...data,
      }));

      dispatch(setUserDataSlice({ ...currentUser, ...data }));

      notify.success(
        lang === "ar" ? "تم حفظ التغييرات بنجاح" : "Changes saved successfully",
      );
    },

    onError: (error, variables, context) => {
      // Rollback optimistic update
      if (context?.previousData) {
        queryClient.setQueryData(["auth"], context.previousData);
        dispatch(setUserDataSlice(context.previousData));
      }

      notify.error(
        lang === "ar" ? "حدث خطأ أثناء حفظ التغييرات" : "Error saving changes",
        error.message,
      );
    },

    onSettled: () => {
      // Always refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const { mutate: uploadAvatar, isPending: uploadIsPending } = useMutation({
    mutationFn: profileApi.uploadAvatar,
    mutationKey: ["uploadAvatar"],

    onMutate: async (file) => {
      // Cancel queries
      await queryClient.cancelQueries({ queryKey: ["auth"] });

      // Create preview URL for optimistic update
      const previewUrl = URL.createObjectURL(file);

      // Snapshot previous data
      const previousData = queryClient.getQueryData(["auth"]);

      // Optimistically update avatar
      const optimisticAvatar = `/uploads/avatars/temp-${Date.now()}.png`;

      queryClient.setQueryData(["auth"], (old) => ({
        ...old,
        avatar: optimisticAvatar,
      }));

      // Update local preview
      setAvatarPreview(previewUrl);

      return { previousData, previewUrl };
    },

    onSuccess: (data) => {
      // Replace with actual server response
      queryClient.setQueryData(["auth"], (old) => ({
        ...old,
        avatar: data.avatar,
      }));

      dispatch(setUserDataSlice({ ...currentUser, avatar: data.avatar }));

      // Clear preview
      setAvatarPreview(null);
      setSelectedFile(null);

      notify.success(
        lang === "ar" ? "تم رفع الصورة بنجاح" : "Avatar uploaded successfully",
      );
    },

    onError: (error, variables, context) => {
      // Rollback optimistic update
      if (context?.previousData) {
        queryClient.setQueryData(["auth"], context.previousData);
      }

      // Clean up preview URL
      if (context?.previewUrl) {
        URL.revokeObjectURL(context.previewUrl);
      }

      setAvatarPreview(null);

      notify.error(
        lang === "ar" ? "حدث خطأ أثناء رفع الصورة" : "Error uploading avatar",
        error.message,
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const lang = i18n.language;
  const [activeTab, setActiveTab] = useState("general");
  const fileInputRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // User data - Updated to match API response structure
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    birthDate: "",
    address: "",
    bio: "",
    avatar: "",
    profileVisibility: "public",
  });

  // Initialize userData when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setUserData({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        country: currentUser.country || "",
        birthDate: currentUser.birthDate
          ? currentUser.birthDate.split("T")[0]
          : "",
        address: currentUser.address || "",
        bio: currentUser.bio || "",
        avatar: currentUser.avatar,
        profileVisibility: currentUser.profileVisibility || "public",
      });
    }
  }, [currentUser]);

  // Get pending mutation state for UI feedback
  const pendingProfileUpdate = useMutationState({
    filters: { mutationKey: ["updateProfile"], status: "pending" },
    select: (mutation) => mutation.state.variables,
  });

  const pendingAvatarUpload = useMutationState({
    filters: { mutationKey: ["uploadAvatar"], status: "pending" },
    select: (mutation) => mutation.state.variables,
  });

  const displayUserData = {
    ...userData,
    // Show pending changes if any
    ...(pendingProfileUpdate?.[0] || {}),
  };

  // Security settings - Updated to match API response
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    emailNotifications: true,
    smsNotifications: false,
    loginAlerts: true,
  });

  // Privacy settings - Updated to match API response
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    showLocation: true,
    dataProcessing: true,
    marketing: false,
    analytics: true,
  });

  // Initialize security and privacy settings from currentUser
  useEffect(() => {
    if (currentUser) {
      setSecuritySettings((prev) => ({
        ...prev,
        twoFactorAuth: currentUser.twoFactorEnabled || false,
      }));

      setPrivacySettings((prev) => ({
        ...prev,
        profileVisibility: currentUser.profileVisibility || "public",
      }));
    }
  }, [currentUser]);

  const tabs = [
    {
      id: "general",
      label: lang === "ar" ? "الملف الشخصي" : "Profile",
      icon: IconUser,
    },
    {
      id: "security",
      label: lang === "ar" ? "الأمان" : "Security",
      icon: IconShield,
    },
    {
      id: "notifications",
      label: lang === "ar" ? "الإشعارات" : "Notifications",
      icon: IconBell,
    },
    {
      id: "privacy",
      label: lang === "ar" ? "الخصوصية" : "Privacy",
      icon: IconEye,
    },
  ];

  const handleSave = async () => {
    // Handle avatar upload first
    if (selectedFile) {
      uploadAvatar(selectedFile);
    }

    // Prepare profile data
    let dataToSend = {};

    if (activeTab === "general") {
      dataToSend = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        birthDate: userData.birthDate,
        address: userData.address,
        bio: userData.bio,
        profileVisibility: userData.profileVisibility,
      };
    } else if (activeTab === "privacy") {
      dataToSend = {
        profileVisibility: privacySettings.profileVisibility,
      };
    }

    // Only send if there's data to update
    if (Object.keys(dataToSend).length > 0) {
      saveUpdateData(dataToSend);
    }
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      notify.error(
        lang === "ar"
          ? "نوع الملف غير مدعوم. مسموح فقط بـ JPEG, PNG, WebP"
          : "Unsupported file type. Only JPEG, PNG, and WebP are allowed",
      );
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      notify.error(
        lang === "ar"
          ? "حجم الملف كبير. الحد الأقصى 5 ميجابايت"
          : "File size is too large. Maximum size is 5 MB",
      );
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarPreview(e.target.result);
    };
    reader.readAsDataURL(file);
    setSelectedFile(file);
  };

  const isUpdating = isPending || uploadIsPending;
  const showOptimisticFeedback =
    pendingProfileUpdate?.length > 0 || pendingAvatarUpload?.length > 0;

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      {/* Show optimistic update indicator */}
      {showOptimisticFeedback && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="flex items-center space-x-2">
            <IconRefresh className="h-4 w-4 animate-spin text-blue-600" />
            <span className="text-sm text-blue-800">
              {lang === "ar" ? "جاري حفظ التغييرات..." : "Saving changes..."}
            </span>
          </div>
        </div>
      )}

      {/* Profile Picture */}
      <div className="rtl:space-x flex items-center space-x-6">
        <div className="relative">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-200">
            {avatarPreview || displayUserData.avatar ? (
              <img
                src={avatarPreview || displayUserData.avatar}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <IconUser className="h-12 w-12 text-gray-400" />
            )}
          </div>
          <button
            onClick={handleUpload}
            disabled={uploadIsPending}
            className="absolute -right-2 -bottom-2 rounded-full bg-[var(--color-tertiaryColor)] p-2 text-white hover:bg-[var(--color-darkBlueColor)] disabled:opacity-50"
          >
            {uploadIsPending ? (
              <IconRefresh className="h-4 w-4 animate-spin" />
            ) : (
              <IconCamera className="h-4 w-4" />
            )}
          </button>

          {/* Hidden file input */}
          <input
            type="text"
            value={displayUserData.firstName || ""}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, firstName: e.target.value }))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {userData.firstName} {userData.lastName}
          </h3>
          <p className="max-w-[180px] break-all text-gray-500 md:max-w-[350px]">
            {userData.email}
          </p>
          <div className="mt-2 text-[.8rem] text-gray-400 md:text-sm">
            <p>
              {lang === "ar"
                ? "صيغة الملف: JPEG, PNG, WebP"
                : "File format: JPEG, PNG, WebP"}
            </p>
            <p>
              {lang === "ar" ? "الحد الأقصى: 5 ميجابايت" : "Maximum size: 5 MB"}
            </p>
          </div>
        </div>
      </div>
      {/* Personal Information */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {lang === "ar" ? "الاسم الأول" : "First Name"}
          </label>
          <div className="relative">
            <IconUser className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400 rtl:right-3" />
            <input
              type="text"
              value={displayUserData.lastName || ""}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, lastName: e.target.value }))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {lang === "ar" ? "الاسم الأخير" : "Last Name"}
          </label>
          <div className="relative">
            <IconUser className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400 rtl:right-3" />
            <input
              type="text"
              value={userData.lastName}
              onChange={(e) =>
                setUserData({ ...userData, lastName: e.target.value })
              }
              className="text-primaryColor w-full rounded-lg border border-gray-300 py-2 pr-3 pl-10 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)] rtl:pr-10 rtl:pl-3"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {lang === "ar" ? "البريد الإلكتروني" : "Email"}
        </label>
        <div className="relative">
          <IconMail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400 rtl:right-3" />
          <input
            type="email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            disabled
            className="text-primaryColor/80 w-full rounded-lg border border-gray-300 bg-gray-100 py-2 pr-3 pl-10 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)] rtl:pr-10 rtl:pl-3"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {lang === "ar" ? "رقم الهاتف" : "Phone"}
          </label>
          <div className="relative">
            <IconPhone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400 rtl:right-3" />
            <input
              type="tel"
              value={userData.phone}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
              className="text-primaryColor w-full rounded-lg border border-gray-300 py-2 pr-3 pl-10 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)] rtl:pr-10 rtl:pl-3"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {lang === "ar" ? "تاريخ الميلاد" : "Birth Date"}
          </label>
          <div className="relative">
            <IconCalendar className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400 rtl:right-3" />
            <input
              type="date"
              value={userData.birthDate}
              onChange={(e) =>
                setUserData({ ...userData, birthDate: e.target.value })
              }
              className="text-primaryColor w-full rounded-lg border border-gray-300 py-2 pr-3 pl-10 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)] rtl:pr-10 rtl:pl-3"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {lang === "ar" ? "العنوان" : "Address"}
        </label>
        <div className="relative">
          <IconMapPin className="absolute top-3 left-3 h-4 w-4 text-gray-400 rtl:right-3" />
          <textarea
            rows={2}
            value={userData.address}
            onChange={(e) =>
              setUserData({ ...userData, address: e.target.value })
            }
            className="text-primaryColor w-full rounded-lg border border-gray-300 py-2 pr-3 pl-10 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)] rtl:pr-10 rtl:pl-3"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {lang === "ar" ? "نبذة عنك" : "Personal Bio"}
        </label>
        <textarea
          rows={3}
          value={userData.bio}
          onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
          className="text-primaryColor w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)]"
        />
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      {/* Change Password */}
      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          تغيير كلمة المرور
        </h3>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              كلمة المرور الحالية
            </label>
            <input
              type="password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)]"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              كلمة المرور الجديدة
            </label>
            <input
              type="password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)]"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              تأكيد كلمة المرور الجديدة
            </label>
            <input
              type="password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)]"
            />
          </div>
        </div>
      </div>

      {/* Security Options */}
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
          <div>
            <h4 className="font-medium text-gray-900">المصادقة الثنائية</h4>
            <p className="text-sm text-gray-500">
              أضف طبقة حماية إضافية لحسابك
            </p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={securitySettings.twoFactorAuth}
              onChange={(e) =>
                setSecuritySettings({
                  ...securitySettings,
                  twoFactorAuth: e.target.checked,
                })
              }
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-[var(--color-tertiaryColor)] peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
          <div>
            <h4 className="font-medium text-gray-900">تنبيهات تسجيل الدخول</h4>
            <p className="text-sm text-gray-500">
              احصل على تنبيه عند تسجيل دخول جديد
            </p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={securitySettings.loginAlerts}
              onChange={(e) =>
                setSecuritySettings({
                  ...securitySettings,
                  loginAlerts: e.target.checked,
                })
              }
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-[var(--color-tertiaryColor)] peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>
      </div>

      {/* Active Sessions */}
      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          الجلسات النشطة
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
            <div>
              <p className="font-medium text-gray-900">Chrome على Windows</p>
              <p className="text-sm text-gray-500">
                الجلسة الحالية • القاهرة، مصر
              </p>
            </div>
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
              نشط
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
            <div>
              <p className="font-medium text-gray-900">Safari على iPhone</p>
              <p className="text-sm text-gray-500">منذ ساعتين • القاهرة، مصر</p>
            </div>
            <button className="text-sm text-red-600 hover:text-red-800">
              إنهاء
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
          <div>
            <h4 className="font-medium text-gray-900">
              إشعارات البريد الإلكتروني
            </h4>
            <p className="text-sm text-gray-500">
              تلقي الإشعارات عبر البريد الإلكتروني
            </p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={securitySettings.emailNotifications}
              onChange={(e) =>
                setSecuritySettings({
                  ...securitySettings,
                  emailNotifications: e.target.checked,
                })
              }
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-[var(--color-tertiaryColor)] peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
          <div>
            <h4 className="font-medium text-gray-900">
              إشعارات الرسائل النصية
            </h4>
            <p className="text-sm text-gray-500">
              تلقي الإشعارات عبر الرسائل النصية
            </p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={securitySettings.smsNotifications}
              onChange={(e) =>
                setSecuritySettings({
                  ...securitySettings,
                  smsNotifications: e.target.checked,
                })
              }
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-[var(--color-tertiaryColor)] peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>
      </div>

      {/* Notification Types */}
      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          أنواع الإشعارات
        </h3>
        <div className="space-y-3">
          {[
            "تحديثات الطلبات",
            "رسائل جديدة",
            "تنبيهات الأمان",
            "عروض خاصة",
            "تحديثات النظام",
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <span className="text-gray-700">{item}</span>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  defaultChecked={index < 3}
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-[var(--color-tertiaryColor)] peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {lang === "ar" ? "رؤية الملف الشخصي" : "Profile Visibility"}
        </label>
        <select
          value={privacySettings.profileVisibility}
          onChange={(e) =>
            setPrivacySettings({
              ...privacySettings,
              profileVisibility: e.target.value,
            })
          }
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)]"
        >
          <option value="public">{lang === "ar" ? "عام" : "Public"}</option>
          <option value="friends">
            {lang === "ar" ? "الأصدقاء فقط" : "Friends Only"}
          </option>
          <option value="private">{lang === "ar" ? "خاص" : "Private"}</option>
        </select>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
          <div>
            <h4 className="font-medium text-gray-900">
              {lang === "ar" ? "إظهار البريد الإلكتروني" : "Show Email"}
            </h4>
            <p className="text-sm text-gray-500">
              {lang === "ar"
                ? "السماح للآخرين برؤية بريدك الإلكتروني"
                : "Allow others to see your email address"}
            </p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={privacySettings.showEmail}
              onChange={(e) =>
                setPrivacySettings({
                  ...privacySettings,
                  showEmail: e.target.checked,
                })
              }
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-[var(--color-tertiaryColor)] peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
          <div>
            <h4 className="font-medium text-gray-900">
              {lang === "ar" ? "إظهار رقم الهاتف" : "Show Phone Number"}
            </h4>
            <p className="text-sm text-gray-500">
              {lang === "ar"
                ? "السماح للآخرين برؤية رقم هاتفك"
                : "Allow others to see your phone number"}
            </p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={privacySettings.showPhone}
              onChange={(e) =>
                setPrivacySettings({
                  ...privacySettings,
                  showPhone: e.target.checked,
                })
              }
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-[var(--color-tertiaryColor)] peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
          <div>
            <h4 className="font-medium text-gray-900">
              {lang === "ar" ? "إظهار الموقع" : "Show Location"}
            </h4>
            <p className="text-sm text-gray-500">
              {lang === "ar"
                ? "السماح للآخرين برؤية موقعك"
                : "Allow others to see your location"}
            </p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={privacySettings.showLocation}
              onChange={(e) =>
                setPrivacySettings({
                  ...privacySettings,
                  showLocation: e.target.checked,
                })
              }
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-[var(--color-tertiaryColor)] peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>
      </div>

      {/* Data Management */}
      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          إدارة البيانات
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
            <div>
              <p className="font-medium text-gray-900">تصدير البيانات</p>
              <p className="text-sm text-gray-500">تحميل نسخة من بياناتك</p>
            </div>
            <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
              تحميل
            </button>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-4">
            <div>
              <p className="font-medium text-red-900">حذف الحساب</p>
              <p className="text-sm text-red-600">
                حذف حسابك وجميع بياناتك نهائ
              </p>
            </div>
            <button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
              حذف
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralSettings();
      case "security":
        return renderSecuritySettings();
      case "notifications":
        return renderNotificationSettings();
      case "privacy":
        return renderPrivacySettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {lang === "ar" ? "الملف الشخصي" : "Profile"}
        </h1>
        <p className="mt-1 text-gray-600">
          {lang === "ar"
            ? "إدارة معلوماتك الشخصية وإعدادات الحساب"
            : "Manage your personal information and account settings"}
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar */}
        <div className="flex-shrink-0 lg:w-64">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors rtl:space-x-reverse ${
                    activeTab === tab.id
                      ? "bg-[var(--color-tertiaryColor)] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {tabs.find((tab) => tab.id === activeTab)?.label}
              </h2>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                disabled={isPending}
                className={`flex items-center space-x-2 rounded-lg px-4 py-2 text-white transition-colors disabled:opacity-50 rtl:space-x-reverse ${
                  saveSuccess
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-[var(--color-tertiaryColor)] hover:bg-[var(--color-darkBlueColor)]"
                }`}
              >
                {isPending ? (
                  <IconRefresh className="h-4 w-4 animate-spin" />
                ) : saveSuccess ? (
                  <IconCheck className="h-4 w-4" />
                ) : (
                  <IconSettings className="h-4 w-4" />
                )}
                <span>
                  {isPending
                    ? lang === "ar"
                      ? "جاري الحفظ..."
                      : "Saving..."
                    : saveSuccess
                      ? lang === "ar"
                        ? "تم الحفظ!"
                        : "Saved!"
                      : lang === "ar"
                        ? "حفظ التغييرات"
                        : "Save Changes"}
                </span>
              </motion.button>
            </div>

            {renderContent()}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
