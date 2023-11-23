import { Account } from "@domain/account";
import { AccountsRepository } from "@app/repositories/accounts-repository";

export class InMemoryAccountsRepository implements AccountsRepository {
  private accounts: Account[] = [];

  async create(account: Account) {
    this.accounts.push(account);

    return account;
  }

  async findById(id: string) {
    const account = this.accounts.find((account) => account.id === id);

    return account ?? null;
  }

  async findByEmail(email: string) {
    const account = this.accounts.find((account) => account.email === email);

    return account ?? null;
  }

  async update(id: string, account: Account) {
    const accountIndex = this.accounts.findIndex((account) => account.id === id);

    this.accounts[accountIndex] = account;
  }

  async delete(id: string) {
    this.accounts = this.accounts.filter((account) => account.id !== id);
  }
}
