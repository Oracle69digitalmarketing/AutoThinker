import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private nestConfigService: NestConfigService) {}

  get supabaseUrl(): string {
    return this.nestConfigService.get<string>('SUPABASE_URL');
  }

  get supabaseAnonKey(): string {
    return this.nestConfigService.get<string>('SUPABASE_ANON_KEY');
  }

  get openaiApiKey(): string {
    return this.nestConfigService.get<string>('OPENAI_API_KEY');
  }
}
