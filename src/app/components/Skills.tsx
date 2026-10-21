'use client';

import { skills } from '@/data/skills';
import { motion } from 'framer-motion';
import { container, cardItem } from '@/utils/animations';

export default function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="mb-12 text-center text-4xl font-bold tracking-[-0.03em] sm:text-5xl">
          What I work with.
        </h2>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -100px 0px' }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-6"
        >
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            // Two wide cards on top, three beneath: no orphan in the grid.
            const span = index < 2 ? 'sm:col-span-3' : 'sm:col-span-2';
            return (
              <motion.li key={skill.name} variants={cardItem} className={`card p-8 ${span}`}>
                <Icon className="mb-6 text-4xl text-label" aria-hidden="true" />
                <h3 className="mb-2 text-2xl font-semibold tracking-tight">{skill.name}</h3>
                <p className="text-base leading-snug text-secondary">{skill.description}</p>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
