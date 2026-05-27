import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Incluir "/" explícitamente: el patrón solo con `.*` puede no matchear la raíz en edge.
  matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
