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
    { id: "certifications", label: "certifications"},
  ];

  // Scroll detection (navbar bg + active section)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      let current = "";
      menuItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) {
          const top = section.offsetTop - 100;
          if (window.scrollY >= top) {
            current = item.id;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll with offset
  const handleMenuItemClick = (id) => {
    setIsOpen(false);

    const section = document.getElementById(id);
    if (section) {
      const y = section.offsetTop - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
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
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-purple-500"></span>
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Social Icons */}
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

        {/* Mobile Icon */}
        <button
          className="md:hidden text-3xl text-purple-500"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="bg-[#050414] rounded-xl p-6 w-[80%] max-w-sm shadow-lg">
            <ul className="flex flex-col items-center gap-6 text-gray-300">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleMenuItemClick(item.id)}
                    className={`text-lg hover:text-white transition ${
                      activeSection === item.id
                        ? "text-purple-400"
                        : ""
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}

              {/* Socials */}
              <div className="flex gap-6 mt-4">
                <a
                  href="https://github.com/alokrj01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/alok-ranjan972"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  <FaLinkedin size={24} />
                </a>
              </div>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;