"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface StrategyInput {
  idea: string
  industry?: string
  targetMarket?: string
  budget?: string
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

// Demo strategy for when API key is not available
const generateDemoStrategy = (input: StrategyInput) => {
  return {
    branding: {
      businessNames: [
        `${input.idea.split(" ")[0]}Pro`,
        `Smart${input.idea.split(" ")[0]}`,
        `${input.idea.split(" ")[0]}Hub`,
        `Next${input.idea.split(" ")[0]}`,
        `${input.idea.split(" ")[0]}Boost`,
        `${input.idea.split(" ")[0]}Labs`,
        `${input.idea.split(" ")[0]}Works`,
      ],
      tagline: "Transforming ideas into reality",
      elevatorPitch: `Our innovative ${input.idea} solution addresses key market needs by providing exceptional value to ${input.targetMarket || "target customers"}. We combine cutting-edge technology with user-centric design to deliver results that matter. With our proven approach, we're positioned to capture significant market share in the ${input.industry || "target"} industry.`,
      valueProposition: `We help ${input.targetMarket || "businesses"} achieve their goals through our ${input.idea} platform, delivering measurable results and exceptional user experience.`,
      brandPersonality:
        "Professional, innovative, and customer-focused with a modern approach to solving traditional challenges.",
    },
    marketAnalysis: {
      swotAnalysis: {
        strengths: [
          "Innovative approach",
          "Strong technical foundation",
          "Clear market need",
          "Scalable solution",
          "First-mover advantage",
        ],
        weaknesses: ["New to market", "Limited brand recognition", "Resource constraints", "Competition exists"],
        opportunities: [
          "Growing market demand",
          "Digital transformation trend",
          "Partnership potential",
          "Global expansion",
          "Emerging technologies",
        ],
        threats: ["Established competitors", "Economic uncertainty", "Technology changes", "Regulatory challenges"],
      },
      marketSize: `The ${input.industry || "target"} market is experiencing significant growth with increasing demand for innovative solutions. Market research indicates a potential addressable market of $2.5B+ with 15% annual growth.`,
      competitors: ["Established Player A", "Startup Competitor B", "Traditional Solution C", "Enterprise Leader D"],
      pricingStrategy:
        "Competitive pricing with value-based tiers to capture different market segments, starting with freemium model to drive adoption.",
    },
    customerInsights: {
      personas: [
        {
          name: "Primary User",
          demographics: "25-45 years old, urban professionals, middle to high income",
          psychographics: "Tech-savvy, efficiency-focused, values quality and convenience",
          painPoints: ["Time constraints", "Complex existing solutions", "High costs", "Poor user experience"],
          goals: ["Increase efficiency", "Reduce costs", "Improve outcomes", "Save time"],
          acquisitionChannels: ["Digital marketing", "Social media", "Referrals", "Content marketing"],
        },
        {
          name: "Secondary User",
          demographics: "30-55 years old, business decision makers, high income",
          psychographics: "Results-oriented, values ROI, prefers proven solutions",
          painPoints: ["Budget constraints", "Implementation complexity", "Team adoption", "Measuring success"],
          goals: ["Drive growth", "Optimize operations", "Competitive advantage", "Team productivity"],
          acquisitionChannels: ["Industry events", "B2B partnerships", "Direct sales", "Thought leadership"],
        },
      ],
      customerJourney: [
        "Awareness",
        "Interest",
        "Consideration",
        "Trial",
        "Purchase",
        "Onboarding",
        "Adoption",
        "Retention",
        "Advocacy",
      ],
    },
    productStrategy: {
      mvpFeatures: [
        "User registration and authentication",
        "Core functionality dashboard",
        "Basic analytics and reporting",
        "Mobile-responsive design",
        "Customer support integration",
        "Payment processing",
        "User profile management",
        "Search and filtering",
        "Notification system",
        "Data export capabilities",
        "API access",
        "Team collaboration tools",
        "Integration capabilities",
        "Security features",
        "Performance monitoring",
      ],
      roadmap: {
        month1: ["MVP development", "User testing", "Feedback collection", "Core feature refinement"],
        month3: ["Feature enhancements", "Marketing launch", "User acquisition", "Partnership development"],
        month6: ["Advanced features", "Scale operations", "International expansion", "Enterprise features"],
      },
      techRequirements: [
        "Cloud hosting",
        "Database management",
        "API development",
        "Security implementation",
        "Analytics platform",
        "CDN setup",
      ],
    },
    marketingGrowth: {
      goToMarket:
        "Launch with targeted digital marketing campaign focusing on early adopters and key market segments, leveraging content marketing and strategic partnerships.",
      contentThemes: [
        "Industry insights",
        "How-to guides",
        "Success stories",
        "Product updates",
        "Thought leadership",
        "Case studies",
      ],
      socialStrategy:
        "Multi-platform approach with focus on LinkedIn, Twitter, and industry-specific communities, emphasizing thought leadership and customer success stories.",
      emailSequence: [
        "Welcome series",
        "Product education",
        "Success stories",
        "Feature updates",
        "Best practices",
        "Community highlights",
      ],
    },
    financials: {
      revenueModel:
        "Subscription-based with multiple tiers (Freemium, Pro, Enterprise) to serve different customer segments and maximize lifetime value.",
      costStructure: [
        "Development costs",
        "Marketing expenses",
        "Operations",
        "Customer support",
        "Infrastructure",
        "Legal and compliance",
      ],
      breakEven: "Projected break-even within 12-18 months based on customer acquisition targets and retention rates.",
      fundingNeeds: `Initial funding of ${input.budget || "$50,000-100,000"} for MVP development and market entry, with potential Series A of $500K-1M for scaling.`,
    },
    operations: {
      keyMetrics: [
        "Monthly Recurring Revenue",
        "Customer Acquisition Cost",
        "Lifetime Value",
        "Churn Rate",
        "Net Promoter Score",
        "Monthly Active Users",
      ],
      teamStructure: [
        "Founder/CEO",
        "Technical Lead",
        "Marketing Manager",
        "Customer Success",
        "Sales Representative",
        "Product Manager",
      ],
      techStack: ["React/Next.js", "Node.js", "PostgreSQL", "AWS/Vercel", "Stripe", "Analytics tools"],
      risks: [
        "Market competition",
        "Technical challenges",
        "Funding constraints",
        "Team scaling",
        "Regulatory changes",
        "Economic downturn",
      ],
    },
  }
}

export async function generateComprehensiveStrategy(input: StrategyInput) {
  // If no API key, return demo strategy
  if (!OPENAI_API_KEY) {
    console.warn("OPENAI_API_KEY not found, using demo strategy")
    return generateDemoStrategy(input)
  }

  try {
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

    return JSON.parse(text)
  } catch (error) {
    console.error("Error generating comprehensive strategy:", error)
    // Fallback to demo strategy if AI fails
    return generateDemoStrategy(input)
  }
}
