import { Module } from '@nestjs/common';
import { GenerateController } from './generate.controller';
import { AiModule } from '../ai/ai.module';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [AiModule, SupabaseModule],
  controllers: [GenerateController],
})
export class GenerateModule {}
