import { Module, Global } from "@nestjs/common";
import { AccountsRepository } from "@app/repositories/accounts-repository";
import { PrismaAccountsRepository } from "./prisma/repositories/prisma-accounts-repository";
import { PrismaService } from "./prisma/prisma.service";

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: AccountsRepository,
      useClass: PrismaAccountsRepository,
    },
  ],
  exports: [AccountsRepository],
})
export class DatabaseModule {}
