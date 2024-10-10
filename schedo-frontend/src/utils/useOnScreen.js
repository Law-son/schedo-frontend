// src/useOnScreen.js
import { useEffect, useRef, useState } from 'react';

const useOnScreen = (options) => {
  const ref = useRef(null);  // reference to the component being observed
  const [isVisible, setIsVisible] = useState(false);  // tracks visibility

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);  // set to true if element is visible
      },
      options
    );

    if (ref.current) {
      observer.observe(ref.current);  // start observing the ref element
    }

    // Cleanup observer on component unmount
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isVisible];  // return the ref and visibility status
};

export default useOnScreen;
