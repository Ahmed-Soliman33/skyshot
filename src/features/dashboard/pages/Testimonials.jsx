import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../shared/hooks/useLanguage";
import Table from "../../../shared/components/Table";
import {
  IconStar,
  IconUser,
  IconCalendar,
  IconEye,
  IconThumbUp,
  IconMessage,
  IconBriefcase,
  IconQuote,
} from "@tabler/icons-react";

const Testimonials = () => {
  const { t } = useTranslation("dashboard");
  const { formatDate } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);

  // Load testimonials data from API
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTestimonials(dummyTestimonials);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Sample testimonials data - replace with API calls
  const dummyTestimonials = [
    {
      id: 1,
      customerName: "أحمد محمد",
      customerEmail: "ahmed@example.com",
      customerImage: null,
      rating: 5,
      title: "خدمة ممتازة ونتائج رائعة",
      content:
        "تجربة رائعة مع فريق SkyShot. التصوير كان احترافي جداً والنتائج فاقت توقعاتي. أنصح بشدة بالتعامل معهم.",
      service: "التصوير الاحترافي للمناسبات",
      status: "approved",
      featured: true,
      createdAt: "2024-01-15",
      approvedAt: "2024-01-16",
      likes: 12,
    },
    {
      id: 2,
      customerName: "فاطمة أحمد",
      customerEmail: "fatima@example.com",
      customerImage: null,
      rating: 4,
      title: "جودة عالية وخدمة مميزة",
      content:
        "فريق محترف ومتعاون. الصور جاءت بجودة عالية جداً وفي الوقت المحدد. شكراً لكم على الخدمة الرائعة.",
      service: "جلسة تصوير شخصية",
      status: "approved",
      featured: false,
      createdAt: "2024-01-12",
      approvedAt: "2024-01-13",
      likes: 8,
    },
    {
      id: 3,
      customerName: "خالد سعد",
      customerEmail: "khalid@example.com",
      customerImage: null,
      rating: 5,
      title: "أفضل استوديو تصوير في المنطقة",
      content:
        "تعاملت مع عدة استوديوهات لكن SkyShot هو الأفضل بلا منازع. الإبداع والاحترافية في أعلى مستوياتها.",
      service: "تصوير المنتجات التجارية",
      status: "pending",
      featured: false,
      createdAt: "2024-01-10",
      approvedAt: null,
      likes: 0,
    },
    {
      id: 4,
      customerName: "ريم عبدالله",
      customerEmail: "reem@example.com",
      customerImage: null,
      rating: 5,
      title: "تجربة لا تُنسى",
      content:
        "شكراً لفريق SkyShot على جعل يوم زفافي مميز جداً. الصور والفيديو كانت أكثر من رائعة. تجربة لا تُنسى حقاً.",
      service: "تصوير الزفاف الكامل",
      status: "approved",
      featured: true,
      createdAt: "2024-01-08",
      approvedAt: "2024-01-09",
      likes: 25,
    },
    {
      id: 5,
      customerName: "عمر خالد",
      customerEmail: "omar@example.com",
      customerImage: null,
      rating: 4,
      title: "خدمة سريعة ومتميزة",
      content:
        "سرعة في التنفيذ وجودة في النتائج. الفريق متعاون جداً ويهتم بأدق التفاصيل. أنصح بالتعامل معهم.",
      service: "فيديو ترويجي قصير",
      status: "approved",
      featured: false,
      createdAt: "2024-01-05",
      approvedAt: "2024-01-06",
      likes: 6,
    },
    {
      id: 6,
      customerName: "نورا محمد",
      customerEmail: "nora@example.com",
      customerImage: null,
      rating: 3,
      title: "خدمة جيدة لكن يمكن تحسينها",
      content:
        "الخدمة جيدة بشكل عام لكن كان هناك تأخير في التسليم. النتائج مقبولة لكن توقعت أفضل.",
      service: "جلسة تصوير شخصية",
      status: "rejected",
      featured: false,
      createdAt: "2024-01-03",
      approvedAt: null,
      likes: 0,
    },
  ];

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <IconStar
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "fill-current text-yellow-500" : "text-gray-300"
        }`}
      />
    ));
  };

  const columns = [
    {
      key: "customerName",
      title: "العميل",
      render: (value, row) => (
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[var(--color-tertiaryColor)] to-[var(--color-darkBlueColor)]">
            <span className="text-sm font-medium text-white">
              {value.charAt(0)}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.customerEmail}</div>
          </div>
        </div>
      ),
    },
    {
      key: "title",
      title: "العنوان والمحتوى",
      render: (value, row) => (
        <div className="max-w-xs">
          <div className="mb-1 font-medium text-gray-900">{value}</div>
          <p className="line-clamp-2 text-sm text-gray-600">{row.content}</p>
          <div className="mt-2 flex items-center space-x-2 rtl:space-x-reverse">
            {row.featured && (
              <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                مميز
              </span>
            )}
            <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
              {row.service}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "rating",
      title: "التقييم",
      render: (value, row) => (
        <div>
          <div className="mb-1 flex items-center space-x-1 rtl:space-x-reverse">
            {getRatingStars(value)}
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 rtl:space-x-reverse">
            <IconThumbUp className="h-3 w-3" />
            <span>{row.likes} إعجاب</span>
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
            value === "approved"
              ? "bg-green-100 text-green-800"
              : value === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {value === "approved"
            ? "موافق عليه"
            : value === "pending"
              ? "في الانتظار"
              : "مرفوض"}
        </span>
      ),
    },
    {
      key: "createdAt",
      title: "تاريخ الإنشاء",
      render: (value, row) => (
        <div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <IconCalendar className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{formatDate(value)}</span>
          </div>
          {row.approvedAt && (
            <div className="mt-1 text-xs text-gray-500">
              موافق عليه: {formatDate(row.approvedAt)}
            </div>
          )}
        </div>
      ),
    },
  ];

  const handleCreate = () => {
    console.log("Create new testimonial");
  };

  const handleEdit = (testimonial) => {
    console.log("Edit testimonial:", testimonial);
  };

  const handleDelete = (testimonial) => {
    console.log("Delete testimonial:", testimonial);
    if (window.confirm(t("messages.deleteConfirm"))) {
      setTestimonials((prev) => prev.filter((t) => t.id !== testimonial.id));
    }
  };

  const handleView = (testimonial) => {
    console.log("View testimonial:", testimonial);
  };

  const handleApprove = (id) => {
    setTestimonials((prev) =>
      prev.map((testimonial) =>
        testimonial.id === id
          ? {
              ...testimonial,
              status: "approved",
              approvedAt: new Date().toISOString(),
            }
          : testimonial,
      ),
    );
  };

  const handleReject = (id) => {
    setTestimonials((prev) =>
      prev.map((testimonial) =>
        testimonial.id === id
          ? { ...testimonial, status: "rejected" }
          : testimonial,
      ),
    );
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
            {t("navigation.testimonials")}
          </h1>
          <p className="mt-1 text-gray-600">إدارة آراء العملاء والتقييمات</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center space-x-2 rounded-lg bg-[var(--color-tertiaryColor)] px-4 py-2 text-white transition-colors hover:bg-[var(--color-darkBlueColor)] rtl:space-x-reverse"
        >
          <IconQuote className="h-4 w-4" />
          <span>تقييم جديد</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                إجمالي التقييمات
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {testimonials.length}
              </p>
            </div>
            <IconMessage className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">موافق عليها</p>
              <p className="text-2xl font-bold text-green-600">
                {testimonials.filter((t) => t.status === "approved").length}
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
              <p className="text-sm font-medium text-gray-600">في الانتظار</p>
              <p className="text-2xl font-bold text-yellow-600">
                {testimonials.filter((t) => t.status === "pending").length}
              </p>
            </div>
            <IconClock className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">متوسط التقييم</p>
              <p className="text-2xl font-bold text-purple-600">
                {(
                  testimonials.reduce((sum, t) => sum + t.rating, 0) /
                  testimonials.length
                ).toFixed(1)}
              </p>
            </div>
            <IconStar className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">مميزة</p>
              <p className="text-2xl font-bold text-orange-600">
                {testimonials.filter((t) => t.featured).length}
              </p>
            </div>
            <IconStar className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          توزيع التقييمات
        </h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = testimonials.filter(
              (t) => t.rating === rating,
            ).length;
            const percentage =
              testimonials.length > 0
                ? ((count / testimonials.length) * 100).toFixed(1)
                : 0;

            return (
              <div
                key={rating}
                className="flex items-center space-x-4 rtl:space-x-reverse"
              >
                <div className="flex w-20 items-center space-x-1 rtl:space-x-reverse">
                  <span className="text-sm font-medium">{rating}</span>
                  <IconStar className="h-4 w-4 fill-current text-yellow-500" />
                </div>
                <div className="h-2 flex-1 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-yellow-500 transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="w-16 text-right text-sm text-gray-600">
                  {count} ({percentage}%)
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions for Pending */}
      {testimonials.filter((t) => t.status === "pending").length > 0 && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-yellow-800">
                تقييمات في انتظار الموافقة
              </h3>
              <p className="text-yellow-700">
                لديك {testimonials.filter((t) => t.status === "pending").length}{" "}
                تقييم في انتظار المراجعة والموافقة
              </p>
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse">
              {testimonials
                .filter((t) => t.status === "pending")
                .slice(0, 2)
                .map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="flex space-x-2 rtl:space-x-reverse"
                  >
                    <button
                      onClick={() => handleApprove(testimonial.id)}
                      className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
                    >
                      موافقة
                    </button>
                    <button
                      onClick={() => handleReject(testimonial.id)}
                      className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                    >
                      رفض
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Testimonials Table */}
      <Table
        data={testimonials}
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

export default Testimonials;
