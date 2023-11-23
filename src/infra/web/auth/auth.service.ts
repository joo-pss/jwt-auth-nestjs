import { SignUpUseCase } from "@app/use-cases/sign-up";
import { SingInUseCase } from "@app/use-cases/sign-in";
import { SignUpDto } from "./dto/sign-up-dto";
import { SignInDto } from "./dto/sign-in-dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(
    private readonly _signUp: SignUpUseCase,
    private readonly _signIn: SingInUseCase,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    return await this._signUp.execute(signUpDto);
  }

  async signIn(signInDto: SignInDto) {
    return await this._signIn.execute(signInDto);
  }
}
