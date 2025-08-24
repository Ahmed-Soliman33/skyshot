import { motion } from "framer-motion";
import { menuSlide } from "./anim";
import Nav from "./Nav";
import Curve from "./Curve";
import { useTranslation } from "react-i18next";
import bgSvg from "@assets/Sprinkle.svg";

export default function Menu({ onClose }) {
  const { i18n } = useTranslation();
  const direction = i18n.dir();

  return (
    <motion.div
      variants={menuSlide(direction)}
      initial="initial"
      animate="enter"
      exit="exit"
      style={{ backgroundImage: `url(${bgSvg})` }}
      className={`bg-primaryColor fixed top-0 z-40 h-screen w-full bg-cover bg-center bg-no-repeat text-white md:w-[480px] lg:w-[520px] ${
        direction === "rtl" ? "left-0" : "right-0"
      }`}
    >
      {/* Curved Edge */}
      <Curve />

      {/* Blur Layer */}
      <div className="bg-primaryColor/20 absolute inset-0 backdrop-blur-[4px]" />

      {/* Content */}
      <div className="relative z-10 h-full">
        <Nav onClose={onClose} />
      </div>

      {/* Decoration */}
      <div className="absolute top-20 right-20 h-32 w-32 rounded-full bg-[#c1a265]/10 blur-3xl" />
      <div className="absolute right-10 bottom-40 h-24 w-24 rounded-full bg-[#c1a265]/5 blur-2xl" />
    </motion.div>
  );
}
