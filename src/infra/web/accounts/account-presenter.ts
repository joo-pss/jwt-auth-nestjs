import { Account } from "@domain/account";

export class AccountPresenter {
  static toWeb(account: Account) {
    return {
      id: account.id,
      name: account.name,
      email: account.email,
      createdAt: account.createdAt,
    };
  }
}
