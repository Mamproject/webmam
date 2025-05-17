import "server-only";

import { cookies } from "next/headers";
import type { AppCookies, AppCookiesKeys } from "./settings";
import { appCookies } from "./settings";

export const setAppCookies = async (cookiesData: AppCookies) => {
  const cookiesStore = await cookies();

  Object.entries(appCookies).forEach(([key, { name, options }]) => {
    if (cookiesData[key as AppCookiesKeys]) cookiesStore.set(name, "1", options);
    else cookiesStore.delete(name);
  });
};
