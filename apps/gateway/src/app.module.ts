import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { OrdersModule } from "./orders/orders.module";
import { RoutingModule } from "./routing/routing.module";
import { FleetModule } from "./fleet/fleet.module";
import { PackagingModule } from "./packaging/packaging.module";
import { ReportingModule } from "./reporting/reporting.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { AuthModule } from "./auth/auth.module";
import { HealthModule } from "./health/health.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      playground: process.env.NODE_ENV !== "production",
      introspection: process.env.NODE_ENV !== "production",
    }),
    AuthModule,
    OrdersModule,
    RoutingModule,
    FleetModule,
    PackagingModule,
    ReportingModule,
    NotificationsModule,
    HealthModule,
  ],
})
export class AppModule {}
