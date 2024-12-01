import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import HealthController from './controllers/health.controller';

@Module({
  controllers: [HealthController],
  imports: [ConfigModule.forRoot()],
})
export class AppModule { }
