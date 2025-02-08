import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { BiUser } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import img1 from "../../assets/textLogo.svg";
import { api } from "../../config.js";
import { authAtom } from "../../store/atoms/authAtom";
import { userAtom } from "../../store/index.js";
import MainButton from "../ui/MainButton.jsx";

const Login = () => {
  const navigate = useNavigate();
  const setAuthState = useSetRecoilState(authAtom);
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const setUserAtom = useSetRecoilState(userAtom);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.emailOrUsername) {
      newErrors.emailOrUsername = "Email or username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${api}/user/login`,
        {
          email: formData.emailOrUsername,
          password: formData.password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (response.data) {
        console.log("Login response:", response.data);
        toast.success("Welcome back! 🎉", {
          style: { background: "#333", color: "#fff" },
          duration: 4000,
        });

        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUserAtom(response.data.user || null);

        navigate("/home"); // Redirect to home page after login
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Invalid credentials";
      toast.error(errorMessage, {
        icon: "❌",
        style: { background: "#333", color: "#fff" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-outfit banner2 relative flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]"></div>
      <div className="relative z-40 w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Link to="/home" className="block w-fit">
            <img className="w-40 xl:w-44 2xl:w-48" src={img1} alt="logo" />
          </Link>
        </div>

        <div className="rounded-2xl border border-zinc-800/50 bg-[#121212] p-8 shadow-2xl backdrop-blur-xl">
          <div>
            <h2 className="mt-2 text-center text-3xl font-bold text-white">
              Welcome back
            </h2>
            <p className="mt-2 text-center text-sm text-zinc-400">
              Don't have an account?{" "}
              <button
                onClick={() => setAuthState("signup")}
                className="font-medium text-violet-400 transition-colors hover:text-violet-300"
              >
                Sign up
              </button>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <div className="group relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <BiUser className="h-5 w-5 text-zinc-500 transition-colors group-hover:text-violet-400" />
                  </div>
                  <input
                    id="emailOrUsername"
                    name="emailOrUsername"
                    type="text"
                    required
                    className="block w-full appearance-none rounded-xl border border-zinc-800 bg-[#1a1a1a] py-3 pr-4 pl-11 text-white placeholder-zinc-500 transition-all hover:border-zinc-700 focus:border-transparent focus:ring-2 focus:ring-violet-500/50 focus:outline-none sm:text-sm"
                    placeholder="Email or username"
                    value={formData.emailOrUsername}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.emailOrUsername && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.emailOrUsername}
                  </p>
                )}
              </div>
              <div>
                <div className="group relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <RiLockPasswordLine className="h-5 w-5 text-zinc-500 transition-colors group-hover:text-violet-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full appearance-none rounded-xl border border-zinc-800 bg-[#1a1a1a] py-3 pr-4 pl-11 text-white placeholder-zinc-500 transition-all hover:border-zinc-700 focus:border-transparent focus:ring-2 focus:ring-violet-500/50 focus:outline-none sm:text-sm"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-400">{errors.password}</p>
                )}
              </div>
            </div>

            <div>
              <MainButton
                size="lg"
                title={"Sign in"}
                loading={loading}
                loadingText="Signing in..."
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
