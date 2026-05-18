"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-5">

      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#004A99]">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Login to your DocAppoint account
          </p>
        </div>

        <form className="space-y-5">

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
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
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 outline-none focus:border-[#004A99] transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>
          </div>

          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-[#009966] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-[#004A99] hover:bg-[#00397a] text-white py-3 rounded-xl font-semibold transition duration-300"
          >
            Login
          </button>

        </form>

        <p className="text-center text-gray-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-[#009966] font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LoginForm;