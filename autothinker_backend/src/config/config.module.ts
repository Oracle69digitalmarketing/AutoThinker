// autothinker_backend/src/generate/generate.module.ts
import { Module } from '@nestjs/common';
import { GenerateController } from './generate.controller';
import { GenerateService } from './generate.service';
import { AiService } from '../ai/ai.service';
import { SupabaseService } from '../supabase/supabase.service';
import { ConfigAppModule } from '../config/config.module'; // Import ConfigAppModule

@Module({
  imports: [
    ConfigAppModule // Import ConfigAppModule
  ],
  controllers: [GenerateController],
  providers: [
    GenerateService,
    AiService,
    SupabaseService,
  ],
})
export class GenerateModule {}
