"use client";

import { useState } from "react";
import type { Product, Client } from "@/types";
import { urlFor } from "@/sanity/lib/image";

interface ProductCardProps {
  product: Product;
  client: Client;
  onAddToCart: (productId: number, quantity: number) => void;
}

export default function ProductCard({
  product,
  client,
  onAddToCart,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const precioBase = product.precios[client.tipo];
  const precio = Math.round(precioBase * (1 - client.descuento / 100));

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity);
    setQuantity(1);
  };

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-4/5 sm:aspect-square overflow-hidden">
        <img
          src={urlFor(
            isHovered && product.imagen2 ? product.imagen2 : product.imagen1
          )
            .width(400)
            .height(400)
            .url()}
          alt={product.nombre}
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
        />

        <div className="absolute left-3 top-3 rounded-full bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur-sm">
          {product.categoria}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="mb-1 text-base font-semibold text-center sm:text-left sm:text-lg">
          {product.nombre}
        </h3>

        <p className="mb-4 text-sm text-muted-foreground text-center sm:text-left sm:text-base">
          {product.descripcion}
        </p>

        {/* Price + Actions */}
        {/* <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"> */}
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          {/* Precio */}
          <p className="text-xl font-bold text-primary text-center sm:text-left sm:text-2xl">
            ${precio}
          </p>

          {/* Acciones */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            {/* Quantity */}
            <div className="mx-auto flex items-center rounded-lg border border-border bg-background sm:mx-0">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-lg font-semibold text-muted-foreground hover:text-foreground"
              >
                −
              </button>

              <span className="min-w-[3rem] text-center text-lg font-semibold">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-lg font-semibold text-muted-foreground hover:text-foreground"
              >
                +
              </button>
            </div>

            {/* Add */}
            <button
              onClick={handleAddToCart}
              className="w-full sm:w-auto min-w-[120px] rounded-lg bg-primary px-5 py-2 text-primary-foreground transition-all hover:bg-primary/90 active:scale-95"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
