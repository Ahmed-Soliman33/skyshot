import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../shared/hooks/useLanguage";
import {
  IconSettings,
  IconWorld,
  IconSeo,
  IconBrandTiktok,
  IconBrandSnapchat,
  IconMail,
  IconPhone,
  IconMapPin,
  IconRefresh,
  IconEye,
  IconKey,
  IconShield,
  IconBell,
  IconPalette,
} from "@tabler/icons-react";
import { FaSave } from "react-icons/fa";

const Settings = () => {
  const { t } = useTranslation("dashboard");
  const { isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(false);

  // Form states
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "SkyShot",
    siteDescription:
      "منصة التصوير الاحترافي الرائدة في المملكة العربية السعودية",
    contactEmail: "info@skyshot.com",
    contactPhone: "+966501234567",
    address: "الرياض، المملكة العربية السعودية",
    timezone: "Asia/Riyadh",
    language: "ar",
    currency: "SAR",
  });

  const [seoSettings, setSeoSettings] = useState({
    metaTitle: "SkyShot - التصوير الاحترافي",
    metaDescription: "أفضل خدمات التصوير الاحترافي في المملكة العربية السعودية",
    keywords: "تصوير، فوتوغرافي، احترافي، السعودية، SkyShot",
    ogImage: "",
    robotsTxt: "User-agent: *\nDisallow: /admin\nAllow: /",
    sitemap: true,
    analytics: true,
  });

  const [integrationSettings, setIntegrationSettings] = useState({
    tiktokPixel: "",
    snapPixel: "",
    googleAnalytics: "",
    facebookPixel: "",
    whatsappNumber: "+966501234567",
    emailProvider: "smtp",
    smtpHost: "",
    smtpPort: "587",
    smtpUsername: "",
    smtpPassword: "",
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordPolicy: "medium",
    loginAttempts: 5,
    ipWhitelist: "",
    backupFrequency: "daily",
    encryptionLevel: "high",
  });

  const tabs = [
    { id: "general", label: "الإعدادات العامة", icon: IconSettings },
    { id: "seo", label: "إعدادات السيو", icon: IconSeo },
    { id: "integrations", label: "التكاملات", icon: IconWorld },
    { id: "security", label: "الأمان", icon: IconShield },
    { id: "notifications", label: "الإشعارات", icon: IconBell },
  ];

  const handleSave = async (section) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    console.log(`Saved ${section} settings`);
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            اسم الموقع
          </label>
          <input
            type="text"
            value={generalSettings.siteName}
            onChange={(e) =>
              setGeneralSettings({
                ...generalSettings,
                siteName: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            البريد الإلكتروني
          </label>
          <div className="relative">
            <IconMail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400 rtl:right-3" />
            <input
              type="email"
              value={generalSettings.contactEmail}
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  contactEmail: e.target.value,
                })
              }
              className="w-full rounded-lg border border-gray-300 py-2 pr-3 pl-10 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)] rtl:pr-10 rtl:pl-3"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          وصف الموقع
        </label>
        <textarea
          rows={3}
          value={generalSettings.siteDescription}
          onChange={(e) =>
            setGeneralSettings({
              ...generalSettings,
              siteDescription: e.target.value,
            })
          }
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)]"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            رقم الهاتف
          </label>
          <div className="relative">
            <IconPhone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400 rtl:right-3" />
            <input
              type="tel"
              value={generalSettings.contactPhone}
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  contactPhone: e.target.value,
                })
              }
              className="w-full rounded-lg border border-gray-300 py-2 pr-3 pl-10 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)] rtl:pr-10 rtl:pl-3"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            المنطقة الزمنية
          </label>
          <select
            value={generalSettings.timezone}
            onChange={(e) =>
              setGeneralSettings({
                ...generalSettings,
                timezone: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)]"
          >
            <option value="Asia/Riyadh">الرياض (GMT+3)</option>
            <option value="Asia/Dubai">دبي (GMT+4)</option>
            <option value="Europe/London">لندن (GMT+0)</option>
            <option value="America/New_York">نيويورك (GMT-5)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          العنوان
        </label>
        <div className="relative">
          <IconMapPin className="absolute top-3 left-3 h-4 w-4 text-gray-400 rtl:right-3" />
          <textarea
            rows={2}
            value={generalSettings.address}
            onChange={(e) =>
              setGeneralSettings({
                ...generalSettings,
                address: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 py-2 pr-3 pl-10 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)] rtl:pr-10 rtl:pl-3"
          />
        </div>
      </div>
    </div>
  );

  const renderSEOSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          عنوان الميتا
        </label>
        <input
          type="text"
          value={seoSettings.metaTitle}
          onChange={(e) =>
            setSeoSettings({ ...seoSettings, metaTitle: e.target.value })
          }
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)]"
        />
        <p className="mt-1 text-sm text-gray-500">الحد الأقصى 60 حرف</p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          وصف الميتا
        </label>
        <textarea
          rows={3}
          value={seoSettings.metaDescription}
          onChange={(e) =>
            setSeoSettings({ ...seoSettings, metaDescription: e.target.value })
          }
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)]"
        />
        <p className="mt-1 text-sm text-gray-500">الحد الأقصى 160 حرف</p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          الكلمات المفتاحية
        </label>
        <input
          type="text"
          value={seoSettings.keywords}
          onChange={(e) =>
            setSeoSettings({ ...seoSettings, keywords: e.target.value })
          }
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)]"
          placeholder="افصل بين الكلمات بفاصلة"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
          <div>
            <h4 className="font-medium text-gray-900">خريطة الموقع</h4>
            <p className="text-sm text-gray-500">
              تفعيل خريطة الموقع التلقائية
            </p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={seoSettings.sitemap}
              onChange={(e) =>
                setSeoSettings({ ...seoSettings, sitemap: e.target.checked })
              }
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-[var(--color-tertiaryColor)] peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
          <div>
            <h4 className="font-medium text-gray-900">تحليلات جوجل</h4>
            <p className="text-sm text-gray-500">تفعيل تتبع التحليلات</p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={seoSettings.analytics}
              onChange={(e) =>
                setSeoSettings({ ...seoSettings, analytics: e.target.checked })
              }
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-[var(--color-tertiaryColor)] peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderIntegrations = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <IconBrandTiktok className="h-4 w-4" />
              <span>TikTok Pixel</span>
            </div>
          </label>
          <input
            type="text"
            value={integrationSettings.tiktokPixel}
            onChange={(e) =>
              setIntegrationSettings({
                ...integrationSettings,
                tiktokPixel: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)]"
            placeholder="أدخل معرف TikTok Pixel"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <IconBrandSnapchat className="h-4 w-4" />
              <span>Snap Pixel</span>
            </div>
          </label>
          <input
            type="text"
            value={integrationSettings.snapPixel}
            onChange={(e) =>
              setIntegrationSettings({
                ...integrationSettings,
                snapPixel: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)]"
            placeholder="أدخل معرف Snap Pixel"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Google Analytics
          </label>
          <input
            type="text"
            value={integrationSettings.googleAnalytics}
            onChange={(e) =>
              setIntegrationSettings({
                ...integrationSettings,
                googleAnalytics: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)]"
            placeholder="GA-XXXXXXXXX"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Facebook Pixel
          </label>
          <input
            type="text"
            value={integrationSettings.facebookPixel}
            onChange={(e) =>
              setIntegrationSettings({
                ...integrationSettings,
                facebookPixel: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)]"
            placeholder="أدخل معرف Facebook Pixel"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          إعدادات البريد الإلكتروني
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              خادم SMTP
            </label>
            <input
              type="text"
              value={integrationSettings.smtpHost}
              onChange={(e) =>
                setIntegrationSettings({
                  ...integrationSettings,
                  smtpHost: e.target.value,
                })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)]"
              placeholder="smtp.gmail.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              منفذ SMTP
            </label>
            <input
              type="text"
              value={integrationSettings.smtpPort}
              onChange={(e) =>
                setIntegrationSettings({
                  ...integrationSettings,
                  smtpPort: e.target.value,
                })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)]"
              placeholder="587"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
        <div>
          <h4 className="font-medium text-gray-900">المصادقة الثنائية</h4>
          <p className="text-sm text-gray-500">
            تفعيل المصادقة الثنائية لحماية إضافية
          </p>
        </div>
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={securitySettings.twoFactorAuth}
            onChange={(e) =>
              setSecuritySettings({
                ...securitySettings,
                twoFactorAuth: e.target.checked,
              })
            }
            className="peer sr-only"
          />
          <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-[var(--color-tertiaryColor)] peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            مهلة انتهاء الجلسة (دقيقة)
          </label>
          <input
            type="number"
            value={securitySettings.sessionTimeout}
            onChange={(e) =>
              setSecuritySettings({
                ...securitySettings,
                sessionTimeout: parseInt(e.target.value),
              })
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            سياسة كلمة المرور
          </label>
          <select
            value={securitySettings.passwordPolicy}
            onChange={(e) =>
              setSecuritySettings({
                ...securitySettings,
                passwordPolicy: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)]"
          >
            <option value="low">منخفضة</option>
            <option value="medium">متوسطة</option>
            <option value="high">عالية</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          عدد محاولات تسجيل الدخول المسموحة
        </label>
        <input
          type="number"
          value={securitySettings.loginAttempts}
          onChange={(e) =>
            setSecuritySettings({
              ...securitySettings,
              loginAttempts: parseInt(e.target.value),
            })
          }
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)]"
        />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralSettings();
      case "seo":
        return renderSEOSettings();
      case "integrations":
        return renderIntegrations();
      case "security":
        return renderSecuritySettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {t("navigation.settings")}
        </h1>
        <p className="mt-1 text-gray-600">إدارة إعدادات النظام والتكاملات</p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar */}
        <div className="flex-shrink-0 lg:w-64">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors rtl:space-x-reverse ${
                    activeTab === tab.id
                      ? "bg-[var(--color-tertiaryColor)] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {tabs.find((tab) => tab.id === activeTab)?.label}
              </h2>
              <button
                onClick={() => handleSave(activeTab)}
                disabled={loading}
                className="flex items-center space-x-2 rounded-lg bg-[var(--color-tertiaryColor)] px-4 py-2 text-white transition-colors hover:bg-[var(--color-darkBlueColor)] disabled:opacity-50 rtl:space-x-reverse"
              >
                {loading ? (
                  <IconRefresh className="h-4 w-4 animate-spin" />
                ) : (
                  <FaSave className="h-4 w-4" />
                )}
                <span>{loading ? "جاري الحفظ..." : "حفظ التغييرات"}</span>
              </button>
            </div>

            {renderContent()}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
