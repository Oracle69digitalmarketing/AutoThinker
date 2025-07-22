import { Module } from '@nestjs/common';
import { GenerateModule } from './generate/generate.module';
import { AppConfigModule } from './config/config.module';
import { SupabaseModule } from './supabase/supabase.module';
import { AiModule } from './ai/ai.module';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'; // For DTO validation

@Module({
  imports: [
    AppConfigModule, // Load config first
    SupabaseModule,
    AiModule,
    GenerateModule, // Your core generation module
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe, // Enable global DTO validation
    },
  ],
})
export class AppModule {}
