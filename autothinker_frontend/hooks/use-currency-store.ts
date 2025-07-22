"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Currency {
  code: string
  symbol: string
  name: string
  rate: number // Exchange rate to USD
}

export const SUPPORTED_CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1 },
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.85 },
  { code: "GBP", symbol: "£", name: "British Pound", rate: 0.73 },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", rate: 110 },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", rate: 1.25 },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", rate: 1.35 },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc", rate: 0.92 },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan", rate: 6.45 },
  { code: "INR", symbol: "₹", name: "Indian Rupee", rate: 74.5 },
  { code: "BRL", symbol: "R$", name: "Brazilian Real", rate: 5.2 },
  { code: "MXN", symbol: "$", name: "Mexican Peso", rate: 20.1 },
  { code: "ZAR", symbol: "R", name: "South African Rand", rate: 14.8 },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira", rate: 411 },
  { code: "KES", symbol: "KSh", name: "Kenyan Shilling", rate: 107 },
  { code: "EGP", symbol: "£", name: "Egyptian Pound", rate: 15.7 },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham", rate: 3.67 },
  { code: "SAR", symbol: "﷼", name: "Saudi Riyal", rate: 3.75 },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar", rate: 1.35 },
  { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar", rate: 7.8 },
  { code: "KRW", symbol: "₩", name: "South Korean Won", rate: 1180 },
]

interface CurrencyStore {
  selectedCurrency: Currency
  setSelectedCurrency: (currency: Currency) => void
  convertFromUSD: (amount: number) => number
  formatAmount: (amount: number) => string
  getCurrencyByCode: (code: string) => Currency | undefined
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      selectedCurrency: SUPPORTED_CURRENCIES[0], // Default to USD

      setSelectedCurrency: (currency: Currency) => {
        set({ selectedCurrency: currency })
      },

      convertFromUSD: (amount: number) => {
        const { selectedCurrency } = get()
        return amount * selectedCurrency.rate
      },

      formatAmount: (amount: number) => {
        const { selectedCurrency } = get()
        const convertedAmount = amount * selectedCurrency.rate

        // Format based on currency
        if (selectedCurrency.code === "JPY" || selectedCurrency.code === "KRW") {
          return `${selectedCurrency.symbol}${Math.round(convertedAmount).toLocaleString()}`
        }

        return `${selectedCurrency.symbol}${convertedAmount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      },

      getCurrencyByCode: (code: string) => {
        return SUPPORTED_CURRENCIES.find((currency) => currency.code === code)
      },
    }),
    {
      name: "autothinker-currency-storage",
      skipHydration: true,
    },
  ),
)
