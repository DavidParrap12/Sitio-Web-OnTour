import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Playfair_Display, Fraunces, Cormorant_Garamond } from "next/font/google";
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

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  icons: { icon: "/image/Fav-Ontour.ico" },
  verification: {
    google: "google8443da66933dc835",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${dmSans.variable} ${playfairDisplay.variable} ${fraunces.variable} ${cormorant.variable} h-full antialiased`}
    >

      <body className="font-sans min-h-full flex flex-col bg-background text-foreground">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P7CVBCMQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        {/* GTM: afterInteractive defers load until hydration — keeps GTM out
            of the critical path (-114 KiB render-blocking, ~60ms main thread) */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P7CVBCMQ');`,
          }}
        />
      </body>
    </html>
  );
}
