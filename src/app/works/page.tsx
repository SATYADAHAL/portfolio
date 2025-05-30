'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiGnuemacs } from "react-icons/si";
import { SiJavascript } from 'react-icons/si';
import { SiPython } from 'react-icons/si'; // import this along with other icons
import Navigation from '../components/Navigation';
import { withBasePath } from '../components/imagePath';



const projects = [
{
  title: 'Picatu – Face-Based Event Photo Finder',
  description:
    'A microservice backend app that helps event attendees find photos using facial recognition. I built core services in Flask and high-performance C++ modules with Dlib + CUDA and OpenCV for fast bulk face matching and real-time processing. The system supports photo uploads, secure token access, and reliable inter-service communication.',
  techStack: ['Flask', 'Dlib + CUDA', 'OpenCV', 'MySQL',  'Microservices'],
  images: [
    '/works/picatu/pic-1.png',
    '/works/picatu/pic-2.png',
    '/works/picatu/pic-3.png',
    '/works/picatu/pic-4.png',
  ],
}
  ,
{
  title: 'termiType – Terminal Typing Speed Test',
  description:
    'Developed a terminal-based typing speed test tool in C++ that calculates WPM, raw speed, accuracy, and confidence with real-time feedback in a classic ANSI interface.',
  techStack: ['C++', 'ANSI Escape Codes', 'Makefile','CLI Tool'],
  images: [
    '/works/termiType/pic-1.png',
    '/works/termiType/pic-2.png',
    '/works/termiType/pic-3.png',
    '/works/termiType/pic-4.png',
  ],
  href:"https://github.com/SATYADAHAL/termiType"
},

];

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % project.images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [project.images.length]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const maxPreviewChars = 140;
  const isLong = project.description.length > maxPreviewChars;
  const shortDescription = project.description.slice(0, maxPreviewChars);

  const linkProps = project.href
    ? { href: project.href, target: '_blank', rel: 'noopener noreferrer' }
    : { href: '#' };

  return (
    <a {...linkProps} className="block">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border border-gray-100">
        <div className="relative h-64 sm:h-72 md:h-56 lg:h-64 overflow-hidden">
          <AnimatePresence custom={direction} initial={false}>
            <motion.img
              key={project.images[index]}
              src={withBasePath(project.images[index])} 
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0 w-full h-full object-cover object-top"
              alt={`${project.title} screenshot`}
            />
          </AnimatePresence>
        </div>
        <div className="p-6 min-h-[200px] flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              {project.title}
            </h3>
            <p className="text-gray-600 mb-2 text-sm">
              {expanded || !isLong ? project.description : `${shortDescription}...`}
            </p>
            {isLong && (
              <button
                onClick={(e) => {
                  e.preventDefault(); // prevents anchor click from firing
                  setExpanded((prev) => !prev);
                }}
                className="text-indigo-600 text-sm hover:underline focus:outline-none"
              >
                {expanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}

export default function Works() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Navigation />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center text-gray-900">
            My Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </div>


      {/* Open Source Contributions Section */}
<div className="mt-24 mb-5">
  <h3 className="text-3xl font-semibold text-gray-800 text-center mb-8">
    Open Source Contributions
  </h3>
  <div className="flex flex-wrap justify-center gap-6">

    
<div className="bg-white border border-gray-100 rounded-2xl shadow-md p-6 w-full sm:w-[300px] hover:shadow-lg transition">
  <h4 className="text-xl font-semibold text-gray-900 mb-2">
    <a
      href="https://github.com/LeandroBarone/python-ascii_magic/pull/14/commits/229f0632a1329723fe396cfd63cca516967bad8e"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:underline"
    >
      python-ascii-magic
    </a>
  </h4>
  <p className="text-sm text-gray-600 mb-3">
    Improved terminal output efficiency by optimizing color code writing to avoid repeated codes, reducing file size by 1.68× when saving colored ASCII art.
  </p>
  <span className="inline-flex items-center gap-1 text-xs font-medium bg-yellow-50 text-yellow-700 px-2 py-1 rounded">
    <SiPython className="text-yellow-700 text-sm" />
    Python
  </span>
</div>

<div className="bg-white border border-gray-100 rounded-2xl shadow-md p-6 w-full sm:w-[300px] hover:shadow-lg transition">
  <h4 className="text-xl font-semibold text-gray-900 mb-2">
    <a
      href="https://github.com/emacs-dashboard/emacs-dashboard/commit/b6c268f0aa565263825be287359c4fcab6ee208e"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:underline"
    >
      emacs-dashboard
    </a>
  </h4>
  <p className="text-sm text-gray-600 mb-3">
    Fixed WebP image animations support by enhancing multi-frame detection and cleaning up related image handling functions.
  </p>
  <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded">
    <SiGnuemacs className="text-gray-700 text-sm" />
    Emacs Lisp
  </span>
</div>

<div className="bg-white border border-gray-100 rounded-2xl shadow-md p-6 w-full sm:w-[300px] hover:shadow-lg transition">
  <h4 className="text-xl font-semibold text-gray-900 mb-2">
    <a
      href="https://github.com/0kzh/mac-inline-battery/issues/6"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:underline"
    >
      mac-inline-battery
    </a>
  </h4>
  <p className="text-sm text-gray-600 mb-3">
    Fixed battery charge display bug where 0% charge showed as 100% and restored the red low-charge indicator in this QML and JavaScript project.
  </p>
  <span className="inline-flex items-center gap-1 text-xs font-medium bg-yellow-50 text-yellow-700 px-2 py-1 rounded">
    <SiJavascript className="text-yellow-700 text-sm" />
    JavaScript / QML
  </span>
</div>    

  </div>
</div>

    </main>
  );
}
