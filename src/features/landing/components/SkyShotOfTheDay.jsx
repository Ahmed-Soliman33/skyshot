import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaLocationArrow, FaExpand } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { HiArrowUpLeft, HiArrowUpRight, HiPlay } from "react-icons/hi2";
import { BsGrid3X3Gap } from "react-icons/bs";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import L from "leaflet";

const shots = [
  {
    id: 1,
    title_en: "Jeddah Sunset from Above",
    title_ar: "غروب جدة من الأعلى",
    location_en: "Jeddah, Saudi Arabia",
    location_ar: "جدة - المملكة العربية السعودية",
    image:
      "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753765103/8_mgq1om.jpg",
    coords: [21.4858, 39.1925],
    category_en: "Urban",
    category_ar: "حضري",
    time_en: "Golden Hour",
    time_ar: "ساعة طلوع الشمس",
  },
  {
    id: 2,
    title_en: "The Empty Quarter's Sands",
    title_ar: "رمال الربع الخالي",
    location_en: "Rub' al Khali, KSA",
    location_ar: "الربع الخالي - السعودية",
    image:
      "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753765034/32_hdfhpo.jpg",
    coords: [19.0833, 51.1333],
    category_en: "Desert",
    category_ar: "الصحراء",
    time_en: "Midday",
    time_ar: "الظهيرة",
  },
  {
    id: 3,
    title_en: "Riyadh Cityscape Night",
    title_ar: "الرياض ليلاً من الأعلى",
    location_en: "Riyadh, Saudi Arabia",
    location_ar: "الرياض - المملكة العربية السعودية",
    image:
      "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753765032/3_ray7fb.jpg",
    coords: [24.7136, 46.6753],
    category_en: "Urban",
    category_ar: "حضري",
    time_en: "Night",
    time_ar: "الليل",
  },
];

const SkyShotOfTheDay = () => {
  const { servicesDropdownVisible, menuVisible } = useSelector(({ ui }) => ui);
  const [index, setIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { i18n, t } = useTranslation();
  const dir = i18n.dir();
  const lang = i18n.language;
  const shot = shots[index];

  // Motion values for swipe
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % shots.length);
  };

  const handlePrevious = () => {
    setIndex((prev) => (prev - 1 + shots.length) % shots.length);
  };

  const handleFullscreen = () => {
    setIsFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
  };

  // Handle swipe gestures
  const handleDragEnd = (event, info) => {
    const threshold = 100;

    if (info.offset.x > threshold) {
      // Swipe right - go to previous (or next in RTL)
      dir === "rtl" ? handleNext() : handlePrevious();
    } else if (info.offset.x < -threshold) {
      // Swipe left - go to next (or previous in RTL)
      dir === "rtl" ? handlePrevious() : handleNext();
    }

    // Reset position
    x.set(0);
  };

  // Prevent context menu and drag
  const handleImageInteraction = (e) => {
    e.preventDefault();
    return false;
  };

  // Auto-play slideshow
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        handleNext();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Prevent scrolling when fullscreen is open
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFullscreen]);

  const customIcon = new L.Icon({
    iconUrl:
      "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753871312/marker-icon_cxmx4j.png",
    iconSize: [24, 44],
    iconAnchor: [10, 46],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowUrl: null,
  });

  return (
    <motion.section
      dir={dir}
      className="mx-auto max-w-7xl px-4 py-20 sm:px-8 lg:px-16"
      style={{ backgroundColor: "var(--color-primaryColor, #212529)" }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      {/* Header */}
      <div className="mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
          style={{
            backgroundColor: "var(--color-tertiaryColor, #032747)",
            color: "#60a5fa",
          }}
        >
          <motion.span
            className="h-2 w-2 rounded-full bg-blue-400"
            animate={{
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {dir === "rtl" ? "مميز اليوم" : "Featured Today"}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
          className="mb-3 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-4xl font-bold text-transparent sm:text-6xl lg:text-7xl"
          style={{
            background:
              dir === "rtl"
                ? "linear-gradient(135deg, var(--color-tertiaryColor) 0%, var(--color-primaryTextColor) 100%)"
                : "linear-gradient(135deg, var(--color-primaryTextColor) 0%, var(--color-tertiaryColor) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {dir === "rtl" ? "لقطة من السماء" : "SkyShot"}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto max-w-2xl text-base text-gray-400 md:text-lg lg:text-xl"
        >
          {dir === "rtl"
            ? "اكتشف جمال المملكة من منظور جوي استثنائي"
            : "Discover the Kingdom's beauty from an extraordinary aerial perspective"}
        </motion.p>
      </div>

      {/* Main Content */}
      <div
        className="relative overflow-hidden rounded-2xl shadow-md"
        style={{ backgroundColor: "var(--color-secondaryColor, #343a40)" }}
      >
        {/* Progress Indicators */}
        <div className="absolute top-6 left-6 z-20 flex gap-2">
          {shots.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-8 bg-blue-400"
                  : "w-4 bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>

        {/* Category Badge */}
        <div
          className={`absolute z-20 ${dir === "rtl" ? "top-10 left-5 md:top-5 md:right-16" : "top-8 left-5 md:top-10"}`}
        >
          <span
            className="rounded-full px-2 py-1 text-[10px] font-medium backdrop-blur-sm md:px-3 md:text-xs"
            style={{
              backgroundColor: "rgba(3, 39, 71, 0.8)",
              color: "#60a5fa",
            }}
          >
            {lang === "ar" ? shot.category_ar : shot.category_en} •{" "}
            {lang === "ar" ? shot.time_ar : shot.time_en}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* Image Section */}
          <div className="relative lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={shot.image}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5 }}
                className="group relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:h-[600px]"
              >
                <img
                  src={shot.image}
                  alt={shot.title_en}
                  className="h-full w-full object-cover transition-transform duration-700 select-none group-hover:scale-105"
                  draggable={false}
                  onContextMenu={handleImageInteraction}
                  onDragStart={handleImageInteraction}
                  style={{ userSelect: "none", WebkitUserSelect: "none" }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Image Info */}
                <div className="absolute right-0 bottom-0 left-0 p-4 md:p-6">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-2 text-[1.1rem] font-bold text-white lg:text-3xl"
                  >
                    {dir === "rtl" ? shot.title_ar : shot.title_en}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-2 text-[.8rem] text-gray-200 md:text-base"
                  >
                    <FaLocationArrow className="h-3 w-3" />
                    {dir === "rtl" ? shot.location_ar : shot.location_en}
                  </motion.p>
                </div>

                {/* Expand Button */}
                <button
                  onClick={handleFullscreen}
                  className="absolute top-4 right-4 rounded-full p-2 backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/70"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                  <FaExpand className="h-4 w-4 text-white" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Info Panel */}
          <div className="flex flex-col justify-between p-8 lg:p-10">
            {/* Map */}
            <div className="inset-0 z-10 mb-8">
              <h4 className="mb-4 text-lg font-semibold text-white">
                {dir === "rtl" ? "الموقع" : "Location"}
              </h4>
              <div className={`h-48 overflow-hidden rounded-xl shadow-lg`}>
                <MapContainer
                  center={shot.coords}
                  zoom={6}
                  scrollWheelZoom={false}
                  style={{ height: "100%", width: "100%" }}
                  key={index}
                  className="leaflet-container-no-attribution rounded-md shadow"
                >
                  <TileLayer
                    url={`https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=wkikEPru660r2A7nGkfg`}
                  />
                  <Marker icon={customIcon} position={shot.coords}>
                    <Popup>
                      {dir === "rtl" ? shot.location_ar : shot.location_en}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-4">
              {/* Navigation */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePrevious}
                  className="group flex-1 rounded-xl p-4 font-medium text-white transition-all duration-300"
                  style={{
                    backgroundColor: "var(--color-tertiaryColor, #032747)",
                  }}
                >
                  <div className="flex items-center justify-center gap-2">
                    {lang === "ar" ? (
                      <HiArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                    ) : (
                      <HiArrowUpLeft className="h-4 w-4 transition-transform group-hover:-rotate-45" />
                    )}
                    <span>{dir === "rtl" ? "السابق" : "Previous"}</span>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  className="group flex-1 rounded-xl p-4 font-medium text-white transition-all duration-300"
                  style={{
                    backgroundColor: "var(--color-tertiaryColor, #032747)",
                  }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>{dir === "rtl" ? "التالي" : "Next"}</span>
                    {lang === "ar" ? (
                      <HiArrowUpLeft className="h-4 w-4 transition-transform group-hover:-rotate-45" />
                    ) : (
                      <HiArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                    )}
                  </div>
                </motion.button>
              </div>

              {/* Action Buttons */}
              <Link to="/gallery" className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex-1 rounded-xl border border-gray-600 p-4 font-medium text-white transition-all duration-300 hover:border-blue-400"
                >
                  <div className="flex items-center justify-center gap-2">
                    <BsGrid3X3Gap className="h-4 w-4" />
                    <span>{dir === "rtl" ? "المعرض" : "Gallery"}</span>
                  </div>
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
        {/* Fullscreen Modal */}
        <AnimatePresence>
          {isFullscreen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
              onClick={handleCloseFullscreen}
            >
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                style={{ x, opacity }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative h-full max-h-[100vh] w-full max-w-[100vw] cursor-grab active:cursor-grabbing sm:max-h-[90vh] sm:max-w-[90vw]"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={shot.image}
                  alt={shot.title_en}
                  className="h-full w-full object-contain select-none"
                  draggable={false}
                  onContextMenu={handleImageInteraction}
                  onDragStart={handleImageInteraction}
                  style={{
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    WebkitTouchCallout: "none",
                    WebkitUserDrag: "none",
                  }}
                />

                {/* Close Button - Responsive positioning */}
                <button
                  onClick={handleCloseFullscreen}
                  className="bg-tertiaryColor/70 hover:bg-tertiaryColor/70 absolute top-2 right-2 z-10 rounded-full p-2 text-white backdrop-blur-sm transition-all sm:top-4 sm:right-4 sm:p-3"
                >
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Image Info - Responsive */}
                <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/90 to-transparent p-4 sm:p-6">
                  <h3 className="mb-1 text-xl font-bold text-white sm:mb-2 sm:text-3xl">
                    {dir === "rtl" ? shot.title_ar : shot.title_en}
                  </h3>
                  <p className="flex items-center gap-2 text-sm text-gray-200 sm:text-base">
                    <FaLocationArrow className="h-3 w-3 sm:h-4 sm:w-4" />
                    {dir === "rtl" ? shot.location_ar : shot.location_en}
                  </p>

                  {/* Mobile swipe indicator */}
                  <div className="mt-3 flex items-center justify-center gap-2 sm:hidden">
                    <div className="h-1 w-8 rounded-full bg-white/30"></div>
                    <span className="text-xs text-white/70">
                      {dir === "rtl" ? "اسحب للتنقل" : "Swipe to navigate"}
                    </span>
                    <div className="h-1 w-8 rounded-full bg-white/30"></div>
                  </div>
                </div>

                {/* Navigation Buttons - Hidden on mobile, visible on desktop */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  className="bg-tertiaryColor/70 hover:bg-tertiaryColor/90 absolute top-1/2 left-2 z-10 hidden -translate-y-1/2 rounded-full p-2 text-white backdrop-blur-sm transition-all sm:left-4 sm:block sm:p-3"
                >
                  {lang === "ar" ? (
                    <HiArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
                  ) : (
                    <HiArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                  )}
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="bg-tertiaryColor/70 hover:bg-tertiaryColor/90 absolute top-1/2 right-2 z-10 hidden -translate-y-1/2 rounded-full p-2 text-white backdrop-blur-sm transition-all sm:right-4 sm:block sm:p-3"
                >
                  {lang === "ar" ? (
                    <HiArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                  ) : (
                    <HiArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
                  )}
                </button>

                {/* Progress indicators for mobile */}
                <div className="absolute top-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:hidden">
                  {shots.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i === index ? "w-6 bg-white" : "w-2 bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default SkyShotOfTheDay;
