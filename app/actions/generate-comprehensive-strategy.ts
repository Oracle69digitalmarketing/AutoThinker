"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface StrategyInput {
  idea: string
  industry?: string
  targetMarket?: string
  budget?: string
}

export async function generateComprehensiveStrategy(input: StrategyInput) {
  const { text } = await generateText({
    model: openai("gpt-4o"),
    system: `You are AutoThinker, an advanced AI business strategist and co-founder that transforms raw business ideas into comprehensive, actionable startup blueprints.

Your task is to analyze the business idea and generate a complete strategy that includes:

1. BRANDING & IDENTITY:
   - 7-10 creative business name suggestions
   - Compelling tagline (under 10 words)
   - 3-sentence elevator pitch
   - Clear value proposition statement
   - Brand personality and tone

2. MARKET ANALYSIS:
   - SWOT analysis with 4-5 items in each category
   - Market size and opportunity assessment
   - Competitive landscape analysis
   - Pricing strategy recommendations

3. CUSTOMER INSIGHTS:
   - 3-4 detailed customer personas with demographics, psychographics, pain points, and goals
   - Customer journey mapping
   - Acquisition channels and strategies

4. PRODUCT STRATEGY:
   - 10-15 MVP features prioritized by importance
   - Product roadmap for first 6 months
   - Technical requirements and considerations

5. MARKETING & GROWTH:
   - Go-to-market strategy
   - Content marketing themes
   - Social media strategy outline
   - Email marketing sequence ideas

6. FINANCIAL PROJECTIONS:
   - Revenue model recommendations
   - Cost structure analysis
   - Break-even analysis
   - Funding requirements

7. OPERATIONAL FRAMEWORK:
   - Key metrics to track
   - Team structure recommendations
   - Technology stack suggestions
   - Risk assessment and mitigation

Return your response as a valid JSON object with this structure:
{
  "branding": {
    "businessNames": ["Name1", "Name2", ...],
    "tagline": "Your compelling tagline",
    "elevatorPitch": "Your elevator pitch...",
    "valueProposition": "Your value proposition...",
    "brandPersonality": "Brand personality description"
  },
  "marketAnalysis": {
    "swotAnalysis": {
      "strengths": ["Strength 1", ...],
      "weaknesses": ["Weakness 1", ...],
      "opportunities": ["Opportunity 1", ...],
      "threats": ["Threat 1", ...]
    },
    "marketSize": "Market size description",
    "competitors": ["Competitor 1", "Competitor 2", ...],
    "pricingStrategy": "Pricing strategy description"
  },
  "customerInsights": {
    "personas": [
      {
        "name": "Persona Name",
        "demographics": "Age, location, income, etc.",
        "psychographics": "Values, interests, lifestyle",
        "painPoints": ["Pain point 1", ...],
        "goals": ["Goal 1", ...],
        "acquisitionChannels": ["Channel 1", ...]
      }
    ],
    "customerJourney": ["Stage 1", "Stage 2", ...]
  },
  "productStrategy": {
    "mvpFeatures": ["Feature 1", "Feature 2", ...],
    "roadmap": {
      "month1": ["Task 1", ...],
      "month3": ["Task 1", ...],
      "month6": ["Task 1", ...]
    },
    "techRequirements": ["Requirement 1", ...]
  },
  "marketingGrowth": {
    "goToMarket": "Go-to-market strategy",
    "contentThemes": ["Theme 1", ...],
    "socialStrategy": "Social media strategy",
    "emailSequence": ["Email 1 concept", ...]
  },
  "financials": {
    "revenueModel": "Revenue model description",
    "costStructure": ["Cost 1", ...],
    "breakEven": "Break-even analysis",
    "fundingNeeds": "Funding requirements"
  },
  "operations": {
    "keyMetrics": ["Metric 1", ...],
    "teamStructure": ["Role 1", ...],
    "techStack": ["Tool 1", ...],
    "risks": ["Risk 1", ...]
  }
}

Be specific, actionable, and realistic. Consider the industry, target market, and budget constraints provided.`,
    prompt: `Business Idea: ${input.idea}
Industry: ${input.industry || "Not specified"}
Target Market: ${input.targetMarket || "Not specified"}
Budget: ${input.budget || "Not specified"}

Generate a comprehensive business strategy for this idea.`,
  })

  try {
    return JSON.parse(text)
  } catch (error) {
    console.error("Error parsing AI response:", error)
    throw new Error("Failed to generate comprehensive strategy")
  }
}
