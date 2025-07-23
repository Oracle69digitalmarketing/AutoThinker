// autothinker_backend/src/location/location.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocationService {
  // This data can eventually come from a Supabase table or an external API
  private readonly countriesData = [
    { code: 'US', name: 'United States', states: ['California', 'New York', 'Texas', 'Florida'] },
    { code: 'NG', name: 'Nigeria', states: ['Lagos', 'Abuja', 'Ogun', 'Ondo', 'Rivers'] },
    { code: 'CA', name: 'Canada', states: ['Ontario', 'Quebec', 'British Columbia', 'Alberta'] },
    { code: 'GB', name: 'United Kingdom', states: ['England', 'Scotland', 'Wales', 'Northern Ireland'] },
    { code: 'DE', name: 'Germany', states: ['Bavaria', 'Berlin', 'Hamburg', 'North Rhine-Westphalia'] },
    // Add more countries and their states/provinces/regions as needed
  ];

  findAllCountries(): { code: string; name: string; states: string[] }[] {
    return this.countriesData;
  }

  findStatesByCountryCode(countryCode: string): string[] {
    const country = this.countriesData.find(c => c.code.toLowerCase() === countryCode.toLowerCase());
    return country ? country.states : [];
  }
}
