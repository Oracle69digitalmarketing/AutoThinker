"use client"

import { useStrategyStore } from "@/hooks/use-strategy-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Target, TrendingUp, Users, FileText } from "lucide-react"

export function StrategyResults() {
  const { strategy } = useStrategyStore()

  if (!strategy) {
    return null
  }

  const { branding, marketAnalysis, customerInsights, productStrategy } = strategy

  return (
    <div className="space-y-6">
      {/* Branding & Identity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-green-600" />
            <span>Branding &amp; Identity</span>
          </CardTitle>
          <CardDescription>Names, tagline and core messaging</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Suggested Business Names</h4>
            <div className="flex flex-wrap gap-2">
              {branding.businessNames.map((name: string, i: number) => (
                <Badge key={i} variant="outline">
                  {name}
                </Badge>
              ))}
            </div>
          </div>
          <Separator />
          <p>
            <span className="font-medium">Tagline: </span>
            {branding.tagline}
          </p>
          <p>
            <span className="font-medium">Elevator&nbsp;Pitch: </span>
            {branding.elevatorPitch}
          </p>
          <p>
            <span className="font-medium">Value&nbsp;Proposition: </span>
            {branding.valueProposition}
          </p>
        </CardContent>
      </Card>

      {/* SWOT Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <span>SWOT Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {(["strengths", "opportunities"] as const).map((key) => (
              <div key={key}>
                <h4 className={`font-semibold mb-2 ${key === "strengths" ? "text-green-600" : "text-blue-600"}`}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </h4>
                <ul className="space-y-1">
                  {marketAnalysis.swotAnalysis[key].map((item: string, idx: number) => (
                    <li key={idx} className="text-sm">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {(["weaknesses", "threats"] as const).map((key) => (
              <div key={key}>
                <h4 className={`font-semibold mb-2 ${key === "weaknesses" ? "text-red-600" : "text-yellow-600"}`}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </h4>
                <ul className="space-y-1">
                  {marketAnalysis.swotAnalysis[key].map((item: string, idx: number) => (
                    <li key={idx} className="text-sm">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Customer Personas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-purple-600" />
            <span>Customer Personas</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          {customerInsights.personas.map((persona: any, idx: number) => (
            <div key={idx} className="border rounded-md p-4 space-y-2">
              <h4 className="text-lg font-semibold">{persona.name}</h4>
              <p className="text-sm text-gray-600">{persona.demographics}</p>
              <p className="text-sm">
                <span className="font-medium">Psychographics:&nbsp;</span>
                {persona.psychographics}
              </p>
              <p className="text-sm">
                <span className="font-medium">Pain&nbsp;Points:&nbsp;</span>
                {persona.painPoints.join(", ")}
              </p>
              <p className="text-sm">
                <span className="font-medium">Goals:&nbsp;</span>
                {persona.goals.join(", ")}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* MVP Feature List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <span>MVP Features</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-2">
          {productStrategy.mvpFeatures.map((feat: string, idx: number) => (
            <div key={idx} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
              <div className="w-2 h-2 bg-indigo-600 rounded-full" />
              <span className="text-sm">{feat}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
