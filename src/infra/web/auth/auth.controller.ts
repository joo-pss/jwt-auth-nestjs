import {
  Controller,
  Body,
  Post,
  HttpCode,
  HttpStatus,
  ConflictException,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/sign-up-dto";
import { SignInDto } from "./dto/sign-in-dto";
import { IsPublic } from "@shared/decorators/is-public";

@IsPublic()
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async signUp(@Body() signUpDto: SignUpDto) {
    const result = await this.authService.signUp(signUpDto);

    if (result.isLeft()) {
      throw new ConflictException(result.value.message);
    }

    return result.value;
  }

  @Post("signin")
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: SignInDto) {
    const result = await this.authService.signIn(signInDto);

    if (result.isLeft()) {
      throw new UnauthorizedException(result.value.message);
    }

    return result.value;
  }
}
