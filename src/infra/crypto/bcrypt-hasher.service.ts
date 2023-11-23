import { Hasher } from "@app/crypto/hasher";
import { hash, compare } from "bcryptjs";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BcryptHasher implements Hasher {
  private hashSalt = 8;

  async hash(plain: string) {
    return await hash(plain, this.hashSalt);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return await compare(plain, hash);
  }
}
