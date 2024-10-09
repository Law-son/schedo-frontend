// src/components/Button.jsx
import React from 'react';

const Button = ({ children, className, variant = 'primary', ...props }) => {
  const baseStyles = "rounded p-2 text-white font-semibold focus:outline-none";

  // Conditional styles based on the variant prop
  const variantStyles =
    variant === 'primary'
      ? "bg-primary-blue hover:bg-blue-black transition duration-500"
      : "bg-gray-800 hover:bg-gray-700 transition duration-500";

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
