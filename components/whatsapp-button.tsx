"use client";

import { MessageCircle } from "lucide-react";
import type { Product, Client, CartItem } from "@/types";

interface WhatsAppButtonProps {
  cart: CartItem[];
  products: Product[];
  client: Client;
}

export default function WhatsAppButton({
  cart,
  products,
  client,
}: WhatsAppButtonProps) {
  const handleWhatsApp = () => {
    if (cart.length === 0) {
      alert("Agrega productos a tu pedido primero 😊");
      return;
    }

    const cartItems = cart.map((item) => {
      const product = products.find((p) => p.id === item.productId)!;
      const precioBase = product.precios[client.tipo];
      const precio = Math.round(precioBase * (1 - client.descuento / 100));
      return {
        nombre: product.nombre,
        cantidad: item.quantity,
        precio,
        subtotal: precio * item.quantity,
      };
    });

    const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

    const mensaje = cartItems
      .map(
        (item) =>
          `• ${item.nombre} x${item.cantidad} ($${item.precio} c/u) = $${item.subtotal}`
      )
      .join("%0A");

    const clientInfo =
      client.descuento > 0
        ? `${client.nombre} (${client.descuento}% descuento)`
        : client.nombre;

    const texto = `¡Hola! Quiero hacer el siguiente pedido:%0A%0A${mensaje}%0A%0A*Total: $${total}*%0A%0ACliente: ${clientInfo}`;

    if (client.nombre === "Diego-ModaShop") {
      const telefono = "5491165652001";
      const url = `https://wa.me/${telefono}?text=${texto}`;
      window.open(url, "_blank");
    } else {
      const telefono = "5491140381507";
      const url = `https://wa.me/${telefono}?text=${texto}`;
      window.open(url, "_blank");
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      onClick={handleWhatsApp}
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-[#25D366] px-6 py-4 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden font-semibold sm:inline">Enviar Pedido</span>
      {totalItems > 0 && (
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-[#25D366]">
          {totalItems}
        </span>
      )}
    </button>
  );
}
