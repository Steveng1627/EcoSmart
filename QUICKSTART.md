# EcoSmart 快速启动指南

## 🚀 一键启动 (Windows)

### 方法1: 使用批处理脚本 (推荐)
```cmd
scripts\quickstart.bat
```

### 方法2: 手动启动
```cmd
# 1. 安装依赖
pnpm install

# 2. 启动Docker服务
docker compose up -d

# 3. 启动开发服务器
pnpm run dev
```

## 🌐 访问应用

安装完成后，您可以访问：

- **前端应用**: http://localhost:3000
- **API网关**: http://localhost:3002
- **监控面板**: http://localhost:3001 (admin/admin)
- **链路追踪**: http://localhost:16686

## 📱 功能演示

### 1. 首页
- 访问 http://localhost:3000 查看现代化首页
- 展示EcoSmart的核心价值主张

### 2. 商家门户
- 访问 http://localhost:3000/merchant
- 查看订单管理界面
- 实时订单状态跟踪

### 3. 运营控制台
- 访问 http://localhost:3000/ops
- 车队状态监控
- 订单队列管理

### 4. 订单跟踪
- 访问 http://localhost:3000/tracking
- 输入订单ID: `order-123` 或 `123`
- 查看完整的配送时间线

## 🔧 开发命令

```cmd
# 开发模式
pnpm run dev

# 构建项目
pnpm run build

# 运行测试
pnpm run test

# 代码检查
pnpm run lint

# 停止服务
docker compose down
```

## 🛠️ 故障排除

### 端口冲突
如果遇到端口冲突，请检查：
```cmd
netstat -an | findstr :3000
netstat -an | findstr :3002
```

### Docker问题
如果Docker服务启动失败：
```cmd
docker compose down -v
docker system prune -a
docker compose up -d
```

### 依赖问题
如果安装失败：
```cmd
rm -rf node_modules
pnpm install
```

## 📊 技术栈

- **前端**: Next.js 14 + TypeScript + Tailwind CSS
- **后端**: NestJS + GraphQL + REST API
- **数据库**: PostgreSQL + Redis
- **消息队列**: RabbitMQ
- **监控**: Prometheus + Grafana + Jaeger
- **容器化**: Docker + Docker Compose

## 🎯 核心功能

✅ **订单管理**: 完整的订单生命周期管理
✅ **路由优化**: AI驱动的多模态路径规划
✅ **车队监控**: 实时资产状态跟踪
✅ **碳足迹**: 详细的环保指标报告
✅ **用户界面**: 现代化的响应式设计
✅ **API接口**: RESTful + GraphQL API
✅ **监控系统**: 完整的可观测性栈

## 🚀 生产部署

```cmd
# 创建生产版本
.\infra\scripts\release.sh

# 部署到生产环境
docker compose -f docker-compose.prod.yml up -d
```

## 📞 支持

如果遇到问题，请检查：
1. Node.js版本 >= 18.0.0
2. pnpm版本 >= 7.0.0  
3. Docker Desktop已安装并运行
4. 端口3000, 3001, 3002, 5432, 6379未被占用

---

**🎉 恭喜！EcoSmart绿色物流平台已成功部署！**
