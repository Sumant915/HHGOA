import CoreApp from "@/components/CoreApp";

export default function Home() {
    return (
        <main className="relative z-10 flex min-h-screen flex-col items-center justify-start pt-10 md:pt-20 px-4 md:px-8 pb-20">
            <div className="w-full max-w-5xl mx-auto">
                <CoreApp />
            </div>
        </main>
    );
}
