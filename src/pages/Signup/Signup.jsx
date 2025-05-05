import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Providers/AuthProvider";

export default function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
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
        setUser(data?.data);
        localStorage.setItem("accessToken", JSON.stringify(data?.data));
        navigate(from, { replace: true });
      } else {
        toast.error("Email & Password should be valid!");
      }
    } catch (err) {
      console.error("regitration error:", err);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-200">
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
          <Input
            label="Password"
            name="password"
            type="password"
            required
            value={formData.password}
            placeholder="Enter password"
            onChange={handleInputChange}
          />
          <Input
            label="Confirm Password"
            name="password_confirmation"
            type="password"
            required
            value={formData.password_confirmation}
            placeholder="Enter confirm password"
            onChange={handleInputChange}
          />

          <Button type="submit" disabled={isDisabled} className="bg-primary">
            Signup
          </Button>
        </div>

        <p className="mt-5 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline text-primary">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}
