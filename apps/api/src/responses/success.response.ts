import { Expose } from "class-transformer";

export class SuccessResponse<T> {
  @Expose()
  public readonly data: T;

  constructor(data: T) {
    this.data = data;
  }
}
