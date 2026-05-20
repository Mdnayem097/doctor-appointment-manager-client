"use client";

import React, { useState } from "react";

const UpdateProfile = ({ user }) => {
  const [open, setOpen] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedUser = {
      name: form.name.value,
      image: form.image.value,
    };

    const res = await fetch(
      `http://localhost:5000/users/${user?.email}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      }
    );

    const data = await res.json();

    console.log(data);

    alert("Profile Updated!");

    setOpen(false);

    window.location.reload();
  };

  const inputClass =
    "w-full border-2 border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#004A99] transition";

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="mt-3 bg-[#004A99] hover:bg-[#00397a] text-white font-semibold w-full py-3 rounded-xl transition duration-300"
      >
        Update Profile
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 z-50">

          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl relative">

            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Update Profile
            </h2>

            <form
              onSubmit={handleUpdateProfile}
              className="space-y-4"
            >

              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  defaultValue={user?.name}
                  placeholder="Enter your name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Image URL
                </label>

                <input
                  type="text"
                  name="image"
                  defaultValue={user?.image}
                  placeholder="Enter image url"
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#004A99] hover:bg-[#00397a] text-white py-3 rounded-xl font-semibold transition duration-300"
              >
                Save Changes
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;