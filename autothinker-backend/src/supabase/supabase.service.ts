import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '../config/config.service';

@Injectable()
export class SupabaseService implements OnModuleInit {
  public client: SupabaseClient;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.client = createClient(
      this.configService.supabaseUrl,
      this.configService.supabaseAnonKey
    );
  }
}
