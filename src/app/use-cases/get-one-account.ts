import { Either, left, right } from "@core/either";
import { Account } from "@domain/account";
import { AccountNotFound } from "./errors/account-not-found";
import { AccountsRepository } from "@app/repositories/accounts-repository";
import { Injectable } from "@nestjs/common";

type GetOneAccountRequest = {
  id: string;
};

type GetOneAccountResponse = Either<AccountNotFound, Account>;

@Injectable()
export class GetOneAccountUseCase {
  constructor(private readonly accountsRepo: AccountsRepository) {}

  async execute(request: GetOneAccountRequest): Promise<GetOneAccountResponse> {
    const { id } = request;

    const account = await this.accountsRepo.findById(id);

    if (!account) {
      return left(new AccountNotFound());
    }

    return right(account);
  }
}
