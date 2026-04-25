// Environment variables for o2switch production
process.env.ASTRO_KEY = 'MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDE=';
process.env.SITE = 'https://alexis-vuadelle.com';
process.env.NODE_ENV = 'production';

/**
 * Custom entry point for o2switch (Phusion Passenger).
 * 
 * We explicitly call startServer() which creates a STANDALONE handler
 * that serves BOTH static assets (CSS/JS from dist/client/) AND SSR pages.
 * 
 * The standalone handler internally uses:
 *   1. createStaticHandler() → serves files from dist/client/ (CSS, JS, images)
 *   2. createAppHandler() → handles SSR page routes
 * 
 * Passenger hijacks the server.listen() call automatically.
 */
import('./dist/server/entry.mjs').then(({ startServer }) => {
    startServer();
    console.log("Frontend SSR Server (standalone) initialized for Passenger.");
}).catch(err => {
    console.error('Frontend failed to start:', err);
});
