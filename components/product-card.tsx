"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import type { Product, Client } from "@/types";
import { urlFor } from "@/sanity/lib/image";

interface ProductCardProps {
  product: Product;
  client: Client;
  onAddToCart: (productId: string, quantity: number) => void;
}

export default function ProductCard({
  product,
  client,
  onAddToCart,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const precio = product.precios[client.tipo];

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity);
    setQuantity(1);
  };

  return (
    <div
      className="flex flex-col overflow-hidden rounded-lg border border-border bg-white shadow-sm transition-all duration-200 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative w-full overflow-hidden bg-gray-100">
        <div className="aspect-square w-full">
          <img
            src={urlFor(
              isHovered && product.imagen2 ? product.imagen2 : product.imagen1,
            )
              .width(400)
              .height(400)
              .url()}
            alt={product.nombre}
            className="h-full w-full object-cover transition-all duration-300"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-grow flex-col p-4">
        {/* Subcategory Badge */}
        {product.subcategoria && (
          <div className="mb-2 text-xs text-gray-500">
            {product.subcategoria}
          </div>
        )}

        {/* Product Name */}
        <h3 className="mb-2 line-clamp-2 text-sm font-medium leading-tight text-gray-800">
          {product.nombre}
        </h3>

        {/* Description */}
        {product.descripcion && (
          <p
            className={`mb-3 line-clamp-1 text-xs ${
              product.descripcion.includes("--")
                ? "text-white"
                : "text-gray-600"
            }`}
          >
            {product.descripcion}
          </p>
        )}

        {/* Price */}
        <div className="mb-4">
          <p className="text-xl font-bold text-gray-900">${precio}</p>
        </div>

        {/* Quantity Selector + Add Button */}
        <div className="mt-auto space-y-2">
          <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="flex-1 px-2 py-1.5 text-gray-600 transition-colors hover:bg-gray-200"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="flex-1 text-center text-sm font-semibold text-gray-900">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="flex-1 px-2 py-1.5 text-gray-600 transition-colors hover:bg-gray-200"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full rounded-md bg-yellow-400 px-4 py-2.5 text-sm font-bold text-gray-900 transition-all hover:bg-yellow-500 active:scale-95"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
