"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Zap, Mic, MicOff, Loader2, Upload, Sparkles } from "lucide-react"
import { generateComprehensiveStrategy } from "@/app/actions/generate-comprehensive-strategy"
import { useStrategyStore } from "@/hooks/use-strategy-store"

export function IdeaInput() {
  const [idea, setIdea] = useState("")
  const [industry, setIndustry] = useState("")
  const [targetMarket, setTargetMarket] = useState("")
  const [budget, setBudget] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const { setStrategy } = useStrategyStore()

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "E-commerce",
    "Education",
    "Food & Beverage",
    "Fashion",
    "Real Estate",
    "Consulting",
    "Entertainment",
  ]

  const budgetRanges = ["Under $1,000", "$1,000 - $5,000", "$5,000 - $25,000", "$25,000 - $100,000", "$100,000+"]

  const handleGenerate = async () => {
    if (!idea.trim()) return

    setIsGenerating(true)
    try {
      const result = await generateComprehensiveStrategy({
        idea,
        industry,
        targetMarket,
        budget,
      })
      setStrategy(result)
    } catch (error) {
      console.error("Error generating strategy:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const startVoiceInput = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"

      recognition.onstart = () => setIsListening(true)
      recognition.onend = () => setIsListening(false)
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setIdea((prev) => prev + " " + transcript)
      }

      recognition.start()
    }
  }

  const exampleIdeas = [
    "Sustainable fashion brand using recycled materials",
    "AI-powered fitness coaching app",
    "Local organic meal delivery service",
    "Remote work productivity platform",
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-blue-600" />
          <span>Enhanced Idea to Strategy Engine</span>
          <Badge variant="secondary" className="ml-2">
            AI-Powered
          </Badge>
        </CardTitle>
        <CardDescription>
          Describe your business idea with context. Our AI will generate a comprehensive strategy including branding,
          marketing, and growth plans.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Idea Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Business Idea Description</label>
          <div className="relative">
            <Textarea
              placeholder="Describe your business idea in detail. Include your vision, target audience, unique value proposition, and any specific goals you have..."
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              className="min-h-32 pr-12"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={startVoiceInput}
              disabled={isListening}
            >
              {isListening ? <MicOff className="w-4 h-4 text-red-500" /> : <Mic className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Additional Context */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Industry</label>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((ind) => (
                  <SelectItem key={ind} value={ind}>
                    {ind}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Target Market</label>
            <Textarea
              placeholder="e.g., Millennials in urban areas"
              value={targetMarket}
              onChange={(e) => setTargetMarket(e.target.value)}
              className="h-10"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Initial Budget</label>
            <Select value={budget} onValueChange={setBudget}>
              <SelectTrigger>
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                {budgetRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Example Ideas */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Need inspiration? Try these examples:</label>
          <div className="flex flex-wrap gap-2">
            {exampleIdeas.map((example, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-blue-50"
                onClick={() => setIdea(example)}
              >
                {example}
              </Badge>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={!idea.trim() || isGenerating}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating Comprehensive Strategy...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Complete Business Strategy
            </>
          )}
        </Button>

        {/* Features Preview */}
        <div className="grid md:grid-cols-4 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Zap className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-xs text-gray-600">Business Names & Branding</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Sparkles className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-xs text-gray-600">Marketing Copy & Funnels</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Upload className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-xs text-gray-600">Tool Recommendations</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Loader2 className="w-4 h-4 text-orange-600" />
            </div>
            <p className="text-xs text-gray-600">Growth Analytics</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
