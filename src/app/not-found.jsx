"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f4f7f8] to-white px-6">

      <div className="text-center">

        {/* BIG 404 */}
        <h1 className="text-[120px] font-extrabold leading-none text-[#004A99]">
          404
        </h1>

        {/* LINE */}
        <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-[#009966]" />

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-gray-800">
          Page Not Found
        </h2>

        {/* DESCRIPTION */}
        <p className="mx-auto mt-3 max-w-md text-gray-500">
          The page you are looking for doesn’t exist, was removed, or the link might be broken.
        </p>

        {/* BUTTONS */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

          <Link
            href="/"
            className="rounded-xl bg-[#004A99] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#00397a]"
          >
            Go Home
          </Link>

          <button
            onClick={() => router.back()}
            className="rounded-xl border-2 border-[#009966] px-6 py-3 font-semibold text-[#009966] transition hover:bg-[#009966] hover:text-white"
          >
            Go Back
          </button>

        </div>

        {/* SMALL NOTE */}
        <p className="mt-6 text-xs text-gray-400">
          Error code: 404 • Let’s get you back on track
        </p>

      </div>

    </div>
  );
}