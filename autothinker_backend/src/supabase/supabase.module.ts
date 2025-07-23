// autothinker_backend/src/supabase/supabase.module.ts
import { Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { ConfigAppModule } from '../config/config.module'; // CORRECTED IMPORT

@Module({
  imports: [ConfigAppModule], // Ensure ConfigAppModule is imported here
  providers: [SupabaseService],
  exports: [SupabaseService], // SupabaseService needs to be exported if other modules (like GenerateModule) use it
})
export class SupabaseModule {}
