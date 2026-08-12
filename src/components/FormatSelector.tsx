"use client";

import { motion } from "framer-motion";

export default function FormatSelector({ onSelect }: { onSelect: (format: "PFP" | "BUILDER_CARD") => void }) {
    return (
        <div className="flex flex-col w-full min-h-[85vh] pt-24 pb-12 relative px-4 md:px-0">

            <div className="mb-16 md:mb-24">
                <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none mb-4">
                    YOUR FORMAT.
                </h2>
                <span className="font-mono text-xs tracking-widest uppercase opacity-50">HOW DO YOU WANT TO REPRESENT YOURSELF?</span>
            </div>

            <div className="flex flex-col gap-0 border-t border-[#f4f4f0]/20">
                <button
                    onClick={() => onSelect("PFP")}
                    className="group flex flex-col md:flex-row justify-between items-start md:items-center py-12 md:py-16 border-b border-[#f4f4f0]/20 text-left hover:bg-[#f4f4f0]/5 transition-colors duration-500 px-4 md:px-8 -mx-4 md:-mx-8"
                >
                    <div className="flex flex-col w-full md:w-auto mb-6 md:mb-0">
                        <span className="font-mono text-xs tracking-widest uppercase opacity-50 mb-2">01 / FORMAT</span>
                        <h3 className="font-heading text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none group-hover:translate-x-4 transition-transform duration-500">
                            PFP FRAME
                        </h3>
                    </div>
                    <p className="font-mono text-xs md:text-sm uppercase tracking-widest opacity-50 md:text-right max-w-sm leading-relaxed group-hover:-translate-x-4 transition-transform duration-500">
                        YOUR PHOTO.
                        <br />
                        HH GOA AROUND IT.
                        <br />
                        1:1 RATIO.
                    </p>
                </button>

                <button
                    onClick={() => onSelect("BUILDER_CARD")}
                    className="group flex flex-col md:flex-row justify-between items-start md:items-center py-12 md:py-16 border-b border-[#f4f4f0]/20 text-left hover:bg-[#f4f4f0]/5 transition-colors duration-500 px-4 md:px-8 -mx-4 md:-mx-8"
                >
                    <div className="flex flex-col w-full md:w-auto mb-6 md:mb-0">
                        <span className="font-mono text-xs tracking-widest uppercase opacity-50 mb-2">02 / FORMAT</span>
                        <h3 className="font-heading text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none group-hover:translate-x-4 transition-transform duration-500">
                            BUILDER CARD
                        </h3>
                    </div>
                    <p className="font-mono text-xs md:text-sm uppercase tracking-widest opacity-50 md:text-right max-w-sm leading-relaxed group-hover:-translate-x-4 transition-transform duration-500">
                        YOUR BUILDER IDENTITY.
                        <br />
                        READY TO SHARE.
                        <br />
                        9:16 STORY RATIO.
                    </p>
                </button>
            </div>
        </div>
    );
}
