"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { LineChart, TrendingUp, Zap, Target, AlertTriangle } from "lucide-react"
import { generateGrowthInsights } from "@/app/actions/generate-growth-insights"

export function GrowthDashboard() {
  const [businessData, setBusinessData] = useState({
    industry: "",
    monthsActive: 0,
    currentRevenue: 0,
    teamSize: 0,
    marketingChannels: [] as string[],
  })
  const [goals, setGoals] = useState({
    targetRevenue: 0,
    timeframe: "",
    primaryObjective: "",
  })
  const [insights, setInsights] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyzeGrowth = async () => {
    if (!businessData.industry || !businessData.currentRevenue) return

    setIsAnalyzing(true)
    try {
      const result = await generateGrowthInsights({ businessData, goals })
      setInsights(result)
    } catch (error) {
      console.error("Error analyzing growth:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <LineChart className="w-5 h-5 text-indigo-600" />
            <span>AI Growth Analytics</span>
            <Badge variant="secondary">Real-Time Analysis</Badge>
          </CardTitle>
          <CardDescription>
            Get AI-powered insights into your business performance and personalized growth strategies.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!insights ? (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Industry</label>
                  <Select
                    value={businessData.industry}
                    onValueChange={(value) => setBusinessData((prev) => ({ ...prev, industry: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Months Active</label>
                  <Input
                    type="number"
                    placeholder="How long has your business been active?"
                    value={businessData.monthsActive || ""}
                    onChange={(e) =>
                      setBusinessData((prev) => ({ ...prev, monthsActive: Number.parseInt(e.target.value) || 0 }))
                    }
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Monthly Revenue ($)</label>
                  <Input
                    type="number"
                    placeholder="Enter your current monthly revenue"
                    value={businessData.currentRevenue || ""}
                    onChange={(e) =>
                      setBusinessData((prev) => ({ ...prev, currentRevenue: Number.parseInt(e.target.value) || 0 }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Team Size</label>
                  <Input
                    type="number"
                    placeholder="Number of team members"
                    value={businessData.teamSize || ""}
                    onChange={(e) =>
                      setBusinessData((prev) => ({ ...prev, teamSize: Number.parseInt(e.target.value) || 0 }))
                    }
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Monthly Revenue ($)</label>
                  <Input
                    type="number"
                    placeholder="Your revenue goal"
                    value={goals.targetRevenue || ""}
                    onChange={(e) =>
                      setGoals((prev) => ({ ...prev, targetRevenue: Number.parseInt(e.target.value) || 0 }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Timeframe</label>
                  <Select
                    value={goals.timeframe}
                    onValueChange={(value) => setGoals((prev) => ({ ...prev, timeframe: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3-months">3 Months</SelectItem>
                      <SelectItem value="6-months">6 Months</SelectItem>
                      <SelectItem value="12-months">12 Months</SelectItem>
                      <SelectItem value="24-months">24 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={handleAnalyzeGrowth}
                disabled={!businessData.industry || !businessData.currentRevenue || isAnalyzing}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600"
              >
                {isAnalyzing ? (
                  <>
                    <Zap className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing Growth Opportunities...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Generate AI Growth Analysis
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Growth Score */}
              <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="text-4xl font-bold text-indigo-600 mb-2">{insights.growthScore}/100</div>
                <div className="text-lg font-medium text-gray-700">Growth Potential Score</div>
                <p className="text-sm text-gray-600 mt-2">
                  Based on AI analysis of your business metrics and industry benchmarks
                </p>
              </div>

              {/* Performance Comparison */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Your Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Monthly Revenue</span>
                      <span className="font-medium">
                        ${insights.benchmarks.yourPerformance.revenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Growth Rate</span>
                      <span className="font-medium">{insights.benchmarks.yourPerformance.growthRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">CAC</span>
                      <span className="font-medium">
                        ${insights.benchmarks.yourPerformance.customerAcquisitionCost}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Industry Average</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Monthly Revenue</span>
                      <span className="font-medium">
                        ${insights.benchmarks.industryAverage.revenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Growth Rate</span>
                      <span className="font-medium">{insights.benchmarks.industryAverage.growthRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">CAC</span>
                      <span className="font-medium">
                        ${insights.benchmarks.industryAverage.customerAcquisitionCost}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {insights && (
        <Tabs defaultValue="opportunities" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="action-plan">Action Plan</TabsTrigger>
            <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="opportunities" className="space-y-4">
            <div className="space-y-4">
              {insights.opportunities.map((opportunity: any, index: number) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{opportunity.area}</h4>
                      <div className="flex space-x-2">
                        <Badge
                          variant={
                            opportunity.impact === "High"
                              ? "default"
                              : opportunity.impact === "Medium"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {opportunity.impact} Impact
                        </Badge>
                        <Badge
                          variant={
                            opportunity.effort === "Low"
                              ? "default"
                              : opportunity.effort === "Medium"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {opportunity.effort} Effort
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{opportunity.description}</p>
                    <p className="text-sm font-medium text-green-600">Expected ROI: {opportunity.expectedROI}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="action-plan" className="space-y-4">
            <div className="space-y-4">
              {insights.actionPlan.map((action: any, index: number) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-bold text-indigo-600">
                          {action.priority}
                        </div>
                        <h4 className="font-semibold">{action.action}</h4>
                      </div>
                      <Badge variant="outline">{action.timeline}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Resources: {action.resources}</p>
                    <p className="text-sm font-medium text-blue-600">Expected: {action.expectedOutcome}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="risks" className="space-y-4">
            <div className="space-y-4">
              {insights.risks.map((risk: any, index: number) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                        <h4 className="font-semibold">{risk.risk}</h4>
                      </div>
                      <div className="flex space-x-2">
                        <Badge
                          variant={
                            risk.probability === "High"
                              ? "destructive"
                              : risk.probability === "Medium"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {risk.probability} Probability
                        </Badge>
                        <Badge
                          variant={
                            risk.impact === "High" ? "destructive" : risk.impact === "Medium" ? "secondary" : "outline"
                          }
                        >
                          {risk.impact} Impact
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Mitigation:</span> {risk.mitigation}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>AI-Recommended Resource Allocation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Marketing</span>
                      <span className="text-sm">{insights.resourceAllocation.marketing}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Product Development</span>
                      <span className="text-sm">{insights.resourceAllocation.product}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Operations</span>
                      <span className="text-sm">{insights.resourceAllocation.operations}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Team Expansion</span>
                      <span className="text-sm">{insights.resourceAllocation.team}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
