"use client";

import { useState } from "react";

const AppointmentModal = ({ doctor, user }) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
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

    console.log(data);

    alert("Appointment Booked!");
    form.reset();
    setOpen(false);
  };

  // 🔥 COMMON INPUT STYLE
  const inputClass =
    "w-full border-2 border-gray-300 px-3 py-2.5 rounded-xl text-sm outline-none focus:border-[#004A99] transition";

  return (
    <div>

      {/* BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-[#004A99] hover:bg-[#00397a] text-white py-3 rounded-xl font-semibold transition shadow-md"
      >
        Book Appointment
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center py-8 px-4 z-50">

          <div className="bg-white w-full max-w-xl rounded-2xl p-6 shadow-2xl">

            {/* HEADER */}
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

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-3">

              {/* DOCTOR */}
              <input
                value={doctor?.name || ""}
                readOnly
                className={inputClass}
              />

              {/* EMAIL */}
              <input
                name="userEmail"
                placeholder="Email"
                required
                className={inputClass}
              />

              {/* PATIENT NAME */}
              <input
                name="patientName"
                placeholder="Patient Name"
                required
                className={inputClass}
              />

              {/* PHONE */}
              <input
                name="phone"
                placeholder="Phone Number"
                required
                className={inputClass}
              />

              {/* GENDER + DATE */}
              <div className="grid grid-cols-2 gap-3">

                <select name="gender" className={inputClass}>
                  <option>Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>

                <input
                  type="date"
                  name="date"
                  className={inputClass}
                />

              </div>

              {/* TIME */}
              <select name="time" className={inputClass}>
                <option>Select Time</option>
                {doctor?.availability?.map((t, i) => (
                  <option key={i} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              {/* REASON */}
              <textarea
                name="reason"
                placeholder="Reason (optional)"
                rows={2}
                className={inputClass}
              />

              {/* SUBMIT */}
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