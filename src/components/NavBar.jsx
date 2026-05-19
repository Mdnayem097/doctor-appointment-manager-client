"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FiLogOut } from "react-icons/fi";

const NavBar = () => {
  const pathname = usePathname();
  const userData = authClient.useSession();
  const user = userData.data?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div className="w-full max-lg:collapse lg:px-10 lg:m-auto border-b border-gray-200 bg-white">
      <input id="navbar-1-toggle" className="peer hidden" type="checkbox" />

      <label
        htmlFor="navbar-1-toggle"
        className="fixed inset-0 hidden max-lg:peer-checked:block"
      ></label>

      <div className="collapse-title navbar py-2 min-h-0">
        <div className="navbar-start">
          <label htmlFor="navbar-1-toggle" className="btn btn-ghost lg:hidden">
            ☰
          </label>

          <Link href="/">
            <Image
              src="/logo.png"
              width={120}
              height={40}
              alt="logo"
              className="cursor-pointer"
            />
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-6 font-semibold">
            <li>
              <Link
                href="/"
                className={pathname === "/" ? "text-[#009966] font-bold" : ""}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/all-appointment"
                className={
                  pathname === "/all-appointment"
                    ? "text-[#009966] font-bold"
                    : ""
                }
              >
                All Appointment
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard"
                className={
                  pathname === "/dashboard" ? "text-[#009966] font-bold" : ""
                }
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          {!user && (
            <div className="flex gap-3">
              <Link
                href="/login"
                className="px-5 py-2 rounded-full hover:bg-[#004A99] hover:text-white transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="border border-[#004A99] px-5 py-2 rounded-full hover:bg-[#004A99] hover:text-white transition"
              >
                Register
              </Link>
            </div>
          )}

          {user && (
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 relative rounded-full overflow-hidden">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt="profile"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#004A99] text-white flex items-center justify-center font-semibold">
                    {user?.name?.charAt(0)}
                  </div>
                )}
              </div>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 border border-red-500 px-4 py-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition"
              >
                <FiLogOut />Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="collapse-content lg:hidden">
        <ul className="menu font-semibold space-y-2">
          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <Link href="/all-appointment">All Appointment</Link>
          </li>

          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
