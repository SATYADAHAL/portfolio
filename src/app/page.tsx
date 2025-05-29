'use client';

import Navigation from './components/Navigation';
import ScrollChevron from './components/ScrollChevron';
import HeroContent from './components/HeroContent';
import Skills from './components/Skills';
import { motion } from 'framer-motion';

export default function Home() {
  return (

    <main className="min-h-screen bg-white relative overflow-hidden">
      <div className="bg-gradient"></div>
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32 flex flex-col">
          
          {/* Animated Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroContent />
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <Skills />

      {/* Skills Graph Section */}

      <ScrollChevron />
    </main>
  );
}
