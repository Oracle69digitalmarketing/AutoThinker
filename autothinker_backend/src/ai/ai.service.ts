// autothinker_backend/src/ai/ai.service.ts
import { Injectable } from '@nestjs/common';
import { OpenAI } from '@langchain/openai'; // UPDATED import
import { PromptTemplate } from '@langchain/core/prompts'; // UPDATED import
import { ConfigService } from '../config/config.service';
import { LLMChain } from 'langchain/chains'; // Explicitly import LLMChain

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      openAIApiKey: this.configService.getOpenAiApiKey(),
      temperature: 0.7,
    });
  }

  async generateStrategy(prompt: string): Promise<string> {
    const template = PromptTemplate.fromTemplate("{prompt}"); // Changed to static method
    // Or, if using old constructor:
    // const template = new PromptTemplate({
    //   template: "{prompt}",
    //   inputVariables: ["prompt"],
    // });


    const chain = new LLMChain({ // Use imported LLMChain
      llm: this.openai,
      prompt: template,
    });

    const result = await chain.invoke({ prompt }); // Changed to invoke for newer Langchain
    return result.text;
  }
}
