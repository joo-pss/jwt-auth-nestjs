import { Module } from "@nestjs/common";
import { DatabaseModule } from "@infra/database/database.module";
import { WebModule } from "@infra/web/web.module";
import { CryptoModule } from "@infra/crypto/crypto.module";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "@infra/web/auth/auth.guard";

@Module({
  imports: [
    DatabaseModule,
    WebModule,
    CryptoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
