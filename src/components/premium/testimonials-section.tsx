"use client";

import React from "react";
import { motion, useAnimation } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  const controls = useAnimation();
  const [isPaused, setIsPaused] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  // Detect mobile
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  // Clone testimonials - EVEN MORE AGGRESSIVE for mobile
  const displayTestimonials = React.useMemo(() => {
    // Mobile only needs enough to cover the screen twice. 
    // If we have 10 testimonials, 6-8 is plenty for mobile.
    const base = isMobile ? testimonials.slice(0, 6) : testimonials;
    return [...base, ...base];
  }, [isMobile]);

  const DURATION = isMobile ? 30 : 120;
  const marqueeDistance = "-50%";

  React.useEffect(() => {
    let isMounted = true;

    const startAnimation = () => {
      if (!isMounted) return;
      controls.start({
        x: marqueeDistance,
        transition: {
          duration: DURATION,
          ease: "linear",
          repeat: Infinity,
        },
      });
    };

    if (isPaused) {
      controls.stop();
    } else {
      startAnimation();
    }

    return () => {
      isMounted = false;
    };
  }, [isPaused, controls, DURATION, isMobile]);

  return (
    <section className="py-24 md:py-52 bg-background relative overflow-hidden border-y border-white/[0.02]">
      {/* Cinematic Ambient Glows - Optimized */}
      <div className="absolute top-0 left-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-brand-gold/[0.01] rounded-full blur-[80px] md:blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-brand-gold/[0.01] rounded-full blur-[80px] md:blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 mb-16 md:mb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-brand-gold text-[9px] md:text-[10px] uppercase tracking-[0.6em] md:tracking-[0.8em] font-bold mb-8 md:mb-10 block opacity-50">
            A EXPERIÊNCIA DOS NOSSOS CLIENTES
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif italic tracking-tight text-white/95 leading-[1.1] max-w-4xl mx-auto">
            Quem protege patrimônio não escolhe por acaso.
          </h2>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div 
        className="relative flex overflow-hidden py-10 touch-none md:touch-pan-x cursor-default"
        onMouseEnter={() => {
          if (!isMobile) setIsPaused(true);
        }}
        onMouseLeave={() => {
          if (!isMobile) setIsPaused(false);
        }}
        // Robust Mobile Interaction
        onTouchStart={() => {
          setIsPaused(true);
        }}
        onTouchEnd={() => {
          // Add a small delay for natural feeling
          setTimeout(() => setIsPaused(false), 200);
        }}
      >
        <motion.div 
          className="flex whitespace-nowrap gap-5 md:gap-10 px-4 will-change-transform"
          initial={{ x: "0%" }}
          animate={controls}
          // Extra safety for mobile: ensure it doesn't get stuck if touch cancels
          onTouchCancel={() => setIsPaused(false)}
        >
          {displayTestimonials.map((testimonial, idx) => (
            <motion.div
              key={`${testimonial.id}-${idx}`}
              whileTap={isMobile ? { scale: 0.98 } : {}}
              className="w-[260px] sm:w-[320px] md:w-[450px] bg-white/[0.02] border border-white/[0.05] p-6 md:p-12 rounded-2xl flex flex-col justify-between group/card hover:bg-white/[0.04] hover:border-brand-gold/20 transition-all duration-700"
            >
              <div className="mb-6 md:mb-10">
                <div className="flex gap-1.5 mb-5 md:mb-8">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={10}
                      className={cn(
                        "transition-all duration-500",
                        i < testimonial.rating
                          ? "fill-brand-gold/40 text-brand-gold/40 group-hover/card:fill-brand-gold group-hover/card:text-brand-gold"
                          : "text-white/5"
                      )}
                    />
                  ))}
                </div>
                <blockquote className="text-white/60 text-[12px] md:text-base leading-[1.7] md:leading-[1.9] font-sans font-light group-hover/card:text-white/80 transition-colors duration-500 italic whitespace-normal line-clamp-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
              </div>

              <div className="flex items-center gap-3 md:gap-5 pt-5 md:pt-8 border-t border-white/[0.05]">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold text-[9px] md:text-[11px] font-bold border border-brand-gold/20 shrink-0">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <cite className="text-[10px] md:text-sm font-medium text-white/90 not-italic block uppercase tracking-wider mb-0.5">
                    {testimonial.name}
                  </cite>
                  <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold block">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Gradient Fades */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />
      </div>

      <div className="mt-12 md:mt-16 flex justify-center">
        <span className="text-[8px] md:text-[9px] uppercase tracking-[0.5em] text-white/10 font-bold">
          Experiência Carrera Imports
        </span>
      </div>
    </section>
  );
}

