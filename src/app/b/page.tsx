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
        <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4">
            <div className="w-full max-w-lg mb-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={decodedUrl} alt="HH Goa 2026 Builder Identity" className="w-full h-auto shadow-brutal border border-white/20" />
            </div>
            <a
                href="/"
                className="bg-accent text-black font-heading font-bold text-xl py-4 px-8 uppercase tracking-wider hover:bg-white transition-colors"
            >
                CREATE YOUR OWN REVEAL
            </a>
        </main>
    );
}
