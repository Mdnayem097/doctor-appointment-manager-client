import React from "react";
import Image from "next/image";
import { FaFacebookF, FaLinkedinIn, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = ({ logo }) => {
  return (
    <footer className="bg-gradient-to-b from-[#081522] to-[#050b14] text-white pt-14 pb-6">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/logo.png"
              alt="Logo"
              width={200}
              height={50}
            />
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">
            DocAppoint is your trusted platform for online doctor booking,
            consultation, and 24/7 emergency healthcare support.
          </p>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-xl font-semibold mb-5">Services</h2>

          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="hover:text-white cursor-pointer transition">
              Online Booking
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Doctor Consultation
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Emergency Support
            </li>
            <li className="hover:text-white cursor-pointer transition">
              24/7 Service
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold mb-5">Follow Us</h2>

          <div className="flex items-center gap-4">
            <a className="w-11 h-11 rounded-full bg-[#0D2B45] hover:bg-[#1877F2] flex items-center justify-center transition">
              <FaFacebookF />
            </a>

            <a className="w-11 h-11 rounded-full bg-[#0D2B45] hover:bg-[#0A66C2] flex items-center justify-center transition">
              <FaLinkedinIn />
            </a>

            <a className="w-11 h-11 rounded-full bg-[#0D2B45] hover:bg-black flex items-center justify-center transition">
              <FaGithub />
            </a>

            <a className="w-11 h-11 rounded-full bg-[#0D2B45] hover:bg-[#1DA1F2] flex items-center justify-center transition">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
        <p>© 2026 DocAppoint. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
