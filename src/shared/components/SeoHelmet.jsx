import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const SeoHelmet = ({
  title = "Skyshot - Premium Drone Photography Services",
  description = "Professional aerial and ground photography services in Saudi Arabia.",
  url = "https://skyshot.sa",
  image = "https://skyshot.sa/preview.png",
  preloadLink,
}) => {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  return (
    <Helmet htmlAttributes={{ lang }}>
      {/* Primary Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={"Skyshot.sa"} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={lang === "ar" ? "Arabic" : "English"} />
      <meta name="geo.region" content="SA" />
      <meta name="geo.country" content="Saudi Arabia" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={"Skyshot.sa"} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Performance: Example Preload */}
      {preloadLink && <link rel="preload" {...preloadLink} />}
    </Helmet>
  );
};

export default SeoHelmet;
