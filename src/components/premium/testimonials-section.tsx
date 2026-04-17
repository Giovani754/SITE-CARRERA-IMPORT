"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 md:py-40 px-6 lg:px-12 bg-[#050505] relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-gold/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-brand-gold text-[9px] uppercase tracking-[0.8em] font-medium mb-8 block opacity-50">
              Reputação
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif italic tracking-tight text-white/90 leading-[1.05]">
              Quem confiou, <br className="hidden md:block" /> recomenda a Carrera
            </h2>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center text-white/40 hover:text-brand-gold hover:border-brand-gold/30 transition-all group"
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center text-white/40 hover:text-brand-gold hover:border-brand-gold/30 transition-all group"
            >
              <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </header>

        {/* Testimonials Container - Horizontal scroll on ALL screens */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-12 no-scrollbar snap-x snap-mandatory scroll-smooth"
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: (idx % 3) * 0.1,
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="min-w-[300px] md:min-w-[400px] lg:min-w-[420px] snap-center bg-[#080808] p-10 lg:p-14 relative group hover:bg-[#0A0A0A] transition-colors duration-700 border border-white/5 rounded-sm"
            >
              <div className="relative z-10">
                <Quote
                  size={20}
                  className="text-brand-gold/20 mb-8 group-hover:text-brand-gold/40 transition-all duration-700"
                />

                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={10}
                      className={cn(
                        "transition-all duration-500",
                        i < testimonial.rating
                          ? "fill-brand-gold/60 text-brand-gold/60 group-hover:fill-brand-gold group-hover:text-brand-gold"
                          : "text-white/5"
                      )}
                    />
                  ))}
                </div>

                <blockquote className="text-white/60 text-[13px] leading-[1.8] font-sans font-light mb-10 group-hover:text-white/80 transition-colors duration-500 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <footer className="flex items-center gap-4 pt-8 border-t border-white/5 mt-auto">
                  <div className="w-9 h-9 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold text-[10px] font-bold border border-brand-gold/20">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <cite className="text-xs font-medium text-white/80 not-italic block uppercase tracking-wider">
                      {testimonial.name}
                    </cite>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/20 font-bold">
                      {testimonial.role}
                    </span>
                  </div>
                </footer>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-brand-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </motion.div>
          ))}
        </div>

        {/* Mobile Info */}
        <div className="mt-8 flex justify-center lg:hidden">
          <span className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-bold animate-pulse">
            Deslize para navegar
          </span>
        </div>
      </div>
    </section>
  );
}
