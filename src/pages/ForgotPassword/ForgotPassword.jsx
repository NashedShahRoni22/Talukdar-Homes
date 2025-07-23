import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Spinner } from "@material-tailwind/react";
import { FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isDisabled = email.trim("") === "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isDisabled) {
      setLoading(false);
      toast.error("Email is required!");
    }

    try {
      const res = await fetch(
        "https://api.talukderhomes.com.au/api/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();

      console.log(data);

      if (data?.status === true) {
        setLoading(false);
        toast.success(data?.msg);
        setSuccessMessage(data?.msg);
      }
    } catch (error) {
      setLoading(false);
      console.error("forgot-password-error", error);
    }

    e.target.reset();
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
              Forgot your password?
            </h2>
            <p className="mt-2 text-center text-xs text-gray-600">
              Enter your email and we&apos;ll send you a link to reset your
              password
            </p>
          </div>

          {successMessage && (
            <p className="text-sm text-center mt-2 font-semibold text-green-500">
              {successMessage}
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <Input
              onChange={(e) => setEmail(e.target.value)}
              label="Enter Email"
              name="email"
              type="email"
              required
              placeholder="Email address"
            />

            <Button
              type="submit"
              disabled={isDisabled || loading}
              className="w-full bg-primary text-white hover:bg-primary-hover"
            >
              {loading ? (
                <Spinner className="mx-auto size-4" />
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
