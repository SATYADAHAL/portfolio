import Link from 'next/link';
import Image from 'next/image';
import Navigation from './components/Navigation';
import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-8 py-8 sm:py-12 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center w-full max-w-6xl">
          {/* Text Content - Now with tighter spacing on mobile */}
          <div className="md:w-[35%] text-center md:text-left md:mr-16 flex flex-col items-center justify-center">
            <h1 className="text-[8rem] xs:text-[10rem] sm:text-[12rem] leading-[0.8] font-bold text-black mb-2 sm:mb-4 animate-fadeIn">
              404
            </h1>
            <p className="text-2xl sm:text-3xl font-extrabold text-black-600 mb-4 sm:mb-6 animate-fadeIn">
              page not found
            </p>
            <p className="text-gray-500 mb-6 sm:mb-8 max-w-md text-center md:text-left animate-fadeIn">
              The page you are looking for doesn&apos;t exist.
            </p>
            <Link
              href="/"
              className="text-black font-semibold flex items-center text-lg sm:text-xl group transition-colors duration-300 ease-out hover:text-gray-600 animate-fadeIn"
            >
              <span className="relative flex items-center">
                <span className="absolute right-0 bottom-0 bg-gray-200 rounded-full w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center transform translate-y-4 sm:translate-y-5 translate-x-1 sm:translate-x-1.4"></span>
                <span className="relative z-10 ml-2">GO&nbsp;</span>
              </span>
              <span className="ml-2 sm:ml-3 font-semibold flex items-center">
                BACK
                <span className="font-normal text-gray-500 ml-1 animate-bounce-up-down">
                  ⟵
                </span>
              </span>
            </Link>
          </div>

          {/* Illustration - Adjusted for better mobile visibility */}
          <div className="md:w-[65%] flex justify-center md:justify-end w-full pt-6 md:pt-0 md:ml-8">
            <div className="md:relative md:-right-10 w-full max-w-[400px] md:max-w-none animate-fadeIn">
              <Image
                src="/404-illustration.svg"
                alt="404 Illustration"
                width={600}
                height={600}
                className="w-full h-auto min-h-[280px] sm:min-h-[350px] md:min-h-[400px] object-contain"
                style={{ maxWidth: 'none' }}
                priority
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFoundPage;
