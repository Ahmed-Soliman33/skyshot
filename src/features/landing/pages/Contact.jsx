import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaClock,
  FaTiktok,
  FaSnapchatGhost,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaPaperPlane,
  FaCheckCircle
} from "react-icons/fa";

const Contact = () => {
  const { t, i18n } = useTranslation("contact");
  const isRTL = i18n.language === 'ar';
  const dir = i18n.dir();


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });

      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }, 2000);
  };

  const socialIcons = {
    tiktok: FaTiktok,
    snapchat: FaSnapchatGhost,
    facebook: FaFacebookF,
    instagram: FaInstagram,
    youtube: FaYoutube
  };

  return (
    <div
      dir={dir}
      className="min-h-screen overflow-hidden"
      style={{ backgroundColor: "var(--color-primaryColor, #212529)" }}
    >
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
              className="mb-3 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-4xl font-bold text-transparent sm:text-6xl lg:text-7xl"
              style={{
                background: dir === "rtl"
                  ? "linear-gradient(135deg, var(--color-tertiaryColor) 0%, var(--color-primaryTextColor) 100%)"
                  : "linear-gradient(135deg, var(--color-primaryTextColor) 0%, var(--color-tertiaryColor) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {t("hero.title")}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl mb-8 font-medium text-gray-400"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg max-w-3xl mx-auto leading-relaxed text-gray-400"
            >
              {t("hero.description")}
            </motion.p>
          </motion.div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"
            style={{ backgroundColor: 'var(--color-tertiaryColor, #032747)' }}
          ></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"
            style={{ backgroundColor: 'var(--color-secondaryColor, #343a40)' }}
          ></div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Phone */}
              <motion.div
                variants={itemVariants}
                className="text-center group"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    backgroundColor: "var(--color-tertiaryColor, #032747)"
                  }}
                >
                  <FaPhone
                    className="w-6 h-6 text-white"
                  />
                </div>
                <h3
                  className="text-xl font-bold mb-2 text-white"
                >
                  {t("contactInfo.phone.title")}
                </h3>
                <a
                  href={`tel:${t("contactInfo.phone.number")}`}
                  className="text-lg font-medium hover:underline transition-colors duration-300 text-gray-200 hover:text-blue-400"
                >
                  {t("contactInfo.phone.number")}
                </a>
                <p
                  className="text-sm mt-2 text-gray-400"
                >
                  {t("contactInfo.phone.availability")}
                </p>

                {/* WhatsApp Button */}
                <a
                  href={`https://wa.me/${t("contactInfo.phone.number").replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-3 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: '#25D366',
                    color: 'white'
                  }}
                >
                  <FaWhatsapp className="w-4 h-4 mr-2" />
                  WhatsApp
                </a>
              </motion.div>

              {/* Email */}
              <motion.div
                variants={itemVariants}
                className="text-center group"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    backgroundColor: "var(--color-tertiaryColor, #032747)"
                  }}
                >
                  <FaEnvelope
                    className="w-6 h-6 text-white"
                  />
                </div>
                <h3
                  className="text-xl font-bold mb-2 text-white"
                >
                  {t("contactInfo.email.title")}
                </h3>
                <a
                  href={`mailto:${t("contactInfo.email.address")}`}
                  className="text-lg font-medium hover:underline transition-colors duration-300 text-gray-200 hover:text-blue-400"
                >
                  {t("contactInfo.email.address")}
                </a>
                <p
                  className="text-sm mt-2 text-gray-400"
                >
                  {t("contactInfo.email.response")}
                </p>
              </motion.div>



              {/* Business Hours */}
              <motion.div
                variants={itemVariants}
                className="text-center group"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    backgroundColor: "var(--color-tertiaryColor, #032747)"
                  }}
                >
                  <FaClock
                    className="w-6 h-6 text-white"
                  />
                </div>
                <h3
                  className="text-xl font-bold mb-2 text-white"
                >
                  {t("hours.title")}
                </h3>
                <p
                  className="text-lg text-gray-200"
                >
                  {t("hours.weekdays")}
                </p>
                <p
                  className="text-sm mt-1 text-gray-400"
                >
                  {t("hours.weekend")}
                </p>
                <p
                  className="text-xs mt-2 font-medium text-blue-400"
                >
                  {t("hours.note")}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Media Section */}
      <section
        className="py-20 px-4"
        style={{
          backgroundColor: "var(--color-secondaryColor, #343a40)"
        }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
            >
              {t("contactInfo.social.title")}
            </motion.h2>

            <div className="flex flex-wrap justify-center gap-6">
              {Object.entries(t("contactInfo.social", { returnObjects: true }))
                .filter(([key]) => key !== 'title')
                .map(([platform, data]) => {
                  const IconComponent = socialIcons[platform];
                  if (!IconComponent) return null;

                  return (
                    <motion.a
                      key={platform}
                      variants={itemVariants}
                      href={data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                    >
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                        style={{
                          backgroundColor: "var(--color-tertiaryColor, #032747)"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                        }}
                      >
                        <IconComponent
                          className="w-8 h-8 text-white"
                        />
                      </div>

                      {/* Tooltip */}
                      <div
                        className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
                        style={{
                          backgroundColor: 'var(--color-tertiaryColor, #032747)',
                          color: 'white'
                        }}
                      >
                        {data.label}
                      </div>
                    </motion.a>
                  );
                })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-center mb-8 text-white"
            >
              {t("contactForm.title")}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-xl text-center mb-12 text-gray-400"
            >
              {t("contactForm.subtitle")}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.1)'
              }}
            >
              {formStatus === 'success' ? (
                <div className="text-center py-12">
                  <FaCheckCircle
                    className="w-16 h-16 mx-auto mb-4"
                    style={{ color: '#10B981' }}
                  />
                  <h3
                    className="text-2xl font-bold mb-4 text-white"
                  >
                    {t("contactForm.success.title")}
                  </h3>
                  <p
                    className="text-lg text-gray-400"
                  >
                    {t("contactForm.success.message")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-2 text-white"
                      >
                        {t("contactForm.fields.name")} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 focus:border-opacity-50 focus:outline-none focus:ring-2 text-white"
                        style={{
                          borderColor: 'rgba(255, 255, 255, 0.2)'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = 'var(--color-tertiaryColor, #032747)';
                          e.target.style.boxShadow = `0 0 0 2px rgba(3, 39, 71, 0.2)`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-2 text-white"
                      >
                        {t("contactForm.fields.email")} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 focus:border-opacity-50 focus:outline-none focus:ring-2 text-white"
                        style={{
                          borderColor: 'rgba(255, 255, 255, 0.2)'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = 'var(--color-tertiaryColor, #032747)';
                          e.target.style.boxShadow = `0 0 0 2px rgba(3, 39, 71, 0.2)`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-2 text-white"
                    >
                      {t("contactForm.fields.phone")}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 focus:border-opacity-50 focus:outline-none focus:ring-2 text-white"
                      style={{
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--color-tertiaryColor, #032747)';
                        e.target.style.boxShadow = `0 0 0 2px rgba(3, 39, 71, 0.2)`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-2 text-white"
                    >
                      {t("contactForm.fields.message")} *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 focus:border-opacity-50 focus:outline-none focus:ring-2 resize-vertical text-white"
                      style={{
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--color-tertiaryColor, #032747)';
                        e.target.style.boxShadow = `0 0 0 2px rgba(3, 39, 71, 0.2)`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className={`inline-flex items-center px-8 py-4 font-bold text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${isRTL ? 'flex-row-reverse' : ''}`}
                      style={{
                        backgroundColor: "var(--color-tertiaryColor, #032747)",
                        color: 'white',
                        opacity: formStatus === 'submitting' ? 0.7 : 1
                      }}
                      onMouseEnter={(e) => {
                        if (formStatus !== 'submitting') {
                          e.currentTarget.style.backgroundColor = '#60a5fa';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (formStatus !== 'submitting') {
                          e.currentTarget.style.backgroundColor = 'var(--color-tertiaryColor, #032747)';
                        }
                      }}
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          {t("contactForm.submitting")}
                        </>
                      ) : (
                        <>
                          {t("contactForm.submitButton")}
                          <FaPaperPlane
                            className={`w-5 h-5 text-white ${isRTL ? 'ml-2' : 'ml-2'}`}
                          />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>


    </div>
  );
};

export default Contact;
