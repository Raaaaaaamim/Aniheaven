import { CiSearch } from "react-icons/ci";
import { GrNotification } from "react-icons/gr";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { TbMessageCircleHeart } from "react-icons/tb";
import Modal from "../../../components/ui/SearchModal.jsx";
const Navbar = () => {
  return (
    <nav className=" flex h-20 ml-0 w-[100%] font-poppins justify-center items-center lg:w-[81.5%]  lg:ml-[18%]   ">
      <div className=" w-full  flex gap-5  items-center justify-between ">
        <div className=" ml-6 flex justify-center gap-11 items-center  ">
          <div className="   hidden icon lg:flex justify-center items-center gap-6 ">
            <MdOutlineArrowBackIos className="    hover:text-text cursor-pointer text-grayText " />
            <MdOutlineArrowForwardIos className=" hover:text-text cursor-pointer text-grayText " />
          </div>
          <div
            onClick={() => document.getElementById("my_modal_1").showModal()}
            className=" overflow-hidden md:flex ml-12 gap-1 z-40 bg-background justify-start hidden  items-center  h-10 lg:w-72 md:w-64 w-60 rounded-xl flex-col border-border border-[1px]  "
          >
            <div className=" font-outfit  flex justify-center items-center gap-1 w-[90%] h-full ">
              <CiSearch className="   text-grayText lg:text-[20px] text-[18px]  " />
              <input
                className="  w-[80%] bg-transparent text-xs text-grayText outline-none placeholder:text-grayText placeholder:font-semibold h-full "
                type="text"
                placeholder=" Search everything "
                name=""
                id=""
              />
            </div>
          </div>
          <Modal id="my_modal_1" />
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
