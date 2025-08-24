import { useTranslation } from "react-i18next";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  animate,
} from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  HiCamera,
  HiSparkles,
  HiHeart,
  HiShieldCheck,
  HiPlay,
  HiArrowRight,
} from "react-icons/hi2";
import Lottie from "lottie-react";

// Counter Animation Hook - يعد مرة واحدة فقط
const useCountAnimation = (end, duration = 2) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      let startTime;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min(
          (currentTime - startTime) / (duration * 1000),
          1,
        );

        const easeOutQuart = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOutQuart * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration, hasAnimated]);

  return [count, ref];
};

const AboutSection = () => {
  const { t, i18n } = useTranslation("about");
  const [animationData, setAnimationData] = useState(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const containerRef = useRef(null);
  const isRTL = i18n.language === "ar";
  const dir = i18n.dir();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 15]);

  useEffect(() => {
    fetch("/animations/drone-photography.json")
      .then((res) => res.json())
      .then(setAnimationData)
      .catch((err) => console.error("Error loading animation:", err));

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // ألوان هادئة ومريحة
  const features = [
    { icon: HiCamera, color: "#e74c3c", key: "tech" }, // Slate gray
    { icon: HiSparkles, color: "#2ecc71", key: "creativity" }, // Light slate
    { icon: HiHeart, color: "#CBD5E1", key: "passion" }, // Very light slate
    { icon: HiShieldCheck, color: "#ffd60a", key: "quality" }, // Almost white
  ];

  return (
    <section
      dir={dir}
      ref={containerRef}
      className="relative min-h-screen overflow-hidden px-6 py-20"
      style={{ backgroundColor: "var(--color-primaryColor)" }}
    >
      {/* خلفية هادئة */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, var(--color-primaryTextColor) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, var(--color-primaryTextColor) 0%, transparent 50%)
            `,
          }}
        />

        {/* عناصر هادئة متحركة */}
        <motion.div
          className="absolute top-20 left-10 h-1 w-1 rounded-full opacity-10"
          style={{ backgroundColor: "var(--color-primaryTextColor)" }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-20 h-2 w-2 rounded-full opacity-5"
          style={{ backgroundColor: "var(--color-primaryTextColor)" }}
          animate={{
            y: [0, 10, 0],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </motion.div>

      <motion.div
        className="relative mx-auto max-w-7xl"
        // style={{ y: contentY }}
      >
        {/* Hero */}
        <div className="grid min-h-[80vh] items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <motion.div
            // initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            // whileInView={{ opacity: 1, x: 0 }}
            // viewport={{ once: true }}
            // transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="text-start">
              <span
                className={`pl-1 text-sm font-light tracking-[0.3em] uppercase ${dir === "rtl" ? "md:text-[1.2rem]" : "md:text-base"}`}
                style={{ color: "var(--color-secondaryTextColor)" }}
              >
                {t("aboutSection.badge")}
              </span>
              <div
                className={`mt-2 h-px w-40 from-gray-300 via-gray-400 to-transparent ${dir === "ltr" ? "bg-gradient-to-r" : "bg-gradient-to-l"}`}
              ></div>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <motion.h1
                className="text-5xl leading-tight font-light md:text-6xl lg:text-7xl"
                style={{
                  background:
                    dir === "rtl"
                      ? "linear-gradient(135deg, var(--color-tertiaryColor) 0%, var(--color-primaryTextColor) 100%)"
                      : "linear-gradient(135deg, var(--color-primaryTextColor) 0%, var(--color-tertiaryColor) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
                // initial={{ opacity: 0, y: 30 }}
                // whileInView={{ opacity: 1, y: 0 }}
                // transition={{ delay: 0.3, duration: 0.8 }}
              >
                {t("aboutSection.title")}
                <motion.span
                  className="block font-normal opacity-90"
                  style={{
                    background:
                      dir === "rtl"
                        ? "linear-gradient(135deg, var(--color-tertiaryColor) 0%, var(--color-primaryTextColor) 100%)"
                        : "linear-gradient(135deg, var(--color-primaryTextColor) 0%, var(--color-tertiaryColor) 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                  // initial={{ opacity: 0 }}
                  // whileInView={{ opacity: 0.9 }}
                  // transition={{ delay: 0.6 }}
                >
                  {t("aboutSection.titleHighlight")}
                </motion.span>
              </motion.h1>

              <motion.p
                className="max-w-lg text-lg leading-relaxed opacity-70 md:text-xl"
                style={{ color: "var(--color-secondaryTextColor)" }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.7 }}
                transition={{ delay: 0.5 }}
              >
                {t("aboutSection.description")}
              </motion.p>
            </div>

            {/* CTA Button هادئ */}
            <motion.button
              className="group inline-flex items-center gap-3 rounded-full border px-5 py-3 font-normal transition-all duration-300 md:px-8 md:py-4 md:text-lg"
              style={{
                backgroundColor: "transparent",
                borderColor: "var(--color-primaryTextColor)20",
                color: "var(--color-primaryTextColor)",
              }}
              whileHover={{
                borderColor: "var(--color-primaryTextColor)40",
                backgroundColor: "var(--color-primaryTextColor)05",
              }}
              // whileTap={{ scale: 0.98 }}
              // initial={{ opacity: 0, y: 20 }}
              // whileInView={{ opacity: 1, y: 0 }}
              // transition={{ delay: 0.7 }}
            >
              <HiPlay className="h-5 w-5 opacity-70" />
              {t("aboutSection.cta")}
              <motion.div
              // animate={{ x: [0, 3, 0] }}
              // transition={{ duration: 3, repeat: Infinity }}
              >
                <HiArrowRight className="h-5 w-5 opacity-70" />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Enhanced Modern Circular Visual */}
          <motion.div
            // initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            // whileInView={{ opacity: 1, x: 0 }}
            // viewport={{ once: true }}
            // transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex w-full items-center justify-center"
          >
            {/* Main Circular Container with Glassmorphism */}
            <motion.div
              className="relative aspect-square h-80 w-80 rounded-full border backdrop-blur-xl sm:h-96 sm:w-96 md:h-[450px] md:w-[450px] lg:h-[500px] lg:w-[500px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(3, 39, 71, 0.15) 0%, rgba(0, 29, 61, 0.25) 100%)",
                borderColor: "var(--color-tertiaryColor)",
                boxShadow: `
        0 25px 50px rgba(3, 39, 71, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.1)
      `,
              }}
              animate={{
                rotateY: [0, 5, -5, 0],
                rotateX: [0, 2, -2, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Animated Background Grid */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <motion.div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255, 214, 10, 0.1) 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, rgba(46, 204, 113, 0.1) 1px, transparent 1px)
          `,
                    backgroundSize: "40px 40px, 60px 60px",
                  }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>

              {/* Central Drone Animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative"
                  animate={{
                    y: [0, -15, 0],
                    rotateZ: [0, 3, -3, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {/* Drone Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full blur-xl"
                    style={{
                      background:
                        "radial-gradient(circle, var(--color-yellowColor)40 0%, transparent 70%)",
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  <Lottie
                    animationData={animationData}
                    loop
                    autoplay
                    className="relative z-10 h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40"
                    style={{
                      filter:
                        "drop-shadow(0 10px 30px rgba(255, 214, 10, 0.3))",
                    }}
                  />
                </motion.div>
              </div>

              {/* Circular Feature Cards */}
              {features.map((feature, index) => {
                const angle = index * 90 - 90; // Start from top
                const radiusBase = 140;
                const radiusResponsive = {
                  sm: 160,
                  md: 180,
                  lg: 200,
                };

                // Calculate positions for different screen sizes
                const getPosition = (radius) => ({
                  x: Math.cos((angle * Math.PI) / 180) * radius,
                  y: Math.sin((angle * Math.PI) / 180) * radius,
                });

                const pos = getPosition(radiusBase);
                const isActive = activeFeature === index;

                return (
                  <motion.div
                    key={feature.key}
                    className="absolute flex h-12 w-12 flex-col items-center justify-center rounded-full border backdrop-blur-lg sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24"
                    style={{
                      left: `calc(50% + ${pos.x}px - 24px)`,
                      top: `calc(50% + ${pos.y}px - 24px)`,
                      background: isActive
                        ? `radial-gradient(circle, ${feature.color}25 0%, ${feature.color}15 70%, transparent 100%)`
                        : "radial-gradient(circle, rgba(52, 58, 64, 0.4) 0%, rgba(33, 37, 41, 0.6) 70%, transparent 100%)",
                      borderColor: isActive
                        ? feature.color
                        : "rgba(255, 255, 255, 0.1)",
                      boxShadow: isActive
                        ? `0 15px 35px ${feature.color}30, 0 5px 15px rgba(0, 0, 0, 0.3), 0 0 20px ${feature.color}20`
                        : "0 8px 25px rgba(0, 0, 0, 0.2)",
                    }}
                    animate={{
                      scale: isActive ? [1, 1.2, 1.15] : 1,
                      y: isActive ? -8 : 0,
                      rotate: isActive ? [0, 10, -10, 0] : 0,
                    }}
                    transition={{
                      duration: isActive ? 2 : 0.5,
                      ease: "easeOut",
                      repeat: isActive ? Infinity : 0,
                    }}
                    whileHover={{ scale: 1.1, y: -5 }}
                  >
                    {/* Feature Icon */}
                    <feature.icon
                      className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7"
                      style={{
                        color: isActive
                          ? feature.color
                          : "var(--color-primaryTextColor)",
                        filter: isActive
                          ? `drop-shadow(0 0 10px ${feature.color}60)`
                          : "none",
                      }}
                    />

                    {/* Pulsing Ring for Active */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2"
                        style={{ borderColor: feature.color }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.8, 0, 0.8],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                );
              })}

              {/* Orbital Rings */}
              <motion.div
                className="absolute inset-8 rounded-full border opacity-20 sm:inset-12 md:inset-16"
                style={{ borderColor: "var(--color-yellowColor)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-16 rounded-full border opacity-15 sm:inset-20 md:inset-24"
                style={{ borderColor: "var(--color-greenColor)" }}
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              />

              {/* Floating Particles */}
              {[...Array(8)].map((_, i) => {
                const particleAngle = i * 45;
                const particleRadius = 100 + (i % 3) * 30;
                const particleX =
                  Math.cos((particleAngle * Math.PI) / 180) * particleRadius;
                const particleY =
                  Math.sin((particleAngle * Math.PI) / 180) * particleRadius;

                return (
                  <motion.div
                    key={i}
                    className="absolute h-1 w-1 rounded-full sm:h-1.5 sm:w-1.5"
                    style={{
                      backgroundColor:
                        i % 2 === 0
                          ? "var(--color-yellowColor)"
                          : "var(--color-greenColor)",
                      left: `calc(50% + ${particleX}px)`,
                      top: `calc(50% + ${particleY}px)`,
                    }}
                    animate={{
                      scale: [0.5, 1.5, 0.5],
                      opacity: [0.3, 0.9, 0.3],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 4 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                );
              })}

              {/* Center Glow */}
              <div
                className="absolute inset-1/4 rounded-full opacity-30 blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, var(--color-yellowColor)20 0%, transparent 70%)",
                }}
              />
            </motion.div>

            {/* Enhanced Feature Label - Responsive */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                className="absolute -bottom-16 left-1/2 w-full -translate-x-1/2 px-4 text-center sm:-bottom-20"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <motion.div
                  className="inline-block max-w-xs rounded-2xl border px-4 py-2 backdrop-blur-lg sm:max-w-sm sm:px-6 sm:py-3"
                  style={{
                    background: `linear-gradient(135deg, ${features[activeFeature].color}20 0%, rgba(0, 0, 0, 0.4) 100%)`,
                    borderColor: features[activeFeature].color,
                    boxShadow: `0 10px 30px ${features[activeFeature].color}20`,
                  }}
                  animate={{
                    boxShadow: [
                      `0 10px 30px ${features[activeFeature].color}20`,
                      `0 15px 40px ${features[activeFeature].color}30`,
                      `0 10px 30px ${features[activeFeature].color}20`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <h3
                    className="text-sm font-bold tracking-wide sm:text-base md:text-lg"
                    style={{
                      color: features[activeFeature].color,
                      textShadow: `0 0 15px ${features[activeFeature].color}40`,
                    }}
                  >
                    {t(`aboutSection.features.${features[activeFeature].key}`)}
                  </h3>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Stats Section مبسطة */}
        <motion.div className="mt-32 grid grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { value: "500+", label: t("aboutSection.stats.projects") },
            { value: "200+", label: t("aboutSection.stats.clients") },
            { value: "5+", label: t("aboutSection.stats.years") },
            { value: "15+", label: t("aboutSection.stats.cities") },
          ].map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              label={stat.label}
              index={index}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;

const StatCard = ({ value, label, duration = 2 }) => {
  const numericValue = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/\d/g, "");

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, numericValue, {
        duration,
        ease: "easeOut",
        onUpdate: (v) => setDisplayValue(Math.floor(v)),
      });
      return controls.stop;
    }
  }, [isInView, numericValue, duration, motionValue]);

  return (
    <motion.div ref={ref} className="text-center">
      <motion.div
        className="mb-2 text-4xl font-light"
        style={{ color: "var(--color-primaryTextColor)" }}
      >
        {displayValue}
        {suffix}
      </motion.div>
      <p
        className="text-sm font-normal opacity-70"
        style={{ color: "var(--color-secondaryTextColor)" }}
      >
        {label}
      </p>
    </motion.div>
  );
};
