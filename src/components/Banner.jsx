"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const bannerData = [
  {
    id: 1,
    image: "/banner/banner01.jpg",
    title: "Book Appointment Easily",
    description: "Find experienced doctors and book appointments instantly.",
    button: "Book Now",
  },
  {
    id: 2,
    image: "/banner/banner02.jpg",
    title: "24/7 Emergency Support",
    description: "Get emergency healthcare support anytime anywhere.",
    button: "Get Support",
  },
  {
    id: 3,
    image: "/banner/banner03.jpg",
    title: "Online Doctor Consultation",
    description: "Consult with specialist doctors from your home.",
    button: "Consult Now",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === bannerData.length - 1 ? 0 : prev + 1
      );
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const slide = bannerData[current];

  return (
    <div className="relative w-full h-[70vh]">

      <Image
        src={slide.image}
        alt="banner"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="absolute inset-0 flex items-center">
        <div className="w-10/12 mx-auto text-white">

          <h1 className="text-3xl md:text-6xl font-bold mb-4">
            {slide.title}
          </h1>

          <p className="text-gray-200 text-sm md:text-lg max-w-xl">
            {slide.description}
          </p>

          <button className="mt-6 bg-[#004A99] hover:bg-[#00397a] px-7 py-3 rounded-full font-semibold transition">
            {slide.button}
          </button>

        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {bannerData.map((_, i) => (
          <div
            key={i}
            className={`h-1 w-8 rounded-full transition-all duration-300 ${
              i === current ? "bg-[#009966]" : "bg-white/30"
            }`}
          />
        ))}
      </div>

    </div>
  );
};

export default Banner;