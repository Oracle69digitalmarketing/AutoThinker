import { IsString, IsIn } from 'class-validator';

export class GenerateDto {
  @IsString()
  idea: string;

  @IsIn(['branding', 'funnel', 'all']) // Matches modes defined in docs
  mode: 'branding' | 'funnel' | 'all';

  @IsIn(['react', 'json', 'pdf']) // Matches output_format from docs
  output_format: 'react' | 'json' | 'pdf'; // For MVP, we'll return JSON, format will be handled later
}
