import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FiCamera
} from "react-icons/fi";

const BlogHero = () => {
    const { t , i18n } = useTranslation("blog");
    const dir = i18n.dir();
    const lang = i18n.language

  return (
    <div className="relative" dir={dir}>
      {/* Hero Image Section */}
      <div className="relative h-[70vh] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753765048/1_epqfrg.jpg')`
          }}
        />

        {/* Dark Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg,
              rgba(26, 29, 35, 0.85) 0%,
              rgba(44, 62, 80, 0.75) 30%,
              rgba(15, 76, 117, 0.65) 70%,
              rgba(0, 51, 102, 0.8) 100%)`
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center px-4 max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium backdrop-blur-sm"
              style={{
                backgroundColor: "rgba(15, 76, 117, 0.3)",
                border: "1px solid rgba(96, 165, 250, 0.3)",
                color: "var(--color-primaryTextColor, #fff)"
              }}
            >
              <FiCamera className="h-4 w-4 text-sm md:text-base text-blue-400" />
              <span>{ lang === "ar" ? "مدونة سكاي شوت" : "SkyShot Blog"}</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-7xl font-bold mb-6 leading-tight"
              style={{ color: "var(--color-primaryTextColor, #fff)" }}
            >
              { lang === "ar" ? "دعنا نساعدك في التقاط" : "LET US HELP YOU CAPTURE"}
              <br />
              <span
                className="block mt-2"
                style={{
                  background: `linear-gradient(135deg,
                    #60a5fa 0%,
                    var(--color-primaryTextColor, #fff) 50%,
                    #60a5fa 100%)`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent"
                }}
              >
                { lang === "ar" ? "مغامراتك" : "YOUR ADVENTURES"}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-2xl font-light max-w-3xl mx-auto"
              style={{ color: "var(--color-secondaryTextColor, #8892b0)" }}
            >
              { lang === "ar" ? "أفكار وتقنيات وقصص ما وراء الكواليس والإلهام الإبداعي من عالم التصوير والفيديو الجوي المتميز." : "Professional aerial photography insights, techniques, and stories from the sky"}
            </motion.p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
            style={{ color: "var(--color-secondaryTextColor, #8892b0)" }}
          >
            <span className="text-sm">{ lang === "ar" ? "اسحب للاستكشاف" : "Scroll to explore"}</span>
            <div
              className="h-6 w-4 rounded-full border-2"
              style={{ borderColor: "var(--color-secondaryTextColor, #8892b0)" }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-1 w-1 rounded-full mx-auto mt-1"
                style={{ backgroundColor: "#60a5fa" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Welcome Section */}
      <div
        className="py-20"
        style={{ backgroundColor: "var(--color-backgroundColor, #f8f9fa)" }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Welcome Text */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="order-2 lg:order-1"
              >
                <div className="mb-4">
                  <span
                    className="text-lg font-medium tracking-wider uppercase"
                    style={{ color: "var(--color-tertiaryColor, #0f4c75)" }}
                  >
                   { lang === "ar" ? "مرحبا بكم في" : "WELCOME TO"}
                  </span>
                </div>

                <h2
                  className="text-5xl md:text-6xl font-bold mb-6"
                  style={{
                    background: `linear-gradient(135deg,
                      var(--color-primaryColor, #1a1d23) 0%,
                      var(--color-tertiaryColor, #0f4c75) 100%)`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent"
                  }}
                >
                  { lang === "ar" ? "المدونة" : "the blog!"}
                </h2>

                <p
                  className="text-lg leading-relaxed mb-8"
                  style={{ color: "var(--color-secondaryTextColor, #6c757d)" }}
                >
                  { lang === "ar" ? "حيث نستكشف عالم التصوير الجوي المذهل من خلال رؤى خلابة ودروس وقصص متنوعة. نحن فريق من المصورين المحترفين الذين يعشقون التقاط الجمال من الأعلى ونشارك هذا الاحتراس معكم. اكتشف أحدث التقنيات والنصائح والقصص من عالم التصوير المتميز." :"Get inspired and plan your aerial photography adventure from our local outdoor experts. We are a team of professional photographers dedicated to capturing the beauty of the world from above and sharing that passion with you!"}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                  style={{
                    background: `linear-gradient(135deg,
                      var(--color-tertiaryColor, #0f4c75) 0%,
                      var(--color-darkBlueColor, #003366) 100%)`
                  }}
                  onClick={() => {
                    const postsGrid = document.getElementById("posts-grid");
                    if (postsGrid) {
                      postsGrid.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  <FiCamera className="h-5 w-5" />
                  { lang === "ar" ? "لنذهب" : "LET'S GO!"}
                </motion.button>
              </motion.div>

              {/* Welcome Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="order-1 lg:order-2"
              >
                <div className="relative">
                  <div
                    className="rounded-2xl overflow-hidden shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg,
                        var(--color-primaryColor, #1a1d23) 0%,
                        var(--color-secondaryColor, #2c3e50) 100%)`
                    }}
                  >
                    <img
                      src="https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753765103/8_mgq1om.jpg"
                      alt="Aerial Photography Team"
                      className="w-full h-[400px] object-cover"
                    />

                    {/* Image Overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg,
                          transparent 0%,
                          rgba(15, 76, 117, 0.2) 100%)`
                      }}
                    />
                  </div>

                  {/* Floating Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="absolute -bottom-6 -right-6 p-4 rounded-full shadow-xl backdrop-blur-sm"
                    style={{
                      background: `linear-gradient(135deg,
                        var(--color-tertiaryColor, #0f4c75) 0%,
                        var(--color-darkBlueColor, #003366) 100%)`,
                      border: "2px solid rgba(96, 165, 250, 0.3)"
                    }}
                  >
                    <FiCamera className="h-8 w-8 text-white" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHero;
