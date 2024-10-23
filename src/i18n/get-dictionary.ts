import "server-only";

import type { Locale } from "./i18n-config";

const dictionaries = {
  es: () => import("./dictionaries/es").then((mod) => mod.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]?.() ?? dictionaries.es();
