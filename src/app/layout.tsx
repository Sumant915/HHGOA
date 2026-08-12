import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Archivo, Space_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-space-grotesk" });
const archivo = Archivo({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-archivo" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-space-mono" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-playfair" });

export const viewport: Viewport = {
    themeColor: "#064D2B",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
};

export const metadata: Metadata = {
    title: "HH Goa BuilderFrame",
    description: "Frame your Builder Identity for HH Goa 2026.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${spaceGrotesk.variable} ${archivo.variable} ${spaceMono.variable} ${playfair.variable} antialiased bg-[#050505] text-[#F3EED8] min-h-screen relative selection:bg-[#F3EED8] selection:text-black font-sans`}>
                <div className="noise-bg" />
                
                {/* Global Brand Header */}
                <header className="fixed top-0 left-0 right-0 z-50 bg-[#04331C] border-b border-[#F3EED8]/10 px-6 py-4 md:px-12 flex justify-between items-center h-20">
                    {/* Left: Logo block */}
                    <a href="/" className="flex items-center gap-3">
                        <div className="border border-[#F4D600] px-2 py-0.5 flex flex-col items-center justify-center leading-none text-[#F4D600] font-heading font-black">
                            <span className="text-[11px] tracking-tight">HH</span>
                            <span className="text-[6px] tracking-widest uppercase border-t border-[#F4D600] mt-0.5 pt-0.5">GOA</span>
                        </div>
                        <span className="font-mono text-xs font-bold tracking-widest text-[#F4D600] uppercase hidden sm:inline-block">
                            | HACKER HOUSE GOA
                        </span>
                    </a>

                    {/* Right: Navigation items */}
                    <nav className="flex items-center gap-4 md:gap-8 text-[10px] md:text-xs font-mono uppercase tracking-widest">
                        <a href="https://hhgoa.com" target="_blank" rel="noreferrer" className="hover:text-[#F4D600] transition-colors hidden md:inline-block">
                            THE HOUSE
                        </a>
                        <a href="/" className="text-[#F4D600] font-bold border-b border-[#F4D600] pb-0.5">
                            BUILD YOUR ID
                        </a>
                        <a 
                            href="https://hhgoa.com" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="bg-[#F4D600] text-black font-heading font-bold px-4 py-2 hover:bg-white transition-colors duration-300"
                        >
                            APPLY ↗
                        </a>
                    </nav>
                </header>

                <div className="pt-20">
                    {children}
                </div>
            </body>
        </html>
    );
}
