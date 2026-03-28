import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsappButton } from "@/components/WhatsappButton";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.agenciaontour.com"),
  title: "Ontour | Pasadías y Circuitos Turísticos",
  description: "Explora los mejores destinos, pasadías y circuitos con Ontour. Turismo en Colombia.",
  icons: {
    icon: "/image/Fav-Ontour.ico",
  },
  openGraph: {
    title: "Ontour | Pasadías y Circuitos Turísticos en Colombia",
    description: "Explora los mejores destinos, pasadías y circuitos con Ontour. Turismo en Colombia.",
    url: "https://www.agenciaontour.com",
    siteName: "Ontour DMC Colombia",
    images: [{ url: "/image/logo-ON-TOUR.png" }],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ontour | Turismo en Colombia",
    description: "Pasadías y circuitos turísticos en Colombia.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${dmSans.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="font-sans min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsappButton />
      </body>
    </html>
  );
}
