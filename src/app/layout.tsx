// Root layout — minimal shell.
// The [locale]/layout.tsx handles <html>, <body>, fonts, Navbar, Footer, etc.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}
