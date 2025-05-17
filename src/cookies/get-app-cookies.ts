import "server-only";

import { cookies } from "next/headers";
import type { AppCookies } from "./settings";
import { appCookies } from "./settings";

export const getAppCookies = async () => {
  const cookiesStore = await cookies();
  const cookieIsTrue = (cookie: string) => cookiesStore.get(cookie)?.value === "1";

  return {
    essential: cookieIsTrue(appCookies.essential.name),
    google: cookieIsTrue(appCookies.google.name),
  } as AppCookies;
};
