import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "certifications", label: "Certifications" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      let current = "";
      menuItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) {
          const top = section.offsetTop - 100;
          if (window.scrollY >= top) current = item.id;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleMenuItemClick = (id) => {
    setIsOpen(false);
    const section = document.getElementById(id);
    if (section) {
      const y = section.offsetTop - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 px-5 sm:px-[7vw] lg:px-[20vw] ${
          isScrolled
            ? "bg-[#050414]/70 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="text-white py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="text-lg font-semibold cursor-pointer select-none">
            <span className="text-purple-500">&lt;</span>
            <span>Alok</span>
            <span className="text-purple-500">/</span>
            <span>Ranjan</span>
            <span className="text-purple-500">&gt;</span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 text-gray-300">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuItemClick(item.id)}
                  className={`relative hover:text-purple-400 transition ${
                    activeSection === item.id ? "text-purple-400" : ""
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-purple-500" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop Social Icons */}
          <div className="hidden md:flex space-x-4">
            <a
              href="https://github.com/alokrj01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-purple-400 transition"
            >
              <FaGithub size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/alok-ranjan972"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-purple-400 transition"
            >
              <FaLinkedin size={22} />
            </a>
          </div>

          {/* Mobile social icon */}
          <div className="md:hidden flex items-center gap-3">
            <a
              href="https://github.com/alokrj01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-purple-400 transition"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/alok-ranjan972"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-purple-400 transition"
            >
              <FaLinkedin size={20} />
            </a>
            <button
              className="text-2xl text-purple-400"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setIsOpen(false)} // tap backdrop to close
        >
          {/* Card — stopPropagation so tapping inside doesn't close */}
          <div
            className="relative bg-[#050414] rounded-2xl p-8 w-[80%] max-w-sm border border-white/10 shadow-2xl shadow-purple-500/25"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-white shadow-md shadow-purple-500/40 hover:scale-110 active:scale-95 transition-all duration-200"
            >
              <FiX size={16} />
            </button>

            <ul className="flex flex-col items-center gap-6 text-gray-300 mt-4">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleMenuItemClick(item.id)}
                    className={`text-lg font-medium transition duration-300 hover:text-purple-400 hover:scale-105 ${
                      activeSection === item.id
                        ? "text-purple-400"
                        : "text-gray-300"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
