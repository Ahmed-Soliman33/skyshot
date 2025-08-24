import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { slide, socialSlide } from "./anim";
import {
  HiChevronLeft,
  HiChevronRight,
  HiUser,
  HiUserAdd,
} from "react-icons/hi";
import {
  FaInstagram,
  FaSnapchatSquare,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import LanguageSwitcher from "../../LanguageSwitcher";
import { AiFillTikTok } from "react-icons/ai";

export default function Nav({ onClose }) {
  const { t, i18n } = useTranslation("common");
  const direction = i18n.dir();
  const navigate = useNavigate();

  const navigationItems = [
    { name: t("header.home"), path: "/" },
    { name: t("header.services"), path: "/services" },
    { name: t("header.gallery"), path: "/gallery" },
    { name: t("header.blog"), path: "/blog" },
    { name: t("header.about"), path: "/about" },
    { name: t("header.contact"), path: "/contact" },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      icon: FaInstagram,
      href: "https://www.instagram.com/skyshot.sa?igsh=NjB5NDE3cXYyYnJh&utm_source=qr",
    },
    {
      name: "TikTok",
      icon: AiFillTikTok,
      href: "https://www.tiktok.com/@skyshot.sa?_t=ZS-8y6Tigx2X6l&_r=1",
    },
    {
      name: "Snapchat",
      icon: FaSnapchatSquare,
      href: "https://www.snapchat.com/@skyshot.sa?invite_id=zVtyZYo3&share_id=Lp-BSUIKRkqgq17ePABM2A&sid=4d53c8d3f9c74f869b9d4918ba59dde0",
    },
    {
      name: "YouTube",
      icon: FaYoutube,
      href: "https://www.youtube.com/@skyshot_sa",
    },
  ];

  const getStartedHandler = () => {
    console.log("Get Started");
    navigate("/auth");
  };

  return (
    <div className="flex h-full flex-col gap-8 px-8 py-20 lg:px-12">
      {/* Language Switcher */}
      <motion.div variants={slide} custom={0} className="mb-4">
        <div className="flex items-center justify-center space-x-2">
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
        </div>
      </motion.div>

      {/* Navigation Header */}
      <motion.div
        variants={slide}
        custom={1}
        className="mb-2 border-b border-gray-600 pb-2"
      >
        <p className="text-xs tracking-wider text-gray-400 uppercase">
          {t("header.navigation")}
        </p>
      </motion.div>

      {/* Navigation Links */}
      <nav className="space-y-2">
        {navigationItems.map((item, index) => (
          <motion.div
            variants={slide}
            custom={index + 2}
            key={item.path}
            className="overflow-hidden"
          >
            <NavLink
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex cursor-pointer items-center py-2 text-[1.5rem] uppercase transition-colors duration-200 ${
                  isActive
                    ? "font-semibold text-white"
                    : "text-gray-500 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        key="icon"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {direction === "ltr" ? (
                          <HiChevronRight className="text-accentColor h-6 w-6" />
                        ) : (
                          <HiChevronLeft className="text-accentColor h-6 w-6" />
                        )}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <span
                    className={`transition-transform duration-300 ${direction === "ltr" ? "group-hover:translate-x-3" : "group-hover:-translate-x-3"}`}
                  >
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* Social Links */}
      <motion.div
        variants={socialSlide}
        className="border-secondaryTextColor mt-10"
      >
        <p className="text-secondaryTextColor mb-4 border-b pb-2 text-xs tracking-wider uppercase">
          {t("header.followUs")}
        </p>
        <div className="flex space-x-6">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.name}
                href={social.href}
                className="text-secondaryTextColor transition-all duration-300 hover:scale-105 hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="h-6 w-6" />
              </motion.a>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
