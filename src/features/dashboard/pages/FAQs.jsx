import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../shared/hooks/useLanguage";
import Table from "../../../shared/components/Table";
import {
  IconHelp,
  IconChevronDown,
  IconChevronUp,
  IconEye,
  IconCalendar,
  IconTag,
  IconSearch,
  IconPlus,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";

const FAQs = () => {
  const { t } = useTranslation("dashboard");
  const { formatDate } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [faqs, setFaqs] = useState([]);
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Load FAQs data from API
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setFaqs(dummyFaqs);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Sample FAQs data - replace with API calls
  const dummyFaqs = [
    {
      id: 1,
      question: "ما هي أسعار خدمات التصوير؟",
      answer:
        "تختلف أسعار خدمات التصوير حسب نوع الخدمة والمدة والموقع. يمكنك الاطلاع على قائمة الأسعار في صفحة الخدمات أو التواصل معنا للحصول على عرض سعر مخصص.",
      category: "الأسعار",
      status: "published",
      views: 245,
      helpful: 89,
      notHelpful: 12,
      createdAt: "2023-12-15",
      updatedAt: "2024-01-10",
      order: 1,
    },
    {
      id: 2,
      question: "كم يستغرق تسليم الصور بعد التصوير؟",
      answer:
        "عادة ما نقوم بتسليم الصور المعدلة خلال 3-7 أيام عمل من تاريخ التصوير، حسب حجم المشروع ونوع التعديل المطلوب. للمشاريع العاجلة، يمكننا تقديم خدمة التسليم السريع مقابل رسوم إضافية.",
      category: "التسليم",
      status: "published",
      views: 189,
      helpful: 76,
      notHelpful: 8,
      createdAt: "2023-12-10",
      updatedAt: "2024-01-08",
      order: 2,
    },
    {
      id: 3,
      question: "هل يمكنني إلغاء أو تعديل موعد التصوير؟",
      answer:
        "نعم، يمكنك إلغاء أو تعديل موعد التصوير قبل 48 ساعة على الأقل من الموعد المحدد دون أي رسوم إضافية. في حالة الإلغاء أو التعديل خلال 48 ساعة، قد تطبق رسوم إلغاء.",
      category: "الحجز",
      status: "published",
      views: 156,
      helpful: 62,
      notHelpful: 15,
      createdAt: "2023-12-05",
      updatedAt: "2024-01-05",
      order: 3,
    },
    {
      id: 4,
      question: "ما هي المعدات المستخدمة في التصوير؟",
      answer:
        "نستخدم أحدث معدات التصوير الاحترافية من كاميرات Canon وNikon وSony، بالإضافة إلى عدسات متنوعة وأنظمة إضاءة احترافية. جميع معداتنا يتم صيانتها بانتظام لضمان أفضل جودة.",
      category: "المعدات",
      status: "published",
      views: 134,
      helpful: 58,
      notHelpful: 6,
      createdAt: "2023-11-28",
      updatedAt: "2024-01-03",
      order: 4,
    },
    {
      id: 5,
      question: "هل تقدمون خدمات التصوير خارج المدينة؟",
      answer:
        "نعم، نقدم خدمات التصوير في جميع أنحاء المملكة العربية السعودية. قد تطبق رسوم إضافية للسفر والإقامة حسب المسافة والمدة. يرجى التواصل معنا لمناقشة التفاصيل والحصول على عرض سعر.",
      category: "الخدمات",
      status: "draft",
      views: 0,
      helpful: 0,
      notHelpful: 0,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
      order: 5,
    },
    {
      id: 6,
      question: "كيف يمكنني حجز جلسة تصوير؟",
      answer:
        "يمكنك حجز جلسة تصوير من خلال موقعنا الإلكتروني أو التواصل معنا مباشرة عبر الهاتف أو WhatsApp. سنحتاج لمناقشة تفاصيل المشروع وتحديد الموعد المناسب لك.",
      category: "الحجز",
      status: "published",
      views: 298,
      helpful: 112,
      notHelpful: 9,
      createdAt: "2023-11-20",
      updatedAt: "2024-01-01",
      order: 6,
    },
  ];

  const columns = [
    {
      key: "question",
      title: "السؤال",
      render: (value, row) => (
        <div className="max-w-md">
          <div className="mb-1 font-medium text-gray-900">{value}</div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
              {row.category}
            </span>
            <span className="text-xs text-gray-500">ترتيب: {row.order}</span>
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
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {value === "published" ? "منشور" : "مسودة"}
        </span>
      ),
    },
    {
      key: "views",
      title: "الإحصائيات",
      render: (value, row) => (
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-sm rtl:space-x-reverse">
            <IconEye className="h-4 w-4 text-gray-400" />
            <span>{value} مشاهدة</span>
          </div>
          <div className="flex items-center space-x-4 text-sm rtl:space-x-reverse">
            <span className="text-green-600">👍 {row.helpful}</span>
            <span className="text-red-600">👎 {row.notHelpful}</span>
          </div>
        </div>
      ),
    },
    {
      key: "updatedAt",
      title: "آخر تحديث",
      render: (value) => (
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <IconCalendar className="h-4 w-4 text-gray-400" />
          <span className="text-sm">{formatDate(value)}</span>
        </div>
      ),
    },
  ];

  const handleCreate = () => {
    console.log("Create new FAQ");
  };

  const handleEdit = (faq) => {
    console.log("Edit FAQ:", faq);
  };

  const handleDelete = (faq) => {
    console.log("Delete FAQ:", faq);
    if (window.confirm(t("messages.deleteConfirm"))) {
      setFaqs((prev) => prev.filter((f) => f.id !== faq.id));
    }
  };

  const handleView = (faq) => {
    console.log("View FAQ:", faq);
  };

  const toggleExpanded = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const FAQPreview = ({ faq }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4 rounded-lg border border-gray-200 bg-white p-4"
    >
      <button
        onClick={() => toggleExpanded(faq.id)}
        className="flex w-full items-center justify-between text-left"
      >
        <h3 className="font-medium text-gray-900">{faq.question}</h3>
        {expandedFaq === faq.id ? (
          <IconChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <IconChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>

      <AnimatePresence>
        {expandedFaq === faq.id && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 border-t border-gray-100 pt-4">
              <p className="mb-4 text-gray-600">{faq.answer}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
                    {faq.category}
                  </span>
                  <span>{faq.views} مشاهدة</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <button
                    onClick={() => handleEdit(faq)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <IconEdit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(faq)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <IconTrash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="mb-4 h-8 w-1/4 rounded bg-gray-200"></div>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 rounded bg-gray-200"></div>
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
            {t("navigation.faqs")}
          </h1>
          <p className="mt-1 text-gray-600">إدارة الأسئلة الشائعة والإجابات</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center space-x-2 rounded-lg bg-[var(--color-tertiaryColor)] px-4 py-2 text-white transition-colors hover:bg-[var(--color-darkBlueColor)] rtl:space-x-reverse"
        >
          <IconHelp className="h-4 w-4" />
          <span>سؤال جديد</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                إجمالي الأسئلة
              </p>
              <p className="text-2xl font-bold text-gray-900">{faqs.length}</p>
            </div>
            <IconHelp className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">منشورة</p>
              <p className="text-2xl font-bold text-green-600">
                {faqs.filter((f) => f.status === "published").length}
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
                {faqs.reduce((sum, f) => sum + f.views, 0).toLocaleString()}
              </p>
            </div>
            <IconEye className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">معدل الفائدة</p>
              <p className="text-2xl font-bold text-orange-600">
                {faqs.length > 0
                  ? (
                      (faqs.reduce((sum, f) => sum + f.helpful, 0) /
                        faqs.reduce(
                          (sum, f) => sum + f.helpful + f.notHelpful,
                          0,
                        )) *
                      100
                    ).toFixed(1)
                  : 0}
                %
              </p>
            </div>
            <IconTag className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">الفئات</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          {["الأسعار", "التسليم", "الحجز", "المعدات", "الخدمات"].map(
            (category) => {
              const count = faqs.filter((f) => f.category === category).length;
              const views = faqs
                .filter((f) => f.category === category)
                .reduce((sum, f) => sum + f.views, 0);

              return (
                <div
                  key={category}
                  className="rounded-lg bg-gray-50 p-4 text-center"
                >
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[var(--color-tertiaryColor)] to-[var(--color-darkBlueColor)]">
                    <IconHelp className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-medium text-gray-900">{category}</h4>
                  <p className="text-sm text-gray-500">{count} سؤال</p>
                  <p className="text-xs text-gray-400">{views} مشاهدة</p>
                </div>
              );
            },
          )}
        </div>
      </div>

      {/* FAQ Preview */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          معاينة الأسئلة الشائعة
        </h3>
        <div className="space-y-4">
          {faqs
            .filter((faq) => faq.status === "published")
            .sort((a, b) => a.order - b.order)
            .slice(0, 5)
            .map((faq) => (
              <FAQPreview key={faq.id} faq={faq} />
            ))}
        </div>
      </div>

      {/* FAQs Table */}
      <Table
        data={faqs}
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

export default FAQs;
