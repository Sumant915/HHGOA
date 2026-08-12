import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-space-grotesk" });

export const viewport: Viewport = {
    themeColor: "#030303",
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
            <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-[#030303] text-[#f4f4f0] min-h-screen relative selection:bg-[#f4f4f0] selection:text-black`}>
                <div className="noise-bg" />
                <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between p-6 md:p-10 text-xs md:text-sm font-medium tracking-widest font-mono uppercase mix-blend-difference pointer-events-none">
                    <div className="flex flex-col gap-1 pointer-events-auto">
                        <span>HH GOA</span>
                        <span className="opacity-50">2026</span>
                    </div>
                    <div className="flex flex-col items-end gap-1 pointer-events-auto">
                        <a href="https://hhgoa.com" target="_blank" rel="noreferrer" className="hover:opacity-50 transition-opacity flex items-center gap-1">APPLY ↗</a>
                        <span className="opacity-100 flex items-center gap-1 border-b border-[#f4f4f0]">CREATE ↗</span>
                    </div>
                </nav>
                {children}
            </body>
        </html>
    );
}
