import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";

import FormInput from "../components/FormInput";
import { useAuth } from "@hooks/useAuth";
// import { useAuth } from "../context/AuthContext";

const ResetPassword = () => {
  const { t, i18n } = useTranslation(["common", "auth"]);
  const direction = i18n.dir();
  const { resetPassword, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [token, setToken] = useState("");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    let timer;
    if (isSuccess && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isSuccess && countdown === 0) {
      navigate("/auth/login");
    }
    return () => clearTimeout(timer);
  }, [isSuccess, countdown, navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    // Clear error when user types
    if (formErrors[id]) {
      setFormErrors({ ...formErrors, [id]: "" });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.password) {
      errors.password = t("auth:resetPassword.passwordRequired");
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formData.password,
      )
    ) {
      errors.password = t("auth:resetPassword.passwordRequirements");
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = t("auth:resetPassword.confirmPasswordRequired");
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = t("auth:resetPassword.passwordsDoNotMatch");
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await resetPassword(token, formData.password);
      setIsSuccess(true);
    } catch (err) {
      console.error("Reset password error:", err);
    }
  };

  return (
    <>
      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-tertiaryColor/10 rounded-lg p-6 text-center"
        >
          <h3 className="mb-2 text-xl font-bold text-white">
            {t("auth:resetPassword.success")}
          </h3>
          <p className="text-secondaryTextColor mb-4">
            {t("auth:resetPassword.passwordUpdated")}
          </p>
          <p className="text-secondaryTextColor text-sm">
            {t("auth:resetPassword.redirecting", { seconds: countdown })}
          </p>
          <motion.button
            onClick={() => navigate("/auth/login")}
            className="bg-tertiaryColor hover:bg-secondaryColor focus:ring-tertiaryColor mt-4 rounded-lg px-4 py-2 text-center font-medium text-white shadow-lg focus:ring-2 focus:ring-offset-2 focus:outline-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t("auth:resetPassword.loginNow")}
          </motion.button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} dir={direction}>
          <div className="space-y-4">
            <div className="relative">
              <div className="text-secondaryTextColor absolute inset-y-0 left-0 flex items-center pl-3">
                <FaLock />
              </div>
              <FormInput
                id="password"
                type="password"
                label={t("auth:resetPassword.passwordLabel")}
                placeholder={t("auth:resetPassword.passwordPlaceholder")}
                value={formData.password}
                onChange={handleChange}
                error={formErrors.password}
                required
                autoComplete="new-password"
                dir={direction}
              />
            </div>

            <div className="relative">
              <div className="text-secondaryTextColor absolute inset-y-0 left-0 flex items-center pl-3">
                <FaLock />
              </div>
              <FormInput
                id="confirmPassword"
                type="password"
                label={t("auth:resetPassword.confirmPasswordLabel")}
                placeholder={t("auth:resetPassword.confirmPasswordPlaceholder")}
                value={formData.confirmPassword}
                onChange={handleChange}
                error={formErrors.confirmPassword}
                required
                autoComplete="new-password"
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
                ? t("auth:resetPassword.resetting")
                : t("auth:resetPassword.resetButton")}
            </motion.button>
          </div>
        </form>
      )}
    </>
  );
};

export default ResetPassword;
