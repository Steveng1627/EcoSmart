@echo off
echo 🚀 Starting EcoSmart Quick Setup...
echo.

REM Check if pnpm is installed
pnpm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ pnpm is not installed. Please install it first:
    echo npm install -g pnpm
    pause
    exit /b 1
)
echo ✅ pnpm is installed

REM Check if Docker is running
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker Desktop first.
    pause
    exit /b 1
)
echo ✅ Docker is installed

echo.
echo 📦 Installing dependencies...
pnpm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo 🐳 Starting Docker services...
docker compose up -d --build
if %errorlevel% neq 0 (
    echo ❌ Failed to start Docker services
    pause
    exit /b 1
)

echo.
echo ⏳ Waiting for services to be ready...
timeout /t 15 /nobreak >nul

echo.
echo 🌱 Seeding database with demo data...
pnpm run seed

echo.
echo ✅ EcoSmart is ready!
echo.
echo 🌐 Access your applications:
echo    Frontend:    http://localhost:3000
echo    API Gateway: http://localhost:3002
echo    Grafana:     http://localhost:3001 (admin/admin)
echo    Jaeger:      http://localhost:16686
echo.
echo 🔧 Development commands:
echo    pnpm run dev     - Start all services
echo    pnpm run build   - Build all packages
echo    pnpm run test    - Run tests
echo    pnpm run lint    - Lint code
echo.
echo 🛑 To stop services: docker compose down
echo.
pause
