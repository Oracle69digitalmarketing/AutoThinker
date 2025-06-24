"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Facebook, Instagram, Linkedin, Twitter, MessageCircle, Users, TrendingUp } from "lucide-react"

export function SocialAutomation() {
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([])
  const [automationEnabled, setAutomationEnabled] = useState(false)

  const platforms = [
    { id: "facebook", name: "Facebook", icon: Facebook, color: "text-blue-600", connected: false },
    { id: "instagram", name: "Instagram", icon: Instagram, color: "text-pink-600", connected: false },
    { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "text-blue-700", connected: false },
    { id: "twitter", name: "Twitter/X", icon: Twitter, color: "text-gray-800", connected: false },
    { id: "whatsapp", name: "WhatsApp Business", icon: MessageCircle, color: "text-green-600", connected: false },
  ]

  const automationFeatures = [
    {
      title: "Lead Generation",
      description: "Automatically find and engage potential customers",
      metrics: { leads: 1247, conversion: "12.3%" },
    },
    {
      title: "Content Posting",
      description: "Schedule and post AI-generated content across platforms",
      metrics: { posts: 156, engagement: "8.7%" },
    },
    {
      title: "Message Automation",
      description: "Auto-respond to comments and direct messages",
      metrics: { responses: 892, satisfaction: "94%" },
    },
  ]

  const handleConnectPlatform = (platformId: string) => {
    // TODO: Implement OAuth flow for each platform
    alert(`🔗 Connecting to ${platformId}... (OAuth integration needed)`)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-purple-600" />
            <span>Social Media Automation</span>
            <Badge variant="secondary">AI-Powered</Badge>
          </CardTitle>
          <CardDescription>
            Connect your social accounts and let AI generate leads, post content, and engage with customers
            automatically.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Platform Connections */}
          <div>
            <h4 className="font-semibold mb-4">Connect Your Platforms</h4>
            <div className="grid md:grid-cols-3 gap-4">
              {platforms.map((platform) => (
                <Card key={platform.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <platform.icon className={`w-5 h-5 ${platform.color}`} />
                      <span className="font-medium">{platform.name}</span>
                    </div>
                    <Badge variant={platform.connected ? "default" : "outline"}>
                      {platform.connected ? "Connected" : "Not Connected"}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    className="w-full"
                    variant={platform.connected ? "outline" : "default"}
                    onClick={() => handleConnectPlatform(platform.id)}
                  >
                    {platform.connected ? "Manage" : "Connect"}
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Automation Toggle */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <h4 className="font-semibold">Enable AI Automation</h4>
              <p className="text-sm text-gray-600">Let AI handle posting, engagement, and lead generation</p>
            </div>
            <Switch checked={automationEnabled} onCheckedChange={setAutomationEnabled} />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="leads" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="leads">Lead Generation</TabsTrigger>
          <TabsTrigger value="content">Content Automation</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>AI Lead Generation</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">1,247</div>
                  <div className="text-sm text-gray-600">Leads Generated</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">12.3%</div>
                  <div className="text-sm text-gray-600">Conversion Rate</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">$47,890</div>
                  <div className="text-sm text-gray-600">Revenue Generated</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Lead Generation Strategies:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">LinkedIn outreach to decision makers</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Facebook group engagement and value-first approach</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Instagram story interactions and DM follow-ups</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automated Content Pipeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                AI creates and schedules platform-specific content based on your business strategy and audience
                preferences.
              </p>

              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">LinkedIn Professional Posts</span>
                    <Badge variant="outline">3 posts/week</Badge>
                  </div>
                  <p className="text-sm text-gray-600">Industry insights and thought leadership content</p>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Instagram Visual Stories</span>
                    <Badge variant="outline">Daily stories</Badge>
                  </div>
                  <p className="text-sm text-gray-600">Behind-the-scenes and product showcases</p>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Facebook Community Engagement</span>
                    <Badge variant="outline">5 posts/week</Badge>
                  </div>
                  <p className="text-sm text-gray-600">Value-driven content and community building</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Engagement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800">Auto-Responses</h4>
                  <p className="text-sm text-blue-600 mt-1">892 messages responded to automatically</p>
                  <p className="text-xs text-blue-500 mt-2">94% customer satisfaction rate</p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800">Comment Management</h4>
                  <p className="text-sm text-green-600 mt-1">1,456 comments engaged with</p>
                  <p className="text-xs text-green-500 mt-2">8.7% average engagement rate</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Engagement Features:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Intelligent comment responses based on context</li>
                  <li>• Automated DM sequences for lead nurturing</li>
                  <li>• Smart hashtag suggestions for maximum reach</li>
                  <li>• Competitor monitoring and engagement opportunities</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
