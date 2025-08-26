import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


import { FaArrowRight } from "react-icons/fa6";
import { IoSparkles } from "react-icons/io5";
import { PiCubeTransparentDuotone } from "react-icons/pi";
import { FaCamera  , FaUsers , FaRegCheckCircle} from "react-icons/fa";

const About = () => {
  const { t, i18n } = useTranslation("about");
  const isRTL = i18n.language === 'ar';
  const dir = i18n.dir();



  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Icon mapping
  const getIcon = (iconName) => {
    const icons = {
      drone: PiCubeTransparentDuotone,
      camera: FaCamera,
      technology: PiCubeTransparentDuotone,
      creativity: IoSparkles,
      clients: FaUsers
    };
    return icons[iconName] || FaRegCheckCircle;
  };

  return (
    <div dir={dir}
      className="min-h-screen overflow-hidden"
      style={{ backgroundColor: "var(--color-primaryColor, #1a1d23)" }}>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center"
          >
         

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold my-8"
              style={{
                background: isRTL
                  ? "linear-gradient(135deg, var(--color-tertiaryColor, #0f4c75) 0%, var(--color-primaryTextColor, #ffffff) 100%)"
                  : "linear-gradient(135deg, var(--color-primaryTextColor, #ffffff) 0%, var(--color-tertiaryColor, #0f4c75) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {t("hero.title")}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl mb-8 font-medium"
              style={{ color: "var(--color-skyBlue, #60a5fa)" }}
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg max-w-4xl mx-auto leading-relaxed"
              style={{ color: "var(--color-secondaryTextColor, #8892b0)" }}
            >
              {t("hero.description")}
            </motion.p>
          </motion.div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse"
            style={{ backgroundColor: "var(--color-tertiaryColor, #0f4c75)" }}
          ></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse"
            style={{ backgroundColor: "var(--color-darkBlueColor, #003366)" }}
          ></div>
        </div>
      </section>

      {/* Services Section */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: "var(--color-secondaryColor, #2c3e50)" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-center mb-16"
              style={{ color: "var(--color-primaryTextColor, #ffffff)" }}
            >
              {t("services.title")}
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {t("services.items", { returnObjects: true }).map((service, index) => {
                const IconComponent = getIcon(service.icon);
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:transform hover:scale-105"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      borderColor: "rgba(255, 255, 255, 0.1)",
                    }}
                    whileHover={{
                      borderColor: "var(--color-skyBlue, #60a5fa)",
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <div className="flex items-center mb-6">
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center rtl:ml-4 ltr:mr-4"
                        style={{
                          background: "linear-gradient(135deg, var(--color-tertiaryColor, #0f4c75) 0%, var(--color-darkBlueColor, #003366) 100%)"
                        }}
                      >
                        <IconComponent
                          className="w-8 h-8"
                          style={{ color: "var(--color-primaryTextColor, #ffffff)" }}
                        />
                      </div>
                      <h3
                        className="text-2xl font-bold"
                        style={{ color: "var(--color-primaryTextColor, #ffffff)" }}
                      >
                        {service.title}
                      </h3>
                    </div>
                    <p
                      className="leading-relaxed text-lg"
                      style={{ color: "var(--color-secondaryTextColor, #8892b0)" }}
                    >
                      {service.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: "var(--color-primaryColor, #1a1d23)" }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
              radial-gradient(circle at 20% 80%, var(--color-tertiaryColor, #0f4c75) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, var(--color-darkBlueColor, #003366) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, var(--color-secondaryColor, #2c3e50) 0%, transparent 50%)
            `,
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-center mb-16"
              style={{ color: "var(--color-primaryTextColor, #ffffff)" }}
            >
              {t("whyUs.title")}
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {t("whyUs.items", { returnObjects: true }).map((item, index) => {
                const IconComponent = getIcon(item.icon);
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="text-center group"
                  >
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                      style={{
                        background: "linear-gradient(135deg, var(--color-tertiaryColor, #0f4c75) 0%, var(--color-darkBlueColor, #003366) 100%)"
                      }}
                    >
                      <IconComponent
                        className="w-10 h-10"
                        style={{ color: "var(--color-primaryTextColor, #ffffff)" }}
                      />
                    </div>
                    <h3
                      className="text-2xl font-bold mb-4"
                      style={{ color: "var(--color-primaryTextColor, #ffffff)" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="leading-relaxed text-lg"
                      style={{ color: "var(--color-secondaryTextColor, #8892b0)" }}
                    >
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: "var(--color-secondaryColor, #2c3e50)" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-center mb-16"
              style={{ color: "var(--color-primaryTextColor, #ffffff)" }}
            >
              {t("achievements.title")}
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {t("achievements.stats", { returnObjects: true }).map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center"
                >
                  <div
                    className="text-4xl md:text-5xl font-bold mb-2"
                    style={{ color: "var(--color-skyBlue, #60a5fa)" }}
                  >
                    {stat.number}
                  </div>
                  <div
                    className="text-lg"
                    style={{ color: "var(--color-secondaryTextColor, #8892b0)" }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 px-4"
        style={{
          background: "linear-gradient(135deg, var(--color-tertiaryColor, #0f4c75) 0%, var(--color-darkBlueColor, #003366) 100%)"
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ color: "var(--color-primaryTextColor, #ffffff)" }}
            >
              {t("cta.title")}
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-xl mb-8"
              style={{ color: "var(--color-secondaryTextColor, #8892b0)" }}
            >
              {t("cta.subtitle")}
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Link
                to="/contact"
                className={`inline-flex items-center px-8 py-4 font-bold text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${isRTL ? 'flex-row-reverse' : ''}`}
                style={{
                  background: "linear-gradient(135deg, var(--color-tertiaryColor, #0f4c75) 0%, var(--color-skyBlue, #60a5fa) 100%)",
                  color: "var(--color-primaryTextColor, #ffffff)"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "linear-gradient(135deg, var(--color-darkBlueColor, #003366) 0%, var(--color-tertiaryColor, #0f4c75) 100%)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "linear-gradient(135deg, var(--color-tertiaryColor, #0f4c75) 0%, var(--color-skyBlue, #60a5fa) 100%)";
                }}
              >
                {t("cta.button")}
                <FaArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
