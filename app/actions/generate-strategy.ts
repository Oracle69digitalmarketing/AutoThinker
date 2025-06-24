"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
if (!OPENAI_API_KEY) {
  throw new Error(
    "OPENAI_API_KEY environment variable is missing. " + "Add it to your project settings or a local `.env` file.",
  )
}

export async function generateBusinessStrategy(idea: string) {
  const { text } = await generateText({
    model: openai("gpt-4o", { apiKey: OPENAI_API_KEY }),
    system: `You are AutoThinker, an AI business strategist that transforms raw business ideas into comprehensive startup blueprints. 

Your task is to analyze the user's business idea and generate a structured business strategy that includes:
1. 5-7 creative business name suggestions
2. A compelling tagline (under 10 words)
3. A 2-3 sentence elevator pitch
4. A clear value proposition statement
5. SWOT analysis with 3-4 items in each category
6. 2-3 detailed customer profiles with demographics, pain points, and goals
7. 8-12 MVP features prioritized for launch

Return your response as a valid JSON object with this exact structure:
{
  "businessNames": ["Name1", "Name2", ...],
  "tagline": "Your compelling tagline",
  "elevatorPitch": "Your elevator pitch...",
  "valueProposition": "Your value proposition...",
  "swotAnalysis": {
    "strengths": ["Strength 1", "Strength 2", ...],
    "weaknesses": ["Weakness 1", "Weakness 2", ...],
    "opportunities": ["Opportunity 1", "Opportunity 2", ...],
    "threats": ["Threat 1", "Threat 2", ...]
  },
  "customerProfiles": [
    {
      "name": "Customer Persona Name",
      "demographics": "Age, location, income, etc.",
      "painPoints": ["Pain point 1", "Pain point 2", ...],
      "goals": ["Goal 1", "Goal 2", ...]
    }
  ],
  "mvpFeatures": ["Feature 1", "Feature 2", ...]
}

Be creative, specific, and actionable. Focus on real market opportunities and practical implementation.`,
    prompt: `Business Idea: ${idea}

Generate a comprehensive business strategy for this idea.`,
  })

  try {
    return JSON.parse(text)
  } catch (error) {
    console.error("Error parsing AI response:", error)
    throw new Error("Failed to generate business strategy")
  }
}
