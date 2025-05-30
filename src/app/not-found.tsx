import Link from 'next/link';
import RightArrow from './components/icons/RightArrow';
import Image from 'next/image';
import Navigation from './components/Navigation';
import React from 'react';
import { withBasePath } from './components/imagePath';


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
            <Link href="/" className="relative z-10 inline-flex items-center py-4 max-w-fit">
              <span className="pl-14 pr-12 relative pointer-events-none">
                <span className="group inline-flex items-center pointer-events-auto">
                  <span
                    className="relative z-20 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] 
                               group-hover:-translate-x-3 inline-flex items-center"
                  >
                    <RightArrow className="w-12 h-5 rotate-180" />
                    Go Back &nbsp;&nbsp;
                  </span>

                  <span
                    className="absolute right-[25px] top-1/2 h-12 w-12 bg-gray-200 rounded-full z-0
                               -translate-y-1/2 origin-right
                               transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]
                               group-hover:w-[calc(100%-3rem)] 
                               group-hover:-translate-x-3
                               group-hover:rounded-[1.5rem]"
                  />
                </span>
              </span>
            </Link>
          </div>

          {/* Illustration - Adjusted for better mobile visibility */}
          <div className="md:w-[65%] flex justify-center md:justify-end w-full pt-6 md:pt-0 md:ml-8">
            <div className="md:relative md:-right-10 w-full max-w-[400px] md:max-w-none animate-fadeIn">
              <Image
                src={withBasePath('/hero-new.svg')}
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
