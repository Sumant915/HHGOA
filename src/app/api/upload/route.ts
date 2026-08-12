import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { image, name } = await request.json();

        if (!image) {
            return NextResponse.json({ error: 'No image provided' }, { status: 400 });
        }

        // `image` is a data URL: "data:image/png;base64,....."
        const base64Data = image.split(',')[1];
        const buffer = Buffer.from(base64Data, 'base64');
        const filename = `hhgoa2026-${name ? name.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'builder'}-${Date.now()}.png`;

        if (!process.env.BLOB_READ_WRITE_TOKEN) {
            console.warn("BLOB_READ_WRITE_TOKEN is missing. Returning a mocked sharing URL. Please add the Vercel Blob env var.");
            // Return a mocked URL structure to prevent the UI from breaking during hackathon demo
            return NextResponse.json({ url: `https://hhgoa.com/b/mock-${Date.now()}` });
        }

        const blob = await put(`frames/${filename}`, buffer, {
            access: 'public',
            contentType: 'image/png'
        });

        return NextResponse.json({ url: blob.url });
    } catch (error) {
        console.error('Failed to upload image:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
