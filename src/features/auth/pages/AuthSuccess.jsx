import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { tokenManager } from "../utils/tokenManager";
import { useTranslation } from "react-i18next";

export default function AuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { i18n, t } = useTranslation("auth");
  const lang = i18n.language;

  useEffect(() => {
    const token = searchParams.get("token");

    let timer;
    if (token) {
      tokenManager.setAccessToken(token);

      timer = setTimeout(() => navigate("/dashboard"), 2000);
    } else {
      navigate("/auth?error=missing_token");
    }

    return () => {
      clearTimeout(timer);
    };
  }, [searchParams, navigate]);

  return <div>{t("auth:loginSuccess")}</div>;
}
