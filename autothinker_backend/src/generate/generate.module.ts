// autothinker_backend/src/generate/generate.module.ts
import { Module } from '@nestjs/common';
import { GenerateController } from './generate.controller';
import { GenerateService } from './generate.service';
import { AiService } from '../ai/ai.service'; // Import AiService
import { SupabaseService } from '../supabase/supabase.service'; // Import SupabaseService
import { ConfigModule } from '@nestjs/config'; // Make sure ConfigModule is imported

@Module({
  imports: [ConfigModule], // Import ConfigModule if ConfigService is used within these providers
  controllers: [GenerateController],
  providers: [
    GenerateService, // Now explicitly provided
    AiService, // Now explicitly provided
    SupabaseService, // Now explicitly provided
  ],
})
export class GenerateModule {}
