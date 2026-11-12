import {headers} from "next/headers";
import {Libre_Baskerville} from "next/font/google";
const font=Libre_Baskerville({subsets:["latin"],variable:"--font-libre-baskerville",weight:["400","700"],style:["normal","italic"],display:"swap"});
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "OnTour CMS",
  description: "Panel privado para gestionar circuitos, fotos, vídeos y precios.",
  robots: { index: false, follow: false },
};

/**
 * The CMS is deliberately outside the `[locale]` tree, so it needs its own
 * root layout. It keeps the same design tokens but not the public navbar.
 */
export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await headers();
  return (
    <html lang="es" className={font.variable}>
      <body className="font-sans min-h-screen bg-[#f4f2ec] text-stone-900 antialiased">
        {children}
      </body>
    </html>
  );
}
