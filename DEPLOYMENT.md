# EcoSmart Deployment Guide

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Node.js 20+
- pnpm 9+
- Docker Desktop
- Git

### 1. Clone and Setup
```bash
git clone <repository-url>
cd ecosmart
pnpm install
```

### 2. Start Development Environment
```bash
# Start all services (PostgreSQL, Redis, RabbitMQ, etc.)
docker compose up -d

# Start applications
pnpm run dev
```

### 3. Access Applications
- **Frontend**: http://localhost:3000
- **API Gateway**: http://localhost:3002
- **Grafana**: http://localhost:3001 (admin/admin)
- **Jaeger**: http://localhost:16686

## 📦 Production Deployment

### Docker Compose (Recommended)
```bash
# Build and start production services
docker compose -f docker-compose.prod.yml up -d
```

### Kubernetes
```bash
# Deploy to Kubernetes
helm install ecosmart ./infra/helm/ecosmart
```

## 🔧 Configuration

### Environment Variables
Copy `env.example` to `.env` and configure:

```bash
# Database
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/ecosmart

# Redis
REDIS_URL=redis://redis:6379

# Authentication
JWT_SECRET=your-secret-key

# External Services
MAP_TOKEN=your-mapbox-token
```

### Database Setup
```bash
# Run migrations
pnpm run migrate

# Seed demo data
pnpm run seed
```

## 🏗️ Architecture Overview

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
- **Gateway API**: Authentication, routing, API orchestration
- **Orders Service**: Order lifecycle management
- **Routing Service**: Multi-modal route optimization
- **Fleet Service**: Asset management and telemetry
- **Packaging Service**: Circular packaging tracking
- **Reporting Service**: Carbon footprint and KPI reporting
- **Notifications Service**: Multi-channel notifications

## 🎯 Features Implemented

### ✅ Core Features
- [x] Monorepo with pnpm workspaces
- [x] Next.js 14 frontend with modern UI
- [x] NestJS backend with GraphQL + REST
- [x] JWT authentication with RBAC
- [x] Docker containerization
- [x] CI/CD pipeline with GitHub Actions
- [x] Monitoring with Prometheus + Grafana
- [x] Distributed tracing with Jaeger

### ✅ User Interfaces
- [x] Landing page with modern design
- [x] Merchant portal for order management
- [x] Operations console for fleet monitoring
- [x] Public order tracking interface
- [x] Responsive design with Tailwind CSS

### ✅ API Endpoints
- [x] Order management (CRUD operations)
- [x] Route planning and optimization
- [x] Fleet asset management
- [x] Carbon footprint reporting
- [x] Authentication and authorization

## 🔍 Monitoring & Observability

### Metrics
- Application performance metrics
- Business KPIs (orders, deliveries, carbon savings)
- Infrastructure metrics (CPU, memory, disk)

### Logging
- Structured JSON logs
- Correlation IDs for request tracing
- Error tracking and alerting

### Tracing
- Distributed tracing across services
- Performance bottleneck identification
- Request flow visualization

## 🛡️ Security Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- Multi-tenant support
- API rate limiting

### Data Protection
- Encryption at rest and in transit
- PII data handling compliance
- Audit logging
- Secure secrets management

## 📊 Business Metrics

### Key Performance Indicators
- **On-time Delivery**: 95%+ target
- **Carbon Reduction**: 60% vs traditional delivery
- **Fleet Utilization**: 80%+ efficiency
- **Customer Satisfaction**: 4.5+ stars

### Sustainability Metrics
- CO2 emissions per delivery
- Energy efficiency ratings
- Packaging reuse rates
- Renewable energy usage

## 🚀 Scaling Considerations

### Horizontal Scaling
- Stateless service design
- Load balancer configuration
- Database read replicas
- Caching strategies

### Performance Optimization
- CDN for static assets
- Database query optimization
- Caching layers (Redis)
- Image optimization

## 🔧 Development Workflow

### Local Development
```bash
# Start all services
make quickstart

# Or manually
pnpm install
docker compose up -d
pnpm run dev
```

### Testing
```bash
# Run all tests
pnpm run test

# Run E2E tests
pnpm run e2e

# Run linting
pnpm run lint
```

### Building
```bash
# Build all packages
pnpm run build

# Create production release
./infra/scripts/release.sh
```

## 📚 API Documentation

### REST Endpoints
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order details
- `POST /api/orders/:id/dispatch` - Dispatch order
- `POST /api/routing/plan` - Plan route
- `GET /api/fleet/assets` - List fleet assets
- `GET /api/reports/co2e` - Get carbon report

### GraphQL
- Playground: http://localhost:3002/graphql
- Schema introspection enabled
- Real-time subscriptions support

## 🆘 Troubleshooting

### Common Issues

**Port conflicts:**
```bash
# Check what's using ports
netstat -tulpn | grep :3000
```

**Docker issues:**
```bash
# Reset Docker environment
docker compose down -v
docker system prune -a
```

**Database connection:**
```bash
# Check PostgreSQL status
docker compose logs postgres
```

### Performance Issues
- Check Prometheus metrics
- Review Jaeger traces
- Monitor resource usage
- Optimize database queries

## 📞 Support

- **Documentation**: See README.md
- **Issues**: GitHub Issues
- **Community**: Discord server
- **Enterprise**: Contact sales team

---

**Built with ❤️ for a sustainable future**
