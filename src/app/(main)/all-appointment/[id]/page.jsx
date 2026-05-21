import Image from "next/image";
import { FaHospital, FaMapMarkerAlt, FaUserMd } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import AppointmentModal from "../../book-appointment/page";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/all-appointment/${params.id}`,
    { cache: "no-store" }
  );

  const doctor = await res.json();
  console.log("DOCTOR:", doctor);

  return {
    title: `${doctor.name} | Doctor Details`,
    description: `View details of ${doctor.name} and book appointment easily`,
  };
}

const DoctorDetails = async ({ params }) => {
  const { id } = await params;
  const {token} = await auth.api.getToken({
    headers: await headers()
  })

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-appointment/${id}`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  const doctor = await res.json();

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="w-11/12 lg:w-10/12 mx-auto">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden grid lg:grid-cols-2 gap-5 p-4 md:p-2">
          <div>
            <Image
              src={doctor.image}
              alt={doctor.name}
              width={700}
              height={700}
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div>
              <p className="text-[#009966] font-semibold mb-1">
                {doctor.specialty}
              </p>

              <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">
                {doctor.name}
              </h1>

              <p className="text-gray-500 mt-3 leading-7">
                {doctor.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-5">
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-2 flex items-center gap-2 hover:shadow-md transition">
                <div className="bg-[#004A99] text-white p-3 rounded-2xl">
                  <FaUserMd className="text-lg" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Experience</p>

                  <h3 className="font-semibold text-gray-800">
                    {doctor.experience}
                  </h3>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition">
                <div className="bg-[#004A99] text-white p-3 rounded-2xl">
                  <FaMapMarkerAlt className="text-lg" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Location</p>

                  <h3 className="font-semibold text-gray-800">
                    {doctor.location}
                  </h3>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition">
                <div className="bg-[#004A99] text-white p-3 rounded-2xl">
                  <FaHospital className="text-lg" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Hospital</p>

                  <h3 className="font-semibold text-gray-800">
                    {doctor.hospital}
                  </h3>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition">
                <div className="bg-[#004A99] text-white p-3 rounded-2xl">
                  <FaBangladeshiTakaSign className="text-lg" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Consultation Fee</p>

                  <h3 className="font-semibold text-gray-800">
                    ৳ {doctor.fee}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-2 mt-3">
              <div>
                <h3 className="font-semibold text-2xl text-gray-800 pb-4">
                  Available Time
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {doctor.availability.map((time, index) => (
                  <span
                    key={index}
                    className="bg-white border border-[#009966] text-[#009966] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#009966] hover:text-white transition"
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <AppointmentModal doctor={doctor} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
