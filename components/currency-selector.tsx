"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Globe, DollarSign } from "lucide-react"
import { useCurrencyStore, SUPPORTED_CURRENCIES } from "@/hooks/use-currency-store"

export function CurrencySelector() {
  const { selectedCurrency, setSelectedCurrency } = useCurrencyStore()
  const [open, setOpen] = useState(false)

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
        <Button variant="outline" size="sm" className="flex items-center space-x-2">
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

              <Select value={selectedCurrency.code} onValueChange={handleCurrencyChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {SUPPORTED_CURRENCIES.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-sm">{currency.symbol}</span>
                          <span>{currency.name}</span>
                        </div>
                        <Badge variant="secondary" className="ml-2">
                          {currency.code}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="text-xs text-gray-500">
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
