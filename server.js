/**
 * Custom entry point for o2switch (Phusion Passenger).
 * For Astro apps set to output: 'server' and adapter: node({ mode: 'standalone' }),
 * the core server logic is statically built into dist/server/entry.mjs.
 * This dynamically imports that entry point. 
 */
import('./dist/server/entry.mjs').catch(err => {
    console.error('Frontend failed to start. Ensure you ran `npm run build` before starting the server.', err);
});
