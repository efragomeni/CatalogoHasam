"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, User, Grid3x3 } from "lucide-react"
import { useParams } from "next/navigation"
import ProductCard from "@/components/product-card"
import CartDrawer from "@/components/cart-drawer"
import WhatsAppButton from "@/components/whatsapp-button"
import CategoryFilter from "@/components/category-filter"
import type { Product, Client, CartItem } from "@/types"

import productosData from "@/data/productos.json"
import clientesData from "@/data/clientes.json"

const productos: Product[] = productosData as Product[]
const clientes: Client[] = clientesData as Client[]

export default function CatalogoPage() {
  const params = useParams()
  const clientId = params.clientId as string

  const [client, setClient] = useState<Client>(() => {
    const foundClient = clientes.find((c) => c.id === clientId)
    return foundClient || clientes[0] // Default to first client if not found
  })

  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const foundClient = clientes.find((c) => c.id === clientId)
    if (foundClient) {
      setClient(foundClient)
    }
  }, [clientId])

  const addToCart = (productId: number, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId)
      if (existing) {
        return prev.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }
      return [...prev, { productId, quantity }]
    })
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.productId !== productId))
    } else {
      setCart((prev) => prev.map((item) => (item.productId === productId ? { ...item, quantity } : item)))
    }
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const categories = Array.from(new Set(productos.map((p) => p.categoria))).sort()

  const filteredProducts = selectedCategory ? productos.filter((p) => p.categoria === selectedCategory) : productos

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Hasam 3D</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{client.nombre}</span>
                {/* {client.descuento > 0 && (
                  <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                    -{client.descuento}%
                  </span>
                )} */}
              </div>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative rounded-full border border-border bg-card p-2 text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-foreground">Nuestros Productos</h2>
          <p className="text-balance text-muted-foreground">
            Descubre nuestra colección de productos impresos en 3D con diseños únicos y funcionales
          </p>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Product count */}
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} {filteredProducts.length === 1 ? "producto" : "productos"}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((producto) => (
            <ProductCard key={producto.id} product={producto} client={client} onAddToCart={addToCart} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 rounded-full bg-muted p-4">
              <Grid3x3 className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">No hay productos en esta categoría</h3>
            <p className="text-sm text-muted-foreground">Intenta seleccionar otra categoría</p>
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        products={productos}
        client={client}
        onUpdateQuantity={updateQuantity}
      />

      {/* WhatsApp Button */}
      <WhatsAppButton cart={cart} products={productos} client={client} />
    </div>
  )
}
