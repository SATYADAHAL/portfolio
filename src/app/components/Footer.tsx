import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const social = [
  { href: 'https://github.com/satyadahal', label: 'GitHub', Icon: FaGithub },
  { href: 'https://www.linkedin.com/in/satya-prakash-dahal/', label: 'LinkedIn', Icon: FaLinkedin },
  { href: 'https://x.com/SatyaPrDahal', label: 'X', Icon: FaXTwitter },
];

export default function Footer() {
  return (
    <footer className="border-t border-line text-xs text-secondary">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
        <p>&copy; {new Date().getFullYear()} Satya Pr. Dahal. All rights reserved.</p>

        <nav aria-label="Footer" className="flex gap-6">
          <Link href="/about" className="hover:text-label">About</Link>
          <Link href="/works" className="hover:text-label">Work</Link>
          <Link href="/contact" className="hover:text-label">Contact</Link>
        </nav>

        <ul className="flex gap-1 -mx-3 md:mx-0">
          {social.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center hover:text-label"
              >
                <Icon className="text-lg" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
