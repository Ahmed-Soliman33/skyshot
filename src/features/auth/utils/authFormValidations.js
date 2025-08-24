// Pass currentLang dynamically (so it's reusable in all places)
export const validateName = (name, currentLang = "en") => {
  if (!name?.trim()) {
    return currentLang === "ar" ? "الاسم مطلوب" : "Name is required";
  }

  const nameParts = name
    .trim()
    .split(" ")
    .filter((part) => part.length > 0);

  if (nameParts.length < 2) {
    return currentLang === "ar"
      ? "يجب أن يحتوي الاسم على جزئين على الأقل مفصولين بمسافة"
      : "Name must contain at least two parts separated by space";
  }

  if (name.length < 3) {
    return currentLang === "ar"
      ? "الاسم يجب أن يكون 3 أحرف على الأقل"
      : "Name must be at least 3 characters";
  }

  return "";
};

export const validateEmail = (email, currentLang = "en") => {
  if (!email?.trim()) {
    return currentLang === "ar"
      ? "البريد الإلكتروني مطلوب"
      : "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return currentLang === "ar"
      ? "البريد الإلكتروني غير صحيح"
      : "Invalid email address";
  }
  return "";
};

export const validatePassword = (password, currentLang = "en") => {
  if (!password) {
    return currentLang === "ar" ? "كلمة المرور مطلوبة" : "Password is required";
  }

  // Check all requirements at once and provide comprehensive message
  const hasMinLength = password.length >= 8;
  const hasUppercase = /(?=.*[A-Z])/.test(password);
  const hasLowercase = /(?=.*[a-z])/.test(password);
  const hasNumber = /(?=.*\d)/.test(password);
  const hasSpecialChar = /(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(
    password,
  );

  if (
    !hasMinLength ||
    !hasUppercase ||
    !hasLowercase ||
    !hasNumber ||
    !hasSpecialChar
  ) {
    return currentLang === "ar"
      ? "كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل، وتشمل حرف كبير وحرف صغير ورقم ورمز خاص"
      : "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character";
  }

  return "";
};

export const validateConfirmPassword = (
  confirmPassword,
  password,
  currentLang = "en",
) => {
  if (!confirmPassword) {
    return currentLang === "ar"
      ? "تأكيد كلمة المرور مطلوب"
      : "Confirm password is required";
  }

  if (confirmPassword !== password) {
    return currentLang === "ar"
      ? "كلمات المرور غير متطابقة"
      : "Passwords do not match";
  }

  return "";
};

// Generic field validation switch
export const validateField = (
  fieldName,
  value,
  formData = {},
  currentLang = "en",
) => {
  switch (fieldName) {
    case "name":
      return validateName(value, currentLang);
    case "email":
      return validateEmail(value, currentLang);
    case "password":
      return validatePassword(value, currentLang);
    case "confirmPassword":
      return validateConfirmPassword(value, formData.password, currentLang);
    default:
      return "";
  }
};
