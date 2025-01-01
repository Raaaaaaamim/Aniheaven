const VideoButton = ({
  Icon,
  title,
  onClick,
  isClicked,
  iconSize,
  underline,
}) => {
  return (
    <div
      onClick={onClick}
      className={` ${
        isClicked ? "text-primary hover:!text-primary " : "text-secText"
      } relative group  cursor-pointer  justify-center items-center flex flex-col max-w-64      h-20 min-w-fit rounded-xl hover:text-text transition-all duration-200 gap-1   `}
    >
      <Icon size={iconSize || 15} className={"  text-xs "} />
      <span className="text-xs mt-2 font-outfit  "> {title} </span>
      <div
        className={` ${
          isClicked && !underline ? "absolute group-hover:!flex  " : "hidden"
        }  ${
          underline ? "group-hover:flex" : "group-hover:hidden"
        } w-2  bottom-1 absolute group-hover:flex h-1  rounded-sm bg-primary shadow-[0_4px_16px_rgba(120,119,198,0.4)] `}
      ></div>
    </div>
  );
};

export default VideoButton;
