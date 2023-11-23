import { DeleteAccountUseCase } from "./delete-account";
import { AccountNotFound } from "./errors/account-not-found";
import { InMemoryAccountsRepository } from "@test/repositories/in-memory-accounts-repository";
import { makeAccount } from "@test/factories/account-factory";

describe("Delete account use case", () => {
  let accountsRepo: InMemoryAccountsRepository;
  let deleteAccount: DeleteAccountUseCase;

  beforeEach(() => {
    accountsRepo = new InMemoryAccountsRepository();
    deleteAccount = new DeleteAccountUseCase(accountsRepo);
  });

  it("should be able to delete an existing account", async () => {
    await accountsRepo.create(makeAccount({}, "1"));

    const result = await deleteAccount.execute({ id: "1" });

    expect(result.isRight()).toEqual(true);
    expect(result.value).toBeNull();
  });

  it("should not be able to delete a non existing account", async () => {
    const result = await deleteAccount.execute({ id: "1" });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(AccountNotFound);
  });
});
