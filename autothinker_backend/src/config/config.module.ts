// autothinker_backend/src/config/config.module.ts
import { Module, Global } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';

@Global() // Make ConfigModule global for easy access throughout the app
@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development',
      isGlobal: true, // Also make Nest's ConfigModule global
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService], // IMPORTANT: Export ConfigService so other modules can use it
})
export class ConfigAppModule {} // Renamed to ConfigAppModule to avoid conflict with NestConfigModule
