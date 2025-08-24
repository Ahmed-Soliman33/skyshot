import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiChevronDown, FiMessageCircle, FiHelpCircle } from "react-icons/fi";

const generateRandomDrone = (i, width, height) => {
  const startX = Math.random() * width * 0.9;
  const startY = Math.random() * height * 0.9;
  const endX = Math.random() * width * 0.9;
  const endY = Math.random() * height * 0.9;

  return {
    key: `drone-${i}`,
    initial: {
      x: startX,
      y: startY,
      opacity: 0.4 + Math.random() * 0.5,
      scale: 0.4 + Math.random() * 0.6,
    },
    animate: {
      x: endX,
      y: endY,
      opacity: 0.9,
    },
    transition: {
      duration: 15 + Math.random() * 10,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
      delay: i * 1.5,
    },
  };
};

const DroneBackground = () => {
  const [drones, setDrones] = useState([]);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const newDrones = Array.from({
      length: width > 400 ? 5 : 3,
    }).map((_, i) => generateRandomDrone(i, width, height));
    setDrones(newDrones);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 z-[-1] bg-black/20 backdrop-blur-sm" />
      {drones.map((drone) => (
        <motion.div
          key={drone.key}
          className="absolute w-16"
          initial={drone.initial}
          animate={drone.animate}
          transition={drone.transition}
        >
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
          >
            <path
              d="M19.53 28.49a3.852 3.852 0 0 0-3.533 2.343C6.706 31.364-.029 32.257 0 32.955c.027.693 6.712.997 15.928.724c.32.862.936 1.58 1.738 2.027H16.17v2.742h-1.83a.874.874 0 0 0-.875.874v1.954c0 .483.391.874.874.874h12.316c3.103.73 3.45 1.843 5.774 3.88c-.38 2.113-.94 4.42-1.378 6.414v16.973a2.092 2.092 0 1 0 4.185 0V61.21c-.048-6.9 1.066-9.69 4.905-15.031l.965-.448c0 4.146 2.866 4.395 6.908 5.32h-3.036c-.924 0-1.674.75-1.674 1.675v10c0 .924.75 1.674 1.674 1.674h10.044c.924 0 1.674-.75 1.674-1.674v-10c0-.925-.75-1.674-1.674-1.674h-3.033c4.041-.928 6.905-1.176 6.905-5.321l.965.448c4.857 5.026 4.905 8.447 4.905 15.03v8.207a2.092 2.092 0 0 0 4.185 0V52.444c-.513-2.191-1.062-4.487-1.58-6.762c2.199-2.155 3.101-2.64 5.956-3.532h12.336a.874.874 0 0 0 .874-.874v-1.954a.874.874 0 0 0-.874-.874H83.83v-2.742h-1.496a3.852 3.852 0 0 0 1.738-2.027c9.216.273 15.901-.031 15.928-.724c.029-.698-6.706-1.59-15.997-2.122a3.852 3.852 0 0 0-6.943-.302c-9.307-.283-16.103.018-16.142.716c-.029.693 6.615 1.58 15.827 2.112a3.852 3.852 0 0 0 1.839 2.347h-1.496v2.742C67.654 38.426 60.352 33.685 50 33.49c-10.003.212-18.38 4.958-27.088 4.958v-2.742h-1.496a3.852 3.852 0 0 0 1.839-2.347c9.212-.532 15.856-1.42 15.827-2.112c-.039-.698-6.835-1-16.142-.716a3.852 3.852 0 0 0-3.41-2.04zM50 53.503c2.347 0 4.276 1.929 4.276 4.276c0 2.347-1.929 4.277-4.276 4.277c-2.347 0-4.278-1.93-4.278-4.277c0-2.347 1.93-4.276 4.278-4.276zm0 2.51c-.99 0-1.767.776-1.767 1.766s.777 1.766 1.767 1.766c.99 0 1.765-.776 1.765-1.766S50.99 56.013 50 56.013z"
              fill="#fff"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

const FAQSection = () => {
  const { t, i18n } = useTranslation("faq");
  const [activeQuestion, setActiveQuestion] = useState(null);
  const isRTL = i18n.language === "ar";

  const toggleQuestion = (questionId) => {
    setActiveQuestion(activeQuestion === questionId ? null : questionId);
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const questionVariants = {
    hidden: { opacity: 0, x: isRTL ? 50 : -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      className="relative overflow-hidden py-12 md:py-20"
      style={{
        background:
          "linear-gradient(135deg, #212529 0%, #343a40 50%, #032747 100%)",
      }}
    >
      <DroneBackground />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #fff 2px, transparent 2px)",
          backgroundSize: "50px 50px",
        }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Header */}
          <div className="mb-12 flex flex-col items-center space-y-5 text-center">
            <motion.div variants={itemVariants}>
              <div className="mb-2 flex items-center space-x-2">
                <FiHelpCircle className="h-7 w-7 text-gray-400" />
                <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  FAQ'S
                </span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                {t("faq.title")}
              </h2>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="max-w-2xl text-sm leading-6 text-gray-400 sm:text-base md:text-lg">
                {t("faq.subtitle")}
              </p>
            </motion.div>
          </div>

          {/* FAQ Grid */}
          <div className="flex flex-col gap-10 lg:flex-row">
            {/* Questions List */}
            <div className="flex-2">
              <div className="flex flex-col space-y-4">
                {t("faq.questions", { returnObjects: true }).map(
                  (faq, index) => (
                    <motion.div
                      key={faq.id}
                      variants={questionVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/8 hover:shadow-2xl">
                        <button
                          className="flex w-full items-center justify-between bg-transparent p-5 text-left focus:outline-none sm:p-6"
                          onClick={() => toggleQuestion(faq.id)}
                        >
                          <span
                            className={`flex-1 text-base font-semibold text-white sm:text-lg ${isRTL ? "text-right" : "text-left"}`}
                          >
                            {faq.question}
                          </span>
                          <motion.div
                            animate={{
                              rotate: activeQuestion === faq.id ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <FiChevronDown className="h-6 w-6 text-gray-400" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {activeQuestion === faq.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                                <p
                                  className={`text-sm leading-6 text-gray-400 sm:text-base ${isRTL ? "text-right" : "text-left"}`}
                                >
                                  {faq.answer}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ),
                )}
              </div>
            </div>

            {/* Contact Card */}
            <div className="flex-1">
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div
                  className="sticky top-24 rounded-2xl border border-white/10 p-6 shadow-2xl sm:p-8"
                  style={{
                    background:
                      "linear-gradient(135deg, #001d3d 0%, #032747 100%)",
                  }}
                >
                  <div className="flex flex-col items-center space-y-5 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 sm:h-16 sm:w-16">
                      <FiMessageCircle className="h-7 w-7 text-white" />
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                      <h3 className="text-base font-bold text-white sm:text-lg">
                        {t("faq.stillHaveQuestions")}
                      </h3>
                      <p className="text-sm leading-6 text-gray-400 sm:text-base">
                        {t("faq.stillHaveQuestionsDesc")}
                      </p>
                    </div>

                    <button className="flex items-center rounded-full bg-gradient-to-br from-white to-gray-100 px-6 py-3 text-sm font-bold text-gray-900 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:px-8 sm:py-4 sm:text-base">
                      <FiMessageCircle className="mr-2" />
                      {t("faq.askQuestion")}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
