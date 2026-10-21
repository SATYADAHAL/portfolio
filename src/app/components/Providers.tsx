'use client';

import { MotionConfig } from 'framer-motion';

// Respect the system Reduce Motion setting for every framer-motion animation.
export default function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
