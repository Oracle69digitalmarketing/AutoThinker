import { useCurrencyStore } from "@/hooks/use-currency-store"

export function EcommerceBuilder() {
  const { formatAmount } = useCurrencyStore()

  // Example data - replace with your actual data fetching
  const products = [
    { id: 1, name: "Product A", price: 25.99 },
    { id: 2, name: "Product B", price: 49.5 },
    { id: 3, name: "Product C", price: 100.0 },
  ]

  return (
    <div>
      <h1>Ecommerce Builder</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
            <h3>{product.name}</h3>
            <p>Price: {formatAmount(product.price)}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}
