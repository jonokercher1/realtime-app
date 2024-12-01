import { Injectable } from "@nestjs/common";
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ResponseFormatterInterceptor<T> implements NestInterceptor {
  constructor(private readonly responseClass: new (...args: any[]) => T) { }

  public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const responseInstance = new this.responseClass(data);

        return plainToInstance(this.responseClass, responseInstance, { excludeExtraneousValues: true });
      }),
    );
  }
}