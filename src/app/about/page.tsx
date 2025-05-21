'use client';

import { React, useRef } from 'react';
import Navigation from '../components/Navigation';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaLinux, FaPython, FaDocker } from 'react-icons/fa';
import {
  SiUbuntu,
  SiDebian,
  SiArchlinux,
  SiFedora,
  SiKaliLinux,
  SiEmacs,
  SiCuda,
  Ssh,
  SiFlask,
  SiFastapi,
  SiDjango,
  SiNumpy,
  SiMatplotlib,
} from 'react-icons/si';

const skillIcons = {
  Linux: FaLinux,
  'Kali Linux': SiKaliLinux,
  Ubuntu: SiUbuntu,
  Debian: SiDebian,
  Manjaro: SiArchlinux,
  'Arch Linux': SiArchlinux,
  Fedora: SiFedora,
  Emacs: SiEmacs,
  Elisp: SiEmacs,
  CUDA: SiCuda,
  Docker: FaDocker,
  Python: FaPython,
  SSH: Ssh,
  Flask: SiFlask,
  FastAPI: SiFastapi,
  Django: SiDjango,
  NumPy: SiNumpy,
  Matplotlib: SiMatplotlib,
};

const character = {
  name: 'Satya Pr. Dahal',
  title: 'DevOps Dynamo & Inquisitive Explorer',
  avatar: '/your-avatar.png',
};

const journeySections = [
  {
    title: 'The Spark: From Hacking Curiosity to Linux Foundation',
    description:
      'My initial foray into technology was driven by a curiosity about system security, which unexpectedly unveiled the power and flexibility of the Linux operating system, laying the groundwork for my deeper exploration.',
    skillsHighlighted: ['Linux'],
  },
  {
    title: 'Distribution Voyager: Navigating the Linux Landscape',
    description:
      "Driven by a desire to understand the diverse Linux ecosystem, I embarked on a 'distro-hopping' adventure, experiencing the unique flavors of Kali Linux, Ubuntu, Debian, Manjaro, Arch, and Fedora, gaining insights into different system philosophies and package management.",
    skillsHighlighted: ['Kali Linux', 'Ubuntu', 'Debian', 'Manjaro', 'Arch Linux', 'Fedora'],
  },
  {
    title: 'Emacs & IDE Alchemy: Text and Tools Mastery',
    description:
      'Seeking ultimate control over my development environment, I delved into the highly customizable world of Emacs, even scratching the surface of Elisp for configuration. This pursuit of efficiency extended to configuring development tools like clangd and LSP servers to build personalized IDEs.',
    skillsHighlighted: ['Emacs', 'Elisp', 'Clangd', 'LSP Servers'],
  },
  {
    title: 'GPU Power & Containerization: Unleashing Parallelism',
    description:
      'Venturing into the realm of parallel computing, I successfully set up CUDA and Nvidia drivers and integrated them into Docker containers, harnessing the power of GPU acceleration for demanding computational tasks and ensuring reproducible environments.',
    skillsHighlighted: ['CUDA', 'Docker'],
  },
  {
    title: 'Pythonic Prowess: Web, Data, and Automation',
    description:
      'My Python journey has been extensive, leading me to build tools for web scraping, craft APIs using frameworks like Flask, FastAPI, and Django, and explore data analysis and visualization with libraries like NumPy and Matplotlib. This versatile skill set has been crucial in various projects.',
    skillsHighlighted: [
      'Python',
      'Flask',
      'FastAPI',
      'Django',
      'NumPy',
      'Matplotlib',
      'Web Scraping',
      'Web APIs',
    ],
  },
  {
    title: 'Server & Network Navigator: Building and Managing Infrastructure',
    description:
      "I've gained practical experience in server management, mastering SSH for secure remote access and configuring network settings, including firewalls and iptables, essential for deploying and maintaining applications.",
    skillsHighlighted: ['SSH', 'Server Setup', 'Networking'],
  },
];

const aboutText = `
I'm a curious developer with a passion for building purposeful digital experiences.
My journey includes working with technologies like FastAPI, Tailwind CSS, and MySQL, often combining them with modern frontend tools like Next.js.
From speech recognition systems to terminal-style interfaces, I love turning technical ideas into clean, functional UIs.
I'm also comfortable with tools like Docker, Conda, and version control systems, and I enjoy experimenting with AI and open source tools to extend my learning.
Whether it's for a portfolio, a hackathon, or a long-term project, I aim to build with intention, clarity, and a touch of creativity.
`;


const AnimatedCard = ({ section, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  return (
    <motion.div
      className={`relative w-full md:w-1/2 p-4 ${index % 2 === 0 ? 'md:pl-0 md:pr-8' : 'md:pr-0 md:pl-8'}`}
      initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      {/* Push pin SVG */}
      <div className="absolute top-5 -ml-1 w-10 h-10 z-20 md:left-1/2 md:-translate-x-1/2">
        <img
          src="/ping2.png"
          alt="Push pin"
          className="w-full h-full object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]"
          style={{ transform: 'translateY(-2px)' }}
        />
      </div>

      <motion.div
        className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 relative z-10 mt-2" // Added mt-2 for spacing
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000,
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - rect.left - rect.width / 2);
          y.set(e.clientY - rect.top - rect.height / 2);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">{section.title}</h3>
        <p className="text-gray-600 mb-6">{section.description}</p>
        <div className="flex flex-wrap gap-2">
          {section.skillsHighlighted.map((skill) => {
            const Icon = skillIcons[skill];
            return (
              <motion.span
                key={skill}
                className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm hover:bg-blue-100 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {Icon && <Icon className="mr-2 text-blue-600" />}
                <span className="text-gray-700">{skill}</span>
              </motion.span>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function About() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Animated Avatar Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="relative rounded-full overflow-hidden w-48 h-48 mx-auto shadow-2xl"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              src={character.avatar}
              alt="Avatar"
              layout="fill"
              objectFit="cover"
              className="hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
          <h1 className="mt-8 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            {character.name}
          </h1>
          <p className="mt-2 text-lg text-gray-600 font-medium">{character.title}</p>
        </motion.div>
      </section>

      {/* About Me Paragraph */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gray-600 text-lg leading-relaxed">
            {aboutText}
          </p>
        </motion.div>
      </section>

      {/* Timeline Journey */}
      <section className="container mx-auto px-4 sm:px-6 lg:px8 py-0">
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 w-1 h-full bg-gradient-to-b from-blue-200 to-indigo-200 rounded-full" />

          <div className="space-y-0 md:space-y-0">
            {journeySections.map((section, index) => (
              <div
                key={index}
                className={`flex ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}
              >
                <AnimatedCard section={section} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

