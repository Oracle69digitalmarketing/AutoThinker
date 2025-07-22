"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface FormationInput {
  businessName: string
  businessType: string
  state: string
}

export async function generateFormationPlan(input: FormationInput) {
  const { text } = await generateText({
    model: openai("gpt-4o"),
    system: `You are a business formation expert that provides detailed guidance for legally forming businesses.

Generate a comprehensive formation plan that includes:

1. OVERVIEW: Recommended entity type, timeline, benefits, and considerations
2. DOCUMENTS: Required filing documents with descriptions, fees, and processing times
3. COSTS: One-time and annual costs breakdown
4. NEXT STEPS: Action plan with timelines and specific actions

Return as JSON with this structure:
{
  "overview": {
    "recommendedEntity": "Entity recommendation",
    "entityReason": "Why this entity type",
    "timeline": "Formation timeline",
    "benefits": ["Benefit 1", ...],
    "considerations": ["Consideration 1", ...]
  },
  "documents": [
    {
      "name": "Document name",
      "description": "Document description",
      "fee": "$amount",
      "processingTime": "X days"
    }
  ],
  "costs": {
    "oneTime": [{"item": "Item", "amount": "amount"}],
    "oneTimeTotal": "total",
    "annual": [{"item": "Item", "amount": "amount"}],
    "annualTotal": "total"
  },
  "nextSteps": [
    {
      "title": "Step title",
      "description": "Step description",
      "timeline": "Timeline",
      "actions": ["Action 1", "Action 2"]
    }
  ]
}`,
    prompt: `Business Name: ${input.businessName}
Entity Type: ${input.businessType}
State: ${input.state}

Create a detailed business formation plan.`,
  })

  try {
    return JSON.parse(text)
  } catch (error) {
    console.error("Error parsing formation plan:", error)
    throw new Error("Failed to generate formation plan")
  }
}
