"use client";

import { useEffect, useState } from "react";
import UpdateModal from "@/components/UpdateAppointment";

export default function DashboardPage() {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    const res = await fetch("http://localhost:5000/appointments");
    const data = await res.json();
    setAppointments(data);
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div className="min-h-screen p-5 w-10/12 m-auto">
      <h1 className="mb-6 text-4xl font-bold">Dashboard</h1>

      <div className="mb-8 flex gap-3">
        <button className="rounded-full bg-white px-5 py-2 text-sm font-semibold shadow">
          My Booking
        </button>

        <button className="rounded-full bg-gray-200 px-5 py-2 text-sm font-semibold text-gray-700">
          My Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-10/12 m-auto">
        {appointments.map((appointment) => (
          <div
            key={appointment._id}
            className="max-w-md rounded-2xl border border-[#004A99]  bg-[#f4f7f8] p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold text-[#009966]">
              {appointment.doctorName}
            </h2>

            <div className="text-sm text-gray-700 space-y-1">
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

              <button className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}