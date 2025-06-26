"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"
import {
  Phone,
  Mic,
  Languages,
  Users,
  MapPin,
  DollarSign,
  BookOpen,
  Headphones,
  Globe,
  Target,
  Award,
} from "lucide-react"
import { useCurrencyStore } from "@/hooks/use-currency-store"

export function TutorLinkDashboard() {
  const { formatAmount } = useCurrencyStore()
  const [stats, setStats] = useState({
    learners: 1200,
    tutors: 150,
    sessions: 10000,
    completionRate: 92,
    retention: 32,
    costSaving: 94,
    lgas: 2,
    languages: 3,
  })

  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Simulate real-time stats updates
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        learners: prev.learners + Math.floor(Math.random() * 3),
        sessions: prev.sessions + Math.floor(Math.random() * 10),
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: Phone,
      title: "USSD Call-to-Learn",
      description: "Dial *123# daily for 3-min voice lessons in local languages",
      example: "Press 1 if 2 goats + 3 goats = 5 goats",
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
    },
    {
      icon: Mic,
      title: "Voice Homework Helper",
      description: "Toll-free AI tutor in Hausa, Yoruba, Pidgin",
      example: "Say: 'I no sabi fraction' → get market-style math help",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
    },
    {
      icon: Languages,
      title: "Built to Scale",
      description: "Works on 2005-era phones, costs <₦200/month",
      example: "Expandable to Swahili, Wolof, Afrikaans regions",
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600",
    },
  ]

  const impactMetrics = [
    { label: "Lesson Completion", value: "92%", comparison: "vs 34% (apps)", trend: "+58%" },
    { label: "Teacher Feedback", value: "32%", comparison: "better retention", trend: "+32%" },
    { label: "Cost Efficiency", value: formatAmount(1), comparison: `vs ${formatAmount(18)}/month`, trend: "-94%" },
    { label: "Students Reached", value: "80", comparison: "across 2 LGAs", trend: "+80" },
  ]

  const revenueStreams = [
    {
      title: "Government MOUs",
      description: "State partnerships for adult literacy and remedial learning",
      potential: formatAmount(50000),
      status: "Active",
    },
    {
      title: "CSR Partnerships",
      description: "MTN sponsoring toll-free lines for branded content",
      potential: formatAmount(25000),
      status: "In Progress",
    },
    {
      title: "Micro-franchising",
      description: "Local women earn ₦500/month per learner as audio tutors",
      potential: formatAmount(15000),
      status: "Pilot",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <CardContent className="p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">TutorLink: AI for Learning Everywhere</h1>
            <p className="text-xl mb-6">Offline. Local Language. Smart.</p>
            <div className="flex justify-center space-x-8 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.learners.toLocaleString()}</div>
                <div>Active Learners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.tutors}</div>
                <div>Local Tutors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.sessions.toLocaleString()}</div>
                <div>Learning Sessions</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="expansion">Expansion</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Core Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className={feature.color}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                  </div>
                  <p className="text-sm mb-3">{feature.description}</p>
                  <div className="bg-white/50 p-3 rounded-lg">
                    <p className="text-xs font-medium">Example:</p>
                    <p className="text-sm italic">"{feature.example}"</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">{stats.completionRate}%</div>
                <div className="text-sm text-muted-foreground">Completion Rate</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">+{stats.retention}%</div>
                <div className="text-sm text-muted-foreground">Better Retention</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold">{stats.costSaving}%</div>
                <div className="text-sm text-muted-foreground">Cost Savings</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold">{stats.lgas}</div>
                <div className="text-sm text-muted-foreground">LGAs Covered</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Headphones className="w-5 h-5" />
                  <span>AI Technology Stack</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium">Local Dialect Fine-tuning</h4>
                  <p className="text-sm text-muted-foreground">Real community voice notes for authentic learning</p>
                </div>
                <div>
                  <h4 className="font-medium">Curriculum Localization</h4>
                  <p className="text-sm text-muted-foreground">Analogies from farming, trading, and daily life</p>
                </div>
                <div>
                  <h4 className="font-medium">Offline Capability</h4>
                  <p className="text-sm text-muted-foreground">Telco caching at local towers</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Scalability Features</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium">Device Compatibility</h4>
                  <p className="text-sm text-muted-foreground">Works on 2005-era phones - no apps needed</p>
                </div>
                <div>
                  <h4 className="font-medium">Cost Efficiency</h4>
                  <p className="text-sm text-muted-foreground">90% cheaper than tablet programs</p>
                </div>
                <div>
                  <h4 className="font-medium">Multi-language Ready</h4>
                  <p className="text-sm text-muted-foreground">Swahili, Wolof, Afrikaans expansion ready</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Proven Impact Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {impactMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{metric.label}</span>
                      <Badge variant="secondary">{metric.trend}</Badge>
                    </div>
                    <div className="text-2xl font-bold text-green-600">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.comparison}</div>
                    <Progress value={Number.parseInt(metric.value)} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pilot Program Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Students Tested</span>
                  <span className="font-bold">80</span>
                </div>
                <div className="flex justify-between">
                  <span>LGAs Covered</span>
                  <span className="font-bold">2 (Ogun State)</span>
                </div>
                <div className="flex justify-between">
                  <span>Teachers Trained</span>
                  <span className="font-bold">150</span>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate</span>
                  <span className="font-bold text-green-600">92%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Comparative Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>TutorLink Completion</span>
                    <span className="font-bold text-green-600">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>App-based Learning</span>
                    <span className="font-bold text-red-600">34%</span>
                  </div>
                  <Progress value={34} className="h-2" />
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">
                    TutorLink shows 170% better completion rates than traditional app-based solutions
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sustainability Model</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {revenueStreams.map((stream, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{stream.title}</h4>
                      <Badge
                        variant={
                          stream.status === "Active"
                            ? "default"
                            : stream.status === "In Progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {stream.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{stream.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Revenue Potential</span>
                      <span className="font-bold text-green-600">{stream.potential}/month</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">{formatAmount(90000)}</div>
                <div className="text-sm text-muted-foreground">Total Revenue Potential</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">₦500</div>
                <div className="text-sm text-muted-foreground">Per Tutor/Month</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Award className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold">₦200</div>
                <div className="text-sm text-muted-foreground">Per Learner/Month</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expansion" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Expansion Roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-600">Phase 1: Nigeria Scale-up</h4>
                  <p className="text-sm text-muted-foreground">Expand to 10 LGAs across 3 states</p>
                  <div className="text-xs text-muted-foreground mt-1">Target: 5,000 learners by Q2 2024</div>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-600">Phase 2: West Africa</h4>
                  <p className="text-sm text-muted-foreground">Launch in Ghana (Twi), Senegal (Wolof)</p>
                  <div className="text-xs text-muted-foreground mt-1">Target: 15,000 learners by Q4 2024</div>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-purple-600">Phase 3: East Africa</h4>
                  <p className="text-sm text-muted-foreground">Kenya (Swahili), Tanzania expansion</p>
                  <div className="text-xs text-muted-foreground mt-1">Target: 50,000 learners by Q2 2025</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Language Expansion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Hausa, Yoruba, Pidgin</span>
                    <Badge variant="default">Live</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Igbo, Twi</span>
                    <Badge variant="secondary">Q1 2024</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Swahili, Wolof</span>
                    <Badge variant="outline">Q2 2024</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Afrikaans, Amharic</span>
                    <Badge variant="outline">Q3 2024</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Partnership Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium">Telecom Partners</h5>
                    <p className="text-sm text-muted-foreground">MTN, Airtel, Glo for USSD infrastructure</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Government MOUs</h5>
                    <p className="text-sm text-muted-foreground">State education ministries across Africa</p>
                  </div>
                  <div>
                    <h5 className="font-medium">NGO Collaborations</h5>
                    <p className="text-sm text-muted-foreground">UNESCO, Save the Children, local foundations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-center">
        <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
          Join the TutorLink Movement
        </Button>
      </div>
    </div>
  )
}
