"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "./Hero";
import UploadZone from "./UploadZone";
import ImageCropper from "./ImageCropper";
import FormatSelector from "./FormatSelector";
import BuilderForm from "./BuilderForm";
import ResultView from "./ResultView";
import { generateTitle } from "@/lib/utils";

export type AppState = "LANDING" | "UPLOAD" | "CROP" | "FORMAT" | "INFO" | "RESULT";

export default function CoreApp() {
    const [step, setStep] = useState<AppState>("LANDING");
    const [image, setImage] = useState<string | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [format, setFormat] = useState<"PFP" | "BUILDER_CARD" | null>(null);
    const [builderInfo, setBuilderInfo] = useState({
        name: "",
        role: "",
        stack: "",
        title: "",
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

    const handleInfoSubmit = (info: { name: string; role: string; stack: string }) => {
        setBuilderInfo({
            ...info,
            title: generateTitle(info.role, info.stack),
        });
        setStep("RESULT");
    };

    const reset = () => {
        setStep("LANDING");
        setImage(null);
        setCroppedImage(null);
        setFormat(null);
        setBuilderInfo({ name: "", role: "", stack: "", title: "" });
    };

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {step === "LANDING" && (
                    <motion.div key="landing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                        <Hero onStart={() => setStep("UPLOAD")} />
                    </motion.div>
                )}
                {step === "UPLOAD" && (
                    <motion.div key="upload" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                        <UploadZone onUpload={handleUpload} />
                    </motion.div>
                )}
                {step === "CROP" && image && (
                    <motion.div key="crop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <ImageCropper image={image} onCrop={handleCrop} />
                    </motion.div>
                )}
                {step === "FORMAT" && (
                    <motion.div key="format" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <FormatSelector onSelect={handleFormat} />
                    </motion.div>
                )}
                {step === "INFO" && (
                    <motion.div key="info" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                        <BuilderForm onSubmit={handleInfoSubmit} />
                    </motion.div>
                )}
                {step === "RESULT" && croppedImage && format && (
                    <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: "easeOut" }} exit={{ opacity: 0 }}>
                        <ResultView image={croppedImage} format={format} info={builderInfo} onReset={reset} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
