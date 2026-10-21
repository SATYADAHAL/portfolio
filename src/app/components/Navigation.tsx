'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/works', label: 'Work' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close the menu on Escape and when the viewport grows to desktop width.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    const onResize = () => window.innerWidth >= 768 && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 glass border-b border-line">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/"
          className="text-[17px] font-semibold tracking-tight"
          onClick={() => setIsOpen(false)}
        >
          Satya Dahal
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8 text-sm">
          {navLinks.map(({ href, label }) => {
            const current = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={current ? 'page' : undefined}
                  className={`py-2 transition-colors hover:text-label ${
                    current ? 'text-label font-medium' : 'text-secondary'
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
          <li className="-mr-3">
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile: theme toggle and menu button, 44 x 44 targets */}
        <div className="flex items-center md:hidden -mr-2">
          <ThemeToggle />
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((o) => !o)}
          >
            <span className="relative block h-3 w-[18px]">
              <span
                className={`absolute left-0 h-px w-full bg-label transition-all duration-300 ${
                  isOpen ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-label transition-all duration-300 ${
                  isOpen ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-0 top-14 bottom-0 bg-bg px-5"
          >
            <ul className="pt-4">
              {navLinks.map(({ href, label }) => (
                <li key={href} className="border-b border-line">
                  <Link
                    href={href}
                    aria-current={pathname === href ? 'page' : undefined}
                    onClick={() => setIsOpen(false)}
                    className={`block py-4 text-[28px] font-semibold tracking-tight ${
                      pathname === href ? 'text-label' : 'text-secondary'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
