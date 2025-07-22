"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface ToolRecommendationInput {
  businessType: string
  budget: string
  teamSize: string
}

export async function getToolRecommendations(input: ToolRecommendationInput) {
  const { text } = await generateText({
    model: openai("gpt-4o"),
    system: `You are a SaaS and business tool expert that recommends the best tools for different business needs.

Based on the business type, budget, and team size, recommend 8-12 tools across different categories:
- Website & Hosting
- Marketing
- Analytics
- Communication
- Finance
- Productivity

For each tool, provide:
- Name and category
- Description and key features
- Pricing information
- Rating (1-5)
- Setup complexity (Easy/Medium/Advanced)
- Integration capabilities
- Whether it's recommended for this specific use case

Return as JSON array of tool objects:
[
  {
    "name": "Tool Name",
    "category": "Category",
    "description": "Tool description",
    "pricing": "Pricing model",
    "rating": 4.5,
    "features": ["Feature 1", "Feature 2", ...],
    "integrations": ["Integration 1", ...],
    "setupComplexity": "Easy",
    "url": "https://tool-website.com",
    "recommended": true/false
  }
]`,
    prompt: `Business Type: ${input.businessType}
Budget: ${input.budget}
Team Size: ${input.teamSize}

Recommend the best tools for this business setup.`,
  })

  try {
    return JSON.parse(text)
  } catch (error) {
    console.error("Error parsing tool recommendations:", error)
    // Return fallback recommendations
    return [
      {
        name: "Vercel",
        category: "website",
        description: "Modern web hosting and deployment platform",
        pricing: "Free tier available, Pro from $20/mo",
        rating: 4.8,
        features: ["Instant deployments", "Global CDN", "Serverless functions"],
        integrations: ["GitHub", "GitLab", "Bitbucket"],
        setupComplexity: "Easy",
        url: "https://vercel.com",
        recommended: true,
      },
      {
        name: "Stripe",
        category: "finance",
        description: "Online payment processing platform",
        pricing: "2.9% + 30¢ per transaction",
        rating: 4.7,
        features: ["Payment processing", "Subscription billing", "Fraud protection"],
        integrations: ["Most e-commerce platforms", "Accounting software"],
        setupComplexity: "Medium",
        url: "https://stripe.com",
        recommended: true,
      },
    ]
  }
}
