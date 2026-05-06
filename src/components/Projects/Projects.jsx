import React, { useState, useEffect } from "react";
import { projects } from "../../constants";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Prevent background scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProject]);

  return (
    <section
      id="projects"
      className="py-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans relative"
    >
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">PROJECTS</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          A showcase of my projects, highlighting skills and real-world
          implementations
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects?.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedProject(project);
              }
            }}
            role="button"
            tabIndex={0}
            className="group border border-white/10 bg-white/5 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden cursor-pointer transition duration-300 hover:-translate-y-2 hover:shadow-purple-500/40"
          >
            {/* Image */}
            <div className="p-4">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-48 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                {project.title}
              </h3>

              <p className="text-gray-400 text-sm line-clamp-3">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags?.map((tag, i) => (
                  <span
                    key={`${tag}-${i}`}
                    className="bg-purple-600/20 text-purple-400 text-xs px-2 py-1 rounded-md border border-purple-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-3xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500
    text-white text-sm shadow-md shadow-purple-500/40 hover:scale-110 hover:shadow-pink-500/50 transition-all duration-300"
            >
              ✕
            </button>

            {/* Image */}
            <div className="p-4 flex justify-center">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full max-h-[400px] object-contain rounded-lg"
              />
            </div>

            {/* Details */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-3">
                {selectedProject.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {selectedProject.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags?.map((tag, i) => (
                  <span
                    key={`${tag}-${i}`}
                    className="bg-purple-600/20 text-purple-400 text-xs px-2 py-1 rounded-md border border-purple-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-800 hover:bg-purple-700 text-gray-300 py-2 rounded-lg text-sm font-semibold text-center transition"
                  >
                    View Code
                  </a>
                )}
                {selectedProject.webapp && (
                  <a
                    href={selectedProject.webapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-purple-600 hover:bg-purple-800 text-white py-2 rounded-lg text-sm font-semibold text-center transition"
                  >
                    View Live
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
