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
      setCurrent((prev) => (prev === bannerData.length - 1 ? 0 : prev + 1));
    }, 5000); // 5 seconds per slide

    return () => clearInterval(interval);
  }, []);

  // Manual navigation
  const goToSlide = (index) => setCurrent(index);
  const nextSlide = () =>
    setCurrent((prev) => (prev === bannerData.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? bannerData.length - 1 : prev - 1));

  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      {bannerData.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
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
        </div>
      ))}

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {bannerData.map((_, i) => (
          <div
            key={i}
            onClick={() => goToSlide(i)}
            className={`h-1 w-8 rounded-full cursor-pointer transition-all duration-300 ${
              i === current ? "bg-[#009966]" : "bg-white/30"
            }`}
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-white text-3xl font-bold z-20 hover:text-[#009966] transition"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2 text-white text-3xl font-bold z-20 hover:text-[#009966] transition"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Banner;