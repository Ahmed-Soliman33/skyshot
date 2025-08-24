import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { curve } from "./anim";
import { useTranslation } from "react-i18next";

export default function Curve() {
  const [height, setHeight] = useState(0);
  const { i18n } = useTranslation();
  const direction = i18n.dir();

  useEffect(() => {
    setHeight(window.innerHeight);
    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {height > 0 && (
        <div
          className={`pointer-events-none absolute top-0 ${
            direction === "rtl" ? "left-[-99px]" : "left-[-99px]"
          } h-full w-[100px]`}
        >
          <svg className="fill-primaryColor h-full w-full stroke-none">
            <motion.path
              key={direction} // force re-render on direction change
              variants={curve}
              custom={height}
              initial="initial"
              animate="enter"
              exit="exit"
            />
          </svg>
        </div>
      )}
    </AnimatePresence>
  );
}
