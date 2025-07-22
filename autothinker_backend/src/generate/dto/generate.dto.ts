// autothinker_backend/src/generate/dto/generate.dto.ts
import { IsString, IsIn, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer'; // Needed for Type conversion (e.g., to number)

// Define enums if you have specific allowed values for mode/output_format
export enum Mode {
  MVP = 'MVP',
  DETAILED = 'DETAILED',
  // Add other modes as needed
}

export enum OutputFormat {
  JSON = 'JSON',
  TEXT = 'TEXT',
  // Add other formats as needed
}

export class GenerateDto {
  @IsString()
  idea: string;

  @IsString()
  industry: string; // Added

  @IsString()
  targetMarket: string; // Added

  @IsNumber()
  @IsOptional() // Make budget optional for now, adjust as needed
  @Type(() => Number) // Ensure it's transformed to a number if coming as string
  budget?: number; // Added

  @IsEnum(Mode)
  mode: Mode;

  @IsEnum(OutputFormat)
  output_format: OutputFormat;
}
