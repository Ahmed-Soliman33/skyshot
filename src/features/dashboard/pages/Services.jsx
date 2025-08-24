import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../shared/hooks/useLanguage";
import Table from "../../../shared/components/Table";
import {
  IconBriefcase,
  IconCurrencyDollar,
  IconClock,
  IconStar,
  IconEye,
  IconUsers,
  IconCalendar,
  IconPhoto,
  IconVideo,
  IconEdit,
} from "@tabler/icons-react";

const Services = () => {
  const { t } = useTranslation("dashboard");
  const { formatDate, formatCurrency } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);

  // Load services data from API
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setServices(dummyServices);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Sample services data - replace with API calls
  const dummyServices = [
    {
      id: 1,
      name: "التصوير الاحترافي للمناسبات",
      description: "خدمة تصوير احترافية للمناسبات الخاصة والفعاليات",
      category: "تصوير",
      price: 1500,
      duration: "4 ساعات",
      status: "active",
      rating: 4.8,
      totalBookings: 45,
      createdAt: "2023-06-15",
      image: "https://via.placeholder.com/100x100/032747/ffffff?text=Event",
      features: ["تصوير عالي الجودة", "معدات احترافية", "مصور خبير"],
    },
    {
      id: 2,
      name: "جلسة تصوير شخصية",
      description: "جلسة تصوير شخصية في الاستوديو أو في الموقع",
      category: "تصوير",
      price: 800,
      duration: "2 ساعة",
      status: "active",
      rating: 4.9,
      totalBookings: 78,
      createdAt: "2023-07-20",
      image: "https://via.placeholder.com/100x100/001d3d/ffffff?text=Portrait",
      features: ["تصوير شخصي", "تعديل الصور", "طباعة مجانية"],
    },
    {
      id: 3,
      name: "تصوير المنتجات التجارية",
      description: "تصوير احترافي للمنتجات للاستخدام التجاري والتسويقي",
      category: "تجاري",
      price: 1200,
      duration: "3 ساعات",
      status: "active",
      rating: 4.7,
      totalBookings: 32,
      createdAt: "2023-08-10",
      image: "https://via.placeholder.com/100x100/343a40/ffffff?text=Product",
      features: ["إضاءة احترافية", "خلفيات متنوعة", "تعديل متقدم"],
    },
    {
      id: 4,
      name: "فيديو ترويجي قصير",
      description: "إنتاج فيديو ترويجي قصير للشركات والمنتجات",
      category: "فيديو",
      price: 2500,
      duration: "1 يوم",
      status: "active",
      rating: 4.6,
      totalBookings: 18,
      createdAt: "2023-09-05",
      image: "https://via.placeholder.com/100x100/6a7282/ffffff?text=Video",
      features: ["سيناريو مخصص", "مونتاج احترافي", "موسيقى تصويرية"],
    },
    {
      id: 5,
      name: "تصوير الزفاف الكامل",
      description: "تغطية كاملة لحفل الزفاف من البداية للنهاية",
      category: "زفاف",
      price: 4500,
      duration: "8 ساعات",
      status: "inactive",
      rating: 4.9,
      totalBookings: 25,
      createdAt: "2023-05-12",
      image: "https://via.placeholder.com/100x100/032747/ffffff?text=Wedding",
      features: ["فريق كامل", "تصوير وفيديو", "ألبوم مطبوع"],
    },
  ];

  const columns = [
    {
      key: "name",
      title: "الخدمة",
      render: (value, row) => (
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src={row.image}
            alt={value}
            className="h-12 w-12 rounded-lg object-cover"
          />
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.category}</div>
          </div>
        </div>
      ),
    },
    {
      key: "description",
      title: "الوصف",
      render: (value) => (
        <div className="max-w-xs">
          <p className="truncate text-sm text-gray-600">{value}</p>
        </div>
      ),
    },
    {
      key: "price",
      title: "السعر",
      render: (value, row) => (
        <div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <IconCurrencyDollar className="h-4 w-4 text-green-500" />
            <span className="font-medium text-gray-900">
              {formatCurrency(value)}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 rtl:space-x-reverse">
            <IconClock className="h-3 w-3" />
            <span>{row.duration}</span>
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
            value === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {value === "active" ? "نشط" : "غير نشط"}
        </span>
      ),
    },
    {
      key: "rating",
      title: "التقييم",
      render: (value, row) => (
        <div>
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <IconStar className="h-4 w-4 fill-current text-yellow-500" />
            <span className="font-medium">{value}</span>
          </div>
          <div className="text-sm text-gray-500">{row.totalBookings} حجز</div>
        </div>
      ),
    },
    {
      key: "createdAt",
      title: "تاريخ الإنشاء",
      render: (value) => (
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <IconCalendar className="h-4 w-4 text-gray-400" />
          <span className="text-sm">{formatDate(value)}</span>
        </div>
      ),
    },
  ];

  const handleCreate = () => {
    console.log("Create new service");
  };

  const handleEdit = (service) => {
    console.log("Edit service:", service);
  };

  const handleDelete = (service) => {
    console.log("Delete service:", service);
    if (window.confirm(t("messages.deleteConfirm"))) {
      setServices((prev) => prev.filter((s) => s.id !== service.id));
    }
  };

  const handleView = (service) => {
    console.log("View service:", service);
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
            {t("navigation.services")}
          </h1>
          <p className="mt-1 text-gray-600">إدارة الخدمات والباقات المقدمة</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center space-x-2 rounded-lg bg-[var(--color-tertiaryColor)] px-4 py-2 text-white transition-colors hover:bg-[var(--color-darkBlueColor)] rtl:space-x-reverse"
        >
          <IconBriefcase className="h-4 w-4" />
          <span>خدمة جديدة</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                إجمالي الخدمات
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {services.length}
              </p>
            </div>
            <IconBriefcase className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">خدمات نشطة</p>
              <p className="text-2xl font-bold text-green-600">
                {services.filter((s) => s.status === "active").length}
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
                إجمالي الحجوزات
              </p>
              <p className="text-2xl font-bold text-purple-600">
                {services.reduce((sum, s) => sum + s.totalBookings, 0)}
              </p>
            </div>
            <IconUsers className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">متوسط التقييم</p>
              <p className="text-2xl font-bold text-yellow-600">
                {(
                  services.reduce((sum, s) => sum + s.rating, 0) /
                  services.length
                ).toFixed(1)}
              </p>
            </div>
            <IconStar className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Service Categories */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          توزيع الخدمات حسب الفئة
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {["تصوير", "فيديو", "تجاري", "زفاف"].map((category) => {
            const count = services.filter(
              (s) => s.category === category,
            ).length;
            const percentage = ((count / services.length) * 100).toFixed(1);

            return (
              <div
                key={category}
                className="flex items-center space-x-3 rounded-lg bg-gray-50 p-4 rtl:space-x-reverse"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-[var(--color-tertiaryColor)] to-[var(--color-darkBlueColor)]">
                  {category === "تصوير" && (
                    <IconPhoto className="h-5 w-5 text-white" />
                  )}
                  {category === "فيديو" && (
                    <IconVideo className="h-5 w-5 text-white" />
                  )}
                  {category === "تجاري" && (
                    <IconBriefcase className="h-5 w-5 text-white" />
                  )}
                  {category === "زفاف" && (
                    <IconStar className="h-5 w-5 text-white" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{category}</div>
                  <div className="text-sm text-gray-500">
                    {count} خدمة ({percentage}%)
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Services Table */}
      <Table
        data={services}
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

export default Services;
