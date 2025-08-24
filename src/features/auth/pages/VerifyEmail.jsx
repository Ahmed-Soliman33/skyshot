import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

import { useAuth } from "@hooks/useAuth";
// import { useAuth } from "../context/AuthContext";

const VerifyEmail = () => {
  const { t, i18n } = useTranslation(["common", "auth"]);
  const direction = i18n.dir();
  const { verifyEmail, resendVerification, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [token, setToken] = useState("");
  const [verificationState, setVerificationState] = useState("verifying");
  const [email, setEmail] = useState("");
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      verifyEmailWithToken(tokenFromUrl);
    } else {
      setVerificationState("error");
    }
  }, [searchParams]);

  useEffect(() => {
    if (verificationState === "success" && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      navigate("/login");
    }
  }, [verificationState, countdown, navigate]);

  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  const verifyEmailWithToken = async (verificationToken) => {
    try {
      await verifyEmail(verificationToken);
      setVerificationState("success");
    } catch (err) {
      console.error("Email verification error:", err);
      setVerificationState("error");
    }
  };

  const handleResendVerification = async () => {
    if (resendCountdown > 0 || !email) return;

    try {
      await resendVerification(email);
      setResendSuccess(true);
      setResendCountdown(60); // 1 minute cooldown

      // Reset resendSuccess after 5 seconds
      setTimeout(() => setResendSuccess(false), 5000);
    } catch (err) {
      console.error("Resend verification error:", err);
    }
  };

  const renderVerificationState = () => {
    switch (verificationState) {
      case "verifying":
        return (
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <FaSpinner className="text-tertiaryColor h-16 w-16 animate-spin" />
            <h3 className="text-xl font-bold text-white">
              {t("auth:verifyEmail.verifying")}
            </h3>
            <p className="text-secondaryTextColor">
              {t("auth:verifyEmail.pleaseWait")}
            </p>
          </div>
        );
      case "success":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <FaCheckCircle className="h-16 w-16 text-green-500" />
            <h3 className="text-xl font-bold text-white">
              {t("auth:verifyEmail.success")}
            </h3>
            <p className="text-secondaryTextColor">
              {t("auth:verifyEmail.accountVerified")}
            </p>
            <p className="text-secondaryTextColor text-sm">
              {t("auth:verifyEmail.redirecting", { seconds: countdown })}
            </p>
            <motion.button
              onClick={() => navigate("/auth/login")}
              className="bg-tertiaryColor hover:bg-secondaryColor focus:ring-tertiaryColor rounded-lg px-4 py-2 text-center font-medium text-white shadow-lg focus:ring-2 focus:ring-offset-2 focus:outline-none"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t("auth:verifyEmail.loginNow")}
            </motion.button>
          </motion.div>
        );
      case "error":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <FaTimesCircle className="h-16 w-16 text-red-500" />
            <h3 className="text-xl font-bold text-white">
              {t("auth:verifyEmail.error")}
            </h3>
            <p className="text-secondaryTextColor">
              {error || t("auth:verifyEmail.invalidOrExpired")}
            </p>
            {email && (
              <div className="mt-4 space-y-2">
                <p className="text-secondaryTextColor text-sm">
                  {t("auth:verifyEmail.needNewLink")}
                </p>
                <motion.button
                  onClick={handleResendVerification}
                  disabled={resendCountdown > 0 || isLoading}
                  className="bg-tertiaryColor hover:bg-secondaryColor focus:ring-tertiaryColor rounded-lg px-4 py-2 text-center font-medium text-white shadow-lg focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-70"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {resendCountdown > 0
                    ? `${t("auth:verifyEmail.resendIn")} ${resendCountdown}s`
                    : isLoading
                      ? t("auth:verifyEmail.sending")
                      : t("auth:verifyEmail.resendButton")}
                </motion.button>
              </div>
            )}
            <motion.button
              onClick={() => navigate("/auth/login")}
              className="mt-2 text-sm font-medium text-white hover:underline"
              whileHover={{ scale: 1.02 }}
            >
              {t("auth:verifyEmail.backToLogin")}
            </motion.button>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-primaryColor/30 rounded-lg p-6" dir={direction}>
      {renderVerificationState()}

      {resendSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-tertiaryColor/10 mt-4 rounded-lg p-3 text-center text-sm text-white"
        >
          {t("auth:verifyEmail.resendSuccess")}
        </motion.div>
      )}
    </div>
  );
};

export default VerifyEmail;
