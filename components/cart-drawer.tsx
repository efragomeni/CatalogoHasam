"use client"

import { X, Minus, Plus, Trash2 } from "lucide-react"
import type { Product, Client, CartItem } from "@/types"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  cart: CartItem[]
  products: Product[]
  client: Client
  onUpdateQuantity: (productId: number, quantity: number) => void
}

export default function CartDrawer({ isOpen, onClose, cart, products, client, onUpdateQuantity }: CartDrawerProps) {
  const cartItems = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId)!
    const precioBase = product.precios[client.tipo]
    const precio = Math.round(precioBase * (1 - client.descuento / 100))
    return {
      ...item,
      product,
      precio,
      subtotal: precio * item.quantity,
    }
  })

  const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0)

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-border bg-background shadow-2xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border p-6">
            <h2 className="text-xl font-bold text-foreground">Tu Pedido</h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 rounded-full bg-muted p-6">
                  <Trash2 className="h-12 w-12 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium text-foreground">Tu carrito está vacío</p>
                <p className="mt-2 text-sm text-muted-foreground">Agrega productos para comenzar tu pedido</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex gap-4 rounded-xl border border-border bg-card p-4">
                    <img
                      src={item.product.imagen1 || "/placeholder.svg"}
                      alt={item.product.nombre}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-card-foreground">{item.product.nombre}</h3>
                      <p className="text-sm text-muted-foreground">${item.precio} c/u</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                          className="rounded-md border border-border bg-background p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                          className="rounded-md border border-border bg-background p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => onUpdateQuantity(item.productId, 0)}
                          className="ml-auto rounded-md p-1 text-destructive transition-colors hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">${item.subtotal}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-border bg-muted/50 p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-lg font-semibold text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">${total}</span>
              </div>
              <p className="mb-4 text-center text-xs text-muted-foreground">
                Precios para {client.nombre}
                {client.descuento > 0 && ` (${client.descuento}% descuento)`}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
