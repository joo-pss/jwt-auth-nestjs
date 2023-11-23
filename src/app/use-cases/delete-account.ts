import { Either, left, right } from "@core/either";
import { AccountsRepository } from "@app/repositories/accounts-repository";
import { AccountNotFound } from "./errors/account-not-found";
import { Injectable } from "@nestjs/common";

type DeleteAccountRequest = {
  id: string;
};

type DeleteAccountResponse = Either<AccountNotFound, null>;

@Injectable()
export class DeleteAccountUseCase {
  constructor(private readonly accountsRepo: AccountsRepository) {}

  async execute(request: DeleteAccountRequest): Promise<DeleteAccountResponse> {
    const { id } = request;

    const account = await this.accountsRepo.findById(id);

    if (!account) {
      return left(new AccountNotFound());
    }

    await this.accountsRepo.delete(id);

    return right(null);
  }
}
