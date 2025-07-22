"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe, Palette, Code, Rocket, ExternalLink } from "lucide-react"

export function WebsiteBuilder() {
  const [websiteName, setWebsiteName] = useState("")
  const [template, setTemplate] = useState("")
  const [isBuilding, setIsBuilding] = useState(false)

  const templates = [
    { id: "saas", name: "SaaS Landing Page", preview: "/placeholder.svg?height=200&width=300" },
    { id: "ecommerce", name: "E-commerce Store", preview: "/placeholder.svg?height=200&width=300" },
    { id: "portfolio", name: "Portfolio Site", preview: "/placeholder.svg?height=200&width=300" },
    { id: "blog", name: "Blog & Content", preview: "/placeholder.svg?height=200&width=300" },
  ]

  const handleBuildWebsite = async () => {
    setIsBuilding(true)
    // TODO: Integrate with website builders (Vercel, Netlify, etc.)
    setTimeout(() => {
      setIsBuilding(false)
      alert("🚀 Website deployed! Check your email for the live URL.")
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-blue-600" />
            <span>AI Website Builder</span>
            <Badge variant="secondary">Auto-Deploy</Badge>
          </CardTitle>
          <CardDescription>
            Generate and deploy professional websites automatically based on your business strategy.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Website Name</label>
              <Input
                placeholder="Enter your website name"
                value={websiteName}
                onChange={(e) => setWebsiteName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Template Type</label>
              <Select value={template} onValueChange={setTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((tmpl) => (
                    <SelectItem key={tmpl.id} value={tmpl.id}>
                      {tmpl.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleBuildWebsite}
            disabled={!websiteName || !template || isBuilding}
            className="w-full bg-gradient-to-r from-blue-600 to-green-600"
          >
            {isBuilding ? "Building & Deploying..." : "Build Website with AI"}
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="customization">Customize</TabsTrigger>
          <TabsTrigger value="deployment">Deploy</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {templates.map((tmpl) => (
              <Card key={tmpl.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <img
                    src={tmpl.preview || "/placeholder.svg"}
                    alt={tmpl.name}
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <h4 className="font-semibold">{tmpl.name}</h4>
                  <div className="flex justify-between items-center mt-2">
                    <Button size="sm" variant="outline">
                      Preview
                    </Button>
                    <Button size="sm">Select</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="customization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="w-5 h-5" />
                <span>AI Customization</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                AI will automatically customize colors, fonts, and content based on your business strategy.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-3 bg-blue-50 rounded text-center">
                  <Code className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm font-medium">Auto Code Generation</p>
                </div>
                <div className="p-3 bg-green-50 rounded text-center">
                  <Palette className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <p className="text-sm font-medium">Brand-Matched Design</p>
                </div>
                <div className="p-3 bg-purple-50 rounded text-center">
                  <Globe className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                  <p className="text-sm font-medium">SEO Optimized</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Rocket className="w-5 h-5" />
                <span>Deployment Options</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Vercel (Recommended)</h4>
                  <p className="text-sm text-gray-600 mb-3">Fast, global CDN with automatic HTTPS</p>
                  <Button size="sm" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Deploy to Vercel
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Netlify</h4>
                  <p className="text-sm text-gray-600 mb-3">Continuous deployment with Git integration</p>
                  <Button size="sm" variant="outline" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Deploy to Netlify
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
