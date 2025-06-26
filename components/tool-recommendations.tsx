"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Zap, DollarSign, Users, BarChart, Mail, ExternalLink, Star, CheckCircle } from "lucide-react"
import { getToolRecommendations } from "@/app/actions/get-tool-recommendations"

interface Tool {
  name: string
  category: string
  description: string
  pricing: string
  rating: number
  features: string[]
  integrations: string[]
  setupComplexity: "Easy" | "Medium" | "Advanced"
  url: string
  recommended: boolean
}

export function ToolRecommendations() {
  const [businessType, setBusinessType] = useState("")
  const [budget, setBudget] = useState("")
  const [teamSize, setTeamSize] = useState("")
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Tools", icon: Globe },
    { id: "website", name: "Website & Hosting", icon: Globe },
    { id: "marketing", name: "Marketing", icon: Zap },
    { id: "analytics", name: "Analytics", icon: BarChart },
    { id: "communication", name: "Communication", icon: Mail },
    { id: "finance", name: "Finance", icon: DollarSign },
    { id: "productivity", name: "Productivity", icon: Users },
  ]

  const handleGetRecommendations = async () => {
    if (!businessType.trim()) return

    setLoading(true)
    try {
      const recommendations = await getToolRecommendations({
        businessType,
        budget,
        teamSize,
      })
      setTools(recommendations)
    } catch (error) {
      console.error("Error getting tool recommendations:", error)
      // Set fallback tools if API fails
      setTools([
        {
          name: "Vercel",
          category: "website",
          description: "Modern web hosting and deployment platform with global CDN",
          pricing: "Free tier available, Pro from $20/mo",
          rating: 4.8,
          features: ["Instant deployments", "Global CDN", "Serverless functions", "Analytics"],
          integrations: ["GitHub", "GitLab", "Bitbucket", "Figma"],
          setupComplexity: "Easy",
          url: "https://vercel.com",
          recommended: true,
        },
        {
          name: "Stripe",
          category: "finance",
          description: "Complete payment processing platform for online businesses",
          pricing: "2.9% + 30¢ per transaction",
          rating: 4.7,
          features: ["Payment processing", "Subscription billing", "Fraud protection", "Global payments"],
          integrations: ["Shopify", "WooCommerce", "QuickBooks", "Xero"],
          setupComplexity: "Medium",
          url: "https://stripe.com",
          recommended: true,
        },
        {
          name: "Mailchimp",
          category: "marketing",
          description: "All-in-one marketing platform for email campaigns and automation",
          pricing: "Free up to 500 contacts, paid plans from $13/mo",
          rating: 4.5,
          features: ["Email campaigns", "Marketing automation", "Landing pages", "Analytics"],
          integrations: ["Shopify", "WordPress", "Facebook", "Instagram"],
          setupComplexity: "Easy",
          url: "https://mailchimp.com",
          recommended: true,
        },
        {
          name: "Google Analytics",
          category: "analytics",
          description: "Comprehensive web analytics and reporting platform",
          pricing: "Free with premium features in GA4",
          rating: 4.6,
          features: ["Traffic analysis", "Conversion tracking", "Audience insights", "Real-time data"],
          integrations: ["Google Ads", "Search Console", "Tag Manager", "Data Studio"],
          setupComplexity: "Medium",
          url: "https://analytics.google.com",
          recommended: true,
        },
        {
          name: "Slack",
          category: "communication",
          description: "Team collaboration and communication platform",
          pricing: "Free tier available, Pro from $7.25/user/mo",
          rating: 4.4,
          features: ["Team messaging", "File sharing", "Video calls", "App integrations"],
          integrations: ["Google Drive", "Trello", "Zoom", "GitHub"],
          setupComplexity: "Easy",
          url: "https://slack.com",
          recommended: true,
        },
        {
          name: "Notion",
          category: "productivity",
          description: "All-in-one workspace for notes, docs, and project management",
          pricing: "Free for personal use, Team from $10/user/mo",
          rating: 4.7,
          features: ["Note-taking", "Project management", "Database", "Templates"],
          integrations: ["Google Drive", "Slack", "Figma", "GitHub"],
          setupComplexity: "Easy",
          url: "https://notion.so",
          recommended: true,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const filteredTools =
    selectedCategory === "all" ? tools : tools.filter((tool) => tool.category.toLowerCase() === selectedCategory)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-green-600" />
            <span>AI-Powered Tool Recommender</span>
            <Badge variant="secondary">100+ Integrations</Badge>
          </CardTitle>
          <CardDescription>
            Get personalized SaaS and tool recommendations based on your business needs, budget, and team size. Includes
            setup guides and direct integration links.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Business Type</label>
              <Input
                placeholder="e.g., E-commerce store, SaaS startup"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Monthly Budget</label>
              <Select value={budget} onValueChange={setBudget}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-100">Under $100</SelectItem>
                  <SelectItem value="100-500">$100 - $500</SelectItem>
                  <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                  <SelectItem value="1000-plus">$1,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Team Size</label>
              <Select value={teamSize} onValueChange={setTeamSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Select team size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solo">Solo (1 person)</SelectItem>
                  <SelectItem value="small">Small (2-10)</SelectItem>
                  <SelectItem value="medium">Medium (11-50)</SelectItem>
                  <SelectItem value="large">Large (50+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleGetRecommendations}
            disabled={!businessType.trim() || loading}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            {loading ? "Getting Recommendations..." : "Get Personalized Tool Stack"}
          </Button>
        </CardContent>
      </Card>

      {tools.length > 0 && (
        <div className="space-y-6">
          {/* Category Filter */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-7">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-1">
                  <category.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Recommended Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, index) => (
              <Card key={index} className={`relative ${tool.recommended ? "ring-2 ring-green-500" : ""}`}>
                {tool.recommended && (
                  <Badge className="absolute -top-2 -right-2 bg-green-600">
                    <Star className="w-3 h-3 mr-1" />
                    Recommended
                  </Badge>
                )}
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                      <Badge variant="outline" className="mt-1">
                        {tool.category}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{tool.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{tool.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Pricing:</span>
                      <span className="text-sm text-green-600 font-medium">{tool.pricing}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Setup:</span>
                      <Badge
                        variant={
                          tool.setupComplexity === "Easy"
                            ? "default"
                            : tool.setupComplexity === "Medium"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {tool.setupComplexity}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Key Features:</p>
                    <ul className="space-y-1">
                      {tool.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-xs">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {tool.integrations.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Integrations:</p>
                      <div className="flex flex-wrap gap-1">
                        {tool.integrations.slice(0, 3).map((integration, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {integration}
                          </Badge>
                        ))}
                        {tool.integrations.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{tool.integrations.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" className="flex-1" asChild>
                      <a href={tool.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Visit Site
                      </a>
                    </Button>
                    <Button size="sm" variant="outline">
                      Setup Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Integration Hub */}
          <Card>
            <CardHeader>
              <CardTitle>Integration Hub</CardTitle>
              <CardDescription>
                Connect your recommended tools with popular platforms and automate your workflow.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-16 flex flex-col items-center space-y-1">
                  <Zap className="w-5 h-5" />
                  <span className="text-xs">Zapier</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col items-center space-y-1">
                  <Globe className="w-5 h-5" />
                  <span className="text-xs">Make.com</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col items-center space-y-1">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-xs">Stripe</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col items-center space-y-1">
                  <Mail className="w-5 h-5" />
                  <span className="text-xs">Mailchimp</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
