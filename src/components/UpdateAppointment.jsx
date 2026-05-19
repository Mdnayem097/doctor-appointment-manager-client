"use client";

import { useEffect, useState } from "react";

const UpdateModal = ({ appointments, refetch }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    patientName: "",
    date: "",
    time: "",
    reason: "",
  });

  // load data
  useEffect(() => {
    if (appointments?._id) {
      setFormData({
        patientName: appointments.patientName || "",
        date: appointments.date ? appointments.date.split("T")[0] : "",
        time: appointments.time || "",
        reason: appointments.reason || "",
      });
    }
  }, [appointments]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const closeModal = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!appointments?._id) return;

    try {
      setLoading(true);

      await fetch(
        `http://localhost:5000/appointments/${appointments._id}`,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      alert("Updated Successfully!");

      refetch();

      setOpen(false);
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border-2 border-gray-300 px-3 py-2.5 rounded-xl text-sm outline-none focus:border-[#004A99]";

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-gray-200 px-4 py-2 text-sm"
      >
        Update
      </button>

      {/* MODAL */}
      {open && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-md rounded-2xl p-6 relative"
          >
            {/* CLOSE */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-xl text-gray-500 hover:text-red-500"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">
              Update Appointment
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">

              <input
                value={appointments?.doctorName || ""}
                readOnly
                className={inputClass + " bg-gray-100"}
              />

              <input
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                placeholder="Patient Name"
                className={inputClass}
              />

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={inputClass}
              />

              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={inputClass}
              />

              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Reason"
                className={inputClass}
              />

              <button
                disabled={loading}
                className="w-full bg-[#004A99] text-white py-3 rounded-xl font-semibold"
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateModal;