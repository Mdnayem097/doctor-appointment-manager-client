"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

const UpdateProfile = ({ user, setProfile }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (loading) return;

    const form = e.target;

    const updatedUser = {
      name: form.name.value,
      image: form.image.value,
    };

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${user.email}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!res.ok) {
        throw new Error("Update failed");
      }

      const data = await res.json();

      if (data.modifiedCount > 0) {
        setProfile((prev) => ({
          ...prev,
          ...updatedUser,
        }));

        toast.success(
          "Profile Updated Successfully "
        );

        setOpen(false);
      } else {
        toast("Nothing changed ⚠️");
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong ");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border-2 border-gray-300 px-4 py-3 outline-none transition focus:border-[#004A99]";

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="mt-3 w-full rounded-xl bg-[#004A99] py-3 font-semibold text-white hover:bg-[#00397a]"
      >
        Update Profile
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-md rounded-xl bg-white p-6">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-2 text-xl"
            >
              ✕
            </button>

            <h2 className="mb-4 text-xl font-bold">
              Update Profile
            </h2>

            <form
              onSubmit={handleUpdateProfile}
              className="space-y-4"
            >
              <input
                type="text"
                name="name"
                defaultValue={user?.name}
                placeholder="Enter your name"
                className={inputClass}
                required
              />

              <input
                type="text"
                name="image"
                defaultValue={user?.image}
                placeholder="Enter image URL"
                className={inputClass}
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#004A99] py-3 text-white disabled:opacity-50"
              >
                {loading
                  ? "Updating..."
                  : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;