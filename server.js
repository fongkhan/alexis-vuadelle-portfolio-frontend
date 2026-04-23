// Environment safety checks for CloudLinux/o2switch
if (!process.env.NODE_OPTIONS?.includes('--no-wasm-memory-reservation')) {
  process.env.NODE_OPTIONS = `${process.env.NODE_OPTIONS || ''} --no-wasm-memory-reservation`.trim()
}
process.env.ASTRO_NODE_AUTOSTART = 'disabled';
process.env.SITE = 'https://alexis-vuadelle.com';
process.env.NODE_ENV = 'production';

/**
 * Custom entry point for o2switch (Phusion Passenger).
 * For Astro apps set to output: 'server' and adapter: node({ mode: 'standalone' }),
 * the core server logic is statically built into dist/server/entry.mjs.
 * This dynamically imports that entry point. 
 */
import('./dist/server/entry.mjs').catch(err => {
    console.error('Frontend failed to start. Ensure you ran `npm run build` before starting the server.', err);
});
