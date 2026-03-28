// This page is superseded by src/app/[locale]/page.tsx
// The middleware redirects all traffic to /{locale}/
import { redirect } from "next/navigation";
export default function Page() {
  redirect("/es");
}
