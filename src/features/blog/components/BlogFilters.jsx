import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FiSearch,
  FiX,
  FiTrendingUp
} from "react-icons/fi";

const BlogFilters = ({
  searchQuery,
  setSearchQuery,
  resultsCount
}) => {
  const { t , i18n } = useTranslation("blog");
  const dir = i18n.dir();
  const lang = i18n.language


  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-12 space-y-6"
    >
      {/* Header Section */}
      <div className="text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4"
        >
          <h2 className="text-xl sm:text-5xl font-bold font-workSansFont text-white text-center"  style={{
                  background:
                    dir === "rtl"
                      ? "linear-gradient(135deg, var(--color-tertiaryColor) 0%, var(--color-primaryTextColor) 100%)"
                      : "linear-gradient(135deg, var(--color-primaryTextColor) 0%, var(--color-tertiaryColor) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}>{t("filters.showingLatest")}</h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm sm:text-[1.1rem] text-slate-400 max-w-md mx-auto"
        >
        {lang === "ar" ? "اكتشف أحدث رؤانا وقصص ما وراء الكواليس والإلهام الإبداعي من عالم التصوير والفيديو الجوي المتميز." :  "Discover our latest aerial photography insights and creative stories"}
        </motion.p>
      </div>

      {/* Search Bar */}
      <div className="relative mx-auto max-w-xl px-4">
        <div className="relative">
          <FiSearch className="absolute left-8 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-blue-400" />
          <input
            type="text"
            placeholder={t("search.placeholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl py-3 sm:py-4 pl-10 sm:pl-12 pr-10 sm:pr-12 text-sm sm:text-base backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            style={{
              background: "rgba(15, 23, 42, 0.8)",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              color: "var(--color-primaryTextColor, #fff)",
              boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)"
            }}
          />
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={clearSearch}
              className="absolute right-8 top-1/2 -translate-y-1/2 rounded-full p-1 transition-colors duration-200 hover:bg-slate-700"
              style={{
                background: "rgba(71, 85, 105, 0.6)",
                color: "var(--color-primaryTextColor, #fff)"
              }}
            >
              <FiX className="h-3 w-3 sm:h-4 sm:w-4" />
            </motion.button>
          )}
        </div>

        {/* Search Results Count */}
        {searchQuery && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-center text-xs sm:text-sm"
            style={{ color: "var(--color-secondaryTextColor, #94a3b8)" }}
          >
            {t("search.resultsCount", { count: resultsCount })}
          </motion.p>
        )}
      </div>

      {/* Active Search Filter */}
      {searchQuery && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm backdrop-blur-sm"
            style={{
              background: "rgba(59, 130, 246, 0.1)",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              color: "#60a5fa"
            }}
          >
            <span>{ lang === "ar" ? "جاري البحث عن" : "Searching for"}: "{searchQuery}"</span>
            <button
              onClick={clearSearch}
              className="rounded-full p-1 transition-colors duration-200 hover:bg-blue-400/20"
            >
              <FiX className="h-3 w-3" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BlogFilters;
