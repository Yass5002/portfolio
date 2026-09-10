"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/lib/ThemeContext";

export function DarkModeToggle() {
  const { isDark, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className="theme-toggle-btn"
        aria-label="Toggle theme"
      >
        <span className="theme-toggle-icon">
          <FiSun size={19} />
        </span>
      </button>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={toggle}
      className="theme-toggle-btn"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "dark" : "light"}
          className="theme-toggle-icon"
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { rotate: -90, scale: 0.8, opacity: 0 }
          }
          animate={
            shouldReduceMotion
              ? { opacity: 1 }
              : { rotate: 0, scale: 1, opacity: 1 }
          }
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { rotate: 90, scale: 0.8, opacity: 0 }
          }
          transition={{
            duration: 0.22,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          {isDark ? <FiMoon size={18} /> : <FiSun size={19} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
