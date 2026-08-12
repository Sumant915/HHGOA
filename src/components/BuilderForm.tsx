"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, Shuffle, Check } from "lucide-react";

interface BuilderFormProps {
    onSubmit: (info: {
        name: string;
        github: string;
        domain: string;
        role: string;
        status: string;
        title: string;
        tagline: string;
        stack: string[];
    }) => void;
    onChange?: (info: {
        name: string;
        github: string;
        domain: string;
        role: string;
        status: string;
        title: string;
        tagline: string;
        stack: string[];
    }) => void;
    initialValues?: {
        name: string;
        github: string;
        domain: string;
        role: string;
        status: string;
        title: string;
        tagline: string;
        stack: string[];
    };
}

const DOMAIN_SKILLS: Record<string, string[]> = {
    "AI / ML": ["Python", "PyTorch", "TensorFlow", "OpenAI", "HuggingFace", "FastAPI", "LangChain", "LLMs", "Vector DBs", "Keras"],
    "Web Development": ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "TailwindCSS", "GraphQL", "MongoDB", "Redux", "Docker"],
    "App Development": ["Flutter", "React Native", "Swift", "Kotlin", "iOS", "Android", "Firebase", "Expo", "Dart", "SwiftUI"],
    "UI / UX": ["Figma", "Framer", "Adobe XD", "Illustrator", "Photoshop", "Wireframing", "Prototyping", "Design Systems", "Typography"],
    "Blockchain": ["Solidity", "Ethereum", "Web3.js", "Rust", "Smart Contracts", "IPFS", "Hardhat", "Solana", "Ethers.js"],
    "Cloud / DevOps": ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Vercel", "Linux", "Nginx", "CI/CD"],
    "Cybersecurity": ["Penetration Testing", "Cryptography", "Network Security", "OWASP", "Wireshark", "Kali Linux", "Ethical Hacking"],
    "Data Science": ["Pandas", "NumPy", "R", "SQL", "Tableau", "Jupyter", "Data Pipelines", "Statistics", "PowerBI"],
    "Game Development": ["Unity", "Unreal Engine", "C#", "C++", "Shaders", "3D Modeling", "Blender", "Physics Engines", "Godot"],
    "IoT": ["Raspberry Pi", "Arduino", "C", "Microcontrollers", "MQTT", "ESP32", "Firmware", "Sensors", "Embedded Systems"],
    "Other": ["Git", "Java", "Go", "Rust", "C++", "C#", "REST APIs", "GraphQL", "Docker", "SQL"]
};

const TITLES_POOL = [
    "THE ZERO-TO-ONE FOUNDER",
    "THE PIXEL ARCHITECT",
    "THE MODEL WHISPERER",
    "THE FULLSTACK MAGE",
    "THE SYSTEMS BUILDER",
    "THE PROD SHIPPER",
    "THE BUG HUNTER",
    "THE KUBERNETES COMMANDER",
    "THE CRITICAL PATH HACKER",
    "THE PROTOCOL EXPLORER",
    "THE DESIGN ALCHEMIST",
    "THE TERMINAL WIZARD"
];

export default function BuilderForm({ onSubmit, onChange, initialValues }: BuilderFormProps) {
    const [name, setName] = useState(initialValues?.name || "");
    const [github, setGithub] = useState(initialValues?.github || "");
    const [domain, setDomain] = useState(initialValues?.domain || "Web Development");
    const [role, setRole] = useState(initialValues?.role || "");
    const [status, setStatus] = useState(initialValues?.status || "READY TO BUILD");
    const [title, setTitle] = useState(initialValues?.title || "THE SHIPIFY HACKER");
    const [tagline, setTagline] = useState(initialValues?.tagline || "Build it. Ship it. Share it.");
    const [selectedSkills, setSelectedSkills] = useState<string[]>(initialValues?.stack || []);

    // Dispatch changes in real-time
    useEffect(() => {
        onChange?.({
            name,
            github,
            domain,
            role,
            status,
            title,
            tagline,
            stack: selectedSkills
        });
    }, [name, github, domain, role, status, title, tagline, selectedSkills, onChange]);

    // Shuffle Title handler
    const handleShuffleTitle = (e: React.MouseEvent) => {
        e.preventDefault();
        const currentIndex = TITLES_POOL.indexOf(title);
        let nextIndex = Math.floor(Math.random() * TITLES_POOL.length);
        if (nextIndex === currentIndex) {
            nextIndex = (nextIndex + 1) % TITLES_POOL.length;
        }
        setTitle(TITLES_POOL[nextIndex]);
    };

    // Toggle skills select (Max 8 skills limit)
    const toggleSkill = (skill: string) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter(s => s !== skill));
        } else {
            if (selectedSkills.length < 8) {
                setSelectedSkills([...selectedSkills, skill]);
            } else {
                alert("You can select up to 8 skills max.");
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !role.trim() || !domain.trim()) return;
        onSubmit({
            name,
            github,
            domain,
            role,
            status,
            title,
            tagline,
            stack: selectedSkills
        });
    };

    const availableSkills = DOMAIN_SKILLS[domain] || DOMAIN_SKILLS["Other"];

    return (
        <div className="flex flex-col w-full gap-4 text-left">
            
            {/* Header info */}
            <div>
                <h3 className="font-display text-xl font-black uppercase tracking-tight text-[#F4F0DF]">
                    PROFILE INFORMATION
                </h3>
                <span className="font-mono text-[9px] tracking-widest uppercase text-[#54745C]">
                    03 // DEFINE YOUR IDENTITY CARD
                </span>
            </div>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
                
                {/* 2 Column Layout on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5 group">
                        <label className="font-mono text-[9px] tracking-wider uppercase text-[#54745C] group-focus-within:text-[#E8D400] transition-colors">
                            FULL NAME *
                        </label>
                        <input
                            type="text"
                            required
                            maxLength={25}
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full bg-[#000000]/60 border border-[#54745C]/35 focus:border-[#E8D400] px-4 py-2.5 text-md font-heading font-bold uppercase outline-none placeholder:text-[#F4F0DF]/10 transition-all rounded-none text-[#F4F0DF]"
                            placeholder="Enter your name"
                            autoComplete="off"
                        />
                    </div>

                    {/* GitHub Handle */}
                    <div className="flex flex-col gap-1.5 group">
                        <label className="font-mono text-[9px] tracking-wider uppercase text-[#54745C] group-focus-within:text-[#E8D400] transition-colors">
                            GITHUB HANDLE
                        </label>
                        <input
                            type="text"
                            maxLength={20}
                            value={github}
                            onChange={e => setGithub(e.target.value)}
                            className="w-full bg-[#000000]/60 border border-[#54745C]/35 focus:border-[#E8D400] px-4 py-2.5 text-md font-heading font-bold outline-none placeholder:text-[#F4F0DF]/10 transition-all rounded-none text-[#F4F0DF]"
                            placeholder="username"
                            autoComplete="off"
                        />
                    </div>

                    {/* Domain selection */}
                    <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[9px] tracking-wider uppercase text-[#54745C]">
                            DOMAIN *
                        </label>
                        <select
                            value={domain}
                            onChange={e => {
                                setDomain(e.target.value);
                                // Clean up skills not in the new domain or keep them if below max
                            }}
                            className="w-full bg-[#000000]/60 border border-[#54745C]/35 focus:border-[#E8D400] px-4 py-2.5 text-md font-heading font-bold outline-none rounded-none text-[#F4F0DF]"
                        >
                            {Object.keys(DOMAIN_SKILLS).map(d => (
                                <option key={d} value={d} className="bg-[#050505] text-[#F4F0DF]">
                                    {d}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Role */}
                    <div className="flex flex-col gap-1.5 group">
                        <label className="font-mono text-[9px] tracking-wider uppercase text-[#54745C] group-focus-within:text-[#E8D400] transition-colors">
                            ROLE *
                        </label>
                        <input
                            type="text"
                            required
                            maxLength={25}
                            value={role}
                            onChange={e => setRole(e.target.value)}
                            className="w-full bg-[#000000]/60 border border-[#54745C]/35 focus:border-[#E8D400] px-4 py-2.5 text-md font-heading font-bold uppercase outline-none placeholder:text-[#F4F0DF]/10 transition-all rounded-none text-[#F4F0DF]"
                            placeholder="AI Engineer"
                            autoComplete="off"
                        />
                    </div>

                    {/* Builder Status */}
                    <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[9px] tracking-wider uppercase text-[#54745C]">
                            BUILDER STATUS
                        </label>
                        <select
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                            className="w-full bg-[#000000]/60 border border-[#54745C]/35 focus:border-[#E8D400] px-4 py-2.5 text-md font-heading font-bold outline-none rounded-none text-[#F4F0DF]"
                        >
                            {[
                                "READY TO BUILD",
                                "BUILDING",
                                "LOOKING FOR A TEAM",
                                "OPEN TO COLLABORATE",
                                "FOUNDER",
                                "MENTOR",
                                "HIRING"
                            ].map(s => (
                                <option key={s} value={s} className="bg-[#050505] text-[#F4F0DF]">
                                    {s}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Tagline */}
                    <div className="flex flex-col gap-1.5 group">
                        <label className="font-mono text-[9px] tracking-wider uppercase text-[#54745C] group-focus-within:text-[#E8D400] transition-colors">
                            TAGLINE / MOTTO
                        </label>
                        <input
                            type="text"
                            maxLength={50}
                            value={tagline}
                            onChange={e => setTagline(e.target.value)}
                            className="w-full bg-[#000000]/60 border border-[#54745C]/35 focus:border-[#E8D400] px-4 py-2.5 text-md font-heading font-bold outline-none placeholder:text-[#F4F0DF]/10 transition-all rounded-none text-[#F4F0DF]"
                            placeholder="Build it. Ship it. Repeat."
                            autoComplete="off"
                        />
                    </div>

                </div>

                {/* Generated Title container */}
                <div className="flex flex-col gap-1.5 w-full">
                    <label className="font-mono text-[9px] tracking-wider uppercase text-[#54745C]">
                        GENERATED TITLE
                    </label>
                    <div className="flex items-center gap-3 w-full bg-[#000000]/60 border border-[#54745C]/35 px-4 py-2 text-md font-heading font-bold uppercase text-[#E8D400]">
                        <span className="flex-1 select-none">{title}</span>
                        <button
                            onClick={handleShuffleTitle}
                            className="hover:text-white transition-colors p-1"
                            title="Shuffle Title"
                        >
                            <Shuffle size={14} />
                        </button>
                    </div>
                </div>

                {/* Stack / Skills panel */}
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center border-b border-[#54745C]/15 pb-1">
                        <span className="font-mono text-[9px] tracking-wider uppercase text-[#54745C]">
                            STACK / SKILLS
                        </span>
                        <span className="font-mono text-[9px] text-[#E8D400]">
                            {selectedSkills.length} / 8 SELECTED
                        </span>
                    </div>

                    {/* Dynamic skills grid based on selected domain */}
                    <div className="flex flex-wrap gap-1.5 py-1">
                        {availableSkills.map(skill => {
                            const isSelected = selectedSkills.includes(skill);
                            return (
                                <button
                                    key={skill}
                                    type="button"
                                    onClick={() => toggleSkill(skill)}
                                    className={`px-2.5 py-1 text-[10px] font-mono border transition-all duration-300 flex items-center gap-1.5 ${
                                        isSelected
                                            ? "bg-[#E8D400]/10 border-[#E8D400] text-[#E8D400]"
                                            : "border-[#54745C]/20 hover:border-[#54745C]/50 text-[#54745C] hover:text-[#F4F0DF]"
                                    }`}
                                >
                                    {isSelected && <Check size={10} />}
                                    {skill}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Submit button */}
                <div className="flex justify-end mt-4">
                    <button
                        type="submit"
                        className="group flex justify-between items-center w-full bg-[#E8D400] text-black font-display font-black text-xs md:text-sm py-4 px-6 uppercase tracking-wider hover:bg-white transition-all duration-300"
                    >
                        <span>GENERATE PASSPORT →</span>
                    </button>
                </div>

            </form>
        </div>
    );
}
