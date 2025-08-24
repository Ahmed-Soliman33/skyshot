import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";
import Logo from "@components/Logo";
import LanguageSwitcher from "@components/LanguageSwitcher";

const AuthLayout = () => {
  const { t } = useTranslation("common");

  return (
    <div className="from-primaryColor to-darkBlueColor flex min-h-screen flex-col bg-gradient-to-b">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
      <div className="mx-auto w-full rounded-xl backdrop-blur-md md:p-8">
        <Outlet />
      </div>

      <footer className="py-6 text-center text-sm text-white/60">
        <p>
          &copy; {new Date().getFullYear()} SkyShot.{" "}
          <Link to="/privacy-policy" className="hover:text-white">
            {t("footer.privacyPolicy")}
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default AuthLayout;
