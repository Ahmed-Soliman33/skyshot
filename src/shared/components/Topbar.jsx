import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../hooks/useLanguage";
import {
  IconSearch,
  IconBell,
  IconUser,
  IconSettings,
  IconLogout,
  IconMenu2,
  IconChevronDown,
  IconLanguage,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import { useAuth } from "@hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getAvatarUrl } from "@features/dashboard/utils/getAvatarUrl";

const Topbar = ({ isCollapsed, setIsCollapsed, isMobile, setIsMobileOpen }) => {
  const { t } = useTranslation("dashboard");
  const { isRTL, currentLanguage, toggleLanguage } = useLanguage();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const profileMenuRef = useRef(null);
  const notificationRef = useRef(null);
  const searchRef = useRef(null);

  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const { mutate: logoutMutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate("/auth");
    },
  });

  // Dummy user data
  const user = {
    name: currentUser?.firstName + " " + currentUser?.lastName,
    email: currentUser?.email,
    avatar: currentUser?.avatar,
    role: currentUser?.role,
  };

  console.log({ user });
  // Dummy notifications
  const notifications = [
    {
      id: 1,
      title: "طلب جديد",
      message: "تم استلام طلب جديد من العميل أحمد",
      time: "5 دقائق",
      unread: true,
    },
    {
      id: 2,
      title: "تحديث النظام",
      message: "تم تحديث النظام بنجاح",
      time: "1 ساعة",
      unread: true,
    },
    {
      id: 3,
      title: "رسالة جديدة",
      message: "رسالة جديدة من فريق الدعم",
      time: "2 ساعة",
      unread: false,
    },
  ];

  // Dummy search results
  const dummySearchResults = [
    { id: 1, title: "لوحة التحكم", type: "page", url: "/dashboard" },
    { id: 2, title: "إدارة المستخدمين", type: "page", url: "/dashboard/users" },
    { id: 3, title: "الإعدادات", type: "page", url: "/dashboard/settings" },
    {
      id: 4,
      title: "العميل أحمد محمد",
      type: "user",
      url: "/dashboard/customers/1",
    },
    {
      id: 5,
      title: "طلب #12345",
      type: "order",
      url: "/dashboard/orders/12345",
    },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = dummySearchResults.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()),
      );
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  const logoutHandler = () => {
    logoutMutate();
  };
  return (
    <div className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 shadow-sm">
      {/* Left Side */}
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={() => setIsMobileOpen(true)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
          >
            <IconMenu2 className="h-5 w-5" />
          </button>
        )}

        {/* Desktop Collapse Button */}
        {!isMobile && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:block"
          >
            <IconMenu2 className="h-5 w-5" />
          </button>
        )}

        {/* Search */}
        <div className="relative hidden sm:block" ref={searchRef}>
          <div className="relative">
            <IconSearch
              className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400 ${isRTL ? "right-3" : "left-3"}`}
            />
            <input
              type="text"
              placeholder={t("search.placeholder")}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchQuery && setShowSearchResults(true)}
              className={`w-48 md:w-64 lg:w-80 ${isRTL ? "pr-10 pl-4" : "pr-4 pl-10"} rounded-lg border border-gray-300 py-2 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)]`}
            />
          </div>

          {/* Search Results */}
          <AnimatePresence>
            {showSearchResults && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg"
              >
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="cursor-pointer border-b border-gray-100 px-4 py-3 last:border-b-0 hover:bg-gray-50"
                  >
                    <div className="font-medium text-gray-900">
                      {result.title}
                    </div>
                    <div className="text-sm text-gray-500 capitalize">
                      {result.type}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        {/* Mobile Search Button */}
        <button className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 sm:hidden">
          <IconSearch className="h-5 w-5" />
        </button>

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          >
            <IconBell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`absolute top-full z-50 mt-2 w-80 rounded-lg border border-gray-200 bg-white shadow-lg ${isRTL ? "left-0" : "right-0"}`}
              >
                <div className="border-b border-gray-200 p-4">
                  <h3 className="font-semibold text-gray-900">
                    {t("navigation.notifications")}
                  </h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`border-b border-gray-100 p-4 last:border-b-0 hover:bg-gray-50 ${notification.unread ? "bg-blue-50" : ""}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {notification.title}
                          </h4>
                          <p className="mt-1 text-sm text-gray-600">
                            {notification.message}
                          </p>
                          <p className="mt-2 text-xs text-gray-400">
                            {notification.time}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 p-4">
                  <button className="text-sm text-[var(--color-tertiaryColor)] hover:underline">
                    {t("actions.markAllAsRead")}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Menu */}
        <div className="relative" ref={profileMenuRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-3 rounded-lg p-2 hover:bg-gray-100 rtl:space-x-reverse"
          >
            {user?.avatar ? (
              <img
                src={user.avatar || currentUser?.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[var(--color-tertiaryColor)] to-[var(--color-darkBlueColor)]">
                <span className="text-sm font-medium text-white">
                  {user.name.charAt(0)}
                </span>
              </div>
            )}
            <div className="hidden text-right md:block rtl:text-left">
              <div
                className={`${isRTL ? "max-w-[140px]" : "max-w-[80px] truncate"} text-sm font-medium text-gray-900`}
              >
                {user.name}
              </div>
              <div className="text-xs text-gray-500">
                {t(`profile.roles.${user.role}`)}
              </div>
            </div>
            <IconChevronDown className="h-4 w-4 text-gray-400" />
          </button>

          {/* Profile Dropdown */}
          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`absolute top-full z-50 mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg ${isRTL ? "left-0" : "right-0"}`}
              >
                <div className="border-b border-gray-200 p-4">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div>
                      <div className="font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="max-w-[180px] truncate text-sm text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  <button
                    onClick={() => navigate("/dashboard/profile")}
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <IconUser
                      className={`h-4 w-4 ${isRTL ? "ml-3" : "mr-3"}`}
                    />
                    {t("profile.profile")}
                  </button>
                  <button
                    onClick={() => navigate("/dashboard/settings")}
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <IconSettings
                      className={`h-4 w-4 ${isRTL ? "ml-3" : "mr-3"}`}
                    />
                    {t("profile.settings")}
                  </button>
                  <button
                    onClick={toggleLanguage}
                    className="flex w-full items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      <IconLanguage
                        className={`h-4 w-4 ${isRTL ? "ml-3" : "mr-3"}`}
                      />
                      {t("profile.language")}
                    </div>
                    <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                      {currentLanguage === "ar" ? "العربية" : "English"}
                    </span>
                  </button>
                </div>

                <div className="border-t border-gray-200 py-2">
                  <button
                    onClick={logoutHandler}
                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <IconLogout
                      className={`h-4 w-4 ${isRTL ? "ml-3" : "mr-3"}`}
                    />
                    {t("profile.logout")}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
