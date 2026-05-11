"use client";
// app/[clientId]/page.tsx

import { useState, useEffect } from "react";
import { ShoppingCart, X } from "lucide-react";
import { useParams } from "next/navigation";

import ProductCard from "@/components/product-card";
import CartDrawer from "@/components/cart-drawer";
import WhatsAppButton from "@/components/whatsapp-button";
import FiltersSidebar from "@/components/filters-sidebar";

import type { Product, Client, CartItem } from "@/types";

const CATEGORY_LABELS: Record<string, string> = {
  "munecos-3d": "Muñecos 3D",
  mascotas: "Mascotas",
  accesorios: "Accesorios",
  ceramica: "Cerámica",
  decoracion: "Decoración",
};
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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    [],
  );

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
            : i,
        );
      }
      return [...prev, { productId, quantity }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.productId !== productId)
        : prev.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
    );
  };

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  // ---------- CATEGORÍAS ----------
  const categories = Array.from(
    new Set(productos.map((p) => p.categoria)),
  ).sort();

  const subcategories = Array.from(
    new Set(
      productos
        .filter((p) =>
          selectedCategories.length > 0
            ? selectedCategories.includes(p.categoria)
            : true,
        )
        .map((p) => p.subcategoria)
        .filter(Boolean),
    ),
  ).sort();

  const filteredProducts = productos.filter((p) => {
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(p.categoria)
    )
      return false;
    if (
      selectedSubcategories.length > 0 &&
      !selectedSubcategories.includes(p.subcategoria)
    )
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
  const hasActiveFilters =
    selectedCategories.length > 0 || selectedSubcategories.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <button
            onClick={() => {
              setSelectedCategories([]);
              setSelectedSubcategories([]);
            }}
            className="transition-transform hover:scale-105"
          >
            <h1 className="text-2xl font-bold text-gray-900">Hasam 3D</h1>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative rounded-full border border-gray-300 bg-white p-2.5 text-gray-900 transition-all hover:bg-gray-100"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-gray-900">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="flex">
        {/* Fixed Sidebar */}
        <div className="sticky top-20 h-[calc(100vh-80px)] w-64 overflow-y-auto border-r border-gray-200 bg-white">
          <div className="space-y-6 p-4">
            {/* Category Filter */}
            <div>
              <h3 className="mb-3 text-sm font-bold text-gray-900">
                Categorías
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-gray-100"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() =>
                        setSelectedCategories((prev) =>
                          prev.includes(cat)
                            ? prev.filter((c) => c !== cat)
                            : [...prev, cat],
                        )
                      }
                      className="h-4 w-4 rounded border-gray-300 accent-yellow-400"
                    />
                    <span className="text-sm text-gray-700">
                      {CATEGORY_LABELS[cat] ?? cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Subcategory Filter */}
            {selectedCategories.length > 0 && subcategories.length > 0 && (
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900">
                    Subcategorías
                  </h3>
                  {selectedSubcategories.length > 0 && (
                    <button
                      onClick={() => setSelectedSubcategories([])}
                      className="rounded-full bg-gray-100 p-1 hover:bg-gray-200"
                      title="Limpiar"
                    >
                      <X className="h-3 w-3 text-gray-600" />
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {subcategories.map((sub) => (
                    <label
                      key={sub}
                      className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-gray-100"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSubcategories.includes(sub)}
                        onChange={() =>
                          setSelectedSubcategories((prev) =>
                            prev.includes(sub)
                              ? prev.filter((s) => s !== sub)
                              : [...prev, sub],
                          )
                        }
                        className="h-4 w-4 rounded border-gray-300 accent-yellow-400"
                      />
                      <span className="text-sm text-gray-700">{sub}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedSubcategories([]);
                }}
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-all hover:bg-gray-50"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 px-4 py-6">
          {/* Results Counter */}
          {hasActiveFilters && (
            <div className="mb-6 text-sm text-gray-600">
              Se encontraron{" "}
              <span className="font-bold">{filteredProducts.length}</span>{" "}
              productos
            </div>
          )}

          {filteredProducts.length === 0 && hasActiveFilters ? (
            <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-white py-12 text-center">
              <div>
                <p className="text-gray-600">
                  No hay productos que coincidan con los filtros seleccionados.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  client={client}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          )}
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
