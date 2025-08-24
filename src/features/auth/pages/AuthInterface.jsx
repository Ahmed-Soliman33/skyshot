import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGoogle,
  FaUser,
  FaEnvelope,
  FaLock,
  FaCamera,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react";
import { validateField } from "@features/auth/utils/authFormValidations";
import { useAuth } from "@hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { notify } from "@components/ui/notify";

const AuthInterface = () => {
  const [searchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [animationData, setAnimationData] = useState(null);
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { t, i18n } = useTranslation("auth");
  const currentLang = i18n.language;
  const { login, signup } = useAuth();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (variables) => {
      if (isSignUp) {
        return signup(variables);
      } else {
        return login(variables);
      }
    },
    retry: 0,
    onError: (error) => {
      notify.error(
        currentLang === "ar" ? "حدث خطأ" : "Error Has Occurred",
        t("auth." + error.errorCode),
      );
    },
    onSuccess: (data) => {
      notify.success(
        currentLang === "ar" ? "مرحباً بعودتك" : "Welcome Back",
        isSignUp ? t("auth.registerSuccess") : t("auth.loginSuccess"),
      );
      navigate("/dashboard");
    },
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Live validation
    setFormErrors((prev) => ({
      ...prev,
      [e.target.name]: validateField(
        e.target.name,
        e.target.value,
        { ...formData, [name]: e.target.value },
        currentLang,
      ),
    }));
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  // Function to check if form is valid
  const isFormValid = () => {
    // Check if all required fields are filled
    const requiredFields = isSignUp
      ? ["name", "email", "password", "confirmPassword"]
      : ["email", "password"];

    const emptyFields = requiredFields.filter(
      (field) => !formData[field]?.trim(),
    );

    if (emptyFields.length > 0) {
      return false;
    }

    // Check if there are any validation errors
    const hasErrors = Object.values(formErrors).some((error) => error !== "");

    return !hasErrors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submitting
    const newErrors = {};

    // Validate required fields based on form type
    if (isSignUp) {
      newErrors.name = validateField(
        "name",
        formData.name,
        formData,
        currentLang,
      );
      newErrors.confirmPassword = validateField(
        "confirmPassword",
        formData.confirmPassword,
        formData,
        currentLang,
      );
    }

    newErrors.email = validateField(
      "email",
      formData.email,
      formData,
      currentLang,
    );
    newErrors.password = validateField(
      "password",
      formData.password,
      formData,
      currentLang,
    );

    // Update form errors
    setFormErrors(newErrors);

    // Check if all required fields are filled
    const requiredFields = isSignUp
      ? ["name", "email", "password", "confirmPassword"]
      : ["email", "password"];

    const emptyFields = requiredFields.filter(
      (field) => !formData[field]?.trim(),
    );

    if (emptyFields.length > 0) {
      return; // Stop execution here - don't submit
    }

    if (isSignUp) {
      const firstName = formData.name.split(" ")[0];
      const lastName = formData.name.split(" ")[1] || "";
      mutate({
        firstName,
        lastName,
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.confirmPassword,
      });
    } else {
      mutate(formData);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({ name: "", email: "", password: "" });
  };

  // Content based on language
  const content = {
    ar: {
      title: "SkyShot",
      welcomeSignIn: "!مرحباً بعودتك",
      welcomeSignUp: "!انضم إلينا اليوم",
      subtitleSignIn: "قم بتسجيل الدخول لمتابعة رحلتك",
      subtitleSignUp: "أنشئ حسابك وابدأ رحلتك معنا",
      googleButton: "تابع باستخدام جوجل",
      or: "أو",
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      signIn: "تسجيل الدخول",
      signUp: "إنشاء حساب",
      haveAccount: "لديك حساب بالفعل؟",
      noAccount: "ليس لديك حساب؟",
      forgotPassword: "هل نسيت كلمة المرور؟",
      switchToSignIn: "تسجيل الدخول",
      switchToSignUp: "إنشاء حساب",
      confirmPassword: "تأكيد كلمة المرور",
    },
    en: {
      title: "SkyShot",
      welcomeSignIn: "Welcome Back!",
      welcomeSignUp: "Join Us Today!",
      subtitleSignIn: "Sign in to continue your journey",
      subtitleSignUp: "Create your account and start your journey with us",
      googleButton: "Continue with Google",
      or: "or",
      fullName: "Full Name",
      email: "Email Address",
      password: "Password",
      signIn: "Sign In",
      signUp: "Sign Up",
      haveAccount: "Already have an account?",
      noAccount: "Don't have an account?",
      forgotPassword: "Forgot your password?",
      switchToSignIn: "Sign In",
      switchToSignUp: "Sign Up",
      confirmPassword: "Confirm Password",
    },
  };

  const currentContent = content[currentLang];

  // Auto-rotate active card
  useEffect(() => {
    fetch("/animations/login-animation.json")
      .then((res) => res.json())
      .then(setAnimationData)
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);

  // Update form errors based on API response
  useEffect(() => {
    if (isError && error) {
      const apiErrors = error.errors || {};
      setFormErrors((prev) => ({
        ...prev,
        name: apiErrors?.firstName || apiErrors?.lastName || "",
        ...apiErrors,
      }));
    }
  }, [isError, error]);

  useEffect(() => {
    const errorMessages = {
      ar: {
        oauth_error: "حصل خطأ أثناء الاتصال بـ Google. حاول مرة أخرى.",
        oauth_failed: "فشل تسجيل الدخول باستخدام Google.",
        token_error: "حصل خطأ في توليد بيانات الدخول. حاول مرة أخرى.",
        missing_token: "بيانات الدخول غير موجودة.",
        unknown: "حصل خطأ غير متوقع.",
      },
      en: {
        oauth_error:
          "An error occurred while connecting to Google. Please try again.",
        oauth_failed: "Failed to log in with Google.",
        token_error:
          "An error occurred while generating the login data. Please try again.",
        missing_token: "Login data is missing.",
        unknown: "An unexpected error occurred.",
      },
    };

    const error = searchParams.get("error");

    if (error) {
      notify.error(t("auth.loginFailed"), errorMessages[currentLang][error]);
    }
  }, [searchParams, currentLang, t]);

  return (
    <div className="from-primaryColor via-secondaryColor to-darkBlueColor relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br p-4">
      {/* Modern Background with SkyShot Branding */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Background Video/Image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: `url("https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753764978/aerial-photography_f2jk9r.jpg")`,
            }}
          />
          <div className="from-primaryColor/90 via-tertiaryColor/80 to-darkBlueColor/90 absolute inset-0 bg-gradient-to-br" />
        </div>

        {/* Floating SkyShot Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="border-primaryTextColor/10 absolute top-20 left-20 h-32 w-32 rounded-full border backdrop-blur-sm"
          style={{
            background:
              "linear-gradient(135deg, var(--color-tertiaryColor)20, transparent)",
          }}
        />

        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [360, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="border-primaryTextColor/15 absolute top-40 right-32 h-24 w-24 border backdrop-blur-sm"
          style={{
            transform: "rotate(45deg)",
            background:
              "linear-gradient(135deg, var(--color-darkBlueColor)30, transparent)",
          }}
        />

        {/* Drone-inspired camera elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="border-primaryTextColor/20 absolute top-1/4 left-1/4 flex h-16 w-16 items-center justify-center rounded-lg border backdrop-blur-sm"
          style={{
            background:
              "linear-gradient(135deg, var(--color-tertiaryColor)40, var(--color-darkBlueColor)20)",
          }}
        >
          <FaCamera className="text-primaryTextColor/60 text-lg" />
        </motion.div>

        {/* Floating sparkles for premium feel */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
            className="absolute"
            style={{
              top: `${15 + i * 12}%`,
              left: `${8 + i * 15}%`,
            }}
          >
            <HiSparkles className="text-primaryTextColor/40 text-sm" />
          </motion.div>
        ))}

        {/* Professional grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(var(--color-primaryTextColor) 1px, transparent 1px),
                linear-gradient(90deg, var(--color-primaryTextColor) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Enhanced glassmorphism blur effects */}
        <div className="bg-tertiaryColor/20 absolute -top-40 -right-32 h-96 w-96 rounded-full blur-3xl" />
        <div className="bg-darkBlueColor/20 absolute -bottom-40 -left-32 h-96 w-96 rounded-full blur-3xl" />
        <div className="bg-secondaryColor/10 absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 transform rounded-full blur-3xl" />
      </div>

      {/* Main Auth Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          type: "spring",
          stiffness: 100,
        }}
        className={`relative z-10 w-full rounded-3xl p-8 shadow-2xl backdrop-blur-xl ${isSignUp ? "max-w-2xl" : "max-w-lg"}`}
        style={{
          background:
            "linear-gradient(135deg, rgba(33, 37, 41, 0.95) 0%, rgba(52, 58, 64, 0.90) 50%, rgba(3, 39, 71, 0.95) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: `
            0 25px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
        }}
      >
        {/* Modern SkyShot Logo Section */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
          className="mb-8 text-center"
        >
          {/* Creative Drone Container */}

          <motion.div className="relative mr-5 mb-8 inline-flex items-center justify-center">
            {/* Outer Rotating Ring */}
            <motion.div className="border-primaryTextColor/8 absolute inset-0 h-32 w-32 rounded-full border" />

            {/* Inner Rotating Ring */}
            <motion.div className="border-yellowColor/12 absolute inset-4 h-24 w-24 rounded-full border" />

            {/* Glow Effect */}
            <div className="from-tertiaryColor/15 to-darkBlueColor/15 absolute inset-6 rounded-full bg-gradient-to-r blur-xl" />

            {/* Drone Body Container */}
            <motion.div
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Lottie
                animationData={animationData}
                loop
                autoplay
                className="mt-6 ml-6 max-h-20 max-w-20 md:ml-6"
              />
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                y: [0, -8, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="from-yellowColor/80 to-yellowColor absolute top-1 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r shadow-lg"
            >
              <FaCamera className="text-primaryColor text-xs" />
            </motion.div>

            <motion.div
              animate={{
                scale: [1, 1.4, 1],
                rotate: [0, 180, 360],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="from-tertiaryColor to-darkBlueColor absolute -bottom-4 -left-4 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r shadow-md"
            >
              <HiSparkles className="text-primaryTextColor text-xs" />
            </motion.div>

            <motion.div
              animate={{
                y: [0, -15, 0],
                opacity: [0.4, 1, 0.4],
                scale: [0.8, 1.3, 0.8],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="from-greenColor/60 to-greenColor absolute top-1 left-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r shadow-sm"
            >
              <div className="h-1 w-1 rounded-full bg-white" />
            </motion.div>
          </motion.div>

          {/* Brand Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-workSansFont mb-2 text-3xl font-bold"
            style={{
              background:
                "linear-gradient(135deg, var(--color-primaryTextColor) 0%, var(--color-secondaryTextColor) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {currentContent?.title}
          </motion.h1>
        </motion.div>

        {/* Modern Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-8 text-center"
        >
          <motion.h2
            className="font-workSansFont text-primaryTextColor mb-3 text-2xl font-bold md:text-3xl"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
          >
            {isSignUp
              ? currentContent?.welcomeSignUp
              : currentContent?.welcomeSignIn}
          </motion.h2>
          <motion.p
            className="text-secondaryTextColor mx-auto max-w-md text-sm leading-relaxed md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {isSignUp
              ? currentContent?.subtitleSignUp
              : currentContent?.subtitleSignIn}
          </motion.p>
        </motion.div>

        {/* Modern Google Sign In Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 10px 30px rgba(255, 255, 255, 0.1)",
          }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleLogin}
          className="group relative mb-6 flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl border px-6 py-4 font-semibold shadow-lg transition-all duration-300"
          style={{
            borderColor: "rgba(255, 255, 255, 0.2)",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            color: "var(--color-primaryColor)",
          }}
        >
          {/* Hover Effect */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

          <FaGoogle className="relative z-10 text-xl text-red-500" />
          <span className="relative z-10">{currentContent?.googleButton}</span>
        </motion.button>

        {/* Modern Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mb-6 flex items-center justify-center"
        >
          <div className="via-secondaryTextColor/30 h-px flex-1 bg-gradient-to-r from-transparent to-transparent"></div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-secondaryTextColor px-4 text-sm font-medium"
          >
            {currentContent?.or}
          </motion.span>
          <div className="via-secondaryTextColor/30 h-px flex-1 bg-gradient-to-r from-transparent to-transparent"></div>
        </motion.div>

        {/* Modern Form */}
        <AnimatePresence mode="wait">
          <motion.form
            key={isSignUp ? "signup" : "signin"}
            initial={{ opacity: 0, x: isSignUp ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isSignUp ? -30 : 30 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
            className="space-y-5"
            dir={currentLang === "ar" ? "rtl" : "ltr"}
          >
            {/* Full Name Field - Only for Sign Up */}
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="group relative">
                  <FaUser
                    className={`absolute top-1/2 -translate-y-1/2 transform text-gray-400 ${currentLang === "ar" ? "right-4" : "left-4"}`}
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder={currentContent?.fullName}
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full rounded-2xl border py-4 transition-all duration-300 focus:border-blue-400 focus:shadow-lg focus:outline-none ${
                      currentLang === "ar" ? "pr-10 pl-12" : "pr-12 pl-10"
                    }`}
                    style={{
                      backgroundColor: "#343a40",
                      borderColor: "#6a7282",
                      color: "#fff",
                    }}
                  />
                  {/* Focus Ring */}
                  <div className="group-focus-within:border-tertiaryColor/50 pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-300" />
                </div>

                {formErrors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-errorColor mt-2 text-sm font-medium"
                  >
                    {formErrors.name}
                  </motion.p>
                )}
              </motion.div>
            )}

            <div>
              <div className="relative">
                <FaEnvelope
                  className={`absolute top-1/2 -translate-y-1/2 transform text-gray-400 ${currentLang === "ar" ? "right-4" : "left-4"}`}
                />
                <input
                  type="email"
                  name="email"
                  placeholder={currentContent?.email}
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full rounded-2xl border py-4 transition-all duration-300 focus:border-blue-400 focus:shadow-lg focus:outline-none ${
                    currentLang === "ar" ? "pr-10 pl-12" : "pr-12 pl-10"
                  }`}
                  style={{
                    backgroundColor: "#343a40",
                    borderColor: "#6a7282",
                    color: "#fff",
                  }}
                />
              </div>
              {formErrors.email && (
                <p className="text-errorColor pl-3 text-[.8rem] font-bold md:text-[.85rem]">
                  {formErrors.email}
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <FaLock
                  className={`absolute top-1/2 -translate-y-1/2 transform text-gray-400 ${currentLang === "ar" ? "right-4" : "left-4"}`}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder={currentContent?.password}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full rounded-2xl border py-4 transition-all duration-300 focus:border-blue-400 focus:shadow-lg focus:outline-none ${
                    currentLang === "ar" ? "pr-10 pl-12" : "pr-12 pl-10"
                  }`}
                  style={{
                    backgroundColor: "#343a40",
                    borderColor: "#6a7282",
                    color: "#fff",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute top-1/2 -translate-y-1/2 transform text-gray-400 transition-colors duration-200 hover:text-gray-300 ${
                    currentLang === "ar" ? "left-4" : "right-4"
                  }`}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {formErrors.password && (
                <p className="text-errorColor pl-3 text-[.8rem] font-bold md:text-[.85rem]">
                  {formErrors.password}
                </p>
              )}
            </div>
            {isSignUp && (
              <div>
                <div className="relative">
                  <FaLock
                    className={`absolute top-1/2 -translate-y-1/2 transform text-gray-400 ${currentLang === "ar" ? "right-4" : "left-4"}`}
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder={currentContent?.confirmPassword}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full rounded-2xl border py-4 transition-all duration-300 focus:border-blue-400 focus:shadow-lg focus:outline-none ${
                      currentLang === "ar" ? "pr-10 pl-12" : "pr-12 pl-10"
                    }`}
                    style={{
                      backgroundColor: "#343a40",
                      borderColor: "#6a7282",
                      color: "#fff",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute top-1/2 -translate-y-1/2 transform text-gray-400 transition-colors duration-200 hover:text-gray-300 ${
                      currentLang === "ar" ? "left-4" : "right-4"
                    }`}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {formErrors.confirmPassword && (
                  <p className="text-errorColor pl-3 text-[.8rem] font-bold md:text-[.85rem]">
                    {formErrors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            <motion.button
              whileHover={!isPending && isFormValid() ? { scale: 1.02 } : {}}
              whileTap={!isPending && isFormValid() ? { scale: 0.98 } : {}}
              type="button"
              onClick={handleFormSubmit}
              className={`mt-6 flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 font-semibold shadow-lg transition-all duration-300 hover:shadow-xl`}
              style={{
                background: "linear-gradient(90deg, #001d3d, #032747)",
                color: "#fff",
              }}
            >
              {isPending && (
                <svg
                  className="h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                  ></path>
                </svg>
              )}

              {isPending
                ? currentLang === "ar"
                  ? "جاري التحميل..."
                  : "Loading..."
                : isSignUp
                  ? currentContent?.signUp
                  : currentContent?.signIn}
            </motion.button>
          </motion.form>
        </AnimatePresence>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
          dir={currentLang === "ar" ? "rtl" : "ltr"}
        >
          <p style={{ color: "#6a7282" }}>
            {isSignUp ? currentContent?.haveAccount : currentContent?.noAccount}
            <button
              onClick={toggleMode}
              className="text-sm font-semibold transition-colors duration-300 hover:text-blue-400 md:text-base ltr:ml-2 rtl:mr-2"
              style={{ color: "#fff" }}
            >
              {isSignUp
                ? currentContent?.switchToSignIn
                : currentContent?.switchToSignUp}
            </button>
          </p>
        </motion.div>

        {/* Forgot Password */}
        {!isSignUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-4 text-center"
          >
            <button
              className="text-sm transition-colors duration-300 hover:text-blue-400"
              style={{ color: "#6a7282" }}
            >
              {currentContent?.forgotPassword}
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AuthInterface;
