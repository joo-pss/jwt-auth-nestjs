import { UpdateAccountUseCase } from "./update-account";
import { AccountNotFound } from "./errors/account-not-found";
import { EmailAlreadyTaken } from "./errors/email-already-taken";
import { InMemoryAccountsRepository } from "@test/repositories/in-memory-accounts-repository";
import { FakeHasher } from "@test/crypto/fake-hasher";
import { makeAccount } from "@test/factories/account-factory";

describe("Update account use case", () => {
  let accountsRepo: InMemoryAccountsRepository;
  let hasher: FakeHasher;
  let updateAccount: UpdateAccountUseCase;

  beforeEach(() => {
    accountsRepo = new InMemoryAccountsRepository();
    hasher = new FakeHasher();
    updateAccount = new UpdateAccountUseCase(accountsRepo, hasher);
  });

  const updateAccountRequest = {
    id: "1",
    email: "email@email.com",
    password: "newP@ssw0rd",
  };

  it("should be able to update an account successfully", async () => {
    await accountsRepo.create(makeAccount({}, "1"));

    const result = await updateAccount.execute(updateAccountRequest);
    const updatedAccount = await accountsRepo.findById("1");

    expect(result.isRight()).toEqual(true);
    expect(result.value).toBeNull();
    expect(updatedAccount?.email).toEqual(updateAccountRequest.email);
    expect(updatedAccount?.password).toEqual(`hashed_${updateAccountRequest.password}`);
  });

  it("should not be able to update an account if it is not found", async () => {
    const result = await updateAccount.execute(updateAccountRequest);

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(AccountNotFound);
  });

  it("should not be able to update an account if email is already been taken", async () => {
    await accountsRepo.create(makeAccount({}, "1"));
    await accountsRepo.create(makeAccount({ email: "email@email.com" }, "2"));

    const result = await updateAccount.execute({
      id: "2",
      email: "test@email.com",
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(EmailAlreadyTaken);
  });
});
