'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { GoStarFill } from 'react-icons/go';
import { FiArrowUpRight } from 'react-icons/fi';
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
    tech: 'Rust / Terminal',
  },
  {
    title: 'python-ascii-magic',
    description:
      'Improved terminal output efficiency by optimizing color code writing, reducing file size by 1.68×.',
    href: 'https://github.com/LeandroBarone/python-ascii_magic/pull/14/commits/229f0632a1329723fe396cfd63cca516967bad8e',
    tech: 'Python',
  },
  {
    title: 'emacs-dashboard',
    description: 'Fixed WebP image animations support by enhancing multi-frame detection.',
    href: 'https://github.com/emacs-dashboard/emacs-dashboard/commit/b6c268f0aa565263825be287359c4fcab6ee208e',
    tech: 'Emacs Lisp',
  },
  {
    title: 'mac-inline-battery',
    description: 'Fixed battery charge display bug where 0% charge showed as 100%.',
    href: 'https://github.com/0kzh/mac-inline-battery/issues/6',
    tech: 'JavaScript / QML',
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
    <a
      href={`https://github.com/${repo}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${stars.toLocaleString()} GitHub stars`}
      className="flex shrink-0 items-center gap-1.5 rounded-full bg-fill px-2.5 py-1 text-xs text-secondary hover:text-label"
    >
      <GoStarFill aria-hidden="true" />
      <span>{stars.toLocaleString()}</span>
    </a>
  );
}

/** Native scroll-snap gallery: swipe, trackpad, or arrow keys. No timers. */
function Gallery({ images, title }: { images: string[]; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  return (
    <div className="relative">
      <div
        ref={ref}
        role="group"
        aria-label={`${title} screenshots`}
        tabIndex={0}
        onScroll={(e) => {
          const el = e.currentTarget;
          setCurrent(Math.round(el.scrollLeft / el.clientWidth));
        }}
        className="no-scrollbar flex aspect-[16/10] snap-x snap-mandatory overflow-x-auto bg-fill"
      >
        {images.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={withBasePath(src)}
            alt={`${title}, screenshot ${i + 1} of ${images.length}`}
            loading={i === 0 ? 'eager' : 'lazy'}
            className="h-full w-full shrink-0 snap-center object-cover object-top"
          />
        ))}
      </div>
      {images.length > 1 && (
        <div aria-hidden="true" className="absolute inset-x-0 bottom-3 flex justify-center">
          <div className="flex gap-1.5 rounded-full bg-black/40 px-2 py-1.5 backdrop-blur-md">
            {images.map((src, i) => (
              <span
                key={src}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === current ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <Gallery images={project.images} title={project.title} />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold leading-tight tracking-tight">
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-1 hover:text-accent"
              >
                {project.title}
                <FiArrowUpRight className="mt-1 shrink-0 text-secondary" aria-hidden="true" />
              </a>
            ) : (
              project.title
            )}
          </h3>
          <GitHubStars repo={project.repo} />
        </div>

        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-secondary">
          {project.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <li key={tech} className="rounded-full bg-fill px-3 py-1 text-xs text-secondary">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function OpenSourceCard({ c }: { c: (typeof openSourceContributions)[number] }) {
  return (
    <a
      href={c.href}
      target="_blank"
      rel="noopener noreferrer"
      className="card group flex h-full flex-col p-5 transition-colors hover:bg-fill"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-mono text-[15px] font-semibold leading-snug">{c.title}</h3>
        <FiArrowUpRight className="mt-0.5 shrink-0 text-secondary" aria-hidden="true" />
      </div>
      <p className="mt-2 flex-1 text-[15px] leading-snug text-secondary">{c.description}</p>
      <p className="mt-4 text-xs text-accent">{c.tech}</p>
    </a>
  );
}

export default function Works() {
  return (
    <main>
      <Navigation />

      <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        <h1 className="rise text-[clamp(2.25rem,6vw,3.5rem)] font-bold leading-tight tracking-[-0.03em]">
          Work.
        </h1>
        <p className="rise mt-2 text-xl text-secondary" style={{ animationDelay: '0.1s' }}>
          Things I&apos;ve built, and fixes I&apos;ve contributed to other people&apos;s projects.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Open source: a swipeable row on small screens, a sticky column on desktop. */}
          <aside aria-labelledby="open-source" className="order-first min-w-0 lg:order-last lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <h2 id="open-source" className="mb-4 text-2xl font-semibold tracking-tight">
                Open source
              </h2>
              <ul className="no-scrollbar -mx-5 flex scroll-px-5 sm:scroll-px-8 lg:scroll-px-0 snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:snap-none lg:gap-4 lg:overflow-visible lg:px-0">
                {openSourceContributions.map((c) => (
                  <li key={c.title} className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-auto">
                    <OpenSourceCard c={c} />
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <section aria-labelledby="projects" className="min-w-0 lg:col-span-8">
            <h2 id="projects" className="mb-4 text-2xl font-semibold tracking-tight">
              Projects
            </h2>
            <motion.ul
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {projects.map((project) => (
                <li key={project.title}>
                  <ProjectCard project={project} />
                </li>
              ))}
            </motion.ul>
          </section>
        </div>
      </div>
    </main>
  );
}
