"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Zap } from "lucide-react"

type Plan = {
  id: string
  name: string
  price: string
  description: string
  features: string[]
  cta: string
  highlight?: boolean
}

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "Free",
    description: "Ideal for validating a single idea.",
    features: ["1 Idea Workspace", "Basic Strategy Report", "Limited Marketing Copy", "Community Support"],
    cta: "Get Started",
  },
  {
    id: "pro",
    name: "Pro",
    price: "$29 /mo",
    description: "For solo founders ready to launch.",
    features: [
      "Unlimited Ideas",
      "Full Strategy Suite",
      "Marketing & Funnel Hub",
      "Export Center (PDF / Notion)",
      "Email Support",
    ],
    cta: "Upgrade to Pro",
    highlight: true,
  },
  {
    id: "scale",
    name: "Scale",
    price: "$99 /mo",
    description: "Growth tools for small teams.",
    features: ["All Pro features", "5 Team Seats", "Advanced Analytics", "Priority Support", "API Access & Webhooks"],
    cta: "Start Scaling",
  },
]

export function PricingPlans() {
  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-none">
        <CardHeader className="text-center">
          <Badge variant="secondary" className="mx-auto mb-2">
            <Zap className="w-4 h-4 mr-1" />
            Flexible Pricing
          </Badge>
          <CardTitle className="text-4xl mb-2">Find the right plan for you</CardTitle>
          <CardDescription>Start free, upgrade when you’re ready to launch and grow.</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative ${
              plan.highlight ? "ring-2 ring-indigo-600 shadow-lg" : "hover:shadow-md"
            } transition-shadow`}
          >
            {plan.highlight && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600">Most Popular</Badge>
            )}

            <CardHeader className="text-center">
              <CardTitle>{plan.name}</CardTitle>
              <p className="text-3xl font-bold mt-2">{plan.price}</p>
              <CardDescription className="mt-1">{plan.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center space-x-2 text-sm">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button className="w-full" variant={plan.highlight ? "default" : "outline"}>
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Need an Enterprise plan?{" "}
        <a href="mailto:sales@autothinker.ai" className="underline">
          Contact Sales
        </a>
      </p>
    </div>
  )
}
