import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";
import { AuthContext } from "../Providers/AuthProvider";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const loginEmail = "admin@talukdarhomes.com.au";
  const loginPassword = "@talukdarhomes2024";

  // handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      window.alert("Both fields are required");
      return;
    }

    const payload = {
      email,
      password,
    };

    if (email === loginEmail && password === loginPassword) {
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
        setUser(data?.data);
        localStorage.setItem("accessToken", JSON.stringify(data?.data));
        navigate("/");
      } else {
        window.alert("Email & Password should be valid!");
      }
    } catch (err) {
      console.error("login error:", err);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-200">
      <form
        onSubmit={handleLogin}
        className="w-3/4 rounded bg-white p-5 shadow md:w-1/2 lg:w-1/3"
      >
        <h5 className="text-center text-xl font-semibold md:text-3xl">Login</h5>
        <h5 className="mt-2 text-center text-sm font-semibold text-gray-600">
          Please use given email and password
        </h5>
        <div className="mt-5 flex flex-col gap-2.5">
          <Input type="email" name="email" label="Enter Email" />
          <Input type="password" name="password" label="Enter Password" />
          <Button type="submit" className="bg-primary">
            Login
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AdminLogin;
