const Button = ({ Icon, children, size = 20, className = "" }) => {
  return (
    <div className={`group relative w-full cursor-pointer ${className}`}>
      <div className="bg-secondary/0 group-hover:bg-secondary/5 absolute inset-0 rounded-xl transition-all duration-300"></div>
      <div className="from-primary/0 to-secondary/0 group-hover:from-primary/5 group-hover:to-secondary/5 absolute inset-0 rounded-xl bg-linear-to-r opacity-0 transition-all duration-300 group-hover:opacity-100"></div>

      <div className="relative flex items-center gap-3 px-4 py-2.5">
        {Icon && (
          <div className="relative flex items-center justify-center">
            <Icon
              size={size}
              className="text-text/60 group-hover:text-text/90 relative z-10 transition-colors duration-300"
            />
          </div>
        )}
        <span className="font-outfit text-text/60 group-hover:text-text/90 text-[15px] font-medium transition-colors duration-300">
          {children}
        </span>
      </div>
    </div>
  );
};

export default Button;
