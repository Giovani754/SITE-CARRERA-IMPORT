"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  const [isPaused, setIsPaused] = React.useState(false);
  
  // Clone testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-32 md:py-52 bg-background relative overflow-hidden border-y border-white/[0.02]">
      {/* Cinematic Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-gold/[0.015] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-gold/[0.015] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 mb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-brand-gold text-[10px] uppercase tracking-[0.8em] font-bold mb-10 block opacity-50">
            CLIENTES QUE JÁ PASSARAM PELO PROCESSO
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic tracking-tight text-white/95 leading-[1.1]">
            Quem protege patrimônio não escolhe por acaso.
          </h2>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div 
        className="relative flex overflow-hidden py-10 group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div 
          className="flex whitespace-nowrap gap-8 px-4"
          animate={{ x: isPaused ? undefined : ["0%", "-50%"] }}
          transition={{ 
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 100,
              ease: "linear"
            }
          }}
        >
          {duplicatedTestimonials.map((testimonial, idx) => (
            <div
              key={`${testimonial.id}-${idx}`}
              className="w-[320px] md:w-[450px] bg-white/[0.02] border border-white/[0.05] p-8 md:p-12 rounded-2xl flex flex-col justify-between group/card hover:bg-white/[0.04] hover:border-brand-gold/20 transition-all duration-700"
            >
              <div className="mb-10">
                <div className="flex gap-1.5 mb-8">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={cn(
                        "transition-all duration-500",
                        i < testimonial.rating
                          ? "fill-brand-gold/40 text-brand-gold/40 group-hover/card:fill-brand-gold group-hover/card:text-brand-gold"
                          : "text-white/5"
                      )}
                    />
                  ))}
                </div>
                <blockquote className="text-white/60 text-[14px] md:text-base leading-[1.9] font-sans font-light group-hover/card:text-white/80 transition-colors duration-500 italic whitespace-normal line-clamp-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
              </div>

              <div className="flex items-center gap-5 pt-8 border-t border-white/[0.05]">
                <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold text-[11px] font-bold border border-brand-gold/20 shrink-0">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <cite className="text-sm font-medium text-white/90 not-italic block uppercase tracking-wider mb-0.5">
                    {testimonial.name}
                  </cite>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold block">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Gradient Fades for Marquee Edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>

      <div className="mt-16 flex justify-center">
        <span className="text-[9px] uppercase tracking-[0.5em] text-white/10 font-bold">
          Experiência Carrera Imports
        </span>
      </div>
    </section>
  );
}
