// autothinker_backend/src/location/location.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('locations') // Base route for this controller
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('countries') // GET /locations/countries
  findAllCountries() {
    return this.locationService.findAllCountries();
  }

  @Get('countries/:countryCode/states') // GET /locations/countries/US/states
  findStates(@Param('countryCode') countryCode: string) {
    return this.locationService.findStatesByCountryCode(countryCode);
  }
}
