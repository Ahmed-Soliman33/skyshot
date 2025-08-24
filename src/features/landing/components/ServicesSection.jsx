import { useTranslation } from "react-i18next";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  HiCamera,
  HiVideoCamera,
  HiCalendarDays,
  HiDocumentText,
} from "react-icons/hi2";
import { TbDrone } from "react-icons/tb";

// Counter Animation Hook
const useCounter = (end, duration = 2, shouldStart = false) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (shouldStart && !hasStarted) {
      setHasStarted(true);
      let startTime;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min(
          (currentTime - startTime) / (duration * 1000),
          1,
        );

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [end, duration, shouldStart, hasStarted]);

  return count;
};

const services = [
  {
    key: "aerial",
    title_en: "Aerial Photography",
    title_ar: "التصوير الجوي",
    desc_en:
      "Professional drone photography with 4K resolution and 360° capabilities for real estate, tourism, and construction projects",
    desc_ar:
      "تصوير جوي احترافي بدقة 4K وإمكانيات 360 درجة للعقارات والسياحة ومشاريع البناء",
    icon: HiCamera,
    stats: {
      projects: { value: 150, suffix: "+", animated: true },
      resolution: { value: "4K", animated: false },
      coverage: { value: "360°", animated: false },
    },
    accent: "#6c757d", // Steel gray
    image:
      "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753764978/aerial-photography_f2jk9r.jpg",
  },
  {
    key: "video",
    title_en: "Video Production",
    title_ar: "إنتاج الفيديو",
    desc_en:
      "Complete video production services including shooting, editing, color grading, and motion graphics for all types of content",
    desc_ar:
      "خدمات إنتاج فيديو متكاملة تشمل التصوير والمونتاج وتدرج الألوان والرسوم المتحركة لجميع أنواع المحتوى",
    icon: HiVideoCamera,
    stats: {
      videos: { value: 200, suffix: "+", animated: true },
      duration: { value: 500, suffix: "h", animated: true },
      clients: { value: 50, suffix: "+", animated: true },
    },
    accent: "#868e96", // Light steel
    image:
      "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753764975/video-production_clinip.jpg",
  },
  {
    key: "documentation",
    title_en: "Project Documentation",
    title_ar: "توثيق المشاريع",
    desc_en:
      "Time-lapse photography and comprehensive project documentation from start to finish with detailed progress reports",
    desc_ar:
      "تصوير مُسرع وتوثيق شامل للمشاريع من البداية للنهاية مع تقارير تقدم مفصلة",
    icon: HiDocumentText,
    stats: {
      projects: { value: 45, animated: true },
      photos: { value: 2.1, suffix: "K", animated: true },
      months: { value: 12, animated: false },
    },
    accent: "#868e96", // Dark steel
    image:
      "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753764979/project-producing_x05zhg.jpg",
  },
  {
    key: "events",
    title_en: "Event Coverage",
    title_ar: "تغطية الفعاليات",
    desc_en:
      "Comprehensive event documentation with live streaming, multi-camera setups for weddings, corporate events, and conferences",
    desc_ar:
      "توثيق شامل للفعاليات مع البث المباشر وإعدادات متعددة الكاميرات للأعراس والفعاليات والمؤتمرات",
    icon: HiCalendarDays,
    stats: {
      events: { value: 89, animated: true },
      cameras: { value: 6, animated: false },
      streaming: { value: 16, animated: true },
    },
    accent: "#adb5bd", // Medium steel
    image:
      "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753764979/event-coverage_azwaxv.jpg",
  },
];

// Animated Stat Component
const AnimatedStat = ({ stat, statKey, service, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // العد يبدأ فور ظهور الكارد في الشاشة
  const animatedValue = useCounter(
    stat.animated ? stat.value : 0,
    2.5,
    isInView, // تغيير من shouldAnimate إلى isInView مباشرة
  );

  const displayValue = stat.animated ? animatedValue : stat.value;
  const { t } = useTranslation("services");

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isInView ? 1 : 0, // تغيير من isActive إلى isInView
        y: isInView ? [0, -8, 0] : 0,
      }}
      transition={{
        opacity: { duration: 0.6, delay },
        y: stat.animated
          ? {
              duration: 3,
              delay: delay + 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }
          : {},
      }}
    >
      <motion.div
        className="mb-2 text-2xl font-light tracking-tight"
        style={{ color: service.accent }}
        animate={
          stat.animated
            ? {
                scale: isInView ? [1, 1.1, 1] : 1, // تغيير من isActive إلى isInView
              }
            : {}
        }
        transition={{
          duration: 2,
          delay: delay + 1,
          repeat: Infinity,
        }}
      >
        {displayValue}
        {stat.suffix || ""}
      </motion.div>
      <div
        className="text-xs font-light tracking-wider uppercase"
        style={{ color: "var(--color-secondaryTextColor)" }}
      >
        {t(`landingSection.stats.${statKey}`)}
      </div>
    </motion.div>
  );
};

// Elegant Camera Viewfinder Component
const ElegantViewfinder = ({ service, isActive }) => {
  const { i18n } = useTranslation();
  const [focusPoint, setFocusPoint] = useState({ x: 50, y: 50 });
  const [scanLine, setScanLine] = useState(0);

  useEffect(() => {
    if (isActive) {
      const focusInterval = setInterval(() => {
        setFocusPoint({
          x: 25 + Math.random() * 50,
          y: 25 + Math.random() * 50,
        });
      }, 3000);

      const scanInterval = setInterval(() => {
        setScanLine((prev) => (prev + 1) % 100);
      }, 50);

      return () => {
        clearInterval(focusInterval);
        clearInterval(scanInterval);
      };
    }
  }, [isActive]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
      {/* Background Image with Elegant Overlay */}
      <motion.div
        className="relative h-full w-full"
        animate={{
          scale: isActive ? 1.05 : 1,
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <img
          src={service.image}
          alt={i18n.language === "ar" ? service.title_ar : service.title_en}
          className="h-full w-full object-cover"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          animate={{ opacity: isActive ? 0.9 : 0.7 }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>

      {/* Professional Camera Interface */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
          style={{ top: `${scanLine}%` }}
          animate={{ opacity: isActive ? [0, 1, 0] : 0 }}
          transition={{ duration: 0.1 }}
        />
        <motion.div
          className="absolute inset-4"
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2 border-white/80"></div>
          <div className="absolute top-0 right-0 h-8 w-8 border-t-2 border-r-2 border-white/80"></div>
          <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-white/80"></div>
          <div className="absolute right-0 bottom-0 h-8 w-8 border-r-2 border-b-2 border-white/80"></div>
        </motion.div>
        <motion.div
          className="absolute h-16 w-16 rounded-full border border-white/90"
          style={{
            left: `${focusPoint.x}%`,
            top: `${focusPoint.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: isActive ? [1, 1.3, 1] : 1,
            opacity: isActive ? [0.6, 1, 0.6] : 0,
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="absolute inset-3 rounded-full border border-white/60">
            <div className="absolute inset-2 rounded-full border border-white/40"></div>
          </div>
        </motion.div>
        <motion.div
          className="absolute top-6 right-6 left-6 flex items-start justify-between"
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="rounded-lg bg-black/60 px-3 py-2 font-mono text-xs text-white backdrop-blur-sm">
            <div className="mb-1 flex items-center gap-2">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400"></div>
              <span className="text-red-400">REC</span>
            </div>
            <div className="text-gray-300">4K • 60fps</div>
            <div className="text-gray-400">ISO 200</div>
          </div>
          <div className="rounded-lg bg-black/60 px-3 py-2 text-right font-mono text-xs text-white backdrop-blur-sm">
            <div className="text-gray-300">⚡ 87%</div>
            <div className="text-gray-400">💾 1.8GB</div>
            <div className="text-gray-400">⏱️ 12:45</div>
          </div>
        </motion.div>
        <motion.div
          className="absolute bottom-6 left-6 flex items-center gap-3"
          animate={{
            y: isActive ? [0, -5, 0] : 0,
            opacity: isActive ? 1 : 0.8,
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 backdrop-blur-sm"
            style={{ backgroundColor: `${service.accent}40` }}
          >
            <service.icon className="h-6 w-6 text-white" />
          </div>
          <div className="text-white">
            <div className="text-sm font-semibold">
              {i18n.language === "ar" ? service.title_ar : service.title_en}
            </div>
            <div className="text-xs text-gray-300">
              {i18n.language === "ar"
                ? "خدمة احترافية"
                : "Professional Service"}
            </div>
          </div>
        </motion.div>
        {service.key === "events" && (
          <motion.div
            className="absolute right-6 bottom-6 flex items-center gap-2 rounded-full border border-red-400/50 bg-red-500/90 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm"
            animate={{
              opacity: isActive ? [1, 0.7, 1] : 0,
              scale: isActive ? [1, 1.05, 1] : 1,
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="h-2 w-2 animate-pulse rounded-full bg-white"></div>
            {i18n.language === "ar" ? "مباشر" : "LIVE"}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default function ServicesSection() {
  const { i18n, t } = useTranslation("services");
  const dir = i18n.dir();
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      dir={dir}
      className="relative overflow-hidden px-3 py-32 md:px-6"
      style={{ backgroundColor: "var(--color-primaryColor)" }}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
              linear-gradient(90deg, var(--color-tertiaryColor) 1px, transparent 1px),
              linear-gradient(var(--color-tertiaryColor) 1px, transparent 1px)
            `,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>
        <div
          className={`bg-gradient-radial absolute top-0 left-0 h-1/3 w-1/3 from-gray-600/10 to-transparent`}
        ></div>
        <div
          className={`bg-gradient-radial absolute right-0 bottom-0 h-1/3 w-1/3 from-gray-500/10 to-transparent`}
        ></div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24 text-center"
        >
          <div className="mb-8 flex items-center justify-center gap-4">
            <div
              className={`h-px w-16 ${dir === "ltr" ? "bg-gradient-to-r" : "bg-gradient-to-l"} from-transparent to-gray-400`}
            ></div>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="rounded-full border border-gray-600/30 p-2 md:p-3"
              style={{ backgroundColor: "var(--color-secondaryColor)" }}
            >
              <HiCamera className="h-5 w-5 text-gray-400 md:h-6 md:w-6" />
            </motion.div>
            <span
              className={`text-[1.2rem] font-light tracking-[0.3em] uppercase ${dir === "rtl" ? "md:text-[1.3rem]" : "md:text-base"}`}
              style={{ color: "var(--color-secondaryTextColor)" }}
            >
              {t("landingSection.title")}
            </span>
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="rounded-full border border-gray-600/30 p-2 md:p-3"
              style={{ backgroundColor: "var(--color-secondaryColor)" }}
            >
              <TbDrone className="h-5 w-5 text-gray-400 md:h-6 md:w-6" />
            </motion.div>
            <div
              className={`h-px w-16 ${dir === "ltr" ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-transparent to-gray-400`}
            ></div>
          </div>

          <h2
            className="mb-8 text-5xl font-light tracking-tight md:text-6xl lg:text-7xl"
            style={{
              background:
                dir === "rtl"
                  ? "linear-gradient(135deg, var(--color-tertiaryColor) 0%, var(--color-primaryTextColor) 80%, var(--color-primaryTextColor) 100%)"
                  : "linear-gradient(135deg, var(--color-primaryTextColor) 0%, var(--color-tertiaryColor) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {t("landingSection.subtitle")}
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mx-auto max-w-3xl text-[1.05rem] leading-relaxed font-light md:text-lg"
            style={{ color: "var(--color-secondaryTextColor)" }}
          >
            {t("landingSection.description")}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const isActive = activeCard === idx;

            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.15,
                  ease: "easeOut",
                }}
                className="group relative overflow-hidden rounded-3xl border transition-all duration-700"
                style={{
                  backgroundColor: "var(--color-secondaryColor)",
                  borderColor: isActive
                    ? service.accent
                    : "var(--color-tertiaryColor)",
                }}
                onMouseEnter={() => setActiveCard(idx)}
                whileHover={{ y: -12, transition: { duration: 0.4 } }}
              >
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: `linear-gradient(135deg, ${service.accent}15, transparent 60%)`,
                  }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="h-96 overflow-hidden">
                  <ElegantViewfinder service={service} isActive={isActive} />
                </div>
                <div className="p-8">
                  <div className="mb-8 flex items-start justify-between">
                    <div className="flex-1">
                      <motion.div
                        className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border"
                        style={{
                          backgroundColor: `${service.accent}20`,
                          borderColor: `${service.accent}40`,
                        }}
                        animate={{
                          scale: isActive ? [1, 1.08, 1] : 1,
                          rotate: isActive ? [0, 3, -3, 0] : 0,
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <Icon
                          className="h-8 w-8"
                          style={{ color: service.accent }}
                        />
                      </motion.div>
                      <h3
                        className="mb-4 text-3xl font-light tracking-tight"
                        style={{ color: "var(--color-primaryTextColor)" }}
                      >
                        {i18n.language === "ar"
                          ? service.title_ar
                          : service.title_en}
                      </h3>
                      <p
                        className="text-sm leading-relaxed font-light"
                        style={{ color: "var(--color-secondaryTextColor)" }}
                      >
                        {i18n.language === "ar"
                          ? service.desc_ar
                          : service.desc_en}
                      </p>
                    </div>
                  </div>
                  <div
                    className="grid grid-cols-3 gap-6 border-t pt-8"
                    style={{ borderColor: "var(--color-tertiaryColor)" }}
                  >
                    {Object.entries(service.stats).map(([key, stat], i) => (
                      <AnimatedStat
                        key={key}
                        stat={stat}
                        statKey={key}
                        service={service}
                        delay={i * 0.2}
                      />
                    ))}
                  </div>
                </div>
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2"
                  style={{ borderColor: service.accent }}
                  animate={{ opacity: isActive ? 0.4 : 0 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            );
          })}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-24 text-center"
        >
          <motion.button
            className="rounded-full border-2 px-16 py-5 text-lg font-light tracking-wide transition-all duration-500"
            style={{
              borderColor: "var(--color-secondaryTextColor)",
              color: "var(--color-primaryTextColor)",
            }}
            whileHover={{
              scale: 1.05,
              borderColor: "#6c757d",
              backgroundColor: "#6c757d20",
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.98 }}
          >
            {t("landingSection.cta")}
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
