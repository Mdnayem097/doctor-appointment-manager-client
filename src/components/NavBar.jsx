"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "All Appointment", href: "/all-appointment" },
  { label: "Dashboard", href: "/dashboard" },
];

const NAVBAR_HEIGHT = 72;
const BANNER_MIN_HEIGHT = 600;

const NavBar = () => {
  const pathname = usePathname();
  const { data } = authClient.useSession();
  const user = data?.user;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  const hasBackground = scrolled || !isHome || isOpen;

  useEffect(() => {
    const handleScroll = () => {
      const bannerHeight = Math.max(window.innerHeight * 0.9, BANNER_MIN_HEIGHT);
      setScrolled(window.scrollY > bannerHeight - NAVBAR_HEIGHT);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.reload();
  };

  const authActions = user ? (
    <>
      <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/20">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name ?? "Profile"}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#004A99] font-semibold">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <button
        onClick={handleSignOut}
        className="flex items-center gap-2 rounded-full border border-red-500/60 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500 hover:text-white"
      >
        <FiLogOut />
        Logout
      </button>
    </>
  ) : (
    <>
      <Link
        href="/login"
        className="rounded-full px-5 py-2 text-sm font-medium text-white/80 transition hover:text-white"
      >
        Login
      </Link>
      <Link
        href="/register"
        className="rounded-full bg-gradient-to-r from-[#004A99] to-[#009966] px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-[#004A99]/30 transition hover:scale-105"
      >
        Register
      </Link>
    </>
  );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 w-full text-white transition-all duration-300 ${
          hasBackground
            ? "bg-gradient-to-b from-[#081522]/95 to-[#050b14]/95 shadow-lg shadow-black/20 backdrop-blur-lg"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 lg:px-10">
          <Link href="/">
            <Image src="/logo.png" width={120} height={40} alt="logo" priority />
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative py-1 text-sm font-medium transition-colors hover:text-[#009966] ${
                      isActive ? "text-[#009966]" : "text-white/80"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-[#009966]" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">{authActions}</div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="rounded-full p-2 transition hover:bg-white/10 lg:hidden"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </nav>

        {isOpen && (
          <div className="border-t border-white/10 px-4 pb-6 pt-5 lg:hidden">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-base font-medium ${
                      pathname === link.href ? "text-[#009966]" : "text-white/90"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
              {authActions}
            </div>
          </div>
        )}
      </header>

      {!isHome && <div style={{ height: NAVBAR_HEIGHT }} aria-hidden="true" />}
    </>
  );
};

export default NavBar;