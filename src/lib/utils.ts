import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function generateTitle(role: string, stack: string): string {
    const combined = `${role} ${stack}`.toLowerCase();
    if (combined.includes("machine learning") || combined.includes("ai") || combined.includes("model")) return "THE MODEL WHISPERER";
    if (combined.includes("frontend") || combined.includes("ui") || combined.includes("pixel")) return "THE PIXEL ARCHITECT";
    if (combined.includes("backend") || combined.includes("systems") || combined.includes("api")) return "THE SYSTEMS BUILDER";
    if (combined.includes("design") || combined.includes("figma")) return "THE PIXEL ALCHEMIST";
    if (combined.includes("founder") || combined.includes("ceo") || combined.includes("build")) return "THE ZERO-TO-ONE BUILDER";
    if (combined.includes("fullstack") || combined.includes("full stack")) return "THE FULLSTACK MAGE";
    return "THE VISIONARY BUILDER";
}
