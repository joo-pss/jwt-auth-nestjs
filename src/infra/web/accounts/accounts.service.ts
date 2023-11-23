import { GetOneAccountUseCase } from "@app/use-cases/get-one-account";
import { UpdateAccountUseCase } from "@app/use-cases/update-account";
import { DeleteAccountUseCase } from "@app/use-cases/delete-account";
import { UpdateAccountDto } from "./dto/update-account-dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AccountsService {
  constructor(
    private readonly getOneAccount: GetOneAccountUseCase,
    private readonly updateAccount: UpdateAccountUseCase,
    private readonly deleteAccount: DeleteAccountUseCase,
  ) {}

  async getOne(id: string) {
    return await this.getOneAccount.execute({ id });
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    return await this.updateAccount.execute(Object.assign(updateAccountDto, { id }));
  }

  async delete(id: string) {
    return await this.deleteAccount.execute({ id });
  }
}
