"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Globe, DollarSign, Check } from "lucide-react"
import { useCurrencyStore, SUPPORTED_CURRENCIES } from "@/hooks/use-currency-store"

export function CurrencySelector() {
  const { selectedCurrency, setSelectedCurrency } = useCurrencyStore()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="flex items-center space-x-2">
        <Globe className="w-4 h-4" />
        <span>$</span>
        <span className="hidden sm:inline">USD</span>
      </Button>
    )
  }

  const handleCurrencyChange = (currencyCode: string) => {
    const currency = SUPPORTED_CURRENCIES.find((c) => c.code === currencyCode)
    if (currency) {
      setSelectedCurrency(currency)
      setOpen(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center space-x-2 min-w-[80px]">
          <Globe className="w-4 h-4" />
          <span>{selectedCurrency.symbol}</span>
          <span className="hidden sm:inline">{selectedCurrency.code}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Card className="border-0 shadow-none">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold">Select Currency</h3>
              </div>

              <div className="grid gap-2 max-h-60 overflow-y-auto">
                {SUPPORTED_CURRENCIES.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => handleCurrencyChange(currency.code)}
                    className={`flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-100 transition-colors ${
                      selectedCurrency.code === currency.code ? "bg-blue-50 border border-blue-200" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm w-8">{currency.symbol}</span>
                      <span className="text-sm">{currency.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {currency.code}
                      </Badge>
                      {selectedCurrency.code === currency.code && <Check className="w-4 h-4 text-blue-600" />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="text-xs text-gray-500 border-t pt-2">
                <p>Exchange rates are approximate and updated regularly.</p>
                <p className="mt-1">All prices are converted from USD base rates.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
