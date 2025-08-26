import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCamera,
  FiTrendingUp,
  FiGrid
} from "react-icons/fi";
import {
  MdOutlineVideocam,
  MdOutlineLandscape
} from "react-icons/md";
import BlogPostCard from "../components/BlogPostCard";
import BlogFilters from "../components/BlogFilters";
import BlogHero from "../components/BlogHero";
import BlogLoadingSkeleton from "../components/BlogLoadingSkeleton";
import BlogNewsletter from "../components/BlogNewsletter";
import { mockPosts } from "./mockPosts";


const Blog = () => {
  const { t , i18n } = useTranslation("blog");
    const dir =  i18n.dir();
  

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(mockPosts);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filter posts by search query and sort by latest
  useEffect(() => {
    let filtered = [...mockPosts];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Always sort by latest
    filtered.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    setFilteredPosts(filtered);
  }, [searchQuery]);

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      return newLiked;
    });
  };



  return (
    <div
    dir={dir}
      className="min-h-screen pt-16 sm:pt-20 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(29, 78, 216, 0.1) 0%, transparent 50%),
          linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)
        `
      }}
    >
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Icons */}
        <motion.div
          className="absolute top-20 left-4 sm:left-10 text-blue-400/15"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FiCamera size={20} className="sm:w-6 sm:h-6" />
        </motion.div>

        <motion.div
          className="absolute top-32 right-4 sm:right-16 text-blue-300/12"
          animate={{
            y: [0, 12, 0],
            rotate: [0, -3, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <MdOutlineVideocam size={24} className="sm:w-8 sm:h-8" />
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-4 sm:left-16 text-blue-500/8"
          animate={{
            y: [0, -8, 0],
            rotate: [0, 2, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        >
          <MdOutlineLandscape size={22} className="sm:w-7 sm:h-7" />
        </motion.div>

        <motion.div
          className="absolute top-1/2 right-8 text-blue-400/10"
          animate={{
            x: [0, 10, 0],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6
          }}
        >
          <FiTrendingUp size={18} className="sm:w-5 sm:h-5" />
        </motion.div>

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-3"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Hero Section */}
      <BlogHero />

      {/* Search and Filters Section */}
      <div className="mx-auto  md:max-w-[80%] px-4 py-8 sm:py-12 relative z-10">
        <BlogFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          resultsCount={filteredPosts.length}
        />

        {/* Blog Posts Grid */}
        {loading ? (
          <BlogLoadingSkeleton />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
            id="posts-grid"
          >
            <AnimatePresence mode="wait">
              {filteredPosts.map((post, index) => (
                <BlogPostCard
                  key={post.id}
                  post={post}
                  index={index}
                  onLike={handleLike}
                  isLiked={likedPosts.has(post.id)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* No Results */}
        {filteredPosts.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-16 sm:py-20 text-center px-4"
          >
            <div className="mx-auto max-w-md">
              <motion.div
                className="mb-6 flex justify-center"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FiGrid className="text-4xl sm:text-6xl text-blue-400/50" />
              </motion.div>
              <h3 className="mb-2 text-lg sm:text-xl font-semibold text-white">
                {t("search.noResults")}
              </h3>
              <p className="text-sm sm:text-base text-slate-400">
                Try adjusting your search criteria or browse our latest articles
              </p>
            </div>
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredPosts.length > 6 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 sm:mt-16 text-center px-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-xl px-6 sm:px-8 py-3 sm:py-4 text-white transition-all duration-300 text-sm sm:text-base"
              style={{
                background: `linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)`,
                border: '1px solid rgba(59, 130, 246, 0.3)',
                boxShadow: '0 4px 15px rgba(59, 130, 246, 0.2)'
              }}
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                <FiTrendingUp className="h-4 w-4" />
                <span>{t("meta.loadMore")}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-400/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Newsletter Section */}
      {!loading && <BlogNewsletter />}
    </div>
  );
};

export default Blog;
