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
        <div className="flex flex-col w-full min-h-[85vh] pt-24 pb-12 relative px-4 md:px-0">

            <div className="flex justify-between items-end mb-8 border-b border-[#f4f4f0]/20 pb-4">
                <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none">
                    ART DIRECTION.
                </h2>
                <span className="font-mono text-xs tracking-widest uppercase opacity-50 hidden md:block">STEP / 02</span>
            </div>

            <div className="w-full flex-1 min-h-[50vh] relative bg-[#0a0a0a] border border-[#f4f4f0]/20 mb-8 overflow-hidden touch-none group">
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
                    classes={{ containerClassName: "touch-none opacity-80 group-hover:opacity-100 transition-opacity duration-700" }}
                />
                <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest uppercase opacity-50 pointer-events-none">
                    X: {Math.round(crop.x)} Y: {Math.round(crop.y)}
                </div>
            </div>

            <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-12 z-10">
                <div className="flex flex-col gap-2 w-full md:w-1/3">
                    <span className="font-mono text-xs tracking-widest uppercase opacity-50">SCALE</span>
                    <input
                        type="range"
                        min={1} max={3} step={0.01}
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="w-full h-[1px] bg-[#f4f4f0]/30 appearance-none outline-none cursor-ew-resize opacity-50 hover:opacity-100 transition-opacity [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#f4f4f0] [&::-webkit-slider-thumb]:rounded-none"
                    />
                </div>

                <button
                    onClick={handleApplyCrop}
                    className="group flex justify-between items-center w-full md:w-auto text-left bg-transparent border-t border-[#f4f4f0] pt-4 hover:pt-6 transition-all duration-300"
                >
                    <span className="font-heading text-2xl md:text-4xl uppercase font-bold tracking-tighter group-hover:pl-4 transition-all duration-300 mr-12">
                        CONTINUE
                    </span>
                    <ArrowRight size={32} className="group-hover:translate-x-4 transition-transform duration-300" />
                </button>
            </div>
        </div>
    );
}
