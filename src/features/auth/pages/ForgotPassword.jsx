import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";

import FormInput from "../components/FormInput";
import { useAuth } from "@hooks/useAuth";
// import { useAuth } from "../context/AuthContext";

const ForgotPassword = () => {
  const { t, i18n } = useTranslation(["common", "auth"]);
  const direction = i18n.dir();
  const { forgotPassword, isLoading, error } = useAuth();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError(t("auth:forgotPassword.emailRequired"));
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(t("auth:forgotPassword.invalidEmail"));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Forgot password error:", err);
    }
  };

  return (
    <>
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-tertiaryColor/10 rounded-lg p-6 text-center"
        >
          <h3 className="mb-2 text-xl font-bold text-white">
            {t("auth:forgotPassword.checkEmail")}
          </h3>
          <p className="text-secondaryTextColor mb-4">
            {t("auth:forgotPassword.resetLinkSent", { email })}
          </p>
          <p className="text-secondaryTextColor text-sm">
            {t("auth:forgotPassword.didNotReceive")}{" "}
            <button
              onClick={() => setIsSubmitted(false)}
              className="font-medium text-white hover:underline"
            >
              {t("auth:forgotPassword.tryAgain")}
            </button>
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} dir={direction}>
          <div className="space-y-4">
            <div className="relative">
              <div className="text-secondaryTextColor absolute inset-y-0 left-0 flex items-center pl-3">
                <FaEnvelope />
              </div>
              <FormInput
                id="email"
                type="email"
                label={t("auth:forgotPassword.emailLabel")}
                placeholder={t("auth:forgotPassword.emailPlaceholder")}
                value={email}
                onChange={handleChange}
                error={emailError}
                required
                autoComplete="email"
                dir={direction}
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg bg-red-500/10 p-3 text-center text-sm text-red-500"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              className="bg-tertiaryColor hover:bg-secondaryColor focus:ring-tertiaryColor w-full rounded-lg px-4 py-3 text-center font-medium text-white shadow-lg focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-70"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading
                ? t("auth:forgotPassword.sending")
                : t("auth:forgotPassword.sendButton")}
            </motion.button>

            <div className="text-secondaryTextColor mt-4 text-center text-sm">
              {t("auth:forgotPassword.rememberPassword")}{" "}
              <Link
                to="/auth/login"
                className="font-medium text-white hover:underline"
              >
                {t("auth:forgotPassword.backToLogin")}
              </Link>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default ForgotPassword;
