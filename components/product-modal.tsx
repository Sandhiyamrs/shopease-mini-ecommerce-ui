"use client"

import { useState } from "react"
import { X, Star, ShoppingCart, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"
import Image from "next/image"

interface ProductModalProps {
  product: Product
  onClose: () => void
  onAddToCart: (product: Product, quantity: number) => void
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const images = [product.image, ...product.additionalImages]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleAddToCart = () => {
    onAddToCart(product, quantity)
    onClose()
  }

  const finalPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-card rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Carousel */}
          <div className="relative aspect-square bg-muted">
            <Image
              src={images[currentImageIndex] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />

            {product.discount && (
              <Badge className="absolute right-4 top-4 bg-accent text-accent-foreground animate-pulse-glow">
                -{product.discount}%
              </Badge>
            )}

            {/* Carousel Controls */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        index === currentImageIndex ? "w-8 bg-primary" : "w-2 bg-background/50"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col p-6 md:p-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-card-foreground mb-2">{product.name}</h2>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "fill-accent text-accent" : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

              <div className="space-y-4 mb-6">
                <div>
                  <span className="text-sm text-muted-foreground">Category</span>
                  <p className="font-medium capitalize">{product.category}</p>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground">Availability</span>
                  <p className="font-medium text-secondary">In Stock</p>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-primary">${finalPrice.toFixed(2)}</span>
                {product.discount && (
                  <span className="text-xl text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                )}
              </div>
            </div>

            {/* Quantity Selector and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)} className="h-10 w-10">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full gap-2 h-12 text-lg bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart - ${(finalPrice * quantity).toFixed(2)}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
