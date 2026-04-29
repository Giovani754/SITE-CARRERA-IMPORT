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
  introStarted: boolean; // Whether the intro has actually begun its playback
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
      setIntroNeeded(false);
      setIntroStarted(false);
      setPhase("complete");
      return;
    }

    try {
      const hasSeen = sessionStorage.getItem("carrera-intro-seen");
      if (!hasSeen) {
        setIntroNeeded(true);
        setIntroStarted(false);
        setPhase("intro");
      } else {
        // If we returned to home after seeing the intro once, 
        // we might still want to play the Hero drift at least.
        setIntroNeeded(false);
        setIntroStarted(true); // Treat as started to allow hero preloading
        setPhase("hero");
      }
    } catch {
      setIntroNeeded(false);
      setIntroStarted(true);
      setPhase("hero");
    }
  }, [pathname]);

  // Called by IntroAnimation when it actually starts playing (buffer ready)
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
    }, 150); // Even faster transition for better flow
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
