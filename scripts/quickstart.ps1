# EcoSmart Quick Start Script for Windows
Write-Host "🚀 Starting EcoSmart Quick Setup..." -ForegroundColor Green

# Check if pnpm is installed
try {
    pnpm --version | Out-Null
    Write-Host "✅ pnpm is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ pnpm is not installed. Please install it first:" -ForegroundColor Red
    Write-Host "npm install -g pnpm" -ForegroundColor Yellow
    exit 1
}

# Check if Docker is running
try {
    docker --version | Out-Null
    Write-Host "✅ Docker is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not installed. Please install Docker Desktop first." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
pnpm install

# Start Docker services
Write-Host "🐳 Starting Docker services..." -ForegroundColor Blue
docker compose up -d --build

# Wait for services to be ready
Write-Host "⏳ Waiting for services to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# Seed database
Write-Host "🌱 Seeding database with demo data..." -ForegroundColor Blue
pnpm run seed

# Start development servers
Write-Host "🚀 Starting development servers..." -ForegroundColor Blue
Write-Host "✅ EcoSmart is ready!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Access your applications:" -ForegroundColor Cyan
Write-Host "   Frontend:    http://localhost:3000" -ForegroundColor White
Write-Host "   API Gateway: http://localhost:3002" -ForegroundColor White
Write-Host "   Grafana:     http://localhost:3001 (admin/admin)" -ForegroundColor White
Write-Host "   Jaeger:      http://localhost:16686" -ForegroundColor White
Write-Host ""
Write-Host "🔧 Development commands:" -ForegroundColor Cyan
Write-Host "   pnpm run dev     - Start all services" -ForegroundColor White
Write-Host "   pnpm run build   - Build all packages" -ForegroundColor White
Write-Host "   pnpm run test    - Run tests" -ForegroundColor White
Write-Host "   pnpm run lint    - Lint code" -ForegroundColor White
Write-Host ""
Write-Host "🛑 To stop services: docker compose down" -ForegroundColor Yellow
