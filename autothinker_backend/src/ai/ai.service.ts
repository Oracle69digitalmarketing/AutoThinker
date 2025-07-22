// autothinker_backend/src/ai/ai.service.ts
import { Injectable } from '@nestjs/common';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      openAIApiKey: this.configService.getOpenAiApiKey(), // CORRECTED LINE
      temperature: 0.7,
    });
  }

  async generateStrategy(prompt: string): Promise<string> {
    const template = new PromptTemplate({
      template: "{prompt}",
      inputVariables: ["prompt"],
    });

    // Ensure 'langchain/chains' is correctly imported or 'require'd if needed
    // The previous error for 'langchain/llms/openai' and 'langchain/prompts'
    // should be fixed by the npm install command you ran earlier.
    const chain = new (require('langchain/chains')).LLMChain({
      llm: this.openai,
      prompt: template,
    });

    const result = await chain.call({ prompt });
    return result.text;
  }
}
