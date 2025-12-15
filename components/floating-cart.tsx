"use client"

import { useState } from "react"
import { ShoppingCart, X, Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { CartItem } from "@/lib/types"
import Image from "next/image"

interface FloatingCartProps {
  cart: CartItem[]
  totalItems: number
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemoveItem: (productId: string) => void
}

export function FloatingCart({ cart, totalItems, onUpdateQuantity, onRemoveItem }: FloatingCartProps) {
  const [isOpen, setIsOpen] = useState(false)

  const subtotal = cart.reduce((sum, item) => {
    const price = item.discount ? item.price * (1 - item.discount / 100) : item.price
    return sum + price * item.quantity
  }, 0)

  return (
    <>
      {/* Floating Cart Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse-glow z-50"
        aria-label="Shopping Cart"
      >
        <ShoppingCart className="h-6 w-6" />
        {totalItems > 0 && (
          <Badge className="absolute -right-2 -top-2 h-7 w-7 rounded-full bg-accent text-accent-foreground p-0 flex items-center justify-center">
            {totalItems}
          </Badge>
        )}
      </Button>

      {/* Cart Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-background/40 backdrop-blur-sm z-40 animate-in fade-in duration-300"
            onClick={() => setIsOpen(false)}
          />

          {/* Cart Panel */}
          <Card className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] max-h-[600px] shadow-2xl z-50 animate-in slide-in-from-bottom-8 duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-bold">Shopping Cart</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent className="overflow-y-auto max-h-[400px] space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                </div>
              ) : (
                cart.map((item) => {
                  const price = item.discount ? item.price * (1 - item.discount / 100) : item.price

                  return (
                    <div key={item.id} className="flex gap-3 p-3 bg-muted/30 rounded-lg border border-border/50">
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm line-clamp-1 mb-1">{item.name}</h4>
                        <p className="text-sm font-bold text-primary mb-2">${price.toFixed(2)}</p>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="h-7 w-7"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="h-7 w-7"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveItem(item.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )
                })
              )}
            </CardContent>

            {cart.length > 0 && (
              <CardFooter className="flex-col gap-4 pt-4 border-t">
                <div className="flex w-full justify-between text-lg font-bold">
                  <span>Subtotal:</span>
                  <span className="text-primary">${subtotal.toFixed(2)}</span>
                </div>
                <Button className="w-full h-11 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  Checkout
                </Button>
              </CardFooter>
            )}
          </Card>
        </>
      )}
    </>
  )
}
