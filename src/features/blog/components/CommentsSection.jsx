import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FiUser,
  FiHeart,
  FiMessageCircle,
  FiMoreVertical,
  FiCalendar,
  FiSend,
  FiCornerDownRight,
  FiThumbsUp,
  FiEdit3,
  FiStar,
  FiClock
} from "react-icons/fi";
import { FaHeart, FaUserCircle } from "react-icons/fa";

// Mock comments data
const mockComments = [
  {
    id: 1,
    author: "محمد أحمد",
    content: "مقال رائع! استفدت كثيراً من النصائح المذكورة هنا. شكراً لكم على المحتوى المميز.",
    publishedAt: "2024-01-16T10:30:00Z",
    likes: 12,
    replies: [
      {
        id: 11,
        author: "فريق سكاي شوت",
        content: "شكراً لك محمد! نسعد بأن المحتوى مفيد. ترقبوا المزيد من النصائح قريباً.",
        publishedAt: "2024-01-16T14:20:00Z",
        likes: 5,
        isAuthor: true
      }
    ]
  },
  {
    id: 2,
    author: "Sarah Johnson",
    content: "Amazing insights! The golden hour techniques you shared have completely transformed my aerial photography. Can't wait to try these tips on my next shoot.",
    publishedAt: "2024-01-15T18:45:00Z",
    likes: 8,
    replies: []
  },
  {
    id: 3,
    author: "عبدالله الراشد",
    content: "هل يمكنكم عمل فيديو تطبيقي لهذه التقنيات؟ سيكون ذلك مفيداً جداً للمبتدئين أمثالي.",
    publishedAt: "2024-01-15T16:20:00Z",
    likes: 15,
    replies: [
      {
        id: 31,
        author: "أحمد الراشد",
        content: "فكرة ممتازة! أنا أيضاً أؤيد هذا الاقتراح.",
        publishedAt: "2024-01-15T17:10:00Z",
        likes: 3
      }
    ]
  }
];

const CommentsSection = ({ postId }) => {
  const { t, i18n } = useTranslation("blog");
  const isRTL = i18n.language === "ar";
  const lang = i18n.language;
    const dir = i18n.dir();


  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [likedComments, setLikedComments] = useState(new Set());
  const [expandedReplies, setExpandedReplies] = useState(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const comment = {
      id: Date.now(),
      author: "مستخدم جديد", // This would come from auth
      content: newComment,
      publishedAt: new Date().toISOString(),
      likes: 0,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment("");
    setIsSubmitting(false);
  };

  const handleSubmitReply = (commentId) => {
    if (!replyContent.trim()) return;

    const reply = {
      id: Date.now(),
      author: "مستخدم جديد",
      content: replyContent,
      publishedAt: new Date().toISOString(),
      likes: 0
    };

    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, replies: [...comment.replies, reply] }
        : comment
    ));
    
    setReplyContent("");
    setReplyTo(null);
  };

  const handleLikeComment = (commentId, isReply = false, parentId = null) => {
    setLikedComments(prev => {
      const newLiked = new Set(prev);
      const key = isReply ? `${parentId}-${commentId}` : commentId;
      
      if (newLiked.has(key)) {
        newLiked.delete(key);
      } else {
        newLiked.add(key);
      }
      return newLiked;
    });
  };

  const toggleReplies = (commentId) => {
    setExpandedReplies(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(commentId)) {
        newExpanded.delete(commentId);
      } else {
        newExpanded.add(commentId);
      }
      return newExpanded;
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return isRTL ? "الآن" : "Now";
    if (diffInMinutes < 60) return isRTL ? `منذ ${diffInMinutes} دقيقة` : `${diffInMinutes}m ago`;
    if (diffInHours < 24) return isRTL ? `منذ ${diffInHours} ساعة` : `${diffInHours}h ago`;
    if (diffInDays < 7) return isRTL ? `منذ ${diffInDays} يوم` : `${diffInDays}d ago`;

    return date.toLocaleDateString(isRTL ? "ar-SA" : "en-US", {
      month: "short",
      day: "numeric",
      year: diffInDays > 365 ? "numeric" : undefined
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-3 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-16 relative z-10" dir={dir}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="rounded-xl sm:rounded-2xl backdrop-blur-md p-4 sm:p-6 lg:p-8"
        style={{
          background: `
            linear-gradient(135deg,
              rgba(15, 23, 42, 0.9) 0%,
              rgba(30, 41, 59, 0.8) 50%,
              rgba(51, 65, 85, 0.7) 100%)
          `,
          border: "1px solid rgba(148, 163, 184, 0.2)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)"
        }}
      >
        {/* Enhanced Comments Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-4">
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg flex-shrink-0">
              <FiMessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                {lang === "ar" ? "تعليقات" : "Comments"}
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                <p className="text-slate-400 flex items-center gap-2 text-sm sm:text-base">
                  <FiMessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                  {lang === "ar" ? `${comments.length} تعليق` : `${comments.length} Comment${comments.length !== 1 ? 's' : ''}`}
                </p>
                <div className="hidden sm:block w-1 h-1 bg-slate-500 rounded-full"></div>
                <p className="text-slate-400 flex items-center gap-2 text-sm sm:text-base">
                  <FiClock className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{lang === "ar" ? "نشط الآن" : "Active Now"}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-blue-500/50 via-blue-400/30 to-transparent"></div>

          {/* Floating particles effect */}
          <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none">
            <motion.div
              animate={{
                y: [0, -10, 0],
                x: [0, 5, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-4 right-4 w-2 h-2 bg-blue-400/30 rounded-full"
            />
            <motion.div
              animate={{
                y: [0, -15, 0],
                x: [0, -8, 0],
                rotate: [0, -3, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute top-8 right-12 w-1 h-1 bg-blue-300/40 rounded-full"
            />
          </div>
        </motion.div>

        {/* Enhanced Comment Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8 sm:mb-12"
        >
          <div className="p-4 sm:p-6 rounded-xl"
            style={{
              background: "rgba(59, 130, 246, 0.05)",
              border: "1px solid rgba(59, 130, 246, 0.2)"
            }}
          >
            <div className="flex items-start sm:items-center gap-3 mb-4">
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <FaUserCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm sm:text-base">{lang === "ar" ? "مستخدم جديد" : "New User"}</p>
                <p className="text-xs text-slate-400 mt-1 sm:mt-0">{lang === "ar" ? "شارك رأيك حول هذا المقال" : "Share your thoughts about this article"}</p>
              </div>
            </div>

            <form onSubmit={handleSubmitComment}>
              <div className="relative">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={lang === "ar" ? "اكتب تعليقاً مفيداً ومحترماً" : "Write a helpful and respectful comment"}
                  rows={4}
                  className="w-full rounded-xl p-3 sm:p-4 text-white placeholder-slate-400 backdrop-blur-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-sm sm:text-base"
                  style={{
                    background: "rgba(15, 23, 42, 0.8)",
                    border: "1px solid rgba(148, 163, 184, 0.3)"
                  }}
                />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mt-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400 order-2 sm:order-1">
                    <FiEdit3 className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">{lang === "ar" ? "اكتب تعليقاً مفيداً" : "Write a helpful comment"}</span>
                    <span className="sm:hidden">{lang === "ar" ? "كن محترماً" : "Be respectful"}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={!newComment.trim() || isSubmitting}
                    className="flex items-center justify-center gap-2 rounded-lg px-4 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto order-1 sm:order-2"
                    style={{
                      background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                      color: "#fff"
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        <span>{lang === "ar" ? "جاري النشر..." : "Posting..."}</span>
                      </>
                    ) : (
                      <>
                        <FiSend className="h-4 w-4" />
                        <span>{lang === "ar" ? "نشر" : "Post"}</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Enhanced Comments List */}
        <div className="space-y-4 sm:space-y-6">
          <AnimatePresence>
            {comments.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center py-12 sm:py-16"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="mb-4 sm:mb-6"
                >
                  <div className="inline-flex p-4 sm:p-6 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30">
                    <FiMessageCircle className="h-8 w-8 sm:h-12 sm:w-12 text-blue-400" />
                  </div>
                </motion.div>
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">{lang === "ar" ? "كن أول من يعلق!" : "Be the first to comment!"}</h4>
                <p className="text-slate-400 max-w-md mx-auto text-sm sm:text-base px-4">{lang === "ar" ? "لا توجد تعليقات حتى الآن" : "No comments yet"}</p>
              </motion.div>
            ) : (
              comments.map((comment, index) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="rounded-xl backdrop-blur-md p-4 sm:p-6 group hover:shadow-lg transition-all duration-300"
                  style={{
                    background: "rgba(30, 41, 59, 0.6)",
                    border: "1px solid rgba(148, 163, 184, 0.2)"
                  }}
                >
                  {/* Enhanced Comment Header */}
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="relative flex-shrink-0"
                      >
                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                          <FiUser className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                       
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                          <h4 className="font-bold text-white text-base sm:text-lg truncate">{comment.author}</h4>
                          <div className="flex items-center gap-1">
                            <FiStar className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
                            <span className="text-xs text-slate-400">{lang === "ar" ? "عضو نشط" : "Active Member"}</span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-400">
                          <div className="flex items-center gap-1">
                            <FiClock className="h-3 w-3" />
                            <span>{comment.publishedAt.split("T")[0]}</span>
                          </div>
                          <div className="hidden sm:block w-1 h-1 bg-slate-500 rounded-full"></div>
                          <div className="flex items-center gap-1">
                            <FiThumbsUp className="h-3 w-3" />
                            <span>{comment.likes} {lang === "ar" ? "إعجاب" : "Like"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-slate-400 hover:text-white transition-colors duration-200 p-1.5 sm:p-2 rounded-lg hover:bg-slate-700/50 flex-shrink-0"
                    >
                      <FiMoreVertical className="h-4 w-4 sm:h-5 sm:w-5" />
                    </motion.button>
                  </div>

                  {/* Enhanced Comment Content */}
                  <div className="ml-10 sm:ml-16 rtl:ml-0 rtl:mr-10 sm:rtl:mr-16">
                    <p className="text-slate-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">{comment.content}</p>

                    {/* Enhanced Comment Actions */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                      <div className="flex items-center gap-2 sm:gap-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleLikeComment(comment.id)}
                          className="flex items-center gap-2 text-xs sm:text-sm transition-all duration-200 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg"
                          style={{
                            color: likedComments.has(comment.id) ? "#ef4444" : "#94a3b8",
                            background: likedComments.has(comment.id) ? "rgba(239, 68, 68, 0.1)" : "rgba(148, 163, 184, 0.1)"
                          }}
                        >
                          {likedComments.has(comment.id) ? (
                            <FaHeart className="h-3 w-3 sm:h-4 sm:w-4" />
                          ) : (
                            <FiHeart className="h-3 w-3 sm:h-4 sm:w-4" />
                          )}
                          <span className="font-medium">{comment.likes + (likedComments.has(comment.id) ? 1 : 0)}</span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                          className="flex items-center gap-2 text-xs sm:text-sm transition-all duration-200 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg"
                          style={{
                            color: replyTo === comment.id ? "#3b82f6" : "#94a3b8",
                            background: replyTo === comment.id ? "rgba(59, 130, 246, 0.1)" : "rgba(148, 163, 184, 0.1)"
                          }}
                        >
                          <FiCornerDownRight className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="font-medium">{lang === "ar" ? "رد" : "Reply"}</span>
                        </motion.button>
                      </div>

                      {comment.replies && comment.replies.length > 0 && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          onClick={() => toggleReplies(comment.id)}
                          className="text-xs text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center gap-1 mt-2 sm:mt-0"
                        >
                          <span>{expandedReplies.has(comment.id) ? lang === "ar" ? "إخفاء" : "Hide" : lang === "ar" ? "عرض" : "Show"} {lang === "ar" ? "الردود" : "Replies"} ({comment.replies.length})</span>
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Enhanced Reply Form */}
                  <AnimatePresence>
                    {replyTo === comment.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -20 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 sm:mt-6 ml-10 sm:ml-16 rtl:ml-0 rtl:mr-10 sm:rtl:mr-16"
                      >
                        <div className="p-3 sm:p-4 rounded-xl"
                          style={{
                            background: "rgba(59, 130, 246, 0.05)",
                            border: "1px solid rgba(59, 130, 246, 0.2)"
                          }}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <FiCornerDownRight className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
                            <span className="text-xs sm:text-sm text-blue-400 font-medium truncate">{lang === "ar" ? `رد على ${comment.author}` : `Reply to ${comment.author}`}</span>
                          </div>

                          <div className="flex gap-2 sm:gap-3">
                            <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                              <FiUser className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <textarea
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                placeholder={lang  === "ar" ? "اكتب تعليقك..." : "Write your comment..."}
                                rows={3}
                                className="w-full rounded-lg p-2 sm:p-3 text-white placeholder-slate-400 backdrop-blur-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-sm sm:text-base"
                                style={{
                                  background: "rgba(15, 23, 42, 0.8)",
                                  border: "1px solid rgba(148, 163, 184, 0.3)"
                                }}
                              />
                              <div className="flex flex-col sm:flex-row justify-end gap-2 mt-3">
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => setReplyTo(null)}
                                  className="px-3 sm:px-4 py-2 text-xs sm:text-sm transition-all duration-200 rounded-lg order-2 sm:order-1"
                                  style={{
                                    border: "1px solid rgba(148, 163, 184, 0.3)",
                                    color: "#94a3b8"
                                  }}
                                >
                                  {lang === "ar" ? "إلغاء" : "Cancel"}
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => handleSubmitReply(comment.id)}
                                  disabled={!replyContent.trim()}
                                  className="flex items-center justify-center gap-2 rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 disabled:opacity-50 order-1 sm:order-2"
                                  style={{
                                    background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                                    color: "#fff"
                                  }}
                                >
                                  <FiSend className="h-3 w-3 sm:h-4 sm:w-4" />
                                  {lang === "ar" ? "رد" : "Reply"}
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Replies */}
                  <AnimatePresence>
                    {expandedReplies.has(comment.id) && comment.replies.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 overflow-hidden"
                      >
                        {comment.replies.map((reply, replyIndex) => (
                          <motion.div
                            key={reply.id}
                            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: replyIndex * 0.1 }}
                            className="ml-8 sm:ml-16 rtl:ml-0 rtl:mr-8 sm:rtl:mr-16 rounded-lg p-3 sm:p-4 border-l-2 sm:border-l-4"
                            style={{
                              background: "rgba(51, 65, 85, 0.4)",
                              border: "1px solid rgba(148, 163, 184, 0.1)",
                              borderLeftColor: "#3b82f6"
                            }}
                          >
                            <div className="flex items-start gap-2 sm:gap-3 mb-3">
                              <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md flex-shrink-0">
                                <FiUser className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                                  <h5 className="font-semibold text-white text-xs sm:text-sm truncate">{reply.author}</h5>
                                  <div className="flex items-center gap-1 sm:gap-2">
                                    <span className="text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                                      {lang === "ar" ? "رد" : "Reply"}
                                    </span>
                                    {reply.isAuthor && (
                                      <span className="text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                        {lang === "ar" ? "الكاتب" : "Author"}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                  <FiClock className="h-3 w-3" />
                                  <span>{reply.publishedAt.split("T")[0]}</span>
                                </div>
                              </div>
                            </div>

                            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed ml-8 sm:ml-11 rtl:ml-0 rtl:mr-8 sm:rtl:mr-11 mb-3">{reply.content}</p>

                            {/* Reply Actions */}
                            <div className="flex items-center gap-2 sm:gap-3 ml-8 sm:ml-11 rtl:ml-0 rtl:mr-8 sm:rtl:mr-11">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleLikeComment(reply.id, true, comment.id)}
                                className="flex items-center gap-1 text-xs transition-colors duration-200 px-1.5 sm:px-2 py-1 rounded-lg"
                                style={{
                                  color: likedComments.has(`${comment.id}-${reply.id}`) ? "#ef4444" : "#94a3b8",
                                  background: likedComments.has(`${comment.id}-${reply.id}`) ? "rgba(239, 68, 68, 0.1)" : "rgba(148, 163, 184, 0.1)"
                                }}
                              >
                                {likedComments.has(`${comment.id}-${reply.id}`) ? (
                                  <FaHeart className="h-3 w-3" />
                                ) : (
                                  <FiHeart className="h-3 w-3" />
                                )}
                                <span>{reply.likes || 0}</span>
                              </motion.button>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default CommentsSection;
