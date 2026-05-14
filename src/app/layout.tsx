// Root layout — must include <html> and <body> per Next.js requirement.
import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  icons: { icon: "/image/Fav-Ontour.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${dmSans.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="font-sans min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
