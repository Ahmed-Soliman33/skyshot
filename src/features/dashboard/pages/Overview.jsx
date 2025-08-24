import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../shared/hooks/useLanguage";
import StatCard from "../../../shared/components/StatCard";
import Chart from "../../../shared/components/Chart";
import { dashboardApi } from "../utils/dashboardApi";
import {
  IconUsers,
  IconShoppingCart,
  IconCurrencyDollar,
  IconEye,
  IconTrendingUp,
  IconCalendar,
  IconClock,
  IconUser,
} from "@tabler/icons-react";

const Overview = () => {
  const { t } = useTranslation("dashboard");
  const { formatNumber, formatCurrency, formatDate } = useLanguage();
  const [loading, setLoading] = useState(true);

  // Load dashboard data from API
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Uncomment these lines when API is ready
        // const statsData = await dashboardApi.getStats();
        // const salesData = await dashboardApi.getSalesData('7d');
        // const activitiesData = await dashboardApi.getRecentActivities(5);

        // For now, simulate loading
        setTimeout(() => setLoading(false), 1500);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Sample statistics data - replace with API calls
  const stats = [
    {
      title: t("stats.totalUsers"),
      value: 12543,
      change: "+12%",
      changeType: "increase",
      icon: IconUsers,
      color: "blue",
    },
    {
      title: t("stats.totalSales"),
      value: 89234,
      change: "+8%",
      changeType: "increase",
      icon: IconCurrencyDollar,
      color: "green",
    },
    {
      title: t("stats.totalOrders"),
      value: 3456,
      change: "+15%",
      changeType: "increase",
      icon: IconShoppingCart,
      color: "purple",
    },
    {
      title: t("stats.siteVisits"),
      value: 45678,
      change: "-3%",
      changeType: "decrease",
      icon: IconEye,
      color: "orange",
    },
  ];

  // Sample chart data - replace with API calls
  const salesData = [
    { name: "يناير", sales: 4000, orders: 240 },
    { name: "فبراير", sales: 3000, orders: 139 },
    { name: "مارس", sales: 2000, orders: 980 },
    { name: "أبريل", sales: 2780, orders: 390 },
    { name: "مايو", sales: 1890, orders: 480 },
    { name: "يونيو", sales: 2390, orders: 380 },
    { name: "يوليو", sales: 3490, orders: 430 },
  ];

  const userGrowthData = [
    { name: "يناير", users: 1000 },
    { name: "فبراير", users: 1200 },
    { name: "مارس", users: 1100 },
    { name: "أبريل", users: 1400 },
    { name: "مايو", users: 1300 },
    { name: "يونيو", users: 1600 },
    { name: "يوليو", users: 1800 },
  ];

  // Sample recent activities - replace with API calls
  const recentActivities = [
    {
      id: 1,
      user: "أحمد محمد",
      action: "قام بإنشاء طلب جديد",
      time: "5 دقائق مضت",
      type: "order",
      avatar: null,
    },
    {
      id: 2,
      user: "فاطمة أحمد",
      action: "قامت بتحديث ملفها الشخصي",
      time: "15 دقيقة مضت",
      type: "profile",
      avatar: null,
    },
    {
      id: 3,
      user: "محمد علي",
      action: "قام بإضافة منتج جديد",
      time: "30 دقيقة مضت",
      type: "product",
      avatar: null,
    },
    {
      id: 4,
      user: "سارة حسن",
      action: "قامت بإلغاء طلب",
      time: "1 ساعة مضت",
      type: "cancel",
      avatar: null,
    },
    {
      id: 5,
      user: "عمر خالد",
      action: "قام بتسجيل الدخول",
      time: "2 ساعة مضت",
      type: "login",
      avatar: null,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("overview")}</h1>
          <p className="mt-1 text-gray-600">
            {formatDate(new Date())} - {t("welcome")} إلى لوحة التحكم
          </p>
        </div>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <button className="rounded-lg bg-[var(--color-tertiaryColor)] px-4 py-2 text-white transition-colors hover:bg-[var(--color-darkBlueColor)]">
            تصدير التقرير
          </button>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={stat.icon}
            color={stat.color}
            loading={loading}
          />
        ))}
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div variants={itemVariants}>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {t("charts.salesOverview")}
              </h3>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="h-3 w-3 rounded-full bg-[var(--color-tertiaryColor)]"></span>
                <span className="text-sm text-gray-600">المبيعات</span>
              </div>
            </div>
            <Chart
              type="area"
              data={salesData}
              dataKey="sales"
              color="var(--color-tertiaryColor)"
              height={300}
              gradient={true}
              loading={loading}
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {t("charts.userGrowth")}
              </h3>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="h-3 w-3 rounded-full bg-[var(--color-darkBlueColor)]"></span>
                <span className="text-sm text-gray-600">المستخدمين</span>
              </div>
            </div>
            <Chart
              type="bar"
              data={userGrowthData}
              dataKey="users"
              color="var(--color-darkBlueColor)"
              height={300}
              loading={loading}
            />
          </div>
        </motion.div>
      </div>

      {/* Recent Activities */}
      <motion.div variants={itemVariants}>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {t("recentActivity")}
            </h3>
            <button className="text-sm text-[var(--color-tertiaryColor)] hover:underline">
              عرض الكل
            </button>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex animate-pulse items-center space-x-4 rtl:space-x-reverse"
                >
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                    <div className="h-3 w-1/2 rounded bg-gray-200"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center space-x-4 rounded-lg p-3 transition-colors hover:bg-gray-50 rtl:space-x-reverse"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[var(--color-tertiaryColor)] to-[var(--color-darkBlueColor)]">
                    <IconUser className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      <span className="font-semibold">{activity.user}</span>{" "}
                      {activity.action}
                    </p>
                    <div className="mt-1 flex items-center space-x-2 rtl:space-x-reverse">
                      <IconClock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      activity.type === "order"
                        ? "bg-green-100 text-green-800"
                        : activity.type === "cancel"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {activity.type === "order"
                      ? "طلب"
                      : activity.type === "cancel"
                        ? "إلغاء"
                        : activity.type === "product"
                          ? "منتج"
                          : activity.type === "profile"
                            ? "ملف شخصي"
                            : "دخول"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Overview;
