import { Account } from "@domain/account";
import { Account as PrismaAccount } from "@prisma/client";

export class PrismaAccountMapper {
  static toPrisma(account: Account) {
    return {
      id: account.id,
      name: account.name,
      email: account.email,
      password: account.password,
      createdAt: account.createdAt as Date,
    };
  }

  static toDomain(account: PrismaAccount) {
    return Account.create(
      {
        name: account.name,
        email: account.email,
        password: account.password,
        createdAt: account.createdAt,
      },
      account.id,
    );
  }
}
