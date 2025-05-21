import Image from 'next/image';
import Link from 'next/link';
import RightArrow from './icons/RightArrow';

export default function HeroContent() {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
      {/* Left Content */}
      <div className="max-w-2xl text-center lg:text-left">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-8 mt-4 text-gray-900">
          Software Engineer
          <br />
          & DevOps Specialist.
        </h1>
        <p className="text-base sm:text-lg mb-12 text-gray-800 leading-relaxed">
          Hi I&apos;m <b>Satya Pr. Dahal</b>. A passionate Software Developer with expertise in
          <br className="hidden sm:block" />
          Python, Docker, Linux, and Cloud Technologies.
        </p>

<div className="relative inline-block overflow-visible">
  <Link href="/works" className="relative z-10 inline-flex items-center py-4 max-w-fit">
    <span className="pl-14 pr-12 relative pointer-events-none">
      <span className="group inline-flex items-center pointer-events-auto">
        <span className="relative z-20 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] 
                      group-hover:translate-x-3 inline-flex items-center">
          SEE MY WORKS &nbsp;&nbsp;
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
      {/* Right Content - Hero Image */}
        <div className="relative w-full lg:w-auto">
        <div className="w-full h-[300px] sm:h-[400px] lg:w-[500px] lg:h-[500px] relative">
          <Image
            src="/hero.svg"
            alt="Hero illustration"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
