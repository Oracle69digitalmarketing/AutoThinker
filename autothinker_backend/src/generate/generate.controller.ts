// autothinker_backend/src/generate/generate.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { GenerateService } from './generate.service';
import { GenerateDto } from './dto/generate.dto';
import { AiService } from '../ai/ai.service'; // Ensure this path is correct
import { SupabaseService } from '../supabase/supabase.service'; // Ensure this path is correct

@Controller('generate')
export class GenerateController {
  constructor(
    private readonly generateService: GenerateService,
    private readonly aiService: AiService, // Inject AiService
    private readonly supabaseService: SupabaseService, // Inject SupabaseService
  ) {}

  @Post()
  async generateComprehensiveStrategy(@Body() generateDto: GenerateDto) {
    const { idea, industry, targetMarket, budget, mode, output_format } = generateDto;

    // Corrected method call: generateStrategy
    const blueprint = await this.aiService.generateStrategy(idea);

    // Corrected method call: getClient()
    const supabaseClient = this.supabaseService.getClient();

    // Placeholder: You'll want to refine how you save this
    // For now, let's just save the blueprint as an example
    const { data, error } = await supabaseClient
      .from('strategies') // Make sure 'strategies' is your actual table name
      .insert({
        idea,
        industry,
        target_market: targetMarket,
        budget,
        mode,
        output_format,
        blueprint, // Save the generated blueprint
        created_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Error saving to Supabase:', error);
      // Depending on your error handling, you might throw an Http Exception
      return { status: 'error', message: 'Failed to save strategy to database.' };
    }

    return { status: 'success', strategy: blueprint };
  }
}
