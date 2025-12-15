"use client"

import type React from "react"

import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"
import Image from "next/image"

interface ProductCardProps {
  product: Product
  onClick: () => void
  onAddToCart: () => void
}

export function ProductCard({ product, onClick, onAddToCart }: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    onAddToCart()
  }

  return (
    <Card
      className="group relative cursor-pointer overflow-hidden border-border/50 bg-card transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-primary/30"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.discount && (
          <Badge className="absolute right-2 top-2 bg-accent text-accent-foreground animate-pulse-glow">
            -{product.discount}%
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-card-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </div>

        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{product.description}</p>

        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(product.rating) ? "fill-accent text-accent" : "fill-muted text-muted"
              }`}
            />
          ))}
          <span className="ml-1 text-sm text-muted-foreground">({product.reviews})</span>
        </div>

        <div className="flex items-baseline gap-2">
          {product.discount ? (
            <>
              <span className="text-2xl font-bold text-primary">
                ${(product.price * (1 - product.discount / 100)).toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-2xl font-bold text-foreground">${product.price.toFixed(2)}</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 group-hover:shadow-lg"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
