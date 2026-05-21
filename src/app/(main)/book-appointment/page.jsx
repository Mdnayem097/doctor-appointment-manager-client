"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const AppointmentModal = ({ doctor, user }) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const data = {
      userEmail: form.userEmail.value,
      doctorName: doctor?.name,
      patientName: form.patientName.value,
      gender: form.gender.value,
      phone: form.phone.value,
      date: form.date.value,
      time: form.time.value,
      reason: form.reason.value,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/appointments`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    console.log(result);

    toast.success("Appointment Booked!");
    form.reset();
    setOpen(false);
  };

  const inputClass =
    "w-full border-2 border-gray-300 px-3 py-2.5 rounded-xl text-sm outline-none focus:border-[#004A99] transition";

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-[#004A99] hover:bg-[#00397a] text-white py-3 rounded-xl font-semibold transition shadow-md"
      >
        Book Appointment
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center py-8 px-4 z-50">
          <div className="bg-white w-full max-w-xl rounded-2xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Book Appointment
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-red-500 text-xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                value={doctor?.name || ""}
                readOnly
                className={inputClass}
              />

              <input
                name="userEmail"
                placeholder="Email"
                required
                className={inputClass}
              />

              <input
                name="patientName"
                placeholder="Patient Name"
                required
                className={inputClass}
              />

              <input
                name="phone"
                placeholder="Phone Number"
                required
                className={inputClass}
              />

              <div className="grid grid-cols-2 gap-3">
                <select name="gender" className={inputClass}>
                  <option>Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>

                <input type="date" name="date" className={inputClass} />
              </div>

              <select name="time" className={inputClass}>
                <option>Select Time</option>
                {doctor?.availability?.map((t, i) => (
                  <option key={i} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <textarea
                name="reason"
                placeholder="Reason (optional)"
                rows={2}
                className={inputClass}
              />

              <button
                type="submit"
                className="w-full bg-[#004A99] hover:bg-[#00397a] text-white py-3 rounded-xl font-semibold transition"
              >
                Confirm Appointment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentModal;
