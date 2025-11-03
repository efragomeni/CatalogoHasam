import { redirect } from "next/navigation";

export const metadata = {
  title: "Hasam 3D - Catálogo de impresión 3D y accesorios para mascotas",
  description:
    "Catálogo Hasam 3D: productos únicos impresos en 3D, diseños personalizados y accesorios coloridos para vos y tus mascotas 🐾",
  keywords: [
    "Hasam",
    "Hasam3D",
    "impresión 3D",
    "impresion 3D",
    "impresion3D",
    "impresiones 3D",
    "accesorios para mascotas",
    "catálogo 3D",
    "brainrot",
    "diseños personalizados",
  ],
  // authors: [{ name: "Erika Fragomeni" }],
  openGraph: {
    title: "Hasam 3D - Impresiones con estilo 🎨",
    description:
      "Descubrí nuestra colección de productos impresos en 3D con estilo y color.",
    url: "https://catalogo-hasam.vercel.app",
    siteName: "Hasam 3D",
    // images: [
    //   {
    //     url: "https://catalogo-hasam.vercel.app/og-image.jpg", // reemplazá con una imagen real de tu sitio
    //     width: 1200,
    //     height: 630,
    //     alt: "Hasam 3D Catálogo",
    //   },
    // ],
    locale: "es_AR",
    type: "website",
  },
};

export default function RootPage() {
  redirect("/minorista");
}
