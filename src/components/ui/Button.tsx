import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const base = "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-500",
    };
    const sizes = { 
      sm: "px-3 py-1.5 text-sm", 
      md: "px-4 py-2 text-sm", 
      lg: "px-6 py-3 text-base" 
    };

    return (
      <button 
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} 
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
