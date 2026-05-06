import React from "react";
import { education } from "../../constants";

const Education = () => {
  return (
    <section
      id="education"
      className="py-24 px-[12vw] md:px-[7vw] lg:px-[16vw] font-sans bg-skills-gradient clip-path-custom-3"
    >
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">EDUCATION</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          My education has been a journey of learning and development. Here are
          the details of my academic background.
        </p>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-0 sm:left-1/2 top-0 h-full w-[2px] bg-gray-600 sm:-translate-x-1/2"></div>

        {/* Timeline Items */}
        {education?.map((edu, index) => (
          <div
            key={`${edu.id}-${index}`}
            className={`relative flex flex-col sm:flex-row items-start sm:items-center mb-16 ${
              index % 2 === 0 ? "sm:justify-start" : "sm:justify-end"
            }`}
          >
            {/* Timeline Circle */}
            <div className="absolute left-0 sm:left-1/2 -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-purple-500 bg-gray-800 flex items-center justify-center z-10">
              <img
                src={edu.img}
                alt={`${edu.school} logo`}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Card */}
            <div
              className="w-full sm:w-[45%] ml-10 sm:ml-0 p-6 rounded-2xl 
              border border-white/10 
              bg-white/5 backdrop-blur-md 
              shadow-lg 
              transition-transform duration-300 hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-white">
                {edu.degree}
              </h3>
              <h4 className="text-sm text-gray-300 mt-1">{edu.school}</h4>
              <p className="text-xs text-gray-500 mt-1">{edu.date}</p>

              <p className="mt-3 text-gray-400 font-semibold">
                Grade: {edu.grade}
              </p>
              <p className="mt-2 text-gray-400 text-sm leading-relaxed">
                {edu.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;