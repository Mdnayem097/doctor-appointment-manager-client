"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchPage from "@/components/Search";

import { FaMapMarkerAlt } from "react-icons/fa";
import { FaBangladeshiTakaSign, FaBriefcase } from "react-icons/fa6";

const AllAppointmentPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/all-appointment");
        const data = await res.json();

        setPosts(data);
        setFilteredPosts(data); // default show all
      } catch (error) {
        console.log("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // SEARCH FUNCTION
  const handleSearch = (query) => {
    if (!query) {
      setFilteredPosts(posts); // reset
      return;
    }

    const result = posts.filter((item) => {
      return (
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.specialty.toLowerCase().includes(query.toLowerCase())
      );
    });

    setFilteredPosts(result);
  };

  // LOADING UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="my-10">
      <p className="text-center text-4xl font-semibold">All Appointment</p>
      <p className="text-sm text-gray-500 text-center mt-1.5">
        Find The Right Doctor For You.
      </p>

      <SearchPage onSearch={handleSearch} />

      <div className="w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {filteredPosts.map((res) => (
          <div
            key={res._id}
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
              <p className="text-sm text-gray-500 py-4">
                {res.description}
              </p>

              <p className="flex items-center gap-1.5 text-sm text-gray-600">
                <FaMapMarkerAlt className="text-[#009966]" />
                {res.location}
              </p>

              <p className="flex items-center gap-1.5 text-sm text-gray-600">
                <FaBriefcase className="text-[#004A99]" />
                {res.experience}
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

export default AllAppointmentPage;