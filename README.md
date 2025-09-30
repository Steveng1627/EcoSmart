# EcoSmart - Green Last-Mile Logistics Platform

> **Faster. Greener. Safer.** AI-powered delivery with e-cargo bikes and drones.

EcoSmart is a comprehensive green last-mile logistics platform that combines e-cargo bikes (urban) and drones (suburban/hard-to-reach areas), orchestrated by an AI routing engine, powered by renewable energy charging, and using biodegradable/reusable packaging.

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm 9+
- Docker Desktop
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecosmart
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development environment**
   ```bash
   # Start all services (PostgreSQL, Redis, RabbitMQ, MinIO, etc.)
   docker compose up -d
   
   # Start the applications
   pnpm run dev
   ```

4. **Access the applications**
   - **Frontend**: http://localhost:3000
   - **API Gateway**: http://localhost:3002
   - **Grafana**: http://localhost:3001 (admin/admin)
   - **Jaeger**: http://localhost:16686
   - **Prometheus**: http://localhost:9090

## 🏗️ Architecture

### Monorepo Structure

```
ecosmart/
├── apps/
│   ├── web/                 # Next.js frontend
│   └── gateway/             # NestJS API gateway
├── packages/
│   ├── types/              # Shared TypeScript types
│   ├── ui/                 # React component library
│   └── config/             # Shared configurations
├── infra/                  # Infrastructure as code
└── docker-compose.yml      # Local development stack
```

### Core Services

- **Gateway API**: Authentication, routing, and API orchestration
- **Orders Service**: Order lifecycle management
- **Routing Service**: Multi-modal route optimization
- **Fleet Service**: Asset management and telemetry
- **Packaging Service**: Circular packaging tracking
- **Reporting Service**: Carbon footprint and KPI reporting
- **Notifications Service**: Multi-channel notifications

### Technology Stack

**Frontend:**
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Zustand for state management
- Leaflet for maps

**Backend:**
- NestJS with TypeScript
- GraphQL + REST APIs
- JWT authentication with RBAC
- PostgreSQL with Prisma
- Redis for caching
- RabbitMQ for events

**Infrastructure:**
- Docker & Docker Compose
- Kubernetes (production)
- Prometheus + Grafana
- Jaeger for tracing
- GitHub Actions CI/CD

## 📊 Features

### Core Capabilities

- **Hybrid Fleet Management**: E-cargo bikes for urban, drones for suburban
- **AI Route Optimization**: Multi-modal routing with energy and carbon optimization
- **Circular Packaging**: Reusable packaging with deposit system
- **Real-time Tracking**: Live fleet and order tracking
- **Carbon Reporting**: Detailed sustainability metrics
- **Multi-tenant Architecture**: Support for multiple merchants

### User Interfaces

- **Merchant Portal**: Order management, reporting, analytics
- **Operations Console**: Fleet dispatch, live monitoring, incident management
- **Public Tracking**: Customer order tracking interface
- **Admin Dashboard**: System administration and tenant management

## 🔧 Development

### Available Scripts

```bash
# Development
pnpm run dev              # Start all services in development mode
pnpm run build            # Build all packages and applications
pnpm run test             # Run all tests
pnpm run lint             # Lint all code
pnpm run e2e              # Run end-to-end tests

# Infrastructure
pnpm run compose:up       # Start Docker services
pnpm run compose:down     # Stop Docker services
pnpm run seed             # Seed database with demo data
```

### Environment Variables

Copy `env.example` to `.env` and configure:

```bash
cp env.example .env
```

Key variables:
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `JWT_SECRET`: JWT signing secret
- `MAP_TOKEN`: Map service API token

## 🚀 Deployment

### Local Development

```bash
# Start infrastructure
docker compose up -d

# Start applications
pnpm run dev

# Seed demo data
pnpm run seed
```

### Production

```bash
# Build and deploy
pnpm run build
docker compose -f docker-compose.prod.yml up -d
```

### Kubernetes

```bash
# Deploy to Kubernetes
helm install ecosmart ./infra/helm/ecosmart
```

## 📈 Monitoring & Observability

- **Metrics**: Prometheus collects application and infrastructure metrics
- **Logs**: Structured logging with correlation IDs
- **Tracing**: Distributed tracing with Jaeger
- **Dashboards**: Grafana dashboards for system monitoring
- **Alerts**: Automated alerting for critical issues

## 🔒 Security

- **Authentication**: JWT-based authentication with OIDC support
- **Authorization**: Role-based access control (RBAC)
- **Data Protection**: Encryption at rest and in transit
- **Audit Logging**: Comprehensive audit trails
- **Compliance**: GDPR-ready data handling

## 📚 API Documentation

### REST Endpoints

- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `POST /api/orders/:id/dispatch` - Dispatch order
- `POST /api/routing/plan` - Plan optimal route
- `GET /api/fleet/assets` - List fleet assets
- `GET /api/reports/co2e` - Get carbon footprint report

### GraphQL Schema

Access GraphQL playground at http://localhost:3002/graphql

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Documentation**: [docs.ecosmart.com](https://docs.ecosmart.com)
- **Issues**: [GitHub Issues](https://github.com/ecosmart/issues)
- **Discord**: [Community Discord](https://discord.gg/ecosmart)

---

**Built with ❤️ for a sustainable future**
