// src/app/actions/generate-comprehensive-strategy.ts
"use server"

// We will remove AI SDK imports as we are now calling our own backend
// import { generateText } from "ai"
// import { openai } from "@ai-sdk/openai"

interface StrategyInput {
  idea: string
  industry?: string
  targetMarket?: string
  budget?: string
  mode: 'branding' | 'funnel' | 'all'; // Added to match backend DTO
  output_format: 'react' | 'json' | 'pdf'; // Added to match backend DTO
}

// Define your backend URL using a public environment variable for Vercel
// Or hardcode it directly if you prefer for now (less flexible)
const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://autothinker.onrender.com"; // Your Render Backend URL

// Enhanced demo strategy (remains the same for fallback)
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
      fundingNeeds: `${input.budget || "$250,000"}`,
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
  // We will remove this check as our backend will handle AI key validation
  // if (!OPENAI_API_KEY) {
  //   console.warn("OPENAI_API_KEY not found, using enhanced demo strategy")
  //   return generateDemoStrategy(input)
  // }

  try {
    // --- THIS IS THE CRUCIAL CHANGE ---
    // Make a fetch request to your deployed NestJS backend
    const response = await fetch(`${BACKEND_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Ensure the payload matches the GenerateDto on your backend
      body: JSON.stringify({
        idea: input.idea,
        mode: input.mode || 'all', // Default to 'all' if not provided
        output_format: input.output_format || 'json', // Default to 'json' if not provided
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Backend API error:', errorData);
      throw new Error(`Backend API responded with status ${response.status}: ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.blueprint; // Assuming your backend returns { message: ..., blueprint: {...} }

  } catch (error) {
    console.error("Error calling backend API:", error)
    // Fallback to enhanced demo strategy if backend call fails
    return generateDemoStrategy(input)
  }
}
