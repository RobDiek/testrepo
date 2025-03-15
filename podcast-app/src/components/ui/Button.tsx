import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
}) => {
  const baseClasses = 'glass-button font-medium transition-all duration-300 inline-flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-[#0072C6] hover:bg-[#0072C6]/90 text-white',
    secondary: 'bg-[#29F49A] hover:bg-[#29F49A]/90 text-black',
    outline: 'bg-transparent border border-white/20 hover:bg-white/10 text-white',
  };
  
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5 rounded-md',
    md: 'text-base px-4 py-2 rounded-lg',
    lg: 'text-lg px-6 py-3 rounded-lg',
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <motion.button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      whileHover={disabled ? {} : { scale: 1.02 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;
