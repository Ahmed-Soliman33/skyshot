import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import { useLanguage } from "@hooks/useLanguage";
import Sidebar from "@components/Sidebar";
import Topbar from "@components/Topbar";

const DashboardLayout = () => {
  const { isRTL } = useLanguage();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-collapse on mobile
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [isMobile]);

  const mainContentVariants = {
    expanded: {
      marginLeft: isRTL ? 0 : isMobile ? 0 : "280px",
      marginRight: isRTL ? (isMobile ? 0 : "280px") : 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    collapsed: {
      marginLeft: isRTL ? 0 : isMobile ? 0 : "80px",
      marginRight: isRTL ? (isMobile ? 0 : "80px") : 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <div
      className="h-screen overflow-hidden bg-white"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobile={isMobile}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content */}
      <motion.div
        variants={mainContentVariants}
        animate={isCollapsed ? "collapsed" : "expanded"}
        className="flex h-screen flex-col"
      >
        {/* Topbar */}
        <Topbar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobile={isMobile}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </motion.div>
    </div>
  );
};

export default DashboardLayout;
