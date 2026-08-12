"use client";

import React from "react";

interface BuilderCardGraphicProps {
    image: string | null;
    info: {
        name: string;
        github: string;
        domain: string;
        role: string;
        status: string;
        title: string;
        tagline: string;
        stack: string[];
    };
    preset?: "GOA" | "HACKER" | "SUNSET" | "OCEAN";
}

export default function BuilderCardGraphic({
    image,
    info,
    preset = "GOA"
}: BuilderCardGraphicProps) {
    
    // Determine color variables based on preset
    let bgStyle = "";
    let borderStyle = "";
    let textMain = "";
    let textMuted = "";
    let accentColor = "";
    let gridOpacity = "";
    let photoBorder = "";
    let statusDotColor = "bg-[#00FF66]";

    if (preset === "GOA") {
        bgStyle = "bg-[#063F2B]";
        borderStyle = "border-[#F4F0DF]";
        textMain = "text-[#F4F0DF]";
        textMuted = "text-[#54745C]";
        accentColor = "text-[#E8D400]";
        gridOpacity = "opacity-10";
        photoBorder = "border-[#E8D400]";
    } else if (preset === "HACKER") {
        bgStyle = "bg-[#000000]";
        borderStyle = "border-[#075A38]";
        textMain = "text-[#F4F0DF]";
        textMuted = "text-[#54745C]";
        accentColor = "text-[#E8D400]";
        gridOpacity = "opacity-5";
        photoBorder = "border-[#075A38]";
    } else if (preset === "SUNSET") {
        bgStyle = "bg-gradient-to-br from-[#E85D04] via-[#F48C06] to-[#E8D400]";
        borderStyle = "border-black";
        textMain = "text-black";
        textMuted = "text-black/60";
        accentColor = "text-black";
        gridOpacity = "opacity-15";
        photoBorder = "border-black";
        statusDotColor = "bg-black animate-pulse";
    } else { // OCEAN
        bgStyle = "bg-gradient-to-br from-[#0A2E36] to-[#063F2B]";
        borderStyle = "border-[#54745C]";
        textMain = "text-[#F4F0DF]";
        textMuted = "text-[#54745C]/70";
        accentColor = "text-[#E8D400]";
        gridOpacity = "opacity-10";
        photoBorder = "border-[#54745C]";
    }

    // Deterministic Builder ID Code
    const generateCode = (name: string, role: string) => {
        const seed = (name + role).length;
        const paddedSeed = String(seed * 73).padStart(3, "0");
        return `HHG-2026-${paddedSeed}`;
    };

    const builderCode = generateCode(info.name || "BUILDER", info.role || "SHIPIFY");

    return (
        <div
            id="graphic-node"
            className={`relative w-[1080px] h-[1920px] ${bgStyle} ${textMain} flex flex-col justify-between overflow-hidden p-16 font-sans`}
            style={{ transform: "scale(1)", transformOrigin: "top left" }}
        >
            {/* Noise texture overlay */}
            <svg className="absolute inset-0 z-0 w-full h-full opacity-[0.04] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <filter id="cardNoise">
                    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#cardNoise)" />
            </svg>

            {/* Technical grid overlay */}
            <div className={`absolute inset-0 z-0 ${gridOpacity} pointer-events-none`} style={{ backgroundImage: 'linear-gradient(#F4F0DF 1px, transparent 1px), linear-gradient(90deg, #F4F0DF 1px, transparent 1px)', backgroundSize: '80px 80px' }}></div>

            {/* Abstract Goa Palms Background Overlay */}
            <div className="absolute top-[30%] right-[-100px] w-[500px] h-[500px] opacity-10 pointer-events-none z-0">
                <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
                    <path d="M50 90 C 50 50, 60 40, 90 40 C 60 45, 52 50, 50 90 M50 90 C 50 50, 40 40, 10 40 C 40 45, 48 50, 50 90 M50 90 C 50 40, 75 25, 80 15 C 65 25, 55 35, 50 90 M50 90 C 50 40, 25 25, 20 15 C 35 25, 45 35, 50 90" />
                </svg>
            </div>

            {/* Header block */}
            <header className={`relative z-10 flex flex-col justify-between items-stretch border-b-4 ${borderStyle} pb-6 flex-shrink-0`}>
                <div className="flex w-full justify-between items-end">
                    <div className="flex flex-col gap-1">
                        <h1 className="font-display text-[5.2rem] font-black tracking-tighter uppercase leading-[0.8]">
                            HH GOA
                        </h1>
                        <span className="font-mono text-2xl font-bold tracking-[0.1em] uppercase opacity-75">2026 // INDIA</span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <span className={`font-mono text-[1.6rem] tracking-[0.2em] ${accentColor} font-black`}>PASSPORT 01</span>
                        <span className="font-mono text-[1.1rem] opacity-50 tracking-wider">VERIFIED // IDENTITY</span>
                    </div>
                </div>
            </header>

            {/* Main Photographic area */}
            <div className={`relative z-10 flex-1 my-10 w-full border-4 ${borderStyle} bg-black overflow-hidden relative flex items-center justify-center`}>
                {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={image} className="w-full h-full object-cover grayscale contrast-125 opacity-90 mix-blend-luminosity" alt="Builder" />
                ) : (
                    // Skeleton avatar placeholder
                    <div className="w-full h-full bg-[#000000] flex flex-col items-center justify-center p-12">
                        <div className={`w-[300px] h-[300px] border-4 border-dashed ${borderStyle} rounded-full opacity-25 flex items-center justify-center`}>
                            <svg viewBox="0 0 24 24" className="w-[120px] fill-current opacity-50">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                        </div>
                        <span className="font-mono text-2xl tracking-[0.3em] uppercase opacity-35 mt-8">PHOTO REQUIRED</span>
                    </div>
                )}

                {/* Status Overlays */}
                <div className={`absolute bottom-8 right-8 bg-[#000000] ${textMain} border-2 ${photoBorder} px-6 py-3 font-mono text-[1.4rem] font-bold tracking-wider uppercase z-20`}>
                    {info.title || "THE SHIPPER"}
                </div>

                <div className={`absolute top-8 left-8 bg-[#000000] ${textMain} border-2 ${photoBorder} px-5 py-2.5 font-mono text-[1.1rem] font-bold tracking-widest uppercase z-20 flex items-center gap-3`}>
                    <span className={`w-3.5 h-3.5 ${statusDotColor} inline-block rounded-full`} />
                    <span>STATUS: {info.status || "READY TO BUILD"}</span>
                </div>

                {/* Crop crosshairs */}
                <div className="absolute top-1/2 left-0 w-12 h-[2px] bg-[#F4F0DF] mix-blend-difference" />
                <div className="absolute top-1/2 right-0 w-12 h-[2px] bg-[#F4F0DF] mix-blend-difference" />
                <div className="absolute top-0 left-1/2 h-12 w-[2px] bg-[#F4F0DF] mix-blend-difference" />
                <div className="absolute bottom-0 left-1/2 h-12 w-[2px] bg-[#F4F0DF] mix-blend-difference" />
            </div>

            {/* Footer / Info Block */}
            <footer className="relative z-10 flex-shrink-0 pt-2 flex flex-col gap-8">
                {/* Large Builder Name */}
                <div className="flex flex-col gap-1">
                    <h2 className="font-display text-[6.5rem] leading-[0.8] font-black uppercase tracking-tighter w-full overflow-hidden text-ellipsis whitespace-nowrap">
                        {info.name || "BUILDER NAME"}
                    </h2>
                    {info.github && (
                        <span className="font-mono text-xl tracking-[0.1em] text-[#54745C] mt-2">
                            github // @{info.github.replace(/^@/, "")}
                        </span>
                    )}
                </div>

                {/* Technical Profile Grid */}
                <div className={`grid grid-cols-12 gap-4 border-t-4 ${borderStyle} pt-6 w-full text-left`}>
                    <div className={`col-span-4 flex flex-col gap-1 pr-4 border-r-2 ${borderStyle} overflow-hidden`}>
                        <span className="font-mono text-lg tracking-wider text-[#54745C] uppercase">ROLE</span>
                        <span className="font-mono text-2xl font-bold uppercase truncate">{info.role || "BUILDER"}</span>
                    </div>

                    <div className={`col-span-4 flex flex-col gap-1 px-4 border-r-2 ${borderStyle} overflow-hidden`}>
                        <span className="font-mono text-lg tracking-wider text-[#54745C] uppercase">DOMAIN</span>
                        <span className="font-mono text-2xl font-bold uppercase truncate">{info.domain || "WEB DEV"}</span>
                    </div>

                    <div className="col-span-4 flex flex-col gap-1 pl-4 overflow-hidden">
                        <span className="font-mono text-lg tracking-wider text-[#54745C] uppercase">BUILDER ID</span>
                        <span className={`font-mono text-2xl font-bold ${accentColor} uppercase truncate`}>{builderCode}</span>
                    </div>
                </div>

                {/* Motto & Stack Details */}
                <div className={`border-t-2 ${borderStyle} pt-6 flex flex-col gap-4`}>
                    {info.stack.length > 0 && (
                        <div className="flex flex-col gap-1">
                            <span className="font-mono text-lg tracking-wider text-[#54745C] uppercase">SKILLS</span>
                            <span className={`font-mono text-[1.4rem] leading-none font-bold uppercase tracking-wider ${accentColor} truncate`}>
                                {info.stack.join(" · ")}
                            </span>
                        </div>
                    )}
                    {info.tagline && (
                        <div className="font-mono text-lg italic text-[#F4F0DF]/75 border-l-4 border-[#E8D400] pl-4 py-1">
                            &quot;{info.tagline}&quot;
                        </div>
                    )}
                </div>
            </footer>

            {/* Brutalist styling details */}
            <div className={`absolute top-0 right-0 w-12 h-12 ${borderStyle} border-b-4 border-l-4 pointer-events-none`}></div>
            <div className={`absolute bottom-0 left-0 w-12 h-12 ${borderStyle} border-t-4 border-r-4 pointer-events-none`}></div>
        </div>
    );
}
