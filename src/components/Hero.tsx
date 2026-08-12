"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function Hero({ onStart }: { onStart: () => void }) {
    return (
        <div className="w-full min-h-[calc(100vh-5rem)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center px-6 md:px-12 bg-[#064D2B] text-[#F3EED8] overflow-hidden relative">
            
            {/* Visual background noise overlay */}
            <div className="absolute inset-0 bg-[#064D2B] pointer-events-none z-0" />

            {/* Left Column: Typography & CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-center gap-6 md:gap-8 py-12 md:py-20 relative z-10">
                
                {/* Monospace prefix */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-2"
                >
                    <span className="w-1.5 h-1.5 bg-[#FF5E8C] inline-block rounded-full animate-pulse" />
                    <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-[#FF5E8C] uppercase font-bold">
                        // THIS IS YOUR
                    </span>
                </motion.div>

                {/* Huge Editorial Serif Heading */}
                <div className="flex flex-col">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="font-serif-display text-[12vw] sm:text-[8vw] lg:text-[6.5vw] font-black leading-[0.9] tracking-tight uppercase text-[#F4D600]"
                    >
                        HACKER
                    </motion.h1>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        className="font-serif-display text-[12vw] sm:text-[8vw] lg:text-[6.5vw] font-black leading-[0.9] tracking-tight uppercase text-[#F3EED8] mt-1"
                    >
                        HOUSE
                    </motion.h1>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="font-serif-display text-[12vw] sm:text-[8vw] lg:text-[6.5vw] font-black leading-[0.9] tracking-tight uppercase text-[#F3EED8]"
                    >
                        IDENTITY.
                    </motion.h1>
                </div>

                {/* Monospace description */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="font-mono text-xs md:text-sm text-[#F3EED8]/80 max-w-xl leading-relaxed whitespace-pre-line"
                >
                    Build your official Hacker House Goa 2026 Builder ID.
                    Pick your builder class, add your stack. Choose your format.
                    Make something that looks like you.
                </motion.p>

                {/* Split CTA buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-4"
                >
                    <button
                        onClick={onStart}
                        className="bg-[#F4D600] text-black font-heading font-black text-xs md:text-sm py-4 px-8 uppercase tracking-wider hover:bg-white transition-all duration-300 flex items-center justify-between sm:justify-center gap-3"
                    >
                        <span>BUILD MY BUILDER ID</span>
                        <ArrowRight size={16} />
                    </button>

                    <a
                        href="https://hhgoa.com"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-transparent border border-[#F3EED8]/20 text-[#F3EED8] font-heading font-black text-xs md:text-sm py-4 px-8 uppercase tracking-wider hover:border-[#F4D600] hover:text-[#F4D600] transition-all duration-300 flex items-center justify-between sm:justify-center gap-3"
                    >
                        <span>CHECK THE VIBE</span>
                        <ArrowUpRight size={16} />
                    </a>
                </motion.div>
            </div>

            {/* Right Column: Illustration image */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 w-full h-full flex items-center justify-center py-6 lg:py-20 relative z-10"
            >
                <div className="w-full max-w-[500px] border-4 border-[#04331C] shadow-2xl relative bg-[#04331C]/50 overflow-hidden group">
                    <div className="absolute inset-0 bg-[#064D2B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        src="/goa_hacker_house_villa.png" 
                        alt="Hacker House Goa Portuguese Villa" 
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                    />
                </div>
            </motion.div>

        </div>
    );
}
