// autothinker_backend/src/supabase/supabase.service.ts
import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '../config/config.service';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    this.supabase = createClient(
      // Corrected: call the getter methods
      this.configService.getSupabaseUrl(),
      this.configService.getSupabaseAnonKey()
    );
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  // Example: Save a strategy (you'll integrate this in generate controller)
  async saveStrategy(data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('strategies') // Replace 'strategies' with your actual table name
      .insert([data]);

    if (error) {
      console.error('Error saving strategy to Supabase:', error);
      throw new Error(`Supabase error: ${error.message}`);
    }
    return result;
  }
}
