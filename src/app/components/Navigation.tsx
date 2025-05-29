'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Info, Briefcase, Mail } from 'lucide-react';
import { Menu } from './icons/MenuIcon';
import { X } from './icons/X';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // md breakpoint
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { href: '/', label: 'HOME', icon: Home },
    { href: '/about', label: 'ABOUT', icon: Info },
    { href: '/works', label: 'WORKS', icon: Briefcase },
    { href: '/contact', label: 'CONTACT', icon: Mail },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const linkVariants = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <nav className="fixed w-full flex justify-between items-center px-4 sm:px-8 py-3 z-50 bg-white h-[80px]">
      {/* Logo */}
      <Link href="/" className="relative w-12 h-12 ml-4 sm:ml-8 z-50">
        <Image src={'/logo.svg'} alt="Logo" fill priority className="object-contain scale-[2]" />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-4 sm:gap-8 text-sm mr-8 sm:mr-16">
        {navLinks.map(({ href, label }) => (
          <div key={href} className="relative group">
            <Link
              href={href}
              className={`${pathname === href ? 'font-bold scale-105' : 'opacity-70'} hover:opacity-100 hover:scale-105 transition-all duration-300 ease-out block`}
            >
              {label}
            </Link>
            {pathname === href && (
              <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-none animate-fadeIn">
                •
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden block z-50 mr-4 relative w-8 h-8"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Menu size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-40 pt-[80px]"
            style={{ height: '100vh' }}
          >
            <motion.div
              className="h-full flex flex-col"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <div className="flex-1 flex flex-col justify-center overflow-y-auto py-8">
                <div className="space-y-12 w-full flex flex-col items-center px-4">
                  {navLinks.map(({ href, label, icon: Icon }) => (
                    <motion.div
                      key={href}
                      variants={linkVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full text-center"
                    >
                      <Link
                        href={href}
                        className="flex items-center justify-center gap-4 text-3xl font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon size={30} />
                        <span className={pathname === href ? 'font-extrabold' : ''}>{label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
