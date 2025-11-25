import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  icon,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide";
  
  const variants = {
    // Gradiente Roxo -> Ciano (Aurora Effect) - REMOVIDO BORDER E SOMBRA PADRÃO
    primary: "bg-gradient-to-r from-primary-600 via-violet-500 to-accent-500 hover:from-primary-500 hover:via-violet-400 hover:to-accent-400 text-white bg-[length:200%_auto] hover:bg-right transition-[background-position]",
    secondary: "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 backdrop-blur-sm",
    outline: "border border-primary-500 text-primary-400 hover:bg-primary-500/10 hover:text-white"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {children}
    </button>
  );
};