import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import DroneBackground from "./DroneBackground";
import { useEffect } from "react";

const LoadingScreen = ({ isLoading }) => {
  useEffect(() => {
    const body = document.body;
    if (!isLoading) {
      body.classList.remove("scroll-lock");
    } else {
      body.classList.add("scroll-lock");
    }

    return () => {
      body.classList.remove("scroll-lock");
    };
  }, [isLoading]);

  return (
    <>
      <Helmet>
        <link
          rel="preload"
          as="video"
          href="https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753806286/sky_motion_mnbl1b2_fwwbqj.gif"
          type="video/webm"
        />
      </Helmet>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="bg-primaryColor fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-cover bg-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            {/* 👇 Animated Drone in Background */}
            <DroneBackground />

            {/* Blur Overlay */}
            <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-xs" />

            {/* Main Content */}
            <motion.img
              src="https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753806286/sky_motion_mnbl1b2_fwwbqj.gif"
              alt="Loading"
              className="z-20 h-24 object-contain md:h-36"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.8 } }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.4 } }}
            />

            {/* Loading Bar */}
            <div className="bg-secondaryTextColor relative z-20 mt-6 h-1 w-40 overflow-hidden rounded-full">
              <motion.div
                className="h-full w-1/2 bg-white"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LoadingScreen;
