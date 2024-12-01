import { UseInterceptors } from '@nestjs/common';
import { ResponseFormatterInterceptor } from 'src/interceptors/response-formatter.interceptor';

export function Response(responseClass: new (...args: any[]) => any) {
  return UseInterceptors(new ResponseFormatterInterceptor(responseClass));
}