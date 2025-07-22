"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Globe, Facebook, Search, Zap, Copy, Download, Share2 } from "lucide-react"
import { generateMarketingContent } from "@/app/actions/generate-marketing"

export function MarketingHub() {
  const [activeChannel, setActiveChannel] = useState("email")
  const [isGenerating, setIsGenerating] = useState(false)
  const [marketingContent, setMarketingContent] = useState<any>(null)
  const [businessContext, setBusinessContext] = useState("")
  const [campaignType, setCampaignType] = useState("")

  const channels = [
    { id: "email", name: "Email Sequences", icon: Mail, color: "text-blue-600" },
    { id: "landing", name: "Landing Pages", icon: Globe, color: "text-green-600" },
    { id: "social", name: "Social Media", icon: Facebook, color: "text-purple-600" },
    { id: "ads", name: "Ad Copy", icon: Search, color: "text-orange-600" },
  ]

  const handleGenerate = async () => {
    if (!businessContext.trim()) return

    setIsGenerating(true)
    try {
      const result = await generateMarketingContent({
        businessContext,
        channel: activeChannel,
        campaignType,
      })
      setMarketingContent(result)
    } catch (error) {
      console.error("Error generating marketing content:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-purple-600" />
            <span>Marketing & Funnel Assistant</span>
            <Badge variant="secondary">Harmony Hub Integration</Badge>
          </CardTitle>
          <CardDescription>
            Generate high-converting marketing copy, email sequences, landing pages, and ad campaigns. Automatically
            sync with Harmony Marketing Hub for seamless deployment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Business Context Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Business Context</label>
            <Textarea
              placeholder="Describe your business, target audience, and marketing goals..."
              value={businessContext}
              onChange={(e) => setBusinessContext(e.target.value)}
              className="min-h-24"
            />
          </div>

          {/* Channel Selection */}
          <div className="grid md:grid-cols-4 gap-4">
            {channels.map((channel) => (
              <Card
                key={channel.id}
                className={`cursor-pointer transition-all ${
                  activeChannel === channel.id ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
                }`}
                onClick={() => setActiveChannel(channel.id)}
              >
                <CardContent className="p-4 text-center">
                  <channel.icon className={`w-8 h-8 mx-auto mb-2 ${channel.color}`} />
                  <p className="font-medium text-sm">{channel.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Campaign Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Campaign Type</label>
            <Select value={campaignType} onValueChange={setCampaignType}>
              <SelectTrigger>
                <SelectValue placeholder="Select campaign type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="launch">Product Launch</SelectItem>
                <SelectItem value="nurture">Lead Nurture</SelectItem>
                <SelectItem value="conversion">Conversion Campaign</SelectItem>
                <SelectItem value="retention">Customer Retention</SelectItem>
                <SelectItem value="awareness">Brand Awareness</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={!businessContext.trim() || isGenerating}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isGenerating ? "Generating Marketing Content..." : "Generate Marketing Campaign"}
          </Button>
        </CardContent>
      </Card>

      {/* Marketing Content Results */}
      {marketingContent && (
        <Tabs value={activeChannel} className="w-full">
          <TabsContent value="email" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Email Sequence Campaign</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy All
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Export to Harmony
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {marketingContent.emailSequence?.map((email: any, index: number) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        Email {index + 1}: {email.subject}
                      </CardTitle>
                      <Badge variant="outline">{email.timing}</Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <p className="font-medium text-sm">Subject Line:</p>
                          <p className="text-sm bg-gray-50 p-2 rounded">{email.subject}</p>
                        </div>
                        <div>
                          <p className="font-medium text-sm">Preview Text:</p>
                          <p className="text-sm bg-gray-50 p-2 rounded">{email.preview}</p>
                        </div>
                        <div>
                          <p className="font-medium text-sm">Body:</p>
                          <div className="text-sm bg-gray-50 p-4 rounded whitespace-pre-line">{email.body}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="landing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Landing Page Copy</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export HTML
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Send to Harmony
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {marketingContent.landingPage && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Headline</h4>
                      <p className="text-2xl font-bold text-blue-600">{marketingContent.landingPage.headline}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Subheadline</h4>
                      <p className="text-lg text-gray-600">{marketingContent.landingPage.subheadline}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Value Propositions</h4>
                      <ul className="space-y-2">
                        {marketingContent.landingPage.valueProps?.map((prop: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            <span>{prop}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Call-to-Action</h4>
                      <Button className="bg-gradient-to-r from-green-600 to-blue-600">
                        {marketingContent.landingPage.cta}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Social Media Campaign</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {marketingContent.socialPosts?.map((post: any, index: number) => (
                  <Card key={index} className="border-l-4 border-l-purple-500">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{post.platform} Post</CardTitle>
                      <Badge variant="outline">{post.type}</Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm bg-gray-50 p-3 rounded">{post.content}</p>
                        <div className="flex flex-wrap gap-1">
                          {post.hashtags?.map((tag: string, idx: number) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ads" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ad Copy Variations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {marketingContent.adCopy?.map((ad: any, index: number) => (
                  <Card key={index} className="border-l-4 border-l-orange-500">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{ad.platform} Ad</CardTitle>
                      <Badge variant="outline">{ad.objective}</Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <p className="font-medium text-sm">Headline:</p>
                          <p className="text-sm bg-gray-50 p-2 rounded">{ad.headline}</p>
                        </div>
                        <div>
                          <p className="font-medium text-sm">Description:</p>
                          <p className="text-sm bg-gray-50 p-2 rounded">{ad.description}</p>
                        </div>
                        <div>
                          <p className="font-medium text-sm">Call-to-Action:</p>
                          <Badge className="bg-orange-100 text-orange-800">{ad.cta}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
