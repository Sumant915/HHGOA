import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import pool, { initDb } from '@/lib/db';

const generateCode = (name: string, role: string) => {
    const seed = (name + role).length;
    const paddedSeed = String(seed * 73).padStart(3, "0");
    return `HHG-2026-${paddedSeed}`;
};

export async function POST(request: Request) {
    try {
        // Ensure database table exists
        await initDb();
        const body = await request.json();
        const {
            image,
            name,
            github,
            domain,
            role,
            status,
            title,
            tagline,
            stack,
            preset
        } = body;

        if (!image) {
            return NextResponse.json({ error: 'No image provided' }, { status: 400 });
        }

        // 1. Process base64 photo upload
        const base64Data = image.split(',')[1];
        const buffer = Buffer.from(base64Data, 'base64');
        const filename = `hhgoa2026-${name ? name.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'builder'}-${Date.now()}.png`;

        let imageUrl = `https://hhgoa.com/b/mock-${Date.now()}`;
        
        if (process.env.BLOB_READ_WRITE_TOKEN) {
            const blob = await put(`frames/${filename}`, buffer, {
                access: 'public',
                contentType: 'image/png'
            });
            imageUrl = blob.url;
        } else {
            console.warn("BLOB_READ_WRITE_TOKEN is missing. Returning a mocked sharing URL. Please add the Vercel Blob env var.");
        }

        // 2. Compute Builder ID
        const builderId = generateCode(name || "BUILDER", role || "SHIPIFY");

        // 3. Save profile to Neon PostgreSQL DB
        try {
            await pool.query(`
                INSERT INTO builder_passports (builder_id, name, github, domain, role, status, title, tagline, stack, image_url, preset)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                ON CONFLICT (builder_id) DO UPDATE SET
                    name = EXCLUDED.name,
                    github = EXCLUDED.github,
                    domain = EXCLUDED.domain,
                    role = EXCLUDED.role,
                    status = EXCLUDED.status,
                    title = EXCLUDED.title,
                    tagline = EXCLUDED.tagline,
                    stack = EXCLUDED.stack,
                    image_url = EXCLUDED.image_url,
                    preset = EXCLUDED.preset
            `, [
                builderId,
                name || "Unnamed Builder",
                github || "",
                domain || "Other",
                role || "Hacker",
                status || "READY TO BUILD",
                title || "THE SHIPIFY HACKER",
                tagline || "Build it. Ship it. Share it.",
                stack || [],
                imageUrl,
                preset || "GOA"
            ]);
            console.log(`Saved builder passport ${builderId} to Neon database.`);
        } catch (dbErr) {
            console.error("Failed to write to database:", dbErr);
        }

        return NextResponse.json({ url: imageUrl });
    } catch (error) {
        console.error('Failed to upload image:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
