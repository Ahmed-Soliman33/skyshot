import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../shared/hooks/useLanguage";
import {
  IconBell,
  IconMail,
  IconUser,
  IconShoppingCart,
  IconSettings,
  IconTrash,
  IconEye,
  IconCheck,
  IconCheckbox,
  IconFilter,
  IconSearch,
  IconCalendar,
  IconClock,
} from "@tabler/icons-react";

const Notifications = () => {
  const { t } = useTranslation("dashboard");
  const { formatDate, formatRelativeTime } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNotifications, setSelectedNotifications] = useState([]);

  // Load notifications data from API
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setNotifications(dummyNotifications);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Sample notifications data - replace with API calls
  const dummyNotifications = [
    {
      id: 1,
      type: "order",
      title: "طلب جديد",
      message: "تم استلام طلب جديد من العميل أحمد محمد بقيمة 1500 ريال",
      read: false,
      createdAt: "2024-01-20T10:30:00",
      priority: "high",
      actionUrl: "/dashboard/orders/1",
    },
    {
      id: 2,
      type: "user",
      title: "مستخدم جديد",
      message: "انضم مستخدم جديد: فاطمة أحمد إلى المنصة",
      read: false,
      createdAt: "2024-01-20T09:15:00",
      priority: "medium",
      actionUrl: "/dashboard/customers/2",
    },
    {
      id: 3,
      type: "system",
      title: "تحديث النظام",
      message: "تم تحديث النظام بنجاح إلى الإصدار 2.1.0",
      read: true,
      createdAt: "2024-01-19T16:45:00",
      priority: "low",
      actionUrl: null,
    },
    {
      id: 4,
      type: "payment",
      title: "دفعة مستلمة",
      message: "تم استلام دفعة بقيمة 2200 ريال من العميل خالد سعد",
      read: true,
      createdAt: "2024-01-19T14:20:00",
      priority: "high",
      actionUrl: "/dashboard/orders/3",
    },
    {
      id: 5,
      type: "message",
      title: "رسالة جديدة",
      message: "رسالة جديدة من فريق الدعم الفني",
      read: false,
      createdAt: "2024-01-19T11:30:00",
      priority: "medium",
      actionUrl: "/dashboard/messages/5",
    },
    {
      id: 6,
      type: "order",
      title: "طلب ملغي",
      message: "تم إلغاء الطلب #ORD-005 من قبل العميل فهد الحربي",
      read: true,
      createdAt: "2024-01-18T13:15:00",
      priority: "medium",
      actionUrl: "/dashboard/orders/5",
    },
    {
      id: 7,
      type: "system",
      title: "نسخة احتياطية",
      message: "تم إنشاء النسخة الاحتياطية اليومية بنجاح",
      read: true,
      createdAt: "2024-01-18T02:00:00",
      priority: "low",
      actionUrl: null,
    },
    {
      id: 8,
      type: "user",
      title: "تحديث ملف شخصي",
      message: "قام المستخدم ريم عبدالله بتحديث ملفه الشخصي",
      read: true,
      createdAt: "2024-01-17T15:45:00",
      priority: "low",
      actionUrl: "/dashboard/customers/4",
    },
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case "order":
        return IconShoppingCart;
      case "user":
        return IconUser;
      case "payment":
        return IconShoppingCart;
      case "message":
        return IconMail;
      case "system":
        return IconSettings;
      default:
        return IconBell;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "order":
        return "text-blue-500 bg-blue-100";
      case "user":
        return "text-green-500 bg-green-100";
      case "payment":
        return "text-purple-500 bg-purple-100";
      case "message":
        return "text-orange-500 bg-orange-100";
      case "system":
        return "text-gray-500 bg-gray-100";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-orange-500";
      case "low":
        return "border-l-green-500";
      default:
        return "border-l-gray-300";
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && !notification.read) ||
      (filter === "read" && notification.read) ||
      notification.type === filter;

    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true })),
    );
  };

  const handleDelete = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  const handleBulkAction = (action) => {
    if (action === "markRead") {
      setNotifications((prev) =>
        prev.map((notification) =>
          selectedNotifications.includes(notification.id)
            ? { ...notification, read: true }
            : notification,
        ),
      );
    } else if (action === "delete") {
      setNotifications((prev) =>
        prev.filter(
          (notification) => !selectedNotifications.includes(notification.id),
        ),
      );
    }
    setSelectedNotifications([]);
  };

  const handleSelectNotification = (id) => {
    setSelectedNotifications((prev) =>
      prev.includes(id) ? prev.filter((nId) => nId !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map((n) => n.id));
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="mb-4 h-8 w-1/4 rounded bg-gray-200"></div>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 rounded bg-gray-200"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t("navigation.notifications")}
          </h1>
          <p className="mt-1 text-gray-600">
            إدارة الإشعارات والرسائل ({unreadCount} غير مقروء)
          </p>
        </div>
        <button
          onClick={handleMarkAllAsRead}
          className="flex items-center space-x-2 rounded-lg bg-[var(--color-tertiaryColor)] px-4 py-2 text-white transition-colors hover:bg-[var(--color-darkBlueColor)] rtl:space-x-reverse"
        >
          <IconCheck className="h-4 w-4" />
          <span>وضع علامة مقروء للكل</span>
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                إجمالي الإشعارات
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.length}
              </p>
            </div>
            <IconBell className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">غير مقروء</p>
              <p className="text-2xl font-bold text-red-600">{unreadCount}</p>
            </div>
            <IconMail className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">أولوية عالية</p>
              <p className="text-2xl font-bold text-orange-600">
                {notifications.filter((n) => n.priority === "high").length}
              </p>
            </div>
            <IconBell className="h-8 w-8 text-orange-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">اليوم</p>
              <p className="text-2xl font-bold text-green-600">
                {
                  notifications.filter(
                    (n) =>
                      new Date(n.createdAt).toDateString() ===
                      new Date().toDateString(),
                  ).length
                }
              </p>
            </div>
            <IconCalendar className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Search */}
            <div className="relative">
              <IconSearch className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400 rtl:right-3" />
              <input
                type="text"
                placeholder="البحث في الإشعارات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)] rtl:pr-10 rtl:pl-4"
              />
            </div>

            {/* Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2"
            >
              <option value="all">جميع الإشعارات</option>
              <option value="unread">غير مقروء</option>
              <option value="read">مقروء</option>
              <option value="order">الطلبات</option>
              <option value="user">المستخدمين</option>
              <option value="payment">المدفوعات</option>
              <option value="message">الرسائل</option>
              <option value="system">النظام</option>
            </select>
          </div>

          {/* Bulk Actions */}
          {selectedNotifications.length > 0 && (
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm text-gray-600">
                {selectedNotifications.length} محدد
              </span>
              <button
                onClick={() => handleBulkAction("markRead")}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                وضع علامة مقروء
              </button>
              <button
                onClick={() => handleBulkAction("delete")}
                className="text-sm text-red-600 hover:text-red-800"
              >
                حذف
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="rounded-lg border border-gray-200 bg-white">
        {/* Header */}
        <div className="flex items-center space-x-4 border-b border-gray-200 p-4 rtl:space-x-reverse">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={
                selectedNotifications.length === filteredNotifications.length &&
                filteredNotifications.length > 0
              }
              onChange={handleSelectAll}
              className="rounded border-gray-300 text-[var(--color-tertiaryColor)] focus:ring-[var(--color-tertiaryColor)]"
            />
            <span className="mr-2 text-sm text-gray-600 rtl:ml-2">
              تحديد الكل
            </span>
          </label>
        </div>

        {/* Notifications */}
        <div className="divide-y divide-gray-200">
          <AnimatePresence>
            {filteredNotifications.length === 0 ? (
              <div className="p-12 text-center">
                <IconBell className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  لا توجد إشعارات
                </h3>
                <p className="text-gray-500">
                  لم يتم العثور على إشعارات تطابق البحث
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => {
                const TypeIcon = getTypeIcon(notification.type);
                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={`border-l-4 p-4 transition-colors hover:bg-gray-50 ${getPriorityColor(notification.priority)} ${
                      !notification.read ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-start space-x-4 rtl:space-x-reverse">
                      <label className="mt-1 flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedNotifications.includes(
                            notification.id,
                          )}
                          onChange={() =>
                            handleSelectNotification(notification.id)
                          }
                          className="rounded border-gray-300 text-[var(--color-tertiaryColor)] focus:ring-[var(--color-tertiaryColor)]"
                        />
                      </label>

                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${getTypeColor(notification.type)}`}
                      >
                        <TypeIcon className="h-5 w-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h3
                            className={`text-sm font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}
                          >
                            {notification.title}
                            {!notification.read && (
                              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue-500 rtl:ml-2"></span>
                            )}
                          </h3>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-xs text-gray-500">
                              {formatRelativeTime(notification.createdAt)}
                            </span>
                            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                              {!notification.read && (
                                <button
                                  onClick={() =>
                                    handleMarkAsRead(notification.id)
                                  }
                                  className="p-1 text-gray-400 hover:text-blue-600"
                                  title="وضع علامة مقروء"
                                >
                                  <IconEye className="h-4 w-4" />
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(notification.id)}
                                className="p-1 text-gray-400 hover:text-red-600"
                                title="حذف"
                              >
                                <IconTrash className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">
                          {notification.message}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-xs text-gray-500 rtl:space-x-reverse">
                            <IconClock className="h-3 w-3" />
                            <span>{formatDate(notification.createdAt)}</span>
                          </div>
                          {notification.actionUrl && (
                            <button className="text-xs text-[var(--color-tertiaryColor)] hover:underline">
                              عرض التفاصيل
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Notifications;
