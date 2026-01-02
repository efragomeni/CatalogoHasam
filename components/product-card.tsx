"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
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
      {/* Image Container */}
      {/* <div className="relative aspect-square overflow-hidden bg-muted"> */}
      <div className="relative aspect-4/5 sm:aspect-square overflow-hidden">
        <img
          // src={isHovered ? product.imagen2 : product.imagen1}
          src={urlFor(
            isHovered && product.imagen2 ? product.imagen2 : product.imagen1
          )
            .width(400)
            .height(400)
            .url()}
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
        {/* <h3 className="mb-1 text-lg font-semibold text-card-foreground">{product.nombre}</h3> */}
        {/* <h3 className="mb-1 text-base sm:text-lg font-semibold sm:text-center">
          {product.nombre}
        </h3> */}
        <h3 className="mb-1 text-base font-semibold text-center sm:text-left sm:text-lg">
          {product.nombre}
        </h3>

        <p className="mb-4 text-sm text-muted-foreground text-center sm:text-left sm:text-lg">
          {product.descripcion}
        </p>
        {/* <p className="mb-3 text-xs sm:text-sm text-muted-foreground line-clamp-2">

          {product.descripcion}
        </p> */}

        {/* Price and Actions */}
        {/* <div className="flex items-center justify-between"> */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ">
          {/* <div>
            <p className="text-2xl font-bold text-primary">${precio}</p>
           
          </div> */}
          <div className="w-full sm:w-auto">
            <p className="text-xl sm:text-2xl font-bold text-primar text-center">
              ${precio}
            </p>
          </div>

          {/* <div className="flex items-center gap-2"> */}
          <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
            {/* Quantity Selector */}
            <div className="flex items-center gap-1 rounded-lg border border-border bg-background">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-2 py-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-medium">
                {quantity}
              </span>
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
              className="flex-1 sm:flex-none rounded-lg bg-primary px-3 py-2 text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md active:scale-95"
            >
              Agregar
            </button>

            {/* <button
              onClick={handleAddToCart}
              className="rounded-lg bg-primary p-2 text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md active:scale-95"
            >
              <p>Agregar</p> 
            </button>
              */}
          </div>
        </div>
      </div>
    </div>
  );
}
