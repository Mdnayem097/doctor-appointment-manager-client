"use client";

import { authClient } from "@/lib/auth-client";
import { Alata } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()
  const onSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const image = e.target.image.value;

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image,
    });

    if (data) {
      alert("Register Success");
      router.push('/')
    } else {
      alert("Register Fail");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-5">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#004A99]">Create Account</h1>

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
              placeholder="Enter your full name"
              name="name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#004A99] transition"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              name="email"
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
                name="password"
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

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Image URL
            </label>

            <input
              type="text"
              placeholder="Image URL"
              name="image"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#004A99] transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#009966] hover:bg-[#007755] text-white py-3 rounded-xl font-semibold transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#004A99] font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
