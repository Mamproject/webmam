export const C_ESSENTIAL = "m-e";
export const C_GOOGLE = "m-g";
export const C_STRIPE = "m-s";

const cookiesSettings = {
  httpOnly: true,
  sameSite: "lax",
  path: "/",
  secure: true,
  // one year in seconds
  maxAge: +(process.env.COOKIES_DURATION ?? 31536000),
} as const;

export const appCookies = {
  essential: {
    name: C_ESSENTIAL,
    options: cookiesSettings,
  },
  google: {
    name: C_GOOGLE,
    options: cookiesSettings,
  },
  stripe: {
    name: C_STRIPE,
    options: cookiesSettings,
  },
} as const;

export type AppCookiesKeys = keyof typeof appCookies;
export type AppCookies = Record<AppCookiesKeys, boolean>;
