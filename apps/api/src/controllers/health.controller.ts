
import { Controller, Get } from '@nestjs/common';
import { Response } from 'src/decorators/response.decorator';
import { SuccessResponse } from 'src/responses/success.response';

@Controller('health')
export default class HealthController {
  @Get()
  @Response(SuccessResponse)
  getHealth() {
    return {
      message: 'OK',
    };
  }
}
