import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { api } from "../../config.js";
import { userAtom } from "../../store/index.js";
import Button from "../ui/Button.jsx";

const LogoutButton = ({ setOpen }) => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userAtom);
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    setOpen(false);
    if (isLoading) {
      toast.error("Please wait...", {
        style: { background: "#333", color: "#fff" },
      });
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.get(`${api}/user/logout`);
      if (res.data.success) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.success(" 👀 Logged out successfully", {
          style: { background: "#333", color: "#fff" },
        });

        setUser(null);
        navigate("/auth");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <button className="w-full" disabled={isLoading} onClick={handleLogout}>
      <Button Icon={MdLogout}>{user ? "Logout" : "Login"}</Button>
    </button>
  );
};

export default LogoutButton;
