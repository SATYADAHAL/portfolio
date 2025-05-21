'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 border-t border-gray-200 py-4">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm">
        {/* Logo or Name */}
        <div className="text-center md:text-left mb-3 md:mb-0">
          <h2 className="text-lg font-semibold text-gray-900">Satya Pr. Dahal</h2>
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-4">
          <Link href="/about" className="hover:text-gray-900 transition-colors">About</Link>
          <Link href="/works" className="hover:text-gray-900 transition-colors">Works</Link>
          <Link href="/contact" className="hover:text-gray-900 transition-colors">Contact</Link>
        </nav>

        {/* Social Media Icons */}
        <div className="flex gap-4 mt-3 md:mt-0">
          <Link href="https://github.com/satyadahal" className="text-gray-500 hover:text-gray-900 transition-colors">
            <FaGithub className="text-lg" />
          </Link>
          <Link href="https://linkedin.com/in/satya-prakash-dahal" className="text-gray-500 hover:text-gray-900 transition-colors">
            <FaLinkedin className="text-lg" />
          </Link>
          <Link href="https://twitter.com" className="text-gray-500 hover:text-gray-900 transition-colors">
            <FaTwitter className="text-lg" />
          </Link>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="text-center text-xs text-gray-500 mt-2">
        &copy; {new Date().getFullYear()} Satya Pr. Dahal. All rights reserved.
      </div>
    </footer>
  );
}
