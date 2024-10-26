import { CiSearch } from "react-icons/ci";
import { GrNotification } from "react-icons/gr";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { TbMessageCircleHeart } from "react-icons/tb";

const Navbar = () => {
  return (
    <nav className=" flex h-20 ml-0 w-[100%] font-poppins justify-center items-center lg:w-[81.5%]  lg:ml-[18%]   ">
      <div className=" w-full  flex gap-5  items-center justify-between ">
        <div className=" ml-6 flex justify-center gap-11 items-center  ">
          <div className=" md:flex hidden icon lg:flex justify-center items-center gap-6 ">
            <MdOutlineArrowBackIos className="    hover:text-text cursor-pointer text-grayText " />
            <MdOutlineArrowForwardIos className=" hover:text-text cursor-pointer text-grayText " />
          </div>
          <div className=" flex  gap-0  justify-center  items-center  h-10 lg:w-72 md:w-64 w-44 rounded-2xl border-border border-[1px]  ">
            <CiSearch className="   text-grayText lg:text-[20px] text-[18px]  " />
            <input
              className=" w-[80%] bg-transparent text-xs text-grayText outline-none placeholder:text-grayText placeholder:font-bold h-full "
              type="text"
              placeholder=" Search everything "
              name=""
              id=""
            />
            <HiOutlineAdjustmentsHorizontal
              size={20}
              className=" cursor-pointer hidden md:flex lg:flex text-grayText "
            />
          </div>
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
