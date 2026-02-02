import fs from 'fs';
import path from 'path';

// Path to the Transformers.js cache in Node.js
const cachePath = path.join(process.cwd(), 'node_modules', '@huggingface', 'transformers', '.cache');

if (fs.existsSync(cachePath)) {
    console.log("🧹 Menghapus cache model lama...");
    fs.rmSync(cachePath, { recursive: true, force: true });
    console.log("✅ Cache dibersihkan! Kapasitas HDD bertambah.");
} else {
    console.log("📂 Cache sudah kosong.");
}