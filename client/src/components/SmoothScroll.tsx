import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change with smooth behavior
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);

  return <>{children}</>;
};

export default SmoothScroll;