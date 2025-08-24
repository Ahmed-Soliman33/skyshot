import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../shared/hooks/useLanguage";
import Table from "../../../shared/components/Table";
import Chart from "../../../shared/components/Chart";
import {
  IconShoppingCart,
  IconUser,
  IconCurrencyDollar,
  IconCalendar,
  IconPackage,
  IconTruck,
  IconCheck,
  IconX,
  IconClock,
  IconTrendingUp,
} from "@tabler/icons-react";

const Orders = () => {
  const { t } = useTranslation("dashboard");
  const { formatDate, formatCurrency } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  // Load orders data from API
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setOrders(dummyOrders);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Sample orders data - replace with API calls
  const dummyOrders = [
    {
      id: "ORD-001",
      customer: "علي أحمد",
      customerEmail: "ali@example.com",
      product: "خدمة التصوير الاحترافي",
      amount: 1500,
      status: "completed",
      paymentStatus: "paid",
      createdAt: "2024-01-20",
      completedAt: "2024-01-22",
      items: 3,
    },
    {
      id: "ORD-002",
      customer: "نورا محمد",
      customerEmail: "nora@example.com",
      product: "باقة التصوير الأساسية",
      amount: 800,
      status: "processing",
      paymentStatus: "paid",
      createdAt: "2024-01-19",
      completedAt: null,
      items: 2,
    },
    {
      id: "ORD-003",
      customer: "خالد سعد",
      customerEmail: "khalid@example.com",
      product: "خدمة المونتاج المتقدم",
      amount: 2200,
      status: "pending",
      paymentStatus: "pending",
      createdAt: "2024-01-18",
      completedAt: null,
      items: 1,
    },
    {
      id: "ORD-004",
      customer: "ريم عبدالله",
      customerEmail: "reem@example.com",
      product: "باقة التصوير المميزة",
      amount: 3500,
      status: "completed",
      paymentStatus: "paid",
      createdAt: "2024-01-17",
      completedAt: "2024-01-20",
      items: 5,
    },
    {
      id: "ORD-005",
      customer: "فهد الحربي",
      customerEmail: "fahd@example.com",
      product: "خدمة التصوير السريع",
      amount: 600,
      status: "cancelled",
      paymentStatus: "refunded",
      createdAt: "2024-01-16",
      completedAt: null,
      items: 1,
    },
    {
      id: "ORD-006",
      customer: "هند العتيبي",
      customerEmail: "hind@example.com",
      product: "باقة التصوير الشاملة",
      amount: 4200,
      status: "processing",
      paymentStatus: "paid",
      createdAt: "2024-01-15",
      completedAt: null,
      items: 7,
    },
  ];

  // Sample chart data for orders over time - replace with API data
  const ordersChartData = [
    { name: "يناير", orders: 45, revenue: 67500 },
    { name: "فبراير", orders: 52, revenue: 78000 },
    { name: "مارس", orders: 48, revenue: 72000 },
    { name: "أبريل", orders: 61, revenue: 91500 },
    { name: "مايو", orders: 55, revenue: 82500 },
    { name: "يونيو", orders: 67, revenue: 100500 },
    { name: "يوليو", orders: 73, revenue: 109500 },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return IconCheck;
      case "processing":
        return IconTruck;
      case "pending":
        return IconClock;
      case "cancelled":
        return IconX;
      default:
        return IconPackage;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "processing":
        return "text-blue-600 bg-blue-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusName = (status) => {
    switch (status) {
      case "completed":
        return "مكتمل";
      case "processing":
        return "قيد التنفيذ";
      case "pending":
        return "في الانتظار";
      case "cancelled":
        return "ملغي";
      default:
        return "غير محدد";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "refunded":
        return "text-red-600 bg-red-100";
      case "failed":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getPaymentStatusName = (status) => {
    switch (status) {
      case "paid":
        return "مدفوع";
      case "pending":
        return "في الانتظار";
      case "refunded":
        return "مسترد";
      case "failed":
        return "فشل";
      default:
        return "غير محدد";
    }
  };

  const columns = [
    {
      key: "id",
      title: "رقم الطلب",
      render: (value, row) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">
            {formatDate(row.createdAt)}
          </div>
        </div>
      ),
    },
    {
      key: "customer",
      title: "العميل",
      render: (value, row) => (
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[var(--color-tertiaryColor)] to-[var(--color-darkBlueColor)]">
            <span className="text-xs font-medium text-white">
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
      key: "product",
      title: "المنتج/الخدمة",
      render: (value, row) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.items} عنصر</div>
        </div>
      ),
    },
    {
      key: "amount",
      title: "المبلغ",
      render: (value) => (
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <IconCurrencyDollar className="h-4 w-4 text-green-500" />
          <span className="font-medium text-gray-900">
            {formatCurrency(value)}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      title: "حالة الطلب",
      render: (value) => {
        const StatusIcon = getStatusIcon(value);
        return (
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <StatusIcon className="h-4 w-4" />
            <span
              className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(value)}`}
            >
              {getStatusName(value)}
            </span>
          </div>
        );
      },
    },
    {
      key: "paymentStatus",
      title: "حالة الدفع",
      render: (value) => (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getPaymentStatusColor(value)}`}
        >
          {getPaymentStatusName(value)}
        </span>
      ),
    },
  ];

  const handleCreate = () => {
    console.log("Create new order");
  };

  const handleEdit = (order) => {
    console.log("Edit order:", order);
  };

  const handleDelete = (order) => {
    console.log("Delete order:", order);
    if (window.confirm(t("messages.deleteConfirm"))) {
      setOrders((prev) => prev.filter((o) => o.id !== order.id));
    }
  };

  const handleView = (order) => {
    console.log("View order:", order);
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
            {t("navigation.orders")}
          </h1>
          <p className="mt-1 text-gray-600">إدارة الطلبات والمبيعات</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center space-x-2 rounded-lg bg-[var(--color-tertiaryColor)] px-4 py-2 text-white transition-colors hover:bg-[var(--color-darkBlueColor)] rtl:space-x-reverse"
        >
          <IconShoppingCart className="h-4 w-4" />
          <span>طلب جديد</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                إجمالي الطلبات
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.length}
              </p>
            </div>
            <IconShoppingCart className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">مكتملة</p>
              <p className="text-2xl font-bold text-green-600">
                {orders.filter((o) => o.status === "completed").length}
              </p>
            </div>
            <IconCheck className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">قيد التنفيذ</p>
              <p className="text-2xl font-bold text-blue-600">
                {orders.filter((o) => o.status === "processing").length}
              </p>
            </div>
            <IconTruck className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                إجمالي الإيرادات
              </p>
              <p className="text-2xl font-bold text-purple-600">
                {formatCurrency(orders.reduce((sum, o) => sum + o.amount, 0))}
              </p>
            </div>
            <IconCurrencyDollar className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                متوسط قيمة الطلب
              </p>
              <p className="text-2xl font-bold text-orange-600">
                {formatCurrency(
                  orders.reduce((sum, o) => sum + o.amount, 0) / orders.length,
                )}
              </p>
            </div>
            <IconTrendingUp className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              الطلبات الشهرية
            </h3>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="h-3 w-3 rounded-full bg-[var(--color-tertiaryColor)]"></span>
              <span className="text-sm text-gray-600">الطلبات</span>
            </div>
          </div>
          <Chart
            type="bar"
            data={ordersChartData}
            dataKey="orders"
            color="var(--color-tertiaryColor)"
            height={300}
            loading={loading}
          />
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              الإيرادات الشهرية
            </h3>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="h-3 w-3 rounded-full bg-[var(--color-darkBlueColor)]"></span>
              <span className="text-sm text-gray-600">الإيرادات</span>
            </div>
          </div>
          <Chart
            type="area"
            data={ordersChartData}
            dataKey="revenue"
            color="var(--color-darkBlueColor)"
            height={300}
            gradient={true}
            loading={loading}
          />
        </div>
      </div>

      {/* Order Status Distribution */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          توزيع حالات الطلبات
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {["completed", "processing", "pending", "cancelled"].map((status) => {
            const count = orders.filter((o) => o.status === status).length;
            const percentage = ((count / orders.length) * 100).toFixed(1);
            const StatusIcon = getStatusIcon(status);

            return (
              <div
                key={status}
                className="flex items-center space-x-3 rounded-lg bg-gray-50 p-4 rtl:space-x-reverse"
              >
                <StatusIcon
                  className={`h-8 w-8 ${getStatusColor(status).split(" ")[0]}`}
                />
                <div>
                  <div className="font-medium text-gray-900">
                    {getStatusName(status)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {count} طلب ({percentage}%)
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Orders Table */}
      <Table
        data={orders}
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

export default Orders;
