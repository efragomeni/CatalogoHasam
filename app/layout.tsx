import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hasam 3D - Impresiones personalizadas",
  description:
    "Creaciones únicas y coloridas en impresión 3D. Diseños personalizados, accesorios y más. Fabricado con amor en Argentina 💕",
  generator: "",
  keywords: [
    "Hasam",
    "impresiones 3D",
    "impresora 3D",
    "brainrot",
    "accesorios mascotas",
    "diseño 3D",
  ],
  openGraph: {
    title: "Hasam 3D - Impresiones personalizadas",
    url: "https://catalogo-hasam.vercel.app",
    siteName: "Hasam 3D",
    // images: [
    //   {
    //     url: "https://catalogo-hasam.vercel.app/og-image.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Hasam 3D",
    //   },
    // ],
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
