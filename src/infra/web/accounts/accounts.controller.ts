import {
  Controller,
  Body,
  Get,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { UpdateAccountDto } from "./dto/update-account-dto";
import { AccountPresenter } from "./account-presenter";
import { AccountNotFound } from "@app/use-cases/errors/account-not-found";
import { ActiveAccount } from "@shared/decorators/active-account";

@Controller("accounts")
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  async getOne(@ActiveAccount() id: string) {
    const result = await this.accountsService.getOne(id);

    if (result.isLeft()) {
      throw new NotFoundException(result.value.message);
    }

    return AccountPresenter.toWeb(result.value);
  }

  @Patch()
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@ActiveAccount() id: string, @Body() updateAccountDto: UpdateAccountDto) {
    const result = await this.accountsService.update(id, updateAccountDto);

    if (result.isLeft()) {
      if (result.value instanceof AccountNotFound) {
        throw new NotFoundException(result.value.message);
      }

      throw new ConflictException(result.value.message);
    }
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@ActiveAccount() id: string) {
    const result = await this.accountsService.delete(id);

    if (result.isLeft()) {
      throw new NotFoundException(result.value.message);
    }
  }
}
