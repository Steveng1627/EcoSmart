#!/bin/bash

# EcoSmart Release Script
set -e

echo "🚀 Starting EcoSmart release process..."

# Get version from package.json or use git tag
VERSION=${1:-$(git describe --tags --always)}
echo "📦 Release version: $VERSION"

# Build all packages
echo "🔨 Building packages..."
pnpm run build

# Build Docker images
echo "🐳 Building Docker images..."
docker build -f apps/gateway/Dockerfile -t ecosmart/gateway:$VERSION .
docker build -f apps/web/Dockerfile -t ecosmart/web:$VERSION .

# Create production docker-compose
echo "📝 Creating production compose file..."
cat > docker-compose.prod.yml << EOF
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: ecosmart
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    restart: unless-stopped

  gateway:
    image: ecosmart/gateway:$VERSION
    ports:
      - "3002:3001"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=\${DATABASE_URL}
      - REDIS_URL=\${REDIS_URL}
      - JWT_SECRET=\${JWT_SECRET}
    depends_on:
      - postgres
      - redis
    restart: unless-stopped

  web:
    image: ecosmart/web:$VERSION
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=\${NEXT_PUBLIC_API_URL}
    depends_on:
      - gateway
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
EOF

# Create release archive
echo "📦 Creating release archive..."
tar -czf ecosmart-$VERSION.tar.gz \
  docker-compose.prod.yml \
  env.example \
  README.md \
  infra/

echo "✅ Release $VERSION created successfully!"
echo "📁 Files created:"
echo "  - docker-compose.prod.yml"
echo "  - ecosmart-$VERSION.tar.gz"
echo ""
echo "🚀 To deploy:"
echo "  1. Copy files to production server"
echo "  2. Set environment variables"
echo "  3. Run: docker compose -f docker-compose.prod.yml up -d"
