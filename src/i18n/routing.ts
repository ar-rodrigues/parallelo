import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es"],
  defaultLocale: "es",
  // Español en `/` sin redirección; `/es` se redirige a `/` (mejor para SEO).
  localePrefix: "as-needed",
});
