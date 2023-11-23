import { Module } from "@nestjs/common";
import { CryptoModule } from "@infra/crypto/crypto.module";
import { AccountsController } from "./accounts.controller";
import { AccountsService } from "./accounts.service";
import { GetOneAccountUseCase } from "@app/use-cases/get-one-account";
import { UpdateAccountUseCase } from "@app/use-cases/update-account";
import { DeleteAccountUseCase } from "@app/use-cases/delete-account";

@Module({
  imports: [CryptoModule],
  controllers: [AccountsController],
  providers: [
    AccountsService,
    GetOneAccountUseCase,
    UpdateAccountUseCase,
    DeleteAccountUseCase,
  ],
})
export class AccountsModule {}
