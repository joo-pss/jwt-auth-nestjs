import { Entity } from "@core/entity";

export interface AccountProps {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export class Account extends Entity<AccountProps> {
  static create(props: AccountProps, id?: string) {
    return new Account(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }

  get name() {
    return this.props.name;
  }

  set name(name) {
    this.props.name = name;
  }

  get email() {
    return this.props.email;
  }

  set email(email) {
    this.props.email = email;
  }

  get password() {
    return this.props.password;
  }

  set password(password) {
    this.props.password = password;
  }

  get createdAt() {
    return this.props.createdAt;
  }
}
