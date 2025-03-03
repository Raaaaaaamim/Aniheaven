import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { BiUser } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import img1 from "../../assets/textLogo.svg";
import { authAtom, userAtom } from "../../store/index.js";
import MainButton from "../ui/MainButton.jsx";

const Signup = () => {
  const navigate = useNavigate();
  const setAuthState = useSetRecoilState(authAtom);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    name: "",
    profilePicture: null,
  });
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const setUserAtom = useSetRecoilState(userAtom);
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validateUsername = (username) => {
    return username.length >= 3 && username.length <= 20;
  };

  const validateName = (name) => {
    return name.length >= 2 && name.length <= 50;
  };

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file", {
          icon: "🖼️",
          style: { background: "#333", color: "#fff" },
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilePicture: reader.result,
        }));
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!validateUsername(formData.username)) {
      newErrors.username = "Username must be between 3 and 20 characters";
    }

    if (!validateName(formData.name)) {
      newErrors.name = "Name must be between 2 and 50 characters";
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
      return;
    }

    if (!formData.profilePicture) {
      toast.error("Please select a profile picture", {
        icon: "📸",
        style: { background: "#333", color: "#fff" },
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`/user/signup`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.data) {
        toast.success("Welcome to Aniheaven! 🎉", {
          style: { background: "#333", color: "#fff" },
          duration: 3000,
        });
        localStorage.setItem("user", JSON.stringify(response.data.user));

        setUserAtom(response.data.user);
        navigate("/home");
        setAuthState("login");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage, {
        icon: "❌",
        style: { background: "#333", color: "#fff" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-outfit banner2 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]"></div>
      <div className="z-50 w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Link to="/home" className="block w-fit">
            <img className="w-40 xl:w-44 2xl:w-48" src={img1} alt="logo" />
          </Link>
        </div>

        <div className="rounded-2xl border border-zinc-800/50 bg-[#121212] p-8 shadow-2xl backdrop-blur-xl">
          <div>
            <h2 className="mt-2 text-center text-3xl font-bold text-white">
              {step === 1 ? "Create your account" : "Choose your avatar"}
            </h2>
            <p className="mt-2 text-center text-sm text-zinc-400">
              {step === 1 ? (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setAuthState("login")}
                    className="font-medium text-violet-400 transition-colors hover:text-violet-300"
                  >
                    Sign in
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setStep(1)}
                  className="font-medium text-violet-400 transition-colors hover:text-violet-300"
                >
                  ← Back to details
                </button>
              )}
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {step === 1 ? (
              <div className="space-y-4">
                <div>
                  <div className="group relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <BiUser className="h-5 w-5 text-zinc-500 transition-colors group-hover:text-violet-400" />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      className="block w-full appearance-none rounded-xl border border-zinc-800 bg-[#1a1a1a] py-3 pr-4 pl-11 text-white placeholder-zinc-500 transition-all hover:border-zinc-700 focus:border-transparent focus:ring-2 focus:ring-violet-500/50 focus:outline-none sm:text-sm"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors.username && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.username}
                    </p>
                  )}
                </div>
                <div>
                  <div className="group relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <FaRegUser className="h-5 w-5 text-zinc-500 transition-colors group-hover:text-violet-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="block w-full appearance-none rounded-xl border border-zinc-800 bg-[#1a1a1a] py-3 pr-4 pl-11 text-white placeholder-zinc-500 transition-all hover:border-zinc-700 focus:border-transparent focus:ring-2 focus:ring-violet-500/50 focus:outline-none sm:text-sm"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                  )}
                </div>
                <div>
                  <div className="group relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <HiOutlineMail className="h-5 w-5 text-zinc-500 transition-colors group-hover:text-violet-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="block w-full appearance-none rounded-xl border border-zinc-800 bg-[#1a1a1a] py-3 pr-4 pl-11 text-white placeholder-zinc-500 transition-all hover:border-zinc-700 focus:border-transparent focus:ring-2 focus:ring-violet-500/50 focus:outline-none sm:text-sm"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
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
                    <p className="mt-1 text-xs text-red-400">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                  {previewUrl ? (
                    <div className="group relative">
                      <img
                        src={previewUrl}
                        alt="Profile preview"
                        className="h-40 w-40 rounded-2xl object-cover ring-2 ring-violet-500/50"
                      />
                      <div
                        onClick={() =>
                          document.getElementById("profilePicture").click()
                        }
                        className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-2xl bg-black/60 opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100"
                      >
                        <span className="text-sm text-white/90">
                          Change Photo
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() =>
                        document.getElementById("profilePicture").click()
                      }
                      className="group flex h-40 w-40 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-zinc-700 bg-[#1a1a1a] transition-all hover:border-violet-500/50 hover:bg-[#1f1f1f]"
                    >
                      <div className="text-center">
                        <BiUser className="mx-auto h-8 w-8 text-zinc-500 transition-colors group-hover:text-violet-400" />
                        <span className="mt-2 block px-4 text-sm text-zinc-500 transition-colors group-hover:text-zinc-400">
                          Click to upload profile photo
                        </span>
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    id="profilePicture"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>
            )}

            <div>
              <MainButton
                size="lg"
                title={step === 1 ? "Continue" : "Sign Up"}
                loading={loading}
                loadingText="Signing up..."
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
