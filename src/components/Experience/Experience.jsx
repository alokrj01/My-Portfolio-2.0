import React from "react";
import { experiences } from "../../constants";

const Experience = () => {
  return (
    <section
      id="experience"
      className="py-24 px-[12vw] md:px-[7vw] lg:px-[16vw] font-sans bg-skills-gradient clip-path-custom-2"
    >
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">EXPERIENCE</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          A collection of my work experience and roles across organizations
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-0 sm:left-1/2 top-0 h-full w-[2px] bg-gray-600 sm:-translate-x-1/2"></div>

        {/* Items */}
        {experiences?.map((exp, index) => (
          <div
            key={`${exp.id}-${index}`}
            className={`relative flex flex-col sm:flex-row items-start sm:items-center mb-16 ${
              index % 2 === 0 ? "sm:justify-end" : "sm:justify-start"
            }`}
          >
            {/* Timeline Circle */}
            <div className="absolute left-0 sm:left-1/2 -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-purple-500 bg-gray-800 flex items-center justify-center z-10">
              <img
                src={exp.img}
                alt={`${exp.company} logo`}
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
              {/* Header */}
              <h3 className="text-xl sm:text-2xl font-semibold text-white">
                {exp.role}
              </h3>
              <h4 className="text-sm text-gray-300 mt-1">
                {exp.company}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                {exp.date}
              </p>

              {/* Description */}
              <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                {exp.desc}
              </p>

              {/* Skills */}
              {exp.skills?.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-white text-sm font-semibold mb-2">
                    Skills
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, i) => (
                      <span
                        key={`${skill}-${i}`}
                        className="bg-purple-600/80 text-white px-3 py-1 text-xs rounded-md border border-white/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;