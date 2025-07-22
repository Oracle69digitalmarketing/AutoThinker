"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generateBusinessStrategy(idea: string) {
  // Check if we have an API key
  const hasApiKey = !!process.env.OPENAI_API_KEY

  if (!hasApiKey) {
    // Return enhanced demo data when no API key
    return {
      branding: {
        businessNames: [
          "InnovatePro Solutions",
          "NextGen Ventures",
          "SmartFlow Systems",
          "Catalyst Business Hub",
          "Momentum Digital",
          "Apex Innovation Labs",
          "Velocity Growth Partners",
        ],
        tagline: "Transforming Ideas Into Success Stories",
        elevatorPitch:
          "We help entrepreneurs and businesses turn innovative ideas into profitable ventures through AI-powered strategy development, comprehensive market analysis, and actionable implementation roadmaps that drive real results.",
        valueProposition:
          "The only platform that combines artificial intelligence with proven business methodologies to create investment-ready strategies in minutes, not months.",
      },
      marketAnalysis: {
        swotAnalysis: {
          strengths: [
            "AI-powered strategy generation provides competitive advantage",
            "Comprehensive business planning reduces time-to-market",
            "Data-driven insights improve decision making",
            "Scalable platform architecture supports growth",
          ],
          weaknesses: [
            "New market entry requires customer education",
            "Dependency on AI technology and data quality",
            "Initial customer acquisition costs may be high",
            "Competition from established consulting firms",
          ],
          opportunities: [
            "Growing demand for AI-powered business solutions",
            "Expansion into international markets",
            "Partnership opportunities with business accelerators",
            "Integration with existing business software ecosystems",
          ],
          threats: [
            "Economic downturns affecting business investment",
            "Rapid technological changes requiring constant updates",
            "Data privacy regulations impacting AI capabilities",
            "Large tech companies entering the market",
          ],
        },
      },
      customerInsights: {
        personas: [
          {
            name: "Startup Founder Sarah",
            demographics: "Age 28-35, Tech-savvy entrepreneur, $50K-$100K income",
            psychographics: "Innovation-driven, time-conscious, data-oriented decision maker",
            painPoints: [
              "Limited time for comprehensive business planning",
              "Lack of expertise in market analysis",
              "Difficulty creating professional business documents",
              "Uncertainty about market validation",
            ],
            goals: [
              "Launch successful business within 6 months",
              "Secure funding from investors",
              "Build scalable business model",
              "Minimize risks and maximize ROI",
            ],
          },
          {
            name: "Corporate Innovation Manager Mike",
            demographics: "Age 35-45, MBA, $80K-$150K income, Fortune 500 company",
            psychographics: "Results-oriented, process-driven, strategic thinker",
            painPoints: [
              "Pressure to deliver innovative solutions quickly",
              "Need for data-backed business cases",
              "Resource constraints for new initiatives",
              "Stakeholder buy-in challenges",
            ],
            goals: [
              "Drive corporate innovation initiatives",
              "Present compelling business cases to executives",
              "Reduce time spent on strategy development",
              "Improve success rate of new ventures",
            ],
          },
        ],
      },
      productStrategy: {
        mvpFeatures: [
          "AI-powered business name generator with trademark checking",
          "Comprehensive SWOT analysis with industry benchmarks",
          "Customer persona development with behavioral insights",
          "Financial projections with scenario modeling",
          "Market sizing and competitive analysis",
          "Go-to-market strategy recommendations",
          "Risk assessment and mitigation planning",
          "Implementation roadmap with milestones",
          "Pitch deck template generation",
          "Business model canvas creation",
          "Revenue stream optimization",
          "Partnership opportunity identification",
        ],
      },
    }
  }

  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are AutoThinker, an expert AI business strategist with 20+ years of experience in startup development, market analysis, and business planning. You transform raw business ideas into comprehensive, investment-ready strategies.

Your expertise includes:
- Business model development and validation
- Market analysis and competitive intelligence
- Financial modeling and projections
- Customer development and persona creation
- Go-to-market strategy and execution
- Risk assessment and mitigation
- Branding and positioning strategy

Generate a detailed business strategy that includes:
1. 5-7 creative, memorable business names
2. A compelling tagline (under 10 words)
3. A 2-3 sentence elevator pitch
4. A clear value proposition statement
5. Comprehensive SWOT analysis (4+ items each)
6. 2-3 detailed customer personas with demographics, psychographics, pain points, and goals
7. 10-15 prioritized MVP features for launch

Return as valid JSON with this structure:
{
  "branding": {
    "businessNames": ["Name1", "Name2", ...],
    "tagline": "Compelling tagline",
    "elevatorPitch": "2-3 sentence pitch...",
    "valueProposition": "Clear value proposition..."
  },
  "marketAnalysis": {
    "swotAnalysis": {
      "strengths": ["Strength 1", ...],
      "weaknesses": ["Weakness 1", ...],
      "opportunities": ["Opportunity 1", ...],
      "threats": ["Threat 1", ...]
    }
  },
  "customerInsights": {
    "personas": [
      {
        "name": "Persona Name",
        "demographics": "Age, location, income...",
        "psychographics": "Values, interests, lifestyle...",
        "painPoints": ["Pain 1", "Pain 2", ...],
        "goals": ["Goal 1", "Goal 2", ...]
      }
    ]
  },
  "productStrategy": {
    "mvpFeatures": ["Feature 1", "Feature 2", ...]
  }
}

Be specific, actionable, and professional. Focus on real market opportunities.`,
      prompt: `Business Idea: ${idea}

Generate a comprehensive business strategy for this idea. Consider market trends, competitive landscape, and implementation feasibility.`,
    })

    return JSON.parse(text)
  } catch (error) {
    console.error("Error generating strategy:", error)

    // Fallback to demo data if AI fails
    return {
      branding: {
        businessNames: [
          "VisionCraft Solutions",
          "NextWave Innovations",
          "Catalyst Ventures",
          "Momentum Labs",
          "Apex Strategies",
        ],
        tagline: "Turning Vision Into Reality",
        elevatorPitch:
          "We help businesses transform innovative ideas into market-ready solutions through strategic planning and execution.",
        valueProposition: "The fastest way to validate and launch your business idea with confidence.",
      },
      marketAnalysis: {
        swotAnalysis: {
          strengths: ["Strong market demand", "Innovative approach", "Experienced team"],
          weaknesses: ["New market entry", "Limited initial resources"],
          opportunities: ["Growing market", "Technology trends", "Partnership potential"],
          threats: ["Competition", "Market volatility", "Regulatory changes"],
        },
      },
      customerInsights: {
        personas: [
          {
            name: "Early Adopter Emma",
            demographics: "Age 25-35, Tech professional, Urban",
            psychographics: "Innovation-focused, efficiency-driven",
            painPoints: ["Time constraints", "Information overload"],
            goals: ["Streamline processes", "Stay competitive"],
          },
        ],
      },
      productStrategy: {
        mvpFeatures: [
          "Core functionality",
          "User dashboard",
          "Basic analytics",
          "Mobile responsiveness",
          "User authentication",
        ],
      },
    }
  }
}
