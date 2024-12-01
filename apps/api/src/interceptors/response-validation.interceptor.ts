import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ErrorResponse } from 'src/responses/error.response';
import { SuccessResponse } from 'src/responses/success.response';

@Injectable()
export class ResponseValidationInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseValidationInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        const isSuccessResponse = response instanceof SuccessResponse;
        const isErrorResponse = response instanceof ErrorResponse;
        const isValidResponse = isSuccessResponse || isErrorResponse;

        if (!isValidResponse) {
          const handler = context.getHandler().name;
          const controller = context.getClass().name;

          this.logger.error(
            `Controller ${controller}, Method ${handler} is missing a @Response decorator. Returning an empty response.`,
          );

          // Override the response with an empty object
          return {};
        }

        return response;
      }),
    );
  }
}