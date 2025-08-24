import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  HiPlay,
  HiEye,
  HiMapPin,
  HiCamera,
  HiArrowTopRightOnSquare,
  HiShoppingCart,
  HiSparkles,
  HiCursorArrowRays,
} from "react-icons/hi2";

import Lottie from "lottie-react";

const galleryItems = [
  {
    id: 1,
    type: "photo",
    image:
      "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753765101/15_phjt9q.jpg",
    location: "riyadh",
    featured: true,
  },
  {
    id: 2,
    type: "video",
    image:
      "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753765055/10_zltvpq.jpg",
    location: "jeddah",
    duration: "2:45",
  },
  {
    id: 3,
    type: "photo",
    image:
      "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753765053/23_ueiyd4.png",
    location: "dammam",
    featured: true,
  },
  {
    id: 4,
    type: "video",
    image:
      "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753765043/20_tl75yb.jpg",
    location: "dammam",
    duration: "1:30",
  },
  {
    id: 5,
    type: "photo",
    image:
      "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753765032/3_ray7fb.jpg",
    location: "medina",
  },
  {
    id: 6,
    type: "photo",
    image:
      "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753765034/2_e0s5po.jpg",
    location: "tabuk",
  },
  {
    id: 7,
    type: "video",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&h=600&fit=crop",
    location: "jeddah",
    duration: "3:20",
  },
  {
    id: 8,
    type: "photo",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&h=600&fit=crop",
    location: "riyadh",
    featured: true,
  },
];

// Creative Floating Card Component
const CreativeGalleryCard = ({ item, index, isActive, onClick }) => {
  const { t, i18n } = useTranslation("gallery");
  const dir = i18n.dir();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
      }}
      className={`group relative cursor-pointer overflow-hidden rounded-3xl transition-all duration-700 ${
        isActive ? "z-20" : "z-10"
      }`}
      style={{
        backgroundColor: "var(--color-secondaryColor)",
        transform: isActive ? "scale(1.05)" : "scale(1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(item)}
      whileHover={{
        y: -12,
        rotateX: 5,
        transition: { duration: 0.4 },
      }}
    >
      {/* Creative Border Glow */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: `linear-gradient(135deg, var(--color-tertiaryColor)20, var(--color-darkBlueColor)40, transparent)`,
        }}
        animate={{
          opacity: isHovered || isActive ? 0.6 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Image Container with Creative Mask */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Floating Particles Effect */}
        <div className="absolute inset-0 z-10">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full"
              style={{
                backgroundColor: "var(--color-tertiaryColor)",
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Main Image */}
        <motion.img
          src={item.image}
          alt={t(`gallery.items.${item.id}.title`)}
          className="h-full w-full object-cover"
          animate={{
            scale: isHovered ? 1.15 : 1,
            filter: isHovered
              ? "brightness(0.7) saturate(1.2)"
              : "brightness(1)",
          }}
          transition={{ duration: 0.7 }}
        />

        {/* Creative Overlay with Geometric Shapes */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, var(--color-darkBlueColor)60, transparent 70%)`,
          }}
          animate={{ opacity: isHovered ? 0.8 : 0.4 }}
          transition={{ duration: 0.4 }}
        />

        {/* Type Badge with Creative Design */}
        <div className="absolute top-4 left-4 z-20">
          <motion.div
            className="flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-medium backdrop-blur-md"
            style={{
              backgroundColor: "var(--color-tertiaryColor)80",
              borderColor: "var(--color-darkBlueColor)40",
              color: "var(--color-primaryTextColor)",
            }}
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 2 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {item.type === "video" ? (
              <>
                <HiPlay
                  className="h-4 w-4"
                  style={{ color: "var(--color-secondaryTextColor)" }}
                />
                <span>{item.duration}</span>
              </>
            ) : (
              <>
                <HiCamera
                  className="h-4 w-4"
                  style={{ color: "var(--color-secondaryTextColor)" }}
                />
                <span>4K</span>
              </>
            )}
          </motion.div>
        </div>

        {/* Featured Badge */}
        {item.featured && (
          <div dir={dir} className="absolute top-4 right-4 z-20">
            <motion.div
              className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold backdrop-blur-md"
              style={{
                backgroundColor: "var(--color-tertiaryColor)",
                color: "var(--color-primaryTextColor)",
              }}
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span>{t("gallery.featured")}</span>
              <HiSparkles className="h-3 w-3" />
            </motion.div>
          </div>
        )}

        {/* Creative Hover Effect */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-30 flex items-center justify-center"
            >
              <motion.div
                className="flex items-center gap-3 rounded-2xl border px-6 py-3 backdrop-blur-md"
                style={{
                  backgroundColor: "var(--color-secondaryColor)90",
                  borderColor: "var(--color-tertiaryColor)60",
                  color: "var(--color-primaryTextColor)",
                }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <HiEye
                  className="h-5 w-5"
                  style={{ color: "var(--color-tertiaryColor)" }}
                />
                <span className="font-medium">{t("gallery.preview")}</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Minimal Info */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3
              className="text-lg font-semibold"
              style={{ color: "var(--color-primaryTextColor)" }}
            >
              {t(`gallery.items.${item.id}.title`)}
            </h3>
            <div
              className="mt-1 flex items-center gap-2 text-sm"
              style={{ color: "var(--color-secondaryTextColor)" }}
            >
              <HiMapPin className="h-3 w-3" />
              <span>{t(`gallery.locations.${item.location}`)}</span>
            </div>
          </div>

          <motion.div
            className="rounded-full p-2"
            style={{ backgroundColor: "var(--color-tertiaryColor)40" }}
            animate={{ rotate: isHovered ? 15 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <HiCursorArrowRays
              className="h-5 w-5"
              style={{ color: "var(--color-tertiaryColor)" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Creative Bottom Accent */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 rounded-full"
        style={{ backgroundColor: "var(--color-tertiaryColor)" }}
        animate={{
          width: isHovered ? "100%" : "0%",
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

export default function GallerySection() {
  const { t, i18n } = useTranslation("gallery");
  const dir = i18n.dir();
  const [activeCard, setActiveCard] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [animationData, setAnimationData] = useState(null);

  // Extract unique locations from gallery items
  const uniqueLocations = [
    ...new Set(galleryItems.map((item) => item.location)),
  ];
  const locationOptions = ["all", ...uniqueLocations];

  // Auto-rotate active card
  useEffect(() => {
    fetch("/animations/animated-drone-2.json")
      .then((res) => res.json())
      .then(setAnimationData)
      .catch((err) => console.error("Error loading JSON:", err));

    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % galleryItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const filteredItems =
    selectedLocation === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.location === selectedLocation);

  const handleCardClick = (item) => {
    console.log("Navigate to store with item:", item);
    // Navigate to store page
  };

  return (
    <section
      dir={dir}
      className="relative overflow-hidden px-6 py-32"
      style={{ backgroundColor: "var(--color-primaryColor)" }}
    >
      {/* Creative Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
              radial-gradient(circle at 20% 80%, var(--color-tertiaryColor) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, var(--color-darkBlueColor) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, var(--color-secondaryColor) 0%, transparent 50%)
            `,
            }}
          ></div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Creative Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20 text-center"
        >
          <div className="mb-8 flex items-center justify-center">
            <motion.div
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Lottie
                animationData={animationData}
                loop
                autoplay
                className="mb-4 max-h-20 max-w-20 md:max-h-28 md:max-w-28"
              />
            </motion.div>

            <div
              className={`text-center ${dir === "rtl" ? "ml-16 md:ml-28" : "mr-12 md:mr-20"}`}
            >
              <span
                className={`text-[1.1rem] font-light tracking-[0.3em] uppercase ${dir === "rtl" ? "md:text-[1.2rem]" : "md:text-base"}`}
                style={{ color: "var(--color-secondaryTextColor)" }}
              >
                {t("gallery.subtitle")}
              </span>
              <div className="mx-auto mt-2 h-px w-40 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            </div>
          </div>

          <h2
            className="mb-8 text-6xl font-light tracking-tight lg:text-7xl"
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
            {t("gallery.title")}
            <span className="block bg-gradient-to-r from-gray-500 to-gray-700 bg-clip-text font-bold text-transparent">
              {t("gallery.titleHighlight")}
            </span>
          </h2>

          <p
            className="mx-auto max-w-3xl text-lg leading-relaxed font-light"
            style={{ color: "var(--color-secondaryTextColor)" }}
          >
            {t("gallery.description")}
          </p>
        </motion.div>

        {/* Location Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 flex flex-wrap justify-center gap-3"
        >
          {locationOptions.map((location) => (
            <motion.button
              key={location}
              onClick={() => setSelectedLocation(location)}
              className={`rounded-full border px-6 py-3 text-sm font-medium transition-all duration-300 ${
                selectedLocation === location
                  ? "border-tertiaryColor text-primaryColor"
                  : "hover:border-tertiaryColor/60 border-gray-600"
              }`}
              style={{
                backgroundColor:
                  selectedLocation === location
                    ? "var(--color-tertiaryColor)"
                    : "transparent",
                color:
                  selectedLocation === location
                    ? "var(--color-primaryTextColor)"
                    : "var(--color-secondaryTextColor)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {location === "all"
                ? t("gallery.locations.all")
                : t(`gallery.locations.${location}`)}
            </motion.button>
          ))}
        </motion.div>

        {/* Creative Gallery Grid */}
        <div className="grid grid-cols-1 items-center justify-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.slice(0, 6).map((item, index) => (
            <CreativeGalleryCard
              key={item.id}
              item={item}
              index={index}
              isActive={activeCard === index}
              onClick={handleCardClick}
            />
          ))}
        </div>

        {/* Creative CTA */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-24 text-center"
        >
          <motion.div
            className="mx-auto max-w-2xl rounded-3xl border p-12"
            style={{
              backgroundColor: "var(--color-secondaryColor)",
              borderColor: "var(--color-tertiaryColor)",
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h3
              className="mb-6 text-3xl font-light"
              style={{ color: "var(--color-primaryTextColor)" }}
            >
              {t("gallery.cta.title")}
            </h3>
            <p
              className="mb-8 text-lg"
              style={{ color: "var(--color-secondaryTextColor)" }}
            >
              {t("gallery.cta.description")}
            </p>

            <motion.button
              className="group mx-auto flex items-center justify-center gap-3 rounded-full px-12 py-4 text-lg font-semibold transition-all duration-500"
              style={{
                backgroundColor: "var(--color-tertiaryColor)",
                color: "var(--color-primaryTextColor)",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(3, 39, 71, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <HiShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
              {t("gallery.cta.visitStore")}
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <HiArrowTopRightOnSquare className="h-5 w-5" />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
