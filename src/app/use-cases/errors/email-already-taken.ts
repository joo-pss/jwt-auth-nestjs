export class EmailAlreadyTaken extends Error {
  constructor() {
    super("This email is already been taken.");
  }
}
