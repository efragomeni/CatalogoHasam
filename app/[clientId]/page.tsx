"use client";
// app/[clientId]/page.tsx

import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { useParams } from "next/navigation";

import ProductCard from "@/components/product-card";
import CartDrawer from "@/components/cart-drawer";
import WhatsAppButton from "@/components/whatsapp-button";
import CategoryCards from "@/components/CategoryCards";
import SubcategoryCards from "@/components/subcategory-filter";

import type { Product, Client, CartItem } from "@/types";

// 👉 Sanity
import { client as sanityClient } from "@/sanity/lib/client";
import { productsQuery } from "@/sanity/lib/queries";

// 👉 Clientes (JSON)
import clientesData from "@/data/clientes.json";

const clientes: Client[] = clientesData as Client[];

export default function CatalogoPage() {
  const params = useParams();
  const clientId = params.clientId as string;

  // ---------- CLIENTE ----------
  const [client, setClient] = useState<Client>(() => {
    return clientes.find((c) => c.id === clientId) || clientes[0];
  });

  useEffect(() => {
    const found = clientes.find((c) => c.id === clientId);
    if (found) setClient(found);
  }, [clientId]);

  // ---------- PRODUCTOS ----------
  const [productos, setProductos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductos() {
      try {
        const data = await sanityClient.fetch(productsQuery);
        const mapped = data.map((p: any) => ({ ...p, id: p._id }));
        setProductos(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProductos();
  }, []);

  // ---------- FILTROS ----------
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] =
    useState<string | null>(null);

  useEffect(() => {
    setSelectedSubcategory(null);
  }, [selectedCategory]);

  // ---------- CARRITO ----------
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (productId: string, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { productId, quantity }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.productId !== productId)
        : prev.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          )
    );
  };

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  // ---------- CATEGORÍAS ----------
  const categories = Array.from(
    new Set(productos.map((p) => p.categoria))
  ).sort();

  const subcategories = Array.from(
    new Set(
      productos
        .filter((p) =>
          selectedCategory ? p.categoria === selectedCategory : true
        )
        .map((p) => p.subcategoria)
        .filter(Boolean)
    )
  ).sort();

  const filteredProducts = productos.filter((p) => {
    if (selectedCategory && p.categoria !== selectedCategory) return false;
    if (selectedSubcategory && p.subcategoria !== selectedSubcategory)
      return false;
    return true;
  });

  // ---------- IMÁGENES ----------
  const categoryImages: Record<string, any> = {};
  categories.forEach((cat) => {
    const prod = productos.find((p) => p.categoria === cat && p.imagen1);
    if (prod) categoryImages[cat] = prod.imagen1;
  });

  // ---------- LOADING ----------
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Cargando productos…</p>
      </div>
    );
  }

  // ---------- RENDER ----------
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold">Hasam 3D</h1>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative rounded-full border p-2 hover:bg-accent"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <CategoryCards
          categories={categories}
          images={categoryImages}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {selectedCategory && subcategories.length > 0 && (
          <SubcategoryCards
            subcategories={subcategories}
            selectedSubcategory={selectedSubcategory}
            onSelectSubcategory={setSelectedSubcategory}
          />
        )}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              client={client}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        products={productos}
        client={client}
        onUpdateQuantity={updateQuantity}
      />

      <WhatsAppButton cart={cart} products={productos} client={client} />
    </div>
  );
}
