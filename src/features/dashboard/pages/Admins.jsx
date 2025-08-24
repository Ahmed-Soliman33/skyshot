import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../shared/hooks/useLanguage";
import Table from "../../../shared/components/Table";
import {
  IconUserShield,
  IconMail,
  IconPhone,
  IconCalendar,
  IconShield,
  IconShieldCheck,
  IconShieldX,
  IconCrown,
  IconUser,
  IconSettings,
} from "@tabler/icons-react";

const Admins = () => {
  const { t } = useTranslation("dashboard");
  const { formatDate } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]);

  // Load admins data from API
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setAdmins(dummyAdmins);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Sample admins data - replace with API calls
  const dummyAdmins = [
    {
      id: 1,
      name: "أحمد محمد",
      email: "ahmed@skyshot.com",
      phone: "+966501234567",
      role: "super_admin",
      status: "active",
      lastLogin: "2024-01-20T10:30:00",
      createdAt: "2023-06-15",
      permissions: ["all"],
      avatar: null,
    },
    {
      id: 2,
      name: "فاطمة أحمد",
      email: "fatima@skyshot.com",
      phone: "+966507654321",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-19T14:20:00",
      createdAt: "2023-08-20",
      permissions: ["content", "users", "settings"],
      avatar: null,
    },
    {
      id: 3,
      name: "محمد علي",
      email: "mohammed@skyshot.com",
      phone: "+966509876543",
      role: "moderator",
      status: "active",
      lastLogin: "2024-01-18T09:15:00",
      createdAt: "2023-10-10",
      permissions: ["content", "users"],
      avatar: null,
    },
    {
      id: 4,
      name: "سارة حسن",
      email: "sara@skyshot.com",
      phone: "+966502468135",
      role: "editor",
      status: "inactive",
      lastLogin: "2024-01-15T16:45:00",
      createdAt: "2023-12-01",
      permissions: ["content"],
      avatar: null,
    },
    {
      id: 5,
      name: "عمر خالد",
      email: "omar@skyshot.com",
      phone: "+966508642097",
      role: "admin",
      status: "suspended",
      lastLogin: "2024-01-10T11:30:00",
      createdAt: "2023-09-15",
      permissions: ["content", "users"],
      avatar: null,
    },
  ];

  const getRoleIcon = (role) => {
    switch (role) {
      case "super_admin":
        return IconCrown;
      case "admin":
        return IconUserShield;
      case "moderator":
        return IconShieldCheck;
      case "editor":
        return IconUser;
      default:
        return IconUser;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "super_admin":
        return "text-yellow-600";
      case "admin":
        return "text-blue-600";
      case "moderator":
        return "text-green-600";
      case "editor":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  const getRoleName = (role) => {
    switch (role) {
      case "super_admin":
        return "مدير عام";
      case "admin":
        return "مدير";
      case "moderator":
        return "مشرف";
      case "editor":
        return "محرر";
      default:
        return "مستخدم";
    }
  };

  const columns = [
    {
      key: "name",
      title: "المدير",
      render: (value, row) => (
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[var(--color-tertiaryColor)] to-[var(--color-darkBlueColor)]">
            <span className="text-sm font-medium text-white">
              {value.charAt(0)}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 rtl:space-x-reverse">
              <IconMail className="h-3 w-3" />
              <span>{row.email}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      title: "الدور",
      render: (value, row) => {
        const RoleIcon = getRoleIcon(value);
        return (
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <RoleIcon className={`h-5 w-5 ${getRoleColor(value)}`} />
            <span className={`font-medium ${getRoleColor(value)}`}>
              {getRoleName(value)}
            </span>
          </div>
        );
      },
    },
    {
      key: "status",
      title: "الحالة",
      render: (value) => (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
            value === "active"
              ? "bg-green-100 text-green-800"
              : value === "inactive"
                ? "bg-gray-100 text-gray-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {value === "active"
            ? "نشط"
            : value === "inactive"
              ? "غير نشط"
              : "معلق"}
        </span>
      ),
    },
    {
      key: "permissions",
      title: "الصلاحيات",
      render: (value) => (
        <div className="flex flex-wrap gap-1">
          {value.includes("all") ? (
            <span className="rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
              جميع الصلاحيات
            </span>
          ) : (
            value.slice(0, 2).map((permission, index) => (
              <span
                key={index}
                className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800"
              >
                {permission === "content"
                  ? "المحتوى"
                  : permission === "users"
                    ? "المستخدمين"
                    : permission === "settings"
                      ? "الإعدادات"
                      : permission}
              </span>
            ))
          )}
          {value.length > 2 && !value.includes("all") && (
            <span className="text-xs text-gray-500">+{value.length - 2}</span>
          )}
        </div>
      ),
    },
    {
      key: "lastLogin",
      title: "آخر دخول",
      render: (value) => (
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <IconCalendar className="h-4 w-4 text-gray-400" />
          <span className="text-sm">{formatDate(value)}</span>
        </div>
      ),
    },
    {
      key: "phone",
      title: "الهاتف",
      render: (value) => (
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <IconPhone className="h-4 w-4 text-gray-400" />
          <span className="text-sm">{value}</span>
        </div>
      ),
    },
  ];

  const handleCreate = () => {
    console.log("Create new admin");
  };

  const handleEdit = (admin) => {
    console.log("Edit admin:", admin);
  };

  const handleDelete = (admin) => {
    console.log("Delete admin:", admin);
    if (window.confirm(t("messages.deleteConfirm"))) {
      setAdmins((prev) => prev.filter((a) => a.id !== admin.id));
    }
  };

  const handleView = (admin) => {
    console.log("View admin:", admin);
  };

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
            {t("navigation.admins")}
          </h1>
          <p className="mt-1 text-gray-600">
            إدارة المديرين والمشرفين والصلاحيات
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center space-x-2 rounded-lg bg-[var(--color-tertiaryColor)] px-4 py-2 text-white transition-colors hover:bg-[var(--color-darkBlueColor)] rtl:space-x-reverse"
        >
          <IconUserShield className="h-4 w-4" />
          <span>مدير جديد</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                إجمالي المديرين
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {admins.length}
              </p>
            </div>
            <IconUserShield className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">نشط</p>
              <p className="text-2xl font-bold text-green-600">
                {admins.filter((a) => a.status === "active").length}
              </p>
            </div>
            <IconShieldCheck className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">مديرين عامين</p>
              <p className="text-2xl font-bold text-yellow-600">
                {admins.filter((a) => a.role === "super_admin").length}
              </p>
            </div>
            <IconCrown className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">مديرين</p>
              <p className="text-2xl font-bold text-blue-600">
                {admins.filter((a) => a.role === "admin").length}
              </p>
            </div>
            <IconUserShield className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">معلق</p>
              <p className="text-2xl font-bold text-red-600">
                {admins.filter((a) => a.status === "suspended").length}
              </p>
            </div>
            <IconShieldX className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Admins Table */}
      <Table
        data={admins}
        columns={columns}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onCreate={handleCreate}
        searchable={true}
        filterable={true}
        exportable={true}
      />
    </motion.div>
  );
};

export default Admins;
