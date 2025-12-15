export interface Product {
  id: string
  name: string
  description: string
  price: number
  discount?: number
  image: string
  additionalImages: string[]
  category: string
  rating: number
  reviews: number
}

export interface CartItem extends Product {
  quantity: number
}
