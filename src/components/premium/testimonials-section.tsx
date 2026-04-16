"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section className="py-24 md:py-40 px-6 lg:px-12 bg-[#050505] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-gold/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-20 text-center">
          <span className="text-brand-gold text-[9px] uppercase tracking-[0.8em] font-medium mb-8 block opacity-50">
            Reputação
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif italic tracking-tight text-white/90 leading-[1.05]">
            Quem confiou, recomenda
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-sm overflow-hidden">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: idx * 0.1,
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-[#080808] p-10 lg:p-14 relative group hover:bg-[#0C0C0C] transition-colors duration-700"
            >
              {/* Quote icon */}
              <Quote
                size={24}
                className="text-brand-gold/20 mb-8 group-hover:text-brand-gold/40 transition-colors duration-700"
              />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className="fill-brand-gold/60 text-brand-gold/60"
                  />
                ))}
              </div>

              <blockquote className="text-white/60 text-sm leading-[1.8] font-sans font-light mb-10 group-hover:text-white/70 transition-colors duration-500">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <footer className="flex items-center gap-4 pt-8 border-t border-white/5">
                {/* Avatar placeholder */}
                <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold text-xs font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <cite className="text-sm font-medium text-white/80 not-italic block">
                    {testimonial.name}
                  </cite>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">
                    {testimonial.role}
                  </span>
                </div>
              </footer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
