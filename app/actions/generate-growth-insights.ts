"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface GrowthAnalysisInput {
  businessData: {
    industry: string
    monthsActive: number
    currentRevenue: number
    teamSize: number
    marketingChannels: string[]
  }
  goals: {
    targetRevenue: number
    timeframe: string
    primaryObjective: string
  }
}

export async function generateGrowthInsights(input: GrowthAnalysisInput) {
  const { text } = await generateText({
    model: openai("gpt-4o"),
    system: `You are a growth strategy AI that analyzes business data and provides actionable insights for scaling.

Analyze the business data and provide:
1. GROWTH OPPORTUNITIES: Specific areas for improvement
2. PERFORMANCE BENCHMARKS: Industry comparisons and targets
3. ACTION PLAN: Prioritized steps for achieving goals
4. RISK ASSESSMENT: Potential challenges and mitigation strategies
5. RESOURCE ALLOCATION: Budget and team recommendations

Return as JSON:
{
  "growthScore": number (1-100),
  "opportunities": [
    {
      "area": "Growth area",
      "impact": "High/Medium/Low",
      "effort": "High/Medium/Low",
      "description": "Detailed explanation",
      "expectedROI": "ROI estimate"
    }
  ],
  "benchmarks": {
    "industryAverage": {
      "revenue": number,
      "growthRate": "percentage",
      "customerAcquisitionCost": number
    },
    "yourPerformance": {
      "revenue": number,
      "growthRate": "percentage",
      "customerAcquisitionCost": number
    }
  },
  "actionPlan": [
    {
      "priority": number,
      "action": "Action description",
      "timeline": "timeframe",
      "resources": "Required resources",
      "expectedOutcome": "Expected result"
    }
  ],
  "risks": [
    {
      "risk": "Risk description",
      "probability": "High/Medium/Low",
      "impact": "High/Medium/Low",
      "mitigation": "Mitigation strategy"
    }
  ],
  "resourceAllocation": {
    "marketing": "percentage",
    "product": "percentage",
    "operations": "percentage",
    "team": "percentage"
  }
}`,
    prompt: `Business Data:
Industry: ${input.businessData.industry}
Months Active: ${input.businessData.monthsActive}
Current Revenue: $${input.businessData.currentRevenue}
Team Size: ${input.businessData.teamSize}
Marketing Channels: ${input.businessData.marketingChannels.join(", ")}

Goals:
Target Revenue: $${input.goals.targetRevenue}
Timeframe: ${input.goals.timeframe}
Primary Objective: ${input.goals.primaryObjective}

Provide comprehensive growth analysis and actionable recommendations.`,
  })

  try {
    return JSON.parse(text)
  } catch (error) {
    console.error("Error parsing growth insights:", error)
    throw new Error("Failed to generate growth insights")
  }
}
