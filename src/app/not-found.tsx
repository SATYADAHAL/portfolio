import Link from 'next/link';
import Navigation from './components/Navigation';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex flex-1 flex-col items-center justify-center px-5 pb-16 pt-32 text-center">
        <p className="rise font-mono text-sm text-secondary">404</p>
        <h1 className="rise mt-2 text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.05] tracking-[-0.035em]">
          Page not found.
        </h1>
        <p className="rise mt-4 max-w-md text-xl text-secondary" style={{ animationDelay: '0.1s' }}>
          The page you&apos;re looking for doesn&apos;t exist, or has moved.
        </p>
        <Link href="/" className="btn btn-primary rise mt-8" style={{ animationDelay: '0.2s' }}>
          Back to home
        </Link>
      </main>
    </div>
  );
}
