import { Button, Input } from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const loginEmail = "admin@talukdarhomes.com.au";
  const loginPassword = "@talukdarhomes2024";
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    if (email === loginEmail && password === loginPassword) {
      localStorage.setItem("thAccessToken", "@talukdarhomes2024");
      navigate("/admin");
    } else {
      window.alert("Enter valid email & password");
    }
  };
  return (
    <section className="min-h-screen flex justify-center items-center bg-gray-200">
      <form
        onSubmit={handleLogin}
        className="w-3/4 md:w-1/2 lg:w-1/3 p-5 shadow rounded bg-white"
      >
        <h5 className="font-semibold text-xl md:text-3xl text-center">Login</h5>
        <h5 className="font-semibold text-sm text-gray-600 mt-2 text-center">
          Please use given email and password
        </h5>
        <div className="flex flex-col gap-2.5 mt-5">
          <Input type="email" name="email" label="Enter Email" />
          <Input type="password" name="password" label="Enter Password" />
          <Button type="submit" className="bg-primary">Login</Button>
        </div>
      </form>
    </section>
  );
};

export default AdminLogin;
