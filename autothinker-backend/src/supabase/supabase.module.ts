import { Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { AppConfigModule } from '../config/config.module';

@Module({
  imports: [AppConfigModule],
  providers: [SupabaseService],
  exports: [SupabaseService], // Make SupabaseClient available to other modules
})
export class SupabaseModule {}
