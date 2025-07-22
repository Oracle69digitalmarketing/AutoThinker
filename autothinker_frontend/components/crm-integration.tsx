"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Zap, ArrowRight, Database, FolderSyncIcon as Sync, TrendingUp } from "lucide-react"

export function CRMIntegration() {
  const [crmConnected, setCrmConnected] = useState(false)
  const [apiKey, setApiKey] = useState("")
  const [syncEnabled, setSyncEnabled] = useState(false)

  const integrationFeatures = [
    {
      title: "Lead Sync",
      description: "Automatically sync leads from AutoThinker to your CRM",
      status: "active",
      count: "1,247 leads synced",
    },
    {
      title: "Customer Data",
      description: "Share customer personas and journey data",
      status: "active",
      count: "892 profiles updated",
    },
    {
      title: "Campaign Tracking",
      description: "Track marketing campaign performance in CRM",
      status: "active",
      count: "156 campaigns tracked",
    },
    {
      title: "Business Intelligence",
      description: "Share AutoThinker insights with CRM analytics",
      status: "pending",
      count: "Ready to sync",
    },
  ]

  const handleConnectCRM = () => {
    // TODO: Implement API connection to your CRM
    setCrmConnected(true)
    setSyncEnabled(true)
    alert("🔗 Connected to your Advanced CRM! Data sync enabled.")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-blue-600" />
            <span>Advanced CRM Integration</span>
            <Badge variant="secondary">Your CRM App</Badge>
          </CardTitle>
          <CardDescription>
            Connect AutoThinker with your advanced CRM to create a unified business management ecosystem.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!crmConnected ? (
            <div className="space-y-4">
              <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <Database className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">Connect Your Advanced CRM</h3>
                <p className="text-gray-600 mb-4">
                  Seamlessly integrate AutoThinker's AI-generated leads and insights with your existing CRM system.
                </p>

                <div className="max-w-md mx-auto space-y-3">
                  <Input
                    placeholder="Enter your CRM API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    type="password"
                  />
                  <Button
                    onClick={handleConnectCRM}
                    disabled={!apiKey}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Connect & Sync Data
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">What Gets Synced</h4>
                  <ul className="text-sm text-blue-600 space-y-1">
                    <li>• AI-generated leads and contact info</li>
                    <li>• Customer personas and segments</li>
                    <li>• Marketing campaign performance</li>
                    <li>• Business strategy insights</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Benefits</h4>
                  <ul className="text-sm text-green-600 space-y-1">
                    <li>• Unified customer view</li>
                    <li>• Automated lead nurturing</li>
                    <li>• Enhanced analytics</li>
                    <li>• Streamlined workflows</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Connection Status */}
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <h4 className="font-semibold text-green-800">CRM Connected</h4>
                    <p className="text-sm text-green-600">Real-time data sync active</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-green-700">Auto-sync</span>
                  <Switch checked={syncEnabled} onCheckedChange={setSyncEnabled} />
                </div>
              </div>

              {/* Integration Features */}
              <div className="grid md:grid-cols-2 gap-4">
                {integrationFeatures.map((feature, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{feature.title}</h4>
                        <Badge variant={feature.status === "active" ? "default" : "secondary"}>{feature.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{feature.description}</p>
                      <p className="text-xs text-blue-600 font-medium">{feature.count}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {crmConnected && (
        <Tabs defaultValue="data-flow" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="data-flow">Data Flow</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="data-flow" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sync className="w-5 h-5" />
                  <span>Real-Time Data Flow</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Zap className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="font-medium">AutoThinker</p>
                    <p className="text-xs text-gray-600">AI Lead Generation</p>
                  </div>

                  <ArrowRight className="w-6 h-6 text-gray-400" />

                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Database className="w-6 h-6 text-purple-600" />
                    </div>
                    <p className="font-medium">Your CRM</p>
                    <p className="text-xs text-gray-600">Advanced Management</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Synchronized Data Types:</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-medium text-sm">Lead Information</h5>
                      <p className="text-xs text-gray-600">Contact details, source, qualification score</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-medium text-sm">Customer Personas</h5>
                      <p className="text-xs text-gray-600">Demographics, pain points, preferences</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-medium text-sm">Campaign Data</h5>
                      <p className="text-xs text-gray-600">Performance metrics, attribution</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-medium text-sm">Business Insights</h5>
                      <p className="text-xs text-gray-600">Market analysis, opportunities</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Automated Workflows</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 border-l-4 border-l-green-500 bg-green-50">
                    <h4 className="font-semibold text-green-800">Lead Qualification</h4>
                    <p className="text-sm text-green-600">AutoThinker AI scores leads → CRM assigns to sales team</p>
                  </div>
                  <div className="p-4 border-l-4 border-l-blue-500 bg-blue-50">
                    <h4 className="font-semibold text-blue-800">Follow-up Sequences</h4>
                    <p className="text-sm text-blue-600">CRM triggers → AutoThinker generates personalized content</p>
                  </div>
                  <div className="p-4 border-l-4 border-l-purple-500 bg-purple-50">
                    <h4 className="font-semibold text-purple-800">Customer Journey</h4>
                    <p className="text-sm text-purple-600">
                      Track complete journey from AutoThinker lead to CRM customer
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Unified Analytics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">94.2%</div>
                    <div className="text-sm text-gray-600">Lead Quality Score</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">67%</div>
                    <div className="text-sm text-gray-600">Conversion Rate</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">$89,450</div>
                    <div className="text-sm text-gray-600">Revenue Attributed</div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Integration Benefits</h4>
                  <ul className="text-sm space-y-1">
                    <li>• 340% improvement in lead quality with AI scoring</li>
                    <li>• 67% faster lead-to-customer conversion</li>
                    <li>• 89% reduction in manual data entry</li>
                    <li>• Complete customer lifecycle visibility</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
