'use client';

import { skills } from '@/data/skills';
import { motion } from 'framer-motion';
import { container, cardItem } from '@/utils/animations';

export default function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900"
        >
          Skills
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 sm:gap-12"
        >
          {skills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <motion.div
                key={index}
                variants={cardItem}
                whileHover={{
                  y: -5,
                  scale: 1.05,
                  opacity: 0.95,
                  boxShadow: "0 25px 30px -5px rgb(0 0 0 / 0.12), 0 10px 15px -6px rgb(0 0 0 / 0.1)"
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <motion.div whileHover={{ scale: 1.1 }} className="flex justify-center mb-5">
                  <IconComponent className="text-5xl sm:text-6xl text-gray-900" />
                </motion.div>
                <h3 className="text-xl font-semibold text-center text-gray-900 mb-2">
                  {skill.name}
                </h3>
                <p className="text-center text-gray-700 leading-relaxed text-sm sm:text-base">
                  {skill.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
