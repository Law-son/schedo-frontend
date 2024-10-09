import React, { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const HeroSection = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768); // Change 768px to your breakpoint

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={styles.heroContainer}>
      <div style={styles.heroText} className="absolute mb-[195px] bg-transparent max-w-[60%] md:mb-0 md:max-w-[40%] md:relative">
        <h1 className="text-blue-black mb-5 text-[45px] text-left font-bold leading-tight md:mb-0 md:text-[70px]">
          Easy scheduling ahead
        </h1>
        <p className="text-blue-black mb-8 text-left text-[20px] md:mb-0">
          Join other users to easily schedule and book events, meetings, and more!
        </p>
        <button
          style={{
            ...styles.ctaButton,
            ...(isSmallScreen ? styles.ctaButtonSmall : {})
          }}
        >
          Get Started
        </button>
      </div>

      {/* Lottie Animation */}
      <Player
        autoplay
        loop
        src="/lottieBg.json"
        style={{
          ...styles.lottieAnimation,
          ...(isSmallScreen ? styles.lottieAnimationSmall : {})
        }}
        className="md:translate-x-0 md:relative"
      />
    </div>
  );
};

const styles = {
  heroContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100vh",
    backgroundColor: "#fff",
    padding: "0 50px",
    overflowX: "hidden",
  },
  heroText: {
    padding: "20px 20px",
    zIndex: "10",
    textAlign: "left",
  },
  ctaButton: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  ctaButtonSmall: {
    // Center the button on small screens
    // display: "block",
    margin: "20px auto 0 auto",
  },
  lottieAnimation: {
    width: "500px",
    height: "500px",
  },
  lottieAnimationSmall: {
    // Move the animation a bit to the right on small screens
    transform: "translateX(110px)",
  },
};

export default HeroSection;
