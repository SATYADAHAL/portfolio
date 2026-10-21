import Link from 'next/link';

const terminalLines = [
  { prompt: true, text: 'whoami' },
  { text: 'satya. backend engineer, Pokhara, Nepal' },
  { prompt: true, text: 'stack' },
  { text: 'Python · FastAPI · Django · Docker · Linux' },
  { prompt: true, text: 'ls projects/' },
  { text: 'termrex  nepali-calendar  picatu  termiType' },
];

export default function HeroContent() {
  return (
    <div className="text-center">
      <h1 className="rise text-balance text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.05] tracking-[-0.035em]">
        Software engineer
        <br />
        &amp; backend developer.
      </h1>
      <p
        className="rise mx-auto mt-6 max-w-xl text-balance text-xl leading-snug text-secondary"
        style={{ animationDelay: '0.1s' }}
      >
        I&apos;m Satya Pr. Dahal. I build backend systems, automate workflows, and write clean,
        reliable software that makes things work better.
      </p>

      <div
        className="rise mt-8 flex flex-wrap items-center justify-center gap-3"
        style={{ animationDelay: '0.2s' }}
      >
        <Link href="/works" className="btn btn-primary">
          See my work
        </Link>
        <Link href="/contact" className="btn btn-text">
          Get in touch &rsaquo;
        </Link>
      </div>

      {/* Signature: a terminal window. Always dark, like the real thing. */}
      <figure
        className="rise mx-auto mt-16 max-w-2xl overflow-hidden rounded-2xl bg-[#1c1c1e] text-left shadow-[0_20px_60px_-20px_rgb(0_0_0/0.45)] ring-1 ring-white/10"
        style={{ animationDelay: '0.3s' }}
      >
        <div className="flex items-center gap-2 px-4 py-3" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <pre className="whitespace-pre-wrap break-words px-5 pb-6 pt-1 font-mono text-[13px] leading-7 text-[#f5f5f7] sm:text-sm">
          {terminalLines.map((line, i) => (
            <div key={i} className={line.prompt ? 'mt-2 first:mt-0' : 'text-[#a1a1a6]'}>
              {line.prompt && <span className="text-[#28c840]">~ $ </span>}
              {line.text}
            </div>
          ))}
        </pre>
      </figure>
    </div>
  );
}
