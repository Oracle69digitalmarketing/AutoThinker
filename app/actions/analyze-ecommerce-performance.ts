"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface EcommerceAnalysisInput {
  storeData: {
    platform: string
    monthsActive: number
    productCount: number
    averageOrderValue: number
    conversionRate: number
    trafficSources: string[]
  }
  goals: {
    targetRevenue: number
    targetConversion: number
    growthTimeframe: string
  }
}

export async function analyzeEcommercePerformance(input: EcommerceAnalysisInput) {
  const { text } = await generateText({
    model: openai("gpt-4o"),
    system: `You are an e-commerce optimization AI that analyzes store performance and provides growth strategies.

Analyze the e-commerce data and provide:
1. PERFORMANCE ANALYSIS: Current store performance assessment
2. CONVERSION OPTIMIZATION: Strategies to improve conversion rates
3. PRODUCT OPTIMIZATION: Product catalog and pricing strategies
4. TRAFFIC OPTIMIZATION: Customer acquisition improvements
5. REVENUE GROWTH: Specific tactics for revenue increase

Return as JSON:
{
  "storeHealthScore": number (1-100),
  "performanceAnalysis": {
    "conversionRateAssessment": "Assessment",
    "aovAnalysis": "AOV analysis",
    "trafficQuality": "Traffic quality assessment",
    "industryComparison": {
      "yourConversion": number,
      "industryAverage": number,
      "yourAOV": number,
      "industryAOV": number
    }
  },
  "conversionOptimization": [
    {
      "area": "Optimization area",
      "currentIssue": "Current problem",
      "solution": "Recommended solution",
      "expectedLift": "percentage improvement",
      "implementationTime": "timeframe"
    }
  ],
  "productOptimization": {
    "pricingStrategy": "Pricing recommendations",
    "productMix": "Product portfolio advice",
    "inventoryOptimization": "Inventory recommendations",
    "crossSellOpportunities": ["Opportunity 1", "Opportunity 2"]
  },
  "trafficOptimization": {
    "topChannels": ["Channel 1", "Channel 2"],
    "underutilizedChannels": ["Channel 1", "Channel 2"],
    "contentStrategy": "Content marketing strategy",
    "seoOpportunities": ["SEO opportunity 1", "SEO opportunity 2"]
  },
  "revenueGrowthTactics": [
    {
      "tactic": "Growth tactic",
      "category": "Category",
      "expectedROI": "ROI estimate",
      "timeToImplement": "Implementation time",
      "resourcesRequired": "Required resources"
    }
  ],
  "automationOpportunities": [
    {
      "automation": "Automation type",
      "benefit": "Expected benefit",
      "complexity": "Easy/Medium/Hard",
      "tools": ["Tool 1", "Tool 2"]
    }
  ]
}`,
    prompt: `E-commerce Store Analysis:
Platform: ${input.storeData.platform}
Months Active: ${input.storeData.monthsActive}
Product Count: ${input.storeData.productCount}
Average Order Value: $${input.storeData.averageOrderValue}
Conversion Rate: ${input.storeData.conversionRate}%
Traffic Sources: ${input.storeData.trafficSources.join(", ")}

Goals:
Target Revenue: $${input.goals.targetRevenue}
Target Conversion: ${input.goals.targetConversion}%
Growth Timeframe: ${input.goals.growthTimeframe}

Provide comprehensive e-commerce performance analysis and optimization strategies.`,
  })

  try {
    return JSON.parse(text)
  } catch (error) {
    console.error("Error parsing e-commerce analysis:", error)
    throw new Error("Failed to analyze e-commerce performance")
  }
}
