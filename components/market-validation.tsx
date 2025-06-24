"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, AlertCircle, TrendingUp, Users, DollarSign, Target, Send, BarChart } from "lucide-react"
import { generateValidationPlan } from "@/app/actions/generate-validation"

export function MarketValidation() {
  const [businessIdea, setBusinessIdea] = useState("")
  const [validationPlan, setValidationPlan] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [validationResults, setValidationResults] = useState<any>({
    surveys: { sent: 0, responses: 0, completion: 0 },
    interviews: { scheduled: 0, completed: 0, insights: [] },
    mvpTesting: { users: 0, feedback: [], metrics: {} },
    marketResearch: { competitors: [], marketSize: "", trends: [] },
  })

  const handleGenerateValidation = async () => {
    if (!businessIdea.trim()) return

    setIsGenerating(true)
    try {
      const plan = await generateValidationPlan(businessIdea)
      setValidationPlan(plan)
    } catch (error) {
      console.error("Error generating validation plan:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const validationSteps = [
    { id: "research", name: "Market Research", icon: BarChart, status: "completed" },
    { id: "surveys", name: "Customer Surveys", icon: Users, status: "in-progress" },
    { id: "interviews", name: "User Interviews", icon: Target, status: "pending" },
    { id: "mvp", name: "MVP Testing", icon: TrendingUp, status: "pending" },
    { id: "analysis", name: "Data Analysis", icon: DollarSign, status: "pending" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span>Market Validation Engine</span>
            <Badge variant="secondary">AI-Powered Validation</Badge>
          </CardTitle>
          <CardDescription>
            Validate your business idea with systematic market research, customer surveys, and MVP testing before full
            launch.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Business Idea to Validate</label>
            <Textarea
              placeholder="Describe your business idea that you want to validate in the market..."
              value={businessIdea}
              onChange={(e) => setBusinessIdea(e.target.value)}
              className="min-h-24"
            />
          </div>

          <Button
            onClick={handleGenerateValidation}
            disabled={!businessIdea.trim() || isGenerating}
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
          >
            {isGenerating ? "Creating Validation Plan..." : "Generate Validation Strategy"}
          </Button>
        </CardContent>
      </Card>

      {validationPlan && (
        <div className="space-y-6">
          {/* Validation Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Validation Progress</CardTitle>
              <CardDescription>Track your market validation journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-gray-600">20% Complete</span>
                </div>
                <Progress value={20} className="w-full" />

                <div className="grid md:grid-cols-5 gap-4 mt-6">
                  {validationSteps.map((step, index) => (
                    <div key={step.id} className="text-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                          step.status === "completed"
                            ? "bg-green-100 text-green-600"
                            : step.status === "in-progress"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <step.icon className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-medium">{step.name}</p>
                      <div className="flex items-center justify-center mt-1">
                        {step.status === "completed" && <CheckCircle className="w-3 h-3 text-green-600" />}
                        {step.status === "in-progress" && <AlertCircle className="w-3 h-3 text-blue-600" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Validation Tabs */}
          <Tabs defaultValue="surveys" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="surveys">Customer Surveys</TabsTrigger>
              <TabsTrigger value="interviews">User Interviews</TabsTrigger>
              <TabsTrigger value="mvp">MVP Testing</TabsTrigger>
              <TabsTrigger value="analysis">Market Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="surveys" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Survey Campaign</CardTitle>
                  <div className="flex space-x-2">
                    <Button size="sm">
                      <Send className="w-4 h-4 mr-2" />
                      Launch Survey
                    </Button>
                    <Button variant="outline" size="sm">
                      Preview Questions
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{validationResults.surveys.sent}</div>
                      <div className="text-sm text-gray-600">Surveys Sent</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{validationResults.surveys.responses}</div>
                      <div className="text-sm text-gray-600">Responses</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{validationResults.surveys.completion}%</div>
                      <div className="text-sm text-gray-600">Completion Rate</div>
                    </div>
                  </div>

                  {validationPlan.surveyQuestions && (
                    <div className="space-y-3">
                      <h4 className="font-semibold">Generated Survey Questions:</h4>
                      {validationPlan.surveyQuestions.map((question: string, index: number) => (
                        <div key={index} className="p-3 bg-gray-50 rounded border-l-4 border-l-blue-500">
                          <p className="text-sm">
                            {index + 1}. {question}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="interviews" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Interview Framework</CardTitle>
                  <Button size="sm">Schedule Interviews</Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {validationPlan.interviewGuide && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Interview Objectives:</h4>
                        <ul className="space-y-1">
                          {validationPlan.interviewGuide.objectives.map((obj: string, index: number) => (
                            <li key={index} className="text-sm flex items-start space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                              <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Key Questions to Ask:</h4>
                        <div className="space-y-2">
                          {validationPlan.interviewGuide.questions.map((question: string, index: number) => (
                            <div key={index} className="p-2 bg-gray-50 rounded">
                              <p className="text-sm font-medium">
                                Q{index + 1}: {question}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mvp" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>MVP Testing Plan</CardTitle>
                  <Button size="sm">Launch MVP Test</Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {validationPlan.mvpTesting && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Testing Approach:</h4>
                        <p className="text-sm text-gray-600">{validationPlan.mvpTesting.approach}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Key Metrics to Track:</h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {validationPlan.mvpTesting.metrics.map((metric: string, index: number) => (
                            <div key={index} className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                              <TrendingUp className="w-4 h-4 text-green-600" />
                              <span className="text-sm">{metric}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Success Criteria:</h4>
                        <ul className="space-y-1">
                          {validationPlan.mvpTesting.successCriteria.map((criteria: string, index: number) => (
                            <li key={index} className="text-sm flex items-start space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                              <span>{criteria}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Market Analysis Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {validationPlan.marketAnalysis && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Market Size Assessment:</h4>
                        <p className="text-sm text-gray-600">{validationPlan.marketAnalysis.marketSize}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Competitive Landscape:</h4>
                        <div className="space-y-2">
                          {validationPlan.marketAnalysis.competitors.map((competitor: any, index: number) => (
                            <div key={index} className="p-3 border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium">{competitor.name}</h5>
                                <Badge variant="outline">{competitor.category}</Badge>
                              </div>
                              <p className="text-sm text-gray-600">{competitor.description}</p>
                              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                <span>Pricing: {competitor.pricing}</span>
                                <span>Market Share: {competitor.marketShare}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Validation Recommendation:</h4>
                        <div
                          className={`p-4 rounded-lg ${
                            validationPlan.marketAnalysis.recommendation.status === "proceed"
                              ? "bg-green-50 border border-green-200"
                              : validationPlan.marketAnalysis.recommendation.status === "caution"
                                ? "bg-yellow-50 border border-yellow-200"
                                : "bg-red-50 border border-red-200"
                          }`}
                        >
                          <p className="text-sm font-medium mb-2">
                            {validationPlan.marketAnalysis.recommendation.title}
                          </p>
                          <p className="text-sm">{validationPlan.marketAnalysis.recommendation.details}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
