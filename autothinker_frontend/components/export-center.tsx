"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, Download, Share, ClipboardCopy, SlidersHorizontal, Presentation } from "lucide-react"

/**
 * Export Center
 *  – Lets users download or share their strategy & assets.
 *  – Currently uses dummy handlers; wire these to real endpoints
 *    (e.g. server actions that create PDFs, push to Notion, etc.).
 */
export function ExportCenter() {
  const handleDownload = (type: string) => {
    // TODO: call server action that returns the generated file URL.
    // For now, just log to console.
    console.log(`Download requested for: ${type}`)
    alert(`🔜 Export '${type}' will be available soon!`)
  }

  const exportOptions = [
    { icon: FileText, label: "PDF Report", action: () => handleDownload("pdf") },
    { icon: Presentation, label: "Pitch Deck (PPTX)", action: () => handleDownload("pitch-deck") },
    { icon: ClipboardCopy, label: "Notion Doc", action: () => handleDownload("notion") },
    { icon: Share, label: "Share Link", action: () => handleDownload("share-link") },
    { icon: SlidersHorizontal, label: "Custom JSON", action: () => handleDownload("json") },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="w-5 h-5 text-indigo-600" />
            <span>Export Center</span>
            <Badge variant="secondary">Beta</Badge>
          </CardTitle>
          <CardDescription>Download or share every asset AutoThinker generates.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            {exportOptions.map((opt) => (
              <Card
                key={opt.label}
                className="p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow"
              >
                <opt.icon className="w-8 h-8 text-indigo-600 mb-3" />
                <p className="font-medium mb-4">{opt.label}</p>
                <Button onClick={opt.action} className="w-full">
                  Export
                </Button>
              </Card>
            ))}
          </div>

          <Separator />

          <p className="text-xs text-muted-foreground">
            PDF and PPTX exports are generated on our server. Notion export will require authorizing your workspace.
            Share Link creates a public, read-only page of your strategy.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
