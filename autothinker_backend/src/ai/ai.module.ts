// autothinker_backend/src/ai/ai.module.ts
import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { ConfigAppModule } from '../config/config.module'; // CORRECTED IMPORT

@Module({
  imports: [ConfigAppModule], // Ensure ConfigAppModule is imported here
  providers: [AiService],
  exports: [AiService], // AiService needs to be exported if other modules (like GenerateModule) use it
})
export class AiModule {}
