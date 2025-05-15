import { Button, IconButton, Input, Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: decodeURIComponent(searchParams.get("email") || ""),
    token: decodeURIComponent(searchParams.get("token") || ""),
    password: "",
    password_confirmation: "",
  });

  const email = decodeURIComponent(searchParams.get("email") || "");
  const token = decodeURIComponent(searchParams.get("token") || "");

  // check token and email is present in url or not
  useEffect(() => {
    if (!email.trim() || !token.trim()) {
      navigate("/login");
    }
  }, [email, token, navigate]);

  // disable form submit button
  const isDisabled =
    formData.email.trim("") === "" ||
    formData.token.trim("") === "" ||
    formData.password.trim("") === "" ||
    formData.password_confirmation.trim("") === "" ||
    formData.password !== formData.password_confirmation;

  // handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isDisabled) {
      setLoading(false);
      toast.error("Please fill up all information!");
    }

    try {
      const res = await fetch(
        "https://api.talukderhomes.com.au/api/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      const data = await res.json();

      if (data?.status === true) {
        setLoading(false);
        toast.success(data.msg);
      } else {
        setLoading(false);
        toast.error(data.msg);
      }

      navigate("/login");
    } catch (error) {
      setLoading(false);
      console.error("forgot-password-error", error);
      toast.error("Something unexpected happend!");
      navigate("/login");
    }
  };

  return (
    <section className="flex min-h-screen flex-col justify-center bg-gray-50 px-5 py-12">
      {/* Back button in top-left corner */}
      <div className="absolute left-4 top-4">
        <Link
          to="/login"
          className="flex items-center font-medium text-orange-600 hover:text-orange-800"
        >
          <FaArrowLeft className="mr-2" />
          Back to Login
        </Link>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <div>
            <h2 className="text-center text-xl font-semibold md:text-2xl">
              Reset Your Password
            </h2>
            <p className="mt-2 text-center text-xs text-gray-600">
              Resetting password for <strong>{formData.email}</strong>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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
              className="w-full bg-primary text-white hover:bg-primary-hover"
            >
              {loading ? (
                <Spinner className="mx-auto size-4" />
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
