// autothinker_backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GenerateModule } from './generate/generate.module';
import { ConfigAppModule } from './config/config.module';
import { LocationModule } from './location/location.module'; // NEW: Import LocationModule

@Module({
  imports: [
    ConfigAppModule,
    GenerateModule,
    LocationModule, // NEW: Add LocationModule to imports
    // Other modules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
