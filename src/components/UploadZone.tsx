"use client";

import { useCallback, useState } from "react";
import { ArrowDown, Loader2, Upload } from "lucide-react";

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
        <div className="flex flex-col w-full gap-4">
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#54745C]">
                SOURCE / PHOTO
            </span>

            <label className="relative w-full aspect-[4/3] group cursor-pointer border border-[#54745C]/35 hover:border-[#E8D400] bg-[#000000]/60 backdrop-blur-sm transition-all duration-500 overflow-hidden flex flex-col justify-between p-6">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#F4F0DF 1px, transparent 1px), linear-gradient(90deg, #F4F0DF 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                <div className="absolute inset-0 bg-[#075A38]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                <div className="flex justify-between items-start z-10 w-full">
                    <span className="font-mono text-[9px] tracking-widest uppercase text-[#54745C]">
                        SOURCE_NODE_01
                    </span>
                    <span className="font-mono text-[9px] tracking-widest uppercase text-[#54745C] text-right">
                        JPG · PNG · HEIC
                    </span>
                </div>

                <div className="z-10 w-full flex flex-col items-center justify-center my-auto">
                    {isProcessing ? (
                        <div className="flex flex-col items-center gap-4">
                            <Loader2 size={32} className="animate-spin text-[#E8D400]" />
                            <span className="font-mono text-xs uppercase tracking-widest text-[#F4F0DF]/60">PROCESSING_IMAGE...</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4 text-center">
                            <Upload size={28} className="text-[#54745C] group-hover:text-[#E8D400] transition-colors duration-300" />
                            <span className="font-display text-lg md:text-xl uppercase font-black tracking-tight text-[#F4F0DF] group-hover:text-[#E8D400] transition-all duration-300">
                                SELECT BUILDER PHOTO
                            </span>
                            <span className="font-mono text-[9px] tracking-widest text-[#54745C] uppercase">
                                Click or drag file here
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-end z-10 w-full">
                    <div className="flex items-center gap-2">
                        <ArrowDown size={14} className="text-[#54745C]" />
                        <span className="font-mono text-[9px] tracking-widest uppercase text-[#54745C]">CHOOSE FILE</span>
                    </div>
                    <span className="font-mono text-[9px] tracking-widest uppercase text-[#54745C]">MAX 10MB</span>
                </div>

                <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/heic, image/heif"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={isProcessing}
                />
            </label>
        </div>
    );
}
