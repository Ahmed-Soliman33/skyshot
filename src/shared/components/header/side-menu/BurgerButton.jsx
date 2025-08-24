import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function BurgerButton({ isActive, onClick }) {
  const { i18n } = useTranslation();
  const direction = i18n.dir();
  return (
    <motion.div
      onClick={onClick}
      className={`fixed top-10 z-50 flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-r transition-all duration-300 hover:scale-105 md:top-7 lg:h-16 lg:w-16 ${direction === "rtl" ? "left-5" : "right-5"}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative flex h-6 w-6 flex-col items-center justify-center">
        <motion.span
          className="absolute block h-0.5 w-6 rounded-full bg-white"
          animate={{
            rotate: isActive ? 45 : 0,
            y: isActive ? 0 : -6,
          }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.span
          className="absolute block h-0.5 w-6 rounded-full bg-white"
          animate={{
            opacity: isActive ? 0 : 1,
            x: isActive ? -10 : 0,
          }}
          transition={{ duration: 0.2, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.span
          className="absolute block h-0.5 w-6 rounded-full bg-white"
          animate={{
            rotate: isActive ? -45 : 0,
            y: isActive ? 0 : 6,
          }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
        />
      </div>
    </motion.div>
  );
}
