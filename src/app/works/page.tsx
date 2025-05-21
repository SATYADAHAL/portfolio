'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../components/Navigation';

const projects = [
  {
    title: 'Automation Framework',
    description:
      'A Python-based automation framework for infrastructure management and deployment. Reduced deployment time by 70% and eliminated manual configuration errors.',
    techStack: ['Python', 'Docker', 'AWS'],
    images: [
      '/works/picatu/pic-1.png',
      '/works/picatu/pic-2.png',
      '/works/picatu/pic-3.png',
      '/works/picatu/pic-4.png',
    ],
  },
  {
    title: 'CI/CD Pipeline',
    description:
      'Implemented a comprehensive CI/CD pipeline using GitHub Actions and Docker, enabling automated testing and deployment for microservices architecture.',
    techStack: ['GitHub Actions', 'Docker', 'Kubernetes'],
    images: [
      'https://picsum.photos/seed/cicd1/600/300',
      'https://picsum.photos/seed/cicd2/600/300',
      'https://picsum.photos/seed/cicd3/600/300',
    ],
  },
];

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

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

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border border-gray-100">
      <div className="relative h-52 sm:h-64 md:h-48 lg:h-52 overflow-hidden">
        <AnimatePresence custom={direction} initial={false}>
          <motion.img
            key={project.images[index]}
            src={project.images[index]}
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
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4 text-sm">{project.description}</p>
        <div className="flex flex-wrap gap-2">
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
    </main>
  );
}
