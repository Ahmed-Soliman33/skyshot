import { useRef } from "react";

import LoadingScreen from "@components/loading/LoadingScreen";
// import useLoading from "@hooks/useLoading";

const DroneHero = () => {
  const videoRef = useRef(null);
  // const isLoading = useLoading(videoRef);
  return (
    <>
      {/* <LoadingScreen isLoading={isLoading} /> */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Fullscreen Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source
              src={
                "https://res.cloudinary.com/dqlvs4ae5/video/upload/v1753766837/invideo-ai_zo6asy.mp4"
              }
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Video Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/60"></div>
        </div>
      </section>
    </>
  );
};

export default DroneHero;
