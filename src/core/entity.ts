import { randomUUID } from "node:crypto";

export abstract class Entity<P> {
  protected constructor(
    protected props: P,
    private readonly _id: string = randomUUID(),
  ) {}

  get id() {
    return this._id;
  }
}
