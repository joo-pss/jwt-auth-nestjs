import { Account } from "@domain/account";
import { GetOneAccountUseCase } from "./get-one-account";
import { AccountNotFound } from "./errors/account-not-found";
import { InMemoryAccountsRepository } from "@test/repositories/in-memory-accounts-repository";
import { makeAccount } from "@test/factories/account-factory";

describe("Get one account use case", () => {
  let accountsRepo: InMemoryAccountsRepository;
  let getOneAccount: GetOneAccountUseCase;

  beforeEach(() => {
    accountsRepo = new InMemoryAccountsRepository();
    getOneAccount = new GetOneAccountUseCase(accountsRepo);
  });

  it("should be able to return one account", async () => {
    await accountsRepo.create(makeAccount({}, "1"));

    const result = await getOneAccount.execute({ id: "1" });

    expect(result.isRight()).toEqual(true);
    expect(result.value).toBeInstanceOf(Account);
  });

  it("should not be able to return a non existing account", async () => {
    const result = await getOneAccount.execute({ id: "1" });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(AccountNotFound);
  });
});
