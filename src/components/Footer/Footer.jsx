import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { RiArrowUpLine } from "react-icons/ri";

const Footer = () => {
  // Smooth scroll function
  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="text-white py-8 px-[12vw] md:px-[7vw] lg:px-[20vw]">
        <div className="container mx-auto text-center">
          {/* Name / Logo */}
          <h2 className="text-xl font-semibold text-purple-500">Alok Ranjan</h2>

          {/* Navigation Links - Responsive */}
          <nav className="flex flex-wrap justify-center space-x-4 sm:space-x-6 mt-4">
            {[
              { name: "About", id: "about" },
              { name: "Skills", id: "skills" },
              { name: "Experience", id: "experience" },
              { name: "Projects", id: "work" },
              { name: "Education", id: "education" },
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => handleScroll(item.id)}
                className="hover:text-purple-500 text-sm sm:text-base my-1"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Social Media Icons - Responsive */}
          <div className="flex flex-wrap justify-center space-x-4 mt-6">
            {[
              { icon: <FaFacebook />, link: "https://www.facebook.com/Alokrj01" },
              { icon: <FaTwitter />, link: "https://x.com/alokrj_" },
              { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/alok-ranjan972" },
              { icon: <FaInstagram />, link: "https://www.instagram.com/alokrj_" },
              { icon: <SiLeetcode />, link: "https://www.youtube.com/codingmasteryt" },
              
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-purple-500 transition-transform transform hover:scale-110"
              >
                {item.icon}
              </a>
            ))}
          </div>

          {/* Copyright Text */}
          <p className="text-sm text-gray-400 mt-6">
            © 2026 Alok Ranjan. All rights reserved.
          </p>

        </div>
      </footer>

      {/* 🔼 Floating Scroll-To-Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="
          fixed bottom-6 right-6 z-50
          w-12 h-12 md:w-14 md:h-14
          rounded-full
          bg-linear-to-br from-purple-500 to-pink-500
          text-white
          flex items-center justify-center
          shadow-lg shadow-purple-500/40
          hover:scale-110 hover:shadow-pink-500/50
          transition-all duration-300
          focus:outline-none focus:ring-4 focus:ring-pink-500/40
        "
      >
        <RiArrowUpLine className="text-2xl md:text-3xl" />
      </button>

  </>
  );
};

export default Footer;