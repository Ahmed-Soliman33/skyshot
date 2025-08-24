import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useState } from "react";
import { HiStar, HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { FaQuoteLeft } from "react-icons/fa6";

const testimonials = [
  {
    id: 1,
    name: "أحمد محمد",
    nameEn: "Ahmed Mohammed",
    role: "مدير تسويق",
    roleEn: "Marketing Manager",
    company: "شركة الرؤية العقارية",
    companyEn: "Vision Real Estate",
    rating: 5,
    testimonial: "testimonial1",
    location: "الرياض",
    locationEn: "Riyadh",
  },
  {
    id: 2,
    name: "فاطمة العلي",
    nameEn: "Fatima Al-Ali",
    role: "منظمة فعاليات",
    roleEn: "Event Organizer",
    company: "مؤسسة الأحلام",
    companyEn: "Dreams Foundation",
    rating: 5,
    testimonial: "testimonial2",
    location: "جدة",
    locationEn: "Jeddah",
  },
  {
    id: 3,
    name: "خالد السعد",
    nameEn: "Khalid Al-Saad",
    role: "مطور عقاري",
    roleEn: "Real Estate Developer",
    company: "مجموعة النخبة",
    companyEn: "Elite Group",
    rating: 5,
    testimonial: "testimonial3",
    location: "الدمام",
    locationEn: "Dammam",
  },
  {
    id: 4,
    name: "نورا الحربي",
    nameEn: "Nora Al-Harbi",
    role: "مديرة علاقات عامة",
    roleEn: "PR Manager",
    company: "شركة الإبداع",
    companyEn: "Creativity Company",
    rating: 5,
    testimonial: "testimonial4",
    location: "مكة",
    locationEn: "Mecca",
  },
  {
    id: 5,
    name: "محمد الزهراني",
    nameEn: "Mohammed Al-Zahrani",
    role: "صاحب مطعم",
    roleEn: "Restaurant Owner",
    company: "مطاعم الذوق الرفيع",
    companyEn: "Fine Taste Restaurants",
    rating: 5,
    testimonial: "testimonial5",
    location: "المدينة المنورة",
    locationEn: "Medina",
  },
];

const TestimonialCard = ({ testimonial, index, isActive, zIndex, onClick }) => {
  const { t, i18n } = useTranslation("testimonials");
  const isRTL = i18n.language === "ar";

  const dir = i18n.dir();

  const currentColor = {
    bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", // Dark Navy
    border: "#3d5a80",
    shadow: "0 25px 50px rgba(61, 90, 128, 0.2)",
    accent: "#98c1d9",
  };

  const cardVariants = {
    inactive: {
      scale: 0.85 - index * 0.08,
      y: -index * 30,
      x: isRTL ? index * -25 : index * 25,
      rotateY: isRTL ? index * -5 : index * 5,
      rotateX: index * 3,
      opacity: 1 - index * 0.15,
      filter: `blur(${index * 2}px)`,
    },
    active: {
      scale: 1,
      y: 0,
      x: 0,
      rotateY: 0,
      rotateX: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
  };

  return (
    <motion.div
      dir={dir}
      variants={cardVariants}
      animate={isActive ? "active" : "inactive"}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 60,
        damping: 25,
      }}
      onClick={onClick}
      className="absolute inset-0"
      style={{
        zIndex: isActive ? 20 : 10 - index,
        transformStyle: "preserve-3d",
        perspective: "1500px",
      }}
      whileHover={
        !isActive
          ? {
              scale: 0.9 - index * 0.01,
              y: -index * 13,
              transition: { duration: 0.4 },
            }
          : {}
      }
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-3xl border-2 p-10 transition-all duration-700 sm:p-6 md:p-8"
        style={{
          background: isActive
            ? currentColor.bg
            : "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)",
          borderColor: isActive
            ? currentColor.border
            : "rgba(203, 213, 225, 0.4)",
          boxShadow: isActive
            ? currentColor.shadow
            : "0 20px 40px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Glassmorphism Effect */}
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: isActive
              ? "rgba(255,255,255,0.08)"
              : "rgba(255,255,255,0.3)",
            backdropFilter: "blur(25px)",
          }}
        />

        {/* Decorative Pattern */}
        <div
          className="absolute inset-0 rounded-3xl opacity-10"
          style={{
            backgroundImage: isActive
              ? `radial-gradient(circle at 20% 80%, ${currentColor.accent} 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${currentColor.accent} 0%, transparent 50%)`
              : "none",
          }}
        />

        <div className="relative z-10 flex h-full flex-col">
          {/* Quote Icon */}
          <motion.div
            className="mb-6 flex justify-center sm:mb-4 md:mb-4"
            animate={{
              scale: isActive ? 1.2 : 0.9,
              opacity: isActive ? 1 : 0.7,
            }}
          >
            <div
              className="rounded-full border p-3 sm:p-4"
              style={{
                backgroundColor: isActive
                  ? "rgba(255,255,255,0.15)"
                  : "rgba(148, 163, 184, 0.1)",
                borderColor: isActive
                  ? "rgba(255,255,255,0.2)"
                  : "rgba(148, 163, 184, 0.2)",
              }}
            >
              <FaQuoteLeft
                className="h-6 w-6 md:h-8 md:w-8"
                style={{
                  color: isActive
                    ? "rgba(255,255,255,0.9)"
                    : "var(--color-tertiaryColor)",
                }}
              />
            </div>
          </motion.div>

          {/* Stars */}
          <div className="mb-5 flex justify-center gap-2">
            {[...Array(testimonial.rating)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: isActive ? 1.2 : 0.9,
                  opacity: isActive ? 1 : 0.7,
                }}
                transition={{ delay: i * 0.1 }}
              >
                <HiStar
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  style={{
                    color: isActive ? "#fbbf24" : "#f59e0b",
                    filter: isActive
                      ? "drop-shadow(0 2px 8px rgba(251, 191, 36, 0.4))"
                      : "none",
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Testimonial Text */}
          <motion.div
            className="mb-8 flex flex-1 items-center justify-center sm:mb-6 md:mb-4"
            animate={{
              opacity: isActive ? 1 : 0.8,
              y: isActive ? 0 : 15,
            }}
          >
            <p
              className="max-w-md text-center text-[1.05rem] leading-relaxed font-medium sm:text-lg"
              style={{
                color: isActive
                  ? "rgba(255,255,255,0.95)"
                  : "var(--color-primaryTextColor)",
                fontStyle: "italic",
              }}
            >
              "{t(`testimonials.${testimonial.testimonial}`)}"
            </p>
          </motion.div>

          {/* Client Info */}
          <motion.div
            className="border-t pt-4 text-center sm:pt-4 md:pt-6"
            style={{
              borderColor: isActive
                ? "rgba(255,255,255,0.2)"
                : "rgba(203, 213, 225, 0.3)",
            }}
            animate={{
              opacity: isActive ? 1 : 0.7,
              y: isActive ? 0 : 20,
            }}
          >
            <h4
              className="mb-1 text-[1.1rem] font-bold md:mb-2"
              style={{
                color: isActive
                  ? "rgba(255,255,255,0.95)"
                  : "var(--color-primaryTextColor)",
              }}
            >
              {isRTL ? testimonial.name : testimonial.nameEn}
            </h4>

            <p
              className="mb-1 text-sm font-semibold"
              style={{
                color: isActive
                  ? currentColor.accent
                  : "var(--color-tertiaryColor)",
              }}
            >
              {isRTL ? testimonial.role : testimonial.roleEn}
            </p>

            <p
              className="text-[.8rem] font-medium opacity-80 sm:text-xs"
              style={{
                color: isActive
                  ? "rgba(255,255,255,0.7)"
                  : "rgba(255,255,255,0.4)",
              }}
            >
              {isRTL ? testimonial.company : testimonial.companyEn} •{" "}
              {isRTL ? testimonial.location : testimonial.locationEn}
            </p>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute -top-4 -right-4 h-8 w-8 rounded-full sm:h-6 sm:w-6 md:h-8 md:w-8"
            style={{
              background: isActive ? "rgba(255,255,255,0.2)" : currentColor.bg,
              opacity: 0.6,
            }}
            animate={{
              scale: isActive ? [1, 1.3, 1] : 1,
              opacity: isActive ? [0.6, 0.9, 0.6] : 0.3,
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-4 -left-4 h-6 w-6 rounded-full sm:h-4 sm:w-4 md:h-6 md:w-6"
            style={{
              background: isActive ? "rgba(255,255,255,0.15)" : currentColor.bg,
              opacity: 0.4,
            }}
            animate={{
              scale: isActive ? [1, 1.4, 1] : 1,
              opacity: isActive ? [0.4, 0.8, 0.4] : 0.2,
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default function TestimonialsSection() {
  const { t, i18n } = useTranslation("testimonials");
  const dir = i18n.dir();
  const [currentIndex, setCurrentIndex] = useState(0);
  const isRTL = i18n.language === "ar";

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const getVisibleCards = () => {
    const visibleCards = [];
    const maxVisible = Math.min(5, testimonials.length);

    for (let i = 0; i < maxVisible; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visibleCards.push({
        ...testimonials[index],
        displayIndex: i,
        isActive: i === 0,
      });
    }
    return visibleCards;
  };

  return (
    <section
      dir={dir}
      className="relative overflow-hidden px-6 py-24"
      style={{ backgroundColor: "var(--color-primaryColor)" }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 70%, var(--color-tertiaryColor) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <motion.h2
            className="mb-6 text-4xl font-light tracking-tight md:text-5xl"
            style={{
              background:
                dir === "rtl"
                  ? "linear-gradient(135deg, var(--color-tertiaryColor) 0%, var(--color-primaryTextColor) 100%)"
                  : "linear-gradient(135deg, var(--color-primaryTextColor) 0%, var(--color-tertiaryColor) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {t("testimonials.title")}
          </motion.h2>

          <motion.p
            className="mx-auto max-w-md text-base leading-relaxed md:max-w-xl md:text-lg"
            style={{ color: "var(--color-secondaryTextColor)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {t("testimonials.description")}
          </motion.p>
        </motion.div>

        {/* Testimonials Stack */}
        <div className="relative mx-auto max-w-2xl">
          <motion.div
            className="relative h-[450px]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {getVisibleCards().map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.id}-${currentIndex}`}
                testimonial={testimonial}
                index={index}
                isActive={testimonial.isActive}
                zIndex={10 - index}
                onClick={() => {
                  if (index > 0) {
                    setCurrentIndex(
                      (currentIndex + index) % testimonials.length,
                    );
                  }
                }}
              />
            ))}
          </motion.div>
          {/* Navigation */}
          <div className="mt-12 flex items-center justify-center gap-6">
            <motion.button
              onClick={prevTestimonial}
              className="rounded-full border p-3 transition-all duration-300"
              style={{
                borderColor: "var(--color-primaryTextColor)", // #fff
                color: "var(--color-primaryTextColor)", // #fff
              }}
              whileHover={{
                scale: 1.1,
                borderColor: "var(--color-primaryTextColor)", // #fff
                backgroundColor: "var(--color-primaryColor)", // #212529
              }}
              whileTap={{ scale: 0.95 }}
            >
              {isRTL ? (
                <HiArrowRight className="h-5 w-5" />
              ) : (
                <HiArrowLeft className="h-5 w-5" />
              )}
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="h-2 w-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor:
                      index === currentIndex
                        ? "var(--color-primaryTextColor)" // #fff for active dot
                        : "var(--color-secondaryTextColor)", // #6a7282 for inactive dots
                    opacity: index === currentIndex ? 1 : 0.5,
                  }}
                  whileHover={{ scale: 1.2 }}
                  animate={{
                    scale: index === currentIndex ? 1.2 : 1,
                    width: index === currentIndex ? "24px" : "8px",
                  }}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="rounded-full border p-3 transition-all duration-300"
              style={{
                borderColor: "var(--color-primaryTextColor)", // #fff
                color: "var(--color-primaryTextColor)", // #fff
              }}
              whileHover={{
                scale: 1.1,
                borderColor: "var(--color-primaryTextColor)", // #fff
                backgroundColor: "var(--color-primaryColor)", // #212529
              }}
              whileTap={{ scale: 0.95 }}
            >
              {isRTL ? (
                <HiArrowLeft className="h-5 w-5" />
              ) : (
                <HiArrowRight className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
