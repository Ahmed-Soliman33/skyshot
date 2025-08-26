import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { X, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const LoginModal = ({ isOpen, onClose, onSuccess, purchaseItem = null }) => {
  const { t, i18n } = useTranslation("gallery");
  const lang = i18n.language;
  const dir = lang === "ar" ? "rtl" : "ltr";

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = lang === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = lang === "ar" ? "البريد الإلكتروني غير صحيح" : "Invalid email format";
    }
    
    if (!formData.password) {
      newErrors.password = lang === "ar" ? "كلمة المرور مطلوبة" : "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = lang === "ar" ? "كلمة المرور يجب أن تكون 6 أحرف على الأقل" : "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSuccess(formData, purchaseItem);
      onClose();
      // Reset form
      setFormData({ email: "", password: "" });
      setErrors({});
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate Google login
    setTimeout(() => {
      setIsLoading(false);
      onSuccess({ email: "user@gmail.com", provider: "google" }, purchaseItem);
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
          style={{ backgroundColor: "var(--color-secondaryColor, #343a40)" }}
          onClick={(e) => e.stopPropagation()}
          dir={dir}
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full text-white/80 hover:text-white transition-all duration-200"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* Header */}
          <div className="p-8 pb-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-6"
            >
              <h2 className="text-2xl font-bold text-white mb-2">
                {lang === "ar" ? "تسجيل الدخول" : "Login"}
              </h2>
              {purchaseItem && (
                <p className="text-sm text-gray-300">
                  {lang === "ar" 
                    ? `لشراء: ${purchaseItem.title[lang]}` 
                    : `To purchase: ${purchaseItem.title[lang]}`
                  }
                </p>
              )}
            </motion.div>

            {/* Google Login Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 p-4 mb-6 bg-white text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300 disabled:opacity-50"
            >
              <FcGoogle className="w-5 h-5" />
              {lang === "ar" ? "تسجيل الدخول بجوجل" : "Continue with Google"}
            </motion.button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-400" style={{ backgroundColor: "var(--color-secondaryColor, #343a40)" }}>
                  {lang === "ar" ? "أو" : "or"}
                </span>
              </div>
            </div>

            {/* Login Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {lang === "ar" ? "البريد الإلكتروني" : "Email"}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.email 
                        ? "border-2 border-red-500 focus:ring-red-500/20" 
                        : "border border-gray-600 focus:ring-blue-500/20"
                    }`}
                    style={{ 
                      backgroundColor: "var(--color-primaryColor, #212529)",
                      borderColor: errors.email ? "#ef4444" : "rgba(255, 255, 255, 0.1)"
                    }}
                    placeholder={lang === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {lang === "ar" ? "كلمة المرور" : "Password"}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-12 py-3 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.password 
                        ? "border-2 border-red-500 focus:ring-red-500/20" 
                        : "border border-gray-600 focus:ring-blue-500/20"
                    }`}
                    style={{ 
                      backgroundColor: "var(--color-primaryColor, #212529)",
                      borderColor: errors.password ? "#ef4444" : "rgba(255, 255, 255, 0.1)"
                    }}
                    placeholder={lang === "ar" ? "أدخل كلمة المرور" : "Enter your password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: "var(--color-tertiaryColor, #032747)" }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {lang === "ar" ? "جاري تسجيل الدخول..." : "Logging in..."}
                  </div>
                ) : (
                  lang === "ar" ? "تسجيل الدخول" : "Login"
                )}
              </motion.button>
            </motion.form>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-gray-400">
                {lang === "ar" ? "ليس لديك حساب؟" : "Don't have an account?"}{" "}
                <button className="text-blue-400 hover:text-blue-300 transition-colors">
                  {lang === "ar" ? "إنشاء حساب" : "Sign up"}
                </button>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginModal;
