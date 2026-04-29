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
// Controls the cinematic sequence: Intro → Hero → Content
// ─────────────────────────────────────────────────────────

type SequencePhase =
  | "intro"       // Logo intro is playing
  | "transition"  // Brief pause between intro and hero
  | "hero"        // Hero drift animation is playing
  | "complete";   // All animations done, site is static

interface AnimationSequenceContextType {
  phase: SequencePhase;
  introNeeded: boolean;  // Whether the intro should play this session
  introStarted: boolean; // Signal to Hero to start preloading
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

  // On mount or path change, check if intro should play
  useEffect(() => {
    if (typeof window === "undefined") return;

    // We only trigger animations on the root page
    if (pathname !== "/") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIntroNeeded(false);
      setPhase("complete");
      setIntroStarted(false);
      return;
    }

    try {
      const hasSeen = sessionStorage.getItem("carrera-intro-seen");
      if (!hasSeen) {
        setIntroNeeded(true);
        setPhase("intro");
        setIntroStarted(false);
      } else {
        // If we returned to home after seeing the intro once, 
        // we still play the Hero drift for the boutique experience.
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

  // Called by IntroAnimation when it finishes
  const signalIntroComplete = useCallback(() => {
    try {
      sessionStorage.setItem("carrera-intro-seen", "true");
    } catch {}

    // Transition phase: brief elegant pause
    setPhase("transition");
    setTimeout(() => {
      setPhase("hero");
    }, 600); // Elegant gap between intro and hero
  }, []);

  // Called by HeroAnimation when it finishes
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
