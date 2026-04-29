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

type SequencePhase = "intro" | "content";

interface AnimationSequenceContextType {
  phase: SequencePhase;
  introNeeded: boolean;
  signalIntroComplete: () => void;
}

const AnimationSequenceContext = createContext<AnimationSequenceContextType>({
  phase: "content",
  introNeeded: false,
  signalIntroComplete: () => {},
});

export function useAnimationSequence() {
  return useContext(AnimationSequenceContext);
}

export function AnimationSequenceProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<SequencePhase>("content");
  const [introNeeded, setIntroNeeded] = useState(false);
  const pathname = usePathname();

  // Handle initialization and navigation
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (pathname !== "/") {
      setIntroNeeded(false);
      setPhase("content");
      return;
    }

    try {
      const hasSeen = sessionStorage.getItem("carrera-intro-seen");
      if (!hasSeen) {
        setIntroNeeded(true);
        setPhase("intro");
      } else {
        setIntroNeeded(false);
        setPhase("content");
      }
    } catch {
      setIntroNeeded(false);
      setPhase("content");
    }
  }, [pathname]);

  const signalIntroComplete = useCallback(() => {
    try {
      sessionStorage.setItem("carrera-intro-seen", "true");
    } catch {}
    setPhase("content");
  }, []);

  return (
    <AnimationSequenceContext.Provider
      value={{ 
        phase, 
        introNeeded, 
        signalIntroComplete 
      }}
    >
      {children}
    </AnimationSequenceContext.Provider>
  );
}

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
