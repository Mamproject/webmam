import "server-only";

import { cookies } from "next/headers";
import type { AppCookies, AppCookiesKeys} from "./settings";
import { appCookies } from "./settings";

export const setAppCookies = (cookiesData: AppCookies) => {
  const cookiesStore = cookies();

  Object.entries(appCookies).forEach(([key, { name, options }]) => {
    cookiesData[key as AppCookiesKeys] ? cookiesStore.set(name, "1", options) : cookiesStore.delete(name);
  });
};
