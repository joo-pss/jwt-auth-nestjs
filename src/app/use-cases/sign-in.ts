import { Either, left, right } from "@core/either";
import { AccountsRepository } from "@app/repositories/accounts-repository";
import { Hasher } from "@app/crypto/hasher";
import { Encoder } from "@app/crypto/encoder";
import { InvalidCredential } from "./errors/invalid-credential";
import { Injectable } from "@nestjs/common";

type SignInRequest = {
  email: string;
  password: string;
};

type SignInResponse = Either<
  InvalidCredential,
  {
    accessToken: string;
  }
>;

@Injectable()
export class SingInUseCase {
  constructor(
    private readonly accountsRepo: AccountsRepository,
    private readonly hasher: Hasher,
    private readonly encoder: Encoder,
  ) {}

  async execute(request: SignInRequest): Promise<SignInResponse> {
    const { email, password } = request;

    const account = await this.accountsRepo.findByEmail(email);

    if (!account) {
      return left(new InvalidCredential("email"));
    }

    const isPasswordValid = await this.hasher.compare(password, account.password);

    if (!isPasswordValid) {
      return left(new InvalidCredential("password"));
    }

    const accessToken = await this.encoder.encode({ sub: account.id });

    return right({ accessToken });
  }
}
