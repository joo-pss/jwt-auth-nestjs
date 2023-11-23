import { Hasher } from "@app/crypto/hasher";

export class FakeHasher implements Hasher {
  async hash(plain: string) {
    return "hashed_" + plain;
  }

  async compare(plain: string, hash: string) {
    return "hashed_" + plain === hash;
  }
}
