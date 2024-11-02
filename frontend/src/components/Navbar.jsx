import { motion } from "framer-motion";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GrNotification } from "react-icons/gr";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { TbMessageCircleHeart } from "react-icons/tb";
const Navbar = () => {
  const [focused, setFocused] = useState(false);
  return (
    <nav className=" flex h-20 ml-0 w-[100%] font-poppins justify-center items-center lg:w-[81.5%]  lg:ml-[18%]   ">
      <div className=" w-full  flex gap-5  items-center justify-between ">
        <div className=" ml-6 flex justify-center gap-11 items-center  ">
          <div className="   hidden icon lg:flex justify-center items-center gap-6 ">
            <MdOutlineArrowBackIos className="    hover:text-text cursor-pointer text-grayText " />
            <MdOutlineArrowForwardIos className=" hover:text-text cursor-pointer text-grayText " />
          </div>
          <motion.div
            animate={{
              height: focused ? 400 : 40,
              position: "relative",
              transformOrigin: "top",
              top: focused ? "180px" : 0,
            }}
            onMouseLeave={() => setFocused(false)}
            className=" overflow-hidden md:flex ml-12 gap-1 z-40 bg-background justify-start hidden  items-center  h-10 lg:w-72 md:w-64 w-60 rounded-2xl flex-col border-border border-[1px]  "
          >
            <motion.div
              animate={{
                height: focused ? 30 : "100%",
                marginTop: focused ? "14px" : "0px",
              }}
              className="   flex justify-center items-center gap-1 w-[90%] h-full "
            >
              <CiSearch className="   text-grayText lg:text-[20px] text-[18px]  " />
              <motion.input
                transition={{ duration: 0.3 }}
                onFocus={() => setFocused(true)}
                onClick={() => setFocused(true)}
                className=" w-[80%] bg-transparent text-xs text-grayText outline-none placeholder:text-grayText placeholder:font-bold h-full "
                type="text"
                placeholder=" Search everything "
                name=""
                id=""
              />
            </motion.div>
          </motion.div>
        </div>
        <div className="  mr-6   flex justify-center items-center gap-5  ">
          <GrNotification size={19} className=" " />
          <TbMessageCircleHeart size={20} />
          <div className="avatar">
            <div className="w-8 rounded-full  ">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
