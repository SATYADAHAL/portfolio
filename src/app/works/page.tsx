'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiGnuemacs, SiJavascript, SiPython, SiRust } from 'react-icons/si';
import { GoStarFill } from 'react-icons/go';
import Navigation from '../components/Navigation';
import { withBasePath } from '../components/imagePath';

const projects = [
  {
    title: 'Termrex – Chrome Dino in Terminal',
    description:
      'A terminal-based endless runner game inspired by the Chrome Dino offline game. Players jump or duck to avoid obstacles in real-time with smooth ANSI/Unicode animations.',
    techStack: ['C++', 'ANSI/Unicode', 'Makefile', 'CLI Game'],
    images: [
      '/works/termrex/pic-1.png',
      '/works/termrex/pic-2.png',
      '/works/termrex/pic-3.png',
      '/works/termrex/pic-4.png',
    ],
    href: 'https://github.com/SATYADAHAL/termrex',
    repo: 'SATYADAHAL/termrex',
  },
  {
    title: 'Nepali Calendar (Plasmoid)',
    description:
      'A native KDE Plasma widget for the Bikram Sambat (BS) calendar. Built with QML and JavaScript, it features panel integration and manual month navigation with zero external API dependencies.',
    techStack: ['QML', 'JavaScript', 'KDE Plasma', 'Linux'],
    images: ['/works/calendar/pic-1.png', '/works/calendar/pic-2.png'],
    href: 'https://store.kde.org/p/2303034/',
    repo: 'SATYADAHAL/nepali-calendar',
  },

  {
    title: 'Picatu – Event Photo Finder',
    description:
      'A web app that helps event attendees find photos using facial recognition. I built core services in Flask and high-performance C++ modules with Dlib + CUDA and OpenCV for fast bulk face matching and real-time processing.',
    techStack: ['Flask', 'Dlib + CUDA', 'Microservices'],
    images: [
      '/works/picatu/pic-1.png',
      '/works/picatu/pic-2.png',
      '/works/picatu/pic-3.png',
      '/works/picatu/pic-4.png',
    ],
    // If no repo exists or stars are 0, it won't show
    repo: '',
  },
  {
    title: 'termiType – Typing Speed Test',
    description:
      'Developed a terminal-based typing speed test tool in C++ that calculates WPM, raw speed, accuracy, and confidence with real-time feedback in a classic ANSI interface.',
    techStack: ['C++', 'ANSI Escape Codes', 'Makefile', 'CLI Tool'],
    images: [
      '/works/termiType/pic-1.png',
      '/works/termiType/pic-2.png',
      '/works/termiType/pic-3.png',
      '/works/termiType/pic-4.png',
    ],
    href: 'https://github.com/SATYADAHAL/termiType',
    repo: 'SATYADAHAL/termiType',
  },
];

const openSourceContributions = [
  {
    title: 'rio (Terminal Emulator)',
    description:
      'Fixed a critical PTY reader panic caused by keyboard mode stack underflow when processing Kitty escape sequences.',
    href: 'https://github.com/raphamorim/rio/pull/1386',
    icon: <SiRust className="text-yellow-700 text-sm" />,
    tech: 'Rust / Terminal',
    bg: 'bg-orange-50',
    text: 'text-orange-700',
  },
  {
    title: 'python-ascii-magic',
    description:
      'Improved terminal output efficiency by optimizing color code writing, reducing file size by 1.68×.',
    href: 'https://github.com/LeandroBarone/python-ascii_magic/pull/14/commits/229f0632a1329723fe396cfd63cca516967bad8e',
    icon: <SiPython className="text-yellow-700 text-sm" />,
    tech: 'Python',
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
  },
  {
    title: 'emacs-dashboard',
    description: 'Fixed WebP image animations support by enhancing multi-frame detection.',
    href: 'https://github.com/emacs-dashboard/emacs-dashboard/commit/b6c268f0aa565263825be287359c4fcab6ee208e',
    icon: <SiGnuemacs className="text-gray-700 text-sm" />,
    tech: 'Emacs Lisp',
    bg: 'bg-gray-100',
    text: 'text-gray-700',
  },
  {
    title: 'mac-inline-battery',
    description: 'Fixed battery charge display bug where 0% charge showed as 100%.',
    href: 'https://github.com/0kzh/mac-inline-battery/issues/6',
    icon: <SiJavascript className="text-yellow-700 text-sm" />,
    tech: 'JavaScript / QML',
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
  },
];

function GitHubStars({ repo }: { repo?: string }) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    if (!repo) return;
    fetch(`https://api.github.com/repos/${repo}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count > 0) setStars(data.stargazers_count);
      })
      .catch((err) => console.error('Error fetching stars:', err));
  }, [repo]);

  if (stars === null) return null;

  return (
    <motion.a
      href={`https://github.com/${repo}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 hover:bg-amber-100 hover:border-amber-200 transition-colors group/star shrink-0"
    >
      <GoStarFill className="text-[10px] text-amber-500 group-hover/star:scale-110 transition-transform" />
      <span className="text-xs font-bold font-mono">{stars.toLocaleString()}</span>
    </motion.a>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const randomDuration = Math.floor(Math.random() * 3000) + 3500;

    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % project.images.length);
    }, randomDuration);

    return () => clearInterval(interval);
  }, [project.images.length]);

  // ... variants remain the same ...
  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? -300 : 300, opacity: 0 }),
  };

  const maxPreviewChars = 140;
  const isLong = project.description.length > maxPreviewChars;
  const shortDescription = project.description.slice(0, maxPreviewChars);

  const linkProps = project.href
    ? { href: project.href, target: '_blank', rel: 'noopener noreferrer' }
    : { href: '#' };

  return (
    <a {...linkProps} className="block group/card">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border border-gray-100 flex flex-col h-full">
        {/* 2. UPDATED: Image area is now purely for images (Stars removed from here) */}
        <div className="relative h-64 sm:h-72 md:h-56 lg:h-64 overflow-hidden bg-gray-100 border-b border-gray-100">
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

        {/* Content Area */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start gap-3 mb-3">
            <h3 className="text-xl font-bold text-gray-900 group-hover/card:text-indigo-600 transition-colors leading-tight">
              {project.title}
            </h3>

            {/* 3. UPDATED: Stars placed here, aligned with the title */}
            <div className="pt-0.5">
              <GitHubStars repo={project.repo} />
            </div>
          </div>

          <div className="flex-grow">
            <p className="text-gray-600 mb-3 text-sm leading-relaxed">
              {expanded || !isLong ? project.description : `${shortDescription}...`}
            </p>
            {isLong && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setExpanded((prev) => !prev);
                }}
                className="text-indigo-600 text-xs font-semibold hover:underline focus:outline-none"
              >
                {expanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>

          <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-gray-50">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-slate-50 text-slate-600 border border-slate-100 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm"
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
  // ... (keep your existing return logic)
  return (
    <main className="min-h-screen bg-slate-50/50">
      <Navigation />

      <div className="container mx-auto px-4 lg:px-8 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT SIDE: Projects */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Projects</h2>
              <div className="h-[1px] flex-grow bg-gray-200"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: Open Source Activity */}
          <aside className="lg:col-span-4">
            {/* ... (keep your existing open source sidebar) ... */}
            <div className="sticky top-32">
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Open Source</h3>
                <div className="h-[1px] flex-grow bg-gray-200"></div>
              </div>
              <div className="space-y-4">
                {openSourceContributions.map((contribution) => (
                  <motion.a
                    key={contribution.title}
                    href={contribution.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className="group block p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-1 p-2 rounded-lg ${contribution.bg} ${contribution.text}`}
                      >
                        {contribution.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 font-mono group-hover:text-indigo-600">
                          {contribution.title}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed line-clamp-2">
                          {contribution.description}
                        </p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
