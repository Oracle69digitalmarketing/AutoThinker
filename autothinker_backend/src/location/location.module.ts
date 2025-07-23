// autothinker_backend/src/location/location.module.ts
import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

@Module({
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService], // Export if other modules might need to inject LocationService
})
export class LocationModule {}
