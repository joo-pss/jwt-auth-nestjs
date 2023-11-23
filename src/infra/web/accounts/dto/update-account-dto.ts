import { IsString, IsOptional, IsEmail } from "class-validator";

export class UpdateAccountDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}
