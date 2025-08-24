import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const ServicesTabs = ({ tabs, activeTab, setActiveTab }) => {
  const { i18n } = useTranslation("common");
  const dir = i18n.dir();

  return (
    <div
      className={`border-white/20 pr-4 ${dir === "rtl" ? "border-l" : "border-r"}`}
    >
      <h4 className="mb-6 text-[1.03rem] tracking-wider text-gray-300">
        {dir === "ltr" ? "Drone Photography Services" : "خدماتنا"}
      </h4>

      <div className="space-y-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <motion.div
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              initial={false}
              animate={{ x: isActive ? 10 : 0 }}
              whileHover={{ x: dir === "ar" ? -10 : 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className={`group flex cursor-pointer items-center gap-1 py-2 text-[1.5rem] uppercase transition-colors duration-200 ${
                isActive
                  ? "font-semibold text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              <AnimatePresence>
                {(isActive || false) && (
                  <motion.span
                    key="icon"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {dir === "rtl" ? (
                      <HiChevronLeft className="text-accentColor h-6 w-6" />
                    ) : (
                      <HiChevronRight className="text-accentColor h-6 w-6" />
                    )}
                  </motion.span>
                )}
              </AnimatePresence>

              <span>{tab.title}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesTabs;
