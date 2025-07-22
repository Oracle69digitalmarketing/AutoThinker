import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { GenerateDto } from './dto/generate.dto';
import { AiService } from '../ai/ai.service';
import { SupabaseService } from '../supabase/supabase.service';
import { Response } from 'express'; // Import Response from express for explicit typing

@Controller('api/generate')
export class GenerateController {
  constructor(
    private readonly aiService: AiService,
    private readonly supabaseService: SupabaseService,
  ) {}

  @Post()
  async generateBlueprint(
    @Body() generateDto: GenerateDto,
    @Res() res: Response // Use @Res() to directly control the response
  ) {
    const { idea, mode, output_format } = generateDto; // Output format currently for future implementation

    try {
      // 1. Generate blueprint using AI service
      const blueprint = await this.aiService.generateBusinessBlueprint(idea, mode);

      // 2. Store the generated blueprint in Supabase
      // For MVP, we're just inserting the core data. Add user_id later with auth.
      const { data, error } = await this.supabaseService.client
        .from('blueprints') // Ensure you have a 'blueprints' table in Supabase
        .insert([{
          idea: idea,
          mode: mode,
          generated_content: blueprint, // Store the JSON output
          created_at: new Date().toISOString()
        }]);

      if (error) {
        console.error('Supabase insertion error:', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to save blueprint.', error: error.message });
      }

      // 3. Return the generated content to the frontend
      // Currently, we're returning JSON regardless of output_format for MVP.
      // The `output_format` will dictate frontend rendering or specific backend export functions later.
      return res.status(HttpStatus.OK).json({
        message: 'Blueprint generated and saved successfully.',
        blueprint: blueprint,
        savedData: data, // Optional: show what Supabase returned
      });

    } catch (error) {
      console.error('Error generating or storing blueprint:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error during blueprint generation.',
        error: error.message,
      });
    }
  }
}
