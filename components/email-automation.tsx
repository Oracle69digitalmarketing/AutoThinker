"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Send, TrendingUp, Zap } from "lucide-react"

export function EmailAutomation() {
  const [emailProvider, setEmailProvider] = useState("")
  const [isConnected, setIsConnected] = useState(false)

  const providers = [
    { id: "mailchimp", name: "Mailchimp", logo: "📧" },
    { id: "convertkit", name: "ConvertKit", logo: "✉️" },
    { id: "activecampaign", name: "ActiveCampaign", logo: "📮" },
    { id: "hubspot", name: "HubSpot", logo: "🔶" },
  ]

  const sequences = [
    {
      name: "Welcome Series",
      emails: 5,
      openRate: "68%",
      clickRate: "12%",
      status: "active",
    },
    {
      name: "Product Launch",
      emails: 7,
      openRate: "72%",
      clickRate: "18%",
      status: "active",
    },
    {
      name: "Re-engagement",
      emails: 3,
      openRate: "45%",
      clickRate: "8%",
      status: "paused",
    },
  ]

  const handleConnect = () => {
    // TODO: Implement OAuth for email providers
    setIsConnected(true)
    alert(`🔗 Connected to ${emailProvider}!`)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-blue-600" />
            <span>Email Marketing Automation</span>
            <Badge variant="secondary">AI-Generated</Badge>
          </CardTitle>
          <CardDescription>
            Connect your email platform and let AI create, send, and optimize email campaigns automatically.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isConnected ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Choose Email Provider</label>
                <Select value={emailProvider} onValueChange={setEmailProvider}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your email platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {providers.map((provider) => (
                      <SelectItem key={provider.id} value={provider.id}>
                        {provider.logo} {provider.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleConnect} disabled={!emailProvider} className="w-full">
                <Zap className="w-4 h-4 mr-2" />
                Connect & Start Automation
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">2,847</div>
                <div className="text-sm text-gray-600">Subscribers</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">68.4%</div>
                <div className="text-sm text-gray-600">Open Rate</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">14.2%</div>
                <div className="text-sm text-gray-600">Click Rate</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">$12,450</div>
                <div className="text-sm text-gray-600">Revenue</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {isConnected && (
        <Tabs defaultValue="sequences" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sequences">Email Sequences</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="sequences" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Active Sequences</h3>
              <Button>
                <Send className="w-4 h-4 mr-2" />
                Create New Sequence
              </Button>
            </div>

            <div className="space-y-4">
              {sequences.map((sequence, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{sequence.name}</h4>
                        <p className="text-sm text-gray-600">{sequence.emails} emails in sequence</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-sm font-medium">{sequence.openRate}</div>
                          <div className="text-xs text-gray-500">Open Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">{sequence.clickRate}</div>
                          <div className="text-xs text-gray-500">Click Rate</div>
                        </div>
                        <Badge variant={sequence.status === "active" ? "default" : "secondary"}>
                          {sequence.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Campaign Generator</CardTitle>
                <CardDescription>Let AI create targeted email campaigns based on your business goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Campaign Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select campaign type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product-launch">Product Launch</SelectItem>
                        <SelectItem value="newsletter">Newsletter</SelectItem>
                        <SelectItem value="promotional">Promotional</SelectItem>
                        <SelectItem value="educational">Educational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Target Audience</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subscribers</SelectItem>
                        <SelectItem value="new">New Subscribers</SelectItem>
                        <SelectItem value="engaged">Engaged Users</SelectItem>
                        <SelectItem value="inactive">Inactive Users</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button className="w-full">
                  <Zap className="w-4 h-4 mr-2" />
                  Generate AI Campaign
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Email Performance Analytics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Top Performing Emails</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span className="text-sm">Welcome Email #1</span>
                        <span className="text-sm font-medium text-green-600">89% open rate</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                        <span className="text-sm">Product Launch Announcement</span>
                        <span className="text-sm font-medium text-blue-600">76% open rate</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                        <span className="text-sm">Weekly Newsletter #12</span>
                        <span className="text-sm font-medium text-purple-600">72% open rate</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Optimization Suggestions</h4>
                    <div className="space-y-2 text-sm">
                      <div className="p-2 bg-yellow-50 rounded">
                        <p className="font-medium text-yellow-800">Subject Line Optimization</p>
                        <p className="text-yellow-600">Try shorter subject lines (under 50 characters)</p>
                      </div>
                      <div className="p-2 bg-blue-50 rounded">
                        <p className="font-medium text-blue-800">Send Time Optimization</p>
                        <p className="text-blue-600">Best performance at 10 AM on Tuesdays</p>
                      </div>
                      <div className="p-2 bg-green-50 rounded">
                        <p className="font-medium text-green-800">Content Personalization</p>
                        <p className="text-green-600">Add more personalized content for 23% lift</p>
                      </div>
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
