"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface EmailOptimizationInput {
  campaignType: string
  audience: string
  currentMetrics: {
    openRate: number
    clickRate: number
    unsubscribeRate: number
    listSize: number
  }
  goals: string[]
}

export async function optimizeEmailCampaigns(input: EmailOptimizationInput) {
  const { text } = await generateText({
    model: openai("gpt-4o"),
    system: `You are an email marketing optimization AI that analyzes campaign performance and provides improvement strategies.

Analyze the email campaign data and provide:
1. PERFORMANCE ASSESSMENT: Current metrics analysis
2. OPTIMIZATION OPPORTUNITIES: Specific improvements
3. SUBJECT LINE STRATEGIES: A/B testing recommendations
4. CONTENT OPTIMIZATION: Email content improvements
5. AUTOMATION WORKFLOWS: Advanced sequence strategies

Return as JSON:
{
  "performanceGrade": "A/B/C/D/F",
  "benchmarkComparison": {
    "yourOpenRate": number,
    "industryAverage": number,
    "yourClickRate": number,
    "industryClickAverage": number
  },
  "optimizationOpportunities": [
    {
      "area": "Optimization area",
      "currentIssue": "Current problem",
      "solution": "Recommended solution",
      "expectedImprovement": "Expected improvement percentage",
      "implementationDifficulty": "Easy/Medium/Hard"
    }
  ],
  "subjectLineStrategies": [
    {
      "strategy": "Strategy name",
      "examples": ["Example 1", "Example 2"],
      "expectedLift": "percentage improvement"
    }
  ],
  "contentOptimization": {
    "emailStructure": "Recommended structure",
    "callToAction": "CTA recommendations",
    "personalization": "Personalization strategies",
    "visualElements": "Visual recommendations"
  },
  "automationWorkflows": [
    {
      "workflowName": "Workflow name",
      "trigger": "Trigger event",
      "sequence": ["Email 1", "Email 2", "Email 3"],
      "expectedResults": "Expected outcomes"
    }
  ],
  "segmentationStrategy": {
    "recommendedSegments": ["Segment 1", "Segment 2"],
    "segmentationCriteria": ["Criteria 1", "Criteria 2"],
    "expectedImpact": "Impact description"
  }
}`,
    prompt: `Email Campaign Analysis:
Campaign Type: ${input.campaignType}
Target Audience: ${input.audience}
Current Metrics:
- Open Rate: ${input.currentMetrics.openRate}%
- Click Rate: ${input.currentMetrics.clickRate}%
- Unsubscribe Rate: ${input.currentMetrics.unsubscribeRate}%
- List Size: ${input.currentMetrics.listSize}
Goals: ${input.goals.join(", ")}

Provide comprehensive email campaign optimization analysis and recommendations.`,
  })

  try {
    return JSON.parse(text)
  } catch (error) {
    console.error("Error parsing email optimization:", error)
    throw new Error("Failed to optimize email campaigns")
  }
}
