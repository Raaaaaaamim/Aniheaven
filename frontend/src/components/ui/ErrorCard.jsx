import Lottie from "lottie-react";
import catSleep from "../../assets/cat-sleep.json";

const ErrorCard = ({ error }) => {
  return (
    <div className="text-text font-outfit w-fit h-fit flex justify-center items-center bg-secondaryBg">
      <div className="flex flex-col gap-3 items-center backdrop-blur-sm bg-white/[0.02] p-8 rounded-3xl border border-white/[0.05] ">
        <div className="w-32 h-32">
          <Lottie animationData={catSleep} loop={true} />
        </div>
        <h1 className="text-[1rem] font-semibold bg-gradient-to-r from-primary/90 via-primary to-primary/90 line-clamp-1   bg-clip-text text-transparent">
          {error || "Something went wrong"}
        </h1>
      </div>
    </div>
  );
};

export default ErrorCard;
