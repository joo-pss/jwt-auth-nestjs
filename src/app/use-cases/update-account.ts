import { Either, left, right } from "@core/either";
import { AccountProps } from "@domain/account";
import { AccountsRepository } from "@app/repositories/accounts-repository";
import { Hasher } from "@app/crypto/hasher";
import { AccountNotFound } from "./errors/account-not-found";
import { EmailAlreadyTaken } from "./errors/email-already-taken";
import { Injectable } from "@nestjs/common";

type UpdateAccountRequest = Partial<Omit<AccountProps, "createdAt">> & {
  id: string;
};

type UpdateAccountResponse = Either<AccountNotFound | EmailAlreadyTaken, null>;

@Injectable()
export class UpdateAccountUseCase {
  constructor(
    private readonly accountsRepo: AccountsRepository,
    private readonly hasher: Hasher,
  ) {}

  async execute(request: UpdateAccountRequest): Promise<UpdateAccountResponse> {
    const { id, name, email, password } = request;

    const account = await this.accountsRepo.findById(id);

    if (!account) {
      return left(new AccountNotFound());
    }

    if (email) {
      const isEmailTaken = await this.accountsRepo.findByEmail(email);

      if (isEmailTaken && isEmailTaken.id !== id) {
        return left(new EmailAlreadyTaken());
      }
    }

    account.name = name ?? account.name;
    account.email = email ?? account.email;
    account.password = password ? await this.hasher.hash(password) : account.password;

    await this.accountsRepo.update(id, account);

    return right(null);
  }
}
