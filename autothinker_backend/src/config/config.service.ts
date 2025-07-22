// autothinker_backend/src/config/config.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private nestConfigService: NestConfigService) {}

  getSupabaseUrl(): string {
    return this.nestConfigService.get<string>('SUPABASE_URL')!; // Added !
  }

  getSupabaseAnonKey(): string {
    return this.nestConfigService.get<string>('SUPABASE_ANON_KEY')!; // Added !
  }

  getOpenAiApiKey(): string {
    return this.nestConfigService.get<string>('OPENAI_API_KEY')!; // Added !
  }

  // Add a getter for the port if you have one, or other variables
  getPort(): number {
    return parseInt(this.nestConfigService.get<string>('PORT', '3000'), 10);
  }
}
