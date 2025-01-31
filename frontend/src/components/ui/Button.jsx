const Button = ({ Icon, children, size = 20, className = "" }) => {
  return (
    <div className={`group relative w-full cursor-pointer ${className}`}>
      <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/5 rounded-xl transition-all duration-300"></div>
      <div className="absolute inset-0 bg-linear-to-r from-primary/0 to-secondary/0 group-hover:from-primary/5 group-hover:to-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

      <div className="relative px-4 py-2.5 flex items-center gap-3">
        <div className="flex items-center justify-center relative">
          <Icon
            size={size}
            className="relative z-10 text-text/60 group-hover:text-text/90 transition-colors duration-300"
          />
        </div>
        <span className="font-outfit text-[15px] font-medium text-text/60 group-hover:text-text/90 transition-colors duration-300">
          {children}
        </span>
      </div>
    </div>
  );
};

export default Button;
