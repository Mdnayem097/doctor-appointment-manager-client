"use client";

import { useEffect, useState } from "react";
import UpdateModal from "@/components/UpdateAppointment";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import UpdateProfile from "@/components/UpdateProfile";

export default function DashboardPage() {
  const userData = authClient.useSession();
  const user = userData.data?.user;
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("booking");

  // FETCH DATA
  const getAppointments = async () => {
    const res = await fetch("http://localhost:5000/appointments");
    const data = await res.json();
    setAppointments(data);
  };

  useEffect(() => {
    getAppointments();
  }, []);

  // DELETE FUNCTION
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    await fetch(`http://localhost:5000/appointments/${id}`, {
      method: "DELETE",
    });

    getAppointments();
  };

  return (
    <div className="min-h-screen bg-[#f4f7f8] px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* TITLE */}
        <h1 className="mb-6 text-4xl font-bold">Dashboard</h1>

        {/* TABS */}
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
          appointments.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No Booking Found 😢
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition"
                >
                  <h2 className="text-xl font-bold text-[#009966]">
                    {appointment.doctorName}
                  </h2>

                  <div className="text-sm text-gray-700 mt-3 space-y-1">
                    <p>Patient: {appointment.patientName}</p>
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
                      onClick={() => handleDelete(appointment._id)}
                      className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          //  PROFILE SECTION
          <div className="shadow rounded-2xl bg-white p-5 w-full sm:w-96 mx-auto lg:mx-0">

  {/* PROFILE SECTION */}
  <div className="flex flex-col lg:flex-row lg:items-center gap-4">

    {/* IMAGE */}
    <div className="w-16 h-16 relative rounded-full overflow-hidden shrink-0">
      {user?.image ? (
        <Image
          src={user.image}
          alt="profile"
          fill
          className="object-cover"
        />
      ) : (
        <div className="w-full h-full bg-[#004A99] text-white flex items-center justify-center font-semibold text-xl">
          {user?.name?.charAt(0)}
        </div>
      )}
    </div>

    {/* TEXT */}
    <div className="flex-1 overflow-hidden">
      <p className="font-bold text-lg md:text-xl text-gray-800 truncate">
        {user?.name}
      </p>

      <p className="text-gray-500 text-sm truncate">
        {user?.email}
      </p>
    </div>

  </div>

  {/* BUTTON */}
  <UpdateProfile user={user}></UpdateProfile>

</div>
        )}
      </div>
    </div>
  );
}
