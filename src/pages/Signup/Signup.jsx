import { useState } from "react";
import toast from "react-hot-toast";
import {
  LuEye,
  LuEyeOff,
  LuUser,
  LuMail,
  LuLock,
  LuUserPlus,
} from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import signupImg from "../../assets/signup.avif";
import favicon from "../../assets/logo/favicon.png";
import logo from "../../assets/logo/logo-1.png";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const isDisabled =
    !formData.name.trim("") ||
    !formData.email.trim("") ||
    !formData.password.trim("") ||
    !formData.password_confirmation.trim("") ||
    formData.password !== formData.password_confirmation;

  //  handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://api.talukderhomes.com.au/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data?.status === true) {
        toast.success("Signup successful!");
        navigate("/login");
      } else {
        toast.error("Email & Password should be valid!");
      }
    } catch (err) {
      toast.error("Signup error!");
      console.error("regitration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Hero Section */}
      <div className="hidden lg:flex flex-1 bg-gray-900 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{
            backgroundImage: `url('${signupImg}')`,
          }}
        ></div>

        {/* Glassmorphism Layer */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"></div>

        {/* Content */}
        <div className="relative z-10 flex w-full flex-col justify-center items-start text-left px-16 py-20 text-white">
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 max-w-lg border border-white/10 shadow-lg">
            <img
              src={logo}
              alt="Talukdar Homes Logo"
              className="w-36 object-contain"
            />
            <h2 className="mt-4 text-4xl font-bold leading-snug mb-2 tracking-tight">
              Join <br />
              <span className="text-orange-400">Talukdar Homes</span>
            </h2>
            <p className="text-base text-white/90 mb-8 leading-relaxed">
              Create your account to start ordering building materials online
              and manage your purchases with ease.
            </p>

            <div className="grid grid-cols-1 gap-4 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-white/90">Place and track orders</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-white/90">Save delivery details</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-white/90">View order history</span>
              </div>
            </div>

            <p className="text-sm text-white/70 mt-4">
              Signing up is quick and easy - no payment required until checkout.
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-orange-400 rounded-full opacity-20"></div>
        <div className="absolute bottom-32 left-16 w-16 h-16 bg-orange-400 rounded-lg opacity-20 transform rotate-45"></div>
        <div className="absolute top-1/2 right-8 w-8 h-8 bg-white rounded-full opacity-10"></div>
      </div>

      {/* Right Panel - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-12">
            <Link
              to="/"
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
            >
              <img
                src={favicon}
                alt="Talukdar Homes Logo"
                className="w-full h-full object-contain"
              />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-500">
              Please fill in the details below to create an account
            </p>
          </div>

          {/* Signup Form */}
          <div className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LuUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl  focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LuMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl  focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LuLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl  focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <LuEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <LuEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LuLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl  focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <LuEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <LuEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Password Match Indicator */}
            {formData.password && formData.password_confirmation && (
              <div className="text-sm">
                {formData.password === formData.password_confirmation ? (
                  <span className="text-green-600 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Passwords match
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    Passwords don&apos;t match
                  </span>
                )}
              </div>
            )}

            {/* Signup Button */}
            <button
              type="submit"
              disabled={isDisabled || loading}
              onClick={handleSubmit}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <LuUserPlus className="w-4 h-4" />
                  <span>Create My Account</span>
                </>
              )}
            </button>
          </div>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-orange-500 hover:text-orange-600 font-semibold"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
