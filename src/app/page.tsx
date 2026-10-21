import Navigation from './components/Navigation';
import HeroContent from './components/HeroContent';
import Skills from './components/Skills';

export default function Home() {
  return (
    <main>
      <Navigation />

      <section className="mx-auto max-w-6xl px-5 pb-8 pt-32 sm:px-8 sm:pt-40">
        <HeroContent />
      </section>

      <Skills />
    </main>
  );
}
