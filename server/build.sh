#!/bin/bash
set -e

echo "📦 Installing dependencies..."
npm install

echo "📦 Installing type definitions..."
npm install --save-dev \
  @types/node \
  @types/express \
  @types/cors \
  @types/morgan \
  @types/compression \
  @types/jsonwebtoken \
  @types/bcrypt \
  @types/multer \
  @types/uuid

echo "🔨 Building with TypeScript (skipLibCheck enabled)..."
npx tsc --skipLibCheck

echo "✅ Build complete!"