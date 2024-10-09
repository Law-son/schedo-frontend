// src/components/Input.jsx
import React from 'react';

const Input = ({ className, ...props }) => {
  return (
    <input
      className={`border rounded p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props} // Spread operator to pass other props (e.g., placeholder, type)
    />
  );
};

export default Input;
