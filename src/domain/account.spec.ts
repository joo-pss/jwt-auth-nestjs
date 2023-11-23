import { Account } from "./account";
import { makeAccount } from "@test/factories/account-factory";

describe("Account entity", () => {
  it("should be able to create an instance of account with random id and creation date", () => {
    const account = makeAccount();

    expect(account).toBeInstanceOf(Account);
    expect(account).toHaveProperty("id");
    expect(account).toHaveProperty("createdAt");
  });

  it("should be able to create an instance of account with provided id and creation date", () => {
    const createdAt = new Date();
    const account = makeAccount({ createdAt }, "1");

    expect(account.id).toEqual("1");
    expect(account.createdAt).toBe(createdAt);
  });
});
