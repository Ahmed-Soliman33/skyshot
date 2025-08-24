import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi) // Load translations via HTTP
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    // Language settings
    fallbackLng: "en", // Fallback language
    supportedLngs: ["en", "ar"], // Supported languages

    // Namespace configuration
    ns: [
      "common",
      "home",
      "about",
      "services",
      "gallery",
      "contact",
      "blog",
      "faq",
      "testimonials",
      "footer",
      "dashboard",
      "auth",
    ], // Available namespaces
    defaultNS: "common", // Default namespace
    fallbackNS: "common", // Fallback namespace

    // Backend configuration for loading translation files
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Path pattern for translation files
      requestOptions: {
        cache: "default", // Enable caching for better performance
      },
      crossDomain: true,
      withCredentials: false,
    },

    // Language detection configuration
    detection: {
      order: ["cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["cookie"],
      lookupCookie: "i18next",
      cookieOptions: {
        path: "/",
        sameSite: "strict",
        secure: false,
        maxAge: 31536000,
      },
    },

    // React-specific configuration
    react: {
      useSuspense: true, // Enable Suspense for async loading
      bindI18n: "languageChanged loaded",
      bindI18nStore: "added removed",
    },

    // Interpolation settings
    interpolation: {
      escapeValue: false, // React already escapes values
    },

    // Load namespaces on demand
    load: "languageOnly", // Load only language without region (en instead of en-US)
    preload: ["en", "ar"], // Preload these languages

    // Namespace loading strategy
    partialBundledLanguages: true, // Allow partial loading of namespaces
  });

// Helper function to change language and update document direction
export const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
  document.documentElement.lang = lng;
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
};

// Helper function to load additional namespaces dynamically
export const loadNamespace = (namespace) => {
  return i18n.loadNamespaces(namespace);
};

// Helper function to get current language direction
export const getLanguageDirection = () => {
  return i18n.language === "ar" ? "rtl" : "ltr";
};

export default i18n;
