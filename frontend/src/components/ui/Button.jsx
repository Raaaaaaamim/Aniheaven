const Button = ({ Icon, children, size = 20 }) => {
  return (
    <div className=" flex group  cursor-pointer justify-center items-center gap-2 ">
      <div className=" center p-2   rounded-full  ">
        {
          <Icon
            size={size}
            className=" group-hover:text-text ease-in duration-100 text-grayText "
          />
        }
      </div>
      <span className="  ease-in duration-100 font-bold group-hover:text-text text-grayText ">
        {children}
      </span>
    </div>
  );
};

export default Button;
