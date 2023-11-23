import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Hasher } from "@app/crypto/hasher";
import { BcryptHasher } from "./bcrypt-hasher.service";
import { Encoder } from "@app/crypto/encoder";
import { JwtEncoder } from "./jwt-encoder.service";

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: "30min",
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: Hasher,
      useClass: BcryptHasher,
    },
    {
      provide: Encoder,
      useClass: JwtEncoder,
    },
  ],
  exports: [Hasher, Encoder],
})
export class CryptoModule {}
