"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import * as htmlToImage from "html-to-image";
import PfpFrameGraphic from "./graphics/PfpFrameGraphic";
import BuilderCardGraphic from "./graphics/BuilderCardGraphic";

export default function ResultView({
    image,
    format,
    info,
    preset = "GOA",
    onReset
}: {
    image: string;
    format: "PFP" | "BUILDER_CARD";
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
    onReset: () => void;
}) {
    const graphicRef = useRef<HTMLDivElement>(null);
    const [dataUrl, setDataUrl] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(true);
    const [shareLoading, setShareLoading] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [shareUrl, setShareUrl] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const generate = async () => {
            setIsGenerating(true);
            await new Promise(r => setTimeout(r, 800)); // wait for layout/render
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
    }, [format, image, info, preset]);

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
                body: JSON.stringify({
                    image: dataUrl,
                    name: info.name,
                    github: info.github,
                    domain: info.domain,
                    role: info.role,
                    status: info.status,
                    title: info.title,
                    tagline: info.tagline,
                    stack: info.stack,
                    preset: preset
                })
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

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const openXShare = () => {
        const text = encodeURIComponent(`Just got my HH Goa 2026 builder identity. 🌴\n\nReady to build, ship & launch.\n\n#FrameInGoa #HHGoa2026\n\n${shareUrl}`);
        window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
    };

    return (
        <div className="flex flex-col w-full gap-6">
            
            {/* Hidden High-Res Graphic for compilation */}
            <div className="absolute left-[-9999px] top-[-9999px]">
                <div ref={graphicRef}>
                    {format === "PFP" ? (
                        <PfpFrameGraphic image={image} preset={preset} />
                    ) : (
                        <BuilderCardGraphic image={image} info={info} preset={preset} />
                    )}
                </div>
            </div>

            <div>
                <h3 className="font-display text-xl font-black uppercase tracking-tight text-[#F4F0DF]">
                    COMPILED PASSPORT
                </h3>
                <span className="font-mono text-[9px] tracking-widest uppercase text-[#54745C]">
                    04 // COMPILATION COMPLETE
                </span>
            </div>

            <div className="flex flex-col gap-6">
                
                {/* Status Indicator */}
                <div className="border border-[#54745C]/35 bg-[#000000]/60 backdrop-blur-sm p-3.5 flex justify-between items-center">
                    <span className="font-mono text-[10px] tracking-widest text-[#54745C] uppercase">
                        COMPILER_STATUS
                    </span>
                    <span className="font-mono text-[10px] text-[#E8D400] font-bold uppercase flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-[#E8D400] inline-block rounded-full animate-pulse" />
                        SUCCESSFULLY_COMPILED
                    </span>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleDownload}
                        disabled={!dataUrl || isGenerating}
                        className="group flex justify-between items-center w-full bg-transparent border border-[#54745C]/35 hover:border-[#E8D400] p-3.5 hover:pl-5 transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none"
                    >
                        <span className="font-display text-sm uppercase font-black tracking-tight text-[#F4F0DF] group-hover:text-[#E8D400]">
                            DOWNLOAD IDENTITY
                        </span>
                        <ArrowUpRight size={18} className="text-[#F4F0DF] group-hover:text-[#E8D400] group-hover:rotate-45 transition-all duration-300" />
                    </button>

                    <button
                        onClick={handleShare}
                        disabled={!dataUrl || isGenerating || shareLoading}
                        className="group flex justify-between items-center w-full bg-transparent border border-[#54745C]/35 hover:border-[#E8D400] p-3.5 hover:pl-5 transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none"
                    >
                        <span className="font-display text-sm uppercase font-black tracking-tight text-[#F4F0DF] group-hover:text-[#E8D400]">
                            {shareLoading ? "SHIELDING_DATA..." : "SHARE IDENTITY"}
                        </span>
                        <ArrowUpRight size={18} className="text-[#F4F0DF] group-hover:text-[#E8D400] group-hover:rotate-45 transition-all duration-300" />
                    </button>

                    <button
                        onClick={onReset}
                        className="group flex justify-between items-center w-full bg-transparent border border-[#54745C]/15 hover:border-[#54745C]/50 p-3.5 hover:pl-5 transition-all duration-300 mt-2 opacity-50 hover:opacity-100"
                    >
                        <span className="font-mono text-xs uppercase tracking-widest text-[#F4F0DF]/70">
                            CREATE ANOTHER
                        </span>
                        <ArrowUpRight size={16} className="transform rotate-90" />
                    </button>
                </div>
            </div>

            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000000]/95 backdrop-blur-sm p-4">
                    <div className="bg-[#000000] border border-[#54745C]/35 p-6 md:p-8 w-full max-w-md relative flex flex-col gap-6 shadow-2xl rounded-none">
                        
                        <div className="flex justify-between items-center border-b border-[#54745C]/15 pb-4">
                            <span className="font-mono text-[9px] tracking-widest text-[#54745C] uppercase">
                                NODE // SHARE_SIGNAL
                            </span>
                            <button
                                onClick={() => setShowShareModal(false)}
                                className="font-mono text-[10px] text-[#F4F0DF] hover:text-[#E8D400] transition-colors uppercase"
                            >
                                CLOSE [X]
                            </button>
                        </div>

                        <div className="my-2">
                            <h4 className="font-display text-2xl font-black uppercase tracking-tight text-[#F4F0DF] leading-none mb-1">
                                SHARE IDENTITY
                            </h4>
                            <p className="font-mono text-[10px] text-[#54745C] uppercase tracking-wider">
                                Broadcast your signal to the network.
                            </p>
                        </div>

                        {/* Copy Link Input */}
                        <div className="flex flex-col gap-2">
                            <span className="font-mono text-[9px] text-[#54745C] uppercase tracking-wider">IDENTITY_URL</span>
                            <div className="relative flex items-stretch">
                                <input
                                    readOnly
                                    value={shareUrl}
                                    className="bg-[#000000] border border-[#54745C]/35 p-3 pr-12 text-[#F4F0DF] font-mono text-xs w-full outline-none focus:border-[#E8D400] selection:bg-[#F4F0DF] selection:text-black rounded-none"
                                />
                                <button
                                    onClick={copyToClipboard}
                                    className="absolute right-0 top-0 bottom-0 px-4 flex items-center justify-center border-l border-[#54745C]/35 hover:text-[#E8D400] transition-colors"
                                >
                                    {copied ? <Check size={16} className="text-[#00FF66]" /> : <Copy size={16} />}
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={openXShare}
                            className="w-full bg-[#E8D400] text-black font-display font-black text-md py-4 uppercase tracking-tight hover:bg-white transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            POST TO X ↗
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
