export class InvalidCredential extends Error {
  constructor(credential: string) {
    super(`Invalid ${credential}.`);
  }
}
