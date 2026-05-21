import Banner from "@/components/Banner";
import TopDoctor from "@/components/TopDoctor";
import PatientsSay from "@/components/WhatPatients";
import WhyChoose from "@/components/WhyChoose";

export const metadata = {
  title: "Home",
  description: "Welcome to Doctor Booking App",
};

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <TopDoctor></TopDoctor>
      <WhyChoose></WhyChoose>
      <PatientsSay></PatientsSay>
    </div>
  );
}
