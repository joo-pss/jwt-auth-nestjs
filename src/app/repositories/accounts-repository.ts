import { Account } from "@domain/account";

export abstract class AccountsRepository {
  abstract create(account: Account): Promise<Account>;
  abstract findById(id: string): Promise<Account | null>;
  abstract findByEmail(email: string): Promise<Account | null>;
  abstract update(id: string, account: Account): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
