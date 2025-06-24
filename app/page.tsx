"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Lightbulb,
  TrendingUp,
  Rocket,
  Brain,
  Globe,
  DollarSign,
  Target,
  Building,
  Database,
  ShoppingCart,
} from "lucide-react"
import { IdeaInput } from "@/components/idea-input"
import { StrategyResults } from "@/components/strategy-results"
import { MarketingHub } from "@/components/marketing-hub"
import { GrowthDashboard } from "@/components/growth-dashboard"
import { PricingPlans } from "@/components/pricing-plans"
import { useAuth } from "@/hooks/use-auth"
import { AuthModal } from "@/components/auth-modal"
import { MarketValidation } from "@/components/market-validation"
import { BusinessFormation } from "@/components/business-formation"
import { WebsiteBuilder } from "@/components/website-builder"
import { SocialAutomation } from "@/components/social-automation"
import { EmailAutomation } from "@/components/email-automation"
import { CRMIntegration } from "@/components/crm-integration"
import { EcommerceBuilder } from "@/components/ecommerce-builder"

export default function AutoThinkerHome() {
  const { user, loading } = useAuth()
  const [activeTab, setActiveTab] = useState("generate")
  const [showAuthModal, setShowAuthModal] = useState(false)

  const features = [
    {
      icon: Brain,
      title: "AI Strategy Engine",
      description: "Transform ideas into comprehensive business blueprints",
      color: "text-blue-600",
    },
    {
      icon: Rocket,
      title: "Marketing Automation",
      description: "Generate funnels, email sequences, and ad copy",
      color: "text-purple-600",
    },
    {
      icon: Globe,
      title: "Tool Integration",
      description: "Connect with 100+ business tools and platforms",
      color: "text-green-600",
    },
    {
      icon: DollarSign,
      title: "Growth Analytics",
      description: "Track performance and optimize your strategy",
      color: "text-orange-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Enhanced Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AutoThinker
                </h1>
                <p className="text-xs text-gray-500">Oracle69 AI Suite • Complete Business Ecosystem</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100">
                AI-Powered • CRM Integrated • E-commerce Ready
              </Badge>
              {user ? (
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{user.email}</Badge>
                  <Button variant="outline" size="sm">
                    Dashboard
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setShowAuthModal(true)} className="bg-gradient-to-r from-blue-600 to-purple-600">
                  Get Started
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Enhanced Features */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Complete Business Ecosystem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            From idea to profitable business - with CRM integration, e-commerce stores, and advanced automation. Your AI
            co-founder that builds everything.
          </p>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <feature.icon className={`w-12 h-12 mx-auto mb-4 ${feature.color}`} />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Platform Interface */}
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-11 mb-8">
              <TabsTrigger value="generate" className="flex items-center space-x-1">
                <Brain className="w-3 h-3" />
                <span className="text-xs">Generate</span>
              </TabsTrigger>
              <TabsTrigger value="validate" className="flex items-center space-x-1">
                <Target className="w-3 h-3" />
                <span className="text-xs">Validate</span>
              </TabsTrigger>
              <TabsTrigger value="formation" className="flex items-center space-x-1">
                <Building className="w-3 h-3" />
                <span className="text-xs">Formation</span>
              </TabsTrigger>
              <TabsTrigger value="website" className="flex items-center space-x-1">
                <Globe className="w-3 h-3" />
                <span className="text-xs">Website</span>
              </TabsTrigger>
              <TabsTrigger value="ecommerce" className="flex items-center space-x-1">
                <ShoppingCart className="w-3 h-3" />
                <span className="text-xs">E-commerce</span>
              </TabsTrigger>
              <TabsTrigger value="marketing" className="flex items-center space-x-1">
                <Rocket className="w-3 h-3" />
                <span className="text-xs">Marketing</span>
              </TabsTrigger>
              <TabsTrigger value="social" className="flex items-center space-x-1">
                <Rocket className="w-3 h-3" />
                <span className="text-xs">Social</span>
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center space-x-1">
                <Rocket className="w-3 h-3" />
                <span className="text-xs">Email</span>
              </TabsTrigger>
              <TabsTrigger value="crm" className="flex items-center space-x-1">
                <Database className="w-3 h-3" />
                <span className="text-xs">CRM</span>
              </TabsTrigger>
              <TabsTrigger value="growth" className="flex items-center space-x-1">
                <TrendingUp className="w-3 h-3" />
                <span className="text-xs">Growth</span>
              </TabsTrigger>
              <TabsTrigger value="pricing" className="flex items-center space-x-1">
                <DollarSign className="w-3 h-3" />
                <span className="text-xs">Pricing</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="generate" className="space-y-6">
              <IdeaInput />
              <StrategyResults />
            </TabsContent>

            <TabsContent value="validate" className="space-y-6">
              <MarketValidation />
            </TabsContent>

            <TabsContent value="formation" className="space-y-6">
              <BusinessFormation />
            </TabsContent>

            <TabsContent value="website" className="space-y-6">
              <WebsiteBuilder />
            </TabsContent>

            <TabsContent value="ecommerce" className="space-y-6">
              <EcommerceBuilder />
            </TabsContent>

            <TabsContent value="marketing" className="space-y-6">
              <MarketingHub />
            </TabsContent>

            <TabsContent value="social" className="space-y-6">
              <SocialAutomation />
            </TabsContent>

            <TabsContent value="email" className="space-y-6">
              <EmailAutomation />
            </TabsContent>

            <TabsContent value="crm" className="space-y-6">
              <CRMIntegration />
            </TabsContent>

            <TabsContent value="growth" className="space-y-6">
              <GrowthDashboard />
            </TabsContent>

            <TabsContent value="pricing" className="space-y-6">
              <PricingPlans />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </div>
  )
}
