"use client";

import React from "react";

interface PfpFrameGraphicProps {
    image: string | null;
    preset?: "GOA" | "HACKER" | "SUNSET" | "OCEAN";
}

export default function PfpFrameGraphic({
    image,
    preset = "GOA"
}: PfpFrameGraphicProps) {
    
    // Determine color variables based on preset
    let bgStyle = "";
    let borderStyle = "";
    let textMain = "";
    let accentColor = "";
    let noiseOpacity = "";

    if (preset === "GOA") {
        bgStyle = "bg-[#063F2B]";
        borderStyle = "border-[#F4F0DF]";
        textMain = "text-[#F4F0DF]";
        accentColor = "text-[#E8D400]";
        noiseOpacity = "opacity-10";
    } else if (preset === "HACKER") {
        bgStyle = "bg-[#000000]";
        borderStyle = "border-[#075A38]";
        textMain = "text-[#F4F0DF]";
        accentColor = "text-[#E8D400]";
        noiseOpacity = "opacity-5";
    } else if (preset === "SUNSET") {
        bgStyle = "bg-gradient-to-br from-[#E85D04] via-[#F48C06] to-[#E8D400]";
        borderStyle = "border-black";
        textMain = "text-black";
        accentColor = "text-black";
        noiseOpacity = "opacity-15";
    } else { // OCEAN
        bgStyle = "bg-gradient-to-br from-[#0A2E36] to-[#063F2B]";
        borderStyle = "border-[#54745C]";
        textMain = "text-[#F4F0DF]";
        accentColor = "text-[#E8D400]";
        noiseOpacity = "opacity-10";
    }

    return (
        <div
            id="graphic-node"
            className={`relative w-[1080px] h-[1080px] ${bgStyle} ${textMain} flex items-center justify-center overflow-hidden border-[40px] ${borderStyle}`}
            style={{ transform: "scale(1)", transformOrigin: "top left" }}
        >
            {/* Noise filter */}
            <svg className="absolute inset-0 z-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <filter id="noisePfp2">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noisePfp2)" />
            </svg>

            {/* Main Image Container */}
            <div className={`relative z-20 w-[84%] h-[84%] border-8 ${borderStyle} bg-[#000000] overflow-hidden flex items-center justify-center`}>
                {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={image} alt="User photo" className="w-full h-full object-cover grayscale contrast-125 mix-blend-luminosity" />
                ) : (
                    // Avatar placeholder
                    <div className="w-full h-full bg-[#000000] flex flex-col items-center justify-center">
                        <div className={`w-[240px] h-[240px] border-4 border-dashed ${borderStyle} rounded-full opacity-20 flex items-center justify-center`}>
                            <svg viewBox="0 0 24 24" className="w-[100px] fill-current opacity-50">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                        </div>
                    </div>
                )}

                {/* Typographic Overlays inside photo */}
                <div className="absolute top-0 left-0 w-full flex justify-between p-8 mix-blend-difference opacity-90">
                    <span className="font-display text-4xl tracking-tighter uppercase font-black text-white">
                        HH GOA // 2026
                    </span>
                    <span className="font-mono text-xl tracking-[0.2em] uppercase text-white font-bold">
                        #FrameInGoa
                    </span>
                </div>
            </div>

            {/* Outer framing marks */}
            <div className={`absolute top-0 left-1/2 w-[4px] h-[8%] ${borderStyle} bg-current z-20`} />
            <div className={`absolute bottom-0 left-1/2 w-[4px] h-[8%] ${borderStyle} bg-current z-20`} />
            <div className={`absolute top-1/2 left-0 h-[4px] w-[8%] ${borderStyle} bg-current z-20`} />
            <div className={`absolute top-1/2 right-0 h-[4px] w-[8%] ${borderStyle} bg-current z-20`} />

            {/* Edge typographic stamps */}
            <div className={`absolute bottom-[2.5%] right-[7%] font-mono text-[18px] tracking-[0.2em] font-bold uppercase z-20 origin-bottom-right rotate-90`}>
                BUILD. SHIP. LAUNCH.
            </div>
            <div className={`absolute top-[2.5%] left-[7%] font-mono text-[18px] tracking-[0.2em] font-bold uppercase z-20 origin-top-left -rotate-90`}>
                OCT 28-31
            </div>
        </div>
    );
}
