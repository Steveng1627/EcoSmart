.PHONY: help setup dev build test lint clean compose-up compose-down seed release

# Default target
help:
	@echo "EcoSmart Development Commands"
	@echo "=============================="
	@echo "setup        - Install dependencies"
	@echo "dev          - Start development servers"
	@echo "build        - Build all packages"
	@echo "test         - Run all tests"
	@echo "lint         - Lint all code"
	@echo "clean        - Clean build artifacts"
	@echo "compose-up   - Start Docker services"
	@echo "compose-down - Stop Docker services"
	@echo "seed         - Seed database with demo data"
	@echo "release      - Create production release"

# Install dependencies
setup:
	pnpm install

# Start development servers
dev:
	pnpm run dev

# Build all packages
build:
	pnpm run build

# Run tests
test:
	pnpm run test

# Lint code
lint:
	pnpm run lint

# Clean build artifacts
clean:
	rm -rf dist build .next node_modules/.cache
	pnpm run clean

# Start Docker services
compose-up:
	docker compose up -d --build

# Stop Docker services
compose-down:
	docker compose down

# Seed database
seed:
	pnpm run seed

# Create release
release:
	./infra/scripts/release.sh

# Quick start for new developers
quickstart: setup compose-up
	@echo "🚀 EcoSmart is starting up..."
	@echo "⏳ Waiting for services to be ready..."
	@sleep 10
	@echo "🌱 Seeding database..."
	@make seed
	@echo "✅ Ready! Open http://localhost:3000"
