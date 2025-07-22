// src/components/idea-input.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Zap, Mic, MicOff, Loader2, Upload, Sparkles, AlertTriangle } from "lucide-react"
import { generateComprehensiveStrategy } from "@/app/actions/generate-comprehensive-strategy"
import { useStrategyStore } from "@/hooks/use-strategy-store"

export function IdeaInput() {
  const [idea, setIdea] = useState("")
  const [industry, setIndustry] = useState("")
  const [targetMarket, setTargetMarket] = useState("")
  const [budget, setBudget] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [showApiKeyWarning, setShowApiKeyWarning] = useState(false)
  // New state for loading stage
  const [loadingStage, setLoadingStage] = useState<string | null>(null);
  const { setStrategy } = useStrategyStore()

  const industries = [
    "Technology",
    "Healthcare",
    "Agriculture",
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
    setShowApiKeyWarning(false)
    setLoadingStage("Initializing AI...") // Start loading stage

    try {
      // Simulate stages for better user feedback
      // In a real streaming scenario, these would update as data arrives
      const strategyPromise = generateComprehensiveStrategy({
        idea,
        industry,
        targetMarket,
        budget,
        mode: 'all', // Assuming 'all' for comprehensive strategy
        output_format: 'json', // Assuming 'json' output
      });

      // Update stage after a short delay (simulating backend call initiation)
      setTimeout(() => setLoadingStage("Contacting backend & AI engine..."), 500);

      const result = await strategyPromise;

      setTimeout(() => setLoadingStage("Analyzing idea & generating blueprint..."), 2000); // Simulate AI thinking

      // Since our backend handles the demo fallback, we only show warning if backend explicitly says there's an issue with its key
      // If the result is the demo, the backend generated it, not this frontend check
      // We assume the backend would return a specific error if its key was missing and it didn't fall back to demo.
      // For now, removing the direct process.env.OPENAI_API_KEY check here.

      setStrategy(result)
      setLoadingStage("Strategy generated! Displaying results...") // Final stage
    } catch (error) {
      console.error("Error generating strategy:", error)
      setShowApiKeyWarning(true) // Show a generic warning on error
      setLoadingStage("Error generating strategy.") // Error stage
    } finally {
      setIsGenerating(false)
      setTimeout(() => setLoadingStage(null), 3000); // Clear stage after a delay
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
        {/* API Key Warning */}
        {showApiKeyWarning && (
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>Generation Error:</strong> Failed to get strategy from the AI. This might be due to a backend issue or a missing API key. Please check your backend logs or ensure API key is configured.
            </AlertDescription>
          </Alert>
        )}

        {/* Main Idea Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Business Idea Description</label>
          <div className="relative">
            <Textarea
              placeholder="Describe your business idea in detail. Include your vision, target audience, unique value proposition, and any specific goals you have..."
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              className="min-h-32 pr-12"
              disabled={isGenerating} // Disable during generation
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={startVoiceInput}
              disabled={isListening || isGenerating} // Disable during generation
            >
              {isListening ? <MicOff className="w-4 h-4 text-red-500" /> : <Mic className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Additional Context */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Industry</label>
            <Select value={industry} onValueChange={setIndustry} disabled={isGenerating}>
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
              disabled={isGenerating} // Disable during generation
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Initial Budget</label>
            <Select value={budget} onValueChange={setBudget} disabled={isGenerating}>
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
                // Disable example badges during generation
                style={{ pointerEvents: isGenerating ? 'none' : 'auto', opacity: isGenerating ? 0.6 : 1 }}
              >
                {example}
              </Badge>
            ))}
          </div>
        </div>

        {/* Generate Button with Enhanced Loading Message */}
        <Button
          onClick={handleGenerate}
          disabled={!idea.trim() || isGenerating}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              {loadingStage || "Generating Comprehensive Strategy..."}
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
