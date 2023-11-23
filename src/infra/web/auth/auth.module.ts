import { Module } from "@nestjs/common";
import { CryptoModule } from "@infra/crypto/crypto.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SignUpUseCase } from "@app/use-cases/sign-up";
import { SingInUseCase } from "@app/use-cases/sign-in";

@Module({
  imports: [CryptoModule],
  controllers: [AuthController],
  providers: [AuthService, SignUpUseCase, SingInUseCase],
})
export class AuthModule {}
