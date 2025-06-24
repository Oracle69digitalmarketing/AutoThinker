"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { LineChart, Users, DollarSign, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { useCurrencyStore } from "@/hooks/use-currency-store"

export function GrowthDashboard() {
  const { formatAmount } = useCurrencyStore()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock KPI data with currency formatting
  const kpis = [
    {
      icon: Users,
      label: "New Users",
      value: "1,248",
      change: "+8.4%",
      color: "text-blue-600",
    },
    {
      icon: DollarSign,
      label: "MRR",
      value: formatAmount(7920),
      change: "+5.1%",
      color: "text-green-600",
    },
    {
      icon: ShoppingCart,
      label: "Conversions",
      value: "312",
      change: "+3.2%",
      color: "text-purple-600",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <LineChart className="w-5 h-5 text-indigo-600" />
            <span>Growth Analytics Dashboard</span>
            <Badge variant="secondary">Live Data</Badge>
          </CardTitle>
          <CardDescription>Track key metrics and understand how your business is performing.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* KPI Tiles */}
          <div className="grid md:grid-cols-3 gap-4">
            {kpis.map((kpi) => (
              <Card key={kpi.label} className="p-4">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${kpi.color}`}>
                    <kpi.icon className="w-5 h-5" />
                  </div>
                  <Badge variant={kpi.change.startsWith("+") ? "default" : "destructive"}>{kpi.change}</Badge>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <p className="text-sm text-muted-foreground">{kpi.label}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Revenue Breakdown */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Revenue Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subscriptions</span>
                  <span className="font-medium">{formatAmount(5200)}</span>
                </div>
                <div className="flex justify-between">
                  <span>One-time Sales</span>
                  <span className="font-medium">{formatAmount(1800)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Consulting</span>
                  <span className="font-medium">{formatAmount(920)}</span>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-2">Expenses</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Marketing</span>
                  <span className="font-medium">{formatAmount(2100)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Operations</span>
                  <span className="font-medium">{formatAmount(1200)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tools & Software</span>
                  <span className="font-medium">{formatAmount(450)}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Tabbed Analytics */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="acquisition">Acquisition</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">
                  Your business is showing strong growth with {formatAmount(7920)} in monthly recurring revenue. Focus
                  on customer retention to maximize lifetime value.
                </p>
              </Card>
            </TabsContent>
            <TabsContent value="acquisition">
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">
                  Customer acquisition cost is {formatAmount(45)} with an average customer lifetime value of{" "}
                  {formatAmount(890)}. Your LTV:CAC ratio of 19.8:1 is excellent.
                </p>
              </Card>
            </TabsContent>
            <TabsContent value="revenue">
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">
                  Revenue growth is trending upward with {formatAmount(1200)} increase this month. Consider expanding
                  your Pro plan features to capture more value.
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
