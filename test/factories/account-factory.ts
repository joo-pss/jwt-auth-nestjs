import { Account, AccountProps } from "@domain/account";

export function makeAccount(props?: Partial<AccountProps>, id?: string) {
  return Account.create(
    {
      name: "John Doe",
      email: "test@email.com",
      password: "hashed_P@ssw0rd",
      ...props,
    },
    id,
  );
}
