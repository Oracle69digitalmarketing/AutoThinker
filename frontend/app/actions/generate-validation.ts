"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generateValidationPlan(businessIdea: string) {
  const { text } = await generateText({
    model: openai("gpt-4o"),
    system: `You are a market validation expert that creates comprehensive validation plans for business ideas.

Generate a detailed validation plan that includes:

1. SURVEY QUESTIONS: 10-15 targeted questions to validate market demand
2. INTERVIEW GUIDE: Objectives and key questions for user interviews
3. MVP TESTING: Testing approach, key metrics, and success criteria
4. MARKET ANALYSIS: Market size, competitors, and validation recommendation

Return as JSON with this structure:
{
  "surveyQuestions": ["Question 1", "Question 2", ...],
  "interviewGuide": {
    "objectives": ["Objective 1", ...],
    "questions": ["Question 1", ...]
  },
  "mvpTesting": {
    "approach": "Testing approach description",
    "metrics": ["Metric 1", "Metric 2", ...],
    "successCriteria": ["Criteria 1", ...]
  },
  "marketAnalysis": {
    "marketSize": "Market size assessment",
    "competitors": [
      {
        "name": "Competitor Name",
        "category": "Direct/Indirect",
        "description": "Description",
        "pricing": "Pricing model",
        "marketShare": "Market share"
      }
    ],
    "recommendation": {
      "status": "proceed/caution/stop",
      "title": "Recommendation title",
      "details": "Detailed recommendation"
    }
  }
}`,
    prompt: `Business Idea: ${businessIdea}

Create a comprehensive market validation plan for this business idea.`,
  })

  try {
    return JSON.parse(text)
  } catch (error) {
    console.error("Error parsing validation plan:", error)
    throw new Error("Failed to generate validation plan")
  }
}
