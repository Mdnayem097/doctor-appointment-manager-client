"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavBar = () => {
  const pathname = usePathname();
  return (
    <div className="max-lg:collapse w-10/12 m-auto">
      <input id="navbar-1-toggle" className="peer hidden" type="checkbox" />
      <label
        htmlFor="navbar-1-toggle"
        className="fixed inset-0 hidden max-lg:peer-checked:block"
      ></label>
      <div className="collapse-title navbar">
        <div className="navbar-start">
          <label htmlFor="navbar-1-toggle" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              width={150}
              height={50}
              alt="logo"
              className="cursor-pointer"
            ></Image>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-5 font-semibold">
            <li>
              <Link
                href="/"
                className={pathname === "/" ? "text-[#004A99] font-bold" : ""}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/all-appointment"
                className={
                  pathname === "/all-appointment"
                    ? "text-[#004A99] font-bold"
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
                  pathname === "/dashboard" ? "text-[#004A99] font-bold" : ""
                }
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end gap-5 font-semibold">
          <Link href={"/login"}  className="py-2 px-4 rounded-full hover:bg-[#004A99] hover:text-white transition duration-700 delay-150">Login</Link>
          <Link
            href={"/register"}
            className="border-2 border-[#004A99] py-2 px-4 rounded-full hover:bg-[#004A99] hover:text-white transition duration-700 delay-150"
          >
            Register
          </Link>
        </div>
      </div>

      <div className="collapse-content lg:hidden z-1">
        <ul className="menu font-semibold">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/all-Appointment"}>All Appointment</Link>
          </li>
          <li>
            <Link href={"/dashboard"}>Dashboard</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
