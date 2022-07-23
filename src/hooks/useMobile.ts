import { useState, useEffect } from 'react';

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkForDevice = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 948.98) {
        return true;
      }
      return false;
    };

    const handlePageResized = () => {
      setIsMobile(checkForDevice);
    };

    window.addEventListener('resize', handlePageResized);
    window.addEventListener('orientationchange', handlePageResized);
    window.addEventListener('load', handlePageResized);
    window.addEventListener('reload', handlePageResized);

    handlePageResized();

    return () => {
      window.removeEventListener('resize', handlePageResized);
      window.removeEventListener('orientationchange', handlePageResized);
      window.removeEventListener('load', handlePageResized);
      window.removeEventListener('reload', handlePageResized);
    };
  }, []);

  return {
    isMobile,
  };
};
