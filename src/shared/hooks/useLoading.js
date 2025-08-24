import { useState, useEffect } from "react";

const useLoading = (videoRef, options = {}) => {
  const {
    minLoadingTime = 1000, // الحد الأدنى لوقت التحميل
    timeout = 10000, // مهلة زمنية للتحميل
    showLoadingOnReload = true, // إظهار التحميل عند إعادة التحميل
  } = options;

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!videoRef?.current) {
      setIsLoading(false);
      return;
    }

    const video = videoRef.current;
    const startTime = Date.now();
    let timeoutId;

    // إعادة تعيين الحالة
    setIsLoading(true);
    setHasError(false);

    const handleCanPlay = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    };

    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
    };

    const handleLoadStart = () => {
      if (showLoadingOnReload) {
        setIsLoading(true);
        setHasError(false);
      }
    };

    // إعداد مهلة زمنية
    timeoutId = setTimeout(() => {
      setHasError(true);
      setIsLoading(false);
    }, timeout);

    // إضافة مستمعي الأحداث
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);
    video.addEventListener("loadstart", handleLoadStart);

    // تنظيف
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
      video.removeEventListener("loadstart", handleLoadStart);
    };
  }, [videoRef, minLoadingTime, timeout, showLoadingOnReload]);

  return { isLoading, hasError };
};

export default useLoading;
