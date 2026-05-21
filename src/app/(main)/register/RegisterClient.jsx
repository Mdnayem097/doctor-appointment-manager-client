"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const router = useRouter();

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasLength = value.length >= 6;

    if (!hasUpper || !hasLower || !hasLength) {
      setError("Password must contain uppercase, lowercase and 6+ characters");
      setIsValid(false);
    } else {
      setError("");
      setIsValid(true);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const image = e.target.image.value;

    const { data } = await authClient.signUp.email({
      name,
      email,
      password,
      image: image || "",
    });

    if (data) {
      toast.success("Register Success");
      router.push("/");
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-5">

      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl my-10">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#004A99]">
            Create Account
          </h1>
          <p className="text-gray-500 mt-2">
            Join DocAppoint and book doctors easily
          </p>
        </div>

        <form className="space-y-5" onSubmit={onSubmit}>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#004A99] transition"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#004A99] transition"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                className={`w-full border rounded-xl px-4 py-3 pr-12 outline-none transition
                ${error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-[#004A99]"}
                ${isValid ? "border-green-500" : ""}`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}

            {!error && password && (
              <p className="text-green-600 text-sm mt-2">
                Strong password
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Image URL
            </label>

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#004A99] transition"
            />
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`cursor-pointer w-full py-3 rounded-xl font-semibold transition duration-300 text-white
            ${isValid ? "bg-[#009966] hover:bg-[#007755]" : "bg-gray-400 cursor-not-allowed"}`}
          >
            Register
          </button>

        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-[1px] bg-gray-300"></div>
          <p className="text-sm text-gray-400">OR</p>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="w-full border border-gray-300 py-3 rounded-xl flex items-center justify-center gap-3 font-medium hover:border-[#009966] transition cursor-pointer"
        >
          <FcGoogle className="text-2xl" />
          Continue with Google
        </button>

        <p className="text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[#004A99] font-semibold hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default RegisterForm;