#!/bin/bash
# Rebuild script for Astro SSG on o2switch
# This script is triggered by webhook-payload.php

echo "=========================================="
echo "Starting Astro Rebuild at $(date)"
echo "=========================================="

# Load Node.js environment (using Node 22 path based on your server setup)
export PATH="$PATH:/opt/alt/alt-nodejs22/root/usr/bin/"
export NODE_TLS_REJECT_UNAUTHORIZED=0

# 1. Navigate to the frontend repository
cd /home/fongkhan/repositories/alexis-vuadelle-portfolio-frontend || exit 1
echo "[1/4] Navigated to repository"

# 2. Pull latest changes (optional, uncomment if Payload modifies files that need committing)
# git pull origin main

# 3. Install dependencies and build
echo "[2/4] Installing dependencies and building..."
npm install
npm run build
if [ $? -ne 0 ]; then
    echo "ERROR: npm run build failed!"
    exit 1
fi

# 4. Deploy to public_html
echo "[3/4] Deploying to public_html..."
# We use rsync to cleanly sync the dist folder to public_html, removing old files
# Make sure rsync is available on o2switch, otherwise use rm and cp like before
if command -v rsync >/dev/null 2>&1; then
    rsync -av --delete dist/ /home/fongkhan/alexis-vuadelle/
else
    # Fallback to rm and cp if rsync is missing
    # We must be careful not to delete .htaccess if it's there
    find /home/fongkhan/alexis-vuadelle/ -mindepth 1 -not -name '.htaccess' -delete
    cp -R dist/* /home/fongkhan/alexis-vuadelle/
fi

echo "[4/4] Deployment complete at $(date)"
echo "=========================================="
