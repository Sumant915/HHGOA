"use client";

import { useCallback, useState } from "react";
import { ArrowDown, Loader2 } from "lucide-react";

export default function UploadZone({ onUpload }: { onUpload: (dataUrl: string) => void }) {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setIsProcessing(true);

            try {
                let processedFile = file;
                if (file.name.toLowerCase().endsWith(".heic") || file.name.toLowerCase().endsWith(".heif") || file.type === "image/heic") {
                    const heic2any = (await import("heic2any")).default;
                    const converted = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.8 });
                    const blob = Array.isArray(converted) ? converted[0] : converted;
                    processedFile = new File([blob], file.name.replace(/\.heic|\.heif/i, ".jpg"), { type: "image/jpeg" });
                }

                const reader = new FileReader();
                reader.onload = (event) => {
                    if (event.target?.result) onUpload(event.target.result as string);
                };
                reader.readAsDataURL(processedFile);
            } catch (err) {
                console.error(err);
                alert("That image couldn't be processed. Try another photo.");
            } finally {
                setIsProcessing(false);
            }
        }
    }, [onUpload]);

    return (
        <div className="flex flex-col w-full min-h-[85vh] pt-24 pb-12 relative px-4 md:px-0">
            <div className="flex flex-col justify-start w-full z-10 mb-12 md:mb-20">
                <h2 className="font-heading text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none mb-4">
                    YOUR PHOTO.
                </h2>
                <div className="flex items-center gap-4 text-[#f4f4f0]/50">
                    <ArrowDown size={32} />
                    <span className="font-mono text-sm tracking-widest uppercase">Select your image below</span>
                </div>
            </div>

            <label className="relative flex-1 w-full group cursor-pointer border border-[#f4f4f0]/20 hover:border-[#f4f4f0] transition-colors duration-500 overflow-hidden flex flex-col justify-between p-6 md:p-12">
                <div className="absolute inset-0 bg-[#f4f4f0]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex justify-between items-start z-10">
                    <span className="font-mono text-xs tracking-widest uppercase opacity-50">Upload Node / 01</span>
                    <span className="font-mono text-xs tracking-widest uppercase opacity-50 text-right">JPG · PNG · HEIC<br />Max Quality</span>
                </div>

                <div className="z-10 w-full flex flex-col items-center justify-center my-auto py-20">
                    {isProcessing ? (
                        <div className="flex flex-col items-center gap-6">
                            <Loader2 size={48} className="animate-spin opacity-50" />
                            <span className="font-heading text-3xl uppercase tracking-widest">PROCESSING</span>
                        </div>
                    ) : (
                        <span className="font-heading text-[10vw] md:text-[6vw] font-bold uppercase tracking-tighter leading-none text-center group-hover:scale-105 transition-transform duration-700 w-full text-balance">
                            DROP. FRAME. BUILD.
                        </span>
                    )}
                </div>

                <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/heic, image/heif"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </label>
        </div>
    );
}
