import React from 'react';
import './TextBox.css';

const TextBox = ({ value, onChange, placeholder, className, required }) => {
  return (
    <input
      type="text"
      className={`text-box ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  );
};

export default TextBox;
