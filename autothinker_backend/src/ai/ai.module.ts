import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AppConfigModule } from '../config/config.module';

@Module({
  imports: [AppConfigModule],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
