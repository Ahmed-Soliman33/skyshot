/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // اختصار للمجلد src
      "@components": path.resolve(__dirname, "src/shared/components"),
      "@layouts": path.resolve(__dirname, "src/shared/layouts"),
      "@assets": path.resolve(__dirname, "src/shared/assets"),
      "@hooks": path.resolve(__dirname, "src/shared/hooks"),
      "@utils": path.resolve(__dirname, "src/shared/utils"),
      "@features": path.resolve(__dirname, "src/features"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@store": path.resolve(__dirname, "src/store"),
      "@lib": path.resolve(__dirname, "src/shared/components/lib"),
      "@animations": path.resolve(__dirname, "src/animations"),
    },
  },
  assetsInclude: ["**/*.json"], // تفعيل دعم ملفات JSON
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // تحديد الـ chunks بناءً على المسار
          if (id.includes("locales/ar")) {
            return "i18n-ar"; // يجمع كل ملفات ar في chunk واحد
          }
          if (id.includes("locales/en")) {
            return "i18n-en"; // يجمع كل ملفات en في chunk واحد
          }
        },
      },
    },
  },
   server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
