"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";

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

const total = bannerData.length;
const SLIDE_DURATION = 5000;

const formatNumber = (number) => String(number).padStart(2, "0");

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % total);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total);

  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(
      () => setCurrent((prev) => (prev + 1) % total),
      SLIDE_DURATION,
    );

    return () => clearTimeout(timer);
  }, [current, isPaused]);

  return (
    <section
      className="relative h-[90vh] min-h-[600px] w-full overflow-hidden bg-[#050b14]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Healthcare highlights"
    >
      {bannerData.map((slide, index) => {
        const isActive = index === current;

        return (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              isActive ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className={`object-cover transition-transform duration-[6000ms] ease-out ${
                isActive ? "scale-110" : "scale-100"
              }`}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#050b14]/90 via-[#050b14]/60 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />

            <div className="relative mx-auto flex h-full w-10/12 max-w-7xl items-center pt-20">
              <div
                className={`max-w-2xl text-white transition-all delay-300 duration-700 ${
                  isActive
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <h1 className="text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
                  {slide.title}
                </h1>
                <p className="mt-5 max-w-xl text-base text-gray-200 md:text-lg">
                  {slide.description}
                </p>
                <button
                  tabIndex={isActive ? 0 : -1}
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#004A99] to-[#009966] px-8 py-3.5 font-semibold shadow-lg shadow-[#004A99]/30 transition hover:scale-105"
                >
                  {slide.button}
                  <FiArrowRight className="transition group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <div className="absolute inset-x-0 bottom-8 z-20">
        <div className="mx-auto flex w-10/12 max-w-7xl items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="text-sm font-medium text-white/80">
              {formatNumber(current + 1)} / {formatNumber(total)}
            </span>

            <div className="flex gap-2">
              {bannerData.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrent(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === current
                      ? "w-12 bg-[#009966]"
                      : "w-6 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-[#009966]"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-[#009966]"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
