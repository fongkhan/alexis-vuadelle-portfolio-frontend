// Environment variables for o2switch production
process.env.ASTRO_KEY = 'MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDE=';
process.env.SITE = 'https://alexis-vuadelle.com';
process.env.NODE_ENV = 'production';

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDir = path.join(__dirname, 'dist', 'client');

console.log('[BOOT] __dirname:', __dirname);
console.log('[BOOT] clientDir:', clientDir);
console.log('[BOOT] clientDir exists:', fs.existsSync(clientDir));

// Check if key files exist
const cssFiles = fs.existsSync(path.join(clientDir, '_astro'))
    ? fs.readdirSync(path.join(clientDir, '_astro'))
    : [];
console.log('[BOOT] Files in _astro/:', cssFiles);

const MIME_TYPES = {
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.mjs': 'application/javascript; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.json': 'application/json',
    '.xml': 'application/xml',
    '.txt': 'text/plain',
};

// Import Astro SSR handler (middleware mode)
import('./dist/server/entry.mjs').then(({ handler }) => {
    const server = http.createServer((req, res) => {
        const urlPath = (req.url || '/').split('?')[0];

        // Try to serve static file from dist/client/
        const filePath = path.join(clientDir, urlPath);
        const resolvedPath = path.resolve(filePath);

        // Security check: must be inside clientDir
        if (!resolvedPath.startsWith(path.resolve(clientDir))) {
            console.log('[STATIC] BLOCKED (path traversal):', urlPath);
            handler(req, res);
            return;
        }

        fs.stat(resolvedPath, (err, stats) => {
            if (!err && stats.isFile()) {
                // File exists! Serve it directly.
                const ext = path.extname(resolvedPath).toLowerCase();
                const contentType = MIME_TYPES[ext] || 'application/octet-stream';
                
                console.log('[STATIC] SERVING:', urlPath, '→', resolvedPath, '(' + contentType + ')');
                
                const headers = { 'Content-Type': contentType };
                // Cache immutable assets (hashed filenames)
                if (urlPath.startsWith('/_astro/')) {
                    headers['Cache-Control'] = 'public, max-age=31536000, immutable';
                }
                
                res.writeHead(200, headers);
                fs.createReadStream(resolvedPath).pipe(res);
            } else {
                // Not a static file → pass to Astro SSR
                console.log('[SSR] Handling:', urlPath);
                handler(req, res);
            }
        });
    });

    server.listen();
    console.log('[BOOT] Server initialized. Waiting for Passenger.');
}).catch(err => {
    console.error('[BOOT] Frontend failed to start:', err);
});
