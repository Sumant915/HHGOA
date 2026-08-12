"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Hero({ onStart }: { onStart: () => void }) {
    return (
        <div className="w-full flex flex-col justify-end min-h-[85vh] pb-12 relative px-4 md:px-0">

            {/* Background oversized faded typography or structural line */}
            <div className="absolute top-[20%] left-0 w-full h-[1px] bg-[#f4f4f0]/10" />
            <div className="absolute top-0 right-[20%] h-full w-[1px] bg-[#f4f4f0]/10 hidden md:block" />

            {/* Main asymmetric typography */}
            <div className="flex flex-col w-full z-10 space-y-[-2vw]">
                <motion.h1
                    initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="font-heading text-[16vw] md:text-[14vw] font-bold leading-[0.8] tracking-tighter uppercase whitespace-nowrap overflow-visible"
                >
                    FRAME
                </motion.h1>
                <motion.h1
                    initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="font-heading text-[16vw] md:text-[14vw] font-bold leading-[0.8] tracking-tighter uppercase ml-[5%] md:ml-[15%] whitespace-nowrap opacity-90"
                >
                    YOUR
                </motion.h1>
                <motion.h1
                    initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="font-heading text-[17vw] md:text-[15vw] font-bold leading-[0.8] tracking-tighter uppercase whitespace-nowrap md:-ml-8"
                >
                    BUILDER.
                </motion.h1>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full mt-16 md:mt-24 gap-12 z-10">
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
                    className="font-mono text-xs md:text-sm tracking-widest uppercase flex flex-col gap-1 opacity-60"
                >
                    <span>28—31 OCT</span>
                    <span>GOA, INDIA</span>
                    <span>LESS NOISE. MORE SIGNAL.</span>
                </motion.div>

                <motion.button
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.5 }}
                    onClick={onStart}
                    className="group flexitems-center text-left bg-transparent border-t border-[#f4f4f0] pt-4 w-full md:w-auto hover:pt-6 transition-all duration-300"
                >
                    <div className="flex justify-between items-center w-full gap-12 md:gap-32">
                        <span className="font-heading text-2xl md:text-4xl uppercase font-bold tracking-tighter group-hover:pl-4 transition-all duration-300">
                            CREATE YOUR FRAME
                        </span>
                        <ArrowUpRight size={32} className="group-hover:rotate-45 transition-transform duration-300" />
                    </div>
                </motion.button>
            </div>
        </div>
    );
}
