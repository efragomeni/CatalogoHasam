// utils/sendWhatsApp.ts
import type { Product, Client, CartItem } from "@/types";

export function sendWhatsApp(
  cart: CartItem[],
  products: Product[],
  client: Client
) {
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
  const cantidadTotal = cartItems.reduce((sum, item) => sum + item.cantidad, 0);

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

  const texto = `¡Hola! Quiero hacer el siguiente pedido:%0A%0A${mensaje}%0A%0A*Total: $${total}*%0A%0ACantidad de productos: ${cantidadTotal} %0A%0ACliente: ${clientInfo}`;

  const telefono =
    client.nombre === "Diego-ModaShop" ? "5491165652001" : "5491140381507";

  const url = `https://wa.me/${telefono}?text=${texto}`;
  window.open(url, "_blank");
}
