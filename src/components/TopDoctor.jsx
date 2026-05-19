import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const TopDoctor = async () => {
  const res = await fetch("http://localhost:5000/all-appointment", {
    cache: "no-store",
  });

  const posts = await res.json();
  const topDoctors = posts
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className="mb-1 mt-16">
      <p className="text-2xl md:text-4xl font-bold text-center text-[#004A99]">
        Top Rated Doctors
      </p>

      <p className="text-sm text-center text-gray-500 mb-12">
        Highly Reviewed Specialists Ready To See You
      </p>

      <div className="w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {topDoctors.map((res, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl overflow-hidden p-2 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl"
          >
            <div className="overflow-hidden rounded-xl">
              <Image
                src={res.image}
                alt="doctorImage"
                width={600}
                height={600}
                className="w-full h-72 object-cover object-top transition-all duration-500 hover:scale-105"
              />
            </div>

            <div className="mt-4 space-y-2">
              <h2 className="font-bold text-xl">{res.name}</h2>
              <p className="text-[#009966] font-semibold">{res.specialty}</p>
              <p className="text-sm text-gray-500 py-4">{res.description}</p>

              <p className="flex items-center gap-1.5 text-sm text-gray-600">
                <FaMapMarkerAlt className="text-[#009966]" /> {res.location}
              </p>
              <p className="flex items-center gap-1.5 text-sm text-gray-600">
                <FaBriefcase className="text-[#004A99]" /> {res.experience}
              </p>

              <div className="flex justify-between items-center mt-4">
                <p className="flex items-center gap-1 text-green-600 font-semibold">
                  <FaBangladeshiTakaSign />
                  {res.fee}
                </p>

                <Link href={`/all-appointment/${res._id}`}>
                  <button className="bg-[#004A99] cursor-pointer hover:bg-[#00397a] text-white px-5 py-2 rounded-full transition">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDoctor;