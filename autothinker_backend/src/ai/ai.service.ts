// autothinker_backend/src/ai/ai.service.ts
import { Injectable } from '@nestjs/common';
import { OpenAI } from 'langchain/llms/openai'; // This module should now be found
import { PromptTemplate } from 'langchain/prompts'; // This module should now be found
import { ConfigService } from '../config/config.service';

@Injectable()
export class AiService {
  private openai: OpenAI; // Ensure this is defined if not already

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      // Corrected: call the getter method
      openAIApiKey: this.configService.getOpenAiApiKey(),
      temperature: 0.7,
    });
  }

  async generateStrategy(prompt: string): Promise<string> {
    const template = new PromptTemplate({
      template: "{prompt}",
      inputVariables: ["prompt"],
    });

    const chain = new (require('langchain/chains')).LLMChain({
      llm: this.openai,
      prompt: template,
    });

    const result = await chain.call({ prompt });
    return result.text;
  }
}
