import { Encoder } from "@app/crypto/encoder";

export class FakeEncoder implements Encoder {
  async encode(payload: Record<string, unknown>) {
    return JSON.stringify(payload);
  }
}
