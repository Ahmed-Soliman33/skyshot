import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../shared/hooks/useLanguage";
import Table from "../../../shared/components/Table";
import {
  IconBrandBlogger,
  IconEye,
  IconHeart,
  IconMessage,
  IconCalendar,
  IconUser,
  IconTag,
} from "@tabler/icons-react";

const Blog = () => {
  const { t } = useTranslation("dashboard");
  const { formatDate } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  // Load blog posts from API
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setPosts(dummyPosts);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Sample blog posts data - replace with API calls
  const dummyPosts = [
    {
      id: 1,
      title: "كيفية تطوير تطبيقات الويب الحديثة",
      slug: "modern-web-development",
      excerpt: "دليل شامل لتطوير تطبيقات الويب باستخدام أحدث التقنيات",
      status: "published",
      author: "أحمد محمد",
      category: "تطوير",
      tags: ["React", "JavaScript", "تطوير الويب"],
      createdAt: "2024-01-15",
      publishedAt: "2024-01-16",
      views: 2340,
      likes: 45,
      comments: 12,
      featured: true,
    },
    {
      id: 2,
      title: "أفضل ممارسات تصميم واجهات المستخدم",
      slug: "ui-design-best-practices",
      excerpt: "نصائح وإرشادات لتصميم واجهات مستخدم جذابة وسهلة الاستخدام",
      status: "published",
      author: "فاطمة أحمد",
      category: "تصميم",
      tags: ["UI/UX", "تصميم", "واجهات المستخدم"],
      createdAt: "2024-01-12",
      publishedAt: "2024-01-13",
      views: 1890,
      likes: 38,
      comments: 8,
      featured: false,
    },
    {
      id: 3,
      title: "مقدمة في الذكاء الاصطناعي",
      slug: "introduction-to-ai",
      excerpt: "استكشاف عالم الذكاء الاصطناعي وتطبيقاته في الحياة العملية",
      status: "draft",
      author: "محمد علي",
      category: "تقنية",
      tags: ["AI", "ذكاء اصطناعي", "تقنية"],
      createdAt: "2024-01-10",
      publishedAt: null,
      views: 0,
      likes: 0,
      comments: 0,
      featured: false,
    },
    {
      id: 4,
      title: "أمان تطبيقات الويب",
      slug: "web-application-security",
      excerpt: "كيفية حماية تطبيقات الويب من التهديدات الأمنية الشائعة",
      status: "published",
      author: "سارة حسن",
      category: "أمان",
      tags: ["أمان", "حماية", "تطبيقات الويب"],
      createdAt: "2024-01-08",
      publishedAt: "2024-01-09",
      views: 1567,
      likes: 29,
      comments: 15,
      featured: true,
    },
    {
      id: 5,
      title: "تحسين أداء المواقع الإلكترونية",
      slug: "website-performance-optimization",
      excerpt: "استراتيجيات وتقنيات لتحسين سرعة وأداء المواقع الإلكترونية",
      status: "scheduled",
      author: "عمر خالد",
      category: "تحسين",
      tags: ["أداء", "تحسين", "سرعة"],
      createdAt: "2024-01-14",
      publishedAt: "2024-01-25",
      views: 0,
      likes: 0,
      comments: 0,
      featured: false,
    },
  ];

  const columns = [
    {
      key: "title",
      title: "العنوان",
      render: (value, row) => (
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
          <IconBrandBlogger className="mt-1 h-5 w-5 text-gray-400" />
          <div className="flex-1">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="font-medium text-gray-900">{value}</span>
              {row.featured && (
                <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                  مميز
                </span>
              )}
            </div>
            <div className="mt-1 text-sm text-gray-500">{row.excerpt}</div>
            <div className="mt-2 flex items-center space-x-2 rtl:space-x-reverse">
              {row.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700"
                >
                  {tag}
                </span>
              ))}
              {row.tags.length > 2 && (
                <span className="text-xs text-gray-500">
                  +{row.tags.length - 2}
                </span>
              )}
            </div>
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
                : value === "scheduled"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
          }`}
        >
          {value === "published"
            ? "منشور"
            : value === "draft"
              ? "مسودة"
              : value === "scheduled"
                ? "مجدول"
                : "أرشيف"}
        </span>
      ),
    },
    {
      key: "author",
      title: "الكاتب",
      render: (value, row) => (
        <div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <IconUser className="h-4 w-4 text-gray-400" />
            <span className="font-medium">{value}</span>
          </div>
          <div className="text-sm text-gray-500">{row.category}</div>
        </div>
      ),
    },
    {
      key: "engagement",
      title: "التفاعل",
      render: (value, row) => (
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-sm rtl:space-x-reverse">
            <IconEye className="h-4 w-4 text-gray-400" />
            <span>{row.views.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-4 text-sm rtl:space-x-reverse">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <IconHeart className="h-4 w-4 text-red-400" />
              <span>{row.likes}</span>
            </div>
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <IconMessage className="h-4 w-4 text-blue-400" />
              <span>{row.comments}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "publishedAt",
      title: "تاريخ النشر",
      render: (value, row) => (
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <IconCalendar className="h-4 w-4 text-gray-400" />
          <span className="text-sm">
            {value ? formatDate(value) : "غير منشور"}
          </span>
        </div>
      ),
    },
  ];

  const handleCreate = () => {
    console.log("Create new blog post");
  };

  const handleEdit = (post) => {
    console.log("Edit post:", post);
  };

  const handleDelete = (post) => {
    console.log("Delete post:", post);
    if (window.confirm(t("messages.deleteConfirm"))) {
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    }
  };

  const handleView = (post) => {
    console.log("View post:", post);
    window.open(`/blog/${post.slug}`, "_blank");
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
            {t("navigation.blog")}
          </h1>
          <p className="mt-1 text-gray-600">
            إدارة مقالات المدونة والمحتوى التعليمي
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center space-x-2 rounded-lg bg-[var(--color-tertiaryColor)] px-4 py-2 text-white transition-colors hover:bg-[var(--color-darkBlueColor)] rtl:space-x-reverse"
        >
          <IconBrandBlogger className="h-4 w-4" />
          <span>مقال جديد</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                إجمالي المقالات
              </p>
              <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
            </div>
            <IconBrandBlogger className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">منشور</p>
              <p className="text-2xl font-bold text-green-600">
                {posts.filter((p) => p.status === "published").length}
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
              <p className="text-sm font-medium text-gray-600">
                إجمالي المشاهدات
              </p>
              <p className="text-2xl font-bold text-purple-600">
                {posts.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
              </p>
            </div>
            <IconEye className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                إجمالي الإعجابات
              </p>
              <p className="text-2xl font-bold text-red-600">
                {posts.reduce((sum, p) => sum + p.likes, 0)}
              </p>
            </div>
            <IconHeart className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                إجمالي التعليقات
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {posts.reduce((sum, p) => sum + p.comments, 0)}
              </p>
            </div>
            <IconMessage className="h-8 w-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Blog Posts Table */}
      <Table
        data={posts}
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

export default Blog;
