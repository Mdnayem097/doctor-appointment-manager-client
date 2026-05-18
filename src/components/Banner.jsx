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
  const [fade, setFade] = useState(true);

  // AUTO SLIDE (15 sec)
  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide("next");
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const changeSlide = (type) => {
    setFade(false);

    setTimeout(() => {
      setCurrent((prev) => {
        if (type === "next") {
          return prev === bannerData.length - 1 ? 0 : prev + 1;
        } else {
          return prev === 0 ? bannerData.length - 1 : prev - 1;
        }
      });

      setFade(true);
    }, 1000); 
  };

  return (
    <div className="relative w-full">

      <div className="relative h-[300px] md:h-[650px] w-full overflow-hidden">

        <div
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            fade ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <Image
            src={bannerData[current].image}
            alt="banner"
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute inset-0 flex items-center">
          <div className="text-white px-6 md:px-30 max-w-4xl">

            <h1 className="text-4xl md:text-7xl font-bold mb-5">
              {bannerData[current].title}
            </h1>

            <p className="text-sm md:text-xl text-gray-200 mb-8">
              {bannerData[current].description}
            </p>

            <button className="bg-[#009966] hover:bg-[#007755] px-8 py-3 rounded-full font-semibold">
              {bannerData[current].button}
            </button>

          </div>
        </div>

        <button
          onClick={() => changeSlide("prev")}
          className="absolute top-1/2 left-5 -translate-y-1/2 bg-white/20 w-12 h-12 rounded-full text-white text-2xl backdrop-blur-md"
        >
          ❮
        </button>

        <button
          onClick={() => changeSlide("next")}
          className="absolute top-1/2 right-5 -translate-y-1/2 bg-white/20 w-12 h-12 rounded-full text-white text-2xl backdrop-blur-md"
        >
          ❯
        </button>

      </div>
    </div>
  );
};

export default Banner;