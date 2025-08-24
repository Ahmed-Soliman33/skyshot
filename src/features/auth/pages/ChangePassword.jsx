import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import FormInput from "../components/FormInput";
import { useAuth } from "@hooks/useAuth";
// import { useAuth } from "../context/AuthContext";

const ChangePassword = () => {
  const { t, i18n } = useTranslation(["common", "auth"]);
  const direction = i18n.dir();
  const navigate = useNavigate();
  const { changePassword, isLoading, error } = useAuth();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);

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
    if (!formData.currentPassword) {
      errors.currentPassword = t("auth:changePassword.currentPasswordRequired");
    }

    if (!formData.newPassword) {
      errors.newPassword = t("auth:changePassword.newPasswordRequired");
    } else if (formData.newPassword.length < 8) {
      errors.newPassword = t("auth:changePassword.passwordTooShort");
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      errors.newPassword = t("auth:changePassword.passwordRequirements");
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = t("auth:changePassword.confirmPasswordRequired");
    } else if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = t("auth:changePassword.passwordsDoNotMatch");
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await changePassword(formData.currentPassword, formData.newPassword);
      setSuccess(true);

      // Start countdown to redirect
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate("/dashboard");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      console.error("Change password error:", err);
    }
  };

  return (
    <div className="w-full max-w-md" dir={direction}>
      {success ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-green-500/10 p-6 text-center text-green-500"
        >
          <h3 className="mb-2 text-xl font-bold">
            {t("auth:changePassword.success")}
          </h3>
          <p>{t("auth:changePassword.successMessage")}</p>
          <p className="mt-4">
            {t("auth:changePassword.redirecting", { seconds: countdown })}
          </p>
        </motion.div>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primaryColor/30 space-y-6 rounded-lg p-6 shadow-lg"
          onSubmit={handleSubmit}
        >
          <FormInput
            id="currentPassword"
            type="password"
            label={t("auth:changePassword.currentPassword")}
            value={formData.currentPassword}
            onChange={handleChange}
            error={formErrors.currentPassword}
            placeholder={t("auth:changePassword.currentPasswordPlaceholder")}
          />

          <FormInput
            id="newPassword"
            type="password"
            label={t("auth:changePassword.newPassword")}
            value={formData.newPassword}
            onChange={handleChange}
            error={formErrors.newPassword}
            placeholder={t("auth:changePassword.newPasswordPlaceholder")}
          />

          <FormInput
            id="confirmPassword"
            type="password"
            label={t("auth:changePassword.confirmPassword")}
            value={formData.confirmPassword}
            onChange={handleChange}
            error={formErrors.confirmPassword}
            placeholder={t("auth:changePassword.confirmPasswordPlaceholder")}
          />

          {error && (
            <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-500">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between">
            <motion.button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="text-secondaryTextColor text-sm hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("auth:changePassword.cancel")}
            </motion.button>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="bg-tertiaryColor hover:bg-secondaryColor focus:ring-tertiaryColor rounded-md px-4 py-2 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-70"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading
                ? t("auth:changePassword.changing")
                : t("auth:changePassword.change")}
            </motion.button>
          </div>
        </motion.form>
      )}
    </div>
  );
};

export default ChangePassword;
