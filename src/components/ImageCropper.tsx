"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/lib/cropImage";
import { ArrowRight } from "lucide-react";

export default function ImageCropper({ image, onCrop }: { image: string; onCrop: (croppedUrl: string) => void }) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleApplyCrop = async () => {
        if (croppedAreaPixels) {
            const croppedImage = await getCroppedImg(image, croppedAreaPixels);
            onCrop(croppedImage);
        }
    };

    return (
        <div className="flex flex-col w-full gap-6">
            <div>
                <h3 className="font-display text-xl font-black uppercase tracking-tight text-[#F4F0DF]">
                    CROP IMAGE
                </h3>
                <span className="font-mono text-[9px] tracking-widest uppercase text-[#54745C]">
                    01.5 // REPOSITION BUILDER PHOTO
                </span>
            </div>

            {/* Cropper Container */}
            <div className="w-full aspect-square relative bg-[#000000] border border-[#54745C]/35 overflow-hidden touch-none group">
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    cropShape="rect"
                    showGrid={false}
                    classes={{ containerClassName: "touch-none opacity-90 group-hover:opacity-100 transition-opacity duration-500" }}
                />
                
                {/* Technical overlay coordinates */}
                <div className="absolute bottom-4 left-4 z-10 font-mono text-[8px] tracking-widest uppercase text-[#54745C] bg-[#000000]/80 px-2 py-1">
                    CROP_POS // X: {Math.round(crop.x)} Y: {Math.round(crop.y)} Z: {zoom.toFixed(2)}x
                </div>
            </div>

            {/* Slider & Confirm */}
            <div className="w-full flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <span className="font-mono text-[9px] tracking-widest uppercase text-[#54745C]">ZOOM SCALE</span>
                        <span className="font-mono text-[10px] text-[#F4F0DF]">{Math.round((zoom - 1) * 100)}%</span>
                    </div>
                    <input
                        type="range"
                        min={1} max={3} step={0.01}
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="w-full h-[2px] bg-[#F4F0DF]/10 appearance-none outline-none cursor-ew-resize opacity-85 hover:opacity-100 transition-opacity [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[#E8D400] [&::-webkit-slider-thumb]:rounded-none"
                    />
                </div>

                <button
                    onClick={handleApplyCrop}
                    className="group flex justify-between items-center w-full bg-transparent border border-[#54745C]/35 hover:border-[#E8D400] p-3.5 hover:pl-5 transition-all duration-300"
                >
                    <span className="font-display text-sm uppercase font-black tracking-tight text-[#F4F0DF] group-hover:text-[#E8D400]">
                        CONFIRM CROP
                    </span>
                    <ArrowRight size={18} className="text-[#F4F0DF] group-hover:text-[#E8D400] group-hover:translate-x-2 transition-all duration-300" />
                </button>
            </div>
        </div>
    );
}
