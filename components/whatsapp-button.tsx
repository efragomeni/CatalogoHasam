"use client";

import { MessageCircle } from "lucide-react";
import type { Product, Client, CartItem } from "@/types";

import { sendWhatsApp } from "@/lib/sendWhatsApp";

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
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      onClick={() => sendWhatsApp(cart, products, client)}
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
