"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function BuilderForm({ onSubmit }: { onSubmit: (info: { name: string; role: string; stack: string; }) => void }) {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [stack, setStack] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !role.trim()) return;
        onSubmit({ name, role, stack });
    };

    return (
        <div className="flex flex-col w-full min-h-[85vh] pt-24 pb-12 relative px-4 md:px-0">

            <div className="mb-16 md:mb-20">
                <h2 className="font-heading text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none mb-4">
                    YOUR<br />IDENTITY.
                </h2>
                <span className="font-mono text-xs tracking-widest uppercase opacity-50">DEFINE YOUR SIGNAL</span>
            </div>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-16 md:gap-24 flex-1">

                <div className="flex flex-col gap-6 relative group">
                    <label className="font-mono text-xs md:text-sm tracking-widest uppercase opacity-40 group-focus-within:opacity-100 transition-opacity">
                        01 / NAME
                    </label>
                    <input
                        type="text"
                        required
                        maxLength={25}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full bg-transparent border-b-2 border-[#f4f4f0]/20 focus:border-[#f4f4f0] pb-4 text-4xl md:text-6xl font-heading font-bold uppercase outline-none placeholder:text-[#f4f4f0]/10 transition-colors rounded-none"
                        placeholder="SUMANTRA SINGH"
                        autoComplete="off"
                    />
                </div>

                <div className="flex flex-col gap-6 relative group">
                    <label className="font-mono text-xs md:text-sm tracking-widest uppercase opacity-40 group-focus-within:opacity-100 transition-opacity">
                        02 / ROLE
                    </label>
                    <input
                        type="text"
                        required
                        maxLength={35}
                        value={role}
                        onChange={e => setRole(e.target.value)}
                        className="w-full bg-transparent border-b-2 border-[#f4f4f0]/20 focus:border-[#f4f4f0] pb-4 text-4xl md:text-6xl font-heading font-bold uppercase outline-none placeholder:text-[#f4f4f0]/10 transition-colors rounded-none"
                        placeholder="MACHINE LEARNING"
                        autoComplete="off"
                    />
                </div>

                <div className="flex flex-col gap-6 relative group">
                    <label className="font-mono text-xs md:text-sm tracking-widest uppercase opacity-40 group-focus-within:opacity-100 transition-opacity">
                        03 / STACK <span className="opacity-50">(OPTIONAL)</span>
                    </label>
                    <input
                        type="text"
                        maxLength={40}
                        value={stack}
                        onChange={e => setStack(e.target.value)}
                        className="w-full bg-transparent border-b-2 border-[#f4f4f0]/20 focus:border-[#f4f4f0] pb-4 text-4xl md:text-6xl font-heading font-bold uppercase outline-none placeholder:text-[#f4f4f0]/10 transition-colors rounded-none"
                        placeholder="PYTHON · AI · FASTAPI"
                        autoComplete="off"
                    />
                </div>

                <div className="flex justify-end mt-12 mb-12">
                    <button
                        type="submit"
                        className="group flex justify-between items-center w-full md:w-auto text-left bg-transparent border-t border-[#f4f4f0] pt-4 hover:pt-6 transition-all duration-300"
                    >
                        <span className="font-heading text-2xl md:text-4xl uppercase font-bold tracking-tighter group-hover:pr-12 transition-all duration-300 mr-12">
                            GENERATE
                        </span>
                        <ArrowUpRight size={32} className="group-hover:rotate-45 group-hover:translate-x-2 transition-transform duration-300" />
                    </button>
                </div>
            </form>
        </div>
    );
}
