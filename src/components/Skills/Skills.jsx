import React, { useEffect, useState } from "react";
import { SkillsInfo } from "../../constants";
import Tilt from "react-parallax-tilt";

const Skills = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 640);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <section
      id="skills"
      className="py-24 px-5 sm:px-[7vw] lg:px-[20vw] font-sans bg-skills-gradient clip-path-custom"
    >
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">SKILLS</h2>
        <div className="w-24 h-1 bg-purple-500 mx-auto mt-3"></div>
        <p className="text-gray-400 mt-4 text-base sm:text-lg font-semibold max-w-2xl mx-auto">
          A collection of my technical skills and expertise built through
          projects and real-world experience.
        </p>
      </div>

      {/* Categories */}
      <div className="grid gap-8 sm:grid-cols-2">
        {SkillsInfo?.map((category, index) => {
          const CardWrapper = isMobile ? "div" : Tilt;

          return (
            <CardWrapper
              key={`${category.title}-${index}`}
              {...(!isMobile && {
                tiltMaxAngleX: 10,
                tiltMaxAngleY: 10,
                perspective: 1000,
                scale: 1.02,
                transitionSpeed: 800,
                gyroscope: true,
              })}
              className="w-full"
            >
              <div
                className="h-full bg-white/5 backdrop-blur-md border border-white/10 
                rounded-2xl p-6 sm:p-8 shadow-lg transition hover:shadow-purple-500/30"
              >
                {/* Category Title */}
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-300 mb-6 text-center">
                  {category.title}
                </h3>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3">
                  {category.skills?.map((skill, i) => (
                    <div
                      key={`${skill.name}-${i}`}
                      className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl 
                      border border-white/10 bg-white/5 hover:bg-purple-500/10 transition"
                    >
                      <img
                        src={skill.logo}
                        alt={`${skill.name} logo`}
                        loading="lazy"
                        className="w-4 h-4 sm:w-6 sm:h-6 object-contain"
                      />
                      <span className="text-xs sm:text-sm text-gray-300 truncate max-w-[90px] sm:max-w-none">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardWrapper>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;