"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, CreditCard, Package, TrendingUp, Zap, ExternalLink } from "lucide-react"

export function EcommerceBuilder() {
  const [storeName, setStoreName] = useState("")
  const [platform, setPlatform] = useState("")
  const [isBuilding, setIsBuilding] = useState(false)
  const [storeCreated, setStoreCreated] = useState(false)

  const platforms = [
    {
      id: "shopify",
      name: "Shopify",
      description: "Complete e-commerce solution",
      pricing: "$29/month",
      features: ["Unlimited products", "Payment processing", "Mobile responsive", "SEO optimized"],
    },
    {
      id: "woocommerce",
      name: "WooCommerce",
      description: "WordPress-based store",
      pricing: "Free + hosting",
      features: ["WordPress integration", "Customizable", "Large plugin ecosystem", "Open source"],
    },
    {
      id: "stripe",
      name: "Stripe Checkout",
      description: "Simple payment pages",
      pricing: "2.9% + 30¢",
      features: ["Quick setup", "Secure payments", "Mobile optimized", "Global currencies"],
    },
  ]

  const handleBuildStore = async () => {
    setIsBuilding(true)
    // TODO: Integrate with e-commerce platforms
    setTimeout(() => {
      setIsBuilding(false)
      setStoreCreated(true)
      alert("🛒 E-commerce store created and configured!")
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5 text-green-600" />
            <span>AI E-commerce Builder</span>
            <Badge variant="secondary">Auto-Setup</Badge>
          </CardTitle>
          <CardDescription>
            Create a complete online store with products, payments, and shipping - all configured automatically based on
            your business strategy.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!storeCreated ? (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Store Name</label>
                  <Input
                    placeholder="Enter your store name"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">E-commerce Platform</label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {platforms.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name} - {p.pricing}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Platform Comparison */}
              <div className="grid md:grid-cols-3 gap-4">
                {platforms.map((p) => (
                  <Card
                    key={p.id}
                    className={`cursor-pointer transition-all ${platform === p.id ? "ring-2 ring-green-500" : "hover:shadow-md"}`}
                    onClick={() => setPlatform(p.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{p.name}</h4>
                        <Badge variant="outline">{p.pricing}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{p.description}</p>
                      <ul className="space-y-1">
                        {p.features.map((feature, idx) => (
                          <li key={idx} className="text-xs flex items-center space-x-1">
                            <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button
                onClick={handleBuildStore}
                disabled={!storeName || !platform || isBuilding}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 h-12"
              >
                {isBuilding ? (
                  <>
                    <Zap className="w-5 h-5 mr-2 animate-spin" />
                    Building Store & Configuring Payments...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Build Complete E-commerce Store
                  </>
                )}
              </Button>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">What Gets Created:</h4>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Professional store design based on your branding</li>
                  <li>• AI-generated product descriptions and categories</li>
                  <li>• Payment processing setup (Stripe, PayPal)</li>
                  <li>• Shipping zones and tax configuration</li>
                  <li>• SEO optimization and analytics tracking</li>
                  <li>• Mobile-responsive checkout process</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Store Status */}
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-green-800">🎉 Store Successfully Created!</h4>
                    <p className="text-sm text-green-600">Your e-commerce store is live and ready for customers</p>
                  </div>
                  <Button size="sm" asChild>
                    <a href="#" target="_blank" rel="noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Store
                    </a>
                  </Button>
                </div>
              </div>

              {/* Store Analytics */}
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">24</div>
                  <div className="text-sm text-gray-600">Products Added</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">$2,847</div>
                  <div className="text-sm text-gray-600">Revenue (7 days)</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">156</div>
                  <div className="text-sm text-gray-600">Visitors</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">8.4%</div>
                  <div className="text-sm text-gray-600">Conversion Rate</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {storeCreated && (
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-5 h-5" />
                  <span>AI Product Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">Auto-Generated Products</h4>
                  <Button size="sm">
                    <Zap className="w-4 h-4 mr-2" />
                    Generate More Products
                  </Button>
                </div>

                <div className="space-y-3">
                  {[
                    { name: "Premium Starter Kit", price: "$49.99", status: "Active", sales: 23 },
                    { name: "Professional Bundle", price: "$99.99", status: "Active", sales: 18 },
                    { name: "Enterprise Solution", price: "$199.99", status: "Active", sales: 12 },
                    { name: "Basic Package", price: "$29.99", status: "Draft", sales: 0 },
                  ].map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h5 className="font-medium">{product.name}</h5>
                        <p className="text-sm text-gray-600">
                          {product.price} • {product.sales} sales
                        </p>
                      </div>
                      <Badge variant={product.status === "Active" ? "default" : "secondary"}>{product.status}</Badge>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">AI Recommendations:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Add product bundles to increase average order value</li>
                    <li>• Create limited-time offers for seasonal demand</li>
                    <li>• Optimize product descriptions for better SEO</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Payment Processing</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">✅ Stripe Connected</h4>
                    <p className="text-sm text-green-600">Processing credit cards, Apple Pay, Google Pay</p>
                    <p className="text-xs text-green-500 mt-1">2.9% + 30¢ per transaction</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">✅ PayPal Integrated</h4>
                    <p className="text-sm text-blue-600">PayPal, Venmo, Buy Now Pay Later</p>
                    <p className="text-xs text-blue-500 mt-1">2.9% + fixed fee per transaction</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Payment Analytics (Last 30 Days)</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="text-lg font-bold">$12,847</div>
                      <div className="text-xs text-gray-600">Total Processed</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="text-lg font-bold">0.2%</div>
                      <div className="text-xs text-gray-600">Failed Rate</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="text-lg font-bold">$89</div>
                      <div className="text-xs text-gray-600">Avg Order Value</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shipping" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Shipping & Fulfillment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">✅ Shipping Zones Configured</h4>
                  <div className="grid md:grid-cols-2 gap-4 mt-3">
                    <div>
                      <p className="text-sm font-medium">Domestic (US)</p>
                      <p className="text-xs text-gray-600">Free shipping over $50, $5.99 standard</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">International</p>
                      <p className="text-xs text-gray-600">$15.99 flat rate, 7-14 business days</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Fulfillment Options</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">Self-fulfillment</span>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">Dropshipping integration</span>
                      <Badge variant="outline">Available</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">3PL warehouse</span>
                      <Badge variant="outline">Available</Badge>
                    </div>
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
                  <span>E-commerce Analytics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Top Performing Products</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span className="text-sm">Premium Starter Kit</span>
                        <span className="text-sm font-medium text-green-600">$1,149 revenue</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                        <span className="text-sm">Professional Bundle</span>
                        <span className="text-sm font-medium text-blue-600">$1,799 revenue</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Optimization Opportunities</h4>
                    <div className="space-y-2 text-sm">
                      <div className="p-2 bg-yellow-50 rounded">
                        <p className="font-medium text-yellow-800">Cart Abandonment</p>
                        <p className="text-yellow-600">23% cart abandonment - add email recovery</p>
                      </div>
                      <div className="p-2 bg-purple-50 rounded">
                        <p className="font-medium text-purple-800">Upsell Opportunity</p>
                        <p className="text-purple-600">Add related products to increase AOV</p>
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
