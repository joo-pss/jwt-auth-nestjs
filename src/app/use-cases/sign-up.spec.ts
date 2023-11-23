import { SignUpUseCase } from "./sign-up";
import { EmailAlreadyTaken } from "./errors/email-already-taken";
import { InMemoryAccountsRepository } from "@test/repositories/in-memory-accounts-repository";
import { FakeHasher } from "@test/crypto/fake-hasher";
import { FakeEncoder } from "@test/crypto/fake-encoder";

describe("Sign up use case", () => {
  let accountsRepo: InMemoryAccountsRepository;
  let hasher: FakeHasher;
  let encoder: FakeEncoder;
  let signUp: SignUpUseCase;

  beforeEach(() => {
    accountsRepo = new InMemoryAccountsRepository();
    hasher = new FakeHasher();
    encoder = new FakeEncoder();
    signUp = new SignUpUseCase(accountsRepo, hasher, encoder);
  });

  const signUpRequest = {
    name: "John Doe",
    email: "test@email.com",
    password: "P@ssw0rd",
  };

  it("should be able to sign up an account successfully and return access token", async () => {
    const result = await signUp.execute(signUpRequest);

    expect(result.isRight()).toEqual(true);
    expect(result.value).toHaveProperty("accessToken");
  });

  it("should not be able to sign up an account if email is already been taken", async () => {
    await signUp.execute(signUpRequest);

    const result = await signUp.execute(signUpRequest);

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(EmailAlreadyTaken);
  });
});
