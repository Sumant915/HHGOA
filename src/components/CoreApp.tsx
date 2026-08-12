"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "./Hero";
import UploadZone from "./UploadZone";
import ImageCropper from "./ImageCropper";
import FormatSelector from "./FormatSelector";
import BuilderForm from "./BuilderForm";
import ResultView from "./ResultView";
import PfpFrameGraphic from "./graphics/PfpFrameGraphic";
import BuilderCardGraphic from "./graphics/BuilderCardGraphic";

export type AppState = "LANDING" | "UPLOAD" | "CROP" | "FORMAT" | "INFO" | "RESULT";
export type PresetStyle = "GOA" | "HACKER" | "SUNSET" | "OCEAN";

export default function CoreApp() {
    const [step, setStep] = useState<AppState>("LANDING");
    const [image, setImage] = useState<string | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [format, setFormat] = useState<"PFP" | "BUILDER_CARD" | null>(null);
    const [preset, setPreset] = useState<PresetStyle>("GOA");
    
    // Complete builder profile state
    const [builderInfo, setBuilderInfo] = useState({
        name: "",
        github: "",
        domain: "Web Development",
        role: "",
        status: "READY TO BUILD",
        title: "THE SHIPIFY HACKER",
        tagline: "Build it. Ship it. Share it.",
        stack: [] as string[],
    });

    const handleUpload = (dataUrl: string) => {
        setImage(dataUrl);
        setStep("CROP");
    };

    const handleCrop = (croppedDataUrl: string) => {
        setCroppedImage(croppedDataUrl);
        setStep("FORMAT");
    };

    const handleFormat = (selectedFormat: "PFP" | "BUILDER_CARD") => {
        setFormat(selectedFormat);
        if (selectedFormat === "BUILDER_CARD") {
            setStep("INFO");
        } else {
            setStep("RESULT");
        }
    };

    const handleInfoFormChange = (info: typeof builderInfo) => {
        setBuilderInfo(info);
    };

    const handleInfoSubmit = (info: typeof builderInfo) => {
        setBuilderInfo(info);
        setStep("RESULT");
    };

    const reset = () => {
        setStep("LANDING");
        setImage(null);
        setCroppedImage(null);
        setFormat(null);
        setPreset("GOA");
        setBuilderInfo({
            name: "",
            github: "",
            domain: "Web Development",
            role: "",
            status: "READY TO BUILD",
            title: "THE SHIPIFY HACKER",
            tagline: "Build it. Ship it. Share it.",
            stack: [],
        });
    };

    // Calculate active tab for Page 2 layout
    const getActiveTab = () => {
        if (step === "UPLOAD" || step === "CROP") return "PHOTO";
        if (step === "FORMAT") return "STYLE";
        if (step === "INFO") return "CONTENT";
        if (step === "RESULT") return "LAYOUT";
        return "";
    };

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {step === "LANDING" ? (
                    <motion.div
                        key="landing"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <Hero onStart={() => setStep("UPLOAD")} />
                    </motion.div>
                ) : (
                    // Page 2: Immersive Builder Studio placed inside a green environment
                    <motion.div
                        key="studio"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative w-full min-h-screen bg-cover bg-center text-[#F4F0DF] flex flex-col justify-start overflow-hidden"
                        style={{ backgroundImage: "url('/goa_hacker_house_villa.png')" }}
                    >
                        {/* Immersive Dark Green Background Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#031c12]/90 via-[#031c12]/80 to-[#000000]/95 backdrop-blur-[1.5px] z-0 pointer-events-none" />

                        {/* Top Compact Navigation */}
                        <div className="w-full flex justify-between items-center border-b border-[#54745C]/25 px-6 py-4 md:px-12 font-mono text-[10px] tracking-widest text-[#54745C] uppercase relative z-10 bg-[#000000]/40">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-[#E8D400] inline-block rounded-full animate-pulse" />
                                <span className="text-[#F4F0DF] font-bold">HHGOA // BUILDER PASSPORT</span>
                            </div>
                            <div className="flex items-center gap-6">
                                {step === "RESULT" && (
                                    <button 
                                        onClick={() => {
                                            // Trigger download programmatically
                                            const downloadBtn = document.querySelector('button[onClick*="handleDownload"]');
                                            if (downloadBtn) (downloadBtn as HTMLButtonElement).click();
                                        }} 
                                        className="hover:text-[#E8D400] transition-colors"
                                    >
                                        SAVE
                                    </button>
                                )}
                                <button onClick={reset} className="hover:text-[#E8D400] transition-colors font-bold text-[#F4F0DF]">
                                    EXIT
                                </button>
                            </div>
                        </div>

                        {/* Main Content Workspace */}
                        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-10 flex-1 flex flex-col justify-start">
                            
                            {/* Page Title */}
                            <div className="mb-10 text-left">
                                <h2 className="font-serif-display text-5xl md:text-7xl font-black uppercase tracking-tight text-[#F4F0DF] leading-[0.85]">
                                    CREATE YOUR<br />BUILDER PASSPORT.
                                </h2>
                            </div>

                            {/* Split layout workspace */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start flex-1 w-full">
                                
                                {/* Left Side: Builder Studio */}
                                <div className="lg:col-span-6 xl:col-span-5 bg-[#063F2B]/40 backdrop-blur-md border border-[#54745C]/30 p-6 md:p-8 flex flex-col gap-6 relative">
                                    
                                    {/* Monospace Tech Label */}
                                    <div className="flex justify-between items-center border-b border-[#54745C]/25 pb-4">
                                        <span className="font-mono text-xs font-black text-[#E8D400] tracking-widest uppercase">
                                            BUILDER STUDIO
                                        </span>
                                        <span className="font-mono text-[9px] text-[#54745C]">
                                            STAGE // 0{step === "UPLOAD" || step === "CROP" ? "1" : step === "FORMAT" ? "2" : step === "INFO" ? "3" : "4"}
                                        </span>
                                    </div>

                                    {/* Quick Presets rectangular selection */}
                                    <div className="flex flex-col gap-2">
                                        <span className="font-mono text-[9px] tracking-widest text-[#54745C] uppercase">
                                            Quick Presets
                                        </span>
                                        <div className="flex flex-wrap gap-2">
                                            {(["GOA", "HACKER", "SUNSET", "OCEAN"] as const).map((p) => (
                                                <button
                                                    key={p}
                                                    onClick={() => setPreset(p)}
                                                    className={`px-3 py-1.5 font-mono text-[10px] uppercase border transition-all duration-300 ${
                                                        preset === p
                                                            ? "bg-[#E8D400] text-black border-[#E8D400] font-bold"
                                                            : "border-[#54745C]/35 hover:border-[#54745C]/75 text-[#54745C] hover:text-[#F4F0DF]"
                                                    }`}
                                                >
                                                    [ {p} ]
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Editorial Tabs Selector */}
                                    <div className="flex border-b border-[#54745C]/25 pb-0.5 mt-2 gap-6 overflow-x-auto scrollbar-none">
                                        {[
                                            { id: "PHOTO", label: "PHOTO", activeSteps: ["UPLOAD", "CROP"] },
                                            { id: "STYLE", label: "STYLE", activeSteps: ["FORMAT"] },
                                            { id: "CONTENT", label: "CONTENT", activeSteps: ["INFO"] },
                                            { id: "LAYOUT", label: "LAYOUT", activeSteps: ["RESULT"] },
                                        ].map((tab) => {
                                            const isActive = getActiveTab() === tab.id;
                                            const isClickable =
                                                tab.id === "PHOTO" ||
                                                (tab.id === "STYLE" && image) ||
                                                (tab.id === "CONTENT" && croppedImage) ||
                                                (tab.id === "LAYOUT" && format);

                                            return (
                                                <button
                                                    key={tab.id}
                                                    disabled={!isClickable}
                                                    onClick={() => {
                                                        if (tab.id === "PHOTO") {
                                                            setStep(croppedImage ? "CROP" : "UPLOAD");
                                                        } else if (tab.id === "STYLE") {
                                                            setStep("FORMAT");
                                                        } else if (tab.id === "CONTENT") {
                                                            setStep("INFO");
                                                        } else if (tab.id === "LAYOUT") {
                                                            setStep("RESULT");
                                                        }
                                                    }}
                                                    className={`font-mono text-xs pb-2 border-b-2 transition-all duration-300 uppercase tracking-widest shrink-0 ${
                                                        isActive
                                                            ? "border-[#E8D400] text-[#E8D400] font-black"
                                                            : isClickable
                                                                ? "border-transparent text-[#54745C] hover:text-[#F4F0DF]"
                                                                : "border-transparent text-[#54745C]/30 cursor-not-allowed"
                                                    }`}
                                                >
                                                    {tab.label}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Active step controller pane */}
                                    <div className="py-2 min-h-[340px]">
                                        <AnimatePresence mode="wait">
                                            {step === "UPLOAD" && (
                                                <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                                                    <UploadZone onUpload={handleUpload} />
                                                </motion.div>
                                            )}
                                            {step === "CROP" && image && (
                                                <motion.div key="crop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                                                    <ImageCropper image={image} onCrop={handleCrop} />
                                                </motion.div>
                                            )}
                                            {step === "FORMAT" && (
                                                <motion.div key="format" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                                                    <FormatSelector onSelect={handleFormat} />
                                                </motion.div>
                                            )}
                                            {step === "INFO" && (
                                                <motion.div key="info" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                                                    <BuilderForm
                                                        onSubmit={handleInfoSubmit}
                                                        onChange={handleInfoFormChange}
                                                        initialValues={builderInfo}
                                                    />
                                                </motion.div>
                                            )}
                                            {step === "RESULT" && croppedImage && format && (
                                                <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                                                    <ResultView
                                                        image={croppedImage}
                                                        format={format}
                                                        info={builderInfo}
                                                        preset={preset}
                                                        onReset={reset}
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Right Side: Live Passport Preview */}
                                <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-center justify-start min-h-[500px] lg:sticky lg:top-28">
                                    
                                    <div className="w-full flex justify-between items-center border-b border-[#54745C]/25 pb-4 mb-8">
                                        <span className="font-mono text-xs font-bold text-[#54745C] tracking-widest uppercase">
                                            LIVE PREVIEW
                                        </span>
                                        <span className="font-mono text-[9px] text-[#54745C] uppercase">
                                            PASSPORT_OUTPUT
                                        </span>
                                    </div>

                                    {/* Physical passport preview styled container */}
                                    <div className="w-full flex justify-center items-center py-2">
                                        {format === "PFP" ? (
                                            <div className="relative overflow-hidden w-[300px] h-[300px] border border-[#54745C]/35 bg-black shadow-2xl">
                                                <div style={{ transform: "scale(0.277777)", transformOrigin: "top left" }} className="absolute top-0 left-0 w-[1080px] h-[1080px]">
                                                    <PfpFrameGraphic image={croppedImage || image} preset={preset} />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="relative overflow-hidden w-[300px] h-[533.3px] border border-[#54745C]/35 bg-black shadow-2xl">
                                                <div style={{ transform: "scale(0.277777)", transformOrigin: "top left" }} className="absolute top-0 left-0 w-[1080px] h-[1920px]">
                                                    <BuilderCardGraphic image={croppedImage || image} info={builderInfo} preset={preset} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
