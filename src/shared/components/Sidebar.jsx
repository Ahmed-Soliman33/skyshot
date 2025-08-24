import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../hooks/useLanguage";
import {
  IconDashboard,
  IconFileText,
  IconUsers,
  IconShoppingCart,
  IconSettings,
  IconBell,
  IconLogout,
  IconChevronLeft,
  IconChevronRight,
  IconMenu2,
  IconX,
  IconFolder,
  IconBrandBlogger,
  IconPhoto,
  IconBriefcase,
  IconStar,
  IconHelp,
  IconUserShield,
  IconUserCheck,
} from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@hooks/useAuth";

const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
  isMobile,
  setIsMobileOpen,
  isMobileOpen,
}) => {
  const { logout } = useAuth();
  const { t } = useTranslation("dashboard");
  const { isRTL } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const { mutate: logoutMutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate("/auth");
    },
  });

  const menuItems = [
    {
      id: "dashboard",
      label: t("navigation.dashboard"),
      icon: IconDashboard,
      path: "/dashboard",
      color: "text-blue-500",
    },
    {
      id: "content",
      label: t("navigation.contentManagement"),
      icon: IconFileText,
      color: "text-green-500",
      children: [
        {
          id: "pages",
          label: t("navigation.pages"),
          icon: IconFolder,
          path: "/dashboard/pages",
        },
        {
          id: "blog",
          label: t("navigation.blog"),
          icon: IconBrandBlogger,
          path: "/dashboard/blog",
        },
        {
          id: "media",
          label: t("navigation.media"),
          icon: IconPhoto,
          path: "/dashboard/media",
        },
        {
          id: "services",
          label: t("navigation.services"),
          icon: IconBriefcase,
          path: "/dashboard/services",
        },
        {
          id: "testimonials",
          label: t("navigation.testimonials"),
          icon: IconStar,
          path: "/dashboard/testimonials",
        },
        {
          id: "faqs",
          label: t("navigation.faqs"),
          icon: IconHelp,
          path: "/dashboard/faqs",
        },
      ],
    },
    {
      id: "users",
      label: t("navigation.userManagement"),
      icon: IconUsers,
      color: "text-purple-500",
      children: [
        {
          id: "admins",
          label: t("navigation.admins"),
          icon: IconUserShield,
          path: "/dashboard/admins",
        },
        {
          id: "customers",
          label: t("navigation.customers"),
          icon: IconUserCheck,
          path: "/dashboard/customers",
        },
      ],
    },
    {
      id: "orders",
      label: t("navigation.orders"),
      icon: IconShoppingCart,
      path: "/dashboard/orders",
      color: "text-orange-500",
    },
    {
      id: "settings",
      label: t("navigation.settings"),
      icon: IconSettings,
      path: "/dashboard/settings",
      color: "text-gray-500",
    },
    {
      id: "notifications",
      label: t("navigation.notifications"),
      icon: IconBell,
      path: "/dashboard/notifications",
      color: "text-red-500",
    },
  ];

  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpanded = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const isActive = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const sidebarVariants = {
    expanded: {
      width: isMobile ? "280px" : "280px",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    collapsed: {
      width: isMobile ? "0px" : "80px",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const contentVariants = {
    expanded: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, delay: 0.1 },
    },
    collapsed: {
      opacity: 0,
      x: isRTL ? 20 : -20,
      transition: { duration: 0.2 },
    },
  };

  const MenuItem = ({ item, level = 0 }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems[item.id];
    const active = isActive(item.path);

    return (
      <div className="mb-1">
        {item.path ? (
          <Link
            to={item.path}
            className={`group flex items-center rounded-lg px-4 py-3 transition-all duration-200 ${
              active
                ? "bg-[var(--color-tertiaryColor)] text-[var(--color-primaryTextColor)] shadow-lg"
                : "text-[var(--color-secondaryTextColor)] hover:bg-[var(--color-secondaryColor)] hover:text-[var(--color-primaryTextColor)]"
            } ${level > 0 ? "mr-2 ml-6" : ""}`}
            onClick={() => isMobile && setIsMobileOpen(false)}
          >
            <item.icon
              className={`h-5 w-5 ${active ? "text-white" : item.color || "text-current"} ${
                isCollapsed && !isMobile ? "mx-auto" : isRTL ? "ml-3" : "mr-3"
              }`}
            />
            <AnimatePresence>
              {(!isCollapsed || isMobile) && (
                <motion.span
                  variants={contentVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  className="truncate font-medium"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        ) : (
          <button
            onClick={() => toggleExpanded(item.id)}
            className={`group flex w-full items-center justify-between rounded-lg px-4 py-3 transition-all duration-200 ${"text-[var(--color-secondaryTextColor)] hover:bg-[var(--color-secondaryColor)] hover:text-[var(--color-primaryTextColor)]"}`}
          >
            <div className="flex items-center">
              <item.icon
                className={`h-5 w-5 ${item.color || "text-current"} ${
                  isCollapsed && !isMobile ? "mx-auto" : isRTL ? "ml-3" : "mr-3"
                }`}
              />
              <AnimatePresence>
                {(!isCollapsed || isMobile) && (
                  <motion.span
                    variants={contentVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    className="truncate font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence>
              {(!isCollapsed || isMobile) && hasChildren && (
                <motion.div
                  variants={contentVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                >
                  {isRTL ? (
                    isExpanded ? (
                      <IconChevronLeft className="h-4 w-4" />
                    ) : (
                      <IconChevronRight className="h-4 w-4" />
                    )
                  ) : isExpanded ? (
                    <IconChevronRight className="h-4 w-4" />
                  ) : (
                    <IconChevronLeft className="h-4 w-4" />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        )}

        {/* Children */}
        <AnimatePresence>
          {hasChildren && isExpanded && (!isCollapsed || isMobile) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-2 space-y-1">
                {item.children.map((child) => (
                  <MenuItem key={child.id} item={child} level={level + 1} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const logoutHandler = () => {
    logoutMutate();
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-opacity-50 fixed inset-0 z-40 bg-black lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        animate={
          isMobile
            ? isMobileOpen
              ? "expanded"
              : "collapsed"
            : isCollapsed
              ? "collapsed"
              : "expanded"
        }
        className={`fixed ${isRTL ? "right-0" : "left-0"} top-0 h-screen bg-[var(--color-primaryColor)] border-${isRTL ? "l" : "r"} z-50 overflow-hidden border-[var(--color-secondaryColor)] shadow-lg`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--color-secondaryColor)] p-4">
            <AnimatePresence>
              {(!isCollapsed || isMobile) && (
                <motion.div
                  variants={contentVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  className="flex items-center"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-[var(--color-tertiaryColor)] to-[var(--color-darkBlueColor)]">
                    <span className="text-sm font-bold text-[var(--color-primaryTextColor)]">
                      S
                    </span>
                  </div>
                  <span
                    className={`text-lg font-bold text-[var(--color-primaryTextColor)] ${isRTL ? "mr-3" : "ml-3"}`}
                  >
                    SkyShot
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {isMobile && (
              <button
                onClick={() => setIsMobileOpen(false)}
                className="rounded-lg p-2 text-[var(--color-secondaryTextColor)] hover:bg-[var(--color-secondaryColor)] hover:text-[var(--color-primaryTextColor)]"
              >
                <IconX className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Menu Items */}
          <div className="flex-1 space-y-2 overflow-y-auto p-4">
            {menuItems.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-[var(--color-secondaryColor)] p-4">
            <button className="flex w-full items-center rounded-lg px-4 py-3 text-red-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-300">
              <IconLogout
                className={`h-5 w-5 ${isCollapsed && !isMobile ? "mx-auto" : isRTL ? "ml-3" : "mr-3"}`}
              />
              <AnimatePresence>
                {(!isCollapsed || isMobile) && (
                  <motion.span
                    onClick={logoutHandler}
                    variants={contentVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    className="font-medium"
                  >
                    {t("navigation.logout")}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
