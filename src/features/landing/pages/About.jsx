import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const About = () => {
  const { t } = useTranslation("about");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#04070d] via-[#0f131b] to-[#454545] pt-20">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold text-white lg:text-6xl">
            <span className="bg-gradient-to-r from-[#c1a265] to-[#d4b876] bg-clip-text text-transparent">
              {t("header.about")}
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-300">
            Learn about our mission to capture Saudi Arabia's beauty from above
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
