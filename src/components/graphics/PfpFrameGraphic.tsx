import React from "react";

export default function PfpFrameGraphic({ image }: { image: string }) {
    return (
        <div
            id="graphic-node"
            className="relative w-[1080px] h-[1080px] bg-[#030303] text-[#f4f4f0] flex items-center justify-center overflow-hidden border-[32px] border-[#f4f4f0]"
            style={{ transform: "scale(1)", transformOrigin: "top left" }}
        >
            {/* Noise filter */}
            <svg className="absolute inset-0 z-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                <filter id="noisePfp2">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noisePfp2)" />
            </svg>

            {/* Main Image Container */}
            <div className="relative z-20 w-[85%] h-[85%] border-8 border-[#f4f4f0] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="User photo" className="w-full h-full object-cover grayscale-[0.8] contrast-150" />

                {/* Typographic Overlays inside photo */}
                <div className="absolute top-0 left-0 w-full flex justify-between p-8 mix-blend-difference opacity-90">
                    <span className="font-heading text-5xl tracking-tighter uppercase font-bold text-white">HH GOA // 26</span>
                    <span className="font-mono text-2xl tracking-widest uppercase text-white">#FrameInGoa</span>
                </div>
            </div>

            {/* Outer framing marks */}
            <div className="absolute top-0 left-1/2 w-[4px] h-[7.5%] bg-[#f4f4f0] z-20" />
            <div className="absolute bottom-0 left-1/2 w-[4px] h-[7.5%] bg-[#f4f4f0] z-20" />
            <div className="absolute top-1/2 left-0 h-[4px] w-[7.5%] bg-[#f4f4f0] z-20" />
            <div className="absolute top-1/2 right-0 h-[4px] w-[7.5%] bg-[#f4f4f0] z-20" />

            {/* Edge typographic stamps */}
            <div className="absolute bottom-[3%] right-[7.5%] font-mono text-[22px] tracking-widest font-bold uppercase z-20 origin-bottom-right rotate-90">
                BUILD. SHIP. LAUNCH.
            </div>
            <div className="absolute top-[3%] left-[7.5%] font-mono text-[22px] tracking-widest font-bold uppercase z-20 origin-top-left -rotate-90">
                OCT 28-31
            </div>
        </div>
    );
}
