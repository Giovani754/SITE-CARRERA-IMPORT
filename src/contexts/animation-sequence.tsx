"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

import { usePathname } from "next/navigation";

// ─────────────────────────────────────────────────────────
// Animation Sequence Context
// Controls the cinematic sequence: Intro → Content
// ─────────────────────────────────────────────────────────

type SequencePhase =
  | "intro"       // Logo intro is playing
  | "transition"  // Brief pause between intro and hero
  | "hero"        // Hero drift animation is playing
  | "complete";   // All animations done, site is static

interface AnimationSequenceContextType {
  phase: SequencePhase;
  introNeeded: boolean;
  introStarted: boolean; 
  signalIntroStarted: () => void;
  signalIntroComplete: () => void;
  signalHeroComplete: () => void;
}

const AnimationSequenceContext = createContext<AnimationSequenceContextType>({
  phase: "complete",
  introNeeded: false,
  introStarted: false,
  signalIntroStarted: () => {},
  signalIntroComplete: () => {},
  signalHeroComplete: () => {},
});

export function useAnimationSequence() {
  return useContext(AnimationSequenceContext);
}

export function AnimationSequenceProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<SequencePhase>("complete");
  const [introNeeded, setIntroNeeded] = useState(false);
  const [introStarted, setIntroStarted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (pathname !== "/") {
      setIntroNeeded(false);
      setIntroStarted(false);
      setPhase("complete");
      return;
    }

    try {
      const hasSeen = sessionStorage.getItem("carrera-intro-seen");
      if (!hasSeen) {
        setIntroNeeded(true);
        setPhase("intro");
        setIntroStarted(false);
      } else {
        setIntroNeeded(false);
        setPhase("hero");
        setIntroStarted(true);
      }
    } catch {
      setIntroNeeded(false);
      setPhase("hero");
      setIntroStarted(true);
    }
  }, [pathname]);

  const signalIntroStarted = useCallback(() => {
    setIntroStarted(true);
  }, []);

  const signalIntroComplete = useCallback(() => {
    try {
      sessionStorage.setItem("carrera-intro-seen", "true");
    } catch {}

    setPhase("transition");
    const t = setTimeout(() => {
      setPhase("hero");
    }, 150);
    return () => clearTimeout(t);
  }, []);

  const signalHeroComplete = useCallback(() => {
    setPhase("complete");
  }, []);

  return (
    <AnimationSequenceContext.Provider
      value={{ 
        phase, 
        introNeeded, 
        introStarted,
        signalIntroStarted,
        signalIntroComplete, 
        signalHeroComplete 
      }}
    >
      {children}
    </AnimationSequenceContext.Provider>
  );
}
