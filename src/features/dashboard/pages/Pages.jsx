import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../shared/hooks/useLanguage";
import Table from "../../../shared/components/Table";
import {
  IconFileText,
  IconEye,
  IconEdit,
  IconTrash,
  IconPlus,
  IconCalendar,
  IconUser,
} from "@tabler/icons-react";

const Pages = () => {
  const { t } = useTranslation("dashboard");
  const { formatDate } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState([]);

  // Load pages data from API
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setPages(dummyPages);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Sample pages data - replace with API calls
  const dummyPages = [
    {
      id: 1,
      title: "الصفحة الرئيسية",
      slug: "home",
      status: "published",
      author: "أحمد محمد",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
      views: 1250,
    },
    {
      id: 2,
      title: "من نحن",
      slug: "about",
      status: "published",
      author: "فاطمة أحمد",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18",
      views: 890,
    },
    {
      id: 3,
      title: "اتصل بنا",
      slug: "contact",
      status: "draft",
      author: "محمد علي",
      createdAt: "2024-01-12",
      updatedAt: "2024-01-19",
      views: 0,
    },
    {
      id: 4,
      title: "سياسة الخصوصية",
      slug: "privacy-policy",
      status: "published",
      author: "سارة حسن",
      createdAt: "2024-01-08",
      updatedAt: "2024-01-16",
      views: 456,
    },
    {
      id: 5,
      title: "شروط الاستخدام",
      slug: "terms-of-service",
      status: "published",
      author: "عمر خالد",
      createdAt: "2024-01-05",
      updatedAt: "2024-01-14",
      views: 234,
    },
  ];

  const columns = [
    {
      key: "title",
      title: "العنوان",
      render: (value, row) => (
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <IconFileText className="h-5 w-5 text-gray-400" />
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">/{row.slug}</div>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      title: "الحالة",
      render: (value) => (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
            value === "published"
              ? "bg-green-100 text-green-800"
              : value === "draft"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
          }`}
        >
          {value === "published"
            ? "منشور"
            : value === "draft"
              ? "مسودة"
              : "أرشيف"}
        </span>
      ),
    },
    {
      key: "author",
      title: "المؤلف",
      render: (value) => (
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <IconUser className="h-4 w-4 text-gray-400" />
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: "views",
      title: "المشاهدات",
      render: (value) => (
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <IconEye className="h-4 w-4 text-gray-400" />
          <span>{value.toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: "updatedAt",
      title: "آخر تحديث",
      render: (value) => (
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <IconCalendar className="h-4 w-4 text-gray-400" />
          <span>{formatDate(value)}</span>
        </div>
      ),
    },
  ];

  const handleCreate = () => {
    console.log("Create new page");
  };

  const handleEdit = (page) => {
    console.log("Edit page:", page);
  };

  const handleDelete = (page) => {
    console.log("Delete page:", page);
    // Show confirmation dialog
    if (window.confirm(t("messages.deleteConfirm"))) {
      setPages((prev) => prev.filter((p) => p.id !== page.id));
    }
  };

  const handleView = (page) => {
    console.log("View page:", page);
    // Open page in new tab
    window.open(`/${page.slug}`, "_blank");
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
            {t("navigation.pages")}
          </h1>
          <p className="mt-1 text-gray-600">إدارة صفحات الموقع والمحتوى</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center space-x-2 rounded-lg bg-[var(--color-tertiaryColor)] px-4 py-2 text-white transition-colors hover:bg-[var(--color-darkBlueColor)] rtl:space-x-reverse"
        >
          <IconPlus className="h-4 w-4" />
          <span>صفحة جديدة</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                إجمالي الصفحات
              </p>
              <p className="text-2xl font-bold text-gray-900">{pages.length}</p>
            </div>
            <IconFileText className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">منشور</p>
              <p className="text-2xl font-bold text-green-600">
                {pages.filter((p) => p.status === "published").length}
              </p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">مسودات</p>
              <p className="text-2xl font-bold text-yellow-600">
                {pages.filter((p) => p.status === "draft").length}
              </p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                إجمالي المشاهدات
              </p>
              <p className="text-2xl font-bold text-purple-600">
                {pages.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
              </p>
            </div>
            <IconEye className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Pages Table */}
      <Table
        data={pages}
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

export default Pages;
