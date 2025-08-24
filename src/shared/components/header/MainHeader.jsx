import { motion } from "framer-motion";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import LanguageSwitcher from "../LanguageSwitcher";
import Logo from "../Logo";
import BurgerMenu from "./side-menu/BurgerMenu";
import ServicesMenuDropdown from "./services-menu/ServicesMenuDropdown";

const MainHeader = () => {
  const location = useLocation();
  const { servicesDropdownVisible } = useSelector(({ ui }) => ui);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(window.scrollY);
  const { t, i18n } = useTranslation("common");
  const direction = i18n.dir();
  const navigate = useNavigate();

  // Simple navigation structure
  const navigationItems = [
    { name: t("header.home"), path: "/" },
    { name: t("header.services"), path: "/" },
    { name: t("header.gallery"), path: "/gallery" },
    { name: t("header.blog"), path: "/blog" },
    { name: t("header.about"), path: "/about" },
    { name: t("header.contact"), path: "/contact" },
  ];

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          if (currentY > lastScrollY.current && currentY > 60) {
            setShowHeader(false); // scrolling down
          } else {
            setShowHeader(true); // scrolling up
          }
          lastScrollY.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getStartedHandler = () => {
    navigate("/auth");
  };

  return (
    <>
      <header
        className={`from-primaryColor fixed top-0 left-0 z-50 w-full bg-linear-to-b via-transparent via-70% to-transparent text-white transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        } ${servicesDropdownVisible && "bg-[#0A0A0A]"}`}
      >
        <div
          dir={direction}
          className={`mx-auto max-w-7xl ${direction === "rtl" ? "text-left" : "text-right"}`}
        >
          {/* Main Navigation Bar */}
          <div className="grid grid-cols-4 items-center px-6 py-4">
            {/* Logo */}
            <Link to="/" className="justify-self-start">
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <nav className="col-span-2 hidden items-center space-x-8 justify-self-center lg:flex">
              {navigationItems.map((item) =>
                item.name === t("header.services") ? (
                  <ServicesMenuDropdown item={item} key={item.name} />
                ) : (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `group relative font-medium transition-colors duration-300 ${isActive ? (servicesDropdownVisible ? "text-secondaryTextColor hover:text-white" : "text-white") : "text-secondaryTextColor hover:text-white"}`
                    }
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full ${
                        location.pathname === item.path &&
                        !servicesDropdownVisible
                          ? "w-full"
                          : "w-0"
                      }`}
                    ></span>
                  </NavLink>
                ),
              )}
            </nav>

            {/* Right Side - Language & Auth */}
            <div className="hidden items-center space-x-4 justify-self-end lg:flex">
              <LanguageSwitcher />

              <motion.button
                className="group relative flex items-center space-x-4 overflow-hidden rounded-none bg-transparent px-4 py-2 text-white"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                initial="initial"
                animate="initial"
                onClick={getStartedHandler}
              >
                {/* Overlay animation */}
                <motion.span
                  variants={{
                    initial: { x: "-100%" },
                    hover: { x: "0%" },
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 z-0 w-full bg-white/10"
                />

                {/* Circle with subtle dot inside on hover */}
                <span className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full border-1 border-white">
                  <motion.span
                    variants={{
                      initial: { scale: 0, opacity: 0 },
                      hover: { scale: 1, opacity: 0.5 },
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-1 w-1 rounded-full bg-white"
                  />
                </span>

                {/* Text */}
                <span className="relative z-10 text-lg font-medium">
                  {t("header.getStarted")}
                </span>
              </motion.button>

              {/* Modern Burger Menu - Mobile & Desktop */}
            </div>
            <div
              className={`block lg:hidden ${direction === "rtl" ? "grid-cols-3 justify-self-end" : ""}`}
            >
              <BurgerMenu />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default MainHeader;
