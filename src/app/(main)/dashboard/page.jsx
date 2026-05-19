// app/dashboard/page.tsx

async function getAppointments() {
  const res = await fetch("http://localhost:5000/appointments");

  return res.json();
}

export default async function DashboardPage() {
  const appointments = await getAppointments();

  return (
    <div className="min-h-screen bg-[#f4f7f8] p-10">
      <h1 className="mb-6 text-4xl font-bold">Dashboard</h1>

      <div className="mb-8 flex gap-3">
        <button className="rounded-full bg-white px-5 py-2 text-sm font-semibold shadow">
          My Booking
        </button>

        <button className="rounded-full bg-gray-200 px-5 py-2 text-sm font-semibold text-gray-700">
          My Profile
        </button>
      </div>

      <div className="space-y-5">
        {appointments.map(appointment => (
          <div
            key={appointment._id}
            className="max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <h2 className="mb-4 text-xl font-bold text-teal-700">
              {appointment.doctorName}
            </h2>

            <div className="space-y-2 text-sm text-gray-700">
              <p>Patient: {appointment.patientName}</p>
              <p>Date: {appointment.date}</p>
              <p>Time: {appointment.time}</p>
              <p>Reason: {appointment.reason}</p>
            </div>

            <div className="mt-5 flex gap-3">
              <button className="rounded-lg bg-gray-200 px-4 py-2 text-sm">
                Update
              </button>

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