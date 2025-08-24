import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import {
  FiInstagram,
  FiFacebook,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiArrowRight,
  FiArrowLeft,
  FiHeart,
  FiCamera,
  FiVideo,
  FiSend,
  FiShield,
} from "react-icons/fi";
import { SiTiktok, SiSnapchat } from "react-icons/si";

import bgImage from "@assets/wave-haikei.svg";

const Footer = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation("footer");
  const { t: servicesT } = useTranslation("services");
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isRTL = i18n.language === "ar";
  const dir = i18n.dir();

  const servicesLinks = [
    {
      key: "aerial",
      title: servicesT("tabs.services.aerial.title"),
    },
    {
      key: "commercial",
      title: servicesT("tabs.services.commercial.title"),
    },
    {
      key: "editing",
      title: servicesT("tabs.services.editing.title"),
    },
    {
      key: "events",
      title: servicesT("tabs.services.events.title"),
    },
  ];

  // Track mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const socialLinks = [
    {
      icon: FiInstagram,
      href: "https://www.instagram.com/skyshot.sa?igsh=NjB5NDE3cXYyYnJh&utm_source=qr",
    },
    {
      icon: FiFacebook,
      href: "https://www.facebook.com/share/14zoJsCLHj/?mibextid=wwXIfr",
    },
    {
      icon: FiYoutube,
      href: "https://youtube.com/@skyshot_sa?si=Sb8z-8KcJhkACH7l",
    },
    {
      icon: SiTiktok,
      href: "https://www.tiktok.com/@skyshot.sa?_t=ZS-8y6Tigx2X6l&_r=1",
    },
    {
      icon: SiSnapchat,
      href: "https://t.snapchat.com/4Xy8kdXQ",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <footer
      dir={dir}
      className={`overflow-hidden ${location.pathname === "/" ? "" : "pt-24 md:h-[70vh]"} not-first:relative`}
    >
      {/* Advanced Background with Multiple Layers */}
      <div className="absolute inset-0">
        {/* Base Gradient */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("${bgImage}")`,
            opacity: 0.8,
          }}
        />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* CTA Section with Enhanced Background */}
        {location.pathname === "/" && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative px-4 py-20"
          >
            <div className="relative z-10 mx-auto max-w-7xl text-center">
              <div className="relative">
                {/* Glowing Border Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/20 via-white/10 to-white/20 blur-xl" />

                <div className="relative rounded-3xl border border-white/20 bg-gradient-to-br from-white/15 via-white/10 to-white/5 p-12 shadow-2xl backdrop-blur-2xl">
                  {/* Decorative Elements */}
                  <div className="absolute top-4 left-4 h-8 w-8 rounded-tl-lg border-t-2 border-l-2 border-white/30" />
                  <div className="absolute top-4 right-4 h-8 w-8 rounded-tr-lg border-t-2 border-r-2 border-white/30" />
                  <div className="absolute bottom-4 left-4 h-8 w-8 rounded-bl-lg border-b-2 border-l-2 border-white/30" />
                  <div className="absolute right-4 bottom-4 h-8 w-8 rounded-br-lg border-r-2 border-b-2 border-white/30" />

                  <motion.div
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="mb-6 text-4xl leading-tight font-bold text-white md:text-6xl">
                      {t("footer.cta.title")}
                    </h2>
                    <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-gray-200 md:text-2xl">
                      {t("footer.cta.subtitle")}
                    </p>
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        y: -3,
                        boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative inline-flex items-center overflow-hidden rounded-full bg-gradient-to-r from-white via-gray-50 to-white px-8 py-4 text-center text-lg font-bold text-gray-900 shadow-2xl transition-all duration-500 hover:shadow-white/30 md:px-10 md:py-5 md:text-xl"
                    >
                      {/* Button Shine Effect */}
                      <div className="absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                      <FiCamera className="mr-3 ml-2 text-xl md:mr-0 md:text-2xl" />
                      {t("footer.cta.button")}
                      {isRTL ? (
                        <FiArrowLeft className="ml-3 text-xl" />
                      ) : (
                        <FiArrowRight className="ml-3 text-xl" />
                      )}
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Rest of the footer content remains the same... */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative z-10 px-4 pb-16"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              {/* Company Info & Newsletter */}
              <motion.div variants={itemVariants} className="lg:col-span-5">
                <div className="space-y-8">
                  {/* Logo & Description */}
                  <div>
                    <img
                      src="/logo-white.webp"
                      className="mb-2 h-10 max-w-[12rem] object-contain sm:h-12 md:mb-1 md:h-14"
                      alt="footer logo"
                    />
                    <p className="mb-4 text-lg font-medium text-blue-300">
                      {t("footer.company.tagline")}
                    </p>
                    <p className="leading-relaxed text-gray-300">
                      {t("footer.company.description")}
                    </p>
                  </div>

                  {/* Newsletter */}
                  <div className="relative">
                    {/* Glowing background */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 blur-sm" />

                    <div className="relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 via-white/10 to-white/5 p-6 backdrop-blur-2xl">
                      <h4 className="mb-2 text-xl font-bold text-white">
                        {t("footer.newsletter.title")}
                      </h4>
                      <p className="mb-4 text-sm text-gray-300">
                        {t("footer.newsletter.subtitle")}
                      </p>

                      <form onSubmit={handleSubscribe} className="space-y-3">
                        <div className="relative">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t("footer.newsletter.placeholder")}
                            className="w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:border-white/50 focus:bg-white/20 focus:outline-none"
                            dir={isRTL ? "rtl" : "ltr"}
                          />
                          <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? "left-2" : "right-2"} rounded-lg bg-gradient-to-r from-white to-gray-100 p-2 text-gray-900 transition-all duration-300 hover:shadow-lg`}
                          >
                            <FiSend className="h-4 w-4" />
                          </motion.button>
                        </div>

                        {isSubscribed && (
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-green-400"
                          >
                            {t("footer.newsletter.success")}{" "}
                          </motion.p>
                        )}

                        <p className="text-xs text-gray-400">
                          {t("footer.newsletter.privacy")}
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div variants={itemVariants} className="lg:col-span-2">
                <h4 className="mb-6 text-lg font-bold text-white">
                  {t("footer.quickLinks.title")}
                  <div
                    className={`mt-1 h-px w-32 from-gray-400 via-gray-500 to-transparent ${dir === "ltr" ? "bg-gradient-to-r" : "bg-gradient-to-l"}`}
                  ></div>
                </h4>
                <ul className="space-y-3">
                  {[
                    "home",
                    "services",
                    "gallery",
                    "blog",
                    "about",
                    "contact",
                  ].map((link) => (
                    <li key={link}>
                      <Link
                        to={`/${link === "home" ? "" : link}`}
                        className="group flex max-w-[30vw] items-center text-gray-300 transition-colors duration-300 hover:text-white"
                      >
                        <span
                          className={`transition-transform duration-300 ${isRTL ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}
                        >
                          {t(`footer.quickLinks.${link}`)}
                        </span>
                        {isRTL ? (
                          <FiArrowLeft className="mr-2 h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                        ) : (
                          <FiArrowRight className="ml-2 h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Services */}
              <motion.div variants={itemVariants} className="lg:col-span-2">
                <h4 className="mb-6 text-lg font-bold text-white">
                  {t("footer.services.title")}
                  <div
                    className={`mt-1 h-px w-32 from-gray-400 via-gray-500 to-transparent ${dir === "ltr" ? "bg-gradient-to-r" : "bg-gradient-to-l"}`}
                  ></div>
                </h4>
                <ul className="space-y-3">
                  {servicesLinks.map((service) => (
                    <li key={service.key}>
                      <Link
                        to="/services"
                        className="group flex max-w-[40vw] items-center text-gray-300 transition-colors duration-300 hover:text-white"
                      >
                        <span
                          className={`transition-transform duration-300 ${isRTL ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}
                        >
                          {service.title}
                        </span>
                        {service === "photography" && (
                          <FiCamera className="ml-2 h-4 w-4 opacity-50" />
                        )}
                        {service === "videography" && (
                          <FiVideo className="ml-2 h-4 w-4 opacity-50" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact Info */}
              <motion.div variants={itemVariants} className="lg:col-span-3">
                <h4 className="mb-6 text-lg font-bold text-white">
                  {t("footer.contact.title")}
                  <div
                    className={`mt-1 h-px w-28 from-gray-400 via-gray-500 to-transparent ${dir === "ltr" ? "bg-gradient-to-r" : "bg-gradient-to-l"}`}
                  ></div>
                </h4>

                <div className="mb-8 space-y-4">
                  <div className="flex items-start space-x-3">
                    <FiMapPin className="mt-1 h-5 w-5 flex-shrink-0 text-blue-400" />
                    <span className="text-gray-300">
                      {t("footer.contact.address")}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <FiPhone className="h-5 w-5 flex-shrink-0 text-green-400" />
                    <a
                      href="tel:+966501234567"
                      className="text-gray-300 transition-colors hover:text-white"
                    >
                      {dir === "rtl" ? "4567 123 50 966+" : "+966 50 123 4567"}
                    </a>
                  </div>

                  <div className="flex items-center space-x-3">
                    <FiMail className="h-5 w-5 flex-shrink-0 text-red-400" />
                    <a
                      href="mailto:info@visionstudio.sa"
                      className="text-gray-300 transition-colors hover:text-white"
                    >
                      {t("footer.contact.email")}
                    </a>
                  </div>

                  <div className="flex items-start space-x-3">
                    <FiClock className="h-5 w-5 flex-shrink-0 text-yellow-400" />
                    <span className="text-sm text-gray-300">
                      {t("footer.contact.workingHours")}
                    </span>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h5 className="mb-4 font-semibold text-white">
                    {t("footer.social.title")}{" "}
                    <div
                      className={`mt-2 h-px w-32 from-gray-400 via-gray-500 to-transparent ${dir === "ltr" ? "bg-gradient-to-r" : "bg-gradient-to-l"}`}
                    ></div>
                  </h5>
                  <div className="flex space-x-3">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        target="_blank"
                        className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white/40"
                      >
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        <social.icon className="relative z-10 h-5 w-5 text-gray-300 transition-colors group-hover:text-white" />
                      </motion.a>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-gray-400">
                    {t("footer.social.followUs")}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="relative z-10 border-t border-white/20 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 py-4 md:py-6">
            <div className="flex flex-col-reverse items-center justify-between space-y-4 md:flex-row md:space-y-0">
              <p className="mt-3 text-sm text-gray-400 md:mt-0">
                {t("footer.copyright")}
              </p>

              {/* Legal Links */}
              <div className="mt-3 flex items-center space-x-6 text-sm text-gray-400 md:mt-0 rtl:space-x-reverse">
                <Link
                  to="/privacy-policy"
                  className="flex items-center space-x-2 transition-colors hover:text-white rtl:space-x-reverse"
                >
                  <FiShield className="h-4 w-4" />
                  <span>{t("footer.legal.privacy")}</span>
                </Link>
              </div>

              <div className="flex items-center space-x-1 text-sm text-gray-400 rtl:space-x-reverse">
                <span>{t("footer.fromConceptToSky")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
