import { Metadata, ResolvingMetadata } from 'next';
import { redirect } from 'next/navigation';

type Props = {
    searchParams: { [key: string]: string | string[] | undefined }
};

export async function generateMetadata(
    { searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const i = searchParams.i as string;

    if (!i) {
        return {
            title: 'HH Goa 2026',
        };
    }

    const decodedUrl = decodeURIComponent(i);

    return {
        title: 'My HH Goa 2026 Builder Identity',
        description: 'Just got my HH Goa 2026 builder identity. Ready to build, ship & launch.',
        openGraph: {
            title: 'My HH Goa 2026 Builder Identity',
            description: 'Ready to build, ship & launch. #FrameInGoa',
            images: [
                {
                    url: decodedUrl,
                    width: 1080,
                    height: 1080,
                    alt: 'HH Goa 2026 Identity',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'My HH Goa 2026 Builder Identity',
            description: 'Ready to build, ship & launch. #FrameInGoa',
            images: [decodedUrl],
        },
    };
}

export default function SharePage({ searchParams }: Props) {
    const i = searchParams.i as string;

    if (!i) {
        redirect('/');
    }

    const decodedUrl = decodeURIComponent(i);

    return (
        <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 pt-24 pb-12 bg-[#050505] text-[#F3EED8]">
            <div className="w-full max-w-md flex flex-col gap-6">
                
                {/* Decorative border */}
                <div className="border border-[#F3EED8]/15 bg-[#064D2B]/5 p-6 flex flex-col gap-4 text-center">
                    <span className="font-mono text-[9px] tracking-widest text-[#54745C] uppercase">
                        DECRYPTED_NODE // NETWORK_IDENTITY
                    </span>
                    
                    <h2 className="font-display text-2xl font-black uppercase tracking-tight text-[#F3EED8] mt-2">
                        BUILDER IDENTITY
                    </h2>
                    <span className="font-mono text-[10px] text-[#F4D600] font-bold tracking-widest uppercase">
                        STATUS: ACTIVE_SIGNAL
                    </span>
                </div>

                {/* Main Card Image with brutalist border */}
                <div className="w-full border-4 border-[#F3EED8] shadow-2xl relative bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={decodedUrl} alt="HH Goa 2026 Builder Identity" className="w-full h-auto grayscale-[0.1] contrast-105" />
                </div>
                
                {/* Back to creator button */}
                <a
                    href="/"
                    className="w-full text-center bg-transparent border border-[#F3EED8]/20 hover:border-[#F4D600] text-[#F3EED8] hover:text-[#F4D600] font-display font-black text-lg py-4 uppercase tracking-tight transition-all duration-300"
                >
                    CREATE YOUR OWN PASSPORT ↗
                </a>

                <div className="w-full flex justify-between items-center border-t border-[#F3EED8]/10 pt-4 mt-2">
                    <span className="font-mono text-[8px] tracking-widest text-[#54745C] uppercase">
                        HACKER HOUSE GOA 2026
                    </span>
                    <span className="font-mono text-[8px] tracking-widest text-[#54745C] uppercase">
                        GOA, INDIA
                    </span>
                </div>

            </div>
        </main>
    );
}
