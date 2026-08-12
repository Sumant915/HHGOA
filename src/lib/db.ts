import { Pool } from 'pg';

let pool: Pool;

const connectionString = process.env.DATABASE_URL;

if (process.env.NODE_ENV === 'production') {
    pool = new Pool({
        connectionString,
        ssl: { rejectUnauthorized: false }
    });
} else {
    if (!(global as any).pgPool) {
        (global as any).pgPool = new Pool({
            connectionString,
            ssl: { rejectUnauthorized: false }
        });
    }
    pool = (global as any).pgPool;
}

export async function initDb() {
    try {
        const client = await pool.connect();
        await client.query(`
            CREATE TABLE IF NOT EXISTS builder_passports (
                id SERIAL PRIMARY KEY,
                builder_id VARCHAR(50) UNIQUE NOT NULL,
                name VARCHAR(100) NOT NULL,
                github VARCHAR(100),
                domain VARCHAR(100),
                role VARCHAR(100),
                status VARCHAR(100),
                title VARCHAR(100),
                tagline VARCHAR(255),
                stack TEXT[],
                image_url TEXT NOT NULL,
                preset VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        client.release();
        console.log("Database initialized successfully.");
    } catch (err) {
        console.error("Database initialization failed:", err);
    }
}

export default pool;
