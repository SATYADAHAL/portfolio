'use client';
import RightArrow from '../components/icons/RightArrow';
import Navigation from '../components/Navigation';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';
import { IconType } from 'react-icons';
import Image from 'next/image';
import { FaLinux, FaPython, FaDocker } from 'react-icons/fa';
import { withBasePath } from '../components/imagePath';
import {
  SiUbuntu,
  SiDebian,
  SiArchlinux,
  SiFedora,
  SiKalilinux,
  SiGnometerminal,
  SiFlask,
  SiFastapi,
  SiDjango,
  SiNumpy,
} from 'react-icons/si';
import { SiGnuemacs } from 'react-icons/si';
import { SiNvidia } from 'react-icons/si';
import { SiScrapy } from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { FaServer } from 'react-icons/fa';
import { FaNetworkWired } from 'react-icons/fa6';
import { AiOutlineLineChart } from 'react-icons/ai';
import { VscServerProcess } from 'react-icons/vsc';
import { SiLlvm } from 'react-icons/si';

const skillIcons: Record<string, IconType> = {
  Linux: FaLinux,
  'Kali Linux': SiKalilinux,
  Ubuntu: SiUbuntu,
  Debian: SiDebian,
  Manjaro: SiArchlinux,
  'Arch Linux': SiArchlinux,
  Fedora: SiFedora,
  Emacs: SiGnuemacs,
  Elisp: SiGnuemacs,
  CUDA: SiNvidia,
  Docker: FaDocker,
  Python: FaPython,
  SSH: SiGnometerminal,
  Flask: SiFlask,
  FastAPI: SiFastapi,
  Django: SiDjango,
  NumPy: SiNumpy,
  Matplotlib: AiOutlineLineChart,
  'Web Scraping': SiScrapy,
  'Web APIs': TbApi,
  'Server Setup': FaServer,
  Networking: FaNetworkWired,
  'LSP Servers': VscServerProcess,
  Clangd: SiLlvm,
};

const character = {
  name: 'Satya Pr. Dahal',
  title: 'Sofware Engineer & Inquisitive Explorer',
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
I bring strong Linux expertise with hands-on experience in system troubleshooting, shell scripting, and network configuration to ensure stable and secure environments.
As a backend developer, I design and build RESTful APIs using Python frameworks like FastAPI and django, focusing on clean, maintainable code and scalable microservice architectures.
I work extensively with PostgreSQL,MySQL, SQLAlchemy for robust database design and efficient data handling.
I develop scalable web scraping solutions using Scrapy and Selenium that handle dynamic content, JavaScript rendering, and anti-bot mechanisms.
I automate workflows and containerize applications with Docker, improving deployment consistency and operational efficiency.
I collaborate effectively in team environments, following best practices for code management and continuous integration.
My approach combines backend development, automation, and system administration to deliver practical, reliable, and maintainable solutions.
`;

type JourneySection = {
  title: string;
  description: string;
  skillsHighlighted: string[];
};

interface AnimatedCardProps {
  section: JourneySection;
  index: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ section, index }) => {
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
        <Image
          src={withBasePath('/ping2.png')}
          alt="Push pin"
          fill
          className="object-contain w-full h-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]"
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
    <main className="min-h-screen overflow-x-hidden">
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
              src={withBasePath(character.avatar)}
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
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <p className="text-gray-600 text-lg leading-relaxed">{aboutText}</p>
        </motion.div>
      </section>

      {/* Timeline Journey */}
      {/* Timeline Journey */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">My Journey</h2>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 to-indigo-200 rounded-full z-0" />

          <div className="space-y-16 relative z-10">
            {journeySections.map((section, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`flex md:justify-${isLeft ? 'start' : 'end'} relative ${
                    isLeft ? 'pr-12' : 'pl-12'
                  }`} // padding so cards don't get too close to the timeline line
                >
                  {/* Number badge */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white border-4 border-blue-500 rounded-full w-10 h-10 items-center justify-center font-semibold text-blue-600 z-20 shadow-md">
                    {index + 1}
                  </div>

                  {/* Removed connector arrows */}

                  <AnimatedCard section={section} index={index} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="flex justify-center mb-2">
        <div className="relative inline-block overflow-visible">
          <Link href="/contact" className="relative z-10 inline-flex items-center py-4 max-w-fit">
            <span className="pl-14 pr-12 relative pointer-events-none">
              <span className="group inline-flex items-center pointer-events-auto">
                <span
                  className="relative z-20 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] 
                        group-hover:translate-x-3 inline-flex items-center"
                >
                  Lets Work together &nbsp;&nbsp;
                  <RightArrow className="w-12 h-5" />
                </span>
                <span
                  className="absolute left-[25px] top-1/2 h-12 w-12 bg-gray-200 rounded-full z-0
                      -translate-y-1/2 origin-left
                      transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]
                      group-hover:w-[calc(100%-3rem)] 
                      group-hover:translate-x-3
                      group-hover:rounded-[1.5rem]"
                />
              </span>
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
