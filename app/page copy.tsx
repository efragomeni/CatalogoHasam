"use client";
//Aca estoy --> app\[clientId]\page.tsx

import { useState, useEffect } from "react";
import { ShoppingCart, User, Grid3x3 } from "lucide-react";
import { useParams } from "next/navigation";

import ProductCard from "@/components/product-card";
import CartDrawer from "@/components/cart-drawer";
import WhatsAppButton from "@/components/whatsapp-button";
import CategoryFilter from "@/components/category-filter";
import CategoryCards from "@/components/CategoryCards";

import SubcategoryCards from "@/components/subcategory-filter";

import type { Product, Client, CartItem } from "@/types";

// 👉 Sanity
import { client as sanityClient } from "@/sanity/lib/client";
import { productsQuery } from "@/sanity/lib/queries";

// 👉 Clientes siguen viniendo del JSON (por ahora)
import clientesData from "@/data/clientes.json";

const clientes: Client[] = clientesData as Client[];

export default function CatalogoPage() {
  const params = useParams();
  const clientId = params.clientId as string;

  // ---------- CLIENTE ----------
  const [client, setClient] = useState<Client>(() => {
    const foundClient = clientes.find((c) => c.id === clientId);
    return foundClient || clientes[0];
  });

  useEffect(() => {
    const foundClient = clientes.find((c) => c.id === clientId);
    if (foundClient) {
      setClient(foundClient);
    }
  }, [clientId]);

  // ---------- PRODUCTOS (SANITY) ----------
  const [productos, setProductos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductos() {
      try {
        const data = await sanityClient.fetch(productsQuery);

        // Adaptamos _id → id para que tu app siga igual
        const mappedProducts: Product[] = data.map((p: any) => ({
          ...p,
          id: p._id,
        }));

        setProductos(mappedProducts);
      } catch (error) {
        console.error("Error fetching products from Sanity:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProductos();
  }, []);

  // ---------- CARRITO ----------
  // const [cart, setCart] = useState<CartItem[]>([]);
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // ---------- FILTROS ----------
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );

  // ---------- CARRITO ----------
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (productId: string, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { productId, quantity }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.productId !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // ---------- FILTROS ----------
  const categories = Array.from(
    new Set(productos.map((p) => p.categoria))
  ).sort();

  // const filteredProducts = selectedCategory
  //   ? productos.filter((p) => p.categoria === selectedCategory)
  //   : productos;
  const filteredProducts = productos.filter((p) => {
    if (selectedCategory && p.categoria !== selectedCategory) return false;
    if (selectedSubcategory && p.subcategoria !== selectedSubcategory)
      return false;
    return true;
  });

  // -------- SUB FILTROS ----------
  // const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
  //   null
  // );

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

  useEffect(() => {
    setSelectedSubcategory(null);
  }, [selectedCategory]);

  // ---------- LOADING ----------
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Cargando productos…</p>
      </div>
    );
  }

  const categoryImages: Record<string, any> = {};

categories.forEach((category) => {
  const productWithImage = productos.find(
    (p) => p.categoria === category && p.imagen1
  );

  if (productWithImage) {
    categoryImages[category] = productWithImage.imagen1;
  }
});

  // ---------- RENDER ----------
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Hasam 3D
            </h1>

            <div className="flex items-center gap-3">
              {/* <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
                  <User className="h-4 w-4" />
                  <span>{client.nombre}</span>
                </div>
              </div> */}

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative rounded-full border p-2 hover:bg-accent"
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

      {/* Main */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold">Nuestros Productos</h2>
          <p className="text-muted-foreground">
            Descubre nuestra colección de productos impresos en 3D
          </p>
        </div>

        {/* 👇 Cards de categorías */}
   <CategoryCards
  categories={categories}
  images={categoryImages}
  selectedCategory={selectedCategory}
  onSelectCategory={setSelectedCategory}
/>

        {/* {selectedCategory && subcategories.length > 0 && (
          <CategoryFilter
            categories={subcategories}
            selectedCategory={selectedSubcategory}
            onSelectCategory={setSelectedSubcategory}
          />
        )} */}
        {/* NIVEL 2: Subcategorías */}
        {selectedCategory &&
          subcategories.length > 0 &&
          !selectedSubcategory && (
            <SubcategoryCards
              subcategories={subcategories}
              onSelectSubcategory={setSelectedSubcategory}
              onBack={() => setSelectedCategory(null)}
            />
          )}

        {/* 👇 Filtro dropdown (opcional, pueden convivir) */}
        {/* <div className="mb-6 flex items-center justify-between">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <p className="text-sm text-muted-foreground">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "producto" : "productos"}
          </p>
        </div> */}

        {/* Productos */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((producto) => (
            <ProductCard
              key={producto.id}
              product={producto}
              client={client}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </main>

      {/* <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold">Nuestros Productos</h2>
          <p className="text-muted-foreground">
            Descubre nuestra colección de productos impresos en 3D
          </p>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <p className="text-sm text-muted-foreground">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "producto" : "productos"}
          </p>
        </div>

  
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((producto) => (
            <ProductCard
              key={producto.id}
              product={producto}
              client={client}
              onAddToCart={addToCart}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center py-16 text-center">
            <Grid3x3 className="mb-4 h-8 w-8 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">
              No hay productos en esta categoría
            </h3>
          </div>
        )} 
      </main>
         */}

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
