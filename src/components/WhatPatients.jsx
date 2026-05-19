"use client";

import { FaStar } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Rahim Uddin",
    comment: "Great service! Doctor appointment was very easy.",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    comment: "Very helpful platform. Saved my time a lot.",
  },
  {
    id: 3,
    name: "Tanvir Hasan",
    comment: "Doctors are very professional and supportive.",
  },
  {
    id: 4,
    name: "Sadia Islam",
    comment: "Easy booking system and fast response.",
  },
  {
    id: 5,
    name: "Imran Hossain",
    comment: "Loved the online consultation feature.",
  },
  {
    id: 6,
    name: "Mst. Rima",
    comment: "Very smooth experience. Highly recommended!",
  },
];

const PatientsSay = () => {
  return (
    <section className="w-10/12 mx-auto py-16">

      <h2 className="text-3xl md:text-5xl font-bold text-center text-[#004A99] mb-12">
        What Patients Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {reviews.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md hover:shadow-xl rounded-2xl p-6 transition duration-300 hover:-translate-y-1"
          >

            <div className="flex gap-1 text-yellow-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            <p className="text-gray-600 mb-4">
              {item.comment}
            </p>

            <h4 className="font-semibold text-[#004A99]">
              - {item.name}
            </h4>

          </div>
        ))}

      </div>
    </section>
  );
};

export default PatientsSay;