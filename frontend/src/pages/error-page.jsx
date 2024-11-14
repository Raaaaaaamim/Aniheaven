import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { Link, useRouteError } from "react-router-dom";
import catSleep from "../assets/cat-sleep.json";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex items-center font-poppins justify-center min-h-screen bg-background text-text">
      <motion.div className="flex flex-col items-center justify-center gap-1">
        <div className="w-48 h-48">
          <Lottie animationData={catSleep} loop={true} />
        </div>
        <h4>Something went wrong</h4>
        <h5 className=" font-bold ">{error.statusText || error.message}</h5>
        <Link
          to={"/"}
          className="  rounded-full py-2 px-5 mt-4 active:scale-95 ease-in duration-100 text-background bg-primary font-bold text-sm btn-primary"
        >
          Go Back
        </Link>
      </motion.div>
    </div>
  );
}
