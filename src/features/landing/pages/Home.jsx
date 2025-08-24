import LandingHero from "@features/landing/components/LandingHero";
import ServicesSection from "../components/ServicesSection";
import SkyShotOfTheDay from "../components/SkyShotOfTheDay";
import { Suspense } from "react";
import GallerySection from "../components/GallerySection";
import AboutSection from "../components/AboutSection";
import TestimonialsSection from "../components/TestimonialsSection";
import SeoHelmet from "@components/SeoHelmet";
import FAQSection from "../components/FAQSection";
import LoadingSpinner from "@components/loading/LoadingSpinner";

const Home = () => {
  return (
    <>
      <SeoHelmet
        preloadLink={{
          rel: "preload",
          as: "video",
          href: "https://res.cloudinary.com/dqlvs4ae5/video/upload/v1753806286/sky_motion_mnbl1b2_fwwbqj.webm",
          type: "video/webm",
        }}
        image="https://skyshot.sa/preview.png"
        title="Skyshot - Premium Drone Photography Services"
        description="Professional aerial and ground photography services in Saudi Arabia."
      />
      <>
        <LandingHero />
        <Suspense fallback={<LoadingSpinner />}>
          <SkyShotOfTheDay />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <ServicesSection />
          <GallerySection />
          <AboutSection />
          <TestimonialsSection />
        </Suspense>
        <FAQSection />
      </>
    </>
  );
};
export default Home;
