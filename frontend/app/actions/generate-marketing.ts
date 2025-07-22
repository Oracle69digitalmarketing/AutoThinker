"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface MarketingInput {
  businessContext: string
  channel: string
  campaignType: string
}

export async function generateMarketingContent(input: MarketingInput) {
  const { text } = await generateText({
    model: openai("gpt-4o"),
    system: `You are a marketing expert AI that generates high-converting marketing content across multiple channels.

Based on the channel and campaign type, generate appropriate content:

For EMAIL campaigns:
- 5-7 email sequence with subject lines, preview text, and full body copy
- Include timing recommendations (Day 1, Day 3, etc.)
- Personalization suggestions

For LANDING PAGE campaigns:
- Compelling headline and subheadline
- Value propositions list
- Social proof elements
- Call-to-action copy
- FAQ section

For SOCIAL MEDIA campaigns:
- Platform-specific posts (Facebook, Instagram, LinkedIn, Twitter)
- Hashtag recommendations
- Visual content suggestions
- Engagement strategies

For AD COPY campaigns:
- Multiple headline variations
- Ad descriptions for different platforms
- Call-to-action options
- Targeting suggestions

Return as JSON with appropriate structure for the selected channel.`,
    prompt: `Business Context: ${input.businessContext}
Channel: ${input.channel}
Campaign Type: ${input.campaignType}

Generate comprehensive marketing content for this campaign.`,
  })

  try {
    return JSON.parse(text)
  } catch (error) {
    console.error("Error parsing marketing content:", error)
    throw new Error("Failed to generate marketing content")
  }
}
