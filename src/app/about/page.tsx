'use client';
import Navigation from '../components/Navigation';
import { motion } from 'framer-motion';
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
As a backend developer, I design and build RESTful APIs using Python frameworks like FastAPI and Django, focusing on clean, maintainable code and scalable microservice architectures.
I work extensively with PostgreSQL, MySQL, and SQLAlchemy for robust database design and efficient data handling.
I develop scalable web scraping solutions using Scrapy and Selenium that handle dynamic content, JavaScript rendering, and anti-bot mechanisms.
I automate workflows and containerize applications with Docker, improving deployment consistency and operational efficiency.
I collaborate effectively in team environments, following best practices for code management and continuous integration.
My approach combines backend development, automation, and system administration to deliver practical, reliable, and maintainable solutions.
`;

const aboutLines = aboutText
  .split('\n')
  .map((l) => l.trim())
  .filter(Boolean);
const [lede, ...aboutRest] = aboutLines;


const character = {
  name: 'Satya Pr. Dahal',
  title: 'Software engineer & inquisitive explorer',
  avatar: '/your-avatar.png',
};

type JourneySection = (typeof journeySections)[number];

function JourneyItem({ section }: { section: JourneySection }) {
  // "The Spark: From Hacking Curiosity to Linux Foundation" -> headline + subhead
  const [headline, ...rest] = section.title.split(': ');
  const subhead = rest.join(': ');

  return (
    <motion.li
      className="grid gap-4 border-t border-line py-10 md:grid-cols-[1fr_1.4fr] md:gap-12"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h3 className="text-2xl font-semibold tracking-tight">{headline}</h3>
        {subhead && <p className="mt-1 text-secondary">{subhead}</p>}
      </div>
      <div>
        <p className="leading-relaxed text-secondary">{section.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {section.skillsHighlighted.map((skill) => {
            const Icon = skillIcons[skill];
            return (
              <li
                key={skill}
                className="flex items-center gap-2 rounded-full bg-fill px-3 py-1.5 text-sm"
              >
                {Icon && <Icon className="text-secondary" aria-hidden="true" />}
                {skill}
              </li>
            );
          })}
        </ul>
      </div>
    </motion.li>
  );
}

export default function About() {
  return (
    <main>
      <Navigation />

      <section className="mx-auto max-w-6xl px-5 pt-32 sm:px-8 sm:pt-40">
        <div className="rise flex flex-col items-center text-center">
          <Image
            src={withBasePath(character.avatar)}
            alt={`Portrait of ${character.name}`}
            width={144}
            height={144}
            priority
            className="h-36 w-36 rounded-full object-cover ring-1 ring-line"
          />
          <h1 className="mt-8 text-[clamp(2.25rem,6vw,3.5rem)] font-bold leading-tight tracking-[-0.03em]">
            {character.name}
          </h1>
          <p className="mt-2 text-xl text-secondary">{character.title}</p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          <p className="text-balance text-2xl font-semibold leading-snug tracking-tight sm:text-[28px]">
            {lede}
          </p>
          <div className="mt-6 space-y-4 text-secondary">
            {aboutRest.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-8 pt-24 sm:px-8">
        <h2 className="mb-10 text-4xl font-bold tracking-[-0.03em] sm:text-5xl">My journey.</h2>
        <ol>
          {journeySections.map((section) => (
            <JourneyItem key={section.title} section={section} />
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 pt-8 text-center sm:px-8">
        <Link href="/contact" className="btn btn-primary">
          Let&apos;s work together
        </Link>
      </section>
    </main>
  );
}
