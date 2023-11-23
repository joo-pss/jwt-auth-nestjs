import { Account } from "@domain/account";
import { AccountsRepository } from "@app/repositories/accounts-repository";
import { PrismaAccountMapper } from "../mappers/prisma-account-mapper";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaAccountsRepository implements AccountsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(account: Account) {
    await this.prisma.account.create({ data: PrismaAccountMapper.toPrisma(account) });

    return account;
  }

  async findById(id: string) {
    const account = await this.prisma.account.findUnique({
      where: { id },
    });

    return account ? PrismaAccountMapper.toDomain(account) : null;
  }

  async findByEmail(email: string) {
    const account = await this.prisma.account.findUnique({
      where: { email },
    });

    return account ? PrismaAccountMapper.toDomain(account) : null;
  }

  async update(id: string, account: Account) {
    await this.prisma.account.update({
      data: PrismaAccountMapper.toPrisma(account),
      where: { id },
    });
  }

  async delete(id: string) {
    await this.prisma.account.delete({
      where: { id },
    });
  }
}
