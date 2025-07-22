"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface SocialAnalysisInput {
  platforms: string[]
  contentTypes: string[]
  targetAudience: string
  businessGoals: string[]
  currentMetrics?: {
    followers: number
    engagement: number
    reach: number
  }
}

export async function analyzeSocialPerformance(input: SocialAnalysisInput) {
  const { text } = await generateText({
    model: openai("gpt-4o"),
    system: `You are a social media analytics AI that provides performance insights and optimization strategies.

Analyze the social media strategy and provide:
1. PERFORMANCE ANALYSIS: Current performance assessment
2. CONTENT OPTIMIZATION: Content strategy improvements
3. AUDIENCE INSIGHTS: Target audience analysis
4. GROWTH STRATEGIES: Specific tactics for growth
5. COMPETITIVE ANALYSIS: Industry benchmarks and opportunities

Return as JSON:
{
  "performanceScore": number (1-100),
  "platformAnalysis": [
    {
      "platform": "Platform name",
      "currentPerformance": "Assessment",
      "opportunities": ["Opportunity 1", "Opportunity 2"],
      "recommendedActions": ["Action 1", "Action 2"],
      "expectedGrowth": "Growth projection"
    }
  ],
  "contentStrategy": {
    "topPerformingTypes": ["Content type 1", "Content type 2"],
    "optimalPostingTimes": ["Time 1", "Time 2"],
    "contentMix": {
      "educational": "percentage",
      "promotional": "percentage",
      "entertainment": "percentage",
      "userGenerated": "percentage"
    },
    "hashtagStrategy": ["#hashtag1", "#hashtag2"]
  },
  "audienceInsights": {
    "demographics": "Audience description",
    "interests": ["Interest 1", "Interest 2"],
    "painPoints": ["Pain point 1", "Pain point 2"],
    "preferredContent": ["Content type 1", "Content type 2"]
  },
  "growthTactics": [
    {
      "tactic": "Growth tactic",
      "difficulty": "Easy/Medium/Hard",
      "timeToResults": "Timeframe",
      "expectedImpact": "Impact description"
    }
  ],
  "competitiveAnalysis": {
    "industryBenchmarks": {
      "averageEngagement": "percentage",
      "postFrequency": "posts per week",
      "followerGrowth": "percentage per month"
    },
    "opportunities": ["Opportunity 1", "Opportunity 2"]
  }
}`,
    prompt: `Social Media Strategy:
Platforms: ${input.platforms.join(", ")}
Content Types: ${input.contentTypes.join(", ")}
Target Audience: ${input.targetAudience}
Business Goals: ${input.businessGoals.join(", ")}
${input.currentMetrics ? `Current Metrics: ${input.currentMetrics.followers} followers, ${input.currentMetrics.engagement}% engagement, ${input.currentMetrics.reach} reach` : ""}

Provide comprehensive social media performance analysis and optimization strategies.`,
  })

  try {
    return JSON.parse(text)
  } catch (error) {
    console.error("Error parsing social analysis:", error)
    throw new Error("Failed to analyze social performance")
  }
}
