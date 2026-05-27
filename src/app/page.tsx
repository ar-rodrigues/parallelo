import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

/** Redirige `/` al locale por defecto cuando el proxy no corre (p. ej. manifest vacío en Vercel). */
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
