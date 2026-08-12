"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import * as htmlToImage from "html-to-image";
import PfpFrameGraphic from "./graphics/PfpFrameGraphic";
import BuilderCardGraphic from "./graphics/BuilderCardGraphic";

export default function ResultView({
    image,
    format,
    info,
    onReset
}: {
    image: string;
    format: "PFP" | "BUILDER_CARD";
    info: { name: string; role: string; stack: string; title: string };
    onReset: () => void;
}) {
    const graphicRef = useRef<HTMLDivElement>(null);
    const [dataUrl, setDataUrl] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(true);
    const [shareLoading, setShareLoading] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [shareUrl, setShareUrl] = useState("");

    useEffect(() => {
        const generate = async () => {
            setIsGenerating(true);
            await new Promise(r => setTimeout(r, 600));
            try {
                if (graphicRef.current) {
                    const url = await htmlToImage.toPng(graphicRef.current, {
                        cacheBust: false, pixelRatio: 2, quality: 1
                    });
                    setDataUrl(url);
                }
            } catch (err) {
                console.error("Failed to generate image", err);
            } finally {
                setIsGenerating(false);
            }
        };
        generate();
    }, [format, image, info]);

    const handleDownload = () => {
        if (!dataUrl) return;
        const link = document.createElement("a");
        link.download = `hhgoa2026-${format.toLowerCase()}-${info.name ? info.name.replace(/\s+/g, '-').toLowerCase() : 'builder'}.png`;
        link.href = dataUrl;
        link.click();
    };

    const handleShare = async () => {
        if (!dataUrl) return;
        setShareLoading(true);
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: dataUrl, name: info.name })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
            const localShareUrl = `${window.location.origin}/b?i=${encodeURIComponent(data.url)}`;
            setShareUrl(localShareUrl);
            setShowShareModal(true);
        } catch (err) {
            console.error(err);
            alert("Sharing failed. You can still download the image.");
        } finally {
            setShareLoading(false);
        }
    };

    const openXShare = () => {
        const text = encodeURIComponent(`Just got my HH Goa 2026 builder identity. 🌴\n\nReady to build, ship & launch.\n\n#FrameInGoa #HHGoa2026\n\n${shareUrl}`);
        window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
    };

    return (
        <div className="flex w-full min-h-[85vh] pt-24 pb-12 relative px-4 md:px-0">

            <div className="absolute left-[-9999px] top-[-9999px]">
                <div ref={graphicRef}>
                    {format === "PFP" ? <PfpFrameGraphic image={image} /> : <BuilderCardGraphic image={image} info={info} />}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 w-full items-start">

                {/* Left Side: Typography & Actions */}
                <div className="col-span-1 md:col-span-5 flex flex-col justify-start md:sticky md:top-32 gap-16 order-2 md:order-1">
                    <h2 className="font-heading text-7xl md:text-[8vw] font-bold uppercase tracking-tighter leading-[0.8] mix-blend-difference z-20">
                        YOUR<br />BUILDER<br />IDENTITY.
                    </h2>

                    <div className="flex flex-col w-full border-t border-[#f4f4f0]/20 pt-8 gap-4">
                        <button
                            onClick={handleDownload} disabled={!dataUrl || isGenerating}
                            className="group flex justify-between items-center w-full text-left py-4 hover:px-4 hover:bg-[#f4f4f0]/5 transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none"
                        >
                            <span className="font-heading text-2xl md:text-3xl uppercase font-bold tracking-tighter">DOWNLOAD IMAGE</span>
                            <ArrowUpRight size={28} className="group-hover:rotate-45 transition-transform" />
                        </button>

                        <button
                            onClick={handleShare} disabled={!dataUrl || isGenerating || shareLoading}
                            className="group flex justify-between items-center w-full text-left py-4 hover:px-4 hover:bg-[#f4f4f0]/5 transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none"
                        >
                            <span className="font-heading text-2xl md:text-3xl uppercase font-bold tracking-tighter">
                                {shareLoading ? "PREPARING..." : "SHARE TO X"}
                            </span>
                            <ArrowUpRight size={28} className="group-hover:rotate-45 transition-transform" />
                        </button>

                        <button
                            onClick={onReset}
                            className="group flex justify-between items-center w-full text-left py-4 hover:px-4 hover:bg-[#f4f4f0]/5 transition-all duration-300 mt-8 opacity-50 hover:opacity-100"
                        >
                            <span className="font-mono text-sm tracking-widest uppercase">CREATE ANOTHER</span>
                            <ArrowUpRight size={20} className="transform rotate-90" />
                        </button>
                    </div>
                </div>

                {/* Right Side: Generated Image */}
                <div className="col-span-1 md:col-span-7 flex justify-end w-full order-1 md:order-2">
                    <div className="w-full md:w-[90%] relative">
                        {isGenerating ? (
                            <div className="w-full aspect-[4/5] bg-[#f4f4f0]/5 border border-[#f4f4f0]/10 flex flex-col items-center justify-center animate-pulse">
                                <span className="font-mono text-xs tracking-widest uppercase opacity-50">COMPILING IDENTITY //</span>
                            </div>
                        ) : dataUrl ? (
                            <div className="w-full shadow-2xl transition-transform hover:-translate-y-2 duration-500">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={dataUrl} alt="Builder Identity" className="w-full h-auto" />
                            </div>
                        ) : null}
                    </div>
                </div>

            </div>

            {showShareModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030303]/90 backdrop-blur-md p-4">
                    <div className="bg-[#0a0a0a] border border-[#f4f4f0]/20 p-8 w-full max-w-lg relative flex flex-col gap-8 shadow-2xl">
                        <button onClick={() => setShowShareModal(false)} className="absolute top-6 right-6 opacity-50 hover:opacity-100 font-mono text-xs tracking-widest uppercase">
                            CLOSE [X]
                        </button>
                        <h3 className="font-heading text-5xl font-bold uppercase tracking-tighter leading-none mt-2">SHARE<br />YOUR<br />SIGNAL.</h3>

                        <div className="flex flex-col gap-2">
                            <span className="font-mono text-[10px] opacity-50 uppercase tracking-widest">URL</span>
                            <input
                                readOnly
                                value={shareUrl}
                                className="bg-transparent border-b border-[#f4f4f0]/20 p-2 text-[#f4f4f0] font-mono text-sm w-full outline-none focus:border-[#f4f4f0] selection:bg-[#f4f4f0] selection:text-black"
                            />
                        </div>

                        <button
                            onClick={openXShare}
                            className="w-full bg-[#f4f4f0] text-black font-heading font-bold text-2xl py-6 uppercase tracking-tighter hover:bg-white hover:pl-4 transition-all duration-300"
                        >
                            POST DIRECTLY TO X ↗
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
