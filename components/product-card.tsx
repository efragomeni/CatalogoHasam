"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import type { Product, Client } from "@/types"

interface ProductCardProps {
  product: Product
  client: Client
  onAddToCart: (productId: number, quantity: number) => void
}

export default function ProductCard({ product, client, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const precioBase = product.precios[client.tipo]
  const precio = Math.round(precioBase * (1 - client.descuento / 100))

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity)
    setQuantity(1)
  }

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={isHovered ? product.imagen2 : product.imagen1}
          alt={product.nombre}
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
        />

        {/* Category Badge */}
        <div className="absolute left-3 top-3 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
          {product.categoria}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="mb-1 text-lg font-semibold text-card-foreground">{product.nombre}</h3>
        <p className="mb-4 text-sm text-muted-foreground">{product.descripcion}</p>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-primary">${precio}</p>
            {/* {client.descuento > 0 ? (
              <p className="text-xs text-muted-foreground">{client.descuento}% descuento</p>
            ) : (
              <p className="text-xs text-muted-foreground">Precio minorista</p>
            )} */}
          </div>

          <div className="flex items-center gap-2">
            {/* Quantity Selector */}
            <div className="flex items-center gap-1 rounded-lg border border-border bg-background">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-2 py-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-2 py-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                +
              </button>
            </div>

            {/* Add Button */}
            <button
              onClick={handleAddToCart}
              className="rounded-lg bg-primary p-2 text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md active:scale-95"
            >
              <p>Agregar</p>
              {/* <Plus className="h-5 w-5" /> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
