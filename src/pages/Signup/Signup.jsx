import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, IconButton, Input, Spinner } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Providers/AuthProvider";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import login from "../../assets/login.jpg";

export default function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const from = location.state?.from?.pathname || "/";

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
        setUser(data?.data);
        localStorage.setItem("accessToken", JSON.stringify(data?.data));
        navigate(from, { replace: true });
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
    <section
      style={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url(${login}) center/cover`,
      }}
      className="flex min-h-screen items-center justify-center bg-gray-200"
    >
      <form
        onSubmit={handleSubmit}
        className="w-3/4 rounded bg-white p-5 shadow md:w-1/2 lg:w-1/3"
      >
        <h5 className="text-center text-xl font-semibold md:text-3xl">
          Signup
        </h5>
        <p className="mt-2 text-center text-sm font-semibold text-gray-600">
          Please fill in the details below to create an account
        </p>
        {/* name */}
        <div className="mt-5 flex flex-col gap-2.5">
          <Input
            label="Name"
            name="name"
            type="text"
            required
            value={formData.name}
            placeholder="Enter name"
            onChange={handleInputChange}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            required
            value={formData.email}
            placeholder="Enter email address"
            onChange={handleInputChange}
          />
          <div className="relative">
            <Input
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              placeholder="Enter password"
              onChange={handleInputChange}
              className="pr-11"
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
          <div className="relative">
            <Input
              label="Confirm Password"
              name="password_confirmation"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password_confirmation}
              placeholder="Enter confirm password"
              onChange={handleInputChange}
              className="pr-11"
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
            disabled={isDisabled || loading}
            className="bg-primary"
          >
            {loading ? <Spinner className="mx-auto h-4 w-4" /> : "Signup"}
          </Button>
        </div>

        <p className="mt-5 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary underline">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}
