//Current Portfolio UI

import React, { Suspense, lazy } from "react";
import Navbar from "../components/Navbar/Navbar";
import BlurBlob from "../BlurBlob";
import { ErrorBoundary } from 'react-error-boundary';


// Lazy load heavy sections (performance boost)
const About = lazy(() => import("../components/About/About"));
const Skills = lazy(() => import("../components/Skills/Skills"));
const Experience = lazy(() => import("../components/Experience/Experience"));
const Projects = lazy(() => import("../components/Projects/Projects"));
const Education = lazy(() => import("../components/Education/Education"));
const Certifications = lazy(() => import("../components/Certifications/Certifications"));
const Contact = lazy(() => import("../components/Contact/Contact"));
const Footer = lazy(() => import("../components/Footer/Footer"));

const Home = () => {
  return (
    <div className="relative bg-[#050414] text-white overflow-x-hidden">

      {/* Background Blobs (multi-layer for depth) */}
      <BlurBlob
        position={{ top: "25%", left: "15%" }}
        size={{ width: "400px", height: "400px" }}
      />
      <BlurBlob
        position={{ top: "70%", left: "80%" }}
        size={{ width: "300px", height: "300px" }}
        color="bg-pink-500"
        opacity="opacity-20"
      />

      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0 
        bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),
        linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]
        bg-[size:20px_30px]
        [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)]"
      />

      {/* Main Content */}
      <div className="relative z-10 pt-20">

        <Navbar />

        {/* Suspense for lazy loading */}
        <ErrorBoundary fallback={<div className="text-center py-20">Something went wrong. Please refresh.</div>}>
        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Certifications />
          <Contact />
          <Footer />
        </Suspense>
        </ErrorBoundary>

      </div>
    </div>
  );
};

export default Home;