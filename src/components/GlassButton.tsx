import { motion } from "motion/react";
import { ReactNode } from "react";

interface GlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
}

export const GlassButton = ({ children, onClick, className = "", variant = "primary" }: GlassButtonProps) => {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`glass-button group ${className}`}
    >
      <span className={`relative z-10 font-medium tracking-wide ${variant === "primary" ? "text-white" : "text-gold"}`}>
        {children}
      </span>
      {/* Surface reflection effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full" />
    </motion.button>
  );
};
