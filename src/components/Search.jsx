"use client";

import { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchPage = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      if (onSearch) onSearch(query);
    }, 400);

    return () => clearTimeout(delay);
  }, [query, onSearch]);

  const clearSearch = () => {
    setQuery("");
    if (onSearch) onSearch("");
  };

  return (
    <div className="w-full flex justify-center py-8">

      <div className="w-[90%] md:w-[50%] lg:w-[40%]">

        <div className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm hover:shadow-md transition rounded-full px-4 py-2">

          <FaSearch className="text-gray-400 text-sm" />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search doctor, specialty..."
            className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
          />

          {query && (
            <button onClick={clearSearch}>
              <FaTimes className="text-gray-400 hover:text-red-500 text-sm" />
            </button>
          )}

          <button
            onClick={() => onSearch(query)}
            className="bg-[#004A99] hover:bg-[#00397a] text-white text-sm px-4 py-1.5 rounded-full transition"
          >
            Search
          </button>

        </div>

      </div>

    </div>
  );
};

export default SearchPage;