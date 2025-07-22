import { Injectable } from '@nestjs/common';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';
import { LLMChain } from 'langchain/chains';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AiService {
  private llm: OpenAI;

  constructor(private configService: ConfigService) {
    this.llm = new OpenAI({
      openAIApiKey: this.configService.openaiApiKey,
      temperature: 0.7, // Creative but still grounded
      modelName: 'gpt-4o', // As specified in docs
    });
  }

  async generateBusinessBlueprint(idea: string, mode: 'branding' | 'funnel' | 'all'): Promise<any> {
    let promptTemplate: PromptTemplate;

    switch (mode) {
      case 'branding':
        promptTemplate = new PromptTemplate({
          template: `You are an expert business strategist. Given the idea "{idea}", generate a concise branding blueprint including:
- Business Name Ideas (3-5 options)
- Tagline & Elevator Pitch
- Core Value Proposition
- Target Customer Persona (demographics, pain points, aspirations)
Return this as a JSON object.`,
          inputVariables: ['idea'],
        });
        break;
      case 'funnel':
        promptTemplate = new PromptTemplate({
          template: `You are an expert marketing strategist. Given the idea "{idea}", generate a basic marketing funnel strategy including:
- Lead Magnet Idea
- Tripwire Offer Idea
- Email Sequence Outline (3 emails)
- Sample Facebook Ad Copy
- Simple Funnel Wireframe concept (e.g., Landing Page -> Opt-in -> Thank You Page)
Return this as a JSON object.`,
          inputVariables: ['idea'],
        });
        break;
      case 'all':
      default:
        // Comprehensive blueprint for 'all' mode
        promptTemplate = new PromptTemplate({
          template: `You are an AI-powered business builder. Given the idea "{idea}", generate a complete startup blueprint including:
- Business Name Ideas (3-5 options)
- Tagline & Elevator Pitch
- Core Value Proposition
- SWOT Analysis
- Target Customer Persona (demographics, pain points, aspirations)
- MVP Feature List (3-5 key features)
- Lead Magnet Idea
- Tripwire Offer Idea
- Email Sequence Outline (3 emails)
- Sample Facebook Ad Copy
- Simple Funnel Wireframe concept (e.g., Landing Page -> Opt-in -> Thank You Page)
Return this as a JSON object. Ensure the output is valid JSON and directly parsable.`,
          inputVariables: ['idea'],
        });
        break;
    }

    const chain = new LLMChain({
      prompt: promptTemplate,
      llm: this.llm,
    });

    try {
      const result = await chain.call({ idea });
      // Attempt to parse the string result into a JSON object
      return JSON.parse(result.text);
    } catch (error) {
      console.error('AI generation or JSON parsing error:', error);
      throw new Error('Failed to generate blueprint or parse AI response.');
    }
  }
}

