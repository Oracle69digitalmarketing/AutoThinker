// autothinker_frontend/components/BusinessFormation.tsx
"use client"

import React, { useState, useEffect } from "react" // Import React and useEffect
import axios from 'axios' // Import axios for API calls
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, FileText, DollarSign, Shield, Building, ExternalLink, AlertTriangle } from "lucide-react"
import { generateFormationPlan } from "@/app/actions/generate-formation" // Your backend action

// Define types for fetched country data
interface CountryData {
  code: string;
  name: string;
  states: string[];
}

export function BusinessFormation() {
  const [businessName, setBusinessName] = useState("")
  const [businessType, setBusinessType] = useState("")
  const [country, setCountry] = useState("") // NEW: State for selected country
  const [state, setState] = useState("") // Existing state, will now hold the selected state/province
  const [formationPlan, setFormationPlan] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // NEW: States for fetching country data
  const [allCountries, setAllCountries] = useState<CountryData[]>([]);
  const [availableStates, setAvailableStates] = useState<string[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [errorCountries, setErrorCountries] = useState<string | null>(null);

  // Define your backend API base URL from environment variables
  const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3000'; // Fallback for local dev

  // Effect to fetch all countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoadingCountries(true);
        const response = await axios.get<CountryData[]>(`${BACKEND_API_URL}/locations/countries`);
        setAllCountries(response.data);
      } catch (err) {
        console.error('Failed to fetch countries:', err);
        setErrorCountries('Failed to load countries. Please refresh.');
      } finally {
        setLoadingCountries(false);
      }
    };
    fetchCountries();
  }, [BACKEND_API_URL]); // Depend on BACKEND_API_URL to refetch if it changes (unlikely in prod)

  // Effect to update available states when country selection changes
  useEffect(() => {
    if (country) {
      const selectedCountry = allCountries.find(c => c.code === country);
      setAvailableStates(selectedCountry ? selectedCountry.states : []);
      // Reset state if the current one is not in the new list of states for the selected country
      if (selectedCountry && !selectedCountry.states.includes(state)) {
        setState(""); // Reset state
      }
    } else {
      setAvailableStates([]);
      setState(""); // Reset state if no country is selected
    }
  }, [country, allCountries, state]); // Include state in dependency array to avoid stale closure warning

  const handleGenerateFormation = async () => {
    if (!businessName.trim() || !businessType || !country || !state) return // NEW: Validate country and state

    setIsGenerating(true)
    try {
      // NEW: Pass country to your generateFormationPlan action
      const plan = await generateFormationPlan({ businessName, businessType, country, state })
      setFormationPlan(plan)
    } catch (error) {
      console.error("Error generating formation plan:", error)
      // Optionally display a user-friendly error message
    } finally {
      setIsGenerating(false)
    }
  }

  const entityTypes = [
    { value: "llc", label: "LLC (Limited Liability Company)" },
    { value: "corporation", label: "Corporation (C-Corp)" },
    { value: "s-corp", label: "S-Corporation" },
    { value: "partnership", label: "Partnership" },
    { value: "sole-proprietorship", label: "Sole Proprietorship" },
  ]

  // The 'states' array is now dynamic, so it's removed from here

  const formationSteps = [
    { id: "entity", name: "Choose Entity Type", status: "completed", icon: Building },
    { id: "name", name: "Reserve Business Name", status: "in-progress", icon: FileText },
    { id: "register", name: "File Formation Documents", status: "pending", icon: Shield },
    { id: "ein", name: "Get EIN Number", status: "pending", icon: DollarSign },
    { id: "banking", name: "Open Business Bank Account", status: "pending", icon: Building },
    { id: "compliance", name: "Ongoing Compliance", status: "pending", icon: CheckCircle },
  ]

  if (loadingCountries) {
    return (
      <Card>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <svg className="animate-spin h-5 w-5 text-purple-600 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading countries and states...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (errorCountries) {
    return (
      <Card>
        <CardContent>
          <div className="flex items-center justify-center p-8 text-red-600">
            <AlertTriangle className="w-5 h-5 mr-2" />
            {errorCountries}
          </div>
        </CardContent>
      </Card>
    );
  }


  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="w-5 h-5 text-purple-600" />
            <span>Business Formation Assistant</span>
            <Badge variant="secondary">Legal & Compliance</Badge>
          </CardTitle>
          <CardDescription>
            Get step-by-step guidance for legally forming your business, from entity selection to compliance
            requirements.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Business Name</label>
              <Input
                placeholder="Enter your business name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Entity Type</label>
              <Select value={businessType} onValueChange={setBusinessType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select entity type" />
                </SelectTrigger>
                <SelectContent>
                  {entityTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* NEW: Country Selection Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Country of Formation</label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {allCountries.map((countryOption) => (
                    <SelectItem key={countryOption.code} value={countryOption.code}>
                      {countryOption.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* NEW: State/Province Selection Dropdown (Conditionally Rendered) */}
            {country && ( // Only show if a country is selected
              <div className="space-y-2 md:col-span-1"> {/* Adjust grid span if needed */}
                <label className="text-sm font-medium">State/Province of Formation</label>
                <Select value={state} onValueChange={setState} disabled={availableStates.length === 0}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state/province" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableStates.length > 0 ? (
                      availableStates.map((stateName) => (
                        <SelectItem key={stateName} value={stateName}>
                          {stateName}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="" disabled>No states/provinces available</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <Button
            onClick={handleGenerateFormation}
            disabled={!businessName.trim() || !businessType || !country || !state || isGenerating} // NEW: Disable if country or state is missing
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {isGenerating ? "Creating Formation Plan..." : "Generate Formation Roadmap"}
          </Button>
        </CardContent>
      </Card>

      {/* Existing formationPlan rendering logic remains unchanged */}
      {formationPlan && (
        <div className="space-y-6">
          {/* Formation Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Formation Progress</CardTitle>
              <CardDescription>Track your business formation journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-6 gap-4">
                {formationSteps.map((step, index) => (
                  <div key={step.id} className="text-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                        step.status === "completed"
                          ? "bg-green-100 text-green-600"
                          : step.status === "in-progress"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <step.icon className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-medium">{step.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Formation Details */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="costs">Costs & Fees</TabsTrigger>
              <TabsTrigger value="next-steps">Next Steps</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Formation Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formationPlan.overview && (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-blue-800">Recommended Entity Type</h4>
                          <p className="text-sm text-blue-600 mt-1">{formationPlan.overview.recommendedEntity}</p>
                          <p className="text-xs text-blue-500 mt-2">{formationPlan.overview.entityReason}</p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg">
                          <h4 className="font-semibold text-green-800">Formation Timeline</h4>
                          <p className="text-sm text-green-600 mt-1">{formationPlan.overview.timeline}</p>
                          <p className="text-xs text-green-500 mt-2">Estimated completion time</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Key Benefits of {businessType.toUpperCase()}:</h4>
                        <ul className="space-y-1">
                          {formationPlan.overview.benefits.map((benefit: string, index: number) => (
                            <li key={index} className="flex items-start space-x-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Important Considerations:</h4>
                        <ul className="space-y-1">
                          {formationPlan.overview.considerations.map((consideration: string, index: number) => (
                            <li key={index} className="flex items-start space-x-2 text-sm">
                              <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                              <span>{consideration}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Required Documents</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formationPlan.documents && (
                    <div className="space-y-4">
                      {formationPlan.documents.map((doc: any, index: number) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{doc.name}</h4>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <FileText className="w-4 h-4 mr-2" />
                                Template
                              </Button>
                              <Button size="sm">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                File Online
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>Filing Fee: {doc.fee}</span>
                            <span>Processing Time: {doc.processingTime}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="costs" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Formation Costs Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  {formationPlan.costs && (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-3">One-Time Formation Costs</h4>
                          <div className="space-y-2">
                            {formationPlan.costs.oneTime.map((cost: any, index: number) => (
                              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                <span className="text-sm">{cost.item}</span>
                                <span className="font-medium">${cost.amount}</span>
                              </div>
                            ))}
                            <div className="flex justify-between items-center p-2 bg-blue-50 rounded font-semibold">
                              <span>Total One-Time</span>
                              <span>${formationPlan.costs.oneTimeTotal}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Ongoing Annual Costs</h4>
                          <div className="space-y-2">
                            {formationPlan.costs.annual.map((cost: any, index: number) => (
                              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                <span className="text-sm">{cost.item}</span>
                                <span className="font-medium">${cost.amount}/year</span>
                              </div>
                            </div>
                          ))}
                          <div className="flex justify-between items-center p-2 bg-green-50 rounded font-semibold">
                            <span>Total Annual</span>
                            <span>${formationPlan.costs.annualTotal}/year</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="next-steps" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Next Steps Action Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  {formationPlan.nextSteps && (
                    <div className="space-y-4">
                      {formationPlan.nextSteps.map((step: any, index: number) => (
                        <div key={index} className="border-l-4 border-l-blue-500 pl-4 py-2">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold">
                              Step {index + 1}: {step.title}
                            </h4>
                            <Badge variant="outline">{step.timeline}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                          <div className="flex space-x-2">
                            {step.actions.map((action: string, actionIndex: number) => (
                              <Button key={actionIndex} size="sm" variant="outline">
                                {action}
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div
