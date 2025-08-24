import { motion } from "framer-motion";

import logo from "/logo-white.webp";

const Logo = ({
  imgClassName = "h-12 sm:h-12 md:h-14 max-w-[12rem] object-contain",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="flex items-center space-x-2"
    >
      <img
        className={imgClassName}
        src={
          "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753806286/sky_motion_mnbl1b2_fwwbqj.gif"
        }
        alt="Logo"
        loading="lazy"
      />
    </motion.div>
  );
};

export default Logo;
