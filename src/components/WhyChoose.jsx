"use client";

import { FaUserMd, FaCalendarCheck, FaShieldAlt, FaLaptopMedical, FaNotesMedical } from "react-icons/fa";

const features = [
  {
    id: 1,
    icon: <FaUserMd />,
    title: "Expert Doctors",
    desc: "Connect with highly experienced and verified specialists."
  },
  {
    id: 2,
    icon: <FaCalendarCheck />,
    title: "Easy Appointment",
    desc: "Book appointments instantly with just a few clicks."
  },
  {
    id: 3,
    icon: <FaShieldAlt />,
    title: "Secure System",
    desc: "Your data and medical information are fully protected."
  },
  {
  id: 4,
  icon: <FaNotesMedical />,
  title: "Digital Health Records",
  desc: "Access and manage all your medical records securely in one place."
}
];

const WhyChoose = () => {
  return (
    <section className="w-10/12 mx-auto py-16">
      
      <h2 className="text-2xl md:text-4xl font-bold text-center text-[#004A99] mb-1">
        Why Choose DocAppoint?
      </h2>
      <p className="mb-12 text-center text-gray-500">Build Around Your Health And Your Time.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {features.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md hover:shadow-xl rounded-2xl p-6 text-center transition duration-300 hover:-translate-y-2"
          >
            <div className="text-4xl text-[#009966] flex justify-center mb-4">
              {item.icon}
            </div>

            <h3 className="text-xl font-semibold mb-2">
              {item.title}
            </h3>

            <p className="text-gray-500 text-sm">
              {item.desc}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default WhyChoose;