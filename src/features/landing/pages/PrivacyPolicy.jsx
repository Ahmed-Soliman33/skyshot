import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FiShield,
  FiLock,
  FiEye,
  FiDatabase,
  FiUsers,
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
} from "react-icons/fi";

const PrivacyPolicy = () => {
  const { t, i18n } = useTranslation("privacy");
  const dir = i18n.dir();

  const sections = [
    {
      icon: FiDatabase,
      key: "dataCollection",
      color: "from-[#032747] to-[#001d3d]",
    },
    {
      icon: FiEye,
      key: "dataUsage",
      color: "from-[#343a40] to-[#212529]",
    },
    {
      icon: FiUsers,
      key: "dataSharing",
      color: "from-[#001d3d] to-[#032747]",
    },
    {
      icon: FiLock,
      key: "dataSecurity",
      color: "from-[#212529] to-[#343a40]",
    },
    {
      icon: FiCheckCircle,
      key: "consent",
      color: "from-[#343a40] to-[#6a7282]",
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
    <div
      dir={dir}
      className="min-h-screen bg-gradient-to-br from-[#212529] via-[#032747] to-[#001d3d]"
    >
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden py-24"
      >
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#032747]/20 to-[#001d3d]/20" />
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-full bg-white/30"
              animate={{
                x: [0, Math.random() * 100, 0],
                y: [0, Math.random() * 100, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: Math.random() * 8 + 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center justify-center rounded-full border border-[#6a7282]/20 bg-[#343a40]/50 p-6 backdrop-blur-sm"
          >
            <FiShield className="h-16 w-16 text-[#ffffff]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 text-5xl font-bold text-[#ffffff] md:text-7xl"
          >
            {t("privacy.hero.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mx-auto max-w-3xl text-xl text-[#6a7282] md:text-2xl"
          >
            {t("privacy.hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 text-sm text-[#6a7282]"
          >
            {t("privacy.hero.lastUpdated")}
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative py-20"
      >
        <div className="mx-auto max-w-7xl px-4">
          {/* Introduction */}
          <motion.div
            variants={itemVariants}
            className="mb-16 rounded-3xl border border-[#6a7282]/30 bg-[#343a40]/30 p-8 backdrop-blur-sm md:p-12"
          >
            <div className="flex items-start space-x-4 rtl:space-x-reverse">
              <div className="rounded-full bg-gradient-to-r from-[#032747] to-[#001d3d] p-3">
                <FiInfo className="h-6 w-6 text-[#ffffff]" />
              </div>
              <div className="flex-1">
                <h2 className="mb-4 text-2xl font-bold text-[#ffffff]">
                  {t("privacy.introduction.title")}
                </h2>
                <p className="text-lg leading-relaxed text-[#6a7282]">
                  {t("privacy.introduction.content")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Privacy Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.key}
                variants={itemVariants}
                className="group rounded-3xl border border-[#6a7282]/30 bg-[#343a40]/20 p-8 backdrop-blur-sm transition-all duration-500 hover:bg-[#343a40]/40 md:p-12"
              >
                <div className="flex items-start space-x-6 rtl:space-x-reverse">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`rounded-2xl bg-gradient-to-r ${section.color} p-4 shadow-lg`}
                  >
                    <section.icon className="h-8 w-8 text-[#ffffff]" />
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="mb-6 text-3xl font-bold text-[#ffffff]">
                      {t(`privacy.sections.${section.key}.title`)}
                    </h3>

                    <div className="space-y-4">
                      {t(`privacy.sections.${section.key}.items`, {
                        returnObjects: true,
                      }).map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: itemIndex * 0.1 }}
                          className="flex items-start space-x-3 rtl:space-x-reverse"
                        >
                          <div className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-white to-[#6a7282]" />
                          <p className="leading-relaxed text-[#6a7282]">
                            {item}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    {section.key === "dataSharing" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-6 rounded-xl border border-[#6a7282]/30 bg-[#212529]/40 p-4"
                      >
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <FiAlertCircle className="h-5 w-5 text-[#6a7282]" />
                          <p className="font-semibold text-[#6a7282]">
                            {t("privacy.sections.dataSharing.important")}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            variants={itemVariants}
            className="mt-16 rounded-3xl border border-[#6a7282]/30 bg-gradient-to-br from-[#343a40]/30 via-[#212529]/30 to-[#032747]/30 p-8 backdrop-blur-sm md:p-12"
          >
            <div className="text-center">
              <h3 className="mb-6 text-3xl font-bold text-[#ffffff]">
                {t("privacy.contact.title")}
              </h3>
              <p className="mb-8 text-lg text-[#6a7282]">
                {t("privacy.contact.subtitle")}
              </p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <motion.a
                  href="mailto:privacy@visionstudio.sa"
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex items-center justify-center space-x-3 rounded-xl border border-[#6a7282]/30 bg-[#343a40]/30 p-4 transition-all duration-300 hover:bg-[#212529]/60 rtl:space-x-reverse"
                >
                  <FiMail className="h-5 w-5 text-blue-400" />
                  <span className="text-[#ffffff]">
                    privacy@visionstudio.sa
                  </span>
                </motion.a>

                <motion.a
                  href="tel:+966501234567"
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex items-center justify-center space-x-3 rounded-xl border border-[#6a7282]/30 bg-[#343a40]/30 p-4 transition-all duration-300 hover:bg-[#212529]/60 rtl:space-x-reverse"
                >
                  <FiPhone className="h-5 w-5 text-green-400" />
                  <span className="text-[#ffffff]">+966 50 123 4567</span>
                </motion.a>

                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex items-center justify-center space-x-3 rounded-xl border border-[#6a7282]/30 bg-[#343a40]/30 p-4 transition-all duration-300 hover:bg-[#212529]/60 rtl:space-x-reverse"
                >
                  <FiMapPin className="h-5 w-5 text-red-400" />
                  <span className="text-[#ffffff]">
                    {t("privacy.contact.address")}
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default PrivacyPolicy;
