import type { routing } from "@/i18n/routing";
import type messages from "../../messages/es.json";

declare module "next-intl" {
  interface AppConfig {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    Locale: (typeof routing.locales)[number];
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    Messages: typeof messages;
  }
}
