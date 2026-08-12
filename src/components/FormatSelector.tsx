"use client";

import { motion } from "framer-motion";

export default function FormatSelector({ onSelect }: { onSelect: (format: "PFP" | "BUILDER_CARD") => void }) {
    return (
        <div className="flex flex-col w-full gap-6">
            <div>
                <h3 className="font-display text-xl font-black uppercase tracking-tight text-[#F4F0DF]">
                    SELECT FORMAT
                </h3>
                <span className="font-mono text-[9px] tracking-widest uppercase text-[#54745C]">
                    02 // CHOOSE REPRESENTATION FORMAT
                </span>
            </div>

            <div className="flex flex-col gap-4">
                <button
                    onClick={() => onSelect("PFP")}
                    className="group relative flex flex-col justify-between items-start p-5 border border-[#54745C]/35 hover:border-[#E8D400] bg-[#000000]/60 backdrop-blur-sm transition-all duration-300 text-left w-full overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[#075A38]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="flex justify-between items-start w-full z-10">
                        <span className="font-mono text-[9px] tracking-widest uppercase text-[#54745C] mb-2">02.1 / FORMAT</span>
                        <span className="font-mono text-[9px] tracking-widest uppercase text-[#E8D400] opacity-0 group-hover:opacity-100 transition-opacity duration-300">SELECT ↗</span>
                    </div>

                    <h4 className="font-display text-xl font-black uppercase tracking-tight text-[#F4F0DF] group-hover:text-[#E8D400] transition-colors duration-300 z-10 mt-2">
                        PFP FRAME
                    </h4>
                    
                    <p className="font-mono text-[9px] uppercase tracking-widest text-[#54745C] group-hover:text-[#F4F0DF]/80 transition-colors duration-300 leading-relaxed mt-1 z-10">
                        1:1 SQUARE FORMAT // PRE-CONFIGURED WITH THE OFFICIAL HACKER HOUSE GOA PROFILE STAMP.
                    </p>
                </button>

                <button
                    onClick={() => onSelect("BUILDER_CARD")}
                    className="group relative flex flex-col justify-between items-start p-5 border border-[#54745C]/35 hover:border-[#E8D400] bg-[#000000]/60 backdrop-blur-sm transition-all duration-300 text-left w-full overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[#075A38]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="flex justify-between items-start w-full z-10">
                        <span className="font-mono text-[9px] tracking-widest uppercase text-[#54745C] mb-2">02.2 / FORMAT</span>
                        <span className="font-mono text-[9px] tracking-widest uppercase text-[#E8D400] opacity-0 group-hover:opacity-100 transition-opacity duration-300">SELECT ↗</span>
                    </div>

                    <h4 className="font-display text-xl font-black uppercase tracking-tight text-[#F4F0DF] group-hover:text-[#E8D400] transition-colors duration-300 z-10 mt-2">
                        BUILDER CARD
                    </h4>
                    
                    <p className="font-mono text-[9px] uppercase tracking-widest text-[#54745C] group-hover:text-[#F4F0DF]/80 transition-colors duration-300 leading-relaxed mt-1 z-10">
                        9:16 COLLECTIBLE FORMAT // SHOWCASING YOUR FULL PROFILE: NAME, ROLE, TECH STACK, AND GENERATED BUILDER CODE.
                    </p>
                </button>
            </div>
        </div>
    );
}
