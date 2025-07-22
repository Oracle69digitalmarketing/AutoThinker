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

// Enhanced demo strategy with more comprehensive data
const generateDemoStrategy = (input: StrategyInput) => {
  const ideaKeyword = input.idea.split(" ")[0] || "Business"

  return {
    branding: {
      businessNames: [
        `${ideaKeyword}Pro`,
        `Smart${ideaKeyword}`,
        `${ideaKeyword}Hub`,
        `Next${ideaKeyword}`,
        `${ideaKeyword}Boost`,
        `${ideaKeyword}Labs`,
        `${ideaKeyword}Works`,
        `${ideaKeyword}Connect`,
        `${ideaKeyword}Flow`,
        `${ideaKeyword}Sphere`,
      ],
      tagline: "Transforming ideas into reality, one innovation at a time",
      elevatorPitch: `Our innovative ${input.idea} solution addresses critical market gaps by providing exceptional value to ${input.targetMarket || "target customers"}. We combine cutting-edge technology with user-centric design to deliver measurable results that matter. With our proven approach and deep industry expertise, we're positioned to capture significant market share in the rapidly growing ${input.industry || "target"} sector.`,
      valueProposition: `We help ${input.targetMarket || "businesses"} achieve their goals through our comprehensive ${input.idea} platform, delivering measurable results, exceptional user experience, and sustainable growth opportunities.`,
      brandPersonality:
        "Professional, innovative, and customer-focused with a modern approach to solving traditional challenges while maintaining authenticity and trust.",
    },
    marketAnalysis: {
      swotAnalysis: {
        strengths: [
          "Innovative technology approach",
          "Strong technical foundation",
          "Clear market need identified",
          "Scalable business model",
          "First-mover advantage potential",
          "Experienced founding team",
        ],
        weaknesses: [
          "New brand in established market",
          "Limited initial resources",
          "Customer acquisition challenges",
          "Dependency on key personnel",
          "Technology development risks",
        ],
        opportunities: [
          "Growing market demand",
          "Digital transformation acceleration",
          "Strategic partnership potential",
          "International expansion possibilities",
          "Emerging technology adoption",
          "Regulatory support trends",
        ],
        threats: [
          "Established competitor responses",
          "Economic uncertainty impacts",
          "Rapid technology changes",
          "Regulatory compliance challenges",
          "Market saturation risks",
          "Funding environment changes",
        ],
      },
      marketSize: `The ${input.industry || "target"} market is experiencing robust growth with a total addressable market (TAM) of approximately $12.5B globally. The serviceable addressable market (SAM) represents $2.8B, with our serviceable obtainable market (SOM) estimated at $180M over the next 5 years. Market research indicates 18% annual growth driven by digital adoption and changing consumer behaviors.`,
      competitors: [
        "Established Market Leader Corp",
        "Innovative Startup Competitor",
        "Traditional Solution Provider",
        "Enterprise-focused Platform",
        "Regional Market Player",
      ],
      pricingStrategy:
        "Value-based tiered pricing model starting with freemium to drive adoption, followed by Pro ($29/month) and Enterprise ($99/month) tiers. Pricing 15% below premium competitors while offering superior value proposition.",
    },
    customerInsights: {
      personas: [
        {
          name: "Primary Decision Maker",
          demographics: "35-50 years old, urban/suburban professionals, $75K-150K income, college-educated",
          psychographics:
            "Results-oriented, values efficiency and ROI, early technology adopter, prefers proven solutions",
          painPoints: [
            "Time-consuming manual processes",
            "Lack of integrated solutions",
            "High implementation costs",
            "Poor user experience with current tools",
            "Difficulty measuring ROI",
          ],
          goals: [
            "Increase operational efficiency",
            "Reduce costs and complexity",
            "Improve team productivity",
            "Achieve measurable results",
            "Stay competitive in market",
          ],
          acquisitionChannels: [
            "LinkedIn and professional networks",
            "Industry conferences and events",
            "Content marketing and SEO",
            "Referral programs",
            "Direct sales outreach",
          ],
        },
        {
          name: "End User Champion",
          demographics: "25-40 years old, tech-savvy professionals, $45K-85K income, diverse educational backgrounds",
          psychographics:
            "Innovation-focused, values user experience, influences purchasing decisions, seeks efficiency",
          painPoints: [
            "Complex software interfaces",
            "Lack of mobile accessibility",
            "Insufficient training resources",
            "Limited customization options",
            "Poor customer support",
          ],
          goals: [
            "Streamline daily workflows",
            "Access tools anywhere, anytime",
            "Learn new skills and capabilities",
            "Collaborate effectively with team",
            "Advance career through efficiency",
          ],
          acquisitionChannels: [
            "Social media platforms",
            "Product hunt and tech communities",
            "Peer recommendations",
            "Free trial experiences",
            "Educational content",
          ],
        },
      ],
      customerJourney: [
        "Problem Recognition",
        "Information Gathering",
        "Solution Evaluation",
        "Vendor Comparison",
        "Trial/Demo Request",
        "Purchase Decision",
        "Implementation",
        "Onboarding",
        "Adoption",
        "Optimization",
        "Renewal/Expansion",
        "Advocacy",
      ],
    },
    productStrategy: {
      mvpFeatures: [
        "User authentication and security",
        "Core functionality dashboard",
        "Real-time analytics and reporting",
        "Mobile-responsive interface",
        "Customer support integration",
        "Payment processing system",
        "User profile and settings",
        "Advanced search and filtering",
        "Notification and alert system",
        "Data export and backup",
        "API access and integrations",
        "Team collaboration tools",
        "Customizable workflows",
        "Performance monitoring",
        "Security and compliance features",
      ],
      roadmap: {
        month1: [
          "Complete MVP development",
          "Conduct user acceptance testing",
          "Implement security measures",
          "Set up analytics tracking",
          "Prepare launch materials",
        ],
        month3: [
          "Launch beta program",
          "Gather user feedback",
          "Implement feature enhancements",
          "Begin marketing campaigns",
          "Establish customer support",
          "Develop partnership pipeline",
        ],
        month6: [
          "Full product launch",
          "Scale customer acquisition",
          "Add advanced features",
          "Expand team capabilities",
          "Explore new markets",
          "Plan Series A funding",
        ],
      },
      techRequirements: [
        "Cloud infrastructure (AWS/Azure)",
        "Database management system",
        "API development framework",
        "Security implementation",
        "Analytics and monitoring",
        "CDN and performance optimization",
        "Backup and disaster recovery",
        "Compliance and data protection",
      ],
    },
    marketingGrowth: {
      goToMarket:
        "Multi-channel approach combining inbound marketing, strategic partnerships, and direct sales. Focus on content-driven lead generation, free trial conversions, and customer success stories to build market credibility and drive organic growth.",
      contentThemes: [
        "Industry thought leadership",
        "How-to guides and tutorials",
        "Customer success stories",
        "Product updates and features",
        "Market trends and insights",
        "Best practices and tips",
        "Case studies and ROI analysis",
        "Webinars and educational content",
      ],
      socialStrategy:
        "Professional-focused approach leveraging LinkedIn for B2B engagement, Twitter for thought leadership, and YouTube for educational content. Emphasis on building community around shared challenges and solutions.",
      emailSequence: [
        "Welcome and onboarding series",
        "Product education and tips",
        "Customer success highlights",
        "Feature announcements",
        "Industry insights and trends",
        "Community spotlights",
        "Renewal and upsell campaigns",
      ],
    },
    financials: {
      revenueModel:
        "Subscription-based SaaS model with freemium entry point. Three tiers: Free (limited features), Pro ($29/month), and Enterprise ($99/month). Additional revenue from professional services, training, and premium integrations.",
      costStructure: [
        "Technology infrastructure (25%)",
        "Personnel and salaries (45%)",
        "Marketing and sales (20%)",
        "Operations and overhead (10%)",
      ],
      breakEven:
        "Projected break-even at 18 months with 2,500 paying customers. Monthly recurring revenue target of $75K to achieve profitability based on current cost structure and growth projections.",
      fundingNeeds: `Initial funding requirement of ${input.budget || "$250,000"} for MVP development and 12-month runway. Series A target of $2M for scaling operations, team expansion, and market penetration.`,
    },
    operations: {
      keyMetrics: [
        "Monthly Recurring Revenue (MRR)",
        "Customer Acquisition Cost (CAC)",
        "Customer Lifetime Value (LTV)",
        "Monthly Churn Rate",
        "Net Promoter Score (NPS)",
        "Monthly Active Users (MAU)",
        "Feature Adoption Rate",
        "Support Ticket Resolution Time",
      ],
      teamStructure: [
        "CEO/Founder - Strategy and Vision",
        "CTO - Technology Leadership",
        "VP Marketing - Growth and Acquisition",
        "Customer Success Manager",
        "Senior Developer",
        "Product Manager",
        "Sales Representative",
        "Operations Coordinator",
      ],
      techStack: [
        "Frontend: React/Next.js",
        "Backend: Node.js/Express",
        "Database: PostgreSQL",
        "Cloud: AWS/Vercel",
        "Payments: Stripe",
        "Analytics: Mixpanel/Google Analytics",
        "Communication: Slack/Discord",
        "Project Management: Linear/Notion",
      ],
      risks: [
        "Competitive market entry",
        "Technology development delays",
        "Customer acquisition challenges",
        "Team scaling difficulties",
        "Regulatory compliance changes",
        "Economic downturn impacts",
        "Funding availability",
        "Key personnel dependency",
      ],
    },
  }
}

export async function generateComprehensiveStrategy(input: StrategyInput) {
  // If no API key, return enhanced demo strategy
  if (!OPENAI_API_KEY) {
    console.warn("OPENAI_API_KEY not found, using enhanced demo strategy")
    return generateDemoStrategy(input)
  }

  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are AutoThinker, an advanced AI business strategist and co-founder that transforms raw business ideas into comprehensive, actionable startup blueprints. You have deep expertise across industries, markets, and business models.

Your task is to analyze the business idea and generate a complete, professional-grade strategy that includes:

1. BRANDING & IDENTITY:
   - 10 creative, memorable business name suggestions
   - Compelling tagline (under 10 words)
   - 4-sentence elevator pitch with clear value proposition
   - Detailed value proposition statement
   - Brand personality and tone guidelines

2. MARKET ANALYSIS:
   - Comprehensive SWOT analysis with 5-6 items in each category
   - Market size analysis (TAM, SAM, SOM)
   - Competitive landscape with 5+ competitors
   - Detailed pricing strategy with rationale

3. CUSTOMER INSIGHTS:
   - 2-3 detailed customer personas with complete profiles
   - Customer journey mapping with 10+ stages
   - Acquisition channels ranked by effectiveness
   - Pain points and goals analysis

4. PRODUCT STRATEGY:
   - 15+ MVP features prioritized by importance and impact
   - Detailed 6-month product roadmap
   - Technical requirements and architecture
   - Feature development timeline

5. MARKETING & GROWTH:
   - Comprehensive go-to-market strategy
   - Content marketing themes and calendar
   - Multi-channel social media strategy
   - Email marketing automation sequences

6. FINANCIAL PROJECTIONS:
   - Revenue model with multiple streams
   - Detailed cost structure breakdown
   - Break-even analysis with timeline
   - Funding requirements and milestones

7. OPERATIONAL FRAMEWORK:
   - Key performance indicators (KPIs)
   - Organizational structure and roles
   - Technology stack recommendations
   - Risk assessment and mitigation strategies

Return your response as a valid JSON object with this exact structure:
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

Be specific, actionable, and realistic. Consider industry trends, market dynamics, and competitive landscape. Provide data-driven insights where possible.`,
      prompt: `Business Idea: ${input.idea}
Industry: ${input.industry || "Not specified"}
Target Market: ${input.targetMarket || "Not specified"}
Budget: ${input.budget || "Not specified"}

Generate a comprehensive, professional-grade business strategy for this idea. Focus on actionable insights and realistic projections.`,
    })

    return JSON.parse(text)
  } catch (error) {
    console.error("Error generating comprehensive strategy:", error)
    // Fallback to enhanced demo strategy if AI fails
    return generateDemoStrategy(input)
  }
}
