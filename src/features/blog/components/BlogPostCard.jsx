import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FiCalendar,
  FiUser,
  FiHeart,
  FiMessageCircle,
  FiShare2,
  FiClock,
  FiTag,
  FiEye,
  FiEyeOff
} from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

const BlogPostCard = ({ post, index, onLike, isLiked }) => {
  const { t, i18n } = useTranslation("blog");
  const isRTL = i18n.language === "ar";
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isRTL ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: {
      y: -12,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="group relative overflow-hidden rounded-2xl backdrop-blur-sm transition-all duration-500 shadow-xl"
      style={{
        background: `linear-gradient(135deg,
          rgba(15, 23, 42, 0.95) 0%,
          rgba(30, 41, 59, 0.9) 50%,
          rgba(51, 65, 85, 0.85) 100%)`,
        border: "1px solid rgba(148, 163, 184, 0.1)",
        boxShadow: `
          0 20px 40px -12px rgba(0, 0, 0, 0.4),
          0 0 0 1px rgba(148, 163, 184, 0.05),
          inset 0 1px 0 rgba(255, 255, 255, 0.03)
        `
      }}
    >
      {/* Featured Image Container */}
      <div className="relative h-64 overflow-hidden">
        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-pulse"></div>
        )}

        <motion.img
          variants={imageVariants}
          src={post.image}
          alt={post.title}
          onLoad={() => setImageLoaded(true)}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent"></div>
        
        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute top-6 left-6 rtl:left-auto rtl:right-6"
        >
          <span
            className="inline-flex items-center rounded-full px-3 py-1.5  md:px-4 md:py-2 text-[.85rem] sm:text-sm font-semibold shadow-lg backdrop-blur-sm"
            style={{
              background: `linear-gradient(135deg,
                var(--color-tertiaryColor, #032747) 0%,
                var(--color-darkBlueColor, #001d3d) 100%)`,
              color: "var(--color-primaryTextColor, #fff)",
              border: "1px solid rgba(96, 165, 250, 0.2)"
            }}
          >
            {t(`filters.categories.${post.category}`)}
          </span>
        </motion.div>

        {/* Like Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onLike(post.id)}
          className="absolute top-6 right-6 rtl:right-auto rtl:left-6 rounded-full p-2 leading-1 md:p-3 backdrop-blur-sm transition-all duration-300"
          style={{
            background: "rgba(33, 37, 41, 0.7)",
            border: "1px solid rgba(96, 165, 250, 0.2)"
          }}
        >
          <motion.div
            animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {isLiked ? (
              <FaHeart className="h-4 w-4 md:h-5 md:w-5 text-red-400" />
            ) : (
              <FiHeart className="h-4 w-4 md:h-5 md:w-5" style={{ color: "var(--color-primaryTextColor, #fff)" }} />
            )}
          </motion.div>
        </motion.button>

      
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6">
        {/* Title */}
        <h3
          className="mb-3 text-lg sm:text-xl font-bold transition-colors duration-300 leading-tight group-hover:text-blue-400 line-clamp-2 text-[.85rem] sm:text-base"
          style={{ color: "var(--color-primaryTextColor, #fff)" }}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p
          className="mb-4 leading-relaxed line-clamp-2 text-[.85rem] sm:text-sm"
          style={{ color: "var(--color-secondaryTextColor, #94a3b8)" }}
        >
          {post.excerpt}
        </p>

        {/* Basic Meta Information */}
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[.85rem] sm:text-sm" style={{ color: "var(--color-secondaryTextColor, #64748b)" }}>
          <div className="flex items-center gap-2">
            <FiClock className="h-3 w-3 text-blue-400" />
            <span>{t("post.readTime", { minutes: post.readTime })}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCalendar className="h-3 w-3 text-blue-400" />
            <span >{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>

      

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
          <Link
            to={`/blog/${post.id}`}
            className="group/btn inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:shadow-lg"
            style={{
              background: `linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)`,
              color: "#fff"
            }}
          >
            <span>{t("post.readMore")}</span>
            <motion.span
              animate={{ x: isRTL ? [-2, 2, -2] : [2, -2, 2] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="group-hover/btn:translate-x-1 transition-transform duration-300"
            >
              {isRTL ? "←" : "→"}
            </motion.span>
          </Link>

         
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div
        className="absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg,
            rgba(59, 130, 246, 0.05) 0%,
            rgba(29, 78, 216, 0.03) 50%,
            rgba(147, 197, 253, 0.02) 100%)`,
          boxShadow: "0 0 30px rgba(59, 130, 246, 0.1)"
        }}
      />
    </motion.article>
  );
};

export default BlogPostCard;
