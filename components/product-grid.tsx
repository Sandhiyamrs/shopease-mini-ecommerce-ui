"use client"

import { useMemo } from "react"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/data"
import type { Product } from "@/lib/types"

interface ProductGridProps {
  searchQuery: string
  category: string
  sortBy: string
  onProductClick: (product: Product) => void
  onAddToCart: (product: Product) => void
}

export function ProductGrid({ searchQuery, category, sortBy, onProductClick, onAddToCart }: ProductGridProps) {
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    // Filter by category
    if (category !== "all") {
      filtered = filtered.filter((p) => p.category === category)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query),
      )
    }

    // Sort products
    const sorted = [...filtered]
    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        sorted.sort((a, b) => b.price - a.price)
        break
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating)
        break
      default:
        // Keep featured order
        break
    }

    return sorted
  }, [searchQuery, category, sortBy])

  if (filteredAndSortedProducts.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-muted-foreground">No products found</p>
          <p className="mt-2 text-sm text-muted-foreground">Try adjusting your filters or search query</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredAndSortedProducts.map((product, index) => (
        <div key={product.id} className="animate-slide-in-up" style={{ animationDelay: `${index * 50}ms` }}>
          <ProductCard
            product={product}
            onClick={() => onProductClick(product)}
            onAddToCart={() => onAddToCart(product)}
          />
        </div>
      ))}
    </div>
  )
}
