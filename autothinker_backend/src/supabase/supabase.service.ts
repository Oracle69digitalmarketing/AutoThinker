// autothinker_backend/src/supabase/supabase.service.ts
import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '../config/config.service';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    this.supabase = createClient(
      this.configService.getSupabaseUrl(),    // CORRECTED LINE
      this.configService.getSupabaseAnonKey() // CORRECTED LINE
    );
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  async saveStrategy(data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('strategies') // Replace 'strategies' with your actual table name if different
      .insert([data]);

    if (error) {
      console.error('Error saving strategy to Supabase:', error);
      throw new Error(`Supabase error: ${error.message}`);
    }
    return result;
  }
}
