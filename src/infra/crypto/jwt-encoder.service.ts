import { Encoder } from "@app/crypto/encoder";
import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtEncoder implements Encoder {
  constructor(private readonly jwt: JwtService) {}

  async encode(payload: Record<string, unknown>): Promise<string> {
    return await this.jwt.signAsync(payload);
  }
}
