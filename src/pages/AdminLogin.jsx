import { useContext, useState } from "react";
import { LuEye, LuEyeOff, LuMail, LuLock, LuArrowRight } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import toast from "react-hot-toast";
import loginBg from "../assets/login.avif";
import favicon from "../assets/logo/favicon.png";
import logo from "../assets/logo/logo-1.png";

const AdminLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const from = location.state?.from?.pathname || "/";

  // handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      return toast.error("Email & Password is required!");
    }

    const payload = {
      email,
      password,
    };

    try {
      const res = await fetch("https://api.talukderhomes.com.au/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data?.status === true) {
        toast.success("Login successful!");
        setUser(data?.data);
        localStorage.setItem("accessToken", JSON.stringify(data?.data));
        // navigate based on role
        if (data?.data?.role === "admin") {
          navigate("/admin");
        } else {
          navigate(from, { replace: true });
        }
      } else {
        toast.error("Email & Password should be valid!");
      }
    } catch (err) {
      console.error("login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-12">
            <Link
              to="/"
              className="inline-flex items-center justify-center size-20"
            >
              <img
                src={favicon}
                alt="Talukdar Homes Logo"
                className="w-full h-full object-contain"
              />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
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
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your email"
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
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
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

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-orange-500 hover:text-orange-600 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <LuArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-orange-500 hover:text-orange-600 font-semibold"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Hero Section */}
      <div className="hidden lg:flex flex-1 bg-gray-900 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{
            backgroundImage: `url('${loginBg}')`,
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
              Supplying What <br />
              <span className="text-orange-400">Builders Trust</span>
            </h2>
            <p className="text-base text-white/90 mb-8 leading-relaxed">
              From premium timber and structural materials to tools, doors, and
              fasteners. We stock everything your project demands. Reliable
              supply for tradies, contractors and serious DIYers.
            </p>

            <div className="grid grid-cols-1 gap-4 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0"></div>
                <span className="text-white/90">
                  Timber, decking & flooring
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0"></div>
                <span className="text-white/90">
                  Cladding, sheeting & doors
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0"></div>
                <span className="text-white/90">
                  Hardware, tools & adhesives
                </span>
              </div>
            </div>

            <p className="text-sm text-white/70 mt-4">
              ...and everything else you need - from insulation to safety gear.
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-orange-400 rounded-full opacity-20"></div>
        <div className="absolute bottom-32 left-16 w-16 h-16 bg-orange-400 rounded-lg opacity-20 transform rotate-45"></div>
        <div className="absolute top-1/2 right-8 w-8 h-8 bg-white rounded-full opacity-10"></div>
      </div>
    </div>
  );
};

export default AdminLogin;
