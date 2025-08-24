import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronDownSharp } from "react-icons/io5";
import { changeLanguage } from "../utils/i18n";

const languages = [
  {
    code: "en",
    label: "EN",
    flag: "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753762745/british-flag_bsyxz0.webp",
  },
  {
    code: "ar",
    label: "AR",
    flag: "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753762744/saudi-arabia-flag_dvdnik.webp",
  },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const current =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleChange = (code) => {
    changeLanguage(code);
    setIsOpen(false);
    window.location.reload();
  };

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-50" ref={ref}>
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className="group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white backdrop-blur-xs transition-all"
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
      >
        <motion.img
          src={current.flag}
          alt={`${current.label} Flag`}
          className="h-4 w-4 rounded-full object-cover"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.3 }}
        />
        <span className="tracking-widest">{current.label}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <IoChevronDownSharp className="text-white/60" size={14} />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.42, 0, 0.58, 1] }}
            className="absolute right-0 mt-2 w-36 overflow-hidden rounded-xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-md"
          >
            {languages.map((lang) => {
              const isActive = i18n.language === lang.code;
              return (
                <motion.button
                  key={lang.code}
                  onClick={() => handleChange(lang.code)}
                  className={`flex w-full items-center gap-2 px-4 py-2 text-sm transition-all ${
                    isActive
                      ? "bg-white/20 font-semibold text-white"
                      : "text-white/60 hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={lang.flag}
                    alt={`${lang.label} Flag`}
                    className="h-4 w-4 rounded-full object-cover"
                  />
                  <span className="tracking-wider">{lang.label}</span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
