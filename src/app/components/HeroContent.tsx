import Image from 'next/image';
import Link from 'next/link';
import RightArrow from './icons/RightArrow';
/*import Clock from './clock';*/

export default function HeroContent() {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-8 md:gap-12 lg:gap-16 min-h-[500px]">
      {/* Left Content */}
      <div className="max-w-2xl flex-1 text-center lg:text-left">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-8 mt-4 text-gray-900">
          Software Engineer
          <br />&  Backend Developer

        </h1>
        <p className="text-base sm:text-lg mb-12 text-gray-800 leading-relaxed">
Hi I&apos;m <b>Satya Pr. Dahal</b>. I enjoy building backend systems, automating workflows, and solving real-world problems with code.
<br className="hidden sm:block" />
I care about writing clean, reliable software that makes things work better.

        </p>

        <div className="relative inline-block overflow-visible">
          <Link href="/works" className="relative z-10 inline-flex items-center py-4 max-w-fit">
            <span className="pl-14 pr-12 relative pointer-events-none">
              <span className="group inline-flex items-center pointer-events-auto">
                <span
                  className="relative z-20 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] 
                      group-hover:translate-x-3 inline-flex items-center"
                >
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
      <div className="flex-1 relative w-full lg:w-auto lg:min-w-[400px]">
        <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] lg:min-h-[500px] relative">
          <Image
            src="/hero-new.svg"
            alt="Hero Image"
            fill
            style={{
              objectFit: 'contain',
              objectPosition: 'center right',
            }}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </div>
  );
}
