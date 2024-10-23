"use server";

import { setAppCookies } from "./set-app-cookies";
import type { AppCookies } from "./settings";

export const acceptAll = async () => {
  setAppCookies({
    essential: true,
    google: true,
    stripe: true,
  });
};

export const rejectAll = async () => {
  setAppCookies({
    essential: false,
    google: false,
    stripe: false,
  });
};

export const customizeCookies = async (formData: AppCookies) => {
  setAppCookies(formData);
};
