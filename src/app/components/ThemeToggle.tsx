'use client';

import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

type Theme = 'light' | 'dark';

const systemTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

/**
 * Follows the system appearance until the visitor chooses; then remembers the choice.
 * (A toggle is a deliberate addition: Apple's HIG prefers system-only appearance.)
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  // Read the effective theme after mount so server and client markup match.
  useEffect(() => {
    const saved = document.documentElement.dataset.theme as Theme | undefined;
    setTheme(saved ?? systemTheme());
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage unavailable: the choice just won't persist */
    }
  };

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex h-11 w-11 items-center justify-center text-lg text-secondary transition-colors hover:text-label"
    >
      {theme && (isDark ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />)}
    </button>
  );
}
