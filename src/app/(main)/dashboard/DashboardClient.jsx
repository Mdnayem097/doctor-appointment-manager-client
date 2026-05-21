"use client";

import { useEffect, useRef, useState } from "react";
import UpdateModal from "@/components/UpdateAppointment";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import UpdateProfile from "@/components/UpdateProfile";

export default function DashboardPage() {
  const userData = authClient.useSession();

  const user = userData.data?.user;

  const [profile, setProfile] = useState(null);

  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("booking");
  const [loading, setLoading] = useState(true);

  const fetched = useRef(false);

  useEffect(() => {
    if (user) {
      setProfile(user);
    }
  }, [user]);

  const getAppointments = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/appointments");

      if (!res.ok) {
        throw new Error("Failed to fetch appointments");
      }

      const data = await res.json();

      setAppointments(data);
    } catch (error) {
      console.log("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fetched.current) return;

    fetched.current = true;

    getAppointments();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:5000/appointments/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      const data = await res.json();

      if (data.deletedCount > 0) {
        setAppointments((prev) =>
          prev.filter((item) => item._id !== id)
        );
      }
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f8] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-4xl font-bold">
          Dashboard
        </h1>

        <div className="mb-8 flex gap-3">
          <button
            onClick={() => setActiveTab("booking")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              activeTab === "booking"
                ? "bg-white shadow"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            My Booking
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              activeTab === "profile"
                ? "bg-white shadow"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            My Profile
          </button>
        </div>

        {activeTab === "booking" ? (
          loading ? (
            <div className="py-20 text-center text-gray-500">
              Loading...
            </div>
          ) : appointments.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              No Booking Found 😢
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <h2 className="text-xl font-bold text-[#009966]">
                    {appointment.doctorName}
                  </h2>

                  <div className="mt-3 space-y-1 text-sm text-gray-700">
                    <p>
                      Patient: {appointment.patientName}
                    </p>

                    <p>Date: {appointment.date}</p>

                    <p>Time: {appointment.time}</p>

                    <p>Reason: {appointment.reason}</p>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <UpdateModal
                      appointments={appointment}
                      refetch={getAppointments}
                    />

                    <button
                      onClick={() =>
                        handleDelete(appointment._id)
                      }
                      className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white transition hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="mx-auto w-full rounded-2xl bg-white p-5 shadow sm:w-96 lg:mx-0">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                {profile?.image ? (
                  <Image
                    src={profile.image}
                    alt="profile"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#004A99] text-xl font-semibold text-white">
                    {profile?.name?.charAt(0)}
                  </div>
                )}
              </div>

              <div className="flex-1 overflow-hidden">
                <p className="truncate text-lg font-bold text-gray-800 md:text-xl">
                  {profile?.name}
                </p>

                <p className="truncate text-sm text-gray-500">
                  {profile?.email}
                </p>
              </div>
            </div>

            <UpdateProfile
              user={profile}
              setProfile={setProfile}
            />
          </div>
        )}
      </div>
    </div>
  );
}