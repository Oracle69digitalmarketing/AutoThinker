"use client"
import { useCurrencyStore } from "@/hooks/use-currency-store"

export function GrowthDashboard() {
  const { formatAmount } = useCurrencyStore()

  return (
    <div>
      <h1>Growth Dashboard</h1>
      <p>Revenue: {formatAmount(12450)}</p>
      <p>Expenses: {formatAmount(8230)}</p>
      <p>Profit: {formatAmount(45230)}</p>
      <p>Other Amount: {formatAmount(1000)}</p>
    </div>
  )
}

export default GrowthDashboard
