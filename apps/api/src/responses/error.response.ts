import { Expose } from "class-transformer";

export class ErrorResponse<T> {
  @Expose()
  public readonly errors: T;

  constructor(errors: T) {
    this.errors = errors;
  }
}
