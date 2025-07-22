// autothinker_backend/src/generate/generate.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateService {
  // You can add methods here later for more complex generation logic,
  // beyond just calling the AI.
  // For now, it just needs to exist so the controller can inject it.
  getHello(): string {
    return 'Hello from GenerateService!';
  }
}
