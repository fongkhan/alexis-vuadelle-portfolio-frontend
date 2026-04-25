// Environment variables for o2switch production
process.env.ASTRO_KEY = 'MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDE=';
process.env.SITE = 'https://alexis-vuadelle.com';
process.env.NODE_ENV = 'production';

// In standalone mode, simply importing entry.mjs auto-starts the server.
// Astro's built-in standalone server handles BOTH:
//   1. Static assets (CSS, JS, images from dist/client/)
//   2. SSR page routes
//
// Phusion Passenger automatically hijacks the server.listen() call,
// so we don't need to create our own HTTP server.
import('./dist/server/entry.mjs').catch(err => {
    console.error('Frontend failed to start:', err);
});
