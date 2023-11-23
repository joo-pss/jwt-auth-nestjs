import { SingInUseCase } from "./sign-in";
import { InvalidCredential } from "./errors/invalid-credential";
import { InMemoryAccountsRepository } from "@test/repositories/in-memory-accounts-repository";
import { FakeHasher } from "@test/crypto/fake-hasher";
import { FakeEncoder } from "@test/crypto/fake-encoder";
import { makeAccount } from "@test/factories/account-factory";

describe("Sign in use case", () => {
  let accountsRepo: InMemoryAccountsRepository;
  let hasher: FakeHasher;
  let encoder: FakeEncoder;
  let signIn: SingInUseCase;

  beforeEach(() => {
    accountsRepo = new InMemoryAccountsRepository();
    hasher = new FakeHasher();
    encoder = new FakeEncoder();
    signIn = new SingInUseCase(accountsRepo, hasher, encoder);
  });

  const signInRequest = {
    email: "test@email.com",
    password: "P@ssw0rd",
  };

  it("should be able to sign in an account successfully and return access token", async () => {
    await accountsRepo.create(makeAccount());

    const result = await signIn.execute(signInRequest);

    expect(result.isRight()).toEqual(true);
    expect(result.value).toHaveProperty("accessToken");
  });

  it("should not be able to sign in an account if email is invalid", async () => {
    const result = await signIn.execute(signInRequest);

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(InvalidCredential);

    if (result.isLeft()) {
      expect(result.value.message).toContain("email");
    }
  });

  it("should not be able to sign in an account if password is invalid", async () => {
    await accountsRepo.create(makeAccount());

    const result = await signIn.execute({ ...signInRequest, password: "invalid" });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(InvalidCredential);

    if (result.isLeft()) {
      expect(result.value.message).toContain("password");
    }
  });
});
