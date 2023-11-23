import { Either, left, right } from "@core/either";
import { Account, AccountProps } from "@domain/account";
import { AccountsRepository } from "@app/repositories/accounts-repository";
import { Hasher } from "@app/crypto/hasher";
import { Encoder } from "@app/crypto/encoder";
import { EmailAlreadyTaken } from "./errors/email-already-taken";
import { Injectable } from "@nestjs/common";

type SignUpRequest = Omit<AccountProps, "createdAt">;

type SignUpResponse = Either<
  EmailAlreadyTaken,
  {
    accessToken: string;
  }
>;

@Injectable()
export class SignUpUseCase {
  constructor(
    private readonly accountsRepo: AccountsRepository,
    private readonly hasher: Hasher,
    private readonly encoder: Encoder,
  ) {}

  async execute(request: SignUpRequest): Promise<SignUpResponse> {
    const { email, password } = request;

    const isEmailTaken = await this.accountsRepo.findByEmail(email);

    if (isEmailTaken) {
      return left(new EmailAlreadyTaken());
    }

    const hashedPassword = await this.hasher.hash(password);

    const newAccountId = (
      await this.accountsRepo.create(
        Account.create({
          ...request,
          password: hashedPassword,
        }),
      )
    ).id;

    const accessToken = await this.encoder.encode({ sub: newAccountId });

    return right({ accessToken });
  }
}
