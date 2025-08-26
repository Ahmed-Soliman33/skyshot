import { motion } from "framer-motion";

const BlogLoadingSkeleton = () => {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="overflow-hidden rounded-3xl backdrop-blur-sm"
          style={{
            background: `linear-gradient(135deg,
              rgba(33, 37, 41, 0.4) 0%,
              rgba(52, 58, 64, 0.3) 30%,
              rgba(3, 39, 71, 0.2) 70%,
              rgba(0, 29, 61, 0.1) 100%)`,
            border: "1px solid rgba(96, 165, 250, 0.1)",
            boxShadow: `
              0 25px 50px -12px rgba(0, 0, 0, 0.25),
              inset 0 1px 0 rgba(255, 255, 255, 0.05)
            `
          }}
        >
          {/* Image Skeleton */}
          <div
            className="h-72 animate-pulse relative overflow-hidden"
            style={{
              background: `linear-gradient(90deg,
                rgba(52, 58, 64, 0.4) 0%,
                rgba(3, 39, 71, 0.3) 50%,
                rgba(52, 58, 64, 0.4) 100%)`
            }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                background: `linear-gradient(90deg,
                  transparent 0%,
                  rgba(96, 165, 250, 0.1) 50%,
                  transparent 100%)`
              }}
            />
          </div>

          {/* Content Skeleton */}
          <div className="p-8 space-y-4">
            {/* Meta Info Skeleton */}
            <div className="flex items-center gap-4">
              <div
                className="h-3 w-20 rounded-full animate-pulse"
                style={{ background: "rgba(52, 58, 64, 0.6)" }}
              />
              <div
                className="h-3 w-24 rounded-full animate-pulse"
                style={{ background: "rgba(3, 39, 71, 0.6)" }}
              />
              <div
                className="h-3 w-16 rounded-full animate-pulse"
                style={{ background: "rgba(0, 29, 61, 0.6)" }}
              />
            </div>

            {/* Title Skeleton */}
            <div className="space-y-2">
              <div
                className="h-6 w-full rounded-lg animate-pulse"
                style={{ background: "rgba(52, 58, 64, 0.6)" }}
              />
              <div
                className="h-6 w-3/4 rounded-lg animate-pulse"
                style={{ background: "rgba(3, 39, 71, 0.6)" }}
              />
            </div>

            {/* Excerpt Skeleton */}
            <div className="space-y-2">
              <div
                className="h-4 w-full rounded animate-pulse"
                style={{ background: "rgba(52, 58, 64, 0.5)" }}
              />
              <div
                className="h-4 w-full rounded animate-pulse"
                style={{ background: "rgba(3, 39, 71, 0.5)" }}
              />
              <div
                className="h-4 w-2/3 rounded animate-pulse"
                style={{ background: "rgba(0, 29, 61, 0.5)" }}
              />
            </div>

            {/* Tags Skeleton */}
            <div className="flex gap-2">
              <div
                className="h-6 w-16 rounded-full animate-pulse"
                style={{ background: "rgba(3, 39, 71, 0.4)" }}
              />
              <div
                className="h-6 w-20 rounded-full animate-pulse"
                style={{ background: "rgba(0, 29, 61, 0.4)" }}
              />
              <div
                className="h-6 w-14 rounded-full animate-pulse"
                style={{ background: "rgba(52, 58, 64, 0.4)" }}
              />
            </div>

            {/* Footer Skeleton */}
            <div className="flex items-center justify-between pt-2">
              <div
                className="h-10 w-28 rounded-xl animate-pulse"
                style={{ background: "rgba(3, 39, 71, 0.6)" }}
              />
              <div className="flex gap-4">
                <div
                  className="h-4 w-8 rounded animate-pulse"
                  style={{ background: "rgba(52, 58, 64, 0.5)" }}
                />
                <div
                  className="h-4 w-8 rounded animate-pulse"
                  style={{ background: "rgba(0, 29, 61, 0.5)" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default BlogLoadingSkeleton;
