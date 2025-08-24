import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../shared/hooks/useLanguage";
import Table from "../../../shared/components/Table";
import {
  IconUserCheck,
  IconMail,
  IconPhone,
  IconCalendar,
  IconMapPin,
  IconCurrencyDollar,
  IconShoppingCart,
  IconStar,
  IconTrendingUp,
  IconUsers,
} from "@tabler/icons-react";

const Customers = () => {
  const { t } = useTranslation("dashboard");
  const { formatDate, formatCurrency } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);

  // Load customers data from API
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setCustomers(dummyCustomers);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Sample customers data - replace with API calls
  const dummyCustomers = [
    {
      id: 1,
      name: "علي أحمد",
      email: "ali@example.com",
      phone: "+966501234567",
      location: "الرياض، السعودية",
      plan: "premium",
      status: "active",
      totalSpent: 2500,
      totalOrders: 12,
      rating: 4.8,
      joinedAt: "2023-03-15",
      lastOrder: "2024-01-18",
      avatar: null,
    },
    {
      id: 2,
      name: "نورا محمد",
      email: "nora@example.com",
      phone: "+966507654321",
      location: "جدة، السعودية",
      plan: "basic",
      status: "active",
      totalSpent: 890,
      totalOrders: 5,
      rating: 4.5,
      joinedAt: "2023-06-20",
      lastOrder: "2024-01-15",
      avatar: null,
    },
    {
      id: 3,
      name: "خالد سعد",
      email: "khalid@example.com",
      phone: "+966509876543",
      location: "الدمام، السعودية",
      plan: "standard",
      status: "inactive",
      totalSpent: 1200,
      totalOrders: 8,
      rating: 4.2,
      joinedAt: "2023-08-10",
      lastOrder: "2023-12-20",
      avatar: null,
    },
    {
      id: 4,
      name: "ريم عبدالله",
      email: "reem@example.com",
      phone: "+966502468135",
      location: "مكة، السعودية",
      plan: "premium",
      status: "active",
      totalSpent: 3200,
      totalOrders: 18,
      rating: 4.9,
      joinedAt: "2023-01-05",
      lastOrder: "2024-01-20",
      avatar: null,
    },
    {
      id: 5,
      name: "فهد الحربي",
      email: "fahd@example.com",
      phone: "+966508642097",
      location: "المدينة، السعودية",
      plan: "basic",
      status: "suspended",
      totalSpent: 450,
      totalOrders: 3,
      rating: 3.8,
      joinedAt: "2023-11-12",
      lastOrder: "2024-01-05",
      avatar: null,
    },
    {
      id: 6,
      name: "هند العتيبي",
      email: "hind@example.com",
      phone: "+966505555555",
      location: "الطائف، السعودية",
      plan: "standard",
      status: "active",
      totalSpent: 1800,
      totalOrders: 11,
      rating: 4.6,
      joinedAt: "2023-04-22",
      lastOrder: "2024-01-17",
      avatar: null,
    },
  ];

  const getPlanColor = (plan) => {
    switch (plan) {
      case "premium":
        return "text-yellow-600 bg-yellow-100";
      case "standard":
        return "text-blue-600 bg-blue-100";
      case "basic":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getPlanName = (plan) => {
    switch (plan) {
      case "premium":
        return "مميز";
      case "standard":
        return "قياسي";
      case "basic":
        return "أساسي";
      default:
        return "غير محدد";
    }
  };

  const columns = [
    {
      key: "name",
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
            <div className="flex items-center space-x-2 text-sm text-gray-500 rtl:space-x-reverse">
              <IconMail className="h-3 w-3" />
              <span>{row.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 rtl:space-x-reverse">
              <IconMapPin className="h-3 w-3" />
              <span>{row.location}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "plan",
      title: "الخطة",
      render: (value) => (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getPlanColor(value)}`}
        >
          {getPlanName(value)}
        </span>
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
      key: "totalSpent",
      title: "إجمالي الإنفاق",
      render: (value, row) => (
        <div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <IconCurrencyDollar className="h-4 w-4 text-green-500" />
            <span className="font-medium text-gray-900">
              {formatCurrency(value)}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 rtl:space-x-reverse">
            <IconShoppingCart className="h-3 w-3" />
            <span>{row.totalOrders} طلب</span>
          </div>
        </div>
      ),
    },
    {
      key: "rating",
      title: "التقييم",
      render: (value) => (
        <div className="flex items-center space-x-1 rtl:space-x-reverse">
          <IconStar className="h-4 w-4 fill-current text-yellow-500" />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: "lastOrder",
      title: "آخر طلب",
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
    console.log("Create new customer");
  };

  const handleEdit = (customer) => {
    console.log("Edit customer:", customer);
  };

  const handleDelete = (customer) => {
    console.log("Delete customer:", customer);
    if (window.confirm(t("messages.deleteConfirm"))) {
      setCustomers((prev) => prev.filter((c) => c.id !== customer.id));
    }
  };

  const handleView = (customer) => {
    console.log("View customer:", customer);
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
            {t("navigation.customers")}
          </h1>
          <p className="mt-1 text-gray-600">إدارة العملاء والمشتركين</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center space-x-2 rounded-lg bg-[var(--color-tertiaryColor)] px-4 py-2 text-white transition-colors hover:bg-[var(--color-darkBlueColor)] rtl:space-x-reverse"
        >
          <IconUserCheck className="h-4 w-4" />
          <span>عميل جديد</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                إجمالي العملاء
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {customers.length}
              </p>
            </div>
            <IconUsers className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">عملاء نشطين</p>
              <p className="text-2xl font-bold text-green-600">
                {customers.filter((c) => c.status === "active").length}
              </p>
            </div>
            <IconUserCheck className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                إجمالي الإيرادات
              </p>
              <p className="text-2xl font-bold text-purple-600">
                {formatCurrency(
                  customers.reduce((sum, c) => sum + c.totalSpent, 0),
                )}
              </p>
            </div>
            <IconCurrencyDollar className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                إجمالي الطلبات
              </p>
              <p className="text-2xl font-bold text-orange-600">
                {customers.reduce((sum, c) => sum + c.totalOrders, 0)}
              </p>
            </div>
            <IconShoppingCart className="h-8 w-8 text-orange-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">متوسط التقييم</p>
              <p className="text-2xl font-bold text-yellow-600">
                {(
                  customers.reduce((sum, c) => sum + c.rating, 0) /
                  customers.length
                ).toFixed(1)}
              </p>
            </div>
            <IconStar className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Customer Insights */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            توزيع الخطط
          </h3>
          <div className="space-y-3">
            {["premium", "standard", "basic"].map((plan) => {
              const count = customers.filter((c) => c.plan === plan).length;
              const percentage = ((count / customers.length) * 100).toFixed(1);
              return (
                <div key={plan} className="flex items-center justify-between">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${getPlanColor(plan)}`}
                  >
                    {getPlanName(plan)}
                  </span>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm text-gray-600">{count}</span>
                    <span className="text-xs text-gray-500">
                      ({percentage}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            أفضل العملاء
          </h3>
          <div className="space-y-3">
            {customers
              .sort((a, b) => b.totalSpent - a.totalSpent)
              .slice(0, 3)
              .map((customer, index) => (
                <div
                  key={customer.id}
                  className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      index === 0
                        ? "bg-yellow-100 text-yellow-800"
                        : index === 1
                          ? "bg-gray-100 text-gray-800"
                          : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{customer.name}</div>
                    <div className="text-xs text-gray-500">
                      {formatCurrency(customer.totalSpent)}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            إحصائيات سريعة
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">متوسط الإنفاق</span>
              <span className="font-medium">
                {formatCurrency(
                  customers.reduce((sum, c) => sum + c.totalSpent, 0) /
                    customers.length,
                )}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">متوسط الطلبات</span>
              <span className="font-medium">
                {(
                  customers.reduce((sum, c) => sum + c.totalOrders, 0) /
                  customers.length
                ).toFixed(1)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">عملاء جدد هذا الشهر</span>
              <span className="font-medium text-green-600">
                +
                {
                  customers.filter(
                    (c) => new Date(c.joinedAt) > new Date("2024-01-01"),
                  ).length
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <Table
        data={customers}
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

export default Customers;
