import { Outlet } from "react-router-dom";
import ScrollToTop from "@components/ScrollToTop";
import "@utils/i18n";

import MainHeader from "@components/header/MainHeader";
import { lazy, Suspense } from "react";
import LoadingSpinner from "@components/loading/LoadingSpinner";

const Footer = lazy(() => import("@components/Footer"));

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <ScrollToTop />
      <MainHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Suspense fallback={<LoadingSpinner />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default MainLayout;
