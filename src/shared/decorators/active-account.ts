import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";

export const ActiveAccount = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!request.accountId) {
      throw new UnauthorizedException();
    }

    return request.accountId;
  },
);
