"use client";

import { useEffect, useState } from "react";
import UpdateModal from "@/components/UpdateAppointment";

export default function DashboardPage() {
  const [appointments, setAppointments] = useState([]);

  // 🔥 FETCH DATA
  const getAppointments = async () => {
    const res = await fetch("http://localhost:5000/appointments");
    const data = await res.json();
    setAppointments(data);
  };

  useEffect(() => {
    getAppointments();
  }, []);

  // 🗑 DELETE FUNCTION
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    await fetch(`http://localhost:5000/appointments/${id}`, {
      method: "DELETE",
    });

    getAppointments(); // 🔥 refresh UI
  };

  return (
    <div className="min-h-screen bg-[#f4f7f8] px-6 py-10">
      
      <div className="max-w-6xl mx-auto">

        {/* TITLE */}
        <h1 className="mb-6 text-4xl font-bold">Dashboard</h1>

        {/* TOP BUTTONS */}
        <div className="mb-8 flex gap-3">
          <button className="rounded-full bg-white px-5 py-2 text-sm font-semibold shadow">
            My Booking
          </button>

          <button className="rounded-full bg-gray-200 px-5 py-2 text-sm font-semibold text-gray-700">
            My Profile
          </button>
        </div>

        {/* EMPTY STATE + GRID */}
        {appointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-2xl font-bold text-gray-600">
              No Booking Found 😢
            </h2>
            <p className="text-gray-400 mt-2">
              You don’t have any appointments yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition"
              >
                {/* DOCTOR NAME */}
                <h2 className="text-xl font-bold text-[#009966]">
                  {appointment.doctorName}
                </h2>

                {/* INFO */}
                <div className="text-sm text-gray-700 mt-3 space-y-1">
                  <p>Patient: {appointment.patientName}</p>
                  <p>Date: {appointment.date}</p>
                  <p>Time: {appointment.time}</p>
                  <p>Reason: {appointment.reason}</p>
                </div>

                {/* ACTIONS */}
                <div className="mt-5 flex gap-3">

                  {/* UPDATE */}
                  <UpdateModal
                    appointments={appointment}
                    refetch={getAppointments}
                  />

                  {/* DELETE */}
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
        )}

      </div>
    </div>
  );
}