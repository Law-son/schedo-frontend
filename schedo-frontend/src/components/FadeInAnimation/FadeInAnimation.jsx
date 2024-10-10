import React from 'react';
import useOnScreen from '../../utils/useOnScreen';
import './FadeInAnimation.css';

const FadeInAnimation = ({ children }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });  // Use the hook

  return (
    <div
      ref={ref}  // Attach ref to this div
      className={`fade-in-section ${isVisible ? 'visible' : ''}`}  // Add visible class based on visibility
    >
      {children}
    </div>
  );
};

export default FadeInAnimation;
