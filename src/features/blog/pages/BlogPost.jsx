import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiUser,
  FiClock,
  FiHeart,
  FiMessageCircle,
  FiShare2,
  FiTag,
  FiEye,
  FiBookmark,
  FiTrendingUp,
  FiCamera,
  FiStar
} from "react-icons/fi";
import { FaHeart, FaBookmark } from "react-icons/fa";
import {
  MdOutlinePhotoCamera,
  MdOutlineVideocam,
  MdOutlineLandscape
} from "react-icons/md";
import BlogPostCard from "../components/BlogPostCard";
import CommentsSection from "../components/CommentsSection";
  import { mockPosts } from "./mockPosts";

const relatedPosts = [
  {
    id: 2,
    title: "Behind the Scenes: Epic Desert Drone Shoot",
    excerpt: "Take a look behind the camera as we capture stunning desert landscapes.",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "behind-scenes",
    author: "Sara Mohammed",
    publishedAt: "2024-01-12",
    readTime: 6,
    likes: 89,
    comments: 15,
    tags: ["desert", "behind-scenes"]
  },
  {
    id: 3,
    title: "Advanced Drone Videography Techniques",
    excerpt: "Master the art of cinematic drone videography with professional techniques.",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "videography",
    author: "Omar Hassan",
    publishedAt: "2024-01-10",
    readTime: 12,
    likes: 156,
    comments: 31,
    tags: ["videography", "techniques"]
  }
];

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("blog");
  const isRTL = i18n.language === "ar";
  const dir = i18n.dir();
  const lang = i18n.language;

  const [post, setPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    // Simulate API call
    setPost(mockPosts[id - 1]);
  }, [id]);

  // Reading progress tracking and parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(Math.min(progress, 100));

      // Parallax effect for background elements
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax-element');
      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const prevPostId = id > 1 ? +id - 1 : null;
  const nextPostId = id < mockPosts.length ? +id + 1 : null;




  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  
  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post?.title;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      copy: url
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      // Show toast notification
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isRTL ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "long", 
      day: "numeric"
    });
  };

  if (!post) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(29, 78, 216, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)
          `
        }}
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-slate-300">{t("meta.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      dir={dir}
      className="min-h-screen relative"
      style={{
        background: `
          radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(29, 78, 216, 0.1) 0%, transparent 50%),
          linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)
        `
      }}
    >
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 z-50"
        style={{ width: `${readingProgress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${readingProgress}%` }}
        transition={{ duration: 0.1 }}
      />

      {/* Enhanced Animated Background Elements with Parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="parallax-element absolute top-20 left-10 text-blue-400/10"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <MdOutlinePhotoCamera size={32} />
        </motion.div>

        <motion.div
          className="parallax-element absolute top-1/3 right-16 text-blue-300/8"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -3, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <MdOutlineVideocam size={28} />
        </motion.div>

        <motion.div
          className="parallax-element absolute bottom-1/3 left-20 text-blue-500/6"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 2, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        >
          <MdOutlineLandscape size={24} />
        </motion.div>

        {/* Additional floating elements */}
        <motion.div
          className="parallax-element absolute top-2/3 right-1/4 text-blue-400/5"
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6
          }}
        >
          <FiCamera size={20} />
        </motion.div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[80vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-slate-900/20"></div>
        
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-16 left-6 rtl:left-auto  rtl:right-6 z-10"
          >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/blog")}
            className="flex items-center gap-3 rounded-xl cursor-pointer px-5 py-3 text-white backdrop-blur-md transition-all duration-300 shadow-lg"
            style={{
              background: "rgba(15, 23, 42, 0.8)",
              border: "1px solid rgba(148, 163, 184, 0.2)"
            }}
          >
            {isRTL ? <FiArrowRight className="h-5 w-5 text-blue-400" /> : <FiArrowLeft className="h-5 w-5 text-blue-400" />}
            <span className="font-medium">{t("post.backToBlog")}</span>
          </motion.button>
        </motion.div>

        {/* Post Meta */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Category Badge */}
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold mb-6 backdrop-blur-sm"
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                  color: "#fff",
                  boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)"
                }}
              >
                <FiTag className="h-4 w-4" />
                {t(`filters.categories.${post.category}`)}
              </motion.span>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              >
                {post.title}
              </motion.h1>

              {/* Meta Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="flex flex-wrap items-center gap-4 sm:gap-6 text-slate-300"
              >
                <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <FiUser className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium">{post.author}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <FiCalendar className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">{post.publishedAt}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <FiClock className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">{t("post.readTime", { minutes: post.readTime })}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <FiHeart className="h-4 w-4 text-red-400" />
                  <span className="text-sm">{post.likes}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <FiMessageCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm">{post.comments}</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Sticky Action Buttons */}
      <motion.div
        initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="fixed top-1/2 right-6 rtl:right-auto rtl:left-6 z-20 -translate-y-1/2"
      >
        <div className="flex flex-col gap-3">
          {/* Like Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className="rounded-xl p-3 backdrop-blur-md transition-all duration-300 shadow-lg"
            style={{
              background: isLiked ? "rgba(239, 68, 68, 0.2)" : "rgba(15, 23, 42, 0.8)",
              border: `1px solid ${isLiked ? "rgba(239, 68, 68, 0.3)" : "rgba(148, 163, 184, 0.2)"}`,
            }}
          >
            {isLiked ? (
              <FaHeart className="h-5 w-5 text-red-400" />
            ) : (
              <FiHeart className="h-5 w-5 text-slate-300" />
            )}
          </motion.button>

          {/* Bookmark Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBookmark}
            className="rounded-xl p-3 backdrop-blur-md transition-all duration-300 shadow-lg"
            style={{
              background: isBookmarked ? "rgba(59, 130, 246, 0.2)" : "rgba(15, 23, 42, 0.8)",
              border: `1px solid ${isBookmarked ? "rgba(59, 130, 246, 0.3)" : "rgba(148, 163, 184, 0.2)"}`,
            }}
          >
            {isBookmarked ? (
              <FaBookmark className="h-5 w-5 text-blue-400" />
            ) : (
              <FiBookmark className="h-5 w-5 text-slate-300" />
            )}
          </motion.button>

          {/* Share Button */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="rounded-xl p-3 backdrop-blur-md transition-all duration-300 shadow-lg"
              style={{
                background: showShareMenu ? "rgba(34, 197, 94, 0.2)" : "rgba(15, 23, 42, 0.8)",
                border: `1px solid ${showShareMenu ? "rgba(34, 197, 94, 0.3)" : "rgba(148, 163, 184, 0.2)"}`,
              }}
            >
              <FiShare2 className={`h-5 w-5 ${showShareMenu ? 'text-green-400' : 'text-slate-300'}`} />
            </motion.button>
            
            <AnimatePresence>
              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: isRTL ? 70 : -70 }}
                  animate={{ opacity: 1, scale: 1, x: isRTL ? 70 : -70 }}
                  exit={{ opacity: 0, scale: 0.8, x: isRTL ? 70 : -70 }}
                  className="absolute top-0 backdrop-blur-md rounded-xl p-3 min-w-[140px] shadow-xl"
                  style={{
                    background: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(148, 163, 184, 0.2)"
                  }}
                >
                  <motion.button
                    whileHover={{ scale: 1.02, x: 2 }}
                    onClick={() => handleShare('facebook')}
                    className="w-full text-left px-3 py-2 text-sm text-white hover:bg-blue-500/20 rounded-lg transition-all duration-200 flex items-center gap-2"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Facebook
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, x: 2 }}
                    onClick={() => handleShare('twitter')}
                    className="w-full text-left px-3 py-2 text-sm text-white hover:bg-sky-500/20 rounded-lg transition-all duration-200 flex items-center gap-2"
                  >
                    <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                    Twitter
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, x: 2 }}
                    onClick={() => handleShare('linkedin')}
                    className="w-full text-left px-3 py-2 text-sm text-white hover:bg-blue-600/20 rounded-lg transition-all duration-200 flex items-center gap-2"
                  >
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    LinkedIn
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, x: 2 }}
                    onClick={() => handleShare('copy')}
                    className="w-full text-left px-3 py-2 text-sm text-white hover:bg-green-500/20 rounded-lg transition-all duration-200 flex items-center gap-2"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {t("social.copyLink")}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Article Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 relative z-10">
        <motion.article
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="prose prose-lg prose-invert max-w-none"
          style={{
            background: "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(148, 163, 184, 0.1)",
            borderRadius: "1.5rem",
            padding: "2rem",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          }}
        >
          {/* Article Excerpt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8 p-6 rounded-xl"
            style={{
              background: "rgba(59, 130, 246, 0.1)",
              border: "1px solid rgba(59, 130, 246, 0.2)"
            }}
          >
            <p className="text-lg text-blue-100 leading-relaxed italic mb-0">
              { lang === "ar" ? "ملخص" : "Excerpt" } : {post.excerpt}
            </p>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-slate-300 leading-relaxed prose-headings:text-white prose-headings:font-bold prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-p:mb-6 prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              fontSize: '1.1rem',
              lineHeight: '1.8'
            }}
          />
        </motion.article>

        {/* Enhanced Tags Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-12 p-6 rounded-xl"
          style={{
            background: "rgba(30, 41, 59, 0.4)",
            border: "1px solid rgba(148, 163, 184, 0.1)"
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <FiTag className="h-5 w-5 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">{t("post.tags")}</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {post.tags.map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  y: -2
                }}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 cursor-pointer"
                style={{
                  background: "rgba(59, 130, 246, 0.1)",
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                  color: "#93c5fd"
                }}
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                #{tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Author Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-12 rounded-2xl backdrop-blur-md p-8"
          style={{
            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(29, 78, 216, 0.05) 100%)",
            border: "1px solid rgba(59, 130, 246, 0.2)",
            boxShadow: "0 8px 32px rgba(59, 130, 246, 0.1)"
          }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="relative"
            >
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <FiUser className="h-10 w-10 text-white" />
              </div>
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-500 -z-10"
              />
            </motion.div>
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-white mb-2">{post.author}</h4>
              <p className="text-blue-200 mb-3">{ lang === "ar" ? "مصور جوي محترف ومنشئ محتوى" : "Professional Aerial Photographer & Content Creator"}</p>
              <p className="text-slate-400 text-sm leading-relaxed">
{ lang === "ar" ? "أنا مصور جوي محترف ومنشئ محتوى، متخصص في تصوير الفيديو الجوي المثير للإعجاب، وله خبرة أكثر من 5 أعوام في هذا المجال." : "Specializing in cinematic drone photography and videography, capturing breathtaking perspectives from above with over 5 years of experience in the field."}              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <FiCamera className="h-4 w-4 text-blue-400" />
                  <span>50+ Projects</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <FiStar className="h-4 w-4 text-yellow-400" />
                  <span>4.9 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Comments Section */}
      <CommentsSection postId={id} />

      {/* Enhanced Related Posts Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
                <FiTrendingUp className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                  {t("post.relatedPosts")}
                </span>
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="text-slate-400 max-w-2xl mx-auto"
            >
              Discover more inspiring content and creative insights from our aerial photography collection
            </motion.p>
          </div>

          {/* Related Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {relatedPosts.map((relatedPost, index) => (
              <motion.div
                key={relatedPost.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 + index * 0.2 }}
              >
                <BlogPostCard
                  post={relatedPost}
                  index={index}
                  onLike={() => {}}
                  isLiked={likedPosts.has(relatedPost.id)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Enhanced Navigation */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.7 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-12"
          style={{
            borderTop: "1px solid rgba(148, 163, 184, 0.2)"
          }}
        >
          <motion.button
            whileHover={{ scale: 1.02, x: isRTL ? 5 : -5 }}
            whileTap={{ scale: 0.98 }}
            disabled={!prevPostId}
            className={`${prevPostId ? "" : "opacity-50 cursor-not-allowed"}`}
          >
            <Link
              to={ prevPostId && `/blog/${prevPostId ? prevPostId : 1}`} 
              className={`flex items-center  gap-4 rounded-xl px-6 py-4 text-white backdrop-blur-md transition-all duration-300 shadow-lg group   `}
              style={{
                background: "rgba(15, 23, 42, 0.8)",
                border: "1px solid rgba(148, 163, 184, 0.2)"
              }}
            >
              <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                {isRTL ? <FiArrowRight className="h-5 w-5 text-blue-400" /> : <FiArrowLeft className="h-5 w-5 text-blue-400" />}
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Previous</p>
                <span className="font-medium">{t("post.previousPost")}</span>
              </div>
            </Link>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, x: isRTL ? -5 : 5 }}
            whileTap={{ scale: 0.98 }}
            disabled={!nextPostId}
            className={`${nextPostId ? "" : "opacity-50 cursor-not-allowed"}`}
          >
            <Link
              to={ nextPostId && `/blog/${nextPostId ? nextPostId : 1}`}
              className="flex items-center gap-4 rounded-xl px-6 py-4 text-white backdrop-blur-md transition-all duration-300 shadow-lg group"
              style={{
                background: "rgba(15, 23, 42, 0.8)",
                border: "1px solid rgba(148, 163, 184, 0.2)"
              }}
            >
              <div>
                <p className="text-xs text-slate-400 mb-1">Next</p>
                <span className="font-medium">{t("post.nextPost")}</span>
              </div>
              <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                {isRTL ? <FiArrowLeft className="h-5 w-5 text-blue-400" /> : <FiArrowRight className="h-5 w-5 text-blue-400" />}
              </div>
            </Link>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost;
