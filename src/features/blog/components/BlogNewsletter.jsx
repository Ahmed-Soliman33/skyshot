import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FiMail,
  FiCheck,
  FiCamera,
  FiVideo,
  FiTrendingUp,
  FiZap,
  FiSend,
  FiStar,
  FiGlobe
} from "react-icons/fi";
import {

  MdOutlineFlight
} from "react-icons/md";
import { CiMail } from "react-icons/ci";

const BlogNewsletter = () => {
  const { t , i18n } = useTranslation("blog");
  const lang = i18n.language
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail("");
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-2xl p-8 lg:p-12 backdrop-blur-sm"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(29, 78, 216, 0.1) 0%, transparent 50%),
            linear-gradient(135deg,
              rgba(15, 23, 42, 0.95) 0%,
              rgba(30, 41, 59, 0.9) 50%,
              rgba(51, 65, 85, 0.85) 100%)
          `,
          border: "1px solid rgba(148, 163, 184, 0.2)",
          boxShadow: `
            0 25px 50px -12px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.03)
          `
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-8 right-8 text-blue-400/8"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <MdOutlineFlight size={40} />
          </motion.div>

          <motion.div
            className="absolute top-16 left-12 text-blue-300/6"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FiCamera size={24} />
          </motion.div>

          <motion.div
            className="absolute bottom-12 right-16 text-blue-500/5"
            animate={{
              rotate: [360, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FiVideo size={32} />
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-8 text-blue-400/7"
            animate={{
              x: [0, 10, 0],
              y: [0, -10, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FiGlobe size={28} />
          </motion.div>
        </div>

        <div className="relative z-10 text-center">
          {/* Icon with enhanced animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl relative"
            style={{
              background: `linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)`,
              boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)"
            }}
          >
            <motion.div
              
            >
              <CiMail  className="h-8 w-8 text-white" />
            </motion.div>
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `linear-gradient(135deg,
                  rgba(59, 130, 246, 0.3) 0%,
                  rgba(29, 78, 216, 0.1) 100%)`
              }}
            />
          </motion.div>

          {/* Title with enhanced styling */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl font-bold mb-3 lg:text-3xl"
            style={{ color: "var(--color-primaryTextColor, #fff)" }}
          >
            { lang === "ar" ? "ابقى على اطلاع دائم" : "Stay Updated with"}{" "}
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                background: `linear-gradient(90deg,
                  #60a5fa 0%,
                  #3b82f6 25%,
                  #1d4ed8 50%,
                  #3b82f6 75%,
                  #60a5fa 100%)`,
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent"
              }}
            >
              { lang === "ar" ? "قصص سكاي شوت" : "Skyshot Stories"}
            </motion.span>
          </motion.h3>

          {/* Enhanced Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm sm:text-base mb-6 max-w-xl mx-auto leading-relaxed"
            style={{ color: "var(--color-secondaryTextColor, #94a3b8)" }}
          >
            { lang === "ar" ? "انضم إلى مجتمعنا من محبي التصوير الجوي واحصل على نصائح مميزة وتلميحات إبداعية وقصص رائعة تم تسليمها إلى بريدك الإلكتروني." : "Join our community of aerial enthusiasts and get exclusive insights, creative tips, and breathtaking stories delivered to your inbox."}
          </motion.p>

          {/* Enhanced Subscription Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-lg mx-auto"
          >
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={ lang === "ar" ? "أدخل عنوان بريدك الإلكتروني" : "Enter your email address"}
                    required
                    className="w-full rounded-lg text-[.85rem] sm:text-base pl-12 pr-4 py-3 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                    style={{
                      background: "rgba(15, 23, 42, 0.8)",
                      border: "1px solid rgba(148, 163, 184, 0.3)",
                      color: "var(--color-primaryTextColor, #fff)",
                      boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)"
                    }}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="rounded-lg text-[.85rem] sm:text-base  px-6 py-3 font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{
                    background: `linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)`,
                    color: "#fff",
                    boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)"
                  }}
                >
                  {isLoading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  ) : (
                    <>
                      <FiSend className="h-4 w-4" />
                      <span>{ lang === "ar" ? "اشترك" : "Subscribe"}</span>
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 rounded-lg px-6 py-4"
                style={{
                  background: "rgba(34, 197, 94, 0.15)",
                  border: "1px solid rgba(34, 197, 94, 0.3)",
                  color: "#4ade80"
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <FiCheck className="h-6 w-6" />
                </motion.div>
                <span className="font-semibold">{ lang === "ar" ? "مرحبا بكم في قصص سكاي شوت" : "Welcome to Skyshot Stories!"}</span>
              </motion.div>
            )}
          </motion.div>

          {/* Enhanced Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 max-w-3xl mx-auto"
          >
            {[
              { icon: FiStar, text: lang === "ar" ? "نصائح مميزة" : "Premium Tips", color: "#fbbf24", description: lang === "ar" ? "نصائح مميزة" : "Weekly insights" },
              { icon: FiCamera, text: lang === "ar" ? "مشاهدة خلفية" : "Behind Scenes", color: "#60a5fa", description: lang === "ar" ? "محتوى مميز" : "Exclusive content" },
              { icon: FiTrendingUp, text: lang === "ar" ? "أحدث الأخبار" : "Industry News", color: "#34d399", description: lang === "ar" ? "أحدث الأخبار" : "Latest trends" },
              { icon: FiZap, text: lang === "ar" ? "وصول مبكر" : "Early Access", color: "#f472b6", description: lang === "ar" ? "ميزات جديدة" : "New features" }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  y: -5
                }}
                className="text-center p-4 rounded-lg backdrop-blur-sm group cursor-pointer"
                style={{
                  background: "rgba(59, 130, 246, 0.05)",
                  border: "1px solid rgba(148, 163, 184, 0.1)"
                }}
              >
                <motion.div
                  className="flex justify-center mb-2"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      background: `${benefit.color}20`,
                      border: `1px solid ${benefit.color}30`
                    }}
                  >
                    <benefit.icon className="text-xl" style={{ color: benefit.color }} />
                  </div>
                </motion.div>
                <div className="text-sm font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
                  {benefit.text}
                </div>
                <div className="text-xs" style={{ color: "var(--color-secondaryTextColor, #94a3b8)" }}>
                  {benefit.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Decorative Glow Elements */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-8 -right-8 h-32 w-32 rounded-full blur-2xl"
          style={{
            background: `radial-gradient(circle,
              rgba(59, 130, 246, 0.2) 0%,
              rgba(147, 197, 253, 0.1) 50%,
              transparent 100%)`
          }}
        />

        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full blur-2xl"
          style={{
            background: `radial-gradient(circle,
              rgba(29, 78, 216, 0.2) 0%,
              rgba(59, 130, 246, 0.1) 50%,
              transparent 100%)`
          }}
        />

        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 right-4 h-20 w-20 rounded-full blur-xl"
          style={{
            background: `radial-gradient(circle,
              rgba(147, 197, 253, 0.15) 0%,
              rgba(59, 130, 246, 0.05) 50%,
              transparent 100%)`
          }}
        />
      </motion.div>
    </div>
  );
};

export default BlogNewsletter;
