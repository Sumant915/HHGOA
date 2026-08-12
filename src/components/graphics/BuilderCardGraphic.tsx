import React from "react";

export default function BuilderCardGraphic({
    image,
    info
}: {
    image: string;
    info: { name: string; role: string; stack: string; title: string };
}) {
    return (
        <div
            id="graphic-node"
            className="relative w-[1080px] h-[1920px] bg-[#f4f4f0] text-[#030303] flex flex-col justify-between overflow-hidden p-16"
            style={{ transform: "scale(1)", transformOrigin: "top left" }}
        >
            {/* Texture Layer */}
            <svg className="absolute inset-0 z-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
                <filter id="noiseCardSolid">
                    <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseCardSolid)" />
            </svg>

            {/* Light structural grid */}
            <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '120px 120px' }}></div>

            <header className="relative z-10 flex flex-col justify-between items-start border-b-4 border-[#030303] pb-10 flex-shrink-0">
                <div className="flex w-full justify-between items-end">
                    <h1 className="font-heading text-[6rem] font-bold tracking-tighter uppercase leading-[0.8]">HH GOA</h1>
                    <p className="font-mono text-3xl font-bold tracking-widest">2026 // INDIA</p>
                </div>
            </header>

            {/* Main Photographic Treatment */}
            <div className="relative z-10 flex-1 my-16 w-full border-4 border-[#030303] bg-black overflow-hidden relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} className="w-full h-full object-cover grayscale-[0.8] contrast-150 mix-blend-luminosity opacity-90" alt="Builder" />

                {/* Photo Overlays / Editorial Marks */}
                <div className="absolute bottom-10 right-10 bg-[#f4f4f0] text-black px-8 py-3 transform -rotate-3 font-mono text-3xl font-bold tracking-widest uppercase">
                    {info.title}
                </div>

                {/* Technical crosshairs on photo */}
                <div className="absolute top-1/2 left-0 w-8 h-[2px] bg-white mix-blend-difference" />
                <div className="absolute top-1/2 right-0 w-8 h-[2px] bg-white mix-blend-difference" />
                <div className="absolute top-0 left-1/2 h-8 w-[2px] bg-white mix-blend-difference" />
                <div className="absolute bottom-0 left-1/2 h-8 w-[2px] bg-white mix-blend-difference" />
            </div>

            {/* Identity block */}
            <footer className="relative z-10 flex-shrink-0 pt-4 pb-8 flex flex-col">
                <h2 className="font-heading text-[9rem] leading-[0.8] font-bold uppercase tracking-tighter w-full overflow-hidden text-ellipsis whitespace-nowrap mb-10">
                    {info.name}
                </h2>

                <div className="flex justify-between items-end border-t-4 border-[#030303] pt-6 flex-1 w-full">
                    <div className="flex flex-col gap-2 w-1/2 pr-8 border-r-4 border-[#030303] overflow-hidden">
                        <span className="font-mono text-2xl tracking-widest uppercase opacity-50 truncate">ROLE</span>
                        <span className="font-mono text-[2.5rem] leading-none font-bold uppercase truncate">{info.role}</span>
                    </div>

                    <div className="flex flex-col gap-2 w-1/2 pl-8 overflow-hidden text-right">
                        <span className="font-mono text-2xl tracking-widest uppercase opacity-50 truncate">SIGNAL</span>
                        <span className="font-mono text-[2.5rem] leading-none font-bold uppercase truncate">{info.stack || "BUILDER"}</span>
                    </div>
                </div>
            </footer>

            {/* Decorative heavy corner marking */}
            <div className="absolute top-0 right-0 w-[80px] h-[80px] bg-[#030303] z-20"></div>
        </div>
    );
}
