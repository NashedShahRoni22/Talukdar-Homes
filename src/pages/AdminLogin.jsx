import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, IconButton, Input, Spinner } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { AuthContext } from "../Providers/AuthProvider";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import loginImg from "../assets/login.jpg";

const loginEmail = "admin@talukdarhomes.com.au";
const loginPassword = "@talukdarhomes2024";

const AdminLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

    if (email === loginEmail && password === loginPassword) {
      setLoading(false);
      setUser({ name: "Admin", email: loginEmail }); // TODO: Mock admin name and email data saved in user context
      toast.success("Login successful!");
      localStorage.setItem("thAccessToken", "@talukdarhomes2024");
      navigate("/admin");
      return;
    }

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
        navigate(from, { replace: true });
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
    <section className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="w-[70%] rounded-md border p-6 lg:py-14"
        >
          <h5 className="text-center text-xl font-semibold md:text-3xl">
            Login
          </h5>
          <h5 className="mt-2 text-center text-sm font-semibold text-gray-600">
            Please use given email and password
          </h5>
          <div className="mt-4 flex flex-col gap-4">
            <Input type="email" name="email" label="Enter Email" />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                label="Enter Password"
                className="pr-10"
              />
              <IconButton
                variant="text"
                size="sm"
                className="!absolute right-2 top-2/4 -translate-y-2/4"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <BsEyeSlash className="h-5 w-5 text-gray-500" />
                ) : (
                  <BsEye className="h-5 w-5 text-gray-500" />
                )}
              </IconButton>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="mt-4 bg-primary"
            >
              {loading ? <Spinner className="mx-auto h-4 w-4" /> : "Login"}
            </Button>
          </div>

          <p className="mt-5 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-primary underline">
              Signup
            </Link>
          </p>
        </form>
      </div>

      {/* Right Side - Image */}
      <div className="relative hidden md:block">
        <img
          src={loginImg}
          alt="Construction materials"
          className="h-screen w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/35 p-6">
          <h2 className="text-center text-6xl font-bold text-white drop-shadow-lg">
            <span className="block">Built for Builders</span>
            <span className="mt-4 block text-2xl italic">
              Quality Materials. Every Order.
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
